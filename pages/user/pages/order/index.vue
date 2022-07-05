<template>
	<view class="order">
		<view class="order_nav">
			<view @tap="getOrder(0)" :class="{active:currentIndex==0}" class="nav_item">
				待付款
			</view>
			<view @tap="getOrder(1)" :class="{active:currentIndex==1}" class="nav_item">
				已付款
			</view>
			<view @tap="getOrder(2)" :class="{active:currentIndex==2}" class="nav_item">
				已发货
			</view>
			<view @tap="getOrder(3)" :class="{active:currentIndex==3}" class="nav_item">
				已收货
			</view>
			<view @tap="getOrder(4)" :class="{active:currentIndex==4}" class="nav_item">
				售后
			</view>
		</view>
		<!-- 订单列表界面 -->
		<view v-if="currentIndex!=4" class="">
			<view v-if="currentIndex!=4" v-for="item in currentOrderList" :key="item.order.orderId" class="goods_item">
				<view class="order_base">
					订单编号：{{item.order.orderSn}}<text class="txt">{{
						item.order.statusTxt
					}}</text>
				</view>
				<view v-for="it in item.items" :key="it.id" class="goods_item_body">
					<image @tap="getGoodsDetail(it.productId)" class="img" :src="it.productPic" mode=""></image>
					<view class="goods_info">
						<view class="name">
							{{it.productName}}
						</view>
						<view class="productSn">
							编号：{{it.productSn}}
						</view>
						<view class="specification">
							规格：<text v-for="i in JSON.parse(it.productAttr)" :key="i.key">{{i.key}}:{{i.value}}</text>
						</view>
					</view>
					<view class="goods_price">
						<view class="price">
							¥{{it.productPrice}}元
						</view>
						<view class="number">
							x {{it.productQuantity}}
						</view>
					</view>

				</view>
				<view class="item_footer">
					<view class="total">
						<text>支付时间：{{item.order.paymentTime}}</text> <text>合计：{{item.order.totalAmount}}元</text>
					</view>
					<view v-if="currentIndex==0" class="footer_btn">
						<view @tap="cancelOrder(item.order)" class="confirm">
							取消订单
						</view>
						<view @tap="confirmPay(item.order)" class="confirm">
							确认付款
						</view>
					</view>
					<view v-if="currentIndex==2" class="footer_btn">
						<view @tap="returnGoods(item.order)" class="confirm">
							申请退货
						</view>
						<view @tap="confirmGoods(item.order)" class="confirm">
							确认收获
						</view>
					</view>

				</view>
			</view>
		</view>
		<!-- 售后订单 -->
		<view v-else class="">
			<view v-for="item in returnOrderList" :key="item.orderId" class="goods_item">
				<view class="order_base">
					订单编号：{{item.orderSn}}<text class="txt">{{
						item.statusTxt
					}}</text>
				</view>
				<view class="goods_item_body">
					<image @tap="getGoodsDetail(item.productId)" class="img" :src="item.productPic" mode=""></image>
					<view class="goods_info">
						<view class="name">
							{{item.productName}}
						</view>
						<view class="productSn">
							编号：{{item.orderItemId}}
						</view>
						<view class="specification">
							规格：<text v-for="i in JSON.parse(item.productAttr)" :key="i.key">{{i.key}}:{{i.value}}</text>
						</view>
					</view>
					<view class="goods_price">
						<view class="price">
							¥{{item.productPrice}}元
						</view>
						<view class="number">
							x {{item.productCount}}
						</view>
					</view>

				</view>
				<view class="item_footer">
					<view class="total">
						<text>支付时间：{{item.createTime}}</text> <text>合计：{{item.returnAmount}}元</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findAllOrders,
		_clearOrderFocus,
		cancelOrder,
		receiveDone,
		orderReturnApplys
	} from "@/request/orderRequest.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				orderList: [],
				returnOrderList: [],
				currentIndex: 0,
			};
		},
		onLoad(options) {
			this.currentIndex = options.currentIndex;
		},
		onShow() {
			this.updateData();

			orderReturnApplys().then(res => {
				const returnOrderList = res.data.data.items;
				returnOrderList.forEach(i => {
					var text = '等待处理';
					switch (i.status) {
						case '0':
							text = '等待处理';
							break;
						case '1':
							text = '确认退货,等待用户发货';
							break;
						case '2':
							text = '已退款';
							break;
						case '3':
							text = '已拒绝';
							break;
						case '9':
							text = '拒绝退货';
							break;

						default:
							break;
					}
					i.statusTxt = text;
				})
				this.returnOrderList = returnOrderList;

			})
		},
		computed: {
			currentOrderList() {
				let index = this.currentIndex
				if (index != 3 && index != 4) {
					return this.orderList.filter(i => i.order.status == index)
				} else {
					return this.orderList.filter(i => i.order.status == 3 || i.order.status == 4)
				}
			}
		},
		methods: {
			// 更新数据
			updateData() {
				findAllOrders().then(res => {
					let orderList = res.data.data.orderList;
					orderList.forEach(i => {
						switch (i.order.status) {
							case 0:
								i.order.statusTxt = "等待支付";
								break;
							case 1:
								i.order.statusTxt = "已付款，待发货";
								break;
							case 2:
								i.order.statusTxt = "已发货，待收货";
								break;
							case 3:
								i.order.statusTxt = "已收货";
								break;
							case 4:
								i.order.statusTxt = "已退单";
								break;
							default:
								i.order.statusTxt = "无效订单";
								break;
						}
					})
					this.orderList = orderList;
				})
			},
			getOrder(index) {
				this.currentIndex = index;
				console.log('瑞典', this.returnOrderList);
			},
			confirmPay(order) {
				order.orderId = order.id;
				uni.setStorageSync("orderInfo", order)
				uni.navigateTo({
					url: "/pages/user/pages/payment/index"
				})
			},
			cancelOrder(order) {
				cancelOrder({
					orderId: order.id
				}).then(res => {
					if (res.data.success) {
						findAllOrders().then(res => {
							this.orderList = res.data.data.orderList;
						})
					}
				})
			},
			//获取商品详情
			getGoodsDetail(id) {
				uni.navigateTo({
					url: "/pages/category/pages/goodsDetail/index?id=" + id
				})
			},
			// 申请退货
			returnGoods(order) {
				uni.navigateTo({
					url: "/pages/user/pages/returnGoods/index?orderId=" + order.id
				})
			},
			// 确认收货
			confirmGoods(order) {
				receiveDone({
					orderId: order.id
				}).then(res => {
					if (res.data.success) {
						toast("success", "收货成功")
						this.updateData();
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		padding: 80rpx 23rpx;
		background-color: #f1ece7;

		.order_nav {
			position: fixed;
			top: var(--window-top);
			left: 0;
			z-index: 100;
			@include flex(nowrap, space-around);
			width: 100%;
			height: 76rpx;
			font-size: 30rpx;
			background-color: #354e44;
			color: #fff;

			.nav_item {
				width: 20%;
				box-sizing: border-box;
				text-align: center;
				line-height: 76rpx;
			}

			.nav_item.active {
				color: #dd524d;
				border-bottom: 3px solid #dd524d;
				;
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
				@include flex();
				width: 100%;
				font-size: 26rpx;
				margin-bottom: 15rpx;
			}

			.footer_btn {
				width: fit-content;
				@include flex()
			}

			.confirm {
				width: 124rpx;
				height: 50rpx;
				margin-left: 10rpx;
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
