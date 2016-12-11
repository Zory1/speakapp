//js for users global permissions within currently logged in user's content
Template.userpermissions.helpers({
	users_family_member: function(){
		try{
			var temp = {};
			var group = Meteor.userId();
			temp[group] = "Family member";
			//console.log("Retrieving UsersInRoles for " + group + " as object: ");
			//console.log(temp);
			//console.log("Query result is:");
			//console.log(UsersInRoles.find({roles: { $in: [temp]}}).fetch());
			var results  = UsersInRoles.find({roles: { $in: [temp]}}).fetch();
			var msg = "Retrieved list of family members.";
			var ecode = "client.templates.user_permissions.tmpl-userpermissions.helpers.users_family_member.success";
			lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
			return results;			
		} catch(e){
			var msg = "Failed to find users in family member role.";
        	var ecode = "client.templates.user_permissions.tmpl-userpermissions.helpers.users_family_member.failed";
        	lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
		}

	},

	users_family_friend: function(){
		try{
			var temp = {};
			var group = Meteor.userId();
			temp[group] = "Family friend";
			//console.log("Retrieving UsersInRoles for " + group + " as object: ");
			//console.log(temp);
			//console.log("Query result is:");
			//console.log(UsersInRoles.find({roles: { $in: [temp]}}).fetch());
			var results = UsersInRoles.find({roles: { $in: [temp]}}).fetch();
			var msg = "Retrieved list of family friends.";
			var ecode = "client.templates.user_permissions.tmpl-userpermissions.helpers.users_family_friend.success";
			lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
			return results;
		}catch(e){
			var msg = "Failed to find users in family friend role.";
			var ecode = "client.templates.user_permissions.tmpl-userpermissions.helpers.users_family_friend.failed";
        	lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
		}
	},	
	users_offspring: function(){
		try{
			var temp = {};
			var group = Meteor.userId();
			temp[group] = "Offspring";
			//console.log("Retrieving UsersInRoles for " + group + " as object: ");
			//console.log(temp);
			//console.log("Query result is:");
			//console.log(UsersInRoles.find({roles: { $in: [temp]}}).fetch());

			var results = UsersInRoles.find({roles: { $in: [temp]}}).fetch();

			var msg = "Retrieved offspring users";
			var ecode = "client.templates.user_permissions.tmpl-userpermissions.helpers.users_offspring.success";
			lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
			return results;   
		}catch(e){
			var msg = "Failed to find users in offspring role.";
			var ecode = "client.templates.user_permissions.tmpl-userpermissions.helpers.users_offspring.failed";
        	lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
		}
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
}

function getUserIdAndPermit(email){
	Meteor.call('returnIdByEmail', email, function(error, result){
			  if(error){
					var msg = "Failed to return user id by email.";
					var ecode = "client.templates.user_permissions.tmpl-userpermissions.getUserIdAndPermit.returnIdAndPermit.failed";
		        	lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
			  } else {
			  	//console.log("Got result from getUserIdAndPermit and here it is: "+result);
			  	var msg = "Retrieved user id for email " + email;
				var ecode = "client.templates.user_permissions.tmpl-userpermissions.getUserIdAndPermit.returnIdByEmail.success";
				lg("t", "cl", {error: ecode, reason: msg, details:""}, "");

			  	var permUserId = result;

			    //console.log("This is user id i got from getUserIdAndPermit: "+ permUserId);
				var permValue = $("select#roles").val();
				//console.log("This is a role passed to addUserToRole: "+permValue);
				Meteor.call('addUserToRole', permUserId, permValue, Meteor.userId(),
					function(error, result){
					  if(error){
					    //console.log(error.reason);
					    	var msg = "Failed to add user to role.";
							var ecode = "client.templates.user_permissions.tmpl-userpermissions.getUserIdAndPermit.addUserToRole.failed";
		        			lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
					    return;
					  }
						  	var msg = "Successfully added role " + permValue + " to the user " + permUserId;
						  	var ecode = "client.templates.user_permissions.tmpl-userpermissions.getUserIdAndPermit.success";
						  	lg("s", "cl", {error: ecode, reason: msg, details:""}, "");
					});
			  }
			});
}

function assignToPublic(userId){
	Meteor.call('assignToPublicUser', userId, Meteor.userId(), function(error, result){
		if(error){
			   // console.log("error from assignToPublin in tmpl-userpermissions.js: ", error);
		    	var msg = "Failed to assign public role to user with id " + userId;
				var ecode = "client.templates.user_permissions.tmpl-userpermissions.assignToPublic.failed";
    			lg("e", "cl", {error: ecode, reason: msg, details:""}, "");			   
			  } else {
			  	var msg = "User "+ userId + "was assigned  public role.";
				var ecode = "client.templates.user_permissions.tmpl-userpermissions.assignToPublic.success";
				lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
			  }
	})
}