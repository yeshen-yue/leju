<template>
	<view class="goods_list">
		<view @tap="getDetail(item.id)" class="goods_item" v-for="item in list" :key="item.id">
			<image class="img" :src="item.pic" mode=""></image>
			<view class="info">
				<view class="name">{{item.brandName}}</view>
				<view class="price_info">
					<text>¥{{item.price}}元</text><text>{{text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: ['list', 'text'],
		methods: {
			getDetail(id) {
				uni.navigateTo({
					url: "/pages/category/pages/goodsDetail/index?id=" + id
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.goods_list {
		@include flex(wrap);


		.goods_item {
			width: 49%;
			margin-bottom: 30rpx;
			font-size: 26rpx;
			color: #3e3d3e;
			background-color: #fff;

			.img {
				width: 100%;
				height: 238rpx;
			}

			.info {
				padding: 36rpx;


				.name {
					font-weight: 600;
					margin-bottom: 20rpx;
					@include ellipsis;
				}

				.price_info {
					@include flex();
				}
			}
		}
	}
</style>
