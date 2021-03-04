/***
*
* Définition de la classe Position
*
***/
// Notion de Position : s'utilise avec ou sans le new
function Position(x=0,y=0) {
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





/***
*
* Définition de la classe Sprite
*
***/
function Sprite(imgPath, insideDOM= window.document.getElementById("playground"), position= Position(0,0)) {
    this.position = position;
    let img = document.createElement("img");
    img.setAttribute("src", imgPath);
    this.DOM = insideDOM.appendChild(img);
    this.speedX = 0;
    this.speedY = 0;
};


Sprite.prototype.moveTo = function(pos=Position()) {
	// Overwritée dans les classe enfants (Robot, Rectangle)
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
* Définition de la classe Rectangle
*
***/
function Rectangle(position= Position(100,0), imgPath= "images/x_wing.png",insideDOM= window.document.getElementById("playground")) {
    // Rectangle récupère les attributs de Sprite (héritage)
    Sprite.call(this, imgPath, insideDOM, position);
}


// Asignation du prototype de Sprite à Rectangle. Héritage des méthodes de Rectangle dans Robot (héritage)
Rectangle.prototype = Object.create(Sprite.prototype);
// La ligne du dessus change le constructeur de notre classe Rectangle.
// La ligne qui suis corrige ce problème
Rectangle.prototype.constructor = Rectangle;
	

Rectangle.prototype.areIntersecting = function(item1,item2) {
	// Detecte si deux elements se supperposent
  if((item1.position.y + item1.size.height) > item2.position.y
    && item1.position.x < (item2.position.x + item2.size.height)
    && item1.position.y < (item2.position.y  + item2.size.height)
    && (item1.position.x + item1.size.width) > item2.position.x ) {
        return true;
    }
}

Rectangle.prototype.inside = function (r=Rectangle()) {
  if((this.position.x < r.position.x + r.size.width) && (this.position.x > r.position.x)) {
    return true;
  }

  if((this.position.x + this.size.width > r.position.x) && (this.position.x + this.size.width < r.position.x + r.size.width)) {
    return true;
  }
}



// Overwrite de la methode moveTo de Sprite
Rectangle.prototype.moveTo = function(position=Position(),whenOutOfPlayground = function(position) {
  console.error("Disparition du vaisseau");
}) {
    // Changement de position si le robot est dans le playground (le sable)
    if (position.x <= 800 - this.DOM.clientWidth && position.x >= 0) {
			this.DOM.style.left = position.x+"px";

    } else{
			whenOutOfPlayground.call(this, position);
		}
		
		if (position.y <= 600 - this.DOM.clientHeight && position.y >= 0) {
    	this.DOM.style.top = position.y+"px";
    } else{
			whenOutOfPlayground.call(this, position);
		}
};




/***
*
* Définition de la classe Robot
*
***/
function Robot(imgPath="images/R2D2.png",insideDOM=window.document.getElementById("playground")) {
    // Robot récupère les attributs de Sprite (héritage)
    Sprite.call(this, imgPath, insideDOM);
    
}

// Asignation du prototype de Sprite à Robot. Héritage des méthodes de Sprite dans Robot (héritage)
Robot.prototype = Object.create(Sprite.prototype);
// La ligne du dessus change le constructeur de notre classe Robot.
// La ligne qui suis corrige ce problème
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
		
		if (position.y <= 600 - this.DOM.clientHeight && position.y >= 0) {
    	this.DOM.style.top = position.y+"px";
    } else{
			whenOutOfPlayground.call(this, position);
		}
};

