try{
	// client and server code
	Images = new Mongo.Collection('images');	
	UsersInRoles = new Mongo.Collection('users_in_roles');
	Logs = new Mongo.Collection("logs");
	KnownErrors = new Mongo.Collection("knownErrors");
} catch(err) {
	console.error('Could not initiate collections in speakapp.both.collections.model');
	console.warn(err);
}