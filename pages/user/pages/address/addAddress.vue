<template>
	<view class="add_address">
		<view class="row">
			<view class="title">
				收件人
			</view>
			<input v-model="name" class="ipt" type="text" placeholder="请输入收件人姓名">
		</view>
		<view class="row">
			<view class="title">
				电话号码
			</view>
			<input v-model="phoneNumber" class="ipt" type="text" placeholder="请输入收件人电话号码">
		</view>
		<view class="row">
			<view class="title">
				所在地区
			</view>
			<view @tap="chooseRegion" class="ipt choose_region">
				{{addressInfo}}
			</view>
		</view>
		<view class="row">
			<view class="title">
				详细地址
			</view>
			<input v-model="detailAddress" class="ipt" type="text" placeholder="请输入详细地址">
		</view>
		<view class="row">
			<view class="title">
				设置默认地址
			</view>
			<switch @change="handleChange" />
		</view>
		<!-- 省市区三级联动 -->
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"
			themeColor="#007AFF">
		</simple-address>
		<view class="footer">
			<view @tap="addAddress" class="add_btn btn">
				保存地址
			</view>
			<view v-if="isedit" @tap="delAddress" class="del_btn btn">
				删除地址
			</view>
		</view>

	</view>
</template>

<script>
	import simpleAddress from "@/components/simple-address/simple-address.vue"
	import {
		addAddress,
		updateAddressInfo,
		defaultAddress
	} from "@/request/userRequest.js"
	export default {
		components: {
			simpleAddress
		},
		data() {
			return {
				id: '',
				memberId: '',
				isedit: false,
				cityPickerValueDefault: [0, 0, 1],
				addressInfo: '点击选择地区',
				cityCode: '',
				detailAddress: '',
				name: '',
				phoneNumber: '',
				defaultStatus: 0,
				province: '',
				city: '',
				region: '',
			};
		},
		onLoad(options) {
			this.isedit = options.id ? true : false;
			this.id = options.id;
			this.memberId = options.memberId;
			if (this.isedit) {
				const currentAddress = uni.getStorageSync("currentAddress");
				Object.assign(this.$data, currentAddress)
			}
		},
		methods: {
			addAddress() {
				if (this.isedit) {
					defaultAddress({
						addressId: this.id,
						defaultStatus: this.defaultStatus
					})
					updateAddressInfo(this.$data).then(res => {
						if (res.data.success) {
							uni.removeStorageSync("currentAddress")
							uni.navigateBack({
								delta: 1
							})
						}
					})
				} else {
					addAddress(this.$data).then(res => {
						if (res.data.success) {
							uni.navigateBack({
								delta: 1
							})
						}
					})
				}
			},
			delAddress() {},
			handleChange: function(e) {
				this.defaultStatus = e.detail.value ? 1 : 0;
			},
			chooseRegion() {
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				const regionArr = e.labelArr
				this.addressInfo = regionArr.join(" ");
				this.cityCode = e.areaCode;
				this.province = regionArr[0];
				this.city = regionArr[1];
				this.region = regionArr[2];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.add_address {
		background-color: #f1ece7;
		padding: 23rpx;

		.row {
			height: 120rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			@include flex();
			border-bottom: 1Px solid #ccc;

			.title {
				width: 212rpx;
				height: 120rpx;
				line-height: 120rpx;
				text-align: left;
			}

			.ipt {
				height: 120rpx;
				width: calc(100% - 212rpx);
			}

			.choose_region {
				line-height: 120rpx;
			}
		}



		.footer {
			position: fixed;
			bottom: 0;
			left: 50%;
			width: 80%;
			transform: translateX(-50%);

			.btn {
				margin: 0 auto;
				box-shadow: 0rpx 5rpx 10rpx rgba(0, 0, 0, .4);
				width: 70%;
				height: 80rpx;
				font-size: 30rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 80rpx;
				color: #fff;
			}

			.add_btn {
				background-color: #354e44;
			}

			.del_btn {
				margin-top: 10rpx;
				background-color: #f00;
			}
		}
	}
</style>
