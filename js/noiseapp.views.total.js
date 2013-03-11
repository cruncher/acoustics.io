(function(app, undefined){
	app.views.total = function (node, model) {
		var elem = jQuery(node);
		
		model.on('total', function(model) {
			var value = model.get('total');
			    str = Math.round(value) + ' dB';
			
			str = str.replace('Infinity', '&#8734;');
			
			elem.html(str);
		});
	};
})(noiseApp, Model);