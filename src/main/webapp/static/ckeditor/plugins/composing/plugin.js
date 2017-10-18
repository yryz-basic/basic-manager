/**
 * 
 */
(function(){ 
    //Section 1 : 按下自定义按钮时执行的代码 
	var nowData=null;
    var pressBtnConfig= { 
        exec:function(editor){
           if(this.state=="2"){
        	   nowData=editor.getData();
	           editor.setData(editor.getData().replace(/(?:<p>[\r\s]*&nbsp;(?:<\/p>)(?:[\r\s]|)){2,}/g,"<p>&nbsp;</p>"));
           }
           else{
        	   editor.setData(nowData);
           }
           this.toggleState();
        }
    }, 
    //Section 2 : 创建自定义按钮、绑定方法 
    btnName='composing'; 
    CKEDITOR.plugins.add(btnName,{ 
        init:function(editor){ 
            editor.addCommand(btnName,pressBtnConfig); 
            editor.ui.addButton('composing',{ 
                label:'排版', 
                icon: this.path + 'composing.jpg', 
                command:btnName,
                class:"composing-on"
            }); 
        } 
    }); 
})(); 