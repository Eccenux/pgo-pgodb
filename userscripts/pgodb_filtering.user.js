// ==UserScript==
// @name        PokeGO DB filtering
// @namespace   enux.pl
// @description Filtering feature for long tables on PokeGO DB site. Works best on Pokedex and Overal move rankings. Also makes the title shorter (better for many tabs opened).
// @include     http://www.pokemongodb.net/*
// @version     1.0.1
// @grant       none
// ==/UserScript==

/*
// testing/debugging
var s = document.createElement('script');
s.setAttribute('src', 'http://localhost/testy/greasemonkey/pgo-pgodb/userscripts/pgodb_filtering.user.js')
document.head.appendChild(s)
*/

//
// shorter title (remove site name from begining)
document.title = document.title.replace(/.+?: /, '');

//
// filtering
function isLongTablePage() {
	if (document.querySelectorAll('.post-body table').length != 1) {
		return false;
	}
	if (document.querySelectorAll('.post-body tr').length < 15) {
		return false;
	}
	return true;
}

if (isLongTablePage()) {
	pokeFilter = new ViewFilter();
	pokeFilter.init();
}

/**
 * Adds a simple filter input for views.
 *
 * @author Maciej "Nux" Jaros
 *
 * Licensed under (at ones choosing)
 * <li>MIT License: http://www.opensource.org/licenses/mit-license
 * <li>or CC-BY: http://creativecommons.org/licenses/by/3.0/
 *
 * @returns {ViewFilter}
 */
function ViewFilter()
{
	/**
	 * @type ViewFilter
	 */
	var _self = this;

	var items = [];
	
	this.startIndex = 1; // 1 = skip first row when filtering

	/**
	 * Initalize after doc.ready.
	 */
	this.init = function () {
		// parent container for input
		var container = document.querySelector(".post-header");
		if (!container) {
			return;
		}
		
		// init items
		items = document.querySelectorAll('.post-body tr');
		if (items.length < 2) {
			return;
		}
		// setup filtering text and additional text
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			item.ViewFilter_text = '';
			item.ViewFilter_extraText = '';
			var links = item.getElementsByClassName('in-cell-link');
			for (var j = 0; j < links.length; j++) {
				item.ViewFilter_text += links[j].textContent;
				item.ViewFilter_extraText += links[j].getAttribute('href');	// this should contain e.g. pokemon type and pokemon name (link under image)
			}
		}
		
		// prepare input
		var input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", "Filter");
		input.addEventListener('keyup', function() {
			_self.filter(this.value);
		});
		container.appendChild(input);
	};

	/**
	 * Filter views matching any given word.
	 *
	 * @param {String} phrase Filter string.
	 */
	this.filter = function (phrase) {
		// words to array
		var words = phrase
				.replace(/^\s+/, '')
				.replace(/\s+$/, '')
				.replace(/\s+/g, ' ')
				.split(' ')
		;

		var re = new ReArray(words, 'i');
		//var re = new RegExp('('+words+')', 'i');
		for (var i = _self.startIndex; i < items.length; i++) {
			var item = items[i];
			if (re.test(item.ViewFilter_text + ' ' + item.ViewFilter_extraText)) {
				item.style.display='';
			} else {
				item.style.display='none';
			}
		}
	};
}

/**
 * Helper class for testing match of an array of strings.
 *
 * @param {Array} strings Array of strings to be prepared and used in search.
 * @param {String} regExpFlags Flags passed to RegExp (g/i/m).
 * @returns {ViewFilter.ReArray}
 */
function ReArray(strings, regExpFlags) {
	this._reArray = [];

	for (var i=0; i<strings.length; i++) {
		this._reArray.push(new RegExp(this.escapeStr4RegExp(strings[i]), regExpFlags));
	}
}

/**
 * Escape phrase pre-creating RegExp.
 *
 * @param {String} str
 * @returns {String}
 */
ReArray.prototype.escapeStr4RegExp = function(str) {
	return str.replace(/([\[\]\{\}\|\.\*\?\(\)\$\^\\])/g, '\\$1');
};

/**
 * Test RegExp array for the given string.
 *
 * @param {String} str String to match aginst array of RegExp.
 * @param {Boolean} matchAny (default=false) If true then match any the RegExp, otherwise all must match.
 * @returns {Boolean}
 */
ReArray.prototype.test = function(str, matchAny) {
	var numMatches = 0;
	for (var i=0; i<this._reArray.length; i++) {
		var re = this._reArray[i];
		if (re.test(str)) {
			if (matchAny) {
				return true;
			} else {
				numMatches++;
			}
		}
	}
	return (numMatches == this._reArray.length);
};