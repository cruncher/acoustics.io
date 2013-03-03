(function(jQuery, app, Model, acfns, undefined){
	var debug = true;
	
	// Class logic
	
	function TotalModel(data, url) {
		if (!(this instanceof TotalModel)) {
			return new TotalModel(data, url);
		}
		
		Model.apply(this, arguments);
		
		// Instance logic
		
	};
	
	
	// Inherit prototype
	
	TotalModel.prototype = Object.create(Model.prototype);
	
	jQuery.extend(TotalModel.prototype, {
		
	});
	
	// Export
	app.models.Total = TotalModel;
	
})(jQuery, noiseApp, Model, acfns);