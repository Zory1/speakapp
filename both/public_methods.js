Meteor.startup(function(){
	listOfKnownErrors = [];
	errorsToDisplay = [];
	successToDisplay =[];

	isKnownError = function (error,listOfKnownErrors) { 
	   return _.contains(listOfKnownErrors, error);
	};

	lg = function (type, origin, error, otherReason){
	//lg(type,origin,userId,error,reason,details)


		if (type == "e" && typeof error.reason !="undefined" && isKnownError(error.reason)) {
		    		errosToDisplay.push(error.reason);
		  		} else if(type == "e" && typeof error.reason !="undefined" && !isKnownError(error.reason)) {
		  			var msg = "An unknown error occurred while " + otherReason;
		    		errorsToDisplay.push(msg);
				}

		Meteor.call("addLog", type, origin, error.error, error.reason, error.details, function(error,result){
			if(error){
				console.log("Could not add log entry in server.methods.addLog");
				console.log(error);
			}
		});

}
});