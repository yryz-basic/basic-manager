<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp" %>
<html>
<head>
    <title></title>
    <meta name="decorator" content="default"/>
    <script type="text/javascript">
        function page(n, s) {
            $("#pageNo").val(n);
            $("#pageSize").val(s);
            $("#searchForm").submit();
            return false;
        }

        function resets() {
            window.location.href = "${ctx}/email/list";
        }
        

    </script>
</head>
<body>
<ul class="nav nav-tabs">
    <li class="active"><a href="">邮件配置列表</a></li>
    <li><a href="${ctx}/email/add">增加邮件配置</a></li>
</ul>
<form:form id="searchForm" modelAttribute="emailConfigDto" action="${ctx}/email/list" method="post"
           class="breadcrumb form-search">
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>

    <ul class="ul-form">
        <li>邮件编码:
            <input id="emailCode" name="emailCode" value="${emailConfigDto.emailCode}">
        </li>

        <li class="btns">
            <input id="btnSubmit" class="btn btn-primary" type="button" value="搜索"
                   onclick="javascript:page(1,10);"/> &nbsp;&nbsp;&nbsp;
            <input id="reset" class="btn btn-primary" type="button" value="重置"
                   onclick="javascript:resets();"/>
        </li>

        <li class="clearfix"></li>
    </ul>
</form:form>
<sys:message content="${message}"/>
<table id="contentTable" class="table table-striped table-bordered table-condensed">
    <thead>
    <tr>
        <th>序号</th>
        <th>邮件编码</th>
        <th>主题</th>
        <th>模版类型</th>
        <th>状态</th>
        <th>创建时间</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${page.list}" var="data" varStatus="i">
        <tr>
            <td>${i.index+1}</td>
            <td>${data.emailCode}</td>
            <td>${data.subject}</td>
            <td>${data.typeModel}</td>
            <td>${data.emailFlag}</td>
            <td><fmt:formatDate value="${data.createDate}" pattern="yyyy-MM-dd"/></td>
            <td>
                <c:choose>
                    <c:when test="${data.emailFlag eq 1}"><a href="">停用</a></c:when>
                    <c:otherwise><a href="">启用</a></c:otherwise>
                </c:choose>
            </td>
        </tr>
    </c:forEach>
    </tbody>
</table>
<div class="pagination">${page}</div>
</body>
</html>