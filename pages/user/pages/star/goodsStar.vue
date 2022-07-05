<template>
	<view class="goods_star">
		<view v-if="!starList[0]" class="">
			收藏列表为空，快去浏览自己喜欢的商品吧！
		</view>
		<view v-for="item in starList" :key="item.id" class="goods_item">
			<image class="img" :src="item.pic" mode=""></image>
			<view class="info">
				{{item.name}}
			</view>
			<view class="price">
				¥ {{item.price}}
			</view>
		</view>
	</view>
</template>

<script>
	import {
		goodsDetailRequest
	} from "@/request/goodsDetailRequest.js"
	export default {
		data() {
			return {
				starList: [],
			};
		},
		onLoad() {
			let starList = uni.getStorageSync("starList");
			if (starList && starList.length != 0) {
				starList.forEach(i => {
					goodsDetailRequest(i).then(res => {
						this.starList.push(res.data.data.product);
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods_star {
		padding: 40rpx 30rpx;
		background-color: #f1ece7;

		.goods_item {
			@include flex();
			align-items: center;
			padding: 30rpx;
			margin-bottom: 40rpx;
			color: #494949;
			font-size: 24rpx;
			background-color: #fff;
			border-radius: 8rpx;

			.img {
				width: 160rpx;
				height: 160rpx;
			}

			.info {
				width: 300rpx;
			}

			.price {
				width: 130rpx;
				font-size: 32rpx;
				color: #1c4b47;
				font-weight: 600;
			}
		}
	}
</style>
