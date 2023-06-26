import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import '@styles/vendor.scss';
import '@styles/main.scss';

import actualYear from '@scripts/modules/actual-year';
import uaParser from '@scripts/modules/ua-parser';
import vhFix from '@scripts/modules/vh-fix';

import {isDevices} from '@scripts/helpers/index';
import lazyLoad from '@scripts/modules/lazy-load';
import scrollToAnchor from './modules/scrollToAnchor';
import lazyBlur from './modules/lazyBlur';
import analytics from '@components/analytics/analytics';
// import router from '@components/router/router';
import home from '../pages/home/home';
import article from '../pages/article/article';
import sharing from '../components/sharing/sharing';
import demoRbc from '../pages/demo-rbc/demoRbc';

// eslint-disable-next-line no-underscore-dangle
window._debounce = debounce;
// eslint-disable-next-line no-underscore-dangle
window._throttle = throttle;

let resizeWidth = null;

const resize = () => {
	if (isDevices() && resizeWidth && resizeWidth === innerWidth) {
		return;
	}

	document.body.classList.add('is-resizing');

	uaParser.resize();
	// resize logic

	document.body.classList.remove('is-resizing');

	resizeWidth = innerWidth;
};

// добавить скрипты для инициализации при переходах
const scriptsInit = [
	// активируем нужные модули которые будут использоваться и которые должны обновлять при переходах между страницами
	lazyLoad.init,
	scrollToAnchor.init,
	lazyBlur.init,
	analytics.init,
	sharing.init,

	demoRbc.init(),
	home.init,
	article.init,
];

// добавить скрипты для удаленния данных при уходе
const scriptsDestroy = [];

const init = () => {
	uaParser.init();
	actualYear.init();
	vhFix.init();
	// закоментировать или удалить если SPA поведение не требуется
	// router.init(scriptsInit, scriptsDestroy);

	resizeWidth = innerWidth;
	window.addEventListener('resize', _debounce(resize, 500));
};

document.addEventListener('DOMContentLoaded', init);
