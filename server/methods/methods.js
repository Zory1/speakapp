Meteor.methods({
  
  addUserToRole: function (userId, addrole, partition) {
      try{
          if (this.userId === userId) throw new Meteor.Error('unauthorized', "You can not update your own role. Unauthorized.");
          var user_seen = false;
          var uemail = Meteor.users.findOne({"_id": userId }).emails[0].address;
          var temp = {};

          var temp_group = partition;
          temp[temp_group] = addrole;
        
    //check if record exists for this user, create one if there is none
        if(UsersInRoles.find({ _id: userId }).fetch().length == 0){
          
          UsersInRoles.insert({
            "_id" : userId,
            "email": uemail,
            "roles":[]
          });
          lg("t", "s", {error: "server.methods.methods.addUserToRole.success", reason: "addUserToRole: there is no user with this id, inserting record with id " + userId + "", details:""}, "");
        
        }
    //check if this partition already exists, update it if it does
        var allroles = UsersInRoles.find({_id: userId}).fetch()[0].roles;
        if(allroles.length > 0){
          for(var i=0; i < allroles.length; i++){
            if(typeof allroles[i][partition] != "undefined"){
              allroles[i][partition] = addrole;  
              UsersInRoles.update({_id: userId}, {$set: {roles: allroles}});
              user_seen = true;
              lg("t", "s", {error: "server.methods.methods.addUserToRole.success", reason: "addUserToRole: found user with id " + userId + " and updated it.", details:""}, "");
            }
          }

        }
          if(!user_seen){UsersInRoles.update({_id:userId}, {$push: {roles:temp}});}
          lg("t", "s", {error: "server.methods.methods.addUserToRole.success", reason: "addUserToRole: found user with id " + userId + " and updated it.", details:""}, "");
          Roles.setUserRoles(userId, addrole, partition);
          lg("i", "s", {error: "server.methods.methods.addUserToRole.success", reason: "Set user roles for user with id  " + userId + ".", details:""}, "");
          return; 
      }catch(e){
        var msg = "Failed to add  user " + userId +  " to role "  + addrole;
        var ecode = "server.methods.addUserToRole.failed";
        lg("e", "s", {error: ecode, reason: msg, details:""}, "");
        throw new Meteor.Error(ecode, msg, ""); 
      }
  },

  returnIdByEmail: function(email){
    try{
      var result = Accounts.findUserByEmail(email)['_id'];
      lg("t", "s", {error: "server.methods.methods.returnIdByEmail.success", reason: "Returned id for user with email  " + email + ".", details:""}, "");
      return result;
    } catch(e){
      var msg = "Failed to find user by email, email is " + email;
      var ecode = "server.methods.returnIdByEmail.failed";
      lg("e", "s", {error: ecode, reason: msg, details:""}, "");
      throw new Meteor.Error(ecode, msg, ""); 
    }

  },

  assignToPublicUser: function(userId, usergroup){
    try{
      var allroles = UsersInRoles.find({_id: userId}).fetch()[0].roles;
      for(var i=0; i < allroles.length; i++){
        if(typeof allroles[i][usergroup] != "undefined"){
      
            allroles.splice(i,1);
            
            UsersInRoles.update({_id: userId}, {$set: {roles: allroles}});
            
             lg("t", "s", {error: "server.methods.methods.assignToPublicUser.success", reason: "Assigned a public role to user with id  " + userId + ".", details:""}, "");
          }
        }
      Roles.setUserRoles(userId, ['Public'], usergroup);
       lg("i", "s", {error: "server.methods.methods.assignToPublicUser.success", reason: "Set user roles to public role for the user with id  " + userId + ".", details:""}, "");
    }catch(e){
      var msg = "Failed to assing user with id " + userId + " to public.";
      var ecode = "server.methods.assignToPublicUser.failed";
      lg("e", "s", {error: ecode, reason: msg, details:""}, "");
      throw new Meteor.Error(ecode, msg, ""); 
    }
  },

  addImage: function(txtNode){
      try{
        Images.insert({
        owner: Meteor.userId(),
        text: txtNode});
         lg("t", "s", {error: "server.methods.methods.addImage.success", reason: "Image was added to db.", details:""}, "");
      } catch (e){
        var msg = "Failed to add image to the database.";
        var ecode = "server.methods.addImage.failed";
        lg("e", "s", {error: ecode, reason: msg, details:""}, "");
        throw new Meteor.Error(ecode, msg, ""); 
      }
  },

  addLog: function(typeIn, originIn, errorIn, reasonIn, detailsIn){
    try{
        var types = {"e": "error", "i":"info", "t":"trace", "h":"history", "s":"success"};
        var origins = {"s":"server", "cl":"client", "cr":"cordova"};
        var type = origins[typeIn];
        var origin = types[originIn];

          var timestamp = moment().unix();
          var timestampFormat = moment().format();
          if(!reasonIn) {var reason = "n/a";} else { var reason = reasonIn;}
          if(!details){var details = "n/a";} else { var details = details;}

          Logs.insert({
            timestamp: timestamp,
            formatedTime: timestampFormat,
            type: type,
            origin: origin,
            userId: this.userId,
            path: errorIn,
            description: reason,
            details: details
          });
        } catch(e){
            console.log(e);
            throw new Meteor.Error("server.methods.addLog", "Did not add log entry.", "");
        }
  },

  addKnownError: function(name, msg){
      try{
        if(KnownErrors.find({ ename: name}).fetch().length == 0){
          KnownErrors.insert({ ename: name, displayMsg: msg });
           lg("t", "s", {error: "server.methods.methods.addKnownError.success", reason: "Added " + name + " error to db.", details:""}, "");
        }
      } catch(e){
          var msg = "Failed to add new error name to KnownError with the name " + name;
          throw new Meteor.Error("server.methods.addKnownError", msg, "");
      }
  }, 

  isKnownErrorExists: function(name){
    try{
      if(KnownErrors.find({ ename: name }).fetch().length == 0) return false;
      return true;
    } catch(e){
      var msg = "Failled to check if error with name " + name + " exists in db.";
      throw new Meteor.Error("server.methods.isKnownErrorExists", msg, "");
    }
  }
  
});