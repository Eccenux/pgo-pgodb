PokeGO DB customization
=========================

This repository contains my customization of [PokeGO DB site](http://www.pokemongodb.net/). Site which I highly recommend for all trainers ;-).

Contents
--------

* `userscripts/pgodb_filtering.user.js` -- adds filtering feature for PokeGO DB site.
	* Currently enabled for all single-table pages.
	* Works best on [Pokédex](http://www.pokemongodb.net/2016/05/pokemon-go-pokedex.html) and [Overall Move Rankings (DPS)](http://www.pokemongodb.net/2016/07/overall-move-rankings-dps.html).
	* Just start typing any part of some pokemon name and you will get a shorter table.
	* Pokemon types are included in the filter so you can see grass pokemons by typing "Grass".
	* You can type in many words e.g. "Grass Poison" will give you pokemons of type Grass AND Poison.
	* Additionally the script makes the page title shorter so you can see the page title (and not site name) in your browser tab.

Installation
------------

To install so called *user scripts* you need to install a plugin for your browser:

* Desktop Firefox: [Greasemonkey](https://addons.mozilla.org/pl/firefox/addon/greasemonkey/).
* Mobile Firefox: [USI addon](https://addons.mozilla.org/pl/firefox/addon/userunified-script-injector/).  
* Desktop Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
