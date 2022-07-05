<template>
	<view class="all_address">
		<view class="row" v-for="item in addressList" :key="item.id">
			<view @tap="chooseAddress(item)" class="info">
				<view class="name">
					{{item.name}}<text class="txt">{{item.phoneNumber}}</text>
				</view>
				<view class="address_info">
					{{item.addressInfo}}
				</view>
			</view>
			<view @tap="editAddress(item)" class="edit">
				<uni-icons type="compose" size="40rpx"></uni-icons>
			</view>
		</view>
		<!-- 新增地址 -->
		<navigator url="/pages/user/pages/address/addAddress" class="add_btn">新增地址
		</navigator>
	</view>
</template>

<script>
	import {
		findAllAddress
	} from "@/request/userRequest.js"
	export default {
		data() {
			return {
				addressList: [],
				order: false,
			};
		},
		onLoad(options) {
			this.order = options.order ? true : false;
		},
		onShow() {
			findAllAddress().then(res => {
				console.log('', res);
				const list = res.data.data.items;
				list.forEach(i => {
					i.addressInfo = i.province + i.city + i.region + i.detailAddress;
				})
				this.addressList = list;
			})
		},
		methods: {
			editAddress(item) {
				uni.setStorageSync("currentAddress", item)
				uni.navigateTo({
					url: '/pages/user/pages/address/addAddress?id=' + item.id + '&memberId=' + item.memberId
				})
			},
			chooseAddress(item) {
				if (!this.order) {
					return
				} else {
					uni.setStorageSync("orderAddress", item);
					uni.navigateBack({
						delta: 1
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.all_address {
		background-color: #f1ece7;
		padding: 23rpx;

		.row {
			padding: 20rpx;
			@include flex();

			.info {
				font-size: 24rpx;
				width: calc(100% - 82rpx);
			}

			.edit {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 81rpx;
				height: 88rpx;
				border-left: solid 1px #aaa;
			}
		}

		.add_btn {
			position: fixed;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			box-shadow: 0px 5px 10px rgba(0, 0, 0, .4);
			width: 70%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 80rpx;
			background-color: #354e44;
			color: #fff;
			font-size: 30rpx;
		}
	}
</style>
