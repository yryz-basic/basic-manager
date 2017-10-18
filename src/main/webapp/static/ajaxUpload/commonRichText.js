var ue = UE.getEditor('editor', {
	toolbars : [ [ 'fullscreen', 'source', 'undo', 'redo' ] ]
});

var basepath = "/upload/rrzUploadInfo/";

function openBrowse1(obj) {
	var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
	var $file = $(obj).parent().find("input:file");
	var id = $($file[0]).attr('id');
	debugger;
	if (ie) {
		document.getElementById(id).click();
	} else {
		var a = document.createEvent("MouseEvents");
		a.initEvent("click", true, true);
		document.getElementById(id).dispatchEvent(a);
	}
}

//重写了openBrowse1
function openLimitedBrowse(obj, imgLimit, videoLimit) {
	 var selVal = parseInt($('#uploadSelect').val());
   if (!imgLimit) {
       imgLimit = 1;
   }
   if (!videoLimit) {
       videoLimit = 1;
   }
   //验证图片张数
   if(selVal==0){
   	var html = ue.getContent();
   	var regex = new RegExp("<img", "g"); // 使用g表示整个字符串都要匹配
   	var result = html.match(regex);
   	var count = !result ? 0 : result.length;
   	if (count >= imgLimit) {
   		alertx("最多上传" + imgLimit + "张图片");
   		return false;
   	}
   }
   //验证视频个数
   if(selVal==3){
   	regex = new RegExp("<video", "g"); // 使用g表示整个字符串都要匹配
   	var htmlVideo =ue.getPlainTxt();
   	result = htmlVideo.match(regex);
   	count = !result ? 0 : result.length;
   	if (count >= videoLimit) {
   		alertx("最多上传" + videoLimit + "个视频");
   		return false;
   	}
   }
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


function setImagePreview1(ctx,file,loc) {
	var path;
	var selVal = parseInt($('#uploadSelect').val());
	var param = loc ? loc : "";
	if (selVal == 0) {
		path = ctx + basepath + "uploadImg"+param;
	}
	if (selVal == 2) {
		path = ctx + basepath + "uploadAudio";
	}
	if (selVal == 3) {
		path = ctx + basepath + "uploadVideo";
	}
	var id = $(file).attr('id');
	upload1(id, document.getElementById(id).files[0], path);
	var uploadSrc = "";
	return true;
}
function upload1(fileId, fileSrc, url) {
	debugger;
	var formData = $("<form id='iDataForm' method='post' enctype='multipart/form-data' style='display: none;'></form>");
	formData = new FormData();
	formData.append("fileUpload", fileSrc);

	var file = $('#' + fileId);

	$.ajax({
		contentType : "multipart/form-data",
		url : url,
		type : "POST",
		data : formData,
		dataType : "json",
		processData : false,
		contentType : false,
		success : function(data) {
			var selVal = parseInt($('#uploadSelect').val());
			if (data.msg == "success") {
				var str = "";
				if (selVal == 0) {
					str = "<img src='" + data.resouceUrl + "'/>";
				}
				if (selVal == 3) {
					str = "<video width='200px' src='" + data.videoResouceUrl
					+ "' controls = '"+data.resouceUrl+"'></video>";
				}
				if (selVal == 2) {
					str = "<audio controls='controls' src='" + data.resouceUrl
							+ "'>" + data.durationTime + "</audio>";
				}
				ue.setContent(str, true);
			} else {
                alertx(data.msg);
            }
			
		},
		error : function(data) {
			debugger;
			console.info(data);
		}
	});
}

function countSubstr(str,substr){
    var count;
    var reg="/"+substr+"/gi";    //查找时忽略大小写
    reg=eval(reg);
    if(str.match(reg)==null){
            count=0;
    }else{
            count=str.match(reg).length;
    }
    return count;
    //返回找到的次数
}