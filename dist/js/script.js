class DOMAnimations {
	/**
		* Masque un élément avec un effet de repli
		* @param {HTMLElement} element
		* @param {Number} duration
		* @returns {Promise<boolean>}
		*/
	static slideUp(element, duration = 500) {
		return new Promise(function (resolve, reject) {
			element.style.height = element.offsetHeight + 'px'
			element.style.transitionProperty = `height, margin, padding`
			element.style.transitionDuration = duration + 'ms'
			element.offsetHeight // eslint-disable-line no-unused-expressions
			element.style.overflow = 'hidden'
			element.style.height = 0
			element.style.paddingTop = 0
			element.style.paddingBottom = 0
			element.style.marginTop = 0
			element.style.marginBottom = 0
			window.setTimeout(function () {
				element.style.display = 'none'
				element.style.removeProperty('height')
				element.style.removeProperty('padding-top')
				element.style.removeProperty('padding-bottom')
				element.style.removeProperty('margin-top')
				element.style.removeProperty('margin-bottom')
				element.style.removeProperty('overflow')
				element.style.removeProperty('transition-duration')
				element.style.removeProperty('transition-property')
				resolve(false)
			}, duration)
		})
	}

	/**
		* Affiche un élément avec un effet de dépliement
		* @param {HTMLElement} element
		* @param {Number} duration
		* @returns {Promise<boolean>}
		*/
	static slideDown(element, duration = 500) {
		return new Promise(function (resolve, reject) {
			element.style.removeProperty('display')
			let display = window.getComputedStyle(element).display
			if (display === 'none') display = 'block'
			element.style.display = display
			let height = element.offsetHeight
			element.style.overflow = 'hidden'
			element.style.height = 0
			element.style.paddingTop = 0
			element.style.paddingBottom = 0
			element.style.marginTop = 0
			element.style.marginBottom = 0
			element.offsetHeight // eslint-disable-line no-unused-expressions
			element.style.transitionProperty = `height, margin, padding`
			element.style.transitionDuration = duration + 'ms'
			element.style.height = height + 'px'
			element.style.removeProperty('padding-top')
			element.style.removeProperty('padding-bottom')
			element.style.removeProperty('margin-top')
			element.style.removeProperty('margin-bottom')
			window.setTimeout(function () {
				element.style.removeProperty('height')
				element.style.removeProperty('overflow')
				element.style.removeProperty('transition-duration')
				element.style.removeProperty('transition-property')
			}, duration)
		})
	}

	/**
		* Affiche ou Masque un élément avec un effet de repli
		* @param {HTMLElement} element
		* @param {Number} duration
		* @returns {Promise<boolean>}
		*/
	static slideToggle(element, duration = 500) {
		if (window.getComputedStyle(element).display === 'none') {
			return this.slideDown(element, duration)
		} else {
			return this.slideUp(element, duration)
		}
	}
}
document.querySelector('.burger').addEventListener('click', function () {
	this.classList.toggle('active');
	document.querySelector('.nav').classList.toggle('active');

})
const screen = document.querySelectorAll('.page__sreen')

let pageSlider = new Swiper('.page', {
	//add class
	wrapperClass: "page__wrapper",
	slideClass: "page__sreen",

	direction: 'vertical',

	slidesPerView: 'auto',

	parallax: true,

	keyboard: {
		enabled: true,

		onlyInViewport: true,

		pageUpDown: true,
	},

	mousewheel: {
		sensitivity: 1,
	},

	watchOverflow: true,

	speed: 600,

	observer: true,

	observeParents: true,

	observeSlideChildren: true,

	simulateTouch: false,

	init: false,

	on: {
		init: function () {
			menuSlider();
			document.body.classList.add('_loaded');
			screen[pageSlider.realIndex].classList.add('_anim-item');
		},
		slideChange: function () {
			menuSliderRemove();
			nav[pageSlider.realIndex].classList.add('_active');
			screen[pageSlider.realIndex].classList.add('_anim-item');
			document.querySelector('.page').classList.remove('_degris');
			document.querySelectorAll('.popup').forEach((el) => {
				el.classList.remove('_active');
			})
		},
	},
	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: 'page__bullet',
		bulletActiveClass: "page__bullet_active",
		slideToClickedSlide: false,
	},
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",

		draggable: true,
	},

})
let nav = document.querySelectorAll('.nav__link');
function menuSlider() {
	menuSliderRemove();
	nav[pageSlider.realIndex].classList.add('_active');
	nav.forEach((elem, index) => {
		elem.addEventListener('click', function (e) {
			e.preventDefault();
			pageSlider.slideTo(index, 800);
			elem.classList.add('_active')
		})
	})
}

