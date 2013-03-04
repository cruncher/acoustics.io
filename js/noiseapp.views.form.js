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
		    sourceNode = app.render('source', { pk: 0 }),
		    sourceView = app.views.source(sourceNode, sourceModel);
		
		elem
		.on('click', 'button', function (e) {
			var sourceModel = new app.models.Source();
			    sourceNode = app.render('source', {
			    	pk: app.data.sources.length
			    }),
			    sourceView = app.views.source(sourceNode, sourceModel);
			
			app.data.sources.push(sourceModel);
			sourcesWrap.append(sourceNode);
			collectOutputs(app.data.sources, sourceModel, sendOutputs);
			sourceView.find('input').focus();
			
			e.preventDefault();
		});
		
		sourcesWrap
		.on('change', 'input, select', function(e) {
			var elem = jQuery(e.target).closest('fieldset'),
			    model = elem.data('model'),
			    name = e.target.getAttribute('data-prop') || e.target.name,
			    value = parseFloat(e.target.value);
			
			console.log(elem, model, name, value);
			
			model.set(name, value);
		})
		.append(sourceNode);
		
		app.data.sources = [sourceModel];
		collectOutputs(app.data.sources, sourceModel, sendOutputs);
	};
})(jQuery, noiseApp, Model);