(function(jQuery, app, Model, acfns, undefined){
	var debug = false;//true;
	
	// Class logic
	
	function calcTotal(totalmodel) {
		var outputs = totalmodel.get('outputs');
		
		totalmodel.set('total', acfns.dBSum(outputs));
		
		
		
		console.log(outputs);
	}
	
	function TotalModel(data, url) {
		if (!(this instanceof TotalModel)) {
			return new TotalModel(data, url);
		}
		
		Model.apply(this, arguments);
		
		// Instance logic
		
		this.on('outputs', calcTotal);
		
		
	};
	
	
	// Inherit prototype
	
	TotalModel.prototype = Object.create(Model.prototype);
	
	//jQuery.extend(TotalModel.prototype, {
		
	//});
	
	// Export
	app.models.Total = TotalModel;
	
})(jQuery, noiseApp, Model, acfns);