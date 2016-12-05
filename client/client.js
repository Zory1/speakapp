Meteor.subscribe('images', {  
  onStop: function (e) {
    console.log("Error:", e.error);
    console.log("Reason:", e.reason);
    console.log("Details:", e.details);
  }
});

Meteor.subscribe('users_in_roles', {  
  onStop: function (e) {
    console.log("Error:", e.error);
    console.log("Reason:", e.reason);
    console.log("Details:", e.details);
  }
});

Meteor.subscribe('logs', {  
  onStop: function (e) {
    console.log("Error:", e.error);
    console.log("Reason:", e.reason);
    console.log("Details:", e.details);
  }
});