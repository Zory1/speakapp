Meteor.methods({
  
  addUserToRole: function (userId, addrole, partition) {
    if (this.userId === userId) throw new Meteor.Error('unauthorized', "You can not update your own role. Unauthorized.");
      var user_seen = false;
      var uemail = Meteor.users.findOne({"_id": userId }).emails[0].address;
      var temp = {};

      var temp_group = partition;
      temp[temp_group] = addrole;
    
      console.log("addUserToRole, here is temp as object:");
      console.log(temp);
//check if record exists for this user, create one if there is none
    if(UsersInRoles.find({ _id: userId }).fetch().length == 0){
      
      console.log("addUserToRole: there is no user with this id, inserting record with id " + userId + "...");
      UsersInRoles.insert({
        "_id" : userId,
        "email": uemail,
        "roles":[]
      });
    }
//check if this partition already exists, update it if it does
    var allroles = UsersInRoles.find({_id: userId}).fetch()[0].roles;
    if(allroles.length > 0){
      for(var i=0; i < allroles.length; i++){
        if(typeof allroles[i][partition] != "undefined"){
          console.log("Found this partition in user roles at index " + i);
          allroles[i][partition] = addrole;
          
          UsersInRoles.update({_id: userId}, {$set: {roles: allroles}});
          user_seen = true;
          console.log("New set of roles is: ");
          console.log(UsersInRoles.find({_id: userId}).fetch()[0].roles);
        }
      }

    }
      if(!user_seen){UsersInRoles.update({_id:userId}, {$push: {roles:temp}});}
      Roles.setUserRoles(userId, addrole, partition);
      return;
  },

  returnIdByEmail: function(email){
  	return Accounts.findUserByEmail(email)['_id'];
  },

  assignToPublicUser: function(userId, usergroup){
    var allroles = UsersInRoles.find({_id: userId}).fetch()[0].roles;
    for(var i=0; i < allroles.length; i++){
      if(typeof allroles[i][usergroup] != "undefined"){
          console.log("Found this partition in user roles at index " + i);
          allroles.splice(i,1);
          
          UsersInRoles.update({_id: userId}, {$set: {roles: allroles}});
          
          console.log("New set of roles is: ");
          console.log(UsersInRoles.find({_id: userId}).fetch()[0].roles);
        }
      }
  	Roles.setUserRoles(userId, ['Public'], usergroup);
  }
  
});