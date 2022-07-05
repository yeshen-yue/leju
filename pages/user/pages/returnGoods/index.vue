<template>
	<view class="return_goods">
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
						规格：<text v-for="i in item.productAttr">{{i.key}}:{{i.value}}</text>
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
			</view>

		</view>
		<view class="return_info">
			<view class="row">
				请选择退单数量：<text>1</text>
			</view>
			<view class="row">
				请输入退货原因：<input v-model="reason" class="ipt" type="text" placeholder="请输入退货原因"
					placeholder-style="line-height:30rpx;text-align:right;font-size:24rpx;">
			</view>
			<view class="row">
				请选择退货地址
				<!-- <input class="ipt" type="text" disabled placeholder="选择退货地址"
					placeholder-style="line-height:30rpx;text-align:right;font-size:24rpx;"> -->
				<picker class="ipt" mode="selector" :range="address" range-key="addressName" @change="chooseAddress">
					<view>{{companyAddressId||"点击选择退货地址"}}</view>
				</picker>
			</view>
			<view class="special_row">
				请输入问题描述<textarea v-model="description" class="txtarea" placeholder="问题描述"
					placeholder-style="text-align:right;font-size:24rpx;"></textarea>
			</view>
			<view class="tip">
				<view class="txt">
					温馨提示：
				</view>
				上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张
			</view>
			<view class="img_list">
				<view @tap="addImg" class="add_img img_item">
					<image class="img" src="../../../../static/user_icons/jia.png" mode=""></image>
					上传图片
				</view>
				<image class="img_item" v-for="item in imgList" :key="item" :src="item" mode=""></image>
			</view>
			<view @tap="submit" class="submit_btn">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById,
		getCompanyAddrss,
		addOrderReturnApply
	} from "@/request/orderRequest.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				order: {},
				orderBase: {},
				orderItems: [],
				address: [],
				companyAddressId: '',
				description: '',
				reason: '',
				imgList: [],
				orderId: ''
			};
		},
		onLoad(options) {
			this.orderId = options.orderId;
			getPreOrderById({
				orderId: options.orderId
			}).then(res => {
				console.log('', res);
				const orderItems = res.data.data.orderItems;
				orderItems.forEach(i => i.productAttr = JSON.parse(i.productAttr))
				this.orderItems = orderItems;
				this.orderBase = res.data.data.orderBase;
			})
			//获取退货地址
			getCompanyAddrss().then(res => {
				this.address = res.data.data.items;
				console.log(this.address);
			})
		},
		methods: {
			chooseAddress(e) {
				const i = e.detail.value;
				this.companyAddressId = this.address[i].addressName;
			},
			addImg() {
				let _this = this;
				uni.chooseImage({
					success(res) {
						console.log('体育', res);
						if (res.tempFiles.some(i => i.size > 1024 * 1024)) {
							toast("error", "单个图片大小不能超过1M")
							return
						}
						if (res.tempFiles.length + _this.imgList.length > 3) {
							toast("error", "上传图片数量不能超过3")
							return
						}
						/* res.tempFilePaths.forEach(i => {
							const p = new Promise((resolve, reject) => {
								resolve(i)
							})
							_this.imgList.push(p)
						}) */
						_this.imgList.push(...res.tempFilePaths)
					}
				})
			},
			submit() {
				const imgList = [];
				this.imgList.forEach(i => {
					const p = new Promise((resolve, reject) => {
						uni.uploadFile({
							url: "https://leju.bufan.cloud/lejuClient/orderReturn/uploadImg",
							name: "file",
							filePath: i,
							success(res) {
								console.log('上传ok', res);
								console.log('path', JSON.parse(res.data).data.fileUrl);
								resolve(JSON.parse(res.data).data.fileUrl)
							}
						})
					});
					imgList.push(p)
				})
				Promise.all(imgList).then(res => {
					// 准备发送退单ajax
					const proofPics = res.join(",")
					const data = {
						companyAddressId: this.companyAddressId,
						count: 1,
						description: this.description,
						orderId: this.orderId,
						proofPics,
						reason: this.reason,
						orderItemId: this.orderItems[0].id,
					}
					console.log('退单参数', data);
					addOrderReturnApply(data).then(res => {
						if (res.data.success) {
							toast("success", "退单成功，1s后返回订单页面");
							let timer = setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
								clearTimeout(timer)
							}, 1000)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.return_goods {
		padding: 30rpx;
		background-color: #f1ece7;

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
						@include flex(wrap, flex-start);
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

		.return_info {
			background-color: #fff;
			font-size: 24rpx;
			padding: 30rpx;

			.row {
				@include flex();
				align-items: center;
				height: 90rpx;

				.ipt {
					height: 100%;
				}
			}

			.special_row {
				@include flex();
				align-items: flex-start;
				padding-top: 30rpx;

				.txtarea {
					height: 150rpx;
				}
			}
		}

		.tip {
			font-size: 12rpx;
			margin-bottom: 10rpx;

			.txt {
				font-weight: 700;
			}
		}

		.img_list {
			@include flex(nowrap, flex-start);

			.img_item {
				width: 120rpx;
				height: 120rpx;
			}
		}

		.add_img {
			font-size: 12rpx;
			text-align: center;

			.img {
				display: block;
				margin: 20rpx auto;
				width: 58rpx;
				height: 58rpx;
			}
		}

		.submit_btn {
			margin: 50rpx auto;
			width: 536rpx;
			height: 94rpx;
			font-size: 30rpx;
			text-align: center;
			line-height: 94rpx;
			background: #354e44;
			color: #fff;
			border-radius: 14px;
		}
	}
</style>
