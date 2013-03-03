(function(app, undefined){
	var sourceData = {
	    	level: 70,
	    	distance: 10,
	    	barrier: 0,
	    	time: 1
	    };
	

	
	jQuery.extend(app.views, {
		fieldset: function (node, model) {
			var elem = jQuery(node),
			    output = elem.find('.source_output');
			
			model.on('output', function(model) {
				var value = model.get('output');
				output.html(Math.round(value) + ' dB');
			});
			
			elem.data('model', model);
			
			model.trigger('output');
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
				
				console.log(elem, model, name, value);
				
				model.set(name, value);
			});

			jQuery(document)
			.on('click', 'button', function (e) {
				var sourceModel = new app.models.Source(sourceData);
				    sourceNode = app.render('fieldset', {
				    	pk: app.data.sources.length
				    });
				
				app.data.sources.push(sourceModel);
				app.views.fieldset(sourceNode, sourceModel);
				elem.append(sourceNode);
			});
		}
	});
})(noiseApp, Model);