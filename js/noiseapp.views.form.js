(function(jQuery, app, Model, undefined){
	var defaultData = {
	    	level: 70,
	    	distance: 10,
	    	barrier: 0,
	    	time: 1
	    };
	
	app.views.form = function(node, model) {
		var elem = jQuery(node),
		    sourcesWrap = elem.find('.sources_wrap'),
		    sourceData = jQuery.extend({}, defaultData),
		    sourceModel = new app.models.Source(sourceData),
		    sourceNode = app.render('source', {
		    	pk: 0
		    });
		
		app.data.sources = [sourceModel];
		app.views.source(sourceNode, sourceModel);
		
		elem
		.on('click', 'button', function (e) {
			var sourceModel = new app.models.Source(sourceData);
			    sourceNode = app.render('source', {
			    	pk: app.data.sources.length
			    });
			
			app.data.sources.push(sourceModel);
			app.views.source(sourceNode, sourceModel);
			sourcesWrap.append(sourceNode);
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
	};
})(jQuery, noiseApp, Model);