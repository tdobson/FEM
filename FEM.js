// define undefined variables
 if(! count) {
 	var count = 0;
 }
 if(!MFAB){
  	var MFAB=0;
 }
 if(!MFBA){
  	var MFBA=0;
 }

//scroll
function scrollInputs() {
    location.hash = "#inputs";
}

//hide the data input field that aren't needed
function hideValues(){
	document.getElementById('W').type = "hidden"
	document.getElementById('a').type = "hidden"
}


function addLoad() {
	var W = parseFloat(document.getElementById('W').value);
	var a = parseFloat(document.getElementById('a').value);
	var l = parseFloat(document.getElementById('l').value);
	var b=1-a;
	var x =a*l;
	var xb =b*l;
	var x2 =l-2*a*l;
	var Wper = W/x;
	var Wper2 =W/x2;

	if (a>1 || isNaN(W) || isNaN(a) || isNaN(l)){
		alert("Please try again. Some values are not entered correctly.");
	}else{
		//Add to the number of loads recorded
		count++;
		document.getElementById('currentLoads').innerHTML = count + " load(s) currently added:"
		
		//after the first load is submitted, don't allow the length of the beam to be changed
		if(document.getElementById('l').disabled==false){
			document.getElementById('l').value=l+"m";
			document.getElementById('l').disabled=true
		}
		//calculate the FEM and update loading log
		if (document.getElementById('pload').checked){
	      	MFAB = MFAB - a*b*b*W*l;
	     	MFBA = MFBA + a*a*b*W*l;
	     	document.getElementById('loading').innerHTML+= "Point load of "+W+"kN, "+x+"m from the left. <br>"
	    }else if (document.getElementById('udl_1').checked){
	      	MFAB = MFAB - W*l*(a*(6-8*a+3*a*a))/12;
	     	MFBA = MFBA + W*l*(a*a*(4-3*a))/12;
	     	document.getElementById('loading').innerHTML+= "UDL of "+W+"kN ("+Wper+"kN/m), spanning "+x+"m from the left side. <br>"
	    }else if (document.getElementById('udl_1r').checked){
	      	MFAB = MFAB - W*l*(b*b*(4-3*b))/12;
	     	MFBA = MFBA + W*l*(b*(6-8*b+3*b*b))/12;
	     	document.getElementById('loading').innerHTML+= "UDL of "+W+"kN ("+Wper+"kN/m), spanning "+xb+"m from the right side. <br>"
	    }else if (document.getElementById('udl_2').checked){
	    	if (a<0.5){
	    		MFAB = MFAB - W*l*(1+2*a-2*a*a)/12;
	     		MFBA = MFBA + W*l*(1+2*a-2*a*a)/12;
	     		document.getElementById('loading').innerHTML+= "UDL of "+W+"kN ("+Wper2+"kN/m), starting "+x+"m from either side and spanning "+x2+"m. <br>"
	    	}else{
	    		alert("Alpha must be smaller than 0.5 for this loading system")
	    		count--;
	    	}
		}else if (document.getElementById('mom').checked){
	      	MFAB = MFAB - W*l*b*(1-3*a);
	     	MFBA = MFBA + W*l*a*(2-3*a);
	     	document.getElementById('loading').innerHTML+= "...";
			document.getElementById('MFBA').innerHTML = "...";
		}
		calc();
	}
}

//reset
function reset(){
	count=0;
	document.getElementById('currentLoads').innerHTML = ""
	MFAB=0;
	MFBA=0;
	document.getElementById('MFAB').innerHTML = "";
	document.getElementById('MFBA').innerHTML = "";
	document.getElementById('l').disabled=false;
	document.getElementById('l').value="";
	document.getElementById('W').value="";
	document.getElementById('a').value="";
	document.getElementById('loading').innerHTML="";
}

//display MFAB and MFBA
function calc(){
	document.getElementById('MFAB').innerHTML = "The FEM M"+"F".sub()+"AB = "+ MFAB +"kNm";
	document.getElementById('MFBA').innerHTML = "The FEM M"+"F".sub()+"BA = "+ MFBA+"kNm";
}

function calcPy(){
	var startx = document.getElementById('startx').value;
	var endx = document.getElementById('endx').value;
	var starty = document.getElementById('starty').value;
	var endy = document.getElementById('endy').value;
	var startz = document.getElementById('startz').value;
	var endz = document.getElementById('endz').value;
	var PyAns = Math.sqrt((startx-endx)*(startx-endx)+(starty-endy)*(starty-endy)+(startz-endz)*(startz-endz));
	document.getElementById('PyAns').innerHTML = parseFloat(PyAns).toFixed(4);;
}


