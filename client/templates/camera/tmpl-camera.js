if(Meteor.isCordova){
//js to make a picture using a camera or retrieve from file syste

Template.camera.events({
	'click #take_picture' : function(){
		if(!Meteor.userId()){
        var msg = "Must be logged in to take a picture.";
        var ecode = "client.templates.camera.tmpl-camera.notAuthorized.take_picture.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
    } 
		capturePhoto();
        var msg = "Took a picture.";
        var ecode = "client.templates.camera.tmpl-camera.take_picture.success";
        lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
	},
	'click #take_edible' : function(){
		if(!Meteor.userId()) {
        var msg = "Must be logged in to take a picture.";
        var ecode = "client.templates.camera.tmpl-camera.notAuthorized.take_edible.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
    }
		capturePhotoEdit();
        var msg = "Took edible picture.";
        var ecode = "client.templates.camera.tmpl-camera.take_edible.success";
        lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
	},
		'click #get_from_library' : function(){
		if(!Meteor.userId())  {
        var msg = "Must be logged in to get a picture from a library.";
        var ecode = "client.templates.camera.tmpl-camera.notAuthorized.get_from_library.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
    }
		getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
        var msg = "Got a picture from a library.";
        var ecode = "client.templates.camera.tmpl-camera.get_from_library.success";
        lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
	},
	'click #get_from_album' : function(){
		if(!Meteor.userId()) {
        var msg = "Must be logged in to get a picture from an album.";
        var ecode = "client.templates.camera.tmpl-camera.notAuthorized.get_from_album.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
    }
		getPhoto(navigator.camera.PictureSourceType.SAVEDPHOTOALBUM);
        var msg = "Got a picture from an album.";
        var ecode = "client.templates.camera.tmpl-camera.get_from_album.success";
        lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
	}, 
  'click #store_to_album' : function(){
    if(!Meteor.userId()) {
        var msg = "Must be logged in to store a picture to aplication album.";
        var ecode = "client.templates.camera.tmpl-camera.notAuthorized.store_to_album.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
    }
    takeAndSavePic();
        var msg = "Saved a picture to aplication album.";
        var ecode = "client.templates.camera.tmpl-camera.store_to_album.success";
        lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
  }
});


    
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL });
       
    }

    function onPhotoDataSuccess(imageData) {
      try{
        // Uncomment to view the base64-encoded image data
        // console.log(imageData);

        // Get image handle
        //
        var smallImage = $('#smallImage');

        // Unhide image elements
        //
        smallImage.css('display', 'block');

        // Show the captured photo
        // The in-line CSS rules are used to resize the image
        //
        var img_src = "data:image/jpeg;base64," + imageData;
        smallImage.attr('src', img_src);
        //console.log("Image displayed");
        var msg = "Small image successfully displayed.";
        var ecode = "client.templates.camera.tmpl-camera.onPhotoDataSuccess.success";
        lg("t", "cl", {error: ecode, reason: msg, details:""}, "");
      }catch(e){
          var msg = "Small image failed to display.";
          var ecode = "client.templates.camera.tmpl-camera.onPhotoDataSuccess.failure";
          lg("e", "cl", {error: ecode, reason: msg, details:e}, "");
      }
      
      

    }

      function onPhotoURISuccess(imageURI) {
        try{
          // Uncomment to view the image file URI
          //console.log("This is from onPhotoURISuccess.");
          //console.log(imageURI);

          // Get image handle
          //
          var largeImage = document.getElementById('largeImage');

          // Unhide image elements
          //
          largeImage.style.display = 'block';

          // Show the captured photo
          // The in-line CSS rules are used to resize the image
          //
          var urlTransformed = WebAppLocalServer.localFileSystemUrl(imageURI);
          //console.log('This is transfored url: ' + urlTransformed);
          largeImage.src = urlTransformed;
          movePic(imageURI);
          var msg = "Photo URI successeed.";
          var ecode = "client.templates.camera.tmpl-camera.onPhotoURISuccess.success";
          lg("t", "cl", {error: ecode, reason: msg, details:""}, "");
        }catch(e){
          var msg = "Photo URI failure.";
          var ecode = "client.templates.camera.tmpl-camera.onPhotoURISuccess.failed";
          lg("e", "cl", {error: ecode, reason: msg, details:e}, "");
        }
    }

    function onFail(message) {
        var msg = "Get photo failed and picture was not saved.";
        var ecode = "client.templates.camera.tmpl-camera.capturePhotoEdit.onFail.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:message}, "");
     // console.log('take_picture in tmpl-camera.js failed because: ' + message);
    }

    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: navigator.camera.DestinationType.DATA_URL });
    }

     function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: source });
    }

    function takeAndSavePic(){
      try{
        getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
        var msg = "Took and saved picture.";
        var ecode = "client.templates.camera.tmpl-camera.takeAndSavePic.success";
        lg("t", "cl", {error: ecode, reason: msg, details:""}, "");
      }catch(e){
        var msg = "Failed to take and save picture.";
        var ecode = "client.templates.camera.tmpl-camera.takeAndSavePic.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:e}, "");
      }
    }

    function movePic(file){ 
      //console.log("movePic file:");
      //console.log(file);
      window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError);   
    }

        //Callback function when the file system uri has been resolved
    function resolveOnSuccess(entry){ 
        var d = new Date();
        var n = d.getTime();
        //new file name
        var newFileName = n + ".jpg";
        var myFolderApp = "Speakapp";

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {      
        //The folder is created if doesn't exist
        fileSys.root.getDirectory( myFolderApp,
                        {create:true, exclusive: false},
                        function(directory) {
                            entry.moveTo(directory, newFileName,  successMove, resOnError);
                        },
                        resOnError);
                        },
        resOnError);
    }

    //Callback function when the file has been moved successfully - inserting the complete path
    function successMove(entry) {
        try{
            //I do my insert with "entry.fullPath" as for the path
          //console.log("This is entry from successMove: ");
          //console.log(entry);
          //console.log("Saving img with src: " + entry.fullPath);

          Images.insert({
            owner: Meteor.userId,
            src: entry.fullPath
          });
          var msg = "Successfully moved image to the path by updating image collection.";
          var ecode = "client.templates.camera.tmpl-camera.successMove.success";
          lg("t", "cl", {error: ecode, reason: msg, details:""}, "");
        }catch(e){
          var msg = "Failed to move image to the path by updating image collection.";
          var ecode = "client.templates.camera.tmpl-camera.successMove.failed";
          lg("e", "cl", {error: ecode, reason: msg, details:e}, "");
        }
        
    }

    function resOnError(error) {
        var msg = "Failed to move a message to directory.";
        var ecode = "client.templates.camera.tmpl-camera.resOnError.failed";
        lg("e", "cl", {error: ecode, reason: msg, details:error}, "");
       // console.log(error.code);
        //console.log(error);
    }
}