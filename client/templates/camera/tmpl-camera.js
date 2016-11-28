if(Meteor.isCordova){
//js to make a picture using a camera or retrieve from file syste

Template.camera.events({
	'click #take_picture' : function(){
		if(!Meteor.userId()) throw new Meteor.Error('unauthorized', "You can not add or edit content without login in.");
		capturePhoto();
	},
	'click #take_edible' : function(){
		if(!Meteor.userId()) throw new Meteor.Error('unauthorized', "You can not add or edit content without login in.");
		capturePhotoEdit();
	},
		'click #get_from_library' : function(){
		if(!Meteor.userId()) throw new Meteor.Error('unauthorized', "You can not add or edit content without login in.");
		getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
	},
	'click #get_from_album' : function(){
		if(!Meteor.userId()) throw new Meteor.Error('unauthorized', "You can not add or edit content without login in.");
		getPhoto(navigator.camera.PictureSourceType.SAVEDPHOTOALBUM);
	}, 
  'click #store_to_album' : function(){
    if(!Meteor.userId()) throw new Meteor.Error('unauthorized', "You can not add or edit content without login in.");
    takeAndSavePic();
  }
});


    
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL });
    }

    function onPhotoDataSuccess(imageData) {
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
      console.log("Image displayed");
      

    }

      function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      console.log("This is from onPhotoURISuccess.");
      console.log(imageURI);

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
      console.log('This is transfored url: ' + urlTransformed);
      largeImage.src = urlTransformed;
      movePic(imageURI);
    }

    function onFail(message) {
      console.log('take_picture in tmpl-camera.js failed because: ' + message);
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
      getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
    }

    function movePic(file){ 
      console.log("movePic file:");
      console.log(file);
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
        //I do my insert with "entry.fullPath" as for the path
        console.log("This is entry from successMove: ");
        console.log(entry);
        console.log("Saving img with src: " + entry.fullPath);

        Images.insert({
          owner: Meteor.userId,
          src: entry.fullPath
        });
    }

    function resOnError(error) {
        console.log(error.code);
        console.log(error);
    }
}