function menuSliderRemove() {
	document.querySelectorAll('.nav__link._active').forEach((elem) => {
		elem.classList.remove('_active')
	})

}



pageSlider.init();



let aboutSlider = new Swiper('.about-slider', {
	//add class
	wrapperClass: "about-slider__wrapper",
	slideClass: "about-slider-item",

	direction: 'vertical',
	slideActiveClass: 'active-slide',
	slidesPerView: 'auto',

	keyboard: {
		enabled: true,

		onlyInViewport: true,

		pageUpDown: true,
	},

	mousewheel: {
		sensitivity: 1,
	},

	watchOverflow: true,

	speed: 300,

	observer: true,

	observeParents: true,

	observeSlideChildren: true,
	nested: true,

})

const buttonUp = document.querySelectorAll('.about-slider-item__icon');
buttonUp.forEach((elem) => {
	elem.addEventListener('click', function () {
		if (elem.classList.contains('_active')) {

		}
		elem.classList.toggle('_active');
		DOMAnimations.slideToggle(elem.parentElement.querySelector('.about-slider-item__hid'))
	})
})
let prop = 500;
document.querySelectorAll('.about-slider__item').forEach((elem, index) => {
	elem.style.transition = `transform ${prop}ms linear ${(prop / 2) * index}ms`
})
document.querySelector('.cards').addEventListener('click', function () {
	this.classList.add('_active');

})
document.querySelector('.tariff').addEventListener('click', function (e) {
	if (document.querySelector('.page').classList.contains('_degris') && !e.target.classList.contains('card__button')) {
		document.querySelector('.page').classList.remove('_degris');
		document.querySelectorAll('.popup').forEach((el) => {
			el.classList.remove('_active');
		})
	}
})
document.querySelectorAll('.card__button').forEach((elem) => {
	elem.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector('.page').classList.remove('_degris');
		document.querySelectorAll('.popup').forEach((el) => {
			el.classList.remove('_active');
		})
		document.querySelectorAll('.cards__item').forEach((el) => {
			el.classList.remove('_active');
		})
		document.querySelector('.page').classList.add('_degris');
		document.getElementById(elem.getAttribute('href')).classList.add('_active');
	})
})
document.querySelectorAll('.card__button-write').forEach((elem) => {
	elem.addEventListener('click', function () {
		document.querySelectorAll('.cards__item').forEach((el) => {
			el.classList.remove('_active');
		})
		this.parentElement.parentElement.classList.add('_active');
	})
})
// ==========================form=============================
// document.querySelector("#sendHeader").onclick = function (e) {
// 	e.preventDefault();
// 	key = document.querySelector('#keyHeader').value;
// 	key += '76087t8yfg87t87tg878t';
// 	let form = document.querySelector('.header-form');
// 	if (key !== code) {
// 		alert('Невозможно отправить форму!')

// 	} else {
// 		let txt = '';
// 		let phone = form.querySelector('#phoneHeader').value;
// 		let name = form.querySelector('#nameHeader').value;
// 		if (phone === '' || name === '') {
// 			alert("Заполните Поля");
// 			return 0;
// 		}
// 		const token = '1721080979:AAE0CHPuOWfp8awqWv2tOHDYg2MyMbzK5mY';
// 		const chat_id = "-510942861";
// 		txt += `<b>Имя:</b>${name} %0A<b>Номер:</b>${phone} %0A`
// 		let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${txt}`;
// 		let xhttp = new XMLHttpRequest();
// 		xhttp.open("POST", url, true);
// 		xhttp.send();
// 		this.innerText = 'Отправлено';
// 	}

// }
const token = '1833217420:AAGi8mhqYgalxG4PTGyErPXWlQ20wcVx9QU';
const chat_id = "-592332191";

const code = '76087t8yfg87t87tg878t'
document.querySelectorAll('.form__button input').forEach((elem) => {
	elem.addEventListener('click', function (e) {
		e.preventDefault();
		form = elem.parentElement.parentElement;
		let key = form.querySelector('.form__key').value;
		key += code;
		if (key !== code) {
			alert('Невозможно')

		} else {

			let txt = '';
			let need = form.getAttribute('data-tariff');
			let name = form.querySelector('.form__name').value;
			let phone = form.querySelector('.form__tel').value;
			if (phone === '' || name === '') {
				alert("Заполните Поля");
				return 0;
			}
			txt += `<b>Имя: </b>${name} %0A<b>Номер: </b>${phone}%0A<b>Хочет: </b>${need}%0A`
			let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${txt}`;
			let xhttp = new XMLHttpRequest();
			xhttp.open("POST", url, true);
			xhttp.responseType = 'json'
			xhttp.onload = () => {
				if (xhttp.response.ok) {
					form.classList.add('_send')
				}
			}
			xhttp.send();

		}
	})
})
