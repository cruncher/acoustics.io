(function(jQuery, app, Model, undefined){
	
	var recFacade = true,
	    srcFacade = false,
	    swlBool = false,
	    refDist = 10;
	
	
	// Prototype Functions

	

	
	function kbar(barLineOfSite){

		var kbarvar

		switch (barLineOfSite) {
			case (barLineOfSite === 0):
				kbarvar = 0;
				break;
			case (barLineOfSite === 1):
				kbarvar = 5;
				break;
			case (barLineOfSite === 2):
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
			return 25*log10(r)+1;
		}
		else{
			return khLw(r);
		}

	}

	function khLw(r){

		return 20*log10(r)+8;

	}

	function ks(d,r){

		return 20*log(r/d);

	}

	function kh(d,r){

		return 25*log(r/d)-2;

	}

	function kpercOnTime(p){

		return 10*log10(1/p);

	}
	
	function SourceModel(data, url) {
		Model.apply(this, arguments);
		
		var kpercOnTimeVar = kpercOnTime(this.get('time')),
			kbarVar = kbar(this.get('barrier'),
			kfacVar = kfac(srcFacade,recFacade),
			khVar,
			srcNoiseLvl = this.get('level');
		
		distAttenuation(sourcemodel.get('distance',refDist))
		recNoiseLevel(this);
		
		function recNoiseLevel(model){
					
			model.set('output', srcNoiseLvl - attenuation());
		}	


		
		function attenuation(){
		
			return khVar + kpercOnTimeVar + kbarVar + kfacVar;
		 
		}
		
		
		function distAttenuation(dist, refDist){
	
			if (swlBool){
		
				khVar = khLw(dist);
		
			}
			else{
		
				khVar = kh(refDist,dist);
		
			};
		}
		
		
		this.on('level', function(sourcemodel){
			srcNoiseLvl = sourcemodel.get('level');
			recNoiseLevel(sourcemodel);
		});
		
		this.on('distance', function(sourcemodel){
			distAttenuation(sourcemodel.get('distance',refDist));
			recNoiseLevel(sourcemodel);
		});
			
		this.on('barrier', function(sourcemodel){
			kbarvVar = kbar(this.get('barrier')));
			recNoiseLevel(sourcemodel);
		});
		
		this.on('time', function(sourcemode){
			kpercVar = kpercOnTime(this.get('time'));
			recNoiseLevel(sourcemodel);
		});
	};
	
	SourceModel.prototype = Object.create(Model.prototype);
	
	jQuery.extend(SourceModel.prototype, {
		a: 'yeah'
		
	});
	
	// Export the model
	app.models.Source = SourceModel;
})(jQuery, noiseApp, Model);