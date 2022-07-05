<template>
	<view class="login">
		<view class="photo">

		</view>
		<input style="margin-bottom: 48rpx;" placeholder-style="font-size:22rpx;" class="ipt" type="text"
			v-model="user.username" placeholder="用户名">
		<input placeholder-style="font-size:22rpx;" class="ipt" type="text" v-model="user.password" password
			placeholder="密码">
		<button @tap="login" class="login_btn">登录</button>
		<view class="footer">
			<navigator class="footer_item">找回密码</navigator>
			<view class="line footer_item">
				|
			</view>
			<navigator url="/pages/user/pages/register/index" class="footer_item">注册账号</navigator>
		</view>
	</view>
</template>

<script>
	import {
		login,
		getMemberInfo
	} from "@/request/userRequest.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				user: {
					username: '',
					password: ''
				}
			};
		},
		methods: {
			login() {
				login(this.user).then(res => {
					if (res.data.success) {
						toast("success", "登录成功");
						uni.setStorageSync('token', res.data.data.token);
						getMemberInfo().then(res => {
							console.log('登录信息', res);
							uni.setStorageSync('userInfo', res.data.data.userInfo);
							uni.navigateBack({
								delta: 1
							})
						})
					} else {
						toast("error", "登录失败，确认用户名和密码", 1000)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// page {
	// 	height: 100%;
	// 	background-color: #f1ece7;
	// }

	.login {
		padding: 128rpx 70rpx 0;

		height: 100%;

		.photo {
			width: 160rpx;
			height: 160rpx;
			margin: 0rpx auto 72rpx;
			background-color: #f00;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.ipt {
			height: 40rpx;
			width: 550rpx;
			padding: 30rpx;
			border-radius: 2.5rem;
			box-shadow: 0 0 60px 0 rgba(43, 86, 112, .1);
		}

		.login_btn {
			height: 100rpx;
			margin: 96rpx 0 64rpx;
			text-align: center;
			line-height: 100rpx;
			background: rgb(53, 78, 68);
			color: rgb(255, 255, 255);
			border-radius: 2.5rem;
			font-size: 30rpx;
		}

		.footer {
			@include flex(nowrap, center);
			font-size: 28rpx;

			.footer_item {
				margin: 0 10rpx;
			}
		}
	}
</style>
