<template>
	<view v-if="showPage" class="goods_detail">
		<swiper class="detail_swiper" autoplay indicator-dots circular>
			<swiper-item v-for="item in productList" :key="item.id">
				<view class="swiper-item ">
					<image class="img" :src="item.pic" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="container">
			<view @tap="star" class="star">
				<uni-icons type="star" :color="isstar? 'red':'white'" size="30rpx"></uni-icons>
			</view>
			<view class="price_info">
				<view class="current_price">
					<text class="txt">¥</text>{{product.promotionPrice&&product.promotionPrice.toFixed(2)}}
				</view>
				<view class="price">
					¥{{product.price.toFixed(2)}}
				</view>
				<view class="icon">
					<view class="left_icon com_icon">

					</view>
					没有促销使用原价
					<view class="right_icon com_icon">

					</view>
				</view>
			</view>
			<view class="name">
				{{product.name}}
			</view>
			<view class="description">
				{{product.description}}
			</view>
			<view class="detailMobileHtml">
				<mp-html :tag-style="tagStyle" :content="product.detailMobileHtml" />
			</view>
			<view class="footer">
				<uni-icons type="headphones" size="47rpx"></uni-icons>
				<view class="footer_right">
					<view @tap="showMask(false)" class="add_cart">
						加入购物车
					</view>
					<view @tap="showMask(true)" class="buy">
						立即购买
					</view>
				</view>
			</view>
			<!-- 商品规格选择 -->
			<view v-if="isshowMask" class="mask">
				<view class="content">

					<view class="content_header">
						<image class="img" :src="currentProduct.pic" mode=""></image>
						<view class="info">
							<view class="name">
								{{product.name}}
							</view>
							<view class="stock">
								库存数量：{{currentProduct.stock}}
							</view>
						</view>
						<image @tap="cancelMask" class="cancel" src="../../../../static/叉号.png" mode=""></image>
					</view>
					<!-- 商品选择 -->
					<view class="title">
						商品选择
					</view>
					<view @tap="chooseSpecification(item.id)" v-for="item in productList" :key="item.id"
						:class="{active:item.id==currentProduct.id}" class="com_item_style">
						{{item.spStr}}
					</view>
					<!-- 特色服务 -->
					<view class="title">
						特色服务
					</view>
					<view class="com_item_style">
						送货上门
					</view>
					<view class="com_item_style">
						上门安装
					</view>
					<!-- 购买数量 -->
					<view class="title num_info">
						购买数量
						<view class="num_step">
							<view @tap="deductNum" class="deduct com_step_style">
								-
							</view>
							<view class="num">
								{{productQuantity}}
							</view>
							<view @tap="addNum" class="add com_step_style">
								+
							</view>
						</view>
					</view>
					<!-- 确定按钮 -->
					<view @tap="payAndAddCart()" class="btn">
						确定
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		goodsDetailRequest
	} from "@/request/goodsDetailRequest.js"
	import {
		addPreOrder
	} from "@/request/orderRequest.js"
	import {
		addCart
	} from "@/request/cartRequest.js"
	import checkLogin from "@/utils/checkLogin.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				id: '',
				isstar: false,
				showPage: false,
				isshowMask: false,
				ispay: false,
				product: {},
				productList: [],
				currentProduct: {},
				productQuantity: 1,
				tagStyle: {
					img: 'width:100%;height:auto;'
				}
			};
		},
		onLoad(options) {
			this.id = options.id;
			goodsDetailRequest(this.id).then(res => {
				console.log('商品详情', res);
				this.product = res.data.data.product;
				this.productList = res.data.data.product.skuList;
				this.productList.forEach(i => {
					let spData = JSON.parse(i.spData)
					i.spStr = spData.reduce((pre, next) => pre + Object.values(next).join(":") + " ", "")
				})
				this.showPage = true;

				this.currentProduct = this.productList[0];
			})
			//判断是否收藏
			if (this.starStatus() == -1 || this.starStatus() == "noList") {
				this.isstar = false;
			} else {
				this.isstar = true;
			}
		},
		methods: {
			//判断是否收藏
			starStatus() {
				let starList = uni.getStorageSync("starList");
				if (starList) {
					return starList.findIndex(i => i == this.id)
				} else {
					return "noList"
				}
			},
			star() {
				console.log('ok', );
				let status = this.starStatus();
				if (status === "noList") {
					uni.setStorageSync("starList", [this.id])
					this.isstar = true;
				} else {
					let starList = uni.getStorageSync("starList");
					if (status != -1) {
						starList.splice(status, 1);
						this.isstar = false;
					} else {
						starList.push(this.id);
						this.isstar = true;
					}
					uni.setStorageSync("starList", starList)
				}
			},
			showMask(ispay) {
				this.ispay = ispay;
				this.isshowMask = true;
			},
			// 增加/减少商品数量
			deductNum() {
				if (this.productQuantity == 1) {
					return
				} else {
					this.productQuantity--;
				}
			},
			addNum() {
				this.productQuantity++;
			},
			payAndAddCart() {
				if (!checkLogin()) {
					return
				}
				//判断库存是否充足
				if (this.productQuantity > this.currentProduct.stock) {
					toast("error", "库存不足");
					return
				}
				const data = {
					"orderItemList": [{
						"cartId": "",
						"productId": this.currentProduct.productId,
						"productQuantity": this.productQuantity,
						"productSkuId": this.currentProduct.id
					}]
				}
				//判断是购买还是加入购物车
				if (this.ispay) {
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
				} else {
					const params = data.orderItemList[0];
					const newdata = {
						"productId": params.productId,
						"productSkuId": params.productSkuId,
						"quantity": params.productQuantity
					}
					addCart(newdata).then(res => {
						if (res.data.success) {
							toast("success", "已加入购物车")
						}
					})
				}
			},

			chooseSpecification(id) {
				this.currentProduct = this.productList.find(i => i.id == id)
			},

			cancelMask() {
				this.isshowMask = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods_detail {
		background-color: #f1ece7;

		.container {
			position: relative;
			padding: 50rpx;
			padding-bottom: 100rpx;

			.star {
				position: absolute;
				right: 100rpx;
				top: -20rpx;
				width: 42rpx;
				height: 42rpx;
				border-radius: 50%;
				background-color: #354e44;
				;
				z-index: 3;
				text-align: center;
				line-height: 42rpx;
			}
		}

		.detail_swiper {
			height: 500rpx;

			.img {
				width: 100%;
				height: 500rpx;
			}
		}

		.price_info {
			@include flex(nowrap, flex-start);
			align-items: flex-end;

			.current_price {
				font-size: 47rpx;
				color: #f2270c;
				font-family: fantasy;

				.txt {
					font-size: 25rpx;
				}
			}

			.price {
				margin: 0 5rpx;
				color: #b5b5b5;
				font-size: 19rpx;
				font-family: fantasy;
				text-decoration: line-through;
			}

			.icon {
				@include flex();
				align-items: center;
				background-color: #f2270c;
				font-size: 12rpx;
				color: #fff;

				.com_icon {
					width: 3rpx;
					height: 6rpx;
					background-color: #fff;
				}
			}
		}

		.name {
			font-size: 25rpx;
			color: #262626;
			font-weight: 700;
		}

		.description {
			margin: 18rpx 0 50rpx;
			font-size: 19rpx;
			color: #666;
		}


		.footer {
			position: fixed;
			left: 0%;
			bottom: 0%;
			@include flex();
			align-items: center;
			padding: 0 50rpx;
			width: 650rpx;
			height: 95rpx;
			background-color: #fff;

			.footer_right {
				width: 376rpx;
				height: 63rpx;
				@include flex();
				align-items: center;
				font-size: 23rpx;
				text-align: center;
				line-height: 63rpx;

				.add_cart {
					flex: auto;
					color: #8f8f94;
					background-color: #e2e2e2;
				}

				.buy {
					flex: auto;
					color: #fff;
					background-color: #354e44;
				}
			}
		}

		.mask {
			position: fixed;
			left: 0;
			top: 0%;
			right: 0%;
			bottom: 0;
			background-color: rgba(0, 0, 0, .5);
			z-index: 5;

			.content {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 628rpx;
				padding: 56rpx;
				box-sizing: border-box;
				border-radius: 40rpx;
				background-color: #fff;
				color: #3e3e3e;
				font-size: 28rpx;
				z-index: 10;

				.content_header {
					@include flex();
					// height: 100rpx;
					position: relative;
					padding-left: 228rpx;

					.img {
						position: absolute;
						left: 0%;
						top: -100rpx;
						width: 192rpx;
						height: 192rpx;
						background-color: #fff;

					}

					.info {
						.name {
							@include ellipsis;
							width: 260rpx;
						}

						.stock {
							margin-top: 10rpx;
							font-size: 24rpx;
							color: #b0b0b0;
						}
					}

					.cancel {
						width: 42rpx;
						height: 42rpx;
					}
				}

				.title {
					font-weight: 700;
					margin-top: 60rpx;
				}

				.com_item_style {
					box-sizing: border-box;
					margin: 10rpx;
					padding-left: 6rpx;
					height: 56rpx;
					font-size: 26rpx;
					line-height: 56rpx;
					border-radius: 10rpx;
					background-color: #f2f4f3;
				}

				.com_item_style.active {
					border: 2rpx #354e44 solid;
					line-height: 52rpx;
					padding-left: 4rpx;
				}

				.num_info {
					@include flex();
					align-items: center;

					.num_step {
						@include flex();
						width: 246rpx;
						height: 60rpx;

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
							background: #f1ece7;
							line-height: 60rpx;
							text-align: center;
							border-radius: 30rpx;
						}
					}
				}

				.btn {
					margin: 48rpx auto;
					width: 208rpx;
					height: 80rpx;
					color: #fff;
					font-size: 32rpx;
					text-align: center;
					line-height: 80rpx;
					background: #354e44;
					border-radius: 28rpx;
				}
			}
		}
	}
</style>
