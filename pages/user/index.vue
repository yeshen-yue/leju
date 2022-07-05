<template>
	<view class="user">
		<!-- 用户头像及信息 -->
		<view class="user_info">
			<navigator url="/pages/user/pages/updateUserInfo/index">
				<image class="user_photo" :src="userInfo.icon || '../../static/logo.png'" mode=""></image>
			</navigator>

			<view v-if="showLoginBtn" @tap="login" class="login">
				立即登录
			</view>
			<view class="user_detail" v-else>
				<view class="nickname">
					{{userInfo.nickname}}
				</view>
				<view class="username">
					用户名： {{userInfo.username}}
				</view>
			</view>
		</view>
		<!-- 订单导航 -->
		<view class="order">
			<view class="title">
				我的订单
			</view>
			<view class="order_nav">
				<view @tap="getOrders(0)" class="order_nav_item">
					<image class="img" src="../../static/user_icons/代付款.png" mode=""></image>
					待付款
				</view>
				<view @tap="getOrders(1)" class="order_nav_item">
					<image class="img" src="../../static/user_icons/已付款.png" mode=""></image>
					已付款
				</view>
				<view @tap="getOrders(2)" class="order_nav_item">
					<image class="img" src="../../static/user_icons/已发货.png" mode=""></image>
					已发货
				</view>
				<view @tap="getOrders(3)" class="order_nav_item">
					<image class="img" src="../../static/user_icons/已收货.png" mode=""></image>
					已收货
				</view>
				<view @tap="getOrders(4)" class="order_nav_item">
					<image class="img" src="../../static/user_icons/售后.png" mode=""></image>
					售后
				</view>
			</view>


		</view>
		<!-- 菜单 -->
		<view class="menu">
			<navigator url="/pages/user/pages/star/goodsStar" class="menu_item">
				<image class="img" src="../../static/user_icons/商品收藏.png" mode=""></image>
				商品收藏
			</navigator>
			<view class="menu_item">
				<image class="img" src="../../static/user_icons/品牌.png" mode=""></image>
				品牌
			</view>
			<navigator url="/pages/user/pages/star/articleStar" class="menu_item">
				<image class="img" src="../../static/user_icons/文章收藏.png" mode=""></image>
				文章收藏
			</navigator>
			<navigator url="/pages/user/pages/address/allAddress" class="menu_item">
				<image class="img" src="../../static/user_icons/地址.png" mode=""></image>
				地址
			</navigator>
			<view class="menu_item">
				<image class="img" src="../../static/user_icons/卡包.png" mode=""></image>
				卡包
			</view>
			<navigator url="/pages/user/pages/cart/index">
				<view class="menu_item">
					<image class="img" src="../../static/user_icons/购物车.png" mode=""></image>
					购物车
				</view>
			</navigator>
			<view class="menu_item">
				<image class="img" src="../../static/user_icons/联系客服.png" mode=""></image>
				联系客服
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getMemberInfo
	} from "@/request/userRequest.js"

	import checkLogin from "@/utils/checkLogin.js"
	export default {
		data() {
			return {
				showLoginBtn: true,
				userInfo: {}
			};
		},
		onLoad() {
			checkLogin();
		},
		onShow() {
			if (uni.getStorageSync("token")) {
				getMemberInfo().then(res => {
					console.log('用户信息', res);
					this.userInfo = res.data.data.userInfo;
				})

				if (this.userInfo) {
					this.showLoginBtn = false;
				}
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url: "/pages/user/pages/login/index"
				})
			},
			getOrders(currentIndex) {
				uni.navigateTo({
					url: "/pages/user/pages/order/index?currentIndex=" + currentIndex
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		padding: 60rpx 40rpx;
		background-color: #f1ece7;

		.user_info {
			@include flex(nowrap, flex-start);
			align-items: center;

			.user_photo {
				width: 150rpx;
				height: 150rpx;
				margin-right: 38rpx;
				border-radius: 50%;
			}

			.login {
				font-size: 24rpx;

			}

			.nickname {
				margin-bottom: 30rpx;
				font-size: 40rpx;
				font-weight: 700;
				color: #3d4c46;
			}

			.username {
				font-size: 26rpx;
				color: #999;
			}
		}

		.order {
			padding: 0 54rpx;
			margin-bottom: 60rpx;
			border-radius: 4px;
			background-color: #fff;
			margin-top: 60rpx;
			font-size: 26rpx;

			.title {
				height: 76rpx;
				line-height: 76rpx;
				border-bottom: 1px solid #ddd;
			}

			.order_nav {
				@include flex();
				padding: 20rpx 0 30rpx;

				.order_nav_item {


					.img {
						display: block;
						width: 40rpx;
						height: 40rpx;
						margin: 0 auto;
					}
				}
			}
		}

		.menu {
			padding: 30rpx 0;
			font-size: 26rpx;
			@include flex(wrap);
			background-color: #fff;
			border-radius: 20rpx;

			.menu_item {
				margin-top: 20rpx;
				width: 223.3rpx;
				text-align: center;

				.img {
					display: block;
					margin: 30rpx auto;
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>
