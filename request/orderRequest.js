import uniRequest from '@/request/uniRequest.js'
const header = {
	token: uni.getStorageSync("token")
};

function addPreOrder(data) {
	data = {
		"addressId": "",
		"orderId": "",
		"orderItemList": [{
			"cartId": "string",
			"productId": "string",
			"productQuantity": 0,
			"productSkuId": "string"
		}],
		"payType": "",
		"sourceType": "",
		...data
	}
	return uniRequest({
		url: "/lejuClient/order/addPreOrder",
		method: "post",
		header,
		data,
	})
}

function getPreOrderById(pathParams) {
	return uniRequest({
		url: "/lejuClient/order/getPreOrderById/",
		header,
		pathParams,
	})
}

function addConfirmOrder(data) {
	data = {
		"addressId": "",
		"orderId": "",
		"orderItemList": [{
			"cartId": "string",
			"productId": "string",
			"productQuantity": 0,
			"productSkuId": "string"
		}],
		"payType": "",
		"sourceType": "",
		...data
	}
	return uniRequest({
		url: "/lejuClient/order/addConfirmOrder",
		method: "post",
		header,
		data,
	})
}

function payConfirm(data) {
	return uniRequest({
		url: "/lejuClient/order/payConfirm",
		method: "post",
		header,
		data,
	})
}

function findAllOrders(data) {
	return uniRequest({
		url: "/lejuClient/order/findAllOrders",
		header,
	})
}

function _clearOrderFocus(pathParams) {
	return uniRequest({
		url: "/lejuClient/order/_clearOrderFocus?orderId=",
		header,
		method: "post",
		pathParams
	})
}

function cancelOrder(pathParams) {
	return uniRequest({
		url: "/lejuClient/order/cancelOrder/",
		header,
		method: "post",
		pathParams
	})
}
// 确认收货
function receiveDone(data) {
	return uniRequest({
		url: "/lejuClient/order/receiveDone",
		header,
		method: "post",
		data
	})
}
//获取退货地址
function getCompanyAddrss(data) {
	return uniRequest({
		url: "/lejuClient/orderReturn/getCompanyAddrss",
		header,
	})
}
//申请退单
function addOrderReturnApply(data) {
	return uniRequest({
		url: "/lejuClient/orderReturn/addOrderReturnApply",
		header,
		method: "post",
		data
	})
}
//查看退单
function orderReturnApplys() {
	return uniRequest({
		url: "/lejuClient/orderReturn/orderReturnApplys",
		header,

	})
}
export {
	addPreOrder,
	getPreOrderById,
	addConfirmOrder,
	payConfirm,
	findAllOrders,
	_clearOrderFocus,
	cancelOrder,
	receiveDone,
	getCompanyAddrss,
	addOrderReturnApply,
	orderReturnApplys
}
