<template>
	<view class="explore">
		<view class="header" :style="{marginTop:statusbarH+'px'}">
			<view @tap="toggleShow" :class="{active:isshowArt}" class="header_nav">
				精选文章
			</view>
			<view @tap="toggleShow" :class="{active:!isshowArt}" class="header_nav">
				品牌列表
			</view>
		</view>
		<view v-if="isshowArt" class="article_list">
			<view @tap="getDetail(item.id)" v-for="item in articleList" :key="item.id" class="article_item">
				<image class="img" :src="item.coverImg" mode=""></image>
				<view class="article_item_bottom">
					<view class="article_item_bottom_left">
						<image class="eye" src="../../static/眼睛.png" mode=""></image>
						<text>{{item.viewCount}}</text>
					</view>
					<image @tap.stop="addStar(item)" class="star"
						:src="item.isstar? '../../static/收藏激活.png':'../../static/收藏.png'" mode=""></image>
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<view class="author">
					{{item.author}}
				</view>
			</view>
		</view>
		<!-- 品牌列表 -->
		<view v-if="!isshowArt" class="brand_list">
			<view v-for="item in brandList" :key="item.id" class="brand_item">
				<image class="img" :src="item.bigPic" mode=""></image>
				<view class="brand_item_bottom">
					<view class="name">
						{{item.name}}
					</view>
					<view class="title">
						{{item.brandStory}}
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		getArticle,
		getBrand
	} from "@/request/exploreRequest.js"
	export default {
		data() {
			return {
				articleList: [],
				brandList: [],
				articleTotal: 0,
				start: 1,
				statusbarH: 0,
				isshowArt: true,
			};
		},
		onLoad() {
			this.getArticle(this.start);
			this.getBrand(this.start);
			// 获取顶部状态栏信息
			this.statusbarH = getApp().globalData.statusbarH;
		},
		onReachBottom() {
			if (this.articleList.length >= this.articleTotal && this.articleList.length != 0) {
				return
			}
			this.start++;
			this.getArticle(this.start);
		},
		methods: {
			getDetail(id) {
				uni.navigateTo({
					url: "/pages/explore/pages/articleDetail/index?id=" + id
				})
			},
			getArticle(start) {
				getArticle({
					start,
					limit: 10
				}).then(res => {
					const list = res.data.data.rows;
					const localArtStarList = uni.getStorageSync("artStarList");
					console.log('文章', list);
					list.forEach(i => {
						i.isstar = false;
						if (!localArtStarList) {
							return
						}
						if (localArtStarList.find(it => it.id == i.id)) {
							i.isstar = true;
						}
					})
					this.articleList.push(...list);
					this.articleTotal = res.data.data.total;
				})
			},
			getBrand(start) {
				getBrand({
					start,
					limit: 10
				}).then(res => {
					const list = res.data.data.rows;

					this.brandList.push(...list);
					this.brandTotal = res.data.data.total;
				})
			},
			toggleShow() {
				this.isshowArt = !this.isshowArt;
				this.articleList = [];
				this.brandList = [];
				this.start = 1;
				if (this.isshowArt) {
					this.getArticle(this.start);
				} else {
					this.getBrand(this.start);
				}
			},
			// 收藏
			addStar(item) {
				console.log('', item);
				item.isstar = !item.isstar;
				const artStarList = this.articleList.filter(i => i.isstar);
				uni.setStorageSync("artStarList", artStarList)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.explore {
		background-color: #f1ece7;
		padding: var(--status-bar-height) 38rpx 38rpx;

		.header {
			@include flex(nowrap, center);
			align-items: center;
			background-color: rgb(53, 78, 68);
			width: 100%;
			height: 88rpx;
			color: #fff;
			font-size: 32rpx;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;

			.header_nav {
				padding: 15rpx;
				box-sizing: border-box;
			}

			.header_nav.active {
				border-bottom: 2rpx solid #fff;
			}
		}

		.article_list {
			.article_item {
				position: relative;
				margin-bottom: 28rpx;
				background-color: #fff;
				color: #fff;

				.img {
					width: 100%;
					height: 382rpx;
				}

				.article_item_bottom {
					@include flex();
					align-items: center;
					box-sizing: border-box;
					width: 100%;
					height: 100rpx;
					padding: 0 60rpx;

					.article_item_bottom_left {
						@include flex();
						width: 100rpx;
						font-size: 26rpx;
						color: #3e3e3e;

						.eye {
							width: 40rpx;
							height: 40rpx;
						}

					}

					.star {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.author {
					position: absolute;
					left: 20rpx;
					top: 244rpx;
					font-size: 48rpx;
				}

				.title {
					position: absolute;
					left: 20rpx;
					top: 316rpx;
					font-size: 30rpx;
				}
			}
		}

		.brand_list {
			.brand_item {
				background-color: #fff;
				margin-bottom: 38rpx;

				.img {
					width: 100%;
					height: 240rpx;
				}

				.brand_item_bottom {
					padding: 30rpx;

					.name {
						font-size: 32rpx;
						line-height: 45rpx;
						color: #3e3e3e;
						font-weight: 700;
					}

					.title {
						font-size: 22rpx;
						color: #b1b1b1;
						line-height: 30rpx;
					}
				}
			}
		}
	}
</style>
