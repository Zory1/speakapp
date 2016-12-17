
// general server-side code
Meteor.publish('images', function(){
	try {
		var result = Images.find({owner:this.userId});
		lg("t", "s", {error: "server.publications.images.success", reason: "Published images collection.", details:""}, "");
		return 	result;
	} catch(e) {
		var msg = "Could not publish images collection in server.publications.publications";
	    var ecode = "server.publications.publications.images.failed";
	    lg("e", "s", {error: ecode, reason: msg, details:""}, "");
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

		var result = UsersInRoles.find({roles:{$in:[family, friends, offsprings]}}); 

		lg("t", "s", {error: "server.publications.users_in_roles.success", reason: "Published users_in_roles collection.", details:""}, "");
		return result;	
	} catch(e) {
	    var msg = "Could not publish users_in_roles collection in server.publications.publications";
	    var ecode = "server.publications.publications.users_in_roles.failed";
	    lg("e", "s", {error: ecode, reason: msg, details:""}, "");
	    throw new Meteor.Error(ecode, msg, "");
  }
	
})

Meteor.publish('logs', function(){
	try {
		var result = Logs.find({userId: this.userId});
		return result;
	} catch (e) {
	    var msg = "Could not publish logs collection in server.publications.publications";
	    var ecode = "server.publications.publications.logs.failed";
	    throw new Meteor.Error(ecode, msg, "");
  }
})

Meteor.publish('knownErrors', function(){
	try {
		var result = KnownErrors.find({});
		lg("t", "s", {error: "server.publications.knownErrors.success", reason: "Published knownErrors collection.", details:""}, "");
		return result;
	} catch (e) {
		var msg = "Could not publish knownErrors collection in server.publications.publications";
		var ecode = "server.publications.publications.knownErrors.failed";
		throw new Meteor.Error(ecode, msg, "");
	}
})