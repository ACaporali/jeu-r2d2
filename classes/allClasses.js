/***
*
* D�finition de la classe Position
*
***/
// Notion de Position : s'utilise avec ou sans le new
function Position(x=0,y=50) {
    if (this == undefined || this == window) {
        // on cr�e un nouvel objet par new que l'on rend
        return new Position(x,y);
    }
    this.x = x;
    this.y = y;
}

// Fonction ajoute une position � this
Position.prototype.add = function(position=Position()) {
    this.x += position.x;
    this.y += position.y;
}





/***
*
* D�finition de la classe Sprite
*
***/
function Sprite(imgPath, insideDOM= window.document.getElementById("playground"), position= Position(0,50), id=0) {
    this.position = position;
    let img = document.createElement("img");
    img.setAttribute("src", imgPath);
    img.setAttribute("id", id);
    this.DOM = insideDOM.appendChild(img);
    this.speedX = 0;
    this.speedY = 0;
    this.id = id;
};


Sprite.prototype.moveTo = function(pos=Position()) {
// Overwrit�e dans les classe enfants (Robot, SpaceShip)
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
 
 
 
 
 
 
 
 
/***
*
* D�finition de la classe SpaceShip
*
***/
function SpaceShip(side, position= Position(100,50), imgPath= "images/x_wing.png", id, insideDOM= window.document.getElementById("playground")) {
    // SpaceShip r�cup�re les attributs de Sprite (h�ritage)
    Sprite.call(this, imgPath, insideDOM, position, id);
    this.side = side;
   
}

// Definition constantes
Object.defineProperty(SpaceShip, "LIGHT_SIDE", { value: "light" });
Object.defineProperty(SpaceShip, "DARK_SIDE", { value: "dark" });


// Asignation du prototype de Sprite � SpaceShip. H�ritage des m�thodes de SpaceShip dans Robot (h�ritage)
SpaceShip.prototype = Object.create(Sprite.prototype);
// La ligne du dessus change le constructeur de notre classe SpaceShip.
// La ligne qui suis corrige ce probl�me
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




/***
*
* D�finition de la classe Robot
*
***/
function Robot(imgPath="images/R2D2.png",insideDOM=window.document.getElementById("playground")) {
    // Robot r�cup�re les attributs de Sprite (h�ritage)
    Sprite.call(this, imgPath, insideDOM);
   
}

// Asignation du prototype de Sprite � Robot. H�ritage des m�thodes de Sprite dans Robot (h�ritage)
Robot.prototype = Object.create(Sprite.prototype);
// La ligne du dessus change le constructeur de notre classe Robot.
// La ligne qui suis corrige ce probl�me
Robot.prototype.constructor = Robot;

// Overwrite de la methode moveTo de Sprite
Robot.prototype.moveTo = function(position=Position(),whenOutOfPlayground = function(position) {
  console.error("move from ("+ this.DOM.style.left +","+this.DOM.style.top+") to ("+ position.x +","+ position.y +") is to out of playground ");
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