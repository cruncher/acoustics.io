(function(jQuery, app, Model, undefined){
	function getOutput(model) {
		return model.get('output');
	}

	function collectOutputs(collection, model, fn) {
		model.on('output', function() {
			fn(collection.map(getOutput));
		});
	}

	function uncollectOutputs(collection, model, fn) {
		model.off('output');
	}

	function sendOutputs(outputs) {
		app.data.total.set('outputs', outputs);
	}

	function skinInputs(node) {
		jQuery('.level_input, .ontime_input, .dist_input', node).each(function () {
			var input = jQuery(this),
			    cont = jQuery('<div class="x_skin_container skin_container container"></div>'),
			    skin = jQuery('<div id="x_skin" class="x_skin skin"></div>');
			
			cont.html(skin);
			
			input
			.after(cont)
			.addClass('hidden');
			
			skin.skinX(input, 'value');
		});
	}

	app.views.form = function(node, model) {
		var elem = jQuery(node),
		    pk = 1,
		    sourcesWrap = elem.find('.sources_wrap'),
		    sourceModel = new app.models.Source(),
		    sourceNode = app.render('source', { pk: pk++ }),
		    sourceView = app.views.source(sourceNode, sourceModel);
		
		elem
		.on('click', 'button', function (e) {
			var sourceModel = new app.models.Source();
			    sourceNode = app.render('source', {
			    	pk: pk++
			    }),
			    sourceView = app.views.source(sourceNode, sourceModel);
			
			app.data.sources.push(sourceModel);
			sourcesWrap.append(sourceNode);
			
			// Polyfill input[type="range"] with jQuery.skin
			if (jQuery.support.inputTypes.range === false) {
				skinInputs(sourceNode);
			}
			
			collectOutputs(app.data.sources, sourceModel, sendOutputs);
			sourceView.find('input').focus();
			sourceModel.trigger('output');
			
			e.preventDefault();
		});
		
		sourcesWrap
		.on('change', 'input, select', function(e) {
			var elem = jQuery(e.target).closest('fieldset'),
			    model = elem.data('model'),
			    name = e.target.getAttribute('data-prop') || e.target.name,
			    value = parseFloat(e.target.value);
			
			model.set(name, value);
		})
		.on('click', '[href="#remove"]', function(e) {
			var elem = jQuery(e.target).closest('fieldset'),
			    model = elem.data('model');
			
			// Destroy source
			model.off();
			elem.remove();
			
			var i = app.data.sources.indexOf(model);
			
			app.data.sources.splice(i,1);
			sendOutputs(app.data.sources.map(getOutput));
			e.preventDefault();
		})
		.append(sourceNode);
		
		// Polyfill input[type="range"] with jQuery.skin
		if (jQuery.support.inputTypes.range === false) {
			skinInputs(sourceNode);
		}
		
		app.data.sources = [sourceModel];
		collectOutputs(app.data.sources, sourceModel, sendOutputs);
	};
})(jQuery, noiseApp, Model);