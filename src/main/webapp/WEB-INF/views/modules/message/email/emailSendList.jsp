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
            window.location.href = "${ctx}/email/send/list";
        }

        function edit(id, operateId) {
            var url = "${ctx}/email/send/add?id="+id;
            if(operateId){
                url += "&operateId="+operateId
            }
            window.location.href = url;
        }

        function del(id) {
            var r = confirm('是否确认删除');
            if(r){
                $.ajax({
                    type:"post",
                    url:"${ctx}/email/send/del",
                    dataType:"json",
                    data: {id : id, delFlag : 1},
                    success:function(data){
                        if(data == '1'){
                            alert("删除成功");
                            window.location.href = "${ctx}/email/send/list";
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
    <li class="active"><a href="">发件人列表</a></li>
    <li><a href="${ctx}/email/send/add">增加发件人</a></li>
</ul>
<form:form id="searchForm" modelAttribute="emailSendDto" action="${ctx}/email/send/list" method="post"
           class="breadcrumb form-search">
    <input id="pageNo" name="pageNo" type="hidden" value="${page.pageNo}"/>
    <input id="pageSize" name="pageSize" type="hidden" value="${page.pageSize}"/>

    <ul class="ul-form">
        <li>账号:
            <input id="accountSearch" name="accountSearch" value="${emailSendDto.accountSearch}">
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
        <th>帐号</th>
        <th>smtp服务器地址</th>
        <th>创建时间</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${page.list}" var="data" varStatus="i">
        <tr>
            <td>${i.index+1}</td>
            <td>${data.account}</td>
            <td>${data.host}</td>
            <td><fmt:formatDate value="${data.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
            <td>
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