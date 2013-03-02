(function(app, undefined){
	var fieldsetData = {};
	
	
	jQuery.extend(app.views, {
		fieldset: function (node, model) {
			var elem = jQuery(node),
			    output = elem.find('output');
			
			model.on('output', function (model) {
				output.html(model.get('output'));
			});
		},
		
		form: function(node, model) {
			var elem = jQuery(node),
			    sourceModel = new app.models.Source(fieldsetData);
			    sourceNode = app.render('fieldset', {
			    	pk: 0
			    });
			
			app.data.sources = [sourceModel];
			
			elem.append(sourceNode);
		}
	});
})(noiseApp, Model);