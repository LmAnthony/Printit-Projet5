// Tableau avec les contenus des slides.
const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

// Ajout de la flèche de gauche+droite et de la balise 'img + p' de la bannière.
const arrowLeft = document.querySelector('.arrow_left');
const arrowRight = document.querySelector('.arrow_right');
const slideImage = document.querySelector('#banner > img');
const slideText = document.querySelector('#banner > p');
// Création d'une constante en prenant la longueur de la constante slides qui contient le contenu des sliders (img+p).
const slideContent = slides.length;
let i = 0;

/* Création des DOTS points */ 
function dotsFunction() {
	// Ajout de la balise '<div> en prenant la class .dots'
	const dots = document.querySelector('.dots');
		// Boucle si d est inférieur au nombre de slides, alors d s'incrémente (d++).
		for (let d = 0; d < slideContent; d++) {
			// Création de la balise span nommé 'dot'.
			const dot = document.createElement('span');
			// Création des ID's pour les <span> des 'dot', soit exemple <span id=" span'+(d)' "> / <span id="span1,2,3,4">
			dot.id='span' + d;
				// Ajout d'un click sur les dots et envoi de la function slideFunction()
				dot.addEventListener('click', function(event) {
					// Récupération d'un nombre à partir de l'id de la balise <span>, on target l'id du span et on remplace son nombre.
					i = Number(event.target.id.replace('span', ''));
					slideFunction();
				});
			// Ajout de la class .dot aux 'dot' soit les <span class="dot">
			dot.classList.add('dot');
			// Ajoute les 'dot' en tant qu'enfants de la div 'dots', donc les 'dot' apparaîtra à l'intérieur de dots.
			dots.appendChild(dot);
			// Selon l'enfant du parent(dots) et en fonction de 'd' on transfère la class .dot_selected
			if (d == 0) { 
				dots.children[d].classList.add('dot_selected');
			}
		}
 }
 dotsFunction();
/* Lier les points aux images du slider */
 function selected() {
	// Constante créer (dot) avec la class html 'dot'
	const dot = document.getElementsByClassName('dot');
		// Création d'une boucle (for), soit i = 0, donc si i est inférieur à la longueur des points, alors i s'incrémente (i++).
		for (let i = 0; i < dot.length; i++) {
			// L'action fait que à chaque incrémentation, la class se transfère sur un prochain dot.
			dot[i].classList.remove('dot_selected');
		}
		// l'ajout de la class 'dot_selected' qui existe déjà dans le css.
		dot[i].classList.add('dot_selected');
 }

/* Ajout de mes images et des taglines dans mon HTML */
function slideFunction() {
	// Prendre les constantes de la balise img et p et démarrer la fonction selected() pour la sélection des dots points en fonction des slides. 
	slideImage.src = `./assets/images/slideshow/${slides[i].image}`;
	slideText.innerHTML = slides[i].tagLine;
	selected();
}
slideFunction();


/* Ajout d'une action sur la flèche gauche, clear du timeout(5s) > lancement de la fonction > changement du slide */
arrowLeft.addEventListener("click", function () {
	clearTimeout(timeoutId);
	if (i == 0) {
		i = slideContent - 1;
	}
	else {
		i--;
	}slideFunction();
	startTimeout();
});
/* Ajout d'une action sur la flèche droite, clear du timeout(5s) > lancement de la fonction > changement du slide */	
arrowRight.addEventListener("click", function () {
	clearTimeout(timeoutId);
	if (i == slideContent - 1) {
		i = 0;
	} else {
			i++;
	}slideFunction();
	startTimeout();
});

let timeoutId;
// ####### Création d'un Timeout : change l'image du carousel toutes les 3 secondes #######
function startTimeout() {
	timeoutId = setTimeout(function(){
		if (i == slideContent - 1) {
			i = 0;
		} else {
			i++
		}
		slideFunction();
		startTimeout();
	}, 3000);
}
// Lancement du timeout toutes les 3secondes.
startTimeout();