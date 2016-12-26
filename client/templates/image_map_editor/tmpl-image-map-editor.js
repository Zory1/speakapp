Template.imagemapeditor.onRendered(function(){ 
  

var displayDemo = function(){
    
console.log("inside template onRendered...");

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