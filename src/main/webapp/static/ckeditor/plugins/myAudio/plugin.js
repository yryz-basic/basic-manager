CKEDITOR.plugins.add( 'myAudio', {
    icons:'myAudio',
    init: function( editor ) {
        editor.addCommand( 'myAudio', new CKEDITOR.dialogCommand( 'myAudioDialog' ) );
        editor.ui.addButton( 'myAudio', {
            label: '插入视频',
            command: 'myAudio',
            toolbar: 'insert',
            icon: this.path + 'icons/myAudio.png'
        });
        CKEDITOR.dialog.add( 'myAudioDialog', this.path+'dialogs/myAudio.js' );                      
        
    }
});