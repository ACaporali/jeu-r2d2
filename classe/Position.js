/***
*
* Définition de la classe Position
*
***/
// Notion de Position : s'utilise avec ou sans le new
function Position(x=0,y=50) {
	if (this == undefined || this == window) {
		// on crée un nouvel objet par new que l'on rend
		return new Position(x,y);
	}
	this.x = x;
	this.y = y;
}

// Fonction ajoute une position à this
Position.prototype.add = function(position=Position()) {
	this.x += position.x;
	this.y += position.y;
}
