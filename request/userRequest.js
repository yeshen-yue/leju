import uniRequest from '@/request/uniRequest.js'
const token = uni.getStorageSync('token');

function register(data) {
	let Data = {
		birthday: "",
		city: "",
		email: "",
		growth: 0,
		historyIntegration: 0,
		icon: data.icon,
		integration: 0,
		isDisabled: 0,
		memberLevelId: "",
		nickname: data.nickname,
		password: data.password,
		personalizedSignature: "",
		phone: data.phone,
		realname: "",
		sex: 0,
		sourceType: 0,
		status: 1,
		username: data.username,
		wxOpenId: "",
	}
	return uniRequest({
		url: "/lejuClient/member/register",
		method: "post",
		data: Data,
	})
}

function login(data) {
	return uniRequest({
		url: "/lejuClient/login/doLogin",
		method: "post",
		data,
	})
}

function getMemberInfo() {
	return uniRequest({
		url: "/lejuClient/login/getMemberInfo",
		header: {
			token
		}
	})
}

function updateMemberInfo(data) {
	const Data = {
		"birthday": "",
		"city": "",
		"email": "",
		"icon": "string",
		"id": "string",
		"nickname": "string",
		"personalizedSignature": "",
		"phone": "",
		"sex": 0,
		...data
	}
	return uniRequest({
		url: "/lejuClient/member/updateMemberInfo",
		header: {
			token
		},
		method: "post",
		data: Data
	})
}

function findAllAddress() {
	return uniRequest({
		url: "/lejuClient/address/findAllAddress",
		header: {
			token
		}
	})
}

function addAddress(data) {
	data = {
		"city": "string",
		"cityCode": "string",
		"createTime": "",
		"defaultStatus": 0,
		"detailAddress": "string",
		"id": "",
		"memberId": "",
		"modifyTime": "",
		"name": "string",
		"phoneNumber": "string",
		"postCode": "",
		"province": "string",
		"region": "string",
		"tag": "",
		...data
	}
	return uniRequest({
		url: "/lejuClient/address/addAddressInfo",
		header: {
			token
		},
		data,
		method: "post"
	})
}

function updateAddressInfo(data) {
	data = {
		"city": "string",
		"cityCode": "string",
		"createTime": "",
		"defaultStatus": 0,
		"detailAddress": "string",
		"id": "",
		"memberId": "",
		"modifyTime": "",
		"name": "string",
		"phoneNumber": "string",
		"postCode": "",
		"province": "string",
		"region": "string",
		"tag": "",
		...data
	}
	return uniRequest({
		url: "/lejuClient/address/updateAddressInfo",
		header: {
			token
		},
		data,
		method: "post"
	})
}

function defaultAddress(pathParams) {
	return uniRequest({
		url: "/lejuClient/address/switchDefault/",
		header: {
			token
		},
		pathParams,
		method: "post"
	})
}

function delAddressInfo(data) {
	return uniRequest({
		url: "/lejuClient/address/delAddressInfo/",
		method: "post",
		data,
	})
}
export {
	register,
	login,
	getMemberInfo,
	findAllAddress,
	addAddress,
	defaultAddress,
	updateAddressInfo,
	updateMemberInfo

}
