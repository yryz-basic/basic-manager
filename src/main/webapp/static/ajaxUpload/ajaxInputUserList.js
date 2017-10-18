$(document).ready(function() {
	var w=$(".vague-term").width()+12 ;
	var h=$(".vague-term").height();
	var t=$(".vague-term").offset().top+h+10;
	var l=$(".vague-term").offset().left;
	$(".vague-term").after("<input class='vague-term1'  type='hidden' value="+$(".vague-term").val()+" />");
	$(".vague-term1").after("<input class='vague-termId'  type='hidden' value="+$(".vague-termIds").val()+" />");
	$(".vague-termId").after("<div id='myDiv'  style='width:"+w+"px; position:absolute;left:"+l+"px;top:"+t+"px; border:1px #87CEFA solid; height:200px;overflow-y:scroll; display:none; background:#FFF;'><ul id='myUl' style='padding:0px; margin:0px;'></ul></div>");
	$("#myDiv").after("<input  type='hidden' class='vague-termId1' value="+ $(".vague-termId").val()+" />");
	var arr =[];
	var a=$(".vague-term1").val();
	var b=$(".vague-termId").val();
	var c;
	//文本框按键事件
	$(".vague-term").keyup(function(){
		debugger;
		var vagueTerm = encodeURI($(".vague-term").val());
		var selectUrl=encodeURI($("#selectUrl").val());
		vagueTerm = encodeURI(vagueTerm);
		if (vagueTerm.length==0){
			hide();
		}else{
			$("#myDiv").css('display','block'); 
			//获取模糊查询的列表
			 $.ajax({
		            type: 'get',
		            url : selectUrl+vagueTerm,
		            success : function(data) {
		            	if(data!=null){
		            		console.log(data);
		            		//初始化
		            	  $('#myUl').find("li").remove(); 
		            	  $('#myUl').find("input").remove();
		            	  $('#pageX').remove(); 
		            	  $(".vague-term1").val("");
		      			  $(".vague-termId1").val("");
		      			  $(".vague-termIds").val("");
		            	  arr.splice(0,arr.length);
			              var i=0;
	            		  for(var j in data){
	            			  arr[i]=j;
	            			  //生成li
	            			  $("#myUl").append("<li style='float:none;' onMouseOver='changeColor(this)' onMouseOut='removeColor(this)' style='list-style:none; cursor:hand;' >"+data[j]+"</li><input type='hidden' value="+j+" />");
	            			  i=i+1;
	            		  }	
		            	}	  
		            },
		            error : function(msg){
		            	debugger;
		            	console.log(msg);
		            	alert(msg);
		            }
		    });
		}
		return;
	});
		//文本框失去焦点事件
	$(".vague-term").blur(function(){
		hide();
		if($(".vague-term").val()==''){
			$(".vague-terme1").val("");
			$(".vague-termId").val("");
			$(".vague-termIds").val("");
			$('#myUl').find("li").remove(); 
	   	    $('#myUl').find("input").remove();
	   	    return;
		}
		if(a!='' && b!=''){
			$(".vague-term").val(a);
			$(".vague-termId").val(b);
			c=$(".vague-term").val();
		}else if($(".vague-term").val()!=c){
			//文本框内容有变动时更新.vague-termId
			$(".vague-termId").val(arr.join(","));
		}
		return;
	});
	//div隐藏
	function hide(){
		$("#myDiv").css('display','none'); 
		a=$(".vague-term1").val();
		b=$(".vague-termId1").val();
		return;
	}
	//表单提交验证
	$('.vague-term').parents("form").submit(function (){
		if($(".vague-termId").val()!=""){
			$(".vague-termIds").val($(".vague-termId").val());
		}else {
			if($(".vague-term").val()!='' && arr.length==0 && $(".vague-termId").val()==''){
				//查询条件不存在设置id为-1
				$(".vague-termIds").val("-1");
			}else if( arr.length!=0){
				$(".vague-termIds").val(arr.join(","));	
			}
		}
		if($('.vague-term').val()==''){
			//文本框为空时初始化变量
			$(".vague-terme1").val("");
			$(".vague-termId").val("");
			$(".vague-termIds").val("");
			$('#myUl').find("li").remove(); 
	   	    $('#myUl').find("input").remove();
	   	    return true;
		}
		return true;
	});
});
//鼠标onMouseOver改变li背景颜色
function changeColor(span){
	debugger;
	span.style.background = "#cccccc";
	$(".vague-term1").val($(span).text());
	$(".vague-termId1").val($(span).next().val());
}
//鼠标离开改变li背景颜色
function removeColor(span){
	span.style.background = "white";
	$(".vague-term1").val('');
	$(".vague-termId1").val('');
}