Meteor.startup(function(){
	
	errorsToDisplay = []; // empty those once displayed
	successToDisplay =[]; // empty those once displayed

	isKnownError = function (error) { 
		Meteor.call('isKnownErrorExists', error, function(error, results){
			if(error){
				lg("e", "s", error);
			} 
		  });
	};


	addToKnownErrors = function(error, msg){
		Meteor.call('addKnownError', error, msg, function(error, results){
			if(error){
				lg("e", "s", error);
			} 
		  });	
	}

	lg = function (type, origin, error, otherReason){
	//lg(type,origin,userId,error,reason,details)
		if(type == "e" && !isKnownError &&  typeof error.error != "undefined" && typeof error.reason != "undefined"){
			addToKnownErrors(error.error, error.reason);
		}

		if (type == "e" &&  isKnownError(error.reason)) {
		    		errosToDisplay.push(error.reason);
		  		} else if(type == "e") {
		  			error.details = "An unknown error occurred while " + otherReason;
				}

		if(type == "s"){ successToDisplay.push(error.reason); }

		Meteor.call("addLog", type, origin, error.error, error.reason, error.details, function(error,result){
			if(error){
				console.log("Could not add log entry in server.methods.addLog");
				console.log(error);
			}
		});

}
});