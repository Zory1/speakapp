Template.imagemapeditor.onRendered(function(){ 
  

var displayDemo = function(){
    
console.log("inside template onRendered...");
  var WCPEditorSettings = {
        mainTabs: [
            {
                name: 'Image Map',
                icon: 'fa fa-cog',
                title: 'Image Map Settings'
            },
            {
                name: 'Shape',
                icon: 'fa fa-object-ungroup',
                title: 'Selected Shape Settings'
            }
        ],
        toolbarButtons: [
            {
                name: 'spot',
                icon: 'fa fa-map-marker',
                title: 'Icon'
            },
            {
                name: 'oval',
                customIcon: '<div style="width: 14px; height: 14px; border: 2px solid #222; border-radius: 50px;"></div>',
                title: 'Ellipse'
            },
            {
                name: 'rect',
                customIcon: '<div style="width: 20px; height: 14px; border: 2px solid #222; border-radius: 5px;"></div>',
                title: 'Rectangle'
            },
            {
                name: 'poly',
                customIcon: '<svg width="24px" height="24px" viewport="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><polygon fill="none" style="stroke: black; stroke-width: 2px;" points="20,20 18,4 7,7 4,20"></polygon><ellipse cx="20" cy="20" rx="3" ry="3"></ellipse><ellipse cx="18" cy="4" rx="3" ry="3"></ellipse><ellipse cx="7" cy="7" rx="3" ry="3"></ellipse><ellipse cx="4" cy="20" rx="3" ry="3"></ellipse></svg>',
                title: 'Polygon'
            },
        ],
        extraMainButtons: [
            {
                name: 'code',
                icon: 'fa fa-code',
                title: 'Code'
            },
            {
                name: 'import',
                icon: 'fa fa-arrow-down',
                title: 'Import'
            },
            {
                name: 'export',
                icon: 'fa fa-arrow-up',
                title: 'Export'
            }
        ],
        listItemButtons: [
            {
                name: 'copy',
                icon: 'fa fa-files-o',
                title: 'Copy Style'
            },
            {
                name: 'paste',
                icon: 'fa fa-clipboard',
                title: 'Paste Style'
            },
            {
                name: 'duplicate',
                icon: 'fa fa-clone',
                title: 'Duplicate'
            },
            {
                name: 'delete',
                icon: 'fa fa-trash-o',
                title: 'Delete'
            },
        ],
        newButton: true,
        helpButton: true,
        previewToggle: true
    };

    $(document).ready(function() {
        $.image_map_pro_init_editor(undefined, WCPEditorSettings);
    });

}

$(document).ready(function() {
    // are we running in native app or in a browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", displayDemo, false);
    } else {
        displayDemo();
    }
});

});


Template.imagemapeditor.onCreated(function(){ 
  

var displayDemo = function(){
    
console.log("inside template onCreated...");

}

$(document).ready(function() {
    // are we running in native app or in a browser?
    window.isphone = false;
    if(document.URL.indexOf("http://") === -1 
        && document.URL.indexOf("https://") === -1) {
        window.isphone = true;
    }

    if( window.isphone ) {
        document.addEventListener("deviceready", displayDemo, false);
    } else {
        displayDemo();
    }
});

});