$(document).ready(function () {

    $(".pic").each(function (i, obj) {
        var obj = $(obj);
        var objValue = obj.val();
        if (objValue != '' && typeof(objValue) != "undefined" && objValue != undefined) {
            obj.parent().find(".localImag").css('display', 'block');
            obj.parent().find('.preview').attr('src', objValue);
            obj.parent().find('.preview').height(100);
            obj.parent().find('.cancelButton').show();
        } else {
            obj.parent().find(".localImag").css('display', 'none');
            obj.parent().find('.cancelButton').css('display', 'none');
        }
    });
    $("label.error").css('display', 'none');
});

//file 为file流
function setImagePreview(url, file, size) {
    var id = $(file).attr('id');
    if (size && size > 0) {
        if (url.indexOf("?") == -1) {
            url += "?";
        } else {
            url += "&";
        }
        url += "size=" + size;
    }
    upload(id, document.getElementById(id).files[0], url);
    return true;
}

function openBrowse(obj) {
    var ie = navigator.appName == "Microsoft Internet Explorer" ? true : false;
    var $file = $(obj).parent().find("input:file");
    //alert($($file[0]).attr('id'));
    var id = $($file[0]).attr('id');
    if (ie) {
        document.getElementById(id).click();
    } else {
        var a = document.createEvent("MouseEvents");
        a.initEvent("click", true, true);
        document.getElementById(id).dispatchEvent(a);
    }
}

function cleanFile(id) {
    var _file = document.getElementById(id);
    if (_file.files) {
        _file.value = "";
    } else {
        if (typeof _file != "object") return null;
        var _span = document.createElement("span");
        _span.id = "__tt__";
        _file.parentNode.insertBefore(_span, _file);
        var tf = document.createElement("form");
        tf.appendChild(_file);
        document.getElementsByTagName("body")[0].appendChild(tf);
        tf.reset();
        _span.parentNode.insertBefore(_file, _span);
        _span.parentNode.removeChild(_span);
        _span = null;
        tf.parentNode.removeChild(tf);
    }
}

function cancelBrowse(obj) {
    var $file = $(obj).parent().find(".nameImage");
    $(obj).parent().find(".pic").val('');
    $(obj).parent().find(".preview").css('display', 'none');
    $(obj).parent().find(".localImag").css('display', 'none');
    $(obj).parent().find(".cancelButton").hide();
    var fileId = $(obj).parent().find("input[type='file']").attr('id');
    cleanFile(fileId);
}

function upload(fileId, fileSrc, url) {
    var formData = $("<form id='iDataForm' method='post' enctype='multipart/form-data' style='display: none;'></form>");
    formData = new FormData();
    formData.append("fileUpload", fileSrc);
    var file = $('#' + fileId);

    //限制图片类型
    var dataType = $(file).parent().find('.pic').attr("data-type");
    if (dataType && fileSrc && fileSrc.name) {
        var fileSrcName = fileSrc.name;
        var fileNameArr = fileSrcName.split(".");
        if (fileNameArr && fileNameArr.length > 1) {
            var fileSuffix = fileNameArr[fileNameArr.length - 1];
            if (dataType.indexOf(fileSuffix) == -1) {
                file.parent().find('label.error').text("您上传的图片格式不正确，请重新选择!");
                file.parent().find('label.error').show();
                return false;
            }
        }
    }

    //提交图片到服务器
    $.ajax({
        contentType: "multipart/form-data",
        url: url,
        type: "POST",
        data: formData,
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (data) {
            var msg = data.msg;
            var resouceUrl = data.resouceUrl;
            if (msg && msg == 'success' && resouceUrl) {
                $(file).parent().find('.pic').val(resouceUrl);
                var localImagId = $(file).parent().find('.localImag');
                $(file).parent().find('.preview').attr('src', imgSrc);
                $(file).parent().find('.preview').css('display', 'block');
                $(file).parent().find(".localImag").css('display', 'block');
                var docObj = document.getElementById($(file).attr('id'));
                var imgObjPreview = $(file).parent().find('.preview')[0];
                //火狐下，设img属性
                if (docObj.files && docObj.files[0]) {
                    imgObjPreview.style.display = 'block';
                    imgObjPreview.style.height = '100px';
                    imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
                } else {
                    //IE下，使用滤镜
                    docObj.select();
                    var imgSrc = uploadSrc;
                    var localImagId = $(file).parent().find('.localImag');
                    localImagId.style.height = "100px";
                    //图片异常的捕捉，防止用户修改后缀来伪造图片
                    try {
                        $(localImagId).find('.preview').attr('src', imgSrc);
                        $(file).parent().find('.preview').css('display', 'block');
                    } catch (e) {
                        alert("您上传的图片格式不正确，请重新选择!");
                        return false;
                    }
                }
                file.parent().find('label.error').text("");
                file.parent().find('label.error').hide();
                file.parent().find('.cancelButton').show();
            } else {
                file.parent().find('label.error').text(msg);
                file.parent().find('label.error').show();
            }
        },
        error: function (data) {
            file.parent().find('label.error').text(data.msg);
            file.parent().find('label.error').show();
        }
    });
}