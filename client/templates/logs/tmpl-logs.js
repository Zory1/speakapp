
Template.logs.helpers({
	logEntries: function(){
		try{
			var results = Logs.find().fetch();
        	return results;

		}catch(e){
			var msg = "Failed to retrieve full set of logs.";
			var ecode = "client.templates.logs.tmpl-logs.helpers.logEntries.failed";
        	lg("e", "cl", {error: ecode, reason: msg, details:""}, "");
		}
	}
	
});