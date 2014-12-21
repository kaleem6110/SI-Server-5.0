/**
 * 
 */

//remove all characters other then numeric, alphabates and _
String.prototype.removeSpecialCharacter = function(){
	return this.replace(/[^a-zA-Z0-9_]/g, '');
}