<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<title></title>
<meta name="decorator" content="default" />
<script type="text/javascript">
	
	$(document).ready(function() {

		//验证规则
		var validateForm = $("#searchForm").validate({
			rules : {
                emailCode : {
					required: true,
					maxlength:20,
					remote : {
						url : "${ctx}/email/config/emailCodeExist",
						type: "post",
						dataType: "json",
						data : {
                            emailCode : function(){
								return $("#emailCode").val();
							},
							id : function(){
								return $("#id").val();
							}
						}
					}
				},
                subject : {
					required: true,
					maxlength:200
				},
                emailModel : {
					required: true,
                    maxlength:50
				}
			},
			messages : {
                emailCode : {
					required: "请输入邮件编码",
					maxlength: "邮件编码最大20位",
					remote : "邮件编码已存在，请重新输入"
				},
                subject : {
					required: "请输入主题",
					maxlength:"主题最大200"
				},
                emailModel : {
					required: "请输入邮件模版",
                    maxlength:"邮件模版最大50"
				}
			}
		});

        //保存按钮
        $("#btnSubmit").click(function(){
            if (!validateForm.form()) {
                return;
            }
            //获取发件人
            var sendInfo = getEmailDiv($("#sendDiv"));
            if(!sendInfo){
                alertx('发件人不能为空');
                return;
            }
            //获取收件人
            var receiverList = getEmailDiv($("#receiverDiv"));
            if(!receiverList){
                alertx('收件人不能为空');
                return;
            }
            var r = confirm('是否确认保存');
            if(r){
                var data = $("#searchForm").serialize();
                //设置发送人信息
                data += "&sendInfo="+sendInfo;
                //设置收件人信息
                data += "&receiverList="+receiverList;

                $.ajax({
                    type:"post",
                    url:"${ctx}/email/config/submit",
                    dataType:"json",
                    data:data,
                    success:function(data){
                        if(data == '1'){
                            alert("保存成功");
                            window.location.href = "${ctx}/email/config/list";
                        }else if(data == '0'){
                            alert("保存失败");
                        }else{
                            alert(data);
                        }
                    }
                });
            }

        });

		//发件人账号
		$("#account").select2({
            language: "zh-CN",
            minimumInputLength: 1,
            placeholder: "-- 请输入邮箱进行搜索 --",
            multiple: true,
            ajax: {
                url : "${ctx}/email/send/accountSelect",
                dataType: "json",
                delay: 500,
                data: function (params) {
                    return {account: params};
                },
                results: function (res, page) {
                    console.log(res);
                    var options = [];
                    $(res).each(function (index, r) {
                        var option = {"id": r.account, "text": r.account};
                        options.push(option);
                    });
                    return {
                        results: options
                    };
                }
            },
            escapeMarkup: function (m) {
                return m;
            }
        });

		//发件人账号选择事件
        $("#account").change(function(e){
            var account = $("#account").val();
            if(account){
                $("#sendDiv").append(createEmailDiv(account));
            }
            $(".select2-search-choice-close").click();
        });

        //收件人回车事件
        $("#receiverInput").keydown(function(e){
            if(e.keyCode==13){
                createReceiverDiv();
            }
        });
	});

	//创建emailDiv
    function createEmailDiv(emailAccount) {
        if(!emailAccount){
            return false;
        }
        var html = '\
        <span style="background-color: gray;display: inline-block;line-height: 25px;padding: 0 5px;margin-bottom: 5px;">\
            <span style="color: white;">'+emailAccount+'</span>\
            <span style="color: white;cursor: pointer" onclick="delParentDiv(this)">X</span>\
        </span>\
        ';

        return html;
    }

    //创建收件人div
    function createReceiverDiv(){
	    var receiverInput = $("#receiverInput").val();
	    if(receiverInput){
            $("#receiverDiv").append(createEmailDiv(receiverInput));
        }
        $("#receiverInput").val('');
    }

	//删除方法
	function delParentDiv(obj) {
        $(obj).parent().remove();
    }

    function getEmailDiv(obj){
        var email = "";
        var span = obj.children("span");
        $(span).each(function (index, r) {
            if(!email){
                email = $(r).find("span").eq(0).html();
            }else{
                email += "," + $(r).find("span").eq(0).html();
            }
        });

        return email;
    }

</script>

</head>
<body>
    <ul class="nav nav-tabs">
        <li class="active">
            <a href="${ctx}/email/config/list">邮件配置列表</a>
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
        <div class="control-group">
            <div>
                <lable class="control-label">发件人信息：</lable>
                <input id="account" name="account" class="input-medium" multiple="multiple" style="width:200px;"></input>
            </div>
            <div id="sendDiv" style="margin-left:160px;margin-top: 10px;"></div>
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