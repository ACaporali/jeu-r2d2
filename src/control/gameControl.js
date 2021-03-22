// Compteur pour incrémenter l'id des spaceShip qui seront crées (nb de SpaceShip créés)
let size = 0;
const playgroundOffsetTop = window.document.getElementById("playground").offsetTop;
const playgroundWidth = 800;
const playgroundHeight = 600;

const timeCreatSpaceShip = 1000;
const speedRobot = 150;
const speedSpaceShip = 100;
const listImageSpaceShipLight = {
	0: "image/anakin_starfighter.png",
	1: "image/naboo_starfighter.png",
	2: "image/obi_wan_starfighter.png",
	3: "image/x_wing.png"
}

const listImageSpaceShipDark = {
	0: "image/tie_fighter.png"
}

let game = {
	arrowLeft : false,
	arrowRight : false,
	arrowUp : false,
	arrowDown : false,
	robot : new Robot(),
	listSpaceShip : {},
	run : true,
	tFrameLast : 0,
	score : 0,
	speedRobot : speedRobot,
	speedSpaceShip : speedSpaceShip,
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
	
	game.robot.moveFrame(time);
	game.robot.getHitbox(this.robot.pos);

	for (let [key, spaceShip] of Object.entries(this.listSpaceShip)) {
		spaceShip.speedY = this.speedSpaceShip;
		spaceShip.moveFrame(time);
		console.log("spaceShip.moveFrame");
		console.log(game.stopMain);

		spaceShip.getHitbox(spaceShip.pos);

		if (spaceShip.areIntersecting(this.robot, spaceShip)) {
			// Modification du score en fonction du type de space ship touché
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
		}

		// Changement du score dans le HTML
		document.getElementById("score").textContent = this.score;

	}
}



//Création de spaceShip toutes les X secondes
setInterval(function (){
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
	
}, timeCreatSpaceShip );


//Renvoie un nombre aléatoire compris entre 0 et "max"
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Retourne de façon aléatoire le side (light ou dark)
function getRandomSide() {
	const randomInt = getRandomInt(2);
	
	if (0 === randomInt) {
		return SpaceShip.LIGHT_SIDE;
	}
	
	if (1 === randomInt) {
		return SpaceShip.DARK_SIDE;
	}
}

//Retourne de façon aléatoire une position
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