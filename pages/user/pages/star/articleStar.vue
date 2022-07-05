<template>
	<view class="article_star">
		<view v-if="artList" class="article_list">
			<view v-for="item in artList" class="article_item">
				<image class="img" :src="item.coverImg" mode=""></image>
				<view class="title">
					{{item.title}}
				</view>
			</view>
		</view>
		<view v-else class="">
			收藏列表为空，快去浏览文章吧！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				artList: uni.getStorageSync("artStarList")
			};
		}
	}
</script>

<style lang="scss" scoped>
	.article_star {

		padding: 40rpx 30rpx;
		background-color: #f1ece7;

		.article_list {
			@include flex(wrap);
		}

		.article_item {
			width: 334rpx;
			margin-bottom: 10rpx;
			background-color: #fff;

			.img {
				width: 100%;
				height: 238rpx;
			}

			.title {
				padding: 20rpx 0;
				text-align: center;
				color: #3e3e3e;
				font-weight: 700;
			}
		}
	}
</style>
