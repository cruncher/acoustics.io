(function(app, undefined){
	app.views.total = function (node, model) {
		var elem = jQuery(node);
		
		model.on('total', function(model) {
			var value = model.get('total');
			
			elem.html(Math.round(value) + ' dB');
		});
		

	};
})(noiseApp, Model);