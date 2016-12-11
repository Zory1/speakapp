Template.toolbar.events({
	'click #btnAdd' : function(e){
		//console.log("Toolbar was clicked");
		addImageToDB();
	},
	'keypress #txtAdd' : function(e){
		if(e.keyCode!=13) return;
		addImageToDB();
	}
});

function addImageToDB(){

	try{
		var txtNode = $('#txtAdd');
		if(!txtNode || !txtNode.val() || !Meteor.userId()) {
			var msg = "Must be logged in to add image.";
			var ename = "client.templates.toolbar.addImageToDB.notAuthorized.failed";
			//errorsToDisplay.push(msg);
			//console.log("Must be logged in to add image.");
        	lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
			return;
		} 
	} catch(error){
		
	}
	Meteor.call('addImage', txtNode.val(), function(error, result){
		if(error){
			var msg = "Failed to add image to db.";
			var ecode = "client.templates.toolbar.addImageToDB.failed";
			lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
		} else {
			var msg = "Successfully saved image.";
			lg("s", "s", {"error":"client.templates.tmpl_toolbar.addImageToDB.success", "reason":msg, "details":""},"");
	    	
	  }
		});

	txtNode.val('');
}