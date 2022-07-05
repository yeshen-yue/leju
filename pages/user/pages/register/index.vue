<template>
	<view class="register">
		<view @tap="chooseImg" class="photo">
			<text v-if="!avatarUrl">点击上传图片</text>
			<image v-else class="img" :src="avatarUrl" mode=""></image>
		</view>
		<input style="margin-bottom: 48rpx;" placeholder-style="font-size:22rpx;" class="ipt" type="number"
			v-model="user.phone" placeholder="手机号">
		<input style="margin-bottom: 48rpx;" placeholder-style="font-size:22rpx;" class="ipt" type="text"
			v-model="user.password" password placeholder="密码">
		<input style="margin-bottom: 48rpx;" placeholder-style="font-size:22rpx;" class="ipt" type="text"
			v-model="user.username" placeholder="用户名">
		<input style="margin-bottom: 48rpx;" placeholder-style="font-size:22rpx;" class="ipt" type="text"
			v-model="user.nickname" placeholder="昵称">
		<input style="margin-bottom: 48rpx;" placeholder-style="font-size:22rpx;" class="ipt" type="number"
			placeholder="验证码">
		<button @tap="register" class="login_btn">注册</button>
		<view class="footer">
			<view @tap="agreed=!agreed" :class="{active:agreed}" class="circle">

			</view>
			<text>同意</text>
			<text class="contract_txt">《协议》</text>

		</view>
	</view>
</template>

<script>
	import {
		register
	} from "@/request/userRequest.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				user: {
					username: '',
					password: '',
					nickname: '',
					phone: '',
					icon: '',
				},
				avatarUrl: '',
				agreed: false,
			};
		},
		methods: {
			register() {
				//校验数据
				if (this.user.phone.length != 11) {
					toast("error", "请输入正确的手机号");
					return
				}
				if (!this.agreed) {
					toast("error", "请先统一协议");
					return
				}
				register(this.user).then(res => {
					console.log(res.data.data.success)
					if (res.data.data.success) {
						toast("success", "注册成功");
					} else {
						toast("error", "注册失败");
					}
				})
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
								_this.avatarUrl = JSON.parse(res.data).data.fileUrl;
								_this.user.icon = _this.avatarUrl;
							}
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		padding: 128rpx 70rpx 0;
		background-color: #f1ece7;

		.photo {
			width: 160rpx;
			height: 160rpx;
			line-height: 160rpx;
			text-align: center;
			margin: 0rpx auto 72rpx;
			background-color: #fff;
			border-radius: 50%;
			overflow: hidden;

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
			font-size: 24rpx;
			align-items: center;
			color: rgba(0, 0, 0, .7);
			;

			.circle {
				width: 22rpx;
				height: 22rpx;
				border: 1rpx solid rgba(0, 0, 0, .7);
				border-radius: 50%;
			}

			.circle.active {
				background-image: radial-gradient(#4b4948 30%, #f1ece7 30%);
			}

			.contract_txt {
				margin-left: 30rpx;
				font-size: 28rpx;
			}
		}
	}
</style>
