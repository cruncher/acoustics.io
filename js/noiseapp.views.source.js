(function(jQuery, app, Model, undefined){
	app.views.source = function (node, model) {
		var elem = jQuery(node),
		    distElem = elem.find('.lp_dist'),
		    output = elem.find('.source_output'),
			levelreadout = elem.find('.level_readout'),
			ontimereadout = elem.find('.ontime_readout');
		
		model.on('output', function(model) {
			var value = model.get('output');
			output.html(Math.round(value) + ' dB');
		});
		
		model.on('level', function(model) {
			var value = model.get('level');
			levelreadout.html(Math.round(value) + ' dB');
		});
		
		model.on('time', function(model) {
			var value = model.get('time');
			ontimereadout.html(Math.round(value) + '%');
		});
		
		elem
		.data('model', model)
		.on('change', '[name="leveltype"]', function(e) {
			// Lp is 0, Lw is 1. We want to listen for when Lp is checked
			if (e.currentTarget.value === "0" && e.currentTarget.checked) {
				distElem.removeClass('hidden');
			}
			else {
				distElem.addClass('hidden');
			}
		});
	};
})(jQuery, noiseApp, Model);