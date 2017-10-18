CKEDITOR.plugins.add( 'myImage', {
    icons:'myImage',
    init: function( editor ) {
        editor.addCommand( 'myImage', new CKEDITOR.dialogCommand( 'myImageDialog' ) );
        editor.ui.addButton( 'myImage', {
            label: '插入图片',
            command: 'myImage',
            toolbar: 'insert',
            icon: this.path + 'icons/myImage.png'
        });
        CKEDITOR.dialog.add( 'myImageDialog', this.path+'dialogs/myImage.js' );                      
        
    }
});