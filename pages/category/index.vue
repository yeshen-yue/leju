<template>
	<view class="category">
		<navigator :url="'/pages/category/pages/categoryDetail/index?id='+categoryIdList[0]">
			<view class="creativity com_style">
				<view class="title">
					创意
				</view>
			</view>
		</navigator>
		<navigator :url="'/pages/category/pages/categoryDetail/index?id='+categoryIdList[1]">
			<view class="style com_style">
				<view class="title">
					风格
				</view>
			</view>
		</navigator>
		<view class="bottom com_style">
			<navigator :url="'/pages/category/pages/categoryDetail/index?id='+categoryIdList[2]">
				<view class="decoration bottom_com_style">
					饰品
				</view>
			</navigator>
			<navigator :url="'/pages/category/pages/categoryDetail/index?id='+categoryIdList[3]">
				<view class="bulb bottom_com_style">
					灯具
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		findCategory,
	} from '@/request/homeRequest.js'
	export default {
		data() {
			return {
				categoryIdList: [],
			};
		},
		onLoad() {
			findCategory().then(res => {
				let categoryList = res.data.data.category.children;
				categoryList.forEach(i => this.categoryIdList.push(i.id))
			})

		}
	}
</script>

<style lang="scss" scoped>
	.category {
		padding: var(--status-bar-height) 40rpx;
		background-color: #f1ece7;
		padding-bottom: 50rpx;

		.com_style {
			height: 302rpx;
			margin: 28rpx auto;
			border-radius: 20rpx;
			@include flex();
			font-size: 48rpx;
			color: #3e3e3e;

			.title {
				padding: 150rpx 0 0 50rpx;

			}

			.img {
				width: 402rpx;
				height: 100%;
			}
		}

		.creativity {
			background: url("https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201118203732237creativity.png") no-repeat 180rpx center/auto 300rpx;
			background-color: #d5d5d5;
		}

		.style {
			background: url("https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201113162204152fengge.png") no-repeat 270rpx 0/contain;
			background-color: #fafafa;
		}

		.bottom {
			height: 442rpx;

			.bottom_com_style {
				width: 312rpx;
				height: 442rpx;
				box-sizing: border-box;
				padding: 150rpx 50rpx;
			}

			.decoration {
				background: url("https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201113162219971zhuangshipin.png") no-repeat 0rpx 100rpx/100% auto;
				background-color: #ffffff;
			}

			.bulb {
				background: url("https://bufan-apitown.oss-cn-beijing.aliyuncs.com/bftec/20201118165103745dengju.png") no-repeat 0 0/cover;
				background-color: #dcdcda;
				border-radius: 20rpx;
			}
		}
	}
</style>
