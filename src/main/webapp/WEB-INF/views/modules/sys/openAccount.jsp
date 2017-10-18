<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
<title></title>
<meta name="decorator" content="default" />
<style type="text/css">
.line {
	float: left;
	width: 42%;
}

.control-group-new {
	height: 25px;
	width: 100%;
	border-bottom: dashed 1px gray;
	display: block;
	font-size: 20px;
	margin-top: 10px;
}
</style>
</head>
<body>
	<ul class="nav nav-tabs">
		<li class="active"><a>商户信息</a></li>
	</ul>
	<c:if
		test="${openAccount!=null && merchantId != null && merchantId != '0'}">
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">商家名称：</lable>
				${openAccount.merchantName}
			</div>
		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">开户身份证号：</lable>
				${openAccount.cardNo}
			</div>
		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">商家电话：</lable>
				${openAccount.merchantPhone}
			</div>
		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">商家手机：</lable>
				${openAccount.merchantMobile}
			</div>
		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">结算周期：</lable>
				<c:if test="${openAccount.settlementInterval != ''}">${openAccount.settlementInterval}天</c:if>
			</div>
		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">商家类型：</lable>
				<c:if test="${openAccount.merchantType eq '1'}">企业</c:if>
				<c:if test="${openAccount.merchantType eq '2'}">个人</c:if>
			</div>
		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">银行卡名称：</lable>
				${openAccount.bankName}
			</div>

		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">银行卡账户：</lable>
				${openAccount.bankNo}
			</div>
		</div>
		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">使用币种：</lable>
				<c:if test="${openAccount.currency eq '156'}">人民币</c:if>
			</div>
		</div>

		<div class="control-group-new">
			<div class="line">
				<lable class="control-label">商家描述：</lable>
				${openAccount.merchantDesc}
			</div>
		</div>

	</c:if>
	<c:if test="${openAccount == null}">
		<h1>非常抱歉,暂时取不到您的开户信息,请稍后再试！</h1>
	</c:if>
</body>

</html>