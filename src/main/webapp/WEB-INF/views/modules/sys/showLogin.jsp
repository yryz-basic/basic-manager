<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<title></title>
<meta name="decorator" content="default" />
<script type="text/javascript">
$(document).ready(function () {
	$("#btnSubmit").click(function(){
		if($("#password").val()==''){
			$("#passwordMSg").text('');
			$("#passwordMSg").append("*密码不能为空");
			return;
		}
		var merchantId=$("#merchantId").val();
		var password=$("#password").val();
		var backVal=isRegisterUserName(password);
		if(!backVal){
			return;
		}
		var cofPWD=confirm("确定要修改当前商户密码?");
		if(backVal){
			if(cofPWD){
				$.post("${ctx}/sys/user/updatePwd",{merchantId:merchantId,password:password},function(data){
				   if(data==1){
					   	alert("您的密码已重置成功,请于下次重新退出系统登录时使用");
					}else{
						$("updateMessage").append("修改密码失败,请稍后再试...");
					}
				});
			}
		}
	});
	
	$("#btnCancel").click(function(){
		$("#password").val('');
		window.location.href = "${ctx}/sys/user/showlonin";
	});
	
	/* $("#password").focus(function(){
		$(this).val('');
	}); */
	if($("#password").val()==''){
		$("#passwordMSg").text('');
	}
	
	$("#password").blur(function(){
		var passwordVal=$("#password").val();
		if(passwordVal!=""){
		var backVal=isRegisterUserName(passwordVal);
		if(!backVal){
			$("#passwordMSg").text('');
			$("#passwordMSg").append("*请按照密码规则更改");
			return;
		 }else{
			 $("#passwordMSg").text('');
		 }
		}
	});
});

function isRegisterUserName(s)   
{   
var patrn=/^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){6,}$/; /* ^[a-zA-Z0-9]{6,10}$ */
if (!patrn.exec(s)) return false 
return true 
}

</script>
</head>
<body>
    <ul class="nav nav-tabs">
        <li class="active"><a>密码更改</a></li>
    </ul>
     <div id="updateMessage"></div>
    <form:form id="searchForm" modelAttribute="user" class="form-horizontal" AUTOCOMPLETE="OFF">
         <div class="control-group">
        	<lable class="control-label">登录名：</lable>
        	<form:input path="loginName" id="loginName" name="loginName" value="${LoginName}" htmlEscape="false" maxlength="400" class="input-medium" readonly="true" style="width:208px;" />
        </div>
         <div class="control-group">
        	<lable class="control-label">密&nbsp;&nbsp;码：</lable>  <!-- type="password" -->
        	<form:input path="password" id="password" type="password" name="password" AUTOCOMPLETE="OFF" value="" htmlEscape="false" maxlength="400" class="input-medium"  style="width:208px;" />&nbsp;&nbsp;<Strong id="passwordMSg" style="color:#EC5200;"></Strong>
        </div>
      	<div class="control-group">
        	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        	*密码规则为:长度不能少于6位,字母数字特殊字符组合方式(例如:a123456,a123456$)<br/>
        	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        	*修改成功后,会跳出页面需要重新登录
        </div>
        <input id="merchantId" name="merchantId" type="hidden" value="${merchantId}">
        
        <div class="form-actions">
        	<input id="btnSubmit" class="btn btn-primary" type="button" value="更改" />
        	<input id="btnCancel" class="btn btn-primary" type="button" value="取消" />
        </div>
        
    </form:form>
    
</body>

</html>