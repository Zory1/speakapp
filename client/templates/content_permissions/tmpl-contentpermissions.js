//js for content permissions that currently logged in user sets for her content
Template.contentpermissions.events({
	'click #contentPermissions' : function(){
		addContentPermissions();
	}
});

function addContentPermissions(){
	var permValues = $('.contentPerm:checked');
	var imgID = $('#oneImage').val();
	
	if(!permValues || !permValues.val() || !Meteor.userId() || !imgID) return;
	var vals = [];
	permValues.each(function(i){
		vals[i] = $(this).val();
	});
	
	console.log("Values: " + vals + ", image to update: " + imgID);
	Images.update( imgID, {
		$set: { visibility: vals}
	});

	$('#oneImage').val("");
	permValues.each(function(i){
		$(this).attr('checked', false);
	});	
}