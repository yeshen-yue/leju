<template>
	<view class="cart_page">
		<checkbox-group @change="changeChecked" name="">
			<view v-for="item in cartList" :key="item.id" class="goods_item">
				<view class="goods_body">
					<label>
						<checkbox :checked="item.ischecked" :value="item.productId" /><text></text>
					</label>
					<image class="img" :src="item.productPic" mode=""></image>
					<view class="goods_info">
						<view class="goods_name">
							{{item.productName}}
						</view>
						<view class="product_skuId">
							<text>编号:{{item.productSkuId}}</text>
							<text>价格:{{item.price}}</text>
						</view>
						<view class="num">
							数量：{{item.quantity}}
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="num_step">
						<view @tap="deductNum(item)" class="deduct com_step_style">
							-
						</view>
						<view class="num">
							{{item.quantity}}
						</view>
						<view @tap="addNum(item)" class="add com_step_style">
							+
						</view>
					</view>
				</view>
			</view>
		</checkbox-group>
		<view v-if="cartList.length!=0" class="footer_bar">
			<checkbox-group @change="doAllChecked">
				<label>
					<checkbox value="cb" :checked="allChecked" />全选
				</label>
			</checkbox-group>
			<text>合计: ¥{{totalPrice}}</text>
			<view @tap="pay" class="pay_btn">
				结算
			</view>
		</view>
		<view v-else class="">
			购物车空空如也，快去购物吧！
		</view>
	</view>
</template>

<script>
	import {
		findAllCartItem,
		delCartItems
	} from "@/request/cartRequest.js"
	import {
		addPreOrder
	} from "@/request/orderRequest.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				cartList: [],
			};
		},
		onShow() {
			this.getCartList();
		},
		computed: {
			allChecked: {
				get() {
					return this.cartList.every(i => i.ischecked)
				},
				set(val) {
					this.cartList.forEach(i => i.ischecked = val);
				}
			},
			totalPrice() {
				return this.cartList.reduce((pre, next) => next.ischecked ? pre + next.quantity * next.price : pre, 0)
			}
		},
		methods: {
			// 获取购物车数据
			getCartList() {
				findAllCartItem().then(res => {
					const {
						data,
						success
					} = res.data;
					console.log('购物车详情数目', data.items);
					if (success) {
						data.items.forEach(i => i.ischecked = false);
						this.cartList = data.items
					}
				})
			},
			changeChecked(e) {
				this.cartList.forEach(i => {
					let index = e.detail.value.indexOf(i.productId);
					i.ischecked = index == -1 ? false : true;
				})
			},
			deductNum(item) {
				if (item.quantity == 1) {
					let _this = this;
					uni.showModal({
						content: '确定要从购物车中删除该商品吗？',
						success: function(res) {
							if (res.confirm) {
								delCartItems([item.id]).then(res => {
									if (res.data.success) {
										_this.getCartList();
										toast("success", "删除成功")
									}
								})
							}
						}
					});

					return
				} else {
					item.quantity--;
				}
			},
			addNum(item) {
				item.quantity++;
			},
			doAllChecked() {
				this.allChecked = !this.allChecked;
			},
			pay() {
				let orderItemList = this.cartList.filter(i => i.ischecked).map(i => {
					i.cartId = i.id;
					i.productQuantity = i.quantity
					return i;
				})
				console.log('orderItemList', orderItemList);
				const data = {
					orderItemList
				}
				addPreOrder(data).then(res => {
					const data = res.data;
					if (data.success) {
						uni.navigateTo({
							url: "/pages/user/pages/confirmOrder/index?orderId=" + data.data.orderId
						})
					} else {
						toast("error", "库存不足")
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart_page {
		padding: 50rpx 40rpx 10rpx;
		background-color: #f1ece7;

		.goods_item {
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx;
			margin-bottom: 50rpx;
			font-size: 22rpx;
			color: #8d8d8d;

			.goods_body {
				@include flex(nowrap, flex-start);
				align-items: center;

				.img {
					width: 136rpx;
					height: 136rpx;
					margin: 0 15rpx;
					flex-shrink: 0;
				}

				.goods_info {
					width: 430rpx;

					.goods_name {
						@include ellipsis;
						font-size: 26rpx;
					}

					.product_skuId {
						width: 100%;
						@include flex(wrap);
					}
				}
			}

			.footer {
				display: flex;
				justify-content: flex-end;
			}

			.num_step {
				@include flex();
				width: 246rpx;
				height: 60rpx;
				margin-left: 100%;

				.com_step_style {
					background: #f1ece7;
					width: 60rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 50%;
				}

				.num {
					width: 90rpx;
					height: 60rpx;
					margin: 0 10rpx;
					background: #f1ece7;
					line-height: 60rpx;
					text-align: center;
					border-radius: 30rpx;
				}
			}

		}

		.footer_bar {
			position: fixed;
			left: 0%;
			bottom: 0;
			height: 100rpx;
			width: 100%;
			@include flex(nowrap, space-around);
			align-items: center;
			font-size: 16rpx;

			.pay_btn {
				width: 208rpx;
				height: 80rpx;
				background: #354e44;
				border-radius: 14rpx;
				color: #fff;
				font-size: 36rpx;
				line-height: 80rpx;
				text-align: center;
			}
		}
	}
</style>
