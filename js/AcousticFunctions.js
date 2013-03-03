(function(window){

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
	
	window.acfns={
		log10: log10,
		dBAdd: dBAdd,
		dBAvg: dBAvg
	};
})(window);