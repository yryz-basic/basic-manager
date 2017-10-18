



function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	var cookies= name + "=" + escape(value) + ";expires="+exp.toGMTString()+";path=/";
	document.cookie = cookies;
}

function getCookie(cookieName) {
	var cookieValue = document.cookie;
	var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
	if (cookieStartAt == -1) {
		cookieStartAt = cookieValue.indexOf(cookieName + "=");
	}
	if (cookieStartAt == -1) {
		cookieValue = null;
	} else {
		cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
		cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
		if (cookieEndAt == -1) {
			cookieEndAt = cookieValue.length;
		}
		cookieValue = unescape(cookieValue
				.substring(cookieStartAt, cookieEndAt));
	}
	if(cookieValue == "null"){
		cookieValue = null;
	}
	return cookieValue;
}

function delCookie(name) {
	setCookie(name,null);
}


function getArray(array,value){
	var dataArray = []; 
	for(var i=0; i<array.length; i++){
		if(array[i] != value){
			dataArray.push(array[i]);
		}
	}
	return dataArray;
}
