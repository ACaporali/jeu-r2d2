/***
*
* D�finition de la classe Robot
*
***/
function Robot(imgPath="image/R2D2.png",insideDOM=window.document.getElementById("playground")) {
	// Robot r�cup�re les attributs de Sprite (h�ritage)
	Sprite.call(this, imgPath, insideDOM);

}

// Asignation du prototype de Sprite � Robot. H�ritage des m�thodes de Sprite dans Robot (h�ritage)
Robot.prototype = Object.create(Sprite.prototype);
// La ligne du dessus change le constructeur de notre classe Robot.
// La ligne qui suis corrige ce probl�me
Robot.prototype.constructor = Robot;

// Overwrite de la methode moveTo de Sprite
Robot.prototype.moveTo = function(position=Position()) {
	// Changement de position si le robot est dans le playground (le sable)
	if (position.x <= playgroundWidth - this.DOM.clientWidth && position.x >= 0) {
		this.DOM.style.left = position.x+"px";

	}

	if (position.y <= (playgroundOffsetTop + playgroundHeight) - this.DOM.clientHeight && position.y >= playgroundOffsetTop) {
		this.DOM.style.top = position.y+"px";
	}
};