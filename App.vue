<script>
	export default {
		onLaunch: function() {
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.globalData.statusbarH = res.statusBarHeight;
				}
			})
		},
		onShow: function() {

		},
		onHide: function() {},
		globalData: {
			statusbarH: 0,
		}
	}
</script>

<style>
	/*每个页面公共css */
	* {
		padding: 0;
		margin: 0;
	}

	uni-page-body,
	page {
		background-color: #f1ece7;
		height: 100% !important;
	}
</style>
