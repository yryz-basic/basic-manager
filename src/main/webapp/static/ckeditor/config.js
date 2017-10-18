/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config ) {	
	
	    
	config.pasteFromWordRemoveFontStyles = true;//word去除格式
	config.pasteFromWordRemoveStyles = true;//word去除格式
	config.forcePasteAsPlainText =true;
	config.fullPage = false; //是否使用全格式
	
	config.language = 'zh-cn'; config.uiColor = '#f7f5f4';
	config.width = '99.7%'; 
	if (config.height == ''){
		config.height = '400px';
	}
	config.removePlugins = 'elementspath,scayt';
	config.disableNativeSpellChecker = false;
	config.resize_dir = 'vertical';
	config.keystrokes =[[ CKEDITOR.CTRL + 13 /*Enter*/, 'maximize' ]];	
	config.extraPlugins = 'composing,myImage,myAudio,confighelper';
	
	config.enterMode = CKEDITOR.ENTER_P;
	config.shiftEnterMode = CKEDITOR.ENTER_BR;
	//config.startupMode = 'source';
	
	config.font_names='宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆;微软雅黑/微软雅黑;'+ config.font_names;
	config.image_previewText='&nbsp;';
	config.toolbar_default = [
		['Source'/*,'-','Templates','Preview'*/],
	   /* ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print'],*/
	    /*['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],['ShowBlocks'],['Image','Capture','Flash']*/
	    /*'/',*/
	    ['Bold','Italic','Underline','Strike','-'],
	 /*   ['Subscript','Superscript','-'],
	    ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],*/
	    ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-'],['composing','Link','myImage','myAudio','-'],['Maximize']
	    /*['Link','Unlink','Anchor'],
	    ['Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],*/
	    /*'/',
	    ['Styles','Format','Font','FontSize'],
	    ['TextColor','BGColor']*/
	];
	config.toolbar = 'default';
	if(config.ckfinderPath){
		config.filebrowserBrowseUrl = "";//config.ckfinderPath+'/ckfinder.html?type=files&start=files:'+config.ckfinderUploadPath;
		config.filebrowserImageBrowseUrl = config.ckfinderPath+"/filemessage/fileManager";
			
			//config.ckfinderPath+'/ckfinder.html?type=images&start=images:'+config.ckfinderUploadPath;
	//	config.filebrowserFlashBrowseUrl = config.ckfinderPath+'/ckfinder.html?type=flash&start=flash:'+config.ckfinderUploadPath;
	//	config.filebrowserUploadUrl = config.ckfinderPath+'/core/connector/java/connector.java?command=QuickUpload&type=files&currentFolder='+config.ckfinderUploadPath;
		config.filebrowserImageUploadUrl = config.ckfinderPath+"/filemessage/uploadFileByInfo?type=files";
			
	//	config.filebrowserImageUploadUrl =config.ckfinderPath+'/core/connector/java/connector.java?command=QuickUpload&type=images&currentFolder='+config.ckfinderUploadPath;
	//	config.filebrowserFlashUploadUrl = config.ckfinderPath+'/core/connector/java/connector.java?command=QuickUpload&type=flash&currentFolder='+config.ckfinderUploadPath;
		config.filebrowserWindowWidth = '1000';
		config.filebrowserWindowHeight = '700';
	}
	

/*	config.removeDialogFields="image:info:txtBorder";
	config.removeDialogFields="image:info:txtBorder;image:info:txtHSpace";
	config.dialogFieldsDefaultValues =
	{
		image:
			{
				advanced:
					{
						txtGenClass : 'myClass',
						txtGenTitle : 'Image title'
					}
			}
	};*/
	config.placeholder = '只能粘贴文字，图片、视频必须通过上传才生效！';
};
CKEDITOR.stylesSet.add( 'default', [
	/* Block Styles */
	{ name : '首行缩进'	, element : 'p', styles : { 'text-indent' : '20pt' } },
	/* Inline Styles */
	{ name : '标注黄色'	, element : 'span', styles : { 'background-color' : 'Yellow' } },
	{ name : '标注绿色'	, element : 'span', styles : { 'background-color' : 'Lime' } },
	/* Object Styles */
	{ name : '图片左对齐', element : 'img', attributes : { 'style' : 'padding: 5px; margin-right: 5px', 'border' : '2', 'align' : 'left' } },
	{ name : '图片有对齐', element : 'img', attributes : { 'style' : 'padding: 5px; margin-left: 5px', 'border' : '2', 'align' : 'right' } },
	{ name : '无边界表格', element : 'table', styles: { 'border-style': 'hidden', 'background-color' : '#E6E6FA' } }
]);
