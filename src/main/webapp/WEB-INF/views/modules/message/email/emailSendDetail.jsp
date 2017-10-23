<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<title></title>
<meta name="decorator" content="default" />
<script type="text/javascript">
	
	$(document).ready(function() {
        //发件人id
        var id = "${emailSendDto.id}";
        if(id){
            $("#account").attr("readonly", "readonly");
        }

        //如果是查看操作，不能修改任何东西
        var operateId = "${operateId}";
        if(operateId){
            $("input").attr("readonly", "readonly");
            $("select").attr("readonly", "readonly");
            $("#btnSubmit").css("display", "none");
        }

		//验证规则
		var validateForm = $("#searchForm").validate({
			rules : {
                account : {
					required: true,
					maxlength:50,
					remote : {
						url : "${ctx}/email/send/accountExist",
						type: "post",
						dataType: "json",
						data : {
							account : function () {
                                return $("#account").val();
                            },
                            id : function () {
							    return $("#id").val();
                            }
						}
					}
				},
                password : {
					required: true,
					maxlength:50
				},
                host : {
					required: true,
                    maxlength:50
				},
                auth : {
					required: true
				}
			},
			messages : {
                account : {
					required: "请输入账号",
					maxlength: "账号最大50位",
					remote : "账号已存在，请重新输入"
				},
                password : {
					required: "请输入密码",
					maxlength:"密码最大50位"
				},
                host : {
					required: "请输入smtp服务器地址",
                    maxlength: "smtp服务器地址最大50位"
				},
                auth : {
					required: "请选择是否授权"
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
		            url:"${ctx}/email/send/submit",
		            dataType:"json",
		            data:$("#searchForm").serialize(),
		            success:function(data){
		            	if(data == '1'){
							alert("保存成功");
							window.location.href = "${ctx}/email/send/list";
						}else if(data == '0'){
							alert("保存失败");
						}else{
                            alert(data);
                        }
		            }
		        });
			}
		});

	});


</script>

</head>
<body>
    <ul class="nav nav-tabs">
        <li class="active">
            <a href="${ctx}/email/send/list">发件人列表</a>
        </li>
        <li class="active">
            <a><c:choose>
            	<c:when test="${empty emailSendDto.id}">增加发件人</c:when>
            	<c:otherwise>发件人详情</c:otherwise>
            </c:choose></a>
        </li>
    </ul>

    <form:form id="searchForm" modelAttribute="emailSendDto" class="form-horizontal">
        <div class="control-group">
        	<lable class="control-label">账号：</lable>
            <input id="account" name="account" type="text" value="${emailSendDto.account}">
        </div>
        <div class="control-group">
            <lable class="control-label">密码：</lable>
            <input id="password" name="password" type="password" value="${emailSendDto.password}">
        </div>
        <div class="control-group">
            <lable class="control-label">smtp服务器地址：</lable>
            <input id="host" name="host" type="text" value="${emailSendDto.host}">
        </div>
        <div class="control-group">
            <lable class="control-label">是否授权：</lable>
            <select id="auth" name="auth" class="input-medium">
                <option value="true" <c:if test="${emailSendDto.auth eq 'true' }">selected</c:if> >是</option>
                <option value="false" <c:if test="${emailSendDto.auth eq 'false' }">selected</c:if> >否</option>
            </select>
        </div>

        <input id="id" name="id" type="hidden" value="${emailSendDto.id }">
        <div class="form-actions">
        	<input id="btnSubmit" class="btn btn-primary" type="button" value="保存" />
            <input id="btnBack" class="btn btn-primary" type="button" onclick="history.back();" value="返 回" />
        </div>
    </form:form>
    
</body>
</html>