/***
*
* Définition de la classe SpaceShip
*
***/
function SpaceShip(side, position= Position(100,50), imgPath= "image/x_wing.png", id, insideDOM= window.document.getElementById("playground")) {
	// SpaceShip récupère les attributs de Sprite (héritage)
	Sprite.call(this, imgPath, insideDOM, position, id);
	this.side = side;

}

// Definition constantes
Object.defineProperty(SpaceShip, "LIGHT_SIDE", { value: "light" });
Object.defineProperty(SpaceShip, "DARK_SIDE", { value: "dark" });


// Asignation du prototype de Sprite à SpaceShip. Héritage des méthodes de SpaceShip dans Robot (héritage)
SpaceShip.prototype = Object.create(Sprite.prototype);
// La ligne du dessus change le constructeur de notre classe SpaceShip.
// La ligne qui suis corrige ce problème
SpaceShip.prototype.constructor = SpaceShip;

SpaceShip.prototype.areIntersecting = function(item1,item2) {
	// Detecte si deux elements se supperposent
	if((item1.position.y + item1.size.height) > item2.position.y
	&& item1.position.x < (item2.position.x + item2.size.height)
	&& item1.position.y < (item2.position.y  + item2.size.height)
	&& (item1.position.x + item1.size.width) > item2.position.x ) {
		return true;
	}
}



/*SpaceShip.prototype.inside = function (r=SpaceShip()) {
if((this.position.x < r.position.x + r.size.width) && (this.position.x > r.position.x)) {
return true;
}

if((this.position.x + this.size.width > r.position.x) && (this.position.x + this.size.width < r.position.x + r.size.width)) {
return true;
}
}*/



// Overwrite de la methode moveTo de Sprite
SpaceShip.prototype.moveTo = function(position=Position(),whenOutOfPlayground = function(position) {
	console.error("Disparition du vaisseau");
	this.remove();

}) {
	// Changement de position si le robot est dans le playground (le sable)
	if (position.x <= 800 - this.DOM.clientWidth && position.x >= 0) {
		this.DOM.style.left = position.x+"px";

	} else{
		whenOutOfPlayground.call(this, position);
	}
	if (position.y <= 650 - this.DOM.clientHeight && position.y >= 50) {
		this.DOM.style.top = position.y+"px";
	} else{
		whenOutOfPlayground.call(this, position);
	}
};


SpaceShip.prototype.remove = function() {
	const id = this.id;
	delete game.listSpaceShip[id];
	this.DOM.remove();
};