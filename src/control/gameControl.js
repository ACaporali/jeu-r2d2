// Compteur pour incrémenter l'id des spaceShip qui seront crées (nb de SpaceShip créés)
let size = 0;
const playgroundOffsetTop = window.document.getElementById("playground").offsetTop;
const playgroundWidth = 800;
const playgroundHeight = 600;

const listImageSpaceShipLight = {
	0: "image/anakin_starfighter.png",
	1: "image/naboo_starfighter.png",
	2: "image/obi_wan_starfighter.png",
	3: "image/x_wing.png"
}

const listImageSpaceShipDark = {
	0: "image/tie_fighter.png"
}

let timeCreateSpaceShip = 1000;
let game = {
	arrowLeft : false,
	arrowRight : false,
	arrowUp : false,
	arrowDown : false,
	robot : new Robot(),
	listSpaceShip : {},
	run : true,
	continue : false,
	tFrameLast : 0,
	tFrameGap : 0,
	score : 0,
	speedRobot : 150,
	speedSpaceShip : 100,
	animationStartTime : 0,
	animationStoppedAt : 0
}

game.update = function (tFrame) {
	let time = tFrame - this.tFrameLast;
	
	this.tFrameLast = tFrame;		

	if (this.arrowLeft) {
		this.robot.getHitbox(game.robot.pos);
		this.robot.speedX = - this.speedRobot;
	} else if (this.arrowRight) {
		this.robot.speedX = this.speedRobot;
	} else {
		this.robot.speedX = 0;
	}

	if (this.arrowUp) {
		this.robot.speedY = - this.speedRobot;
	} else if (this.arrowDown) {
		this.robot.speedY = this.speedRobot;
	} else {
		this.robot.speedY = 0;
	}
	
	// Déplacement du robot
	game.robot.moveFrame(time);
	game.robot.getHitbox(this.robot.pos);

	// Gestion des spaceShip présent dans le playground
	for (let [key, spaceShip] of Object.entries(this.listSpaceShip)) {	
		spaceShip.speedY = game.speedSpaceShip;
		
		// Déplacement du spaceShip courant
		spaceShip.moveFrame(time);

		spaceShip.getHitbox(spaceShip.pos);

		if (spaceShip.areIntersecting(this.robot, spaceShip)) {
			// Modification du score en fonction du type de spaceShip touché
			if (SpaceShip.LIGHT_SIDE === spaceShip.side){
				this.score += 1;

				// Supprime le spaceship touché
				spaceShip.remove();

			} else if (SpaceShip.DARK_SIDE === spaceShip.side){
				this.score -= 1;

				// Supprime le spaceship touché
				spaceShip.remove();

			} else {
				console.error("Type du vaisseau non reconnu");

			}
			
			manageScore();
		}

		// Changement du score dans le HTML
		document.getElementById("score").textContent = this.score;
		
	}
}

// Création de spaceShip toutes les X secondes
function createSpaceShip () {
	if (game.run) {
		// Paramètres du nouveau SpaceShip
		const newId = size + 1;
		const position = getRandomPosition();
		const side = getRandomSide();
		const image = getImage(side);
		
		game.listSpaceShip[newId] = new SpaceShip(side, position, image, newId);
		
		// Incrémentation de size (nb de SpaceShip créés)
		size = newId;
	}
}

let variable = setInterval(createSpaceShip, timeCreateSpaceShip);


// Renvoie un nombre aléatoire compris entre 0 et "max"
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Retourne de façon aléatoire le side (light ou dark)
function getRandomSide() {
	const randomInt = getRandomInt(2);
	
	if (0 === randomInt) {
		return SpaceShip.LIGHT_SIDE;
	}
	
	if (1 === randomInt) {
		return SpaceShip.DARK_SIDE;
	}
}

// Retourne de façon aléatoire une position
function getRandomPosition() {
	// argument 1 : 670 = taille du playgroud (800) - taille moyen des Spaceship (130)
	// 							-> ne pas faire apparaitre des SpaceShip en dehors du playground
	// argument 2 : valeur de l'espacement entre le haut de la fenetre et le playground (img dessert)
	return Position (getRandomInt(670), playgroundOffsetTop);
}

//Retourne de façon aléatoire une image en fonction de son "side"
function getImage(side) {		  		  	
	if (SpaceShip.LIGHT_SIDE === side) {
		const randomInt = getRandomInt(Object.keys(listImageSpaceShipLight).length);
		return listImageSpaceShipLight[randomInt];
	} 
	
	if (SpaceShip.DARK_SIDE === side) {
		const randomInt = getRandomInt(Object.keys(listImageSpaceShipDark).length);
		return listImageSpaceShipDark[randomInt];
	}
}

// Gestion des évènements en fonction du score du joueur
function manageScore () {
	if (game.score >= 20) {
		alert("L'Alliance est sauvee !");
		game.run = false;
	}
	
	if (game.score >= 10) {
		// Augmentation de la vitesse des spaceShip
		game.speedSpaceShip = 140;
		
		// Creation de spaceShip plus rapide
		timeCreateSpaceShip = 700;	
		clearInterval(variable);
		variable = setInterval(createSpaceShip, timeCreateSpaceShip);
	}
	
	if (game.score < 0) {
		alert("Vous n'avez pas survecu a l'Empire :'(");
		game.run = false;
	}
}