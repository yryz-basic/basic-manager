function resetSort() {
	//debugger;
	$("table tbody tr").each(function(index, obj) {
		$($(obj).find('td :eq(0)')).text(index + 1);
	})
}

function up() {
	$.each($("table .td_ground"), function() {
		var obj = $(this);
		var up = obj.prev();
		if ($(up).has("td").size() == 0) {
			alert("顶级元素不能上移");
			return;
		}
		$(obj).after(up);
		resetSort();
	});
}

$(document).ready(function() {
	$("table tr").click(function() {
		if ($(this).has("td").size() > 0) {
			$(this).addClass('td_ground');
			$(this).siblings().removeClass("td_ground");
		}
	})
});

function down() {
	$.each($("table .td_ground"), function() {
		var obj = $(this);
		var down = obj.next();

		if ($(down).has("td").size() == 0) {
			alert("最尾部了");
			return;
		}
		$(down).after(obj);
		resetSort();
	});
}

function release(url) {
	//alert("url :"+url);
	var arr = [];
	$("table tbody tr").each(function(index, obj) {
		var data = $($(obj).find('td :eq(0)')).attr('suffix');
		arr.push(data);
	})
	var str = "";
	for (var i = 0; i < arr.length; i++) {
		if (i < arr.length - 1) {
			str = str + "param="+arr[i] + "&";
		} else {
			str = str + "param="+ arr[i]
		}
	}
	if(str==""){
		alert("无数据");
		return false;
	}
	
	window.location.href = url+"?"+str;
	console.info(str);
}