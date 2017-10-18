$(document).ready(function() {
	initPics();
	$("label.error").css('display', 'none');
});


//pics为最大图片数量
function setImagePreview1(url, file, pics) {
	if (pics == undefined || pics == '' || pics == 'undefined' || null == pics) {
		pics = 1;
	}
	var id = $(file).attr('id');
	upload1(id, document.getElementById(id).files[0], url, pics);
	var uploadSrc = "";
	return true;
}

function openBrowse1(obj) {
	var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
	var $file = $(obj).parent().find("input:file");
	var id = $($file[0]).attr('id');
	
	if (ie) {
		document.getElementById(id).click();
	} else {
		var a = document.createEvent("MouseEvents");
		a.initEvent("click", true, true);
		document.getElementById(id).dispatchEvent(a);
	}
}



function cancelBrowse1(obj) {
	var $file = $(obj).parent().find(".nameImage");
	$(obj).parent().find(".pic").val('');
	$(obj).parent().find(".preview").css('display', 'none');
	$(obj).parent().find(".localImag").css('display', 'none');
	$(obj).parent().find("[name='xx']").css('display', 'none');
	$(obj).parent().find(".cancelButton").hide();
	cleanFile(fileId);
}


function upload1(fileId, fileSrc, url, pics) {
	
	var formData = $("<form id='iDataForm' method='post' enctype='multipart/form-data' style='display: none;'></form>");
	formData = new FormData();
	formData.append("fileUpload", fileSrc);

	var file = $('#' + fileId);
	var arr = $(file).parent().find('.pic').val().split(",");
	var count = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] != '') {
			count = count + 1;
		}
	}
	//多张图片需要判断
	if (count >= pics && pics > 1) {
		alert("图片不可超过" + pics + "张");
		return;
	}
	$.ajax({
		contentType : "multipart/form-data",
		url : url,
		type : "POST",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		success : function(data) {
			var msg = data.msg;
			$(file).parent().find('.preview').remove();
			$(file).parent().find('[name="xx"]').remove();
			if (msg == 'success') {
				$(file).parent().find("label.error").css('display', 'none');
				
				if ($(file).parent().find('.pic').val() == '') {
					$(file).parent().find('.pic').val(data.resouceUrl);
				} else if ($(file).parent().find('.pic').val() != ''
						&& pics == 1) {
					$(file).parent().find('.pic').val(data.resouceUrl);
				} else if ($(file).parent().find('.pic').val() != ''
						&& pics > 1) {
					$(file).parent().find('.pic').val(
							$(file).parent().find('.pic').val() + ","
									+ data.resouceUrl);
				}
				initDiv($(file));
				file.parent().find('.cancelButton').show();
			} else {
				file.parent().find('.pic').text(msg);
				file.parent().find('.pic').show();
				file.parent().find('.localImag').css('display', 'none');
				file.parent().find('.cancelButton').hide();
			}
		},
		error : function(data) {
			console.info(data);
		}
	});

}

function initDiv(obj) {
	var arr = obj.parent().find('.pic').val().split(",");
	obj.parent().find('.preview').remove();
	obj.parent().find('[name="xx"]').remove();
	// 一共有多少页
	var totalPage = (arr.length - 1) / 3 + 1;
	for (var j = 0; j < totalPage; j++) {
		var str = "<div name='xx' style='Margin:10px'>";
		var kk = "";
		for (var i = j * 3; i < (j + 1) * 3 && i < arr.length; i++) {
			kk += "<span><img class='preview' width = '200px' height = '125px' id="
					+ i
					+ " src="
					+ arr[i]
					+ " /></span><span name='spanClick' onclick='func("
					+ i
					+ ",this)' style='cursor:pointer;vertical-align:top;Margin-left:0%;Margin-right:1%;width:15px;height:20px;border:1px solid black;border-radius:50px;background-color:black;'><font style='padding:5px;vertical-align:top;' color='white' size='1.5px'>x</font></span>";
		}
		str = str + kk + "</div>";
		obj.parent().append(str);
	}
	var docObj = document.getElementById($(file).attr('id'));
	var imgObjPreview = obj.parent().find('.preview');
}

function func(t, obj) {
	var str = $(obj).parent().parent().children('.pic').val();
	var strs = str.split(",");
	var array = [];
	for (var j = 0; j < strs.length; j++) {
		if (t == j) {
			strs[j] = "";
		} else {
			array.push(strs[j]);
		}
	}
	var url = "";
	for (var j = 0; j < array.length; j++) {
		if (j < array.length - 1) {
			url = url + array[j] + ",";
		} else {
			url = url + array[j];
		}
	}

	$(obj).parent().parent().children('.pic').val(url);
	$(obj).prev().remove();
	$(obj).remove();
	
	initPics();
}


function initPics(){
	$(".pic").each(function(i, obj) {
		var obj = $(obj);
		var objValue = obj.val();
		if (objValue != '' && typeof (objValue) != "undefined" && objValue != undefined) {
			var array = objValue.split(',');
			for (var i = 0; i < array.length; i++) {
				
				initDiv(obj);
			}
		}else{
			obj.parent().find('.cancelButton').css('display', 'none');
		}
});
}
