/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

// 用户名正则，4到16位（字母，数字，下划线，减号）
export function validUsername(str) {
	const pattern = /^[a-zA-Z0-9_-]{4,16}$/
	return pattern.test(str)
}


// 校验密码：只能输入6-20个字母、数字、下划线  
export function validUserPwd(str) {
	const pattern = /^(\w){6,20}$/;
	return pattern.test(str)
}
