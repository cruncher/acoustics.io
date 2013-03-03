(function(app, undefined){
	var defaultData = {};
	
	jQuery.extend(app.views, {
		total: function (node, model) {
			var elem = jQuery(node),
			    output = elem.find('.total_output');
			
			model.on('total', function(model) {
				var value = model.get('total');
				output.html(Math.round(value) + ' dB');
			});
			
			// Immediately update the view 
			model.trigger('total');
		}
	});
})(noiseApp, Model);