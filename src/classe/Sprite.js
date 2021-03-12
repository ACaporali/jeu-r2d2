/***
*
* Définition de la classe Sprite
* 80 = le haut de la page (0) + le titre <h1> (80)
*
***/
function Sprite(imgPath, insideDOM= window.document.getElementById("playground"), position= Position(0,80), id=0) {
	this.position = position;
	let img = document.createElement("img");
	img.setAttribute("src", imgPath);
	img.setAttribute("id", id);
	this.DOM = insideDOM.appendChild(img);
	this.speedX = 0;
	this.speedY = 0;
	this.id = id;
	console.log(this.DOM);
};


Sprite.prototype.moveTo = function(pos=Position()) {
	// Overwritée dans les classe enfants (Robot, SpaceShip)
};



Sprite.prototype.moveRel = function(position=Position()) {
	this.position.add(Position(position.x, position.y));
	this.moveTo(this.position);
};

Sprite.prototype.moveFrame = function(duration) {
	let x = this.speedX * duration / 1000;
	let y = this.speedY * duration / 1000;

	this.moveRel(Position(x,y));

}

Sprite.prototype.getHitbox = function() {
	this.size = {width : this.DOM.width, height : this.DOM.height};
}