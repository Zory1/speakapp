Template.toolbar.events({
	'click #btnAdd' : function(e){
		console.log("Toolbar was clicked");
		addImage();
	},
	'keypress #txtAdd' : function(e){
		if(e.keyCode!=13) return;
		addImage();
	}
});

function addImage(){
	var txtNode = $('#txtAdd');
	if(!txtNode || !txtNode.val() || !Meteor.userId()) {
		console.log("Must be logged in to add image.");
		return;
	} 
	Images.insert({
		owner: Meteor.userId(),
		text: txtNode.val()});
	txtNode.val('');
}