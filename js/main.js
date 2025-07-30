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

document.addEventListener('DOMContentLoaded', function () {
	const isMobile = () => window.matchMedia('(max-width: 1100px)').matches
	const nav = document.querySelector('.main-nav')
	if (!nav) {
		return
	}

	// Mobile: раскрытие по клику на иконку (основное меню)
	nav.addEventListener('click', function (e) {
		if (!isMobile()) return
		const btn = e.target.closest('.menu-toggle')
		if (btn) {
			const li = btn.closest('.has-children')
			if (li) {
				const expanded = btn.getAttribute('aria-expanded') === 'true'
				btn.setAttribute('aria-expanded', !expanded)
				li.classList.toggle('open', !expanded)
				// Закрыть другие открытые на этом уровне
				const parentUl = li.parentElement
				parentUl.querySelectorAll(':scope > .has-children').forEach(item => {
					if (item !== li) {
						item.classList.remove('open')
						const toggle = item.querySelector(':scope > .menu-toggle')
						if (toggle) toggle.setAttribute('aria-expanded', 'false')
					}
				})
				e.preventDefault()
			}
		}
	})

	// Закрытие по клику вне меню на мобильных
	document.addEventListener('click', function (e) {
		if (!isMobile()) return
		const nav = document.querySelector('.main-nav')
		if (!nav.contains(e.target)) {
			nav.querySelectorAll('.has-children').forEach(item => {
				item.classList.remove('open')
				const toggle = item.querySelector('.menu-toggle')
				if (toggle) toggle.setAttribute('aria-expanded', 'false')
			})
			// Скрыть все ul в мега-меню
			nav.querySelectorAll('.megamenu-title + ul').forEach(ul => {
				ul.classList.remove('open')
				ul.style.maxHeight = ''
			})
		}
	})

	// На десктопе: aria-expanded для доступности
	nav.querySelectorAll('.has-children').forEach(item => {
		const btn = item.querySelector('.menu-toggle')
		item.addEventListener('mouseenter', () => {
			if (!isMobile() && btn) {
				btn.setAttribute('aria-expanded', 'true')
			}
		})
		item.addEventListener('mouseleave', () => {
			if (!isMobile() && btn) {
				btn.setAttribute('aria-expanded', 'false')
			}
		})
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
