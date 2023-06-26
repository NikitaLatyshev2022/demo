import barba from '@barba/core';

function init(scriptsInit, scriptsDestroy) {
	// eslint-disable-next-line no-unused-vars
	barba.hooks.beforeLeave(({current}) => {
		// можно добавить анимацию перед уходом со страницы
	});

	barba.hooks.afterLeave(({current}) => {
		// отключение обработчиков событий и удаленние их дынных
		scriptsDestroy.forEach((script) => script(current.container));
	});

	barba.hooks.beforeEnter(({next}) => {
		// инициализация скриптов новой страницы
		scriptsInit.forEach((script) => script(next.container));
	});

	// eslint-disable-next-line no-unused-vars
	barba.hooks.afterEnter(({next}) => {
		// можно добавить анимацию появления страницы
	});

	barba.init({
		// debug: true,
		requestError: (trigger, action, url, response) => {
			// go to a custom 404 page if the user click on a link that return a 404 response status
			if (action === 'click' && response.status && response.status === 404) {
				barba.go('/404');
			}

			// prevent Barba from redirecting the user to the requested URL
			// this is equivalent to e.preventDefault() in this context
			return false;
		},
	});
}

export default {
	init,
};
