
// Our dialog definition.
CKEDITOR.dialog.add( 'myAudioDialog', function( editor ) {
	var mypath=$("#mypath").val();
	var api_url = mypath+"/upload/rrzUploadInfo/uploadVideo?loc=ads";
	
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

	function ajaxSubmit(form , url , cb, pgs,er){
		var $form =  $(form);
		var fakeform,file,axhr;
;

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
                    url: api_url,  
                    type: 'POST',
                    xhr: function () {  
                    	axhr = $.ajaxSettings.xhr();
                    	axhr.upload.addEventListener('progress', pgs && function(ev){
                    		var per = ev.loaded * 100 / ev.total | 0;
                    		pgs(per);
                    	 }||function(){}, false);
                        return axhr;
                    },                   
                    success: function (data) {
                        cb(data)
                    },
                    error:function(ex){
                    	er(ex);
                    },
                    data: fd,                  
                    cache: false,
                    contentType: false,
                    processData: false
                });
		}
		return axhr;
	}
	return {

		// Basic properties of the dialog window: title, minimum size.
		title: '选择视频',
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
						accept:"video/*",
						onChange:function(e){
							var target =$($("#"+e.sender.domId).find("iframe").get(0).contentWindow.document.body).find("[name=fileUpload]").get(0);
							var isIE = /msie/i.test(navigator.userAgent) && !window.opera; 
							var fileSize = 0,xhr; 
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
							var size = fileSize / (1024*1024);
							if(size>500){
								alert("视频大小超过500M!");
								return ;
							}
							if(this.isChanged()){
								var progress  = $(".videoPreviewBox");
								var p_val = progress.find(".progress-value");
								if(target.files[0]!=null || target.files[0].length>0){
									if(target.files[0].name.endsWith(".mp3")){
										api_url=mypath+"/upload/rrzUploadInfo/uploadAudio?loc=ads";
									}
								}
								xhr=ajaxSubmit(this.getInputElement().$.form,api_url,function(v){
									try{
										if(typeof v ==="string")
											v = eval("("+v+")");
											if(v.msg==="success"){
												var mediaUrl="";
												if(v.videoResouceUrl && v.resouceUrl){
													mediaUrl=v.videoResouceUrl;
												}else{
													mediaUrl=v.resouceUrl;
												}
												$("input[name='infoPath']").val(mediaUrl);
												if(mediaUrl && mediaUrl.endsWith(".mp3")){
													$("input[name='fileType']").val("audio");
												}else{
													$("input[name='fileType']").val("video");
												}
												$("input[name='smallPic']").val(v.resouceUrl);
												p_val.text("100%");	
												$("label[for='video']").hide().text("");
											}else{
												p_val.text("0%");
												$("label[for='video']").show().text(v.msg);
											}
									}catch(e){
										//$("#preview_1234").attr("src","")
									}
								},function(p){
									p*=.9;
									debugger;
									p_val.text((p|0)+"%");
								},function(ex){
								    p_val.text("0%");
									$("label[for='video']").show().text("链接超时！");
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
									'<div class="videoPreviewBox" style="border:0;overflow:initial;width:100%;">'+
									'<div class="progress-value" style="text-align:center;"></div>' +
									'<table><tr><td>' +
									'<label class="error" style="display:none;" for="video"></label>'+
									'<input type="hidden" name="infoPath"/>'+
									'<input type="hidden" name="smallPic"/>'+
									'<input type="hidden" name="fileType"/>'+
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
			var infoPath=$("input[name='infoPath']"),smallPic=$("input[name='smallPic']");
			var fileType=$("input[name='fileType']");
			var oVideo;
			if(infoPath.length>0){
				if(fileType.val()=="audio"){
					oVideo = editor.document.createElement("audio");
					oVideo.setAttribute("src",infoPath.val());
					oVideo.setAttribute("style","background-color:#000;");
					oVideo.setAttribute("controls","controls");
					oVideo.setAttribute("height","200px");
				}else if(fileType.val()=="video"){
					oVideo = editor.document.createElement("video");
					oVideo.setAttribute("src",infoPath.val());
					oVideo.setAttribute("poster",smallPic.val());
					oVideo.setAttribute("style","background-color:#000;");
					oVideo.setAttribute("controls","controls");
					oVideo.setAttribute("height","200px");
				}
				editor.insertElement( oVideo );
				commitContent.call(this,1,oVideo);
			}
			/*var img = $("#preview_1234");
			var oimg
			if(img.attr("src")!==""){
				 	oimg = editor.document.createElement("img");
					oimg.setAttribute("src",img.attr("src"));
					oimg.setAttribute("alt","");

					if(editor.window.$.innerWidth < getWidth(img[0]))
						oimg.setAttribute("width","100%");

				editor.insertElement( oimg );
				commitContent.call(this,1,oimg);
			}*/
		}
	};
});

if (typeof String.prototype.endsWith != 'function') {  
    String.prototype.endsWith = function (str){  
       return this.slice(-str.length) == str;  
    };  
  }  