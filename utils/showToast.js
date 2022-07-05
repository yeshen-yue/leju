export default function(icon, title, duration = 500) {
	uni.showToast({
		title,
		icon,
		duration
	});
}
