(function(jQuery, app, Model, undefined){
	app.views.source = function (node, model) {
		var elem = jQuery(node),
		    distElem = elem.find('.lp_dist'),
		    output = elem.find('.source_output');
		
		model.on('output', function(model) {
			var value = model.get('output');
			output.html(Math.round(value) + ' dB');
		});
		
		elem
		.data('model', model)
		.on('change', '[name="leveltype"]', function(e) {
			if (e.currentTarget.value === "lp" && e.currentTarget.checked) {
				distElem.removeClass('hidden');
			}
			else {
				distElem.addClass('hidden');
			}
		});
		
		// Immediately update the view 
		model.trigger('output');
	};
})(jQuery, noiseApp, Model);