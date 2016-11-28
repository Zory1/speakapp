// general server-side code
Meteor.publish('images', function(){
	return Images.find({owner:this.userId});
	//this.userId is the logged in user ID for the publish 'session'
})

Meteor.publish('users_in_roles', function(){
	var family={};
	var friends ={};
	var offsprings = {};

	var group =  this.userId;
	family[group] = "Family member";
	friends[group] = "Family friend";
	offsprings[group] = "Offspring";

	return UsersInRoles.find({roles:{$in:[family, friends, offsprings]}}); 
})