(function(jQuery, app, Model, undefined){
	
	
	
	
	function SourceModel(data, url) {
		Model.apply(this, arguments);
	};
	
	SourceModel.prototype = Object.create(Model.prototype);
	
	jQuery.extend(SourceModel.prototype, {
		a: 'yeah'
		
	});
	
	// Export the model
	app.models.Source = SourceModel;
})(jQuery, noiseApp, Model);