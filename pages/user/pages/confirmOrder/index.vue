<template>
	<view class="confirm_order">
		<!-- 收获地址 -->
		<view class="address">
			<view v-if="orderAddress" class="row">
				<navigator class="row" url="/pages/user/pages/address/allAddress?order=true">
					<view class="info">
						<view class="name">
							{{orderAddress.name}}<text class="txt">{{orderAddress.phoneNumber}}</text>
						</view>
						<view class="address_info">
							{{orderAddress.addressInfo}}
						</view>
					</view>
				</navigator>
			</view>
			<navigator v-else url="/pages/user/pages/address/allAddress?order=true" class="choose_address">选择地址
			</navigator>
		</view>
		<!-- 商品详情 -->
		<view class="goods_item">
			<view class="order_base">
				订单编号：{{orderBase.orderSn}}<text class="txt">等待支付</text>
			</view>
			<view v-for="item in orderItems" :key="item.id" class="goods_item_body">
				<image class="img" :src="item.productPic" mode=""></image>
				<view class="goods_info">
					<view class="name">
						{{item.productName}}
					</view>
					<view class="productSn">
						编号：{{item.productSn}}
					</view>
					<view class="specification">
						规格：<text v-for="i in item.productAttr" :key="i.key">{{i.key}}:{{i.value}}</text>
					</view>
				</view>
				<view class="goods_price">
					<view class="price">
						¥{{item.productPrice}}元
					</view>
					<view class="number">
						x {{item.productQuantity}}
					</view>
				</view>

			</view>
			<view class="item_footer">
				<view class="total">
					合计：{{orderBase.totalAmount}}元
				</view>
				<view @tap="confirmPay" class="confirm">
					确认付款
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById,
		addConfirmOrder
	} from "@/request/orderRequest.js"
	export default {
		data() {
			return {
				orderId: '',
				orderBase: {},
				orderItems: [],
				orderAddress: null,
			};
		},
		onLoad(options) {
			const orderId = options.orderId;
			this.orderId = orderId;
			getPreOrderById({
				orderId
			}).then(res => {
				const {
					orderBase,
					orderItems
				} = res.data.data;
				orderItems.forEach(i => i.productAttr = JSON.parse(i.productAttr))
				this.orderBase = orderBase;
				this.orderItems = orderItems;
				console.log('', res);
			})
		},
		onShow() {
			this.orderAddress = uni.getStorageSync("orderAddress")
		},
		methods: {
			confirmPay() {
				addConfirmOrder({
					"addressId": this.orderAddress.id,
					"orderId": this.orderBase.id,
					orderItemList: this.orderItems
				}).then(res => {
					const {
						data,
						success
					} = res.data;
					if (success) {
						console.log("订单确认")
						uni.setStorageSync("orderInfo", data)
						uni.navigateTo({
							url: "/pages/user/pages/payment/index"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm_order {
		background-color: #f1ece7;
		padding: 40rpx;

		.row {
			padding: 20rpx;
			width: 100%;
			@include flex();

			.info {
				font-size: 24rpx;
				width: calc(100% - 82rpx);
			}


		}

		.goods_item {
			padding: 36rpx;
			margin: 20rpx 0;
			border-radius: 24rpx;
			background-color: #fff;
			font-size: 24rpx;
			color: #3e3e3e;

			.order_base {
				@include flex();

				.txt {
					color: #034c46;
				}
			}

			.goods_item_body {
				padding: 20rpx 0;
				@include flex();
				align-items: center;
				font-size: 22rpx;
				color: #8d8d8d;

				.img {
					width: 162rpx;
					height: 162rpx;
				}

				.goods_info {
					width: 270rpx;

					.name {
						color: #3e3e3e;
						font-size: 26rpx;
					}

					.specification {
						@include flex(wrap);
					}
				}

				.goods_price {
					.price {
						color: #3e3e3e;
						font-size: 26rpx;
					}

					.number {
						margin-top: 20rpx;
						text-align: right;
					}
				}

			}

			.item_footer {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
			}

			.total {
				font-size: 26rpx;
				margin-bottom: 15rpx;
			}

			.confirm {
				width: 124rpx;
				height: 50rpx;
				border: 1px solid #2d4f43;
				font-size: 26rpx;
				border-radius: 10rpx;
				color: #2d4f43;
				text-align: center;
				line-height: 50rpx;
			}
		}
	}
</style>
