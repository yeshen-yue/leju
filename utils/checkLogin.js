export default function() {
	let token = uni.getStorageSync("token");
	if (!token) {
		uni.showModal({
			title: '提示',
			content: '尚未登录，是否前往登录',
			success: function(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: "/pages/user/pages/login/index"
					})
				}
			}
		});
	}
	return token ? true : false
}
