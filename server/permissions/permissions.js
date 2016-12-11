/*Images.allow({
	insert: function(userId, fields){
		return(userId); //make sure user is logged in.
	},
	 update: function (userId, doc, fields, modifier) {
    return doc.owner === userId;
  }
})

UsersInRoles.allow({
	insert: function(userId, fields){
		return(userId); //make sure user is logged in.
	},
	 update: function (userId, doc, fields, modifier) {
    return doc.group === userId;
  }
})*/

Meteor.users.deny({
  update: function(userId, doc, fields, modifier) {
    return _.contains(fields, 'rules');
  }
});