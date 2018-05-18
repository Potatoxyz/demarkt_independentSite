/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(2);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_des_style_css__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_des_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_des_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_des_init__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_des_init___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__js_des_init__);



/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./des-style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./des-style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "*{\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\nbody{\r\n    background: #FBF7F1;\r\n}\r\n.sb-slider li{\r\n    padding: 15px;\r\n}\r\n.sb-slider li img{\r\n    width: 670px;\r\n    height: 550px;\r\n    transition: all ease 0.3s;\r\n}\r\n.sb-slider li img:hover{\r\n    transform: scale(1.0125);\r\n    box-shadow: 0 3px 8px rgba(0,0,0,0.3)\r\n}\r\n.head{\r\n    margin-bottom: 10px;\r\n    padding-left: 15px;\r\n     padding-top: 15px;\r\n}\r\n.head,.footer{\r\n    height: 60px;\r\n    background: #FAF7E7;\r\n}\r\n.footer p{\r\n    line-height: 60px;\r\n    padding-left: 15px;\r\n        font-size: 14px;\r\n}\r\n.container{\r\n    min-height: calc(100vh - 120px);\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: center;\r\n}\r\n.des-wrap{\r\n    width: 50%;\r\n    max-width: 800px;\r\n}\r\n.des-wrap .des{\r\n    padding: 30px;\r\n    min-height: 550px;\r\n    box-sizing: border-box;\r\n    position: relative;\r\n}\r\n.des-wrap .title{\r\n    font-size: 1.6em;\r\n    margin-bottom: 20px;\r\n}\r\n.des-wrap ul{\r\n    padding-left: 20px;\r\n}\r\n.des-wrap ul li{\r\n    font-size: 14px;\r\n    margin-bottom:10px;\r\n}\r\n.button{\r\n    display: inline-block;\r\n    zoom: 1;\r\n    vertical-align: baseline;\r\n    margin: 0 2px;\r\n    outline: none;\r\n    cursor: pointer;\r\n    text-align: center;\r\n    text-decoration: none;\r\n    font: 14px/100% Arial, Helvetica, sans-serif;\r\n    height: 40px;\r\n    padding: .5em 2em .55em;\r\n    text-shadow: 0 1px 1px rgba(0,0,0,.3);\r\n    -webkit-border-radius: .5em;\r\n    -moz-border-radius: .5em;\r\n    border-radius: .5em;\r\n    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);\r\n    -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);\r\n    box-shadow: 0 1px 2px rgba(0,0,0,.2);\r\n}\r\n.button:hover {\r\n    text-decoration: none;\r\n}\r\n.button:active {\r\n    position: absolute;\r\n    bottom: 4px;\r\n}\r\n.rosy{\r\n    color: #fae7e9;\r\n    border: solid 1px #b73948;\r\n    background: #da5867;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(#f16c7c), to(#bf404f));\r\n}\r\n.rosy {\r\n    color: #fae7e9;\r\n    border: solid 1px #b73948;\r\n    background: #da5867;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(#f16c7c), to(#bf404f));\r\n    background: -moz-linear-gradient(top,  #f16c7c,  #bf404f);\r\n    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#f16c7c', endColorstr='#bf404f');\r\n}\r\n.rosy:hover {\r\n    background: #ba4b58;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(#cf5d6a), to(#a53845));\r\n    background: -moz-linear-gradient(top,  #cf5d6a,  #a53845);\r\n    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#cf5d6a', endColorstr='#a53845');\r\n}\r\n.rosy:active {\r\n    color: #dca4ab;\r\n    background: -webkit-gradient(linear, left top, left bottom, from(#bf404f), to(#f16c7c));\r\n    background: -moz-linear-gradient(top,  #bf404f,  #f16c7c);\r\n    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#bf404f', endColorstr='#f16c7c');\r\n}\r\n.btn-pos{\r\n    position: absolute;\r\n    bottom: 3px;\r\n    width: 80%;\r\n    left:50%;\r\n    transform:translateX(-50%);\r\n    text-decoration: none;\r\n}\r\n", ""]);

// exports


