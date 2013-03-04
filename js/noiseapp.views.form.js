(function(jQuery, app, Model, undefined){
	function getOutput(model) {
		return model.get('output');
	}
	
	function collectOutputs(collection, model, fn) {
		model.on('output', function() {
			fn(collection.map(getOutput));
		});
	}
	
	function sendOutputs(outputs) {
		app.data.total.set('outputs', outputs);
	}
	
	app.views.form = function(node, model) {
		var elem = jQuery(node),
		    sourcesWrap = elem.find('.sources_wrap'),
		    sourceModel = new app.models.Source(),
		    sourceNode = app.render('source', {
		    	pk: 0
		    });
		
		elem
		.on('click', 'button', function (e) {
			var sourceModel = new app.models.Source();
			    sourceNode = app.render('source', {
			    	pk: app.data.sources.length
			    });
			
			app.data.sources.push(sourceModel);
			app.views.source(sourceNode, sourceModel);
			sourcesWrap.append(sourceNode);
			collectOutputs(app.data.sources, sourceModel, sendOutputs);
			
			e.preventDefault();
		});
		
		sourcesWrap
		.append(sourceNode)
		.on('change', 'input, select', function(e) {
			var elem = jQuery(e.target).closest('fieldset'),
			    model = elem.data('model'),
			    name = e.target.name,
			    value = parseFloat(e.target.value);
			
			console.log(elem, model, name, value);
			
			model.set(name, value);
		});
		
		app.data.sources = [sourceModel];
		app.views.source(sourceNode, sourceModel);
		collectOutputs(app.data.sources, sourceModel, sendOutputs);
		
		// Immediately update the view 
		sourceModel.trigger('output');
	};
})(jQuery, noiseApp, Model);