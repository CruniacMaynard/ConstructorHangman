var Word = require('./letter.js');


function Letter (value){
	
	this.value = value; 
	this.visible = false;
}


Letter.prototype.show = function() {

	return (this.visible) ? this.value : " _ ";
}

module.exports  = Letter;

