//js for content permissions that currently logged in user sets for her content

Template.contentpermissions.events({
	'click #contentPermissions' : function(){
		addContentPermissions();
	}
});

function addContentPermissions(){
	try{
			var permValues = $('.contentPerm:checked');
			var imgID = $('#oneImage').val();
			
			if(!permValues || !permValues.val() || !Meteor.userId() || !imgID) {
				var msg = "Failed to add content permissions as either roles, user id or image id was not specified";
				var ecode = "client.templates.content_permissions.events.addContentPermissions.failed";
				lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
				return;
			}
			
			var vals = [];
			permValues.each(function(i){
				vals[i] = $(this).val();
			});
			
			//console.log("Values: " + vals + ", image to update: " + imgID);
			Meteor.call("updateImageVisibility", imgID,vals,function(error,result){
				if(error){
					var msg = "Failed to update image visibility.";
					var ecode = "client.templates.toolbar.updateImageVisibility.failed";
					lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
				} else {
					var msg = "Successfully updated image visibility.";
					lg("t", "cl", {"error":"client.templates.tmpl_toolbar.addImageToDB.success", "reason":msg, "details":""},"");	
				}
			});

			$('#oneImage').val("");
			permValues.each(function(i){
			$(this).attr('checked', false);
		});
	
	}catch(e){
			var msg = "Failed to add content permissions.";
			var ecode = "client.templates.content_permissions.events.addContentPermissions.failed";
			lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
	}
	
}