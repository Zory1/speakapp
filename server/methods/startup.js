
Meteor.startup(function(){
/* start setting up env variables to do with hosting */    
try{
  var theURL = "http://47ea61d6.ngrok.io";

    if (process.env.NODE_ENV === "development") {

        // home
        theURL = "http://47ea61d6.ngrok.io";

        // office
        //theURL = "http://192.168.10.30:3000";

    }

    Meteor.absoluteUrl.defaultOptions.rootUrl = theURL;
    process.env.ROOT_URL = theURL;
    process.env.MOBILE_ROOT_URL = theURL;
    process.env.MOBILE_DDP_URL = theURL;
    process.env.DDP_DEFAULT_CONNECTION_URL = theURL;

/* end setting up env variables to do with hosting */

//TODO: might need to remove ngrok once in production...
BrowserPolicy.content.allowSameOriginForAll();
BrowserPolicy.content.allowOriginForAll("*.ngrok.io", "localhost");
BrowserPolicy.content.allowImageOrigin("blob:");
BrowserPolicy.content.allowImageOrigin("*");


if(Meteor.isCordova){

    var pictureSource=navigator.camera.PictureSourceType;
    var destinationType=navigator.camera.DestinationType;
  }   
} catch(e){
    var msg = "Error happen when starting up server.";
    var ecode = "server.methods.startup.failed";
    lg("e", "s", {error: ecode, reason: msg, details:""}, "");
}
 
    //var pictureSource=navigator.camera.PictureSourceType;
    //var destinationType=navigator.camera.DestinationType;
//TODO: create method to make user an owner of her content (owner role for this id)

  /*  Accounts.onCreateUser(function(options,user){
        if(!user.profile){
            user.profile = {};
        }

        user.profile.firstname = options.firstname;
        user.profile.lastname = options.lastname;
        return user;
    });
    var users = Meteor.users.find().fetch();
    _.each(users,function(userData){
        if(userData.emails[0].address === 'george@home.com'){
            Roles.addUsersToRoles(userData,['admin']);
        }
    })
*/
});