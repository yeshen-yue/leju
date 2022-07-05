import uniRequest from '@/request/uniRequest.js'
const header = {
	token: uni.getStorageSync("token")
};

function addCart(data) {
	return uniRequest({
		url: "/lejuClient/cart/addCart",
		method: "post",
		data,
		header
	})
}

function findAllCartItem(data) {
	return uniRequest({
		url: "/lejuClient/cart/findAllCartItem",
		header
	})
}

function delCartItems(data) {
	return uniRequest({
		url: "/lejuClient/cart/delCartItems",
		header,
		method: "post",
		data
	})
}

export {
	addCart,
	findAllCartItem,
	delCartItems

}
