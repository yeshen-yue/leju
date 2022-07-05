<template>
	<view class="article_detail">
		<view class="title">
			{{detail.title}}
		</view>
		<view class="author">
			{{detail.author}}
		</view>
		<view class="createTime">
			{{detail.createTime}}
		</view>
		<view class="summary">
			{{detail.summary}}
		</view>
		<image class="img" :src="detail.coverImg" mode=""></image>
		<view v-html="detail.content1" class="content1">

		</view>
		<view v-html="detail.content2" class="content2">

		</view>
	</view>
</template>

<script>
	import {
		articleDetail
	} from "@/request/exploreRequest.js"
	export default {
		data() {
			return {
				detail: {}
			};
		},
		onLoad(options) {
			articleDetail({
				id: options.id
			}).then(res => {
				this.detail = res.data.data.productArticle;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.article_detail {
		background-color: #f1ece7;
		padding: 60rpx;
		color: #333;
		text-align: left;

		.title {
			color: #000;
			font-size: 24rpx;
			font-weight: 700;
		}

		.author {
			text-align: right;
		}

		.createTime {
			text-align: right;
		}

		.img {
			width: 100%;
			height: 240rpx;
			margin: 40rpx auto;
		}
	}
</style>
