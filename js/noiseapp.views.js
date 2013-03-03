(function(app, undefined){
	var sourceData = {
	    	level: 70,
	    	distance: 10,
	    	barrier: 0,
	    	time: 1,
	    	output: 0
	    };
	
	jQuery.extend(app.views, {
		fieldset: function (node, model) {
			var elem = jQuery(node),
			    output = elem.find('.source_output');
			
			model.on('output', function (model) {
				var value = model.get('output');
				output.html(Math.round(value));
			});
			
			elem.data('model', model);
		},
		
		form: function(node, model) {
			var elem = jQuery(node),
			    sourceModel = new app.models.Source(sourceData);
			    sourceNode = app.render('fieldset', {
			    	pk: 0
			    });
			
			app.data.sources = [sourceModel];
			app.views.fieldset(sourceNode, sourceModel);
			
			elem
			.append(sourceNode)
			.on('change', 'input, select', function(e) {
				var elem = jQuery(e.target).closest('fieldset'),
				    model = elem.data('model'),
				    name = e.target.name,
				    value = parseFloat(e.target.value);
				
				model.set(name, value);
			});

			jQuery(document)
			.on('click', 'button', function (e) {
				var sourceModel = new app.models.Source({});
				    sourceNode = app.render('fieldset', {
				    	pk: app.data.sources.length || 0
				    });
				
				app.data.sources.push(sourceModel);
				elem.append(sourceNode);
			});
		}
	});
})(noiseApp, Model);