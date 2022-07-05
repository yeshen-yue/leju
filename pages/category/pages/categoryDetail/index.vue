<template>
	<view class="category_detail">
		<view class="placehold">
		</view>

		<view class="nav">
			<view @tap="toggleTab" data-index="0" class="new nav_item" :class="{active:currentIndex==0}">
				新品
			</view>
			<view @tap="toggleTab" data-index="1" class="sale com_icon nav_item" :class="{active:currentIndex==1}">
				销量
				<view class="icon">
					<uni-icons type="top" :color="saleOrder=='up'? '#dd524d':'#fff'" size="15">
					</uni-icons>
					<uni-icons type="bottom" :color="saleOrder=='down'? '#dd524d':'#fff'" size="15"></uni-icons>
				</view>

			</view>
			<view @tap="toggleTab" data-index="2" class="price com_icon nav_item" :class="{active:currentIndex==2}">
				价格
				<view class="icon">
					<uni-icons type="top" :color="priceOrder=='up'? '#dd524d':'#fff'" size="15">
					</uni-icons>
					<uni-icons type="bottom" :color="priceOrder=='down'? '#dd524d':'#fff'" size="15"></uni-icons>
				</view>
			</view>
			<view @tap="toggleTab" data-index="3" class="sift nav_item" :class="{active:currentIndex==3}">
				筛选
			</view>
		</view>
		<Goods text="不凡" :list="goodsList"></Goods>

	</view>
</template>

<script>
	import Goods from '@/pages/components/goods.vue'
	import {
		findProductList
	} from "@/request/categoryRequest.js"
	export default {
		data() {
			return {
				id: '',
				goodsList: [],
				start: 1,
				isDesc: '',
				sortBy: '',
				currentIndex: "0",
				saleOrder: "default",
				priceOrder: "default",
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getGoodsList()
		},
		// 下拉加载
		onReachBottom() {
			this.start++;
			this.getGoodsList();
		},
		components: {
			Goods
		},
		methods: {
			toggleTab(e) {
				let index = e.currentTarget.dataset.index;
				this.currentIndex = index;
				this.sortBy = '';
				this.goodsList = [];
				this.start = 1
				if (index == 1) {
					this.saleOrder = this.saleOrder == "up" ? 'down' : 'up';
					this.sortBy = 'sale';
					this.getGoodsList();
				} else {
					this.saleOrder = 'default';
				}
				if (index == 2) {
					this.priceOrder = this.priceOrder == "up" ? 'down' : 'up';
					this.sortBy = 'price';
					this.getGoodsList();
				} else {
					this.priceOrder = 'default';
				}
				if (index != 1 && index != 2) {
					this.getGoodsList()
				}
			},
			getGoodsList() {
				if (this.goodsList.length >= this.total && this.goodsList.length != 0) {
					return
				}
				let isDesc;
				if (this.sortBy) {
					isDesc = this.sortBy == 'sale' ?
						(this.saleOrder == 'up' ?
							1 : 0) : (this.priceOrder == 'up' ?
							1 : 0);
				} else {
					isDesc = '';
				}
				const data = {
					categoryId: this.id,
					isDesc,
					sortBy: this.sortBy
				}
				const pathParams = {
					start: this.start,
					limit: 4
				}
				findProductList(data, pathParams).then(res => {
					let list = res.data.data.rows;
					this.total = res.data.data.total;
					list.forEach(i => {
						let temp = i.name;
						i.name = i.brandName;
						i.brandName = temp;
						this.goodsList.push(i);
					})
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.category_detail {
		background-color: #f1ece7;
		padding: 0 40rpx 50rpx;

		.placehold {
			height: 80rpx;
		}

		/* #ifdef MP-WEIXIN */
		.nav {
			top: 0 !important;
		}

		/* #endif */
		.nav {
			position: fixed;
			top: 44px;
			left: 0;
			z-index: 100;
			width: 750rpx;
			@include flex(nowrap, space-around);
			height: 66rpx;
			color: #fff;
			font-size: 30rpx;
			align-items: center;
			background-color: #354e44;

			.active {
				color: #dd524d !important;
			}

			.nav_item {
				width: 25%;
				text-align: center;
			}

			.com_icon {
				@include flex(nowrap, center);
				align-items: center;

				.icon {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-left: 4rpx;
				}
			}


		}
	}
</style>
