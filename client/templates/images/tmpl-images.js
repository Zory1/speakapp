Template.images.helpers({
	images: function(){
		try{
			var results = Images.find().fetch();
			var msg = "Retrieved images that belong to this user.";
			var ecode = "client.templates.images.tmpl-images.helpers.images.success";
			lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
			return results; 
		} catch (e){
			var msg = "Failed to retrieve the images that belong to this user.";
			var ecode = "client.templates.images.tmpl-images.helpers.images.failed";
			lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
		}

	}
});