// ==UserScript==
// @name        PokeGO DB mobile
// @namespace   enux.pl
// @description Makes PokeGO DB a bit of mobile friendly.
// @include     http://www.pokemongodb.net/*
// @version     1.0.1
// @grant       none
// @run-at      document-start
// @updateURL   https://github.com/Eccenux/pgo-pgodb/raw/master/userscripts/pgodb_mobile.meta.js
// @downloadURL https://github.com/Eccenux/pgo-pgodb/raw/master/userscripts/pgodb_mobile.user.js
// ==/UserScript==

/*
// testing/debugging
var s = document.createElement('script');
s.setAttribute('src', 'http://localhost/testy/greasemonkey/pgo-pgodb/userscripts/pgodb_mobile.user.js')
document.head.appendChild(s)
*/


/**
	Making the site scale on mobile viewport.
*/
function addViewport() {
	var metaTag=document.createElement('meta');
	metaTag.name = "viewport"
	metaTag.content = "width=device-width, initial-scale=1.0"
	document.querySelector('head').appendChild(metaTag);
}
addViewport();

/**
	CSS
*/
// GM_addStyle('...'); // doesn't work with run-at document-start

function addStyles() {
	var styleTag = document.createElement('link');
	styleTag.setAttribute('rel', 'stylesheet');
	//styleTag.setAttribute('href', 'http://localhost/testy/greasemonkey/pgo-pgodb/userscripts/pgodb_mobile.css');
	styleTag.setAttribute('href', 'https://github.com/Eccenux/pgo-pgodb/raw/master/userscripts/pgodb_mobile.css');
	document.querySelector('head').appendChild(styleTag);
}
// addStyles(); // doesn't work with run-at document-start either
// works but with significant delay...
document.addEventListener("DOMContentLoaded", addStyles, false);
