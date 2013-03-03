(function(jQuery, app, Model, acfns, undefined){
	var debug = true;
	
	
	var recFacade = true,
	    srcFacade = false,
	    swlBool = false,
	    refDist = 10;
	
	
	// Prototype Functions

	

	
	function kbar(barLineOfSite){

		var kbarvar;

		switch (barLineOfSite) {
			case 0:
				kbarvar = 0;
				break;
			case 1:
				kbarvar = 5;
				break;
			case 2:
				kbarvar = 10;
				break;
		}
		
		return kbarvar;
	}
	
	function kfac(srcFacade,recFacade){

		var kfacvar = 0;

		if (srcFacade === true){
			kfacvar = kfacvar + 3;
		}
		
		if (recFacade === true){
			kfacvar = kfacvar + 3;
		}

		return kfacvar;
	}
	
	function ksLw(r){

		if (r>=25){
			return 25*acfns.log10(r)+1;
		}
		else{
			return khLw(r);
		}

	}

	function khLw(r){

		return 20*acfns.log10(r)+8;

	}

	function ks(d,r){

		return 25*acfns.log10(r/d)-2;

	}

	function kh(d,r){
		console.log(d, r, acfns.log10(r/d));
		return 20*acfns.log10(r/d);

	}

	function kpercOnTime(p){

		return 10*acfns.log10(1/p);

	}
	
	function SourceModel(data, url) {
		Model.apply(this, arguments);
		
		var kpercOnTimeVar = kpercOnTime(this.get('time')),
			kbarVar = kbar(this.get('barrier')),
			kfacVar = kfac(srcFacade,recFacade),
			khVar,
			srcNoiseLvl = this.get('level');
		
		distAttenuation(this.get('distance'), refDist);
		recNoiseLevel(this);
		
		function recNoiseLevel(model){
			
			console.log('>>>', srcNoiseLvl - attenuation());
			
			model.set('output', srcNoiseLvl - attenuation());
		}	


		
		function attenuation(){
			return khVar + kpercOnTimeVar + kbarVar + kfacVar;
		}
		
		
		function distAttenuation(dist, refDist){
			if (swlBool) {
				khVar = khLw(dist);
			}
			else {
				khVar = kh(dist, refDist);
			}
		}
		
		
		this.on('level', function(sourcemodel){
			if (debug) console.log(sourcemodel.get('level'));
			
			srcNoiseLvl = sourcemodel.get('level');
			recNoiseLevel(sourcemodel);
		});
		
		this.on('distance', function(sourcemodel){
			if (debug) console.log(sourcemodel.get('distance'));
			
			distAttenuation(sourcemodel.get('distance'),refDist);
			recNoiseLevel(sourcemodel);
		});
			
		this.on('barrier', function(sourcemodel){
			if (debug) console.log(sourcemodel.get('barrier'));
			
			kbarVar = kbar(sourcemodel.get('barrier'));
			recNoiseLevel(sourcemodel);
		});
		
		this.on('time', function(sourcemodel){
			if (debug) console.log(sourcemodel.get('time'));
			
			kpercOnTimeVar = kpercOnTime(sourcemodel.get('time'));
			recNoiseLevel(sourcemodel);
		});
	};
	
	SourceModel.prototype = Object.create(Model.prototype);
	
	jQuery.extend(SourceModel.prototype, {
		
	});
	
	// Export the model
	app.models.Source = SourceModel;
})(jQuery, noiseApp, Model, acfns);