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

        function edit(id, operateId) {
            var url = "${ctx}/email/config/add?id="+id;
            if(operateId){
                url += "&operateId="+operateId
            }
            window.location.href = url;
        }

        function resets() {
            window.location.href = "${ctx}/email/config/list";
        }

        function statusFlag(id, emailFlag) {
            var msg = emailFlag == '1' ? "是否确认启用" : "是否确认停用";
            var r = confirm(msg);
            if(r){
                $.ajax({
                    type:"post",
                    url:"${ctx}/email/config/submit",
                    dataType:"json",
                    data:{id : id, emailFlag : emailFlag},
                    success:function(data){
                        if(data == '1'){
                            window.location.href = "${ctx}/email/config/list";
                        }else if(data == '0'){
                            alert("状态变更失败");
                        }else{
                            alert(data);
                        }
                    }
                });
            }
        }

        function del(id) {
            var r = confirm('是否确认删除');
            if(r){
                $.ajax({
                    type:"post",
                    url:"${ctx}/email/config/submit",
                    dataType:"json",
                    data:{id : id, delFlag : 1},
                    success:function(data){
                        if(data == '1'){
                            window.location.href = "${ctx}/email/config/list";
                        }else if(data == '0'){
                            alert("删除失败");
                        }else{
                            alert(data);
                        }
                    }
                });
            }
        }

    </script>
</head>
<body>
<ul class="nav nav-tabs">
    <li class="active"><a href="">邮件配置列表</a></li>
    <li><a href="${ctx}/email/config/add">增加邮件配置</a></li>
</ul>
<form:form id="searchForm" modelAttribute="emailConfigDto" action="${ctx}/email/config/list" method="post"
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
            <td>
                <c:choose>
                    <c:when test="${data.emailFlag eq 1}"><font color="#43CD80">启用</font></c:when>
                    <c:otherwise><font color="#FF7F00">停用</font></c:otherwise>
                </c:choose>
            </td>
            <td><fmt:formatDate value="${data.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
            <td>
                <c:choose>
                    <c:when test="${data.emailFlag eq 1}">
                        <a href="#" onclick="statusFlag('${data.id}', '0')">停用</a>丨
                    </c:when>
                    <c:otherwise>
                        <a href="#" onclick="statusFlag('${data.id}', '1')">启用</a>丨
                    </c:otherwise>
                </c:choose>
                <a href="#" onclick="edit('${data.id}', '1');">查看</a>丨
                <a href="#" onclick="edit('${data.id}');">修改</a>丨
                <a href="#" onclick="del('${data.id}');">删除</a>
            </td>
        </tr>
    </c:forEach>
    </tbody>
</table>
<div class="pagination">${page}</div>
</body>
</html>