//js for users global permissions within currently logged in user's content
Template.userpermissions.helpers({
	users_family_member: function(){
		var temp = {};
		var group = Meteor.userId();
		temp[group] = "Family member";
		console.log("Retrieving UsersInRoles for " + group + " as object: ");
		console.log(temp);
		console.log("Query result is:");
		console.log(UsersInRoles.find({roles: { $in: [temp]}}).fetch());
		return results  = UsersInRoles.find({roles: { $in: [temp]}}).fetch();
	},

	users_family_friend: function(){
		var temp = {};
		var group = Meteor.userId();
		temp[group] = "Family friend";
		console.log("Retrieving UsersInRoles for " + group + " as object: ");
		console.log(temp);
		console.log("Query result is:");
		console.log(UsersInRoles.find({roles: { $in: [temp]}}).fetch());
		return results  = UsersInRoles.find({roles: { $in: [temp]}}).fetch();
	},	
	users_offspring: function(){
		var temp = {};
		var group = Meteor.userId();
		temp[group] = "Offspring";
		console.log("Retrieving UsersInRoles for " + group + " as object: ");
		console.log(temp);
		console.log("Query result is:");
		console.log(UsersInRoles.find({roles: { $in: [temp]}}).fetch());
		return results  = UsersInRoles.find({roles: { $in: [temp]}}).fetch();
	}
});

Template.userpermissions.events({
	'click #usersPermissions' : function(){
		addUserPermissions();
	},
	'click .removeRoles' : function(e){
		assignToPublic(e.currentTarget.id);
	}
});

function addUserPermissions(){
	getUserIdAndPermit($('#user_id').val().trim());
	$('#user_id').val("");
}

function getUserIdAndPermit(email){
	Meteor.call('returnIdByEmail', email, function(error, result){
			  if(error){
			    console.log("error from returnIdByEmail: ", error);
			  } else {
			  	console.log("Got result from getUserIdAndPermit and here it is: "+result);

			  	var permUserId = result;

			    console.log("This is user id i got from getUserIdAndPermit: "+ permUserId);
				var permValue = $("select#roles").val();
				console.log("This is a role passed to addUserToRole: "+permValue);
				Meteor.call('addUserToRole', permUserId, permValue, Meteor.userId(),
					function(error, result){
					  if(error){
					    console.log(error.reason);
					    return;
					  }
					  	console.log("Successfully added role " + permValue + " to the user " + permUserId);
					});
			  }
			});
}

function assignToPublic(userId){
	Meteor.call('assignToPublicUser', userId, Meteor.userId(), function(error, result){
		if(error){
			    console.log("error from assignToPublin in tmpl-userpermissions.js: ", error);
			  } else {
			  	console.log("User "+ userId + "was assigned to public.");
			  }
	})
}