
// Our dialog definition.
CKEDITOR.dialog.add( 'myImageDialog', function( editor ) {
	var mypath=$("#mypath").val();
	var api_url = mypath+"/upload/rrzUploadInfo/uploadImg?loc=ads";
	if(editor.config.ckfinderBaseUri){
		api_url=editor.config.ckfinderBaseUri;
	}
	
	var MD5={};


	function commitContent() {
				var args = arguments;
				var inlineStyleField = this.getContentElement( 'advanced', 'txtdlgGenStyle' );
				inlineStyleField && inlineStyleField.commit.apply( inlineStyleField, args );

				this.foreach( function( widget ) {
					if ( widget.commit && widget.id != 'txtdlgGenStyle' )
						widget.commit.apply( widget, args );
				} );
	}

	function getCacuImage(){
		return editor.window.$.document.body.getElementsByTagName("img").length;
	}

	function getWidth(img){
		if(img.naturalWidth)
			return img.naturalWidth;

		var _img = new Image;
		_img.src= img.src;
		return _img.width;

	}

	function ajaxSubmit(form , url , cb,er){
		var $form =  $(form);
		var fakeform,file;

		if($.browser.msie && $.browser.version < 10){


			var div = document.createElement('div');
			div.style.cssText = "width:0;height:0;overflow:hidden;opacity:0;"
			div.innerHTML +='<form enctype="multipart/form-data" method="POST" action="'+api_url+'" target="invokesubmitframe"  ></form>';
			document.body.appendChild(div);


			var iframe = document.createElement("iframe");
			iframe.setAttribute("name","invokesubmitframe");
			iframe.setAttribute("id","invokesubmitframe");
			iframe.style.cssText="width:0;height:0;border:0px solid #fff;";
			iframe.onreadystatechange=function(v){
				if(/loaded|complete/.test( iframe.readyState)){
					cb(iframe.contentDocument.body.innerHTML);
					document.body.removeChild(div);
					document.body.removeChild(iframe);
				}
			}

			document.body.appendChild(iframe);
			
			file = $form.find("input[name='fileUpload']");

			div.childNodes[0].appendChild(file[0]);
			div.childNodes[0].submit();

			$form.append(file);

		}
		else{
			var xhr = new XMLHttpRequest();
			var fd = new FormData(form);
				$.ajax({
					async:false,
                    url: api_url,  
                    type: 'POST',
                    xhr: function () {  
                        return $.ajaxSettings.xhr();
                    },                   
                    success: function (data) {
                        cb(data)
                    },
                    error:function(ex){
                    	er(ex);;
                    },
                    data: fd,                  
                    cache: false,
                    contentType: false,
                    processData: false
                });
		}	
	}
	return {

		// Basic properties of the dialog window: title, minimum size.
		title: '选择图片',
		minWidth: 400,
		minHeight: 360,
		maxWidth:400,
		maxHeight:360,
		width:400,
		height:360,
		// Dialog window content definition.
		contents: [
			{
				elements: [
					{
						// Text input field for the abbreviation text.
						type: 'file',
						id: 'fileUpload',
						accept:"image/*",
						onChange:function(e){
							var target =$($("#"+e.sender.domId).find("iframe").get(0).contentWindow.document.body).find("[name=fileUpload]").get(0);
							var isIE = /msie/i.test(navigator.userAgent) && !window.opera; 
							var fileSize = 0; 
							if (isIE && !target.files) { 
								var filepath = target.value; 
								var fileSystem = new ActiveXObject("Scripting.FileSystemObject"); 
								if(!fileSystem.FileExists(filePath)){ 
									$("label[for='video']").show().text("附件不存在，请重新选择！"); 
									$("input[name='fileUpload']").val("");
									return false; 
								} 
								var file = fileSystem.GetFile (filePath); 
								fileSize = file.Size; 
								
							}else { 
								fileSize = target.files[0].size; 
							} 
							//2M的限制去掉
							/*var size = fileSize / (1024*1024);
							if(size>2){
								alert("图片大小超过2M!");
								return ;
							}*/
							if(this.isChanged()){
								ajaxSubmit(this.getInputElement().$.form,api_url,function(v){
									try{
										if(typeof v ==="string")
											v = eval("("+v+")");
										 	if(v.msg==="success"){
										 		var $parent=$("#preview_1234").parent();
												$parent.find(".error").remove();
												//oss上传后缀
												var CallbackSuffix = "?x-oss-process=image/resize,w_750/quality,Q_80";
										 		$("#preview_1234").attr("src",v.resouceUrl+CallbackSuffix).show();
										 	}
											else alert(v.msg);
									}catch(e){
										$("#preview_1234").attr("src","").show();
									}
								},function(ex){
									var $parent=$("#preview_1234").parent();
									$("#preview_1234").attr("src","").hide();
									$parent.find(".error").remove();
									$parent.append('<label class="error">'+ex.statusText+'</label>');
								});
							}
						}
					},
					{
						type: 'vbox',
						height: '250px',
						children: [ {
							type: 'html',
							id: 'htmlPreview',
							style: 'width:95%;height:300px;overflow:hidden;',
							html: '<div>'+
									'<div class="ImagePreviewBox" style="border:0;overflow:initial;width:100%;"><table><tr><td>' +
									'<img id="preview_1234" style="width:100%;" /></a>' +
								'</td></tr></table></div></div>'
						} ]
					}
				
				]	
		}],
		onShow:function(){
			var d = this;
			$("#preview_1234").attr("src","");
			this.resize(400,360);
		},
		onHide:function(){
			this.resize(400,360);
		},
		onOk: function() {
			var img = $("#preview_1234");
			var oimg
			if(img.attr("src")!==""){
			 	oimg = editor.document.createElement("img");
				oimg.setAttribute("src",img.attr("src"));
				oimg.setAttribute("alt","");

				if(editor.window.$.innerWidth < getWidth(img[0]))
					oimg.setAttribute("width","100%");

				editor.insertElement( editor.document.createElement("br") );
				editor.insertElement( oimg );
				editor.insertElement( editor.document.createElement("br") );
				commitContent.call(this,1,oimg);
			}
		}
	};
});