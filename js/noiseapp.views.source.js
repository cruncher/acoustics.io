(function(jQuery, app, Model, undefined){
	app.views.source = function (node, model) {
		var elem = jQuery(node),
		    output = elem.find('.source_output');
		
		model.on('output', function(model) {
			var value = model.get('output');
			output.html(Math.round(value) + ' dB');
		});
		
		elem.data('model', model);
		
		// Immediately update the view 
		model.trigger('output');
	};
})(jQuery, noiseApp, Model);