<template>
	<view class="container">
		<!-- 顶部轮播广告 -->
		<swiper class="top_swiper" circular autoplay indicator-dots>
			<swiper-item v-for="item in bannerAdsList" :key="item.id">
				<view class="swiper-item ">
					<image class="img" :src="item.pic" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 分类 -->
		<view class="category_list">
			<navigator :url="'/pages/category/pages/categoryDetail/index?id='+item.id" class="category_item"
				v-for="item in categoryList" :key="item.id">
				<image class="img" :src="item.icon" mode=""></image></br>
				{{item.name}}
			</navigator>
		</view>
		<!-- 推荐活动纵向轮播 -->
		<view class="recommend">
			<view class="left_content">
				<image class="img" src="../../static/trumpet.png" mode=""></image>
				限时活动：
			</view>
			<view class="right_content">
				<swiper class="swiper" circular autoplay vertical>
					<swiper-item @tap="getDetail(item.productId)" v-for="item in recommendList" :key="item.productId">
						<view class="swiper-item ">
							<view class="name">
								{{item.name}}
							</view>
							<view class="price_info">
								<text class="price">{{item.price}}元</text></br>
								<text class="now_price">现价:{{item.promotionPrice}}元</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 热门推荐轮播 -->
		<view class="hot_recommend com_padding">
			<view class="com_title">
				热门推荐
			</view>
			<swiper class="hot_swiper" autoplay interval=2000 duration=2000 display-multiple-items=3 circular>
				<swiper-item @tap="getDetail(item.id)" v-for=" item in hotList" :key="item.id">
					<view class="swiper-item ">
						<image class="img" :src="item.pic" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view><!-- 新品推荐轮播 -->
		<view class="latest_recommend com_padding">
			<view class="com_title">
				新品推荐
			</view>
			<view class="latest_list">
				<view @tap="getDetail(item.id)" class="latest_item" v-for="item in lejuLatestProducts" :key="item.id">
					<image class="img" :src="item.pic" mode=""></image>
					<view class="info">
						<text class="name">{{item.name}}</text>
						<text class="price">价格:&ensp;{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<view class="youlike com_padding">
			<view class="com_title">
				猜你喜欢
			</view>
			<view class="youlike_list">
				<Goods text="乐居" :list="saleMostProducts"></Goods>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bannerAds,
		findCategory,
		recommendList,
		hotList,
		lejuLatestProducts,
		saleMostProducts
	} from '@/request/homeRequest.js'
	import Goods from '@/pages/components/goods.vue'
	export default {
		data() {
			return {
				bannerAdsList: [],
				categoryList: [],
				recommendList: [],
				hotList: [],
				lejuLatestProducts: [],
				saleMostProducts: [],
			}
		},
		onLoad() {
			bannerAds().then(res => this.bannerAdsList = res.data.data.items)
			findCategory().then(res => {
				this.categoryList = res.data.data.category.children
			})
			recommendList().then(res => {
				this.recommendList = res.data.data.items
			})
			hotList().then(res => {
				this.hotList = res.data.data.items
			})
			lejuLatestProducts().then(res => {
				this.lejuLatestProducts = res.data.data.productList
			})
			saleMostProducts().then(res => {
				this.saleMostProducts = res.data.data.items
			})
		},
		methods: {
			getDetail(id) {
				uni.navigateTo({
					url: "/pages/category/pages/goodsDetail/index?id=" + id
				})
			}
		},
		components: {
			Goods
		},
	}
</script>

<style lang="scss" scoped>
	@keyframes wink {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0.5;
		}
	}

	.container {
		background-color: #f1ece7;
		padding-bottom: 50rpx;
		padding-top: var(--status-bar-height);

		.com_padding {
			padding: 0 30rpx;
		}

		.com_title {
			padding: 30rpx 0;
			font-size: 32rpx;
			color: #3e3e3e;
			font-weight: 600;
		}
	}

	.top_swiper {
		width: 100%;
		height: 362rpx;

		.swiper-item {
			height: 362rpx;
			border-radius: 30rpx;
			overflow: hidden;

			.img {
				width: 100%;
				height: 362rpx;
			}
		}
	}

	.category_list {
		@include flex(nowrap, space-around);
		padding: 60rpx 0;

		.category_item {
			font-size: 32rpx;
			color: #3e3e3e;
			text-align: center;

			.img {
				width: 80rpx;
				height: 80rpx;
			}
		}
	}

	.recommend {
		@include flex(nowrap);
		align-items: center;
		margin: 40rpx;
		padding: 20rpx 0rpx 20rpx 40rpx;
		height: 60rpx;
		background-color: #fff;

		.left_content {
			@include flex();
			align-items: center;
			width: 230rpx;
			font-size: 28rpx;
			font-weight: 600;
			color: orange;
			overflow: hidden;

			.img {
				width: 48rpx;
				height: 48rpx;
				animation: wink 1s infinite normal;
			}
		}

		.right_content {
			width: 460rpx;
			height: 60rpx;

			.swiper {
				height: 100%;
			}

			.swiper-item {
				@include flex(nowrap, flex-start);
				align-items: center;
				height: 100%;

				.name {
					width: 250rpx;
					@include ellipsis;
					color: rgb(62, 62, 62);
					font-size: 28rpx;
				}

				.price_info {
					font-size: 24rpx;
					font-weight: 700;

					.price {
						color: #333;
						text-decoration: line-through;
					}

					.now_price {
						color: #ff0000;

					}
				}
			}
		}
	}

	.hot_recommend {



		.hot_swiper {
			height: 176rpx;

			.img {
				width: 208rpx;
				height: 176rpx;
			}
		}
	}

	.latest_list {
		@include flex(nowrap, flex-start);
		overflow: auto;

		.latest_item {
			flex-shrink: 0;
			width: 490rpx;
			height: 160rpx;
			background-color: #fff;
			margin-right: 20rpx;
			padding: 50rpx;
			border-radius: 20rpx;
			@include flex(nowrap, flex-start);

			.img {
				width: 194rpx;
				height: 168rpx;
				border-radius: 8rpx;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 25rpx;
				font-size: 26rpx;
				color: #3e3e3e;
			}
		}
	}
</style>
