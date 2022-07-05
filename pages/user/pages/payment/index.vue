<template>
	<view class="payment">
		<view class="">
			<text class="title">订单编号：</text>{{orderInfo.orderSn}}
		</view>
		<view class="">
			<text class="title">订单金额：</text>{{orderInfo.totalAmount}}元
		</view>
		<view class="pay_txt">
			请选择支付方式
		</view>
		<radio-group @change="radioChange">
			<view class="row">
				<view class="pay_method">
					<image class="img" src="../../../../static/user_icons/支付宝.png" mode=""></image>
					支付宝支付
				</view>
				<radio checked value="ailpay" />
			</view>

			<view class="row">
				<view class="pay_method">
					<image class="img" src="../../../../static/user_icons/微信.png" mode=""></image>
					微信支付
				</view>
				<radio value="wxpay" />
			</view>
		</radio-group>
		<view class="footer">
			<view @tap="pay" class="btn">
				立即支付
			</view>
			<view class="contract_txt">
				点击立即支付，即代表您同意<text class="txt">《条款协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		payConfirm
	} from "@/request/orderRequest.js"
	import toast from "@/utils/showToast.js"
	export default {
		data() {
			return {
				orderInfo: uni.getStorageSync("orderInfo"),
				payType: 1,
			};
		},
		methods: {
			radioChange(e) {
				this.payType = e.detail.value == "ailpay" ? 1 : 2;
			},
			pay() {
				payConfirm({
					orderId: this.orderInfo.orderId,
					payType: this.payType
				}).then(res => {
					if (res.data.success) {
						uni.removeStorageSync("orderInfo")
						uni.navigateBack({
							delta: 2
						})
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.payment {
		padding: 23rpx;
		background-color: #f1ece7;
		color: #000;
		font-size: 13rpx;

		.title {
			color: #7d7d7d;
		}

		.pay_txt {
			font-size: 14rpx;
			margin-top: 40rpx;
		}

		.row {
			@include flex();
			font-size: 12rpx;

			.pay_method {
				.img {
					width: 34rpx;
					height: 34rpx;
				}
			}
		}

		.footer {
			margin-top: 8rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;

			.btn {
				width: 70%;
				height: 34rpx;
				border-radius: 34rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				background-color: #354e44;
				box-shadow: 0px 2px 4px rgba(0, 0, 0, .2);
			}

			.contract_txt {
				margin-top: 4px;
				width: 100%;
				font-size: 10px;
				color: #999;
				text-align: center;

				.txt {
					color: #5a9ef7;
				}
			}
		}
	}
</style>
