var ln = Math.log;
var pow = Math.pow;

function log10(n) {
  return ln(n) / ln(10);
}

function dBAdd(n) {

	var dBObj = dBCalc(arguments);
	return 10*log10(dBObj.totpow);

}

function dBAvg(n) {

	var dBObj = dBCalc(arguments);
	return 10*log10(dBObj.totpow/dBObj.totnum);

}

function dBCalc(n){

	var ctrarg = n.length;
	var arr;
	var totpow = 0;
	var totnum = 0;
	
	while(ctrarg--){
	
		arr = n[ctrarg];
		
		if(arr instanceof Array){ 
			
			var dBObj = dBCalc(arr);
			totpow = dBObj.totpow + totpow;
			totnum = dBObj.totnum + totnum;

		}
		else{
		
			totpow = pow(10,arr/10)+totpow;
			totnum++;
		
		}
	}
	
	return {totpow:totpow, totnum:totnum};
}

// BS 5228-1 calculations

var srcFacade;
var recFacade;
var srcNoiseLvl;
var refDist;
var dist;
var barLineOfSite;
var percOnTime;
var recNoiseLvl;
var swlBool;

recFacade = True;
srcFacade = False;
swlBool = False;
refDist = 10;

function recNoiseLevel{

	return srcNoiseLvl - attenuation;

}


function attenuation{
	
	var attvar = 0;
	
	if swlBool{
	
		attvar = khLw(dist);
	
	}
	else{
	
		attvar = kh(refDist,dist);
	
	}
	
	 attvar = attvar + kpercOnTime(percOnTime) + kbar(barLineOfsite) + kfac(srcFacade,recFacade);
	 
	 return attvar;
}

function kfac(srcFacade,recFacade){

	var kfacvar = 0;

	if srcFacade = True{
		kfacvar = kfacvar + 3;
	}
	
	if recFacade = True{
		kfacvar = kfacvar + 3;
	}

	return kfacvar;
}

function kbar(barLineOfSite){

var kbarvar

switch (barLineOfSite) {
	case (barLineOfSite === "No barrier"):
		kbarvar = 0;
		break;
	case (barLineOfSite === "Plant just visible"):
		kbarvar = 5;
		break;
	case (barLineOfSite === "No line of site"):
		kbarvar = 10;
		break;
	}	
	return kbarvar;
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

funtion kpercOnTime(p){

	return 10*log10(1/p);

}




