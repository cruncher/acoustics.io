(function(jQuery, app, Model, acfns, undefined){
	var debug = false;//true;
	
	var recFacade = false,
	    srcFacade = false;
	
	
	// Prototype Functions

	
	function distAttenuation(dist, refDist, swl_spl){
	    var khVar
		
		if (swl_spl === 1) {
			khVar = khLw(dist);
		}
		else if (swl_spl === 0){
			khVar = kh(dist, refDist);
		}
		
		return khVar
	}
	
	function kbar(barLineOfSite){
		return -barLineOfSite;
	}
	
	function kfac(srcFacade,recFacade){

		var kfacvar = 0;

		if (srcFacade === true){
			kfacvar = kfacvar - 3;
		}
		
		if (recFacade === true){
			kfacvar = kfacvar - 3;
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

	function ks(r,d){
		return 25*acfns.log10(r/d)-2;
	}

	function kh(r,d){
		return 20*acfns.log10(r/d);
	}

	function kpercOnTime(p){
		return 10*acfns.log10(100/p);
	}
	
	function SourceModel(data, url) {
		// If data don't exist, set up some default data
		
		Model.call(this, data || {
			level: 70,
			levelref: 10,
			leveltype: 0,
			distance: 10,
			barrier: 0,
			time: 100
	    }, url);
		
		var kpercOnTimeVar = kpercOnTime(this._data.time),
			kbarVar = kbar(this._data.barrier),
			kfacVar = kfac(srcFacade,recFacade),
			khVar;
		
		khVar = distAttenuation(this._data.distance, this._data.levelref, this._data.leveltype);
		recNoiseLevel(this);
	
		function recNoiseLevel(sourcemodel){
			sourcemodel.set('output', sourcemodel._data.level - attenuation());
		}
		
		function attenuation(){
			return khVar + kpercOnTimeVar + kbarVar + kfacVar;
		}
				
		this.on('level', function(sourcemodel){
			if (debug) console.log(sourcemodel._data.level);
			
			recNoiseLevel(sourcemodel);
		});
		
		this.on('distance', function(sourcemodel){
			if (debug) console.log(sourcemodel._data.distance);
			
			khVar = distAttenuation(sourcemodel._data.distance,sourcemodel._data.levelref, sourcemodel._data.leveltype);
			recNoiseLevel(sourcemodel);
		});
			
		this.on('barrier', function(sourcemodel){
			if (debug) console.log(sourcemodel._data.barrier);
			
			kbarVar = kbar(sourcemodel._data.barrier);
			recNoiseLevel(sourcemodel);
		});
		
		this.on('time', function(sourcemodel){
			if (debug) console.log(sourcemodel._data.time);
			
			kpercOnTimeVar = kpercOnTime(sourcemodel._data.time);
			recNoiseLevel(sourcemodel);
		});
		
		
		this.on('leveltype', function(sourcemodel){
			if (debug) console.log(sourcemodel._data.leveltype);
			
			khVar = distAttenuation(sourcemodel._data.distance,sourcemodel._data.levelref, sourcemodel._data.leveltype);
			recNoiseLevel(sourcemodel);
		});

		this.on('levelref', function(sourcemodel){
			if (debug) console.log(sourcemodel._data.levelref);
			
			khVar = distAttenuation(sourcemodel._data.distance,sourcemodel._data.levelref, sourcemodel._data.leveltype);
			recNoiseLevel(sourcemodel);
		});
		
	};
	
	SourceModel.prototype = Object.create(Model.prototype);
	
	jQuery.extend(SourceModel.prototype, {
		
	});
	
	// Export the model
	app.models.Source = SourceModel;
})(jQuery, noiseApp, Model, acfns);