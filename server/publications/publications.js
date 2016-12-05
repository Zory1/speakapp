// general server-side code
Meteor.publish('images', function(){
	try {
		return Images.find({owner:this.userId});	
	} catch(e) {
		var msg = "Could not publish images collection in server.publications.publications";
	    var ecode = "server.publications.publications.images";
	    listOfKnownErrors.push(ecode);
	    throw new Meteor.Error(ecode, msg, "");
	}
})

Meteor.publish('users_in_roles', function(){
	try {
		var family={};
		var friends ={};
		var offsprings = {};

		var group =  this.userId;
		family[group] = "Family member";
		friends[group] = "Family friend";
		offsprings[group] = "Offspring";

		return UsersInRoles.find({roles:{$in:[family, friends, offsprings]}}); 	
	} catch(e) {
	    var msg = "Could not publish users_in_roles collection in server.publications.publications";
	    var ecode = "server.publications.publications.users_in_roles";
	    listOfKnownErrors.push(ecode);
	    throw new Meteor.Error(ecode, msg, "");
  }
	
})

Meteor.publish('logs', function(){
	try {
		return Logs.find({userId: this.userId});
	} catch (e) {
	    var msg = "Could not publish logs collection in server.publications.publications";
	    var ecode = "server.publications.publications.logs";
	    listOfKnownErrors.push(ecode);
	    throw new Meteor.Error(ecode, msg, "");
  }
})