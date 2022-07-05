<template>
	<view class="update_info">
		<view v-if="!isUpdate" class="">
			<view class="special_row">
				<view class="txt">
					头像
				</view>
				<image class="img" :src="userInfo.icon" mode=""></image>
			</view>
			<view class="row">
				<view class="txt">
					用户名
				</view>
				<input class="ipt" type="text" disabled :value="userInfo.username">
			</view>
			<view class="row">
				<view class="txt">
					昵称
				</view>
				<input class="ipt" type="text" disabled :value="userInfo.nickname">
			</view>
			<view class="row">
				<view class="txt">
					手机号
				</view>
				<input class="ipt" type="text" disabled :value="userInfo.phone">
			</view>
		</view>
		<view v-else class="">
			<view class="special_row">
				<view class="txt">
					头像
				</view>
				<image @tap="chooseImg" class="img" :src="icon" mode=""></image>
			</view>
			<view class="row">
				<view class="txt">
					用户名
				</view>
				<input class="ipt" disabled type="text" :value="userInfo.username">
			</view>
			<view class="row">
				<view class="txt">
					昵称
				</view>
				<input v-model="nickname" class="ipt" type="text" :value="userInfo.nickname">
			</view>
			<view class="row">
				<view class="txt">
					手机号
				</view>
				<input v-model="phone" class="ipt" type="text" :value="userInfo.phone">
			</view>
		</view>

		<view class="btn">
			<view @tap="updateInfo" class="update_btn btn_com">
				更新信息
			</view>
			<view class="out_btn btn_com">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMemberInfo,
		updateMemberInfo
	} from "@/request/userRequest.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				userInfo: {},
				isUpdate: false,
				avatarUrl: '',
				icon: '',
				nickname: '',
				phone: '',
			};
		},
		onLoad() {
			getMemberInfo().then(res => {
				console.log('用户信息', res);
				this.userInfo = res.data.data.userInfo;
			})
		},
		methods: {
			updateInfo() {
				if (this.isUpdate) {
					updateMemberInfo({
						...this.userInfo,
						icon: this.avatarUrl,
						nickname: this.nickname,
						phone: this.phone
					}).then(res => {
						if (res.data.success) {
							toast("success", "修改成功")
						}
					})
				} else {
					toast("success", "请在此界面更改信息")
					this.isUpdate = true;
				}
			},
			chooseImg() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					sourceType: ['album'],
					success: function(res) {
						_this.avatarUrl = res.tempFilePaths[0]
						uni.uploadFile({
							url: "https://leju.bufan.cloud/lejuClient/login/uploadAvatar",
							filePath: _this.avatarUrl,
							name: 'file',
							success(res) {
								console.log('上传图片', res);
								_this.avatarUrl = JSON.parse(res.data).data.fileUrl;
								_this.icon = _this.avatarUrl;
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.update_info {
		padding: 30rpx;

		.row {
			height: 74rpx;
			border-bottom: 1px solid #e5e5e5;
			@include flex();

			.ipt {
				color: #a1a1a1;
			}
		}

		.special_row {
			height: 150rpx;
			border-bottom: 1px solid #e5e5e5;
			@include flex();

			.img {
				width: 150rpx;
				height: 150rpx;
				background-color: #fff;
			}
		}

		.btn {
			width: 100%;
			position: fixed;
			left: 0%;
			bottom: 0%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.btn_com {
			width: 370rpx;
			height: 88rpx;
			margin: 10rpx;
			font-size: 32rpx;
			color: #fff;
			text-align: center;
			line-height: 88rpx;
			background: #1c4b47;
			border-radius: 8rpx;
		}

		.out_btn {
			background-color: #f00;
		}
	}
</style>
