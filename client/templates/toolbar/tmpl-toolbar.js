Template.toolbar.events({
	'click #btnAdd' : function(e){
		console.log("Toolbar was clicked");
		addImageToDB();
	},
	'keypress #txtAdd' : function(e){
		if(e.keyCode!=13) return;
		addImage();
	}
});

function addImageToDB(){

	try{
		var txtNode = $('#txtAdd');
		if(!txtNode || !txtNode.val() || !Meteor.userId()) {
			console.log("Must be logged in to add image.");
			return;
		} 
	} catch(error){
		if (isKnownError(error.reason)) {
	    		errosToDisplay.push(error.reason);
	  		} else {
	  			var msg = "An unknown error occurred while extracting your image input.";
	    		errorsToDisplay.push(error);
			}
	}
	Meteor.call('addImage', txtNode.val(), function(error, result){
		if(error){
			if (isKnownError(error.reason)) {
	    		errosToDisplay.push(error.reason);
	  		} else {
	  			var msg = "An unknown error occurred while adding your image to database.";
	    		errorsToDisplay.push(error);
			}
		} else {
			var msg = "Successfully saved image.";
			lg("s", "s", {"error":"client.templates.tmpl_toolbar.addImageToDB.success", "reason":"", "details":""});
	    	successToDisplay.push(msg);
	  }
		}
	);

	txtNode.val('');
}