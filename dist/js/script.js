
document.querySelector('.burger').addEventListener('click', function () {
	this.classList.toggle('active');
	document.querySelector('.nav').classList.toggle('active');

})


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

	pagination: {
		el: '.page__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: 'page__bullet',
		bulletActiveClass: "page__bullet_active",
	},
	scrollbar: {
		el: '.page__scroll',
		dragClass: "page__drag-scroll",

		draggable: true,
	},
})