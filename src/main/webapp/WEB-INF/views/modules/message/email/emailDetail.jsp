<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<title></title>
<meta name="decorator" content="default" />
<script type="text/javascript">
	
	$(document).ready(function() {
        //初始化一个发件人信息
	    createSendDiv();

		//验证规则
		var validateForm = $("#searchForm").validate({
			rules : {
				clientCode : {
					required: true,
					maxlength:50,
					remote : {
						url : "${ctx}/client/checkClientCode",
						type: "post",
						dataType: "json",
						data : {
							clientCode : function(){
								return $("#clientCode").val();
							},
							id : function(){
								return $("#id").val();
							}
						}
					}
				},
				note : {
					required: true,
					maxlength:100
				},
				effectiveTime : {
					required: true
				},
				expiryTime : {
					required: true
				},
				
			},
			messages : {
				clientCode : {
					required: "请输入客户端编码",
					maxlength: "客户端编码最大50位",
					remote : "客户端编码已存在"
				},
				note : {
					required: "请输入客户端名称",
					maxlength:"客户端名称最大100"
				},
				effectiveTime : {
					required: "请输入生效日期"
				},
				expiryTime : {
					required: "请输入失效日期"
				}
			}
		});

		//保存按钮
		$("#btnSubmit").click(function(){
			if (!validateForm.form()) {
				return;
			}
			var r = confirm('是否确认保存');
			if(r){
				$.ajax({
		            type:"post",
		            url:"${ctx}/client/save",
		            dataType:"json",
		            data:$("#searchForm").serialize(),
		            success:function(data){
		            	if(data == 1){
							alert("保存成功");
							window.location.href = "${ctx}/client/list";
						}else{
							alert("保存失败");
						}
		            }
		        });
			}
			
		});

		//发件人账号
		$("#account").select2({
            language: "zh-CN",
            minimumInputLength: 1,
            placeholder: "-- 请输入昵称搜索 --",
            tags: true,
            multiple: true,
            ajax: {
                url : "",
                dataType: "json",
                delay: 500,
                data: function (params) {
                    return {nickname: params.term};
                },
                processResults: function (res, params) {
                    var options = [];
                    $(res).each(function (index, r) {
                        var option = {"id": r.key, "text": r.value};
                        options.push(option);
                    });
                    return {
                        results: options
                    };
                },
                escapeMarkup: function (m) {
                    return m;
                }
            }
        });

	});

	//创建发件人div
	function createSendDiv(){
	    var html = '\
	        <div style="margin-left: 160px; margin-top: 10px;">\
                <input type="text" placeholder="发件人账号">\
                <input type="password" placeholder="发件人密码">\
                <input type="text" placeholder="smtp服务器地址">\
                <input type="hidden" value="true">\
                <input id="delSendbutton" class="btn btn-primary" type="button" value="删除" onclick="delParentDiv(this)">\
	        </div>\
	    ';
        $("#sendDiv").append(html);
    }

    //创建收件人div
    function createReceiverDiv(){
	    var receiverInput = $("#receiverInput").val();
	    if(!receiverInput){
            alertx('请输入收件人信息');
            return false;
        }
        var html = '\
        <span style="background-color: gray;display: inline-block;line-height: 25px;padding: 0 5px;margin-bottom: 5px;">\
            <span style="color: white;">'+receiverInput+'</span>\
            <span style="color: white;cursor: pointer" onclick="delParentDiv(this)">X</span>\
        </span>\
        ';
        $("#receiverDiv").append(html);
        $("#receiverInput").val('');
    }

	//删除方法
	function delParentDiv(obj) {
        $(obj).parent().remove();
    }

</script>

</head>
<body>
    <ul class="nav nav-tabs">
        <li class="active">
            <a href="${ctx}/email/list">邮件配置列表</a>
        </li>
        <li class="active">
            <a><c:choose>
            	<c:when test="${empty emailConfigDto.id}">增加邮件配置</c:when>
            	<c:otherwise>邮件配置详情</c:otherwise>
            </c:choose></a>
        </li>
    </ul>

    <form:form id="searchForm" modelAttribute="emailConfigDto" class="form-horizontal">
        <div class="control-group">
        	<lable class="control-label">邮件编码：</lable>
        	<form:input path="emailCode" id="emailCode" name="emailCode" value="${emailConfigDto.emailCode }"
        	htmlEscape="false" class="input-medium" placeholder="邮件编码需全局唯一" />
        </div>
        <div id="sendDiv" class="control-group">
            <div>
                <lable class="control-label">发件人信息：</lable>
                <select id="account" name="account" class="input-medium" multiple="multiple">

                </select>
                <%--<a class="btn btn-small" href="javascript:createSendDiv();"><i class="icon-plus" style="margin-right: 5px;"></i>发件人</a>--%>
            </div>
        </div>
        <div class="control-group">
            <lable class="control-label">邮件主题：</lable>
            <input id="subject" name="subject" style="width: 400px;" type="text" >
        </div>
        <div class="control-group">
            <div>
                <lable class="control-label">收件人信息：</lable>
                <input id="receiverInput" type="text" placeholder="收件人账号">
                <a class="btn btn-small" href="javascript:createReceiverDiv();"><i class="icon-plus" style="margin-right: 5px;"></i>收件人</a>
            </div>
            <div id="receiverDiv" style="margin-left:160px;margin-top: 10px;"></div>
        </div>
        <div class="control-group">
            <lable class="control-label">模版类型：</lable>
            <select id="typeModel" name="typeModel" class="input-medium">
                <option value="html" <c:if test="${emailConfigDto.typeModel eq 'html' }">selected</c:if> >html</option>
                <option value="text" <c:if test="${emailConfigDto.typeModel eq 'text' }">selected</c:if> >text</option>
            </select>
        </div>
        <div class="control-group">
            <lable class="control-label">邮件模版：</lable>
            <input id="emailModel" name="emailModel" type="text" placeholder="template中配置的ftl文件名">
        </div>
        <div class="control-group">
        	<lable class="control-label">邮件状态：</lable>
        	<select id="emailFlag" name="emailFlag" class="input-medium">
        		<option value="1" <c:if test="${emailConfigDto.emailFlag eq 1 }">selected</c:if> >启用</option>
        		<option value="0" <c:if test="${emailConfigDto.emailFlag eq 0 }">selected</c:if> >停用</option>
        	</select>
        </div>
        <input id="id" name="id" type="hidden" value="${emailConfigDto.id }">
        
        <div class="form-actions">
        	<input id="btnSubmit" class="btn btn-primary" type="button" value="保存" />
            <input id="btnBack" class="btn btn-primary" type="button" onclick="history.back();" value="返 回" />
        </div>
    </form:form>
    
</body>
</html>