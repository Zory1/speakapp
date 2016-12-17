
Meteor.subscribe('images', {  
  onStop: function (e) {
    lg("e", "cl", e);
  }
});

Meteor.subscribe('users_in_roles', {  
  onStop: function (e) {
    lg("e", "cl", e);
  }
});

Meteor.subscribe('logs', {  
  onStop: function (e) {
    lg("e", "cl", e);
  }
});

Meteor.subscribe('knownErrors', {  
  onStop: function (e) {
    lg("e", "cl", e);
  }
});