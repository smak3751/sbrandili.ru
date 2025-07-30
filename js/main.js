document.addEventListener('DOMContentLoaded', function () {
	const header = document.querySelector('.header')

	function setBodyPaddingTop() {
		if (header) {
			const headerHeight = header.offsetHeight
			document.body.style.paddingTop = `${headerHeight}px`
		}
	}
	setBodyPaddingTop()
	window.addEventListener('resize', setBodyPaddingTop)
	window.addEventListener('scroll', function () {
		const scrollTop = window.scrollY || document.documentElement.scrollTop

		if (scrollTop > 0) {
			if (header) header.classList.add('header_fixed')
		} else {
			if (header) header.classList.remove('header_fixed')
		}
	})

	const hamburgerMenu = document.querySelector('.hamburger_menu')
	const popup = document.querySelector('.header_right_menu')
	const overlay = document.querySelector('.overlay')

	if (!hamburgerMenu || !popup || !overlay) return

	function isMenuOpen() {
		return popup.classList.contains('open')
	}

	function toggleMenu() {
		popup.classList.toggle('open')
		overlay.classList.toggle('show')
		hamburgerMenu.classList.toggle('active')
	}

	function closeMenu() {
		popup.classList.remove('open')
		overlay.classList.remove('show')
		hamburgerMenu.classList.remove('active')
	}

	// Для мобильных: используем touchstart
	const clickEvent = 'ontouchstart' in window ? 'touchstart' : 'click'

	hamburgerMenu.addEventListener(clickEvent, function (event) {
		toggleMenu()
	})

	overlay.addEventListener(clickEvent, function () {
		closeMenu()
	})

	document.addEventListener(clickEvent, function (event) {
		if (isMenuOpen() && !popup.contains(event.target) && !hamburgerMenu.contains(event.target)) {
			closeMenu()
		}
	})

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			closeMenu()
		}
	})
})

gsap.registerPlugin(ScrollTrigger)
document.querySelectorAll('.fade-in').forEach(item => {
	gsap.to(item, {
		scrollTrigger: {
			trigger: item,
			start: 'top 80%',
			toggleActions: 'play none none none',
		},
		opacity: 1,
		duration: 1.5,
		ease: 'power2.out',
	})
})

const itemsAnimate = gsap.utils.toArray('.list_animate li')

itemsAnimate.forEach((el, i) => {
	gsap.to(el, {
		scrollTrigger: {
			trigger: el,
			start: 'top 80%',
		},
		opacity: 1,
		y: 0,
		delay: 0.2 + i,
		duration: 0.4,
		ease: 'power2.out',
	})
})

Fancybox.bind('[data-fancybox]', {})


let swiper = new Swiper(".first_screen_slider", {
	slidesPerView: 3,
	spaceBetween: 30,
	pagination: {
		el: ".first_screen_slider_pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".first_screen_slider_next",
		prevEl: ".first_screen_slider_prev",
	},
})