/***/ }),
/* 18 */
/***/ (function(module, exports) {

$(function () {
    const productList = [{ id: 1, src: "./images/1.jpg", title: 'Demarkt Cotton Linen Cosmetic Storage Home Decor Storage Bins Basket Organizers for Baby Toys (Polar bear)', link: 'https://www.amazon.com/Demarkt-Cosmetic-Storage-Organizers-Hedgehog/dp/B078N4D8BG?th=1', des: ['Material: high-quality linen fabric,environment friendly,durable.', 'Back waterproof coating, waterproof, resistance soiling,easy to clean.', 'Foldable storage basket,save space,small volume,the handle on both sides,convenient to move.'] }, { id: 2, src: "./images/2.jpg", title: 'Demarkt Novelty Large Capacity Milk Carton Pencil Cases Cosmetic Bag', link: 'https://www.amazon.com/Demarkt-Novelty-Capacity-Carton-Cosmetic/dp/B0756F649B', des: ['Material: PU leather.', "Lady and girls favorite.", 'Dimension: 20x5x6cm/7.8x 2x 2.4inch', 'Creative Milk Box Design, Durable, Multi-use.', 'Package includes: 1 * Pencil bag'] }, { id: 3, src: "./images/3.jpg", title: 'Demarkt 10 Sheets New 3D Black Lace Printing Design Nail Art Stickers Decals Nail Tips Decoration Tool by Demarkt', link: 'https://www.amazon.com/Demarkt-Sheets-Printing-Stickers-Decoration/dp/B01CHFHZAI', des: ['Note:10 sheets Nail Art Stickers (style random)', 'Surface smooth,Non-toxic and tasteless', 'Make you more charming', "It's your gift for your Lover"] }, { id: 4, src: "./images/4.jpg", title: 'Demarkt Cable Clips Cable Cord PC Electric Charging or Mouse Cord Holder 5pcs', link: 'https://www.amazon.com/Demarkt-Cable-Electric-Charging-Holder/dp/B06XW345H7', des: ['Single diameter of each about 3cm /1.2 inch', 'Sticky Fixing Stretcher Universal Desktop Wire Fixing Clip Clamps, used without limitation of address', 'The hollow groove shape is easily fixed all', 'Suitable for installation on the table surface, table legs or coffee table, easy to use'] }, { id: 5, src: "./images/5.jpg", title: 'Demarkt Mechanical Kitchen Timer/60 Mins/White', link: 'https://www.amazon.com/Demarkt-Mechanical-Kitchen-Timer-White/dp/B00YX3441G', des: ['Counts down from 60 minutes to 1 minute', 'Features an easy-to-operate mechanical pointer', 'Large, easy-to-read numbers on the dial', 'The perfect compliment to any Kitchen!'] }, { id: 6, src: "./images/6.jpg", title: 'Demarkt Word SLUT Black Double Layer Hand Spanking Paddle Leather Sexual Paddles Sex Toys for Couples', link: 'https://www.amazon.com/Demarkt-Spanking-Leather-Paddles-Couples/dp/B01LXHCO88', des: ['Made of high-quality PU material, non-toxic, no odour and no fading, flexible sturdy and smoothly.', ' Size: 12.6*2.36 inch.', ' Amazing design for you and easy to use. Nice comfortable touch feeling,please feel relieved about usage.', 'The Spanking paddle can spice up your sex life, give you a different sexual fun.'] }, { id: 7, src: "./images/7.jpg", title: 'Demarkt Washi Tape Cute Lace Flower Clear Decorative Tape Masking Sticky Adhesive Tape for Scrapbooking and Phone DIY Decoration,3 Roll', link: 'https://www.amazon.com/Demarkt-Decorative-Adhesive-Scrapbooking-Decoration/dp/B078SV49R5', des: ['Size: Long100 cm , Wide1.8 cm .', ' Get a lot of DIY pleasure and a good mood with these apparent cute lace tape.', ' Ideal to used to decorate cell phones, laptops, computers, PSPs, MP3s, phones, cups, table chairs, photo albums.', 'Fashion cute design Self-adhesive lace style tapes for children, girls, women.'] }, { id: 8, src: "./images/8.jpg", title: "Demarkt 2pcs Women's Nail Rings Flower Design Finger Tip Rings", link: 'https://www.amazon.com/Demarkt-Womens-Flower-Design-Finger/dp/B00LJN5MX2', des: ["2pcs Women's Nail Rings Flower Design Finger Tip Rings", ' 100% brand new', ' Fashion design', 'package : 1 PC'] }, { id: 9, src: "./images/9.jpg", title: "Demarkt Light Guide Relax Sleeping Eye Mask Eyepatch Blindfold Shade Travel Sleep Aid Eye Cover", link: 'https://www.amazon.com/Demarkt-Sleeping-Eyepatch-Blindfold-Travel/dp/B01DNC7KBI', des: ["100% Brand New & High Quality.", 'Help to sleep quickly,Travel Sleep Aid Cover Light Guide Relax.', ' Essential for achieving restful sleep during the day.', 'Made of comfortable closed-cell foam and nylon.'] }, { id: 10, src: "./images/10.jpg", title: "Demarkt Portable Zipper Eye Glasses Sunglasses Clam Shell Hard Case ProtectorBox", link: 'https://www.amazon.com/Demarkt-Portable-Glasses-Sunglasses-ProtectorBox/dp/B072JMHYM5', des: ["Size: 16x 4.5 x 7.5cm", 'Zipper style', ' Large capacity', 'It protects your Eye Glasses Sunglasses from Fingerprints, Scratches, Dusts, Collisions And Abrasion', 'EVA material'] }, { id: 11, src: "./images/11.jpg", title: "Demarkt® Women Tattoo Pattern Knee High Hosiery Pantyhose Leggings Stockings Tights (Heart Mock Thigh Highs)", link: 'https://www.amazon.com/Demarkt%C2%AE-Pattern-Pantyhose-Leggings-Stockings/dp/B00INTX1DS', des: ["Women Tattoo Pattern Knee High Hosiery Pantyhose Leggings Stockings Tights (Heart Mock Thigh Highs)", '100% brand new', ' package : 1 PC'] }];
    showDes = function (id) {
        var obj;
        $('.des-wrap .des ul').empty();
        productList.forEach(function (t) {
            if (t.id == id) {
                obj = t;
            }
        });
        if (obj) {
            $('.des-wrap .title').text(obj.title);
            $("#sb-slider li a img").attr("src", obj.src);
            obj.des.forEach(function (value, index) {
                $('<li>').text(value).appendTo($('.des-wrap .des ul'));
            });
            $('#buyButton').click(function () {
                window.open(obj.link, '_blank');
            });
        }
    };
    function getId() {
        var param = location.search;
        showDes(param.slice(4));
        // console.log(param.slice(4));
    }
    getId();
});

/***/ })
/******/ ]);