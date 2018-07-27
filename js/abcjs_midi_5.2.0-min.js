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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_parse.js: parses a string representing ABC Music Notation into a usable internal structure.
//    Copyright (C) 2010-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var parseCommon = {};

parseCommon.clone = function (source) {
	var destination = {};
	for (var property in source) {
		if (source.hasOwnProperty(property)) destination[property] = source[property];
	}return destination;
};

parseCommon.cloneArray = function (source) {
	var destination = [];
	for (var i = 0; i < source.length; i++) {
		destination.push(parseCommon.clone(source[i]));
	}
	return destination;
};

parseCommon.cloneHashOfHash = function (source) {
	var destination = {};
	for (var property in source) {
		if (source.hasOwnProperty(property)) destination[property] = parseCommon.clone(source[property]);
	}return destination;
};

parseCommon.cloneHashOfArrayOfHash = function (source) {
	var destination = {};
	for (var property in source) {
		if (source.hasOwnProperty(property)) destination[property] = parseCommon.cloneArray(source[property]);
	}return destination;
};

parseCommon.gsub = function (source, pattern, replacement) {
	return source.split(pattern).join(replacement);
};

parseCommon.strip = function (str) {
	return str.replace(/^\s+/, '').replace(/\s+$/, '');
};

parseCommon.startsWith = function (str, pattern) {
	return str.indexOf(pattern) === 0;
};

parseCommon.endsWith = function (str, pattern) {
	var d = str.length - pattern.length;
	return d >= 0 && str.lastIndexOf(pattern) === d;
};

parseCommon.each = function (arr, iterator, context) {
	for (var i = 0, length = arr.length; i < length; i++) {
		iterator.apply(context, [arr[i], i]);
	}
};

parseCommon.last = function (arr) {
	if (arr.length === 0) return null;
	return arr[arr.length - 1];
};

parseCommon.compact = function (arr) {
	var output = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]) output.push(arr[i]);
	}
	return output;
};

parseCommon.detect = function (arr, iterator) {
	for (var i = 0; i < arr.length; i++) {
		if (iterator(arr[i])) return true;
	}
	return false;
};

// The following is a polyfill for Object.remove for IE9, IE10, and IE11.
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
(function (arr) {
	arr.forEach(function (item) {
		if (item.hasOwnProperty('remove')) {
			return;
		}
		Object.defineProperty(item, 'remove', {
			configurable: true,
			enumerable: true,
			writable: true,
			value: function remove() {
				if (this.parentNode !== null) this.parentNode.removeChild(this);
			}
		});
	});
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

module.exports = parseCommon;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    Copyright (C) 2014-2018 Gregory Dyke (gregdyke at gmail dot com)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var spacing = {};

spacing.FONTEM = 360;
spacing.FONTSIZE = 30;
spacing.STEP = spacing.FONTSIZE * 93 / 720;
spacing.SPACE = 10;
spacing.TOPNOTE = 15;
spacing.STAVEHEIGHT = 100;
spacing.INDENT = 50;

module.exports = spacing;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_relative_element.js: Definition of the RelativeElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var glyphs = __webpack_require__(3);

var RelativeElement = function RelativeElement(c, dx, w, pitch, opt) {
	opt = opt || {};
	this.x = 0;
	this.c = c; // character or path or string
	this.dx = dx; // relative x position
	this.w = w; // minimum width taken up by this element (can include gratuitous space)
	this.pitch = pitch; // relative y position by pitch
	this.scalex = opt.scalex || 1; // should the character/path be scaled?
	this.scaley = opt.scaley || 1; // should the character/path be scaled?
	this.type = opt.type || "symbol"; // cheap types.
	this.pitch2 = opt.pitch2;
	this.linewidth = opt.linewidth;
	this.klass = opt.klass;
	this.top = pitch;
	if (this.pitch2 !== undefined && this.pitch2 > this.top) this.top = this.pitch2;
	this.bottom = pitch;
	if (this.pitch2 !== undefined && this.pitch2 < this.bottom) this.bottom = this.pitch2;
	if (opt.thickness) {
		this.top += opt.thickness / 2;
		this.bottom -= opt.thickness / 2;
	}
	if (opt.stemHeight) {
		if (opt.stemHeight > 0) this.top += opt.stemHeight;else this.bottom += opt.stemHeight;
	}
	//if (this.type === "symbol") {
	//	var offset = glyphs.getYCorr(this.c);
	//	this.top += offset;
	//	this.bottom += offset;
	//}
	this.height = opt.height ? opt.height : 4; // The +1 is to give a little bit of padding.
	this.centerVertically = false;
	switch (this.type) {
		case "debug":
			this.chordHeightAbove = this.height;
			break;
		case "lyric":
			if (opt.position && opt.position === 'below') this.lyricHeightBelow = this.height;else this.lyricHeightAbove = this.height;
			break;
		case "chord":
			if (opt.position && opt.position === 'below') this.chordHeightBelow = this.height;else this.chordHeightAbove = this.height;
			break;
		case "text":
			if (this.pitch === undefined) {
				if (opt.position && opt.position === 'below') this.chordHeightBelow = this.height;else this.chordHeightAbove = this.height;
			} else this.centerVertically = true;
			break;
		case "part":
			this.partHeightAbove = this.height;break;
	}
};

RelativeElement.prototype.setX = function (x) {
	this.x = x + this.dx;
};

RelativeElement.prototype.setUpperAndLowerElements = function (positionY) {
	switch (this.type) {
		case "part":
			this.top = positionY.partHeightAbove + this.height;
			this.bottom = positionY.partHeightAbove;
			break;
		case "text":
		case "chord":
			if (this.chordHeightAbove) {
				this.top = positionY.chordHeightAbove;
				this.bottom = positionY.chordHeightAbove;
			} else {
				this.top = positionY.chordHeightBelow;
				this.bottom = positionY.chordHeightBelow;
			}
			break;
		case "lyric":
			if (this.lyricHeightAbove) {
				this.top = positionY.lyricHeightAbove;
				this.bottom = positionY.lyricHeightAbove;
			} else {
				this.top = positionY.lyricHeightBelow;
				this.bottom = positionY.lyricHeightBelow;
			}
			break;
		case "debug":
			this.top = positionY.chordHeightAbove;
			this.bottom = positionY.chordHeightAbove;
			break;
	}
	if (this.pitch === undefined || this.top === undefined) window.console.error("RelativeElement position not set.", this.type, this.pitch, this.top, positionY);
};

RelativeElement.prototype.draw = function (renderer, bartop) {
	if (this.pitch === undefined) window.console.error(this.type + " Relative Element y-coordinate not set.");
	var y = renderer.calcY(this.pitch);
	switch (this.type) {
		case "symbol":
			if (this.c === null) return null;
			var klass = "symbol";
			if (this.klass) klass += " " + this.klass;
			this.graphelem = renderer.printSymbol(this.x, this.pitch, this.c, this.scalex, this.scaley, renderer.addClasses(klass));break;
		case "debug":
			this.graphelem = renderer.renderText(this.x, renderer.calcY(15), "" + this.c, "debugfont", 'debug-msg', 'start');break;
		case "barNumber":
			this.graphelem = renderer.renderText(this.x, y, "" + this.c, "measurefont", 'bar-number', "middle");
			break;
		case "lyric":
			this.graphelem = renderer.renderText(this.x, y, this.c, "vocalfont", 'lyric', "middle");
			break;
		case "chord":
			this.graphelem = renderer.renderText(this.x, y, this.c, 'gchordfont', "chord", "middle");
			break;
		case "decoration":
			this.graphelem = renderer.renderText(this.x, y, this.c, 'annotationfont', "annotation", "middle", true);
			break;
		case "text":
			this.graphelem = renderer.renderText(this.x, y, this.c, 'annotationfont', "annotation", "start", this.centerVertically);
			break;
		case "multimeasure-text":
			this.graphelem = renderer.renderText(this.x + this.w / 2, y, this.c, 'tempofont', "rest", "middle", false);
			break;
		case "part":
			this.graphelem = renderer.renderText(this.x, y, this.c, 'partsfont', "part", "start");
			break;
		case "bar":
			this.graphelem = renderer.printStem(this.x, this.linewidth, y, bartop ? bartop : renderer.calcY(this.pitch2));break; // bartop can't be 0
		case "stem":
			this.graphelem = renderer.printStem(this.x, this.linewidth, y, renderer.calcY(this.pitch2));break;
		case "ledger":
			this.graphelem = renderer.printStaveLine(this.x, this.x + this.w, this.pitch);break;
	}
	if (this.scalex !== 1 && this.graphelem) {
		renderer.scaleExistingElem(this.graphelem, this.scalex, this.scaley, this.x, y);
	}
	return this.graphelem;
};

module.exports = RelativeElement;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var spacing = __webpack_require__(1);

/**
 * Glyphs and some methods to adjust for their x and y baseline
 */
var Glyphs = function Glyphs() {
	"use strict";

	var glyphs = { '0': { d: [['M', 4.83, -14.97], ['c', 0.33, -0.03, 1.11, 0.00, 1.47, 0.06], ['c', 1.68, 0.36, 2.97, 1.59, 3.78, 3.60], ['c', 1.20, 2.97, 0.81, 6.96, -0.90, 9.27], ['c', -0.78, 1.08, -1.71, 1.71, -2.91, 1.95], ['c', -0.45, 0.09, -1.32, 0.09, -1.77, 0.00], ['c', -0.81, -0.18, -1.47, -0.51, -2.07, -1.02], ['c', -2.34, -2.07, -3.15, -6.72, -1.74, -10.20], ['c', 0.87, -2.16, 2.28, -3.42, 4.14, -3.66], ['z'], ['m', 1.11, 0.87], ['c', -0.21, -0.06, -0.69, -0.09, -0.87, -0.06], ['c', -0.54, 0.12, -0.87, 0.42, -1.17, 0.99], ['c', -0.36, 0.66, -0.51, 1.56, -0.60, 3.00], ['c', -0.03, 0.75, -0.03, 4.59, 0.00, 5.31], ['c', 0.09, 1.50, 0.27, 2.40, 0.60, 3.06], ['c', 0.24, 0.48, 0.57, 0.78, 0.96, 0.90], ['c', 0.27, 0.09, 0.78, 0.09, 1.05, 0.00], ['c', 0.39, -0.12, 0.72, -0.42, 0.96, -0.90], ['c', 0.33, -0.66, 0.51, -1.56, 0.60, -3.06], ['c', 0.03, -0.72, 0.03, -4.56, 0.00, -5.31], ['c', -0.09, -1.47, -0.27, -2.37, -0.60, -3.03], ['c', -0.24, -0.48, -0.54, -0.78, -0.93, -0.90], ['z']], w: 10.78, h: 14.959 },
		'1': { d: [['M', 3.30, -15.06], ['c', 0.06, -0.06, 0.21, -0.03, 0.66, 0.15], ['c', 0.81, 0.39, 1.08, 0.39, 1.83, 0.03], ['c', 0.21, -0.09, 0.39, -0.15, 0.42, -0.15], ['c', 0.12, 0.00, 0.21, 0.09, 0.27, 0.21], ['c', 0.06, 0.12, 0.06, 0.33, 0.06, 5.94], ['c', 0.00, 3.93, 0.00, 5.85, 0.03, 6.03], ['c', 0.06, 0.36, 0.15, 0.69, 0.27, 0.96], ['c', 0.36, 0.75, 0.93, 1.17, 1.68, 1.26], ['c', 0.30, 0.03, 0.39, 0.09, 0.39, 0.30], ['c', 0.00, 0.15, -0.03, 0.18, -0.09, 0.24], ['c', -0.06, 0.06, -0.09, 0.06, -0.48, 0.06], ['c', -0.42, 0.00, -0.69, -0.03, -2.10, -0.24], ['c', -0.90, -0.15, -1.77, -0.15, -2.67, 0.00], ['c', -1.41, 0.21, -1.68, 0.24, -2.10, 0.24], ['c', -0.39, 0.00, -0.42, 0.00, -0.48, -0.06], ['c', -0.06, -0.06, -0.06, -0.09, -0.06, -0.24], ['c', 0.00, -0.21, 0.06, -0.27, 0.36, -0.30], ['c', 0.75, -0.09, 1.32, -0.51, 1.68, -1.26], ['c', 0.12, -0.27, 0.21, -0.60, 0.27, -0.96], ['c', 0.03, -0.18, 0.03, -1.59, 0.03, -4.29], ['c', 0.00, -3.87, 0.00, -4.05, -0.06, -4.14], ['c', -0.09, -0.15, -0.18, -0.24, -0.39, -0.24], ['c', -0.12, 0.00, -0.15, 0.03, -0.21, 0.06], ['c', -0.03, 0.06, -0.45, 0.99, -0.96, 2.13], ['c', -0.48, 1.14, -0.90, 2.10, -0.93, 2.16], ['c', -0.06, 0.15, -0.21, 0.24, -0.33, 0.24], ['c', -0.24, 0.00, -0.42, -0.18, -0.42, -0.39], ['c', 0.00, -0.06, 3.27, -7.62, 3.33, -7.74], ['z']], w: 8.94, h: 15.058 },
		'2': { d: [['M', 4.23, -14.97], ['c', 0.57, -0.06, 1.68, 0.00, 2.34, 0.18], ['c', 0.69, 0.18, 1.50, 0.54, 2.01, 0.90], ['c', 1.35, 0.96, 1.95, 2.25, 1.77, 3.81], ['c', -0.15, 1.35, -0.66, 2.34, -1.68, 3.15], ['c', -0.60, 0.48, -1.44, 0.93, -3.12, 1.65], ['c', -1.32, 0.57, -1.80, 0.81, -2.37, 1.14], ['c', -0.57, 0.33, -0.57, 0.33, -0.24, 0.27], ['c', 0.39, -0.09, 1.26, -0.09, 1.68, 0.00], ['c', 0.72, 0.15, 1.41, 0.45, 2.10, 0.90], ['c', 0.99, 0.63, 1.86, 0.87, 2.55, 0.75], ['c', 0.24, -0.06, 0.42, -0.15, 0.57, -0.30], ['c', 0.12, -0.09, 0.30, -0.42, 0.30, -0.51], ['c', 0.00, -0.09, 0.12, -0.21, 0.24, -0.24], ['c', 0.18, -0.03, 0.39, 0.12, 0.39, 0.30], ['c', 0.00, 0.12, -0.15, 0.57, -0.30, 0.87], ['c', -0.54, 1.02, -1.56, 1.74, -2.79, 2.01], ['c', -0.42, 0.09, -1.23, 0.09, -1.62, 0.03], ['c', -0.81, -0.18, -1.32, -0.45, -2.01, -1.11], ['c', -0.45, -0.45, -0.63, -0.57, -0.96, -0.69], ['c', -0.84, -0.27, -1.89, 0.12, -2.25, 0.90], ['c', -0.12, 0.21, -0.21, 0.54, -0.21, 0.72], ['c', 0.00, 0.12, -0.12, 0.21, -0.27, 0.24], ['c', -0.15, 0.00, -0.27, -0.03, -0.33, -0.15], ['c', -0.09, -0.21, 0.09, -1.08, 0.33, -1.71], ['c', 0.24, -0.66, 0.66, -1.26, 1.29, -1.89], ['c', 0.45, -0.45, 0.90, -0.81, 1.92, -1.56], ['c', 1.29, -0.93, 1.89, -1.44, 2.34, -1.98], ['c', 0.87, -1.05, 1.26, -2.19, 1.20, -3.63], ['c', -0.06, -1.29, -0.39, -2.31, -0.96, -2.91], ['c', -0.36, -0.33, -0.72, -0.51, -1.17, -0.54], ['c', -0.84, -0.03, -1.53, 0.42, -1.59, 1.05], ['c', -0.03, 0.33, 0.12, 0.60, 0.57, 1.14], ['c', 0.45, 0.54, 0.54, 0.87, 0.42, 1.41], ['c', -0.15, 0.63, -0.54, 1.11, -1.08, 1.38], ['c', -0.63, 0.33, -1.20, 0.33, -1.83, 0.00], ['c', -0.24, -0.12, -0.33, -0.18, -0.54, -0.39], ['c', -0.18, -0.18, -0.27, -0.30, -0.36, -0.51], ['c', -0.24, -0.45, -0.27, -0.84, -0.21, -1.38], ['c', 0.12, -0.75, 0.45, -1.41, 1.02, -1.98], ['c', 0.72, -0.72, 1.74, -1.17, 2.85, -1.32], ['z']], w: 10.764, h: 14.97 },
		'3': { d: [['M', 3.78, -14.97], ['c', 0.30, -0.03, 1.41, 0.00, 1.83, 0.06], ['c', 2.22, 0.30, 3.51, 1.32, 3.72, 2.91], ['c', 0.03, 0.33, 0.03, 1.26, -0.03, 1.65], ['c', -0.12, 0.84, -0.48, 1.47, -1.05, 1.77], ['c', -0.27, 0.15, -0.36, 0.24, -0.45, 0.39], ['c', -0.09, 0.21, -0.09, 0.36, 0.00, 0.57], ['c', 0.09, 0.15, 0.18, 0.24, 0.51, 0.39], ['c', 0.75, 0.42, 1.23, 1.14, 1.41, 2.13], ['c', 0.06, 0.42, 0.06, 1.35, 0.00, 1.71], ['c', -0.18, 0.81, -0.48, 1.38, -1.02, 1.95], ['c', -0.75, 0.72, -1.80, 1.20, -3.18, 1.38], ['c', -0.42, 0.06, -1.56, 0.06, -1.95, 0.00], ['c', -1.89, -0.33, -3.18, -1.29, -3.51, -2.64], ['c', -0.03, -0.12, -0.03, -0.33, -0.03, -0.60], ['c', 0.00, -0.36, 0.00, -0.42, 0.06, -0.63], ['c', 0.12, -0.30, 0.27, -0.51, 0.51, -0.75], ['c', 0.24, -0.24, 0.45, -0.39, 0.75, -0.51], ['c', 0.21, -0.06, 0.27, -0.06, 0.60, -0.06], ['c', 0.33, 0.00, 0.39, 0.00, 0.60, 0.06], ['c', 0.30, 0.12, 0.51, 0.27, 0.75, 0.51], ['c', 0.36, 0.33, 0.57, 0.75, 0.60, 1.20], ['c', 0.00, 0.21, 0.00, 0.27, -0.06, 0.42], ['c', -0.09, 0.18, -0.12, 0.24, -0.54, 0.54], ['c', -0.51, 0.36, -0.63, 0.54, -0.60, 0.87], ['c', 0.06, 0.54, 0.54, 0.90, 1.38, 0.99], ['c', 0.36, 0.06, 0.72, 0.03, 0.96, -0.06], ['c', 0.81, -0.27, 1.29, -1.23, 1.44, -2.79], ['c', 0.03, -0.45, 0.03, -1.95, -0.03, -2.37], ['c', -0.09, -0.75, -0.33, -1.23, -0.75, -1.44], ['c', -0.33, -0.18, -0.45, -0.18, -1.98, -0.18], ['c', -1.35, 0.00, -1.41, 0.00, -1.50, -0.06], ['c', -0.18, -0.12, -0.24, -0.39, -0.12, -0.60], ['c', 0.12, -0.15, 0.15, -0.15, 1.68, -0.15], ['c', 1.50, 0.00, 1.62, 0.00, 1.89, -0.15], ['c', 0.18, -0.09, 0.42, -0.36, 0.54, -0.57], ['c', 0.18, -0.42, 0.27, -0.90, 0.30, -1.95], ['c', 0.03, -1.20, -0.06, -1.80, -0.36, -2.37], ['c', -0.24, -0.48, -0.63, -0.81, -1.14, -0.96], ['c', -0.30, -0.06, -1.08, -0.06, -1.38, 0.03], ['c', -0.60, 0.15, -0.90, 0.42, -0.96, 0.84], ['c', -0.03, 0.30, 0.06, 0.45, 0.63, 0.84], ['c', 0.33, 0.24, 0.42, 0.39, 0.45, 0.63], ['c', 0.03, 0.72, -0.57, 1.50, -1.32, 1.65], ['c', -1.05, 0.27, -2.10, -0.57, -2.10, -1.65], ['c', 0.00, -0.45, 0.15, -0.96, 0.39, -1.38], ['c', 0.12, -0.21, 0.54, -0.63, 0.81, -0.81], ['c', 0.57, -0.42, 1.38, -0.69, 2.25, -0.81], ['z']], w: 9.735, h: 14.967 },
		'4': { d: [['M', 8.64, -14.94], ['c', 0.27, -0.09, 0.42, -0.12, 0.54, -0.03], ['c', 0.09, 0.06, 0.15, 0.21, 0.15, 0.30], ['c', -0.03, 0.06, -1.92, 2.31, -4.23, 5.04], ['c', -2.31, 2.73, -4.23, 4.98, -4.26, 5.01], ['c', -0.03, 0.06, 0.12, 0.06, 2.55, 0.06], ['l', 2.61, 0.00], ['l', 0.00, -2.37], ['c', 0.00, -2.19, 0.03, -2.37, 0.06, -2.46], ['c', 0.03, -0.06, 0.21, -0.18, 0.57, -0.42], ['c', 1.08, -0.72, 1.38, -1.08, 1.86, -2.16], ['c', 0.12, -0.30, 0.24, -0.54, 0.27, -0.57], ['c', 0.12, -0.12, 0.39, -0.06, 0.45, 0.12], ['c', 0.06, 0.09, 0.06, 0.57, 0.06, 3.96], ['l', 0.00, 3.90], ['l', 1.08, 0.00], ['c', 1.05, 0.00, 1.11, 0.00, 1.20, 0.06], ['c', 0.24, 0.15, 0.24, 0.54, 0.00, 0.69], ['c', -0.09, 0.06, -0.15, 0.06, -1.20, 0.06], ['l', -1.08, 0.00], ['l', 0.00, 0.33], ['c', 0.00, 0.57, 0.09, 1.11, 0.30, 1.53], ['c', 0.36, 0.75, 0.93, 1.17, 1.68, 1.26], ['c', 0.30, 0.03, 0.39, 0.09, 0.39, 0.30], ['c', 0.00, 0.15, -0.03, 0.18, -0.09, 0.24], ['c', -0.06, 0.06, -0.09, 0.06, -0.48, 0.06], ['c', -0.42, 0.00, -0.69, -0.03, -2.10, -0.24], ['c', -0.90, -0.15, -1.77, -0.15, -2.67, 0.00], ['c', -1.41, 0.21, -1.68, 0.24, -2.10, 0.24], ['c', -0.39, 0.00, -0.42, 0.00, -0.48, -0.06], ['c', -0.06, -0.06, -0.06, -0.09, -0.06, -0.24], ['c', 0.00, -0.21, 0.06, -0.27, 0.36, -0.30], ['c', 0.75, -0.09, 1.32, -0.51, 1.68, -1.26], ['c', 0.21, -0.42, 0.30, -0.96, 0.30, -1.53], ['l', 0.00, -0.33], ['l', -2.70, 0.00], ['c', -2.91, 0.00, -2.85, 0.00, -3.09, -0.15], ['c', -0.18, -0.12, -0.30, -0.39, -0.27, -0.54], ['c', 0.03, -0.06, 0.18, -0.24, 0.33, -0.45], ['c', 0.75, -0.90, 1.59, -2.07, 2.13, -3.03], ['c', 0.33, -0.54, 0.84, -1.62, 1.05, -2.16], ['c', 0.57, -1.41, 0.84, -2.64, 0.90, -4.05], ['c', 0.03, -0.63, 0.06, -0.72, 0.24, -0.81], ['l', 0.12, -0.06], ['l', 0.45, 0.12], ['c', 0.66, 0.18, 1.02, 0.24, 1.47, 0.27], ['c', 0.60, 0.03, 1.23, -0.09, 2.01, -0.33], ['z']], w: 11.795, h: 14.994 },
		'5': { d: [['M', 1.02, -14.94], ['c', 0.12, -0.09, 0.03, -0.09, 1.08, 0.06], ['c', 2.49, 0.36, 4.35, 0.36, 6.96, -0.06], ['c', 0.57, -0.09, 0.66, -0.06, 0.81, 0.06], ['c', 0.15, 0.18, 0.12, 0.24, -0.15, 0.51], ['c', -1.29, 1.26, -3.24, 2.04, -5.58, 2.31], ['c', -0.60, 0.09, -1.20, 0.12, -1.71, 0.12], ['c', -0.39, 0.00, -0.45, 0.00, -0.57, 0.06], ['c', -0.09, 0.06, -0.15, 0.12, -0.21, 0.21], ['l', -0.06, 0.12], ['l', 0.00, 1.65], ['l', 0.00, 1.65], ['l', 0.21, -0.21], ['c', 0.66, -0.57, 1.41, -0.96, 2.19, -1.14], ['c', 0.33, -0.06, 1.41, -0.06, 1.95, 0.00], ['c', 2.61, 0.36, 4.02, 1.74, 4.26, 4.14], ['c', 0.03, 0.45, 0.03, 1.08, -0.03, 1.44], ['c', -0.18, 1.02, -0.78, 2.01, -1.59, 2.70], ['c', -0.72, 0.57, -1.62, 1.02, -2.49, 1.20], ['c', -1.38, 0.27, -3.03, 0.06, -4.20, -0.54], ['c', -1.08, -0.54, -1.71, -1.32, -1.86, -2.28], ['c', -0.09, -0.69, 0.09, -1.29, 0.57, -1.74], ['c', 0.24, -0.24, 0.45, -0.39, 0.75, -0.51], ['c', 0.21, -0.06, 0.27, -0.06, 0.60, -0.06], ['c', 0.33, 0.00, 0.39, 0.00, 0.60, 0.06], ['c', 0.30, 0.12, 0.51, 0.27, 0.75, 0.51], ['c', 0.36, 0.33, 0.57, 0.75, 0.60, 1.20], ['c', 0.00, 0.21, 0.00, 0.27, -0.06, 0.42], ['c', -0.09, 0.18, -0.12, 0.24, -0.54, 0.54], ['c', -0.18, 0.12, -0.36, 0.30, -0.42, 0.33], ['c', -0.36, 0.42, -0.18, 0.99, 0.36, 1.26], ['c', 0.51, 0.27, 1.47, 0.36, 2.01, 0.27], ['c', 0.93, -0.21, 1.47, -1.17, 1.65, -2.91], ['c', 0.06, -0.45, 0.06, -1.89, 0.00, -2.31], ['c', -0.15, -1.20, -0.51, -2.10, -1.05, -2.55], ['c', -0.21, -0.18, -0.54, -0.36, -0.81, -0.39], ['c', -0.30, -0.06, -0.84, -0.03, -1.26, 0.06], ['c', -0.93, 0.18, -1.65, 0.60, -2.16, 1.20], ['c', -0.15, 0.21, -0.27, 0.30, -0.39, 0.30], ['c', -0.15, 0.00, -0.30, -0.09, -0.36, -0.18], ['c', -0.06, -0.09, -0.06, -0.15, -0.06, -3.66], ['c', 0.00, -3.39, 0.00, -3.57, 0.06, -3.66], ['c', 0.03, -0.06, 0.09, -0.15, 0.15, -0.18], ['z']], w: 10.212, h: 14.997 },
		'6': { d: [['M', 4.98, -14.97], ['c', 0.36, -0.03, 1.20, 0.00, 1.59, 0.06], ['c', 0.90, 0.15, 1.68, 0.51, 2.25, 1.05], ['c', 0.57, 0.51, 0.87, 1.23, 0.84, 1.98], ['c', -0.03, 0.51, -0.21, 0.90, -0.60, 1.26], ['c', -0.24, 0.24, -0.45, 0.39, -0.75, 0.51], ['c', -0.21, 0.06, -0.27, 0.06, -0.60, 0.06], ['c', -0.33, 0.00, -0.39, 0.00, -0.60, -0.06], ['c', -0.30, -0.12, -0.51, -0.27, -0.75, -0.51], ['c', -0.39, -0.36, -0.57, -0.78, -0.57, -1.26], ['c', 0.00, -0.27, 0.00, -0.30, 0.09, -0.42], ['c', 0.03, -0.09, 0.18, -0.21, 0.30, -0.30], ['c', 0.12, -0.09, 0.30, -0.21, 0.39, -0.27], ['c', 0.09, -0.06, 0.21, -0.18, 0.27, -0.24], ['c', 0.06, -0.12, 0.09, -0.15, 0.09, -0.33], ['c', 0.00, -0.18, -0.03, -0.24, -0.09, -0.36], ['c', -0.24, -0.39, -0.75, -0.60, -1.38, -0.57], ['c', -0.54, 0.03, -0.90, 0.18, -1.23, 0.48], ['c', -0.81, 0.72, -1.08, 2.16, -0.96, 5.37], ['l', 0.00, 0.63], ['l', 0.30, -0.12], ['c', 0.78, -0.27, 1.29, -0.33, 2.10, -0.27], ['c', 1.47, 0.12, 2.49, 0.54, 3.27, 1.29], ['c', 0.48, 0.51, 0.81, 1.11, 0.96, 1.89], ['c', 0.06, 0.27, 0.06, 0.42, 0.06, 0.93], ['c', 0.00, 0.54, 0.00, 0.69, -0.06, 0.96], ['c', -0.15, 0.78, -0.48, 1.38, -0.96, 1.89], ['c', -0.54, 0.51, -1.17, 0.87, -1.98, 1.08], ['c', -1.14, 0.30, -2.40, 0.33, -3.24, 0.03], ['c', -1.50, -0.48, -2.64, -1.89, -3.27, -4.02], ['c', -0.36, -1.23, -0.51, -2.82, -0.42, -4.08], ['c', 0.30, -3.66, 2.28, -6.30, 4.95, -6.66], ['z'], ['m', 0.66, 7.41], ['c', -0.27, -0.09, -0.81, -0.12, -1.08, -0.06], ['c', -0.72, 0.18, -1.08, 0.69, -1.23, 1.71], ['c', -0.06, 0.54, -0.06, 3.00, 0.00, 3.54], ['c', 0.18, 1.26, 0.72, 1.77, 1.80, 1.74], ['c', 0.39, -0.03, 0.63, -0.09, 0.90, -0.27], ['c', 0.66, -0.42, 0.90, -1.32, 0.90, -3.24], ['c', 0.00, -2.22, -0.36, -3.12, -1.29, -3.42], ['z']], w: 9.956, h: 14.982 },
		'7': { d: [['M', 0.21, -14.97], ['c', 0.21, -0.06, 0.45, 0.00, 0.54, 0.15], ['c', 0.06, 0.09, 0.06, 0.15, 0.06, 0.39], ['c', 0.00, 0.24, 0.00, 0.33, 0.06, 0.42], ['c', 0.06, 0.12, 0.21, 0.24, 0.27, 0.24], ['c', 0.03, 0.00, 0.12, -0.12, 0.24, -0.21], ['c', 0.96, -1.20, 2.58, -1.35, 3.99, -0.42], ['c', 0.15, 0.12, 0.42, 0.30, 0.54, 0.45], ['c', 0.48, 0.39, 0.81, 0.57, 1.29, 0.60], ['c', 0.69, 0.03, 1.50, -0.30, 2.13, -0.87], ['c', 0.09, -0.09, 0.27, -0.30, 0.39, -0.45], ['c', 0.12, -0.15, 0.24, -0.27, 0.30, -0.30], ['c', 0.18, -0.06, 0.39, 0.03, 0.51, 0.21], ['c', 0.06, 0.18, 0.06, 0.24, -0.27, 0.72], ['c', -0.18, 0.24, -0.54, 0.78, -0.78, 1.17], ['c', -2.37, 3.54, -3.54, 6.27, -3.87, 9.00], ['c', -0.03, 0.33, -0.03, 0.66, -0.03, 1.26], ['c', 0.00, 0.90, 0.00, 1.08, 0.15, 1.89], ['c', 0.06, 0.45, 0.06, 0.48, 0.03, 0.60], ['c', -0.06, 0.09, -0.21, 0.21, -0.30, 0.21], ['c', -0.03, 0.00, -0.27, -0.06, -0.54, -0.15], ['c', -0.84, -0.27, -1.11, -0.30, -1.65, -0.30], ['c', -0.57, 0.00, -0.84, 0.03, -1.56, 0.27], ['c', -0.60, 0.18, -0.69, 0.21, -0.81, 0.15], ['c', -0.12, -0.06, -0.21, -0.18, -0.21, -0.30], ['c', 0.00, -0.15, 0.60, -1.44, 1.20, -2.61], ['c', 1.14, -2.22, 2.73, -4.68, 5.10, -8.01], ['c', 0.21, -0.27, 0.36, -0.48, 0.33, -0.48], ['c', 0.00, 0.00, -0.12, 0.06, -0.27, 0.12], ['c', -0.54, 0.30, -0.99, 0.39, -1.56, 0.39], ['c', -0.75, 0.03, -1.20, -0.18, -1.83, -0.75], ['c', -0.99, -0.90, -1.83, -1.17, -2.31, -0.72], ['c', -0.18, 0.15, -0.36, 0.51, -0.45, 0.84], ['c', -0.06, 0.24, -0.06, 0.33, -0.09, 1.98], ['c', 0.00, 1.62, -0.03, 1.74, -0.06, 1.80], ['c', -0.15, 0.24, -0.54, 0.24, -0.69, 0.00], ['c', -0.06, -0.09, -0.06, -0.15, -0.06, -3.57], ['c', 0.00, -3.42, 0.00, -3.48, 0.06, -3.57], ['c', 0.03, -0.06, 0.09, -0.12, 0.15, -0.15], ['z']], w: 10.561, h: 15.093 },
		'8': { d: [['M', 4.98, -14.97], ['c', 0.33, -0.03, 1.02, -0.03, 1.32, 0.00], ['c', 1.32, 0.12, 2.49, 0.60, 3.21, 1.32], ['c', 0.39, 0.39, 0.66, 0.81, 0.78, 1.29], ['c', 0.09, 0.36, 0.09, 1.08, 0.00, 1.44], ['c', -0.21, 0.84, -0.66, 1.59, -1.59, 2.55], ['l', -0.30, 0.30], ['l', 0.27, 0.18], ['c', 1.47, 0.93, 2.31, 2.31, 2.25, 3.75], ['c', -0.03, 0.75, -0.24, 1.35, -0.63, 1.95], ['c', -0.45, 0.66, -1.02, 1.14, -1.83, 1.53], ['c', -1.80, 0.87, -4.20, 0.87, -6.00, 0.03], ['c', -1.62, -0.78, -2.52, -2.16, -2.46, -3.66], ['c', 0.06, -0.99, 0.54, -1.77, 1.80, -2.97], ['c', 0.54, -0.51, 0.54, -0.54, 0.48, -0.57], ['c', -0.39, -0.27, -0.96, -0.78, -1.20, -1.14], ['c', -0.75, -1.11, -0.87, -2.40, -0.30, -3.60], ['c', 0.69, -1.35, 2.25, -2.25, 4.20, -2.40], ['z'], ['m', 1.53, 0.69], ['c', -0.42, -0.09, -1.11, -0.12, -1.38, -0.06], ['c', -0.30, 0.06, -0.60, 0.18, -0.81, 0.30], ['c', -0.21, 0.12, -0.60, 0.51, -0.72, 0.72], ['c', -0.51, 0.87, -0.42, 1.89, 0.21, 2.52], ['c', 0.21, 0.21, 0.36, 0.30, 1.95, 1.23], ['c', 0.96, 0.54, 1.74, 0.99, 1.77, 1.02], ['c', 0.09, 0.00, 0.63, -0.60, 0.99, -1.11], ['c', 0.21, -0.36, 0.48, -0.87, 0.57, -1.23], ['c', 0.06, -0.24, 0.06, -0.36, 0.06, -0.72], ['c', 0.00, -0.45, -0.03, -0.66, -0.15, -0.99], ['c', -0.39, -0.81, -1.29, -1.44, -2.49, -1.68], ['z'], ['m', -1.44, 8.07], ['l', -1.89, -1.08], ['c', -0.03, 0.00, -0.18, 0.15, -0.39, 0.33], ['c', -1.20, 1.08, -1.65, 1.95, -1.59, 3.00], ['c', 0.09, 1.59, 1.35, 2.85, 3.21, 3.24], ['c', 0.33, 0.06, 0.45, 0.06, 0.93, 0.06], ['c', 0.63, 0.00, 0.81, -0.03, 1.29, -0.27], ['c', 0.90, -0.42, 1.47, -1.41, 1.41, -2.40], ['c', -0.06, -0.66, -0.39, -1.29, -0.90, -1.65], ['c', -0.12, -0.09, -1.05, -0.63, -2.07, -1.23], ['z']], w: 10.926, h: 14.989 },
		'9': { d: [['M', 4.23, -14.97], ['c', 0.42, -0.03, 1.29, 0.00, 1.62, 0.06], ['c', 0.51, 0.12, 0.93, 0.30, 1.38, 0.57], ['c', 1.53, 1.02, 2.52, 3.24, 2.73, 5.94], ['c', 0.18, 2.55, -0.48, 4.98, -1.83, 6.57], ['c', -1.05, 1.26, -2.40, 1.89, -3.93, 1.83], ['c', -1.23, -0.06, -2.31, -0.45, -3.03, -1.14], ['c', -0.57, -0.51, -0.87, -1.23, -0.84, -1.98], ['c', 0.03, -0.51, 0.21, -0.90, 0.60, -1.26], ['c', 0.24, -0.24, 0.45, -0.39, 0.75, -0.51], ['c', 0.21, -0.06, 0.27, -0.06, 0.60, -0.06], ['c', 0.33, 0.00, 0.39, 0.00, 0.60, 0.06], ['c', 0.30, 0.12, 0.51, 0.27, 0.75, 0.51], ['c', 0.39, 0.36, 0.57, 0.78, 0.57, 1.26], ['c', 0.00, 0.27, 0.00, 0.30, -0.09, 0.42], ['c', -0.03, 0.09, -0.18, 0.21, -0.30, 0.30], ['c', -0.12, 0.09, -0.30, 0.21, -0.39, 0.27], ['c', -0.09, 0.06, -0.21, 0.18, -0.27, 0.24], ['c', -0.06, 0.12, -0.06, 0.15, -0.06, 0.33], ['c', 0.00, 0.18, 0.00, 0.24, 0.06, 0.36], ['c', 0.24, 0.39, 0.75, 0.60, 1.38, 0.57], ['c', 0.54, -0.03, 0.90, -0.18, 1.23, -0.48], ['c', 0.81, -0.72, 1.08, -2.16, 0.96, -5.37], ['l', 0.00, -0.63], ['l', -0.30, 0.12], ['c', -0.78, 0.27, -1.29, 0.33, -2.10, 0.27], ['c', -1.47, -0.12, -2.49, -0.54, -3.27, -1.29], ['c', -0.48, -0.51, -0.81, -1.11, -0.96, -1.89], ['c', -0.06, -0.27, -0.06, -0.42, -0.06, -0.96], ['c', 0.00, -0.51, 0.00, -0.66, 0.06, -0.93], ['c', 0.15, -0.78, 0.48, -1.38, 0.96, -1.89], ['c', 0.15, -0.12, 0.33, -0.27, 0.42, -0.36], ['c', 0.69, -0.51, 1.62, -0.81, 2.76, -0.93], ['z'], ['m', 1.17, 0.66], ['c', -0.21, -0.06, -0.57, -0.06, -0.81, -0.03], ['c', -0.78, 0.12, -1.26, 0.69, -1.41, 1.74], ['c', -0.12, 0.63, -0.15, 1.95, -0.09, 2.79], ['c', 0.12, 1.71, 0.63, 2.40, 1.77, 2.46], ['c', 1.08, 0.03, 1.62, -0.48, 1.80, -1.74], ['c', 0.06, -0.54, 0.06, -3.00, 0.00, -3.54], ['c', -0.15, -1.05, -0.51, -1.53, -1.26, -1.68], ['z']], w: 9.959, h: 14.986 },
		'rests.multimeasure': { d: [['M', 0, -4], ['l', 0, 16], ['l', 1, 0], ['l', 0, -5], ['l', 40, 0], ['l', 0, 5], ['l', 1, 0], ['l', 0, -16], ['l', -1, 0], ['l', 0, 5], ['l', -40, 0], ['l', 0, -5], ['z']], w: 42, h: 18 },
		'rests.whole': { d: [['M', 0.06, 0.03], ['l', 0.09, -0.06], ['l', 5.46, 0.00], ['l', 5.49, 0.00], ['l', 0.09, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 2.19], ['l', 0.00, 2.19], ['l', -0.06, 0.09], ['l', -0.09, 0.06], ['l', -5.49, 0.00], ['l', -5.46, 0.00], ['l', -0.09, -0.06], ['l', -0.06, -0.09], ['l', 0.00, -2.19], ['l', 0.00, -2.19], ['z']], w: 11.25, h: 4.68 },
		'rests.half': { d: [['M', 0.06, -4.62], ['l', 0.09, -0.06], ['l', 5.46, 0.00], ['l', 5.49, 0.00], ['l', 0.09, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 2.19], ['l', 0.00, 2.19], ['l', -0.06, 0.09], ['l', -0.09, 0.06], ['l', -5.49, 0.00], ['l', -5.46, 0.00], ['l', -0.09, -0.06], ['l', -0.06, -0.09], ['l', 0.00, -2.19], ['l', 0.00, -2.19], ['z']], w: 11.25, h: 4.68 },
		'rests.quarter': { d: [['M', 1.89, -11.82], ['c', 0.12, -0.06, 0.24, -0.06, 0.36, -0.03], ['c', 0.09, 0.06, 4.74, 5.58, 4.86, 5.82], ['c', 0.21, 0.39, 0.15, 0.78, -0.15, 1.26], ['c', -0.24, 0.33, -0.72, 0.81, -1.62, 1.56], ['c', -0.45, 0.36, -0.87, 0.75, -0.96, 0.84], ['c', -0.93, 0.99, -1.14, 2.49, -0.60, 3.63], ['c', 0.18, 0.39, 0.27, 0.48, 1.32, 1.68], ['c', 1.92, 2.25, 1.83, 2.16, 1.83, 2.34], ['c', 0.00, 0.18, -0.18, 0.36, -0.36, 0.39], ['c', -0.15, 0.00, -0.27, -0.06, -0.48, -0.27], ['c', -0.75, -0.75, -2.46, -1.29, -3.39, -1.08], ['c', -0.45, 0.09, -0.69, 0.27, -0.90, 0.69], ['c', -0.12, 0.30, -0.21, 0.66, -0.24, 1.14], ['c', -0.03, 0.66, 0.09, 1.35, 0.30, 2.01], ['c', 0.15, 0.42, 0.24, 0.66, 0.45, 0.96], ['c', 0.18, 0.24, 0.18, 0.33, 0.03, 0.42], ['c', -0.12, 0.06, -0.18, 0.03, -0.45, -0.30], ['c', -1.08, -1.38, -2.07, -3.36, -2.40, -4.83], ['c', -0.27, -1.05, -0.15, -1.77, 0.27, -2.07], ['c', 0.21, -0.12, 0.42, -0.15, 0.87, -0.15], ['c', 0.87, 0.06, 2.10, 0.39, 3.30, 0.90], ['l', 0.39, 0.18], ['l', -1.65, -1.95], ['c', -2.52, -2.97, -2.61, -3.09, -2.70, -3.27], ['c', -0.09, -0.24, -0.12, -0.48, -0.03, -0.75], ['c', 0.15, -0.48, 0.57, -0.96, 1.83, -2.01], ['c', 0.45, -0.36, 0.84, -0.72, 0.93, -0.78], ['c', 0.69, -0.75, 1.02, -1.80, 0.90, -2.79], ['c', -0.06, -0.33, -0.21, -0.84, -0.39, -1.11], ['c', -0.09, -0.15, -0.45, -0.60, -0.81, -1.05], ['c', -0.36, -0.42, -0.69, -0.81, -0.72, -0.87], ['c', -0.09, -0.18, 0.00, -0.42, 0.21, -0.51], ['z']], w: 7.888, h: 21.435 },
		'rests.8th': { d: [['M', 1.68, -6.12], ['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72], ['c', 0.12, 0.27, 0.33, 0.45, 0.60, 0.48], ['c', 0.12, 0.00, 0.18, 0.00, 0.33, -0.09], ['c', 0.39, -0.18, 1.32, -1.29, 1.68, -1.98], ['c', 0.09, -0.21, 0.24, -0.30, 0.39, -0.30], ['c', 0.12, 0.00, 0.27, 0.09, 0.33, 0.18], ['c', 0.03, 0.06, -0.27, 1.11, -1.86, 6.42], ['c', -1.02, 3.48, -1.89, 6.39, -1.92, 6.42], ['c', 0.00, 0.03, -0.12, 0.12, -0.24, 0.15], ['c', -0.18, 0.09, -0.21, 0.09, -0.45, 0.09], ['c', -0.24, 0.00, -0.30, 0.00, -0.48, -0.06], ['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15], ['c', -0.06, -0.03, 0.15, -0.57, 1.68, -4.92], ['c', 0.96, -2.67, 1.74, -4.89, 1.71, -4.89], ['l', -0.51, 0.15], ['c', -1.08, 0.36, -1.74, 0.48, -2.55, 0.48], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.90], ['z']], w: 7.534, h: 13.883 },
		'rests.16th': { d: [['M', 3.33, -6.12], ['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72], ['c', 0.15, 0.39, 0.57, 0.57, 0.87, 0.42], ['c', 0.39, -0.18, 1.20, -1.23, 1.62, -2.07], ['c', 0.06, -0.15, 0.24, -0.24, 0.36, -0.24], ['c', 0.12, 0.00, 0.27, 0.09, 0.33, 0.18], ['c', 0.03, 0.06, -0.45, 1.86, -2.67, 10.17], ['c', -1.50, 5.55, -2.73, 10.14, -2.76, 10.17], ['c', -0.03, 0.03, -0.12, 0.12, -0.24, 0.15], ['c', -0.18, 0.09, -0.21, 0.09, -0.45, 0.09], ['c', -0.24, 0.00, -0.30, 0.00, -0.48, -0.06], ['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15], ['c', -0.06, -0.03, 0.12, -0.57, 1.44, -4.92], ['c', 0.81, -2.67, 1.47, -4.86, 1.47, -4.89], ['c', -0.03, 0.00, -0.27, 0.06, -0.54, 0.15], ['c', -1.08, 0.36, -1.77, 0.48, -2.58, 0.48], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42], ['c', 0.30, 0.33, 0.42, 0.60, 0.60, 1.38], ['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.90], ['c', 0.09, 0.09, 0.27, 0.18, 0.45, 0.21], ['c', 0.12, 0.00, 0.18, 0.00, 0.33, -0.09], ['c', 0.33, -0.15, 1.02, -0.93, 1.41, -1.59], ['c', 0.12, -0.21, 0.18, -0.39, 0.39, -1.08], ['c', 0.66, -2.10, 1.17, -3.84, 1.17, -3.87], ['c', 0.00, 0.00, -0.21, 0.06, -0.42, 0.15], ['c', -0.51, 0.15, -1.20, 0.33, -1.68, 0.42], ['c', -0.33, 0.06, -0.51, 0.06, -0.96, 0.06], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.90], ['z']], w: 9.724, h: 21.383 },
		'rests.32nd': { d: [['M', 4.23, -13.62], ['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72], ['c', 0.12, 0.27, 0.33, 0.45, 0.60, 0.48], ['c', 0.12, 0.00, 0.18, 0.00, 0.27, -0.06], ['c', 0.33, -0.21, 0.99, -1.11, 1.44, -1.98], ['c', 0.09, -0.24, 0.21, -0.33, 0.39, -0.33], ['c', 0.12, 0.00, 0.27, 0.09, 0.33, 0.18], ['c', 0.03, 0.06, -0.57, 2.67, -3.21, 13.89], ['c', -1.80, 7.62, -3.30, 13.89, -3.30, 13.92], ['c', -0.03, 0.06, -0.12, 0.12, -0.24, 0.18], ['c', -0.21, 0.09, -0.24, 0.09, -0.48, 0.09], ['c', -0.24, 0.00, -0.30, 0.00, -0.48, -0.06], ['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15], ['c', -0.06, -0.03, 0.09, -0.57, 1.23, -4.92], ['c', 0.69, -2.67, 1.26, -4.86, 1.29, -4.89], ['c', 0.00, -0.03, -0.12, -0.03, -0.48, 0.12], ['c', -1.17, 0.39, -2.22, 0.57, -3.00, 0.54], ['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.30], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42], ['c', 0.30, 0.33, 0.42, 0.60, 0.60, 1.38], ['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.90], ['c', 0.12, 0.09, 0.30, 0.18, 0.48, 0.21], ['c', 0.12, 0.00, 0.18, 0.00, 0.30, -0.09], ['c', 0.42, -0.21, 1.29, -1.29, 1.56, -1.89], ['c', 0.03, -0.12, 1.23, -4.59, 1.23, -4.65], ['c', 0.00, -0.03, -0.18, 0.03, -0.39, 0.12], ['c', -0.63, 0.18, -1.20, 0.36, -1.74, 0.45], ['c', -0.39, 0.06, -0.54, 0.06, -1.02, 0.06], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42], ['c', 0.30, 0.33, 0.42, 0.60, 0.60, 1.38], ['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.90], ['c', 0.18, 0.18, 0.51, 0.27, 0.72, 0.15], ['c', 0.30, -0.12, 0.69, -0.57, 1.08, -1.17], ['c', 0.42, -0.60, 0.39, -0.51, 1.05, -3.03], ['c', 0.33, -1.26, 0.60, -2.31, 0.60, -2.34], ['c', 0.00, 0.00, -0.21, 0.03, -0.45, 0.12], ['c', -0.57, 0.18, -1.14, 0.33, -1.62, 0.42], ['c', -0.33, 0.06, -0.51, 0.06, -0.96, 0.06], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.90], ['z']], w: 11.373, h: 28.883 },
		'rests.64th': { d: [['M', 5.13, -13.62], ['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96], ['c', 0.18, 0.21, 0.54, 0.30, 0.75, 0.18], ['c', 0.24, -0.12, 0.63, -0.66, 1.08, -1.56], ['c', 0.33, -0.66, 0.39, -0.72, 0.60, -0.72], ['c', 0.12, 0.00, 0.27, 0.09, 0.33, 0.18], ['c', 0.03, 0.06, -0.69, 3.66, -3.54, 17.64], ['c', -1.95, 9.66, -3.57, 17.61, -3.57, 17.64], ['c', -0.03, 0.06, -0.12, 0.12, -0.24, 0.18], ['c', -0.21, 0.09, -0.24, 0.09, -0.48, 0.09], ['c', -0.24, 0.00, -0.30, 0.00, -0.48, -0.06], ['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15], ['c', -0.06, -0.03, 0.06, -0.57, 1.05, -4.95], ['c', 0.60, -2.70, 1.08, -4.89, 1.08, -4.92], ['c', 0.00, 0.00, -0.24, 0.06, -0.51, 0.15], ['c', -0.66, 0.24, -1.20, 0.36, -1.77, 0.48], ['c', -0.42, 0.06, -0.57, 0.06, -1.05, 0.06], ['c', -0.69, 0.00, -0.87, -0.03, -1.35, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.72, -1.05, 2.22, -1.23, 3.06, -0.42], ['c', 0.30, 0.33, 0.42, 0.60, 0.60, 1.38], ['c', 0.09, 0.45, 0.21, 0.78, 0.33, 0.90], ['c', 0.09, 0.09, 0.27, 0.18, 0.45, 0.21], ['c', 0.21, 0.03, 0.39, -0.09, 0.72, -0.42], ['c', 0.45, -0.45, 1.02, -1.26, 1.17, -1.65], ['c', 0.03, -0.09, 0.27, -1.14, 0.54, -2.34], ['c', 0.27, -1.20, 0.48, -2.19, 0.51, -2.22], ['c', 0.00, -0.03, -0.09, -0.03, -0.48, 0.12], ['c', -1.17, 0.39, -2.22, 0.57, -3.00, 0.54], ['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.30], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93], ['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72], ['c', 0.15, 0.39, 0.57, 0.57, 0.90, 0.42], ['c', 0.36, -0.18, 1.20, -1.26, 1.47, -1.89], ['c', 0.03, -0.09, 0.30, -1.20, 0.57, -2.43], ['l', 0.51, -2.28], ['l', -0.54, 0.18], ['c', -1.11, 0.36, -1.80, 0.48, -2.61, 0.48], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93], ['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96], ['c', 0.21, 0.21, 0.54, 0.30, 0.75, 0.18], ['c', 0.36, -0.18, 0.93, -0.93, 1.29, -1.68], ['c', 0.12, -0.24, 0.18, -0.48, 0.63, -2.55], ['l', 0.51, -2.31], ['c', 0.00, -0.03, -0.18, 0.03, -0.39, 0.12], ['c', -1.14, 0.36, -2.10, 0.54, -2.82, 0.51], ['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.30], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.90], ['z']], w: 12.453, h: 36.383 },
		'rests.128th': { d: [['M', 6.03, -21.12], ['c', 0.66, -0.09, 1.23, 0.09, 1.68, 0.51], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72], ['c', 0.12, 0.27, 0.33, 0.45, 0.60, 0.48], ['c', 0.21, 0.00, 0.33, -0.06, 0.54, -0.36], ['c', 0.15, -0.21, 0.54, -0.93, 0.78, -1.47], ['c', 0.15, -0.33, 0.18, -0.39, 0.30, -0.48], ['c', 0.18, -0.09, 0.45, 0.00, 0.51, 0.15], ['c', 0.03, 0.09, -7.11, 42.75, -7.17, 42.84], ['c', -0.03, 0.03, -0.15, 0.09, -0.24, 0.15], ['c', -0.18, 0.06, -0.24, 0.06, -0.45, 0.06], ['c', -0.24, 0.00, -0.30, 0.00, -0.48, -0.06], ['c', -0.09, -0.06, -0.21, -0.12, -0.21, -0.15], ['c', -0.06, -0.03, 0.03, -0.57, 0.84, -4.98], ['c', 0.51, -2.70, 0.93, -4.92, 0.90, -4.92], ['c', 0.00, 0.00, -0.15, 0.06, -0.36, 0.12], ['c', -0.78, 0.27, -1.62, 0.48, -2.31, 0.57], ['c', -0.15, 0.03, -0.54, 0.03, -0.81, 0.03], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93], ['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72], ['c', 0.12, 0.27, 0.33, 0.45, 0.63, 0.48], ['c', 0.12, 0.00, 0.18, 0.00, 0.30, -0.09], ['c', 0.42, -0.21, 1.14, -1.11, 1.50, -1.83], ['c', 0.12, -0.27, 0.12, -0.27, 0.54, -2.52], ['c', 0.24, -1.23, 0.42, -2.25, 0.39, -2.25], ['c', 0.00, 0.00, -0.24, 0.06, -0.51, 0.18], ['c', -1.26, 0.39, -2.25, 0.57, -3.06, 0.54], ['c', -0.42, -0.03, -0.75, -0.12, -1.11, -0.30], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93], ['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96], ['c', 0.18, 0.21, 0.51, 0.30, 0.75, 0.18], ['c', 0.36, -0.15, 1.05, -0.99, 1.41, -1.77], ['l', 0.15, -0.30], ['l', 0.42, -2.25], ['c', 0.21, -1.26, 0.42, -2.28, 0.39, -2.28], ['l', -0.51, 0.15], ['c', -1.11, 0.39, -1.89, 0.51, -2.70, 0.51], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93], ['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.15, 0.63, 0.21, 0.81, 0.33, 0.96], ['c', 0.18, 0.18, 0.48, 0.27, 0.72, 0.21], ['c', 0.33, -0.12, 1.14, -1.26, 1.41, -1.95], ['c', 0.00, -0.09, 0.21, -1.11, 0.45, -2.34], ['c', 0.21, -1.20, 0.39, -2.22, 0.39, -2.28], ['c', 0.03, -0.03, 0.00, -0.03, -0.45, 0.12], ['c', -0.57, 0.18, -1.20, 0.33, -1.71, 0.42], ['c', -0.30, 0.06, -0.51, 0.06, -0.93, 0.06], ['c', -0.66, 0.00, -0.84, -0.03, -1.32, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.36, -0.54, 0.96, -0.87, 1.65, -0.93], ['c', 0.54, -0.03, 1.02, 0.15, 1.41, 0.54], ['c', 0.27, 0.30, 0.39, 0.54, 0.57, 1.26], ['c', 0.09, 0.33, 0.18, 0.66, 0.21, 0.72], ['c', 0.12, 0.27, 0.33, 0.45, 0.60, 0.48], ['c', 0.18, 0.00, 0.36, -0.09, 0.57, -0.33], ['c', 0.33, -0.36, 0.78, -1.14, 0.93, -1.56], ['c', 0.03, -0.12, 0.24, -1.20, 0.45, -2.40], ['c', 0.24, -1.20, 0.42, -2.22, 0.42, -2.28], ['c', 0.03, -0.03, 0.00, -0.03, -0.39, 0.09], ['c', -1.05, 0.36, -1.80, 0.48, -2.58, 0.48], ['c', -0.63, 0.00, -0.84, -0.03, -1.29, -0.27], ['c', -1.32, -0.63, -1.77, -2.16, -1.02, -3.30], ['c', 0.33, -0.45, 0.84, -0.81, 1.38, -0.90], ['z']], w: 12.992, h: 43.883 },
		'accidentals.sharp': { d: [['M', 5.73, -11.19], ['c', 0.21, -0.12, 0.54, -0.03, 0.66, 0.24], ['c', 0.06, 0.12, 0.06, 0.21, 0.06, 2.31], ['c', 0.00, 1.23, 0.00, 2.22, 0.03, 2.22], ['c', 0.00, 0.00, 0.27, -0.12, 0.60, -0.24], ['c', 0.69, -0.27, 0.78, -0.30, 0.96, -0.15], ['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.38], ['c', 0.00, 1.02, 0.00, 1.11, -0.06, 1.20], ['c', -0.03, 0.06, -0.09, 0.12, -0.12, 0.15], ['c', -0.06, 0.03, -0.42, 0.21, -0.84, 0.36], ['l', -0.75, 0.33], ['l', -0.03, 2.43], ['c', 0.00, 1.32, 0.00, 2.43, 0.03, 2.43], ['c', 0.00, 0.00, 0.27, -0.12, 0.60, -0.24], ['c', 0.69, -0.27, 0.78, -0.30, 0.96, -0.15], ['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.38], ['c', 0.00, 1.02, 0.00, 1.11, -0.06, 1.20], ['c', -0.03, 0.06, -0.09, 0.12, -0.12, 0.15], ['c', -0.06, 0.03, -0.42, 0.21, -0.84, 0.36], ['l', -0.75, 0.33], ['l', -0.03, 2.52], ['c', 0.00, 2.28, -0.03, 2.55, -0.06, 2.64], ['c', -0.21, 0.36, -0.72, 0.36, -0.93, 0.00], ['c', -0.03, -0.09, -0.06, -0.33, -0.06, -2.43], ['l', 0.00, -2.31], ['l', -1.29, 0.51], ['l', -1.26, 0.51], ['l', 0.00, 2.43], ['c', 0.00, 2.58, 0.00, 2.52, -0.15, 2.67], ['c', -0.06, 0.09, -0.27, 0.18, -0.36, 0.18], ['c', -0.12, 0.00, -0.33, -0.09, -0.39, -0.18], ['c', -0.15, -0.15, -0.15, -0.09, -0.15, -2.43], ['c', 0.00, -1.23, 0.00, -2.22, -0.03, -2.22], ['c', 0.00, 0.00, -0.27, 0.12, -0.60, 0.24], ['c', -0.69, 0.27, -0.78, 0.30, -0.96, 0.15], ['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.38], ['c', 0.00, -1.02, 0.00, -1.11, 0.06, -1.20], ['c', 0.03, -0.06, 0.09, -0.12, 0.12, -0.15], ['c', 0.06, -0.03, 0.42, -0.21, 0.84, -0.36], ['l', 0.78, -0.33], ['l', 0.00, -2.43], ['c', 0.00, -1.32, 0.00, -2.43, -0.03, -2.43], ['c', 0.00, 0.00, -0.27, 0.12, -0.60, 0.24], ['c', -0.69, 0.27, -0.78, 0.30, -0.96, 0.15], ['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.38], ['c', 0.00, -1.02, 0.00, -1.11, 0.06, -1.20], ['c', 0.03, -0.06, 0.09, -0.12, 0.12, -0.15], ['c', 0.06, -0.03, 0.42, -0.21, 0.84, -0.36], ['l', 0.78, -0.33], ['l', 0.00, -2.52], ['c', 0.00, -2.28, 0.03, -2.55, 0.06, -2.64], ['c', 0.21, -0.36, 0.72, -0.36, 0.93, 0.00], ['c', 0.03, 0.09, 0.06, 0.33, 0.06, 2.43], ['l', 0.03, 2.31], ['l', 1.26, -0.51], ['l', 1.26, -0.51], ['l', 0.00, -2.43], ['c', 0.00, -2.28, 0.00, -2.43, 0.06, -2.55], ['c', 0.06, -0.12, 0.12, -0.18, 0.27, -0.24], ['z'], ['m', -0.33, 10.65], ['l', 0.00, -2.43], ['l', -1.29, 0.51], ['l', -1.26, 0.51], ['l', 0.00, 2.46], ['l', 0.00, 2.43], ['l', 0.09, -0.03], ['c', 0.06, -0.03, 0.63, -0.27, 1.29, -0.51], ['l', 1.17, -0.48], ['l', 0.00, -2.46], ['z']], w: 8.25, h: 22.462 },
		'accidentals.halfsharp': { d: [['M', 2.43, -10.05], ['c', 0.21, -0.12, 0.54, -0.03, 0.66, 0.24], ['c', 0.06, 0.12, 0.06, 0.21, 0.06, 2.01], ['c', 0.00, 1.05, 0.00, 1.89, 0.03, 1.89], ['l', 0.72, -0.48], ['c', 0.69, -0.48, 0.69, -0.51, 0.87, -0.51], ['c', 0.15, 0.00, 0.18, 0.03, 0.27, 0.09], ['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.41], ['c', 0.00, 1.11, -0.03, 1.14, -0.09, 1.23], ['c', -0.03, 0.03, -0.48, 0.39, -1.02, 0.75], ['l', -0.99, 0.66], ['l', 0.00, 2.37], ['c', 0.00, 1.32, 0.00, 2.37, 0.03, 2.37], ['l', 0.72, -0.48], ['c', 0.69, -0.48, 0.69, -0.51, 0.87, -0.51], ['c', 0.15, 0.00, 0.18, 0.03, 0.27, 0.09], ['c', 0.21, 0.15, 0.21, 0.18, 0.21, 1.41], ['c', 0.00, 1.11, -0.03, 1.14, -0.09, 1.23], ['c', -0.03, 0.03, -0.48, 0.39, -1.02, 0.75], ['l', -0.99, 0.66], ['l', 0.00, 2.25], ['c', 0.00, 1.95, 0.00, 2.28, -0.06, 2.37], ['c', -0.06, 0.12, -0.12, 0.21, -0.24, 0.27], ['c', -0.27, 0.12, -0.54, 0.03, -0.69, -0.24], ['c', -0.06, -0.12, -0.06, -0.21, -0.06, -2.01], ['c', 0.00, -1.05, 0.00, -1.89, -0.03, -1.89], ['l', -0.72, 0.48], ['c', -0.69, 0.48, -0.69, 0.48, -0.87, 0.48], ['c', -0.15, 0.00, -0.18, 0.00, -0.27, -0.06], ['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.41], ['c', 0.00, -1.11, 0.03, -1.14, 0.09, -1.23], ['c', 0.03, -0.03, 0.48, -0.39, 1.02, -0.75], ['l', 0.99, -0.66], ['l', 0.00, -2.37], ['c', 0.00, -1.32, 0.00, -2.37, -0.03, -2.37], ['l', -0.72, 0.48], ['c', -0.69, 0.48, -0.69, 0.48, -0.87, 0.48], ['c', -0.15, 0.00, -0.18, 0.00, -0.27, -0.06], ['c', -0.21, -0.15, -0.21, -0.18, -0.21, -1.41], ['c', 0.00, -1.11, 0.03, -1.14, 0.09, -1.23], ['c', 0.03, -0.03, 0.48, -0.39, 1.02, -0.75], ['l', 0.99, -0.66], ['l', 0.00, -2.25], ['c', 0.00, -2.13, 0.00, -2.28, 0.06, -2.40], ['c', 0.06, -0.12, 0.12, -0.18, 0.27, -0.24], ['z']], w: 5.25, h: 20.174 },
		'accidentals.nat': { d: [['M', 0.21, -11.40], ['c', 0.24, -0.06, 0.78, 0.00, 0.99, 0.15], ['c', 0.03, 0.03, 0.03, 0.48, 0.00, 2.61], ['c', -0.03, 1.44, -0.03, 2.61, -0.03, 2.61], ['c', 0.00, 0.03, 0.75, -0.09, 1.68, -0.24], ['c', 0.96, -0.18, 1.71, -0.27, 1.74, -0.27], ['c', 0.15, 0.03, 0.27, 0.15, 0.36, 0.30], ['l', 0.06, 0.12], ['l', 0.09, 8.67], ['c', 0.09, 6.96, 0.12, 8.67, 0.09, 8.67], ['c', -0.03, 0.03, -0.12, 0.06, -0.21, 0.09], ['c', -0.24, 0.09, -0.72, 0.09, -0.96, 0.00], ['c', -0.09, -0.03, -0.18, -0.06, -0.21, -0.09], ['c', -0.03, -0.03, -0.03, -0.48, 0.00, -2.61], ['c', 0.03, -1.44, 0.03, -2.61, 0.03, -2.61], ['c', 0.00, -0.03, -0.75, 0.09, -1.68, 0.24], ['c', -0.96, 0.18, -1.71, 0.27, -1.74, 0.27], ['c', -0.15, -0.03, -0.27, -0.15, -0.36, -0.30], ['l', -0.06, -0.15], ['l', -0.09, -7.53], ['c', -0.06, -4.14, -0.09, -8.04, -0.12, -8.67], ['l', 0.00, -1.11], ['l', 0.15, -0.06], ['c', 0.09, -0.03, 0.21, -0.06, 0.27, -0.09], ['z'], ['m', 3.75, 8.40], ['c', 0.00, -0.33, 0.00, -0.42, -0.03, -0.42], ['c', -0.12, 0.00, -2.79, 0.45, -2.79, 0.48], ['c', -0.03, 0.00, -0.09, 6.30, -0.09, 6.33], ['c', 0.03, 0.00, 2.79, -0.45, 2.82, -0.48], ['c', 0.00, 0.00, 0.09, -4.53, 0.09, -5.91], ['z']], w: 5.4, h: 22.8 },
		'accidentals.flat': { d: [['M', -0.36, -14.07], ['c', 0.33, -0.06, 0.87, 0.00, 1.08, 0.15], ['c', 0.06, 0.03, 0.06, 0.36, -0.03, 5.25], ['c', -0.06, 2.85, -0.09, 5.19, -0.09, 5.19], ['c', 0.00, 0.03, 0.12, -0.03, 0.24, -0.12], ['c', 0.63, -0.42, 1.41, -0.66, 2.19, -0.72], ['c', 0.81, -0.03, 1.47, 0.21, 2.04, 0.78], ['c', 0.57, 0.54, 0.87, 1.26, 0.93, 2.04], ['c', 0.03, 0.57, -0.09, 1.08, -0.36, 1.62], ['c', -0.42, 0.81, -1.02, 1.38, -2.82, 2.61], ['c', -1.14, 0.78, -1.44, 1.02, -1.80, 1.44], ['c', -0.18, 0.18, -0.39, 0.39, -0.45, 0.42], ['c', -0.27, 0.18, -0.57, 0.15, -0.81, -0.06], ['c', -0.06, -0.09, -0.12, -0.18, -0.15, -0.27], ['c', -0.03, -0.06, -0.09, -3.27, -0.18, -8.34], ['c', -0.09, -4.53, -0.15, -8.58, -0.18, -9.03], ['l', 0.00, -0.78], ['l', 0.12, -0.06], ['c', 0.06, -0.03, 0.18, -0.09, 0.27, -0.12], ['z'], ['m', 3.18, 11.01], ['c', -0.21, -0.12, -0.54, -0.15, -0.81, -0.06], ['c', -0.54, 0.15, -0.99, 0.63, -1.17, 1.26], ['c', -0.06, 0.30, -0.12, 2.88, -0.06, 3.87], ['c', 0.03, 0.42, 0.03, 0.81, 0.06, 0.90], ['l', 0.03, 0.12], ['l', 0.45, -0.39], ['c', 0.63, -0.54, 1.26, -1.17, 1.56, -1.59], ['c', 0.30, -0.42, 0.60, -0.99, 0.72, -1.41], ['c', 0.18, -0.69, 0.09, -1.47, -0.18, -2.07], ['c', -0.15, -0.30, -0.33, -0.51, -0.60, -0.63], ['z']], w: 6.75, h: 18.801 },
		'accidentals.halfflat': { d: [['M', 4.83, -14.07], ['c', 0.33, -0.06, 0.87, 0.00, 1.08, 0.15], ['c', 0.06, 0.03, 0.06, 0.60, -0.12, 9.06], ['c', -0.09, 5.55, -0.15, 9.06, -0.18, 9.12], ['c', -0.03, 0.09, -0.09, 0.18, -0.15, 0.27], ['c', -0.24, 0.21, -0.54, 0.24, -0.81, 0.06], ['c', -0.06, -0.03, -0.27, -0.24, -0.45, -0.42], ['c', -0.36, -0.42, -0.66, -0.66, -1.80, -1.44], ['c', -1.23, -0.84, -1.83, -1.32, -2.25, -1.77], ['c', -0.66, -0.78, -0.96, -1.56, -0.93, -2.46], ['c', 0.09, -1.41, 1.11, -2.58, 2.40, -2.79], ['c', 0.30, -0.06, 0.84, -0.03, 1.23, 0.06], ['c', 0.54, 0.12, 1.08, 0.33, 1.53, 0.63], ['c', 0.12, 0.09, 0.24, 0.15, 0.24, 0.12], ['c', 0.00, 0.00, -0.12, -8.37, -0.18, -9.75], ['l', 0.00, -0.66], ['l', 0.12, -0.06], ['c', 0.06, -0.03, 0.18, -0.09, 0.27, -0.12], ['z'], ['m', -1.65, 10.95], ['c', -0.60, -0.18, -1.08, 0.09, -1.38, 0.69], ['c', -0.27, 0.60, -0.36, 1.38, -0.18, 2.07], ['c', 0.12, 0.42, 0.42, 0.99, 0.72, 1.41], ['c', 0.30, 0.42, 0.93, 1.05, 1.56, 1.59], ['l', 0.48, 0.39], ['l', 0.00, -0.12], ['c', 0.03, -0.09, 0.03, -0.48, 0.06, -0.90], ['c', 0.03, -0.57, 0.03, -1.08, 0.00, -2.22], ['c', -0.03, -1.62, -0.03, -1.62, -0.24, -2.07], ['c', -0.21, -0.42, -0.60, -0.75, -1.02, -0.84], ['z']], w: 6.728, h: 18.801 },
		'accidentals.dblflat': { d: [['M', -0.36, -14.07], ['c', 0.33, -0.06, 0.87, 0.00, 1.08, 0.15], ['c', 0.06, 0.03, 0.06, 0.33, -0.03, 4.89], ['c', -0.06, 2.67, -0.09, 5.01, -0.09, 5.22], ['l', 0.00, 0.36], ['l', 0.15, -0.15], ['c', 0.36, -0.30, 0.75, -0.51, 1.20, -0.63], ['c', 0.33, -0.09, 0.96, -0.09, 1.26, -0.03], ['c', 0.27, 0.09, 0.63, 0.27, 0.87, 0.45], ['l', 0.21, 0.15], ['l', 0.00, -0.27], ['c', 0.00, -0.15, -0.03, -2.43, -0.09, -5.10], ['c', -0.09, -4.56, -0.09, -4.86, -0.03, -4.89], ['c', 0.15, -0.12, 0.39, -0.15, 0.72, -0.15], ['c', 0.30, 0.00, 0.54, 0.03, 0.69, 0.15], ['c', 0.06, 0.03, 0.06, 0.33, -0.03, 4.95], ['c', -0.06, 2.70, -0.09, 5.04, -0.09, 5.22], ['l', 0.03, 0.30], ['l', 0.21, -0.15], ['c', 0.69, -0.48, 1.44, -0.69, 2.28, -0.69], ['c', 0.51, 0.00, 0.78, 0.03, 1.20, 0.21], ['c', 1.32, 0.63, 2.01, 2.28, 1.53, 3.69], ['c', -0.21, 0.57, -0.51, 1.02, -1.05, 1.56], ['c', -0.42, 0.42, -0.81, 0.72, -1.92, 1.50], ['c', -1.26, 0.87, -1.50, 1.08, -1.86, 1.50], ['c', -0.39, 0.45, -0.54, 0.54, -0.81, 0.51], ['c', -0.18, 0.00, -0.21, 0.00, -0.33, -0.06], ['l', -0.21, -0.21], ['l', -0.06, -0.12], ['l', -0.03, -0.99], ['c', -0.03, -0.54, -0.03, -1.29, -0.06, -1.68], ['l', 0.00, -0.69], ['l', -0.21, 0.24], ['c', -0.36, 0.42, -0.75, 0.75, -1.80, 1.62], ['c', -1.02, 0.84, -1.20, 0.99, -1.44, 1.38], ['c', -0.36, 0.51, -0.54, 0.60, -0.90, 0.51], ['c', -0.15, -0.03, -0.39, -0.27, -0.42, -0.42], ['c', -0.03, -0.06, -0.09, -3.27, -0.18, -8.34], ['c', -0.09, -4.53, -0.15, -8.58, -0.18, -9.03], ['l', 0.00, -0.78], ['l', 0.12, -0.06], ['c', 0.06, -0.03, 0.18, -0.09, 0.27, -0.12], ['z'], ['m', 2.52, 10.98], ['c', -0.18, -0.09, -0.48, -0.12, -0.66, -0.06], ['c', -0.39, 0.15, -0.69, 0.54, -0.84, 1.14], ['c', -0.06, 0.24, -0.06, 0.39, -0.09, 1.74], ['c', -0.03, 1.44, 0.00, 2.73, 0.06, 3.18], ['l', 0.03, 0.15], ['l', 0.27, -0.27], ['c', 0.93, -0.96, 1.50, -1.95, 1.74, -3.06], ['c', 0.06, -0.27, 0.06, -0.39, 0.06, -0.96], ['c', 0.00, -0.54, 0.00, -0.69, -0.06, -0.93], ['c', -0.09, -0.51, -0.27, -0.81, -0.51, -0.93], ['z'], ['m', 5.43, 0.00], ['c', -0.18, -0.09, -0.51, -0.12, -0.72, -0.06], ['c', -0.54, 0.12, -0.96, 0.63, -1.17, 1.26], ['c', -0.06, 0.30, -0.12, 2.88, -0.06, 3.90], ['c', 0.03, 0.42, 0.03, 0.81, 0.06, 0.90], ['l', 0.03, 0.12], ['l', 0.36, -0.30], ['c', 0.42, -0.36, 1.02, -0.96, 1.29, -1.29], ['c', 0.36, -0.45, 0.66, -0.99, 0.81, -1.41], ['c', 0.42, -1.23, 0.15, -2.76, -0.60, -3.12], ['z']], w: 11.613, h: 18.804 },
		'accidentals.dblsharp': { d: [['M', -0.18, -3.96], ['c', 0.06, -0.03, 0.12, -0.06, 0.15, -0.06], ['c', 0.09, 0.00, 2.76, 0.27, 2.79, 0.30], ['c', 0.12, 0.03, 0.15, 0.12, 0.15, 0.51], ['c', 0.06, 0.96, 0.24, 1.59, 0.57, 2.10], ['c', 0.06, 0.09, 0.15, 0.21, 0.18, 0.24], ['l', 0.09, 0.06], ['l', 0.09, -0.06], ['c', 0.03, -0.03, 0.12, -0.15, 0.18, -0.24], ['c', 0.33, -0.51, 0.51, -1.14, 0.57, -2.10], ['c', 0.00, -0.39, 0.03, -0.45, 0.12, -0.51], ['c', 0.03, 0.00, 0.66, -0.09, 1.44, -0.15], ['c', 1.47, -0.15, 1.50, -0.15, 1.56, -0.03], ['c', 0.03, 0.06, 0.00, 0.42, -0.09, 1.44], ['c', -0.09, 0.72, -0.15, 1.35, -0.15, 1.38], ['c', 0.00, 0.03, -0.03, 0.09, -0.06, 0.12], ['c', -0.06, 0.06, -0.12, 0.09, -0.51, 0.09], ['c', -1.08, 0.06, -1.80, 0.30, -2.28, 0.75], ['l', -0.12, 0.09], ['l', 0.09, 0.09], ['c', 0.12, 0.15, 0.39, 0.33, 0.63, 0.45], ['c', 0.42, 0.18, 0.96, 0.27, 1.68, 0.33], ['c', 0.39, 0.00, 0.45, 0.03, 0.51, 0.09], ['c', 0.03, 0.03, 0.06, 0.09, 0.06, 0.12], ['c', 0.00, 0.03, 0.06, 0.66, 0.15, 1.38], ['c', 0.09, 1.02, 0.12, 1.38, 0.09, 1.44], ['c', -0.06, 0.12, -0.09, 0.12, -1.56, -0.03], ['c', -0.78, -0.06, -1.41, -0.15, -1.44, -0.15], ['c', -0.09, -0.06, -0.12, -0.12, -0.12, -0.54], ['c', -0.06, -0.93, -0.24, -1.56, -0.57, -2.07], ['c', -0.06, -0.09, -0.15, -0.21, -0.18, -0.24], ['l', -0.09, -0.06], ['l', -0.09, 0.06], ['c', -0.03, 0.03, -0.12, 0.15, -0.18, 0.24], ['c', -0.33, 0.51, -0.51, 1.14, -0.57, 2.07], ['c', 0.00, 0.42, -0.03, 0.48, -0.12, 0.54], ['c', -0.03, 0.00, -0.66, 0.09, -1.44, 0.15], ['c', -1.47, 0.15, -1.50, 0.15, -1.56, 0.03], ['c', -0.03, -0.06, 0.00, -0.42, 0.09, -1.44], ['c', 0.09, -0.72, 0.15, -1.35, 0.15, -1.38], ['c', 0.00, -0.03, 0.03, -0.09, 0.06, -0.12], ['c', 0.06, -0.06, 0.12, -0.09, 0.51, -0.09], ['c', 0.72, -0.06, 1.26, -0.15, 1.68, -0.33], ['c', 0.24, -0.12, 0.51, -0.30, 0.63, -0.45], ['l', 0.09, -0.09], ['l', -0.12, -0.09], ['c', -0.48, -0.45, -1.20, -0.69, -2.28, -0.75], ['c', -0.39, 0.00, -0.45, -0.03, -0.51, -0.09], ['c', -0.03, -0.03, -0.06, -0.09, -0.06, -0.12], ['c', 0.00, -0.03, -0.06, -0.63, -0.12, -1.38], ['c', -0.09, -0.72, -0.15, -1.35, -0.15, -1.38], ['z']], w: 7.95, h: 7.977 },
		'dots.dot': { d: [['M', 1.32, -1.68], ['c', 0.09, -0.03, 0.27, -0.06, 0.39, -0.06], ['c', 0.96, 0.00, 1.74, 0.78, 1.74, 1.71], ['c', 0.00, 0.96, -0.78, 1.74, -1.71, 1.74], ['c', -0.96, 0.00, -1.74, -0.78, -1.74, -1.71], ['c', 0.00, -0.78, 0.54, -1.50, 1.32, -1.68], ['z']], w: 3.45, h: 3.45 },
		'noteheads.dbl': { d: [['M', -0.69, -4.02], ['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0.00], ['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.30], ['c', 0.06, 0.15, 0.06, 0.18, 0.06, 1.41], ['l', 0.00, 1.23], ['l', 0.12, -0.18], ['c', 0.72, -1.26, 2.64, -2.31, 4.86, -2.64], ['c', 0.81, -0.15, 1.11, -0.15, 2.13, -0.15], ['c', 0.99, 0.00, 1.29, 0.00, 2.10, 0.15], ['c', 0.75, 0.12, 1.38, 0.27, 2.04, 0.54], ['c', 1.35, 0.51, 2.34, 1.26, 2.82, 2.10], ['l', 0.12, 0.18], ['l', 0.00, -1.23], ['c', 0.00, -1.20, 0.00, -1.26, 0.06, -1.38], ['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33], ['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0.00], ['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.30], ['l', 0.06, 0.15], ['l', 0.00, 3.54], ['l', 0.00, 3.54], ['l', -0.06, 0.15], ['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33], ['c', -0.18, 0.09, -0.36, 0.09, -0.54, 0.00], ['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33], ['c', -0.06, -0.12, -0.06, -0.18, -0.06, -1.38], ['l', 0.00, -1.23], ['l', -0.12, 0.18], ['c', -0.48, 0.84, -1.47, 1.59, -2.82, 2.10], ['c', -0.84, 0.33, -1.71, 0.54, -2.85, 0.66], ['c', -0.45, 0.06, -2.16, 0.06, -2.61, 0.00], ['c', -1.14, -0.12, -2.01, -0.33, -2.85, -0.66], ['c', -1.35, -0.51, -2.34, -1.26, -2.82, -2.10], ['l', -0.12, -0.18], ['l', 0.00, 1.23], ['c', 0.00, 1.23, 0.00, 1.26, -0.06, 1.38], ['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33], ['c', -0.18, 0.09, -0.36, 0.09, -0.54, 0.00], ['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33], ['l', -0.06, -0.15], ['l', 0.00, -3.54], ['c', 0.00, -3.48, 0.00, -3.54, 0.06, -3.66], ['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33], ['z'], ['m', 7.71, 0.63], ['c', -0.36, -0.06, -0.90, -0.06, -1.14, 0.00], ['c', -0.30, 0.03, -0.66, 0.24, -0.87, 0.42], ['c', -0.60, 0.54, -0.90, 1.62, -0.75, 2.82], ['c', 0.12, 0.93, 0.51, 1.68, 1.11, 2.31], ['c', 0.75, 0.72, 1.83, 1.20, 2.85, 1.26], ['c', 1.05, 0.06, 1.83, -0.54, 2.10, -1.65], ['c', 0.21, -0.90, 0.12, -1.95, -0.24, -2.82], ['c', -0.36, -0.81, -1.08, -1.53, -1.95, -1.95], ['c', -0.30, -0.15, -0.78, -0.30, -1.11, -0.39], ['z']], w: 16.83, h: 8.145 },
		'noteheads.whole': { d: [['M', 6.51, -4.05], ['c', 0.51, -0.03, 2.01, 0.00, 2.52, 0.03], ['c', 1.41, 0.18, 2.64, 0.51, 3.72, 1.08], ['c', 1.20, 0.63, 1.95, 1.41, 2.19, 2.31], ['c', 0.09, 0.33, 0.09, 0.90, 0.00, 1.23], ['c', -0.24, 0.90, -0.99, 1.68, -2.19, 2.31], ['c', -1.08, 0.57, -2.28, 0.90, -3.75, 1.08], ['c', -0.66, 0.06, -2.31, 0.06, -2.97, 0.00], ['c', -1.47, -0.18, -2.67, -0.51, -3.75, -1.08], ['c', -1.20, -0.63, -1.95, -1.41, -2.19, -2.31], ['c', -0.09, -0.33, -0.09, -0.90, 0.00, -1.23], ['c', 0.24, -0.90, 0.99, -1.68, 2.19, -2.31], ['c', 1.20, -0.63, 2.61, -0.99, 4.23, -1.11], ['z'], ['m', 0.57, 0.66], ['c', -0.87, -0.15, -1.53, 0.00, -2.04, 0.51], ['c', -0.15, 0.15, -0.24, 0.27, -0.33, 0.48], ['c', -0.24, 0.51, -0.36, 1.08, -0.33, 1.77], ['c', 0.03, 0.69, 0.18, 1.26, 0.42, 1.77], ['c', 0.60, 1.17, 1.74, 1.98, 3.18, 2.22], ['c', 1.11, 0.21, 1.95, -0.15, 2.34, -0.99], ['c', 0.24, -0.51, 0.36, -1.08, 0.33, -1.80], ['c', -0.06, -1.11, -0.45, -2.04, -1.17, -2.76], ['c', -0.63, -0.63, -1.47, -1.05, -2.40, -1.20], ['z']], w: 14.985, h: 8.097 },
		'noteheads.half': { d: [['M', 7.44, -4.05], ['c', 0.06, -0.03, 0.27, -0.03, 0.48, -0.03], ['c', 1.05, 0.00, 1.71, 0.24, 2.10, 0.81], ['c', 0.42, 0.60, 0.45, 1.35, 0.18, 2.40], ['c', -0.42, 1.59, -1.14, 2.73, -2.16, 3.39], ['c', -1.41, 0.93, -3.18, 1.44, -5.40, 1.53], ['c', -1.17, 0.03, -1.89, -0.21, -2.28, -0.81], ['c', -0.42, -0.60, -0.45, -1.35, -0.18, -2.40], ['c', 0.42, -1.59, 1.14, -2.73, 2.16, -3.39], ['c', 0.63, -0.42, 1.23, -0.72, 1.98, -0.96], ['c', 0.90, -0.30, 1.65, -0.42, 3.12, -0.54], ['z'], ['m', 1.29, 0.87], ['c', -0.27, -0.09, -0.63, -0.12, -0.90, -0.03], ['c', -0.72, 0.24, -1.53, 0.69, -3.27, 1.80], ['c', -2.34, 1.50, -3.30, 2.25, -3.57, 2.79], ['c', -0.36, 0.72, -0.06, 1.50, 0.66, 1.77], ['c', 0.24, 0.12, 0.69, 0.09, 0.99, 0.00], ['c', 0.84, -0.30, 1.92, -0.93, 4.14, -2.37], ['c', 1.62, -1.08, 2.37, -1.71, 2.61, -2.19], ['c', 0.36, -0.72, 0.06, -1.50, -0.66, -1.77], ['z']], w: 10.37, h: 8.132 },
		'noteheads.quarter': { d: [['M', 6.09, -4.05], ['c', 0.36, -0.03, 1.20, 0.00, 1.53, 0.06], ['c', 1.17, 0.24, 1.89, 0.84, 2.16, 1.83], ['c', 0.06, 0.18, 0.06, 0.30, 0.06, 0.66], ['c', 0.00, 0.45, 0.00, 0.63, -0.15, 1.08], ['c', -0.66, 2.04, -3.06, 3.93, -5.52, 4.38], ['c', -0.54, 0.09, -1.44, 0.09, -1.83, 0.03], ['c', -1.23, -0.27, -1.98, -0.87, -2.25, -1.86], ['c', -0.06, -0.18, -0.06, -0.30, -0.06, -0.66], ['c', 0.00, -0.45, 0.00, -0.63, 0.15, -1.08], ['c', 0.24, -0.78, 0.75, -1.53, 1.44, -2.22], ['c', 1.20, -1.20, 2.85, -2.01, 4.47, -2.22], ['z']], w: 9.81, h: 8.094 },
		'noteheads.slash.nostem': { d: [['M', 9.30, -7.77], ['c', 0.06, -0.06, 0.18, -0.06, 1.71, -0.06], ['l', 1.65, 0.00], ['l', 0.09, 0.09], ['c', 0.06, 0.06, 0.06, 0.09, 0.06, 0.15], ['c', -0.03, 0.12, -9.21, 15.24, -9.30, 15.33], ['c', -0.06, 0.06, -0.18, 0.06, -1.71, 0.06], ['l', -1.65, 0.00], ['l', -0.09, -0.09], ['c', -0.06, -0.06, -0.06, -0.09, -0.06, -0.15], ['c', 0.03, -0.12, 9.21, -15.24, 9.30, -15.33], ['z']], w: 12.81, h: 15.63 },
		'noteheads.indeterminate': { d: [['M', 0.78, -4.05], ['c', 0.12, -0.03, 0.24, -0.03, 0.36, 0.03], ['c', 0.03, 0.03, 0.93, 0.72, 1.95, 1.56], ['l', 1.86, 1.50], ['l', 1.86, -1.50], ['c', 1.02, -0.84, 1.92, -1.53, 1.95, -1.56], ['c', 0.21, -0.12, 0.33, -0.09, 0.75, 0.24], ['c', 0.30, 0.27, 0.36, 0.36, 0.36, 0.54], ['c', 0.00, 0.03, -0.03, 0.12, -0.06, 0.18], ['c', -0.03, 0.06, -0.90, 0.75, -1.89, 1.56], ['l', -1.80, 1.47], ['c', 0.00, 0.03, 0.81, 0.69, 1.80, 1.50], ['c', 0.99, 0.81, 1.86, 1.50, 1.89, 1.56], ['c', 0.03, 0.06, 0.06, 0.15, 0.06, 0.18], ['c', 0.00, 0.18, -0.06, 0.27, -0.36, 0.54], ['c', -0.42, 0.33, -0.54, 0.36, -0.75, 0.24], ['c', -0.03, -0.03, -0.93, -0.72, -1.95, -1.56], ['l', -1.86, -1.50], ['l', -1.86, 1.50], ['c', -1.02, 0.84, -1.92, 1.53, -1.95, 1.56], ['c', -0.21, 0.12, -0.33, 0.09, -0.75, -0.24], ['c', -0.30, -0.27, -0.36, -0.36, -0.36, -0.54], ['c', 0.00, -0.03, 0.03, -0.12, 0.06, -0.18], ['c', 0.03, -0.06, 0.90, -0.75, 1.89, -1.56], ['l', 1.80, -1.47], ['c', 0.00, -0.03, -0.81, -0.69, -1.80, -1.50], ['c', -0.99, -0.81, -1.86, -1.50, -1.89, -1.56], ['c', -0.06, -0.12, -0.09, -0.21, -0.03, -0.36], ['c', 0.03, -0.09, 0.57, -0.57, 0.72, -0.63], ['z']], w: 9.843, h: 8.139 },
		'scripts.ufermata': { d: [['M', -0.75, -10.77], ['c', 0.12, 0.00, 0.45, -0.03, 0.69, -0.03], ['c', 2.91, -0.03, 5.55, 1.53, 7.41, 4.35], ['c', 1.17, 1.71, 1.95, 3.72, 2.43, 6.03], ['c', 0.12, 0.51, 0.12, 0.57, 0.03, 0.69], ['c', -0.12, 0.21, -0.48, 0.27, -0.69, 0.12], ['c', -0.12, -0.09, -0.18, -0.24, -0.27, -0.69], ['c', -0.78, -3.63, -3.42, -6.54, -6.78, -7.38], ['c', -0.78, -0.21, -1.20, -0.24, -2.07, -0.24], ['c', -0.63, 0.00, -0.84, 0.00, -1.20, 0.06], ['c', -1.83, 0.27, -3.42, 1.08, -4.80, 2.37], ['c', -1.41, 1.35, -2.40, 3.21, -2.85, 5.19], ['c', -0.09, 0.45, -0.15, 0.60, -0.27, 0.69], ['c', -0.21, 0.15, -0.57, 0.09, -0.69, -0.12], ['c', -0.09, -0.12, -0.09, -0.18, 0.03, -0.69], ['c', 0.33, -1.62, 0.78, -3.00, 1.47, -4.38], ['c', 1.77, -3.54, 4.44, -5.67, 7.56, -5.97], ['z'], ['m', 0.33, 7.47], ['c', 1.38, -0.30, 2.58, 0.90, 2.31, 2.25], ['c', -0.15, 0.72, -0.78, 1.35, -1.47, 1.50], ['c', -1.38, 0.27, -2.58, -0.93, -2.31, -2.31], ['c', 0.15, -0.69, 0.78, -1.29, 1.47, -1.44], ['z']], w: 19.748, h: 11.289 },
		'scripts.dfermata': { d: [['M', -9.63, -0.42], ['c', 0.15, -0.09, 0.36, -0.06, 0.51, 0.03], ['c', 0.12, 0.09, 0.18, 0.24, 0.27, 0.66], ['c', 0.78, 3.66, 3.42, 6.57, 6.78, 7.41], ['c', 0.78, 0.21, 1.20, 0.24, 2.07, 0.24], ['c', 0.63, 0.00, 0.84, 0.00, 1.20, -0.06], ['c', 1.83, -0.27, 3.42, -1.08, 4.80, -2.37], ['c', 1.41, -1.35, 2.40, -3.21, 2.85, -5.22], ['c', 0.09, -0.42, 0.15, -0.57, 0.27, -0.66], ['c', 0.21, -0.15, 0.57, -0.09, 0.69, 0.12], ['c', 0.09, 0.12, 0.09, 0.18, -0.03, 0.69], ['c', -0.33, 1.62, -0.78, 3.00, -1.47, 4.38], ['c', -1.92, 3.84, -4.89, 6.00, -8.31, 6.00], ['c', -3.42, 0.00, -6.39, -2.16, -8.31, -6.00], ['c', -0.48, -0.96, -0.84, -1.92, -1.14, -2.97], ['c', -0.18, -0.69, -0.42, -1.74, -0.42, -1.92], ['c', 0.00, -0.12, 0.09, -0.27, 0.24, -0.33], ['z'], ['m', 9.21, 0.00], ['c', 1.20, -0.27, 2.34, 0.63, 2.34, 1.86], ['c', 0.00, 0.90, -0.66, 1.68, -1.50, 1.89], ['c', -1.38, 0.27, -2.58, -0.93, -2.31, -2.31], ['c', 0.15, -0.69, 0.78, -1.29, 1.47, -1.44], ['z']], w: 19.744, h: 11.274 },
		'scripts.sforzato': { d: [['M', -6.45, -3.69], ['c', 0.06, -0.03, 0.15, -0.06, 0.18, -0.06], ['c', 0.06, 0.00, 2.85, 0.72, 6.24, 1.59], ['l', 6.33, 1.65], ['c', 0.33, 0.06, 0.45, 0.21, 0.45, 0.51], ['c', 0.00, 0.30, -0.12, 0.45, -0.45, 0.51], ['l', -6.33, 1.65], ['c', -3.39, 0.87, -6.18, 1.59, -6.21, 1.59], ['c', -0.21, 0.00, -0.48, -0.24, -0.51, -0.45], ['c', 0.00, -0.15, 0.06, -0.36, 0.18, -0.45], ['c', 0.09, -0.06, 0.87, -0.27, 3.84, -1.05], ['c', 2.04, -0.54, 3.84, -0.99, 4.02, -1.02], ['c', 0.15, -0.06, 1.14, -0.24, 2.22, -0.42], ['c', 1.05, -0.18, 1.92, -0.36, 1.92, -0.36], ['c', 0.00, 0.00, -0.87, -0.18, -1.92, -0.36], ['c', -1.08, -0.18, -2.07, -0.36, -2.22, -0.42], ['c', -0.18, -0.03, -1.98, -0.48, -4.02, -1.02], ['c', -2.97, -0.78, -3.75, -0.99, -3.84, -1.05], ['c', -0.12, -0.09, -0.18, -0.30, -0.18, -0.45], ['c', 0.03, -0.15, 0.15, -0.30, 0.30, -0.39], ['z']], w: 13.5, h: 7.5 },
		'scripts.staccato': { d: [['M', -0.36, -1.47], ['c', 0.93, -0.21, 1.86, 0.51, 1.86, 1.47], ['c', 0.00, 0.93, -0.87, 1.65, -1.80, 1.47], ['c', -0.54, -0.12, -1.02, -0.57, -1.14, -1.08], ['c', -0.21, -0.81, 0.27, -1.65, 1.08, -1.86], ['z']], w: 2.989, h: 3.004 },
		'scripts.tenuto': { d: [['M', -4.20, -0.48], ['l', 0.12, -0.06], ['l', 4.08, 0.00], ['l', 4.08, 0.00], ['l', 0.12, 0.06], ['c', 0.39, 0.21, 0.39, 0.75, 0.00, 0.96], ['l', -0.12, 0.06], ['l', -4.08, 0.00], ['l', -4.08, 0.00], ['l', -0.12, -0.06], ['c', -0.39, -0.21, -0.39, -0.75, 0.00, -0.96], ['z']], w: 8.985, h: 1.08 },
		'scripts.umarcato': { d: [['M', -0.15, -8.19], ['c', 0.15, -0.12, 0.36, -0.03, 0.45, 0.15], ['c', 0.21, 0.42, 3.45, 7.65, 3.45, 7.71], ['c', 0.00, 0.12, -0.12, 0.27, -0.21, 0.30], ['c', -0.03, 0.03, -0.51, 0.03, -1.14, 0.03], ['c', -1.05, 0.00, -1.08, 0.00, -1.17, -0.06], ['c', -0.09, -0.06, -0.24, -0.36, -1.17, -2.40], ['c', -0.57, -1.29, -1.05, -2.34, -1.08, -2.34], ['c', 0.00, -0.03, -0.51, 1.02, -1.08, 2.34], ['c', -0.93, 2.07, -1.08, 2.34, -1.14, 2.40], ['c', -0.06, 0.03, -0.15, 0.06, -0.18, 0.06], ['c', -0.15, 0.00, -0.33, -0.18, -0.33, -0.33], ['c', 0.00, -0.06, 3.24, -7.32, 3.45, -7.71], ['c', 0.03, -0.06, 0.09, -0.15, 0.15, -0.15], ['z']], w: 7.5, h: 8.245 },
		'scripts.dmarcato': { d: [['M', -3.57, 0.03], ['c', 0.03, 0.00, 0.57, -0.03, 1.17, -0.03], ['c', 1.05, 0.00, 1.08, 0.00, 1.17, 0.06], ['c', 0.09, 0.06, 0.24, 0.36, 1.17, 2.40], ['c', 0.57, 1.29, 1.05, 2.34, 1.08, 2.34], ['c', 0.00, 0.03, 0.51, -1.02, 1.08, -2.34], ['c', 0.93, -2.07, 1.08, -2.34, 1.14, -2.40], ['c', 0.06, -0.03, 0.15, -0.06, 0.18, -0.06], ['c', 0.15, 0.00, 0.33, 0.18, 0.33, 0.33], ['c', 0.00, 0.09, -3.45, 7.74, -3.54, 7.83], ['c', -0.12, 0.12, -0.30, 0.12, -0.42, 0.00], ['c', -0.09, -0.09, -3.54, -7.74, -3.54, -7.83], ['c', 0.00, -0.09, 0.12, -0.27, 0.18, -0.30], ['z']], w: 7.5, h: 8.25 },
		'scripts.stopped': { d: [['M', -0.27, -4.08], ['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0.00], ['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.30], ['l', 0.06, 0.15], ['l', 0.00, 1.50], ['l', 0.00, 1.47], ['l', 1.47, 0.00], ['l', 1.50, 0.00], ['l', 0.15, 0.06], ['c', 0.15, 0.09, 0.21, 0.15, 0.30, 0.33], ['c', 0.09, 0.18, 0.09, 0.36, 0.00, 0.54], ['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33], ['c', -0.12, 0.06, -0.18, 0.06, -1.62, 0.06], ['l', -1.47, 0.00], ['l', 0.00, 1.47], ['l', 0.00, 1.47], ['l', -0.06, 0.15], ['c', -0.09, 0.18, -0.15, 0.24, -0.33, 0.33], ['c', -0.18, 0.09, -0.36, 0.09, -0.54, 0.00], ['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33], ['l', -0.06, -0.15], ['l', 0.00, -1.47], ['l', 0.00, -1.47], ['l', -1.47, 0.00], ['c', -1.44, 0.00, -1.50, 0.00, -1.62, -0.06], ['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33], ['c', -0.09, -0.18, -0.09, -0.36, 0.00, -0.54], ['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33], ['l', 0.15, -0.06], ['l', 1.47, 0.00], ['l', 1.47, 0.00], ['l', 0.00, -1.47], ['c', 0.00, -1.44, 0.00, -1.50, 0.06, -1.62], ['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33], ['z']], w: 8.295, h: 8.295 },
		'scripts.upbow': { d: [['M', -4.65, -15.54], ['c', 0.12, -0.09, 0.36, -0.06, 0.48, 0.03], ['c', 0.03, 0.03, 0.09, 0.09, 0.12, 0.15], ['c', 0.03, 0.06, 0.66, 2.13, 1.41, 4.62], ['c', 1.35, 4.41, 1.38, 4.56, 2.01, 6.96], ['l', 0.63, 2.46], ['l', 0.63, -2.46], ['c', 0.63, -2.40, 0.66, -2.55, 2.01, -6.96], ['c', 0.75, -2.49, 1.38, -4.56, 1.41, -4.62], ['c', 0.06, -0.15, 0.18, -0.21, 0.36, -0.24], ['c', 0.15, 0.00, 0.30, 0.06, 0.39, 0.18], ['c', 0.15, 0.21, 0.24, -0.18, -2.10, 7.56], ['c', -1.20, 3.96, -2.22, 7.32, -2.25, 7.41], ['c', 0.00, 0.12, -0.06, 0.27, -0.09, 0.30], ['c', -0.12, 0.21, -0.60, 0.21, -0.72, 0.00], ['c', -0.03, -0.03, -0.09, -0.18, -0.09, -0.30], ['c', -0.03, -0.09, -1.05, -3.45, -2.25, -7.41], ['c', -2.34, -7.74, -2.25, -7.35, -2.10, -7.56], ['c', 0.03, -0.03, 0.09, -0.09, 0.15, -0.12], ['z']], w: 9.73, h: 15.608 },
		'scripts.downbow': { d: [['M', -5.55, -9.93], ['l', 0.09, -0.06], ['l', 5.46, 0.00], ['l', 5.46, 0.00], ['l', 0.09, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 4.77], ['c', 0.00, 5.28, 0.00, 4.89, -0.18, 5.01], ['c', -0.18, 0.12, -0.42, 0.06, -0.54, -0.12], ['c', -0.06, -0.09, -0.06, -0.18, -0.06, -2.97], ['l', 0.00, -2.85], ['l', -4.83, 0.00], ['l', -4.83, 0.00], ['l', 0.00, 2.85], ['c', 0.00, 2.79, 0.00, 2.88, -0.06, 2.97], ['c', -0.15, 0.24, -0.51, 0.24, -0.66, 0.00], ['c', -0.06, -0.09, -0.06, -0.21, -0.06, -4.89], ['l', 0.00, -4.77], ['z']], w: 11.22, h: 9.992 },
		'scripts.turn': { d: [['M', -4.77, -3.90], ['c', 0.36, -0.06, 1.05, -0.06, 1.44, 0.03], ['c', 0.78, 0.15, 1.50, 0.51, 2.34, 1.14], ['c', 0.60, 0.45, 1.05, 0.87, 2.22, 2.01], ['c', 1.11, 1.08, 1.62, 1.50, 2.22, 1.86], ['c', 0.60, 0.36, 1.32, 0.57, 1.92, 0.57], ['c', 0.90, 0.00, 1.71, -0.57, 1.89, -1.35], ['c', 0.24, -0.93, -0.39, -1.89, -1.35, -2.10], ['l', -0.15, -0.06], ['l', -0.09, 0.15], ['c', -0.03, 0.09, -0.15, 0.24, -0.24, 0.33], ['c', -0.72, 0.72, -2.04, 0.54, -2.49, -0.36], ['c', -0.48, -0.93, 0.03, -1.86, 1.17, -2.19], ['c', 0.30, -0.09, 1.02, -0.09, 1.35, 0.00], ['c', 0.99, 0.27, 1.74, 0.87, 2.25, 1.83], ['c', 0.69, 1.41, 0.63, 3.00, -0.21, 4.26], ['c', -0.21, 0.30, -0.69, 0.81, -0.99, 1.02], ['c', -0.30, 0.21, -0.84, 0.45, -1.17, 0.54], ['c', -1.23, 0.36, -2.49, 0.15, -3.72, -0.60], ['c', -0.75, -0.48, -1.41, -1.02, -2.85, -2.46], ['c', -1.11, -1.08, -1.62, -1.50, -2.22, -1.86], ['c', -0.60, -0.36, -1.32, -0.57, -1.92, -0.57], ['c', -0.90, 0.00, -1.71, 0.57, -1.89, 1.35], ['c', -0.24, 0.93, 0.39, 1.89, 1.35, 2.10], ['l', 0.15, 0.06], ['l', 0.09, -0.15], ['c', 0.03, -0.09, 0.15, -0.24, 0.24, -0.33], ['c', 0.72, -0.72, 2.04, -0.54, 2.49, 0.36], ['c', 0.48, 0.93, -0.03, 1.86, -1.17, 2.19], ['c', -0.30, 0.09, -1.02, 0.09, -1.35, 0.00], ['c', -0.99, -0.27, -1.74, -0.87, -2.25, -1.83], ['c', -0.69, -1.41, -0.63, -3.00, 0.21, -4.26], ['c', 0.21, -0.30, 0.69, -0.81, 0.99, -1.02], ['c', 0.48, -0.33, 1.11, -0.57, 1.74, -0.66], ['z']], w: 16.366, h: 7.893 },
		'scripts.trill': { d: [['M', -0.51, -16.02], ['c', 0.12, -0.09, 0.21, -0.18, 0.21, -0.18], ['l', -0.81, 4.02], ['l', -0.81, 4.02], ['c', 0.03, 0.00, 0.51, -0.27, 1.08, -0.60], ['c', 0.60, -0.30, 1.14, -0.63, 1.26, -0.66], ['c', 1.14, -0.54, 2.31, -0.60, 3.09, -0.18], ['c', 0.27, 0.15, 0.54, 0.36, 0.60, 0.51], ['l', 0.06, 0.12], ['l', 0.21, -0.21], ['c', 0.90, -0.81, 2.22, -0.99, 3.12, -0.42], ['c', 0.60, 0.42, 0.90, 1.14, 0.78, 2.07], ['c', -0.15, 1.29, -1.05, 2.31, -1.95, 2.25], ['c', -0.48, -0.03, -0.78, -0.30, -0.96, -0.81], ['c', -0.09, -0.27, -0.09, -0.90, -0.03, -1.20], ['c', 0.21, -0.75, 0.81, -1.23, 1.59, -1.32], ['l', 0.24, -0.03], ['l', -0.09, -0.12], ['c', -0.51, -0.66, -1.62, -0.63, -2.31, 0.03], ['c', -0.39, 0.42, -0.30, 0.09, -1.23, 4.77], ['l', -0.81, 4.14], ['c', -0.03, 0.00, -0.12, -0.03, -0.21, -0.09], ['c', -0.33, -0.15, -0.54, -0.18, -0.99, -0.18], ['c', -0.42, 0.00, -0.66, 0.03, -1.05, 0.18], ['c', -0.12, 0.06, -0.21, 0.09, -0.21, 0.09], ['c', 0.00, -0.03, 0.36, -1.86, 0.81, -4.11], ['c', 0.90, -4.47, 0.87, -4.26, 0.69, -4.53], ['c', -0.21, -0.36, -0.66, -0.51, -1.17, -0.36], ['c', -0.15, 0.06, -2.22, 1.14, -2.58, 1.38], ['c', -0.12, 0.09, -0.12, 0.09, -0.21, 0.60], ['l', -0.09, 0.51], ['l', 0.21, 0.24], ['c', 0.63, 0.75, 1.02, 1.47, 1.20, 2.19], ['c', 0.06, 0.27, 0.06, 0.36, 0.06, 0.81], ['c', 0.00, 0.42, 0.00, 0.54, -0.06, 0.78], ['c', -0.15, 0.54, -0.33, 0.93, -0.63, 1.35], ['c', -0.18, 0.24, -0.57, 0.63, -0.81, 0.78], ['c', -0.24, 0.15, -0.63, 0.36, -0.84, 0.42], ['c', -0.27, 0.06, -0.66, 0.06, -0.87, 0.03], ['c', -0.81, -0.18, -1.32, -1.05, -1.38, -2.46], ['c', -0.03, -0.60, 0.03, -0.99, 0.33, -2.46], ['c', 0.21, -1.08, 0.24, -1.32, 0.21, -1.29], ['c', -1.20, 0.48, -2.40, 0.75, -3.21, 0.72], ['c', -0.69, -0.06, -1.17, -0.30, -1.41, -0.72], ['c', -0.39, -0.75, -0.12, -1.80, 0.66, -2.46], ['c', 0.24, -0.18, 0.69, -0.42, 1.02, -0.51], ['c', 0.69, -0.18, 1.53, -0.15, 2.31, 0.09], ['c', 0.30, 0.09, 0.75, 0.30, 0.99, 0.45], ['c', 0.12, 0.09, 0.15, 0.09, 0.15, 0.03], ['c', 0.03, -0.03, 0.33, -1.59, 0.72, -3.45], ['c', 0.36, -1.86, 0.66, -3.42, 0.69, -3.45], ['c', 0.00, -0.03, 0.03, -0.03, 0.21, 0.03], ['c', 0.21, 0.06, 0.27, 0.06, 0.48, 0.06], ['c', 0.42, -0.03, 0.78, -0.18, 1.26, -0.48], ['c', 0.15, -0.12, 0.36, -0.27, 0.48, -0.39], ['z'], ['m', -5.73, 7.68], ['c', -0.27, -0.03, -0.96, -0.06, -1.20, -0.03], ['c', -0.81, 0.12, -1.35, 0.57, -1.50, 1.20], ['c', -0.18, 0.66, 0.12, 1.14, 0.75, 1.29], ['c', 0.66, 0.12, 1.92, -0.12, 3.18, -0.66], ['l', 0.33, -0.15], ['l', 0.09, -0.39], ['c', 0.06, -0.21, 0.09, -0.42, 0.09, -0.45], ['c', 0.00, -0.03, -0.45, -0.30, -0.75, -0.45], ['c', -0.27, -0.15, -0.66, -0.27, -0.99, -0.36], ['z'], ['m', 4.29, 3.63], ['c', -0.24, -0.39, -0.51, -0.75, -0.51, -0.69], ['c', -0.06, 0.12, -0.39, 1.92, -0.45, 2.28], ['c', -0.09, 0.54, -0.12, 1.14, -0.06, 1.38], ['c', 0.06, 0.42, 0.21, 0.60, 0.51, 0.57], ['c', 0.39, -0.06, 0.75, -0.48, 0.93, -1.14], ['c', 0.09, -0.33, 0.09, -1.05, 0.00, -1.38], ['c', -0.09, -0.39, -0.24, -0.69, -0.42, -1.02], ['z']], w: 17.963, h: 16.49 },
		'scripts.segno': { d: [['M', -3.72, -11.22], ['c', 0.78, -0.09, 1.59, 0.03, 2.31, 0.42], ['c', 1.20, 0.60, 2.01, 1.71, 2.31, 3.09], ['c', 0.09, 0.42, 0.09, 1.20, 0.03, 1.50], ['c', -0.15, 0.45, -0.39, 0.81, -0.66, 0.93], ['c', -0.33, 0.18, -0.84, 0.21, -1.23, 0.15], ['c', -0.81, -0.18, -1.32, -0.93, -1.26, -1.89], ['c', 0.03, -0.36, 0.09, -0.57, 0.24, -0.90], ['c', 0.15, -0.33, 0.45, -0.60, 0.72, -0.75], ['c', 0.12, -0.06, 0.18, -0.09, 0.18, -0.12], ['c', 0.00, -0.03, -0.03, -0.15, -0.09, -0.24], ['c', -0.18, -0.45, -0.54, -0.87, -0.96, -1.08], ['c', -1.11, -0.57, -2.34, -0.18, -2.88, 0.90], ['c', -0.24, 0.51, -0.33, 1.11, -0.24, 1.83], ['c', 0.27, 1.92, 1.50, 3.54, 3.93, 5.13], ['c', 0.48, 0.33, 1.26, 0.78, 1.29, 0.78], ['c', 0.03, 0.00, 1.35, -2.19, 2.94, -4.89], ['l', 2.88, -4.89], ['l', 0.84, 0.00], ['l', 0.87, 0.00], ['l', -0.03, 0.06], ['c', -0.15, 0.21, -6.15, 10.41, -6.15, 10.44], ['c', 0.00, 0.00, 0.21, 0.15, 0.48, 0.27], ['c', 2.61, 1.47, 4.35, 3.03, 5.13, 4.65], ['c', 1.14, 2.34, 0.51, 5.07, -1.44, 6.39], ['c', -0.66, 0.42, -1.32, 0.63, -2.13, 0.69], ['c', -2.01, 0.09, -3.81, -1.41, -4.26, -3.54], ['c', -0.09, -0.42, -0.09, -1.20, -0.03, -1.50], ['c', 0.15, -0.45, 0.39, -0.81, 0.66, -0.93], ['c', 0.33, -0.18, 0.84, -0.21, 1.23, -0.15], ['c', 0.81, 0.18, 1.32, 0.93, 1.26, 1.89], ['c', -0.03, 0.36, -0.09, 0.57, -0.24, 0.90], ['c', -0.15, 0.33, -0.45, 0.60, -0.72, 0.75], ['c', -0.12, 0.06, -0.18, 0.09, -0.18, 0.12], ['c', 0.00, 0.03, 0.03, 0.15, 0.09, 0.24], ['c', 0.18, 0.45, 0.54, 0.87, 0.96, 1.08], ['c', 1.11, 0.57, 2.34, 0.18, 2.88, -0.90], ['c', 0.24, -0.51, 0.33, -1.11, 0.24, -1.83], ['c', -0.27, -1.92, -1.50, -3.54, -3.93, -5.13], ['c', -0.48, -0.33, -1.26, -0.78, -1.29, -0.78], ['c', -0.03, 0.00, -1.35, 2.19, -2.91, 4.89], ['l', -2.88, 4.89], ['l', -0.87, 0.00], ['l', -0.87, 0.00], ['l', 0.03, -0.06], ['c', 0.15, -0.21, 6.15, -10.41, 6.15, -10.44], ['c', 0.00, 0.00, -0.21, -0.15, -0.48, -0.30], ['c', -2.61, -1.44, -4.35, -3.00, -5.13, -4.62], ['c', -0.90, -1.89, -0.72, -4.02, 0.48, -5.52], ['c', 0.69, -0.84, 1.68, -1.41, 2.73, -1.53], ['z'], ['m', 8.76, 9.09], ['c', 0.03, -0.03, 0.15, -0.03, 0.27, -0.03], ['c', 0.33, 0.03, 0.57, 0.18, 0.72, 0.48], ['c', 0.09, 0.18, 0.09, 0.57, 0.00, 0.75], ['c', -0.09, 0.18, -0.21, 0.30, -0.36, 0.39], ['c', -0.15, 0.06, -0.21, 0.06, -0.39, 0.06], ['c', -0.21, 0.00, -0.27, 0.00, -0.39, -0.06], ['c', -0.30, -0.15, -0.48, -0.45, -0.48, -0.75], ['c', 0.00, -0.39, 0.24, -0.72, 0.63, -0.84], ['z'], ['m', -10.53, 2.61], ['c', 0.03, -0.03, 0.15, -0.03, 0.27, -0.03], ['c', 0.33, 0.03, 0.57, 0.18, 0.72, 0.48], ['c', 0.09, 0.18, 0.09, 0.57, 0.00, 0.75], ['c', -0.09, 0.18, -0.21, 0.30, -0.36, 0.39], ['c', -0.15, 0.06, -0.21, 0.06, -0.39, 0.06], ['c', -0.21, 0.00, -0.27, 0.00, -0.39, -0.06], ['c', -0.30, -0.15, -0.48, -0.45, -0.48, -0.75], ['c', 0.00, -0.39, 0.24, -0.72, 0.63, -0.84], ['z']], w: 15, h: 22.504 },
		'scripts.coda': { d: [['M', -0.21, -10.47], ['c', 0.18, -0.12, 0.42, -0.06, 0.54, 0.12], ['c', 0.06, 0.09, 0.06, 0.18, 0.06, 1.50], ['l', 0.00, 1.38], ['l', 0.18, 0.00], ['c', 0.39, 0.06, 0.96, 0.24, 1.38, 0.48], ['c', 1.68, 0.93, 2.82, 3.24, 3.03, 6.12], ['c', 0.03, 0.24, 0.03, 0.45, 0.03, 0.45], ['c', 0.00, 0.03, 0.60, 0.03, 1.35, 0.03], ['c', 1.50, 0.00, 1.47, 0.00, 1.59, 0.18], ['c', 0.09, 0.12, 0.09, 0.30, 0.00, 0.42], ['c', -0.12, 0.18, -0.09, 0.18, -1.59, 0.18], ['c', -0.75, 0.00, -1.35, 0.00, -1.35, 0.03], ['c', 0.00, 0.00, 0.00, 0.21, -0.03, 0.42], ['c', -0.24, 3.15, -1.53, 5.58, -3.45, 6.36], ['c', -0.27, 0.12, -0.72, 0.24, -0.96, 0.27], ['l', -0.18, 0.00], ['l', 0.00, 1.38], ['c', 0.00, 1.32, 0.00, 1.41, -0.06, 1.50], ['c', -0.15, 0.24, -0.51, 0.24, -0.66, 0.00], ['c', -0.06, -0.09, -0.06, -0.18, -0.06, -1.50], ['l', 0.00, -1.38], ['l', -0.18, 0.00], ['c', -0.39, -0.06, -0.96, -0.24, -1.38, -0.48], ['c', -1.68, -0.93, -2.82, -3.24, -3.03, -6.15], ['c', -0.03, -0.21, -0.03, -0.42, -0.03, -0.42], ['c', 0.00, -0.03, -0.60, -0.03, -1.35, -0.03], ['c', -1.50, 0.00, -1.47, 0.00, -1.59, -0.18], ['c', -0.09, -0.12, -0.09, -0.30, 0.00, -0.42], ['c', 0.12, -0.18, 0.09, -0.18, 1.59, -0.18], ['c', 0.75, 0.00, 1.35, 0.00, 1.35, -0.03], ['c', 0.00, 0.00, 0.00, -0.21, 0.03, -0.45], ['c', 0.24, -3.12, 1.53, -5.55, 3.45, -6.33], ['c', 0.27, -0.12, 0.72, -0.24, 0.96, -0.27], ['l', 0.18, 0.00], ['l', 0.00, -1.38], ['c', 0.00, -1.53, 0.00, -1.50, 0.18, -1.62], ['z'], ['m', -0.18, 6.93], ['c', 0.00, -2.97, 0.00, -3.15, -0.06, -3.15], ['c', -0.09, 0.00, -0.51, 0.15, -0.66, 0.21], ['c', -0.87, 0.51, -1.38, 1.62, -1.56, 3.51], ['c', -0.06, 0.54, -0.12, 1.59, -0.12, 2.16], ['l', 0.00, 0.42], ['l', 1.20, 0.00], ['l', 1.20, 0.00], ['l', 0.00, -3.15], ['z'], ['m', 1.17, -3.06], ['c', -0.09, -0.03, -0.21, -0.06, -0.27, -0.09], ['l', -0.12, 0.00], ['l', 0.00, 3.15], ['l', 0.00, 3.15], ['l', 1.20, 0.00], ['l', 1.20, 0.00], ['l', 0.00, -0.81], ['c', -0.06, -2.40, -0.33, -3.69, -0.93, -4.59], ['c', -0.27, -0.39, -0.66, -0.69, -1.08, -0.81], ['z'], ['m', -1.17, 10.14], ['l', 0.00, -3.15], ['l', -1.20, 0.00], ['l', -1.20, 0.00], ['l', 0.00, 0.81], ['c', 0.03, 0.96, 0.06, 1.47, 0.15, 2.13], ['c', 0.24, 2.04, 0.96, 3.12, 2.13, 3.36], ['l', 0.12, 0.00], ['l', 0.00, -3.15], ['z'], ['m', 3.18, -2.34], ['l', 0.00, -0.81], ['l', -1.20, 0.00], ['l', -1.20, 0.00], ['l', 0.00, 3.15], ['l', 0.00, 3.15], ['l', 0.12, 0.00], ['c', 1.17, -0.24, 1.89, -1.32, 2.13, -3.36], ['c', 0.09, -0.66, 0.12, -1.17, 0.15, -2.13], ['z']], w: 16.035, h: 21.062 },
		'scripts.comma': { d: [['M', 1.14, -4.62], ['c', 0.30, -0.12, 0.69, -0.03, 0.93, 0.15], ['c', 0.12, 0.12, 0.36, 0.45, 0.51, 0.78], ['c', 0.90, 1.77, 0.54, 4.05, -1.08, 6.75], ['c', -0.36, 0.63, -0.87, 1.38, -0.96, 1.44], ['c', -0.18, 0.12, -0.42, 0.06, -0.54, -0.12], ['c', -0.09, -0.18, -0.09, -0.30, 0.12, -0.60], ['c', 0.96, -1.44, 1.44, -2.97, 1.38, -4.35], ['c', -0.06, -0.93, -0.30, -1.68, -0.78, -2.46], ['c', -0.27, -0.39, -0.33, -0.63, -0.24, -0.96], ['c', 0.09, -0.27, 0.36, -0.54, 0.66, -0.63], ['z']], w: 3.042, h: 9.237 },
		'scripts.roll': { d: [['M', 1.95, -6.00], ['c', 0.21, -0.09, 0.36, -0.09, 0.57, 0.00], ['c', 0.39, 0.15, 0.63, 0.39, 1.47, 1.35], ['c', 0.66, 0.75, 0.78, 0.87, 1.08, 1.05], ['c', 0.75, 0.45, 1.65, 0.42, 2.40, -0.06], ['c', 0.12, -0.09, 0.27, -0.27, 0.54, -0.60], ['c', 0.42, -0.54, 0.51, -0.63, 0.69, -0.63], ['c', 0.09, 0.00, 0.30, 0.12, 0.36, 0.21], ['c', 0.09, 0.12, 0.12, 0.30, 0.03, 0.42], ['c', -0.06, 0.12, -3.15, 3.90, -3.30, 4.08], ['c', -0.06, 0.06, -0.18, 0.12, -0.27, 0.18], ['c', -0.27, 0.12, -0.60, 0.06, -0.99, -0.27], ['c', -0.27, -0.21, -0.42, -0.39, -1.08, -1.14], ['c', -0.63, -0.72, -0.81, -0.90, -1.17, -1.08], ['c', -0.36, -0.18, -0.57, -0.21, -0.99, -0.21], ['c', -0.39, 0.00, -0.63, 0.03, -0.93, 0.18], ['c', -0.36, 0.15, -0.51, 0.27, -0.90, 0.81], ['c', -0.24, 0.27, -0.45, 0.51, -0.48, 0.54], ['c', -0.12, 0.09, -0.27, 0.06, -0.39, 0.00], ['c', -0.24, -0.15, -0.33, -0.39, -0.21, -0.60], ['c', 0.09, -0.12, 3.18, -3.87, 3.33, -4.02], ['c', 0.06, -0.06, 0.18, -0.15, 0.24, -0.21], ['z']], w: 10.817, h: 6.125 },
		'scripts.prall': { d: [['M', -4.38, -3.69], ['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06], ['c', 0.30, 0.00, 0.27, -0.03, 1.89, 1.95], ['l', 1.53, 1.83], ['c', 0.03, 0.00, 0.57, -0.84, 1.23, -1.83], ['c', 1.14, -1.68, 1.23, -1.83, 1.35, -1.89], ['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06], ['c', 0.30, 0.00, 0.27, -0.03, 1.89, 1.95], ['l', 1.53, 1.83], ['l', 0.48, -0.69], ['c', 0.51, -0.78, 0.54, -0.84, 0.69, -0.90], ['c', 0.42, -0.18, 0.87, 0.15, 0.81, 0.60], ['c', -0.03, 0.12, -0.30, 0.51, -1.50, 2.37], ['c', -1.38, 2.07, -1.50, 2.22, -1.62, 2.28], ['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06], ['c', -0.30, 0.00, -0.27, 0.03, -1.89, -1.95], ['l', -1.53, -1.83], ['c', -0.03, 0.00, -0.57, 0.84, -1.23, 1.83], ['c', -1.14, 1.68, -1.23, 1.83, -1.35, 1.89], ['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06], ['c', -0.30, 0.00, -0.27, 0.03, -1.89, -1.95], ['l', -1.53, -1.83], ['l', -0.48, 0.69], ['c', -0.51, 0.78, -0.54, 0.84, -0.69, 0.90], ['c', -0.42, 0.18, -0.87, -0.15, -0.81, -0.60], ['c', 0.03, -0.12, 0.30, -0.51, 1.50, -2.37], ['c', 1.38, -2.07, 1.50, -2.22, 1.62, -2.28], ['z']], w: 15.011, h: 7.5 },
		'scripts.mordent': { d: [['M', -0.21, -4.95], ['c', 0.27, -0.15, 0.63, 0.00, 0.75, 0.27], ['c', 0.06, 0.12, 0.06, 0.24, 0.06, 1.44], ['l', 0.00, 1.29], ['l', 0.57, -0.84], ['c', 0.51, -0.75, 0.57, -0.84, 0.69, -0.90], ['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06], ['c', 0.30, 0.00, 0.27, -0.03, 1.89, 1.95], ['l', 1.53, 1.83], ['l', 0.48, -0.69], ['c', 0.51, -0.78, 0.54, -0.84, 0.69, -0.90], ['c', 0.42, -0.18, 0.87, 0.15, 0.81, 0.60], ['c', -0.03, 0.12, -0.30, 0.51, -1.50, 2.37], ['c', -1.38, 2.07, -1.50, 2.22, -1.62, 2.28], ['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06], ['c', -0.30, 0.00, -0.27, 0.03, -1.83, -1.89], ['c', -0.81, -0.99, -1.50, -1.80, -1.53, -1.86], ['c', -0.06, -0.03, -0.06, -0.03, -0.12, 0.03], ['c', -0.06, 0.06, -0.06, 0.15, -0.06, 2.28], ['c', 0.00, 1.95, 0.00, 2.25, -0.06, 2.34], ['c', -0.18, 0.45, -0.81, 0.48, -1.05, 0.03], ['c', -0.03, -0.06, -0.06, -0.24, -0.06, -1.41], ['l', 0.00, -1.35], ['l', -0.57, 0.84], ['c', -0.54, 0.78, -0.60, 0.87, -0.72, 0.93], ['c', -0.06, 0.03, -0.18, 0.06, -0.24, 0.06], ['c', -0.30, 0.00, -0.27, 0.03, -1.89, -1.95], ['l', -1.53, -1.83], ['l', -0.48, 0.69], ['c', -0.51, 0.78, -0.54, 0.84, -0.69, 0.90], ['c', -0.42, 0.18, -0.87, -0.15, -0.81, -0.60], ['c', 0.03, -0.12, 0.30, -0.51, 1.50, -2.37], ['c', 1.38, -2.07, 1.50, -2.22, 1.62, -2.28], ['c', 0.06, -0.03, 0.18, -0.06, 0.24, -0.06], ['c', 0.30, 0.00, 0.27, -0.03, 1.89, 1.95], ['l', 1.53, 1.83], ['c', 0.03, 0.00, 0.06, -0.06, 0.09, -0.09], ['c', 0.06, -0.12, 0.06, -0.15, 0.06, -2.28], ['c', 0.00, -1.92, 0.00, -2.22, 0.06, -2.31], ['c', 0.06, -0.15, 0.15, -0.24, 0.30, -0.30], ['z']], w: 15.011, h: 10.012 },
		'flags.u8th': { d: [['M', -0.42, 3.75], ['l', 0.00, -3.75], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.00, 0.18], ['c', 0.00, 0.30, 0.06, 0.84, 0.12, 1.23], ['c', 0.24, 1.53, 0.90, 3.12, 2.13, 5.16], ['l', 0.99, 1.59], ['c', 0.87, 1.44, 1.38, 2.34, 1.77, 3.09], ['c', 0.81, 1.68, 1.20, 3.06, 1.26, 4.53], ['c', 0.03, 1.53, -0.21, 3.27, -0.75, 5.01], ['c', -0.21, 0.69, -0.51, 1.50, -0.60, 1.59], ['c', -0.09, 0.12, -0.27, 0.21, -0.42, 0.21], ['c', -0.15, 0.00, -0.42, -0.12, -0.51, -0.21], ['c', -0.15, -0.18, -0.18, -0.42, -0.09, -0.66], ['c', 0.15, -0.33, 0.45, -1.20, 0.57, -1.62], ['c', 0.42, -1.38, 0.60, -2.58, 0.60, -3.90], ['c', 0.00, -0.66, 0.00, -0.81, -0.06, -1.11], ['c', -0.39, -2.07, -1.80, -4.26, -4.59, -7.14], ['l', -0.42, -0.45], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -3.75], ['z']], w: 6.692, h: 22.59 },
		'flags.u16th': { d: [['M', -0.42, 7.50], ['l', 0.00, -7.50], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.00, 0.39], ['c', 0.06, 1.08, 0.39, 2.19, 0.99, 3.39], ['c', 0.45, 0.90, 0.87, 1.59, 1.95, 3.12], ['c', 1.29, 1.86, 1.77, 2.64, 2.22, 3.57], ['c', 0.45, 0.93, 0.72, 1.80, 0.87, 2.64], ['c', 0.06, 0.51, 0.06, 1.50, 0.00, 1.92], ['c', -0.12, 0.60, -0.30, 1.20, -0.54, 1.71], ['l', -0.09, 0.24], ['l', 0.18, 0.45], ['c', 0.51, 1.20, 0.72, 2.22, 0.69, 3.42], ['c', -0.06, 1.53, -0.39, 3.03, -0.99, 4.53], ['c', -0.30, 0.75, -0.36, 0.81, -0.57, 0.90], ['c', -0.15, 0.09, -0.33, 0.06, -0.48, 0.00], ['c', -0.18, -0.09, -0.27, -0.18, -0.33, -0.33], ['c', -0.09, -0.18, -0.06, -0.30, 0.12, -0.75], ['c', 0.66, -1.41, 1.02, -2.88, 1.08, -4.32], ['c', 0.00, -0.60, -0.03, -1.05, -0.18, -1.59], ['c', -0.30, -1.20, -0.99, -2.40, -2.25, -3.87], ['c', -0.42, -0.48, -1.53, -1.62, -2.19, -2.22], ['l', -0.45, -0.42], ['l', -0.03, 1.11], ['l', 0.00, 1.11], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -7.50], ['z'], ['m', 1.65, 0.09], ['c', -0.30, -0.30, -0.69, -0.72, -0.90, -0.87], ['l', -0.33, -0.33], ['l', 0.00, 0.15], ['c', 0.00, 0.30, 0.06, 0.81, 0.15, 1.26], ['c', 0.27, 1.29, 0.87, 2.61, 2.04, 4.29], ['c', 0.15, 0.24, 0.60, 0.87, 0.96, 1.38], ['l', 1.08, 1.53], ['l', 0.42, 0.63], ['c', 0.03, 0.00, 0.12, -0.36, 0.21, -0.72], ['c', 0.06, -0.33, 0.06, -1.20, 0.00, -1.62], ['c', -0.33, -1.71, -1.44, -3.48, -3.63, -5.70], ['z']], w: 6.693, h: 26.337 },
		'flags.u32nd': { d: [['M', -0.42, 11.25], ['l', 0.00, -11.25], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.00, 0.36], ['c', 0.09, 1.68, 0.69, 3.27, 2.07, 5.46], ['l', 0.87, 1.35], ['c', 1.02, 1.62, 1.47, 2.37, 1.86, 3.18], ['c', 0.48, 1.02, 0.78, 1.92, 0.93, 2.88], ['c', 0.06, 0.48, 0.06, 1.50, 0.00, 1.89], ['c', -0.09, 0.42, -0.21, 0.87, -0.36, 1.26], ['l', -0.12, 0.30], ['l', 0.15, 0.39], ['c', 0.69, 1.56, 0.84, 2.88, 0.54, 4.38], ['c', -0.09, 0.45, -0.27, 1.08, -0.45, 1.47], ['l', -0.12, 0.24], ['l', 0.18, 0.36], ['c', 0.33, 0.72, 0.57, 1.56, 0.69, 2.34], ['c', 0.12, 1.02, -0.06, 2.52, -0.42, 3.84], ['c', -0.27, 0.93, -0.75, 2.13, -0.93, 2.31], ['c', -0.18, 0.15, -0.45, 0.18, -0.66, 0.09], ['c', -0.18, -0.09, -0.27, -0.18, -0.33, -0.33], ['c', -0.09, -0.18, -0.06, -0.30, 0.06, -0.60], ['c', 0.21, -0.36, 0.42, -0.90, 0.57, -1.38], ['c', 0.51, -1.41, 0.69, -3.06, 0.48, -4.08], ['c', -0.15, -0.81, -0.57, -1.68, -1.20, -2.55], ['c', -0.72, -0.99, -1.83, -2.13, -3.30, -3.33], ['l', -0.48, -0.42], ['l', -0.03, 1.53], ['l', 0.00, 1.56], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -11.25], ['z'], ['m', 1.26, -3.96], ['c', -0.27, -0.30, -0.54, -0.60, -0.66, -0.72], ['l', -0.18, -0.21], ['l', 0.00, 0.42], ['c', 0.06, 0.87, 0.24, 1.74, 0.66, 2.67], ['c', 0.36, 0.87, 0.96, 1.86, 1.92, 3.18], ['c', 0.21, 0.33, 0.63, 0.87, 0.87, 1.23], ['c', 0.27, 0.39, 0.60, 0.84, 0.75, 1.08], ['l', 0.27, 0.39], ['l', 0.03, -0.12], ['c', 0.12, -0.45, 0.15, -1.05, 0.09, -1.59], ['c', -0.27, -1.86, -1.38, -3.78, -3.75, -6.33], ['z'], ['m', -0.27, 6.09], ['c', -0.27, -0.21, -0.48, -0.42, -0.51, -0.45], ['c', -0.06, -0.03, -0.06, -0.03, -0.06, 0.21], ['c', 0.00, 0.90, 0.30, 2.04, 0.81, 3.09], ['c', 0.48, 1.02, 0.96, 1.77, 2.37, 3.63], ['c', 0.60, 0.78, 1.05, 1.44, 1.29, 1.77], ['c', 0.06, 0.12, 0.15, 0.21, 0.15, 0.18], ['c', 0.03, -0.03, 0.18, -0.57, 0.24, -0.87], ['c', 0.06, -0.45, 0.06, -1.32, -0.03, -1.74], ['c', -0.09, -0.48, -0.24, -0.90, -0.51, -1.44], ['c', -0.66, -1.35, -1.83, -2.70, -3.75, -4.38], ['z']], w: 6.697, h: 32.145 },
		'flags.u64th': { d: [['M', -0.42, 15.00], ['l', 0.00, -15.00], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.00, 0.36], ['c', 0.06, 1.20, 0.39, 2.37, 1.02, 3.66], ['c', 0.39, 0.81, 0.84, 1.56, 1.80, 3.09], ['c', 0.81, 1.26, 1.05, 1.68, 1.35, 2.22], ['c', 0.87, 1.50, 1.35, 2.79, 1.56, 4.08], ['c', 0.06, 0.54, 0.06, 1.56, -0.03, 2.04], ['c', -0.09, 0.48, -0.21, 0.99, -0.36, 1.35], ['l', -0.12, 0.27], ['l', 0.12, 0.27], ['c', 0.09, 0.15, 0.21, 0.45, 0.27, 0.66], ['c', 0.69, 1.89, 0.63, 3.66, -0.18, 5.46], ['l', -0.18, 0.39], ['l', 0.15, 0.33], ['c', 0.30, 0.66, 0.51, 1.44, 0.63, 2.10], ['c', 0.06, 0.48, 0.06, 1.35, 0.00, 1.71], ['c', -0.15, 0.57, -0.42, 1.20, -0.78, 1.68], ['l', -0.21, 0.27], ['l', 0.18, 0.33], ['c', 0.57, 1.05, 0.93, 2.13, 1.02, 3.18], ['c', 0.06, 0.72, 0.00, 1.83, -0.21, 2.79], ['c', -0.18, 1.02, -0.63, 2.34, -1.02, 3.09], ['c', -0.15, 0.33, -0.48, 0.45, -0.78, 0.30], ['c', -0.18, -0.09, -0.27, -0.18, -0.33, -0.33], ['c', -0.09, -0.18, -0.06, -0.30, 0.03, -0.54], ['c', 0.75, -1.50, 1.23, -3.45, 1.17, -4.89], ['c', -0.06, -1.02, -0.42, -2.01, -1.17, -3.15], ['c', -0.48, -0.72, -1.02, -1.35, -1.89, -2.22], ['c', -0.57, -0.57, -1.56, -1.50, -1.92, -1.77], ['l', -0.12, -0.09], ['l', 0.00, 1.68], ['l', 0.00, 1.68], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -15.00], ['z'], ['m', 0.93, -8.07], ['c', -0.27, -0.30, -0.48, -0.54, -0.51, -0.54], ['c', 0.00, 0.00, 0.00, 0.69, 0.03, 1.02], ['c', 0.15, 1.47, 0.75, 2.94, 2.04, 4.83], ['l', 1.08, 1.53], ['c', 0.39, 0.57, 0.84, 1.20, 0.99, 1.44], ['c', 0.15, 0.24, 0.30, 0.45, 0.30, 0.45], ['c', 0.00, 0.00, 0.03, -0.09, 0.06, -0.21], ['c', 0.36, -1.59, -0.15, -3.33, -1.47, -5.40], ['c', -0.63, -0.93, -1.35, -1.83, -2.52, -3.12], ['z'], ['m', 0.06, 6.72], ['c', -0.24, -0.21, -0.48, -0.42, -0.51, -0.45], ['l', -0.06, -0.06], ['l', 0.00, 0.33], ['c', 0.00, 1.20, 0.30, 2.34, 0.93, 3.60], ['c', 0.45, 0.90, 0.96, 1.68, 2.25, 3.51], ['c', 0.39, 0.54, 0.84, 1.17, 1.02, 1.44], ['c', 0.21, 0.33, 0.33, 0.51, 0.33, 0.48], ['c', 0.06, -0.09, 0.21, -0.63, 0.30, -0.99], ['c', 0.06, -0.33, 0.06, -0.45, 0.06, -0.96], ['c', 0.00, -0.60, -0.03, -0.84, -0.18, -1.35], ['c', -0.30, -1.08, -1.02, -2.28, -2.13, -3.57], ['c', -0.39, -0.45, -1.44, -1.47, -2.01, -1.98], ['z'], ['m', 0.00, 6.72], ['c', -0.24, -0.21, -0.48, -0.39, -0.51, -0.42], ['l', -0.06, -0.06], ['l', 0.00, 0.33], ['c', 0.00, 1.41, 0.45, 2.82, 1.38, 4.35], ['c', 0.42, 0.72, 0.72, 1.14, 1.86, 2.73], ['c', 0.36, 0.45, 0.75, 0.99, 0.87, 1.20], ['c', 0.15, 0.21, 0.30, 0.36, 0.30, 0.36], ['c', 0.06, 0.00, 0.30, -0.48, 0.39, -0.75], ['c', 0.09, -0.36, 0.12, -0.63, 0.12, -1.05], ['c', -0.06, -1.05, -0.45, -2.04, -1.20, -3.18], ['c', -0.57, -0.87, -1.11, -1.53, -2.07, -2.49], ['c', -0.36, -0.33, -0.84, -0.78, -1.08, -1.02], ['z']], w: 6.682, h: 39.694 },
		'flags.d8th': { d: [['M', 5.67, -21.63], ['c', 0.24, -0.12, 0.54, -0.06, 0.69, 0.15], ['c', 0.06, 0.06, 0.21, 0.36, 0.39, 0.66], ['c', 0.84, 1.77, 1.26, 3.36, 1.32, 5.10], ['c', 0.03, 1.29, -0.21, 2.37, -0.81, 3.63], ['c', -0.60, 1.23, -1.26, 2.13, -3.21, 4.38], ['c', -1.35, 1.53, -1.86, 2.19, -2.40, 2.97], ['c', -0.63, 0.93, -1.11, 1.92, -1.38, 2.79], ['c', -0.15, 0.54, -0.27, 1.35, -0.27, 1.80], ['l', 0.00, 0.15], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -3.75], ['l', 0.00, -3.75], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.48, -0.30], ['c', 1.83, -1.11, 3.12, -2.10, 4.17, -3.12], ['c', 0.78, -0.81, 1.32, -1.53, 1.71, -2.31], ['c', 0.45, -0.93, 0.60, -1.74, 0.51, -2.88], ['c', -0.12, -1.56, -0.63, -3.18, -1.47, -4.68], ['c', -0.12, -0.21, -0.15, -0.33, -0.06, -0.51], ['c', 0.06, -0.15, 0.15, -0.24, 0.33, -0.33], ['z']], w: 8.492, h: 21.691 },
		'flags.ugrace': { d: [['M', 6.03, 6.93], ['c', 0.15, -0.09, 0.33, -0.06, 0.51, 0.00], ['c', 0.15, 0.09, 0.21, 0.15, 0.30, 0.33], ['c', 0.09, 0.18, 0.06, 0.39, -0.03, 0.54], ['c', -0.06, 0.15, -10.89, 8.88, -11.07, 8.97], ['c', -0.15, 0.09, -0.33, 0.06, -0.48, 0.00], ['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33], ['c', -0.09, -0.18, -0.06, -0.39, 0.03, -0.54], ['c', 0.06, -0.15, 10.89, -8.88, 11.07, -8.97], ['z']], w: 12.019, h: 9.954 },
		'flags.dgrace': { d: [['M', -6.06, -15.93], ['c', 0.18, -0.09, 0.33, -0.12, 0.48, -0.06], ['c', 0.18, 0.09, 14.01, 8.04, 14.10, 8.10], ['c', 0.12, 0.12, 0.18, 0.33, 0.18, 0.51], ['c', -0.03, 0.21, -0.15, 0.39, -0.36, 0.48], ['c', -0.18, 0.09, -0.33, 0.12, -0.48, 0.06], ['c', -0.18, -0.09, -14.01, -8.04, -14.10, -8.10], ['c', -0.12, -0.12, -0.18, -0.33, -0.18, -0.51], ['c', 0.03, -0.21, 0.15, -0.39, 0.36, -0.48], ['z']], w: 15.12, h: 9.212 },
		'flags.d16th': { d: [['M', 6.84, -22.53], ['c', 0.27, -0.12, 0.57, -0.06, 0.72, 0.15], ['c', 0.15, 0.15, 0.33, 0.87, 0.45, 1.56], ['c', 0.06, 0.33, 0.06, 1.35, 0.00, 1.65], ['c', -0.06, 0.33, -0.15, 0.78, -0.27, 1.11], ['c', -0.12, 0.33, -0.45, 0.96, -0.66, 1.32], ['l', -0.18, 0.27], ['l', 0.09, 0.18], ['c', 0.48, 1.02, 0.72, 2.25, 0.69, 3.30], ['c', -0.06, 1.23, -0.42, 2.28, -1.26, 3.45], ['c', -0.57, 0.87, -0.99, 1.32, -3.00, 3.39], ['c', -1.56, 1.56, -2.22, 2.40, -2.76, 3.45], ['c', -0.42, 0.84, -0.66, 1.80, -0.66, 2.55], ['l', 0.00, 0.15], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -7.50], ['l', 0.00, -7.50], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.00, 1.14], ['l', 0.00, 1.11], ['l', 0.27, -0.15], ['c', 1.11, -0.57, 1.77, -0.99, 2.52, -1.47], ['c', 2.37, -1.56, 3.69, -3.15, 4.05, -4.83], ['c', 0.03, -0.18, 0.03, -0.39, 0.03, -0.78], ['c', 0.00, -0.60, -0.03, -0.93, -0.24, -1.50], ['c', -0.06, -0.18, -0.12, -0.39, -0.15, -0.45], ['c', -0.03, -0.24, 0.12, -0.48, 0.36, -0.60], ['z'], ['m', -0.63, 7.50], ['c', -0.06, -0.18, -0.15, -0.36, -0.15, -0.36], ['c', -0.03, 0.00, -0.03, 0.03, -0.06, 0.06], ['c', -0.06, 0.12, -0.96, 1.02, -1.95, 1.98], ['c', -0.63, 0.57, -1.26, 1.17, -1.44, 1.35], ['c', -1.53, 1.62, -2.28, 2.85, -2.55, 4.32], ['c', -0.03, 0.18, -0.03, 0.54, -0.06, 0.99], ['l', 0.00, 0.69], ['l', 0.18, -0.09], ['c', 0.93, -0.54, 2.10, -1.29, 2.82, -1.83], ['c', 0.69, -0.51, 1.02, -0.81, 1.53, -1.29], ['c', 1.86, -1.89, 2.37, -3.66, 1.68, -5.82], ['z']], w: 8.475, h: 22.591 },
		'flags.d32nd': { d: [['M', 6.84, -29.13], ['c', 0.27, -0.12, 0.57, -0.06, 0.72, 0.15], ['c', 0.12, 0.12, 0.27, 0.63, 0.36, 1.11], ['c', 0.33, 1.59, 0.06, 3.06, -0.81, 4.47], ['l', -0.18, 0.27], ['l', 0.09, 0.15], ['c', 0.12, 0.24, 0.33, 0.69, 0.45, 1.05], ['c', 0.63, 1.83, 0.45, 3.57, -0.57, 5.22], ['l', -0.18, 0.30], ['l', 0.15, 0.27], ['c', 0.42, 0.87, 0.60, 1.71, 0.57, 2.61], ['c', -0.06, 1.29, -0.48, 2.46, -1.35, 3.78], ['c', -0.54, 0.81, -0.93, 1.29, -2.46, 3.00], ['c', -0.51, 0.54, -1.05, 1.17, -1.26, 1.41], ['c', -1.56, 1.86, -2.25, 3.36, -2.37, 5.01], ['l', 0.00, 0.33], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -11.25], ['l', 0.00, -11.25], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.00, 1.35], ['l', 0.03, 1.35], ['l', 0.78, -0.39], ['c', 1.38, -0.69, 2.34, -1.26, 3.24, -1.92], ['c', 1.38, -1.02, 2.28, -2.13, 2.64, -3.21], ['c', 0.15, -0.48, 0.18, -0.72, 0.18, -1.29], ['c', 0.00, -0.57, -0.06, -0.90, -0.24, -1.47], ['c', -0.06, -0.18, -0.12, -0.39, -0.15, -0.45], ['c', -0.03, -0.24, 0.12, -0.48, 0.36, -0.60], ['z'], ['m', -0.63, 7.20], ['c', -0.09, -0.18, -0.12, -0.21, -0.12, -0.15], ['c', -0.03, 0.09, -1.02, 1.08, -2.04, 2.04], ['c', -1.17, 1.08, -1.65, 1.56, -2.07, 2.04], ['c', -0.84, 0.96, -1.38, 1.86, -1.68, 2.76], ['c', -0.21, 0.57, -0.27, 0.99, -0.30, 1.65], ['l', 0.00, 0.54], ['l', 0.66, -0.33], ['c', 3.57, -1.86, 5.49, -3.69, 5.94, -5.70], ['c', 0.06, -0.39, 0.06, -1.20, -0.03, -1.65], ['c', -0.06, -0.39, -0.24, -0.90, -0.36, -1.20], ['z'], ['m', -0.06, 7.20], ['c', -0.06, -0.15, -0.12, -0.33, -0.15, -0.45], ['l', -0.06, -0.18], ['l', -0.18, 0.21], ['l', -1.83, 1.83], ['c', -0.87, 0.90, -1.77, 1.80, -1.95, 2.01], ['c', -1.08, 1.29, -1.62, 2.31, -1.89, 3.51], ['c', -0.06, 0.30, -0.06, 0.51, -0.09, 0.93], ['l', 0.00, 0.57], ['l', 0.09, -0.06], ['c', 0.75, -0.45, 1.89, -1.26, 2.52, -1.74], ['c', 0.81, -0.66, 1.74, -1.53, 2.22, -2.16], ['c', 1.26, -1.53, 1.68, -3.06, 1.32, -4.47], ['z']], w: 8.385, h: 29.191 },
		'flags.d64th': { d: [['M', 7.08, -32.88], ['c', 0.30, -0.12, 0.66, -0.03, 0.78, 0.24], ['c', 0.18, 0.33, 0.27, 2.10, 0.15, 2.64], ['c', -0.09, 0.39, -0.21, 0.78, -0.39, 1.08], ['l', -0.15, 0.30], ['l', 0.09, 0.27], ['c', 0.03, 0.12, 0.09, 0.45, 0.12, 0.69], ['c', 0.27, 1.44, 0.18, 2.55, -0.30, 3.60], ['l', -0.12, 0.33], ['l', 0.06, 0.42], ['c', 0.27, 1.35, 0.33, 2.82, 0.21, 3.63], ['c', -0.12, 0.60, -0.30, 1.23, -0.57, 1.80], ['l', -0.15, 0.27], ['l', 0.03, 0.42], ['c', 0.06, 1.02, 0.06, 2.70, 0.03, 3.06], ['c', -0.15, 1.47, -0.66, 2.76, -1.74, 4.41], ['c', -0.45, 0.69, -0.75, 1.11, -1.74, 2.37], ['c', -1.05, 1.38, -1.50, 1.98, -1.95, 2.73], ['c', -0.93, 1.50, -1.38, 2.82, -1.44, 4.20], ['l', 0.00, 0.42], ['l', -0.21, 0.00], ['l', -0.21, 0.00], ['l', 0.00, -15.00], ['l', 0.00, -15.00], ['l', 0.21, 0.00], ['l', 0.21, 0.00], ['l', 0.00, 1.86], ['l', 0.00, 1.89], ['c', 0.00, 0.00, 0.21, -0.03, 0.45, -0.09], ['c', 2.22, -0.39, 4.08, -1.11, 5.19, -2.01], ['c', 0.63, -0.54, 1.02, -1.14, 1.20, -1.80], ['c', 0.06, -0.30, 0.06, -1.14, -0.03, -1.65], ['c', -0.03, -0.18, -0.06, -0.39, -0.09, -0.48], ['c', -0.03, -0.24, 0.12, -0.48, 0.36, -0.60], ['z'], ['m', -0.45, 6.15], ['c', -0.03, -0.18, -0.06, -0.42, -0.06, -0.54], ['l', -0.03, -0.18], ['l', -0.33, 0.30], ['c', -0.42, 0.36, -0.87, 0.72, -1.68, 1.29], ['c', -1.98, 1.38, -2.25, 1.59, -2.85, 2.16], ['c', -0.75, 0.69, -1.23, 1.44, -1.47, 2.19], ['c', -0.15, 0.45, -0.18, 0.63, -0.21, 1.35], ['l', 0.00, 0.66], ['l', 0.39, -0.18], ['c', 1.83, -0.90, 3.45, -1.95, 4.47, -2.91], ['c', 0.93, -0.90, 1.53, -1.83, 1.74, -2.82], ['c', 0.06, -0.33, 0.06, -0.87, 0.03, -1.32], ['z'], ['m', -0.27, 4.86], ['c', -0.03, -0.21, -0.06, -0.36, -0.06, -0.36], ['c', 0.00, -0.03, -0.12, 0.09, -0.24, 0.24], ['c', -0.39, 0.48, -0.99, 1.08, -2.16, 2.19], ['c', -1.47, 1.38, -1.92, 1.83, -2.46, 2.49], ['c', -0.66, 0.87, -1.08, 1.74, -1.29, 2.58], ['c', -0.09, 0.42, -0.15, 0.87, -0.15, 1.44], ['l', 0.00, 0.54], ['l', 0.48, -0.33], ['c', 1.50, -1.02, 2.58, -1.89, 3.51, -2.82], ['c', 1.47, -1.47, 2.25, -2.85, 2.40, -4.26], ['c', 0.03, -0.39, 0.03, -1.17, -0.03, -1.71], ['z'], ['m', -0.66, 7.68], ['c', 0.03, -0.15, 0.03, -0.60, 0.03, -0.99], ['l', 0.00, -0.72], ['l', -0.27, 0.33], ['l', -1.74, 1.98], ['c', -1.77, 1.92, -2.43, 2.76, -2.97, 3.90], ['c', -0.51, 1.02, -0.72, 1.77, -0.75, 2.91], ['c', 0.00, 0.63, 0.00, 0.63, 0.06, 0.60], ['c', 0.03, -0.03, 0.30, -0.27, 0.63, -0.54], ['c', 0.66, -0.60, 1.86, -1.80, 2.31, -2.31], ['c', 1.65, -1.89, 2.52, -3.54, 2.70, -5.16], ['z']], w: 8.485, h: 32.932 },
		'clefs.C': { d: [['M', 0.06, -14.94], ['l', 0.09, -0.06], ['l', 1.92, 0.00], ['l', 1.92, 0.00], ['l', 0.09, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 14.85], ['l', 0.00, 14.82], ['l', -0.06, 0.09], ['l', -0.09, 0.06], ['l', -1.92, 0.00], ['l', -1.92, 0.00], ['l', -0.09, -0.06], ['l', -0.06, -0.09], ['l', 0.00, -14.82], ['l', 0.00, -14.85], ['z'], ['m', 5.37, 0.00], ['c', 0.09, -0.06, 0.09, -0.06, 0.57, -0.06], ['c', 0.45, 0.00, 0.45, 0.00, 0.54, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 7.14], ['l', 0.00, 7.11], ['l', 0.09, -0.06], ['c', 0.18, -0.18, 0.72, -0.84, 0.96, -1.20], ['c', 0.30, -0.45, 0.66, -1.17, 0.84, -1.65], ['c', 0.36, -0.90, 0.57, -1.83, 0.60, -2.79], ['c', 0.03, -0.48, 0.03, -0.54, 0.09, -0.63], ['c', 0.12, -0.18, 0.36, -0.21, 0.54, -0.12], ['c', 0.18, 0.09, 0.21, 0.15, 0.24, 0.66], ['c', 0.06, 0.87, 0.21, 1.56, 0.57, 2.22], ['c', 0.51, 1.02, 1.26, 1.68, 2.22, 1.92], ['c', 0.21, 0.06, 0.33, 0.06, 0.78, 0.06], ['c', 0.45, 0.00, 0.57, 0.00, 0.84, -0.06], ['c', 0.45, -0.12, 0.81, -0.33, 1.08, -0.60], ['c', 0.57, -0.57, 0.87, -1.41, 0.99, -2.88], ['c', 0.06, -0.54, 0.06, -3.00, 0.00, -3.57], ['c', -0.21, -2.58, -0.84, -3.87, -2.16, -4.50], ['c', -0.48, -0.21, -1.17, -0.36, -1.77, -0.36], ['c', -0.69, 0.00, -1.29, 0.27, -1.50, 0.72], ['c', -0.06, 0.15, -0.06, 0.21, -0.06, 0.42], ['c', 0.00, 0.24, 0.00, 0.30, 0.06, 0.45], ['c', 0.12, 0.24, 0.24, 0.39, 0.63, 0.66], ['c', 0.42, 0.30, 0.57, 0.48, 0.69, 0.72], ['c', 0.06, 0.15, 0.06, 0.21, 0.06, 0.48], ['c', 0.00, 0.39, -0.03, 0.63, -0.21, 0.96], ['c', -0.30, 0.60, -0.87, 1.08, -1.50, 1.26], ['c', -0.27, 0.06, -0.87, 0.06, -1.14, 0.00], ['c', -0.78, -0.24, -1.44, -0.87, -1.65, -1.68], ['c', -0.12, -0.42, -0.09, -1.17, 0.09, -1.71], ['c', 0.51, -1.65, 1.98, -2.82, 3.81, -3.09], ['c', 0.84, -0.09, 2.46, 0.03, 3.51, 0.27], ['c', 2.22, 0.57, 3.69, 1.80, 4.44, 3.75], ['c', 0.36, 0.93, 0.57, 2.13, 0.57, 3.36], ['c', 0.00, 1.44, -0.48, 2.73, -1.38, 3.81], ['c', -1.26, 1.50, -3.27, 2.43, -5.28, 2.43], ['c', -0.48, 0.00, -0.51, 0.00, -0.75, -0.09], ['c', -0.15, -0.03, -0.48, -0.21, -0.78, -0.36], ['c', -0.69, -0.36, -0.87, -0.42, -1.26, -0.42], ['c', -0.27, 0.00, -0.30, 0.00, -0.51, 0.09], ['c', -0.57, 0.30, -0.81, 0.90, -0.81, 2.10], ['c', 0.00, 1.23, 0.24, 1.83, 0.81, 2.13], ['c', 0.21, 0.09, 0.24, 0.09, 0.51, 0.09], ['c', 0.39, 0.00, 0.57, -0.06, 1.26, -0.42], ['c', 0.30, -0.15, 0.63, -0.33, 0.78, -0.36], ['c', 0.24, -0.09, 0.27, -0.09, 0.75, -0.09], ['c', 2.01, 0.00, 4.02, 0.93, 5.28, 2.40], ['c', 0.90, 1.11, 1.38, 2.40, 1.38, 3.84], ['c', 0.00, 1.50, -0.30, 2.88, -0.84, 3.96], ['c', -0.78, 1.59, -2.19, 2.64, -4.17, 3.15], ['c', -1.05, 0.24, -2.67, 0.36, -3.51, 0.27], ['c', -1.83, -0.27, -3.30, -1.44, -3.81, -3.09], ['c', -0.18, -0.54, -0.21, -1.29, -0.09, -1.74], ['c', 0.15, -0.60, 0.63, -1.20, 1.23, -1.47], ['c', 0.36, -0.18, 0.57, -0.21, 0.99, -0.21], ['c', 0.42, 0.00, 0.63, 0.03, 1.02, 0.21], ['c', 0.42, 0.21, 0.84, 0.63, 1.05, 1.05], ['c', 0.18, 0.36, 0.21, 0.60, 0.21, 0.96], ['c', 0.00, 0.30, 0.00, 0.36, -0.06, 0.51], ['c', -0.12, 0.24, -0.27, 0.42, -0.69, 0.72], ['c', -0.57, 0.42, -0.69, 0.63, -0.69, 1.08], ['c', 0.00, 0.24, 0.00, 0.30, 0.06, 0.45], ['c', 0.12, 0.21, 0.30, 0.39, 0.57, 0.54], ['c', 0.42, 0.18, 0.87, 0.21, 1.53, 0.15], ['c', 1.08, -0.15, 1.80, -0.57, 2.34, -1.32], ['c', 0.54, -0.75, 0.84, -1.83, 0.99, -3.51], ['c', 0.06, -0.57, 0.06, -3.03, 0.00, -3.57], ['c', -0.12, -1.47, -0.42, -2.31, -0.99, -2.88], ['c', -0.27, -0.27, -0.63, -0.48, -1.08, -0.60], ['c', -0.27, -0.06, -0.39, -0.06, -0.84, -0.06], ['c', -0.45, 0.00, -0.57, 0.00, -0.78, 0.06], ['c', -1.14, 0.27, -2.01, 1.17, -2.46, 2.49], ['c', -0.21, 0.57, -0.30, 0.99, -0.33, 1.65], ['c', -0.03, 0.51, -0.06, 0.57, -0.24, 0.66], ['c', -0.12, 0.06, -0.27, 0.06, -0.39, 0.00], ['c', -0.21, -0.09, -0.21, -0.15, -0.24, -0.75], ['c', -0.09, -1.92, -0.78, -3.72, -2.01, -5.19], ['c', -0.18, -0.21, -0.36, -0.42, -0.39, -0.45], ['l', -0.09, -0.06], ['l', 0.00, 7.11], ['l', 0.00, 7.14], ['l', -0.06, 0.09], ['c', -0.09, 0.06, -0.09, 0.06, -0.54, 0.06], ['c', -0.48, 0.00, -0.48, 0.00, -0.57, -0.06], ['l', -0.06, -0.09], ['l', 0.00, -14.82], ['l', 0.00, -14.85], ['z']], w: 20.31, h: 29.97 },
		'clefs.F': { d: [['M', 6.30, -7.80], ['c', 0.36, -0.03, 1.65, 0.00, 2.13, 0.03], ['c', 3.60, 0.42, 6.03, 2.10, 6.93, 4.86], ['c', 0.27, 0.84, 0.36, 1.50, 0.36, 2.58], ['c', 0.00, 0.90, -0.03, 1.35, -0.18, 2.16], ['c', -0.78, 3.78, -3.54, 7.08, -8.37, 9.96], ['c', -1.74, 1.05, -3.87, 2.13, -6.18, 3.12], ['c', -0.39, 0.18, -0.75, 0.33, -0.81, 0.36], ['c', -0.06, 0.03, -0.15, 0.06, -0.18, 0.06], ['c', -0.15, 0.00, -0.33, -0.18, -0.33, -0.33], ['c', 0.00, -0.15, 0.06, -0.21, 0.51, -0.48], ['c', 3.00, -1.77, 5.13, -3.21, 6.84, -4.74], ['c', 0.51, -0.45, 1.59, -1.50, 1.95, -1.95], ['c', 1.89, -2.19, 2.88, -4.32, 3.15, -6.78], ['c', 0.06, -0.42, 0.06, -1.77, 0.00, -2.19], ['c', -0.24, -2.01, -0.93, -3.63, -2.04, -4.71], ['c', -0.63, -0.63, -1.29, -1.02, -2.07, -1.20], ['c', -1.62, -0.39, -3.36, 0.15, -4.56, 1.44], ['c', -0.54, 0.60, -1.05, 1.47, -1.32, 2.22], ['l', -0.09, 0.21], ['l', 0.24, -0.12], ['c', 0.39, -0.21, 0.63, -0.24, 1.11, -0.24], ['c', 0.30, 0.00, 0.45, 0.00, 0.66, 0.06], ['c', 1.92, 0.48, 2.85, 2.55, 1.95, 4.38], ['c', -0.45, 0.99, -1.41, 1.62, -2.46, 1.71], ['c', -1.47, 0.09, -2.91, -0.87, -3.39, -2.25], ['c', -0.18, -0.57, -0.21, -1.32, -0.03, -2.28], ['c', 0.39, -2.25, 1.83, -4.20, 3.81, -5.19], ['c', 0.69, -0.36, 1.59, -0.60, 2.37, -0.69], ['z'], ['m', 11.58, 2.52], ['c', 0.84, -0.21, 1.71, 0.30, 1.89, 1.14], ['c', 0.30, 1.17, -0.72, 2.19, -1.89, 1.89], ['c', -0.99, -0.21, -1.50, -1.32, -1.02, -2.25], ['c', 0.18, -0.39, 0.60, -0.69, 1.02, -0.78], ['z'], ['m', 0.00, 7.50], ['c', 0.84, -0.21, 1.71, 0.30, 1.89, 1.14], ['c', 0.21, 0.87, -0.30, 1.71, -1.14, 1.89], ['c', -0.87, 0.21, -1.71, -0.30, -1.89, -1.14], ['c', -0.21, -0.84, 0.30, -1.71, 1.14, -1.89], ['z']], w: 20.153, h: 23.142 },
		'clefs.G': { d: [['M', 9.69, -37.41], ['c', 0.09, -0.09, 0.24, -0.06, 0.36, 0.00], ['c', 0.12, 0.09, 0.57, 0.60, 0.96, 1.11], ['c', 1.77, 2.34, 3.21, 5.85, 3.57, 8.73], ['c', 0.21, 1.56, 0.03, 3.27, -0.45, 4.86], ['c', -0.69, 2.31, -1.92, 4.47, -4.23, 7.44], ['c', -0.30, 0.39, -0.57, 0.72, -0.60, 0.75], ['c', -0.03, 0.06, 0.00, 0.15, 0.18, 0.78], ['c', 0.54, 1.68, 1.38, 4.44, 1.68, 5.49], ['l', 0.09, 0.42], ['l', 0.39, 0.00], ['c', 1.47, 0.09, 2.76, 0.51, 3.96, 1.29], ['c', 1.83, 1.23, 3.06, 3.21, 3.39, 5.52], ['c', 0.09, 0.45, 0.12, 1.29, 0.06, 1.74], ['c', -0.09, 1.02, -0.33, 1.83, -0.75, 2.73], ['c', -0.84, 1.71, -2.28, 3.06, -4.02, 3.72], ['l', -0.33, 0.12], ['l', 0.03, 1.26], ['c', 0.00, 1.74, -0.06, 3.63, -0.21, 4.62], ['c', -0.45, 3.06, -2.19, 5.49, -4.47, 6.21], ['c', -0.57, 0.18, -0.90, 0.21, -1.59, 0.21], ['c', -0.69, 0.00, -1.02, -0.03, -1.65, -0.21], ['c', -1.14, -0.27, -2.13, -0.84, -2.94, -1.65], ['c', -0.99, -0.99, -1.56, -2.16, -1.71, -3.54], ['c', -0.09, -0.81, 0.06, -1.53, 0.45, -2.13], ['c', 0.63, -0.99, 1.83, -1.56, 3.00, -1.53], ['c', 1.50, 0.09, 2.64, 1.32, 2.73, 2.94], ['c', 0.06, 1.47, -0.93, 2.70, -2.37, 2.97], ['c', -0.45, 0.06, -0.84, 0.03, -1.29, -0.09], ['l', -0.21, -0.09], ['l', 0.09, 0.12], ['c', 0.39, 0.54, 0.78, 0.93, 1.32, 1.26], ['c', 1.35, 0.87, 3.06, 1.02, 4.35, 0.36], ['c', 1.44, -0.72, 2.52, -2.28, 2.97, -4.35], ['c', 0.15, -0.66, 0.24, -1.50, 0.30, -3.03], ['c', 0.03, -0.84, 0.03, -2.94, 0.00, -3.00], ['c', -0.03, 0.00, -0.18, 0.00, -0.36, 0.03], ['c', -0.66, 0.12, -0.99, 0.12, -1.83, 0.12], ['c', -1.05, 0.00, -1.71, -0.06, -2.61, -0.30], ['c', -4.02, -0.99, -7.11, -4.35, -7.80, -8.46], ['c', -0.12, -0.66, -0.12, -0.99, -0.12, -1.83], ['c', 0.00, -0.84, 0.00, -1.14, 0.15, -1.92], ['c', 0.36, -2.28, 1.41, -4.62, 3.30, -7.29], ['l', 2.79, -3.60], ['c', 0.54, -0.66, 0.96, -1.20, 0.96, -1.23], ['c', 0.00, -0.03, -0.09, -0.33, -0.18, -0.69], ['c', -0.96, -3.21, -1.41, -5.28, -1.59, -7.68], ['c', -0.12, -1.38, -0.15, -3.09, -0.06, -3.96], ['c', 0.33, -2.67, 1.38, -5.07, 3.12, -7.08], ['c', 0.36, -0.42, 0.99, -1.05, 1.17, -1.14], ['z'], ['m', 2.01, 4.71], ['c', -0.15, -0.30, -0.30, -0.54, -0.30, -0.54], ['c', -0.03, 0.00, -0.18, 0.09, -0.30, 0.21], ['c', -2.40, 1.74, -3.87, 4.20, -4.26, 7.11], ['c', -0.06, 0.54, -0.06, 1.41, -0.03, 1.89], ['c', 0.09, 1.29, 0.48, 3.12, 1.08, 5.22], ['c', 0.15, 0.42, 0.24, 0.78, 0.24, 0.81], ['c', 0.00, 0.03, 0.84, -1.11, 1.23, -1.68], ['c', 1.89, -2.73, 2.88, -5.07, 3.15, -7.53], ['c', 0.09, -0.57, 0.12, -1.74, 0.06, -2.37], ['c', -0.09, -1.23, -0.27, -1.92, -0.87, -3.12], ['z'], ['m', -2.94, 20.70], ['c', -0.21, -0.72, -0.39, -1.32, -0.42, -1.32], ['c', 0.00, 0.00, -1.20, 1.47, -1.86, 2.37], ['c', -2.79, 3.63, -4.02, 6.30, -4.35, 9.30], ['c', -0.03, 0.21, -0.03, 0.69, -0.03, 1.08], ['c', 0.00, 0.69, 0.00, 0.75, 0.06, 1.11], ['c', 0.12, 0.54, 0.27, 0.99, 0.51, 1.47], ['c', 0.69, 1.38, 1.83, 2.55, 3.42, 3.42], ['c', 0.96, 0.54, 2.07, 0.90, 3.21, 1.08], ['c', 0.78, 0.12, 2.04, 0.12, 2.94, -0.03], ['c', 0.51, -0.06, 0.45, -0.03, 0.42, -0.30], ['c', -0.24, -3.33, -0.72, -6.33, -1.62, -10.08], ['c', -0.09, -0.39, -0.18, -0.75, -0.18, -0.78], ['c', -0.03, -0.03, -0.42, 0.00, -0.81, 0.09], ['c', -0.90, 0.18, -1.65, 0.57, -2.22, 1.14], ['c', -0.72, 0.72, -1.08, 1.65, -1.05, 2.64], ['c', 0.06, 0.96, 0.48, 1.83, 1.23, 2.58], ['c', 0.36, 0.36, 0.72, 0.63, 1.17, 0.90], ['c', 0.33, 0.18, 0.36, 0.21, 0.42, 0.33], ['c', 0.18, 0.42, -0.18, 0.90, -0.60, 0.87], ['c', -0.18, -0.03, -0.84, -0.36, -1.26, -0.63], ['c', -0.78, -0.51, -1.38, -1.11, -1.86, -1.83], ['c', -1.77, -2.70, -0.99, -6.42, 1.71, -8.19], ['c', 0.30, -0.21, 0.81, -0.48, 1.17, -0.63], ['c', 0.30, -0.09, 1.02, -0.30, 1.14, -0.30], ['c', 0.06, 0.00, 0.09, 0.00, 0.09, -0.03], ['c', 0.03, -0.03, -0.51, -1.92, -1.23, -4.26], ['z'], ['m', 3.78, 7.41], ['c', -0.18, -0.03, -0.36, -0.06, -0.39, -0.06], ['c', -0.03, 0.00, 0.00, 0.21, 0.18, 1.02], ['c', 0.75, 3.18, 1.26, 6.30, 1.50, 9.09], ['c', 0.06, 0.72, 0.00, 0.69, 0.51, 0.42], ['c', 0.78, -0.36, 1.44, -0.96, 1.98, -1.77], ['c', 1.08, -1.62, 1.20, -3.69, 0.30, -5.55], ['c', -0.81, -1.62, -2.31, -2.79, -4.08, -3.15], ['z']], w: 19.051, h: 57.057 },
		'clefs.perc': { d: [['M', 5.07, -7.44], ['l', 0.09, -0.06], ['l', 1.53, 0.00], ['l', 1.53, 0.00], ['l', 0.09, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 7.35], ['l', 0.00, 7.32], ['l', -0.06, 0.09], ['l', -0.09, 0.06], ['l', -1.53, 0.00], ['l', -1.53, 0.00], ['l', -0.09, -0.06], ['l', -0.06, -0.09], ['l', 0.00, -7.32], ['l', 0.00, -7.35], ['z'], ['m', 6.63, 0.00], ['l', 0.09, -0.06], ['l', 1.53, 0.00], ['l', 1.53, 0.00], ['l', 0.09, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 7.35], ['l', 0.00, 7.32], ['l', -0.06, 0.09], ['l', -0.09, 0.06], ['l', -1.53, 0.00], ['l', -1.53, 0.00], ['l', -0.09, -0.06], ['l', -0.06, -0.09], ['l', 0.00, -7.32], ['l', 0.00, -7.35], ['z']], w: 9.99, h: 14.97 },
		'timesig.common': { d: [['M', 6.66, -7.83], ['c', 0.72, -0.06, 1.41, -0.03, 1.98, 0.09], ['c', 1.20, 0.27, 2.34, 0.96, 3.09, 1.92], ['c', 0.63, 0.81, 1.08, 1.86, 1.14, 2.73], ['c', 0.06, 1.02, -0.51, 1.92, -1.44, 2.22], ['c', -0.24, 0.09, -0.30, 0.09, -0.63, 0.09], ['c', -0.33, 0.00, -0.42, 0.00, -0.63, -0.06], ['c', -0.66, -0.24, -1.14, -0.63, -1.41, -1.20], ['c', -0.15, -0.30, -0.21, -0.51, -0.24, -0.90], ['c', -0.06, -1.08, 0.57, -2.04, 1.56, -2.37], ['c', 0.18, -0.06, 0.27, -0.06, 0.63, -0.06], ['l', 0.45, 0.00], ['c', 0.06, 0.03, 0.09, 0.03, 0.09, 0.00], ['c', 0.00, 0.00, -0.09, -0.12, -0.24, -0.27], ['c', -1.02, -1.11, -2.55, -1.68, -4.08, -1.50], ['c', -1.29, 0.15, -2.04, 0.69, -2.40, 1.74], ['c', -0.36, 0.93, -0.42, 1.89, -0.42, 5.37], ['c', 0.00, 2.97, 0.06, 3.96, 0.24, 4.77], ['c', 0.24, 1.08, 0.63, 1.68, 1.41, 2.07], ['c', 0.81, 0.39, 2.16, 0.45, 3.18, 0.09], ['c', 1.29, -0.45, 2.37, -1.53, 3.03, -2.97], ['c', 0.15, -0.33, 0.33, -0.87, 0.39, -1.17], ['c', 0.09, -0.24, 0.15, -0.36, 0.30, -0.39], ['c', 0.21, -0.03, 0.42, 0.15, 0.39, 0.36], ['c', -0.06, 0.39, -0.42, 1.38, -0.69, 1.89], ['c', -0.96, 1.80, -2.49, 2.94, -4.23, 3.18], ['c', -0.99, 0.12, -2.58, -0.06, -3.63, -0.45], ['c', -0.96, -0.36, -1.71, -0.84, -2.40, -1.50], ['c', -1.11, -1.11, -1.80, -2.61, -2.04, -4.56], ['c', -0.06, -0.60, -0.06, -2.01, 0.00, -2.61], ['c', 0.24, -1.95, 0.90, -3.45, 2.01, -4.56], ['c', 0.69, -0.66, 1.44, -1.11, 2.37, -1.47], ['c', 0.63, -0.24, 1.47, -0.42, 2.22, -0.48], ['z']], w: 13.038, h: 15.689 },
		'timesig.cut': { d: [['M', 6.24, -10.44], ['c', 0.09, -0.06, 0.09, -0.06, 0.48, -0.06], ['c', 0.36, 0.00, 0.36, 0.00, 0.45, 0.06], ['l', 0.06, 0.09], ['l', 0.00, 1.23], ['l', 0.00, 1.26], ['l', 0.27, 0.00], ['c', 1.26, 0.00, 2.49, 0.45, 3.48, 1.29], ['c', 1.05, 0.87, 1.80, 2.28, 1.89, 3.48], ['c', 0.06, 1.02, -0.51, 1.92, -1.44, 2.22], ['c', -0.24, 0.09, -0.30, 0.09, -0.63, 0.09], ['c', -0.33, 0.00, -0.42, 0.00, -0.63, -0.06], ['c', -0.66, -0.24, -1.14, -0.63, -1.41, -1.20], ['c', -0.15, -0.30, -0.21, -0.51, -0.24, -0.90], ['c', -0.06, -1.08, 0.57, -2.04, 1.56, -2.37], ['c', 0.18, -0.06, 0.27, -0.06, 0.63, -0.06], ['l', 0.45, 0.00], ['c', 0.06, 0.03, 0.09, 0.03, 0.09, 0.00], ['c', 0.00, -0.03, -0.45, -0.51, -0.66, -0.69], ['c', -0.87, -0.69, -1.83, -1.05, -2.94, -1.11], ['l', -0.42, 0.00], ['l', 0.00, 7.17], ['l', 0.00, 7.14], ['l', 0.42, 0.00], ['c', 0.69, -0.03, 1.23, -0.18, 1.86, -0.51], ['c', 1.05, -0.51, 1.89, -1.47, 2.46, -2.70], ['c', 0.15, -0.33, 0.33, -0.87, 0.39, -1.17], ['c', 0.09, -0.24, 0.15, -0.36, 0.30, -0.39], ['c', 0.21, -0.03, 0.42, 0.15, 0.39, 0.36], ['c', -0.03, 0.24, -0.21, 0.78, -0.39, 1.20], ['c', -0.96, 2.37, -2.94, 3.90, -5.13, 3.90], ['l', -0.30, 0.00], ['l', 0.00, 1.26], ['l', 0.00, 1.23], ['l', -0.06, 0.09], ['c', -0.09, 0.06, -0.09, 0.06, -0.45, 0.06], ['c', -0.39, 0.00, -0.39, 0.00, -0.48, -0.06], ['l', -0.06, -0.09], ['l', 0.00, -1.29], ['l', 0.00, -1.29], ['l', -0.21, -0.03], ['c', -1.23, -0.21, -2.31, -0.63, -3.21, -1.29], ['c', -0.15, -0.09, -0.45, -0.36, -0.66, -0.57], ['c', -1.11, -1.11, -1.80, -2.61, -2.04, -4.56], ['c', -0.06, -0.60, -0.06, -2.01, 0.00, -2.61], ['c', 0.24, -1.95, 0.93, -3.45, 2.04, -4.59], ['c', 0.42, -0.39, 0.78, -0.66, 1.26, -0.93], ['c', 0.75, -0.45, 1.65, -0.75, 2.61, -0.90], ['l', 0.21, -0.03], ['l', 0.00, -1.29], ['l', 0.00, -1.29], ['z'], ['m', -0.06, 10.44], ['c', 0.00, -5.58, 0.00, -6.99, -0.03, -6.99], ['c', -0.15, 0.00, -0.63, 0.27, -0.87, 0.45], ['c', -0.45, 0.36, -0.75, 0.93, -0.93, 1.77], ['c', -0.18, 0.81, -0.24, 1.80, -0.24, 4.74], ['c', 0.00, 2.97, 0.06, 3.96, 0.24, 4.77], ['c', 0.24, 1.08, 0.66, 1.68, 1.41, 2.07], ['c', 0.12, 0.06, 0.30, 0.12, 0.33, 0.15], ['l', 0.09, 0.00], ['l', 0.00, -6.96], ['z']], w: 13.038, h: 20.97 },
		'timesig.imperfectum': { d: [['M', 13, -5], ['a', 8, 8, 0, 1, 0, 0, 10]], w: 13.038, h: 20.97 },
		'timesig.imperfectum2': { d: [['M', 13, -5], ['a', 8, 8, 0, 1, 0, 0, 10]], w: 13.038, h: 20.97 },
		'timesig.perfectum': { d: [['M', 13, -5], ['a', 8, 8, 0, 1, 0, 0, 10]], w: 13.038, h: 20.97 },
		'timesig.perfectum2': { d: [['M', 13, -5], ['a', 8, 8, 0, 1, 0, 0, 10]], w: 13.038, h: 20.97 },
		'f': { d: [['M', 9.93, -14.28], ['c', 1.53, -0.18, 2.88, 0.45, 3.12, 1.50], ['c', 0.12, 0.51, 0.00, 1.32, -0.27, 1.86], ['c', -0.15, 0.30, -0.42, 0.57, -0.63, 0.69], ['c', -0.69, 0.36, -1.56, 0.03, -1.83, -0.69], ['c', -0.09, -0.24, -0.09, -0.69, 0.00, -0.87], ['c', 0.06, -0.12, 0.21, -0.24, 0.45, -0.42], ['c', 0.42, -0.24, 0.57, -0.45, 0.60, -0.72], ['c', 0.03, -0.33, -0.09, -0.39, -0.63, -0.42], ['c', -0.30, 0.00, -0.45, 0.00, -0.60, 0.03], ['c', -0.81, 0.21, -1.35, 0.93, -1.74, 2.46], ['c', -0.06, 0.27, -0.48, 2.25, -0.48, 2.31], ['c', 0.00, 0.03, 0.39, 0.03, 0.90, 0.03], ['c', 0.72, 0.00, 0.90, 0.00, 0.99, 0.06], ['c', 0.42, 0.15, 0.45, 0.72, 0.03, 0.90], ['c', -0.12, 0.06, -0.24, 0.06, -1.17, 0.06], ['l', -1.05, 0.00], ['l', -0.78, 2.55], ['c', -0.45, 1.41, -0.87, 2.79, -0.96, 3.06], ['c', -0.87, 2.37, -2.37, 4.74, -3.78, 5.91], ['c', -1.05, 0.90, -2.04, 1.23, -3.09, 1.08], ['c', -1.11, -0.18, -1.89, -0.78, -2.04, -1.59], ['c', -0.12, -0.66, 0.15, -1.71, 0.54, -2.19], ['c', 0.69, -0.75, 1.86, -0.54, 2.22, 0.39], ['c', 0.06, 0.15, 0.09, 0.27, 0.09, 0.48], ['c', 0.00, 0.24, -0.03, 0.27, -0.12, 0.42], ['c', -0.03, 0.09, -0.15, 0.18, -0.27, 0.27], ['c', -0.09, 0.06, -0.27, 0.21, -0.36, 0.27], ['c', -0.24, 0.18, -0.36, 0.36, -0.39, 0.60], ['c', -0.03, 0.33, 0.09, 0.39, 0.63, 0.42], ['c', 0.42, 0.00, 0.63, -0.03, 0.90, -0.15], ['c', 0.60, -0.30, 0.96, -0.96, 1.38, -2.64], ['c', 0.09, -0.42, 0.63, -2.55, 1.17, -4.77], ['l', 1.02, -4.08], ['c', 0.00, -0.03, -0.36, -0.03, -0.81, -0.03], ['c', -0.72, 0.00, -0.81, 0.00, -0.93, -0.06], ['c', -0.42, -0.18, -0.39, -0.75, 0.03, -0.90], ['c', 0.09, -0.06, 0.27, -0.06, 1.05, -0.06], ['l', 0.96, 0.00], ['l', 0.00, -0.09], ['c', 0.06, -0.18, 0.30, -0.72, 0.51, -1.17], ['c', 1.20, -2.46, 3.30, -4.23, 5.34, -4.50], ['z']], w: 16.155, h: 19.445 },
		'm': { d: [['M', 2.79, -8.91], ['c', 0.09, 0.00, 0.30, -0.03, 0.45, -0.03], ['c', 0.24, 0.03, 0.30, 0.03, 0.45, 0.12], ['c', 0.36, 0.15, 0.63, 0.54, 0.75, 1.02], ['l', 0.03, 0.21], ['l', 0.33, -0.30], ['c', 0.69, -0.69, 1.38, -1.02, 2.07, -1.02], ['c', 0.27, 0.00, 0.33, 0.00, 0.48, 0.06], ['c', 0.21, 0.09, 0.48, 0.36, 0.63, 0.60], ['c', 0.03, 0.09, 0.12, 0.27, 0.18, 0.42], ['c', 0.03, 0.15, 0.09, 0.27, 0.12, 0.27], ['c', 0.00, 0.00, 0.09, -0.09, 0.18, -0.21], ['c', 0.33, -0.39, 0.87, -0.81, 1.29, -0.99], ['c', 0.78, -0.33, 1.47, -0.21, 2.01, 0.33], ['c', 0.30, 0.33, 0.48, 0.69, 0.60, 1.14], ['c', 0.09, 0.42, 0.06, 0.54, -0.54, 3.06], ['c', -0.33, 1.29, -0.57, 2.40, -0.57, 2.43], ['c', 0.00, 0.12, 0.09, 0.21, 0.21, 0.21], ['c', 0.24, 0.00, 0.75, -0.30, 1.20, -0.72], ['c', 0.45, -0.39, 0.60, -0.45, 0.78, -0.27], ['c', 0.18, 0.18, 0.09, 0.36, -0.45, 0.87], ['c', -1.05, 0.96, -1.83, 1.47, -2.58, 1.71], ['c', -0.93, 0.33, -1.53, 0.21, -1.80, -0.33], ['c', -0.06, -0.15, -0.06, -0.21, -0.06, -0.45], ['c', 0.00, -0.24, 0.03, -0.48, 0.60, -2.82], ['c', 0.42, -1.71, 0.60, -2.64, 0.63, -2.79], ['c', 0.03, -0.57, -0.30, -0.75, -0.84, -0.48], ['c', -0.24, 0.12, -0.54, 0.39, -0.66, 0.63], ['c', -0.03, 0.09, -0.42, 1.38, -0.90, 3.00], ['c', -0.90, 3.15, -0.84, 3.00, -1.14, 3.15], ['l', -0.15, 0.09], ['l', -0.78, 0.00], ['c', -0.60, 0.00, -0.78, 0.00, -0.84, -0.06], ['c', -0.09, -0.03, -0.18, -0.18, -0.18, -0.27], ['c', 0.00, -0.03, 0.36, -1.38, 0.84, -2.97], ['c', 0.57, -2.04, 0.81, -2.97, 0.84, -3.12], ['c', 0.03, -0.54, -0.30, -0.72, -0.84, -0.45], ['c', -0.24, 0.12, -0.57, 0.42, -0.66, 0.63], ['c', -0.06, 0.09, -0.51, 1.44, -1.05, 2.97], ['c', -0.51, 1.56, -0.99, 2.85, -0.99, 2.91], ['c', -0.06, 0.12, -0.21, 0.24, -0.36, 0.30], ['c', -0.12, 0.06, -0.21, 0.06, -0.90, 0.06], ['c', -0.60, 0.00, -0.78, 0.00, -0.84, -0.06], ['c', -0.09, -0.03, -0.18, -0.18, -0.18, -0.27], ['c', 0.00, -0.03, 0.45, -1.38, 0.99, -2.97], ['c', 1.05, -3.18, 1.05, -3.18, 0.93, -3.45], ['c', -0.12, -0.27, -0.39, -0.30, -0.72, -0.15], ['c', -0.54, 0.27, -1.14, 1.17, -1.56, 2.40], ['c', -0.06, 0.15, -0.15, 0.30, -0.18, 0.36], ['c', -0.21, 0.21, -0.57, 0.27, -0.72, 0.09], ['c', -0.09, -0.09, -0.06, -0.21, 0.06, -0.63], ['c', 0.48, -1.26, 1.26, -2.46, 2.01, -3.21], ['c', 0.57, -0.54, 1.20, -0.87, 1.83, -1.02], ['z']], w: 14.687, h: 9.126 },
		'p': { d: [['M', 1.92, -8.70], ['c', 0.27, -0.09, 0.81, -0.06, 1.11, 0.03], ['c', 0.54, 0.18, 0.93, 0.51, 1.17, 0.99], ['c', 0.09, 0.15, 0.15, 0.33, 0.18, 0.36], ['l', 0.00, 0.12], ['l', 0.30, -0.27], ['c', 0.66, -0.60, 1.35, -1.02, 2.13, -1.20], ['c', 0.21, -0.06, 0.33, -0.06, 0.78, -0.06], ['c', 0.45, 0.00, 0.51, 0.00, 0.84, 0.09], ['c', 1.29, 0.33, 2.07, 1.32, 2.25, 2.79], ['c', 0.09, 0.81, -0.09, 2.01, -0.45, 2.79], ['c', -0.54, 1.26, -1.86, 2.55, -3.18, 3.03], ['c', -0.45, 0.18, -0.81, 0.24, -1.29, 0.24], ['c', -0.69, -0.03, -1.35, -0.18, -1.86, -0.45], ['c', -0.30, -0.15, -0.51, -0.18, -0.69, -0.09], ['c', -0.09, 0.03, -0.18, 0.09, -0.18, 0.12], ['c', -0.09, 0.12, -1.05, 2.94, -1.05, 3.06], ['c', 0.00, 0.24, 0.18, 0.48, 0.51, 0.63], ['c', 0.18, 0.06, 0.54, 0.15, 0.75, 0.15], ['c', 0.21, 0.00, 0.36, 0.06, 0.42, 0.18], ['c', 0.12, 0.18, 0.06, 0.42, -0.12, 0.54], ['c', -0.09, 0.03, -0.15, 0.03, -0.78, 0.00], ['c', -1.98, -0.15, -3.81, -0.15, -5.79, 0.00], ['c', -0.63, 0.03, -0.69, 0.03, -0.78, 0.00], ['c', -0.24, -0.15, -0.24, -0.57, 0.03, -0.66], ['c', 0.06, -0.03, 0.48, -0.09, 0.99, -0.12], ['c', 0.87, -0.06, 1.11, -0.09, 1.35, -0.21], ['c', 0.18, -0.06, 0.33, -0.18, 0.39, -0.30], ['c', 0.06, -0.12, 3.24, -9.42, 3.27, -9.60], ['c', 0.06, -0.33, 0.03, -0.57, -0.15, -0.69], ['c', -0.09, -0.06, -0.12, -0.06, -0.30, -0.06], ['c', -0.69, 0.06, -1.53, 1.02, -2.28, 2.61], ['c', -0.09, 0.21, -0.21, 0.45, -0.27, 0.51], ['c', -0.09, 0.12, -0.33, 0.24, -0.48, 0.24], ['c', -0.18, 0.00, -0.36, -0.15, -0.36, -0.30], ['c', 0.00, -0.24, 0.78, -1.83, 1.26, -2.55], ['c', 0.72, -1.11, 1.47, -1.74, 2.28, -1.92], ['z'], ['m', 5.37, 1.47], ['c', -0.27, -0.12, -0.75, -0.03, -1.14, 0.21], ['c', -0.75, 0.48, -1.47, 1.68, -1.89, 3.15], ['c', -0.45, 1.47, -0.42, 2.34, 0.00, 2.70], ['c', 0.45, 0.39, 1.26, 0.21, 1.83, -0.36], ['c', 0.51, -0.51, 0.99, -1.68, 1.38, -3.27], ['c', 0.30, -1.17, 0.33, -1.74, 0.15, -2.13], ['c', -0.09, -0.15, -0.15, -0.21, -0.33, -0.30], ['z']], w: 14.689, h: 13.127 },
		'r': { d: [['M', 6.33, -9.12], ['c', 0.27, -0.03, 0.93, 0.00, 1.20, 0.06], ['c', 0.84, 0.21, 1.23, 0.81, 1.02, 1.53], ['c', -0.24, 0.75, -0.90, 1.17, -1.56, 0.96], ['c', -0.33, -0.09, -0.51, -0.30, -0.66, -0.75], ['c', -0.03, -0.12, -0.09, -0.24, -0.12, -0.30], ['c', -0.09, -0.15, -0.30, -0.24, -0.48, -0.24], ['c', -0.57, 0.00, -1.38, 0.54, -1.65, 1.08], ['c', -0.06, 0.15, -0.33, 1.17, -0.90, 3.27], ['c', -0.57, 2.31, -0.81, 3.12, -0.87, 3.21], ['c', -0.03, 0.06, -0.12, 0.15, -0.18, 0.21], ['l', -0.12, 0.06], ['l', -0.81, 0.03], ['c', -0.69, 0.00, -0.81, 0.00, -0.90, -0.03], ['c', -0.09, -0.06, -0.18, -0.21, -0.18, -0.30], ['c', 0.00, -0.06, 0.39, -1.62, 0.90, -3.51], ['c', 0.84, -3.24, 0.87, -3.45, 0.87, -3.72], ['c', 0.00, -0.21, 0.00, -0.27, -0.03, -0.36], ['c', -0.12, -0.15, -0.21, -0.24, -0.42, -0.24], ['c', -0.24, 0.00, -0.45, 0.15, -0.78, 0.42], ['c', -0.33, 0.36, -0.45, 0.54, -0.72, 1.14], ['c', -0.03, 0.12, -0.21, 0.24, -0.36, 0.27], ['c', -0.12, 0.00, -0.15, 0.00, -0.24, -0.06], ['c', -0.18, -0.12, -0.18, -0.21, -0.06, -0.54], ['c', 0.21, -0.57, 0.42, -0.93, 0.78, -1.32], ['c', 0.54, -0.51, 1.20, -0.81, 1.95, -0.87], ['c', 0.81, -0.03, 1.53, 0.30, 1.92, 0.87], ['l', 0.12, 0.18], ['l', 0.09, -0.09], ['c', 0.57, -0.45, 1.41, -0.84, 2.19, -0.96], ['z']], w: 9.41, h: 9.132 },
		's': { d: [['M', 4.47, -8.73], ['c', 0.09, 0.00, 0.36, -0.03, 0.57, -0.03], ['c', 0.75, 0.03, 1.29, 0.24, 1.71, 0.63], ['c', 0.51, 0.54, 0.66, 1.26, 0.36, 1.83], ['c', -0.24, 0.42, -0.63, 0.57, -1.11, 0.42], ['c', -0.33, -0.09, -0.60, -0.36, -0.60, -0.57], ['c', 0.00, -0.03, 0.06, -0.21, 0.15, -0.39], ['c', 0.12, -0.21, 0.15, -0.33, 0.18, -0.48], ['c', 0.00, -0.24, -0.06, -0.48, -0.15, -0.60], ['c', -0.15, -0.21, -0.42, -0.24, -0.75, -0.15], ['c', -0.27, 0.06, -0.48, 0.18, -0.69, 0.36], ['c', -0.39, 0.39, -0.51, 0.96, -0.33, 1.38], ['c', 0.09, 0.21, 0.42, 0.51, 0.78, 0.72], ['c', 1.11, 0.69, 1.59, 1.11, 1.89, 1.68], ['c', 0.21, 0.39, 0.24, 0.78, 0.15, 1.29], ['c', -0.18, 1.20, -1.17, 2.16, -2.52, 2.52], ['c', -1.02, 0.24, -1.95, 0.12, -2.70, -0.42], ['c', -0.72, -0.51, -0.99, -1.47, -0.60, -2.19], ['c', 0.24, -0.48, 0.72, -0.63, 1.17, -0.42], ['c', 0.33, 0.18, 0.54, 0.45, 0.57, 0.81], ['c', 0.00, 0.21, -0.03, 0.30, -0.33, 0.51], ['c', -0.33, 0.24, -0.39, 0.42, -0.27, 0.69], ['c', 0.06, 0.15, 0.21, 0.27, 0.45, 0.33], ['c', 0.30, 0.09, 0.87, 0.09, 1.20, 0.00], ['c', 0.75, -0.21, 1.23, -0.72, 1.29, -1.35], ['c', 0.03, -0.42, -0.15, -0.81, -0.54, -1.20], ['c', -0.24, -0.24, -0.48, -0.42, -1.41, -1.02], ['c', -0.69, -0.42, -1.05, -0.93, -1.05, -1.47], ['c', 0.00, -0.39, 0.12, -0.87, 0.30, -1.23], ['c', 0.27, -0.57, 0.78, -1.05, 1.38, -1.35], ['c', 0.24, -0.12, 0.63, -0.27, 0.90, -0.30], ['z']], w: 6.632, h: 8.758 },
		'z': { d: [['M', 2.64, -7.95], ['c', 0.36, -0.09, 0.81, -0.03, 1.71, 0.27], ['c', 0.78, 0.21, 0.96, 0.27, 1.74, 0.30], ['c', 0.87, 0.06, 1.02, 0.03, 1.38, -0.21], ['c', 0.21, -0.15, 0.33, -0.15, 0.48, -0.06], ['c', 0.15, 0.09, 0.21, 0.30, 0.15, 0.45], ['c', -0.03, 0.06, -1.26, 1.26, -2.76, 2.67], ['l', -2.73, 2.55], ['l', 0.54, 0.03], ['c', 0.54, 0.03, 0.72, 0.03, 2.01, 0.15], ['c', 0.36, 0.03, 0.90, 0.06, 1.20, 0.09], ['c', 0.66, 0.00, 0.81, -0.03, 1.02, -0.24], ['c', 0.30, -0.30, 0.39, -0.72, 0.27, -1.23], ['c', -0.06, -0.27, -0.06, -0.27, -0.03, -0.39], ['c', 0.15, -0.30, 0.54, -0.27, 0.69, 0.03], ['c', 0.15, 0.33, 0.27, 1.02, 0.27, 1.50], ['c', 0.00, 1.47, -1.11, 2.70, -2.52, 2.79], ['c', -0.57, 0.03, -1.02, -0.09, -2.01, -0.51], ['c', -1.02, -0.42, -1.23, -0.48, -2.13, -0.54], ['c', -0.81, -0.06, -0.96, -0.03, -1.26, 0.18], ['c', -0.12, 0.06, -0.24, 0.12, -0.27, 0.12], ['c', -0.27, 0.00, -0.45, -0.30, -0.36, -0.51], ['c', 0.03, -0.06, 1.32, -1.32, 2.91, -2.79], ['l', 2.88, -2.73], ['c', -0.03, 0.00, -0.21, 0.03, -0.42, 0.06], ['c', -0.21, 0.03, -0.78, 0.09, -1.23, 0.12], ['c', -1.11, 0.12, -1.23, 0.15, -1.95, 0.27], ['c', -0.72, 0.15, -1.17, 0.18, -1.29, 0.09], ['c', -0.27, -0.18, -0.21, -0.75, 0.12, -1.26], ['c', 0.39, -0.60, 0.93, -1.02, 1.59, -1.20], ['z']], w: 8.573, h: 8.743 },
		'+': { d: [['M', 3.48, -9.3], ['c', 0.18, -0.09, 0.36, -0.09, 0.54, 0.00], ['c', 0.18, 0.09, 0.24, 0.15, 0.33, 0.30], ['l', 0.06, 0.15], ['l', 0.00, 1.29], ['l', 0.00, 1.29], ['l', 1.29, 0.00], ['c', 1.23, 0.00, 1.29, 0.00, 1.41, 0.06], ['c', 0.06, 0.03, 0.15, 0.09, 0.18, 0.12], ['c', 0.12, 0.09, 0.21, 0.33, 0.21, 0.48], ['c', 0.00, 0.15, -0.09, 0.39, -0.21, 0.48], ['c', -0.03, 0.03, -0.12, 0.09, -0.18, 0.12], ['c', -0.12, 0.06, -0.18, 0.06, -1.41, 0.06], ['l', -1.29, 0.00], ['l', 0.00, 1.29], ['c', 0.00, 1.23, 0.00, 1.29, -0.06, 1.41], ['c', -0.09, 0.18, -0.15, 0.24, -0.30, 0.33], ['c', -0.21, 0.09, -0.39, 0.09, -0.57, 0.00], ['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33], ['c', -0.06, -0.12, -0.06, -0.18, -0.06, -1.41], ['l', 0.00, -1.29], ['l', -1.29, 0.00], ['c', -1.23, 0.00, -1.29, 0.00, -1.41, -0.06], ['c', -0.18, -0.09, -0.24, -0.15, -0.33, -0.33], ['c', -0.09, -0.18, -0.09, -0.36, 0.00, -0.54], ['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33], ['l', 0.15, -0.06], ['l', 1.26, 0.00], ['l', 1.29, 0.00], ['l', 0.00, -1.29], ['c', 0.00, -1.23, 0.00, -1.29, 0.06, -1.41], ['c', 0.09, -0.18, 0.15, -0.24, 0.33, -0.33], ['z']], w: 7.507, h: 7.515 },
		',': { d: [['M', 1.32, -3.36], ['c', 0.57, -0.15, 1.17, 0.03, 1.59, 0.45], ['c', 0.45, 0.45, 0.60, 0.96, 0.51, 1.89], ['c', -0.09, 1.23, -0.42, 2.46, -0.99, 3.93], ['c', -0.30, 0.72, -0.72, 1.62, -0.78, 1.68], ['c', -0.18, 0.21, -0.51, 0.18, -0.66, -0.06], ['c', -0.03, -0.06, -0.06, -0.15, -0.06, -0.18], ['c', 0.00, -0.06, 0.12, -0.33, 0.24, -0.63], ['c', 0.84, -1.80, 1.02, -2.61, 0.69, -3.24], ['c', -0.12, -0.24, -0.27, -0.36, -0.75, -0.60], ['c', -0.36, -0.15, -0.42, -0.21, -0.60, -0.39], ['c', -0.69, -0.69, -0.69, -1.71, 0.00, -2.40], ['c', 0.21, -0.21, 0.51, -0.39, 0.81, -0.45], ['z']], w: 3.452, h: 8.143 },
		'-': { d: [['M', 0.18, -5.34], ['c', 0.09, -0.06, 0.15, -0.06, 2.31, -0.06], ['c', 2.46, 0.00, 2.37, 0.00, 2.46, 0.21], ['c', 0.12, 0.21, 0.03, 0.42, -0.15, 0.54], ['c', -0.09, 0.06, -0.15, 0.06, -2.28, 0.06], ['c', -2.16, 0.00, -2.22, 0.00, -2.31, -0.06], ['c', -0.27, -0.15, -0.27, -0.54, -0.03, -0.69], ['z']], w: 5.001, h: 0.81 },
		'.': { d: [['M', 1.32, -3.36], ['c', 1.05, -0.27, 2.10, 0.57, 2.10, 1.65], ['c', 0.00, 1.08, -1.05, 1.92, -2.10, 1.65], ['c', -0.90, -0.21, -1.50, -1.14, -1.26, -2.04], ['c', 0.12, -0.63, 0.63, -1.11, 1.26, -1.26], ['z']], w: 3.413, h: 3.402 },
		'scripts.wedge': { d: [['M', -3.66, -7.44], ['c', 0.06, -0.09, 0.00, -0.09, 0.81, 0.03], ['c', 1.86, 0.30, 3.84, 0.30, 5.73, 0.00], ['c', 0.78, -0.12, 0.72, -0.12, 0.78, -0.03], ['c', 0.15, 0.15, 0.12, 0.24, -0.24, 0.60], ['c', -0.93, 0.93, -1.98, 2.76, -2.67, 4.62], ['c', -0.30, 0.78, -0.51, 1.71, -0.51, 2.13], ['c', 0.00, 0.15, 0.00, 0.18, -0.06, 0.27], ['c', -0.12, 0.09, -0.24, 0.09, -0.36, 0.00], ['c', -0.06, -0.09, -0.06, -0.12, -0.06, -0.27], ['c', 0.00, -0.42, -0.21, -1.35, -0.51, -2.13], ['c', -0.69, -1.86, -1.74, -3.69, -2.67, -4.62], ['c', -0.36, -0.36, -0.39, -0.45, -0.24, -0.60], ['z']], w: 7.49, h: 7.752 },
		'scripts.thumb': { d: [['M', -0.54, -3.69], ['c', 0.15, -0.03, 0.36, -0.06, 0.51, -0.06], ['c', 1.44, 0.00, 2.58, 1.11, 2.94, 2.85], ['c', 0.09, 0.48, 0.09, 1.32, 0.00, 1.80], ['c', -0.27, 1.41, -1.08, 2.43, -2.16, 2.73], ['l', -0.18, 0.06], ['l', 0.00, 0.12], ['c', 0.03, 0.06, 0.06, 0.45, 0.09, 0.87], ['c', 0.03, 0.57, 0.03, 0.78, 0.00, 0.84], ['c', -0.09, 0.27, -0.39, 0.48, -0.66, 0.48], ['c', -0.27, 0.00, -0.57, -0.21, -0.66, -0.48], ['c', -0.03, -0.06, -0.03, -0.27, 0.00, -0.84], ['c', 0.03, -0.42, 0.06, -0.81, 0.09, -0.87], ['l', 0.00, -0.12], ['l', -0.18, -0.06], ['c', -1.08, -0.30, -1.89, -1.32, -2.16, -2.73], ['c', -0.09, -0.48, -0.09, -1.32, 0.00, -1.80], ['c', 0.15, -0.84, 0.51, -1.53, 1.02, -2.04], ['c', 0.39, -0.39, 0.84, -0.63, 1.35, -0.75], ['z'], ['m', 1.05, 0.90], ['c', -0.15, -0.09, -0.21, -0.09, -0.45, -0.12], ['c', -0.15, 0.00, -0.30, 0.03, -0.39, 0.03], ['c', -0.57, 0.18, -0.90, 0.72, -1.08, 1.74], ['c', -0.06, 0.48, -0.06, 1.80, 0.00, 2.28], ['c', 0.15, 0.90, 0.42, 1.44, 0.90, 1.65], ['c', 0.18, 0.09, 0.21, 0.09, 0.51, 0.09], ['c', 0.30, 0.00, 0.33, 0.00, 0.51, -0.09], ['c', 0.48, -0.21, 0.75, -0.75, 0.90, -1.65], ['c', 0.03, -0.27, 0.03, -0.54, 0.03, -1.14], ['c', 0.00, -0.60, 0.00, -0.87, -0.03, -1.14], ['c', -0.15, -0.90, -0.45, -1.44, -0.90, -1.65], ['z']], w: 5.955, h: 9.75 },
		'scripts.open': { d: [['M', -0.54, -3.69], ['c', 0.15, -0.03, 0.36, -0.06, 0.51, -0.06], ['c', 1.44, 0.00, 2.58, 1.11, 2.94, 2.85], ['c', 0.09, 0.48, 0.09, 1.32, 0.00, 1.80], ['c', -0.33, 1.74, -1.47, 2.85, -2.91, 2.85], ['c', -1.44, 0.00, -2.58, -1.11, -2.91, -2.85], ['c', -0.09, -0.48, -0.09, -1.32, 0.00, -1.80], ['c', 0.15, -0.84, 0.51, -1.53, 1.02, -2.04], ['c', 0.39, -0.39, 0.84, -0.63, 1.35, -0.75], ['z'], ['m', 1.11, 0.90], ['c', -0.21, -0.09, -0.27, -0.09, -0.51, -0.12], ['c', -0.30, 0.00, -0.42, 0.03, -0.66, 0.15], ['c', -0.24, 0.12, -0.51, 0.39, -0.66, 0.63], ['c', -0.54, 0.93, -0.63, 2.64, -0.21, 3.81], ['c', 0.21, 0.54, 0.51, 0.90, 0.93, 1.11], ['c', 0.21, 0.09, 0.24, 0.09, 0.54, 0.09], ['c', 0.30, 0.00, 0.33, 0.00, 0.54, -0.09], ['c', 0.42, -0.21, 0.72, -0.57, 0.93, -1.11], ['c', 0.36, -0.99, 0.36, -2.37, 0.00, -3.36], ['c', -0.21, -0.54, -0.51, -0.90, -0.90, -1.11], ['z']], w: 5.955, h: 7.5 },
		'scripts.longphrase': { d: [['M', 1.47, -15.09], ['c', 0.36, -0.09, 0.66, -0.18, 0.69, -0.18], ['c', 0.06, 0.00, 0.06, 0.54, 0.06, 11.25], ['l', 0.00, 11.25], ['l', -0.63, 0.15], ['c', -0.66, 0.18, -1.44, 0.39, -1.50, 0.39], ['c', -0.03, 0.00, -0.03, -3.39, -0.03, -11.25], ['l', 0.00, -11.25], ['l', 0.36, -0.09], ['c', 0.21, -0.06, 0.66, -0.18, 1.05, -0.27], ['z']], w: 2.16, h: 23.04 },
		'scripts.mediumphrase': { d: [['M', 1.47, -7.59], ['c', 0.36, -0.09, 0.66, -0.18, 0.69, -0.18], ['c', 0.06, 0.00, 0.06, 0.39, 0.06, 7.50], ['l', 0.00, 7.50], ['l', -0.63, 0.15], ['c', -0.66, 0.18, -1.44, 0.39, -1.50, 0.39], ['c', -0.03, 0.00, -0.03, -2.28, -0.03, -7.50], ['l', 0.00, -7.50], ['l', 0.36, -0.09], ['c', 0.21, -0.06, 0.66, -0.18, 1.05, -0.27], ['z']], w: 2.16, h: 15.54 },
		'scripts.shortphrase': { d: [['M', 1.47, -7.59], ['c', 0.36, -0.09, 0.66, -0.18, 0.69, -0.18], ['c', 0.06, 0.00, 0.06, 0.21, 0.06, 3.75], ['l', 0.00, 3.75], ['l', -0.42, 0.09], ['c', -0.57, 0.18, -1.65, 0.45, -1.71, 0.45], ['c', -0.03, 0.00, -0.03, -0.72, -0.03, -3.75], ['l', 0.00, -3.75], ['l', 0.36, -0.09], ['c', 0.21, -0.06, 0.66, -0.18, 1.05, -0.27], ['z']], w: 2.16, h: 8.04 },
		'scripts.snap': { d: [['M', 4.50, -3.39], ['c', 0.36, -0.03, 0.96, -0.03, 1.35, 0.00], ['c', 1.56, 0.15, 3.15, 0.90, 4.20, 2.01], ['c', 0.24, 0.27, 0.33, 0.42, 0.33, 0.60], ['c', 0.00, 0.27, 0.03, 0.24, -2.46, 2.22], ['c', -1.29, 1.02, -2.40, 1.86, -2.49, 1.92], ['c', -0.18, 0.09, -0.30, 0.09, -0.48, 0.00], ['c', -0.09, -0.06, -1.20, -0.90, -2.49, -1.92], ['c', -2.49, -1.98, -2.46, -1.95, -2.46, -2.22], ['c', 0.00, -0.18, 0.09, -0.33, 0.33, -0.60], ['c', 1.05, -1.08, 2.64, -1.86, 4.17, -2.01], ['z'], ['m', 1.29, 1.17], ['c', -1.47, -0.15, -2.97, 0.30, -4.14, 1.20], ['l', -0.18, 0.15], ['l', 0.06, 0.09], ['c', 0.15, 0.12, 3.63, 2.85, 3.66, 2.85], ['c', 0.03, 0.00, 3.51, -2.73, 3.66, -2.85], ['l', 0.06, -0.09], ['l', -0.18, -0.15], ['c', -0.84, -0.66, -1.89, -1.08, -2.94, -1.20], ['z']], w: 10.38, h: 6.84 } };

	// Custom characters that weren't generated from the font:
	glyphs['noteheads.slash.whole'] = { d: [['M', 5, -5], ['l', 1, 1], ['l', -5, 5], ['l', -1, -1], ['z'], ['m', 4, 6], ['l', -5, -5], ['l', 2, -2], ['l', 5, 5], ['z'], ['m', 0, -2], ['l', 1, 1], ['l', -5, 5], ['l', -1, -1], ['z'], ['m', -4, 6], ['l', -5, -5], ['l', 2, -2], ['l', 5, 5], ['z']], w: 10.81, h: 15.63 };

	glyphs['noteheads.slash.quarter'] = { d: [['M', 9, -6], ['l', 0, 4], ['l', -9, 9], ['l', 0, -4], ['z']], w: 9, h: 9 };

	glyphs['noteheads.harmonic.quarter'] = { d: [['M', 3.63, -4.02], ['c', 0.09, -0.06, 0.18, -0.09, 0.24, -0.03], ['c', 0.03, 0.03, 0.87, 0.93, 1.83, 2.01], ['c', 1.50, 1.65, 1.80, 1.98, 1.80, 2.04], ['c', 0.00, 0.06, -0.30, 0.39, -1.80, 2.04], ['c', -0.96, 1.08, -1.80, 1.98, -1.83, 2.01], ['c', -0.06, 0.06, -0.15, 0.03, -0.24, -0.03], ['c', -0.12, -0.09, -3.54, -3.84, -3.60, -3.93], ['c', -0.03, -0.03, -0.03, -0.09, -0.03, -0.15], ['c', 0.03, -0.06, 3.45, -3.84, 3.63, -3.96], ['z']], w: 7.5, h: 8.165 };

	this.printSymbol = function (x, y, symb, paper, klass) {
		if (!glyphs[symb]) return null;
		var pathArray = this.pathClone(glyphs[symb].d);
		pathArray[0][1] += x;
		pathArray[0][2] += y;
		var path = "";
		for (var i = 0; i < pathArray.length; i++) {
			path += pathArray[i].join(" ");
		}return paper.path({ path: path, stroke: "none", fill: "#000000", 'class': klass });
	};

	this.getPathForSymbol = function (x, y, symb, scalex, scaley) {
		scalex = scalex || 1;
		scaley = scaley || 1;
		if (!glyphs[symb]) return null;
		var pathArray = this.pathClone(glyphs[symb].d);
		if (scalex !== 1 || scaley !== 1) this.pathScale(pathArray, scalex, scaley);
		pathArray[0][1] += x;
		pathArray[0][2] += y;

		return pathArray;
	};

	this.getSymbolWidth = function (symbol) {
		if (glyphs[symbol]) return glyphs[symbol].w;
		return 0;
	};

	this.getSymbolHeight = function (symbol) {
		if (glyphs[symbol]) return glyphs[symbol].h;
		return 0;
	};

	this.symbolHeightInPitches = function (symbol) {
		return this.getSymbolHeight(symbol) / spacing.STEP;
	};

	this.getSymbolAlign = function (symbol) {
		if (symbol.substring(0, 7) === "scripts" && symbol !== "scripts.roll") {
			return "center";
		}
		return "left";
	};

	this.pathClone = function (pathArray) {
		var res = [];
		for (var i = 0, ii = pathArray.length; i < ii; i++) {
			res[i] = [];
			for (var j = 0, jj = pathArray[i].length; j < jj; j++) {
				res[i][j] = pathArray[i][j];
			}
		}
		return res;
	};

	this.pathScale = function (pathArray, kx, ky) {
		for (var i = 0, ii = pathArray.length; i < ii; i++) {
			var p = pathArray[i];
			var j, jj;
			for (j = 1, jj = p.length; j < jj; j++) {
				p[j] *= j % 2 ? kx : ky;
			}
		}
	};

	this.getYCorr = function (symbol) {
		switch (symbol) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "+":
				return -2;
			case "timesig.common":
			case "timesig.cut":
				return 0;
			case "flags.d32nd":
				return -1;
			case "flags.d64th":
				return -2;
			case "flags.u32nd":
				return 1;
			case "flags.u64th":
				return 3;
			case "rests.whole":
				return 1;
			case "rests.half":
				return -1;
			case "rests.8th":
				return -1;
			case "rests.quarter":
				return -1;
			case "rests.16th":
				return -1;
			case "rests.32nd":
				return -1;
			case "rests.64th":
				return -1;
			case "f":
			case "m":
			case "p":
			case "s":
			case "z":
				return -4;
			case "scripts.trill":
			case "scripts.upbow":
			case "scripts.downbow":
				return -2;
			case "scripts.ufermata":
			case "scripts.wedge":
			case "scripts.roll":
			case "scripts.shortphrase":
			case "scripts.longphrase":
				return -1;
			case "scripts.dfermata":
				return 1;
			default:
				return 0;
		}
	};
};
module.exports = new Glyphs(); // we need the glyphs for layout information

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_absolute_element.js: Definition of the AbsoluteElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var spacing = __webpack_require__(1);

// duration - actual musical duration - different from notehead duration in triplets. refer to abcelem to get the notehead duration
// minspacing - spacing which must be taken on top of the width defined by the duration
// type is a meta-type for the element. It is not necessary for drawing, but it is useful to make semantic sense of the element. For instance, it can be used in the element's class name.
var AbsoluteElement = function AbsoluteElement(abcelem, duration, minspacing, type, tuneNumber, options) {
	//console.log("Absolute:",abcelem, type);
	if (!options) options = {};
	this.tuneNumber = tuneNumber;
	this.abcelem = abcelem;
	this.duration = duration;
	this.durationClass = options.durationClassOveride ? options.durationClassOveride : this.duration;
	this.minspacing = minspacing || 0;
	this.x = 0;
	this.children = [];
	this.heads = [];
	this.extra = [];
	this.extraw = 0;
	//this.decs = [];
	this.w = 0;
	this.right = [];
	this.invisible = false;
	this.bottom = undefined;
	this.top = undefined;
	this.type = type;
	// these are the heights of all of the vertical elements that can't be placed until the end of the line.
	// the vertical order of elements that are above is: tempo, part, volume/dynamic, ending/chord, lyric
	// the vertical order of elements that are below is: lyric, chord, volume/dynamic
	this.specialY = {
		tempoHeightAbove: 0,
		partHeightAbove: 0,
		volumeHeightAbove: 0,
		dynamicHeightAbove: 0,
		endingHeightAbove: 0,
		chordHeightAbove: 0,
		lyricHeightAbove: 0,

		lyricHeightBelow: 0,
		chordHeightBelow: 0,
		volumeHeightBelow: 0,
		dynamicHeightBelow: 0
	};
};

// For each of the relative elements that can't be placed in advance (because their vertical placement depends on everything
// else on the line), this iterates through them and sets their pitch. By the time this is called, specialYResolved contains a
// hash with the vertical placement (in pitch units) for each type.
// TODO-PER: I think this needs to be separated by "above" and "below". How do we know that for dynamics at the point where they are being defined, though? We need a pass through all the relative elements to set "above" and "below".
AbsoluteElement.prototype.setUpperAndLowerElements = function (specialYResolved) {
	// specialYResolved contains the actual pitch for each of the classes of elements.
	for (var i = 0; i < this.children.length; i++) {
		var child = this.children[i];
		for (var key in this.specialY) {
			// for each class of element that needs to be placed vertically
			if (this.specialY.hasOwnProperty(key)) {
				if (child[key]) {
					// If this relative element has defined a height for this class of element
					child.pitch = specialYResolved[key];
					if (child.top === undefined) {
						// TODO-PER: HACK! Not sure this is the right place to do this.
						child.setUpperAndLowerElements(specialYResolved);
						this.pushTop(child.top);
						this.pushBottom(child.bottom);
					}
				}
			}
		}
	}
};

AbsoluteElement.prototype.getMinWidth = function () {
	// absolute space taken to the right of the note
	return this.w;
};

AbsoluteElement.prototype.getExtraWidth = function () {
	// space needed to the left of the note
	return -this.extraw;
};

AbsoluteElement.prototype.addExtra = function (extra) {
	if (extra.dx < this.extraw) this.extraw = extra.dx;
	this.extra[this.extra.length] = extra;
	this.addChild(extra);
};

AbsoluteElement.prototype.addHead = function (head) {
	if (head.dx < this.extraw) this.extraw = head.dx;
	this.heads[this.heads.length] = head;
	this.addRight(head);
};

AbsoluteElement.prototype.addRight = function (right) {
	if (right.dx + right.w > this.w) this.w = right.dx + right.w;
	this.right[this.right.length] = right;
	this.addChild(right);
};

AbsoluteElement.prototype.addCentered = function (elem) {
	var half = elem.w / 2;
	if (-half < this.extraw) this.extraw = -half;
	this.extra[this.extra.length] = elem;
	if (elem.dx + half > this.w) this.w = elem.dx + half;
	this.right[this.right.length] = elem;
	this.addChild(elem);
};

AbsoluteElement.prototype.setLimit = function (member, child) {
	if (!child[member]) return;
	if (!this.specialY[member]) this.specialY[member] = child[member];else this.specialY[member] = Math.max(this.specialY[member], child[member]);
};

AbsoluteElement.prototype.addChild = function (child) {
	//console.log("Relative:",child);
	child.parent = this;
	this.children[this.children.length] = child;
	this.pushTop(child.top);
	this.pushBottom(child.bottom);
	this.setLimit('tempoHeightAbove', child);
	this.setLimit('partHeightAbove', child);
	this.setLimit('volumeHeightAbove', child);
	this.setLimit('dynamicHeightAbove', child);
	this.setLimit('endingHeightAbove', child);
	this.setLimit('chordHeightAbove', child);
	this.setLimit('lyricHeightAbove', child);
	this.setLimit('lyricHeightBelow', child);
	this.setLimit('chordHeightBelow', child);
	this.setLimit('volumeHeightBelow', child);
	this.setLimit('dynamicHeightBelow', child);
};

AbsoluteElement.prototype.pushTop = function (top) {
	if (top !== undefined) {
		if (this.top === undefined) this.top = top;else this.top = Math.max(top, this.top);
	}
};

AbsoluteElement.prototype.pushBottom = function (bottom) {
	if (bottom !== undefined) {
		if (this.bottom === undefined) this.bottom = bottom;else this.bottom = Math.min(bottom, this.bottom);
	}
};

AbsoluteElement.prototype.setX = function (x) {
	this.x = x;
	for (var i = 0; i < this.children.length; i++) {
		this.children[i].setX(x);
	}
};

AbsoluteElement.prototype.setHint = function () {
	this.hint = true;
};

AbsoluteElement.prototype.draw = function (renderer, bartop) {
	if (this.invisible) return;
	this.elemset = [];
	renderer.beginGroup();
	for (var i = 0; i < this.children.length; i++) {
		if ( /*ABCJS.write.debugPlacement*/false) {
			if (this.children[i].klass === 'ornament') renderer.printShadedBox(this.x, renderer.calcY(this.children[i].top), this.w, renderer.calcY(this.children[i].bottom) - renderer.calcY(this.children[i].top), "rgb(0,0,200)", 0.3);
		}
		var el = this.children[i].draw(renderer, bartop);
		if (el) this.elemset.push(el);
	}
	var klass = this.type;
	if (this.type === 'note' || this.type === 'rest') {
		klass += ' d' + this.durationClass;
		klass = klass.replace(/\./g, '-');
		if (this.abcelem.pitches) {
			for (var j = 0; j < this.abcelem.pitches.length; j++) {
				klass += ' p' + this.abcelem.pitches[j].pitch;
			}
		}
	}
	var g = renderer.endGroup(klass);
	if (g) this.elemset.push(g);
	if (this.klass) this.setClass("mark", "", "#00ff00");
	if (this.hint) this.setClass("abcjs-hint", "", null);
	var opacity = /*ABCJS.write.debugPlacement*/false ? 0.3 : 0; // Create transparent box that encompasses the element, and not so transparent to debug it.
	var target = renderer.printShadedBox(this.x, renderer.calcY(this.top), this.w, renderer.calcY(this.bottom) - renderer.calcY(this.top), "#000000", opacity);
	var self = this;
	var controller = renderer.controller;
	target.addEventListener('mouseup', function () {
		var classes = [];
		if (self.elemset) {
			for (var j = 0; j < self.elemset.length; j++) {
				var es = self.elemset[j];
				if (es) classes.push(es.getAttribute("class"));
			}
		}
		controller.notifySelect(self, self.tuneNumber, classes);
	});
	this.abcelem.abselem = this;

	var step = spacing.STEP;
};

AbsoluteElement.prototype.isIE = /*@cc_on!@*/false; //IE detector

AbsoluteElement.prototype.setClass = function (addClass, removeClass, color) {
	for (var i = 0; i < this.elemset.length; i++) {
		var el = this.elemset[i];
		el.setAttribute("fill", color);
		var kls = el.getAttribute("class");
		if (!kls) kls = "";
		kls = kls.replace(removeClass, "");
		kls = kls.replace(addClass, "");
		if (addClass.length > 0) {
			if (kls.length > 0 && kls.charAt(kls.length - 1) !== ' ') kls += " ";
			kls += addClass;
		}
		el.setAttribute("class", kls);
	}
};

AbsoluteElement.prototype.highlight = function (klass, color) {
	if (klass === undefined) klass = "abcjs-note_selected";
	if (color === undefined) color = "#ff0000";
	this.setClass(klass, "", color);
};

AbsoluteElement.prototype.unhighlight = function (klass, color) {
	if (klass === undefined) klass = "abcjs-note_selected";
	if (color === undefined) color = "#000000";
	this.setClass("", klass, color);
};

module.exports = AbsoluteElement;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//    abc_tunebook.js: splits a string representing ABC Music Notation into individual tunes.
//    Copyright (C) 2010-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global document */
/*global window, ABCJS, console */

var parseCommon = __webpack_require__(0);
var Parse = __webpack_require__(10);

var tunebook = {};

(function () {
	"use strict";

	tunebook.numberOfTunes = function (abc) {
		var tunes = abc.split("\nX:");
		var num = tunes.length;
		if (num === 0) num = 1;
		return num;
	};

	var TuneBook = tunebook.TuneBook = function (book) {
		var This = this;
		var directives = "";
		book = parseCommon.strip(book);
		var tunes = book.split("\nX:");
		for (var i = 1; i < tunes.length; i++) {
			// Put back the X: that we lost when splitting the tunes.
			tunes[i] = "X:" + tunes[i];
		} // Keep track of the character position each tune starts with.
		var pos = 0;
		This.tunes = [];
		parseCommon.each(tunes, function (tune) {
			This.tunes.push({ abc: tune, startPos: pos });
			pos += tune.length;
		});
		if (This.tunes.length > 1 && !parseCommon.startsWith(This.tunes[0].abc, 'X:')) {
			// If there is only one tune, the X: might be missing, otherwise assume the top of the file is "intertune"
			// There could be file-wide directives in this, if so, we need to insert it into each tune. We can probably get away with
			// just looking for file-wide directives here (before the first tune) and inserting them at the bottom of each tune, since
			// the tune is parsed all at once. The directives will be seen before the engraver begins processing.
			var dir = This.tunes.shift();
			var arrDir = dir.abc.split('\n');
			parseCommon.each(arrDir, function (line) {
				if (parseCommon.startsWith(line, '%%')) directives += line + '\n';
			});
		}
		This.header = directives;

		// Now, the tune ends at a blank line, so truncate it if needed. There may be "intertune" stuff.
		parseCommon.each(This.tunes, function (tune) {
			var end = tune.abc.indexOf('\n\n');
			if (end > 0) tune.abc = tune.abc.substring(0, end);
			tune.pure = tune.abc;
			tune.abc = directives + tune.abc;

			// for the user's convenience, parse and store the title separately. The title is between the first T: and the next \n
			var title = tune.pure.split("T:");
			if (title.length > 1) {
				title = title[1].split("\n");
				tune.title = title[0].replace(/^\s+|\s+$/g, '');
			} else tune.title = "";

			// for the user's convenience, parse and store the id separately. The id is between the first X: and the next \n
			var id = tune.pure.substring(2, tune.pure.indexOf("\n"));
			tune.id = id.replace(/^\s+|\s+$/g, '');
		});
	};

	TuneBook.prototype.getTuneById = function (id) {
		for (var i = 0; i < this.tunes.length; i++) {
			if (this.tunes[i].id === id) return this.tunes[i];
		}
		return null;
	};

	TuneBook.prototype.getTuneByTitle = function (title) {
		for (var i = 0; i < this.tunes.length; i++) {
			if (this.tunes[i].title === title) return this.tunes[i];
		}
		return null;
	};

	tunebook.parseOnly = function (abc, params) {
		var tunes = [];
		var numTunes = tunebook.numberOfTunes(abc);

		// this just needs to be passed in because this tells the engine how many tunes to process.
		var output = [];
		for (var i = 0; i < numTunes; i++) {
			output.push(1);
		}
		function callback() {
			// Don't need to do anything with the parsed tunes.
		}
		return tunebook.renderEngine(callback, output, abc, params);
	};

	tunebook.renderEngine = function (callback, output, abc, params) {
		var ret = [];
		var isArray = function isArray(testObject) {
			return testObject && !testObject.propertyIsEnumerable('length') && (typeof testObject === 'undefined' ? 'undefined' : _typeof(testObject)) === 'object' && typeof testObject.length === 'number';
		};

		// check and normalize input parameters
		if (output === undefined || abc === undefined) return;
		if (!isArray(output)) output = [output];
		if (params === undefined) params = {};
		var currentTune = params.startingTune ? parseInt(params.startingTune, 10) : 0;

		// parse the abc string
		var book = new TuneBook(abc);
		var abcParser = new Parse();

		// output each tune, if it exists. Otherwise clear the div.
		for (var i = 0; i < output.length; i++) {
			var div = output[i];
			if (typeof div === "string") div = document.getElementById(div);
			if (div) {
				if (currentTune >= 0 && currentTune < book.tunes.length) {
					abcParser.parse(book.tunes[currentTune].abc, params);
					var tune = abcParser.getTune();
					ret.push(tune);
					callback(div, tune, i);
				} else div.innerHTML = "";
			}
			currentTune++;
		}
		return ret;
	};
})();

module.exports = tunebook;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * sprintf() for JavaScript v.0.4
 *
 Copyright (c) 2007-present, Alexandru Mărășteanu <hello@alexei.ro>
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:
 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * Neither the name of this software nor the names of its contributors may be
 used to endorse or promote products derived from this software without
 specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
 ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

//function str_repeat(i, m) { for (var o = []; m > 0; o[--m] = i); return(o.join('')); }

var sprintf = function sprintf() {
  var i = 0,
      a,
      f = arguments[i++],
      o = [],
      m,
      p,
      c,
      x;
  while (f) {
    if (m = /^[^\x25]+/.exec(f)) o.push(m[0]);else if (m = /^\x25{2}/.exec(f)) o.push('%');else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
      if ((a = arguments[m[1] || i++]) == null || a == undefined) throw "Too few arguments.";
      if (/[^s]/.test(m[7]) && typeof a != 'number') throw "Expecting number but found " + (typeof a === 'undefined' ? 'undefined' : _typeof(a));
      switch (m[7]) {
        case 'b':
          a = a.toString(2);break;
        case 'c':
          a = String.fromCharCode(a);break;
        case 'd':
          a = parseInt(a);break;
        case 'e':
          a = m[6] ? a.toExponential(m[6]) : a.toExponential();break;
        case 'f':
          a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a);break;
        case 'o':
          a = a.toString(8);break;
        case 's':
          a = (a = String(a)) && m[6] ? a.substring(0, m[6]) : a;break;
        case 'u':
          a = Math.abs(a);break;
        case 'x':
          a = a.toString(16);break;
        case 'X':
          a = a.toString(16).toUpperCase();break;
      }
      a = /[def]/.test(m[7]) && m[2] && a > 0 ? '+' + a : a;
      c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
      x = m[5] - String(a).length;
      p = m[5] ? str_repeat(c, x) : '';
      o.push(m[4] ? a + p : p + a);
    } else throw "Huh ?!";
    f = f.substring(m[0].length);
  }
  return o.join('');
};

module.exports = sprintf;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global window */

var parseCommon = __webpack_require__(0);

var parseDirective = {};

(function () {
	"use strict";

	var tokenizer;
	var warn;
	var multilineVars;
	var tune;
	parseDirective.initialize = function (tokenizer_, warn_, multilineVars_, tune_) {
		tokenizer = tokenizer_;
		warn = warn_;
		multilineVars = multilineVars_;
		tune = tune_;
		initializeFonts();
	};

	function initializeFonts() {
		multilineVars.annotationfont = { face: "Helvetica", size: 12, weight: "normal", style: "normal", decoration: "none" };
		multilineVars.gchordfont = { face: "Helvetica", size: 12, weight: "normal", style: "normal", decoration: "none" };
		multilineVars.historyfont = { face: "\"Times New Roman\"", size: 16, weight: "normal", style: "normal", decoration: "none" };
		multilineVars.infofont = { face: "\"Times New Roman\"", size: 14, weight: "normal", style: "italic", decoration: "none" };
		multilineVars.measurefont = { face: "\"Times New Roman\"", size: 14, weight: "normal", style: "italic", decoration: "none" };
		multilineVars.partsfont = { face: "\"Times New Roman\"", size: 15, weight: "normal", style: "normal", decoration: "none" };
		multilineVars.repeatfont = { face: "\"Times New Roman\"", size: 13, weight: "normal", style: "normal", decoration: "none" };
		multilineVars.textfont = { face: "\"Times New Roman\"", size: 16, weight: "normal", style: "normal", decoration: "none" };
		multilineVars.vocalfont = { face: "\"Times New Roman\"", size: 13, weight: "bold", style: "normal", decoration: "none" };
		multilineVars.wordsfont = { face: "\"Times New Roman\"", size: 16, weight: "normal", style: "normal", decoration: "none" };

		// These fonts are global for the entire tune.
		tune.formatting.composerfont = { face: "\"Times New Roman\"", size: 14, weight: "normal", style: "italic", decoration: "none" };
		tune.formatting.subtitlefont = { face: "\"Times New Roman\"", size: 16, weight: "normal", style: "normal", decoration: "none" };
		tune.formatting.tempofont = { face: "\"Times New Roman\"", size: 15, weight: "bold", style: "normal", decoration: "none" };
		tune.formatting.titlefont = { face: "\"Times New Roman\"", size: 20, weight: "normal", style: "normal", decoration: "none" };
		tune.formatting.footerfont = { face: "\"Times New Roman\"", size: 12, weight: "normal", style: "normal", decoration: "none" };
		tune.formatting.headerfont = { face: "\"Times New Roman\"", size: 12, weight: "normal", style: "normal", decoration: "none" };
		tune.formatting.voicefont = { face: "\"Times New Roman\"", size: 13, weight: "bold", style: "normal", decoration: "none" };

		// these are the default fonts for these element types. In the printer, these fonts might change as the tune progresses.
		tune.formatting.annotationfont = multilineVars.annotationfont;
		tune.formatting.gchordfont = multilineVars.gchordfont;
		tune.formatting.historyfont = multilineVars.historyfont;
		tune.formatting.infofont = multilineVars.infofont;
		tune.formatting.measurefont = multilineVars.measurefont;
		tune.formatting.partsfont = multilineVars.partsfont;
		tune.formatting.repeatfont = multilineVars.repeatfont;
		tune.formatting.textfont = multilineVars.textfont;
		tune.formatting.vocalfont = multilineVars.vocalfont;
		tune.formatting.wordsfont = multilineVars.wordsfont;
	}

	var fontTypeCanHaveBox = { gchordfont: true, measurefont: true, partsfont: true };

	var fontTranslation = function fontTranslation(fontFace) {
		// This translates Postscript fonts for a web alternative.
		// Note that the postscript fonts contain italic and bold info in them, so what is returned is a hash.

		switch (fontFace) {
			case "Arial-Italic":
				return { face: "Arial", weight: "normal", style: "italic", decoration: "none" };
			case "Arial-Bold":
				return { face: "Arial", weight: "bold", style: "normal", decoration: "none" };
			case "Bookman-Demi":
				return { face: "Bookman,serif", weight: "bold", style: "normal", decoration: "none" };
			case "Bookman-DemiItalic":
				return { face: "Bookman,serif", weight: "bold", style: "italic", decoration: "none" };
			case "Bookman-Light":
				return { face: "Bookman,serif", weight: "normal", style: "normal", decoration: "none" };
			case "Bookman-LightItalic":
				return { face: "Bookman,serif", weight: "normal", style: "italic", decoration: "none" };
			case "Courier":
				return { face: "\"Courier New\"", weight: "normal", style: "normal", decoration: "none" };
			case "Courier-Oblique":
				return { face: "\"Courier New\"", weight: "normal", style: "italic", decoration: "none" };
			case "Courier-Bold":
				return { face: "\"Courier New\"", weight: "bold", style: "normal", decoration: "none" };
			case "Courier-BoldOblique":
				return { face: "\"Courier New\"", weight: "bold", style: "italic", decoration: "none" };
			case "AvantGarde-Book":
				return { face: "AvantGarde,Arial", weight: "normal", style: "normal", decoration: "none" };
			case "AvantGarde-BookOblique":
				return { face: "AvantGarde,Arial", weight: "normal", style: "italic", decoration: "none" };
			case "AvantGarde-Demi":
			case "Avant-Garde-Demi":
				return { face: "AvantGarde,Arial", weight: "bold", style: "normal", decoration: "none" };
			case "AvantGarde-DemiOblique":
				return { face: "AvantGarde,Arial", weight: "bold", style: "italic", decoration: "none" };
			case "Helvetica-Oblique":
				return { face: "Helvetica", weight: "normal", style: "italic", decoration: "none" };
			case "Helvetica-Bold":
				return { face: "Helvetica", weight: "bold", style: "normal", decoration: "none" };
			case "Helvetica-BoldOblique":
				return { face: "Helvetica", weight: "bold", style: "italic", decoration: "none" };
			case "Helvetica-Narrow":
				return { face: "\"Helvetica Narrow\",Helvetica", weight: "normal", style: "normal", decoration: "none" };
			case "Helvetica-Narrow-Oblique":
				return { face: "\"Helvetica Narrow\",Helvetica", weight: "normal", style: "italic", decoration: "none" };
			case "Helvetica-Narrow-Bold":
				return { face: "\"Helvetica Narrow\",Helvetica", weight: "bold", style: "normal", decoration: "none" };
			case "Helvetica-Narrow-BoldOblique":
				return { face: "\"Helvetica Narrow\",Helvetica", weight: "bold", style: "italic", decoration: "none" };
			case "Palatino-Roman":
				return { face: "Palatino", weight: "normal", style: "normal", decoration: "none" };
			case "Palatino-Italic":
				return { face: "Palatino", weight: "normal", style: "italic", decoration: "none" };
			case "Palatino-Bold":
				return { face: "Palatino", weight: "bold", style: "normal", decoration: "none" };
			case "Palatino-BoldItalic":
				return { face: "Palatino", weight: "bold", style: "italic", decoration: "none" };
			case "NewCenturySchlbk-Roman":
				return { face: "\"New Century\",serif", weight: "normal", style: "normal", decoration: "none" };
			case "NewCenturySchlbk-Italic":
				return { face: "\"New Century\",serif", weight: "normal", style: "italic", decoration: "none" };
			case "NewCenturySchlbk-Bold":
				return { face: "\"New Century\",serif", weight: "bold", style: "normal", decoration: "none" };
			case "NewCenturySchlbk-BoldItalic":
				return { face: "\"New Century\",serif", weight: "bold", style: "italic", decoration: "none" };
			case "Times":
			case "Times-Roman":
			case "Times-Narrow":
			case "Times-Courier":
			case "Times-New-Roman":
				return { face: "\"Times New Roman\"", weight: "normal", style: "normal", decoration: "none" };
			case "Times-Italic":
			case "Times-Italics":
				return { face: "\"Times New Roman\"", weight: "normal", style: "italic", decoration: "none" };
			case "Times-Bold":
				return { face: "\"Times New Roman\"", weight: "bold", style: "normal", decoration: "none" };
			case "Times-BoldItalic":
				return { face: "\"Times New Roman\"", weight: "bold", style: "italic", decoration: "none" };
			case "ZapfChancery-MediumItalic":
				return { face: "\"Zapf Chancery\",cursive,serif", weight: "normal", style: "normal", decoration: "none" };
			default:
				return null;
		}
	};

	var getFontParameter = function getFontParameter(tokens, currentSetting, str, position, cmd) {
		// Every font parameter has the following format:
		// <face> <utf8> <size> <modifiers> <box>
		// Where:
		// face: either a standard web font name, or a postscript font, enumerated in fontTranslation. This could also be an * or be missing if the face shouldn't change.
		// utf8: This is optional, and specifies utf8. That's all that is supported so the field is just silently ignored.
		// size: The size, in pixels. This may be omitted if the size is not changing.
		// modifiers: zero or more of "bold", "italic", "underline"
		// box: Only applies to the measure numbers, gchords, and the parts. If present, then a box is drawn around the characters.
		// If face is present, then all the modifiers are cleared. If face is absent, then the modifiers are illegal.
		// The face can be a single word, a set of words separated by hyphens, or a quoted string.
		//
		// So, in practicality, there are three types of font definitions: a number only, an asterisk and a number only, or the full definition (with an optional size).
		function processNumberOnly() {
			var size = parseInt(tokens[0].token);
			tokens.shift();
			if (!currentSetting) {
				warn("Can't set just the size of the font since there is no default value.", str, position);
				return { face: "\"Times New Roman\"", weight: "normal", style: "normal", decoration: "none", size: size };
			}
			if (tokens.length === 0) {
				return { face: currentSetting.face, weight: currentSetting.weight, style: currentSetting.style, decoration: currentSetting.decoration, size: size };
			}
			if (tokens.length === 1 && tokens[0].token === "box" && fontTypeCanHaveBox[cmd]) return { face: currentSetting.face, weight: currentSetting.weight, style: currentSetting.style, decoration: currentSetting.decoration, size: size, box: true };
			warn("Extra parameters in font definition.", str, position);
			return { face: currentSetting.face, weight: currentSetting.weight, style: currentSetting.style, decoration: currentSetting.decoration, size: size };
		}

		// format 1: asterisk and number only
		if (tokens[0].token === '*') {
			tokens.shift();
			if (tokens[0].type === 'number') return processNumberOnly();else {
				warn("Expected font size number after *.", str, position);
			}
		}

		// format 2: number only
		if (tokens[0].type === 'number') {
			return processNumberOnly();
		}

		// format 3: whole definition
		var face = [];
		var size;
		var weight = "normal";
		var style = "normal";
		var decoration = "none";
		var box = false;
		var state = 'face';
		var hyphenLast = false;
		while (tokens.length) {
			var currToken = tokens.shift();
			var word = currToken.token.toLowerCase();
			switch (state) {
				case 'face':
					if (hyphenLast || word !== 'utf' && currToken.type !== 'number' && word !== "bold" && word !== "italic" && word !== "underline" && word !== "box") {
						if (face.length > 0 && currToken.token === '-') {
							hyphenLast = true;
							face[face.length - 1] = face[face.length - 1] + currToken.token;
						} else {
							if (hyphenLast) {
								hyphenLast = false;
								face[face.length - 1] = face[face.length - 1] + currToken.token;
							} else face.push(currToken.token);
						}
					} else {
						if (currToken.type === 'number') {
							if (size) {
								warn("Font size specified twice in font definition.", str, position);
							} else {
								size = currToken.token;
							}
							state = 'modifier';
						} else if (word === "bold") weight = "bold";else if (word === "italic") style = "italic";else if (word === "underline") decoration = "underline";else if (word === "box") {
							if (fontTypeCanHaveBox[cmd]) box = true;else warn("This font style doesn't support \"box\"", str, position);
							state = "finished";
						} else if (word === "utf") {
							currToken = tokens.shift(); // this gets rid of the "8" after "utf"
							state = "size";
						} else warn("Unknown parameter " + currToken.token + " in font definition.", str, position);
					}
					break;
				case "size":
					if (currToken.type === 'number') {
						if (size) {
							warn("Font size specified twice in font definition.", str, position);
						} else {
							size = currToken.token;
						}
					} else {
						warn("Expected font size in font definition.", str, position);
					}
					state = 'modifier';
					break;
				case "modifier":
					if (word === "bold") weight = "bold";else if (word === "italic") style = "italic";else if (word === "underline") decoration = "underline";else if (word === "box") {
						if (fontTypeCanHaveBox[cmd]) box = true;else warn("This font style doesn't support \"box\"", str, position);
						state = "finished";
					} else warn("Unknown parameter " + currToken.token + " in font definition.", str, position);
					break;
				case "finished":
					warn("Extra characters found after \"box\" in font definition.", str, position);
					break;
			}
		}

		if (size === undefined) {
			if (!currentSetting) {
				warn("Must specify the size of the font since there is no default value.", str, position);
				size = 12;
			} else size = currentSetting.size;
		} else size = parseFloat(size);

		face = face.join(' ');
		var psFont = fontTranslation(face);
		var font = {};
		if (psFont) {
			font.face = psFont.face;
			font.weight = psFont.weight;
			font.style = psFont.style;
			font.decoration = psFont.decoration;
			font.size = size;
			if (box) font.box = true;
			return font;
		}
		font.face = face;
		font.weight = weight;
		font.style = style;
		font.decoration = decoration;
		font.size = size;
		if (box) font.box = true;
		return font;
	};

	var getChangingFont = function getChangingFont(cmd, tokens, str) {
		if (tokens.length === 0) return "Directive \"" + cmd + "\" requires a font as a parameter.";
		multilineVars[cmd] = getFontParameter(tokens, multilineVars[cmd], str, 0, cmd);
		if (multilineVars.is_in_header) // If the font appears in the header, then it becomes the default font.
			tune.formatting[cmd] = multilineVars[cmd];
		return null;
	};
	var getGlobalFont = function getGlobalFont(cmd, tokens, str) {
		if (tokens.length === 0) return "Directive \"" + cmd + "\" requires a font as a parameter.";
		tune.formatting[cmd] = getFontParameter(tokens, tune.formatting[cmd], str, 0, cmd);
		return null;
	};

	var setScale = function setScale(cmd, tokens) {
		var scratch = "";
		parseCommon.each(tokens, function (tok) {
			scratch += tok.token;
		});
		var num = parseFloat(scratch);
		if (isNaN(num) || num === 0) return "Directive \"" + cmd + "\" requires a number as a parameter.";
		tune.formatting.scale = num;
	};

	var getRequiredMeasurement = function getRequiredMeasurement(cmd, tokens) {
		var points = tokenizer.getMeasurement(tokens);
		if (points.used === 0 || tokens.length !== 0) return { error: "Directive \"" + cmd + "\" requires a measurement as a parameter." };
		return points.value;
	};
	var oneParameterMeasurement = function oneParameterMeasurement(cmd, tokens) {
		var points = tokenizer.getMeasurement(tokens);
		if (points.used === 0 || tokens.length !== 0) return "Directive \"" + cmd + "\" requires a measurement as a parameter.";
		tune.formatting[cmd] = points.value;
		return null;
	};

	var addMultilineVar = function addMultilineVar(key, cmd, tokens, min, max) {
		if (tokens.length !== 1 || tokens[0].type !== 'number') return "Directive \"" + cmd + "\" requires a number as a parameter.";
		var i = tokens[0].intt;
		if (min !== undefined && i < min) return "Directive \"" + cmd + "\" requires a number greater than or equal to " + min + " as a parameter.";
		if (max !== undefined && i > max) return "Directive \"" + cmd + "\" requires a number less than or equal to " + max + " as a parameter.";
		multilineVars[key] = i;
		return null;
	};

	var addMultilineVarBool = function addMultilineVarBool(key, cmd, tokens) {
		var str = addMultilineVar(key, cmd, tokens, 0, 1);
		if (str !== null) return str;
		multilineVars[key] = multilineVars[key] === 1;
		return null;
	};

	var addMultilineVarOneParamChoice = function addMultilineVarOneParamChoice(key, cmd, tokens, choices) {
		if (tokens.length !== 1) return "Directive \"" + cmd + "\" requires one of [ " + choices.join(", ") + " ] as a parameter.";
		var choice = tokens[0].token;
		var found = false;
		for (var i = 0; !found && i < choices.length; i++) {
			if (choices[i] === choice) found = true;
		}
		if (!found) return "Directive \"" + cmd + "\" requires one of [ " + choices.join(", ") + " ] as a parameter.";
		multilineVars[key] = choice;
		return null;
	};

	var midiCmdParam0 = ["nobarlines", "barlines", "beataccents", "nobeataccents", "droneon", "droneoff", "drumon", "drumoff", "fermatafixed", "fermataproportional", "gchordon", "gchordoff", "controlcombo", "temperamentnormal", "noportamento"];
	var midiCmdParam1String = ["gchord", "ptstress", "beatstring"];
	var midiCmdParam1Integer = ["bassvol", "chordvol", "c", "channel", "beatmod", "deltaloudness", "drumbars", "gracedivider", "makechordchannels", "randomchordattack", "chordattack", "stressmodel", "transpose", "rtranspose", "volinc"];
	var midiCmdParam1Integer1OptionalInteger = ["program"];
	var midiCmdParam2Integer = ["ratio", "snt", "bendvelocity", "pitchbend", "control", "temperamentlinear"];
	var midiCmdParam4Integer = ["beat"];
	var midiCmdParam5Integer = ["drone"];
	var midiCmdParam1IntegerOptionalOctave = ["bassprog", "chordprog"];
	var midiCmdParam1String1Integer = ["portamento"];
	var midiCmdParamFraction = ["expand", "grace", "trim"];
	var midiCmdParam1StringVariableIntegers = ["drum", "chordname"];

	var parseMidiCommand = function parseMidiCommand(midi, tune, restOfString) {
		var midi_cmd = midi.shift().token;
		var midi_params = [];
		if (midiCmdParam0.indexOf(midi_cmd) >= 0) {
			// NO PARAMETERS
			if (midi.length !== 0) warn("Unexpected parameter in MIDI " + midi_cmd, restOfString, 0);
		} else if (midiCmdParam1String.indexOf(midi_cmd) >= 0) {
			// ONE STRING PARAMETER
			if (midi.length !== 1) warn("Expected one parameter in MIDI " + midi_cmd, restOfString, 0);else midi_params.push(midi[0].token);
		} else if (midiCmdParam1Integer.indexOf(midi_cmd) >= 0) {
			// ONE INT PARAMETER
			if (midi.length !== 1) warn("Expected one parameter in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "number") warn("Expected one integer parameter in MIDI " + midi_cmd, restOfString, 0);else midi_params.push(midi[0].intt);
		} else if (midiCmdParam1Integer1OptionalInteger.indexOf(midi_cmd) >= 0) {
			// ONE INT PARAMETER, ONE OPTIONAL PARAMETER
			if (midi.length !== 1 && midi.length !== 2) warn("Expected one or two parameters in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "number") warn("Expected integer parameter in MIDI " + midi_cmd, restOfString, 0);else if (midi.length === 2 && midi[1].type !== "number") warn("Expected integer parameter in MIDI " + midi_cmd, restOfString, 0);else {
				midi_params.push(midi[0].intt);
				if (midi.length === 2) midi_params.push(midi[1].intt);
			}
		} else if (midiCmdParam2Integer.indexOf(midi_cmd) >= 0) {
			// TWO INT PARAMETERS
			if (midi.length !== 2) warn("Expected two parameters in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "number" || midi[1].type !== "number") warn("Expected two integer parameters in MIDI " + midi_cmd, restOfString, 0);else {
				midi_params.push(midi[0].intt);
				midi_params.push(midi[1].intt);
			}
		} else if (midiCmdParam1String1Integer.indexOf(midi_cmd) >= 0) {
			// ONE STRING PARAMETER, ONE INT PARAMETER
			if (midi.length !== 2) warn("Expected two parameters in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "alpha" || midi[1].type !== "number") warn("Expected one string and one integer parameters in MIDI " + midi_cmd, restOfString, 0);else {
				midi_params.push(midi[0].token);
				midi_params.push(midi[1].intt);
			}
		} else if (midi_cmd === 'drummap') {
			// BUILD AN OBJECT OF ABC NOTE => MIDI NOTE
			if (midi.length === 2 && midi[0].type === 'alpha' && midi[1].type === 'number') {
				if (!tune.formatting) tune.formatting = {};
				if (!tune.formatting.midi) tune.formatting.midi = {};
				if (!tune.formatting.midi.drummap) tune.formatting.midi.drummap = {};
				tune.formatting.midi.drummap[midi[0].token] = midi[1].intt;
				midi_params = tune.formatting.midi.drummap;
			} else if (midi.length === 3 && midi[0].type === 'punct' && midi[1].type === 'alpha' && midi[2].type === 'number') {
				if (!tune.formatting) tune.formatting = {};
				if (!tune.formatting.midi) tune.formatting.midi = {};
				if (!tune.formatting.midi.drummap) tune.formatting.midi.drummap = {};
				tune.formatting.midi.drummap[midi[0].token + midi[1].token] = midi[2].intt;
				midi_params = tune.formatting.midi.drummap;
			} else {
				warn("Expected one note name and one integer parameter in MIDI " + midi_cmd, restOfString, 0);
			}
		} else if (midiCmdParamFraction.indexOf(midi_cmd) >= 0) {
			// ONE FRACTION PARAMETER
			if (midi.length !== 3) warn("Expected fraction parameter in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "number" || midi[1].token !== "/" || midi[2].type !== "number") warn("Expected fraction parameter in MIDI " + midi_cmd, restOfString, 0);else {
				midi_params.push(midi[0].intt);
				midi_params.push(midi[2].intt);
			}
		} else if (midiCmdParam4Integer.indexOf(midi_cmd) >= 0) {
			// FOUR INT PARAMETERS
			if (midi.length !== 4) warn("Expected four parameters in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "number" || midi[1].type !== "number" || midi[2].type !== "number" || midi[3].type !== "number") warn("Expected four integer parameters in MIDI " + midi_cmd, restOfString, 0);else {
				midi_params.push(midi[0].intt);
				midi_params.push(midi[1].intt);
				midi_params.push(midi[2].intt);
				midi_params.push(midi[3].intt);
			}
		} else if (midiCmdParam5Integer.indexOf(midi_cmd) >= 0) {
			// FIVE INT PARAMETERS
			if (midi.length !== 5) warn("Expected five parameters in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "number" || midi[1].type !== "number" || midi[2].type !== "number" || midi[3].type !== "number" || midi[4].type !== "number") warn("Expected five integer parameters in MIDI " + midi_cmd, restOfString, 0);else {
				midi_params.push(midi[0].intt);
				midi_params.push(midi[1].intt);
				midi_params.push(midi[2].intt);
				midi_params.push(midi[3].intt);
				midi_params.push(midi[4].intt);
			}
		} else if (midiCmdParam1Integer1OptionalInteger.indexOf(midi_cmd) >= 0) {
			// ONE INT PARAMETER, ONE OPTIONAL OCTAVE PARAMETER
			if (midi.length !== 1 || midi.length !== 4) warn("Expected one or two parameters in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "number") warn("Expected integer parameter in MIDI " + midi_cmd, restOfString, 0);else if (midi.length === 4) {
				if (midi[1].token !== "octave") warn("Expected octave parameter in MIDI " + midi_cmd, restOfString, 0);
				if (midi[2].token !== "=") warn("Expected octave parameter in MIDI " + midi_cmd, restOfString, 0);
				if (midi[3].type !== "number") warn("Expected integer parameter for octave in MIDI " + midi_cmd, restOfString, 0);
			} else {
				midi_params.push(midi[0].intt);
				if (midi.length === 4) midi_params.push(midi[3].intt);
			}
		} else if (midiCmdParam1StringVariableIntegers.indexOf(midi_cmd) >= 0) {
			// ONE STRING, VARIABLE INT PARAMETERS
			if (midi.length < 2) warn("Expected string parameter and at least one integer parameter in MIDI " + midi_cmd, restOfString, 0);else if (midi[0].type !== "alpha") warn("Expected string parameter and at least one integer parameter in MIDI " + midi_cmd, restOfString, 0);else {
				var p = midi.shift();
				midi_params.push(p.token);
				while (midi.length > 0) {
					p = midi.shift();
					if (p.type !== "number") warn("Expected integer parameter in MIDI " + midi_cmd, restOfString, 0);
					midi_params.push(p.intt);
				}
			}
		}

		if (tune.hasBeginMusic()) tune.appendElement('midi', -1, -1, { cmd: midi_cmd, params: midi_params });else {
			if (tune.formatting['midi'] === undefined) tune.formatting['midi'] = {};
			tune.formatting['midi'][midi_cmd] = midi_params;
		}
	};

	parseDirective.parseFontChangeLine = function (textstr) {
		var textParts = textstr.split('$');
		if (textParts.length > 1 && multilineVars.setfont) {
			var textarr = [{ text: textParts[0] }];
			for (var i = 1; i < textParts.length; i++) {
				if (textParts[i].charAt(0) === '0') textarr.push({ text: textParts[i].substring(1) });else if (textParts[i].charAt(0) === '1' && multilineVars.setfont[1]) textarr.push({ font: multilineVars.setfont[1], text: textParts[i].substring(1) });else if (textParts[i].charAt(0) === '2' && multilineVars.setfont[2]) textarr.push({ font: multilineVars.setfont[2], text: textParts[i].substring(1) });else if (textParts[i].charAt(0) === '3' && multilineVars.setfont[3]) textarr.push({ font: multilineVars.setfont[3], text: textParts[i].substring(1) });else if (textParts[i].charAt(0) === '4' && multilineVars.setfont[4]) textarr.push({ font: multilineVars.setfont[4], text: textParts[i].substring(1) });else textarr[textarr.length - 1].text += '$' + textParts[i];
			}
			if (textarr.length > 1) return textarr;
		}
		return textstr;
	};

	var positionChoices = ['auto', 'above', 'below', 'hidden'];
	parseDirective.addDirective = function (str) {
		var tokens = tokenizer.tokenize(str, 0, str.length); // 3 or more % in a row, or just spaces after %% is just a comment
		if (tokens.length === 0 || tokens[0].type !== 'alpha') return null;
		var restOfString = str.substring(str.indexOf(tokens[0].token) + tokens[0].token.length);
		restOfString = tokenizer.stripComment(restOfString);
		var cmd = tokens.shift().token.toLowerCase();
		var scratch = "";
		switch (cmd) {
			// The following directives were added to abc_parser_lint, but haven't been implemented here.
			// Most of them are direct translations from the directives that will be parsed in. See abcm2ps's format.txt for info on each of these.
			//					alignbars: { type: "number", optional: true },
			//					aligncomposer: { type: "string", Enum: [ 'left', 'center','right' ], optional: true },
			//					bstemdown: { type: "boolean", optional: true },
			//					continueall: { type: "boolean", optional: true },
			//					dynalign: { type: "boolean", optional: true },
			//					exprabove: { type: "boolean", optional: true },
			//					exprbelow: { type: "boolean", optional: true },
			//					flatbeams: { type: "boolean", optional: true },
			//					gchordbox: { type: "boolean", optional: true },
			//					graceslurs: { type: "boolean", optional: true },
			//					gracespacebefore: { type: "number", optional: true },
			//					gracespaceinside: { type: "number", optional: true },
			//					gracespaceafter: { type: "number", optional: true },
			//					infospace: { type: "number", optional: true },
			//					lineskipfac: { type: "number", optional: true },
			//					maxshrink: { type: "number", optional: true },
			//					maxstaffsep: { type: "number", optional: true },
			//					maxsysstaffsep: { type: "number", optional: true },
			//					notespacingfactor: { type: "number", optional: true },
			//					parskipfac: { type: "number", optional: true },
			//					slurheight: { type: "number", optional: true },
			//					splittune: { type: "boolean", optional: true },
			//					squarebreve: { type: "boolean", optional: true },
			//					stemheight: { type: "number", optional: true },
			//					straightflags: { type: "boolean", optional: true },
			//					stretchstaff: { type: "boolean", optional: true },
			//					titleformat: { type: "string", optional: true },
			case "bagpipes":
				tune.formatting.bagpipes = true;break;
			case "landscape":
				multilineVars.landscape = true;break;
			case "papersize":
				multilineVars.papersize = restOfString;break;
			case "slurgraces":
				tune.formatting.slurgraces = true;break;
			case "stretchlast":
				tune.formatting.stretchlast = true;break;
			case "titlecaps":
				multilineVars.titlecaps = true;break;
			case "titleleft":
				tune.formatting.titleleft = true;break;
			case "measurebox":
				tune.formatting.measurebox = true;break;

			case "vocal":
				return addMultilineVarOneParamChoice("vocalPosition", cmd, tokens, positionChoices);
			case "dynamic":
				return addMultilineVarOneParamChoice("dynamicPosition", cmd, tokens, positionChoices);
			case "gchord":
				return addMultilineVarOneParamChoice("chordPosition", cmd, tokens, positionChoices);
			case "ornament":
				return addMultilineVarOneParamChoice("ornamentPosition", cmd, tokens, positionChoices);
			case "volume":
				return addMultilineVarOneParamChoice("volumePosition", cmd, tokens, positionChoices);

			case "botmargin":
			case "botspace":
			case "composerspace":
			case "indent":
			case "leftmargin":
			case "linesep":
			case "musicspace":
			case "partsspace":
			case "pageheight":
			case "pagewidth":
			case "rightmargin":
			case "staffsep":
			case "staffwidth":
			case "subtitlespace":
			case "sysstaffsep":
			case "systemsep":
			case "textspace":
			case "titlespace":
			case "topmargin":
			case "topspace":
			case "vocalspace":
			case "wordsspace":
				return oneParameterMeasurement(cmd, tokens);
			case "vskip":
				var vskip = getRequiredMeasurement(cmd, tokens);
				if (vskip.error) return vskip.error;
				tune.addSpacing(vskip);
				return null;
			case "scale":
				setScale(cmd, tokens);
				break;
			case "sep":
				if (tokens.length === 0) tune.addSeparator();else {
					var points = tokenizer.getMeasurement(tokens);
					if (points.used === 0) return "Directive \"" + cmd + "\" requires 3 numbers: space above, space below, length of line";
					var spaceAbove = points.value;

					points = tokenizer.getMeasurement(tokens);
					if (points.used === 0) return "Directive \"" + cmd + "\" requires 3 numbers: space above, space below, length of line";
					var spaceBelow = points.value;

					points = tokenizer.getMeasurement(tokens);
					if (points.used === 0 || tokens.length !== 0) return "Directive \"" + cmd + "\" requires 3 numbers: space above, space below, length of line";
					var lenLine = points.value;
					tune.addSeparator(spaceAbove, spaceBelow, lenLine);
				}
				break;
			case "barsperstaff":
				scratch = addMultilineVar('barsperstaff', cmd, tokens);
				if (scratch !== null) return scratch;
				break;
			case "staffnonote":
				scratch = addMultilineVarBool('staffnonote', cmd, tokens);
				if (scratch !== null) return scratch;
				break;
			case "printtempo":
				scratch = addMultilineVarBool('printTempo', cmd, tokens);
				if (scratch !== null) return scratch;
				break;
			case "partsbox":
				scratch = addMultilineVarBool('partsBox', cmd, tokens);
				if (scratch !== null) return scratch;
				multilineVars.partsfont.box = multilineVars.partsBox;
				break;
			case "measurenb":
			case "barnumbers":
				scratch = addMultilineVar('barNumbers', cmd, tokens);
				if (scratch !== null) return scratch;
				break;
			case "begintext":
				multilineVars.inTextBlock = true;
				break;
			case "continueall":
				multilineVars.continueall = true;
				break;
			case "beginps":
				multilineVars.inPsBlock = true;
				warn("Postscript ignored", str, 0);
				break;
			case "deco":
				if (restOfString.length > 0) multilineVars.ignoredDecorations.push(restOfString.substring(0, restOfString.indexOf(' ')));
				warn("Decoration redefinition ignored", str, 0);
				break;
			case "text":
				var textstr = tokenizer.translateString(restOfString);
				tune.addText(parseDirective.parseFontChangeLine(textstr));
				break;
			case "center":
				var centerstr = tokenizer.translateString(restOfString);
				tune.addCentered(parseDirective.parseFontChangeLine(centerstr));
				break;
			case "font":
				// don't need to do anything for this; it is a useless directive
				break;
			case "setfont":
				var sfTokens = tokenizer.tokenize(restOfString, 0, restOfString.length);
				//				var sfDone = false;
				if (sfTokens.length >= 4) {
					if (sfTokens[0].token === '-' && sfTokens[1].type === 'number') {
						var sfNum = parseInt(sfTokens[1].token);
						if (sfNum >= 1 && sfNum <= 4) {
							if (!multilineVars.setfont) multilineVars.setfont = [];
							sfTokens.shift();
							sfTokens.shift();
							multilineVars.setfont[sfNum] = getFontParameter(sfTokens, multilineVars.setfont[sfNum], str, 0, 'setfont');
							//							var sfSize = sfTokens.pop();
							//							if (sfSize.type === 'number') {
							//								sfSize = parseInt(sfSize.token);
							//								var sfFontName = '';
							//								for (var sfi = 2; sfi < sfTokens.length; sfi++)
							//									sfFontName += sfTokens[sfi].token;
							//								multilineVars.setfont[sfNum] = { face: sfFontName, size: sfSize };
							//								sfDone = true;
							//							}
						}
					}
				}
				//				if (!sfDone)
				//					return "Bad parameters: " + cmd;
				break;
			case "gchordfont":
			case "partsfont":
			case "vocalfont":
			case "textfont":
			case "annotationfont":
			case "historyfont":
			case "infofont":
			case "measurefont":
			case "repeatfont":
			case "wordsfont":
				return getChangingFont(cmd, tokens, str);
			case "composerfont":
			case "subtitlefont":
			case "tempofont":
			case "titlefont":
			case "voicefont":
			case "footerfont":
			case "headerfont":
				return getGlobalFont(cmd, tokens, str);
			case "barlabelfont":
			case "barnumberfont":
			case "barnumfont":
				return getChangingFont("measurefont", tokens, str);
			case "staves":
			case "score":
				multilineVars.score_is_present = true;
				var addVoice = function addVoice(id, newStaff, bracket, brace, continueBar) {
					if (newStaff || multilineVars.staves.length === 0) {
						multilineVars.staves.push({ index: multilineVars.staves.length, numVoices: 0 });
					}
					var staff = parseCommon.last(multilineVars.staves);
					if (bracket !== undefined) staff.bracket = bracket;
					if (brace !== undefined) staff.brace = brace;
					if (continueBar) staff.connectBarLines = 'end';
					if (multilineVars.voices[id] === undefined) {
						multilineVars.voices[id] = { staffNum: staff.index, index: staff.numVoices };
						staff.numVoices++;
					}
				};

				var openParen = false;
				var openBracket = false;
				var openBrace = false;
				var justOpenParen = false;
				var justOpenBracket = false;
				var justOpenBrace = false;
				var continueBar = false;
				var lastVoice;
				var addContinueBar = function addContinueBar() {
					continueBar = true;
					if (lastVoice) {
						var ty = 'start';
						if (lastVoice.staffNum > 0) {
							if (multilineVars.staves[lastVoice.staffNum - 1].connectBarLines === 'start' || multilineVars.staves[lastVoice.staffNum - 1].connectBarLines === 'continue') ty = 'continue';
						}
						multilineVars.staves[lastVoice.staffNum].connectBarLines = ty;
					}
				};
				while (tokens.length) {
					var t = tokens.shift();
					switch (t.token) {
						case '(':
							if (openParen) warn("Can't nest parenthesis in %%score", str, t.start);else {
								openParen = true;justOpenParen = true;
							}
							break;
						case ')':
							if (!openParen || justOpenParen) warn("Unexpected close parenthesis in %%score", str, t.start);else openParen = false;
							break;
						case '[':
							if (openBracket) warn("Can't nest brackets in %%score", str, t.start);else {
								openBracket = true;justOpenBracket = true;
							}
							break;
						case ']':
							if (!openBracket || justOpenBracket) warn("Unexpected close bracket in %%score", str, t.start);else {
								openBracket = false;multilineVars.staves[lastVoice.staffNum].bracket = 'end';
							}
							break;
						case '{':
							if (openBrace) warn("Can't nest braces in %%score", str, t.start);else {
								openBrace = true;justOpenBrace = true;
							}
							break;
						case '}':
							if (!openBrace || justOpenBrace) warn("Unexpected close brace in %%score", str, t.start);else {
								openBrace = false;multilineVars.staves[lastVoice.staffNum].brace = 'end';
							}
							break;
						case '|':
							addContinueBar();
							break;
						default:
							var vc = "";
							while (t.type === 'alpha' || t.type === 'number') {
								vc += t.token;
								if (t.continueId) t = tokens.shift();else break;
							}
							var newStaff = !openParen || justOpenParen;
							var bracket = justOpenBracket ? 'start' : openBracket ? 'continue' : undefined;
							var brace = justOpenBrace ? 'start' : openBrace ? 'continue' : undefined;
							addVoice(vc, newStaff, bracket, brace, continueBar);
							justOpenParen = false;
							justOpenBracket = false;
							justOpenBrace = false;
							continueBar = false;
							lastVoice = multilineVars.voices[vc];
							if (cmd === 'staves') addContinueBar();
							break;
					}
				}
				break;

			case "newpage":
				var pgNum = tokenizer.getInt(restOfString);
				tune.addNewPage(pgNum.digits === 0 ? -1 : pgNum.value);
				break;

			case "abc":
				var arr = restOfString.split(' ');
				switch (arr[0]) {
					case "-copyright":
					case "-creator":
					case "-edited-by":
					case "-version":
					case "-charset":
						var subCmd = arr.shift();
						tune.addMetaText(cmd + subCmd, arr.join(' '));
						break;
					default:
						return "Unknown directive: " + cmd + arr[0];
				}
				break;
			case "header":
			case "footer":
				var footerStr = tokenizer.getMeat(restOfString, 0, restOfString.length);
				footerStr = restOfString.substring(footerStr.start, footerStr.end);
				if (footerStr.charAt(0) === '"' && footerStr.charAt(footerStr.length - 1) === '"') footerStr = footerStr.substring(1, footerStr.length - 1);
				var footerArr = footerStr.split('\t');
				var footer = {};
				if (footerArr.length === 1) footer = { left: "", center: footerArr[0], right: "" };else if (footerArr.length === 2) footer = { left: footerArr[0], center: footerArr[1], right: "" };else footer = { left: footerArr[0], center: footerArr[1], right: footerArr[2] };
				if (footerArr.length > 3) warn("Too many tabs in " + cmd + ": " + footerArr.length + " found.", restOfString, 0);

				tune.addMetaTextObj(cmd, footer);
				break;

			case "midi":
				var midi = tokenizer.tokenize(restOfString, 0, restOfString.length, true);
				if (midi.length > 0 && midi[0].token === '=') midi.shift();
				if (midi.length === 0) warn("Expected midi command", restOfString, 0);else parseMidiCommand(midi, tune, restOfString);
				break;

			case "map":
			case "percmap":
			case "playtempo":
			case "auquality":
			case "continuous":
			case "nobarcheck":
				// TODO-PER: Actually handle the parameters of these
				tune.formatting[cmd] = restOfString;
				break;
			default:
				return "Unknown directive: " + cmd;
		}
		return null;
	};
	parseDirective.globalFormatting = function (formatHash) {
		for (var cmd in formatHash) {
			if (formatHash.hasOwnProperty(cmd)) {
				var value = '' + formatHash[cmd];
				var tokens = tokenizer.tokenize(value, 0, value.length);
				var scratch;
				switch (cmd) {
					case "titlefont":
					case "gchordfont":
					case "composerfont":
					case "footerfont":
					case "headerfont":
					case "historyfont":
					case "infofont":
					case "measurefont":
					case "partsfont":
					case "repeatfont":
					case "subtitlefont":
					case "tempofont":
					case "textfont":
					case "voicefont":
					case "vocalfont":
					case "wordsfont":
					case "annotationfont":
						getChangingFont(cmd, tokens, value);
						break;
					case "scale":
						setScale(cmd, tokens);
						break;
					case "partsbox":
						scratch = addMultilineVarBool('partsBox', cmd, tokens);
						if (scratch !== null) warn(scratch);
						multilineVars.partsfont.box = multilineVars.partsBox;
						break;
					default:
						warn("Formatting directive unrecognized: ", cmd, 0);
				}
			}
		}
	};
})();

module.exports = parseDirective;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global window */

var parseCommon = __webpack_require__(0);
var parseDirective = __webpack_require__(7);
var transpose = __webpack_require__(11);

var parseKeyVoice = {};

(function () {
	var tokenizer;
	var warn;
	var multilineVars;
	var tune;
	parseKeyVoice.initialize = function (tokenizer_, warn_, multilineVars_, tune_) {
		tokenizer = tokenizer_;
		warn = warn_;
		multilineVars = multilineVars_;
		tune = tune_;
	};

	parseKeyVoice.standardKey = function (keyName, root, acc, localTranspose) {
		var key1sharp = { acc: 'sharp', note: 'f' };
		var key2sharp = { acc: 'sharp', note: 'c' };
		var key3sharp = { acc: 'sharp', note: 'g' };
		var key4sharp = { acc: 'sharp', note: 'd' };
		var key5sharp = { acc: 'sharp', note: 'A' };
		var key6sharp = { acc: 'sharp', note: 'e' };
		var key7sharp = { acc: 'sharp', note: 'B' };
		var key1flat = { acc: 'flat', note: 'B' };
		var key2flat = { acc: 'flat', note: 'e' };
		var key3flat = { acc: 'flat', note: 'A' };
		var key4flat = { acc: 'flat', note: 'd' };
		var key5flat = { acc: 'flat', note: 'G' };
		var key6flat = { acc: 'flat', note: 'c' };
		var key7flat = { acc: 'flat', note: 'F' };

		var keys = {
			'C#': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp],
			'A#m': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp],
			'G#Mix': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp],
			'D#Dor': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp],
			'E#Phr': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp],
			'F#Lyd': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp],
			'B#Loc': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp],

			'F#': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp],
			'D#m': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp],
			'C#Mix': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp],
			'G#Dor': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp],
			'A#Phr': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp],
			'BLyd': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp],
			'E#Loc': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp],

			'B': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp],
			'G#m': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp],
			'F#Mix': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp],
			'C#Dor': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp],
			'D#Phr': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp],
			'ELyd': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp],
			'A#Loc': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp],

			'E': [key1sharp, key2sharp, key3sharp, key4sharp],
			'C#m': [key1sharp, key2sharp, key3sharp, key4sharp],
			'BMix': [key1sharp, key2sharp, key3sharp, key4sharp],
			'F#Dor': [key1sharp, key2sharp, key3sharp, key4sharp],
			'G#Phr': [key1sharp, key2sharp, key3sharp, key4sharp],
			'ALyd': [key1sharp, key2sharp, key3sharp, key4sharp],
			'D#Loc': [key1sharp, key2sharp, key3sharp, key4sharp],

			'A': [key1sharp, key2sharp, key3sharp],
			'F#m': [key1sharp, key2sharp, key3sharp],
			'EMix': [key1sharp, key2sharp, key3sharp],
			'BDor': [key1sharp, key2sharp, key3sharp],
			'C#Phr': [key1sharp, key2sharp, key3sharp],
			'DLyd': [key1sharp, key2sharp, key3sharp],
			'G#Loc': [key1sharp, key2sharp, key3sharp],

			'D': [key1sharp, key2sharp],
			'Bm': [key1sharp, key2sharp],
			'AMix': [key1sharp, key2sharp],
			'EDor': [key1sharp, key2sharp],
			'F#Phr': [key1sharp, key2sharp],
			'GLyd': [key1sharp, key2sharp],
			'C#Loc': [key1sharp, key2sharp],

			'G': [key1sharp],
			'Em': [key1sharp],
			'DMix': [key1sharp],
			'ADor': [key1sharp],
			'BPhr': [key1sharp],
			'CLyd': [key1sharp],
			'F#Loc': [key1sharp],

			'C': [],
			'Am': [],
			'GMix': [],
			'DDor': [],
			'EPhr': [],
			'FLyd': [],
			'BLoc': [],

			'F': [key1flat],
			'Dm': [key1flat],
			'CMix': [key1flat],
			'GDor': [key1flat],
			'APhr': [key1flat],
			'BbLyd': [key1flat],
			'ELoc': [key1flat],

			'Bb': [key1flat, key2flat],
			'Gm': [key1flat, key2flat],
			'FMix': [key1flat, key2flat],
			'CDor': [key1flat, key2flat],
			'DPhr': [key1flat, key2flat],
			'EbLyd': [key1flat, key2flat],
			'ALoc': [key1flat, key2flat],

			'Eb': [key1flat, key2flat, key3flat],
			'Cm': [key1flat, key2flat, key3flat],
			'BbMix': [key1flat, key2flat, key3flat],
			'FDor': [key1flat, key2flat, key3flat],
			'GPhr': [key1flat, key2flat, key3flat],
			'AbLyd': [key1flat, key2flat, key3flat],
			'DLoc': [key1flat, key2flat, key3flat],

			'Ab': [key1flat, key2flat, key3flat, key4flat],
			'Fm': [key1flat, key2flat, key3flat, key4flat],
			'EbMix': [key1flat, key2flat, key3flat, key4flat],
			'BbDor': [key1flat, key2flat, key3flat, key4flat],
			'CPhr': [key1flat, key2flat, key3flat, key4flat],
			'DbLyd': [key1flat, key2flat, key3flat, key4flat],
			'GLoc': [key1flat, key2flat, key3flat, key4flat],

			'Db': [key1flat, key2flat, key3flat, key4flat, key5flat],
			'Bbm': [key1flat, key2flat, key3flat, key4flat, key5flat],
			'AbMix': [key1flat, key2flat, key3flat, key4flat, key5flat],
			'EbDor': [key1flat, key2flat, key3flat, key4flat, key5flat],
			'FPhr': [key1flat, key2flat, key3flat, key4flat, key5flat],
			'GbLyd': [key1flat, key2flat, key3flat, key4flat, key5flat],
			'CLoc': [key1flat, key2flat, key3flat, key4flat, key5flat],

			'Gb': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat],
			'Ebm': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat],
			'DbMix': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat],
			'AbDor': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat],
			'BbPhr': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat],
			'CbLyd': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat],
			'FLoc': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat],

			'Cb': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat, key7flat],
			'Abm': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat, key7flat],
			'GbMix': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat, key7flat],
			'DbDor': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat, key7flat],
			'EbPhr': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat, key7flat],
			'FbLyd': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat, key7flat],
			'BbLoc': [key1flat, key2flat, key3flat, key4flat, key5flat, key6flat, key7flat],

			// The following are not in the 2.0 spec, but seem normal enough.
			// TODO-PER: These SOUND the same as what's written, but they aren't right
			'A#': [key1flat, key2flat],
			'B#': [],
			'D#': [key1flat, key2flat, key3flat],
			'E#': [key1flat],
			'G#': [key1flat, key2flat, key3flat, key4flat],
			'Gbm': [key1sharp, key2sharp, key3sharp, key4sharp, key5sharp, key6sharp, key7sharp]
		};

		return transpose.keySignature(multilineVars, keys, keyName, root, acc, localTranspose);
	};

	var clefLines = {
		'treble': { clef: 'treble', pitch: 4, mid: 0 },
		'treble+8': { clef: 'treble+8', pitch: 4, mid: 0 },
		'treble-8': { clef: 'treble-8', pitch: 4, mid: 0 },
		'treble1': { clef: 'treble', pitch: 2, mid: 2 },
		'treble2': { clef: 'treble', pitch: 4, mid: 0 },
		'treble3': { clef: 'treble', pitch: 6, mid: -2 },
		'treble4': { clef: 'treble', pitch: 8, mid: -4 },
		'treble5': { clef: 'treble', pitch: 10, mid: -6 },
		'perc': { clef: 'perc', pitch: 6, mid: 0 },
		'none': { clef: 'none', mid: 0 },
		'bass': { clef: 'bass', pitch: 8, mid: -12 },
		'bass+8': { clef: 'bass+8', pitch: 8, mid: -12 },
		'bass-8': { clef: 'bass-8', pitch: 8, mid: -12 },
		'bass+16': { clef: 'bass', pitch: 8, mid: -12 },
		'bass-16': { clef: 'bass', pitch: 8, mid: -12 },
		'bass1': { clef: 'bass', pitch: 2, mid: -6 },
		'bass2': { clef: 'bass', pitch: 4, mid: -8 },
		'bass3': { clef: 'bass', pitch: 6, mid: -10 },
		'bass4': { clef: 'bass', pitch: 8, mid: -12 },
		'bass5': { clef: 'bass', pitch: 10, mid: -14 },
		'tenor': { clef: 'alto', pitch: 8, mid: -8 },
		'tenor1': { clef: 'alto', pitch: 2, mid: -2 },
		'tenor2': { clef: 'alto', pitch: 4, mid: -4 },
		'tenor3': { clef: 'alto', pitch: 6, mid: -6 },
		'tenor4': { clef: 'alto', pitch: 8, mid: -8 },
		'tenor5': { clef: 'alto', pitch: 10, mid: -10 },
		'alto': { clef: 'alto', pitch: 6, mid: -6 },
		'alto1': { clef: 'alto', pitch: 2, mid: -2 },
		'alto2': { clef: 'alto', pitch: 4, mid: -4 },
		'alto3': { clef: 'alto', pitch: 6, mid: -6 },
		'alto4': { clef: 'alto', pitch: 8, mid: -8 },
		'alto5': { clef: 'alto', pitch: 10, mid: -10 },
		'alto+8': { clef: 'alto+8', pitch: 6, mid: -6 },
		'alto-8': { clef: 'alto-8', pitch: 6, mid: -6 }
	};

	var calcMiddle = function calcMiddle(clef, oct) {
		var value = clefLines[clef];
		var mid = value ? value.mid : 0;
		return mid + oct;
	};

	parseKeyVoice.fixClef = function (clef) {
		var value = clefLines[clef.type];
		if (value) {
			clef.clefPos = value.pitch;
			clef.type = value.clef;
		}
	};

	parseKeyVoice.deepCopyKey = function (key) {
		var ret = { accidentals: [], root: key.root, acc: key.acc, mode: key.mode };
		parseCommon.each(key.accidentals, function (k) {
			ret.accidentals.push(parseCommon.clone(k));
		});
		return ret;
	};

	var pitches = { A: 5, B: 6, C: 0, D: 1, E: 2, F: 3, G: 4, a: 12, b: 13, c: 7, d: 8, e: 9, f: 10, g: 11 };

	parseKeyVoice.addPosToKey = function (clef, key) {
		// Shift the key signature from the treble positions to whatever position is needed for the clef.
		// This may put the key signature unnaturally high or low, so if it does, then shift it.
		var mid = clef.verticalPos;
		parseCommon.each(key.accidentals, function (acc) {
			var pitch = pitches[acc.note];
			pitch = pitch - mid;
			acc.verticalPos = pitch;
		});
		if (key.impliedNaturals) parseCommon.each(key.impliedNaturals, function (acc) {
			var pitch = pitches[acc.note];
			pitch = pitch - mid;
			acc.verticalPos = pitch;
		});

		if (mid < -10) {
			parseCommon.each(key.accidentals, function (acc) {
				acc.verticalPos -= 7;
				if (acc.verticalPos >= 11 || acc.verticalPos === 10 && acc.acc === 'flat') acc.verticalPos -= 7;
				if (acc.note === 'A' && acc.acc === 'sharp') acc.verticalPos -= 7;
				if ((acc.note === 'G' || acc.note === 'F') && acc.acc === 'flat') acc.verticalPos -= 7;
			});
			if (key.impliedNaturals) parseCommon.each(key.impliedNaturals, function (acc) {
				acc.verticalPos -= 7;
				if (acc.verticalPos >= 11 || acc.verticalPos === 10 && acc.acc === 'flat') acc.verticalPos -= 7;
				if (acc.note === 'A' && acc.acc === 'sharp') acc.verticalPos -= 7;
				if ((acc.note === 'G' || acc.note === 'F') && acc.acc === 'flat') acc.verticalPos -= 7;
			});
		} else if (mid < -4) {
			parseCommon.each(key.accidentals, function (acc) {
				acc.verticalPos -= 7;
				if (mid === -8 && (acc.note === 'f' || acc.note === 'g') && acc.acc === 'sharp') acc.verticalPos -= 7;
			});
			if (key.impliedNaturals) parseCommon.each(key.impliedNaturals, function (acc) {
				acc.verticalPos -= 7;
				if (mid === -8 && (acc.note === 'f' || acc.note === 'g') && acc.acc === 'sharp') acc.verticalPos -= 7;
			});
		} else if (mid >= 7) {
			parseCommon.each(key.accidentals, function (acc) {
				acc.verticalPos += 7;
			});
			if (key.impliedNaturals) parseCommon.each(key.impliedNaturals, function (acc) {
				acc.verticalPos += 7;
			});
		}
	};

	parseKeyVoice.fixKey = function (clef, key) {
		var fixedKey = parseCommon.clone(key);
		parseKeyVoice.addPosToKey(clef, fixedKey);
		return fixedKey;
	};

	var parseMiddle = function parseMiddle(str) {
		var i = 0;
		var p = str.charAt(i++);
		if (p === '^' || p === '_') p = str.charAt(i++);
		var mid = pitches[p];
		if (mid === undefined) mid = 6; // If a legal middle note wasn't received, just ignore it.
		for (; i < str.length; i++) {
			if (str.charAt(i) === ',') mid -= 7;else if (str.charAt(i) === "'") mid += 7;else break;
		}
		return { mid: mid - 6, str: str.substring(i) }; // We get the note in the middle of the staff. We want the note that appears as the first ledger line below the staff.
	};

	var normalizeAccidentals = function normalizeAccidentals(accs) {
		for (var i = 0; i < accs.length; i++) {
			if (accs[i].note === 'b') accs[i].note = 'B';else if (accs[i].note === 'a') accs[i].note = 'A';else if (accs[i].note === 'F') accs[i].note = 'f';else if (accs[i].note === 'E') accs[i].note = 'e';else if (accs[i].note === 'D') accs[i].note = 'd';else if (accs[i].note === 'C') accs[i].note = 'c';else if (accs[i].note === 'G' && accs[i].acc === 'sharp') accs[i].note = 'g';else if (accs[i].note === 'g' && accs[i].acc === 'flat') accs[i].note = 'G';
		}
	};

	parseKeyVoice.parseKey = function (str) // (and clef)
	{
		// returns:
		//		{ foundClef: true, foundKey: true }
		// Side effects:
		//		calls warn() when there is a syntax error
		//		sets these members of multilineVars:
		//			clef
		//			key
		//			style
		//
		// The format is:
		// K: [⟨key⟩] [⟨modifiers⟩*]
		// modifiers are any of the following in any order:
		//  [⟨clef⟩] [middle=⟨pitch⟩] [transpose=[-]⟨number⟩] [stafflines=⟨number⟩] [staffscale=⟨number⟩][style=⟨style⟩]
		// key is none|HP|Hp|⟨specified_key⟩
		// clef is [clef=] [⟨clef type⟩] [⟨line number⟩] [+8|-8]
		// specified_key is ⟨pitch⟩[#|b][mode(first three chars are significant)][accidentals*]
		if (str.length === 0) {
			// an empty K: field is the same as K:none
			str = 'none';
		}
		var tokens = tokenizer.tokenize(str, 0, str.length);
		var ret = {};

		// first the key
		switch (tokens[0].token) {
			case 'HP':
				parseDirective.addDirective("bagpipes");
				multilineVars.key = { root: "HP", accidentals: [], acc: "", mode: "" };
				ret.foundKey = true;
				tokens.shift();
				break;
			case 'Hp':
				parseDirective.addDirective("bagpipes");
				multilineVars.key = { root: "Hp", accidentals: [{ acc: 'natural', note: 'g' }, { acc: 'sharp', note: 'f' }, { acc: 'sharp', note: 'c' }], acc: "", mode: "" };
				ret.foundKey = true;
				tokens.shift();
				break;
			case 'none':
				// we got the none key - that's the same as C to us
				multilineVars.key = { root: "none", accidentals: [], acc: "", mode: "" };
				ret.foundKey = true;
				tokens.shift();
				break;
			default:
				var retPitch = tokenizer.getKeyPitch(tokens[0].token);
				if (retPitch.len > 0) {
					ret.foundKey = true;
					var acc = "";
					var mode = "";
					// The accidental and mode might be attached to the pitch, so we might want to just remove the first character.
					if (tokens[0].token.length > 1) tokens[0].token = tokens[0].token.substring(1);else tokens.shift();
					var key = retPitch.token;
					// We got a pitch to start with, so we might also have an accidental and a mode
					if (tokens.length > 0) {
						var retAcc = tokenizer.getSharpFlat(tokens[0].token);
						if (retAcc.len > 0) {
							if (tokens[0].token.length > 1) tokens[0].token = tokens[0].token.substring(1);else tokens.shift();
							key += retAcc.token;
							acc = retAcc.token;
						}
						if (tokens.length > 0) {
							var retMode = tokenizer.getMode(tokens[0].token);
							if (retMode.len > 0) {
								tokens.shift();
								key += retMode.token;
								mode = retMode.token;
							}
						}
						// Be sure that the key specified is in the list: not all keys are physically possible, like Cbmin.
						if (parseKeyVoice.standardKey(key, retPitch.token, acc, 0) === undefined) {
							warn("Unsupported key signature: " + key, str, 0);
							return ret;
						}
					}
					// We need to do a deep copy because we are going to modify it
					var oldKey = parseKeyVoice.deepCopyKey(multilineVars.key);
					//TODO-PER: HACK! To get the local transpose to work, the transposition is done for each line. This caused the global transposition variable to be factored in twice, so, instead of rewriting that right now, I'm just subtracting one of them here.
					var keyCompensate = multilineVars.globalTranspose ? -multilineVars.globalTranspose : 0;
					multilineVars.key = parseKeyVoice.deepCopyKey(parseKeyVoice.standardKey(key, retPitch.token, acc, keyCompensate));
					multilineVars.key.mode = mode;
					if (oldKey) {
						// Add natural in all places that the old key had an accidental.
						var kk;
						for (var k = 0; k < multilineVars.key.accidentals.length; k++) {
							for (kk = 0; kk < oldKey.accidentals.length; kk++) {
								if (oldKey.accidentals[kk].note && multilineVars.key.accidentals[k].note.toLowerCase() === oldKey.accidentals[kk].note.toLowerCase()) oldKey.accidentals[kk].note = null;
							}
						}
						for (kk = 0; kk < oldKey.accidentals.length; kk++) {
							if (oldKey.accidentals[kk].note) {
								if (!multilineVars.key.impliedNaturals) multilineVars.key.impliedNaturals = [];
								multilineVars.key.impliedNaturals.push({ acc: 'natural', note: oldKey.accidentals[kk].note });
							}
						}
					}
				}
				break;
		}

		// There are two special cases of deprecated syntax. Ignore them if they occur
		if (tokens.length === 0) return ret;
		if (tokens[0].token === 'exp') tokens.shift();
		if (tokens.length === 0) return ret;
		if (tokens[0].token === 'oct') tokens.shift();

		// now see if there are extra accidentals
		if (tokens.length === 0) return ret;
		var accs = tokenizer.getKeyAccidentals2(tokens);
		if (accs.warn) warn(accs.warn, str, 0);
		// If we have extra accidentals, first replace ones that are of the same pitch before adding them to the end.
		if (accs.accs) {
			if (!ret.foundKey) {
				// if there are only extra accidentals, make sure this is set.
				ret.foundKey = true;
				multilineVars.key = { root: "none", acc: "", mode: "", accidentals: [] };
			}
			normalizeAccidentals(accs.accs);
			for (var i = 0; i < accs.accs.length; i++) {
				var found = false;
				for (var j = 0; j < multilineVars.key.accidentals.length && !found; j++) {
					if (multilineVars.key.accidentals[j].note === accs.accs[i].note) {
						found = true;
						if (multilineVars.key.accidentals[j].acc !== accs.accs[i].acc) {
							// If the accidental is different, then replace it. If it is the same, then the declaration was redundant, so just ignore it.
							multilineVars.key.accidentals[j].acc = accs.accs[i].acc;
							if (!multilineVars.key.explicitAccidentals) multilineVars.key.explicitAccidentals = [];
							multilineVars.key.explicitAccidentals.push(accs.accs[i]);
						}
					}
				}
				if (!found) {
					if (!multilineVars.key.explicitAccidentals) multilineVars.key.explicitAccidentals = [];
					multilineVars.key.explicitAccidentals.push(accs.accs[i]);
					multilineVars.key.accidentals.push(accs.accs[i]);
					if (multilineVars.key.impliedNaturals) {
						for (var kkk = 0; kkk < multilineVars.key.impliedNaturals.length; kkk++) {
							if (multilineVars.key.impliedNaturals[kkk].note === accs.accs[i].note) multilineVars.key.impliedNaturals.splice(kkk, 1);
						}
					}
				}
			}
		}

		// Now see if any optional parameters are present. They have the form "key=value", except that "clef=" is optional
		var token;
		while (tokens.length > 0) {
			switch (tokens[0].token) {
				case "m":
				case "middle":
					tokens.shift();
					if (tokens.length === 0) {
						warn("Expected = after middle", str, 0);return ret;
					}
					token = tokens.shift();
					if (token.token !== "=") {
						warn("Expected = after middle", str, token.start);break;
					}
					if (tokens.length === 0) {
						warn("Expected parameter after middle=", str, 0);return ret;
					}
					var pitch = tokenizer.getPitchFromTokens(tokens);
					if (pitch.warn) warn(pitch.warn, str, 0);
					if (pitch.position) multilineVars.clef.verticalPos = pitch.position - 6; // we get the position from the middle line, but want to offset it to the first ledger line.
					break;
				case "transpose":
					tokens.shift();
					if (tokens.length === 0) {
						warn("Expected = after transpose", str, 0);return ret;
					}
					token = tokens.shift();
					if (token.token !== "=") {
						warn("Expected = after transpose", str, token.start);break;
					}
					if (tokens.length === 0) {
						warn("Expected parameter after transpose=", str, 0);return ret;
					}
					if (tokens[0].type !== 'number') {
						warn("Expected number after transpose", str, tokens[0].start);break;
					}
					multilineVars.clef.transpose = tokens[0].intt;
					tokens.shift();
					break;
				case "stafflines":
					tokens.shift();
					if (tokens.length === 0) {
						warn("Expected = after stafflines", str, 0);return ret;
					}
					token = tokens.shift();
					if (token.token !== "=") {
						warn("Expected = after stafflines", str, token.start);break;
					}
					if (tokens.length === 0) {
						warn("Expected parameter after stafflines=", str, 0);return ret;
					}
					if (tokens[0].type !== 'number') {
						warn("Expected number after stafflines", str, tokens[0].start);break;
					}
					multilineVars.clef.stafflines = tokens[0].intt;
					tokens.shift();
					break;
				case "staffscale":
					tokens.shift();
					if (tokens.length === 0) {
						warn("Expected = after staffscale", str, 0);return ret;
					}
					token = tokens.shift();
					if (token.token !== "=") {
						warn("Expected = after staffscale", str, token.start);break;
					}
					if (tokens.length === 0) {
						warn("Expected parameter after staffscale=", str, 0);return ret;
					}
					if (tokens[0].type !== 'number') {
						warn("Expected number after staffscale", str, tokens[0].start);break;
					}
					multilineVars.clef.staffscale = tokens[0].floatt;
					tokens.shift();
					break;
				case "style":
					tokens.shift();
					if (tokens.length === 0) {
						warn("Expected = after style", str, 0);return ret;
					}
					token = tokens.shift();
					if (token.token !== "=") {
						warn("Expected = after style", str, token.start);break;
					}
					if (tokens.length === 0) {
						warn("Expected parameter after style=", str, 0);return ret;
					}
					switch (tokens[0].token) {
						case "normal":
						case "harmonic":
						case "rhythm":
						case "x":
							multilineVars.style = tokens[0].token;
							tokens.shift();
							break;
						default:
							warn("error parsing style element: " + tokens[0].token, str, tokens[0].start);
							break;
					}
					break;
				case "clef":
					tokens.shift();
					if (tokens.length === 0) {
						warn("Expected = after clef", str, 0);return ret;
					}
					token = tokens.shift();
					if (token.token !== "=") {
						warn("Expected = after clef", str, token.start);break;
					}
					if (tokens.length === 0) {
						warn("Expected parameter after clef=", str, 0);return ret;
					}
				//break; yes, we want to fall through. That allows "clef=" to be optional.
				case "treble":
				case "bass":
				case "alto":
				case "tenor":
				case "perc":
					// clef is [clef=] [⟨clef type⟩] [⟨line number⟩] [+8|-8]
					var clef = tokens.shift();
					switch (clef.token) {
						case 'treble':
						case 'tenor':
						case 'alto':
						case 'bass':
						case 'perc':
						case 'none':
							break;
						case 'C':
							clef.token = 'alto';break;
						case 'F':
							clef.token = 'bass';break;
						case 'G':
							clef.token = 'treble';break;
						case 'c':
							clef.token = 'alto';break;
						case 'f':
							clef.token = 'bass';break;
						case 'g':
							clef.token = 'treble';break;
						default:
							warn("Expected clef name. Found " + clef.token, str, clef.start);
							break;
					}
					if (tokens.length > 0 && tokens[0].type === 'number') {
						clef.token += tokens[0].token;
						tokens.shift();
					}
					if (tokens.length > 1 && (tokens[0].token === '-' || tokens[0].token === '+') && tokens[1].token === '8') {
						clef.token += tokens[0].token + tokens[1].token;
						tokens.shift();
						tokens.shift();
					}
					multilineVars.clef = { type: clef.token, verticalPos: calcMiddle(clef.token, 0) };
					if (multilineVars.currentVoice && multilineVars.currentVoice.transpose !== undefined) multilineVars.clef.transpose = multilineVars.currentVoice.transpose;
					ret.foundClef = true;
					break;
				default:
					warn("Unknown parameter: " + tokens[0].token, str, tokens[0].start);
					tokens.shift();
			}
		}
		return ret;
	};

	var setCurrentVoice = function setCurrentVoice(id) {
		multilineVars.currentVoice = multilineVars.voices[id];
		tune.setCurrentVoice(multilineVars.currentVoice.staffNum, multilineVars.currentVoice.index);
	};

	parseKeyVoice.parseVoice = function (line, i, e) {
		//First truncate the string to the first non-space character after V: through either the
		//end of the line or a % character. Then remove trailing spaces, too.
		var ret = tokenizer.getMeat(line, i, e);
		var start = ret.start;
		var end = ret.end;
		//The first thing on the line is the ID. It can be any non-space string and terminates at the
		//first space.
		var id = tokenizer.getToken(line, start, end);
		if (id.length === 0) {
			warn("Expected a voice id", line, start);
			return;
		}
		var isNew = false;
		if (multilineVars.voices[id] === undefined) {
			multilineVars.voices[id] = {};
			isNew = true;
			if (multilineVars.score_is_present) warn("Can't have an unknown V: id when the %score directive is present", line, start);
		}
		start += id.length;
		start += tokenizer.eatWhiteSpace(line, start);

		var staffInfo = { startStaff: isNew };
		var addNextTokenToStaffInfo = function addNextTokenToStaffInfo(name) {
			var attr = tokenizer.getVoiceToken(line, start, end);
			if (attr.warn !== undefined) warn("Expected value for " + name + " in voice: " + attr.warn, line, start);else if (attr.token.length === 0 && line.charAt(start) !== '"') warn("Expected value for " + name + " in voice", line, start);else staffInfo[name] = attr.token;
			start += attr.len;
		};
		var addNextTokenToVoiceInfo = function addNextTokenToVoiceInfo(id, name, type) {
			var attr = tokenizer.getVoiceToken(line, start, end);
			if (attr.warn !== undefined) warn("Expected value for " + name + " in voice: " + attr.warn, line, start);else if (attr.token.length === 0 && line.charAt(start) !== '"') warn("Expected value for " + name + " in voice", line, start);else {
				if (type === 'number') attr.token = parseFloat(attr.token);
				multilineVars.voices[id][name] = attr.token;
			}
			start += attr.len;
		};
		var addNextNoteTokenToVoiceInfo = function addNextNoteTokenToVoiceInfo(id, name) {
			var noteToTransposition = {
				"_B": 2,
				"_E": 9,
				"_b": -10,
				"_e": -3
			};
			var attr = tokenizer.getVoiceToken(line, start, end);
			if (attr.warn !== undefined) warn("Expected one of (_B, _E, _b, _e) for " + name + " in voice: " + attr.warn, line, start);else if (attr.token.length === 0 && line.charAt(start) !== '"') warn("Expected one of (_B, _E, _b, _e) for " + name + " in voice", line, start);else {
				var t = noteToTransposition[attr.token];
				if (!t) warn("Expected one of (_B, _E, _b, _e) for " + name + " in voice", line, start);else multilineVars.voices[id][name] = t;
			}
			start += attr.len;
		};

		//Then the following items can occur in any order:
		while (start < end) {
			var token = tokenizer.getVoiceToken(line, start, end);
			start += token.len;

			if (token.warn) {
				warn("Error parsing voice: " + token.warn, line, start);
			} else {
				var attr = null;
				switch (token.token) {
					case 'clef':
					case 'cl':
						addNextTokenToStaffInfo('clef');
						// TODO-PER: check for a legal clef; do octavizing
						var oct = 0;
						//							for (var ii = 0; ii < staffInfo.clef.length; ii++) {
						//								if (staffInfo.clef[ii] === ',') oct -= 7;
						//								else if (staffInfo.clef[ii] === "'") oct += 7;
						//							}
						if (staffInfo.clef !== undefined) {
							staffInfo.clef = staffInfo.clef.replace(/[',]/g, ""); //'//comment for emacs formatting of regexp
							if (staffInfo.clef.indexOf('+16') !== -1) {
								oct += 14;
								staffInfo.clef = staffInfo.clef.replace('+16', '');
							}
							staffInfo.verticalPos = calcMiddle(staffInfo.clef, oct);
						}
						break;
					case 'treble':
					case 'bass':
					case 'tenor':
					case 'alto':
					case 'perc':
					case 'none':
					case 'treble\'':
					case 'bass\'':
					case 'tenor\'':
					case 'alto\'':
					case 'none\'':
					case 'treble\'\'':
					case 'bass\'\'':
					case 'tenor\'\'':
					case 'alto\'\'':
					case 'none\'\'':
					case 'treble,':
					case 'bass,':
					case 'tenor,':
					case 'alto,':
					case 'none,':
					case 'treble,,':
					case 'bass,,':
					case 'tenor,,':
					case 'alto,,':
					case 'none,,':
						// TODO-PER: handle the octave indicators on the clef by changing the middle property
						var oct2 = 0;
						//							for (var iii = 0; iii < token.token.length; iii++) {
						//								if (token.token[iii] === ',') oct2 -= 7;
						//								else if (token.token[iii] === "'") oct2 += 7;
						//							}
						staffInfo.clef = token.token.replace(/[',]/g, ""); //'//comment for emacs formatting of regexp
						staffInfo.verticalPos = calcMiddle(staffInfo.clef, oct2);
						multilineVars.voices[id].clef = token.token;
						break;
					case 'staves':
					case 'stave':
					case 'stv':
						addNextTokenToStaffInfo('staves');
						break;
					case 'brace':
					case 'brc':
						addNextTokenToStaffInfo('brace');
						break;
					case 'bracket':
					case 'brk':
						addNextTokenToStaffInfo('bracket');
						break;
					case 'name':
					case 'nm':
						addNextTokenToStaffInfo('name');
						break;
					case 'subname':
					case 'sname':
					case 'snm':
						addNextTokenToStaffInfo('subname');
						break;
					case 'merge':
						staffInfo.startStaff = false;
						break;
					case 'stem':
					case 'stems':
						attr = tokenizer.getVoiceToken(line, start, end);
						if (attr.warn !== undefined) warn("Expected value for stems in voice: " + attr.warn, line, start);else if (attr.token === 'up' || attr.token === 'down') multilineVars.voices[id].stem = attr.token;else warn("Expected up or down for voice stem", line, start);
						start += attr.len;
						break;
					case 'up':
					case 'down':
						multilineVars.voices[id].stem = token.token;
						break;
					case 'middle':
					case 'm':
						addNextTokenToStaffInfo('verticalPos');
						staffInfo.verticalPos = parseMiddle(staffInfo.verticalPos).mid;
						break;
					case 'gchords':
					case 'gch':
						multilineVars.voices[id].suppressChords = true;
						// gchords can stand on its own, or it could be gchords=0.
						attr = tokenizer.getVoiceToken(line, start, end);
						if (attr.token === "0") start = start + attr.len;
						break;
					case 'space':
					case 'spc':
						addNextTokenToStaffInfo('spacing');
						break;
					case 'scale':
						addNextTokenToVoiceInfo(id, 'scale', 'number');
						break;
					case 'score':
						addNextNoteTokenToVoiceInfo(id, 'scoreTranspose');
						break;
					case 'transpose':
						addNextTokenToVoiceInfo(id, 'transpose', 'number');
						break;
					case 'stafflines':
						addNextTokenToVoiceInfo(id, 'stafflines', 'number');
						break;
					case 'staffscale':
						// TODO-PER: This is passed to the engraver, but the engraver ignores it.
						addNextTokenToVoiceInfo(id, 'staffscale', 'number');
						break;
					case 'octave':
						// TODO-PER: This is accepted, but not implemented, yet.
						addNextTokenToVoiceInfo(id, 'octave', 'number');
						break;
					case 'volume':
						// TODO-PER: This is accepted, but not implemented, yet.
						addNextTokenToVoiceInfo(id, 'volume', 'number');
						break;
					case "style":
						attr = tokenizer.getVoiceToken(line, start, end);
						if (attr.warn !== undefined) warn("Expected value for style in voice: " + attr.warn, line, start);else if (attr.token === 'normal' || attr.token === 'harmonic' || attr.token === 'rhythm' || attr.token === 'x') multilineVars.voices[id].style = attr.token;else warn("Expected one of [normal, harmonic, rhythm, x] for voice style", line, start);
						start += attr.len;
						break;
					// default:
					// Use this to find V: usages that aren't handled.
					// 	console.log("parse voice", token, tune.metaText.title);
				}
			}
			start += tokenizer.eatWhiteSpace(line, start);
		}

		// now we've filled up staffInfo, figure out what to do with this voice
		// TODO-PER: It is unclear from the standard and the examples what to do with brace, bracket, and staves, so they are ignored for now.
		if (staffInfo.startStaff || multilineVars.staves.length === 0) {
			multilineVars.staves.push({ index: multilineVars.staves.length, meter: multilineVars.origMeter });
			if (!multilineVars.score_is_present) multilineVars.staves[multilineVars.staves.length - 1].numVoices = 0;
		}
		if (multilineVars.voices[id].staffNum === undefined) {
			// store where to write this for quick access later.
			multilineVars.voices[id].staffNum = multilineVars.staves.length - 1;
			var vi = 0;
			for (var v in multilineVars.voices) {
				if (multilineVars.voices.hasOwnProperty(v)) {
					if (multilineVars.voices[v].staffNum === multilineVars.voices[id].staffNum) vi++;
				}
			}
			multilineVars.voices[id].index = vi - 1;
		}
		var s = multilineVars.staves[multilineVars.voices[id].staffNum];
		if (!multilineVars.score_is_present) s.numVoices++;
		if (staffInfo.clef) s.clef = { type: staffInfo.clef, verticalPos: staffInfo.verticalPos };
		if (staffInfo.spacing) s.spacing_below_offset = staffInfo.spacing;
		if (staffInfo.verticalPos) s.verticalPos = staffInfo.verticalPos;

		if (staffInfo.name) {
			if (s.name) s.name.push(staffInfo.name);else s.name = [staffInfo.name];
		}
		if (staffInfo.subname) {
			if (s.subname) s.subname.push(staffInfo.subname);else s.subname = [staffInfo.subname];
		}

		setCurrentVoice(id);
	};
})();

module.exports = parseKeyVoice;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_midi_controls.js: Handle the visual part of playing MIDI
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

function performanceOk() {
	if (!('performance' in window)) return false;
	if (!('now' in window.performance)) return false;
	return true;
}

// Unfortunately, a few versions of Safari don't support the performance interface. For those browsers, MIDI just won't work.
if (performanceOk()) {
	if (!('galactic' in window)) window.galactic = {};
	window.galactic.loc = {
		isLocalUrl: function isLocalUrl() {
			return false;
		}
	};

	__webpack_require__(40);
	__webpack_require__(41)(window.galactic);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
}

var midi = {};

(function () {
	"use strict";

	function isFunction(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	midi.generateMidiDownloadLink = function (tune, midiParams, midi, index) {
		var divClasses = ['abcjs-download-midi', 'abcjs-midi-' + index];
		if (midiParams.downloadClass) divClasses.push(midiParams.downloadClass);
		var html = '<div class="' + divClasses.join(' ') + '">';
		if (midiParams.preTextDownload) html += midiParams.preTextDownload;
		var title = tune.metaText && tune.metaText.title ? tune.metaText.title : 'Untitled';
		var label;
		if (midiParams.downloadLabel && isFunction(midiParams.downloadLabel)) label = midiParams.downloadLabel(tune, index);else if (midiParams.downloadLabel) label = midiParams.downloadLabel.replace(/%T/, title);else label = "Download MIDI for \"" + title + "\"";
		title = title.toLowerCase().replace(/'/g, '').replace(/\W/g, '_').replace(/__/g, '_');
		html += '<a download="' + title + '.midi" href="' + midi + '">' + label + '</a>';
		if (midiParams.postTextDownload) html += midiParams.postTextDownload;
		return html + "</div>";
	};

	function preprocessLabel(label, title) {
		return label.replace(/%T/g, title);
	}

	midi.deviceSupportsMidi = function () {
		if (!performanceOk()) return false;
		if (midi.midiInlineInitialized === 'not loaded') return false;
		return true;
	};

	midi.generateMidiControls = function (tune, midiParams, midi, index, stopOld) {
		if (!performanceOk()) return '<div class="abcjs-inline-midi abcjs-midi-' + index + '">ERROR: this browser doesn\'t support window.performance</div>';
		if (midi.midiInlineInitialized === 'not loaded') return '<div class="abcjs-inline-midi abcjs-midi-' + index + '">MIDI NOT PRESENT</div>';

		if (stopOld) stopCurrentlyPlayingTune();
		var title = tune.metaText && tune.metaText.title ? tune.metaText.title : 'Untitled';
		var options = midiParams.inlineControls || {};
		if (options.standard === undefined) options.standard = true;

		if (options.tooltipSelection === undefined) options.tooltipSelection = "Click to toggle play selection/play all.";
		if (options.tooltipLoop === undefined) options.tooltipLoop = "Click to toggle play once/repeat.";
		if (options.tooltipReset === undefined) options.tooltipReset = "Click to go to beginning.";
		if (options.tooltipPlay === undefined) options.tooltipPlay = "Click to play/pause.";
		if (options.tooltipProgress === undefined) options.tooltipProgress = "Click to change the playback position.";
		if (options.tooltipTempo === undefined) options.tooltipTempo = "Change the playback speed.";

		var style = "";
		if (options.hide) style = 'style="display:none;"';
		var html = '<div class="abcjs-inline-midi abcjs-midi-' + index + '" ' + style + '>';
		html += '<span class="abcjs-data" style="display:none;">' + JSON.stringify(midi) + '</span>';
		if (midiParams.preTextInline) html += '<span class="abcjs-midi-pre">' + preprocessLabel(midiParams.preTextInline, title) + '</span>';

		if (options.selectionToggle) html += '<button type="button" class="abcjs-midi-selection abcjs-btn" title="' + options.tooltipSelection + '"></button>';
		if (options.loopToggle) html += '<button type="button" class="abcjs-midi-loop abcjs-btn" title="' + options.tooltipLoop + '"></button>';
		if (options.standard) html += '<button type="button" class="abcjs-midi-reset abcjs-btn" title="' + options.tooltipReset + '"></button><button type="button" class="abcjs-midi-start abcjs-btn" title="' + options.tooltipPlay + '"></button><button type="button" class="abcjs-midi-progress-background" title="' + options.tooltipProgress + '"><span class="abcjs-midi-progress-indicator"></span></button><span class="abcjs-midi-clock"> 0:00</span>';
		if (options.tempo) {
			var startTempo = tune && tune.metaText && tune.metaText.tempo && tune.metaText.tempo.bpm ? tune.metaText.tempo.bpm : 180;
			html += '<span class="abcjs-tempo-wrapper"><input class="abcjs-midi-tempo" value="100" type="number" min="1" max="300" data-start-tempo="' + startTempo + '" title="' + options.tooltipTempo + '" />% (<span class="abcjs-midi-current-tempo">' + startTempo + '</span> BPM)</span>';
		}

		if (midiParams.postTextInline) html += '<span class="abcjs-midi-post">' + preprocessLabel(midiParams.postTextInline, title) + '</span>';
		return html + "</div>";
	};

	// The default location for the sound font files. Simply set this to a different value if the files are served in a different place.
	// midi.soundfontUrl = "node_modules/midi/examples/soundfont/";
	var soundfontUrl = "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/";
	midi.setSoundFont = function (url) {
		soundfontUrl = url;
	};

	function hasClass(element, cls) {
		if (!element) return false;
		return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}

	function addClass(element, cls) {
		if (!element) return;
		if (!hasClass(element, cls)) element.className = element.className + " " + cls;
	}

	function removeClass(element, cls) {
		if (!element) return;
		element.className = element.className.replace(cls, "").trim().replace("  ", " ");
	}

	function toggleClass(element, cls) {
		if (!element) return;
		if (hasClass(element, cls)) removeClass(element, cls);else addClass(element, cls);
	}

	function closest(element, cls) {
		// This finds the closest parent that contains the class passed in.
		if (!element) return null;
		while (element !== document.body) {
			if (hasClass(element, cls)) return element;
			element = element.parentNode;
		}
		return null;
	}

	function find(element, cls) {
		if (!element) return null;
		var els = element.getElementsByClassName(cls);
		if (els.length === 0) return null;
		return els[0];
	}

	function addLoadEvent(func) {
		if (window.document.readyState === 'loading') {
			window.addEventListener('load', func);
		} else {
			func();
		}
	}

	var midiJsInitialized = false;

	function afterSetup(timeWarp, data, onSuccess) {
		MIDI.player.currentTime = 0;
		MIDI.player.warp = timeWarp;

		MIDI.player.load({ events: data });
		onSuccess();
	}

	function listInstruments(data) {
		var instruments = [];
		for (var i = 0; i < data.length; i++) {
			if (data[i][0] && data[i][0].event && data[i][0].event.programNumber) {
				instruments.push(data[i][0].event.programNumber);
			}
		}
		return instruments;
	}

	function setCurrentMidiTune(timeWarp, data, onSuccess) {
		if (!midiJsInitialized) {
			MIDI.setup({
				debug: false,
				soundfontUrl: soundfontUrl,
				instruments: listInstruments(data)
			}).then(function () {
				midiJsInitialized = true;
				afterSetup(timeWarp, data, onSuccess);
			}).catch(function (e) {
				console.log("MIDI.setup failed:", e.message);
			});
		} else {
			afterSetup(timeWarp, data, onSuccess);
		}
	}

	function startCurrentlySelectedTune() {
		MIDI.player.start(MIDI.player.currentTime);
	}

	function stopCurrentlyPlayingTune() {
		MIDI.player.stop();
	}

	function pauseCurrentlyPlayingTune() {
		MIDI.player.pause();
	}

	function setMidiCallback(midiJsListener) {
		MIDI.player.setAnimation(midiJsListener);
	}

	function jumpToMidiPosition(play, offset, width) {
		var ratio = offset / width;
		var endTime = MIDI.player.duration; // MIDI.Player.endTime;
		if (play) pauseCurrentlyPlayingTune();
		MIDI.player.currentTime = endTime * ratio;
		if (play) startCurrentlySelectedTune();
	}

	function setTimeWarp(percent) {
		// Time warp is a multiplier: the larger the number, the longer the time. Therefore,
		// it is opposite of the percentage. That is, playing at 50% is actually multiplying the time by 2.
		MIDI.player.warp = percent > 0 ? 100 / percent : 1;
	}

	function loadMidi(target, onSuccess) {
		var dataEl = find(target, "abcjs-data");
		var data = JSON.parse(dataEl.innerHTML);

		// See if the tempo changer is present, and use that tempo if so.
		var timeWarp = 1;
		var tempoEl = find(target, "abcjs-midi-tempo");
		if (tempoEl) {
			// Time warp is a multiplier: the larger the number, the longer the time. Therefore,
			// it is opposite of the percentage. That is, playing at 50% is actually multiplying the time by 2.
			var percent = parseInt(tempoEl.value, 10);
			if (percent > 0) timeWarp = 100 / percent;
		}
		setCurrentMidiTune(timeWarp, data, onSuccess);
	}

	function deselectMidiControl() {
		var otherMidi = find(document, "abcjs-midi-current");
		if (otherMidi) {
			stopCurrentlyPlayingTune();
			removeClass(otherMidi, "abcjs-midi-current");
			var otherMidiStart = find(otherMidi, "abcjs-midi-start");
			removeClass(otherMidiStart, "abcjs-pushed");
		}
	}

	var lastNow;

	function findElements(visualItems, currentTime, epsilon) {

		var minIndex = 0;
		var maxIndex = visualItems.length - 1;
		var currentIndex;
		var currentElement;

		while (minIndex <= maxIndex) {
			currentIndex = Math.floor((minIndex + maxIndex) / 2);
			currentElement = visualItems[currentIndex];

			// A match is if the currentTime is within .1 seconds before the exact time.
			// We get callback events at somewhat random times, so they won't match up exactly.
			if (currentElement.milliseconds / 1000 - epsilon < currentTime) {
				minIndex = currentIndex + 1;
			} else if (currentElement.milliseconds / 1000 - epsilon > currentTime) {
				maxIndex = currentIndex - 1;
			} else {
				// We have a match.
				return currentIndex;
			}
		}

		// There was no match, so find the closest element that is less than the current time.
		while (visualItems[currentIndex].milliseconds / 1000 - epsilon >= currentTime && currentIndex > 0) {
			currentIndex--;
		} // If the time is way before the first element, then we're not ready to select any of them.
		if (currentIndex === 0 && visualItems[currentIndex].milliseconds / 1000 - epsilon >= currentTime) return -1;
		return currentIndex;
	}

	function midiJsListener(position) {
		// { currentTime: in seconds, duration: total length in seconds, progress: percent between 0 and 1 }
		var midiControl;
		if (position.duration > 0 && lastNow !== position.progress) {
			lastNow = position.progress;
			midiControl = find(document, "abcjs-midi-current");
			if (midiControl) {
				var startButton = find(midiControl, 'abcjs-midi-start');
				if (hasClass(startButton, 'abcjs-pushed')) {
					var progressBackground = find(midiControl, "abcjs-midi-progress-background");
					var totalWidth = progressBackground.offsetWidth;
					var progressIndicator = find(midiControl, "abcjs-midi-progress-indicator");
					var scaled = totalWidth * lastNow; // The number of pixels
					progressIndicator.style.left = scaled + "px";
					var clock = find(midiControl, "abcjs-midi-clock");
					if (clock) {
						var seconds = Math.floor(position.currentTime);
						var minutes = Math.floor(seconds / 60);
						seconds = seconds % 60;
						if (seconds < 10) seconds = "0" + seconds;
						if (minutes < 10) minutes = " " + minutes;
						clock.innerHTML = minutes + ":" + seconds;
					}
					var tempo = midiControl.abcjsQpm;
					if (!tempo && midiControl.abcjsTune && midiControl.abcjsTune.metaText && midiControl.abcjsTune.metaText.tempo) tempo = midiControl.abcjsTune.metaText.tempo.bpm;
					if (!tempo) tempo = 180;
					var beatsPerSecond = parseInt(tempo, 10) / 60;
					var currentTime = position.currentTime;
					if (midiControl.abcjsListener) {
						var thisBeat = Math.floor(currentTime * beatsPerSecond);
						position.newBeat = thisBeat !== midiControl.abcjsLastBeat;
						position.thisBeat = thisBeat;
						midiControl.abcjsLastBeat = thisBeat;
						midiControl.abcjsListener(midiControl, position, midiControl.abcjsContext);
					}
					if (midiControl.abcjsAnimate) {
						var epsilon = beatsPerSecond / 64; // pick a small division to round to. This is called at small, random times.
						var index = findElements(midiControl.abcjsTune.noteTimings, currentTime, epsilon);
						if (index !== midiControl.abcjsLastIndex) {
							var last = midiControl.abcjsLastIndex >= 0 ? midiControl.abcjsTune.noteTimings[midiControl.abcjsLastIndex] : null;
							midiControl.abcjsAnimate(last, midiControl.abcjsTune.noteTimings[index], midiControl.abcjsContext);
							midiControl.abcjsLastIndex = index;
						}
					}
				}
			}
		}
		if (position.progress === 1) {
			// The playback is stopping. We need to either indicate that
			// it has stopped, or start over at the beginning.
			midiControl = find(document, "abcjs-midi-current");
			var loopControl = find(midiControl, "abcjs-midi-loop");

			var finishedResetting = function finishedResetting() {
				if (loopControl && hasClass(loopControl, "abcjs-pushed")) {
					onStart(find(midiControl, "abcjs-midi-start"));
				}
			};

			// midi.js is not quite finished: it still will process the last event, so we wait a minimum amount of time
			// before doing another action.
			setTimeout(function () {
				doReset(midiControl, finishedResetting);
				if (midiControl && midiControl.abcjsAnimate) midiControl.abcjsAnimate(midiControl.abcjsTune.noteTimings[midiControl.abcjsLastIndex], null, midiControl.abcjsContext);
			}, 1);
		}
	}

	function onStart(target) {
		var parent = closest(target, "abcjs-inline-midi");
		// If this midi is already playing,
		if (hasClass(target, 'abcjs-pushed')) {
			// Stop it.
			pauseCurrentlyPlayingTune();
			// Change the element so that the start icon is shown.
			removeClass(target, "abcjs-pushed");
		} else {
			// Else,
			// If some other midi is running, turn it off.

			// If this is the current midi, just continue.
			if (hasClass(parent, "abcjs-midi-current"))
				// Start this tune playing from wherever it had stopped.
				startCurrentlySelectedTune();else {
				deselectMidiControl();

				// else, load this midi from scratch.
				var onSuccess = function onSuccess() {
					startCurrentlySelectedTune();
					removeClass(target, "abcjs-loading");
					addClass(parent, 'abcjs-midi-current');
				};
				addClass(target, "abcjs-loading");
				loadMidi(parent, onSuccess);
			}
			// Change the element so that the pause icon is shown.
			addClass(target, "abcjs-pushed");
		}
		// This replaces the old callback. It really only needs to be called once, but it doesn't hurt to set it every time.
		parent.abcjsLastBeat = -1;
		parent.abcjsLastIndex = -1;
		setMidiCallback(midiJsListener);
	}

	midi.startPlaying = function (target) {
		// This can be called with the target being entire control, and if so, first find the start button.
		var btn = target;
		if (hasClass(target, "abcjs-inline-midi")) btn = target.querySelector('.abcjs-midi-start');
		onStart(btn);
	};

	midi.stopPlaying = function () {
		stopCurrentlyPlayingTune();
		var playingEl = document.querySelector(".abcjs-midi-current");
		if (playingEl) {
			resetProgress(playingEl);
			var startBtn = find(playingEl, "abcjs-midi-start");
			if (startBtn) removeClass(startBtn, "abcjs-pushed");
		}
	};
	midi.restartPlaying = function () {
		var target = document.querySelector(".abcjs-midi-current");
		onReset(target);
	};

	midi.setLoop = function (target, state) {
		var loop = target.querySelector('.abcjs-midi-loop');
		if (!loop) return;
		if (state) addClass(loop, 'abcjs-pushed');else removeClass(loop, 'abcjs-pushed');
	};

	midi.setRandomProgress = function (percent) {
		var target = document.querySelector(".abcjs-midi-current");
		var playEl = find(target, "abcjs-midi-start");
		var play = hasClass(playEl, "abcjs-pushed");
		var endTime = MIDI.player.duration;
		if (play) pauseCurrentlyPlayingTune();
		MIDI.player.currentTime = endTime * percent;
		if (play) startCurrentlySelectedTune();
	};

	function resetProgress(parent) {
		var progressIndicator = find(parent, "abcjs-midi-progress-indicator");
		progressIndicator.style.left = "0px";
		var clock = find(parent, "abcjs-midi-clock");
		clock.innerHTML = " 0:00";
	}

	function onSelection(target) {
		toggleClass(target, 'abcjs-pushed');
	}

	function onLoop(target) {
		toggleClass(target, 'abcjs-pushed');
	}

	function doReset(target, callback) {
		var parent = closest(target, "abcjs-inline-midi");

		function onSuccess() {
			addClass(parent, 'abcjs-midi-current');
			resetProgress(parent);
			if (callback) callback();
		}

		// If the tune is playing, stop it.
		deselectMidiControl();
		if (parent) // parent can be null if the music was changed while the midi is playing. This is called to stop it, but the object is already gone.
			loadMidi(parent, onSuccess);
	}

	function onReset(target) {
		var parent = closest(target, "abcjs-inline-midi");
		var playEl = find(parent, "abcjs-midi-start");
		var play = hasClass(playEl, "abcjs-pushed");
		function keepPlaying() {
			if (play) {
				startCurrentlySelectedTune();
				addClass(playEl, 'abcjs-pushed');
			}
		}
		if (hasClass(parent, "abcjs-midi-current")) // Only listen to the reset for the currently playing tune.
			doReset(target, keepPlaying);
	}

	function relMouseX(target, event) {
		var totalOffsetX = 0;

		do {
			totalOffsetX += target.offsetLeft - target.scrollLeft;
			target = target.offsetParent;
		} while (target);

		return event.pageX - totalOffsetX;
	}

	function onProgress(target, event) {
		var parent = closest(target, "abcjs-inline-midi");
		if (hasClass(parent, "abcjs-midi-current")) {
			var play = find(parent, "abcjs-midi-start");
			play = hasClass(play, "abcjs-pushed");
			var width = target.offsetWidth;
			var offset = relMouseX(target, event);
			jumpToMidiPosition(play, offset, width);
		}
	}

	function onTempo(el) {
		var percent = parseInt(el.value, 10);
		var startTempo = parseInt(el.getAttribute("data-start-tempo"), 10);

		while (el && !hasClass(el, 'abcjs-midi-current-tempo')) {
			el = el.nextSibling;
		}
		el.innerHTML = Math.floor(percent * startTempo / 100);
		setTimeWarp(percent);
	}

	function addDelegates() {
		document.body.addEventListener("click", function (event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
			while (target && target !== document.body) {
				if (hasClass(target, 'abcjs-midi-start')) {
					onStart(target, event);
					return;
				} else if (hasClass(target, 'abcjs-midi-selection')) {
					onSelection(target, event);
					return;
				} else if (hasClass(target, 'abcjs-midi-loop')) {
					onLoop(target, event);
					return;
				} else if (hasClass(target, 'abcjs-midi-reset')) {
					onReset(target, event);
					return;
				} else if (hasClass(target, 'abcjs-midi-progress-background')) {
					onProgress(target, event);
					return;
				}
				target = target.parentNode;
			}
		});
		document.body.addEventListener("change", function (event) {
			event = event || window.event;
			var target = event.target || event.srcElement;
			while (target !== document.body) {
				if (hasClass(target, 'abcjs-midi-tempo')) onTempo(target, event);
				target = target.parentNode;
			}
		});
		if (window.MIDI === undefined) {
			midi.midiInlineInitialized = 'not loaded';
			var els = document.getElementsByClassName('abcjs-inline-midi');
			for (var i = 0; i < els.length; i++) {
				els[i].innerHTML = "MIDI NOT PRESENT";
			}
		}
	}

	addLoadEvent(addDelegates);
})();

module.exports = midi;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_parse.js: parses a string representing ABC Music Notation into a usable internal structure.
//    Copyright (C) 2010-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global window */

var parseCommon = __webpack_require__(0);
var parseDirective = __webpack_require__(7);
var ParseHeader = __webpack_require__(19);
var parseKeyVoice = __webpack_require__(8);
var Tokenizer = __webpack_require__(20);
var transpose = __webpack_require__(11);

var Tune = __webpack_require__(21);

var Parse = function Parse() {
	"use strict";

	var tune = new Tune();
	var tokenizer = new Tokenizer();

	this.getTune = function () {
		return tune;
	};

	function addPositioning(el, type, value) {
		if (!el.positioning) el.positioning = {};
		el.positioning[type] = value;
	}

	function addFont(el, type, value) {
		if (!el.fonts) el.fonts = {};
		el.fonts[type] = value;
	}

	var multilineVars = {
		reset: function reset() {
			for (var property in this) {
				if (this.hasOwnProperty(property) && typeof this[property] !== "function") {
					delete this[property];
				}
			}
			this.iChar = 0;
			this.key = { accidentals: [], root: 'none', acc: '', mode: '' };
			this.meter = null; // if no meter is specified, free meter is assumed
			this.origMeter = null; // this is for new voices that are created after we set the meter.
			this.hasMainTitle = false;
			this.default_length = 0.125;
			this.clef = { type: 'treble', verticalPos: 0 };
			this.next_note_duration = 0;
			this.start_new_line = true;
			this.is_in_header = true;
			this.is_in_history = false;
			this.partForNextLine = "";
			this.havent_set_length = true;
			this.voices = {};
			this.staves = [];
			this.macros = {};
			this.currBarNumber = 1;
			this.inTextBlock = false;
			this.inPsBlock = false;
			this.ignoredDecorations = [];
			this.textBlock = "";
			this.score_is_present = false; // Can't have original V: lines when there is the score directive
			this.inEnding = false;
			this.inTie = false;
			this.inTieChord = {};
			this.vocalPosition = "auto";
			this.dynamicPosition = "auto";
			this.chordPosition = "auto";
			this.ornamentPosition = "auto";
			this.volumePosition = "auto";
			this.openSlurs = [];
		},
		differentFont: function differentFont(type, defaultFonts) {
			if (this[type].decoration !== defaultFonts[type].decoration) return true;
			if (this[type].face !== defaultFonts[type].face) return true;
			if (this[type].size !== defaultFonts[type].size) return true;
			if (this[type].style !== defaultFonts[type].style) return true;
			if (this[type].weight !== defaultFonts[type].weight) return true;
			return false;
		},
		addFormattingOptions: function addFormattingOptions(el, defaultFonts, elType) {
			if (elType === 'note') {
				if (this.vocalPosition !== 'auto') addPositioning(el, 'vocalPosition', this.vocalPosition);
				if (this.dynamicPosition !== 'auto') addPositioning(el, 'dynamicPosition', this.dynamicPosition);
				if (this.chordPosition !== 'auto') addPositioning(el, 'chordPosition', this.chordPosition);
				if (this.ornamentPosition !== 'auto') addPositioning(el, 'ornamentPosition', this.ornamentPosition);
				if (this.volumePosition !== 'auto') addPositioning(el, 'volumePosition', this.volumePosition);
				if (this.differentFont("annotationfont", defaultFonts)) addFont(el, 'annotationfont', this.annotationfont);
				if (this.differentFont("gchordfont", defaultFonts)) addFont(el, 'gchordfont', this.gchordfont);
				if (this.differentFont("vocalfont", defaultFonts)) addFont(el, 'vocalfont', this.vocalfont);
			} else if (elType === 'bar') {
				if (this.dynamicPosition !== 'auto') addPositioning(el, 'dynamicPosition', this.dynamicPosition);
				if (this.chordPosition !== 'auto') addPositioning(el, 'chordPosition', this.chordPosition);
				if (this.ornamentPosition !== 'auto') addPositioning(el, 'ornamentPosition', this.ornamentPosition);
				if (this.volumePosition !== 'auto') addPositioning(el, 'volumePosition', this.volumePosition);
				if (this.differentFont("measurefont", defaultFonts)) addFont(el, 'measurefont', this.measurefont);
				if (this.differentFont("repeatfont", defaultFonts)) addFont(el, 'repeatfont', this.repeatfont);
			}
		}
	};

	var addWarning = function addWarning(str) {
		if (!multilineVars.warnings) multilineVars.warnings = [];
		multilineVars.warnings.push(str);
	};

	var addWarningObject = function addWarningObject(warningObject) {
		if (!multilineVars.warningObjects) multilineVars.warningObjects = [];
		multilineVars.warningObjects.push(warningObject);
	};

	var encode = function encode(str) {
		var ret = parseCommon.gsub(str, '\x12', ' ');
		ret = parseCommon.gsub(ret, '&', '&amp;');
		ret = parseCommon.gsub(ret, '<', '&lt;');
		return parseCommon.gsub(ret, '>', '&gt;');
	};

	var warn = function warn(str, line, col_num) {
		if (!line) line = " ";
		var bad_char = line.charAt(col_num);
		if (bad_char === ' ') bad_char = "SPACE";
		var clean_line = encode(line.substring(0, col_num)) + '<span style="text-decoration:underline;font-size:1.3em;font-weight:bold;">' + bad_char + '</span>' + encode(line.substring(col_num + 1));
		addWarning("Music Line:" + tune.getNumLines() + ":" + (col_num + 1) + ': ' + str + ":  " + clean_line);
		addWarningObject({ message: str, line: line, startChar: multilineVars.iChar + col_num, column: col_num });
	};
	var header = new ParseHeader(tokenizer, warn, multilineVars, tune);

	this.getWarnings = function () {
		return multilineVars.warnings;
	};
	this.getWarningObjects = function () {
		return multilineVars.warningObjects;
	};

	var letter_to_chord = function letter_to_chord(line, i) {
		if (line.charAt(i) === '"') {
			var chord = tokenizer.getBrackettedSubstring(line, i, 5);
			if (!chord[2]) warn("Missing the closing quote while parsing the chord symbol", line, i);
			// If it starts with ^, then the chord appears above.
			// If it starts with _ then the chord appears below.
			// (note that the 2.0 draft standard defines them as not chords, but annotations and also defines @.)
			if (chord[0] > 0 && chord[1].length > 0 && chord[1].charAt(0) === '^') {
				chord[1] = chord[1].substring(1);
				chord[2] = 'above';
			} else if (chord[0] > 0 && chord[1].length > 0 && chord[1].charAt(0) === '_') {
				chord[1] = chord[1].substring(1);
				chord[2] = 'below';
			} else if (chord[0] > 0 && chord[1].length > 0 && chord[1].charAt(0) === '<') {
				chord[1] = chord[1].substring(1);
				chord[2] = 'left';
			} else if (chord[0] > 0 && chord[1].length > 0 && chord[1].charAt(0) === '>') {
				chord[1] = chord[1].substring(1);
				chord[2] = 'right';
			} else if (chord[0] > 0 && chord[1].length > 0 && chord[1].charAt(0) === '@') {
				// @-15,5.7
				chord[1] = chord[1].substring(1);
				var x = tokenizer.getFloat(chord[1]);
				if (x.digits === 0) warn("Missing first position in absolutely positioned annotation.", line, i);
				chord[1] = chord[1].substring(x.digits);
				if (chord[1][0] !== ',') warn("Missing comma absolutely positioned annotation.", line, i);
				chord[1] = chord[1].substring(1);
				var y = tokenizer.getFloat(chord[1]);
				if (y.digits === 0) warn("Missing second position in absolutely positioned annotation.", line, i);
				chord[1] = chord[1].substring(y.digits);
				var ws = tokenizer.skipWhiteSpace(chord[1]);
				chord[1] = chord[1].substring(ws);
				chord[2] = null;
				chord[3] = { x: x.value, y: y.value };
			} else {
				chord[1] = chord[1].replace(/([ABCDEFG0-9])b/g, "$1♭");
				chord[1] = chord[1].replace(/([ABCDEFG0-9])#/g, "$1♯");
				chord[2] = 'default';
				chord[1] = transpose.chordName(multilineVars, chord[1]);
			}
			return chord;
		}
		return [0, ""];
	};

	var legalAccents = ["trill", "lowermordent", "uppermordent", "mordent", "pralltriller", "accent", "fermata", "invertedfermata", "tenuto", "0", "1", "2", "3", "4", "5", "+", "wedge", "open", "thumb", "snap", "turn", "roll", "breath", "shortphrase", "mediumphrase", "longphrase", "segno", "coda", "D.S.", "D.C.", "fine", "slide", "^", "marcato", "upbow", "downbow", "/", "//", "///", "////", "trem1", "trem2", "trem3", "trem4", "turnx", "invertedturn", "invertedturnx", "trill(", "trill)", "arpeggio", "xstem", "mark", "umarcato", "style=normal", "style=harmonic", "style=rhythm", "style=x"];
	var volumeDecorations = ["p", "pp", "f", "ff", "mf", "mp", "ppp", "pppp", "fff", "ffff", "sfz"];
	var dynamicDecorations = ["crescendo(", "crescendo)", "diminuendo(", "diminuendo)"];

	var accentPseudonyms = [["<", "accent"], [">", "accent"], ["tr", "trill"], ["plus", "+"], ["emphasis", "accent"], ["^", "umarcato"], ["marcato", "umarcato"]];
	var accentDynamicPseudonyms = [["<(", "crescendo("], ["<)", "crescendo)"], [">(", "diminuendo("], [">)", "diminuendo)"]];
	var letter_to_accent = function letter_to_accent(line, i) {
		var macro = multilineVars.macros[line.charAt(i)];

		if (macro !== undefined) {
			if (macro.charAt(0) === '!' || macro.charAt(0) === '+') macro = macro.substring(1);
			if (macro.charAt(macro.length - 1) === '!' || macro.charAt(macro.length - 1) === '+') macro = macro.substring(0, macro.length - 1);
			if (parseCommon.detect(legalAccents, function (acc) {
				return macro === acc;
			})) return [1, macro];else if (parseCommon.detect(volumeDecorations, function (acc) {
				return macro === acc;
			})) {
				if (multilineVars.volumePosition === 'hidden') macro = "";
				return [1, macro];
			} else if (parseCommon.detect(dynamicDecorations, function (acc) {
				if (multilineVars.dynamicPosition === 'hidden') macro = "";
				return macro === acc;
			})) {
				return [1, macro];
			} else {
				if (!parseCommon.detect(multilineVars.ignoredDecorations, function (dec) {
					return macro === dec;
				})) warn("Unknown macro: " + macro, line, i);
				return [1, ''];
			}
		}
		switch (line.charAt(i)) {
			case '.':
				return [1, 'staccato'];
			case 'u':
				return [1, 'upbow'];
			case 'v':
				return [1, 'downbow'];
			case '~':
				return [1, 'irishroll'];
			case '!':
			case '+':
				var ret = tokenizer.getBrackettedSubstring(line, i, 5);
				// Be sure that the accent is recognizable.
				if (ret[1].length > 0 && (ret[1].charAt(0) === '^' || ret[1].charAt(0) === '_')) ret[1] = ret[1].substring(1); // TODO-PER: The test files have indicators forcing the ornament to the top or bottom, but that isn't in the standard. We'll just ignore them.
				if (parseCommon.detect(legalAccents, function (acc) {
					return ret[1] === acc;
				})) return ret;
				if (parseCommon.detect(volumeDecorations, function (acc) {
					return ret[1] === acc;
				})) {
					if (multilineVars.volumePosition === 'hidden') ret[1] = '';
					return ret;
				}
				if (parseCommon.detect(dynamicDecorations, function (acc) {
					return ret[1] === acc;
				})) {
					if (multilineVars.dynamicPosition === 'hidden') ret[1] = '';
					return ret;
				}

				if (parseCommon.detect(accentPseudonyms, function (acc) {
					if (ret[1] === acc[0]) {
						ret[1] = acc[1];
						return true;
					} else return false;
				})) return ret;

				if (parseCommon.detect(accentDynamicPseudonyms, function (acc) {
					if (ret[1] === acc[0]) {
						ret[1] = acc[1];
						return true;
					} else return false;
				})) {
					if (multilineVars.dynamicPosition === 'hidden') ret[1] = '';
					return ret;
				}
				// We didn't find the accent in the list, so consume the space, but don't return an accent.
				// Although it is possible that ! was used as a line break, so accept that.
				if (line.charAt(i) === '!' && (ret[0] === 1 || line.charAt(i + ret[0] - 1) !== '!')) return [1, null];
				warn("Unknown decoration: " + ret[1], line, i);
				ret[1] = "";
				return ret;
			case 'H':
				return [1, 'fermata'];
			case 'J':
				return [1, 'slide'];
			case 'L':
				return [1, 'accent'];
			case 'M':
				return [1, 'mordent'];
			case 'O':
				return [1, 'coda'];
			case 'P':
				return [1, 'pralltriller'];
			case 'R':
				return [1, 'roll'];
			case 'S':
				return [1, 'segno'];
			case 'T':
				return [1, 'trill'];
		}
		return [0, 0];
	};

	var letter_to_spacer = function letter_to_spacer(line, i) {
		var start = i;
		while (tokenizer.isWhiteSpace(line.charAt(i))) {
			i++;
		}return [i - start];
	};

	// returns the class of the bar line
	// the number of the repeat
	// and the number of characters used up
	// if 0 is returned, then the next element was not a bar line
	var letter_to_bar = function letter_to_bar(line, curr_pos) {
		var ret = tokenizer.getBarLine(line, curr_pos);
		if (ret.len === 0) return [0, ""];
		if (ret.warn) {
			warn(ret.warn, line, curr_pos);
			return [ret.len, ""];
		}

		// Now see if this is a repeated ending
		// A repeated ending is all of the characters 1,2,3,4,5,6,7,8,9,0,-, and comma
		// It can also optionally start with '[', which is ignored.
		// Also, it can have white space before the '['.
		for (var ws = 0; ws < line.length; ws++) {
			if (line.charAt(curr_pos + ret.len + ws) !== ' ') break;
		}var orig_bar_len = ret.len;
		if (line.charAt(curr_pos + ret.len + ws) === '[') {
			ret.len += ws + 1;
		}

		// It can also be a quoted string. It is unclear whether that construct requires '[', but it seems like it would. otherwise it would be confused with a regular chord.
		if (line.charAt(curr_pos + ret.len) === '"' && line.charAt(curr_pos + ret.len - 1) === '[') {
			var ending = tokenizer.getBrackettedSubstring(line, curr_pos + ret.len, 5);
			return [ret.len + ending[0], ret.token, ending[1]];
		}
		var retRep = tokenizer.getTokenOf(line.substring(curr_pos + ret.len), "1234567890-,");
		if (retRep.len === 0 || retRep.token[0] === '-') return [orig_bar_len, ret.token];

		return [ret.len + retRep.len, ret.token, retRep.token];
	};

	var tripletQ = {
		2: 3,
		3: 2,
		4: 3,
		5: 2, // TODO-PER: not handling 6/8 rhythm yet
		6: 2,
		7: 2, // TODO-PER: not handling 6/8 rhythm yet
		8: 3,
		9: 2 // TODO-PER: not handling 6/8 rhythm yet
	};
	var letter_to_open_slurs_and_triplets = function letter_to_open_slurs_and_triplets(line, i) {
		// consume spaces, and look for all the open parens. If there is a number after the open paren,
		// that is a triplet. Otherwise that is a slur. Collect all the slurs and the first triplet.
		var ret = {};
		var start = i;
		while (line.charAt(i) === '(' || tokenizer.isWhiteSpace(line.charAt(i))) {
			if (line.charAt(i) === '(') {
				if (i + 1 < line.length && line.charAt(i + 1) >= '2' && line.charAt(i + 1) <= '9') {
					if (ret.triplet !== undefined) warn("Can't nest triplets", line, i);else {
						ret.triplet = line.charAt(i + 1) - '0';
						ret.tripletQ = tripletQ[ret.triplet];
						ret.num_notes = ret.triplet;
						if (i + 2 < line.length && line.charAt(i + 2) === ':') {
							// We are expecting "(p:q:r" or "(p:q" or "(p::r"
							// That is: "put p notes into the time of q for the next r notes"
							// if r is missing, then it is equal to p.
							// if q is missing, it is determined from this table:
							// (2 notes in the time of 3
							// (3 notes in the time of 2
							// (4 notes in the time of 3
							// (5 notes in the time of n | if time sig is (6/8, 9/8, 12/8), n=3, else n=2
							// (6 notes in the time of 2
							// (7 notes in the time of n
							// (8 notes in the time of 3
							// (9 notes in the time of n
							if (i + 3 < line.length && line.charAt(i + 3) === ':') {
								// The second number, 'q', is not present.
								if (i + 4 < line.length && line.charAt(i + 4) >= '1' && line.charAt(i + 4) <= '9') {
									ret.num_notes = line.charAt(i + 4) - '0';
									i += 3;
								} else warn("expected number after the two colons after the triplet to mark the duration", line, i);
							} else if (i + 3 < line.length && line.charAt(i + 3) >= '1' && line.charAt(i + 3) <= '9') {
								ret.tripletQ = line.charAt(i + 3) - '0';
								if (i + 4 < line.length && line.charAt(i + 4) === ':') {
									if (i + 5 < line.length && line.charAt(i + 5) >= '1' && line.charAt(i + 5) <= '9') {
										ret.num_notes = line.charAt(i + 5) - '0';
										i += 4;
									}
								} else {
									i += 2;
								}
							} else warn("expected number after the triplet to mark the duration", line, i);
						}
					}
					i++;
				} else {
					if (ret.startSlur === undefined) ret.startSlur = 1;else ret.startSlur++;
				}
			}
			i++;
		}
		ret.consumed = i - start;
		return ret;
	};

	var addWords = function addWords(line, words) {
		if (!line) {
			warn("Can't add words before the first line of music", line, 0);return;
		}
		words = parseCommon.strip(words);
		if (words.charAt(words.length - 1) !== '-') words = words + ' '; // Just makes it easier to parse below, since every word has a divider after it.
		var word_list = [];
		// first make a list of words from the string we are passed. A word is divided on either a space or dash.
		var last_divider = 0;
		var replace = false;
		var addWord = function addWord(i) {
			var word = parseCommon.strip(words.substring(last_divider, i));
			last_divider = i + 1;
			if (word.length > 0) {
				if (replace) word = parseCommon.gsub(word, '~', ' ');
				var div = words.charAt(i);
				if (div !== '_' && div !== '-') div = ' ';
				word_list.push({ syllable: tokenizer.translateString(word), divider: div });
				replace = false;
				return true;
			}
			return false;
		};
		for (var i = 0; i < words.length; i++) {
			switch (words.charAt(i)) {
				case ' ':
				case '\x12':
					addWord(i);
					break;
				case '-':
					if (!addWord(i) && word_list.length > 0) {
						parseCommon.last(word_list).divider = '-';
						word_list.push({ skip: true, to: 'next' });
					}
					break;
				case '_':
					addWord(i);
					word_list.push({ skip: true, to: 'slur' });
					break;
				case '*':
					addWord(i);
					word_list.push({ skip: true, to: 'next' });
					break;
				case '|':
					addWord(i);
					word_list.push({ skip: true, to: 'bar' });
					break;
				case '~':
					replace = true;
					break;
			}
		}

		var inSlur = false;
		parseCommon.each(line, function (el) {
			if (word_list.length !== 0) {
				if (word_list[0].skip) {
					switch (word_list[0].to) {
						case 'next':
							if (el.el_type === 'note' && el.pitches !== null && !inSlur) word_list.shift();break;
						case 'slur':
							if (el.el_type === 'note' && el.pitches !== null) word_list.shift();break;
						case 'bar':
							if (el.el_type === 'bar') word_list.shift();break;
					}
					if (el.el_type !== 'bar') {
						if (el.lyric === undefined) el.lyric = [{ syllable: "", divider: " " }];else el.lyric.push({ syllable: "", divider: " " });
					}
				} else {
					if (el.el_type === 'note' && el.rest === undefined && !inSlur) {
						var lyric = word_list.shift();
						if (lyric.syllable) lyric.syllable = lyric.syllable.replace(/ +/g, '\xA0');
						if (el.lyric === undefined) el.lyric = [lyric];else el.lyric.push(lyric);
					}
				}
			}
		});
	};

	var addSymbols = function addSymbols(line, words) {
		// TODO-PER: Currently copied from w: line. This needs to be read as symbols instead.
		if (!line) {
			warn("Can't add symbols before the first line of music", line, 0);return;
		}
		words = parseCommon.strip(words);
		if (words.charAt(words.length - 1) !== '-') words = words + ' '; // Just makes it easier to parse below, since every word has a divider after it.
		var word_list = [];
		// first make a list of words from the string we are passed. A word is divided on either a space or dash.
		var last_divider = 0;
		var replace = false;
		var addWord = function addWord(i) {
			var word = parseCommon.strip(words.substring(last_divider, i));
			last_divider = i + 1;
			if (word.length > 0) {
				if (replace) word = parseCommon.gsub(word, '~', ' ');
				var div = words.charAt(i);
				if (div !== '_' && div !== '-') div = ' ';
				word_list.push({ syllable: tokenizer.translateString(word), divider: div });
				replace = false;
				return true;
			}
			return false;
		};
		for (var i = 0; i < words.length; i++) {
			switch (words.charAt(i)) {
				case ' ':
				case '\x12':
					addWord(i);
					break;
				case '-':
					if (!addWord(i) && word_list.length > 0) {
						parseCommon.last(word_list).divider = '-';
						word_list.push({ skip: true, to: 'next' });
					}
					break;
				case '_':
					addWord(i);
					word_list.push({ skip: true, to: 'slur' });
					break;
				case '*':
					addWord(i);
					word_list.push({ skip: true, to: 'next' });
					break;
				case '|':
					addWord(i);
					word_list.push({ skip: true, to: 'bar' });
					break;
				case '~':
					replace = true;
					break;
			}
		}

		var inSlur = false;
		parseCommon.each(line, function (el) {
			if (word_list.length !== 0) {
				if (word_list[0].skip) {
					switch (word_list[0].to) {
						case 'next':
							if (el.el_type === 'note' && el.pitches !== null && !inSlur) word_list.shift();break;
						case 'slur':
							if (el.el_type === 'note' && el.pitches !== null) word_list.shift();break;
						case 'bar':
							if (el.el_type === 'bar') word_list.shift();break;
					}
				} else {
					if (el.el_type === 'note' && el.rest === undefined && !inSlur) {
						var lyric = word_list.shift();
						if (el.lyric === undefined) el.lyric = [lyric];else el.lyric.push(lyric);
					}
				}
			}
		});
	};

	var getBrokenRhythm = function getBrokenRhythm(line, index) {
		switch (line.charAt(index)) {
			case '>':
				if (index < line.length - 1 && line.charAt(index + 1) === '>') // double >>
					return [2, 1.75, 0.25];else return [1, 1.5, 0.5];
				break;
			case '<':
				if (index < line.length - 1 && line.charAt(index + 1) === '<') // double <<
					return [2, 0.25, 1.75];else return [1, 0.5, 1.5];
				break;
		}
		return null;
	};

	// TODO-PER: make this a method in el.
	var addEndBeam = function addEndBeam(el) {
		if (el.duration !== undefined && el.duration < 0.25) el.end_beam = true;
		return el;
	};

	var pitches = { A: 5, B: 6, C: 0, D: 1, E: 2, F: 3, G: 4, a: 12, b: 13, c: 7, d: 8, e: 9, f: 10, g: 11 };
	var rests = { x: 'invisible', y: 'spacer', z: 'rest', Z: 'multimeasure' };
	var getCoreNote = function getCoreNote(line, index, el, canHaveBrokenRhythm) {
		//var el = { startChar: index };
		var isComplete = function isComplete(state) {
			return state === 'octave' || state === 'duration' || state === 'Zduration' || state === 'broken_rhythm' || state === 'end_slur';
		};
		var state = 'startSlur';
		var durationSetByPreviousNote = false;
		while (1) {
			switch (line.charAt(index)) {
				case '(':
					if (state === 'startSlur') {
						if (el.startSlur === undefined) el.startSlur = 1;else el.startSlur++;
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case ')':
					if (isComplete(state)) {
						if (el.endSlur === undefined) el.endSlur = 1;else el.endSlur++;
					} else return null;
					break;
				case '^':
					if (state === 'startSlur') {
						el.accidental = 'sharp';state = 'sharp2';
					} else if (state === 'sharp2') {
						el.accidental = 'dblsharp';state = 'pitch';
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case '_':
					if (state === 'startSlur') {
						el.accidental = 'flat';state = 'flat2';
					} else if (state === 'flat2') {
						el.accidental = 'dblflat';state = 'pitch';
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case '=':
					if (state === 'startSlur') {
						el.accidental = 'natural';state = 'pitch';
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case 'A':
				case 'B':
				case 'C':
				case 'D':
				case 'E':
				case 'F':
				case 'G':
				case 'a':
				case 'b':
				case 'c':
				case 'd':
				case 'e':
				case 'f':
				case 'g':
					if (state === 'startSlur' || state === 'sharp2' || state === 'flat2' || state === 'pitch') {
						el.pitch = pitches[line.charAt(index)];
						transpose.note(multilineVars, el);
						state = 'octave';
						// At this point we have a valid note. The rest is optional. Set the duration in case we don't get one below
						if (canHaveBrokenRhythm && multilineVars.next_note_duration !== 0) {
							el.duration = multilineVars.default_length * multilineVars.next_note_duration;
							multilineVars.next_note_duration = 0;
							durationSetByPreviousNote = true;
						} else el.duration = multilineVars.default_length;
						// If the clef is percussion, there is probably some translation of the pitch to a particular drum kit item.
						if (multilineVars.clef && multilineVars.clef.type === "perc" || multilineVars.currentVoice && multilineVars.currentVoice.clef === "perc") {
							var key = line.charAt(index);
							if (el.accidental) {
								var accMap = { 'dblflat': '__', 'flat': '_', 'natural': '=', 'sharp': '^', 'dblsharp': '^^' };
								key = accMap[el.accidental] + key;
							}
							if (tune.formatting && tune.formatting.midi && tune.formatting.midi.drummap) el.midipitch = tune.formatting.midi.drummap[key];
						}
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case ',':
					if (state === 'octave') {
						el.pitch -= 7;
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case '\'':
					if (state === 'octave') {
						el.pitch += 7;
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case 'x':
				case 'y':
				case 'z':
				case 'Z':
					if (state === 'startSlur') {
						el.rest = { type: rests[line.charAt(index)] };
						// There shouldn't be some of the properties that notes have. If some sneak in due to bad syntax in the abc file,
						// just nix them here.
						delete el.accidental;
						delete el.startSlur;
						delete el.startTie;
						delete el.endSlur;
						delete el.endTie;
						delete el.end_beam;
						delete el.grace_notes;
						// At this point we have a valid note. The rest is optional. Set the duration in case we don't get one below
						if (el.rest.type === 'multimeasure') {
							el.duration = 1;
							state = 'Zduration';
						} else {
							if (canHaveBrokenRhythm && multilineVars.next_note_duration !== 0) {
								el.duration = multilineVars.default_length * multilineVars.next_note_duration;
								multilineVars.next_note_duration = 0;
								durationSetByPreviousNote = true;
							} else el.duration = multilineVars.default_length;
							state = 'duration';
						}
					} else if (isComplete(state)) {
						el.endChar = index;return el;
					} else return null;
					break;
				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
				case '9':
				case '0':
				case '/':
					if (state === 'octave' || state === 'duration') {
						var fraction = tokenizer.getFraction(line, index);
						//if (!durationSetByPreviousNote)
						el.duration = el.duration * fraction.value;
						// TODO-PER: We can test the returned duration here and give a warning if it isn't the one expected.
						el.endChar = fraction.index;
						while (fraction.index < line.length && (tokenizer.isWhiteSpace(line.charAt(fraction.index)) || line.charAt(fraction.index) === '-')) {
							if (line.charAt(fraction.index) === '-') el.startTie = {};else el = addEndBeam(el);
							fraction.index++;
						}
						index = fraction.index - 1;
						state = 'broken_rhythm';
					} else if (state === 'sharp2') {
						el.accidental = 'quartersharp';state = 'pitch';
					} else if (state === 'flat2') {
						el.accidental = 'quarterflat';state = 'pitch';
					} else if (state === 'Zduration') {
						var num = tokenizer.getNumber(line, index);
						el.duration = num.num;
						el.endChar = num.index;
						return el;
					} else return null;
					break;
				case '-':
					if (state === 'startSlur') {
						// This is the first character, so it must have been meant for the previous note. Correct that here.
						tune.addTieToLastNote();
						el.endTie = true;
					} else if (state === 'octave' || state === 'duration' || state === 'end_slur') {
						el.startTie = {};
						if (!durationSetByPreviousNote && canHaveBrokenRhythm) state = 'broken_rhythm';else {
							// Peek ahead to the next character. If it is a space, then we have an end beam.
							if (tokenizer.isWhiteSpace(line.charAt(index + 1))) addEndBeam(el);
							el.endChar = index + 1;
							return el;
						}
					} else if (state === 'broken_rhythm') {
						el.endChar = index;return el;
					} else return null;
					break;
				case ' ':
				case '\t':
					if (isComplete(state)) {
						el.end_beam = true;
						// look ahead to see if there is a tie
						do {
							if (line.charAt(index) === '-') el.startTie = {};
							index++;
						} while (index < line.length && (tokenizer.isWhiteSpace(line.charAt(index)) || line.charAt(index) === '-'));
						el.endChar = index;
						if (!durationSetByPreviousNote && canHaveBrokenRhythm && (line.charAt(index) === '<' || line.charAt(index) === '>')) {
							// TODO-PER: Don't need the test for < and >, but that makes the endChar work out for the regression test.
							index--;
							state = 'broken_rhythm';
						} else return el;
					} else return null;
					break;
				case '>':
				case '<':
					if (isComplete(state)) {
						if (canHaveBrokenRhythm) {
							var br2 = getBrokenRhythm(line, index);
							index += br2[0] - 1; // index gets incremented below, so we'll let that happen
							multilineVars.next_note_duration = br2[2];
							el.duration = br2[1] * el.duration;
							state = 'end_slur';
						} else {
							el.endChar = index;
							return el;
						}
					} else return null;
					break;
				default:
					if (isComplete(state)) {
						el.endChar = index;
						return el;
					}
					return null;
			}
			index++;
			if (index === line.length) {
				if (isComplete(state)) {
					el.endChar = index;return el;
				} else return null;
			}
		}
		return null;
	};

	function startNewLine() {
		var params = { startChar: -1, endChar: -1 };
		if (multilineVars.partForNextLine.length) params.part = multilineVars.partForNextLine;
		params.clef = multilineVars.currentVoice && multilineVars.staves[multilineVars.currentVoice.staffNum].clef !== undefined ? parseCommon.clone(multilineVars.staves[multilineVars.currentVoice.staffNum].clef) : parseCommon.clone(multilineVars.clef);
		var scoreTranspose = multilineVars.currentVoice ? multilineVars.currentVoice.scoreTranspose : 0;
		params.key = parseKeyVoice.standardKey(multilineVars.key.root + multilineVars.key.acc + multilineVars.key.mode, multilineVars.key.root, multilineVars.key.acc, scoreTranspose);
		params.key.mode = multilineVars.key.mode;
		if (multilineVars.key.impliedNaturals) params.key.impliedNaturals = multilineVars.key.impliedNaturals;
		if (multilineVars.key.explicitAccidentals) {
			for (var i = 0; i < multilineVars.key.explicitAccidentals.length; i++) {
				var found = false;
				for (var j = 0; j < params.key.accidentals.length; j++) {
					if (params.key.accidentals[j].note === multilineVars.key.explicitAccidentals[i].note) {
						// If the note is already in the list, override it with the new value
						params.key.accidentals[j].acc = multilineVars.key.explicitAccidentals[i].acc;
						found = true;
					}
				}
				if (!found) params.key.accidentals.push(multilineVars.key.explicitAccidentals[i]);
			}
		}
		if (params.key.explicitAccidentals) delete params.key.explicitAccidentals;
		parseKeyVoice.addPosToKey(params.clef, params.key);
		if (multilineVars.meter !== null) {
			if (multilineVars.currentVoice) {
				parseCommon.each(multilineVars.staves, function (st) {
					st.meter = multilineVars.meter;
				});
				params.meter = multilineVars.staves[multilineVars.currentVoice.staffNum].meter;
				multilineVars.staves[multilineVars.currentVoice.staffNum].meter = null;
			} else params.meter = multilineVars.meter;
			multilineVars.meter = null;
		} else if (multilineVars.currentVoice && multilineVars.staves[multilineVars.currentVoice.staffNum].meter) {
			// Make sure that each voice gets the meter marking.
			params.meter = multilineVars.staves[multilineVars.currentVoice.staffNum].meter;
			multilineVars.staves[multilineVars.currentVoice.staffNum].meter = null;
		}
		if (multilineVars.currentVoice && multilineVars.currentVoice.name) params.name = multilineVars.currentVoice.name;
		if (multilineVars.vocalfont) params.vocalfont = multilineVars.vocalfont;
		if (multilineVars.style) params.style = multilineVars.style;
		if (multilineVars.currentVoice) {
			var staff = multilineVars.staves[multilineVars.currentVoice.staffNum];
			if (staff.brace) params.brace = staff.brace;
			if (staff.bracket) params.bracket = staff.bracket;
			if (staff.connectBarLines) params.connectBarLines = staff.connectBarLines;
			if (staff.name) params.name = staff.name[multilineVars.currentVoice.index];
			if (staff.subname) params.subname = staff.subname[multilineVars.currentVoice.index];
			if (multilineVars.currentVoice.stem) params.stem = multilineVars.currentVoice.stem;
			if (multilineVars.currentVoice.stafflines) params.stafflines = multilineVars.currentVoice.stafflines;
			if (multilineVars.currentVoice.staffscale) params.staffscale = multilineVars.currentVoice.staffscale;
			if (multilineVars.currentVoice.scale) params.scale = multilineVars.currentVoice.scale;
			if (multilineVars.currentVoice.style) params.style = multilineVars.currentVoice.style;
			if (multilineVars.currentVoice.transpose) params.clef.transpose = multilineVars.currentVoice.transpose;
		}
		var isFirstVoice = multilineVars.currentVoice === undefined || multilineVars.currentVoice.staffNum === 0 && multilineVars.currentVoice.index === 0;
		if (multilineVars.barNumbers === 0 && isFirstVoice && multilineVars.currBarNumber !== 1) params.barNumber = multilineVars.currBarNumber;
		tune.startNewLine(params);
		if (multilineVars.key.impliedNaturals) delete multilineVars.key.impliedNaturals;

		multilineVars.partForNextLine = "";
	}

	var letter_to_grace = function letter_to_grace(line, i) {
		// Grace notes are an array of: startslur, note, endslur, space; where note is accidental, pitch, duration
		if (line.charAt(i) === '{') {
			// fetch the gracenotes string and consume that into the array
			var gra = tokenizer.getBrackettedSubstring(line, i, 1, '}');
			if (!gra[2]) warn("Missing the closing '}' while parsing grace note", line, i);
			// If there is a slur after the grace construction, then move it to the last note inside the grace construction
			if (line[i + gra[0]] === ')') {
				gra[0]++;
				gra[1] += ')';
			}

			var gracenotes = [];
			var ii = 0;
			var inTie = false;
			while (ii < gra[1].length) {
				var acciaccatura = false;
				if (gra[1].charAt(ii) === '/') {
					acciaccatura = true;
					ii++;
				}
				var note = getCoreNote(gra[1], ii, {}, false);
				if (note !== null) {
					// The grace note durations should not be affected by the default length: they should be based on 1/16, so if that isn't the default, then multiply here.
					note.duration = note.duration / (multilineVars.default_length * 8);
					if (acciaccatura) note.acciaccatura = true;
					gracenotes.push(note);

					if (inTie) {
						note.endTie = true;
						inTie = false;
					}
					if (note.startTie) inTie = true;

					ii = note.endChar;
					delete note.endChar;
				} else {
					// We shouldn't get anything but notes or a space here, so report an error
					if (gra[1].charAt(ii) === ' ') {
						if (gracenotes.length > 0) gracenotes[gracenotes.length - 1].end_beam = true;
					} else warn("Unknown character '" + gra[1].charAt(ii) + "' while parsing grace note", line, i);
					ii++;
				}
			}
			if (gracenotes.length) return [gra[0], gracenotes];
		}
		return [0];
	};

	function letter_to_overlay(line, i) {
		if (line.charAt(i) === '&') {
			var start = i;
			while (line.charAt(i) && line.charAt(i) !== ':' && line.charAt(i) !== '|') {
				i++;
			}return [i - start, line.substring(start + 1, i)];
		}
		return [0];
	}

	function durationOfMeasure(multilineVars) {
		// TODO-PER: This could be more complicated if one of the unusual measures is used.
		var meter = multilineVars.origMeter;
		if (!meter || meter.type !== 'specified') return 1;
		if (!meter.value || meter.value.length === 0) return 1;
		return parseInt(meter.value[0].num, 10) / parseInt(meter.value[0].den, 10);
	}

	//
	// Parse line of music
	//
	// This is a stream of <(bar-marking|header|note-group)...> in any order, with optional spaces between each element
	// core-note is <open-slur, accidental, pitch:required, octave, duration, close-slur&|tie> with no spaces within that
	// chord is <open-bracket:required, core-note:required... close-bracket:required duration> with no spaces within that
	// grace-notes is <open-brace:required, (open-slur|core-note:required|close-slur)..., close-brace:required> spaces are allowed
	// note-group is <grace-notes, chord symbols&|decorations..., grace-notes, slur&|triplet, chord|core-note, end-slur|tie> spaces are allowed between items
	// bar-marking is <ampersand> or <chord symbols&|decorations..., bar:required> spaces allowed
	// header is <open-bracket:required, K|M|L|V:required, colon:required, field:required, close-bracket:required> spaces can occur between the colon, in the field, and before the close bracket
	// header can also be the only thing on a line. This is true even if it is a continuation line. In this case the brackets are not required.
	// a space is a back-tick, a space, or a tab. If it is a back-tick, then there is no end-beam.

	// Line preprocessing: anything after a % is ignored (the double %% should have been taken care of before this)
	// Then, all leading and trailing spaces are ignored.
	// If there was a line continuation, the \n was replaced by a \r and the \ was replaced by a space. This allows the construct
	// of having a header mid-line conceptually, but actually be at the start of the line. This is equivolent to putting the header in [ ].

	// TODO-PER: How to handle ! for line break?
	// TODO-PER: dots before bar, dots before slur
	// TODO-PER: U: redefinable symbols.

	// Ambiguous symbols:
	// "[" can be the start of a chord, the start of a header element or part of a bar line.
	// --- if it is immediately followed by "|", it is a bar line
	// --- if it is immediately followed by K: L: M: V: it is a header (note: there are other headers mentioned in the standard, but I'm not sure how they would be used.)
	// --- otherwise it is the beginning of a chord
	// "(" can be the start of a slur or a triplet
	// --- if it is followed by a number from 2-9, then it is a triplet
	// --- otherwise it is a slur
	// "]"
	// --- if there is a chord open, then this is the close
	// --- if it is after a [|, then it is an invisible bar line
	// --- otherwise, it is par of a bar
	// "." can be a bar modifier or a slur modifier, or a decoration
	// --- if it comes immediately before a bar, it is a bar modifier
	// --- if it comes immediately before a slur, it is a slur modifier
	// --- otherwise it is a decoration for the next note.
	// number:
	// --- if it is after a bar, with no space, it is an ending marker
	// --- if it is after a ( with no space, it is a triplet count
	// --- if it is after a pitch or octave or slash, then it is a duration

	// Unambiguous symbols (except inside quoted strings):
	// vertical-bar, colon: part of a bar
	// ABCDEFGabcdefg: pitch
	// xyzZ: rest
	// comma, prime: octave
	// close-paren: end-slur
	// hyphen: tie
	// tilde, v, u, bang, plus, THLMPSO: decoration
	// carat, underscore, equal: accidental
	// ampersand: time reset
	// open-curly, close-curly: grace notes
	// double-quote: chord symbol
	// less-than, greater-than, slash: duration
	// back-tick, space, tab: space
	var nonDecorations = "ABCDEFGabcdefgxyzZ[]|^_{"; // use this to prescreen so we don't have to look for a decoration at every note.

	var parseRegularMusicLine = function parseRegularMusicLine(line) {
		header.resolveTempo();
		//multilineVars.havent_set_length = false;	// To late to set this now.
		multilineVars.is_in_header = false; // We should have gotten a key header by now, but just in case, this is definitely out of the header.
		var i = 0;
		var startOfLine = multilineVars.iChar;
		// see if there is nothing but a comment on this line. If so, just ignore it. A full line comment is optional white space followed by %
		while (tokenizer.isWhiteSpace(line.charAt(i)) && i < line.length) {
			i++;
		}if (i === line.length || line.charAt(i) === '%') return;

		// Start with the standard staff, clef and key symbols on each line
		var delayStartNewLine = multilineVars.start_new_line;
		if (multilineVars.continueall === undefined) multilineVars.start_new_line = true;else multilineVars.start_new_line = false;
		var tripletNotesLeft = 0;

		// See if the line starts with a header field
		var retHeader = header.letter_to_body_header(line, i);
		if (retHeader[0] > 0) {
			i += retHeader[0];
			if (retHeader[1] === 'V') delayStartNewLine = true; // fixes bug on this: c[V:2]d
			// TODO-PER: Handle inline headers
		}
		var el = {};

		while (i < line.length) {
			var startI = i;
			if (line.charAt(i) === '%') break;

			var retInlineHeader = header.letter_to_inline_header(line, i);
			if (retInlineHeader[0] > 0) {
				i += retInlineHeader[0];
				if (retInlineHeader[1] === 'V') delayStartNewLine = true; // fixes bug on this: c[V:2]d
				// TODO-PER: Handle inline headers
				//multilineVars.start_new_line = false;
			} else {
				// Wait until here to actually start the line because we know we're past the inline statements.
				if (delayStartNewLine) {
					startNewLine();
					delayStartNewLine = false;
				}

				// We need to decide if the following characters are a bar-marking or a note-group.
				// Unfortunately, that is ambiguous. Both can contain chord symbols and decorations.
				// If there is a grace note either before or after the chord symbols and decorations, then it is definitely a note-group.
				// If there is a bar marker, it is definitely a bar-marking.
				// If there is either a core-note or chord, it is definitely a note-group.
				// So, loop while we find grace-notes, chords-symbols, or decorations. [It is an error to have more than one grace-note group in a row; the others can be multiple]
				// Then, if there is a grace-note, we know where to go.
				// Else see if we have a chord, core-note, slur, triplet, or bar.

				var ret;
				while (1) {
					ret = tokenizer.eatWhiteSpace(line, i);
					if (ret > 0) {
						i += ret;
					}
					if (i > 0 && line.charAt(i - 1) === '\x12') {
						// there is one case where a line continuation isn't the same as being on the same line, and that is if the next character after it is a header.
						ret = header.letter_to_body_header(line, i);
						if (ret[0] > 0) {
							if (ret[1] === 'V') startNewLine(); // fixes bug on this: c\\nV:2]\\nd
							// TODO: insert header here
							i = ret[0];
							multilineVars.start_new_line = false;
						}
					}
					// gather all the grace notes, chord symbols and decorations
					ret = letter_to_spacer(line, i);
					if (ret[0] > 0) {
						i += ret[0];
					}

					ret = letter_to_overlay(line, i);
					if (ret[0] > 0) {
						tune.appendElement('overlay', startOfLine, startOfLine + 1, {});
						i += 1;
					}

					ret = letter_to_chord(line, i);
					if (ret[0] > 0) {
						// There could be more than one chord here if they have different positions.
						// If two chords have the same position, then connect them with newline.
						if (!el.chord) el.chord = [];
						var chordName = tokenizer.translateString(ret[1]);
						chordName = chordName.replace(/;/g, "\n");
						var addedChord = false;
						for (var ci = 0; ci < el.chord.length; ci++) {
							if (el.chord[ci].position === ret[2]) {
								addedChord = true;
								el.chord[ci].name += "\n" + chordName;
							}
						}
						if (addedChord === false) {
							if (ret[2] === null && ret[3]) el.chord.push({ name: chordName, rel_position: ret[3] });else el.chord.push({ name: chordName, position: ret[2] });
						}

						i += ret[0];
						var ii = tokenizer.skipWhiteSpace(line.substring(i));
						if (ii > 0) el.force_end_beam_last = true;
						i += ii;
					} else {
						if (nonDecorations.indexOf(line.charAt(i)) === -1) ret = letter_to_accent(line, i);else ret = [0];
						if (ret[0] > 0) {
							if (ret[1] === null) {
								if (i + 1 < line.length) startNewLine(); // There was a ! in the middle of the line. Start a new line if there is anything after it.
							} else if (ret[1].length > 0) {
								if (ret[1].indexOf("style=") === 0) {
									el.style = ret[1].substr(6);
								} else {
									if (el.decoration === undefined) el.decoration = [];
									el.decoration.push(ret[1]);
								}
							}
							i += ret[0];
						} else {
							ret = letter_to_grace(line, i);
							// TODO-PER: Be sure there aren't already grace notes defined. That is an error.
							if (ret[0] > 0) {
								el.gracenotes = ret[1];
								i += ret[0];
							} else break;
						}
					}
				}

				ret = letter_to_bar(line, i);
				if (ret[0] > 0) {
					// This is definitely a bar
					if (el.gracenotes !== undefined) {
						// Attach the grace note to an invisible note
						el.rest = { type: 'spacer' };
						el.duration = 0.125; // TODO-PER: I don't think the duration of this matters much, but figure out if it does.
						multilineVars.addFormattingOptions(el, tune.formatting, 'note');
						tune.appendElement('note', startOfLine + i, startOfLine + i + ret[0], el);
						multilineVars.measureNotEmpty = true;
						el = {};
					}
					var bar = { type: ret[1] };
					if (bar.type.length === 0) warn("Unknown bar type", line, i);else {
						if (multilineVars.inEnding && bar.type !== 'bar_thin') {
							bar.endEnding = true;
							multilineVars.inEnding = false;
						}
						if (ret[2]) {
							bar.startEnding = ret[2];
							if (multilineVars.inEnding) bar.endEnding = true;
							multilineVars.inEnding = true;
						}
						if (el.decoration !== undefined) bar.decoration = el.decoration;
						if (el.chord !== undefined) bar.chord = el.chord;
						if (bar.startEnding && multilineVars.barFirstEndingNum === undefined) multilineVars.barFirstEndingNum = multilineVars.currBarNumber;else if (bar.startEnding && bar.endEnding && multilineVars.barFirstEndingNum) multilineVars.currBarNumber = multilineVars.barFirstEndingNum;else if (bar.endEnding) multilineVars.barFirstEndingNum = undefined;
						if (bar.type !== 'bar_invisible' && multilineVars.measureNotEmpty) {
							var isFirstVoice = multilineVars.currentVoice === undefined || multilineVars.currentVoice.staffNum === 0 && multilineVars.currentVoice.index === 0;
							if (isFirstVoice) {
								multilineVars.currBarNumber++;
								if (multilineVars.barNumbers && multilineVars.currBarNumber % multilineVars.barNumbers === 0) bar.barNumber = multilineVars.currBarNumber;
							}
						}
						multilineVars.addFormattingOptions(el, tune.formatting, 'bar');
						tune.appendElement('bar', startOfLine + i, startOfLine + i + ret[0], bar);
						multilineVars.measureNotEmpty = false;
						el = {};
					}
					i += ret[0];
				} else if (line[i] === '&') {
					// backtrack to beginning of measure
					warn("Overlay not yet supported", line, i);
					i++;
				} else {
					// This is definitely a note group
					//
					// Look for as many open slurs and triplets as there are. (Note: only the first triplet is valid.)
					ret = letter_to_open_slurs_and_triplets(line, i);
					if (ret.consumed > 0) {
						if (ret.startSlur !== undefined) el.startSlur = ret.startSlur;
						if (ret.triplet !== undefined) {
							if (tripletNotesLeft > 0) warn("Can't nest triplets", line, i);else {
								el.startTriplet = ret.triplet;
								el.tripletMultiplier = ret.tripletQ / ret.triplet;
								tripletNotesLeft = ret.num_notes === undefined ? ret.triplet : ret.num_notes;
							}
						}
						i += ret.consumed;
					}

					// handle chords.
					if (line.charAt(i) === '[') {
						var chordStartChar = i;
						i++;
						var chordDuration = null;
						var rememberEndBeam = false;

						var done = false;
						while (!done) {
							var accent = letter_to_accent(line, i);
							if (accent[0] > 0) {
								i += accent[0];
							}

							var chordNote = getCoreNote(line, i, {}, false);
							if (chordNote !== null) {
								if (accent[0] > 0) {
									// If we found a decoration above, it modifies the entire chord. "style" is handled below.
									if (accent[1].indexOf("style=") !== 0) {
										if (el.decoration === undefined) el.decoration = [];
										el.decoration.push(accent[1]);
									}
								}
								if (chordNote.end_beam) {
									el.end_beam = true;
									delete chordNote.end_beam;
								}
								if (el.pitches === undefined) {
									el.duration = chordNote.duration;
									el.pitches = [chordNote];
								} else // Just ignore the note lengths of all but the first note. The standard isn't clear here, but this seems less confusing.
									el.pitches.push(chordNote);
								delete chordNote.duration;
								if (accent[0] > 0) {
									// If we found a style above, it modifies the individual pitch, not the entire chord.
									if (accent[1].indexOf("style=") === 0) {
										el.pitches[el.pitches.length - 1].style = accent[1].substr(6);
									}
								}

								if (multilineVars.inTieChord[el.pitches.length]) {
									chordNote.endTie = true;
									multilineVars.inTieChord[el.pitches.length] = undefined;
								}
								if (chordNote.startTie) multilineVars.inTieChord[el.pitches.length] = true;

								i = chordNote.endChar;
								delete chordNote.endChar;
							} else if (line.charAt(i) === ' ') {
								// Spaces are not allowed in chords, but we can recover from it by ignoring it.
								warn("Spaces are not allowed in chords", line, i);
								i++;
							} else {
								if (i < line.length && line.charAt(i) === ']') {
									// consume the close bracket
									i++;

									if (multilineVars.next_note_duration !== 0) {
										el.duration = el.duration * multilineVars.next_note_duration;
										multilineVars.next_note_duration = 0;
									}

									if (multilineVars.inTie) {
										parseCommon.each(el.pitches, function (pitch) {
											pitch.endTie = true;
										});
										multilineVars.inTie = false;
									}

									if (tripletNotesLeft > 0) {
										tripletNotesLeft--;
										if (tripletNotesLeft === 0) {
											el.endTriplet = true;
										}
									}

									var postChordDone = false;
									while (i < line.length && !postChordDone) {
										switch (line.charAt(i)) {
											case ' ':
											case '\t':
												addEndBeam(el);
												break;
											case ')':
												if (el.endSlur === undefined) el.endSlur = 1;else el.endSlur++;
												break;
											case '-':
												parseCommon.each(el.pitches, function (pitch) {
													pitch.startTie = {};
												});
												multilineVars.inTie = true;
												break;
											case '>':
											case '<':
												var br2 = getBrokenRhythm(line, i);
												i += br2[0] - 1; // index gets incremented below, so we'll let that happen
												multilineVars.next_note_duration = br2[2];
												if (chordDuration) chordDuration = chordDuration * br2[1];else chordDuration = br2[1];
												break;
											case '1':
											case '2':
											case '3':
											case '4':
											case '5':
											case '6':
											case '7':
											case '8':
											case '9':
											case '/':
												var fraction = tokenizer.getFraction(line, i);
												chordDuration = fraction.value;
												i = fraction.index;
												if (line.charAt(i) === ' ') rememberEndBeam = true;
												if (line.charAt(i) === '-' || line.charAt(i) === ')' || line.charAt(i) === ' ' || line.charAt(i) === '<' || line.charAt(i) === '>') i--; // Subtracting one because one is automatically added below
												else postChordDone = true;
												break;
											default:
												postChordDone = true;
												break;
										}
										if (!postChordDone) {
											i++;
										}
									}
								} else warn("Expected ']' to end the chords", line, i);

								if (el.pitches !== undefined) {
									if (chordDuration !== null) {
										el.duration = el.duration * chordDuration;
										if (rememberEndBeam) addEndBeam(el);
									}

									multilineVars.addFormattingOptions(el, tune.formatting, 'note');
									tune.appendElement('note', startOfLine + chordStartChar, startOfLine + i, el);
									multilineVars.measureNotEmpty = true;
									el = {};
								}
								done = true;
							}
						}
					} else {
						// Single pitch
						var el2 = {};
						var core = getCoreNote(line, i, el2, true);
						if (el2.endTie !== undefined) multilineVars.inTie = true;
						if (core !== null) {
							if (core.pitch !== undefined) {
								el.pitches = [{}];
								// TODO-PER: straighten this out so there is not so much copying: getCoreNote shouldn't change e'
								if (core.accidental !== undefined) el.pitches[0].accidental = core.accidental;
								el.pitches[0].pitch = core.pitch;
								if (core.midipitch) el.pitches[0].midipitch = core.midipitch;
								if (core.endSlur !== undefined) el.pitches[0].endSlur = core.endSlur;
								if (core.endTie !== undefined) el.pitches[0].endTie = core.endTie;
								if (core.startSlur !== undefined) el.pitches[0].startSlur = core.startSlur;
								if (el.startSlur !== undefined) el.pitches[0].startSlur = el.startSlur;
								if (core.startTie !== undefined) el.pitches[0].startTie = core.startTie;
								if (el.startTie !== undefined) el.pitches[0].startTie = el.startTie;
							} else {
								el.rest = core.rest;
								if (core.endSlur !== undefined) el.endSlur = core.endSlur;
								if (core.endTie !== undefined) el.rest.endTie = core.endTie;
								if (core.startSlur !== undefined) el.startSlur = core.startSlur;
								if (core.startTie !== undefined) el.rest.startTie = core.startTie;
								if (el.startTie !== undefined) el.rest.startTie = el.startTie;
							}

							if (core.chord !== undefined) el.chord = core.chord;
							if (core.duration !== undefined) el.duration = core.duration;
							if (core.decoration !== undefined) el.decoration = core.decoration;
							if (core.graceNotes !== undefined) el.graceNotes = core.graceNotes;
							delete el.startSlur;
							if (multilineVars.inTie) {
								if (el.pitches !== undefined) {
									el.pitches[0].endTie = true;
									multilineVars.inTie = false;
								} else if (el.rest.type !== 'spacer') {
									el.rest.endTie = true;
									multilineVars.inTie = false;
								}
							}
							if (core.startTie || el.startTie) multilineVars.inTie = true;
							i = core.endChar;

							if (tripletNotesLeft > 0) {
								tripletNotesLeft--;
								if (tripletNotesLeft === 0) {
									el.endTriplet = true;
								}
							}

							if (core.end_beam) addEndBeam(el);

							// If there is a whole rest, then it should be the duration of the measure, not it's own duration. We need to special case it.
							if (el.rest && el.rest.type === 'rest' && el.duration === 1) {
								el.rest.type = 'whole';

								el.duration = durationOfMeasure(multilineVars);
							}

							multilineVars.addFormattingOptions(el, tune.formatting, 'note');
							tune.appendElement('note', startOfLine + startI, startOfLine + i, el);
							multilineVars.measureNotEmpty = true;
							el = {};
						}
					}

					if (i === startI) {
						// don't know what this is, so ignore it.
						if (line.charAt(i) !== ' ' && line.charAt(i) !== '`') warn("Unknown character ignored", line, i);
						i++;
					}
				}
			}
		}
	};

	var parseLine = function parseLine(line) {
		var ret = header.parseHeader(line);
		if (ret.regular) parseRegularMusicLine(ret.str);
		if (ret.newline && multilineVars.continueall === undefined) startNewLine();
		if (ret.words) addWords(tune.getCurrentVoice(), line.substring(2));
		if (ret.symbols) addSymbols(tune.getCurrentVoice(), line.substring(2));
		if (ret.recurse) parseLine(ret.str);
	};

	function appendLastMeasure(voice, nextVoice) {
		voice.push({
			el_type: 'hint'
		});
		for (var i = 0; i < nextVoice.length; i++) {
			var element = nextVoice[i];
			var hint = parseCommon.clone(element);
			voice.push(hint);
			if (element.el_type === 'bar') return;
		}
	}

	function addHintMeasure(staff, nextStaff) {
		for (var i = 0; i < staff.length; i++) {
			var stave = staff[i];
			var nextStave = nextStaff[i];
			if (nextStave) {
				// Be sure there is the same number of staves on the next line.
				for (var j = 0; j < nextStave.voices.length; j++) {
					var nextVoice = nextStave.voices[j];
					var voice = stave.voices[j];
					if (voice) {
						// Be sure there are the same number of voices on the previous line.
						appendLastMeasure(voice, nextVoice);
					}
				}
			}
		}
	}

	function addHintMeasures() {
		for (var i = 0; i < tune.lines.length; i++) {
			var line = tune.lines[i].staff;
			if (line) {
				var j = i + 1;
				while (j < tune.lines.length && tune.lines[j].staff === undefined) {
					j++;
				}if (j < tune.lines.length) {
					var nextLine = tune.lines[j].staff;
					addHintMeasure(line, nextLine);
				}
			}
		}
	}

	this.parse = function (strTune, switches) {
		// the switches are optional and cause a difference in the way the tune is parsed.
		// switches.header_only : stop parsing when the header is finished
		// switches.stop_on_warning : stop at the first warning encountered.
		// switches.print: format for the page instead of the browser.
		// switches.format: a hash of the desired formatting commands.
		// switches.hint_measures: put the next measure at the end of the current line.
		// switches.transpose: change the key signature, chords, and notes by a number of half-steps.
		if (!switches) switches = {};
		tune.reset();
		if (switches.print) tune.media = 'print';
		multilineVars.reset();
		if (switches.visualTranspose) {
			multilineVars.globalTranspose = parseInt(switches.visualTranspose);
			if (multilineVars.globalTranspose === 0) multilineVars.globalTranspose = undefined;
		} else multilineVars.globalTranspose = undefined;
		header.reset(tokenizer, warn, multilineVars, tune);

		// Take care of whatever line endings come our way
		strTune = parseCommon.gsub(strTune, '\r\n', '\n');
		strTune = parseCommon.gsub(strTune, '\r', '\n');
		strTune += '\n'; // Tacked on temporarily to make the last line continuation work
		strTune = strTune.replace(/\n\\.*\n/g, "\n"); // get rid of latex commands.
		var continuationReplacement = function continuationReplacement(all, backslash, comment) {
			var spaces = "                                                                                                                                                                                                     ";
			var padding = comment ? spaces.substring(0, comment.length) : "";
			return backslash + " \x12" + padding;
		};
		strTune = strTune.replace(/\\([ \t]*)(%.*)*\n/g, continuationReplacement); // take care of line continuations right away, but keep the same number of characters
		var lines = strTune.split('\n');
		if (parseCommon.last(lines).length === 0) // remove the blank line we added above.
			lines.pop();
		try {
			if (switches.format) {
				parseDirective.globalFormatting(switches.format);
			}
			parseCommon.each(lines, function (line) {
				if (switches.header_only && multilineVars.is_in_header === false) throw "normal_abort";
				if (switches.stop_on_warning && multilineVars.warnings) throw "normal_abort";
				if (multilineVars.is_in_history) {
					if (line.charAt(1) === ':') {
						multilineVars.is_in_history = false;
						parseLine(line);
					} else tune.addMetaText("history", tokenizer.translateString(tokenizer.stripComment(line)));
				} else if (multilineVars.inTextBlock) {
					if (parseCommon.startsWith(line, "%%endtext")) {
						//tune.addMetaText("textBlock", multilineVars.textBlock);
						tune.addText(multilineVars.textBlock);
						multilineVars.inTextBlock = false;
					} else {
						if (parseCommon.startsWith(line, "%%")) multilineVars.textBlock += ' ' + line.substring(2);else multilineVars.textBlock += ' ' + line;
					}
				} else if (multilineVars.inPsBlock) {
					if (parseCommon.startsWith(line, "%%endps")) {
						// Just ignore postscript
						multilineVars.inPsBlock = false;
					} else multilineVars.textBlock += ' ' + line;
				} else parseLine(line);
				multilineVars.iChar += line.length + 1;
			});
			var ph = 11 * 72;
			var pl = 8.5 * 72;
			switch (multilineVars.papersize) {
				//case "letter": ph = 11*72; pl = 8.5*72; break;
				case "legal":
					ph = 14 * 72;pl = 8.5 * 72;break;
				case "A4":
					ph = 11.7 * 72;pl = 8.3 * 72;break;
			}
			if (multilineVars.landscape) {
				var x = ph;
				ph = pl;
				pl = x;
			}
			multilineVars.openSlurs = tune.cleanUp(pl, ph, multilineVars.barsperstaff, multilineVars.staffnonote, multilineVars.openSlurs);
		} catch (err) {
			if (err !== "normal_abort") throw err;
		}
		if (switches.hint_measures) {
			addHintMeasures();
		}
	};
};

module.exports = Parse;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_transpose.js: Handles the automatic transposition of key signatures, chord symbols, and notes.
//    Copyright (C) 2010-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var transpose = {};

var keyIndex = {
	'C': 0,
	'C#': 1,
	'Db': 1,
	'D': 2,
	'D#': 3,
	'Eb': 3,
	'E': 4,
	'F': 5,
	'F#': 6,
	'Gb': 6,
	'G': 7,
	'G#': 8,
	'Ab': 8,
	'A': 9,
	'A#': 10,
	'Bb': 10,
	'B': 11
};
var newKey = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
var newKeyMinor = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];

transpose.keySignature = function (multilineVars, keys, keyName, root, acc, localTranspose) {
	if (!localTranspose) localTranspose = 0;
	multilineVars.localTransposeVerticalMovement = 0;
	multilineVars.localTransposePreferFlats = false;
	var k = keys[keyName];
	if (!k) return multilineVars.key; // If the key isn't in the list, it is non-standard. We won't attempt to transpose it.
	multilineVars.localTranspose = (multilineVars.globalTranspose ? multilineVars.globalTranspose : 0) + localTranspose;

	if (!multilineVars.localTranspose) return { accidentals: k, root: root, acc: acc };
	multilineVars.globalTransposeOrigKeySig = k;
	if (multilineVars.localTranspose % 12 === 0) {
		multilineVars.localTransposeVerticalMovement = multilineVars.localTranspose / 12 * 7;
		return { accidentals: k, root: root, acc: acc };
	}

	var baseKey = keyName[0];
	if (keyName[1] === 'b' || keyName[1] === '#') {
		baseKey += keyName[1];
		keyName = keyName.substr(2);
	} else keyName = keyName.substr(1);
	var index = keyIndex[baseKey] + multilineVars.localTranspose;
	while (index < 0) {
		index += 12;
	}if (index > 11) index = index % 12;
	var newKeyName = keyName[0] === 'm' ? newKeyMinor[index] : newKey[index];
	var transposedKey = newKeyName + keyName;
	var newKeySig = keys[transposedKey];
	if (newKeySig.length > 0 && newKeySig[0].acc === 'flat') multilineVars.localTransposePreferFlats = true;
	var distance = transposedKey.charCodeAt(0) - baseKey.charCodeAt(0);
	if (multilineVars.localTranspose > 0) {
		if (distance < 0) distance += 7;else if (distance === 0) {
			// There's a funny thing that happens when the key changes only an accidental's distance, for instance, from Ab to A.
			// If the distance is positive (we are raising pitch), and the change is higher (that is, Ab -> A), then raise an octave.
			// This test is easier because we know the keys are not equal (or we wouldn't get this far), so if the base key is a flat key, then
			// the transposed key must be higher. Likewise, if the transposed key is sharp, then the base key must be lower. And one
			// of those two things must be true because they are not both natural.
			if (baseKey[1] === '#' || transposedKey[1] === 'b') distance += 7;
		}
	} else if (multilineVars.localTranspose < 0) {
		if (distance > 0) distance -= 7;else if (distance === 0) {
			// There's a funny thing that happens when the key changes only an accidental's distance, for instance, from Ab to A.
			// If the distance is negative (we are dropping pitch), and the change is lower (that is, A -> Ab), then drop an octave.
			if (baseKey[1] === 'b' || transposedKey[1] === '#') distance -= 7;
		}
	}

	if (multilineVars.localTranspose > 0) multilineVars.localTransposeVerticalMovement = distance + Math.floor(multilineVars.localTranspose / 12) * 7;else multilineVars.localTransposeVerticalMovement = distance + Math.ceil(multilineVars.localTranspose / 12) * 7;
	return { accidentals: newKeySig, root: newKeyName[0], acc: newKeyName.length > 1 ? newKeyName[1] : "" };
};

var sharpChords = ['C', 'C♯', 'D', "D♯", 'E', 'F', "F♯", 'G', 'G♯', 'A', 'A♯', 'B'];
var flatChords = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];

transpose.chordName = function (multilineVars, chord) {
	if (multilineVars.localTranspose && multilineVars.localTranspose % 12 !== 0) {
		// The chords are the same if it is an exact octave change.
		var transposeFactor = multilineVars.localTranspose;
		while (transposeFactor < 0) {
			transposeFactor += 12;
		}if (transposeFactor > 11) transposeFactor = transposeFactor % 12;
		chord = chord.replace(/C♭/g, "`~11`");
		chord = chord.replace(/D♭/g, "`~1`");
		chord = chord.replace(/E♭/g, "`~3`");
		chord = chord.replace(/F♭/g, "`~4`");
		chord = chord.replace(/G♭/g, "`~6`");
		chord = chord.replace(/A♭/g, "`~8`");
		chord = chord.replace(/B♭/g, "`~10`");
		chord = chord.replace(/C♯/g, "`~1`");
		chord = chord.replace(/D♯/g, "`~3`");
		chord = chord.replace(/E♯/g, "`~5`");
		chord = chord.replace(/F♯/g, "`~6`");
		chord = chord.replace(/G♯/g, "`~8`");
		chord = chord.replace(/A♯/g, "`~10`");
		chord = chord.replace(/B♯/g, "`~0`");
		chord = chord.replace(/C/g, "`~0`");
		chord = chord.replace(/D/g, "`~2`");
		chord = chord.replace(/E/g, "`~4`");
		chord = chord.replace(/F/g, "`~5`");
		chord = chord.replace(/G/g, "`~7`");
		chord = chord.replace(/A/g, "`~9`");
		chord = chord.replace(/B/g, "`~11`");
		var arr = chord.split("`");
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][0] === '~') {
				var chordNum = parseInt(arr[i].substr(1), 10);
				chordNum += transposeFactor;
				if (chordNum > 11) chordNum -= 12;
				arr[i] = multilineVars.localTransposePreferFlats ? flatChords[chordNum] : sharpChords[chordNum];
			}
		}
		chord = arr.join("");
	}
	return chord;
};

var pitchToLetter = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
function accidentalChange(origPitch, newPitch, accidental, origKeySig, newKeySig) {
	var origPitchLetter = pitchToLetter[(origPitch + 49) % 7]; // Make sure it is a positive pitch before normalizing.
	var origAccidental = 0;
	for (var i = 0; i < origKeySig.length; i++) {
		if (origKeySig[i].note.toLowerCase() === origPitchLetter) origAccidental = accidentals[origKeySig[i].acc];
	}

	var currentAccidental = accidentals[accidental];
	var delta = currentAccidental - origAccidental;

	var newPitchLetter = pitchToLetter[(newPitch + 49) % 7]; // Make sure it is a positive pitch before normalizing.
	var newAccidental = 0;
	for (var j = 0; j < newKeySig.accidentals.length; j++) {
		if (newKeySig.accidentals[j].note.toLowerCase() === newPitchLetter) newAccidental = accidentals[newKeySig.accidentals[j].acc];
	}
	var calcAccidental = delta + newAccidental;
	if (calcAccidental < -2) {
		newPitch--;
		calcAccidental += newPitchLetter === 'c' || newPitchLetter === 'f' ? 1 : 2;
	}
	if (calcAccidental > 2) {
		newPitch++;
		calcAccidental -= newPitchLetter === 'b' || newPitchLetter === 'e' ? 1 : 2;
	}
	return [newPitch, calcAccidental];
}

var accidentals = {
	dblflat: -2,
	flat: -1,
	natural: 0,
	sharp: 1,
	dblsharp: 2
};
var accidentals2 = {
	"-2": "dblflat",
	"-1": "flat",
	"0": "natural",
	"1": "sharp",
	"2": "dblsharp"
};
transpose.note = function (multilineVars, el) {
	// the "el" that is passed in has el.accidental, and el.pitch. "pitch" is the vertical position (0=middle C)
	// localTranspose is the number of half steps
	// localTransposeVerticalMovement is the vertical distance to move.
	if (!multilineVars.localTranspose) return;
	var origPitch = el.pitch;
	el.pitch = el.pitch + multilineVars.localTransposeVerticalMovement;

	if (el.accidental) {
		var ret = accidentalChange(origPitch, el.pitch, el.accidental, multilineVars.globalTransposeOrigKeySig, multilineVars.key);
		el.pitch = ret[0];
		el.accidental = accidentals2[ret[1]];
	}
};

module.exports = transpose;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_engraver_controller.js: Controls the engraving process of an ABCJS abstract syntax tree as produced by ABCJS/parse
//    Copyright (C) 2014-2018 Gregory Dyke (gregdyke at gmail dot com)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


/*global window, Math, Raphael */

var spacing = __webpack_require__(1);
var AbstractEngraver = __webpack_require__(23);
var Renderer = __webpack_require__(37);

/**
 * @class
 * Controls the engraving process, from ABCJS Abstract Syntax Tree (ABCJS AST) to rendered score sheet
 *
 * Call engraveABC to run the process. This creates a graphelems ABCJS Abstract Engraving Structure (ABCJS AES) that can be accessed through this.staffgroups
 * this data structure is first laid out (giving the graphelems x and y coordinates) and then drawn onto the renderer
 * each ABCJS AES represents a single staffgroup - all elements that are not in a staffgroup are rendered directly by the controller
 *
 * elements in ABCJS AES know their "source data" in the ABCJS AST, and their "target shape" 
 * in the renderer for highlighting purposes
 *
 * @param {Object} paper div element that will wrap the SVG
 * @param {Object} params all the params -- documented on github //TODO-GD move some of that documentation here
 */
var EngraverController = function EngraverController(paper, params) {
	params = params || {};
	this.responsive = params.responsive;
	this.space = 3 * spacing.SPACE;
	this.scale = params.scale ? parseFloat(params.scale) : 0;
	if (!(this.scale > 0.1)) this.scale = undefined;

	if (params.staffwidth) {
		// Note: Normally all measurements to the engraver are in POINTS. However, if a person is formatting for the
		// screen and directly inputting the width, then it is more logical to have the measurement in pixels.
		this.staffwidthScreen = params.staffwidth;
		this.staffwidthPrint = params.staffwidth;
	} else {
		this.staffwidthScreen = 740; // TODO-PER: Not sure where this number comes from, but this is how it's always been.
		this.staffwidthPrint = 680; // The number of pixels in 8.5", after 1cm of margin has been removed.
	}
	this.editable = params.editable || false;
	this.listeners = [];
	if (params.clickListener) this.addSelectListener(params.clickListener);

	this.renderer = new Renderer(paper, params.regression, params.add_classes);
	this.renderer.setPaddingOverride(params);
	this.renderer.controller = this; // TODO-GD needed for highlighting

	this.reset();
};

EngraverController.prototype.reset = function () {
	this.selected = [];
	this.ingroup = false;
	this.staffgroups = [];
	this.lastStaffGroupIndex = -1;
	if (this.engraver) this.engraver.reset();
	this.engraver = null;
	this.renderer.reset();
};

/**
 * run the engraving process
 * @param {ABCJS.Tune|ABCJS.Tune[]} abctunes 
 */
EngraverController.prototype.engraveABC = function (abctunes, tuneNumber) {
	if (abctunes[0] === undefined) {
		abctunes = [abctunes];
	}
	this.reset();

	for (var i = 0; i < abctunes.length; i++) {
		if (tuneNumber === undefined) tuneNumber = i;
		this.engraveTune(abctunes[i], tuneNumber);
	}
	if (this.renderer.doRegression) return this.renderer.regressionLines.join("\n");
};

/**
 * Some of the items on the page are not scaled, so adjust them in the opposite direction of scaling to cancel out the scaling.
 * @param {float} scale
 */
EngraverController.prototype.adjustNonScaledItems = function (scale) {
	this.width /= scale;
	this.renderer.adjustNonScaledItems(scale);
};

/**
 * Run the engraving process on a single tune
 * @param {ABCJS.Tune} abctune
 */
EngraverController.prototype.engraveTune = function (abctune, tuneNumber) {
	this.renderer.lineNumber = null;
	abctune.formatting.tripletfont = { face: "Times", size: 11, weight: "normal", style: "italic", decoration: "none" }; // TODO-PER: This font isn't defined in the standard, so it's hardcoded here for now.

	this.renderer.abctune = abctune; // TODO-PER: this is just to get the font info.
	this.renderer.setVerticalSpace(abctune.formatting);
	this.renderer.measureNumber = null;
	this.renderer.noteNumber = null;
	this.renderer.setPrintMode(abctune.media === 'print');
	var scale = abctune.formatting.scale ? abctune.formatting.scale : this.scale;
	if (this.responsive === "resize") // The resizing will mess with the scaling, so just don't do it explicitly.
		scale = undefined;
	if (scale === undefined) scale = this.renderer.isPrint ? 0.75 : 1;
	this.renderer.setPadding(abctune);
	this.engraver = new AbstractEngraver(abctune.formatting.bagpipes, this.renderer, tuneNumber);
	this.engraver.setStemHeight(this.renderer.spacing.stemHeight);
	this.renderer.engraver = this.engraver; //TODO-PER: do we need this coupling? It's just used for the tempo
	if (abctune.formatting.staffwidth) {
		this.width = abctune.formatting.staffwidth * 1.33; // The width is expressed in pt; convert to px.
	} else {
		this.width = this.renderer.isPrint ? this.staffwidthPrint : this.staffwidthScreen;
	}
	this.adjustNonScaledItems(scale);

	// Generate the raw staff line data
	var i;
	var abcLine;
	var hasPrintedTempo = false;
	for (i = 0; i < abctune.lines.length; i++) {
		abcLine = abctune.lines[i];
		if (abcLine.staff) {
			abcLine.staffGroup = this.engraver.createABCLine(abcLine.staff, !hasPrintedTempo ? abctune.metaText.tempo : null);
			hasPrintedTempo = true;
		}
	}

	// Adjust the x-coordinates to their absolute positions
	var maxWidth = this.width;
	for (i = 0; i < abctune.lines.length; i++) {
		abcLine = abctune.lines[i];
		if (abcLine.staff) {
			this.setXSpacing(abcLine.staffGroup, abctune.formatting, i === abctune.lines.length - 1, false);
			if (abcLine.staffGroup.w > maxWidth) maxWidth = abcLine.staffGroup.w;
		}
	}

	// Layout the beams and add the stems to the beamed notes.
	for (i = 0; i < abctune.lines.length; i++) {
		abcLine = abctune.lines[i];
		if (abcLine.staffGroup && abcLine.staffGroup.voices) {
			for (var j = 0; j < abcLine.staffGroup.voices.length; j++) {
				abcLine.staffGroup.voices[j].layoutBeams();
			}abcLine.staffGroup.setUpperAndLowerElements(this.renderer);
		}
	}

	// Set the staff spacing
	// TODO-PER: we should have been able to do this by the time we called setUpperAndLowerElements, but for some reason the "bottom" element seems to be set as a side effect of setting the X spacing.
	for (i = 0; i < abctune.lines.length; i++) {
		abcLine = abctune.lines[i];
		if (abcLine.staffGroup) {
			abcLine.staffGroup.height = abcLine.staffGroup.calcHeight();
		}
	}

	// Do all the writing to output
	this.renderer.topMargin(abctune);
	//this.renderer.printHorizontalLine(this.width + this.renderer.padding.left + this.renderer.padding.right);
	this.renderer.engraveTopText(this.width, abctune);
	this.renderer.addMusicPadding();

	this.staffgroups = [];
	this.lastStaffGroupIndex = -1;
	for (var line = 0; line < abctune.lines.length; line++) {
		this.renderer.lineNumber = line;
		abcLine = abctune.lines[line];
		if (abcLine.staff) {
			this.engraveStaffLine(abcLine.staffGroup);
		} else if (abcLine.subtitle && line !== 0) {
			this.renderer.outputSubtitle(this.width, abcLine.subtitle);
		} else if (abcLine.text !== undefined) {
			this.renderer.outputFreeText(abcLine.text);
		}
	}

	this.renderer.moveY(24); // TODO-PER: Empirically discovered. What variable should this be?
	this.renderer.engraveExtraText(this.width, abctune);
	this.renderer.setPaperSize(maxWidth, scale, this.responsive);
};

function calcHorizontalSpacing(isLastLine, stretchLast, targetWidth, lineWidth, spacing, spacingUnits, minSpace) {
	// TODO-PER: This used to stretch the first line when it is the only line, but I'm not sure why. abcm2ps doesn't do that
	if (isLastLine && lineWidth / targetWidth < 0.66 && !stretchLast) return null; // don't stretch last line too much
	if (Math.abs(targetWidth - lineWidth) < 2) return null; // if we are already near the target width, we're done.
	var relSpace = spacingUnits * spacing;
	var constSpace = lineWidth - relSpace;
	if (spacingUnits > 0) {
		spacing = (targetWidth - constSpace) / spacingUnits;
		if (spacing * minSpace > 50) {
			spacing = 50 / minSpace;
		}
		return spacing;
	}
	return null;
}

/**
 * Do the x-axis positioning for a single line (a group of related staffs)
 * @param {ABCJS.Tune} abctune an ABCJS AST
 * @param {Object} staffGroup an staffGroup
 * @param {Object} formatting an formatting
 * @param {boolean} isLastLine is this the last line to be printed?
 * @private
 */
EngraverController.prototype.setXSpacing = function (staffGroup, formatting, isLastLine, debug) {
	var newspace = this.space;
	//var debug = true;
	for (var it = 0; it < 8; it++) {
		// TODO-PER: shouldn't need multiple passes, but each pass gets it closer to the right spacing. (Only affects long lines: normal lines break out of this loop quickly.)
		staffGroup.layout(newspace, this.renderer, debug);
		var stretchLast = formatting.stretchlast ? formatting.stretchlast : false;
		newspace = calcHorizontalSpacing(isLastLine, stretchLast, this.width + this.renderer.padding.left, staffGroup.w, newspace, staffGroup.spacingunits, staffGroup.minspace);
		if (debug) console.log("setXSpace", it, staffGroup.w, newspace, staffGroup.minspace);
		if (newspace === null) break;
	}
	centerWholeRests(staffGroup.voices);
	//this.renderer.printHorizontalLine(this.width);
};

/**
 * Engrave a single line (a group of related staffs)
 * @param {ABCJS.Tune} abctune an ABCJS AST
 * @param {Object} staffGroup an staffGroup
 * @private
 */
EngraverController.prototype.engraveStaffLine = function (staffGroup) {
	if (this.lastStaffGroupIndex > -1) this.renderer.addStaffPadding(this.staffgroups[this.lastStaffGroupIndex], staffGroup);
	this.renderer.voiceNumber = null;
	staffGroup.draw(this.renderer);
	var height = staffGroup.height * spacing.STEP;
	//this.renderer.printVerticalLine(this.width+this.renderer.padding.left, this.renderer.y, this.renderer.y+height);
	this.staffgroups[this.staffgroups.length] = staffGroup;
	this.lastStaffGroupIndex = this.staffgroups.length - 1;
	this.renderer.y += height;
};

/**
 * Called by the Abstract Engraving Structure or any other (e.g. midi playback) to say it was selected (notehead clicked on)
 * @protected
 */
EngraverController.prototype.notifySelect = function (abselem, tuneNumber, classes) {
	this.clearSelection();
	if (abselem.highlight) {
		this.selected = [abselem];
		abselem.highlight();
	}
	var abcelem = abselem.abcelem || {};
	for (var i = 0; i < this.listeners.length; i++) {
		this.listeners[i](abcelem, tuneNumber, classes);
	}
};

/**
 * Called by the Abstract Engraving Structure to say it was modified (e.g. notehead dragged)
 * @protected
 */
// EngraverController.prototype.notifyChange = function (/*abselem*/) {
//   for (var i=0; i<this.listeners.length;i++) {
//     if (this.listeners[i].modelChanged)
//       this.listeners[i].modelChanged();
//   }
// };

/**
 *
 * @private
 */
EngraverController.prototype.clearSelection = function () {
	for (var i = 0; i < this.selected.length; i++) {
		this.selected[i].unhighlight();
	}
	this.selected = [];
};

/**
 * @param {Object} listener
 * @param {Function} listener.modelChanged the model the listener passed to this controller has changed
 * @param {Function} listener.highlight the abcelem of the model the listener passed to this controller should be highlighted
 */
EngraverController.prototype.addSelectListener = function (clickListener) {
	this.listeners[this.listeners.length] = clickListener;
};

/**
 * Tell the controller to highlight some noteheads of its engraved score
 * @param {number} start the character in the source abc where highlighting should start
 * @param {number} end the character in the source abc where highlighting should end
 */
EngraverController.prototype.rangeHighlight = function (start, end) {
	this.clearSelection();
	for (var line = 0; line < this.staffgroups.length; line++) {
		var voices = this.staffgroups[line].voices;
		for (var voice = 0; voice < voices.length; voice++) {
			var elems = voices[voice].children;
			for (var elem = 0; elem < elems.length; elem++) {
				// Since the user can highlight more than an element, or part of an element, a hit is if any of the endpoints
				// is inside the other range.
				var elStart = elems[elem].abcelem.startChar;
				var elEnd = elems[elem].abcelem.endChar;
				if (end > elStart && start < elEnd || end === start && end === elEnd) {
					//		if (elems[elem].abcelem.startChar>=start && elems[elem].abcelem.endChar<=end) {
					this.selected[this.selected.length] = elems[elem];
					elems[elem].highlight();
				}
			}
		}
	}
};

function centerWholeRests(voices) {
	// whole rests are a special case: if they are by themselves in a measure, then they should be centered.
	// (If they are not by themselves, that is probably a user error, but we'll just center it between the two items to either side of it.)
	for (var i = 0; i < voices.length; i++) {
		var voice = voices[i];
		// Look through all of the elements except for the first and last. If the whole note appears there then there isn't anything to center it between anyway.
		for (var j = 1; j < voice.children.length - 1; j++) {
			var absElem = voice.children[j];
			if (absElem.abcelem.rest && (absElem.abcelem.rest.type === 'whole' || absElem.abcelem.rest.type === 'multimeasure')) {
				var before = voice.children[j - 1];
				var after = voice.children[j + 1];
				var midpoint = (after.x - before.x) / 2 + before.x;
				absElem.x = midpoint - absElem.w / 2;
				for (var k = 0; k < absElem.children.length; k++) {
					absElem.children[k].x = absElem.x;
				}
			}
		}
	}
}

module.exports = EngraverController;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_tie_element.js: Definition of the TieElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var TieElem = function TieElem(anchor1, anchor2, above, forceandshift, isTie) {
	this.anchor1 = anchor1; // must have a .x and a .pitch, and a .parent property or be null (means starts at the "beginning" of the line - after keysig)
	this.anchor2 = anchor2; // must have a .x and a .pitch property or be null (means ends at the end of the line)
	this.above = above; // true if the arc curves above
	this.force = forceandshift; // force the arc curve, regardless of beaming if true
	this.isTie = isTie;
};

TieElem.prototype.setEndAnchor = function (anchor2) {
	this.anchor2 = anchor2; // must have a .x and a .pitch property or be null (means ends at the end of the line)
	if (this.isTie) {
		if (this.anchor1) // this can happen if the tie comes from the previous line.
			this.anchor1.isTie = true;
		if (this.anchor2) // this can happen if the tie goes to the next line.
			this.anchor2.isTie = true;
	}
};

// If we encounter a repeat sign, then we don't want to extend either a tie or a slur past it, so these are called to be a limit.
TieElem.prototype.setStartX = function (startLimitElem) {
	this.startLimitX = startLimitElem;
};

TieElem.prototype.setEndX = function (endLimitElem) {
	this.endLimitX = endLimitElem;
};

TieElem.prototype.setHint = function () {
	this.hint = true;
};

TieElem.prototype.setUpperAndLowerElements = function (positionY) {
	// Doesn't depend on the highest and lowest, so there's nothing to do here.
};

TieElem.prototype.layout = function (lineStartX, lineEndX) {
	function getPitch(anchor, isAbove, isTie) {
		if (isTie) {
			// Always go to the note
			return anchor.pitch;
		}
		if (isAbove && anchor.highestVert !== undefined) return anchor.highestVert;
		return anchor.pitch;
	}
	// We now have all of the input variables set, so we can figure out the start and ending x,y coordinates, and finalize the direction of the arc.

	// PER: We might have to override the natural slur direction if the first and last notes are not in the
	// same direction. We always put the slur up in this case. The one case that works out wrong is that we always
	// want the slur to be up when the last note is stem down. We can tell the stem direction if the top is
	// equal to the pitch: if so, there is no stem above it.
	if (!this.force && this.anchor2 && this.anchor2.pitch === this.anchor2.highestVert) // TODO-PER: this is a fragile way to detect that there is no stem going up on this note.
		this.above = true;

	// There is an exception in the slur direction if there is also a tie on the starting or ending note.
	if (this.isTie) {
		if (this.anchor1) // this can happen if the tie comes from the previous line.
			this.anchor1.tieAbove = this.above;
		if (this.anchor2) // this can happen if the tie goes to the next line.
			this.anchor2.tieAbove = this.above;
	} else {
		if (this.anchor2 && this.anchor2.isTie) this.above = this.anchor2.tieAbove;else if (this.anchor1 && this.anchor1.isTie) this.above = this.anchor1.tieAbove;
	}
	if (this.anchor1) {
		this.startX = this.anchor1.x; // The normal case where there is a starting element to attach to.
		if (this.anchor1.scalex < 1) // this is a grace note - don't offset the tie as much.
			this.startX -= 3;
	} else if (this.startLimitX) this.startX = this.startLimitX.x + this.startLimitX.w; // if there is no start element, but there is a repeat mark before the start of the line.
	else this.startX = lineStartX; // There is no element and no repeat mark: extend to the beginning of the line.

	if (this.anchor2) this.endX = this.anchor2.x; // The normal case where there is a starting element to attach to.
	else if (this.endLimitX) this.endX = this.endLimitX.x; // if there is no start element, but there is a repeat mark before the start of the line.
		else this.endX = lineEndX; // There is no element and no repeat mark: extend to the beginning of the line.

	// For the pitches, if one of the anchors is present, both of the pitches are that anchor. If both are present, then we use both. If neither is present, we use the top of the staff.
	if (this.anchor1 && this.anchor2) {
		this.startY = getPitch(this.anchor1, this.above, this.isTie);
		this.endY = getPitch(this.anchor2, this.above, this.isTie);
	} else if (this.anchor1) {
		this.startY = getPitch(this.anchor1, this.above, this.isTie);
		this.endY = getPitch(this.anchor1, this.above, this.isTie);
	} else if (this.anchor2) {
		this.startY = getPitch(this.anchor2, this.above, this.isTie);
		this.endY = getPitch(this.anchor2, this.above, this.isTie);
	} else {
		// This is the case where the slur covers the entire line.
		// TODO-PER: figure out where the real top and bottom of the line are.
		this.startY = this.above ? 14 : 0;
		this.endY = this.above ? 14 : 0;
	}
};

TieElem.prototype.draw = function (renderer, linestartx, lineendx) {
	this.layout(linestartx, lineendx);

	var klass;
	if (this.hint) klass = "abcjs-hint";
	renderer.drawArc(this.startX, this.endX, this.startY, this.endY, this.above, klass, this.isTie);
};

module.exports = TieElem;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_midi_create.js: Turn a linear series of events into a midi file.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var flatten = __webpack_require__(52);
var Preparer = __webpack_require__(53);
var rendererFactory = __webpack_require__(54);
var sequence = __webpack_require__(55);

var create;

(function () {
	"use strict";

	var baseDuration = 480 * 4; // nice and divisible, equals 1 whole note

	create = function create(abcTune, options) {
		if (options === undefined) options = {};
		var sequenceInst = sequence(abcTune, options);
		var commands = flatten(sequenceInst, options);
		var midi = rendererFactory();
		var midiJs = new Preparer();

		var title = abcTune.metaText ? abcTune.metaText.title : undefined;
		if (title && title.length > 128) title = title.substring(0, 124) + '...';
		midi.setGlobalInfo(commands.tempo, title);
		midiJs.setGlobalInfo(commands.tempo, title);

		for (var i = 0; i < commands.tracks.length; i++) {
			midi.startTrack();
			midiJs.startTrack();
			for (var j = 0; j < commands.tracks[i].length; j++) {
				var event = commands.tracks[i][j];
				switch (event.cmd) {
					case 'program':
						midi.setChannel(event.channel);
						midi.setInstrument(event.instrument);
						midiJs.setChannel(event.channel);
						midiJs.setInstrument(event.instrument);
						break;
					case 'start':
						midi.startNote(convertPitch(event.pitch), event.volume);
						midiJs.startNote(convertPitch(event.pitch), event.volume);
						break;
					case 'stop':
						midi.endNote(convertPitch(event.pitch), 0); // TODO-PER: Refactor: the old midi used a duration here.
						midiJs.endNote(convertPitch(event.pitch));
						break;
					case 'move':
						midi.addRest(event.duration * baseDuration);
						midiJs.addRest(event.duration * baseDuration);
						break;
					default:
						console.log("MIDI create Unknown: " + event.cmd);
				}
			}
			midi.endTrack();
			midiJs.endTrack();
		}

		var midiFile = midi.getData();
		var midiInline = midiJs.getData();
		if (options.generateInline === undefined) // default is to generate inline controls.
			options.generateInline = true;
		if (options.generateInline && options.generateDownload) return { download: midiFile, inline: midiInline };else if (options.generateInline) return midiInline;else return midiFile;
	};

	function convertPitch(pitch) {
		return 60 + pitch;
	}
})();

module.exports = create;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(16);
var midi = __webpack_require__(17);

window.ABCJS = midi;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
Copyright (c) 2009-2018 Paul Rosen and Gregory Dyke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

**This text is from: http://opensource.org/licenses/MIT**
!*/


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var animation = __webpack_require__(18);
var tunebook = __webpack_require__(5);

var abcjs = {};

abcjs.signature = "abcjs-midi v5.2.0";

Object.keys(animation).forEach(function (key) {
	abcjs[key] = animation[key];
});

Object.keys(tunebook).forEach(function (key) {
	abcjs[key] = tunebook[key];
});

abcjs.renderAbc = __webpack_require__(22);
abcjs.renderMidi = __webpack_require__(39);

var editor = __webpack_require__(56);
abcjs['Editor'] = editor;
__webpack_require__(58);

var midi = __webpack_require__(9);
abcjs.midi = {
	setSoundFont: midi.setSoundFont,
	startPlaying: midi.startPlaying,
	restartPlaying: midi.restartPlaying,
	stopPlaying: midi.stopPlaying,
	setLoop: midi.setLoop,
	deviceSupportsMidi: midi.deviceSupportsMidi,
	setRandomProgress: midi.setRandomProgress
};

module.exports = abcjs;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_animation.js: handles animating the music in real time.
//    Copyright (C) 2014-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global console */

var spacing = __webpack_require__(1);
var parseCommon = __webpack_require__(0);

var animation = {};

(function () {
	"use strict";

	function hasClass(element, cls) {
		var elClass = element.getAttribute("class");
		var rclass = /[\t\r\n\f]/g;
		var className = " " + cls + " ";
		return element.nodeType === 1 && (" " + elClass + " ").replace(rclass, " ").indexOf(className) >= 0;
	}

	function getAllElementsByClasses(startingEl, class1, class2) {
		var els = startingEl.getElementsByClassName(class1);
		var ret = [];
		for (var i = 0; i < els.length; i++) {
			if (hasClass(els[i], class2)) ret.push(els[i]);
		}
		return ret;
	}

	// This finds the place in the stylesheets that contain the rule that matches the selector.
	// If that selector is not found, then it creates the rule.
	// We are doing this so that we can use a transition for animating the scrolling.
	function getCssRule(selector) {
		var rule;
		for (var i = 0; i < document.styleSheets.length && rule === undefined; i++) {
			var css = document.styleSheets[i];
			var rules = css.rules;
			if (rules) {
				for (var j = 0; j < rules.length && rule === undefined; j++) {
					if (rules[j].selectorText && rules[j].selectorText === selector) rule = rules[j];
				}
			}
		}
		if (!rule) {
			document.styleSheets[0].insertRule(selector + " { }", 1);
			return getCssRule(selector);
		}
		return rule;
	}

	function getBeatsPerMinute(tune, options) {
		// We either want to run the timer once per measure or once per beat. If we run it once per beat we need a multiplier for the measures.
		// So, first we figure out the beats per minute and the beats per measure, then depending on the type of animation, we can
		// calculate the desired interval (ret.tick) and the number of ticks before we want to run the measure
		var bpm;
		if (options.bpm) bpm = options.bpm;else {
			if (tune && tune.metaText && tune.metaText.tempo && tune.metaText.tempo.bpm) {
				var meter = tune.getMeter();
				var num = 4;
				var den = 4;
				if (meter) {
					if (meter.type === 'specified') {
						num = meter.value[0].num;
						den = meter.value[0].den;
					} else if (meter.type === 'cut_time') {
						num = 2;
						den = 2;
					} else if (meter.type === 'common_time') {
						num = 4;
						den = 4;
					}
				}
				var duration = tune.metaText.tempo.duration[0];
				var multiplier = den * duration;
				bpm = tune.metaText.tempo.bpm * multiplier;
				if (den === 8 || den === "8") // TODO-PER: This is a hack to correct for an unknown problem downstream with compound meters.
					bpm *= tune.getBeatLength();
			} else bpm = 120; // Just set it to something. The user should have set this.
		}

		return bpm;
	}

	var scrollTimer;
	var animateTimer;
	var cssRule;
	var currentMargin;
	var animationTarget;
	var shouldResetOverflow;

	// This is a way to manipulate the written music on a timer. Their are two ways to manipulate the music: turn off each measure as it goes by,
	// and put a vertical cursor before the next note to play. The timer works at the speed of the original tempo of the music unless it is overwritten
	// in the options parameter.
	//
	// parameters:
	// paper: the output div that the music is in.
	// tune: the tune object returned by renderAbc.
	// options: a hash containing the following:
	//    hideFinishedMeasures: true or false [ false is the default ]
	//    hideCurrentMeasure: true or false [ false is the default ]
	//    showCursor: true or false [ false is the default ]
	//    bpm: number of beats per minute [ the default is whatever is in the Q: field ]
	//    scrollHorizontal: true or false [ false is the default ]
	//    scrollVertical: true or false [ false is the default ]
	//    scrollHint: true or false [ false is the default ]
	//
	// If scrollHorizontal is present, then we expect that the music was rendered with the viewportHorizontal parameter so there is a viewport wrapping the music div. (Note that this only works when there is a single line of music and there are no repeats, signo, or codas.)
	// If scrollVertical or scrollHint is present, then we expect that the music was rendered with the viewportVertical parameter so there is a viewport wrapping the music div.
	// If the music is larger than the viewport, then it scrolls as the music is being played.
	var stopNextTime = false;
	var cursor;

	var startTime;
	var isPaused;
	var pausedTime;
	var pausedDifference;
	var _processNext;

	function setMargin(margin) {
		cssRule.style.marginTop = -margin + "px";
		currentMargin = margin;
	}
	animation.startAnimation = function (paper, tune, options) {
		if (paper.getElementsByClassName === undefined) {
			console.error("ABCJS.startAnimation: The first parameter must be a regular DOM element. (Did you pass a jQuery object or an ID?)");
			return;
		}
		if (tune.getBeatLength === undefined) {
			console.error("ABCJS.startAnimation: The second parameter must be a single tune. (Did you pass the entire array of tunes?)");
			return;
		}
		if (options.scrollHorizontal || options.scrollVertical || options.scrollHint) {
			// We assume that there is an extra div in this case, so adjust the paper if needed.
			// This can be called either with the outer div or the inner div.
			if (!hasClass(paper, 'abcjs-inner')) {
				// Must be the outer div; hide the scrollbar and move in.
				paper.scrollTop = 0; // In case the user has repositioned the scrollbar.
				paper.style.overflow = "hidden";
				paper = paper.children[0];
			}
			if (!hasClass(paper, 'abcjs-inner')) {
				console.error("ABCJS.startAnimation: When using scrollHorizontal/scrollVertical/scrollHint, the music must have been rendered using viewportHorizontal/viewportVertical.");
				return;
			}
		}
		// Can only have one animation at a time, so make sure that it has been stopped.
		animation.stopAnimation();
		animationTarget = paper;
		shouldResetOverflow = options.scrollVertical || options.scrollHint;

		if (options.showCursor) {
			cursor = document.createElement('DIV');
			cursor.className = 'abcjs-cursor cursor';
			cursor.style.position = 'absolute';

			paper.appendChild(cursor);
			paper.style.position = 'relative';
		}

		stopNextTime = false;
		var beatsPerMinute = getBeatsPerMinute(tune, options);
		var beatsPerMillisecond = beatsPerMinute / 60000;
		var beatLength = tune.getBeatLength(); // This is the same units as the duration is stored in.
		var totalBeats = 0;

		var millisecondsPerHalfMeasure;
		if (options.scrollVertical) {
			var millisecondsPerBeat = 1 / beatsPerMillisecond;
			var beatsPerMeasure = 1 / beatLength;
			var millisecondsPerMeasure = millisecondsPerBeat * beatsPerMeasure;
			millisecondsPerHalfMeasure = millisecondsPerMeasure / 2;
			cssRule = getCssRule(".abcjs-inner");
		}

		isPaused = false;
		var initialWait = 2700;
		var interval = 11;
		var distance = 1;
		var outer = paper.parentNode;
		function scrolling() {
			var currentPosition = paper.style.marginLeft;
			if (currentPosition === "") currentPosition = 0;else currentPosition = parseInt(currentPosition);
			currentPosition -= distance;
			paper.style.marginLeft = currentPosition + "px";
			if (currentPosition > outer.offsetWidth - paper.scrollWidth) scrollTimer = setTimeout(scrolling, interval);
		}

		if (options.scrollHorizontal) {
			paper.style.marginLeft = "0px";
			scrollTimer = setTimeout(scrolling, initialWait);
		}

		function nextMeasure(lineNum, measureNum) {
			lineNum = parseInt(lineNum, 10);
			measureNum = parseInt(measureNum, 10);
			measureNum++;
			var els = getAllElementsByClasses(paper, "abcjs-l" + lineNum, "abcjs-m" + measureNum);
			if (els.length > 0) return [lineNum, measureNum];
			lineNum++;
			measureNum = 0;
			els = getAllElementsByClasses(paper, "abcjs-l" + lineNum, "abcjs-m" + measureNum);
			if (els.length > 0) return [lineNum, measureNum];
			return null;
		}

		function processMeasureHider(lineNum, measureNum) {
			var els = getAllElementsByClasses(paper, "abcjs-l" + lineNum, "abcjs-m" + measureNum);

			if (els.length > 0) {
				for (var i = 0; i < els.length; i++) {
					var el = els[i];
					if (!hasClass(el, "abcjs-bar")) el.style.display = "none";
				}
			}
		}

		function addVerticalInfo(timingEvents) {
			// Add vertical info to the bar events: put the next event's top, and the event after the next measure's top.
			var lastBarTop;
			var lastBarBottom;
			var lastEventTop;
			var lastEventBottom;
			for (var e = timingEvents.length - 1; e >= 0; e--) {
				var ev = timingEvents[e];
				if (ev.type === 'bar') {
					ev.top = lastEventTop;
					ev.nextTop = lastBarTop;
					lastBarTop = lastEventTop;

					ev.bottom = lastEventBottom;
					ev.nextBottom = lastBarBottom;
					lastBarBottom = lastEventBottom;
				} else if (ev.type === 'event') {
					lastEventTop = ev.top;
					lastEventBottom = ev.top + ev.height;
				}
			}
		}

		function makeSortedArray(hash) {
			var arr = [];
			for (var k in hash) {
				if (hash.hasOwnProperty(k)) arr.push(hash[k]);
			}
			arr = arr.sort(function (a, b) {
				var diff = a.time - b.time;
				// if the events have the same time, make sure a bar comes before a note
				if (diff !== 0) {
					return diff;
				} else {
					return a.type === "bar" ? -1 : 1;
				}
			});
			return arr;
		}

		// Gets the line and measure number from the element's classes
		function getLineAndMeasure(element) {
			var klass = element.elemset[0].getAttribute("class");
			var arr = klass.split(' ');
			var lineNum;
			var measureNum;
			for (var i = 0; i < arr.length; i++) {
				var match = /m(\d+)/.exec(arr[i]);
				if (match) measureNum = match[1];
				match = /l(\d+)/.exec(arr[i]);
				if (match) lineNum = match[1];
			}
			return { lineNum: lineNum, measureNum: measureNum };
		}

		// Switches the music from line-based to voice-based.
		function convertToVoices(staffGroups) {
			var voices = [];
			for (var line = 0; line < staffGroups.length; line++) {
				var group = staffGroups[line];
				var firstStaff = group.staffs[0];
				var middleC = firstStaff.absoluteY;
				var top = middleC - firstStaff.top * spacing.STEP;
				var lastStaff = group.staffs[group.staffs.length - 1];
				middleC = lastStaff.absoluteY;
				var bottom = middleC - lastStaff.bottom * spacing.STEP;
				// Put in the notes for all voices, then sort them, then remove duplicates
				for (var v = 0; v < group.voices.length; v++) {
					if (v >= voices.length) voices.push([]);
					var elements = group.voices[v].children;
					for (var elem = 0; elem < elements.length; elem++) {
						var element = elements[elem];
						if (element.hint) break;
						if (element.duration > 0) {
							voices[v].push({ type: "event",
								top: top,
								height: bottom - top,
								left: element.x,
								width: element.w,
								duration: element.durationClass ? element.durationClass : element.duration,
								isTiedToNext: element.startTie !== undefined
							});
						}
						// Only add a bar if it is not repeated; that is, we don't want two bars in a row.
						if (element.type === 'bar') {
							if (voices[v].length === 0 || voices[v][voices[v].length - 1].type !== 'bar') {
								if (element.elemset && element.elemset.length > 0) {
									var obj = getLineAndMeasure(element);
									voices[v].push({ type: "bar",
										barType: element.abcelem.type,
										startEnding: element.abcelem.startEnding === "1",
										lineNum: obj.lineNum,
										measureNum: obj.measureNum
									});
								}
							}
						}
					}
				}
			}
			return voices;
		}

		// Duplicates the elements that are repeated.
		function spreadVoices(voices) {
			var ret = [];
			for (var i = 0; i < voices.length; i++) {
				var voice = voices[i];
				ret.push([]);
				var startRepeatIndex = 0; // If there is no explicit start repeat, then it starts at the beginning.
				var endRepeatIndex = -1;
				for (var j = 0; j < voice.length; j++) {
					var elem = voice[j];
					ret[i].push(voice[j]);
					var endRepeat = elem.barType === "bar_right_repeat" || elem.barType === "bar_dbl_repeat";
					var startEnding = elem.startEnding;
					var startRepeat = elem.barType === "bar_left_repeat" || elem.barType === "bar_dbl_repeat" || elem.barType === "bar_thick_thin" || elem.barType === "bar_thin_thick" || elem.barType === "bar_thin_thin" || elem.barType === "bar_right_repeat";
					if (endRepeat) {
						if (endRepeatIndex === -1) endRepeatIndex = j;
						for (var k = startRepeatIndex; k <= endRepeatIndex; k++) {
							ret[i].push(parseCommon.clone(voice[k]));
						}
					}
					if (startEnding) endRepeatIndex = j;
					if (startRepeat) startRepeatIndex = j + 1;
				}
			}
			return ret;
		}

		function combineVoices(voiceList) {
			var eventHash = {};
			for (var v = 0; v < voiceList.length; v++) {
				var time = 0;
				var isTiedState = false;
				for (var i = 0; i < voiceList[v].length; i++) {
					var item = voiceList[v][i];
					item.time = time;
					if (item.type === "event") {
						var isTiedToNext = item.isTiedToNext;
						if (isTiedState) {
							if (!isTiedToNext) isTiedState = false;
							// If the note is tied on both sides it can just be ignored.
						} else {
							// the last note wasn't tied.
							if (!eventHash["event" + time]) eventHash["event" + time] = item;else {
								// If there is more than one voice then two notes can fall at the same time. Usually they would be lined up in the same place, but if it is a whole rest, then it is placed funny. In any case, the left most element wins.
								eventHash["event" + time].left = Math.min(eventHash["event" + time].left, item.left);
							}
							if (isTiedToNext) isTiedState = true;
						}
						time += item.duration;
					} else {
						eventHash["bar" + time] = item;
					}
				}
			}
			return eventHash;
		}

		var timingEvents = [];
		function setupEvents(engraver) {
			// First, rearrange the elements to be in voice order (that is, remove the lines.)
			// Then, for each voice, duplicate the events needed for the repeats.
			// Then go through each event array and fill in the timingEvents.
			var voiceList = convertToVoices(engraver.staffgroups);
			voiceList = spreadVoices(voiceList);

			var eventHash = combineVoices(voiceList);

			// now we have all the events, but if there are multiple voices then there may be events out of order or duplicated, so normalize it.
			timingEvents = makeSortedArray(eventHash);
			totalBeats = timingEvents[timingEvents.length - 1].time / beatLength;
			if (options.scrollVertical) {
				addVerticalInfo(timingEvents);
			}
		}
		setupEvents(tune.engraver);

		function isEndOfLine(currentNote) {
			return currentNote.top !== currentNote.nextTop && currentNote.nextTop !== undefined;
		}

		function shouldScroll(outer, scrollPos, currentNote) {
			var height = parseInt(outer.clientHeight, 10);
			var isVisible = currentNote.nextBottom - scrollPos < height;
			//console.log("SCROLL: ", height, scrollPos, currentNote.nextTop, currentNote.nextBottom, isVisible);
			return !isVisible;
		}

		var lastTop = -1;
		// var inner = outer.querySelectorAll('.abcjs-inner');
		currentMargin = 0;

		if (options.scrollVertical) {
			setMargin(0); // In case we are calling this a second time.
		}

		function processShowCursor() {
			var currentNote = timingEvents.shift();
			if (!currentNote) {
				stopNextTime = true;
				return 0;
			}
			if (currentNote.type === "bar") {
				if (options.scrollVertical) {
					if (isEndOfLine(currentNote) && shouldScroll(outer, currentMargin, currentNote)) {
						setTimeout(function () {
							setMargin(currentNote.nextTop);
						}, millisecondsPerHalfMeasure);
					}
				}
				if (options.hideCurrentMeasure) {
					var next = nextMeasure(currentNote.lineNum, currentNote.measureNum);
					if (next) processMeasureHider(next[0], next[1]);
				} else if (options.hideFinishedMeasures) processMeasureHider(currentNote.lineNum, currentNote.measureNum);
				if (timingEvents.length > 0) return timingEvents[0].time / beatLength;
				return 0;
			}
			if (options.scrollHint && lastTop !== currentNote.top) {
				lastTop = currentNote.top;
				setMargin(lastTop);
			}
			if (options.showCursor && cursor && cursor.style) {
				cursor.style.left = currentNote.left + "px";
				cursor.style.top = currentNote.top + "px";
				cursor.style.width = currentNote.width + "px";
				cursor.style.height = currentNote.height + "px";
			}
			if (timingEvents.length > 0) return timingEvents[0].time / beatLength;
			stopNextTime = true;
			return 0;
		}

		_processNext = function processNext() {
			if (stopNextTime) {
				animation.stopAnimation();
				return;
			}
			var currentTime = new Date().getTime();
			if (isPaused) {
				// The isPaused flag must have just turned on. If it had been encountered before, we wouldn't be calling processNext.
				// pausedTime contains the moment that pause was called. There is a delay until here, so the timing will be off by the distance.
				pausedDifference = currentTime - pausedTime;
				return;
			}
			var nextTimeInBeats = processShowCursor();
			var nextTimeInMilliseconds = nextTimeInBeats / beatsPerMillisecond;
			var interval = startTime + nextTimeInMilliseconds - currentTime;
			if (interval <= 0) _processNext();else animateTimer = setTimeout(_processNext, interval);
		};
		startTime = new Date();
		startTime = startTime.getTime();
		isPaused = false;
		if (options.hideCurrentMeasure) {
			var next = nextMeasure(0, -1);
			if (next) processMeasureHider(next[0], next[1]);
		}
		_processNext();
	};

	animation.pauseAnimation = function (pause) {
		if (!_processNext) {
			console.warn("Cannot call pauseAnimation before calling startAnimation");
			return;
		}

		if (pause && !isPaused) {
			isPaused = true;
			pausedTime = new Date().getTime();
		} else if (!pause && isPaused) {
			var nowTime = new Date().getTime();
			var elapsedTimeWhenPaused = nowTime - pausedTime;
			startTime += elapsedTimeWhenPaused;
			pausedTime = undefined;
			isPaused = false;
			animateTimer = setTimeout(_processNext, pausedDifference);
			pausedDifference = undefined;
		}
	};

	animation.stopAnimation = function () {
		clearTimeout(animateTimer);
		clearTimeout(scrollTimer);
		if (cursor) {
			cursor.remove();
			cursor = null;
		}
		if (shouldResetOverflow) {
			if (animationTarget && animationTarget.parentNode) // If the music was redrawn or otherwise disappeared before the animation was finished, this might be null.
				animationTarget.parentNode.style.overflowY = "auto";
			setMargin(0);
		}
	};
})();

module.exports = animation;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_parse_header.js: parses a the header fields from a string representing ABC Music Notation into a usable internal structure.
//    Copyright (C) 2010-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global window */

var parseCommon = __webpack_require__(0);
var parseDirective = __webpack_require__(7);
var parseKeyVoice = __webpack_require__(8);

var ParseHeader = function ParseHeader(tokenizer, warn, multilineVars, tune) {
	this.reset = function (tokenizer, warn, multilineVars, tune) {
		parseKeyVoice.initialize(tokenizer, warn, multilineVars, tune);
		parseDirective.initialize(tokenizer, warn, multilineVars, tune);
	};
	this.reset(tokenizer, warn, multilineVars, tune);

	this.setTitle = function (title) {
		if (multilineVars.hasMainTitle) tune.addSubtitle(tokenizer.translateString(tokenizer.stripComment(title))); // display secondary title
		else {
				var titleStr = tokenizer.translateString(tokenizer.theReverser(tokenizer.stripComment(title)));
				if (multilineVars.titlecaps) titleStr = titleStr.toUpperCase();
				tune.addMetaText("title", titleStr);
				multilineVars.hasMainTitle = true;
			}
	};

	this.setMeter = function (line) {
		line = tokenizer.stripComment(line);
		if (line === 'C') {
			if (multilineVars.havent_set_length === true) {
				multilineVars.default_length = 0.125;
				multilineVars.havent_set_length = false;
			}
			return { type: 'common_time' };
		} else if (line === 'C|') {
			if (multilineVars.havent_set_length === true) {
				multilineVars.default_length = 0.125;
				multilineVars.havent_set_length = false;
			}
			return { type: 'cut_time' };
		} else if (line === 'o') {
			if (multilineVars.havent_set_length === true) {
				multilineVars.default_length = 0.125;
				multilineVars.havent_set_length = false;
			}
			return { type: 'tempus_perfectum' };
		} else if (line === 'c') {
			if (multilineVars.havent_set_length === true) {
				multilineVars.default_length = 0.125;
				multilineVars.havent_set_length = false;
			}
			return { type: 'tempus_imperfectum' };
		} else if (line === 'o.') {
			if (multilineVars.havent_set_length === true) {
				multilineVars.default_length = 0.125;
				multilineVars.havent_set_length = false;
			}
			return { type: 'tempus_perfectum_prolatio' };
		} else if (line === 'c.') {
			if (multilineVars.havent_set_length === true) {
				multilineVars.default_length = 0.125;
				multilineVars.havent_set_length = false;
			}
			return { type: 'tempus_imperfectum_prolatio' };
		} else if (line.length === 0 || line.toLowerCase() === 'none') {
			if (multilineVars.havent_set_length === true) {
				multilineVars.default_length = 0.125;
				multilineVars.havent_set_length = false;
			}
			return null;
		} else {
			var tokens = tokenizer.tokenize(line, 0, line.length);
			// the form is [open_paren] decimal [ plus|dot decimal ]... [close_paren] slash decimal [plus same_as_before]
			try {
				var parseNum = function parseNum() {
					// handles this much: [open_paren] decimal [ plus|dot decimal ]... [close_paren]
					var ret = { value: 0, num: "" };

					var tok = tokens.shift();
					if (tok.token === '(') tok = tokens.shift();
					while (1) {
						if (tok.type !== 'number') throw "Expected top number of meter";
						ret.value += parseInt(tok.token);
						ret.num += tok.token;
						if (tokens.length === 0 || tokens[0].token === '/') return ret;
						tok = tokens.shift();
						if (tok.token === ')') {
							if (tokens.length === 0 || tokens[0].token === '/') return ret;
							throw "Unexpected paren in meter";
						}
						if (tok.token !== '.' && tok.token !== '+') throw "Expected top number of meter";
						ret.num += tok.token;
						if (tokens.length === 0) throw "Expected top number of meter";
						tok = tokens.shift();
					}
					return ret; // just to suppress warning
				};

				var parseFraction = function parseFraction() {
					// handles this much: parseNum slash decimal
					var ret = parseNum();
					if (tokens.length === 0) return ret;
					var tok = tokens.shift();
					if (tok.token !== '/') throw "Expected slash in meter";
					tok = tokens.shift();
					if (tok.type !== 'number') throw "Expected bottom number of meter";
					ret.den = tok.token;
					ret.value = ret.value / parseInt(ret.den);
					return ret;
				};

				if (tokens.length === 0) throw "Expected meter definition in M: line";
				var meter = { type: 'specified', value: [] };
				var totalLength = 0;
				while (1) {
					var ret = parseFraction();
					totalLength += ret.value;
					var mv = { num: ret.num };
					if (ret.den !== undefined) mv.den = ret.den;
					meter.value.push(mv);
					if (tokens.length === 0) break;
					//var tok = tokens.shift();
					//if (tok.token !== '+') throw "Extra characters in M: line";
				}

				if (multilineVars.havent_set_length === true) {
					multilineVars.default_length = totalLength < 0.75 ? 0.0625 : 0.125;
					multilineVars.havent_set_length = false;
				}
				return meter;
			} catch (e) {
				warn(e, line, 0);
			}
		}
		return null;
	};

	this.calcTempo = function (relTempo) {
		var dur = 1 / 4;
		if (multilineVars.meter && multilineVars.meter.type === 'specified') {
			dur = 1 / parseInt(multilineVars.meter.value[0].den);
		} else if (multilineVars.origMeter && multilineVars.origMeter.type === 'specified') {
			dur = 1 / parseInt(multilineVars.origMeter.value[0].den);
		}
		//var dur = multilineVars.default_length ? multilineVars.default_length : 1;
		for (var i = 0; i < relTempo.duration; i++) {
			relTempo.duration[i] = dur * relTempo.duration[i];
		}return relTempo;
	};

	this.resolveTempo = function () {
		if (multilineVars.tempo) {
			// If there's a tempo waiting to be resolved
			this.calcTempo(multilineVars.tempo);
			tune.metaText.tempo = multilineVars.tempo;
			delete multilineVars.tempo;
		}
	};

	this.addUserDefinition = function (line, start, end) {
		var equals = line.indexOf('=', start);
		if (equals === -1) {
			warn("Need an = in a macro definition", line, start);
			return;
		}

		var before = parseCommon.strip(line.substring(start, equals));
		var after = parseCommon.strip(line.substring(equals + 1));

		if (before.length !== 1) {
			warn("Macro definitions can only be one character", line, start);
			return;
		}
		var legalChars = "HIJKLMNOPQRSTUVWXYhijklmnopqrstuvw~";
		if (legalChars.indexOf(before) === -1) {
			warn("Macro definitions must be H-Y, h-w, or tilde", line, start);
			return;
		}
		if (after.length === 0) {
			warn("Missing macro definition", line, start);
			return;
		}
		if (multilineVars.macros === undefined) multilineVars.macros = {};
		multilineVars.macros[before] = after;
	};

	this.setDefaultLength = function (line, start, end) {
		var len = parseCommon.gsub(line.substring(start, end), " ", "");
		var len_arr = len.split('/');
		if (len_arr.length === 2) {
			var n = parseInt(len_arr[0]);
			var d = parseInt(len_arr[1]);
			if (d > 0) {
				multilineVars.default_length = n / d; // a whole note is 1
				multilineVars.havent_set_length = false;
			}
		} else if (len_arr.length === 1 && len_arr[0] === '1') {
			multilineVars.default_length = 1;
			multilineVars.havent_set_length = false;
		}
	};

	var tempoString = {

		larghissimo: 20,
		adagissimo: 24,
		sostenuto: 28,
		grave: 32,
		largo: 40,
		lento: 50,
		larghetto: 60,
		adagio: 68,
		adagietto: 74,
		andante: 80,
		andantino: 88,
		"marcia moderato": 84,
		"andante moderato": 100,
		moderato: 112,
		allegretto: 116,
		"allegro moderato": 120,
		allegro: 126,
		animato: 132,
		agitato: 140,
		veloce: 148,
		"mosso vivo": 156,
		vivace: 164,
		vivacissimo: 172,
		allegrissimo: 176,
		presto: 184,
		prestissimo: 210
	};

	this.setTempo = function (line, start, end) {
		//Q - tempo; can be used to specify the notes per minute, e.g. If
		//the meter denominator is a 4 note then Q:120 or Q:C=120
		//is 120 quarter notes per minute. Similarly  Q:C3=40 would be 40
		//dotted half notes per minute. An absolute tempo may also be
		//set, e.g. Q:1/8=120 is 120 eighth notes per minute,
		//irrespective of the meter's denominator.
		//
		// This is either a number, "C=number", "Cnumber=number", or fraction [fraction...]=number
		// It depends on the M: field, which may either not be present, or may appear after this.
		// If M: is not present, an eighth note is used.
		// That means that this field can't be calculated until the end, if it is the first three types, since we don't know if we'll see an M: field.
		// So, if it is the fourth type, set it here, otherwise, save the info in the multilineVars.
		// The temporary variables we keep are the duration and the bpm. In the first two forms, the duration is 1.
		// In addition, a quoted string may both precede and follow. If a quoted string is present, then the duration part is optional.
		try {
			var tokens = tokenizer.tokenize(line, start, end);

			if (tokens.length === 0) throw "Missing parameter in Q: field";

			var tempo = {};
			var delaySet = true;
			var token = tokens.shift();
			if (token.type === 'quote') {
				tempo.preString = token.token;
				token = tokens.shift();
				if (tokens.length === 0) {
					// It's ok to just get a string for the tempo
					// If the string is a well-known tempo, put in the bpm
					if (tempoString[tempo.preString.toLowerCase()]) {
						tempo.bpm = tempoString[tempo.preString.toLowerCase()];
						tempo.suppressBpm = true;
					}
					return { type: 'immediate', tempo: tempo };
				}
			}
			if (token.type === 'alpha' && token.token === 'C') {
				// either type 2 or type 3
				if (tokens.length === 0) throw "Missing tempo after C in Q: field";
				token = tokens.shift();
				if (token.type === 'punct' && token.token === '=') {
					// This is a type 2 format. The duration is an implied 1
					if (tokens.length === 0) throw "Missing tempo after = in Q: field";
					token = tokens.shift();
					if (token.type !== 'number') throw "Expected number after = in Q: field";
					tempo.duration = [1];
					tempo.bpm = parseInt(token.token);
				} else if (token.type === 'number') {
					// This is a type 3 format.
					tempo.duration = [parseInt(token.token)];
					if (tokens.length === 0) throw "Missing = after duration in Q: field";
					token = tokens.shift();
					if (token.type !== 'punct' || token.token !== '=') throw "Expected = after duration in Q: field";
					if (tokens.length === 0) throw "Missing tempo after = in Q: field";
					token = tokens.shift();
					if (token.type !== 'number') throw "Expected number after = in Q: field";
					tempo.bpm = parseInt(token.token);
				} else throw "Expected number or equal after C in Q: field";
			} else if (token.type === 'number') {
				// either type 1 or type 4
				var num = parseInt(token.token);
				if (tokens.length === 0 || tokens[0].type === 'quote') {
					// This is type 1
					tempo.duration = [1];
					tempo.bpm = num;
				} else {
					// This is type 4
					delaySet = false;
					token = tokens.shift();
					if (token.type !== 'punct' && token.token !== '/') throw "Expected fraction in Q: field";
					token = tokens.shift();
					if (token.type !== 'number') throw "Expected fraction in Q: field";
					var den = parseInt(token.token);
					tempo.duration = [num / den];
					// We got the first fraction, keep getting more as long as we find them.
					while (tokens.length > 0 && tokens[0].token !== '=' && tokens[0].type !== 'quote') {
						token = tokens.shift();
						if (token.type !== 'number') throw "Expected fraction in Q: field";
						num = parseInt(token.token);
						token = tokens.shift();
						if (token.type !== 'punct' && token.token !== '/') throw "Expected fraction in Q: field";
						token = tokens.shift();
						if (token.type !== 'number') throw "Expected fraction in Q: field";
						den = parseInt(token.token);
						tempo.duration.push(num / den);
					}
					token = tokens.shift();
					if (token.type !== 'punct' && token.token !== '=') throw "Expected = in Q: field";
					token = tokens.shift();
					if (token.type !== 'number') throw "Expected tempo in Q: field";
					tempo.bpm = parseInt(token.token);
				}
			} else throw "Unknown value in Q: field";
			if (tokens.length !== 0) {
				token = tokens.shift();
				if (token.type === 'quote') {
					tempo.postString = token.token;
					token = tokens.shift();
				}
				if (tokens.length !== 0) throw "Unexpected string at end of Q: field";
			}
			if (multilineVars.printTempo === false) tempo.suppress = true;
			return { type: delaySet ? 'delaySet' : 'immediate', tempo: tempo };
		} catch (msg) {
			warn(msg, line, start);
			return { type: 'none' };
		}
	};

	this.letter_to_inline_header = function (line, i) {
		var ws = tokenizer.eatWhiteSpace(line, i);
		i += ws;
		if (line.length >= i + 5 && line.charAt(i) === '[' && line.charAt(i + 2) === ':') {
			var e = line.indexOf(']', i);
			switch (line.substring(i, i + 3)) {
				case "[I:":
					var err = parseDirective.addDirective(line.substring(i + 3, e));
					if (err) warn(err, line, i);
					return [e - i + 1 + ws];
				case "[M:":
					var meter = this.setMeter(line.substring(i + 3, e));
					if (tune.hasBeginMusic() && meter) tune.appendStartingElement('meter', -1, -1, meter);else multilineVars.meter = meter;
					return [e - i + 1 + ws];
				case "[K:":
					var result = parseKeyVoice.parseKey(line.substring(i + 3, e));
					if (result.foundClef && tune.hasBeginMusic()) tune.appendStartingElement('clef', -1, -1, multilineVars.clef);
					if (result.foundKey && tune.hasBeginMusic()) tune.appendStartingElement('key', -1, -1, parseKeyVoice.fixKey(multilineVars.clef, multilineVars.key));
					return [e - i + 1 + ws];
				case "[P:":
					if (tune.lines.length <= tune.lineNum) multilineVars.partForNextLine = line.substring(i + 3, e);else tune.appendElement('part', -1, -1, { title: line.substring(i + 3, e) });
					return [e - i + 1 + ws];
				case "[L:":
					this.setDefaultLength(line, i + 3, e);
					return [e - i + 1 + ws];
				case "[Q:":
					if (e > 0) {
						var tempo = this.setTempo(line, i + 3, e);
						if (tempo.type === 'delaySet') tune.appendElement('tempo', -1, -1, this.calcTempo(tempo.tempo));else if (tempo.type === 'immediate') tune.appendElement('tempo', -1, -1, tempo.tempo);
						return [e - i + 1 + ws, line.charAt(i + 1), line.substring(i + 3, e)];
					}
					break;
				case "[V:":
					if (e > 0) {
						parseKeyVoice.parseVoice(line, i + 3, e);
						//startNewLine();
						return [e - i + 1 + ws, line.charAt(i + 1), line.substring(i + 3, e)];
					}
					break;

				default:
				// TODO: complain about unhandled header
			}
		}
		return [0];
	};

	this.letter_to_body_header = function (line, i) {
		if (line.length >= i + 3) {
			switch (line.substring(i, i + 2)) {
				case "I:":
					var err = parseDirective.addDirective(line.substring(i + 2));
					if (err) warn(err, line, i);
					return [line.length];
				case "M:":
					var meter = this.setMeter(line.substring(i + 2));
					if (tune.hasBeginMusic() && meter) tune.appendStartingElement('meter', -1, -1, meter);
					return [line.length];
				case "K:":
					var result = parseKeyVoice.parseKey(line.substring(i + 2));
					if (result.foundClef && tune.hasBeginMusic()) tune.appendStartingElement('clef', -1, -1, multilineVars.clef);
					if (result.foundKey && tune.hasBeginMusic()) tune.appendStartingElement('key', -1, -1, parseKeyVoice.fixKey(multilineVars.clef, multilineVars.key));
					return [line.length];
				case "P:":
					if (tune.hasBeginMusic()) tune.appendElement('part', -1, -1, { title: line.substring(i + 2) });
					return [line.length];
				case "L:":
					this.setDefaultLength(line, i + 2, line.length);
					return [line.length];
				case "Q:":
					var e = line.indexOf('\x12', i + 2);
					if (e === -1) e = line.length;
					var tempo = this.setTempo(line, i + 2, e);
					if (tempo.type === 'delaySet') tune.appendElement('tempo', -1, -1, this.calcTempo(tempo.tempo));else if (tempo.type === 'immediate') tune.appendElement('tempo', -1, -1, tempo.tempo);
					return [e, line.charAt(i), parseCommon.strip(line.substring(i + 2))];
				case "V:":
					parseKeyVoice.parseVoice(line, i + 2, line.length);
					//						startNewLine();
					return [line.length, line.charAt(i), parseCommon.strip(line.substring(i + 2))];
				default:
				// TODO: complain about unhandled header
			}
		}
		return [0];
	};

	var metaTextHeaders = {
		A: 'author',
		B: 'book',
		C: 'composer',
		D: 'discography',
		F: 'url',
		G: 'group',
		I: 'instruction',
		N: 'notes',
		O: 'origin',
		R: 'rhythm',
		S: 'source',
		W: 'unalignedWords',
		Z: 'transcription'
	};

	this.parseHeader = function (line) {
		if (parseCommon.startsWith(line, '%%')) {
			var err = parseDirective.addDirective(line.substring(2));
			if (err) warn(err, line, 2);
			return {};
		}
		var i = line.indexOf('%');
		if (i >= 0) line = line.substring(0, i);
		line = line.replace(/\s+$/, '');

		if (line.length === 0) return {};

		if (line.length >= 2) {
			if (line.charAt(1) === ':') {
				var nextLine = "";
				if (line.indexOf('\x12') >= 0 && line.charAt(0) !== 'w') {
					// w: is the only header field that can have a continuation.
					nextLine = line.substring(line.indexOf('\x12') + 1);
					line = line.substring(0, line.indexOf('\x12')); //This handles a continuation mark on a header field
				}
				var field = metaTextHeaders[line.charAt(0)];
				if (field !== undefined) {
					if (field === 'unalignedWords') tune.addMetaTextArray(field, parseDirective.parseFontChangeLine(tokenizer.translateString(tokenizer.stripComment(line.substring(2)))));else tune.addMetaText(field, tokenizer.translateString(tokenizer.stripComment(line.substring(2))));
					return {};
				} else {
					switch (line.charAt(0)) {
						case 'H':
							tune.addMetaText("history", tokenizer.translateString(tokenizer.stripComment(line.substring(2))));
							multilineVars.is_in_history = true;
							break;
						case 'K':
							// since the key is the last thing that can happen in the header, we can resolve the tempo now
							this.resolveTempo();
							var result = parseKeyVoice.parseKey(line.substring(2));
							if (!multilineVars.is_in_header && tune.hasBeginMusic()) {
								if (result.foundClef) tune.appendStartingElement('clef', -1, -1, multilineVars.clef);
								if (result.foundKey) tune.appendStartingElement('key', -1, -1, parseKeyVoice.fixKey(multilineVars.clef, multilineVars.key));
							}
							multilineVars.is_in_header = false; // The first key signifies the end of the header.
							break;
						case 'L':
							this.setDefaultLength(line, 2, line.length);
							break;
						case 'M':
							multilineVars.origMeter = multilineVars.meter = this.setMeter(line.substring(2));
							break;
						case 'P':
							// TODO-PER: There is more to do with parts, but the writer doesn't care.
							if (multilineVars.is_in_header) tune.addMetaText("partOrder", tokenizer.translateString(tokenizer.stripComment(line.substring(2))));else multilineVars.partForNextLine = tokenizer.translateString(tokenizer.stripComment(line.substring(2)));
							break;
						case 'Q':
							var tempo = this.setTempo(line, 2, line.length);
							if (tempo.type === 'delaySet') multilineVars.tempo = tempo.tempo;else if (tempo.type === 'immediate') tune.metaText.tempo = tempo.tempo;
							break;
						case 'T':
							this.setTitle(line.substring(2));
							break;
						case 'U':
							this.addUserDefinition(line, 2, line.length);
							break;
						case 'V':
							parseKeyVoice.parseVoice(line, 2, line.length);
							if (!multilineVars.is_in_header) return { newline: true };
							break;
						case 's':
							return { symbols: true };
						case 'w':
							return { words: true };
						case 'X':
							break;
						case 'E':
						case 'm':
							warn("Ignored header", line, 0);
							break;
						default:
							// It wasn't a recognized header value, so parse it as music.
							if (nextLine.length) nextLine = "\x12" + nextLine;
							//parseRegularMusicLine(line+nextLine);
							//nextLine = "";
							return { regular: true, str: line + nextLine };
					}
				}
				if (nextLine.length > 0) return { recurse: true, str: nextLine };
				return {};
			}
		}

		// If we got this far, we have a regular line of mulsic
		return { regular: true, str: line };
	};
};

module.exports = ParseHeader;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_tokenizer.js: tokenizes an ABC Music Notation string to support abc_parse.
//    Copyright (C) 2010-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var parseCommon = __webpack_require__(0);

// this is a series of functions that get a particular element out of the passed stream.
// the return is the number of characters consumed, so 0 means that the element wasn't found.
// also returned is the element found. This may be a different length because spaces may be consumed that aren't part of the string.
// The return structure for most calls is { len: num_chars_consumed, token: str }
var Tokenizer = function Tokenizer() {
	this.skipWhiteSpace = function (str) {
		for (var i = 0; i < str.length; i++) {
			if (!this.isWhiteSpace(str.charAt(i))) return i;
		}
		return str.length; // It must have been all white space
	};
	var finished = function finished(str, i) {
		return i >= str.length;
	};
	this.eatWhiteSpace = function (line, index) {
		for (var i = index; i < line.length; i++) {
			if (!this.isWhiteSpace(line.charAt(i))) return i - index;
		}
		return i - index;
	};

	// This just gets the basic pitch letter, ignoring leading spaces, and normalizing it to a capital
	this.getKeyPitch = function (str) {
		var i = this.skipWhiteSpace(str);
		if (finished(str, i)) return { len: 0 };
		switch (str.charAt(i)) {
			case 'A':
				return { len: i + 1, token: 'A' };
			case 'B':
				return { len: i + 1, token: 'B' };
			case 'C':
				return { len: i + 1, token: 'C' };
			case 'D':
				return { len: i + 1, token: 'D' };
			case 'E':
				return { len: i + 1, token: 'E' };
			case 'F':
				return { len: i + 1, token: 'F' };
			case 'G':
				return { len: i + 1, token: 'G' };
			//			case 'a':return {len: i+1, token: 'A'};
			//			case 'b':return {len: i+1, token: 'B'};
			//			case 'c':return {len: i+1, token: 'C'};
			//			case 'd':return {len: i+1, token: 'D'};
			//			case 'e':return {len: i+1, token: 'E'};
			//			case 'f':return {len: i+1, token: 'F'};
			//			case 'g':return {len: i+1, token: 'G'};
		}
		return { len: 0 };
	};

	// This just gets the basic accidental, ignoring leading spaces, and only the ones that appear in a key
	this.getSharpFlat = function (str) {
		if (str === 'bass') return { len: 0 };
		switch (str.charAt(0)) {
			case '#':
				return { len: 1, token: '#' };
			case 'b':
				return { len: 1, token: 'b' };
		}
		return { len: 0 };
	};

	this.getMode = function (str) {
		var skipAlpha = function skipAlpha(str, start) {
			// This returns the index of the next non-alphabetic char, or the entire length of the string if not found.
			while (start < str.length && (str.charAt(start) >= 'a' && str.charAt(start) <= 'z' || str.charAt(start) >= 'A' && str.charAt(start) <= 'Z')) {
				start++;
			}return start;
		};

		var i = this.skipWhiteSpace(str);
		if (finished(str, i)) return { len: 0 };
		var firstThree = str.substring(i, i + 3).toLowerCase();
		if (firstThree.length > 1 && firstThree.charAt(1) === ' ' || firstThree.charAt(1) === '^' || firstThree.charAt(1) === '_' || firstThree.charAt(1) === '=') firstThree = firstThree.charAt(0); // This will handle the case of 'm'
		switch (firstThree) {
			case 'mix':
				return { len: skipAlpha(str, i), token: 'Mix' };
			case 'dor':
				return { len: skipAlpha(str, i), token: 'Dor' };
			case 'phr':
				return { len: skipAlpha(str, i), token: 'Phr' };
			case 'lyd':
				return { len: skipAlpha(str, i), token: 'Lyd' };
			case 'loc':
				return { len: skipAlpha(str, i), token: 'Loc' };
			case 'aeo':
				return { len: skipAlpha(str, i), token: 'm' };
			case 'maj':
				return { len: skipAlpha(str, i), token: '' };
			case 'ion':
				return { len: skipAlpha(str, i), token: '' };
			case 'min':
				return { len: skipAlpha(str, i), token: 'm' };
			case 'm':
				return { len: skipAlpha(str, i), token: 'm' };
		}
		return { len: 0 };
	};

	this.getClef = function (str, bExplicitOnly) {
		var strOrig = str;
		var i = this.skipWhiteSpace(str);
		if (finished(str, i)) return { len: 0 };
		// The word 'clef' is optional, but if it appears, a clef MUST appear
		var needsClef = false;
		var strClef = str.substring(i);
		if (parseCommon.startsWith(strClef, 'clef=')) {
			needsClef = true;
			strClef = strClef.substring(5);
			i += 5;
		}
		if (strClef.length === 0 && needsClef) return { len: i + 5, warn: "No clef specified: " + strOrig };

		var j = this.skipWhiteSpace(strClef);
		if (finished(strClef, j)) return { len: 0 };
		if (j > 0) {
			i += j;
			strClef = strClef.substring(j);
		}
		var name = null;
		if (parseCommon.startsWith(strClef, 'treble')) name = 'treble';else if (parseCommon.startsWith(strClef, 'bass3')) name = 'bass3';else if (parseCommon.startsWith(strClef, 'bass')) name = 'bass';else if (parseCommon.startsWith(strClef, 'tenor')) name = 'tenor';else if (parseCommon.startsWith(strClef, 'alto2')) name = 'alto2';else if (parseCommon.startsWith(strClef, 'alto1')) name = 'alto1';else if (parseCommon.startsWith(strClef, 'alto')) name = 'alto';else if (!bExplicitOnly && needsClef && parseCommon.startsWith(strClef, 'none')) name = 'none';else if (parseCommon.startsWith(strClef, 'perc')) name = 'perc';else if (!bExplicitOnly && needsClef && parseCommon.startsWith(strClef, 'C')) name = 'tenor';else if (!bExplicitOnly && needsClef && parseCommon.startsWith(strClef, 'F')) name = 'bass';else if (!bExplicitOnly && needsClef && parseCommon.startsWith(strClef, 'G')) name = 'treble';else return { len: i + 5, warn: "Unknown clef specified: " + strOrig };

		strClef = strClef.substring(name.length);
		j = this.isMatch(strClef, '+8');
		if (j > 0) name += "+8";else {
			j = this.isMatch(strClef, '-8');
			if (j > 0) name += "-8";
		}
		return { len: i + name.length, token: name, explicit: needsClef };
	};

	// This returns one of the legal bar lines
	// This is called alot and there is no obvious tokenable items, so this is broken apart.
	this.getBarLine = function (line, i) {
		switch (line.charAt(i)) {
			case ']':
				++i;
				switch (line.charAt(i)) {
					case '|':
						return { len: 2, token: "bar_thick_thin" };
					case '[':
						++i;
						if (line.charAt(i) >= '1' && line.charAt(i) <= '9' || line.charAt(i) === '"') return { len: 2, token: "bar_invisible" };
						return { len: 1, warn: "Unknown bar symbol" };
					default:
						return { len: 1, token: "bar_invisible" };
				}
				break;
			case ':':
				++i;
				switch (line.charAt(i)) {
					case ':':
						return { len: 2, token: "bar_dbl_repeat" };
					case '|':
						// :|
						++i;
						switch (line.charAt(i)) {
							case ']':
								// :|]
								++i;
								switch (line.charAt(i)) {
									case '|':
										// :|]|
										++i;
										if (line.charAt(i) === ':') return { len: 5, token: "bar_dbl_repeat" };
										return { len: 3, token: "bar_right_repeat" };
									default:
										return { len: 3, token: "bar_right_repeat" };
								}
								break;
							case '|':
								// :||
								++i;
								if (line.charAt(i) === ':') return { len: 4, token: "bar_dbl_repeat" };
								return { len: 3, token: "bar_right_repeat" };
							default:
								return { len: 2, token: "bar_right_repeat" };
						}
						break;
					default:
						return { len: 1, warn: "Unknown bar symbol" };
				}
				break;
			case '[':
				// [
				++i;
				if (line.charAt(i) === '|') {
					// [|
					++i;
					switch (line.charAt(i)) {
						case ':':
							return { len: 3, token: "bar_left_repeat" };
						case ']':
							return { len: 3, token: "bar_invisible" };
						default:
							return { len: 2, token: "bar_thick_thin" };
					}
				} else {
					if (line.charAt(i) >= '1' && line.charAt(i) <= '9' || line.charAt(i) === '"') return { len: 1, token: "bar_invisible" };
					return { len: 0 };
				}
				break;
			case '|':
				// |
				++i;
				switch (line.charAt(i)) {
					case ']':
						return { len: 2, token: "bar_thin_thick" };
					case '|':
						// ||
						++i;
						if (line.charAt(i) === ':') return { len: 3, token: "bar_left_repeat" };
						return { len: 2, token: "bar_thin_thin" };
					case ':':
						// |:
						var colons = 0;
						while (line.charAt(i + colons) === ':') {
							colons++;
						}return { len: 1 + colons, token: "bar_left_repeat" };
					default:
						return { len: 1, token: "bar_thin" };
				}
				break;
		}
		return { len: 0 };
	};

	// this returns all the characters in the string that match one of the characters in the legalChars string
	this.getTokenOf = function (str, legalChars) {
		for (var i = 0; i < str.length; i++) {
			if (legalChars.indexOf(str.charAt(i)) < 0) return { len: i, token: str.substring(0, i) };
		}
		return { len: i, token: str };
	};

	this.getToken = function (str, start, end) {
		// This returns the next set of chars that doesn't contain spaces
		var i = start;
		while (i < end && !this.isWhiteSpace(str.charAt(i))) {
			i++;
		}return str.substring(start, i);
	};

	// This just sees if the next token is the word passed in, with possible leading spaces
	this.isMatch = function (str, match) {
		var i = this.skipWhiteSpace(str);
		if (finished(str, i)) return 0;
		if (parseCommon.startsWith(str.substring(i), match)) return i + match.length;
		return 0;
	};

	this.getPitchFromTokens = function (tokens) {
		var ret = {};
		var pitches = { A: 5, B: 6, C: 0, D: 1, E: 2, F: 3, G: 4, a: 12, b: 13, c: 7, d: 8, e: 9, f: 10, g: 11 };
		ret.position = pitches[tokens[0].token];
		if (ret.position === undefined) return { warn: "Pitch expected. Found: " + tokens[0].token };
		tokens.shift();
		while (tokens.length) {
			switch (tokens[0].token) {
				case ',':
					ret.position -= 7;tokens.shift();break;
				case '\'':
					ret.position += 7;tokens.shift();break;
				default:
					return ret;
			}
		}
		return ret;
	};

	this.getKeyAccidentals2 = function (tokens) {
		var accs;
		// find and strip off all accidentals in the token list
		while (tokens.length > 0) {
			var acc;
			if (tokens[0].token === '^') {
				acc = 'sharp';
				tokens.shift();
				if (tokens.length === 0) return { accs: accs, warn: 'Expected note name after ' + acc };
				switch (tokens[0].token) {
					case '^':
						acc = 'dblsharp';tokens.shift();break;
					case '/':
						acc = 'quartersharp';tokens.shift();break;
				}
			} else if (tokens[0].token === '=') {
				acc = 'natural';
				tokens.shift();
			} else if (tokens[0].token === '_') {
				acc = 'flat';
				tokens.shift();
				if (tokens.length === 0) return { accs: accs, warn: 'Expected note name after ' + acc };
				switch (tokens[0].token) {
					case '_':
						acc = 'dblflat';tokens.shift();break;
					case '/':
						acc = 'quarterflat';tokens.shift();break;
				}
			} else {
				// Not an accidental, we'll assume that a later parse will recognize it.
				return { accs: accs };
			}
			if (tokens.length === 0) return { accs: accs, warn: 'Expected note name after ' + acc };
			switch (tokens[0].token.charAt(0)) {
				case 'a':
				case 'b':
				case 'c':
				case 'd':
				case 'e':
				case 'f':
				case 'g':
				case 'A':
				case 'B':
				case 'C':
				case 'D':
				case 'E':
				case 'F':
				case 'G':
					if (accs === undefined) accs = [];
					accs.push({ acc: acc, note: tokens[0].token.charAt(0) });
					if (tokens[0].token.length === 1) tokens.shift();else tokens[0].token = tokens[0].token.substring(1);
					break;
				default:
					return { accs: accs, warn: 'Expected note name after ' + acc + ' Found: ' + tokens[0].token };
			}
		}
		return { accs: accs };
	};

	// This gets an accidental marking for the key signature. It has the accidental then the pitch letter.
	this.getKeyAccidental = function (str) {
		var accTranslation = {
			'^': 'sharp',
			'^^': 'dblsharp',
			'=': 'natural',
			'_': 'flat',
			'__': 'dblflat',
			'_/': 'quarterflat',
			'^/': 'quartersharp'
		};
		var i = this.skipWhiteSpace(str);
		if (finished(str, i)) return { len: 0 };
		var acc = null;
		switch (str.charAt(i)) {
			case '^':
			case '_':
			case '=':
				acc = str.charAt(i);
				break;
			default:
				return { len: 0 };
		}
		i++;
		if (finished(str, i)) return { len: 1, warn: 'Expected note name after accidental' };
		switch (str.charAt(i)) {
			case 'a':
			case 'b':
			case 'c':
			case 'd':
			case 'e':
			case 'f':
			case 'g':
			case 'A':
			case 'B':
			case 'C':
			case 'D':
			case 'E':
			case 'F':
			case 'G':
				return { len: i + 1, token: { acc: accTranslation[acc], note: str.charAt(i) } };
			case '^':
			case '_':
			case '/':
				acc += str.charAt(i);
				i++;
				if (finished(str, i)) return { len: 2, warn: 'Expected note name after accidental' };
				switch (str.charAt(i)) {
					case 'a':
					case 'b':
					case 'c':
					case 'd':
					case 'e':
					case 'f':
					case 'g':
					case 'A':
					case 'B':
					case 'C':
					case 'D':
					case 'E':
					case 'F':
					case 'G':
						return { len: i + 1, token: { acc: accTranslation[acc], note: str.charAt(i) } };
					default:
						return { len: 2, warn: 'Expected note name after accidental' };
				}
				break;
			default:
				return { len: 1, warn: 'Expected note name after accidental' };
		}
	};

	this.isWhiteSpace = function (ch) {
		return ch === ' ' || ch === '\t' || ch === '\x12';
	};

	this.getMeat = function (line, start, end) {
		// This removes any comments starting with '%' and trims the ends of the string so that there are no leading or trailing spaces.
		// it returns just the start and end characters that contain the meat.
		var comment = line.indexOf('%', start);
		if (comment >= 0 && comment < end) end = comment;
		while (start < end && (line.charAt(start) === ' ' || line.charAt(start) === '\t' || line.charAt(start) === '\x12')) {
			start++;
		}while (start < end && (line.charAt(end - 1) === ' ' || line.charAt(end - 1) === '\t' || line.charAt(end - 1) === '\x12')) {
			end--;
		}return { start: start, end: end };
	};

	var isLetter = function isLetter(ch) {
		return ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z';
	};

	var isNumber = function isNumber(ch) {
		return ch >= '0' && ch <= '9';
	};

	this.tokenize = function (line, start, end, alphaUntilWhiteSpace) {
		// this returns all the tokens inside the passed string. A token is a punctuation mark, a string of digits, a string of letters.
		//  Quoted strings are one token.
		//  If there is a minus sign next to a number, then it is included in the number.
		// If there is a period immediately after a number, with a number immediately following, then a float is returned.
		// The type of token is returned: quote, alpha, number, punct
		// If alphaUntilWhiteSpace is true, then the behavior of the alpha token changes.

		var ret = this.getMeat(line, start, end);
		start = ret.start;
		end = ret.end;
		var tokens = [];
		var i;
		while (start < end) {
			if (line.charAt(start) === '"') {
				i = start + 1;
				while (i < end && line.charAt(i) !== '"') {
					i++;
				}tokens.push({ type: 'quote', token: line.substring(start + 1, i), start: start + 1, end: i });
				i++;
			} else if (isLetter(line.charAt(start))) {
				i = start + 1;
				if (alphaUntilWhiteSpace) while (i < end && !this.isWhiteSpace(line.charAt(i))) {
					i++;
				} else while (i < end && isLetter(line.charAt(i))) {
					i++;
				}tokens.push({ type: 'alpha', token: line.substring(start, i), continueId: isNumber(line.charAt(i)), start: start, end: i });
				start = i + 1;
			} else if (line.charAt(start) === '.' && isNumber(line.charAt(i + 1))) {
				i = start + 1;
				var int2 = null;
				var float2 = null;
				while (i < end && isNumber(line.charAt(i))) {
					i++;
				}float2 = parseFloat(line.substring(start, i));
				tokens.push({ type: 'number', token: line.substring(start, i), intt: int2, floatt: float2, continueId: isLetter(line.charAt(i)), start: start, end: i });
				start = i + 1;
			} else if (isNumber(line.charAt(start)) || line.charAt(start) === '-' && isNumber(line.charAt(i + 1))) {
				i = start + 1;
				var intt = null;
				var floatt = null;
				while (i < end && isNumber(line.charAt(i))) {
					i++;
				}if (line.charAt(i) === '.' && isNumber(line.charAt(i + 1))) {
					i++;
					while (i < end && isNumber(line.charAt(i))) {
						i++;
					}
				} else intt = parseInt(line.substring(start, i));

				floatt = parseFloat(line.substring(start, i));
				tokens.push({ type: 'number', token: line.substring(start, i), intt: intt, floatt: floatt, continueId: isLetter(line.charAt(i)), start: start, end: i });
				start = i + 1;
			} else if (line.charAt(start) === ' ' || line.charAt(start) === '\t') {
				i = start + 1;
			} else {
				tokens.push({ type: 'punct', token: line.charAt(start), start: start, end: start + 1 });
				i = start + 1;
			}
			start = i;
		}
		return tokens;
	};

	this.getVoiceToken = function (line, start, end) {
		// This finds the next token. A token is delimited by a space or an equal sign. If it starts with a quote, then the portion between the quotes is returned.
		var i = start;
		while (i < end && this.isWhiteSpace(line.charAt(i)) || line.charAt(i) === '=') {
			i++;
		}if (line.charAt(i) === '"') {
			var close = line.indexOf('"', i + 1);
			if (close === -1 || close >= end) return { len: 1, err: "Missing close quote" };
			return { len: close - start + 1, token: this.translateString(line.substring(i + 1, close)) };
		} else {
			var ii = i;
			while (ii < end && !this.isWhiteSpace(line.charAt(ii)) && line.charAt(ii) !== '=') {
				ii++;
			}return { len: ii - start + 1, token: line.substring(i, ii) };
		}
	};

	var charMap = {
		"`a": 'à', "'a": "á", "^a": "â", "~a": "ã", "\"a": "ä", "oa": "å", "aa": "å", "=a": "ā", "ua": "ă", ";a": "ą",
		"`e": 'è', "'e": "é", "^e": "ê", "\"e": "ë", "=e": "ē", "ue": "ĕ", ";e": "ę", ".e": "ė",
		"`i": 'ì', "'i": "í", "^i": "î", "\"i": "ï", "=i": "ī", "ui": "ĭ", ";i": "į",
		"`o": 'ò', "'o": "ó", "^o": "ô", "~o": "õ", "\"o": "ö", "=o": "ō", "uo": "ŏ", "/o": "ø",
		"`u": 'ù', "'u": "ú", "^u": "û", "~u": "ũ", "\"u": "ü", "ou": "ů", "=u": "ū", "uu": "ŭ", ";u": "ų",
		"`A": 'À', "'A": "Á", "^A": "Â", "~A": "Ã", "\"A": "Ä", "oA": "Å", "AA": "Å", "=A": "Ā", "uA": "Ă", ";A": "Ą",
		"`E": 'È', "'E": "É", "^E": "Ê", "\"E": "Ë", "=E": "Ē", "uE": "Ĕ", ";E": "Ę", ".E": "Ė",
		"`I": 'Ì', "'I": "Í", "^I": "Î", "~I": "Ĩ", "\"I": "Ï", "=I": "Ī", "uI": "Ĭ", ";I": "Į", ".I": "İ",
		"`O": 'Ò', "'O": "Ó", "^O": "Ô", "~O": "Õ", "\"O": "Ö", "=O": "Ō", "uO": "Ŏ", "/O": "Ø",
		"`U": 'Ù', "'U": "Ú", "^U": "Û", "~U": "Ũ", "\"U": "Ü", "oU": "Ů", "=U": "Ū", "uU": "Ŭ", ";U": "Ų",
		"ae": "æ", "AE": "Æ", "oe": "œ", "OE": "Œ", "ss": "ß",
		"'c": "ć", "^c": "ĉ", "uc": "č", "cc": "ç", ".c": "ċ", "cC": "Ç", "'C": "Ć", "^C": "Ĉ", "uC": "Č", ".C": "Ċ",
		"~N": "Ñ", "~n": "ñ",
		"=s": "š", "vs": "š",
		"DH": "Ð", "dh": "ð",
		"HO": "Ő", "Ho": "ő", "HU": "Ű", "Hu": "ű",
		"'Y": "Ý", "'y": "ý", "^Y": "Ŷ", "^y": "ŷ", "\"Y": "Ÿ", "\"y": "ÿ",
		"vS": "Š", "vZ": "Ž", "vz": 'ž'

		// More chars: Ĳ ĳ Ď ď Đ đ Ĝ ĝ Ğ ğ Ġ ġ Ģ ģ Ĥ ĥ Ħ ħ Ĵ ĵ Ķ ķ ĸ Ĺ ĺ Ļ ļ Ľ ľ Ŀ ŀ Ł ł Ń ń Ņ ņ Ň ň ŉ Ŋ ŋ Ŕ ŕ Ŗ ŗ Ř ř Ś ś Ŝ ŝ Ş ş Š Ţ ţ Ť ť Ŧ ŧ Ŵ ŵ Ź ź Ż ż Ž
	};
	var charMap1 = {
		"#": "♯",
		"b": "♭",
		"=": "♮"
	};
	var charMap2 = {
		"201": "♯",
		"202": "♭",
		"203": "♮",
		"241": "¡",
		"242": "¢", "252": "a", "262": "2", "272": "o", "302": "Â", "312": "Ê", "322": "Ò", "332": "Ú", "342": "â", "352": "ê", "362": "ò", "372": "ú",
		"243": "£", "253": "«", "263": "3", "273": "»", "303": "Ã", "313": "Ë", "323": "Ó", "333": "Û", "343": "ã", "353": "ë", "363": "ó", "373": "û",
		"244": "¤", "254": "¬", "264": "  ́", "274": "1⁄4", "304": "Ä", "314": "Ì", "324": "Ô", "334": "Ü", "344": "ä", "354": "ì", "364": "ô", "374": "ü",
		"245": "¥", "255": "-", "265": "μ", "275": "1⁄2", "305": "Å", "315": "Í", "325": "Õ", "335": "Ý", "345": "å", "355": "í", "365": "õ", "375": "ý",
		"246": "¦", "256": "®", "266": "¶", "276": "3⁄4", "306": "Æ", "316": "Î", "326": "Ö", "336": "Þ", "346": "æ", "356": "î", "366": "ö", "376": "þ",
		"247": "§", "257": " ̄", "267": "·", "277": "¿", "307": "Ç", "317": "Ï", "327": "×", "337": "ß", "347": "ç", "357": "ï", "367": "÷", "377": "ÿ",
		"250": " ̈", "260": "°", "270": " ̧", "300": "À", "310": "È", "320": "Ð", "330": "Ø", "340": "à", "350": "è", "360": "ð", "370": "ø",
		"251": "©", "261": "±", "271": "1", "301": "Á", "311": "É", "321": "Ñ", "331": "Ù", "341": "á", "351": "é", "361": "ñ", "371": "ù" };
	this.translateString = function (str) {
		var arr = str.split('\\');
		if (arr.length === 1) return str;
		var out = null;
		parseCommon.each(arr, function (s) {
			if (out === null) out = s;else {
				var c = charMap[s.substring(0, 2)];
				if (c !== undefined) out += c + s.substring(2);else {
					c = charMap2[s.substring(0, 3)];
					if (c !== undefined) out += c + s.substring(3);else {
						c = charMap1[s.substring(0, 1)];
						if (c !== undefined) out += c + s.substring(1);else out += "\\" + s;
					}
				}
			}
		});
		return out;
	};
	this.getNumber = function (line, index) {
		var num = 0;
		while (index < line.length) {
			switch (line.charAt(index)) {
				case '0':
					num = num * 10;index++;break;
				case '1':
					num = num * 10 + 1;index++;break;
				case '2':
					num = num * 10 + 2;index++;break;
				case '3':
					num = num * 10 + 3;index++;break;
				case '4':
					num = num * 10 + 4;index++;break;
				case '5':
					num = num * 10 + 5;index++;break;
				case '6':
					num = num * 10 + 6;index++;break;
				case '7':
					num = num * 10 + 7;index++;break;
				case '8':
					num = num * 10 + 8;index++;break;
				case '9':
					num = num * 10 + 9;index++;break;
				default:
					return { num: num, index: index };
			}
		}
		return { num: num, index: index };
	};

	this.getFraction = function (line, index) {
		var num = 1;
		var den = 1;
		if (line.charAt(index) !== '/') {
			var ret = this.getNumber(line, index);
			num = ret.num;
			index = ret.index;
		}
		if (line.charAt(index) === '/') {
			index++;
			if (line.charAt(index) === '/') {
				var div = 0.5;
				while (line.charAt(index++) === '/') {
					div = div / 2;
				}return { value: num * div, index: index - 1 };
			} else {
				var iSave = index;
				var ret2 = this.getNumber(line, index);
				if (ret2.num === 0 && iSave === index) // If we didn't use any characters, it is an implied 2
					ret2.num = 2;
				if (ret2.num !== 0) den = ret2.num;
				index = ret2.index;
			}
		}

		return { value: num / den, index: index };
	};

	this.theReverser = function (str) {
		if (parseCommon.endsWith(str, ", The")) return "The " + str.substring(0, str.length - 5);
		if (parseCommon.endsWith(str, ", A")) return "A " + str.substring(0, str.length - 3);
		return str;
	};

	this.stripComment = function (str) {
		var i = str.indexOf('%');
		if (i >= 0) return parseCommon.strip(str.substring(0, i));
		return parseCommon.strip(str);
	};

	this.getInt = function (str) {
		// This parses the beginning of the string for a number and returns { value: num, digits: num }
		// If digits is 0, then the string didn't point to a number.
		var x = parseInt(str);
		if (isNaN(x)) return { digits: 0 };
		var s = "" + x;
		var i = str.indexOf(s); // This is to account for leading spaces
		return { value: x, digits: i + s.length };
	};

	this.getFloat = function (str) {
		// This parses the beginning of the string for a number and returns { value: num, digits: num }
		// If digits is 0, then the string didn't point to a number.
		var x = parseFloat(str);
		if (isNaN(x)) return { digits: 0 };
		var s = "" + x;
		var i = str.indexOf(s); // This is to account for leading spaces
		return { value: x, digits: i + s.length };
	};

	this.getMeasurement = function (tokens) {
		if (tokens.length === 0) return { used: 0 };
		var used = 1;
		var num = '';
		if (tokens[0].token === '-') {
			tokens.shift();
			num = '-';
			used++;
		} else if (tokens[0].type !== 'number') return { used: 0 };
		num += tokens.shift().token;
		if (tokens.length === 0) return { used: 1, value: parseInt(num) };
		var x = tokens.shift();
		if (x.token === '.') {
			used++;
			if (tokens.length === 0) return { used: used, value: parseInt(num) };
			if (tokens[0].type === 'number') {
				x = tokens.shift();
				num = num + '.' + x.token;
				used++;
				if (tokens.length === 0) return { used: used, value: parseFloat(num) };
			}
			x = tokens.shift();
		}
		switch (x.token) {
			case 'pt':
				return { used: used + 1, value: parseFloat(num) };
			case 'cm':
				return { used: used + 1, value: parseFloat(num) / 2.54 * 72 };
			case 'in':
				return { used: used + 1, value: parseFloat(num) * 72 };
			default:
				tokens.unshift(x);return { used: used, value: parseFloat(num) };
		}
		return { used: 0 };
	};
	var substInChord = function substInChord(str) {
		while (str.indexOf("\\n") !== -1) {
			str = str.replace("\\n", "\n");
		}
		return str;
	};
	this.getBrackettedSubstring = function (line, i, maxErrorChars, _matchChar) {
		// This extracts the sub string by looking at the first character and searching for that
		// character later in the line (or search for the optional _matchChar).
		// For instance, if the first character is a quote it will look for
		// the end quote. If the end of the line is reached, then only up to the default number
		// of characters are returned, so that a missing end quote won't eat up the entire line.
		// It returns the substring and the number of characters consumed.
		// The number of characters consumed is normally two more than the size of the substring,
		// but in the error case it might not be.
		var matchChar = _matchChar || line.charAt(i);
		var pos = i + 1;
		while (pos < line.length && line.charAt(pos) !== matchChar) {
			++pos;
		}if (line.charAt(pos) === matchChar) return [pos - i + 1, substInChord(line.substring(i + 1, pos)), true];else // we hit the end of line, so we'll just pick an arbitrary num of chars so the line doesn't disappear.
			{
				pos = i + maxErrorChars;
				if (pos > line.length - 1) pos = line.length - 1;
				return [pos - i + 1, substInChord(line.substring(i + 1, pos)), false];
			}
	};
};

module.exports = Tokenizer;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_tune.js: a computer usable internal structure representing one tune.
//    Copyright (C) 2010-2018 Paul Rosen (paul at paulrosen dot net)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var parseCommon = __webpack_require__(0);
var parseKeyVoice = __webpack_require__(8);
var spacing = __webpack_require__(1);

/**
 * This is the data for a single ABC tune. It is created and populated by the window.ABCJS.parse.Parse class.
 * Also known as the ABCJS Abstract Syntax Tree
 * @alternateClassName ABCJS.Tune
 */
var Tune = function Tune() {
	// The structure consists of a hash with the following two items:
	// metaText: a hash of {key, value}, where key is one of: title, author, rhythm, source, transcription, unalignedWords, etc...
	// tempo: { noteLength: number (e.g. .125), bpm: number }
	// lines: an array of elements, or one of the following:
	//
	// STAFF: array of elements
	// SUBTITLE: string
	//
	// TODO: actually, the start and end char should modify each part of the note type
	// The elements all have a type field and a start and end char
	// field. The rest of the fields depend on the type and are listed below:
	// REST: duration=1,2,4,8; chord: string
	// NOTE: accidental=none,dbl_flat,flat,natural,sharp,dbl_sharp
	//		pitch: "C" is 0. The numbers refer to the pitch letter.
	//		duration: .5 (sixteenth), .75 (dotted sixteenth), 1 (eighth), 1.5 (dotted eighth)
	//			2 (quarter), 3 (dotted quarter), 4 (half), 6 (dotted half) 8 (whole)
	//		chord: { name:chord, position: one of 'default', 'above', 'below' }
	//		end_beam = true or undefined if this is the last note in a beam.
	//		lyric: array of { syllable: xxx, divider: one of " -_" }
	//		startTie = true|undefined
	//		endTie = true|undefined
	//		startTriplet = num <- that is the number to print
	//		endTriplet = true|undefined (the last note of the triplet)
	// TODO: actually, decoration should be an array.
	//		decoration: upbow, downbow, accent
	// BAR: type=bar_thin, bar_thin_thick, bar_thin_thin, bar_thick_thin, bar_right_repeat, bar_left_repeat, bar_double_repeat
	//	number: 1 or 2: if it is the start of a first or second ending
	// CLEF: type=treble,bass
	// KEY-SIG:
	//		accidentals[]: { acc:sharp|dblsharp|natural|flat|dblflat,  note:a|b|c|d|e|f|g }
	// METER: type: common_time,cut_time,specified
	//		if specified, { num: 99, den: 99 }

	this.getBeatLength = function () {
		for (var i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff) {
				for (var j = 0; j < this.lines[i].staff.length; j++) {
					if (this.lines[i].staff[j].meter) {
						var meter = this.lines[i].staff[j].meter;
						if (meter.type === "specified") {
							if (meter.value.length > 0) {
								var num = parseInt(meter.value[0].num, 10);
								var den = parseInt(meter.value[0].den, 10);
								if (num === 3 && den === 8) return 3 / 8;
								if (num === 6 && den === 8) return 3 / 8;
								if (num === 9 && den === 8) return 3 / 8;
								if (num === 12 && den === 8) return 3 / 8;
								return 1 / den;
							} else return 1 / 4; // No meter was specified, so use this default
						} else if (meter.type === 'cut_time') {
							return 1 / 2;
						} else {
							return 1 / 4; // TODO-PER: this works for common time, but not for the ancient meters.
						}
					}
				}
			}
		}
		return 1 / 4; // No meter was specified, so use this default
	};

	this.getPickupLength = function () {
		var pickupLength = 0;
		for (var i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff) {
				for (var j = 0; j < this.lines[i].staff.length; j++) {
					for (var v = 0; v < this.lines[i].staff[j].voices.length; v++) {
						var voice = this.lines[i].staff[j].voices[v];
						var hasNote = false;
						for (var el = 0; el < voice.length; el++) {
							if (voice[el].duration) pickupLength += voice[el].duration;
							if (pickupLength >= this.getBarLength()) pickupLength -= this.getBarLength();
							if (voice[el].el_type === 'bar') return pickupLength;
						}
					}
				}
			}
		}
		return pickupLength;
	};

	this.getBarLength = function () {
		var meter = this.getMeter();
		var measureLength;
		switch (meter.type) {
			case "common_time":
				measureLength = 1;this.meter = { num: 4, den: 4 };break;
			case "cut_time":
				measureLength = 1;this.meter = { num: 2, den: 2 };break;
			default:
				measureLength = meter.value[0].num / meter.value[0].den;this.meter = { num: parseInt(meter.value[0].num, 10), den: parseInt(meter.value[0].den, 10) };
		}
		return measureLength;
	};

	this.reset = function () {
		this.version = "1.0.1";
		this.media = "screen";
		this.metaText = {};
		this.formatting = {};
		this.lines = [];
		this.staffNum = 0;
		this.voiceNum = 0;
		this.lineNum = 0;
	};

	this.resolveOverlays = function () {
		for (var i = 0; i < this.lines.length; i++) {
			var line = this.lines[i];
			if (line.staff) {
				for (var j = 0; j < line.staff.length; j++) {
					var staff = line.staff[j];
					var overlayVoice = [];
					for (var k = 0; k < staff.voices.length; k++) {
						var voice = staff.voices[k];
						overlayVoice.push({ hasOverlay: false, voice: [], snip: [] });
						var durationThisBar = 0;
						var inOverlay = false;
						var snipStart = -1;
						for (var kk = 0; kk < voice.length; kk++) {
							var event = voice[kk];
							if (event.el_type === "overlay") {
								inOverlay = true;
								snipStart = kk;
								overlayVoice[k].hasOverlay = true;
							} else if (event.el_type === "bar") {
								if (inOverlay) {
									// delete the overlay events from this array without messing up this loop.
									inOverlay = false;
									overlayVoice[k].snip.push({ start: snipStart, len: kk - snipStart });
								} else {
									overlayVoice[k].voice.push({ el_type: "note", duration: durationThisBar, rest: { type: "invisible" }, startChar: event.startChar, endChar: event.endChar });
									overlayVoice[k].voice.push(event);
								}
								durationThisBar = 0;
							} else if (event.el_type === "note") {
								if (inOverlay) {
									overlayVoice[k].voice.push(event);
								} else {
									durationThisBar += event.duration;
								}
							} else if (event.el_type === "scale" || event.el_type === "stem" || event.el_type === "style" || event.el_type === "transpose") {
								// These types of events are duplicated on the overlay layer.
								overlayVoice[k].voice.push(event);
							}
						}
					}
					for (k = 0; k < overlayVoice.length; k++) {
						var ov = overlayVoice[k];
						if (ov.hasOverlay) {
							staff.voices.push(ov.voice);
							for (var kkk = ov.snip.length - 1; kkk >= 0; kkk--) {
								var snip = ov.snip[kkk];
								staff.voices[k].splice(snip.start, snip.len);
							}
						}
					}
				}
			}
		}
	};

	this.cleanUp = function (defWidth, defLength, barsperstaff, staffnonote, currSlur) {
		this.closeLine(); // Close the last line.

		// If the tempo was created with a string like "Allegro", then the duration of a beat needs to be set at the last moment, when it is most likely known.
		if (this.metaText.tempo && this.metaText.tempo.bpm && !this.metaText.tempo.duration) this.metaText.tempo.duration = [this.getBeatLength()];

		// Remove any blank lines
		var anyDeleted = false;
		var i, s, v;
		for (i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff !== undefined) {
				var hasAny = false;
				for (s = 0; s < this.lines[i].staff.length; s++) {
					if (this.lines[i].staff[s] === undefined) {
						anyDeleted = true;
						this.lines[i].staff[s] = null;
						//this.lines[i].staff[s] = { voices: []};	// TODO-PER: There was a part missing in the abc music. How should we recover?
					} else {
						for (v = 0; v < this.lines[i].staff[s].voices.length; v++) {
							if (this.lines[i].staff[s].voices[v] === undefined) this.lines[i].staff[s].voices[v] = []; // TODO-PER: There was a part missing in the abc music. How should we recover?
							else if (this.containsNotes(this.lines[i].staff[s].voices[v])) hasAny = true;
						}
					}
				}
				if (!hasAny) {
					this.lines[i] = null;
					anyDeleted = true;
				}
			}
		}
		if (anyDeleted) {
			this.lines = parseCommon.compact(this.lines);
			parseCommon.each(this.lines, function (line) {
				if (line.staff) line.staff = parseCommon.compact(line.staff);
			});
		}

		// if we exceeded the number of bars allowed on a line, then force a new line
		if (barsperstaff) {
			for (i = 0; i < this.lines.length; i++) {
				if (this.lines[i].staff !== undefined) {
					for (s = 0; s < this.lines[i].staff.length; s++) {
						var permanentItems = [];
						for (v = 0; v < this.lines[i].staff[s].voices.length; v++) {
							var voice = this.lines[i].staff[s].voices[v];
							var barNumThisLine = 0;
							for (var n = 0; n < voice.length; n++) {
								if (voice[n].el_type === 'bar') {
									barNumThisLine++;
									if (barNumThisLine >= barsperstaff) {
										// push everything else to the next line, if there is anything else,
										// and there is a next line. If there isn't a next line, create one.
										if (n < voice.length - 1) {
											if (i === this.lines.length - 1) {
												var cp = JSON.parse(JSON.stringify(this.lines[i]));
												this.lines.push(parseCommon.clone(cp));
												for (var ss = 0; ss < this.lines[i + 1].staff.length; ss++) {
													for (var vv = 0; vv < this.lines[i + 1].staff[ss].voices.length; vv++) {
														this.lines[i + 1].staff[ss].voices[vv] = [];
													}
												}
											}
											var startElement = n + 1;
											var section = this.lines[i].staff[s].voices[v].slice(startElement);
											this.lines[i].staff[s].voices[v] = this.lines[i].staff[s].voices[v].slice(0, startElement);
											this.lines[i + 1].staff[s].voices[v] = permanentItems.concat(section.concat(this.lines[i + 1].staff[s].voices[v]));
										}
									}
								} else if (!voice[n].duration) {
									permanentItems.push(voice[n]);
								}
							}
						}
					}
				}
			}
		}

		// If we were passed staffnonote, then we want to get rid of all staffs that contain only rests.
		if (barsperstaff) {
			anyDeleted = false;
			for (i = 0; i < this.lines.length; i++) {
				if (this.lines[i].staff !== undefined) {
					for (s = 0; s < this.lines[i].staff.length; s++) {
						var keepThis = false;
						for (v = 0; v < this.lines[i].staff[s].voices.length; v++) {
							if (this.containsNotesStrict(this.lines[i].staff[s].voices[v])) {
								keepThis = true;
							}
						}
						if (!keepThis) {
							anyDeleted = true;
							this.lines[i].staff[s] = null;
						}
					}
				}
			}
			if (anyDeleted) {
				parseCommon.each(this.lines, function (line) {
					if (line.staff) line.staff = parseCommon.compact(line.staff);
				});
			}
		}

		// Remove the temporary working variables
		for (i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff) {
				for (s = 0; s < this.lines[i].staff.length; s++) {
					delete this.lines[i].staff[s].workingClef;
				}
			}
		}

		// If there are overlays, create new voices for them.
		this.resolveOverlays();

		function cleanUpSlursInLine(line) {
			var x;
			//			var lyr = null;	// TODO-PER: debugging.

			var addEndSlur = function addEndSlur(obj, num, chordPos) {
				if (currSlur[chordPos] === undefined) {
					// There isn't an exact match for note position, but we'll take any other open slur.
					for (x = 0; x < currSlur.length; x++) {
						if (currSlur[x] !== undefined) {
							chordPos = x;
							break;
						}
					}
					if (currSlur[chordPos] === undefined) {
						var offNum = chordPos * 100 + 1;
						parseCommon.each(obj.endSlur, function (x) {
							if (offNum === x) --offNum;
						});
						currSlur[chordPos] = [offNum];
					}
				}
				var slurNum;
				for (var i = 0; i < num; i++) {
					slurNum = currSlur[chordPos].pop();
					obj.endSlur.push(slurNum);
					//					lyr.syllable += '<' + slurNum;	// TODO-PER: debugging
				}
				if (currSlur[chordPos].length === 0) delete currSlur[chordPos];
				return slurNum;
			};

			var addStartSlur = function addStartSlur(obj, num, chordPos, usedNums) {
				obj.startSlur = [];
				if (currSlur[chordPos] === undefined) {
					currSlur[chordPos] = [];
				}
				var nextNum = chordPos * 100 + 1;
				for (var i = 0; i < num; i++) {
					if (usedNums) {
						parseCommon.each(usedNums, function (x) {
							if (nextNum === x) ++nextNum;
						});
						parseCommon.each(usedNums, function (x) {
							if (nextNum === x) ++nextNum;
						});
						parseCommon.each(usedNums, function (x) {
							if (nextNum === x) ++nextNum;
						});
					}
					parseCommon.each(currSlur[chordPos], function (x) {
						if (nextNum === x) ++nextNum;
					});
					parseCommon.each(currSlur[chordPos], function (x) {
						if (nextNum === x) ++nextNum;
					});

					currSlur[chordPos].push(nextNum);
					obj.startSlur.push({ label: nextNum });
					//					lyr.syllable += ' ' + nextNum + '>';	// TODO-PER:debugging
					nextNum++;
				}
			};

			for (var i = 0; i < line.length; i++) {
				var el = line[i];
				//				if (el.lyric === undefined)	// TODO-PER: debugging
				//					el.lyric = [{ divider: '-' }];	// TODO-PER: debugging
				//				lyr = el.lyric[0];	// TODO-PER: debugging
				//				lyr.syllable = '';	// TODO-PER: debugging
				if (el.el_type === 'note') {
					if (el.gracenotes) {
						for (var g = 0; g < el.gracenotes.length; g++) {
							if (el.gracenotes[g].endSlur) {
								var gg = el.gracenotes[g].endSlur;
								el.gracenotes[g].endSlur = [];
								for (var ggg = 0; ggg < gg; ggg++) {
									addEndSlur(el.gracenotes[g], 1, 20);
								}
							}
							if (el.gracenotes[g].startSlur) {
								x = el.gracenotes[g].startSlur;
								addStartSlur(el.gracenotes[g], x, 20);
							}
						}
					}
					if (el.endSlur) {
						x = el.endSlur;
						el.endSlur = [];
						addEndSlur(el, x, 0);
					}
					if (el.startSlur) {
						x = el.startSlur;
						addStartSlur(el, x, 0);
					}
					if (el.pitches) {
						var usedNums = [];
						for (var p = 0; p < el.pitches.length; p++) {
							if (el.pitches[p].endSlur) {
								var k = el.pitches[p].endSlur;
								el.pitches[p].endSlur = [];
								for (var j = 0; j < k; j++) {
									var slurNum = addEndSlur(el.pitches[p], 1, p + 1);
									usedNums.push(slurNum);
								}
							}
						}
						for (p = 0; p < el.pitches.length; p++) {
							if (el.pitches[p].startSlur) {
								x = el.pitches[p].startSlur;
								addStartSlur(el.pitches[p], x, p + 1, usedNums);
							}
						}
						// Correct for the weird gracenote case where ({g}a) should match.
						// The end slur was already assigned to the note, and needs to be moved to the first note of the graces.
						if (el.gracenotes && el.pitches[0].endSlur && el.pitches[0].endSlur[0] === 100 && el.pitches[0].startSlur) {
							if (el.gracenotes[0].endSlur) el.gracenotes[0].endSlur.push(el.pitches[0].startSlur[0].label);else el.gracenotes[0].endSlur = [el.pitches[0].startSlur[0].label];
							if (el.pitches[0].endSlur.length === 1) delete el.pitches[0].endSlur;else if (el.pitches[0].endSlur[0] === 100) el.pitches[0].endSlur.shift();else if (el.pitches[0].endSlur[el.pitches[0].endSlur.length - 1] === 100) el.pitches[0].endSlur.pop();
							if (currSlur[1].length === 1) delete currSlur[1];else currSlur[1].pop();
						}
					}
				}
			}
		}

		// TODO-PER: This could be done faster as we go instead of as the last step.
		function fixClefPlacement(el) {
			parseKeyVoice.fixClef(el);
			//if (el.el_type === 'clef') {
			//				var min = -2;
			//				var max = 5;
			//				switch(el.type) {
			//					case 'treble+8':
			//					case 'treble-8':
			//						break;
			//					case 'bass':
			//					case 'bass+8':
			//					case 'bass-8':
			//						el.verticalPos = 20 + el.verticalPos; min += 6; max += 6;
			//						break;
			//					case 'tenor':
			//					case 'tenor+8':
			//					case 'tenor-8':
			//						el.verticalPos = - el.verticalPos; min = -40; max = 40;
			////						el.verticalPos+=2; min += 6; max += 6;
			//						break;
			//					case 'alto':
			//					case 'alto+8':
			//					case 'alto-8':
			//						el.verticalPos = - el.verticalPos; min = -40; max = 40;
			////						el.verticalPos-=2; min += 4; max += 4;
			//						break;
			//				}
			//				if (el.verticalPos < min) {
			//					while (el.verticalPos < min)
			//						el.verticalPos += 7;
			//				} else if (el.verticalPos > max) {
			//					while (el.verticalPos > max)
			//						el.verticalPos -= 7;
			//				}
			//}
		}

		function getNextMusicLine(lines, currentLine) {
			currentLine++;
			while (lines.length > currentLine) {
				if (lines[currentLine].staff) return lines[currentLine];
				currentLine++;
			}
			return null;
		}

		for (this.lineNum = 0; this.lineNum < this.lines.length; this.lineNum++) {
			var staff = this.lines[this.lineNum].staff;
			if (staff) {
				for (this.staffNum = 0; this.staffNum < staff.length; this.staffNum++) {
					if (staff[this.staffNum].clef) fixClefPlacement(staff[this.staffNum].clef);
					for (this.voiceNum = 0; this.voiceNum < staff[this.staffNum].voices.length; this.voiceNum++) {
						var voice = staff[this.staffNum].voices[this.voiceNum];
						cleanUpSlursInLine(voice);
						for (var j = 0; j < voice.length; j++) {
							if (voice[j].el_type === 'clef') fixClefPlacement(voice[j]);
						}
						if (voice.length > 0 && voice[voice.length - 1].barNumber) {
							// Don't hang a bar number on the last bar line: it should go on the next line.
							var nextLine = getNextMusicLine(this.lines, this.lineNum);
							if (nextLine) nextLine.staff[0].barNumber = voice[voice.length - 1].barNumber;
							delete voice[voice.length - 1].barNumber;
						}
					}
				}
			}
		}

		if (!this.formatting.pagewidth) this.formatting.pagewidth = defWidth;
		if (!this.formatting.pageheight) this.formatting.pageheight = defLength;

		// Remove temporary variables that the outside doesn't need to know about
		delete this.staffNum;
		delete this.voiceNum;
		delete this.lineNum;
		delete this.potentialStartBeam;
		delete this.potentialEndBeam;
		delete this.vskipPending;

		return currSlur;
	};

	this.reset();

	this.getLastNote = function () {
		if (this.lines[this.lineNum] && this.lines[this.lineNum].staff && this.lines[this.lineNum].staff[this.staffNum] && this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum]) {
			for (var i = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum].length - 1; i >= 0; i--) {
				var el = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum][i];
				if (el.el_type === 'note') {
					return el;
				}
			}
		}
		return null;
	};

	this.addTieToLastNote = function () {
		// TODO-PER: if this is a chord, which note?
		var el = this.getLastNote();
		if (el && el.pitches && el.pitches.length > 0) {
			el.pitches[0].startTie = {};
			return true;
		}
		return false;
	};

	this.getDuration = function (el) {
		if (el.duration) return el.duration;
		//if (el.pitches && el.pitches.length > 0) return el.pitches[0].duration;
		return 0;
	};

	this.closeLine = function () {
		if (this.potentialStartBeam && this.potentialEndBeam) {
			this.potentialStartBeam.startBeam = true;
			this.potentialEndBeam.endBeam = true;
		}
		delete this.potentialStartBeam;
		delete this.potentialEndBeam;
	};

	this.appendElement = function (type, startChar, endChar, hashParams) {
		var This = this;
		var pushNote = function pushNote(hp) {
			if (hp.pitches !== undefined) {
				var mid = This.lines[This.lineNum].staff[This.staffNum].workingClef.verticalPos;
				parseCommon.each(hp.pitches, function (p) {
					p.verticalPos = p.pitch - mid;
				});
			}
			if (hp.gracenotes !== undefined) {
				var mid2 = This.lines[This.lineNum].staff[This.staffNum].workingClef.verticalPos;
				parseCommon.each(hp.gracenotes, function (p) {
					p.verticalPos = p.pitch - mid2;
				});
			}
			This.lines[This.lineNum].staff[This.staffNum].voices[This.voiceNum].push(hp);
		};
		hashParams.el_type = type;
		if (startChar !== null) hashParams.startChar = startChar;
		if (endChar !== null) hashParams.endChar = endChar;
		var endBeamHere = function endBeamHere() {
			This.potentialStartBeam.startBeam = true;
			hashParams.endBeam = true;
			delete This.potentialStartBeam;
			delete This.potentialEndBeam;
		};
		var endBeamLast = function endBeamLast() {
			if (This.potentialStartBeam !== undefined && This.potentialEndBeam !== undefined) {
				// Do we have a set of notes to beam?
				This.potentialStartBeam.startBeam = true;
				This.potentialEndBeam.endBeam = true;
			}
			delete This.potentialStartBeam;
			delete This.potentialEndBeam;
		};
		if (type === 'note') {
			// && (hashParams.rest !== undefined || hashParams.end_beam === undefined)) {
			// Now, add the startBeam and endBeam where it is needed.
			// end_beam is already set on the places where there is a forced end_beam. We'll remove that here after using that info.
			// this.potentialStartBeam either points to null or the start beam.
			// this.potentialEndBeam either points to null or the start beam.
			// If we have a beam break (note is longer than a quarter, or an end_beam is on this element), then set the beam if we have one.
			// reset the variables for the next notes.
			var dur = This.getDuration(hashParams);
			if (dur >= 0.25) {
				// The beam ends on the note before this.
				endBeamLast();
			} else if (hashParams.force_end_beam_last && This.potentialStartBeam !== undefined) {
				endBeamLast();
			} else if (hashParams.end_beam && This.potentialStartBeam !== undefined) {
				// the beam is forced to end on this note, probably because of a space in the ABC
				if (hashParams.rest === undefined) endBeamHere();else endBeamLast();
			} else if (hashParams.rest === undefined) {
				// this a short note and we aren't about to end the beam
				if (This.potentialStartBeam === undefined) {
					// We aren't collecting notes for a beam, so start here.
					if (!hashParams.end_beam) {
						This.potentialStartBeam = hashParams;
						delete This.potentialEndBeam;
					}
				} else {
					This.potentialEndBeam = hashParams; // Continue the beaming, look for the end next note.
				}
			}

			//  end_beam goes on rests and notes which precede rests _except_ when a rest (or set of adjacent rests) has normal notes on both sides (no spaces)
			//			if (hashParams.rest !== undefined)
			//			{
			//				hashParams.end_beam = true;
			//				var el2 = this.getLastNote();
			//				if (el2) el2.end_beam = true;
			//				// TODO-PER: implement exception mentioned in the comment.
			//			}
		} else {
			// It's not a note, so there definitely isn't beaming after it.
			endBeamLast();
		}
		delete hashParams.end_beam; // We don't want this temporary variable hanging around.
		delete hashParams.force_end_beam_last; // We don't want this temporary variable hanging around.
		pushNote(hashParams);
	};

	this.appendStartingElement = function (type, startChar, endChar, hashParams2) {
		// If we're in the middle of beaming, then end the beam.
		this.closeLine();

		// We only ever want implied naturals the first time.
		var impliedNaturals;
		if (type === 'key') {
			impliedNaturals = hashParams2.impliedNaturals;
			delete hashParams2.impliedNaturals;
			delete hashParams2.explicitAccidentals;
		}

		// Clone the object because it will be sticking around for the next line and we don't want the extra fields in it.
		var hashParams = parseCommon.clone(hashParams2);

		if (this.lines[this.lineNum].staff) {
			// be sure that we are on a music type line before doing the following.
			// If this is a clef type, then we replace the working clef on the line. This is kept separate from
			// the clef in case there is an inline clef field. We need to know what the current position for
			// the note is.
			if (type === 'clef') this.lines[this.lineNum].staff[this.staffNum].workingClef = hashParams;

			// If this is the first item in this staff, then we might have to initialize the staff, first.
			if (this.lines[this.lineNum].staff.length <= this.staffNum) {
				this.lines[this.lineNum].staff[this.staffNum] = {};
				this.lines[this.lineNum].staff[this.staffNum].clef = parseCommon.clone(this.lines[this.lineNum].staff[0].clef);
				this.lines[this.lineNum].staff[this.staffNum].key = parseCommon.clone(this.lines[this.lineNum].staff[0].key);
				if (this.lines[this.lineNum].staff[0].meter) this.lines[this.lineNum].staff[this.staffNum].meter = parseCommon.clone(this.lines[this.lineNum].staff[0].meter);
				this.lines[this.lineNum].staff[this.staffNum].workingClef = parseCommon.clone(this.lines[this.lineNum].staff[0].workingClef);
				this.lines[this.lineNum].staff[this.staffNum].voices = [[]];
			}

			// These elements should not be added twice, so if the element exists on this line without a note or bar before it, just replace the staff version.
			var voice = this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum];
			for (var i = 0; i < voice.length; i++) {
				if (voice[i].el_type === 'note' || voice[i].el_type === 'bar') {
					hashParams.el_type = type;
					hashParams.startChar = startChar;
					hashParams.endChar = endChar;
					if (impliedNaturals) hashParams.accidentals = impliedNaturals.concat(hashParams.accidentals);
					voice.push(hashParams);
					return;
				}
				if (voice[i].el_type === type) {
					hashParams.el_type = type;
					hashParams.startChar = startChar;
					hashParams.endChar = endChar;
					if (impliedNaturals) hashParams.accidentals = impliedNaturals.concat(hashParams.accidentals);
					voice[i] = hashParams;
					return;
				}
			}
			// We didn't see either that type or a note, so replace the element to the staff.
			this.lines[this.lineNum].staff[this.staffNum][type] = hashParams2;
		}
	};

	this.getNumLines = function () {
		return this.lines.length;
	};

	this.pushLine = function (hash) {
		if (this.vskipPending) {
			hash.vskip = this.vskipPending;
			delete this.vskipPending;
		}
		this.lines.push(hash);
	};

	this.addSubtitle = function (str) {
		this.pushLine({ subtitle: str });
	};

	this.addSpacing = function (num) {
		this.vskipPending = num;
	};

	this.addNewPage = function (num) {
		this.pushLine({ newpage: num });
	};

	this.addSeparator = function (spaceAbove, spaceBelow, lineLength) {
		this.pushLine({ separator: { spaceAbove: spaceAbove, spaceBelow: spaceBelow, lineLength: lineLength } });
	};

	this.addText = function (str) {
		this.pushLine({ text: str });
	};

	this.addCentered = function (str) {
		this.pushLine({ text: [{ text: str, center: true }] });
	};

	this.containsNotes = function (voice) {
		for (var i = 0; i < voice.length; i++) {
			if (voice[i].el_type === 'note' || voice[i].el_type === 'bar') return true;
		}
		return false;
	};

	this.containsNotesStrict = function (voice) {
		for (var i = 0; i < voice.length; i++) {
			if (voice[i].el_type === 'note' && voice[i].rest === undefined) return true;
		}
		return false;
	};

	//	anyVoiceContainsNotes: function(line) {
	//		for (var i = 0; i < line.staff.voices.length; i++) {
	//			if (this.containsNotes(line.staff.voices[i]))
	//				return true;
	//		}
	//		return false;
	//	},

	this.startNewLine = function (params) {
		// If the pointed to line doesn't exist, just create that. If the line does exist, but doesn't have any music on it, just use it.
		// If it does exist and has music, then increment the line number. If the new element doesn't exist, create it.
		var This = this;
		this.closeLine(); // Close the previous line.
		var createVoice = function createVoice(params) {
			This.lines[This.lineNum].staff[This.staffNum].voices[This.voiceNum] = [];
			if (This.isFirstLine(This.lineNum)) {
				if (params.name) {
					if (!This.lines[This.lineNum].staff[This.staffNum].title) This.lines[This.lineNum].staff[This.staffNum].title = [];This.lines[This.lineNum].staff[This.staffNum].title[This.voiceNum] = params.name;
				}
			} else {
				if (params.subname) {
					if (!This.lines[This.lineNum].staff[This.staffNum].title) This.lines[This.lineNum].staff[This.staffNum].title = [];This.lines[This.lineNum].staff[This.staffNum].title[This.voiceNum] = params.subname;
				}
			}
			if (params.style) This.appendElement('style', null, null, { head: params.style });
			if (params.stem) This.appendElement('stem', null, null, { direction: params.stem });else if (This.voiceNum > 0) {
				if (This.lines[This.lineNum].staff[This.staffNum].voices[0] !== undefined) {
					var found = false;
					for (var i = 0; i < This.lines[This.lineNum].staff[This.staffNum].voices[0].length; i++) {
						if (This.lines[This.lineNum].staff[This.staffNum].voices[0].el_type === 'stem') found = true;
					}
					if (!found) {
						var stem = { el_type: 'stem', direction: 'up' };
						This.lines[This.lineNum].staff[This.staffNum].voices[0].splice(0, 0, stem);
					}
				}
				This.appendElement('stem', null, null, { direction: 'down' });
			}
			if (params.scale) This.appendElement('scale', null, null, { size: params.scale });
		};
		var createStaff = function createStaff(params) {
			if (params.key && params.key.impliedNaturals) {
				params.key.accidentals = params.key.accidentals.concat(params.key.impliedNaturals);
				delete params.key.impliedNaturals;
			}

			This.lines[This.lineNum].staff[This.staffNum] = { voices: [], clef: params.clef, key: params.key, workingClef: params.clef };
			if (params.stafflines !== undefined) {
				This.lines[This.lineNum].staff[This.staffNum].clef.stafflines = params.stafflines;
				This.lines[This.lineNum].staff[This.staffNum].workingClef.stafflines = params.stafflines;
			}
			if (params.staffscale) {
				This.lines[This.lineNum].staff[This.staffNum].staffscale = params.staffscale;
			}
			if (params.vocalfont) This.lines[This.lineNum].staff[This.staffNum].vocalfont = params.vocalfont;
			if (params.bracket) This.lines[This.lineNum].staff[This.staffNum].bracket = params.bracket;
			if (params.brace) This.lines[This.lineNum].staff[This.staffNum].brace = params.brace;
			if (params.connectBarLines) This.lines[This.lineNum].staff[This.staffNum].connectBarLines = params.connectBarLines;
			if (params.barNumber) This.lines[This.lineNum].staff[This.staffNum].barNumber = params.barNumber;
			createVoice(params);
			// Some stuff just happens for the first voice
			if (params.part) This.appendElement('part', params.startChar, params.endChar, { title: params.part });
			if (params.meter !== undefined) This.lines[This.lineNum].staff[This.staffNum].meter = params.meter;
		};
		var createLine = function createLine(params) {
			This.lines[This.lineNum] = { staff: [] };
			createStaff(params);
		};
		if (this.lines[this.lineNum] === undefined) createLine(params);else if (this.lines[this.lineNum].staff === undefined) {
			this.lineNum++;
			this.startNewLine(params);
		} else if (this.lines[this.lineNum].staff[this.staffNum] === undefined) createStaff(params);else if (this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum] === undefined) createVoice(params);else if (!this.containsNotes(this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum])) return;else {
			this.lineNum++;
			this.startNewLine(params);
		}
	};

	this.hasBeginMusic = function () {
		// return true if there exists at least one line that contains "staff"
		for (var i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff) return true;
		}
		return false;
	};

	this.isFirstLine = function (index) {
		for (var i = index - 1; i >= 0; i--) {
			if (this.lines[i].staff !== undefined) return false;
		}
		return true;
	};

	this.getMeter = function () {
		for (var i = 0; i < this.lines.length; i++) {
			var line = this.lines[i];
			if (line.staff) {
				for (var j = 0; j < line.staff.length; j++) {
					var meter = line.staff[j].meter;
					if (meter) {
						return meter;
					}
				}
			}
		}
		return { type: "common_time" };
	};

	this.getMeterFraction = function () {
		var meter = this.getMeter();
		var num = 4;
		var den = 4;
		if (meter) {
			if (meter.type === 'specified') {
				num = meter.value[0].num;
				den = meter.value[0].den;
			} else if (meter.type === 'cut_time') {
				num = 2;
				den = 2;
			} else if (meter.type === 'common_time') {
				num = 4;
				den = 4;
			}
		}
		return { num: num, den: den };
	};

	this.getCurrentVoice = function () {
		if (this.lines[this.lineNum] !== undefined && this.lines[this.lineNum].staff[this.staffNum] !== undefined && this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum] !== undefined) return this.lines[this.lineNum].staff[this.staffNum].voices[this.voiceNum];else return null;
	};

	this.setCurrentVoice = function (staffNum, voiceNum) {
		this.staffNum = staffNum;
		this.voiceNum = voiceNum;
		for (var i = 0; i < this.lines.length; i++) {
			if (this.lines[i].staff) {
				if (this.lines[i].staff[staffNum] === undefined || this.lines[i].staff[staffNum].voices[voiceNum] === undefined || !this.containsNotes(this.lines[i].staff[staffNum].voices[voiceNum])) {
					this.lineNum = i;
					return;
				}
			}
		}
		this.lineNum = i;
	};

	this.addMetaText = function (key, value) {
		if (this.metaText[key] === undefined) this.metaText[key] = value;else this.metaText[key] += "\n" + value;
	};

	this.addMetaTextArray = function (key, value) {
		if (this.metaText[key] === undefined) this.metaText[key] = [value];else this.metaText[key].push(value);
	};
	this.addMetaTextObj = function (key, value) {
		this.metaText[key] = value;
	};

	function addVerticalInfo(timingEvents) {
		// Add vertical info to the bar events: put the next event's top, and the event after the next measure's top.
		var lastBarTop;
		var lastBarBottom;
		var lastEventTop;
		var lastEventBottom;
		for (var e = timingEvents.length - 1; e >= 0; e--) {
			var ev = timingEvents[e];
			if (ev.type === 'bar') {
				ev.top = lastEventTop;
				ev.nextTop = lastBarTop;
				lastBarTop = lastEventTop;

				ev.bottom = lastEventBottom;
				ev.nextBottom = lastBarBottom;
				lastBarBottom = lastEventBottom;
			} else if (ev.type === 'event') {
				lastEventTop = ev.top;
				lastEventBottom = ev.top + ev.height;
			}
		}
	}

	function makeSortedArray(hash) {
		var arr = [];
		for (var k in hash) {
			if (hash.hasOwnProperty(k)) arr.push(hash[k]);
		}
		arr = arr.sort(function (a, b) {
			var diff = a.milliseconds - b.milliseconds;
			// if the events have the same time, make sure a bar comes before a note
			if (diff !== 0) {
				return diff;
			} else {
				return a.type === "bar" ? -1 : 1;
			}
		});
		return arr;
	}

	this.addElementToEvents = function (eventHash, element, voiceTimeMilliseconds, top, height, timeDivider, isTiedState, nextIsBar) {
		if (element.hint) return { isTiedState: undefined, duration: 0 };
		var realDuration = element.durationClass ? element.durationClass : element.duration;
		if (element.abcelem.rest && element.abcelem.rest.type === "spacer") realDuration = 0;
		if (realDuration > 0) {
			var es = [];
			// If there is an invisible rest, then there are not elements, so don't push a null one.
			for (var i = 0; i < element.elemset.length; i++) {
				if (element.elemset[i] !== null) es.push(element.elemset[i]);
			}
			var isTiedToNext = element.startTie;
			if (isTiedState !== undefined) {
				eventHash["event" + isTiedState].elements.push(es); // Add the tied note to the first note that it is tied to
				if (!isTiedToNext) isTiedState = undefined;
			} else {
				// the last note wasn't tied.
				if (!eventHash["event" + voiceTimeMilliseconds]) eventHash["event" + voiceTimeMilliseconds] = {
					type: "event",
					milliseconds: voiceTimeMilliseconds,
					top: top,
					height: height,
					left: element.x,
					width: element.w,
					elements: [es],
					startChar: element.abcelem.startChar,
					endChar: element.abcelem.endChar
				};else {
					// If there is more than one voice then two notes can fall at the same time. Usually they would be lined up in the same place, but if it is a whole rest, then it is placed funny. In any case, the left most element wins.
					eventHash["event" + voiceTimeMilliseconds].left = Math.min(eventHash["event" + voiceTimeMilliseconds].left, element.x);
					eventHash["event" + voiceTimeMilliseconds].elements.push(es);
				}
				if (nextIsBar) {
					eventHash["event" + voiceTimeMilliseconds].measureStart = true;
					nextIsBar = false;
				}
				if (isTiedToNext) isTiedState = voiceTimeMilliseconds;
			}
		}
		return { isTiedState: isTiedState, duration: realDuration / timeDivider, nextIsBar: nextIsBar || element.type === 'bar' };
	};

	this.makeVoicesArray = function () {
		// First make a new array that is arranged by voice so that the repeats that span different lines are handled correctly.
		var voicesArr = [];
		for (var line = 0; line < this.engraver.staffgroups.length; line++) {
			var group = this.engraver.staffgroups[line];
			var firstStaff = group.staffs[0];
			var middleC = firstStaff.absoluteY;
			var top = middleC - firstStaff.top * spacing.STEP;
			var lastStaff = group.staffs[group.staffs.length - 1];
			middleC = lastStaff.absoluteY;
			var bottom = middleC - lastStaff.bottom * spacing.STEP;
			var height = bottom - top;

			var voices = group.voices;
			for (var v = 0; v < voices.length; v++) {
				if (!voicesArr[v]) voicesArr[v] = [];
				var elements = voices[v].children;
				for (var elem = 0; elem < elements.length; elem++) {
					voicesArr[v].push({ top: top, height: height, elem: elements[elem] });
				}
			}
		}
		return voicesArr;
	};

	this.setupEvents = function (startingDelay, timeDivider) {
		var timingEvents = [];

		var eventHash = {};
		// The time is the number of seconds from the beginning of the piece.
		// The units we are scanning are in notation units (i.e. 0.25 is a quarter note)
		var time = startingDelay;
		var isTiedState;
		var nextIsBar = true;
		var voices = this.makeVoicesArray();
		for (var v = 0; v < voices.length; v++) {
			var voiceTime = time;
			var voiceTimeMilliseconds = Math.round(voiceTime * 1000);
			var startingRepeatElem = 0;
			var endingRepeatElem = -1;
			var elements = voices[v];
			for (var elem = 0; elem < elements.length; elem++) {
				var element = elements[elem].elem;
				if (element.abcelem.el_type === "tempo") {
					var bpm = this.getBpm(element.abcelem);
					var beatLength = this.getBeatLength();
					var beatsPerSecond = bpm / 60;
					timeDivider = beatLength * beatsPerSecond;
				}
				var ret = this.addElementToEvents(eventHash, element, voiceTimeMilliseconds, elements[elem].top, elements[elem].height, timeDivider, isTiedState, nextIsBar);
				isTiedState = ret.isTiedState;
				nextIsBar = ret.nextIsBar;
				voiceTime += ret.duration;
				voiceTimeMilliseconds = Math.round(voiceTime * 1000);
				if (element.type === 'bar') {
					var barType = element.abcelem.type;
					var endRepeat = barType === "bar_right_repeat" || barType === "bar_dbl_repeat";
					var startEnding = element.abcelem.startEnding === '1';
					var startRepeat = barType === "bar_left_repeat" || barType === "bar_dbl_repeat" || barType === "bar_right_repeat";
					if (endRepeat) {
						if (endingRepeatElem === -1) endingRepeatElem = elem;
						for (var el2 = startingRepeatElem; el2 < endingRepeatElem; el2++) {
							element = elements[el2].elem;
							ret = this.addElementToEvents(eventHash, element, voiceTimeMilliseconds, elements[elem].top, elements[elem].height, timeDivider, isTiedState, nextIsBar);
							isTiedState = ret.isTiedState;
							nextIsBar = ret.nextIsBar;
							voiceTime += ret.duration;
							voiceTimeMilliseconds = Math.round(voiceTime * 1000);
						}
						endingRepeatElem = -1;
					}
					if (startEnding) endingRepeatElem = elem;
					if (startRepeat) startingRepeatElem = elem;
				}
			}
		}
		// now we have all the events, but if there are multiple voices then there may be events out of order or duplicated, so normalize it.
		timingEvents = makeSortedArray(eventHash);
		addVerticalInfo(timingEvents);
		return timingEvents;
	};

	function getVertical(group) {
		var voices = group.voices;
		var firstStaff = group.staffs[0];
		var middleC = firstStaff.absoluteY;
		var top = middleC - firstStaff.top * spacing.STEP;
		var lastStaff = group.staffs[group.staffs.length - 1];
		middleC = lastStaff.absoluteY;
		var bottom = middleC - lastStaff.bottom * spacing.STEP;
		var height = bottom - top;
		return { top: top, height: height };
	}

	this.getBpm = function (tempo) {
		var bpm;
		if (tempo) {
			bpm = tempo.bpm;
			var beatLength = this.getBeatLength();
			var statedBeatLength = tempo.duration && tempo.duration.length > 0 ? tempo.duration[0] : beatLength;
			bpm = bpm * statedBeatLength / beatLength;
		}
		if (!bpm) bpm = 180;

		return bpm;
	};

	this.setTiming = function (bpm, measuresOfDelay) {
		var tempo = this.metaText ? this.metaText.tempo : null;
		if (!bpm) bpm = this.getBpm(tempo);

		var beatLength = this.getBeatLength();
		var beatsPerSecond = bpm / 60;

		var measureLength = this.getBarLength();

		var startingDelay = measureLength / beatLength * measuresOfDelay / beatsPerSecond;
		if (startingDelay) startingDelay -= this.getPickupLength() / beatLength / beatsPerSecond;
		var timeDivider = beatLength * beatsPerSecond;

		this.noteTimings = this.setupEvents(startingDelay, timeDivider);
	};
};

module.exports = Tune;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tunebook = __webpack_require__(5);

var EngraverController = __webpack_require__(12);

var resizeDivs = {};
function resizeOuter() {
    var width = window.innerWidth;
    for (var id in resizeDivs) {
        if (resizeDivs.hasOwnProperty(id)) {
            var outer = resizeDivs[id];
            var ofs = outer.offsetLeft;
            width -= ofs * 2;
            outer.style.width = width + "px";
        }
    }
}

window.addEventListener("resize", resizeOuter);
window.addEventListener("orientationChange", resizeOuter);

function renderOne(div, tune, params, tuneNumber) {
    var width = params.width ? params.width : 800;
    if (params.viewportHorizontal) {
        // Create an inner div that holds the music, so that the passed in div will be the viewport.
        div.innerHTML = '<div class="abcjs-inner"></div>';
        if (params.scrollHorizontal) {
            div.style.overflowX = "auto";
            div.style.overflowY = "hidden";
        } else div.style.overflow = "hidden";
        resizeDivs[div.id] = div; // We use a hash on the element's id so that multiple calls won't keep adding to the list.
        div = div.children[0]; // The music should be rendered in the inner div.
    } else if (params.viewportVertical) {
        // Create an inner div that holds the music, so that the passed in div will be the viewport.
        div.innerHTML = '<div class="abcjs-inner scroll-amount"></div>';
        div.style.overflowX = "hidden";
        div.style.overflowY = "auto";
        div = div.children[0]; // The music should be rendered in the inner div.
    } else div.innerHTML = "";
    var engraver_controller = new EngraverController(div, params);
    engraver_controller.engraveABC(tune, tuneNumber);
    tune.engraver = engraver_controller;
    if (params.viewportVertical || params.viewportHorizontal) {
        // If we added a wrapper around the div, then we need to size the wrapper, too.
        var parent = div.parentNode;
        parent.style.width = div.style.width;
    }
}

function renderEachLineSeparately(div, tune, params, tuneNumber) {
    function initializeTuneLine(tune) {
        return {
            formatting: tune.formatting,
            media: tune.media,
            version: tune.version,
            metaText: {},
            lines: []
        };
    }

    // Before rendering, chop up the returned tune into an array where each element is a line.
    // The first element of the array gets the title and other items that go on top, the last element
    // of the array gets the extra text that goes on bottom. Each element gets any non-music info that comes before it.
    var tunes = [];
    var tuneLine;
    for (var i = 0; i < tune.lines.length; i++) {
        var line = tune.lines[i];
        if (!tuneLine) tuneLine = initializeTuneLine(tune);

        if (i === 0) {
            // These items go on top of the music
            tuneLine.metaText.tempo = tune.metaText.tempo;
            tuneLine.metaText.title = tune.metaText.title;
            tuneLine.metaText.header = tune.metaText.header;
            tuneLine.metaText.rhythm = tune.metaText.rhythm;
            tuneLine.metaText.origin = tune.metaText.origin;
            tuneLine.metaText.composer = tune.metaText.composer;
            tuneLine.metaText.author = tune.metaText.author;
            tuneLine.metaText.partOrder = tune.metaText.partOrder;
        }

        // push the lines until we get to a music line
        tuneLine.lines.push(line);
        if (line.staff) {
            tunes.push(tuneLine);
            tuneLine = undefined;
        }
    }
    // Add any extra stuff to the last line.
    if (tuneLine) {
        var lastLine = tunes[tunes.length - 1];
        for (var j = 0; j < tuneLine.lines.length; j++) {
            lastLine.lines.push(tuneLine.lines[j]);
        }
    }

    // These items go below the music
    tuneLine = tunes[tunes.length - 1];
    tuneLine.metaText.unalignedWords = tune.metaText.unalignedWords;
    tuneLine.metaText.book = tune.metaText.book;
    tuneLine.metaText.source = tune.metaText.source;
    tuneLine.metaText.discography = tune.metaText.discography;
    tuneLine.metaText.notes = tune.metaText.notes;
    tuneLine.metaText.transcription = tune.metaText.transcription;
    tuneLine.metaText.history = tune.metaText.history;
    tuneLine.metaText['abc-copyright'] = tune.metaText['abc-copyright'];
    tuneLine.metaText['abc-creator'] = tune.metaText['abc-creator'];
    tuneLine.metaText['abc-edited-by'] = tune.metaText['abc-edited-by'];
    tuneLine.metaText.footer = tune.metaText.footer;

    // Now create sub-divs and render each line. Need to copy the params to change the padding for the interior slices.
    var ep = {};
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            ep[key] = params[key];
        }
    }
    var origPaddingTop = ep.paddingtop;
    var origPaddingBottom = ep.paddingbottom;
    div.innerHTML = "";
    for (var k = 0; k < tunes.length; k++) {
        var lineEl = document.createElement("div");
        div.appendChild(lineEl);

        if (k === 0) {
            ep.paddingtop = origPaddingTop;
            ep.paddingbottom = -20;
        } else if (k === tunes.length - 1) {
            ep.paddingtop = 10;
            ep.paddingbottom = origPaddingBottom;
        } else {
            ep.paddingtop = 10;
            ep.paddingbottom = -20;
        }
        renderOne(lineEl, tunes[k], ep, tuneNumber);
    }
}

// A quick way to render a tune from javascript when interactivity is not required.
// This is used when a javascript routine has some abc text that it wants to render
// in a div or collection of divs. One tune or many can be rendered.
//
// parameters:
//      output: an array of divs that the individual tunes are rendered to.
//          If the number of tunes exceeds the number of divs in the array, then
//          only the first tunes are rendered. If the number of divs exceeds the number
//          of tunes, then the unused divs are cleared. The divs can be passed as either
//          elements or strings of ids. If ids are passed, then the div MUST exist already.
//          (if a single element is passed, then it is an implied array of length one.)
//          (if a null is passed for an element, or the element doesn't exist, then that tune is skipped.)
//      abc: text representing a tune or an entire tune book in ABC notation.
//      renderParams: hash of:
//          startingTune: an index, starting at zero, representing which tune to start rendering at.
//              (If this element is not present, then rendering starts at zero.)
//          width: 800 by default. The width in pixels of the output paper
var renderAbc = function renderAbc(output, abc, parserParams, engraverParams, renderParams) {
    // Note: all parameters have been condensed into the first ones. It doesn't hurt anything to allow the old format, so just copy them here.
    var params = {};
    var key;
    if (parserParams) {
        for (key in parserParams) {
            if (parserParams.hasOwnProperty(key)) {
                params[key] = parserParams[key];
            }
        }
    }
    if (engraverParams) {
        for (key in engraverParams) {
            if (engraverParams.hasOwnProperty(key)) {
                // There is a conflict with the name of the parameter "listener". If it is in the second parameter, then it is for click.
                if (key === "listener") {
                    if (engraverParams[key].highlight) params.clickListener = engraverParams[key].highlight;
                } else params[key] = engraverParams[key];
            }
        }
    }
    if (renderParams) {
        for (key in renderParams) {
            if (renderParams.hasOwnProperty(key)) {
                params[key] = renderParams[key];
            }
        }
    }

    function callback(div, tune, tuneNumber) {
        if (!params.oneSvgPerLine || tune.lines.length < 2) renderOne(div, tune, params, tuneNumber);else renderEachLineSeparately(div, tune, params, tuneNumber);
    }

    return tunebook.renderEngine(callback, output, abc, params);
};

module.exports = renderAbc;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// abc_abstract_engraver.js: Creates a data structure suitable for printing a line of abc
// Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global window */

var AbsoluteElement = __webpack_require__(4);
var BeamElem = __webpack_require__(24);
var BraceElem = __webpack_require__(25);
var createClef = __webpack_require__(26);
var createKeySignature = __webpack_require__(27);
var createTimeSignature = __webpack_require__(28);
var Decoration = __webpack_require__(29);
var EndingElem = __webpack_require__(32);
var glyphs = __webpack_require__(3);
var RelativeElement = __webpack_require__(2);
var spacing = __webpack_require__(1);
var StaffGroupElement = __webpack_require__(33);
var TempoElement = __webpack_require__(34);
var TieElem = __webpack_require__(13);
var TripletElem = __webpack_require__(35);
var VoiceElement = __webpack_require__(36);

var parseCommon = __webpack_require__(0);

var AbstractEngraver;

(function () {
  "use strict";

  var getDuration = function getDuration(elem) {
    var d = 0;
    if (elem.duration) {
      d = elem.duration;
    }
    return d;
  };

  var hint = false;

  AbstractEngraver = function AbstractEngraver(bagpipes, renderer, tuneNumber) {
    this.decoration = new Decoration();
    this.renderer = renderer;
    this.tuneNumber = tuneNumber;
    this.isBagpipes = bagpipes;
    this.chartable = { rest: { 0: "rests.whole", 1: "rests.half", 2: "rests.quarter", 3: "rests.8th", 4: "rests.16th", 5: "rests.32nd", 6: "rests.64th", 7: "rests.128th", "multi": "rests.multimeasure" },
      note: { "-1": "noteheads.dbl", 0: "noteheads.whole", 1: "noteheads.half", 2: "noteheads.quarter", 3: "noteheads.quarter", 4: "noteheads.quarter", 5: "noteheads.quarter", 6: "noteheads.quarter", 7: "noteheads.quarter", 'nostem': "noteheads.quarter" },
      rhythm: { "-1": "noteheads.slash.whole", 0: "noteheads.slash.whole", 1: "noteheads.slash.whole", 2: "noteheads.slash.quarter", 3: "noteheads.slash.quarter", 4: "noteheads.slash.quarter", 5: "noteheads.slash.quarter", 6: "noteheads.slash.quarter", 7: "noteheads.slash.quarter", nostem: "noteheads.slash.nostem" },
      x: { "-1": "noteheads.indeterminate", 0: "noteheads.indeterminate", 1: "noteheads.indeterminate", 2: "noteheads.indeterminate", 3: "noteheads.indeterminate", 4: "noteheads.indeterminate", 5: "noteheads.indeterminate", 6: "noteheads.indeterminate", 7: "noteheads.indeterminate", nostem: "noteheads.indeterminate" },
      harmonic: { "-1": "noteheads.harmonic.quarter", 0: "noteheads.harmonic.quarter", 1: "noteheads.harmonic.quarter", 2: "noteheads.harmonic.quarter", 3: "noteheads.harmonic.quarter", 4: "noteheads.harmonic.quarter", 5: "noteheads.harmonic.quarter", 6: "noteheads.harmonic.quarter", 7: "noteheads.harmonic.quarter", nostem: "noteheads.harmonic.quarter" },
      uflags: { 3: "flags.u8th", 4: "flags.u16th", 5: "flags.u32nd", 6: "flags.u64th" },
      dflags: { 3: "flags.d8th", 4: "flags.d16th", 5: "flags.d32nd", 6: "flags.d64th" } };
    this.reset();
  };

  AbstractEngraver.prototype.reset = function () {
    this.slurs = {};
    this.ties = [];
    this.slursbyvoice = {};
    this.tiesbyvoice = {};
    this.endingsbyvoice = {};
    this.s = 0; // current staff number
    this.v = 0; // current voice number on current staff
    this.tripletmultiplier = 1;

    this.abcline = undefined;
    this.accidentalSlot = undefined;
    this.accidentalshiftx = undefined;
    this.dotshiftx = undefined;
    this.hasVocals = false;
    this.minY = undefined;
    this.partstartelem = undefined;
    this.pos = undefined;
    this.roomtaken = undefined;
    this.roomtakenright = undefined;
    this.staffgroup = undefined;
    this.startlimitelem = undefined;
    this.stemdir = undefined;
    this.voice = undefined;
  };

  AbstractEngraver.prototype.setStemHeight = function (heightInPixels) {
    this.stemHeight = heightInPixels / spacing.STEP;
  };

  AbstractEngraver.prototype.getCurrentVoiceId = function () {
    return "s" + this.s + "v" + this.v;
  };

  AbstractEngraver.prototype.pushCrossLineElems = function () {
    this.slursbyvoice[this.getCurrentVoiceId()] = this.slurs;
    this.tiesbyvoice[this.getCurrentVoiceId()] = this.ties;
    this.endingsbyvoice[this.getCurrentVoiceId()] = this.partstartelem;
  };

  AbstractEngraver.prototype.popCrossLineElems = function () {
    this.slurs = this.slursbyvoice[this.getCurrentVoiceId()] || {};
    this.ties = this.tiesbyvoice[this.getCurrentVoiceId()] || [];
    this.partstartelem = this.endingsbyvoice[this.getCurrentVoiceId()];
  };

  AbstractEngraver.prototype.getElem = function () {
    if (this.abcline.length <= this.pos) return null;
    return this.abcline[this.pos];
  };

  AbstractEngraver.prototype.getNextElem = function () {
    if (this.abcline.length <= this.pos + 1) return null;
    return this.abcline[this.pos + 1];
  };

  AbstractEngraver.prototype.containsLyrics = function (staves) {
    for (var i = 0; i < staves.length; i++) {
      for (var j = 0; j < staves[i].voices.length; j++) {
        for (var k = 0; k < staves[i].voices[j].length; k++) {
          var el = staves[i].voices[j][k];
          if (el.lyric) {
            // We just want to see if there are vocals below the music to know where to put the dynamics.
            if (!el.positioning || el.positioning.vocalPosition === 'below') this.hasVocals = true;
            return;
          }
        }
      }
    }
  };

  AbstractEngraver.prototype.createABCLine = function (staffs, tempo) {
    this.minY = 2; // PER: This is the lowest that any note reaches. It will be used to set the dynamics row.
    // See if there are any lyrics on this line.
    this.containsLyrics(staffs);
    this.staffgroup = new StaffGroupElement();
    this.tempoSet = false;
    for (this.s = 0; this.s < staffs.length; this.s++) {
      if (hint) this.restoreState();
      hint = false;
      this.createABCStaff(staffs[this.s], tempo);
    }
    return this.staffgroup;
  };

  AbstractEngraver.prototype.createABCStaff = function (abcstaff, tempo) {
    // If the tempo is passed in, then the first element should get the tempo attached to it.
    for (this.v = 0; this.v < abcstaff.voices.length; this.v++) {
      this.voice = new VoiceElement(this.v, abcstaff.voices.length);
      if (this.v === 0) {
        this.voice.barfrom = abcstaff.connectBarLines === "start" || abcstaff.connectBarLines === "continue";
        this.voice.barto = abcstaff.connectBarLines === "continue" || abcstaff.connectBarLines === "end";
      } else {
        this.voice.duplicate = true; // bar lines and other duplicate info need not be created
      }
      if (abcstaff.title && abcstaff.title[this.v]) this.voice.header = abcstaff.title[this.v];
      var clef = createClef(abcstaff.clef, this.tuneNumber);
      if (clef) {
        if (this.v === 0 && abcstaff.barNumber) {
          this.addMeasureNumber(abcstaff.barNumber, clef);
        }
        this.voice.addChild(clef);
      }
      var keySig = createKeySignature(abcstaff.key, this.tuneNumber);
      if (keySig) {
        this.voice.addChild(keySig);
        this.startlimitelem = keySig; // limit ties here
      }
      if (abcstaff.meter) {
        var ts = createTimeSignature(abcstaff.meter, this.tuneNumber);
        this.voice.addChild(ts);
        this.startlimitelem = ts; // limit ties here
      }
      if (this.voice.duplicate) this.voice.children = []; // we shouldn't reprint the above if we're reusing the same staff. We just created them to get the right spacing.
      var staffLines = abcstaff.clef.stafflines || abcstaff.clef.stafflines === 0 ? abcstaff.clef.stafflines : 5;
      this.staffgroup.addVoice(this.voice, this.s, staffLines);
      this.createABCVoice(abcstaff.voices[this.v], tempo);
      this.staffgroup.setStaffLimits(this.voice);
      //Tony: Here I am following what staves need to be surrounded by the brace, by incrementing the length of the brace class.
      //So basically this keeps incrementing the number of staff surrounded by the brace until it sees "end".
      //This then gets processed in abc_staff_group_element.js, so that it will have the correct top and bottom coordinates for the brace.
      if (abcstaff.brace === "start") {
        this.staffgroup.brace = new BraceElem(1, true);
      } else if (abcstaff.brace === "end" && this.staffgroup.brace) {
        this.staffgroup.brace.increaseStavesIncluded();
      } else if (abcstaff.brace === "continue" && this.staffgroup.brace) {
        this.staffgroup.brace.increaseStavesIncluded();
      }
    }
  };

  AbstractEngraver.prototype.createABCVoice = function (abcline, tempo) {
    this.popCrossLineElems();
    this.stemdir = this.isBagpipes ? "down" : null;
    this.abcline = abcline;
    if (this.partstartelem) {
      this.partstartelem = new EndingElem("", null, null);
      this.voice.addOther(this.partstartelem);
    }
    for (var slur in this.slurs) {
      if (this.slurs.hasOwnProperty(slur)) {
        this.slurs[slur] = new TieElem(null, null, this.slurs[slur].above, this.slurs[slur].force, false);
        if (hint) this.slurs[slur].setHint();
        this.voice.addOther(this.slurs[slur]);
      }
    }
    for (var i = 0; i < this.ties.length; i++) {
      this.ties[i] = new TieElem(null, null, this.ties[i].above, this.ties[i].force, true);
      if (hint) this.ties[i].setHint();
      this.voice.addOther(this.ties[i]);
    }

    for (this.pos = 0; this.pos < this.abcline.length; this.pos++) {
      var abselems = this.createABCElement();
      if (abselems) {
        for (i = 0; i < abselems.length; i++) {
          if (!this.tempoSet && tempo && !tempo.suppress) {
            this.tempoSet = true;
            abselems[i].addChild(new TempoElement(tempo, this.tuneNumber));
          }
          this.voice.addChild(abselems[i]);
        }
      }
    }
    this.pushCrossLineElems();
  };

  AbstractEngraver.prototype.saveState = function () {
    this.tiesSave = parseCommon.cloneArray(this.ties);
    this.slursSave = parseCommon.cloneHashOfHash(this.slurs);
    this.slursbyvoiceSave = parseCommon.cloneHashOfHash(this.slursbyvoice);
    this.tiesbyvoiceSave = parseCommon.cloneHashOfArrayOfHash(this.tiesbyvoice);
  };

  AbstractEngraver.prototype.restoreState = function () {
    this.ties = parseCommon.cloneArray(this.tiesSave);
    this.slurs = parseCommon.cloneHashOfHash(this.slursSave);
    this.slursbyvoice = parseCommon.cloneHashOfHash(this.slursbyvoiceSave);
    this.tiesbyvoice = parseCommon.cloneHashOfArrayOfHash(this.tiesbyvoiceSave);
  };

  // return an array of AbsoluteElement
  AbstractEngraver.prototype.createABCElement = function () {
    var elemset = [];
    var elem = this.getElem();
    switch (elem.el_type) {
      case "note":
        elemset = this.createBeam();
        break;
      case "bar":
        elemset[0] = this.createBarLine(elem);
        if (this.voice.duplicate && elemset.length > 0) elemset[0].invisible = true;
        break;
      case "meter":
        elemset[0] = createTimeSignature(elem, this.tuneNumber);
        this.startlimitelem = elemset[0]; // limit ties here
        if (this.voice.duplicate && elemset.length > 0) elemset[0].invisible = true;
        break;
      case "clef":
        elemset[0] = createClef(elem, this.tuneNumber);
        if (!elemset[0]) return null;
        if (this.voice.duplicate && elemset.length > 0) elemset[0].invisible = true;
        break;
      case "key":
        var absKey = createKeySignature(elem, this.tuneNumber);
        if (absKey) {
          elemset[0] = absKey;
          this.startlimitelem = elemset[0]; // limit ties here
        }
        if (this.voice.duplicate && elemset.length > 0) elemset[0].invisible = true;
        break;
      case "stem":
        this.stemdir = elem.direction;
        break;
      case "part":
        var abselem = new AbsoluteElement(elem, 0, 0, 'part', this.tuneNumber);
        var dim = this.renderer.getTextSize(elem.title, 'partsfont', "part");
        abselem.addChild(new RelativeElement(elem.title, 0, 0, undefined, { type: "part", height: dim.height / spacing.STEP }));
        elemset[0] = abselem;
        break;
      case "tempo":
        var abselem3 = new AbsoluteElement(elem, 0, 0, 'tempo', this.tuneNumber);
        abselem3.addChild(new TempoElement(elem, this.tuneNumber));
        elemset[0] = abselem3;
        break;
      case "style":
        if (elem.head === "normal") delete this.style;else this.style = elem.head;
        break;
      case "hint":
        hint = true;
        this.saveState();
        break;
      case "midi":
        // This has no effect on the visible music, so just skip it.
        break;

      default:
        var abselem2 = new AbsoluteElement(elem, 0, 0, 'unsupported', this.tuneNumber);
        abselem2.addChild(new RelativeElement("element type " + elem.el_type, 0, 0, undefined, { type: "debug" }));
        elemset[0] = abselem2;
    }

    return elemset;
  };

  AbstractEngraver.prototype.calcBeamDir = function () {
    if (this.stemdir) // If the user or voice is forcing the stem direction, we already know the answer.
      return this.stemdir;
    var beamelem = new BeamElem(this.stemHeight, this.stemdir);
    // PER: need two passes: the first one decides if the stems are up or down.
    var oldPos = this.pos;
    var abselem;
    while (this.getElem()) {
      abselem = this.createNote(this.getElem(), true, true);
      beamelem.add(abselem);
      if (this.getElem().endBeam) break;
      this.pos++;
    }
    var dir = beamelem.calcDir();
    this.pos = oldPos;
    return dir ? "up" : "down";
  };

  AbstractEngraver.prototype.createBeam = function () {
    var abselemset = [];

    if (this.getElem().startBeam && !this.getElem().endBeam) {
      var dir = this.calcBeamDir();
      var beamelem = new BeamElem(this.stemHeight, dir);
      if (hint) beamelem.setHint();
      var oldDir = this.stemdir;
      this.stemdir = dir;
      while (this.getElem()) {
        var abselem = this.createNote(this.getElem(), true);
        abselemset.push(abselem);
        beamelem.add(abselem);
        if (this.triplet && this.triplet.isClosed()) {
          this.voice.addOther(this.triplet);
          this.triplet = null;
          this.tripletmultiplier = 1;
        }
        if (this.getElem().endBeam) {
          break;
        }
        this.pos++;
      }
      this.stemdir = oldDir;
      this.voice.addBeam(beamelem);
    } else {
      abselemset[0] = this.createNote(this.getElem());
      if (this.triplet && this.triplet.isClosed()) {
        this.voice.addOther(this.triplet);
        this.triplet = null;
        this.tripletmultiplier = 1;
      }
    }
    return abselemset;
  };

  var sortPitch = function sortPitch(elem) {
    var sorted;
    do {
      sorted = true;
      for (var p = 0; p < elem.pitches.length - 1; p++) {
        if (elem.pitches[p].pitch > elem.pitches[p + 1].pitch) {
          sorted = false;
          var tmp = elem.pitches[p];
          elem.pitches[p] = elem.pitches[p + 1];
          elem.pitches[p + 1] = tmp;
        }
      }
    } while (!sorted);
  };

  var ledgerLines = function ledgerLines(abselem, minPitch, maxPitch, isRest, c, additionalLedgers, dir, dx, scale) {
    for (var i = maxPitch; i > 11; i--) {
      if (i % 2 === 0 && !isRest) {
        abselem.addChild(new RelativeElement(null, dx, (glyphs.getSymbolWidth(c) + 4) * scale, i, { type: "ledger" }));
      }
    }

    for (i = minPitch; i < 1; i++) {
      if (i % 2 === 0 && !isRest) {
        abselem.addChild(new RelativeElement(null, dx, (glyphs.getSymbolWidth(c) + 4) * scale, i, { type: "ledger" }));
      }
    }

    for (i = 0; i < additionalLedgers.length; i++) {
      // PER: draw additional ledgers
      var ofs = glyphs.getSymbolWidth(c);
      if (dir === 'down') ofs = -ofs;
      abselem.addChild(new RelativeElement(null, ofs + dx, (glyphs.getSymbolWidth(c) + 4) * scale, additionalLedgers[i], { type: "ledger" }));
    }
  };

  AbstractEngraver.prototype.createNote = function (elem, nostem, dontDraw) {
    //stem presence: true for drawing stemless notehead
    var notehead = null;
    var grace = null;
    this.roomtaken = 0; // room needed to the left of the note
    this.roomtakenright = 0; // room needed to the right of the note
    var dotshiftx = 0; // room taken by chords with displaced noteheads which cause dots to shift
    var c = "";
    var flag = null;
    var additionalLedgers = []; // PER: handle the case of [bc'], where the b doesn't have a ledger line

    var p, i, pp;
    var width, p1, p2, dx;

    var duration = getDuration(elem);
    var zeroDuration = false;
    if (duration === 0) {
      zeroDuration = true;duration = 0.25;nostem = true;
    } //PER: zero duration will draw a quarter note head.
    var durlog = Math.floor(Math.log(duration) / Math.log(2)); //TODO use getDurlog
    var dot = 0;

    for (var tot = Math.pow(2, durlog), inc = tot / 2; tot < duration; dot++, tot += inc, inc /= 2) {}

    if (elem.startTriplet && !dontDraw) {
      this.tripletmultiplier = elem.tripletMultiplier;
    }

    var durationForSpacing = duration * this.tripletmultiplier;
    if (elem.rest && elem.rest.type === 'multimeasure') durationForSpacing = 1;
    var absType = elem.rest ? "rest" : "note";
    var abselem = new AbsoluteElement(elem, durationForSpacing, 1, absType, this.tuneNumber, { durationClassOveride: elem.duration * this.tripletmultiplier });
    if (hint) abselem.setHint();

    if (elem.rest) {
      var restpitch = 7;
      if (this.voice.voicetotal > 1) {
        if (this.stemdir === "down") restpitch = 3;
        if (this.stemdir === "up") restpitch = 11;
      }
      // There is special placement for the percussion staff. If there is one staff line, then move the rest position.
      var numLines = this.staffgroup.staffs[this.staffgroup.staffs.length - 1].lines;
      if (numLines === 1) {
        // The half and whole rests are attached to different lines normally, so we need to tweak their position to get them to both be attached to the same one.
        if (duration < 0.5) restpitch = 7;else if (duration < 1) restpitch = 6.8; // half rest
        else restpitch = 4.8; // whole rest
      }
      switch (elem.rest.type) {
        case "whole":
          c = this.chartable.rest[0];
          elem.averagepitch = restpitch;
          elem.minpitch = restpitch;
          elem.maxpitch = restpitch;
          dot = 0;
          break;
        case "rest":
          if (elem.style === "rhythm") // special case for rhythm: rests are a handy way to express the rhythm.
            c = this.chartable.rhythm[-durlog];else c = this.chartable.rest[-durlog];
          elem.averagepitch = restpitch;
          elem.minpitch = restpitch;
          elem.maxpitch = restpitch;
          break;
        case "invisible":
        case "spacer":
          c = "";
          elem.averagepitch = restpitch;
          elem.minpitch = restpitch;
          elem.maxpitch = restpitch;
          break;
        case "multimeasure":
          c = this.chartable.rest['multi'];
          elem.averagepitch = restpitch;
          elem.minpitch = restpitch;
          elem.maxpitch = restpitch;
          dot = 0;
          var mmWidth = glyphs.getSymbolWidth(c);
          abselem.addHead(new RelativeElement(c, -mmWidth, mmWidth * 2, 7));
          var numMeasures = new RelativeElement("" + elem.duration, 0, mmWidth, 16, { type: "multimeasure-text" });
          abselem.addExtra(numMeasures);
      }
      if (!dontDraw && elem.rest.type !== "multimeasure") notehead = this.createNoteHead(abselem, c, { verticalPos: restpitch }, null, 0, -this.roomtaken, null, dot, 0, 1);
      if (notehead) abselem.addHead(notehead);
      this.roomtaken += this.accidentalshiftx;
      this.roomtakenright = Math.max(this.roomtakenright, this.dotshiftx);
    } else {
      sortPitch(elem);

      // determine averagepitch, minpitch, maxpitch and stem direction
      var sum = 0;
      for (p = 0, pp = elem.pitches.length; p < pp; p++) {
        sum += elem.pitches[p].verticalPos;
      }
      elem.averagepitch = sum / elem.pitches.length;
      elem.minpitch = elem.pitches[0].verticalPos;
      this.minY = Math.min(elem.minpitch, this.minY);
      elem.maxpitch = elem.pitches[elem.pitches.length - 1].verticalPos;
      var dir = elem.averagepitch >= 6 ? "down" : "up";
      if (this.stemdir) dir = this.stemdir;

      var style = elem.style ? elem.style : this.style; // get the style of note head.
      if (!style || style === "normal") style = "note";
      var noteSymbol;
      if (zeroDuration) noteSymbol = this.chartable[style].nostem;else noteSymbol = this.chartable[style][-durlog];
      if (!noteSymbol) console.log("noteSymbol:", style, durlog, zeroDuration);

      // determine elements of chords which should be shifted
      for (p = dir === "down" ? elem.pitches.length - 2 : 1; dir === "down" ? p >= 0 : p < elem.pitches.length; p = dir === "down" ? p - 1 : p + 1) {
        var prev = elem.pitches[dir === "down" ? p + 1 : p - 1];
        var curr = elem.pitches[p];
        var delta = dir === "down" ? prev.pitch - curr.pitch : curr.pitch - prev.pitch;
        if (delta <= 1 && !prev.printer_shift) {
          curr.printer_shift = delta ? "different" : "same";
          if (curr.verticalPos > 11 || curr.verticalPos < 1) {
            // PER: add extra ledger line
            additionalLedgers.push(curr.verticalPos - curr.verticalPos % 2);
          }
          if (dir === "down") {
            this.roomtaken = glyphs.getSymbolWidth(noteSymbol) + 2;
          } else {
            dotshiftx = glyphs.getSymbolWidth(noteSymbol) + 2;
          }
        }
      }

      // The accidentalSlot will hold a list of all the accidentals on this chord. Each element is a vertical place,
      // and contains a pitch, which is the last pitch that contains an accidental in that slot. The slots are numbered
      // from closest to the note to farther left. We only need to know the last accidental we placed because
      // we know that the pitches are sorted by now.
      this.accidentalSlot = [];

      for (p = 0; p < elem.pitches.length; p++) {

        if (!nostem) {
          if (dir === "down" && p !== 0 || dir === "up" && p !== pp - 1) {
            // not the stemmed elem of the chord
            flag = null;
          } else {
            flag = this.chartable[dir === "down" ? "dflags" : "uflags"][-durlog];
          }
        }
        if (elem.pitches[p].style) {
          // There is a style for the whole group of pitches, but there could also be an override for a particular pitch.
          c = this.chartable[elem.pitches[p].style][-durlog];
        } else c = noteSymbol;
        // The highest position for the sake of placing slurs is itself if the slur is internal. It is the highest position possible if the slur is for the whole chord.
        // If the note is the only one in the chord, then any slur it has counts as if it were on the whole chord.
        elem.pitches[p].highestVert = elem.pitches[p].verticalPos;
        var isTopWhenStemIsDown = (this.stemdir === "up" || dir === "up") && p === 0;
        var isBottomWhenStemIsUp = (this.stemdir === "down" || dir === "down") && p === pp - 1;
        if (!dontDraw && (isTopWhenStemIsDown || isBottomWhenStemIsUp)) {
          // place to put slurs if not already on pitches

          if (elem.startSlur || pp === 1) {
            elem.pitches[p].highestVert = elem.pitches[pp - 1].verticalPos;
            if (this.stemdir === "up" || dir === "up") elem.pitches[p].highestVert += 6; // If the stem is up, then compensate for the length of the stem
          }
          if (elem.startSlur) {
            if (!elem.pitches[p].startSlur) elem.pitches[p].startSlur = []; //TODO possibly redundant, provided array is not optional
            for (i = 0; i < elem.startSlur.length; i++) {
              elem.pitches[p].startSlur.push(elem.startSlur[i]);
            }
          }

          if (!dontDraw && elem.endSlur) {
            elem.pitches[p].highestVert = elem.pitches[pp - 1].verticalPos;
            if (this.stemdir === "up" || dir === "up") elem.pitches[p].highestVert += 6; // If the stem is up, then compensate for the length of the stem
            if (!elem.pitches[p].endSlur) elem.pitches[p].endSlur = []; //TODO possibly redundant, provided array is not optional
            for (i = 0; i < elem.endSlur.length; i++) {
              elem.pitches[p].endSlur.push(elem.endSlur[i]);
            }
          }
        }

        var hasStem = !nostem && durlog <= -1;
        if (!dontDraw) notehead = this.createNoteHead(abselem, c, elem.pitches[p], hasStem ? dir : null, 0, -this.roomtaken, flag, dot, dotshiftx, 1);
        if (notehead) {
          if (elem.gracenotes && elem.gracenotes.length > 0) notehead.bottom = notehead.bottom - 1; // If there is a tie to the grace notes, leave a little more room for the note to avoid collisions.
          abselem.addHead(notehead);
        }
        this.roomtaken += this.accidentalshiftx;
        this.roomtakenright = Math.max(this.roomtakenright, this.dotshiftx);
      }

      // draw stem from the furthest note to a pitch above/below the stemmed note
      if (hasStem) {
        p1 = dir === "down" ? elem.minpitch - 7 : elem.minpitch + 1 / 3;
        // PER added stemdir test to make the line meet the note.
        if (p1 > 6 && !this.stemdir) p1 = 6;
        p2 = dir === "down" ? elem.maxpitch - 1 / 3 : elem.maxpitch + 7;
        // PER added stemdir test to make the line meet the note.
        if (p2 < 6 && !this.stemdir) p2 = 6;
        dx = dir === "down" || abselem.heads.length === 0 ? 0 : abselem.heads[0].w;
        width = dir === "down" ? 1 : -1;
        // TODO-PER-HACK: One type of note head has a different placement of the stem. This should be more generically calculated:
        if (notehead.c === 'noteheads.slash.quarter') {
          if (dir === 'down') p2 -= 1;else p1 += 1;
        }
        abselem.addExtra(new RelativeElement(null, dx, 0, p1, { "type": "stem", "pitch2": p2, linewidth: width }));
        this.minY = Math.min(p1, this.minY);
        this.minY = Math.min(p2, this.minY);
      }
    }

    if (elem.lyric !== undefined) {
      var lyricStr = "";
      parseCommon.each(elem.lyric, function (ly) {
        var div = ly.divider === ' ' ? "" : ly.divider;
        lyricStr += ly.syllable + div + "\n";
      });
      var lyricDim = this.renderer.getTextSize(lyricStr, 'vocalfont', "lyric");
      var position = elem.positioning ? elem.positioning.vocalPosition : 'below';
      abselem.addCentered(new RelativeElement(lyricStr, 0, lyricDim.width, undefined, { type: "lyric", position: position, height: lyricDim.height / spacing.STEP }));
    }

    if (!dontDraw && elem.gracenotes !== undefined) {
      var gracescale = 3 / 5;
      var graceScaleStem = 3.5 / 5; // TODO-PER: empirically found constant.
      var gracebeam = null;
      if (elem.gracenotes.length > 1) {
        gracebeam = new BeamElem(this.stemHeight * graceScaleStem, "grace", this.isBagpipes);
        if (hint) gracebeam.setHint();
        gracebeam.mainNote = abselem; // this gives us a reference back to the note this is attached to so that the stems can be attached somewhere.
      }

      var graceoffsets = [];
      for (i = elem.gracenotes.length - 1; i >= 0; i--) {
        // figure out where to place each gracenote
        this.roomtaken += 10;
        graceoffsets[i] = this.roomtaken;
        if (elem.gracenotes[i].accidental) {
          this.roomtaken += 7;
        }
      }

      for (i = 0; i < elem.gracenotes.length; i++) {
        var gracepitch = elem.gracenotes[i].verticalPos;

        flag = gracebeam ? null : this.chartable.uflags[this.isBagpipes ? 5 : 3];
        grace = this.createNoteHead(abselem, "noteheads.quarter", elem.gracenotes[i], "up", -graceoffsets[i], -graceoffsets[i], flag, 0, 0, gracescale);
        abselem.addExtra(grace);
        // PER: added acciaccatura slash
        if (elem.gracenotes[i].acciaccatura) {
          var pos = elem.gracenotes[i].verticalPos + 7 * gracescale; // the same formula that determines the flag position.
          var dAcciaccatura = gracebeam ? 5 : 6; // just an offset to make it line up correctly.
          abselem.addRight(new RelativeElement("flags.ugrace", -graceoffsets[i] + dAcciaccatura, 0, pos, { scalex: gracescale, scaley: gracescale }));
        }
        if (gracebeam) {
          // give the beam the necessary info
          var graceDuration = elem.gracenotes[i].duration / 2;
          if (this.isBagpipes) graceDuration /= 2;
          var pseudoabselem = { heads: [grace],
            abcelem: { averagepitch: gracepitch, minpitch: gracepitch, maxpitch: gracepitch, duration: graceDuration } };
          gracebeam.add(pseudoabselem);
        } else {
          // draw the stem
          p1 = gracepitch + 1 / 3 * gracescale;
          p2 = gracepitch + 7 * gracescale;
          dx = grace.dx + grace.w;
          width = -0.6;
          abselem.addExtra(new RelativeElement(null, dx, 0, p1, { "type": "stem", "pitch2": p2, linewidth: width }));
        }
        ledgerLines(abselem, gracepitch, gracepitch, false, "noteheads.quarter", [], true, grace.dx - 1, 0.6);

        if (i === 0 && !this.isBagpipes && !(elem.rest && (elem.rest.type === "spacer" || elem.rest.type === "invisible"))) {
          var isTie = elem.gracenotes.length === 1 && grace.pitch === notehead.pitch;
          this.voice.addOther(new TieElem(grace, notehead, false, true, isTie));
        }
      }

      if (gracebeam) {
        this.voice.addBeam(gracebeam);
      }
    }

    if (!dontDraw && elem.decoration) {
      this.decoration.createDecoration(this.voice, elem.decoration, abselem.top, notehead ? notehead.w : 0, abselem, this.roomtaken, dir, abselem.bottom, elem.positioning, this.hasVocals);
    }

    if (elem.barNumber) {
      abselem.addChild(new RelativeElement(elem.barNumber, -10, 0, 0, { type: "barNumber" }));
    }

    // ledger lines
    ledgerLines(abselem, elem.minpitch, elem.maxpitch, elem.rest, c, additionalLedgers, dir, -2, 1);

    var chordMargin = 8; // If there are chords next to each other, this is how close they can get.
    if (elem.chord !== undefined) {
      for (i = 0; i < elem.chord.length; i++) {
        var x = 0;
        var y;
        var dim = this.renderer.getTextSize(elem.chord[i].name, 'annotationfont', "annotation");
        var chordWidth = dim.width;
        var chordHeight = dim.height / spacing.STEP;
        switch (elem.chord[i].position) {
          case "left":
            this.roomtaken += chordWidth + 7;
            x = -this.roomtaken; // TODO-PER: This is just a guess from trial and error
            y = elem.averagepitch;
            abselem.addExtra(new RelativeElement(elem.chord[i].name, x, chordWidth + 4, y, { type: "text", height: chordHeight }));
            break;
          case "right":
            this.roomtakenright += 4;
            x = this.roomtakenright; // TODO-PER: This is just a guess from trial and error
            y = elem.averagepitch;
            abselem.addRight(new RelativeElement(elem.chord[i].name, x, chordWidth + 4, y, { type: "text", height: chordHeight }));
            break;
          case "below":
            // setting the y-coordinate to undefined for now: it will be overwritten later on, after we figure out what the highest element on the line is.
            abselem.addRight(new RelativeElement(elem.chord[i].name, 0, chordWidth + chordMargin, undefined, { type: "text", position: "below", height: chordHeight }));
            break;
          case "above":
            // setting the y-coordinate to undefined for now: it will be overwritten later on, after we figure out what the highest element on the line is.
            abselem.addRight(new RelativeElement(elem.chord[i].name, 0, chordWidth + chordMargin, undefined, { type: "text", height: chordHeight }));
            break;
          default:
            if (elem.chord[i].rel_position) {
              var relPositionY = elem.chord[i].rel_position.y + 3 * spacing.STEP; // TODO-PER: this is a fudge factor to make it line up with abcm2ps
              abselem.addChild(new RelativeElement(elem.chord[i].name, x + elem.chord[i].rel_position.x, 0, elem.minpitch + relPositionY / spacing.STEP, { type: "text", height: chordHeight }));
            } else {
              // setting the y-coordinate to undefined for now: it will be overwritten later on, after we figure out what the highest element on the line is.
              var pos2 = 'above';
              if (elem.positioning && elem.positioning.chordPosition) pos2 = elem.positioning.chordPosition;

              dim = this.renderer.getTextSize(elem.chord[i].name, 'gchordfont', "chord");
              chordHeight = dim.height / spacing.STEP;
              chordWidth = dim.width; // Since the chord is centered, we only use half the width.
              abselem.addCentered(new RelativeElement(elem.chord[i].name, x, chordWidth, undefined, { type: "chord", position: pos2, height: chordHeight }));
            }
        }
      }
    }

    if (elem.startTriplet && !dontDraw) {
      this.triplet = new TripletElem(elem.startTriplet, notehead); // above is opposite from case of slurs
    }

    if (elem.endTriplet && this.triplet && !dontDraw) {
      this.triplet.setCloseAnchor(notehead);
    }

    return abselem;
  };

  AbstractEngraver.prototype.createNoteHead = function (abselem, c, pitchelem, dir, headx, extrax, flag, dot, dotshiftx, scale) {

    // TODO scale the dot as well
    var pitch = pitchelem.verticalPos;
    var notehead;
    var i;
    this.accidentalshiftx = 0;
    this.dotshiftx = 0;
    if (c === undefined) abselem.addChild(new RelativeElement("pitch is undefined", 0, 0, 0, { type: "debug" }));else if (c === "") {
      notehead = new RelativeElement(null, 0, 0, pitch);
    } else {
      var shiftheadx = headx;
      if (pitchelem.printer_shift) {
        var adjust = pitchelem.printer_shift === "same" ? 1 : 0;
        shiftheadx = dir === "down" ? -glyphs.getSymbolWidth(c) * scale + adjust : glyphs.getSymbolWidth(c) * scale - adjust;
      }
      var opts = { scalex: scale, scaley: scale, thickness: glyphs.symbolHeightInPitches(c) * scale };
      //if (dir)
      //	opts.stemHeight = ((dir==="down")?-this.stemHeight:this.stemHeight);
      notehead = new RelativeElement(c, shiftheadx, glyphs.getSymbolWidth(c) * scale, pitch, opts);
      if (flag) {
        var pos = pitch + (dir === "down" ? -7 : 7) * scale;
        if (scale === 1 && dir === "down" ? pos > 6 : pos < 6) pos = 6;
        var xdelta = dir === "down" ? headx : headx + notehead.w - 0.6;
        abselem.addRight(new RelativeElement(flag, xdelta, glyphs.getSymbolWidth(flag) * scale, pos, { scalex: scale, scaley: scale }));
      }
      this.dotshiftx = notehead.w + dotshiftx - 2 + 5 * dot;
      for (; dot > 0; dot--) {
        var dotadjusty = 1 - Math.abs(pitch) % 2; //PER: take abs value of the pitch. And the shift still happens on ledger lines.
        abselem.addRight(new RelativeElement("dots.dot", notehead.w + dotshiftx - 2 + 5 * dot, glyphs.getSymbolWidth("dots.dot"), pitch + dotadjusty));
      }
    }
    if (notehead) notehead.highestVert = pitchelem.highestVert;

    if (pitchelem.accidental) {
      var symb;
      switch (pitchelem.accidental) {
        case "quartersharp":
          symb = "accidentals.halfsharp";
          break;
        case "dblsharp":
          symb = "accidentals.dblsharp";
          break;
        case "sharp":
          symb = "accidentals.sharp";
          break;
        case "quarterflat":
          symb = "accidentals.halfflat";
          break;
        case "flat":
          symb = "accidentals.flat";
          break;
        case "dblflat":
          symb = "accidentals.dblflat";
          break;
        case "natural":
          symb = "accidentals.nat";
      }
      // if a note is at least a sixth away, it can share a slot with another accidental
      var accSlotFound = false;
      var accPlace = extrax;
      for (var j = 0; j < this.accidentalSlot.length; j++) {
        if (pitch - this.accidentalSlot[j][0] >= 6) {
          this.accidentalSlot[j][0] = pitch;
          accPlace = this.accidentalSlot[j][1];
          accSlotFound = true;
          break;
        }
      }
      if (accSlotFound === false) {
        accPlace -= glyphs.getSymbolWidth(symb) * scale + 2;
        this.accidentalSlot.push([pitch, accPlace]);
        this.accidentalshiftx = glyphs.getSymbolWidth(symb) * scale + 2;
      }
      abselem.addExtra(new RelativeElement(symb, accPlace, glyphs.getSymbolWidth(symb), pitch, { scalex: scale, scaley: scale }));
    }

    if (pitchelem.endTie) {
      if (this.ties[0]) {
        this.ties[0].setEndAnchor(notehead);
        this.ties = this.ties.slice(1, this.ties.length);
      }
    }

    if (pitchelem.startTie) {
      //PER: bug fix: var tie = new TieElem(notehead, null, (this.stemdir=="up" || dir=="down") && this.stemdir!="down",(this.stemdir=="down" || this.stemdir=="up"));
      var tie = new TieElem(notehead, null, (this.stemdir === "down" || dir === "down") && this.stemdir !== "up", this.stemdir === "down" || this.stemdir === "up", true);
      if (hint) tie.setHint();

      this.ties[this.ties.length] = tie;
      this.voice.addOther(tie);
      // HACK-PER: For the animation, we need to know if a note is tied to the next one, so here's a flag.
      // Unfortunately, only some of the notes in the current event might be tied, but this will consider it
      // tied if any one of them is. That will work for most cases.
      abselem.startTie = true;
    }

    if (pitchelem.endSlur) {
      for (i = 0; i < pitchelem.endSlur.length; i++) {
        var slurid = pitchelem.endSlur[i];
        var slur;
        if (this.slurs[slurid]) {
          slur = this.slurs[slurid];
          slur.setEndAnchor(notehead);
          delete this.slurs[slurid];
        } else {
          slur = new TieElem(null, notehead, dir === "down", (this.stemdir === "up" || dir === "down") && this.stemdir !== "down", false);
          if (hint) slur.setHint();
          this.voice.addOther(slur);
        }
        if (this.startlimitelem) {
          slur.setStartX(this.startlimitelem);
        }
      }
    }

    if (pitchelem.startSlur) {
      for (i = 0; i < pitchelem.startSlur.length; i++) {
        var slurid = pitchelem.startSlur[i].label;
        //PER: bug fix: var slur = new TieElem(notehead, null, (this.stemdir=="up" || dir=="down") && this.stemdir!="down", this.stemdir);
        var slur = new TieElem(notehead, null, (this.stemdir === "down" || dir === "down") && this.stemdir !== "up", false, false);
        if (hint) slur.setHint();
        this.slurs[slurid] = slur;
        this.voice.addOther(slur);
      }
    }

    return notehead;
  };

  AbstractEngraver.prototype.addMeasureNumber = function (number, abselem) {
    var measureNumHeight = this.renderer.getTextSize(number, "measurefont", 'bar-number');
    abselem.addChild(new RelativeElement(number, 0, 0, 11 + measureNumHeight.height / spacing.STEP, { type: "barNumber" }));
  };

  AbstractEngraver.prototype.createBarLine = function (elem) {
    // bar_thin, bar_thin_thick, bar_thin_thin, bar_thick_thin, bar_right_repeat, bar_left_repeat, bar_double_repeat

    var abselem = new AbsoluteElement(elem, 0, 10, 'bar', this.tuneNumber);
    var anchor = null; // place to attach part lines
    var dx = 0;

    if (elem.barNumber) {
      this.addMeasureNumber(elem.barNumber, abselem);
    }

    var firstdots = elem.type === "bar_right_repeat" || elem.type === "bar_dbl_repeat";
    var firstthin = elem.type !== "bar_left_repeat" && elem.type !== "bar_thick_thin" && elem.type !== "bar_invisible";
    var thick = elem.type === "bar_right_repeat" || elem.type === "bar_dbl_repeat" || elem.type === "bar_left_repeat" || elem.type === "bar_thin_thick" || elem.type === "bar_thick_thin";
    var secondthin = elem.type === "bar_left_repeat" || elem.type === "bar_thick_thin" || elem.type === "bar_thin_thin" || elem.type === "bar_dbl_repeat";
    var seconddots = elem.type === "bar_left_repeat" || elem.type === "bar_dbl_repeat";

    // limit positioning of slurs
    if (firstdots || seconddots) {
      for (var slur in this.slurs) {
        if (this.slurs.hasOwnProperty(slur)) {
          this.slurs[slur].setEndX(abselem);
        }
      }
      this.startlimitelem = abselem;
    }

    if (firstdots) {
      abselem.addRight(new RelativeElement("dots.dot", dx, 1, 7));
      abselem.addRight(new RelativeElement("dots.dot", dx, 1, 5));
      dx += 6; //2 hardcoded, twice;
    }

    if (firstthin) {
      anchor = new RelativeElement(null, dx, 1, 2, { "type": "bar", "pitch2": 10, linewidth: 0.6 });
      abselem.addRight(anchor);
    }

    if (elem.type === "bar_invisible") {
      anchor = new RelativeElement(null, dx, 1, 2, { "type": "none", "pitch2": 10, linewidth: 0.6 });
      abselem.addRight(anchor);
    }

    if (elem.decoration) {
      this.decoration.createDecoration(this.voice, elem.decoration, 12, thick ? 3 : 1, abselem, 0, "down", 2, elem.positioning, this.hasVocals);
    }

    if (thick) {
      dx += 4; //3 hardcoded;
      anchor = new RelativeElement(null, dx, 4, 2, { "type": "bar", "pitch2": 10, linewidth: 4 });
      abselem.addRight(anchor);
      dx += 5;
    }

    // if (this.partstartelem && (thick || (firstthin && secondthin))) { // means end of nth part
    // this.partstartelem.anchor2=anchor;
    // this.partstartelem = null;
    // }

    if (this.partstartelem && elem.endEnding) {
      this.partstartelem.anchor2 = anchor;
      this.partstartelem = null;
    }

    if (secondthin) {
      dx += 3; //3 hardcoded;
      anchor = new RelativeElement(null, dx, 1, 2, { "type": "bar", "pitch2": 10, linewidth: 0.6 });
      abselem.addRight(anchor); // 3 is hardcoded
    }

    if (seconddots) {
      dx += 3; //3 hardcoded;
      abselem.addRight(new RelativeElement("dots.dot", dx, 1, 7));
      abselem.addRight(new RelativeElement("dots.dot", dx, 1, 5));
    } // 2 is hardcoded

    if (elem.startEnding && this.s === 0) {
      // only put the first & second ending marks on the first staff
      var textWidth = this.renderer.getTextSize(elem.startEnding, "repeatfont", '').width;
      abselem.minspacing += textWidth + 10; // Give plenty of room for the ending number.
      this.partstartelem = new EndingElem(elem.startEnding, anchor, null);
      this.voice.addOther(this.partstartelem);
    }

    return abselem;
  };
})();

module.exports = AbstractEngraver;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_beam_element.js: Definition of the BeamElem class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var AbsoluteElement = __webpack_require__(4);
var RelativeElement = __webpack_require__(2);
var spacing = __webpack_require__(1);

var getDurlog = function getDurlog(duration) {
	// TODO-PER: This is a hack to prevent a Chrome lockup. Duration should have been defined already,
	// but there's definitely a case where it isn't. [Probably something to do with triplets.]
	if (duration === undefined) {
		return 0;
	}
	//        console.log("getDurlog: " + duration);
	return Math.floor(Math.log(duration) / Math.log(2));
};

// Most elements on the page are related to a particular absolute element -- notes, rests, bars, etc. Beams, however, span multiple elements.
// This means that beams can't be laid out until the absolute elements are placed. There is the further complication that the stems for beamed
// notes can't be laid out until the beams are because we don't know how long they will be until we know the slope of the beam and the horizontal
// spacing of the absolute elements.
//
// So, when a beam is detected, a BeamElem is created, then all notes belonging to that beam are added to it. These notes are not given stems at that time.
// Then, after the horizontal layout is complete, all of the BeamElem are iterated to set the beam position, then all of the notes that are beamed are given
// stems. After that, we are ready for the drawing step.

// There are three phases: the setup phase, when new elements are being discovered, the layout phase, when everything is calculated, and the drawing phase,
// when the object is not changed, but is used to put the elements on the page.

var BeamElem;

(function () {
	"use strict";

	//
	// Setup phase
	//

	BeamElem = function BeamElem(stemHeight, type, flat) {
		// type is "grace", "up", "down", or undefined. flat is used to force flat beams, as it commonly found in the grace notes of bagpipe music.
		this.isflat = flat;
		this.isgrace = type && type === "grace";
		this.forceup = this.isgrace || type && type === "up";
		this.forcedown = type && type === "down";
		this.elems = []; // all the AbsoluteElements that this beam touches. It may include embedded rests.
		this.total = 0;
		this.allrests = true;
		this.stemHeight = stemHeight;
		this.beams = []; // During the layout phase, this will become a list of the beams that need to be drawn.
	};

	BeamElem.prototype.setHint = function () {
		this.hint = true;
	};

	BeamElem.prototype.add = function (abselem) {
		var pitch = abselem.abcelem.averagepitch;
		if (pitch === undefined) return; // don't include elements like spacers in beams
		this.allrests = this.allrests && abselem.abcelem.rest;
		abselem.beam = this;
		this.elems.push(abselem);
		//var pitch = abselem.abcelem.averagepitch;
		this.total += pitch; // TODO CHORD (get pitches from abselem.heads)
		if (!this.min || abselem.abcelem.minpitch < this.min) {
			this.min = abselem.abcelem.minpitch;
		}
		if (!this.max || abselem.abcelem.maxpitch > this.max) {
			this.max = abselem.abcelem.maxpitch;
		}
	};

	var middleLine = 6; // hardcoded 6 is B

	BeamElem.prototype.calcDir = function () {
		if (this.forceup) return true;
		if (this.forcedown) return false;
		var average = calcAverage(this.total, this.elems.length);
		return average < middleLine;
	};

	//
	// layout phase
	//
	BeamElem.prototype.layout = function () {
		if (this.elems.length === 0 || this.allrests) return;

		this.stemsUp = this.calcDir(); // True means the stems are facing up.
		var dy = calcDy(this.stemsUp, this.isgrace); // This is the width of the beam line.

		// create the main beam
		var firstElement = this.elems[0];
		var lastElement = this.elems[this.elems.length - 1];
		var minStemHeight = 0; // The following is to leave space for "!///!" marks.
		var referencePitch = this.stemsUp ? firstElement.abcelem.maxpitch : firstElement.abcelem.minpitch;
		minStemHeight = minStem(firstElement, this.stemsUp, referencePitch, minStemHeight);
		minStemHeight = minStem(lastElement, this.stemsUp, referencePitch, minStemHeight);
		minStemHeight = Math.max(this.stemHeight, minStemHeight + 3); // TODO-PER: The 3 is the width of a 16th beam. The actual height of the beam should be used instead.
		var yPos = calcYPos(this.total, this.elems.length, minStemHeight, this.stemsUp, firstElement.abcelem.averagepitch, lastElement.abcelem.averagepitch, this.isflat, this.min, this.max, this.isgrace);
		var xPos = calcXPos(this.stemsUp, firstElement, lastElement);
		this.beams.push({ startX: xPos[0], endX: xPos[1], startY: yPos[0], endY: yPos[1], dy: dy });

		// create the rest of the beams (in the case of 1/16th notes, etc.
		var beams = createAdditionalBeams(this.elems, this.stemsUp, this.beams[0], this.isgrace, dy);
		for (var i = 0; i < beams.length; i++) {
			this.beams.push(beams[i]);
		} // Now that the main beam is defined, we know how tall the stems should be, so create them and attach them to the original notes.
		createStems(this.elems, this.stemsUp, this.beams[0], dy, this.mainNote);
	};

	BeamElem.prototype.isAbove = function () {
		return this.stemsUp;
	};

	// We can't just use the entire beam for the calculation. The range has to be passed in, because the beam might extend into some unrelated notes. for instance, (3_a'f'e'f'2 when L:16
	BeamElem.prototype.heightAtMidpoint = function (startX, endX) {
		if (this.beams.length === 0) return 0;
		var beam = this.beams[0];
		var midPoint = startX + (endX - startX) / 2;
		return getBarYAt(beam.startX, beam.startY, beam.endX, beam.endY, midPoint);
	};

	BeamElem.prototype.yAtNote = function (element) {
		var beam = this.beams[0];
		return getBarYAt(beam.startX, beam.startY, beam.endX, beam.endY, element.x);
	};

	BeamElem.prototype.xAtMidpoint = function (startX, endX) {
		return startX + (endX - startX) / 2;
	};

	//
	// Drawing phase
	//
	BeamElem.prototype.draw = function (renderer) {
		if (this.beams.length === 0) return;

		renderer.beginGroup();
		for (var i = 0; i < this.beams.length; i++) {
			var beam = this.beams[i];
			drawBeam(renderer, beam.startX, beam.startY, beam.endX, beam.endY, beam.dy, this.hint);
		}
		renderer.endGroup('beam-elem');
	};

	//
	// private functions
	//
	function minStem(element, stemsUp, referencePitch, minStemHeight) {
		if (!element.children) return minStemHeight;
		for (var i = 0; i < element.children.length; i++) {
			var elem = element.children[i];
			if (stemsUp && elem.top !== undefined && elem.c === "flags.ugrace") minStemHeight = Math.max(minStemHeight, elem.top - referencePitch);else if (!stemsUp && elem.bottom !== undefined && elem.c === "flags.ugrace") minStemHeight = Math.max(minStemHeight, referencePitch - elem.bottom + 7); // The extra 7 is because we are measuring the slash from the top.
		}
		return minStemHeight;
	}

	function calcSlant(leftAveragePitch, rightAveragePitch, numStems, isFlat) {
		if (isFlat) return 0;
		var slant = leftAveragePitch - rightAveragePitch;
		var maxSlant = numStems / 2;

		if (slant > maxSlant) slant = maxSlant;
		if (slant < -maxSlant) slant = -maxSlant;
		return slant;
	}

	function calcAverage(total, numElements) {
		if (!numElements) return 0;
		return total / numElements;
	}

	function getBarYAt(startx, starty, endx, endy, x) {
		return starty + (endy - starty) / (endx - startx) * (x - startx);
	}

	function calcDy(asc, isGrace) {
		var dy = asc ? spacing.STEP : -spacing.STEP;
		if (isGrace) dy = dy * 0.4;
		return dy;
	}

	function drawBeam(renderer, startX, startY, endX, endY, dy, isHint) {
		var klass = 'beam-elem';
		if (isHint) klass += " abcjs-hint";

		// the X coordinates are actual coordinates, but the Y coordinates are in pitches.
		startY = renderer.calcY(startY);
		endY = renderer.calcY(endY);
		var pathString = "M" + startX + " " + startY + " L" + endX + " " + endY + "L" + endX + " " + (endY + dy) + " L" + startX + " " + (startY + dy) + "z";
		renderer.printPath({
			path: pathString,
			stroke: "none",
			fill: "#000000",
			'class': renderer.addClasses(klass)
		});
	}

	function calcXPos(asc, firstElement, lastElement) {
		var starthead = firstElement.heads[asc ? 0 : firstElement.heads.length - 1];
		var endhead = lastElement.heads[asc ? 0 : lastElement.heads.length - 1];
		var startX = starthead.x;
		if (asc) startX += starthead.w - 0.6;
		var endX = endhead.x;
		if (asc) endX += endhead.w;
		return [startX, endX];
	}

	function calcYPos(total, numElements, stemHeight, asc, firstAveragePitch, lastAveragePitch, isFlat, minPitch, maxPitch, isGrace) {
		var average = calcAverage(total, numElements); // This is the average pitch for the all the notes that will be beamed.
		var barpos = stemHeight - 2; // (isGrace)? 5:7;
		var barminpos = stemHeight - 2;
		var pos = Math.round(asc ? Math.max(average + barpos, maxPitch + barminpos) : Math.min(average - barpos, minPitch - barminpos));

		var slant = calcSlant(firstAveragePitch, lastAveragePitch, numElements, isFlat);
		var startY = pos + Math.floor(slant / 2);
		var endY = pos + Math.floor(-slant / 2);

		// If the notes are too high or too low, make the beam go down to the middle
		if (!isGrace) {
			if (asc && pos < 6) {
				startY = 6;
				endY = 6;
			} else if (!asc && pos > 6) {
				startY = 6;
				endY = 6;
			}
		}

		return [startY, endY];
	}

	function createStems(elems, asc, beam, dy, mainNote) {
		for (var i = 0; i < elems.length; i++) {
			var elem = elems[i];
			if (elem.abcelem.rest) continue;
			// TODO-PER: This is odd. If it is a regular beam then elems is an array of AbsoluteElements, if it is a grace beam then it is an array of objects , so we directly attach the element to the parent. We tell it if is a grace note because they are passed in as a generic object instead of an AbsoluteElement.
			var isGrace = elem.addExtra ? false : true;
			var parent = isGrace ? mainNote : elem;
			var furthestHead = elem.heads[asc ? 0 : elem.heads.length - 1];
			var ovalDelta = 1 / 5; //(isGrace)?1/3:1/5;
			var pitch = furthestHead.pitch + (asc ? ovalDelta : -ovalDelta);
			var dx = asc ? furthestHead.w : 0; // down-pointing stems start on the left side of the note, up-pointing stems start on the right side, so we offset by the note width.
			var x = furthestHead.x + dx; // this is now the actual x location in pixels.
			var bary = getBarYAt(beam.startX, beam.startY, beam.endX, beam.endY, x);
			var lineWidth = asc ? -0.6 : 0.6;
			if (!asc) bary -= dy / 2 / spacing.STEP; // TODO-PER: This is just a fudge factor so the down-pointing stems don't overlap.
			if (isGrace) dx += elem.heads[0].dx;
			// TODO-PER-HACK: One type of note head has a different placement of the stem. This should be more generically calculated:
			if (furthestHead.c === 'noteheads.slash.quarter') {
				if (asc) pitch += 1;else pitch -= 1;
			}
			var stem = new RelativeElement(null, dx, 0, pitch, {
				"type": "stem",
				"pitch2": bary,
				linewidth: lineWidth
			});
			stem.setX(parent.x); // This is after the x coordinates were set, so we have to set it directly.
			parent.addExtra(stem);
		}
	}

	function createAdditionalBeams(elems, asc, beam, isGrace, dy) {
		var beams = [];
		var auxBeams = []; // auxbeam will be {x, y, durlog, single} auxbeam[0] should match with durlog=-4 (16th) (j=-4-durlog)
		for (var i = 0; i < elems.length; i++) {
			var elem = elems[i];
			if (elem.abcelem.rest) continue;
			var furthestHead = elem.heads[asc ? 0 : elem.heads.length - 1];
			var x = furthestHead.x + (asc ? furthestHead.w : 0);
			var bary = getBarYAt(beam.startX, beam.startY, beam.endX, beam.endY, x);

			var sy = asc ? -1.5 : 1.5;
			if (isGrace) sy = sy * 2 / 3; // This makes the second beam on grace notes closer to the first one.
			var duration = elem.abcelem.duration; // get the duration via abcelem because of triplets
			if (duration === 0) duration = 0.25; // if this is stemless, then we use quarter note as the duration.
			for (var durlog = getDurlog(duration); durlog < -3; durlog++) {
				if (auxBeams[-4 - durlog]) {
					auxBeams[-4 - durlog].single = false;
				} else {
					auxBeams[-4 - durlog] = {
						x: x + (asc ? -0.6 : 0), y: bary + sy * (-4 - durlog + 1),
						durlog: durlog, single: true
					};
				}
			}

			for (var j = auxBeams.length - 1; j >= 0; j--) {
				if (i === elems.length - 1 || getDurlog(elems[i + 1].abcelem.duration) > -j - 4) {

					var auxBeamEndX = x;
					var auxBeamEndY = bary + sy * (j + 1);

					if (auxBeams[j].single) {
						auxBeamEndX = i === 0 ? x + 5 : x - 5;
						auxBeamEndY = getBarYAt(beam.startX, beam.startY, beam.endX, beam.endY, auxBeamEndX) + sy * (j + 1);
					}
					beams.push({ startX: auxBeams[j].x, endX: auxBeamEndX, startY: auxBeams[j].y, endY: auxBeamEndY, dy: dy });
					auxBeams = auxBeams.slice(0, j);
				}
			}
		}
		return beams;
	}
})();

module.exports = BeamElem;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_brace_element.js: Definition of the BraceElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var BraceElem = function BraceElem() {
    this.length = 1;
};

BraceElem.prototype.increaseStavesIncluded = function () {
    this.length++;
};

BraceElem.prototype.setLocation = function (x) {
    this.x = x;
};

BraceElem.prototype.getWidth = function () {
    return 10; // TODO-PER: right now the drawing function doesn't vary the width at all. If it does in the future then this will change.
};

BraceElem.prototype.layout = function (renderer, top, bottom) {
    this.startY = top;
    this.endY = bottom;
};

BraceElem.prototype.draw = function (renderer, top, bottom) {
    this.layout(renderer, top, bottom);
    renderer.drawBrace(this.x, this.startY, this.endY);
};

module.exports = BraceElem;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_create_clef.js
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var AbsoluteElement = __webpack_require__(4);
var glyphs = __webpack_require__(3);
var RelativeElement = __webpack_require__(2);

var createClef;

(function () {
	"use strict";

	createClef = function createClef(elem, tuneNumber) {
		var clef;
		var octave = 0;
		var abselem = new AbsoluteElement(elem, 0, 10, 'staff-extra', tuneNumber);
		switch (elem.type) {
			case "treble":
				clef = "clefs.G";break;
			case "tenor":
				clef = "clefs.C";break;
			case "alto":
				clef = "clefs.C";break;
			case "bass":
				clef = "clefs.F";break;
			case 'treble+8':
				clef = "clefs.G";octave = 1;break;
			case 'tenor+8':
				clef = "clefs.C";octave = 1;break;
			case 'bass+8':
				clef = "clefs.F";octave = 1;break;
			case 'alto+8':
				clef = "clefs.C";octave = 1;break;
			case 'treble-8':
				clef = "clefs.G";octave = -1;break;
			case 'tenor-8':
				clef = "clefs.C";octave = -1;break;
			case 'bass-8':
				clef = "clefs.F";octave = -1;break;
			case 'alto-8':
				clef = "clefs.C";octave = -1;break;
			case 'none':
				return null;
			case 'perc':
				clef = "clefs.perc";break;
			default:
				abselem.addChild(new RelativeElement("clef=" + elem.type, 0, 0, undefined, { type: "debug" }));
		}
		// if (elem.verticalPos) {
		// pitch = elem.verticalPos;
		// }
		var dx = 5;
		if (clef) {
			abselem.addRight(new RelativeElement(clef, dx, glyphs.getSymbolWidth(clef), elem.clefPos));

			if (clef === 'clefs.G') {
				abselem.top = 13;
				abselem.bottom = -1;
			} else {
				abselem.top = 10;
				abselem.bottom = 2;
			}
			if (octave !== 0) {
				var scale = 2 / 3;
				var adjustspacing = (glyphs.getSymbolWidth(clef) - glyphs.getSymbolWidth("8") * scale) / 2;
				abselem.addRight(new RelativeElement("8", dx + adjustspacing, glyphs.getSymbolWidth("8") * scale, octave > 0 ? abselem.top + 3 : abselem.bottom - 1, {
					scalex: scale,
					scaley: scale
				}));
				abselem.top += 2;
			}
		}
		return abselem;
	};
})();

module.exports = createClef;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_create_key_signature.js
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var AbsoluteElement = __webpack_require__(4);
var glyphs = __webpack_require__(3);
var RelativeElement = __webpack_require__(2);

var parseCommon = __webpack_require__(0);

var createKeySignature;

(function () {
	"use strict";

	createKeySignature = function createKeySignature(elem, tuneNumber) {
		if (!elem.accidentals || elem.accidentals.length === 0) return null;
		var abselem = new AbsoluteElement(elem, 0, 10, 'staff-extra', tuneNumber);
		var dx = 0;
		parseCommon.each(elem.accidentals, function (acc) {
			var symbol = acc.acc === "sharp" ? "accidentals.sharp" : acc.acc === "natural" ? "accidentals.nat" : "accidentals.flat";
			//var notes = { 'A': 5, 'B': 6, 'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G':4, 'a': 12, 'b': 13, 'c': 7, 'd': 8, 'e': 9, 'f': 10, 'g':11 };
			abselem.addRight(new RelativeElement(symbol, dx, glyphs.getSymbolWidth(symbol), acc.verticalPos, { thickness: glyphs.symbolHeightInPitches(symbol) }));
			dx += glyphs.getSymbolWidth(symbol) + 2;
		}, this);
		return abselem;
	};
})();

module.exports = createKeySignature;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_create_time_signature.js
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var AbsoluteElement = __webpack_require__(4);
var glyphs = __webpack_require__(3);
var RelativeElement = __webpack_require__(2);

var createTimeSignature;

(function () {
	"use strict";

	createTimeSignature = function createTimeSignature(elem, tuneNumber) {
		var abselem = new AbsoluteElement(elem, 0, 10, 'staff-extra', tuneNumber);
		if (elem.type === "specified") {
			//TODO make the alignment for time signatures centered
			for (var i = 0; i < elem.value.length; i++) {
				if (i !== 0) abselem.addRight(new RelativeElement('+', i * 20 - 9, glyphs.getSymbolWidth("+"), 6, { thickness: glyphs.symbolHeightInPitches("+") }));
				if (elem.value[i].den) {
					// TODO-PER: get real widths here, also center the num and den.
					abselem.addRight(new RelativeElement(elem.value[i].num, i * 20, glyphs.getSymbolWidth(elem.value[i].num.charAt(0)) * elem.value[i].num.length, 8, { thickness: glyphs.symbolHeightInPitches(elem.value[i].num.charAt(0)) }));
					abselem.addRight(new RelativeElement(elem.value[i].den, i * 20, glyphs.getSymbolWidth(elem.value[i].den.charAt(0)) * elem.value[i].den.length, 4, { thickness: glyphs.symbolHeightInPitches(elem.value[i].den.charAt(0)) }));
				} else {
					abselem.addRight(new RelativeElement(elem.value[i].num, i * 20, glyphs.getSymbolWidth(elem.value[i].num.charAt(0)) * elem.value[i].num.length, 6, { thickness: glyphs.symbolHeightInPitches(elem.value[i].num.charAt(0)) }));
				}
			}
		} else if (elem.type === "common_time") {
			abselem.addRight(new RelativeElement("timesig.common", 0, glyphs.getSymbolWidth("timesig.common"), 6, { thickness: glyphs.symbolHeightInPitches("timesig.common") }));
		} else if (elem.type === "cut_time") {
			abselem.addRight(new RelativeElement("timesig.cut", 0, glyphs.getSymbolWidth("timesig.cut"), 6, { thickness: glyphs.symbolHeightInPitches("timesig.cut") }));
		} else if (elem.type === "tempus_imperfectum") {
			abselem.addRight(new RelativeElement("timesig.imperfectum", 0, glyphs.getSymbolWidth("timesig.imperfectum"), 6, { thickness: glyphs.symbolHeightInPitches("timesig.imperfectum") }));
		} else if (elem.type === "tempus_imperfectum_prolatio") {
			abselem.addRight(new RelativeElement("timesig.imperfectum2", 0, glyphs.getSymbolWidth("timesig.imperfectum2"), 6, { thickness: glyphs.symbolHeightInPitches("timesig.imperfectum2") }));
		} else if (elem.type === "tempus_perfectum") {
			abselem.addRight(new RelativeElement("timesig.perfectum", 0, glyphs.getSymbolWidth("timesig.perfectum"), 6, { thickness: glyphs.symbolHeightInPitches("timesig.perfectum") }));
		} else if (elem.type === "tempus_perfectum_prolatio") {
			abselem.addRight(new RelativeElement("timesig.perfectum2", 0, glyphs.getSymbolWidth("timesig.perfectum2"), 6, { thickness: glyphs.symbolHeightInPitches("timesig.perfectum2") }));
		} else {
			console.log("time signature:", elem);
		}
		return abselem;
	};
})();

module.exports = createTimeSignature;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// abc_decoration.js: Creates a data structure suitable for printing a line of abc
// Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) & Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global window */

var DynamicDecoration = __webpack_require__(30);
var CrescendoElem = __webpack_require__(31);
var glyphs = __webpack_require__(3);
var RelativeElement = __webpack_require__(2);
var TieElem = __webpack_require__(13);

var Decoration;

(function () {
	"use strict";

	Decoration = function Decoration() {
		this.startDiminuendoX = undefined;
		this.startCrescendoX = undefined;
		this.minTop = 12; // TODO-PER: this is assuming a 5-line staff. Pass that info in.
		this.minBottom = 0;
	};

	var closeDecoration = function closeDecoration(voice, decoration, pitch, width, abselem, roomtaken, dir, minPitch) {
		var yPos;
		for (var i = 0; i < decoration.length; i++) {
			if (decoration[i] === "staccato" || decoration[i] === "tenuto" || decoration[i] === "accent") {
				var symbol = "scripts." + decoration[i];
				if (decoration[i] === "accent") symbol = "scripts.sforzato";
				if (yPos === undefined) yPos = dir === "down" ? pitch + 2 : minPitch - 2;else yPos = dir === "down" ? yPos + 2 : yPos - 2;
				if (decoration[i] === "accent") {
					// Always place the accent three pitches away, no matter whether that is a line or space.
					if (dir === "up") yPos--;else yPos++;
				} else {
					// don't place on a stave line. The stave lines are 2,4,6,8,10
					switch (yPos) {
						case 2:
						case 4:
						case 6:
						case 8:
						case 10:
							if (dir === "up") yPos--;else yPos++;
							break;
					}
				}
				if (pitch > 9) yPos++; // take up some room of those that are above
				var deltaX = width / 2;
				if (glyphs.getSymbolAlign(symbol) !== "center") {
					deltaX -= glyphs.getSymbolWidth(symbol) / 2;
				}
				abselem.addChild(new RelativeElement(symbol, deltaX, glyphs.getSymbolWidth(symbol), yPos));
			}
			if (decoration[i] === "slide" && abselem.heads[0]) {
				var yPos2 = abselem.heads[0].pitch;
				yPos2 -= 2; // TODO-PER: not sure what this fudge factor is.
				var blank1 = new RelativeElement("", -roomtaken - 15, 0, yPos2 - 1);
				var blank2 = new RelativeElement("", -roomtaken - 5, 0, yPos2 + 1);
				abselem.addChild(blank1);
				abselem.addChild(blank2);
				voice.addOther(new TieElem(blank1, blank2, false, false, false));
			}
		}
		if (yPos === undefined) yPos = pitch;

		return { above: yPos, below: abselem.bottom };
	};

	var volumeDecoration = function volumeDecoration(voice, decoration, abselem, positioning) {
		for (var i = 0; i < decoration.length; i++) {
			switch (decoration[i]) {
				case "p":
				case "mp":
				case "pp":
				case "ppp":
				case "pppp":
				case "f":
				case "ff":
				case "fff":
				case "ffff":
				case "sfz":
				case "mf":
					var elem = new DynamicDecoration(abselem, decoration[i], positioning);
					voice.addOther(elem);
			}
		}
	};

	var compoundDecoration = function compoundDecoration(decoration, pitch, width, abselem, dir) {
		function highestPitch() {
			if (abselem.heads.length === 0) return 10; // TODO-PER: I don't know if this can happen, but we'll return the top of the staff if so.
			var pitch = abselem.heads[0].pitch;
			for (var i = 1; i < abselem.heads.length; i++) {
				pitch = Math.max(pitch, abselem.heads[i].pitch);
			}return pitch;
		}
		function lowestPitch() {
			if (abselem.heads.length === 0) return 2; // TODO-PER: I don't know if this can happen, but we'll return the bottom of the staff if so.
			var pitch = abselem.heads[0].pitch;
			for (var i = 1; i < abselem.heads.length; i++) {
				pitch = Math.min(pitch, abselem.heads[i].pitch);
			}return pitch;
		}
		function compoundDecoration(symbol, count) {
			var placement = dir === 'down' ? lowestPitch() + 1 : highestPitch() + 9;
			if (dir !== 'down' && count === 1) placement--;
			var deltaX = width / 2;
			deltaX += dir === 'down' ? -5 : 3;
			for (var i = 0; i < count; i++) {
				placement -= 1;
				abselem.addChild(new RelativeElement(symbol, deltaX, glyphs.getSymbolWidth(symbol), placement));
			}
		}

		for (var i = 0; i < decoration.length; i++) {
			switch (decoration[i]) {
				case "/":
					compoundDecoration("flags.ugrace", 1);break;
				case "//":
					compoundDecoration("flags.ugrace", 2);break;
				case "///":
					compoundDecoration("flags.ugrace", 3);break;
				case "////":
					compoundDecoration("flags.ugrace", 4);break;
			}
		}
	};

	var stackedDecoration = function stackedDecoration(decoration, width, abselem, yPos, positioning, minTop, minBottom) {
		function incrementPlacement(placement, height) {
			if (placement === 'above') yPos.above += height;else yPos.below -= height;
		}
		function getPlacement(placement) {
			var y;
			if (placement === 'above') {
				y = yPos.above;
				if (y < minTop) y = minTop;
			} else {
				y = yPos.below;
				if (y > minBottom) y = minBottom;
			}
			return y;
		}
		function textDecoration(text, placement) {
			var y = getPlacement(placement);
			var textFudge = 2;
			var textHeight = 5;
			// TODO-PER: Get the height of the current font and use that for the thickness.
			abselem.addChild(new RelativeElement(text, width / 2, 0, y + textFudge, { type: "decoration", klass: 'ornament', thickness: 3 }));

			incrementPlacement(placement, textHeight);
		}
		function symbolDecoration(symbol, placement) {
			var deltaX = width / 2;
			if (glyphs.getSymbolAlign(symbol) !== "center") {
				deltaX -= glyphs.getSymbolWidth(symbol) / 2;
			}
			var height = glyphs.symbolHeightInPitches(symbol) + 1; // adding a little padding so nothing touches.
			var y = getPlacement(placement);
			y = placement === 'above' ? y + height / 2 : y - height / 2; // Center the element vertically.
			abselem.addChild(new RelativeElement(symbol, deltaX, glyphs.getSymbolWidth(symbol), y, { klass: 'ornament', thickness: glyphs.symbolHeightInPitches(symbol) }));

			incrementPlacement(placement, height);
		}

		var symbolList = {
			"+": "scripts.stopped",
			"open": "scripts.open",
			"snap": "scripts.snap",
			"wedge": "scripts.wedge",
			"thumb": "scripts.thumb",
			"shortphrase": "scripts.shortphrase",
			"mediumphrase": "scripts.mediumphrase",
			"longphrase": "scripts.longphrase",
			"trill": "scripts.trill",
			"roll": "scripts.roll",
			"irishroll": "scripts.roll",
			"marcato": "scripts.umarcato",
			"dmarcato": "scripts.dmarcato",
			"umarcato": "scripts.umarcato",
			"turn": "scripts.turn",
			"uppermordent": "scripts.prall",
			"pralltriller": "scripts.prall",
			"mordent": "scripts.mordent",
			"lowermordent": "scripts.mordent",
			"downbow": "scripts.downbow",
			"upbow": "scripts.upbow",
			"fermata": "scripts.ufermata",
			"invertedfermata": "scripts.dfermata",
			"breath": ",",
			"coda": "scripts.coda",
			"segno": "scripts.segno"
		};

		var hasOne = false;
		for (var i = 0; i < decoration.length; i++) {
			switch (decoration[i]) {
				case "0":
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "D.C.":
				case "D.S.":
					textDecoration(decoration[i], positioning);
					hasOne = true;
					break;
				case "fine":
					textDecoration("FINE", positioning);
					hasOne = true;
					break;
				case "+":
				case "open":
				case "snap":
				case "wedge":
				case "thumb":
				case "shortphrase":
				case "mediumphrase":
				case "longphrase":
				case "trill":
				case "roll":
				case "irishroll":
				case "marcato":
				case "dmarcato":
				case "turn":
				case "uppermordent":
				case "pralltriller":
				case "mordent":
				case "lowermordent":
				case "downbow":
				case "upbow":
				case "fermata":
				case "breath":
				case "umarcato":
				case "coda":
				case "segno":
					symbolDecoration(symbolList[decoration[i]], positioning);
					hasOne = true;
					break;
				case "invertedfermata":
					symbolDecoration(symbolList[decoration[i]], 'below');
					hasOne = true;
					break;
				case "mark":
					abselem.klass = "mark";
					break;
			}
		}
		return hasOne;
	};

	Decoration.prototype.dynamicDecoration = function (voice, decoration, abselem, positioning) {
		var diminuendo;
		var crescendo;
		for (var i = 0; i < decoration.length; i++) {
			switch (decoration[i]) {
				case "diminuendo(":
					this.startDiminuendoX = abselem;
					diminuendo = undefined;
					break;
				case "diminuendo)":
					diminuendo = { start: this.startDiminuendoX, stop: abselem };
					this.startDiminuendoX = undefined;
					break;
				case "crescendo(":
					this.startCrescendoX = abselem;
					crescendo = undefined;
					break;
				case "crescendo)":
					crescendo = { start: this.startCrescendoX, stop: abselem };
					this.startCrescendoX = undefined;
					break;
			}
		}
		if (diminuendo) {
			voice.addOther(new CrescendoElem(diminuendo.start, diminuendo.stop, ">", positioning));
		}
		if (crescendo) {
			voice.addOther(new CrescendoElem(crescendo.start, crescendo.stop, "<", positioning));
		}
	};

	Decoration.prototype.createDecoration = function (voice, decoration, pitch, width, abselem, roomtaken, dir, minPitch, positioning, hasVocals) {
		if (!positioning) positioning = { ornamentPosition: 'above', volumePosition: hasVocals ? 'above' : 'below', dynamicPosition: hasVocals ? 'above' : 'below' };
		// These decorations don't affect the placement of other decorations
		volumeDecoration(voice, decoration, abselem, positioning.volumePosition);
		this.dynamicDecoration(voice, decoration, abselem, positioning.dynamicPosition);
		compoundDecoration(decoration, pitch, width, abselem, dir);

		// treat staccato, accent, and tenuto first (may need to shift other markers)
		var yPos = closeDecoration(voice, decoration, pitch, width, abselem, roomtaken, dir, minPitch);
		// yPos is an object containing 'above' and 'below'. That is the placement of the next symbol on either side.

		yPos.above = Math.max(yPos.above, this.minTop);
		var hasOne = stackedDecoration(decoration, width, abselem, yPos, positioning.ornamentPosition, this.minTop, this.minBottom);
		if (hasOne) {
			//			abselem.top = Math.max(yPos.above + 3, abselem.top); // TODO-PER: Not sure why we need this fudge factor.
		}
	};
})();

module.exports = Decoration;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_dynamic_decoration.js: Definition of the DynamicDecoration class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var spacing = __webpack_require__(1);

var DynamicDecoration = function DynamicDecoration(anchor, dec, position) {
	this.anchor = anchor;
	this.dec = dec;
	if (position === 'below') this.volumeHeightBelow = 5;else this.volumeHeightAbove = 5;
	this.pitch = undefined; // This will be set later
};

DynamicDecoration.prototype.setUpperAndLowerElements = function (positionY) {
	if (this.volumeHeightAbove) this.pitch = positionY.volumeHeightAbove;else this.pitch = positionY.volumeHeightBelow;
};

DynamicDecoration.prototype.draw = function (renderer, linestartx, lineendx) {
	if (this.pitch === undefined) window.console.error("Dynamic Element y-coordinate not set.");
	var scalex = 1;
	var scaley = 1;
	renderer.printSymbol(this.anchor.x, this.pitch, this.dec, scalex, scaley, renderer.addClasses('decoration'));
};

module.exports = DynamicDecoration;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_crescendo_element.js: Definition of the CrescendoElem class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var sprintf = __webpack_require__(6);

var CrescendoElem = function CrescendoElem(anchor1, anchor2, dir, positioning) {
	this.anchor1 = anchor1; // must have a .x and a .parent property or be null (means starts at the "beginning" of the line - after keysig)
	this.anchor2 = anchor2; // must have a .x property or be null (means ends at the end of the line)
	this.dir = dir; // either "<" or ">"
	if (positioning === 'above') this.dynamicHeightAbove = 4;else this.dynamicHeightBelow = 4;
	this.pitch = undefined; // This will be set later
};

CrescendoElem.prototype.setUpperAndLowerElements = function (positionY) {
	if (this.dynamicHeightAbove) this.pitch = positionY.dynamicHeightAbove;else this.pitch = positionY.dynamicHeightBelow;
};

CrescendoElem.prototype.draw = function (renderer) {
	if (this.pitch === undefined) window.console.error("Crescendo Element y-coordinate not set.");
	var y = renderer.calcY(this.pitch) + 4; // This is the top pixel to use (it is offset a little so that it looks good with the volume marks.)
	var height = 8;
	if (this.dir === "<") {
		this.drawLine(renderer, y + height / 2, y);
		this.drawLine(renderer, y + height / 2, y + height);
	} else {
		this.drawLine(renderer, y, y + height / 2);
		this.drawLine(renderer, y + height, y + height / 2);
	}
};

CrescendoElem.prototype.drawLine = function (renderer, y1, y2) {
	// TODO-PER: This is just a quick hack to make the dynamic marks not crash if they are mismatched. See the slur treatment for the way to get the beginning and end.
	var left = this.anchor1 ? this.anchor1.x : 0;
	var right = this.anchor2 ? this.anchor2.x : 800;
	var pathString = sprintf("M %f %f L %f %f", left, y1, right, y2);
	renderer.printPath({ path: pathString, stroke: "#000000", 'class': renderer.addClasses('decoration') });
};

module.exports = CrescendoElem;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_ending_element.js: Definition of the EndingElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var sprintf = __webpack_require__(6);

var EndingElem = function EndingElem(text, anchor1, anchor2) {
	this.text = text; // text to be displayed top left
	this.anchor1 = anchor1; // must have a .x property or be null (means starts at the "beginning" of the line - after keysig)
	this.anchor2 = anchor2; // must have a .x property or be null (means ends at the end of the line)
	this.endingHeightAbove = 5;
	this.pitch = undefined; // This will be set later
};

EndingElem.prototype.setUpperAndLowerElements = function (positionY) {
	this.pitch = positionY.endingHeightAbove - 2;
};

EndingElem.prototype.draw = function (renderer, linestartx, lineendx) {
	if (this.pitch === undefined) window.console.error("Ending Element y-coordinate not set.");
	var y = renderer.calcY(this.pitch);
	var height = 20;
	var pathString;
	if (this.anchor1) {
		linestartx = this.anchor1.x + this.anchor1.w;
		pathString = sprintf("M %f %f L %f %f", linestartx, y, linestartx, y + height);
		renderer.printPath({ path: pathString, stroke: "#000000", fill: "#000000", 'class': renderer.addClasses('ending') });
		renderer.renderText(linestartx + 5, renderer.calcY(this.pitch - 0.5), this.text, 'repeatfont', 'ending', "start");
	}

	if (this.anchor2) {
		lineendx = this.anchor2.x;
		pathString = sprintf("M %f %f L %f %f", lineendx, y, lineendx, y + height);
		renderer.printPath({ path: pathString, stroke: "#000000", fill: "#000000", 'class': renderer.addClasses('ending') });
	}

	pathString = sprintf("M %f %f L %f %f", linestartx, y, lineendx, y);
	renderer.printPath({ path: pathString, stroke: "#000000", fill: "#000000", 'class': renderer.addClasses('ending') });
};

module.exports = EndingElem;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_staff_group_element.js: Definition of the StaffGroupElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*globals console */

var spacing = __webpack_require__(1);

// StaffGroupElement contains all the elements that go together to make one line of music.
// That might be multiple staves that are tied together, and it might be multiple voices on one staff.
//
// Methods:
// constructor: some basic initialization
// addVoice(): Called once for each voice. May add a new staff if needed.
// finished(): Called only internally by layout()
// layout(): This does all the layout. It sets the following: spacingunits, startx, minspace, w, and the x-coordinate of each element in each voice.
// draw(): Calls the underlying methods on the voice objects to do the drawing. Sets y and height.
//
// Members:
// staffs: an array of all the staves in this group. Each staff contains the following elements:
//    { top, bottom, highest, lowest, y }
// voices: array of VoiceElement objects. This is mostly passed in, but the VoiceElement objects are modified here.
//
// spacingunits: number of relative x-units in the line. Used by the calling function to pass back in as the "spacing" input parameter.
// TODO-PER: This should actually be passed back as a return value.
// minspace: smallest space between two notes. Used by the calling function to pass back in as the "spacing" input parameter.
// TODO-PER: This should actually be passed back as a return value.
// startx: The left edge, taking the margin and the optional voice name. Used by the draw() method.
// w: The width of the line. Used by calling function to pass back in as the "spacing" input parameter, and the draw() method.
// TODO-PER: This should actually be passed back as a return value.  (TODO-PER: in pixels or spacing units?)
// y: The top of the staff group, in pixels. This is set in the draw method.
// TODO-PER: Where is that used? It looks like it might not be needed.
// height: Set in the draw() method to the height actually used. Used by the calling function to know where to start the next staff group.
// TODO-PER: This should actually be set in the layout method and passed back as a return value.

var StaffGroupElement = function StaffGroupElement() {
	this.voices = [];
	this.staffs = [];
	this.brace = undefined; //tony
};

StaffGroupElement.prototype.setLimit = function (member, voice) {
	if (!voice.specialY[member]) return;
	if (!voice.staff.specialY[member]) voice.staff.specialY[member] = voice.specialY[member];else voice.staff.specialY[member] = Math.max(voice.staff.specialY[member], voice.specialY[member]);
};

StaffGroupElement.prototype.addVoice = function (voice, staffnumber, stafflines) {
	var voiceNum = this.voices.length;
	this.voices[voiceNum] = voice;
	if (this.staffs[staffnumber]) this.staffs[staffnumber].voices.push(voiceNum);else {
		// TODO-PER: how does the min/max change when stafflines is not 5?
		this.staffs[this.staffs.length] = {
			top: 10,
			bottom: 2,
			lines: stafflines,
			voices: [voiceNum],
			specialY: {
				tempoHeightAbove: 0,
				partHeightAbove: 0,
				volumeHeightAbove: 0,
				dynamicHeightAbove: 0,
				endingHeightAbove: 0,
				chordHeightAbove: 0,
				lyricHeightAbove: 0,

				lyricHeightBelow: 0,
				chordHeightBelow: 0,
				volumeHeightBelow: 0,
				dynamicHeightBelow: 0
			}
		};
	}
	voice.staff = this.staffs[staffnumber];
};

StaffGroupElement.prototype.setStaffLimits = function (voice) {
	voice.staff.top = Math.max(voice.staff.top, voice.top);
	voice.staff.bottom = Math.min(voice.staff.bottom, voice.bottom);
	this.setLimit('tempoHeightAbove', voice);
	this.setLimit('partHeightAbove', voice);
	this.setLimit('volumeHeightAbove', voice);
	this.setLimit('dynamicHeightAbove', voice);
	this.setLimit('endingHeightAbove', voice);
	this.setLimit('chordHeightAbove', voice);
	this.setLimit('lyricHeightAbove', voice);
	this.setLimit('lyricHeightBelow', voice);
	this.setLimit('chordHeightBelow', voice);
	this.setLimit('volumeHeightBelow', voice);
	this.setLimit('dynamicHeightBelow', voice);
};

StaffGroupElement.prototype.setUpperAndLowerElements = function (renderer) {
	// Each staff already has the top and bottom set, now we see if there are elements that are always on top and bottom, and resolve their pitch.
	// Also, get the overall height of all the staves in this group.
	var lastStaffBottom;
	for (var i = 0; i < this.staffs.length; i++) {
		var staff = this.staffs[i];
		// the vertical order of elements that are above is: tempo, part, volume/dynamic, ending/chord, lyric
		// the vertical order of elements that are below is: lyric, chord, volume/dynamic
		var positionY = {
			tempoHeightAbove: 0,
			partHeightAbove: 0,
			volumeHeightAbove: 0,
			dynamicHeightAbove: 0,
			endingHeightAbove: 0,
			chordHeightAbove: 0,
			lyricHeightAbove: 0,

			lyricHeightBelow: 0,
			chordHeightBelow: 0,
			volumeHeightBelow: 0,
			dynamicHeightBelow: 0
		};

		if ( /*ABCJS.write.debugPlacement*/false) {
			staff.originalTop = staff.top; // This is just being stored for debugging purposes.
			staff.originalBottom = staff.bottom; // This is just being stored for debugging purposes.
		}

		if (staff.specialY.lyricHeightAbove) {
			staff.top += staff.specialY.lyricHeightAbove;positionY.lyricHeightAbove = staff.top;
		}
		if (staff.specialY.chordHeightAbove) {
			staff.top += staff.specialY.chordHeightAbove;positionY.chordHeightAbove = staff.top;
		}
		if (staff.specialY.endingHeightAbove) {
			if (staff.specialY.chordHeightAbove) staff.top += 2;else staff.top += staff.specialY.endingHeightAbove;
			positionY.endingHeightAbove = staff.top;
		}
		if (staff.specialY.dynamicHeightAbove && staff.specialY.volumeHeightAbove) {
			staff.top += Math.max(staff.specialY.dynamicHeightAbove, staff.specialY.volumeHeightAbove);
			positionY.dynamicHeightAbove = staff.top;
			positionY.volumeHeightAbove = staff.top;
		} else if (staff.specialY.dynamicHeightAbove) {
			staff.top += staff.specialY.dynamicHeightAbove;positionY.dynamicHeightAbove = staff.top;
		} else if (staff.specialY.volumeHeightAbove) {
			staff.top += staff.specialY.volumeHeightAbove;positionY.volumeHeightAbove = staff.top;
		}
		if (staff.specialY.partHeightAbove) {
			staff.top += staff.specialY.partHeightAbove;positionY.partHeightAbove = staff.top;
		}
		if (staff.specialY.tempoHeightAbove) {
			staff.top += staff.specialY.tempoHeightAbove;positionY.tempoHeightAbove = staff.top;
		}

		if (staff.specialY.lyricHeightBelow) {
			positionY.lyricHeightBelow = staff.bottom;staff.bottom -= staff.specialY.lyricHeightBelow;
		}
		if (staff.specialY.chordHeightBelow) {
			positionY.chordHeightBelow = staff.bottom;staff.bottom -= staff.specialY.chordHeightBelow;
		}
		if (staff.specialY.volumeHeightBelow && staff.specialY.dynamicHeightBelow) {
			positionY.volumeHeightBelow = staff.bottom;
			positionY.dynamicHeightBelow = staff.bottom;
			staff.bottom -= Math.max(staff.specialY.volumeHeightBelow, staff.specialY.dynamicHeightBelow);
		} else if (staff.specialY.volumeHeightBelow) {
			positionY.volumeHeightBelow = staff.bottom;staff.bottom -= staff.specialY.volumeHeightBelow;
		} else if (staff.specialY.dynamicHeightBelow) {
			positionY.dynamicHeightBelow = staff.bottom;staff.bottom -= staff.specialY.dynamicHeightBelow;
		}

		if ( /*ABCJS.write.debugPlacement*/false) staff.positionY = positionY; // This is just being stored for debugging purposes.

		for (var j = 0; j < staff.voices.length; j++) {
			var voice = this.voices[staff.voices[j]];
			voice.setUpperAndLowerElements(positionY);
		}
		// We might need a little space in between staves if the staves haven't been pushed far enough apart by notes or extra vertical stuff.
		// Only try to put in extra space if this isn't the top staff.
		if (lastStaffBottom !== undefined) {
			var thisStaffTop = staff.top - 10;
			var forcedSpacingBetween = lastStaffBottom + thisStaffTop;
			var minSpacingInPitches = renderer.spacing.systemStaffSeparation / spacing.STEP;
			var addedSpace = minSpacingInPitches - forcedSpacingBetween;
			if (addedSpace > 0) staff.top += addedSpace;
		}
		lastStaffBottom = 2 - staff.bottom; // the staff starts at position 2 and the bottom variable is negative. Therefore to find out how large the bottom is, we reverse the sign of the bottom, and add the 2 in.

		// Now we need a little margin on the top, so we'll just throw that in.
		//staff.top += 4;
		//console.log("Staff Y: ",i,heightInPitches,staff.top,staff.bottom);
	}
	//console.log("Staff Height: ",heightInPitches,this.height);
};

StaffGroupElement.prototype.finished = function () {
	for (var i = 0; i < this.voices.length; i++) {
		if (!this.voices[i].layoutEnded()) return false;
	}
	return true;
};

function getLeftEdgeOfStaff(renderer, voices, brace) {
	var x = renderer.padding.left;

	// find out how much space will be taken up by voice headers
	var voiceheaderw = 0;
	for (var i = 0; i < voices.length; i++) {
		if (voices[i].header) {
			var size = renderer.getTextSize(voices[i].header, 'voicefont', '');
			voiceheaderw = Math.max(voiceheaderw, size.width);
		}
	}
	if (voiceheaderw) {
		// Give enough spacing to the right - we use the width of an A for the amount of spacing.
		var sizeW = renderer.getTextSize("A", 'voicefont', '');
		voiceheaderw += sizeW.width;
	}
	x += voiceheaderw;

	if (brace) {
		brace.setLocation(x);
		x += brace.getWidth();
	}
	return x;
}

StaffGroupElement.prototype.layout = function (spacing, renderer, debug) {
	var epsilon = 0.0000001; // Fudging for inexactness of floating point math.
	this.spacingunits = 0; // number of times we will have ended up using the spacing distance (as opposed to fixed width distances)
	this.minspace = 1000; // a big number to start off with - used to find out what the smallest space between two notes is -- GD 2014.1.7

	var x = getLeftEdgeOfStaff(renderer, this.voices, this.brace);
	this.startx = x;
	var i;

	var currentduration = 0;
	if (debug) console.log("init layout", spacing);
	for (i = 0; i < this.voices.length; i++) {
		this.voices[i].beginLayout(x);
	}

	var spacingunit = 0; // number of spacingunits coming from the previously laid out element to this one
	while (!this.finished()) {
		// find first duration level to be laid out among candidates across voices
		currentduration = null; // candidate smallest duration level
		for (i = 0; i < this.voices.length; i++) {
			if (!this.voices[i].layoutEnded() && (!currentduration || this.voices[i].getDurationIndex() < currentduration)) currentduration = this.voices[i].getDurationIndex();
		}

		// isolate voices at current duration level
		var currentvoices = [];
		var othervoices = [];
		for (i = 0; i < this.voices.length; i++) {
			var durationIndex = this.voices[i].getDurationIndex();
			// PER: Because of the inexactness of JS floating point math, we just get close.
			if (durationIndex - currentduration > epsilon) {
				othervoices.push(this.voices[i]);
				//console.log("out: voice ",i);
			} else {
				currentvoices.push(this.voices[i]);
				//if (debug) console.log("in: voice ",i);
			}
		}

		// among the current duration level find the one which needs starting furthest right
		spacingunit = 0; // number of spacingunits coming from the previously laid out element to this one
		var spacingduration = 0;
		for (i = 0; i < currentvoices.length; i++) {
			//console.log("greatest spacing unit", x, currentvoices[i].getNextX(), currentvoices[i].getSpacingUnits(), currentvoices[i].spacingduration);
			if (currentvoices[i].getNextX() > x) {
				x = currentvoices[i].getNextX();
				spacingunit = currentvoices[i].getSpacingUnits();
				spacingduration = currentvoices[i].spacingduration;
			}
		}
		//console.log("new spacingunit", spacingunit, this.spacingunits, "="+(spacingunit+ this.spacingunits));
		this.spacingunits += spacingunit;
		this.minspace = Math.min(this.minspace, spacingunit);
		if (debug) console.log("currentduration: ", currentduration, this.spacingunits, this.minspace);

		for (i = 0; i < currentvoices.length; i++) {
			var voicechildx = currentvoices[i].layoutOneItem(x, spacing);
			var dx = voicechildx - x;
			if (dx > 0) {
				x = voicechildx; //update x
				for (var j = 0; j < i; j++) {
					// shift over all previously laid out elements
					currentvoices[j].shiftRight(dx);
				}
			}
		}

		// remove the value of already counted spacing units in other voices (e.g. if a voice had planned to use up 5 spacing units but is not in line to be laid out at this duration level - where we've used 2 spacing units - then we must use up 3 spacing units, not 5)
		for (i = 0; i < othervoices.length; i++) {
			othervoices[i].spacingduration -= spacingduration;
			othervoices[i].updateNextX(x, spacing); // adjust other voices expectations
		}

		// update indexes of currently laid out elems
		for (i = 0; i < currentvoices.length; i++) {
			var voice = currentvoices[i];
			voice.updateIndices();
		}
	} // finished laying out


	// find the greatest remaining x as a base for the width
	for (i = 0; i < this.voices.length; i++) {
		if (this.voices[i].getNextX() > x) {
			x = this.voices[i].getNextX();
			spacingunit = this.voices[i].getSpacingUnits();
		}
	}
	//console.log("greatest remaining",spacingunit,x);
	this.spacingunits += spacingunit;
	this.w = x;

	for (i = 0; i < this.voices.length; i++) {
		this.voices[i].w = this.w;
	}
};

StaffGroupElement.prototype.calcHeight = function () {
	// the height is calculated here in a parallel way to the drawing below in hopes that both of these functions will be modified together.
	// TODO-PER: also add the space between staves. (That's systemStaffSeparation, which is the minimum distance between the staff LINES.)
	var height = 0;
	for (var i = 0; i < this.voices.length; i++) {
		var staff = this.voices[i].staff;
		if (!this.voices[i].duplicate) {
			height += staff.top;
			if (staff.bottom < 0) height += -staff.bottom;
		}
	}
	return height;
};

StaffGroupElement.prototype.draw = function (renderer) {
	// We enter this method with renderer.y pointing to the topmost coordinate that we're allowed to draw.
	// All of the children that will be drawn have a relative "pitch" set, where zero is the first ledger line below the staff.
	// renderer.y will be offset at the beginning of each staff by the amount required to make the relative pitch work.
	// If there are multiple staves, then renderer.y will be incremented for each new staff.

	var debugPrint;
	var colorIndex;
	if ( /*ABCJS.write.debugPlacement*/false) {
		var colors = ["rgb(207,27,36)", "rgb(168,214,80)", "rgb(110,161,224)", "rgb(191,119,218)", "rgb(195,30,151)", "rgb(31,170,177)", "rgb(220,166,142)"];
		debugPrint = function debugPrint(staff, key) {
			if (staff.positionY[key]) {
				//renderer.printHorizontalLine(50, renderer.calcY(staff.positionY[key]), key.substr(0, 4) + " " + Math.round(staff.positionY[key]));
				var height = staff.specialY[key] * spacing.STEP;
				renderer.printShadedBox(renderer.padding.left, renderer.calcY(staff.positionY[key]), renderer.controller.width, height, colors[colorIndex], 0.4, key.substr(0, 4));
				colorIndex += 1;if (colorIndex > 6) colorIndex = 0;
			}
		};
	}

	// An invisible marker is useful to be able to find where each system starts.
	renderer.addInvisibleMarker("abcjs-top-of-system");

	var startY = renderer.y; // So that it can be restored after we're done.
	// Set the absolute Y position for each staff here, so the voice drawing below can just use if.
	for (var j = 0; j < this.staffs.length; j++) {
		var staff1 = this.staffs[j];
		//renderer.printHorizontalLine(50, renderer.y, "start");
		renderer.moveY(spacing.STEP, staff1.top);
		staff1.absoluteY = renderer.y;
		if ( /*ABCJS.write.debugPlacement*/false) {
			colorIndex = 0;
			renderer.printShadedBox(renderer.padding.left, renderer.calcY(staff1.originalTop), renderer.controller.width, renderer.calcY(staff1.originalBottom) - renderer.calcY(staff1.originalTop), "#000000", 0.1);
			debugPrint(staff1, 'chordHeightAbove');
			debugPrint(staff1, 'chordHeightBelow');
			debugPrint(staff1, 'dynamicHeightAbove');
			debugPrint(staff1, 'dynamicHeightBelow');
			debugPrint(staff1, 'endingHeightAbove');
			debugPrint(staff1, 'lyricHeightAbove');
			debugPrint(staff1, 'lyricHeightBelow');
			debugPrint(staff1, 'partHeightAbove');
			debugPrint(staff1, 'tempoHeightAbove');
			debugPrint(staff1, 'volumeHeightAbove');
			debugPrint(staff1, 'volumeHeightBelow');
		}
		if (staff1.bottom < 0) renderer.moveY(spacing.STEP, -staff1.bottom);
	}
	var topLine; // these are to connect multiple staves. We need to remember where they are.
	var bottomLine;

	var bartop = 0;
	renderer.measureNumber = null;
	renderer.noteNumber = null;
	for (var i = 0; i < this.voices.length; i++) {
		var staff = this.voices[i].staff;
		renderer.y = staff.absoluteY;
		renderer.voiceNumber = i;
		//renderer.y = staff.y;
		// offset for starting the counting at middle C
		if (!this.voices[i].duplicate) {
			//			renderer.moveY(spacing.STEP, staff.top);
			if (!topLine) topLine = renderer.calcY(10);
			bottomLine = renderer.calcY(2);
			if (staff.lines !== 0) {
				renderer.measureNumber = null;
				renderer.noteNumber = null;
				renderer.printStave(this.startx, this.w, staff.lines);
			}
		}
		this.voices[i].draw(renderer, bartop);
		renderer.measureNumber = null;
		renderer.noteNumber = null;
		if (!this.voices[i].duplicate) {
			bartop = renderer.calcY(2); // This connects the bar lines between two different staves.
			//			if (staff.bottom < 0)
			//				renderer.moveY(spacing.STEP, -staff.bottom);
		}
		if (this.brace) {
			//Tony
			if (i === this.brace.length - 1) {
				if (this.brace) {
					this.brace.draw(renderer, topLine, bottomLine); //tony
				}
			}
		}
	}
	renderer.measureNumber = null;
	renderer.noteNumber = null;

	// connect all the staves together with a vertical line
	if (this.staffs.length > 1) {
		renderer.printStem(this.startx, 0.6, topLine, bottomLine);
	}
	renderer.y = startY;
};

module.exports = StaffGroupElement;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_tempo_element.js: Definition of the TempoElement class.
//    Copyright (C) 2014-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var AbsoluteElement = __webpack_require__(4);
var RelativeElement = __webpack_require__(2);

var TempoElement;
(function () {
	"use strict";

	var totalHeightInPitches = 5;

	TempoElement = function TempoElement(tempo, tuneNumber) {
		this.tempo = tempo;
		this.tuneNumber = tuneNumber;
		this.tempoHeightAbove = totalHeightInPitches;
		this.pitch = undefined; // This will be set later
	};

	TempoElement.prototype.setUpperAndLowerElements = function (positionY) {
		// TODO-PER: This might not be called.
		this.pitch = positionY.tempoHeightAbove;
		this.top = positionY.tempoHeightAbove;
		this.bottom = positionY.tempoHeightAbove;
	};

	TempoElement.prototype.setX = function (x) {
		this.x = x;
	};

	TempoElement.prototype.draw = function (renderer) {
		var x = this.x;
		if (this.pitch === undefined) window.console.error("Tempo Element y-coordinate not set.");

		var y = renderer.calcY(this.pitch);
		var text;
		if (this.tempo.preString) {
			text = renderer.renderText(x, y, this.tempo.preString, 'tempofont', 'tempo', "start");
			var preWidth = text.getBBox().width;
			var charWidth = preWidth / this.tempo.preString.length; // Just get some average number to increase the spacing.
			x += preWidth + charWidth;
		}
		if (this.tempo.duration && !this.tempo.suppressBpm) {
			var temposcale = 0.75;
			var tempopitch = this.pitch - totalHeightInPitches + 1; // The pitch we receive is the top of the allotted area: change that to practically the bottom.
			var duration = this.tempo.duration[0]; // TODO when multiple durations
			var abselem = new AbsoluteElement(this.tempo, duration, 1, 'tempo', this.tuneNumber);
			// There aren't an infinite number of note values, but we are passed a float, so just in case something is off upstream,
			// merge all of the in between points.
			var dot;
			var flag;
			var note;
			if (duration <= 1 / 32) {
				note = "noteheads.quarter";flag = "flags.u32nd";dot = 0;
			} else if (duration <= 1 / 16) {
				note = "noteheads.quarter";flag = "flags.u16th";dot = 0;
			} else if (duration <= 3 / 32) {
				note = "noteheads.quarter";flag = "flags.u16nd";dot = 1;
			} else if (duration <= 1 / 8) {
				note = "noteheads.quarter";flag = "flags.u8th";dot = 0;
			} else if (duration <= 3 / 16) {
				note = "noteheads.quarter";flag = "flags.u8th";dot = 1;
			} else if (duration <= 1 / 4) {
				note = "noteheads.quarter";dot = 0;
			} else if (duration <= 3 / 8) {
				note = "noteheads.quarter";dot = 1;
			} else if (duration <= 1 / 2) {
				note = "noteheads.half";dot = 0;
			} else if (duration <= 3 / 4) {
				note = "noteheads.half";dot = 1;
			} else if (duration <= 1) {
				note = "noteheads.whole";dot = 0;
			} else if (duration <= 1.5) {
				note = "noteheads.whole";dot = 1;
			} else if (duration <= 2) {
				note = "noteheads.dbl";dot = 0;
			} else {
				note = "noteheads.dbl";dot = 1;
			}

			// TODO-PER: the following had a bug in it when there are dotted notes - so the above code brute forces it.
			// var durlog = Math.floor(Math.log(duration) / Math.log(2));
			// var dot = 0;
			// for (var tot = Math.pow(2, durlog), inc = tot / 2; tot < duration; dot++, tot += inc, inc /= 2);
			// var note = renderer.engraver.chartable.note[-durlog];
			// var flag = renderer.engraver.chartable.uflags[-durlog];
			var temponote = renderer.engraver.createNoteHead(abselem, // TODO-PER: This seems late to be creating this element. Shouldn't it happen before draw?
			note, { verticalPos: tempopitch }, "up", 0, 0, flag, dot, 0, temposcale);
			abselem.addHead(temponote);
			var stem;
			if (note !== "noteheads.whole" && note !== "noteheads.dbl") {
				var p1 = tempopitch + 1 / 3 * temposcale;
				var p2 = tempopitch + 7 * temposcale;
				var dx = temponote.dx + temponote.w;
				var width = -0.6;
				stem = new RelativeElement(null, dx, 0, p1, { "type": "stem", "pitch2": p2, linewidth: width });
				stem.setX(x);
				abselem.addExtra(stem);
			}
			abselem.setX(x);
			for (var i = 0; i < abselem.children.length; i++) {
				abselem.children[i].draw(renderer, x);
			}x += abselem.w + 5;
			var str = "= " + this.tempo.bpm;
			text = renderer.renderText(x, y, str, 'tempofont', 'tempo', "start");
			var postWidth = text.getBBox().width;
			var charWidth2 = postWidth / str.length; // Just get some average number to increase the spacing.
			x += postWidth + charWidth2;
		}
		if (this.tempo.postString) {
			renderer.renderText(x, y, this.tempo.postString, 'tempofont', 'tempo', "start");
		}
	};
})();

module.exports = TempoElement;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_triplet_element.js: Definition of the TripletElem class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var sprintf = __webpack_require__(6);

var TripletElem;

(function () {
	"use strict";

	TripletElem = function TripletElem(number, anchor1) {
		this.anchor1 = anchor1; // must have a .x and a .parent property or be null (means starts at the "beginning" of the line - after key signature)
		this.number = number;
		this.duration = ('' + anchor1.parent.durationClass).replace(/\./, '-');
	};

	TripletElem.prototype.isClosed = function () {
		return this.anchor2;
	};

	TripletElem.prototype.setCloseAnchor = function (anchor2) {
		this.anchor2 = anchor2;
		// TODO-PER: Unfortunately, I don't know if there is a beam above until after the vertical positioning is done,
		// so I don't know whether to leave room for the number above. Therefore, If there is a beam on the first note, I'll leave room just in case.
		if (this.anchor1.parent.beam) this.endingHeightAbove = 4;
	};

	TripletElem.prototype.setUpperAndLowerElements = function () /*positionY*/{};

	TripletElem.prototype.layout = function () {
		// TODO end and beginning of line (PER: P.S. I'm not sure this can happen: I think the parser will always specify both the start and end points.)
		if (this.anchor1 && this.anchor2) {
			this.hasBeam = this.anchor1.parent.beam && this.anchor1.parent.beam === this.anchor2.parent.beam;

			if (this.hasBeam) {
				// If there is a beam then we don't need to draw anything except the text. The beam could either be above or below.
				var beam = this.anchor1.parent.beam;
				var left = beam.isAbove() ? this.anchor1.x + this.anchor1.w : this.anchor1.x;
				this.yTextPos = beam.heightAtMidpoint(left, this.anchor2.x);
				this.yTextPos += beam.isAbove() ? 4 : -4; // This creates some space between the beam and the number.
				if (beam.isAbove()) this.endingHeightAbove = 4;
			} else {
				// If there isn't a beam, then we need to draw the bracket and the text. The bracket is always above.
				// The bracket is never lower than the 'a' line, but is 4 pitches above the first and last notes. If there is
				// a tall note in the middle, the bracket is horizontal and above the highest note.
				this.startNote = Math.max(this.anchor1.parent.top, 9) + 4;
				this.endNote = Math.max(this.anchor2.parent.top, 9) + 4;
				// TODO-PER: Do the case where the middle note is really high.
				this.yTextPos = this.startNote + (this.endNote - this.startNote) / 2;
			}
		}
	};

	TripletElem.prototype.draw = function (renderer) {
		var xTextPos;
		if (this.hasBeam) {
			var left = this.anchor1.parent.beam.isAbove() ? this.anchor1.x + this.anchor1.w : this.anchor1.x;
			xTextPos = this.anchor1.parent.beam.xAtMidpoint(left, this.anchor2.x);
		} else {
			xTextPos = this.anchor1.x + (this.anchor2.x + this.anchor2.w - this.anchor1.x) / 2;
			drawBracket(renderer, this.anchor1.x, this.startNote, this.anchor2.x + this.anchor2.w, this.endNote, this.duration);
		}
		renderer.renderText(xTextPos, renderer.calcY(this.yTextPos), "" + this.number, 'tripletfont', renderer.addClasses('triplet d' + this.duration), "middle", true);
	};

	function drawLine(renderer, l, t, r, b, duration) {
		var pathString = sprintf("M %f %f L %f %f", l, t, r, b);
		renderer.printPath({ path: pathString, stroke: "#000000", 'class': renderer.addClasses('triplet d' + duration) });
	}

	function drawBracket(renderer, x1, y1, x2, y2, duration) {
		y1 = renderer.calcY(y1);
		y2 = renderer.calcY(y2);
		var bracketHeight = 5;

		// Draw vertical lines at the beginning and end
		drawLine(renderer, x1, y1, x1, y1 + bracketHeight, duration);
		drawLine(renderer, x2, y2, x2, y2 + bracketHeight, duration);

		// figure out midpoints to draw the broken line.
		var midX = x1 + (x2 - x1) / 2;
		//var midY = y1 + (y2-y1)/2;
		var gapWidth = 8;
		var slope = (y2 - y1) / (x2 - x1);
		var leftEndX = midX - gapWidth;
		var leftEndY = y1 + (leftEndX - x1) * slope;
		drawLine(renderer, x1, y1, leftEndX, leftEndY, duration);
		var rightStartX = midX + gapWidth;
		var rightStartY = y1 + (rightStartX - x1) * slope;
		drawLine(renderer, rightStartX, rightStartY, x2, y2, duration);
	}
})();

module.exports = TripletElem;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_voice_element.js: Definition of the VoiceElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var parseCommon = __webpack_require__(0);

var VoiceElement = function VoiceElement(voicenumber, voicetotal) {
	this.children = [];
	this.beams = [];
	this.otherchildren = []; // ties, slurs, triplets
	this.w = 0;
	this.duplicate = false;
	this.voicenumber = voicenumber; //number of the voice on a given stave (not staffgroup)
	this.voicetotal = voicetotal;
	this.bottom = 7;
	this.top = 7;
	this.specialY = {
		tempoHeightAbove: 0,
		partHeightAbove: 0,
		volumeHeightAbove: 0,
		dynamicHeightAbove: 0,
		endingHeightAbove: 0,
		chordHeightAbove: 0,
		lyricHeightAbove: 0,

		lyricHeightBelow: 0,
		chordHeightBelow: 0,
		volumeHeightBelow: 0,
		dynamicHeightBelow: 0
	};
};

VoiceElement.prototype.addChild = function (child) {
	if (child.type === 'bar') {
		var firstItem = true;
		for (var i = 0; firstItem && i < this.children.length; i++) {
			if (this.children[i].type !== "staff-extra") firstItem = false;
		}
		if (!firstItem) {
			this.beams.push("bar");
			this.otherchildren.push("bar");
		}
	}
	this.children[this.children.length] = child;
	this.setRange(child);
};

VoiceElement.prototype.setLimit = function (member, child) {
	// Sometimes we get an absolute element in here and sometimes we get some type of relative element.
	// If there is a "specialY" element, then assume it is an absolute element. If that doesn't exist, look for the
	// same members at the top level, because that's where they are in relative elements.
	var specialY = child.specialY;
	if (!specialY) specialY = child;
	if (!specialY[member]) return;
	if (!this.specialY[member]) this.specialY[member] = specialY[member];else this.specialY[member] = Math.max(this.specialY[member], specialY[member]);
};

VoiceElement.prototype.moveDecorations = function (beam) {
	var padding = 1.5; // This is the vertical padding between elements, in pitches.
	for (var ch = 0; ch < beam.elems.length; ch++) {
		var child = beam.elems[ch];
		if (child.top) {
			// We now know where the ornaments should have been placed, so move them if they would overlap.
			var top = beam.yAtNote(child);
			for (var i = 0; i < child.children.length; i++) {
				var el = child.children[i];
				if (el.klass === 'ornament') {
					if (el.bottom - padding < top) {
						var distance = top - el.bottom + padding; // Find the distance that it needs to move and add a little margin so the element doesn't touch the beam.
						el.bottom += distance;
						el.top += distance;
						el.pitch += distance;
						top = child.top = el.top;
					}
				}
			}
		}
	}
};

VoiceElement.prototype.adjustRange = function (child) {
	if (child.bottom !== undefined) this.bottom = Math.min(this.bottom, child.bottom);
	if (child.top !== undefined) this.top = Math.max(this.top, child.top);
};

VoiceElement.prototype.setRange = function (child) {
	this.adjustRange(child);
	this.setLimit('tempoHeightAbove', child);
	this.setLimit('partHeightAbove', child);
	this.setLimit('volumeHeightAbove', child);
	this.setLimit('dynamicHeightAbove', child);
	this.setLimit('endingHeightAbove', child);
	this.setLimit('chordHeightAbove', child);
	this.setLimit('lyricHeightAbove', child);
	this.setLimit('lyricHeightBelow', child);
	this.setLimit('chordHeightBelow', child);
	this.setLimit('volumeHeightBelow', child);
	this.setLimit('dynamicHeightBelow', child);
};

VoiceElement.prototype.setUpperAndLowerElements = function (positionY) {
	var i;
	for (i = 0; i < this.children.length; i++) {
		var abselem = this.children[i];
		abselem.setUpperAndLowerElements(positionY);
	}
	for (i = 0; i < this.otherchildren.length; i++) {
		var abselem = this.otherchildren[i];
		if (typeof abselem !== 'string') abselem.setUpperAndLowerElements(positionY);
	}
};

VoiceElement.prototype.addOther = function (child) {
	this.otherchildren.push(child);
	this.setRange(child);
};

VoiceElement.prototype.addBeam = function (child) {
	this.beams.push(child);
};

VoiceElement.prototype.updateIndices = function () {
	if (!this.layoutEnded()) {
		this.durationindex += this.children[this.i].duration;
		if (this.children[this.i].duration === 0) this.durationindex = Math.round(this.durationindex * 64) / 64; // everytime we meet a barline, do rounding to nearest 64th
		this.i++;
	}
};

VoiceElement.prototype.layoutEnded = function () {
	return this.i >= this.children.length;
};

VoiceElement.prototype.getDurationIndex = function () {
	return this.durationindex - (this.children[this.i] && this.children[this.i].duration > 0 ? 0 : 0.0000005); // if the ith element doesn't have a duration (is not a note), its duration index is fractionally before. This enables CLEF KEYSIG TIMESIG PART, etc. to be laid out before we get to the first note of other voices
};

// number of spacing units expected for next positioning
VoiceElement.prototype.getSpacingUnits = function () {
	return Math.sqrt(this.spacingduration * 8);
	// TODO-PER: On short lines, this would never trigger, so the spacing was wrong. I just changed this line empirically, though, so I don't know if there are other ramifications.
	//return (this.minx<this.nextx) ? Math.sqrt(this.spacingduration*8) : 0; // we haven't used any spacing units if we end up using minx
};

//
VoiceElement.prototype.getNextX = function () {
	return Math.max(this.minx, this.nextx);
};

VoiceElement.prototype.beginLayout = function (startx) {
	this.i = 0;
	this.durationindex = 0;
	//this.ii=this.children.length;
	this.startx = startx;
	this.minx = startx; // furthest left to where negatively positioned elements are allowed to go
	this.nextx = startx; // x position where the next element of this voice should be placed assuming no other voices and no fixed width constraints
	this.spacingduration = 0; // duration left to be laid out in current iteration (omitting additional spacing due to other aspects, such as bars, dots, sharps and flats)
};

// Try to layout the element at index this.i
// x - position to try to layout the element at
// spacing - base spacing
// can't call this function more than once per iteration
VoiceElement.prototype.layoutOneItem = function (x, spacing) {
	var child = this.children[this.i];
	if (!child) return 0;
	var er = x - this.minx; // available extrawidth to the left
	if (er < child.getExtraWidth()) {
		// shift right by needed amount
		x += child.getExtraWidth() - er;
	}
	child.setX(x);

	this.spacingduration = child.duration;
	//update minx
	this.minx = x + child.getMinWidth(); // add necessary layout space
	if (this.i !== this.children.length - 1) this.minx += child.minspacing; // add minimumspacing except on last elem

	this.updateNextX(x, spacing);

	// contribute to staff y position
	//this.staff.top = Math.max(child.top,this.staff.top);
	//this.staff.bottom = Math.min(child.bottom,this.staff.bottom);

	return x; // where we end up having placed the child
};

// call when spacingduration has been updated
VoiceElement.prototype.updateNextX = function (x, spacing) {
	this.nextx = x + spacing * Math.sqrt(this.spacingduration * 8);
};

VoiceElement.prototype.shiftRight = function (dx) {
	var child = this.children[this.i];
	if (!child) return;
	child.setX(child.x + dx);
	this.minx += dx;
	this.nextx += dx;
};

function isNonSpacerRest(elem) {
	if (elem.type !== 'rest') return false;
	if (elem.abcelem && elem.abcelem.rest && elem.abcelem.rest.type !== 'spacer') return true;
	return false;
}
VoiceElement.prototype.draw = function (renderer, bartop) {
	var width = this.w - 1;
	renderer.staffbottom = this.staff.bottom;
	//this.barbottom = renderer.calcY(2);

	renderer.measureNumber = null;
	renderer.noteNumber = null;
	if (this.header) {
		// print voice name
		var textpitch = 14 - (this.voicenumber + 1) * (12 / (this.voicetotal + 1));
		renderer.renderText(renderer.padding.left, renderer.calcY(textpitch), this.header, 'voicefont', 'staff-extra voice-name', 'start');
	}

	for (var i = 0, ii = this.children.length; i < ii; i++) {
		var child = this.children[i];
		var justInitializedMeasureNumber = false;
		if (child.type !== 'staff-extra' && renderer.measureNumber === null) {
			renderer.measureNumber = 0;
			renderer.noteNumber = 0;
			justInitializedMeasureNumber = true;
		}
		child.draw(renderer, this.barto || i === ii - 1 ? bartop : 0);
		if (child.type === 'note' || isNonSpacerRest(child)) renderer.noteNumber++;
		if (child.type === 'bar' && !justInitializedMeasureNumber) {
			renderer.measureNumber++;
			renderer.noteNumber = 0;
		}
	}

	renderer.measureNumber = 0;
	renderer.noteNumber = 0;
	parseCommon.each(this.beams, function (beam) {
		if (beam === 'bar') {
			renderer.measureNumber++;
			renderer.noteNumber = 0;
		} else beam.draw(renderer); // beams must be drawn first for proper printing of triplets, slurs and ties.
	});

	renderer.measureNumber = 0;
	renderer.noteNumber = 0;
	var self = this;
	parseCommon.each(this.otherchildren, function (child) {
		if (child === 'bar') {
			renderer.measureNumber++;
			renderer.noteNumber = 0;
		} else child.draw(renderer, self.startx + 10, width);
	});
};

VoiceElement.prototype.layoutBeams = function () {
	for (var i = 0; i < this.beams.length; i++) {
		if (this.beams[i].layout) {
			this.beams[i].layout();
			this.moveDecorations(this.beams[i]);
			// The above will change the top and bottom of the abselem children, so see if we need to expand our range.
			for (var j = 0; j < this.beams[i].elems.length; j++) {
				this.adjustRange(this.beams[i].elems[j]);
			}
		}
	}
	// Now we can layout the triplets
	for (i = 0; i < this.otherchildren.length; i++) {
		var child = this.otherchildren[i];
		if (child.layout) child.layout();
	}
	this.staff.top = Math.max(this.staff.top, this.top);
	this.staff.bottom = Math.min(this.staff.bottom, this.bottom);
};

module.exports = VoiceElement;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_renderer.js: API to render to SVG/Raphael/whatever rendering engine
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


/*global Math, console */

var glyphs = __webpack_require__(3);
var spacing = __webpack_require__(1);
var sprintf = __webpack_require__(6);
var Svg = __webpack_require__(38);

/**
 * Implements the API for rendering ABCJS Abstract Rendering Structure to a canvas/paper (e.g. SVG, Raphael, etc)
 * @param {Object} paper
 * @param {bool} doRegression
 */
var Renderer = function Renderer(paper, doRegression, shouldAddClasses) {
	this.paper = new Svg(paper);
	this.controller = null; //TODO-GD only used when drawing the ABCJS ARS to connect the controller with the elements for highlighting

	this.space = 3 * spacing.SPACE;
	this.padding = {}; // renderer's padding is managed by the controller
	this.doRegression = doRegression;
	this.shouldAddClasses = shouldAddClasses;
	if (this.doRegression) this.regressionLines = [];
	this.reset();
};

Renderer.prototype.reset = function () {

	this.paper.clear();
	this.y = 0;
	this.abctune = null;
	this.lastM = null;
	this.ingroup = false;
	this.path = null;
	this.isPrint = false;
	this.initVerticalSpace();
	if (this.doRegression) this.regressionLines = [];
	// HACK-PER: There was a problem in Raphael where every path string that was sent to it was cached.
	// That was causing the browser's memory to steadily grow until the browser went slower and slower until
	// it crashed. The fix to that was a patch to Raphael, so it is only patched on the versions of this library that
	// bundle Raphael with it. Also, if Raphael gets an update, then that patch will be lost. On version 2.1.2 of Raphael,
	// the patch is on line 1542 and 1545 and it is:
	//             p[ps].sleep = 1;
};

Renderer.prototype.createElemSet = function () {
	return this.paper.openGroup();
};

Renderer.prototype.closeElemSet = function () {
	return this.paper.closeGroup();
};

/**
 * Set whether we are formatting this for the screen, or as a preview for creating a PDF version.
 * @param {bool} isPrint
 */
Renderer.prototype.setPrintMode = function (isPrint) {
	this.isPrint = isPrint;
};

/**
 * Set the size of the canvas.
 * @param {object} maxwidth
 * @param {object} scale
 */
Renderer.prototype.setPaperSize = function (maxwidth, scale, responsive) {
	var w = (maxwidth + this.padding.right) * scale;
	var h = (this.y + this.padding.bottom) * scale;
	if (this.isPrint) h = Math.max(h, 1056); // 11in x 72pt/in x 1.33px/pt
	// TODO-PER: We are letting the page get as long as it needs now, but eventually that should go to a second page.
	if (this.doRegression) this.regressionLines.push("PAPER SIZE: (" + w + "," + h + ")");

	// for accessibility
	var text = "Sheet Music";
	if (this.abctune && this.abctune.metaText && this.abctune.metaText.title) text += " for \"" + this.abctune.metaText.title + '"';
	this.paper.setTitle(text);

	var parentStyles = { overflow: "hidden" };
	if (responsive === 'resize') {
		this.paper.setResponsiveWidth(w, h);
	} else {
		parentStyles.width = "";
		parentStyles.height = h + "px";
		if (scale < 1) {
			parentStyles.width = w + "px";
			this.paper.setSize(w / scale, h / scale);
		} else this.paper.setSize(w, h);
	}
	this.paper.setScale(scale);
	this.paper.setParentStyles(parentStyles);
};

/**
 * Set the padding
 * @param {object} params
 */
Renderer.prototype.setPaddingOverride = function (params) {
	this.paddingOverride = { top: params.paddingtop, bottom: params.paddingbottom,
		right: params.paddingright, left: params.paddingleft };
};

/**
 * Set the padding
 * @param {object} params
 */
Renderer.prototype.setPadding = function (abctune) {
	// If the padding is set in the tune, then use that.
	// Otherwise, if the padding is set in the override, use that.
	// Otherwise, use the defaults (there are a different set of defaults for screen and print.)
	function setPaddingVariable(self, paddingKey, formattingKey, printDefault, screenDefault) {
		if (abctune.formatting[formattingKey] !== undefined) self.padding[paddingKey] = abctune.formatting[formattingKey];else if (self.paddingOverride[paddingKey] !== undefined) self.padding[paddingKey] = self.paddingOverride[paddingKey];else if (self.isPrint) self.padding[paddingKey] = printDefault;else self.padding[paddingKey] = screenDefault;
	}
	// 1cm x 0.393701in/cm x 72pt/in x 1.33px/pt = 38px
	// 1.8cm x 0.393701in/cm x 72pt/in x 1.33px/pt = 68px
	setPaddingVariable(this, 'top', 'topmargin', 38, 15);
	setPaddingVariable(this, 'bottom', 'botmargin', 38, 15);
	setPaddingVariable(this, 'left', 'leftmargin', 68, 15);
	setPaddingVariable(this, 'right', 'rightmargin', 68, 15);
};

/**
 * Some of the items on the page are not scaled, so adjust them in the opposite direction of scaling to cancel out the scaling.
 * @param {float} scale
 */
Renderer.prototype.adjustNonScaledItems = function (scale) {
	this.padding.top /= scale;
	this.padding.bottom /= scale;
	this.padding.left /= scale;
	this.padding.right /= scale;
	this.abctune.formatting.headerfont.size /= scale;
	this.abctune.formatting.footerfont.size /= scale;
};

/**
 * Set the the values for all the configurable vertical space options.
 */
Renderer.prototype.initVerticalSpace = function () {
	// conversion: 37.7953 = conversion factor for cm to px.
	// All of the following values are in px.
	this.spacing = {
		composer: 7.56, // Set the vertical space above the composer.
		graceBefore: 8.67, // Define the space before, inside and after the grace notes.
		graceInside: 10.67,
		graceAfter: 16,
		info: 0, // Set the vertical space above the infoline.
		lineSkipFactor: 1.1, // Set the factor for spacing between lines of text. (multiply this by the font size)
		music: 7.56, // Set the vertical space above the first staff.
		paragraphSkipFactor: 0.4, // Set the factor for spacing between text paragraphs. (multiply this by the font size)
		parts: 11.33, // Set the vertical space above a new part.
		slurHeight: 1.0, // Set the slur height factor.
		staffSeparation: 61.33, // Do not put a staff system closer than <unit> from the previous system.
		stemHeight: 26.67 + 10, // Set the stem height.
		subtitle: 3.78, // Set the vertical space above the subtitle.
		systemStaffSeparation: 48, // Do not place the staves closer than <unit> inside a system. * This values applies to all staves when in the tune header. Otherwise, it applies to the next staff
		text: 18.9, // Set the vertical space above the history.
		title: 7.56, // Set the vertical space above the title.
		top: 30.24, //Set the vertical space above the tunes and on the top of the continuation pages.
		vocal: 30.67, // Set the vertical space above the lyrics under the staves.
		words: 0 // Set the vertical space above the lyrics at the end of the tune.
	};
	/*
 TODO-PER: Handle the x-coordinate spacing items, too.
 maxshrink <float>Default: 0.65
 Set how much to compress horizontally when music line breaks
 are automatic.
 <float> must be between 0 (natural spacing)
 and 1 (max shrinking).
 // This next value is used to compute the natural spacing of
 // the notes. The base spacing of the crotchet is always
 // 40 pts. When the duration of a note type is twice the
 // duration of an other note type, its spacing is multiplied
 // by this factor.
 // The default value causes the note spacing to be multiplied
 // by 2 when its duration is multiplied by 4, i.e. the
 // space of the semibreve is 80 pts and the space of the
 // semiquaver is 20 pts.
 // Setting this value to 1 sets all note spacing to 40 pts.
 noteSpacingFactor: 1.414, // Set the note spacing factor to <float> (range 1..2).
 scale <float> Default: 0.75 Set the page scale factor. Note that the header and footer are not scaled.
 stretchlast <float>Default: 0.8
 Stretch the last music line of a tune when it exceeds
 the <float> fraction of the page width.
 <float> range is 0.0 to 1.0.
  */
};

Renderer.prototype.setVerticalSpace = function (formatting) {
	// conversion from pts to px 4/3
	if (formatting.staffsep !== undefined) this.spacing.staffSeparation = formatting.staffsep * 4 / 3;
	if (formatting.composerspace !== undefined) this.spacing.composer = formatting.composerspace * 4 / 3;
	if (formatting.partsspace !== undefined) this.spacing.parts = formatting.partsspace * 4 / 3;
	if (formatting.textspace !== undefined) this.spacing.text = formatting.textspace * 4 / 3;
	if (formatting.musicspace !== undefined) this.spacing.music = formatting.musicspace * 4 / 3;
	if (formatting.titlespace !== undefined) this.spacing.title = formatting.titlespace * 4 / 3;
	if (formatting.sysstaffsep !== undefined) this.spacing.systemStaffSeparation = formatting.sysstaffsep * 4 / 3;
	if (formatting.subtitlespace !== undefined) this.spacing.subtitle = formatting.subtitlespace * 4 / 3;
	if (formatting.topspace !== undefined) this.spacing.top = formatting.topspace * 4 / 3;
	if (formatting.vocalspace !== undefined) this.spacing.vocal = formatting.vocalspace * 4 / 3;
	if (formatting.wordsspace !== undefined) this.spacing.words = formatting.wordsspace * 4 / 3;
};

/**
 * Leave space at the top of the paper
 * @param {object} abctune
 */
Renderer.prototype.topMargin = function (abctune) {
	this.moveY(this.padding.top);
};

/**
 * Leave space before printing the music
 */
Renderer.prototype.addMusicPadding = function () {
	this.moveY(this.spacing.music);
};

/**
 * Leave space before printing a staff system
 */
Renderer.prototype.addStaffPadding = function (lastStaffGroup, thisStaffGroup) {
	var lastStaff = lastStaffGroup.staffs[lastStaffGroup.staffs.length - 1];
	var lastBottomLine = -(lastStaff.bottom - 2); // The 2 is because the scale goes to 2 below the last line.
	var nextTopLine = thisStaffGroup.staffs[0].top - 10; // Because 10 represents the top line.
	var naturalSeparation = nextTopLine + lastBottomLine; // This is how far apart they'd be without extra spacing
	var separationInPixels = naturalSeparation * spacing.STEP;
	if (separationInPixels < this.spacing.staffSeparation) this.moveY(this.spacing.staffSeparation - separationInPixels);
};

/**
 * Text that goes above the score
 * @param {number} width
 * @param {object} abctune
 */
Renderer.prototype.engraveTopText = function (width, abctune) {
	if (abctune.metaText.header && this.isPrint) {
		// Note: whether there is a header or not doesn't change any other positioning, so this doesn't change the Y-coordinate.
		// This text goes above the margin, so we'll temporarily move up.
		var headerTextHeight = this.getTextSize("XXXX", "headerfont", 'abcjs-header abcjs-meta-top').height;
		this.y -= headerTextHeight;
		this.outputTextIf(this.padding.left, abctune.metaText.header.left, 'headerfont', 'header meta-top', 0, null, 'start');
		this.outputTextIf(this.padding.left + width / 2, abctune.metaText.header.center, 'headerfont', 'header meta-top', 0, null, 'middle');
		this.outputTextIf(this.padding.left + width, abctune.metaText.header.right, 'headerfont', 'header meta-top', 0, null, 'end');
		this.y += headerTextHeight;
	}
	if (this.isPrint) this.moveY(this.spacing.top);
	this.outputTextIf(this.padding.left + width / 2, abctune.metaText.title, 'titlefont', 'title meta-top', this.spacing.title, 0, 'middle');
	if (abctune.lines[0]) this.outputTextIf(this.padding.left + width / 2, abctune.lines[0].subtitle, 'subtitlefont', 'text meta-top', this.spacing.subtitle, 0, 'middle');

	if (abctune.metaText.rhythm || abctune.metaText.origin || abctune.metaText.composer) {
		this.moveY(this.spacing.composer);
		var rSpace = this.outputTextIf(this.padding.left, abctune.metaText.rhythm, 'infofont', 'meta-top', 0, null, "start");

		var composerLine = "";
		if (abctune.metaText.composer) composerLine += abctune.metaText.composer;
		if (abctune.metaText.origin) composerLine += ' (' + abctune.metaText.origin + ')';
		if (composerLine.length > 0) {
			var space = this.outputTextIf(this.padding.left + width, composerLine, 'composerfont', 'meta-top', 0, null, "end");
			this.moveY(space[1]);
		} else {
			this.moveY(rSpace[1]);
		}
		// TODO-PER: The following is a hack to make the elements line up with abcm2ps. Don't know where the extra space is coming from.
		this.moveY(-6);
		//} else if (this.isPrint) {
		//	// abcm2ps adds this space whether there is anything to write or not.
		//	this.moveY(this.spacing.composer);
		//	var space2 = this.getTextSize("M", 'composerfont', 'meta-top');
		//	this.moveY(space2.height);
	}

	this.outputTextIf(this.padding.left + width, abctune.metaText.author, 'composerfont', 'meta-top', 0, 0, "end");
	//this.skipSpaceY();

	this.outputTextIf(this.padding.left, abctune.metaText.partOrder, 'partsfont', 'meta-bottom', 0, 0, "start");
};

/**
 * Text that goes below the score
 * @param {number} width
 * @param {object} abctune
 */
Renderer.prototype.engraveExtraText = function (width, abctune) {
	this.lineNumber = null;
	this.measureNumber = null;
	this.noteNumber = null;
	this.voiceNumber = null;

	var extraText;
	if (abctune.metaText.unalignedWords) {
		extraText = "";
		for (var j = 0; j < abctune.metaText.unalignedWords.length; j++) {
			if (typeof abctune.metaText.unalignedWords[j] === 'string') extraText += abctune.metaText.unalignedWords[j] + "\n";else {
				for (var k = 0; k < abctune.metaText.unalignedWords[j].length; k++) {
					extraText += " FONT " + abctune.metaText.unalignedWords[j][k].text;
				}
				extraText += "\n";
			}
		}
		this.outputTextIf(this.padding.left + spacing.INDENT, extraText, 'wordsfont', 'meta-bottom', this.spacing.words, 2, "start");
	}

	extraText = "";
	if (abctune.metaText.book) extraText += "Book: " + abctune.metaText.book + "\n";
	if (abctune.metaText.source) extraText += "Source: " + abctune.metaText.source + "\n";
	if (abctune.metaText.discography) extraText += "Discography: " + abctune.metaText.discography + "\n";
	if (abctune.metaText.notes) extraText += "Notes: " + abctune.metaText.notes + "\n";
	if (abctune.metaText.transcription) extraText += "Transcription: " + abctune.metaText.transcription + "\n";
	if (abctune.metaText.history) extraText += "History: " + abctune.metaText.history + "\n";
	if (abctune.metaText['abc-copyright']) extraText += "Copyright: " + abctune.metaText['abc-copyright'] + "\n";
	if (abctune.metaText['abc-creator']) extraText += "Creator: " + abctune.metaText['abc-creator'] + "\n";
	if (abctune.metaText['abc-edited-by']) extraText += "Edited By: " + abctune.metaText['abc-edited-by'] + "\n";
	this.outputTextIf(this.padding.left, extraText, 'historyfont', 'meta-bottom', this.spacing.info, 0, "start");

	if (abctune.metaText.footer && this.isPrint) {
		// Note: whether there is a footer or not doesn't change any other positioning, so this doesn't change the Y-coordinate.
		this.outputTextIf(this.padding.left, abctune.metaText.footer.left, 'footerfont', 'header meta-bottom', 0, null, 'start');
		this.outputTextIf(this.padding.left + width / 2, abctune.metaText.footer.center, 'footerfont', 'header meta-bottom', 0, null, 'middle');
		this.outputTextIf(this.padding.left + width, abctune.metaText.footer.right, 'footerfont', 'header meta-bottom', 0, null, 'end');
	}
};

/**
 * Output text defined with %%text.
 * @param {array or string} text
 */
Renderer.prototype.outputFreeText = function (text) {
	if (text === "") {
		// we do want to print out blank lines if they have been specified.
		var hash = this.getFontAndAttr('textfont', 'defined-text');
		this.moveY(hash.attr['font-size'] * 2); // move the distance of the line, plus the distance of the margin, which is also one line.
	} else if (typeof text === 'string') this.outputTextIf(this.padding.left, text, 'textfont', 'defined-text', 0, 1, "start");else {
		var str = "";
		var isCentered = false; // The structure is wrong here: it requires an array to do centering, but it shouldn't have.
		for (var i = 0; i < text.length; i++) {
			if (text[i].font) str += "FONT(" + text[i].font + ")";
			str += text[i].text;
			if (text[i].center) isCentered = true;
		}
		var alignment = isCentered ? 'middle' : 'start';
		var x = isCentered ? this.controller.width / 2 : this.padding.left;
		this.outputTextIf(x, str, 'textfont', 'defined-text', 0, 1, alignment);
	}
};

/**
 * Output an extra subtitle that is defined later in the tune.
 */
Renderer.prototype.outputSubtitle = function (width, subtitle) {
	this.outputTextIf(this.padding.left + width / 2, subtitle, 'subtitlefont', 'text meta-top', this.spacing.subtitle, 0, 'middle');
};

/**
 * Begin a group of glyphs that will always be moved, scaled and highlighted together
 */
Renderer.prototype.beginGroup = function () {
	this.path = [];
	this.lastM = [0, 0];
	this.ingroup = true;
};

/**
 * Add a path to the current group
 * @param {Array} path
 * @private
 */
Renderer.prototype.addPath = function (path) {
	path = path || [];
	if (path.length === 0) return;
	path[0][0] = "m";
	path[0][1] -= this.lastM[0];
	path[0][2] -= this.lastM[1];
	this.lastM[0] += path[0][1];
	this.lastM[1] += path[0][2];
	this.path.push(path[0]);
	for (var i = 1, ii = path.length; i < ii; i++) {
		if (path[i][0] === "m") {
			this.lastM[0] += path[i][1];
			this.lastM[1] += path[i][2];
		}
		this.path.push(path[i]);
	}
};

/**
 * End a group of glyphs that will always be moved, scaled and highlighted together
 */
Renderer.prototype.endGroup = function (klass) {
	this.ingroup = false;
	if (this.path.length === 0) return null;
	var path = "";
	for (var i = 0; i < this.path.length; i++) {
		path += this.path[i].join(" ");
	}var ret = this.paper.path({ path: path, stroke: "none", fill: "#000000", 'class': this.addClasses(klass) });
	this.path = [];
	if (this.doRegression) this.addToRegression(ret);

	return ret;
};

/**
 * gets scaled
 * @param {number} x1 start x
 * @param {number} x2 end x
 * @param {number} pitch pitch the stave line is drawn at
 */
Renderer.prototype.printStaveLine = function (x1, x2, pitch, klass) {
	var extraClass = "staff";
	if (klass !== undefined) extraClass += " " + klass;
	var isIE = /*@cc_on!@*/false; //IE detector
	var dy = 0.35;
	var fill = "#000000";
	if (isIE) {
		dy = 1;
		fill = "#666666";
	}
	var y = this.calcY(pitch);
	var pathString = sprintf("M %f %f L %f %f L %f %f L %f %f z", x1, y - dy, x2, y - dy, x2, y + dy, x1, y + dy);
	var ret = this.paper.pathToBack({ path: pathString, stroke: "none", fill: fill, 'class': this.addClasses(extraClass) });
	if (this.doRegression) this.addToRegression(ret);

	return ret;
};

/**
 * gets scaled if not in a group
 * @param {number} x x coordinate of the stem
 * @param {number} dx stem width
 * @param {number} y1 y coordinate of the stem bottom
 * @param {number} y2 y coordinate of the stem top
 */
Renderer.prototype.printStem = function (x, dx, y1, y2) {
	if (dx < 0) {
		// correct path "handedness" for intersection with other elements
		var tmp = y2;
		y2 = y1;
		y1 = tmp;
	}
	var isIE = /*@cc_on!@*/false; //IE detector
	var fill = "#000000";
	if (isIE && dx < 1) {
		dx = 1;
		fill = "#666666";
	}
	if (~~x === x) x += 0.05; // raphael does weird rounding (for VML)
	var pathArray = [["M", x, y1], ["L", x, y2], ["L", x + dx, y2], ["L", x + dx, y1], ["z"]];
	if (!isIE && this.ingroup) {
		this.addPath(pathArray);
	} else {
		var path = "";
		for (var i = 0; i < pathArray.length; i++) {
			path += pathArray[i].join(" ");
		}var ret = this.paper.pathToBack({ path: path, stroke: "none", fill: fill, 'class': this.addClasses('stem') });
		if (this.doRegression) this.addToRegression(ret);

		return ret;
	}
};

function kernSymbols(lastSymbol, thisSymbol, lastSymbolWidth) {
	// This is just some adjustments to make it look better.
	var width = lastSymbolWidth;
	if (lastSymbol === 'f' && thisSymbol === 'f') width = width * 2 / 3;
	if (lastSymbol === 'p' && thisSymbol === 'p') width = width * 5 / 6;
	if (lastSymbol === 'f' && thisSymbol === 'z') width = width * 5 / 8;
	return width;
}

/**
 * assumes this.y is set appropriately
 * if symbol is a multichar string without a . (as in scripts.staccato) 1 symbol per char is assumed
 * not scaled if not in printgroup
 */
Renderer.prototype.printSymbol = function (x, offset, symbol, scalex, scaley, klass) {
	var el;
	var ycorr;
	if (!symbol) return null;
	if (symbol.length > 1 && symbol.indexOf(".") < 0) {
		this.paper.openGroup();
		var dx = 0;
		for (var i = 0; i < symbol.length; i++) {
			var s = symbol.charAt(i);
			ycorr = glyphs.getYCorr(s);
			el = glyphs.printSymbol(x + dx, this.calcY(offset + ycorr), s, this.paper, klass);
			if (el) {
				if (this.doRegression) this.addToRegression(el);
				//elemset.push(el);
				if (i < symbol.length - 1) dx += kernSymbols(s, symbol.charAt(i + 1), glyphs.getSymbolWidth(s));
			} else {
				this.renderText(x, this.y, "no symbol:" + symbol, "debugfont", 'debug-msg', 'start');
			}
		}
		return this.paper.closeGroup();
	} else {
		ycorr = glyphs.getYCorr(symbol);
		if (this.ingroup) {
			this.addPath(glyphs.getPathForSymbol(x, this.calcY(offset + ycorr), symbol, scalex, scaley));
		} else {
			el = glyphs.printSymbol(x, this.calcY(offset + ycorr), symbol, this.paper, klass);
			if (el) {
				if (this.doRegression) this.addToRegression(el);
				return el;
			} else this.renderText(x, this.y, "no symbol:" + symbol, "debugfont", 'debug-msg', 'start');
		}
		return null;
	}
};

Renderer.prototype.scaleExistingElem = function (elem, scaleX, scaleY, x, y) {
	this.paper.setAttributeOnElement(elem, { style: "transform:scale(" + scaleX + "," + scaleY + ");transform-origin:" + x + "px " + y + "px;" });
};

Renderer.prototype.printPath = function (attrs) {
	var ret = this.paper.path(attrs);
	if (this.doRegression) this.addToRegression(ret);
	return ret;
};

Renderer.prototype.drawBrace = function (xLeft, yTop, yBottom) {
	//Tony
	var yHeight = yBottom - yTop;

	var xCurve = [7.5, -8, 21, 0, 18.5, -10.5, 7.5];
	var yCurve = [0, yHeight / 5.5, yHeight / 3.14, yHeight / 2, yHeight / 2.93, yHeight / 4.88, 0];

	var pathString = sprintf("M %f %f C %f %f %f %f %f %f C %f %f %f %f %f %f z", xLeft + xCurve[0], yTop + yCurve[0], xLeft + xCurve[1], yTop + yCurve[1], xLeft + xCurve[2], yTop + yCurve[2], xLeft + xCurve[3], yTop + yCurve[3], xLeft + xCurve[4], yTop + yCurve[4], xLeft + xCurve[5], yTop + yCurve[5], xLeft + xCurve[6], yTop + yCurve[6]);
	var ret1 = this.paper.path({ path: pathString, stroke: "#000000", fill: "#000000", 'class': this.addClasses('brace') });

	xCurve = [0, 17.5, -7.5, 6.6, -5, 20, 0];
	yCurve = [yHeight / 2, yHeight / 1.46, yHeight / 1.22, yHeight, yHeight / 1.19, yHeight / 1.42, yHeight / 2];

	pathString = sprintf("M %f %f C %f %f %f %f %f %f C %f %f %f %f %f %f z", xLeft + xCurve[0], yTop + yCurve[0], xLeft + xCurve[1], yTop + yCurve[1], xLeft + xCurve[2], yTop + yCurve[2], xLeft + xCurve[3], yTop + yCurve[3], xLeft + xCurve[4], yTop + yCurve[4], xLeft + xCurve[5], yTop + yCurve[5], xLeft + xCurve[6], yTop + yCurve[6]);
	var ret2 = this.paper.path({ path: pathString, stroke: "#000000", fill: "#000000", 'class': this.addClasses('brace') });

	if (this.doRegression) {
		this.addToRegression(ret1);
		this.addToRegression(ret2);
	}
	return ret1 + ret2;
};

Renderer.prototype.drawArc = function (x1, x2, pitch1, pitch2, above, klass, isTie) {
	// If it is a tie vs. a slur, draw it shallower.
	var spacing = isTie ? 1.2 : 1.5;

	x1 = x1 + 6;
	x2 = x2 + 4;
	pitch1 = pitch1 + (above ? spacing : -spacing);
	pitch2 = pitch2 + (above ? spacing : -spacing);
	var y1 = this.calcY(pitch1);
	var y2 = this.calcY(pitch2);

	//unit direction vector
	var dx = x2 - x1;
	var dy = y2 - y1;
	var norm = Math.sqrt(dx * dx + dy * dy);
	var ux = dx / norm;
	var uy = dy / norm;

	var flatten = norm / 3.5;
	var maxFlatten = isTie ? 10 : 25; // If it is a tie vs. a slur, draw it shallower.
	var curve = (above ? -1 : 1) * Math.min(maxFlatten, Math.max(4, flatten));

	var controlx1 = x1 + flatten * ux - curve * uy;
	var controly1 = y1 + flatten * uy + curve * ux;
	var controlx2 = x2 - flatten * ux - curve * uy;
	var controly2 = y2 - flatten * uy + curve * ux;
	var thickness = 2;
	var pathString = sprintf("M %f %f C %f %f %f %f %f %f C %f %f %f %f %f %f z", x1, y1, controlx1, controly1, controlx2, controly2, x2, y2, controlx2 - thickness * uy, controly2 + thickness * ux, controlx1 - thickness * uy, controly1 + thickness * ux, x1, y1);
	if (klass) klass += ' slur';else klass = 'slur';
	var ret = this.paper.path({ path: pathString, stroke: "none", fill: "#000000", 'class': this.addClasses(klass) });
	if (this.doRegression) this.addToRegression(ret);

	return ret;
};
/**
 * Calculates the y for a given pitch value (relative to the stave the renderer is currently printing)
 * @param {number} ofs pitch value (bottom C on a G clef = 0, D=1, etc.)
 */
Renderer.prototype.calcY = function (ofs) {
	return this.y - ofs * spacing.STEP;
};

/**
 * Print @param {number} numLines. If there is 1 line it is the B line. Otherwise the bottom line is the E line.
 */
Renderer.prototype.printStave = function (startx, endx, numLines) {
	var klass = "top-line";
	this.paper.openGroup({ prepend: true });
	// If there is one line, it is the B line. Otherwise, the bottom line is the E line.
	if (numLines === 1) {
		this.printStaveLine(startx, endx, 6, klass);
		return;
	}
	for (var i = numLines - 1; i >= 0; i--) {
		this.printStaveLine(startx, endx, (i + 1) * 2, klass);
		klass = undefined;
	}
	this.paper.closeGroup();
};

/**
 *
 * @private
 */
Renderer.prototype.addClasses = function (c, isNote) {
	if (!this.shouldAddClasses) return "";
	var ret = [];
	if (c.length > 0) ret.push(c);
	if (this.lineNumber !== null && this.lineNumber !== undefined) ret.push("l" + this.lineNumber);
	if (this.measureNumber !== null && this.measureNumber !== undefined) ret.push("m" + this.measureNumber);
	if (this.voiceNumber !== null && this.voiceNumber !== undefined) ret.push("v" + this.voiceNumber);
	if ((c.indexOf('note') >= 0 || c.indexOf('rest') >= 0) && this.noteNumber !== null && this.noteNumber !== undefined) ret.push("n" + this.noteNumber);
	// add a prefix to all classes that abcjs adds.
	if (ret.length > 0) {
		ret = ret.join(' '); // Some strings are compound classes - that is, specify more than one class in a string.
		ret = ret.split(' ');
		for (var i = 0; i < ret.length; i++) {
			if (ret[i].indexOf('abcjs-') !== 0 && ret[i].length > 0) // if the prefix doesn't already exist and the class is not blank.
				ret[i] = 'abcjs-' + ret[i];
		}
	}
	return ret.join(' ');
};

Renderer.prototype.getFontAndAttr = function (type, klass) {
	var font = this.abctune.formatting[type];
	// Raphael deliberately changes the font units to pixels for some reason, so we need to change points to pixels here.
	if (font) font = { face: font.face, size: font.size * 4 / 3, decoration: font.decoration, style: font.style, weight: font.weight, box: font.box };else font = { face: "Arial", size: 12 * 4 / 3, decoration: "underline", style: "normal", weight: "normal" };

	var attr = { "font-size": font.size, 'font-style': font.style,
		"font-family": font.face, 'font-weight': font.weight, 'text-decoration': font.decoration,
		'class': this.addClasses(klass) };
	attr.font = ""; // There is a spurious font definition that is put on all text elements. This overwrites it.
	return { font: font, attr: attr };
};

Renderer.prototype.getTextSize = function (text, type, klass) {
	var hash = this.getFontAndAttr(type, klass);
	var size = this.paper.getTextSize(text, hash.attr);
	if (hash.font.box) {
		size.height += 8;
		// TODO-PER: Shouldn't the width also be increased here?
	}
	return size;
};

Renderer.prototype.renderText = function (x, y, text, type, klass, anchor, centerVertically) {
	var hash = this.getFontAndAttr(type, klass);
	if (anchor) hash.attr["text-anchor"] = anchor;
	hash.attr.x = x;
	hash.attr.y = y + 7; // TODO-PER: Not sure why the text appears to be 7 pixels off.
	if (!centerVertically) hash.attr.dy = "0.5em";
	if (type === 'debugfont') {
		console.log("Debug msg: " + text);
		hash.attr.stroke = "#ff0000";
	}

	text = text.replace(/\n\n/g, "\n \n");
	text = text.replace(/^\n/, "\xA0\n");

	var el = this.paper.text(text, hash.attr);

	if (hash.font.box) {
		var size = el.getBBox();
		var padding = 2;
		var margin = 2;
		this.paper.rect({ x: size.x - padding, y: size.y + padding, width: size.width + padding * 2, height: size.height + padding * 2 - margin, stroke: "#888888", fill: "transparent" });
		//size.height += 8;
	}
	if (this.doRegression) this.addToRegression(el);
	return el;
};

Renderer.prototype.moveY = function (em, numLines) {
	if (numLines === undefined) numLines = 1;
	this.y += em * numLines;
};

Renderer.prototype.skipSpaceY = function () {
	this.y += this.space;
};

// Call with 'kind' being the font type to use,
// if marginBottom === null then don't increment the Y after printing, otherwise that is the extra number of em's to leave below the line.
// and alignment being "start", "middle", or "end".
Renderer.prototype.outputTextIf = function (x, str, kind, klass, marginTop, marginBottom, alignment) {
	if (str) {
		if (marginTop) this.moveY(marginTop);
		var el = this.renderText(x, this.y, str, kind, klass, alignment);
		var bb = el.getBBox(); // This can return NaN if the element isn't visible.
		var width = isNaN(bb.width) ? 0 : bb.width;
		var height = isNaN(bb.height) ? 0 : bb.height;
		if (marginBottom !== null) {
			var numLines = str.split("\n").length;
			if (!isNaN(bb.height)) this.moveY(height / numLines, numLines + marginBottom);
		}
		return [width, height];
	}
	return [0, 0];
};

Renderer.prototype.addInvisibleMarker = function (className) {
	var dy = 0.35;
	var fill = "rgba(0,0,0,0)";
	var y = this.y;
	y = Math.round(y);
	var x1 = 0;
	var x2 = 100;
	var pathString = sprintf("M %f %f L %f %f L %f %f L %f %f z", x1, y - dy, x1 + x2, y - dy, x2, y + dy, x1, y + dy);
	this.paper.pathToBack({ path: pathString, stroke: "none", fill: fill, "fill-opacity": 0, 'class': this.addClasses(className), 'data-vertical': y });
};

// For debugging, it is sometimes useful to know where you are vertically.
Renderer.prototype.printHorizontalLine = function (width, vertical, comment) {
	var dy = 0.35;
	var fill = "rgba(0,0,255,.4)";
	var y = this.y;
	if (vertical) y = vertical;
	y = Math.round(y);
	this.paper.text("" + Math.round(y), { x: 10, y: y, "text-anchor": "start", "font-size": "18px", fill: fill, stroke: fill });
	var x1 = 50;
	var x2 = width;
	var pathString = sprintf("M %f %f L %f %f L %f %f L %f %f z", x1, y - dy, x1 + x2, y - dy, x2, y + dy, x1, y + dy);
	this.paper.pathToBack({ path: pathString, stroke: "none", fill: fill, 'class': this.addClasses('staff') });
	for (var i = 1; i < width / 100; i++) {
		pathString = sprintf("M %f %f L %f %f L %f %f L %f %f z", i * 100 - dy, y - 5, i * 100 - dy, y + 5, i * 100 + dy, y - 5, i * 100 + dy, y + 5);
		this.paper.pathToBack({ path: pathString, stroke: "none", fill: fill, 'class': this.addClasses('staff') });
	}
	if (comment) this.paper.text(comment, { x: width + 70, y: y, "text-anchor": "start", "font-size": "18px", fill: fill, stroke: fill });
};

Renderer.prototype.printShadedBox = function (x, y, width, height, color, opacity, comment) {
	var box = this.paper.rect({ x: x, y: y, width: width, height: height, fill: color, stroke: color, "fill-opacity": opacity, "stroke-opacity": opacity });
	if (comment) this.paper.text(comment, { x: 0, y: y + 7, "text-anchor": "start", "font-size": "14px", fill: "rgba(0,0,255,.4)", stroke: "rgba(0,0,255,.4)" });
	return box;
};

Renderer.prototype.printVerticalLine = function (x, y1, y2) {
	var dy = 0.35;
	var fill = "#00aaaa";
	var pathString = sprintf("M %f %f L %f %f L %f %f L %f %f z", x - dy, y1, x - dy, y2, x + dy, y1, x + dy, y2);
	this.paper.pathToBack({ path: pathString, stroke: "none", fill: fill, 'class': this.addClasses('staff') });
	pathString = sprintf("M %f %f L %f %f L %f %f L %f %f z", x - 20, y1, x - 20, y1 + 3, x, y1, x, y1 + 3);
	this.paper.pathToBack({ path: pathString, stroke: "none", fill: fill, 'class': this.addClasses('staff') });
	pathString = sprintf("M %f %f L %f %f L %f %f L %f %f z", x + 20, y2, x + 20, y2 + 3, x, y2, x, y2 + 3);
	this.paper.pathToBack({ path: pathString, stroke: "none", fill: fill, 'class': this.addClasses('staff') });
};

/**
 * @private
 */
Renderer.prototype.addToRegression = function (el) {
	var box = el.getBBox();
	//var str = "("+box.x+","+box.y+")["+box.width+","+box.height+"] "
	var str = el.type + ' ' + box.toString() + ' ';
	var attrs = [];
	for (var key in el.attrs) {
		if (el.attrs.hasOwnProperty(key)) {
			if (key === 'class') str = el.attrs[key] + " " + str;else attrs.push(key + ": " + el.attrs[key]);
		}
	}
	attrs.sort();
	str += "{ " + attrs.join(" ") + " }";
	this.regressionLines.push(str);
};

module.exports = Renderer;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_voice_element.js: Definition of the VoiceElement class.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*global module */

var svgNS = "http://www.w3.org/2000/svg";

function Svg(wrapper) {
	this.svg = createSvg();
	wrapper.appendChild(this.svg);
}

Svg.prototype.clear = function () {
	if (this.svg) {
		var wrapper = this.svg.parentNode;
		this.svg = createSvg();
		if (wrapper) {
			// TODO-PER: If the wrapper is not present, then the underlying div was pulled out from under this instance. It's possible that is still useful (for creating the music off page?)
			wrapper.innerHTML = "";
			wrapper.appendChild(this.svg);
		}
	}
};

Svg.prototype.setTitle = function (title) {
	var titleEl = document.createElement("title");
	var titleNode = document.createTextNode(title);
	titleEl.appendChild(titleNode);
	this.svg.insertBefore(titleEl, this.svg.firstChild);
};

Svg.prototype.setResponsiveWidth = function (w, h) {
	// this technique is from: http://thenewcode.com/744/Make-SVG-Responsive, thx to https://github.com/iantresman
	this.svg.setAttribute("viewBox", "0 0 " + w + " " + h);
	this.svg.setAttribute("preserveAspectRatio", "xMinYMin meet");
	this.svg.removeAttribute("height");
	this.svg.removeAttribute("width");
	this.svg.style['display'] = "inline-block";
	this.svg.style['position'] = "absolute";
	this.svg.style['top'] = "0";
	this.svg.style['left'] = "0";

	if (this.svg.parentNode) {
		var cls = this.svg.parentNode.getAttribute("class");
		if (!cls) this.svg.parentNode.setAttribute("class", "abcjs-container");else if (cls.indexOf("abcjs-container") < 0) this.svg.parentNode.setAttribute("class", cls + " abcjs-container");
		this.svg.parentNode.style['display'] = "inline-block";
		this.svg.parentNode.style['position'] = "relative";
		this.svg.parentNode.style['width'] = "100%";
		// PER: I changed the padding from 100% to this through trial and error.
		// The example was using a square image, but this music might be either wider or taller.
		var padding = h / w * 100;
		this.svg.parentNode.style['padding-bottom'] = padding + "%";
		this.svg.parentNode.style['vertical-align'] = "middle";
		this.svg.parentNode.style['overflow'] = "hidden";
	}
};

Svg.prototype.setSize = function (w, h) {
	this.svg.setAttribute('width', w);
	this.svg.setAttribute('height', h);
	// TODO-PER: Is this hack still needed?
	// Correct for IE problem in calculating height
	// var isIE = /*@cc_on!@*/false;//IE detector
	// if (isIE) {
	// 	this.paper.canvas.parentNode.style.width = w + "px";
	// 	this.paper.canvas.parentNode.style.height = "" + h + "px";
	// } else
	// 	this.paper.canvas.parentNode.setAttribute("style", "width:" + w + "px");
};

Svg.prototype.setScale = function (scale) {
	if (scale !== 1) {
		this.svg.style.transform = "scale(" + scale + "," + scale + ")";
		this.svg.style['-ms-transform'] = "scale(" + scale + "," + scale + ")";
		this.svg.style['-webkit-transform'] = "scale(" + scale + "," + scale + ")";
		this.svg.style['transform-origin'] = "0 0";
		this.svg.style['-ms-transform-origin-x'] = "0";
		this.svg.style['-ms-transform-origin-y'] = "0";
		this.svg.style['-webkit-transform-origin-x'] = "0";
		this.svg.style['-webkit-transform-origin-y'] = "0";
	} else {
		this.svg.style.transform = "";
		this.svg.style['-ms-transform'] = "";
		this.svg.style['-webkit-transform'] = "";
	}
};

Svg.prototype.setParentStyles = function (attr) {
	// This is needed to get the size right when there is scaling involved.
	for (var key in attr) {
		if (attr.hasOwnProperty(key)) {
			if (this.svg.parentNode) this.svg.parentNode.style[key] = attr[key];
		}
	}
};

Svg.prototype.rect = function (attr) {
	var el = document.createElementNS(svgNS, "rect");
	for (var key in attr) {
		if (attr.hasOwnProperty(key)) {
			var tmp = "" + attr[key];
			if (tmp.indexOf("NaN") >= 0) debugger;
			el.setAttributeNS(null, key, attr[key]);
		}
	}
	this.append(el);
	return el;
};

Svg.prototype.text = function (text, attr) {
	var el = document.createElementNS(svgNS, 'text');
	for (var key in attr) {
		if (attr.hasOwnProperty(key)) {
			el.setAttribute(key, attr[key]);
		}
	}
	var lines = ("" + text).split("\n");
	for (var i = 0; i < lines.length; i++) {
		var line = document.createElementNS(svgNS, 'tspan');
		line.textContent = lines[i];
		line.setAttribute("x", attr.x ? attr.x : 0);
		if (i !== 0) line.setAttribute("dy", "1.2em");
		el.appendChild(line);
	}
	this.append(el);
	return el;
};

Svg.prototype.getTextSize = function (text, attr) {
	var el = this.text(text, attr);
	var size = el.getBBox();
	if (isNaN(size.height)) // This can happen if the element isn't visible.
		size = { width: 0, height: 0 };else size = { width: size.width, height: size.height };
	// TODO-PER: can the size be gotten without inserting and deleting the element?
	if (this.currentGroup) this.currentGroup.removeChild(el);else this.svg.removeChild(el);
	return size;
};

Svg.prototype.openGroup = function (options) {
	options = options ? options : {};
	var el = document.createElementNS(svgNS, "g");
	if (options.prepend) this.svg.insertBefore(el, this.svg.firstChild);else this.svg.appendChild(el);
	this.currentGroup = el;
	return el;
};

Svg.prototype.closeGroup = function () {
	var g = this.currentGroup;
	this.currentGroup = null;
	return g;
};

Svg.prototype.path = function (attr) {
	var el = document.createElementNS(svgNS, "path");
	for (var key in attr) {
		if (attr.hasOwnProperty(key)) {
			if (key === 'path') el.setAttributeNS(null, 'd', attr.path);else el.setAttributeNS(null, key, attr[key]);
		}
	}
	this.append(el);
	return el;
};

Svg.prototype.pathToBack = function (attr) {
	var el = document.createElementNS(svgNS, "path");
	for (var key in attr) {
		if (attr.hasOwnProperty(key)) {
			if (key === 'path') el.setAttributeNS(null, 'd', attr.path);else el.setAttributeNS(null, key, attr[key]);
		}
	}
	this.prepend(el);
	return el;
};

Svg.prototype.append = function (el) {
	if (this.currentGroup) this.currentGroup.appendChild(el);else this.svg.appendChild(el);
};

Svg.prototype.prepend = function (el) {
	// The entire group is prepended, so don't prepend the individual elements.
	if (this.currentGroup) this.currentGroup.appendChild(el);else this.svg.insertBefore(el, this.svg.firstChild);
};

Svg.prototype.setAttributeOnElement = function (el, attr) {
	for (var key in attr) {
		if (attr.hasOwnProperty(key)) {
			el.setAttributeNS(null, key, attr[key]);
		}
	}
};

function createSvg() {
	var svg = document.createElementNS(svgNS, "svg");
	svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	svg.setAttribute('role', 'img'); // for accessibility
	return svg;
}

module.exports = Svg;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var tunebook = __webpack_require__(5);

var midi = __webpack_require__(9);
var midiCreate = __webpack_require__(14);

// A quick way to render a tune from javascript when interactivity is not required.
// This is used when a javascript routine has some abc text that it wants to render
// in a div or collection of divs. One tune or many can be rendered.
//
// parameters:
//      output: an array of divs that the individual tunes are rendered to.
//          If the number of tunes exceeds the number of divs in the array, then
//          only the first tunes are rendered. If the number of divs exceeds the number
//          of tunes, then the unused divs are cleared. The divs can be passed as either
//          elements or strings of ids. If ids are passed, then the div MUST exist already.
//          (if a single element is passed, then it is an implied array of length one.)
//          (if a null is passed for an element, or the element doesn't exist, then that tune is skipped.)
//      abc: text representing a tune or an entire tune book in ABC notation.
//      renderParams: hash of:
//          startingTune: an index, starting at zero, representing which tune to start rendering at.
//              (If this element is not present, then rendering starts at zero.)
var renderMidi = function renderMidi(output, abc, parserParams, midiParams, renderParams) {
  var params = {};
  var key;
  if (parserParams) {
    for (key in parserParams) {
      if (parserParams.hasOwnProperty(key)) {
        params[key] = parserParams[key];
      }
    }
  }
  if (midiParams) {
    for (key in midiParams) {
      if (midiParams.hasOwnProperty(key)) {
        // There is a conflict with the name of the parameters "listener" and "transpose". If it comes in the second parameter, then it is for midi.
        if (key === "listener") params.midiListener = midiParams[key];else if (key === 'transpose') params.midiTranspose = midiParams[key];else params[key] = midiParams[key];
      }
    }
  }
  if (renderParams) {
    for (key in renderParams) {
      if (renderParams.hasOwnProperty(key)) {
        params[key] = renderParams[key];
      }
    }
  }
  if (params.generateInline === undefined) // default is to generate inline controls.
    params.generateInline = true;
  if (params.inlineControls) params.inlineControls.selectionToggle = false; // Override the selection option because there is no selection in the Basic call.

  function callback(div, tune, index) {
    var html = "";
    var midiInst = midiCreate(tune, params);
    if (params.generateInline) {
      var inlineMidi = midiInst.inline ? midiInst.inline : midiInst;
      var stopOld = div.innerHTML.indexOf("abcjs-midi-current") >= 0;
      html += midi.generateMidiControls(tune, params, inlineMidi, index, stopOld);
    }
    if (params.generateDownload) {
      var downloadMidi = midiInst.download ? midiInst.download : midiInst;
      html += midi.generateMidiDownloadLink(tune, params, downloadMidi, index);
    }
    div.innerHTML = html;
    var find = function find(element, cls) {
      var els = element.getElementsByClassName(cls);
      if (els.length === 0) return null;
      return els[0];
    };
    if (params.generateInline && (params.animate || params.midiListener)) {
      var parent = find(div, "abcjs-inline-midi");
      parent.abcjsTune = tune;
      parent.abcjsListener = params.midiListener;
      parent.abcjsQpm = params.qpm;
      parent.abcjsContext = params.context;
      if (params.animate) {
        var drumIntro = params.drumIntro ? params.drumIntro : 0;
        parent.abcjsAnimate = params.animate.listener;
        parent.abcjsTune = params.animate.target; // We need the version of the tune that was drawn: extra info is added during the drawing process.
        parent.abcjsTune.setTiming(params.qpm, drumIntro);
      }
    }
    if (params.generateInline && params.inlineControls && params.inlineControls.startPlaying) {
      var startButton = find(div, "abcjs-midi-start");
      midi.startPlaying(startButton);
    }
  }

  return tunebook.renderEngine(callback, output, abc, params);
};

module.exports = renderMidi;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------
	util/Request : 0.1.1 : 2015-07-12 : https://sketch.io
	----------------------------------------------------------
	XMLHttpRequest - IE7+ | Chrome 1+ | Firefox 1+ | Safari 1.2+
	CORS - IE10+ | Chrome 3+ | Firefox 3.5+ | Safari 4+
	----------------------------------------------------------
	galactic.request({
		url: './dir/something.extension',
		data: 'test!',
		format: 'text', // text | xml | json
		responseType: 'text', // arraybuffer | blob | document | json | text
		headers: {},
		withCredentials: true, // true | false
		///
		onerror: function(e) {
			console.log(e);
		},
		onsuccess: function(e, res) {
			console.log(res);
		},
		onprogress: function(e, progress) {
			progress = Math.round(progress * 100);
			loader.create('thread', 'loading... ', progress);
		}
	});
*/

if (typeof galactic === 'undefined') galactic = {};

(function(root) { 'use strict';

	root.request = function(args, onsuccess, onerror, onprogress) {
		if (typeof args === 'string') args = {url: args};
		var data = args.data;
		var url = args.url;
		var method = args.method || (args.data ? 'POST' : 'GET');
		var format = args.format;
		var headers = args.headers;
		var mimeType = args.mimeType;
		var responseType = args.responseType;
		var withCredentials = args.withCredentials || false;
		var onprogress = onprogress || args.onprogress;
		var onsuccess = onsuccess || args.onsuccess;
		var onerror = onerror || args.onerror;
		///
		if (typeof NodeFS !== 'undefined' && root.loc.isLocalUrl(url)) {
			NodeFS.readFile(url, 'utf8', function(err, res) {
				if (err) {
					onerror && onerror(err);
				} else {
					onsuccess && onsuccess({responseText: res}, res);
				}
			});
		} else {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			///
			if (headers) {
				for (var type in headers) {
					xhr.setRequestHeader(type, headers[type]);
				}
			} else if (data) { // set the default headers for POST
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			}
			if (mimeType) {
				xhr.overrideMimeType(mimeType);
			}
			if (responseType) {
				xhr.responseType = responseType;
			}
			if (withCredentials) {
				xhr.withCredentials = true;
			}
			if (onerror && 'onerror' in xhr) {
				xhr.onerror = onerror;
			}
			if (onprogress && xhr.upload && 'onprogress' in xhr.upload) {
				if (data) { // send
					xhr.upload.onprogress = function(evt) {
						onprogress.call(xhr, evt, event.loaded / event.total);
					};
				} else { // receive
					xhr.addEventListener('progress', function(evt) {
						var totalBytes = 0;
						if (evt.lengthComputable) {
							totalBytes = evt.total;
						} else if (xhr.totalBytes) {
							totalBytes = xhr.totalBytes;
						} else {
							var rawBytes = parseInt(xhr.getResponseHeader('Content-Length-Raw'));
							if (isFinite(rawBytes)) {
								xhr.totalBytes = totalBytes = rawBytes;
							} else {
								return;
							}
						}
						onprogress.call(xhr, evt, evt.loaded / totalBytes);
					}, false);
				}
			}
			///
			xhr.onreadystatechange = function(evt) {
				if (xhr.readyState === 4) { // The request is complete
					if (xhr.status === 200 || // Response OK
						xhr.status === 304 || // Not Modified
						xhr.status === 308 || // Permanent Redirect
						xhr.status === 0 && !!window.top.cordova // Cordova quirk
					) {
						if (onsuccess) {
							var res;
							if (format === 'json') {
								try {
									res = JSON.parse(evt.target.response);
								} catch(err) {
									onerror && onerror.call(xhr, evt);
								}
							} else if (format === 'xml') {
								res = evt.target.responseXML;
							} else if (format === 'text') {
								res = evt.target.responseText;
							} else {
								res = evt.target.response;
							}
							///
							onsuccess.call(xhr, evt, res);
						}
					} else {
						onerror && onerror.call(xhr, evt);
					}
				}
			};
			///
			xhr.send(data);
			///
			return xhr;
		}
	};

	/* NodeJS
	------------------------------------------------------ */
	if (typeof module === 'object' && module.exports) {
//TODO-PER: to make it compile		var NodeFS = require('fs');
		module.exports = root.request;
	}

})(galactic);

/***/ }),
/* 41 */
/***/ (function(module, exports) {

/*
	-------------------------------------------------------
	util/DOMMisc : 0.2.1 : 2015-04-27 : https://sketch.io
	-------------------------------------------------------
*/

if (typeof galactic === 'undefined') galactic = {};

(function(root) { 'use strict';

root.module = root.module || {};
root.module.DOMMisc = function(root) {

	var util = root.util || (root.util = {});

	/* Inherits
	---------------------------------------------------------- */
	util.inherits = function(child, parent) {
		function temp() {};
		temp.prototype = parent.prototype;
		child.prototype = new temp();
		child.prototype.constructor = child;
	};


	/* Error handler
	---------------------------------------------------------- */
	util.errorHandler = function(type) {
		return function() {
			console.warn(type, arguments);
		};
	};


	/* Kiosk
	---------------------------------------------------------- */
	util.requestKioskMode = function() {
		if (root.client.nodewebkit) {
			//TODO-PER: to make it compile			var win = require('nw.gui').Window.get();
			win.enterKioskMode();
		} else {
//			root.FullScreen.enter();
		}
	};


	/* Diff
	---------------------------------------------------------- */
	util.diff = function(_from, _to, _retain) { // see style.js
		if (_from === _to) return;
		///
		var from = new _from.constructor();
		var to = new _to.constructor();
		var equal = true;
		for (var key in _from) {
			if (_retain && _retain.indexOf(key) !== -1) {
				from[key] = _from[key];
				to[key] = _to[key];
			} else if (!(key in _to)) {
				equal = false;
				from[key] = _from[key];
				to[key] = _to[key];
			} else {
				if (_from[key] !== _to[key]) {
					if (typeof _from[key] === 'object' && typeof _to[key] === 'object') {
						var diff = util.diff(_from[key], _to[key], _retain);
						if (diff !== undefined) {
							equal = false;
							from[key] = diff.from;
							to[key] = diff.to;
						}
					} else {
						equal = false;
						from[key] = _from[key];
						to[key] = _to[key];
					}
				}
			}
		}
		for (var key in _to) {
			if (!(key in _from)) {
				equal = false;
				from[key] = _from[key];
				to[key] = _to[key];
			}
		}
		if (!equal) {
			return {
				from: from,
				to: to
			};
		}
	};


	/* Sort
	--------------------------------------------------- 
		util.sort({
			fn: 'natural', // string | custom function
			data: {},
			param: 'columnId'
		});
	*/
	util.sort = function(opts) {
		var fn = util.sort[opts.fn] || opts.fn;
		var data = opts.data || opts;
		var param = opts.param;
		///
		var res;
		if (Array.isArray(data)) { // sort arrays
			if (param) { // sort array by param
				res = data.sort(function(a, b) {
					return fn(a[param], b[param]);
				});
			} else { // sort array with custom function
				res = data.sort(fn);
			}
		} else { // sort object by key
			res = {};
			Object.keys(data).sort(fn).forEach(function(idx) {
				res[idx] = data[idx];
			});
		}
		return res;
	};
	
	util.sort.numeric = function(a, b) {
		return a - b;
	};

	/*
	 * Natural Sort algorithm for Javascript - Version 0.6 - Released under MIT license
	 * Author: Jim Palmer (based on chunking idea from Dave Koelle)
	 * Contributors: Mike Grier (mgrier.com), Clint Priest, Kyle Adams, guillermo
	 */
	util.sort.natural = function(a, b) { // http://www.overset.com/2008/09/01/javascript-natural-sort-algorithm-with-unicode-support/
		var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi;
		var sre = /(^[ ]*|[ ]*$)/g;
		var dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
		var hre = /^0x[0-9a-f]+$/i;
		var ore = /^0/;
		// convert all to strings and trim()
		var x = a.toString().replace(sre, '') || '';
		var y = b.toString().replace(sre, '') || '';
		// chunk/tokenize
		var xN = x.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
		var yN = y.replace(re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
		// numeric, hex or date detection
		var xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x));
		var yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null;

		// first try and sort Hex codes or Dates
		if (yD) {
			if (xD < yD) {
				return -1;
			} else if (xD > yD) {
				return 1;
			}
		}

		// natural sorting through split numeric strings and default strings
		for (var cLoc = 0, numS = Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
			// find floats not starting with '0', string or 0 if not defined (Clint Priest)
			var oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
			var oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
			// handle numeric vs string comparison - number < string - (Kyle Adams)
			if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
				return (isNaN(oFxNcL)) ? 1 : -1;
			} else if (typeof oFxNcL !== typeof oFyNcL) {
				// rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
				oFxNcL += '';
				oFyNcL += '';
			}
			if (oFxNcL < oFyNcL) {
				return -1;
			} else if (oFxNcL > oFyNcL) {
				return 1;
			}
		}
		return 0;
	};


	/* LocalStorage
	--------------------------------------------------- */
	util.getItems = function(keys, onsuccess) {
		var pending = keys.length;
		var res = {};
		util.each(keys, function(key) {
			util.getItem(key, function(value) {
				res[key] = value;
				///
				if (!--pending) {
					onsuccess(res);
				}
			});
		});
	};

	util.getItem = function(key, onsuccess) {
		onsuccess = onsuccess || function(value) {
		    console.log(value);
		};
		///
		var parse = function(value) {
			if (value) {
				try {
					value = JSON.parse(value);
				} catch(err) {}
			}
			///
			onsuccess(value);
		};
		///
		if (util.exists('chrome.storage.local')) { // Chrome Packaged Apps
			chrome.storage.local.get(key, function(data) {
				parse(data[key]);
			});
		} else {
			var prefix = root.feature && root.feature.prefix || '';
			var prefixed = prefix + '/' + key;
			var data = localStorage.getItem(prefixed) || '';
			parse(data);
		}
	};

	util.setItem = function(key, value) {
		if (util.exists('chrome.storage.local')) { // Chrome Packaged Apps
			var obj = {};
			obj[key] = value;
			chrome.storage.local.set(obj);
		} else {
			var prefix = root.feature && root.feature.prefix || '';
			var prefixed = prefix + '/' + key;
			localStorage.setItem(prefixed, value);
		}
	};


	/* Canvas
	--------------------------------------------------- */
	util.Canvas = function(width, height, type) {
		if (typeof document === 'undefined') { // NodeJS
			if (Canvas === undefined) {
				return {ctx: {}};
			} else {
				var canvas = new Canvas;
			}
		} else { // FlashCanvas | DOM
			var canvas = document.createElement('canvas');
			if (typeof FlashCanvas === 'function') {
				canvas.onload = root.client.fn.detect;
			}
		}
		///
		canvas.ctx = canvas.getContext(type || '2d');
		///
		if (isFinite(width)) {
			canvas.width = width || 1;
		}
		if (isFinite(height)) {
			canvas.height = height || 1;
		}
		return canvas;
	};

	util.Canvas.resize = function(canvas, width, height) { // clear context
		if (width && height) {
			canvas.width = width;
			canvas.height = height;
		} else {
			canvas.width = canvas.width;
		}
	};

	util.Canvas.clear = function(canvas) { // clear context rectangle
		canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};


	/* Context
	--------------------------------------------------- */
	util.Context3d = function(width, height) {
		return util.Canvas(width, height, 'webgl').ctx;
	};
	
	util.Context2d = function(width, height) {
		return util.Canvas(width, height, '2d').ctx;
	};
	

	/* JSON
	--------------------------------------------------- */
	util.json = {};
	util.json.pretty = function(data) {
		return JSON.stringify(data, null, '\t');
	};

	util.json.stringify = function(data) {
		return JSON.stringify(data, function(key, value) { // filter circular
			if (typeof value === 'object') {
				if (value === null) return; // NULL
				if (value.nodeName) return; // DOM Node
				if (value.tagName) return; // DOM Element
			}
			return value;
		});
	};


	/* Timestamp
	--------------------------------------------------- */
	util.timestamp = (function() {
		if (typeof window === 'object') {
			var performance = window.performance;
			if (performance && performance.now) {
				return performance.now.bind(performance);
			}
		}
		return Date.now;
	})();


	/* Perf
	--------------------------------------------------- */
	util.perf = function(fn, amount, title) {
		if (amount && fn) {
			var perf = util.perf();
			for (var n = 0; n < amount; n ++) fn();
			console.log(perf() + 'ms', title || '');
		} else {
			var start = util.timestamp();
			return function(title, reset) {
				var now = util.timestamp();
				var diff = Math.round(now - start);
				if (title) {
					console.log(diff + 'ms', title);
				}
				if (reset) {
					start = now;
				}
				return diff;
			};
		}
	};

	util.exists = function(path, base) { // exists('scene.children', sketch)
		try {
			var parts = path.split('.');
			var obj = base || window;
			for (var n = 0, length = parts.length; n < length; n ++) {
				var key = parts[n];
				if (obj[key] == null) {
					return false;
				} else {
					obj = obj[key];
				}
			}
			return true;
		} catch(err) {
			return false;
		}
	};


	/* Clone objects
	--------------------------------------------------- */
	util.copy = (function() {
		var excludePattern = typeof CanvasPattern === 'function';
		var copy = function(src) {
			if (!src || typeof src !== 'object') {
				return src;
			} else if (src.nodeType) {
				return; // dom element
			} else if (excludePattern && src instanceof CanvasPattern) {
				return;
			} else if (src.clone && typeof src.clone === 'function') {
				return src.clone();
			} else if (src.constructor) {
				var temp = new src.constructor();
				for (var key in src) {
					var fvalue = src[key];
					if (!fvalue || typeof fvalue !== 'object') {
						temp[key] = fvalue;
					} else { // clone sub-object
						temp[key] = copy(fvalue);
					}
				}
				return temp;
			}
		};
		return copy;
	})();


	/* Merge objects
	--------------------------------------------------- */
	util.copyInto = (function() {
		var copyInto = function(src, dst, opts) {
			opts = opts || {};
			if (src && typeof src === 'object') {
				for (var key in src) {
					var tvalue = dst[key];
					var fvalue = src[key];
					///
					var filter = opts.filter;
					if (filter && filter(fvalue, tvalue)) {
						continue;
					}
					///
					var ftype = typeof fvalue;
					if (fvalue && ftype === 'object') {
						if (fvalue.nodeType) {
							if (opts.referenceNodes) {
								dst[key] = fvalue;
							} else {
								continue; // dom element
							}
						} else {
							if (typeof tvalue === ftype) {
								dst[key] = copyInto(fvalue, tvalue, opts);
							} else {
								dst[key] = copyInto(fvalue, new fvalue.constructor(), opts);
							}
						}
					} else {
						dst[key] = fvalue;
					}
				}
			}
			return dst;
		};
		return copyInto;
	})();


	/* Count objects
	--------------------------------------------------- */
	util.count = function(obj, whereKey, whereValue) {
		if (obj) {
			if (isFinite(obj.length)) {
				return obj.length;
			} else if (typeof obj === 'object') {
				var length = 0;
				var useKey = whereKey !== undefined; //- replace with filter()
				var useValue = whereValue !== undefined;
				if (useKey && useValue) {
					for (var key in obj) {
						if (obj[key] && obj[key][whereKey] === whereValue) {
							++ length;
						}
					}
				} else if (useKey) {
					for (var key in obj) {
						if (obj[key] !== undefined) {
							++ length;
						}
					}
				} else {
					for (var key in obj) ++ length;
				}
				return length;
			}
		} else {
			return 0;
		}
	};

	util.isEmpty = function(obj) {
		if (obj == null) { // undefined | null
			return true;
		} else if (obj.length >= 0) { // array | string | arguments
			return !obj.length;
		} else { // object
			for (var key in obj) {
				return false;
			}
			return true;
		}
	};

	util.isNotEmpty = function(obj) {
		return !util.isEmpty(obj);
	};

	util.clamp = function(min, max, value) {
		return (value < min) ? min : ((value > max) ? max : value);
	};

	util.clampFinite = function(value) {
		var INFINITY = util.INFINITY;
		if (value > +INFINITY) value = +INFINITY;
		if (value < -INFINITY) value = -INFINITY;
		return value;
	};
	
	util.arrayEmpty = function(arr) {
		arr.splice(0, arr.length);
	};
	
	util.arrayIntersects = function(haystack, arr) {
		return arr.some(function(value) {
			return haystack.indexOf(value) !== -1;
		});
	};

	util.inArray = function(array, value) {
		return array.indexOf(value) !== -1;
	};

	util.isArray = function(obj) {
		return Array.isArray(obj) || obj instanceof NodeList;
	};

	util.each = function(obj, callback) {
		if (util.isArray(obj)) {
			for (var idx = 0; idx < obj.length; idx ++) {
				callback(obj[idx], idx);
			}
		} else {
			for (var key in obj) {
				callback(obj[key], key);
			}
		}
	};

	util.equals = function(a, b) {
		if (typeof a === 'object') {
			if (typeof b === 'object') {
				return util.json.stringify(a) === util.json.stringify(b);
			} else {
				return false;
			}
		} else {
			return a === b;
		}
	};


	/* Convert objects
	--------------------------------------------------- */
	util.objectToArray = function(obj) {
		var res = [];
		for (var key in obj) {
			res.push(obj[key]);
		}
		return res;
	};

	util.arrayToObject = function(arr) {
		var res = {};
		for (var n = 0, length = arr.length; n < length; n ++) {
			res[arr[n]] = true;
		}
		return res;
	};


	/* Uploader
	--------------------------------------------------- */
	util.addFileInput = function(data, openAsNew) {
		root.uploader.addFileInput({
			target: data,
			onchange: function(uploader) {
				uploader.fileInput.value = '';
				uploader.addMedia({
					openAsNew: openAsNew,
					self: root.uploader
				});
			}
		});
	};


	/* Format bytes
	---------------------------------------------------------- */
	util.bytesToSize = function(bytes, precision) {
		if (bytes) {
			precision = precision || 1;
			var names = ['Bytes', 'kb', 'mb', 'gb', 'tb'];
			var n = Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024));
			return (bytes / Math.pow(1024, n)).toFixed(precision) + names[n];
		} else {
			return '0Bytes';
		}
	};


	/* Format time
	---------------------------------------------------------- */
	util.getTimeFormat = function(timestamp, toString) { // in milliseconds
		timestamp /= 1000;
		var hours = (timestamp / 3600) >> 0;
		var minutes = ((timestamp - (hours * 3600)) / 60) >> 0;
		var seconds = (timestamp - (hours * 3600) - (minutes * 60)) >> 0;
		if (toString) {
			if (hours < 10) hours = '0' + hours;
			if (minutes < 10) minutes = '0' + minutes;
			if (seconds < 10) seconds = '0' + seconds;
			return hours + ':' + minutes + ':' + seconds;
		} else {
			return {
				hours: hours,
				minutes: minutes,
				seconds: seconds
			};
		}
	};

	util.require = function(opts) {
		if (typeof opts === 'string') opts = {url: opts};
		var url = opts.url;
		var type = opts.type || (url.indexOf('.css') !== -1 ? 'css' : 'js');
		var async = opts.async || false;
		var onsuccess = opts.onsuccess;
		///
		if (type === 'css') {
			if (async) {
				setTimeout(addCSS, 0);
			} else {
				addCSS();
			}
		} else {
			var script = document.createElement('script');
			script.src = url;
			script.async = async;
			///
			if (onsuccess) { // influenced by jQuery
				var loaded = false;
				script.onload = script.onreadystatechange = function() {
					if (loaded === false) {
						var readyState = script.readyState;
						if (!readyState || /loaded|complete/.test(readyState)) {
							loaded = true;
							onsuccess();
							// Handle memory leak in IE
							script.onload = script.onreadystatechange = null;
						}
					};
				};
			}
			///
			document.head.appendChild(script);
		}
		
		function addCSS() {
			var link = document.createElement('link');
			link.href = url;
			link.setAttribute('type', 'text/css');
			link.setAttribute('rel', 'stylesheet');
			document.head.appendChild(link);
		};
	};


	/* Detect whether focus element is editable node
	---------------------------------------------------------- */
	util.isEditingText = function() { // from eventjs
		var node = document.activeElement;
		if (!node) return false;
		var nodeName = node.nodeName;
		if (nodeName === 'INPUT' || nodeName === 'TEXTAREA' || node.contentEditable === 'true') {
			if (node.classList.contains('sk-canvas-dummy')) return false;
			return true;
		} else {
			return false;
		}
	};


	/* Pending queue
	---------------------------------------------------------- */
	util.pending = function(length, onsuccess) {
		var pending = length;
		return {
			add: function(amount) {
				pending += amount || 1;
			},
			next: function() {
				if (!--pending) {
					onsuccess();
				}
			}
		};
	};
};

/// NodeJS
if (typeof module !== 'undefined' && module.exports) {
	try {
		//TODO-PER: to make it compile var Canvas = require('canvas');
	} catch(e) {}
	///
	module.exports = root.module.DOMMisc;
} else {
	root.module.DOMMisc(galactic);
}

})(galactic);

/***/ }),
/* 42 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------
	AudioSupports : 2015-12-22 : https://mudcu.be
	----------------------------------------------------------
	https://github.com/mudcube/AudioSupports
	----------------------------------------------------------
	Probably, Maybe, No... Absolutely!
	Determine audio formats and features your browser supports.
	----------------------------------------------------------
	TEST FILES - can these be smaller?
	----------------------------------------------------------
		Ogg Opus:      176-bytes
		Ogg Vorbis:    3,177-bytes
		MP3:           306-bytes
	----------------------------------------------------------
*/

(function () { 'use strict';

	var supports = {};
	var tests = {};

	function AudioSupports() {
		detectAudio();
		detectMIDI();
		detectWebAudio();

		return detectAudioFormats().then(function () {
			return supports;
		});
	}


	/* synchronous detects */
	function detectAudio() {
		return supports.audio = self.Audio ? {} : false;
	}
	
	function detectWebAudio() {
		return supports.audioapi = AudioContext ? {} : false;
	}
	
	function detectMIDI() {
		if (navigator.requestMIDIAccess) {
			var toString = Function.prototype.toString;
			var isNative = toString.call(navigator.requestMIDIAccess).indexOf('[native code]') !== -1;
			if (isNative) { // has native midi support
				return supports.midiapi = {};
			} else { // check for jazz plugin support
				for (var n = 0; navigator.plugins.length > n; n ++) {
					var plugin = navigator.plugins[n];
					if (plugin.name.indexOf('Jazz-Plugin') >= 0) {
						return supports.midiapi = {};
					}
				}
			}
		}
		return supports.midiapi = false;
	}


	/* asynchronous detects */
	function detectAudioFormats() {
		return new Promise(function (resolve, reject) {
			if (!supports.audio) {
				return resolve();
			}

			/* max execution time */
			setTimeout(resolve, 5000);

			/* run tests */
			Promise.all([
				canPlayThrough(tests['mpeg_mp3']),
				canPlayThrough(tests['ogg_opus']),
				canPlayThrough(tests['ogg_vorbis'])
			]).then(resolve);
		});
	}

	function canPlayThrough(test) {
		return new Promise(function (resolve, reject) {
			var format = test.format;
			var codec = test.codec;
			var base64 = test.base64;
			
			var mime = 'audio/' + format + '; codecs="' + codec + '"';
			var src = 'data:' + mime + ';base64,' + base64;

			var audio = new Audio();
			if (!audio.canPlayType(mime).replace(/no/i, '')) {
				hasSupport(false);
				return;
			}

			audio.id = 'audio';
			audio.controls = false;
			audio.setAttribute('autobuffer', true);
			audio.setAttribute('preload', 'auto');
			audio.addEventListener('error', function onError(err) {
				if (createObjectURL && !audio.testedBlobURL) {
					audio.testedBlobURL = true; // workaround for https://code.google.com/p/chromium/issues/detail?id=544988&q=Cr%3DInternals-Media&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified
					audio.src = createObjectURL(base64ToBlob(src));
				} else {
					audio.removeEventListener('error', onError);
					hasSupport(false);
				}
			});
			audio.addEventListener('canplaythrough', function onCanPlayThrough() {
				audio.removeEventListener('canplaythrough', onCanPlayThrough);
				hasSupport(true);
			});
			audio.src = src;
			audio.load();

			function hasSupport(truthy) {
				record(supports.audio, format, codec, truthy);
				
				if (!supports.audioapi) {
					resolve();
					return;
				}

				detectDecodeAudio(src).then(function () {
					record(supports.audioapi, format, codec, true);
					resolve();
				}, function (err) {
					record(supports.audioapi, format, codec, false);
					resolve();
				});
				
				function record(_supports, format, codec, truthy) {
					!supports[format] && (supports[format] = truthy);
					!supports[codec] && (supports[codec] = truthy);
					!_supports[format] && (_supports[format] = truthy);
					_supports[codec] = truthy;
				}
			}
		});
	}
	
	var audioContext;
	var AudioContext = self.AudioContext || self.mozAudioContext || self.webkitAudioContext;
	var createObjectURL = (self.URL || self.webkitURL || {}).createObjectURL;

	function detectDecodeAudio(src) {
		return new Promise(function (resolve, reject) {
			audioContext = audioContext || new AudioContext();
			audioContext.decodeAudioData(base64ToBuffer(src), resolve, reject).then(function(resp) {
			}).catch(function(err) {
				// It's ok to fail this test: suppress the console message for it.
			});
			setTimeout(reject, 250); // chrome workaround https://code.google.com/p/chromium/issues/detail?id=424174
		});
	}

	/* base64 utils */
	function base64Mime(uri) {
		uri = uri.split(',');
		return uri[0].split(':')[1].split(';')[0];
	}

	function base64ToBuffer(uri) {
		uri = uri.split(',');
		var binary = atob(uri[1]);
		var buffer = new ArrayBuffer(binary.length);
		var uint = new Uint8Array(buffer);
		for (var n = 0; n < binary.length; n++) {
			uint[n] = binary.charCodeAt(n);
		}
		return buffer;
	}
	
	function base64ToBlob(uri) {
		return new Blob([base64ToBuffer(uri)], {
			type: base64Mime(uri)
		});
	}
	

	/* register formats */
	function register(format, codec, base64) {
		tests[format + '_' + codec] = {
			format: format,
			codec: codec,
			base64: base64
		};
	}


	/* formats */
	register('mpeg', 'mp3', '//MUxAAB6AXgAAAAAPP+c6nf//yi/6f3//MUxAMAAAIAAAjEcH//0fTX6C9Lf//0//MUxA4BeAIAAAAAAKX2/6zv//+IlR4f//MUxBMCMAH8AAAAABYWalVMQU1FMy45//MUxBUB0AH0AAAAADkuM1VVVVVVVVVV//MUxBgBUATowAAAAFVVVVVVVVVVVVVV'); // via Modernizr
	register('ogg', 'opus', 'T2dnUwACAAAAAAAAAAAAAAAAAAAAAEVP7KoBE09wdXNIZWFkAQEAD0SsAAAAAABPZ2dTAAAAAAAAAAAAAAAAAAABAAAAVewFUgEYT3B1c1RhZ3MIAAAAUmVjb3JkZXIAAAAAT2dnUwAEwAMAAAAAAAAAAAAAAgAAAHSiY8oBA/j//g==');
	register('ogg', 'vorbis', 'T2dnUwACAAAAAAAAAAD/QwAAAAAAAM2LVKsBHgF2b3JiaXMAAAAAAUSsAAAAAAAAgLsAAAAAAAC4AU9nZ1MAAAAAAAAAAAAA/0MAAAEAAADmvOe6Dy3/////////////////MgN2b3JiaXMdAAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAwNzA2MjIAAAAAAQV2b3JiaXMfQkNWAQAAAQAYY1QpRplS0kqJGXOUMUaZYpJKiaWEFkJInXMUU6k515xrrLm1IIQQGlNQKQWZUo5SaRljkCkFmVIQS0kldBI6J51jEFtJwdaYa4tBthyEDZpSTCnElFKKQggZU4wpxZRSSkIHJXQOOuYcU45KKEG4nHOrtZaWY4updJJK5yRkTEJIKYWSSgelU05CSDWW1lIpHXNSUmpB6CCEEEK2IIQNgtCQVQAAAQDAQBAasgoAUAAAEIqhGIoChIasAgAyAAAEoCiO4iiOIzmSY0kWEBqyCgAAAgAQAADAcBRJkRTJsSRL0ixL00RRVX3VNlVV9nVd13Vd13UgNGQVAAABAEBIp5mlGiDCDGQYCA1ZBQAgAAAARijCEANCQ1YBAAABAABiKDmIJrTmfHOOg2Y5aCrF5nRwItXmSW4q5uacc845J5tzxjjnnHOKcmYxaCa05pxzEoNmKWgmtOacc57E5kFrqrTmnHPGOaeDcUYY55xzmrTmQWo21uaccxa0pjlqLsXmnHMi5eZJbS7V5pxzzjnnnHPOOeecc6oXp3NwTjjnnHOi9uZabkIX55xzPhmne3NCOOecc84555xzzjnnnHOC0JBVAAAQAABBGDaGcacgSJ+jgRhFiGnIpAfdo8MkaAxyCqlHo6ORUuoglFTGSSmdIDRkFQAACAAAIYQUUkghhRRSSCGFFFKIIYYYYsgpp5yCCiqppKKKMsoss8wyyyyzzDLrsLPOOuwwxBBDDK20EktNtdVYY62555xrDtJaaa211koppZRSSikIDVkFAIAAABAIGWSQQUYhhRRSiCGmnHLKKaigAkJDVgEAgAAAAgAAADzJc0RHdERHdERHdERHdETHczxHlERJlERJtEzL1ExPFVXVlV1b1mXd9m1hF3bd93Xf93Xj14VhWZZlWZZlWZZlWZZlWZZlWYLQkFUAAAgAAIAQQgghhRRSSCGlGGPMMeegk1BCIDRkFQAACAAgAAAAwFEcxXEkR3IkyZIsSZM0S7M8zdM8TfREURRN01RFV3RF3bRF2ZRN13RN2XRVWbVdWbZt2dZtX5Zt3/d93/d93/d93/d93/d1HQgNWQUASAAA6EiOpEiKpEiO4ziSJAGhIasAABkAAAEAKIqjOI7jSJIkSZakSZ7lWaJmaqZneqqoAqEhqwAAQAAAAQAAAAAAKJriKabiKaLiOaIjSqJlWqKmaq4om7Lruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7rui4QGrIKAJAAANCRHMmRHEmRFEmRHMkBQkNWAQAyAAACAHAMx5AUybEsS9M8zdM8TfRET/RMTxVd0QVCQ1YBAIAAAAIAAAAAADAkw1IsR3M0SZRUS7VUTbVUSxVVT1VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTVN0zRNIDRkJQAABADAYo3B5SAhJSXl3hDCEJOeMSYhtV4hBJGS3jEGFYOeMqIMct5C4xCDHggNWREARAEAAMYgxxBzyDlHqZMSOeeodJQa5xyljlJnKcWYYs0oldhSrI1zjlJHraOUYiwtdpRSjanGAgAAAhwAAAIshEJDVgQAUQAAhDFIKaQUYow5p5xDjCnnmHOGMeYcc44556B0UirnnHROSsQYc445p5xzUjonlXNOSiehAACAAAcAgAALodCQFQFAnACAQZI8T/I0UZQ0TxRFU3RdUTRd1/I81fRMU1U90VRVU1Vt2VRVWZY8zzQ901RVzzRV1VRVWTZVVZZFVdVt03V123RV3ZZt2/ddWxZ2UVVt3VRd2zdV1/Zd2fZ9WdZ1Y/I8VfVM03U903Rl1XVtW3VdXfdMU5ZN15Vl03Vt25VlXXdl2fc103Rd01Vl2XRd2XZlV7ddWfZ903WF35VlX1dlWRh2XfeFW9eV5XRd3VdlVzdWWfZ9W9eF4dZ1YZk8T1U903RdzzRdV3VdX1dd19Y105Rl03Vt2VRdWXZl2fddV9Z1zzRl2XRd2zZdV5ZdWfZ9V5Z13XRdX1dlWfhVV/Z1WdeV4dZt4Tdd1/dVWfaFV5Z14dZ1Ybl1XRg+VfV9U3aF4XRl39eF31luXTiW0XV9YZVt4VhlWTl+4ViW3feVZXRdX1ht2RhWWRaGX/id5fZ943h1XRlu3efMuu8Mx++k+8rT1W1jmX3dWWZfd47hGDq/8OOpqq+brisMpywLv+3rxrP7vrKMruv7qiwLvyrbwrHrvvP8vrAso+z6wmrLwrDatjHcvm4sv3Acy2vryjHrvlG2dXxfeArD83R1XXlmXcf2dXTjRzh+ygAAgAEHAIAAE8pAoSErAoA4AQCPJImiZFmiKFmWKIqm6LqiaLqupGmmqWmeaVqaZ5qmaaqyKZquLGmaaVqeZpqap5mmaJqua5qmrIqmKcumasqyaZqy7LqybbuubNuiacqyaZqybJqmLLuyq9uu7Oq6pFmmqXmeaWqeZ5qmasqyaZquq3meanqeaKqeKKqqaqqqraqqLFueZ5qa6KmmJ4qqaqqmrZqqKsumqtqyaaq2bKqqbbuq7Pqybeu6aaqybaqmLZuqatuu7OqyLNu6L2maaWqeZ5qa55mmaZqybJqqK1uep5qeKKqq5ommaqqqLJumqsqW55mqJ4qq6omea5qqKsumatqqaZq2bKqqLZumKsuubfu+68qybqqqbJuqauumasqybMu+78qq7oqmKcumqtqyaaqyLduy78uyrPuiacqyaaqybaqqLsuybRuzbPu6aJqybaqmLZuqKtuyLfu6LNu678qub6uqrOuyLfu67vqucOu6MLyybPuqrPq6K9u6b+sy2/Z9RNOUZVM1bdtUVVl2Zdn2Zdv2fdE0bVtVVVs2TdW2ZVn2fVm2bWE0Tdk2VVXWTdW0bVmWbWG2ZeF2Zdm3ZVv2ddeVdV/XfePXZd3murLty7Kt+6qr+rbu+8Jw667wCgAAGHAAAAgwoQwUGrISAIgCAACMYYwxCI1SzjkHoVHKOecgZM5BCCGVzDkIIZSSOQehlJQy5yCUklIIoZSUWgshlJRSawUAABQ4AAAE2KApsThAoSErAYBUAACD41iW55miatqyY0meJ4qqqaq27UiW54miaaqqbVueJ4qmqaqu6+ua54miaaqq6+q6aJqmqaqu67q6Lpqiqaqq67qyrpumqqquK7uy7Oumqqqq68quLPvCqrquK8uybevCsKqu68qybNu2b9y6ruu+7/vCka3rui78wjEMRwEA4AkOAEAFNqyOcFI0FlhoyEoAIAMAgDAGIYMQQgYhhJBSSiGllBIAADDgAAAQYEIZKDRkRQAQJwAAGEMppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkgppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkqppJRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoplVJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSCgCQinAAkHowoQwUGrISAEgFAACMUUopxpyDEDHmGGPQSSgpYsw5xhyUklLlHIQQUmktt8o5CCGk1FJtmXNSWosx5hgz56SkFFvNOYdSUoux5ppr7qS0VmuuNedaWqs115xzzbm0FmuuOdecc8sx15xzzjnnGHPOOeecc84FAOA0OACAHtiwOsJJ0VhgoSErAYBUAAACGaUYc8456BBSjDnnHIQQIoUYc845CCFUjDnnHHQQQqgYc8w5CCGEkDnnHIQQQgghcw466CCEEEIHHYQQQgihlM5BCCGEEEooIYQQQgghhBA6CCGEEEIIIYQQQgghhFJKCCGEEEIJoZRQAABggQMAQIANqyOcFI0FFhqyEgAAAgCAHJagUs6EQY5Bjw1BylEzDUJMOdGZYk5qMxVTkDkQnXQSGWpB2V4yCwAAgCAAIMAEEBggKPhCCIgxAABBiMwQCYVVsMCgDBoc5gHAA0SERACQmKBIu7iALgNc0MVdB0IIQhCCWBxAAQk4OOGGJ97whBucoFNU6iAAAAAAAAwA4AEA4KAAIiKaq7C4wMjQ2ODo8AgAAAAAABYA+AAAOD6AiIjmKiwuMDI0Njg6PAIAAAAAAAAAAICAgAAAAAAAQAAAAICAT2dnUwAE7AwAAAAAAAD/QwAAAgAAADuydfsFAQEBAQEACg4ODg=='); // via Modernizr


	/* expose */
	self.AudioSupports = AudioSupports;
	self.AudioSupports.register = register;

})();

/***/ }),
/* 43 */
/***/ (function(module, exports) {

/* 
	----------------------------------------------------------
	EventEmitter : 2015-09-29 : https://sketch.io
	----------------------------------------------------------
	root.EventEmitter(object);
	object.on('blah', function(){});
	object.emit('blah');
	----------------------------------------------------------
*/

if (typeof galactic === 'undefined') galactic = {};

(function(root) { 'use strict';

root.EventEmitter = function(proto) {

	var uniqueId = 1;
	function funcID(type, fn) {
		if (typeof fn === 'function') {
			var fnId = fn.uniqueId || (fn.uniqueId = uniqueId++);
			return type + '.' + fnId;
		} else {
			console.warn(type, 'listener does not exist');
		}
	};

	function listener(type) {
		if (proto.on[type]) {
			return proto.on[type];
		} else {
			return proto.on[type] = Stack(type);
		}
	};

	function Stack(type) {
		var stack = {};
		///
		function emitter() {
			var overrides = false;
			for (var key in stack) {
				if (stack[key].apply(proto, arguments)) {
					overrides = true;
				}
			}
			return overrides;
		};

		emitter.add = function(fn) {
			var fid = funcID(type, fn);
			if (stack[fid] === undefined && fn) {
				stack[fid] = fn;
				return {
					add: function() {
						stack[fid] = fn;
					},
					remove: function() {
						delete stack[fid];
					}
				};
			}
		};

		emitter.remove = function(fn) {
			var fid = funcID(type, fn);
			if (stack[fid] !== undefined && fn) {
				delete stack[fid];
			}
		};
		
		emitter.stack = stack; // easier debugging

		return emitter;
	};

	proto.on = function(type, fn) {
		return listener(type).add(fn);
	};

	proto.off = function(type, fn) {
		if (fn) {
			listener(type).remove(fn);
		} else {
			delete proto.on[type];
		}
	};

	proto.emit = function(type) {
		var stack = proto.on[type];
		if (stack) {
			var args = Array.prototype.slice.call(arguments).slice(1);
			return stack.apply(proto, args);
		}
	};
};

})(galactic);

/***/ }),
/* 44 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------
	MIDI/loader : 2015-12-22 : https://mudcu.be
	----------------------------------------------------------
	https://github.com/mudcube/MIDI.js
	----------------------------------------------------------
*/

if (typeof MIDI === 'undefined') MIDI = {};

(function (MIDI) { 'use strict';


	/** globals **/
	MIDI.DEBUG = false;
	MIDI.USE_XHR = true;
	MIDI.PATH = './soundfont/';

	if (MIDI.DEBUG && console && console.log) {
		console.log('%c♥ MIDI.js 0.4.2 ♥', 'color: red;');
	}

	/** priorities **/
	var _adaptorPriority = {
		'midiapi': 0,
		'audioapi': 1,
		'audio': 2
	};

	var _formatPriority = {
		'ogg': 0,
		'mp3': 1
	};

	/** setup **/
	MIDI.setup = function (args) {
		return new Promise(function (resolve, reject) {
			args = args || {};
			if (typeof args === 'function') args = {onsuccess: args};

			if (isFinite(args.debug)) {
				MIDI.DEBUG = !!args.debug;
			}

			/* custom paths */
			if (args.soundfontUrl) {
				MIDI.PATH = args.soundfontUrl;
			}

			/* choose adaptor */
			AudioSupports().then(function (supports) {
				if (chooseFormat()) {
					chooseAdaptor();
				} else {
					reject({
						message: 'MIDIJS: Browser does not have necessary audio support.'
					});
				}

				function chooseFormat() {

					/* empty object */
					for (var key in MIDI.adaptor) {
						delete MIDI.adaptor[key];
					}

					/* choose format based on priority */
					for (var format in _formatPriority) {
						if (supports[format]) {
							MIDI.adaptor.format = format;
							return true; // yay!...
						}
					}
				}

				function chooseAdaptor() {
					if (supports[location.hash.substr(1)]) {
						loadAdaptor(location.hash.substr(1));
					} else if (supports.midi_api) {
						loadAdaptor('midiapi');
					} else if (window.AudioContext) {
						loadAdaptor('audioapi');
					} else if (window.Audio) {
						loadAdaptor('Audio');
					}
				}

				function loadAdaptor(tech) {
					tech = tech.toLowerCase();
					var format = MIDI.adaptor.format;
					var canPlayThrough = supports[tech];
//					console.log("loadAdaptor", tech, format, canPlayThrough, supports);
					if (!canPlayThrough[format]) {
						handleError();
						return;
					}

					args.tech = tech;

					MIDI.loadProgram(args).then(function () {
						resolve();
					}).catch(function (err) {
						MIDI.DEBUG && console.error(tech, err);
						handleError(err);
					});

					function handleError(err) {
						var idx = parseInt(_adaptorPriority[tech]) + 1;
						var nextAdaptor = Object.keys(_adaptorPriority)[idx];
						if (nextAdaptor) {
							loadAdaptor(nextAdaptor);
						} else {
							reject && reject({
								message: 'All plugins failed.'
							});
						}
					}
				}
			}, reject);
		});
	};


	/** loadProgram **/
	MIDI.loadProgram = function (args) {
		args || (args = {});
		typeof args === 'object' || (args = {instrument: args});
		args.instruments = instrumentList();
		args.tech = args.tech || MIDI.adaptor.id;

		return MIDI.adaptors._load(args);

		/* helpers */
		function instrumentList() {
			var programs = args.instruments || args.instrument || MIDI.channels[0].program;
			if (typeof programs === 'object') {
				Array.isArray(programs) || (programs = Object.keys(programs));
			} else {
				if (programs === undefined) {
					programs = [];
				} else {
					programs = [programs];
				}
			}

			/* program number -> id */
			for (var n = 0; n < programs.length; n ++) {
				var programId = programs[n];
				if (programId >= 0) {
					var program = MIDI.getProgram(programId);
					if (program) {
						programs[n] = program.nameId;
					}
				}
			}
			if (programs.length === 0) {
				programs = ['acoustic_grand_piano'];
			}
			return programs;
		}
	};

})(MIDI);

/***/ }),
/* 45 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------------------
	adaptors
	----------------------------------------------------------------------
*/

if (typeof MIDI === 'undefined') MIDI = {};

(function (MIDI) { 'use strict';

	var _adaptor = MIDI.adaptor = {};
	var _adaptors = MIDI.adaptors = {};
	var _requests = _adaptors._requests = {};
	var _load = _adaptors._load = function (args) {
		resetAdaptor();
		if (args.tech === 'midiapi') {
			return _adaptors.midiapi.connect(args);
		} else {
			return requestQueue(args);
		}
	};

	function requestQueue(args) {
		return new Promise(function (resolve, reject) {
			var audioFormat = _adaptor.format.split('_').shift();
			var programs = args.instruments;
			var onprogress = args.onprogress;
			var tech = args.tech;
			
			var length = programs.length;

			for (var i = 0; i < length; i ++) {
				var programId = programs[i];
				var request = _requests[programId] || (_requests[programId] = {});

				if (request.loaded) {
					waitForEnd([programId]);
				} else if (request.loading) {
					request.queue.push(resolve);
				} else {
					request.queue = [resolve];
					request.loading = true;

					sendRequest(programId, audioFormat).then(function (pgm) {
						waitForEnd(pgm);
					}).catch(reject);
				}
			}

			function emitProgress(progress, programId) {
				if (emitProgress.progress !== progress) {
					emitProgress.progress = progress;
					onprogress && onprogress('load', progress, programId);
				}
			}
			
			function waitForEnd(pgm) {
				_requests[pgm].loading = false;
				var pending = false;
				for (var key in _requests) {
					if (_requests.hasOwnProperty(key)) {
						if (_requests[key].loading) {
							pending = true;
						}
					}
				}
				if (!pending) {
					emitProgress(1.0);
					_adaptors[tech].connect(args).then(function () {
						programs.forEach(function (programId) {
							var request = _requests[programId];
							var cb;
							while(cb = request.queue.pop()) {
								cb();
							}
						});
					}).catch(reject);
				}
			}
		});

		function sendRequest(programId, audioFormat, onprogress) {
			return new Promise(function (resolve, reject) {
				var soundfontPath = MIDI.PATH + programId + '-' + audioFormat + '.js';
				if (MIDI.USE_XHR) {
					galactic.request({
						url: soundfontPath,
						format: 'text',
						onerror: reject,
						onprogress: onprogress,
						onsuccess: function (event, responseText) {
							var script = document.createElement('script');
							script.language = 'javascript';
							script.type = 'text/javascript';
							script.text = responseText;
							document.body.appendChild(script);
							resolve(programId);
						}
					});
				} else {
					dom.loadScript.add({
						url: soundfontPath,
						verify: 'MIDI.Soundfont["' + programId + '"]',
						onerror: reject,
						onsuccess: resolve
					});
				}
			});
		}
	};


	/* resetAdaptor */
	function resetAdaptor() {

		/* currentTime */
		(function () {
			var _now = performance.now();
			Object.defineProperties(MIDI, {
				'currentTime': {
					configurable: true,
					get: function () {
						return performance.now() - _now;
					}
				}
			});
		})();


		/* set */
		MIDI.set = function (property, value, delay) {
			if (delay) {
				return setTimeout(function () {
					MIDI[property] = value;
				}, delay * 1000);
			} else {
				MIDI[property] = value;
			}
		};


		/** programChange **/
		MIDI.messageHandler = {};
		MIDI.programChange = function (channelId, programId, delay) {
			var program = MIDI.getProgram(programId);
			if (program && Number.isFinite(programId = program.id)) {
				var channel = MIDI.channels[channelId];
				if (channel && channel.program !== programId) {
					if (delay) {
						setTimeout(function () { //- is there a better option?
							channel.program = programId;
						}, delay);
					} else {
						channel.program = programId;
					}
					
					var wrapper = MIDI.messageHandler.program || programHandler;
					if (wrapper) {
						wrapper(channelId, programId, delay);
					}
				}
			}
		};
	
		function programHandler(channelId, program, delay) {
			if (MIDI.adaptor.id) {
				if (MIDI.player.playing) {
					MIDI.loadProgram(program).then(MIDI.player.start);
				} else {
					MIDI.loadProgram(program);
				}
			}
		}


		/* globals */
		Object.defineProperties(MIDI, {
			'context': set(null),
			'detune': set('detune', 0),
			'fx': set('fx', null),
			'mute': set('mute', false),
			'volume': set('volume', 1.0)
		});
		
		function set(_type, _value) {
			return {
				configurable: true,
				get: function () {
					return _value;
				},
				set: function (value) {
					_value = value;
					handleError(_type);
				}
			};
		}


		/* functions */
		MIDI.send = handleErrorWrapper('send');
		MIDI.noteOn = handleErrorWrapper('noteOn');
		MIDI.noteOff = handleErrorWrapper('noteOff');
		MIDI.cancelNotes = handleErrorWrapper('cancelNotes');
		
		MIDI.setController = handleErrorWrapper('setController'); //- depreciate
		MIDI.setEffects = handleErrorWrapper('setEffects'); //- depreciate
		MIDI.setPitchBend = handleErrorWrapper('setPitchBend'); //- depreciate
		MIDI.setProperty = handleErrorWrapper('setProperty');
		MIDI.setVolume = handleErrorWrapper('setVolume'); //- depreciate
		
		MIDI.iOSUnlock = handleErrorWrapper('iOSUnlock');
		
		/* helpers */
		function handleError(_type) {
			MIDI.DEBUG && console.warn('The ' + _adaptor.id + ' adaptor does not support "' + _type + '".');
		}

		function handleErrorWrapper(_type) {
			return function () {
				handleError(_type);
			};
		}
	}
	
	resetAdaptor();
	
})(MIDI);

/***/ }),
/* 46 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------------------
	adaptors-Audio
	----------------------------------------------------------------------
	http://dev.w3.org/html5/spec/Overview.html#the-audio-element
	----------------------------------------------------------------------
*/

window.Audio && (function () { 'use strict';

	var midi = MIDI.adaptors.audio = {};
	
	var _buffers = []; // the audio channels
	var _buffer_nid = -1; // current channel
	var _active = []; // programId + noteId that is currently playing in each 'channel', for routing noteOff/chordOff calls
	var _apply = {};

	/** connect **/
	midi.connect = function (args) {

		MIDI.adaptor.id = 'audio';


		/** init **/
		for (var bufferId = 0; bufferId < 12; bufferId ++) {
			_buffers[bufferId] || (_buffers[bufferId] = new Audio());
		}


		/** properties **/
		defineProperties();


		/** volume **/
		_apply.volume = function (source) {
			var channel = source._channel;
			if (MIDI.mute || channel.mute) {
				source.volume = 0.0;
			} else {
				var volume = MIDI.volume * channel.volume * source._volume;
				source.volume = Math.min(1.0, Math.max(-1.0, volume * 2.0));
			}
		};


		/** noteOn/Off **/
		MIDI.noteOn = function (channelId, noteId, velocity, delay) {
			switch(typeof noteId) {
				case 'number':
					return noteOn.apply(null, arguments);
				case 'string':
					break;
				case 'object':
					return noteGroupOn.apply(null, arguments);
			}
		};

		MIDI.noteOff = function (channelId, noteId, delay) {
			switch(typeof noteId) {
				case 'number':
					return noteOff.apply(null, arguments);
				case 'string':
					break;
				case 'object':
					return noteGroupOff.apply(null, arguments);
			}
		};


		/** stopAllNotes **/
		MIDI.stopAllNotes = function (channelId) {
			if (isFinite(channelId)) {
			
			} else {
				for (var bufferId = 0, length = _buffers.length; bufferId < length; bufferId++) {
					_buffers[bufferId].pause();
				}
			}
		};


		/** connect **/
		return new Promise(function (resolve, reject) {
			var _requests = MIDI.adaptors._requests;
			var soundfonts = MIDI.Soundfont;
			for (var programId in soundfonts) {
				var request = _requests[programId] || (_requests[programId] = {});
				request.loaded = true;
				request.loading = false;
			}
			resolve();
		});
	};


	/** helpers **/
	function noteOn(channelId, note, velocity, delay) {
		var timeout;
		var noteName = MIDI.getNoteName(note);
		if (delay) {
			timeout = setTimeout(function () {
				startChannel(channelId, noteName, velocity);
			}, delay * 1000);
		} else {
			startChannel(channelId, noteName, velocity);
		}
		return {
			cancel: function () {
				clearTimeout(timeout);
			}
		};
	};

	function noteOff(channelId, note, delay) {
		var timeout;
// 		var noteName = MIDI.getNoteName(note); // this sounds bad
// 		if (delay) {
// 			timeout = setTimeout(function () {
// 				stopChannel(channelId, noteName);
// 			}, delay * 1000)
// 		} else {
// 			stopChannel(channelId, noteName);
// 		}
		return {
			cancel: function () {
				clearTimeout(timeout);
			}
		};
	};

	function noteGroupOn(channelId, notes, velocity, delay) {
		for (var i = 0; i < notes.length; i ++) {
			var note = notes[i];
			var noteName = MIDI.getNoteName(note);
			if (noteName) {
				if (delay) {
					return setTimeout(function () {
						startChannel(channelId, noteName, velocity);
					}, delay * 1000);
				} else {
					startChannel(channelId, noteName, velocity);
				}
			}
		}
	};

	function noteGroupOff(channelId, notes, delay) {
		for (var i = 0; i < notes.length; i ++) {
			var note = notes[i];
			var noteName = MIDI.getNoteName(note);
			if (noteName) {
				if (delay) {
					return setTimeout(function () {
						stopChannel(channelId, noteName);
					}, delay * 1000);
				} else {
					stopChannel(channelId, noteName);
				}
			}
		}
	};

	function startChannel(channelId, noteName, velocity) {
		var channel = MIDI.channels[channelId];
		if (channel) {
			var program = channel.program;
			var programId = MIDI.getProgram(program).nameId;
			var sourceId = programId + '' + noteName;
			var bufferId = (_buffer_nid + 1) % _buffers.length;
			
			var soundfont = MIDI.Soundfont[programId];
			if (soundfont) {
				var source = _buffers[bufferId];
				source.src = soundfont[noteName];
				source._channel = channel;
				source._volume = velocity;
				source._id = sourceId;
				
				_apply.volume(source);
				
				source.play();
				
				_buffer_nid = bufferId;
				_active[bufferId] = source;
			} else {
				MIDI.DEBUG && console.log('404', programId);
			}
		}
	};

	function stopChannel(channelId, noteName) {
		var channel = MIDI.channels[channelId];
		if (channel) {
			var program = channel.program;
			var programId = MIDI.getProgram(program).nameId;
			var sourceId = programId + '' + noteName;
			
			for (var i = 0, len = _buffers.length; i < len; i++) {
				var bufferId = (i + _buffer_nid + 1) % len;
				var source = _active[bufferId];
				if (source && source._id === sourceId) {
					_buffers[bufferId].pause();
					_active[bufferId] = null;
					return;
				}
			}
		}
	};

	function defineProperties() {
		Object.defineProperties(MIDI, {
			'mute': set('boolean', false, handler('volume')),
			'volume': set('number', 1.0, handler('volume'))
		});
	
		function set(_format, _value, _handler) {
			return {
				configurable: true,
				get: function () {
					return _value;
				},
				set: function (value) {
					if (typeof value === _format) {
						_value = value;
						_handler && _handler();
					}
				}
			}
		};

		function handler(type) {
			return function () {
				for (var sourceId in _active) {
					_apply[type](_active[sourceId]);
				}
			};
		};
	};

})();

/***/ }),
/* 47 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------------------
	adaptors-AudioAPI
	----------------------------------------------------------------------
	http://webaudio.github.io/web-audio-api/
	----------------------------------------------------------------------
*/

window.AudioContext && (function () { 'use strict';

	var adaptors = MIDI.adaptors;
	var midi = adaptors.audioapi = {};
	
	var _ctx = createAudioContext();
	var _buffers = {}; // downloaded & decoded audio buffers
	var _requests = adaptors._requests; // queue
	var _apply = {};

	var _scheduled = {}; // audio sources that are scheduled to play

	/** connect **/
	midi.connect = function (args) {

		MIDI.adaptor.id = 'audioapi';


		/** properties **/
		defineProperties();


		/** volume **/
		_apply.volume = function (source) {
			var node = source.gainNode.gain;
			var channel = source._channel;
			
			/* set value */
			if (MIDI.mute || channel.mute) {
				node.value = 0.0;
			} else {
				var volume = MIDI.volume * channel.volume * source._volume;
				node.value = Math.min(2.0, Math.max(0.0, volume));
			}
			
			/* reschedule fadeout */
			if (node._fadeout) {
				node.cancelScheduledValues(_ctx.currentTime);
				node.linearRampToValueAtTime(node.value, node._startAt);
				node.linearRampToValueAtTime(0.0, node._startAt + 0.3);
			}
		};


		/** detune **/
		_apply.detune = function (source) {
			if (_ctx.hasDetune) {
				var channel = source._channel;
				var detune = MIDI.detune + channel.detune;
				if (detune) {
					source.detune.value = detune; // -1200 to 1200 - value in cents [100 cents per semitone]
				}
			}
		};
		

		/** fx **/
		_apply.fx = function (source) {
			var channel = source._channel;
			var chain = source.gainNode;
			
			source.disconnect(0);
			source.connect(chain);
			
			apply(MIDI.fxNodes); // apply master effects
			apply(channel.fxNodes); // apply channel effects //- trigger refresh when this changes

			function apply(nodes) {
				if (nodes) {
					for (var type in nodes) {
						var node = nodes[type];
						chain.connect(node.input);
						chain = node;
					}
				}
			};
		};

		
		/** noteOn/Off **/
		MIDI.noteOn = function (channelId, noteId, velocity, delay) {
			switch(typeof noteId) {
				case 'number':
					return noteOn.apply(null, arguments);
				case 'string':
					break;
				case 'object':
					return noteGroupOn.apply(null, arguments);
			}
		};

		MIDI.noteOff = function (channelId, noteId, delay) {
			switch(typeof noteId) {
				case 'number':
					return noteOff.apply(null, arguments);
				case 'string':
					break;
				case 'object':
					return noteGroupOff.apply(null, arguments);
			}
		};


		/** cancelNotes **/
		MIDI.cancelNotes = function (channelId) {
			if (isFinite(channelId)) {
				stopChannel(channelId);
			} else {
				for (var channelId in _scheduled) {
					stopChannel(channelId);
				}
			}
			
			function stopChannel(channelId) {
				loopChannel(channelId, function (sources, source) {
					fadeOut(sources, source);
				});
			}
		};


		/** unlock **/
		MIDI.iOSUnlock = function () {
			if (_ctx.unlocked !== true) {
				_ctx.unlocked = true;
				var buffer = _ctx.createBuffer(1, 1, 44100);
				var source = _ctx.createBufferSource();
				source.buffer = buffer;
				source.connect(_ctx.destination);
				source.start(0);
			}
		};

		// To take care of browsers who catch this as an "auto play" case.
		if (_ctx.state === "suspended")
			_ctx.resume(); // TODO-PER: should actually wrap the following in a promise, but this is the simplest code change and the following promise will take a long time.

		/** connect **/
		return new Promise(function (resolve, reject) {
			if (window.Tuna) {
				if (!(_ctx.tunajs instanceof Tuna)) {
					_ctx.tunajs = new Tuna(_ctx);
				}
			}
			
			var soundfonts = MIDI.Soundfont;
			var requests = Object.keys(soundfonts);
			for (var programId in soundfonts) {
				var program = MIDI.getProgram(programId);
				if (program) {
					var request = _requests[programId] || (_requests[programId] = {});
					if (request.loaded) {
						continue;
					} else if (request.decoding) {
						request.queue.push(resolve);
					} else {
						request.decoding = true;
						request.queue.push(resolve);
						request.pending = 0;
						
						var soundfont = soundfonts[programId];
						for (var noteName in soundfont) {
							loadAudio(programId, program.id, noteName);
						}
					}
				}
			}
			
			setTimeout(waitForEnd, 0);

			/* helpers */
			function waitForEnd() {
				for (var i = 0; i < requests.length; i ++) {
					var program = requests[i];
					var request = _requests[program];
					if (request.pending) {
						return;
					}
				}
				for (var i = 0; i < requests.length; i ++) {
					var program = requests[i];
					var request = _requests[program];
					var cb;
					while(cb = request.queue.pop()) {
						cb();
					}
				}
			}

			function loadAudio(program, programId, noteName) {
				var request = _requests[program];
				var soundfont = soundfonts[program];
				var path = soundfont[noteName];
				if (path) {
					request.pending ++;
					loadBuffer(path).then(function (buffer) {
						buffer.id = noteName;
						
						var noteId = MIDI.getNoteNumber(noteName);
						var bufferId = programId + 'x' + noteId;
						_buffers[bufferId] = buffer;

						if (!--request.pending) {
							request.decoding = false;
							request.loading = false;
							request.loaded = true;
							
							MIDI.DEBUG && console.log('loaded: ', program);
							
							waitForEnd();
						}
					}).catch(function (err) {
						MIDI.DEBUG && console.error('audio could not load', arguments);
					});
				}
			}
		});
		
		function noteOn(channelId, noteId, velocity, delay) {
			delay = delay || 0;

			var source;
			var sourceId;
			
			var volume = MIDI.volume;
			if (volume) {
				var channel = MIDI.channels[channelId];
				var programId = channel.program;
				var bufferId = programId + 'x' + noteId;
				var buffer = _buffers[bufferId];
				if (buffer) {
					source = _ctx.createBufferSource();
					source.buffer = buffer;
					
					source.gainNode = _ctx.createGain();
					source.gainNode.connect(_ctx.destination);
					
					source._channel = channel;
					source._volume = velocity;
					
					_apply.volume(source);
					_apply.detune(source);
					_apply.fx(source);
					
					source.start(delay + _ctx.currentTime);
					
					_scheduled[channelId] = _scheduled[channelId] || {};
					_scheduled[channelId][noteId] = _scheduled[channelId][noteId] || [];
					_scheduled[channelId][noteId].push(source);
					_scheduled[channelId][noteId].active = source;
				} else {
					MIDI.DEBUG && console.error(['no buffer', arguments]);
				}
			}
			return {
				cancel: function () {
					source && source.disconnect(0);
				}
			};
		}
		

		/** noteOn/Off **/
		function noteOff(channelId, noteId, delay) {
			delay = delay || 0;
			
			var channels = _scheduled[channelId];
			if (channels) {
				var sources = channels[noteId];
				if (sources) {
					var source = sources.active;
					if (source) {
						fadeOut(sources, source, delay);
					}
				}
			}
			return {
				cancel: function () {
					source && source.disconnect(0);
				}
			};
		}
	
		function noteGroupOn(channel, chord, velocity, delay) {
			var res = {};
			for (var n = 0, note, len = chord.length; n < len; n++) {
				res[note = chord[n]] = MIDI.noteOn(channel, note, velocity, delay);
			}
			return res;
		}

		function noteGroupOff(channel, chord, delay) {
			var res = {};
			for (var n = 0, note, len = chord.length; n < len; n++) {
				res[note = chord[n]] = MIDI.noteOff(channel, note, delay);
			}
			return res;
		}

		function fadeOut(sources, source, delay) {
			var startAt = (delay || 0) + _ctx.currentTime;

			// @Miranet: 'the values of 0.2 and 0.3 could of course be used as 
			// a 'release' parameter for ADSR like time settings.'
			// add { 'metadata': { release: 0.3 } } to soundfont files
			var gain = source.gainNode.gain;
			gain._fadeout = true;
			gain._startAt = startAt;
			gain.linearRampToValueAtTime(gain.value, startAt);
			gain.linearRampToValueAtTime(0.0, startAt + 0.3);
			
			source.stop(startAt + 0.5);
			
			setTimeout(function () {
				sources.shift();
			}, delay * 1000);
		}

		function loadBuffer(path) { // streaming | base64 | arraybuffer
			return new Promise(function (resolve, reject) {
				if (path.indexOf('data:audio') === 0) { // Base64 string
					decode(base64ToBuffer(path));
				} else { // XMLHTTP buffer
					var xhr = new XMLHttpRequest();
					xhr.open('GET', path, true);
					xhr.responseType = 'arraybuffer';
					xhr.onload = function () {
						decode(xhr.response);
					};
					xhr.send();
				}
				
				function decode(buffer) {
					_ctx.decodeAudioData(buffer, resolve, reject);
				}
			});
		}
	};
	
	function base64ToBuffer(uri) {
		uri = uri.split(',');
		var binary = atob(uri[1]);
		var mime = uri[0].split(':')[1].split(';')[0];
		var buffer = new ArrayBuffer(binary.length);
		var uint = new Uint8Array(buffer);
		for (var n = 0; n < binary.length; n++) {
			uint[n] = binary.charCodeAt(n);
		}
		return buffer;
	}

	function createAudioContext() {
		_ctx = new (window.AudioContext || window.webkitAudioContext)();
		_ctx.hasDetune = detectDetune();
		return _ctx;
	}

	function detectDetune() {
		var buffer = _ctx.createBuffer(1, 1, 44100);
		var source = _ctx.createBufferSource();
		try {
			source.detune.value = 1200;
			return true;
		} catch(e) {
			return false;
		}
	}

	function loopChannel(channelId, cb) {
		var channel = _scheduled[channelId];
		for (var noteId in channel) {
			var sources = channel[noteId];
			var source;
			for (var i = 0; i < sources.length; i ++) {
				cb(sources, sources[i]);
			}
		}
	}

	function defineProperties() {
		Object.defineProperties(MIDI, {
			'context': {
				configurable: true,
				get: function () {
					return _ctx;
				},
				set: function (ctx) {
					_ctx = ctx;
				}
			},
			
			/* effects */
			'detune': set('number', 0, handler('detune')),
			'fx': set('object', null, handler('fx')),
			'mute': set('boolean', false, handler('volume')),
			'volume': set('number', 1.0, handler('volume'))
		});
	
		function set(_format, _value, _handler) {
			return {
				configurable: true,
				get: function () {
					return _value;
				},
				set: function (value) {
					if (typeof value === _format) {
						_value = value;
						_handler && _handler();
					}
				}
			}
		}

		function handler(type) {
			return function () {
				MIDI.setProperty(type);
			};
		}
		
		MIDI.setProperty = function (type, channelId) {
			if (_apply[type]) {
				if (isFinite(channelId)) {
					type === 'fx' && prepareFX(MIDI.channels[channelId]);
					setFX(channelId);
				} else {
					type === 'fx' && prepareFX(MIDI);
					for (var channelId in _scheduled) {
						setFX(channelId);
					}
				
				}
			}
			
			function setFX() {
				loopChannel(channelId, function (sources, source) {
					_apply[type](source);
				});
			}

			function prepareFX(channel) {
				var fxNodes = channel.fxNodes || (channel.fxNodes = {});
				for (var key in fxNodes) {
					fxNodes[key].disconnect(_ctx.destination);
					delete fxNodes[key];
				}
				if (_ctx.tunajs) {
					var fx = channel.fx;
					for (var i = 0; i < fx.length; i ++) {
						var data = fx[i];
						var type = data.type;
						var effect = new _ctx.tunajs[type](data);
						effect.connect(_ctx.destination);
						fxNodes[type] = effect;
					}
				} else {
					MIDI.DEBUG && console.error('fx not installed.', arguments);
				}
			}
		};
	}

})();

/***/ }),
/* 48 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------------------
	adaptors-MIDI
	----------------------------------------------------------------------
	http://webaudio.github.io/web-midi-api/
	----------------------------------------------------------------------
*/

(function() { 'use strict';

	var midi = MIDI.adaptors.midiapi = {};
	
	var _context;
	var _active = {};
	var _apply = {};

	/** connect **/
	midi.connect = function(args) {

		MIDI.adaptor.id = 'midiapi';


		/** properties **/
		defineProperties();


		/** volume **/
		_apply.volume = function(source) {
			var channel = source._channel;
			if (MIDI.mute || channel.mute) {
				setVolume(channel.id, 0.0);
			} else {
				var volume = MIDI.volume * channel.volume * source._volume;
				setVolume(channel.id, Math.min(1.0, Math.max(-1.0, volume * 2.0)));
			}
		};


		/** detune **/
		_apply.detune = function(source) {
			var channel = source._channel;
			var detune = MIDI.detune + channel.detune;
			if (detune) {
				setDetune(channel.id, detune); // -1200 to 1200 - value in cents [100 cents per semitone]
			}
		};


		MIDI.setController = setController; //- depreciate
		MIDI.setPitchBend = setDetune; //- depreciate
		MIDI.setVolume = setVolume; //- depreciate


		/** on.programChange **/
		MIDI.messageHandler.program = function(channelId, program, delay) { // change patch (instrument)
			_context.send([0xC0 + channelId, program], (delay || 0) * 1000);
		};


		/** send **/
		MIDI.send = function(data, delay) {
			_context.send(data, (delay || 0) * 1000);
		};


		/** noteOn/Off **/
		MIDI.noteOn = function(channelId, noteId, velocity, delay) {
			switch(typeof noteId) {
				case 'number':
					return noteOn.apply(null, arguments);
				case 'string':
					break;
				case 'object':
					return noteGroupOn.apply(null, arguments);
			}
		};

		MIDI.noteOff = function(channelId, noteId, delay) {
			switch(typeof noteId) {
				case 'number':
					return noteOff.apply(null, arguments);
				case 'string':
					break;
				case 'object':
					return noteGroupOff.apply(null, arguments);
			}
		};


		/** cancelNotes **/
		MIDI.cancelNotes = function(channelId) {
			if (isFinite(channelId)) {
				_context.send([0xB0 + channelId, 0x7B, 0]);
			} else {
				_context.cancel();
				for (var channelId = 0; channelId < 16; channelId ++) {
					_context.send([0xB0 + channelId, 0x7B, 0]);
				}
			}
		};
	

		/** connect **/
		return new Promise(function(resolve, reject) {
			navigator.requestMIDIAccess().then(function(e) {
				var outputs = e.outputs;
				if (outputs.size) {
					outputs.forEach(function(context) {
						if (context.state === 'connected' && context.type === 'input') {
							_context = context;
						}
					});
				}
				if (_context == null) { // no outputs
					handleError({
						message: 'No available outputs.'
					});
				} else {
					resolve();
				}
			}, handleError);

			function handleError(err) { // well at least we tried.
				reject && reject(err);
			}
		});
	};


	/* note */
	function noteOn(channelId, noteId, velocity, delay) {
		_context.send([0x90 + channelId, noteId, velocity * 127 >> 0], (delay || 0) * 1000);
		_active[channelId + 'x' + noteId] = {
			_channel: MIDI.channels[channelId],
			_volume: velocity
		};
		return {
			cancel: function() {
				
			}
		};
	}

	function noteOff(channelId, noteId, delay) {
		_context.send([0x80 + channelId, noteId, 0], (delay || 0) * 1000);
		delete _active[channelId + 'x' + noteId];
		return {
			cancel: function() {
				
			}
		};
	}

	function noteGroupOn(channelId, group, velocity, delay) {
		for (var i = 0; i < group.length; i ++) {
			_context.send([0x90 + channelId, group[i], velocity], (delay || 0) * 1000);
		}
	}

	function noteGroupOff(channelId, group, delay) {
		for (var i = 0; i < group.length; i ++) {
			_context.send([0x80 + channelId, group[i], 0], (delay || 0) * 1000);
		}
	}


	/* properties */
	function setController(channelId, type, value, delay) {
		_context.send([channelId, type, value], (delay || 0) * 1000);
	}

	function setDetune(channelId, pitch, delay) {
		_context.send([0xE0 + channelId, pitch], (delay || 0) * 1000);
	}

	function setVolume(channelId, volume, delay) {
		_context.send([0xB0 + channelId, 0x07, volume], (delay || 0) * 1000);
	}


	/** define properties **/
	function defineProperties() {

		Object.defineProperties(MIDI, {
			'context': {
				configurable: true,
				set: function(context) {
					_context = context;
				},
				get: function() {
					return _context;
				}
			},
			
			/* effects */
			'detune': set('number', 0, handler('detune')),
			'mute': set('boolean', false, handler('volume')),
			'volume': set('number', 1.0, handler('volume'))
		});
	
		function set(_format, _value, _handler) {
			return {
				configurable: true,
				get: function() {
					return _value;
				},
				set: function(value) {
					if (typeof value === _format) {
						_value = value;
						_handler && _handler();
					}
				}
			}
		}

		function handler(type) {
			return function() {
				for (var sourceId in _active) {
					_apply[type](_active[sourceId]);
				}
			};
		}
	}

})();

/***/ }),
/* 49 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------
	channels : 2015-10-18
	----------------------------------------------------------
*/

if (typeof MIDI === 'undefined') MIDI = {};

(function (MIDI) { 'use strict';

	MIDI.channels = (function (channels) {
		for (var i = 0; i <= 15; i++) {
			addChannel(i);
		}
		
		return channels;
		
		function addChannel(channelId) {

			var channel = channels[channelId] = {};

			channel.noteOn = function (noteId, velocity, delay) {
				return MIDI.noteOn(channelId, noteId, velocity, delay);
			};
			
			channel.noteOff = function (noteId, delay) {
				return MIDI.noteOff(channelId, noteId, delay);
			};
			
			channel.cancelNotes = function () {
				return MIDI.cancelNotes(channelId);
			};
			
			channel.set = function () {
			
			};
			
			Object.defineProperties(channel, {
				id: {
					value: i,
					enumerable: true,
					writable: true
				},
				program: {
					value: i,
					enumerable: true,
					writable: true
				},
				volume: set('number', 'volume', 1.0),
				mute: set('boolean', 'volume', false),
				mono: set('boolean', '*', false),
				omni: set('boolean', '*', false),
				solo: set('boolean', '*', false),
				detune: set('number', 'detune', 0),
				fx: set('object', 'fx', null)
			});
			
			function set(_typeof, _type, _value) {
				return {
					configurable: true,
					enumerable: true,
					get: function () {
						return _value;
					},
					set: function (value) {
						if (typeof value === _typeof) {
							_value = value;
							MIDI.setProperty(_type, channelId);
						}
					}
				};
			};
		};
	})({});

})(MIDI);

/***/ }),
/* 50 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------
	GM : 2015-10-18
	----------------------------------------------------------
*/

if (typeof MIDI === 'undefined') MIDI = {};

(function (MIDI) { 'use strict';

	/** getProgram **/
	MIDI.getProgram = function (program) {
		if (typeof program === 'string') {
			return MIDI.getProgram.byName[asId(program)];
		} else {
			return MIDI.getProgram.byId[program];
		}
	};

	function asId(name) {
		return name.replace(/[^a-z0-9_ ]/gi, '').
				    replace(/[ ]/g, '_').
				    toLowerCase();
	};
	
	(function (categories) {
		var GM = MIDI.GM = {};
		var byId = MIDI.getProgram.byId = {};
		var byName = MIDI.getProgram.byName = {};
		
		for (var category in categories) {
			var programs = categories[category];
			for (var i = 0, length = programs.length; i < length; i++) {
				var program = programs[i];
				if (program) {
					var id = parseInt(program.substr(0, program.indexOf(' ')), 10);
					var name = program.replace(id + ' ', '');
					var nameId = asId(name);
					var categoryId = asId(category);
					
					var res = {
						id: --id,
						name: name,
						nameId: nameId,
						category: category
					};
					
					byId[id] = res;
					byName[nameId] = res;
					
					GM[categoryId] = GM[categoryId] || [];
					GM[categoryId].push(res);
				}
			}
		}
	})({
		'Piano': ['1 Acoustic Grand Piano', '2 Bright Acoustic Piano', '3 Electric Grand Piano', '4 Honky-tonk Piano', '5 Electric Piano 1', '6 Electric Piano 2', '7 Harpsichord', '8 Clavinet'],
		'Chromatic Percussion': ['9 Celesta', '10 Glockenspiel', '11 Music Box', '12 Vibraphone', '13 Marimba', '14 Xylophone', '15 Tubular Bells', '16 Dulcimer'],
		'Organ': ['17 Drawbar Organ', '18 Percussive Organ', '19 Rock Organ', '20 Church Organ', '21 Reed Organ', '22 Accordion', '23 Harmonica', '24 Tango Accordion'],
		'Guitar': ['25 Acoustic Guitar (nylon)', '26 Acoustic Guitar (steel)', '27 Electric Guitar (jazz)', '28 Electric Guitar (clean)', '29 Electric Guitar (muted)', '30 Overdriven Guitar', '31 Distortion Guitar', '32 Guitar Harmonics'],
		'Bass': ['33 Acoustic Bass', '34 Electric Bass (finger)', '35 Electric Bass (pick)', '36 Fretless Bass', '37 Slap Bass 1', '38 Slap Bass 2', '39 Synth Bass 1', '40 Synth Bass 2'],
		'Strings': ['41 Violin', '42 Viola', '43 Cello', '44 Contrabass', '45 Tremolo Strings', '46 Pizzicato Strings', '47 Orchestral Harp', '48 Timpani'],
		'Ensemble': ['49 String Ensemble 1', '50 String Ensemble 2', '51 Synth Strings 1', '52 Synth Strings 2', '53 Choir Aahs', '54 Voice Oohs', '55 Synth Choir', '56 Orchestra Hit'],
		'Brass': ['57 Trumpet', '58 Trombone', '59 Tuba', '60 Muted Trumpet', '61 French Horn', '62 Brass Section', '63 Synth Brass 1', '64 Synth Brass 2'],
		'Reed': ['65 Soprano Sax', '66 Alto Sax', '67 Tenor Sax', '68 Baritone Sax', '69 Oboe', '70 English Horn', '71 Bassoon', '72 Clarinet'],
		'Pipe': ['73 Piccolo', '74 Flute', '75 Recorder', '76 Pan Flute', '77 Blown Bottle', '78 Shakuhachi', '79 Whistle', '80 Ocarina'],
		'Synth Lead': ['81 Lead 1 (square)', '82 Lead 2 (sawtooth)', '83 Lead 3 (calliope)', '84 Lead 4 (chiff)', '85 Lead 5 (charang)', '86 Lead 6 (voice)', '87 Lead 7 (fifths)', '88 Lead 8 (bass + lead)'],
		'Synth Pad': ['89 Pad 1 (new age)', '90 Pad 2 (warm)', '91 Pad 3 (polysynth)', '92 Pad 4 (choir)', '93 Pad 5 (bowed)', '94 Pad 6 (metallic)', '95 Pad 7 (halo)', '96 Pad 8 (sweep)'],
		'Synth Effects': ['97 FX 1 (rain)', '98 FX 2 (soundtrack)', '99 FX 3 (crystal)', '100 FX 4 (atmosphere)', '101 FX 5 (brightness)', '102 FX 6 (goblins)', '103 FX 7 (echoes)', '104 FX 8 (sci-fi)'],
		'Ethnic': ['105 Sitar', '106 Banjo', '107 Shamisen', '108 Koto', '109 Kalimba', '110 Bagpipe', '111 Fiddle', '112 Shanai'],
		'Percussive': ['113 Tinkle Bell', '114 Agogo', '115 Steel Drums', '116 Woodblock', '117 Taiko Drum', '118 Melodic Tom', '119 Synth Drum', '129 Percussion'],
		'Sound effects': ['120 Reverse Cymbal', '121 Guitar Fret Noise', '122 Breath Noise', '123 Seashore', '124 Bird Tweet', '125 Telephone Ring', '126 Helicopter', '127 Applause', '128 Gunshot']
	});


	/** conversions **/
	(function () {
		var A0 = 0x15; // first note
		var C8 = 0x6C; // last note
		var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
		var toNote = {}; // C8  == 108
		var toName = {}; // 108 ==  C8
		for (var n = A0; n <= C8; n++) {
			var octave = (n - 12) / 12 >> 0;
			var name = number2key[n % 12] + octave;
			toNote[name] = n;
			toName[n] = name;
		}
	
		MIDI.getNoteName = function (value) {
			if (value in toNote) {
				return value;
			} else if (value in toName) {
				return toName[value];
			}
		};
	
		MIDI.getNoteNumber = function (value) {
			if (value in toName) {
				return value;
			} else if (value in toNote) {
				return toNote[value];
			}
		};
	})();

})(MIDI);

/***/ }),
/* 51 */
/***/ (function(module, exports) {

/*
	----------------------------------------------------------
	MIDI/player : 2015-10-18 : https://mudcu.be
	----------------------------------------------------------
	https://github.com/mudcube/MIDI.js
	----------------------------------------------------------
*/

if (typeof MIDI === 'undefined') MIDI = {};

MIDI.player = new function () { 'use strict';

	var player = this;
	
	galactic.EventEmitter(player); // player.on(...)

	/* Scheduling */
	var _schedulePerRequest = 20;
	var _scheduleMax = 100;

	/* State */
	var _midiState = {};

	/* Queue */
	var _midiQueue = [];

	/* Events */
	var _midiEvents = {};
	var _midiEventIndex;
	var _midiEventTime;
	
	/* File */
	var _midiFile;


	/** properties **/
	(function () {
		var _currentTime = 0;
		var _playing = false;
		var _now = 0;

		Object.defineProperties(player, {
			'bpm': finiteValue(null, true), // beats-per-minute override
			'warp': finiteValue(1.0, true), // warp beats-per-minute
			'transpose': finiteValue(0.0, true), // transpose notes up or down
			'currentTime': { // current time within current song
				get: function () {
					if (player.playing) {
						return _currentTime + (performance.now() - _now);
					} else {
						return _currentTime;
					}
				},
				set: function (time) {
					if (Number.isFinite(time)) {
						setTime(time);
					}
				}
			},
			'duration': finiteValue(0, false), // duration of current song
			'playing': { // current time within current song
				get: function () {
					return _playing;
				},
				set: function (playing) {
					setTime(player.currentTime);
					_playing = playing;
				}
			}
		});
	
		function finiteValue(_value, refresh) {
			return {
				get: function () {
					return _value;
				},
				set: function (value) {
					if (Number.isFinite(value)) {
						_value = value;
						refresh && refreshAudio();
					}
				}
			};

			function refreshAudio() {
				if (_midiFile) {
					player.stop();
					readMidiFile();
					requestEvents(0, true);
				}		
			};
		};
			
		function setTime(time) {
			_now = performance.now();
			_currentTime = clamp(0, player.duration, time);
		};
	})();


	/** playback **/
	player.start = function (startAt) {
		cancelEvents();
		player.currentTime = startAt;
		requestEvents(player.currentTime, true);
	};

	player.stop = function () {
		cancelEvents();
		player.currentTime = 0;
	};

	player.pause = function () {
		cancelEvents();
	};


	/** animation **/
	player.setAnimation = function (callback) { //- player.on('tick', ...)
		var currentTime = 0;
		var nowSys = 0;
		var nowMidi = 0;
		//
		player.clearAnimation();
		
		requestAnimationFrame(function frame() {
			player.frameId = requestAnimationFrame(frame);
			
			if (player.duration) {
				if (player.playing) {
					currentTime = (nowMidi === player.currentTime) ? nowSys - Date.now() : 0;
					
					if (player.currentTime === 0) {
						currentTime = 0;
					} else {
						currentTime = player.currentTime - currentTime;
					}
					if (nowMidi !== player.currentTime) {
						nowSys = Date.now();
						nowMidi = player.currentTime;
					}
				} else {
					currentTime = player.currentTime;
				}
				
				var duration = player.duration;
				var percent = currentTime / duration;
				var total = currentTime / 1000;
				var minutes = total / 60;
				var seconds = total - (minutes * 60);
				var t1 = minutes * 60 + seconds;
				var t2 = (duration / 1000);
				if (t2 - t1 < -1.0) {
					return;
				} else {
					var progress = Math.min(1.0, t1 / t2);
					if (progress !== callback.progress) {
						callback.progress = progress;
						callback({
							progress: progress,
							currentTime: t1,
							duration: t2
						});
					}
				}
			}
		});
	};

	player.clearAnimation = function () { //- player.off('tick', ...)
		player.frameId && cancelAnimationFrame(player.frameId);
	};


	/* Request Events */
	function requestEvents(startAt, seek) {
		if (startAt > player.duration) { // song finished
			return;
		}

		/* find current position */
		if (seek) { // seek to point in time
			if (player.playing) {
				cancelEvents();
			} else {
				player.playing = true;
			}
			
			var packet = seekPacket(startAt);
			var packetIndex = packet.idx;
			var packetTime = _midiEventTime = packet.time;
		} else { // streaming to queue
			var packetIndex = _midiEventIndex;
			var packetTime = _midiEventTime;
		}

		/* queue out events */
		var future = startAt - player.currentTime; // in ms
		var requests = 0;
		var length = _midiEvents.length;
		while(packetIndex < length && requests <= _schedulePerRequest) {
			var packet = _midiEvents[packetIndex];
			
			_midiEventIndex = ++packetIndex;
			_midiEventTime += packet[1];
			
			startAt = _midiEventTime - packetTime;
			
			var event = packet[0].event;
			var type = event.type;
			var subtype = event.subtype;
			
			if (handleEvent[subtype]) {
				switch(type) {
					case 'channel':
						handleChannelEvent();
						break;
					case 'meta':
						handleMetaEvent();
						break;
				}
			}
		}
		
		/* meta event */
		function handleMetaEvent() {
			switch(subtype) {
				case 'setTempo':
// 					console.log(event); //- handle tempo changes
					break;
			}
		};
		
		/* channel event */
		function handleChannelEvent() {
			var channelId = event.channel;
			var channel = MIDI.channels[channelId];
			var delay = Math.max(0, (startAt + future) / 1000);

			switch(subtype) {
				case 'controller':
// 					channel.set('controller', event.controllerType, event.value, delay);
					MIDI.setController(channelId, event.controllerType, event.value, delay); //- depreciate
					break;

				case 'programChange':
					var program = event.programNumber;
					if (programIsUsed(program)) {
// 						channel.set('program', program, delay);
						MIDI.programChange(channelId, program, delay); //- depreciate
					}
					break;

				case 'pitchBend':
					var pitch = event.value;
// 					channel.set('detune', pitch, delay);
					MIDI.setPitchBend(channelId, pitch, delay); //- depreciate
					break;

				case 'noteOn':
					var noteNumber = transpose(event.noteNumber);
					_midiQueue.push({
						promise: channel.noteOn(noteNumber, event.velocity / 127, delay),
						timeout: wait(event, noteNumber, _midiEventTime, delay)
					});
					requests++;
					break;

				case 'noteOff':
					var noteNumber = transpose(event.noteNumber);
					_midiQueue.push({
						promise: channel.noteOff(noteNumber, delay),
						timeout: wait(event, noteNumber, _midiEventTime, delay)
					});
					requests++;
					break;

				default:
					break;
			}
		};
	
		/* event tracking */
		function wait(event, noteNumber, currentTime, delay) {
			return setTimeout(function () {
				var packet = galactic.util.copy(event);
				packet.noteNumber = noteNumber;
				
				player.emit('event', packet);
				
				_midiQueue.shift();
				
				var packetId = packet.channel + 'x' + packet.noteNumber;
				switch(packet.subtype) {
					case 'noteOn':
						_midiState[packetId] = packet;
						break;
					case 'noteOff':
						delete _midiState[packetId];
						break;
				}
				
				if (_midiQueue.length <= _scheduleMax) {
					requestEvents(_midiEventTime);
				}
			}, delay * 1000);
		};

		/* change program */
		function programIsUsed(programNumber) {
			var program = MIDI.getProgram(programNumber);
			return program && player.instruments[program.nameId];
		};

		/* seek to point in time */
		function seekPacket(seekTime) {
			var time = 0;
			var length = _midiEvents.length;
			for (var idx = 0; idx < length; idx++) {
				var event = _midiEvents[idx];
				var eventDuration = event[1];
				if (time + eventDuration < seekTime) {
					time += eventDuration;
				} else {
					break;
				}
			}
			return {
				idx: idx,
				time: time
			};
		};

		/* transpose notes */
		function transpose(noteNumber) {
			return clamp(0, 127, noteNumber + player.transpose);
		};
	};


	/* Cancel Events */
	function cancelEvents() {
		if (player.playing) {
			player.playing = false;
			
			while(_midiQueue.length) {
				var packet = _midiQueue.pop();
				if (packet) {
					packet.promise && packet.promise.cancel();
					clearTimeout(packet.timeout);
				}
			}
			
			for (var sid in _midiState) {
				var event = _midiState[sid];
				player.emit('event', {
					channel: event.channel,
					noteNumber: event.noteNumber,
					status: event.status - 16,
					subtype: 'noteOff',
					type: 'channel'
				});
			}
		}
	};


	/* math */
	function clamp(min, max, value) {
		return (value < min) ? min : ((value > max) ? max : value);
	};


	/* read data */
	function readMidiFile() {
		// PER: handle the case where the caller already has the midi events. Don't need to load anything here.
		if (_midiFile)
			_midiEvents = Replayer(MidiFile(_midiFile), player.bpm);
		player.duration = getLength();

		function getLength() {
			var length = _midiEvents.length;
			var totalTime = 0.0;
			for (var n = 0; n < length; n++) {
				totalTime += _midiEvents[n][1];
			}
			return totalTime;
		};
	};

	function readMetadata() {
		player.instruments = readInstruments();
// 		player.notes = readNotes();

		function readNotes() { //- use me; download *only* specific notes
			var notes = {};
			for (var i = 0; i < _midiEvents.length; i ++) {
				var packet = _midiEvents[i];
				var event = packet[0].event;
				if (Number.isFinite(event.noteNumber)) {
					notes[event.noteNumber] = true;
				}
			}
			return Object.keys(notes);
		};

		function readInstruments() {
			var instruments = {};
			var programChange = {};
			for (var n = 0; n < _midiEvents.length; n ++) {
				var event = _midiEvents[n][0].event;
				if (event.type === 'channel') {
					var channel = event.channel;
					switch(event.subtype) {
						case 'programChange':
							programChange[channel] = event.programNumber;
							break;
						case 'noteOn':
							var programId = programChange[channel];
							if (Number.isFinite(programId)) {
								if (handleEvent.programChange) {
									var program = MIDI.getProgram(programId);
								} else {
									var channel = MIDI.channels[channel];
									var program = MIDI.getProgram(channel.program);
								}
								instruments[program.nameId] = true;
							}
							break;
					}
				}
			}
			return instruments;
		};
	};


	/* Custom event handlers */
	var handleEvent = {
		controller: true,
		noteOff: true,
		noteOn: true,
		pitchBend: true,
		setTempo: true,
		programChange: true
	};

	player.handleEvent = function (type, truthy) {
		handleEvent[type] = truthy;
	};


	/** Load **/
	player.load = function (args) {
		return new Promise(function (resolve, reject) {
			if (typeof args === 'string') args = {src: args};
			var src = args.src;
			var onprogress = args.onprogress;
			
			player.stop();

			// PER: Handle the case where the caller already has the events in an array
			if (args.events) {
				_midiEvents = args.events;
				_midiFile = undefined;
				load();
			} else if (src.indexOf('base64,') !== -1) {
				_midiFile = atob(src.split(',')[1]);
				load();
			} else {
				galactic.request({
					url: src,
					mimeType: 'text/plain; charset=x-user-defined',
					onerror: function () {
						reject && reject('Unable to load MIDI file: ' + src);
					},
					onsuccess: function (event, responseText) {
						_midiFile = toBase64(responseText);
						load();
					}
				});
			}

			function load() {
				try {
					readMidiFile();
					readMetadata();

					MIDI.setup({
						instruments: player.instruments,
						onprogress: onprogress
					}).then(function (res) {
						resolve(res);
					}).catch(function (err) {
						reject(err);
					});
				} catch(event) {
					reject && reject(event);
				}
			};

			function toBase64(data) {
				var res = [];
				var fromCharCode = String.fromCharCode;
				for (var i = 0, length = data.length; i < length; i++) {
					res[i] = fromCharCode(data.charCodeAt(i) & 255);
				}
				return res.join('');
			};
		});
	};
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_midi_create.js: Turn a linear series of events into a series of MIDI commands.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// We input a set of voices, but the notes are still complex. This pass changes the logical definitions
// of the grace notes, decorations, ties, triplets, rests, transpositions, keys, and accidentals into actual note durations.
// It also extracts guitar chords to a separate voice and resolves their rhythm.

var flatten;

(function () {
	"use strict";

	var barAccidentals;
	var accidentals;
	var transpose;
	var bagpipes;
	var multiplier;
	var tracks;
	var startingTempo;
	var startingMeter;
	var tempoChangeFactor = 1;
	var instrument;
	// var channel;
	var currentTrack;
	var pitchesTied;
	var lastNoteDurationPosition;

	var meter = { num: 4, den: 4 };
	var chordTrack;
	var chordTrackFinished;
	var chordChannel;
	var chordInstrument = 0;
	var drumInstrument = 128;
	var currentChords;
	var lastChord;
	var barBeat;

	var drumTrack;
	var drumTrackFinished;
	var drumDefinition = {};

	var normalBreakBetweenNotes = 1.0 / 128; // a 128th note of silence between notes for articulation.

	flatten = function flatten(voices, options) {
		if (!options) options = {};
		barAccidentals = [];
		accidentals = [0, 0, 0, 0, 0, 0, 0];
		bagpipes = false;
		multiplier = 1;
		tracks = [];
		startingTempo = undefined;
		startingMeter = undefined;
		tempoChangeFactor = 1;
		instrument = undefined;
		// channel = undefined;
		currentTrack = undefined;
		pitchesTied = {};

		// For resolving chords.
		meter = { num: 4, den: 4 };
		chordTrack = [];
		chordChannel = voices.length; // first free channel for chords
		chordTrackFinished = false;
		currentChords = [];
		lastChord = undefined;
		barBeat = 0;

		// For the drum/metronome track.
		drumTrack = [];
		drumTrackFinished = false;
		drumDefinition = {};

		for (var i = 0; i < voices.length; i++) {
			transpose = 0;
			lastNoteDurationPosition = -1;
			var voice = voices[i];
			currentTrack = [{ cmd: 'program', channel: i, instrument: instrument ? instrument : 0 }];
			pitchesTied = {};
			for (var j = 0; j < voice.length; j++) {
				var element = voice[j];
				switch (element.el_type) {
					case "note":
						writeNote(element, options.voicesOff);
						break;
					case "key":
						accidentals = setKeySignature(element);
						break;
					case "meter":
						if (!startingMeter) startingMeter = element;
						meter = element;
						break;
					case "tempo":
						if (!startingTempo) startingTempo = element.qpm;else tempoChangeFactor = element.qpm ? startingTempo / element.qpm : 1;
						break;
					case "transpose":
						transpose = element.transpose;
						break;
					case "bar":
						if (chordTrack.length > 0 && i === 0) {
							resolveChords();
							currentChords = [];
						}
						barBeat = 0;
						barAccidentals = [];
						if (i === 0) // Only write the drum part on the first voice so that it is not duplicated.
							writeDrum(voices.length + 1);
						break;
					case "bagpipes":
						bagpipes = true;
						break;
					case "instrument":
						if (instrument === undefined) instrument = element.program;
						currentTrack[0].instrument = element.program;
						break;
					case "channel":
						// 	if (channel === undefined)
						// 		channel = element.channel;
						// 	currentTrack[0].channel = element.channel;
						break;
					case "drum":
						drumDefinition = normalizeDrumDefinition(element.params);
						break;
					default:
						// This should never happen
						console.log("MIDI creation. Unknown el_type: " + element.el_type + "\n"); // jshint ignore:line
						break;
				}
			}
			tracks.push(currentTrack);
			if (chordTrack.length > 0) // Don't do chords on more than one track, so turn off chord detection after we create it.
				chordTrackFinished = true;
			if (drumTrack.length > 0) // Don't do drums on more than one track, so turn off drum after we create it.
				drumTrackFinished = true;
		}
		if (chordTrack.length > 0) tracks.push(chordTrack);
		if (drumTrack.length > 0) tracks.push(drumTrack);
		// Adjust the tempo according to the meter. The rules are this:
		// 1) If the denominator is 2 or 4, then always make a beat be the denominator.
		//
		// 2) If the denominator is 8 or 16, then:
		// a) If the numerator is divisible by 3, the beat is 3*denominator.
		// b) Otherwise the beat is the denominator.
		//
		// 3) If the denominator is anything else, then don't worry about it because it doesn't make sense. Don't modify it and hope for the best.
		//
		// Right now, the startingTempo is calculated for a quarter note, so modify it if necessary.
		// var num = startingMeter ? parseInt(startingMeter.num, 10) : meter.num;
		// var den = startingMeter ? parseInt(startingMeter.den, 10) : meter.den;
		// if (den === 2)
		// 	startingTempo *= 2;
		// else if (den === 8) {
		// 	if (parseInt(num, 10) % 3 === 0)
		// 		startingTempo *= 3/2;
		// 	else
		// 		startingTempo /= 2;
		// } else if (den === 16) {
		// 	if (num % 3 === 0)
		// 		startingTempo *= 3/4;
		// 	else
		// 		startingTempo /= 4;
		// }

		return { tempo: startingTempo, instrument: instrument, tracks: tracks };
	};

	//
	// The algorithm for chords is:
	// - The chords are done in a separate track.
	// - If there are notes before the first chord, then put that much silence to start the track.
	// - The pattern of chord expression depends on the meter, and how many chords are in a measure.
	// - There is a possibility that a measure will have an incorrect number of beats, if that is the case, then
	// start the pattern anew on the next measure number.
	// - If a chord root is not A-G, then ignore it as if the chord wasn't there at all.
	// - If a chord modification isn't in our supported list, change it to a major triad.
	//
	// - If there is only one chord in a measure:
	//		- If 2/4, play root chord
	//		- If cut time, play root(1) chord(3)
	//		- If 3/4, play root chord chord
	//		- If 4/4 or common time, play root chord fifth chord
	//		- If 6/8, play root(1) chord(3) fifth(4) chord(6)
	//		- For any other meter, play the full chord on each beat. (TODO-PER: expand this as more support is added.)
	//
	//	- If there is a chord specified that is not on a beat, move it earlier to the previous beat, unless there is already a chord on that beat.
	//	- Otherwise, move it later, unless there is already a chord on that beat.
	// 	- Otherwise, ignore it. (TODO-PER: expand this as more support is added.)
	//
	// - If there is a chord on the second beat, play a chord for the first beat instead of a bass note.
	// - Likewise, if there is a chord on the fourth beat of 4/4, play a chord on the third beat instead of a bass note.
	//
	var breakSynonyms = ['break', '(break)', 'no chord', 'n.c.', 'tacet'];

	function findChord(elem) {
		// TODO-PER: Just using the first chord if there are more than one.
		if (chordTrackFinished || !elem.chord || elem.chord.length === 0) return null;

		// Return the first annotation that is a regular chord: that is, it is in the default place or is a recognized "tacit" phrase.
		for (var i = 0; i < elem.chord.length; i++) {
			var ch = elem.chord[i];
			if (ch.position === 'default') return ch.name;
			if (breakSynonyms.indexOf(ch.name.toLowerCase()) >= 0) return 'break';
		}
		return null;
	}

	function timeFromStart() {
		var distance = 0;
		for (var ct = 0; ct < currentTrack.length; ct++) {
			if (currentTrack[ct].cmd === 'move') distance += currentTrack[ct].duration;
		}
		return distance;
	}

	function writeNote(elem, voiceOff) {
		//
		// Create a series of note events to append to the current track.
		// The output event is one of: { pitchStart: pitch_in_abc_units, volume: from_1_to_64 }
		// { pitchStop: pitch_in_abc_units }
		// { moveTime: duration_in_abc_units }
		// If there are guitar chords, then they are put in a separate track, but they have the same format.
		//

		var velocity = voiceOff ? 0 : elem.velocity;
		var chord = findChord(elem);
		if (chord) {
			var c = interpretChord(chord);
			// If this isn't a recognized chord, just completely ignore it.
			if (c) {
				// If we ever have a chord in this voice, then we add the chord track.
				// However, if there are chords on more than one voice, then just use the first voice.
				if (chordTrack.length === 0) {
					chordTrack.push({ cmd: 'program', channel: chordChannel, instrument: chordInstrument });
					// need to figure out how far in time the chord started: if there are pickup notes before the chords start, we need pauses.
					var distance = timeFromStart();
					if (distance > 0) chordTrack.push({ cmd: 'move', duration: distance * tempoChangeFactor });
				}

				lastChord = c;
				currentChords.push({ chord: lastChord, beat: barBeat });
			}
		}

		if (elem.startTriplet) {
			multiplier = elem.tripletMultiplier;
		}

		var duration = (elem.durationClass ? elem.durationClass : elem.duration) * multiplier;
		barBeat += duration;

		// if there are grace notes, then also play them.
		// I'm not sure there is an exact rule for the length of the notes. My rule, unless I find
		// a better one is: the grace notes cannot take more than 1/2 of the main note's value.
		// A grace note (of 1/8 note duration) takes 1/8 of the main note's value.
		var graces;
		if (elem.gracenotes) {
			// There are two cases: if this is bagpipe, the grace notes are played on the beat with the current note.
			// Normally, the grace notes would be played before the beat. (If this is the first note in the track, however, then it is played on the current beat.)
			// The reason for the exception on the first note is that it would otherwise move the whole track in time and would affect all the other tracks.
			var stealFromCurrent = bagpipes || lastNoteDurationPosition < 0 || currentTrack.length === 0;
			var stealFromDuration = stealFromCurrent ? duration : currentTrack[lastNoteDurationPosition].duration;
			graces = processGraceNotes(elem.gracenotes, stealFromDuration);
			if (!bagpipes) {
				duration = writeGraceNotes(graces, stealFromCurrent, duration, null, velocity);
			}
		}

		if (elem.pitches) {
			if (graces && bagpipes) {
				// If it is bagpipes, then the graces are played with the note. If the grace has the same pitch as the note, then we just skip it.
				duration = writeGraceNotes(graces, true, duration, null, velocity);
			}
			var pitches = [];
			for (var i = 0; i < elem.pitches.length; i++) {
				var note = elem.pitches[i];
				var actualPitch = adjustPitch(note);
				pitches.push({ pitch: actualPitch, startTie: note.startTie });

				// TODO-PER: should the volume vary depending on whether it is on a beat or measure start?
				if (!pitchesTied['' + actualPitch]) // If this is the second note of a tie, we don't start it again.
					currentTrack.push({ cmd: 'start', pitch: actualPitch, volume: velocity });

				if (note.startTie) pitchesTied['' + actualPitch] = true;else if (note.endTie) pitchesTied['' + actualPitch] = false;
			}
			var thisBreakBetweenNotes = normalBreakBetweenNotes;
			var soundDuration = duration - normalBreakBetweenNotes;
			if (soundDuration < 0) {
				soundDuration = 0;
				thisBreakBetweenNotes = 0;
			}
			currentTrack.push({ cmd: 'move', duration: soundDuration * tempoChangeFactor });
			lastNoteDurationPosition = currentTrack.length - 1;

			for (var ii = 0; ii < pitches.length; ii++) {
				if (!pitchesTied['' + pitches[ii].pitch]) currentTrack.push({ cmd: 'stop', pitch: pitches[ii].pitch });
			}
			currentTrack.push({ cmd: 'move', duration: thisBreakBetweenNotes * tempoChangeFactor });
		} else if (elem.rest) {
			currentTrack.push({ cmd: 'move', duration: duration * tempoChangeFactor });
		}

		if (elem.endTriplet) {
			multiplier = 1;
		}
	}

	var scale = [0, 2, 4, 5, 7, 9, 11];
	function adjustPitch(note) {
		if (note.midipitch) return note.midipitch - 60;
		var pitch = note.pitch;
		if (note.accidental) {
			switch (note.accidental) {// change that pitch (not other octaves) for the rest of the bar
				case "sharp":
					barAccidentals[pitch] = 1;break;
				case "flat":
					barAccidentals[pitch] = -1;break;
				case "natural":
					barAccidentals[pitch] = 0;break;
				case "dblsharp":
					barAccidentals[pitch] = 2;break;
				case "dblflat":
					barAccidentals[pitch] = -2;break;
			}
		}

		var actualPitch = extractOctave(pitch) * 12 + scale[extractNote(pitch)];

		if (barAccidentals[pitch] !== undefined) {
			actualPitch += barAccidentals[pitch];
		} else {
			// use normal accidentals
			actualPitch += accidentals[extractNote(pitch)];
		}
		actualPitch += transpose;
		return actualPitch;
	}

	function setKeySignature(elem) {
		var accidentals = [0, 0, 0, 0, 0, 0, 0];
		if (!elem.accidentals) return accidentals;
		for (var i = 0; i < elem.accidentals.length; i++) {
			var acc = elem.accidentals[i];
			var d = acc.acc === "sharp" ? 1 : acc.acc === "natural" ? 0 : -1;

			var lowercase = acc.note.toLowerCase();
			var note = extractNote(lowercase.charCodeAt(0) - 'c'.charCodeAt(0));
			accidentals[note] += d;
		}
		return accidentals;
	}

	var graceDivider = 8; // This is the fraction of a note that the grace represents. That is, if this is 2, then a grace note of 1/16 would be a 1/32.
	function processGraceNotes(graces, companionDuration) {
		var graceDuration = 0;
		var ret = [];
		var grace;
		for (var g = 0; g < graces.length; g++) {
			grace = graces[g];
			graceDuration += grace.duration;
		}
		graceDuration = graceDuration / graceDivider;
		var multiplier = graceDuration * 2 > companionDuration ? companionDuration / (graceDuration * 2) : 1;

		for (g = 0; g < graces.length; g++) {
			grace = graces[g];
			var pitch = grace.midipitch ? grace.midipitch - 60 : grace.pitch;
			ret.push({ pitch: pitch, duration: grace.duration / graceDivider * multiplier });
		}
		return ret;
	}

	function writeGraceNotes(graces, stealFromCurrent, duration, skipNote, velocity) {
		for (var g = 0; g < graces.length; g++) {
			var gp = adjustPitch(graces[g]);
			if (gp !== skipNote) currentTrack.push({ cmd: 'start', pitch: gp, volume: velocity });
			currentTrack.push({ cmd: 'move', duration: graces[g].duration * tempoChangeFactor });
			if (gp !== skipNote) currentTrack.push({ cmd: 'stop', pitch: gp });
			if (!stealFromCurrent) currentTrack[lastNoteDurationPosition].duration -= graces[g].duration;
			duration -= graces[g].duration;
		}
		return duration;
	}

	function extractOctave(pitch) {
		return Math.floor(pitch / 7);
	}

	function extractNote(pitch) {
		pitch = pitch % 7;
		if (pitch < 0) pitch += 7;
		return pitch;
	}

	var basses = {
		'A': -27, 'B': -25, 'C': -24, 'D': -22, 'E': -20, 'F': -19, 'G': -17
	};
	function interpretChord(name) {
		// chords have the format:
		// [root][acc][modifier][/][bass][acc]
		// (The chord might be surrounded by parens. Just ignore them.)
		// root must be present and must be from A-G.
		// acc is optional and can be # or b
		// The modifier can be a wide variety of things, like "maj7". As they are discovered, more are supported here.
		// If there is a slash, then there is a bass note, which can be from A-G, with an optional acc.
		// If the root is unrecognized, then "undefined" is returned and there is no chord.
		// If the modifier is unrecognized, a major triad is returned.
		// If the bass notes is unrecognized, it is ignored.
		if (name.length === 0) return undefined;
		if (name === 'break') return { chick: [] };
		var root = name.substring(0, 1);
		if (root === '(') {
			name = name.substring(1, name.length - 2);
			if (name.length === 0) return undefined;
			root = name.substring(0, 1);
		}
		var bass = basses[root];
		if (!bass) // If the bass note isn't listed, then this was an unknown root. Only A-G are accepted.
			return undefined;
		bass += transpose;
		var bass2 = bass - 5; // The alternating bass is a 4th below
		var chick;
		if (name.length === 1) chick = chordNotes(bass, '');
		var remaining = name.substring(1);
		var acc = remaining.substring(0, 1);
		if (acc === 'b' || acc === '♭') {
			bass--;
			bass2--;
			remaining = remaining.substring(1);
		} else if (acc === '#' || acc === '♯') {
			bass++;
			bass2++;
			remaining = remaining.substring(1);
		}
		var arr = remaining.split('/');
		chick = chordNotes(bass, arr[0]);
		if (arr.length === 2) {
			var explicitBass = basses[arr[1]];
			if (explicitBass) {
				bass = basses[arr[1]] + transpose;
				bass2 = bass;
			}
		}
		return { boom: bass, boom2: bass2, chick: chick };
	}

	var chordIntervals = {
		'M': [0, 4, 7],
		'6': [0, 4, 7, 9],
		'7': [0, 4, 7, 10],
		'+7': [0, 4, 8, 10],
		'aug7': [0, 4, 8, 10],
		'maj7': [0, 4, 7, 11],
		'∆7': [0, 4, 7, 11],
		'9': [0, 4, 7, 10, 14],
		'11': [0, 4, 7, 10, 14, 16],
		'13': [0, 4, 7, 10, 14, 18],
		'+': [0, 4, 8],
		'7#5': [0, 4, 8, 10],
		'7+5': [0, 4, 8, 10],
		'7b9': [0, 4, 7, 10, 13],
		'7b5': [0, 4, 6, 10],
		'9#5': [0, 4, 8, 10, 14],
		'9+5': [0, 4, 8, 10, 14],
		'm': [0, 3, 7],
		'-': [0, 3, 7],
		'm6': [0, 3, 7, 9],
		'-6': [0, 3, 7, 9],
		'm7': [0, 3, 7, 10],
		'-7': [0, 3, 7, 10],
		'dim': [0, 3, 6],
		'dim7': [0, 3, 6, 9],
		'°7': [0, 3, 6, 9],
		'ø7': [0, 3, 6, 10],
		'7sus4': [0, 5, 7, 10],
		'm7sus4': [0, 5, 7, 10],
		'sus4': [0, 5, 7]
	};
	function chordNotes(bass, modifier) {
		var intervals = chordIntervals[modifier];
		if (!intervals) intervals = chordIntervals.M;
		bass += 12; // the chord is an octave above the bass note.
		var notes = [];
		for (var i = 0; i < intervals.length; i++) {
			notes.push(bass + intervals[i]);
		}
		return notes;
	}

	function writeBoom(boom, beatLength) {
		// undefined means there is a stop time.
		if (boom !== undefined) chordTrack.push({ cmd: 'start', pitch: boom, volume: 64 });
		chordTrack.push({ cmd: 'move', duration: beatLength / 2 * tempoChangeFactor });
		if (boom !== undefined) chordTrack.push({ cmd: 'stop', pitch: boom });
		chordTrack.push({ cmd: 'move', duration: beatLength / 2 * tempoChangeFactor });
	}

	function writeChick(chick, beatLength) {
		for (var c = 0; c < chick.length; c++) {
			chordTrack.push({ cmd: 'start', pitch: chick[c], volume: 48 });
		}chordTrack.push({ cmd: 'move', duration: beatLength / 2 * tempoChangeFactor });
		for (c = 0; c < chick.length; c++) {
			chordTrack.push({ cmd: 'stop', pitch: chick[c] });
		}chordTrack.push({ cmd: 'move', duration: beatLength / 2 * tempoChangeFactor });
	}

	var rhythmPatterns = { "2/2": ['boom', 'chick'],
		"2/4": ['boom', 'chick'],
		"3/4": ['boom', 'chick', 'chick'],
		"4/4": ['boom', 'chick', 'boom2', 'chick'],
		"5/4": ['boom', 'chick', 'chick', 'boom2', 'chick'],
		"6/8": ['boom', '', 'chick', 'boom2', '', 'chick'],
		"9/8": ['boom', '', 'chick', 'boom2', '', 'chick', 'boom2', '', 'chick'],
		"12/8": ['boom', '', 'chick', 'boom2', '', 'chick', 'boom2', '', 'chick', 'boom2', '', 'chick']
	};

	function resolveChords() {
		var num = meter.num;
		var den = meter.den;
		var beatLength = 1 / den;
		var pattern = rhythmPatterns[num + '/' + den];
		var thisMeasureLength = parseInt(num, 10) / parseInt(den, 10);
		// See if this is a full measure: unfortunately, with triplets, there isn't an exact match, what with the floating point, so we just see if it is "close".
		var portionOfAMeasure = Math.abs(thisMeasureLength - barBeat);
		if (!pattern || portionOfAMeasure > 0.0078125) {
			// If it is an unsupported meter, or this isn't a full bar, just chick on each beat.
			pattern = [];
			var beatsPresent = barBeat / beatLength;
			for (var p = 0; p < beatsPresent; p++) {
				pattern.push("chick");
			}
		}

		if (currentChords.length === 0) {
			// there wasn't a new chord this measure, so use the last chord declared.
			currentChords.push({ beat: 0, chord: lastChord });
		}
		if (currentChords[0].beat !== 0 && lastChord) {
			// this is the case where there is a chord declared in the measure, but not on its first beat.
			currentChords.unshift({ beat: 0, chord: lastChord });
		}
		if (currentChords.length === 1) {
			for (var m = 0; m < pattern.length; m++) {
				switch (pattern[m]) {
					case 'boom':
						writeBoom(currentChords[0].chord.boom, beatLength);
						break;
					case 'boom2':
						writeBoom(currentChords[0].chord.boom2, beatLength);
						break;
					case 'chick':
						writeChick(currentChords[0].chord.chick, beatLength);
						break;
					case '':
						chordTrack.push({ cmd: 'move', duration: beatLength * tempoChangeFactor });
						break;
				}
			}
			return;
		}

		// If we are here it is because more than one chord was declared in the measure, so we have to sort out what chord goes where.

		// First, normalize the chords on beats.
		var beats = {};
		for (var i = 0; i < currentChords.length; i++) {
			var cc = currentChords[i];
			var beat = Math.floor(cc.beat / beatLength); // now all the beats are integers, there may be
			beats['' + beat] = cc;
		}

		// - If there is a chord on the second beat, play a chord for the first beat instead of a bass note.
		// - Likewise, if there is a chord on the fourth beat of 4/4, play a chord on the third beat instead of a bass note.
		for (var m2 = 0; m2 < pattern.length; m2++) {
			var thisChord;
			if (beats['' + m2]) thisChord = beats['' + m2];
			switch (pattern[m2]) {
				case 'boom':
					if (beats['' + (m2 + 1)]) // If there is not a chord change on the next beat, play a bass note.
						writeChick(thisChord.chord.chick, beatLength);else writeBoom(thisChord.chord.boom, beatLength);
					break;
				case 'boom2':
					if (beats['' + (m2 + 1)]) writeChick(thisChord.chord.chick, beatLength);else writeBoom(thisChord.chord.boom2, beatLength);
					break;
				case 'chick':
					writeChick(thisChord.chord.chick, beatLength);
					break;
				case '':
					if (beats['' + m2]) // If there is an explicit chord on this beat, play it.
						writeChick(thisChord.chord.chick, beatLength);else chordTrack.push({ cmd: 'move', duration: beatLength * tempoChangeFactor });
					break;
			}
		}
	}

	function normalizeDrumDefinition(params) {
		// Be very strict with the drum definition. If anything is not perfect,
		// just turn the drums off.
		// Perhaps all of this logic belongs in the parser instead.
		if (params.pattern.length === 0 || params.on === false) return { on: false };

		var str = params.pattern[0];
		var events = [];
		var event = "";
		var totalPlay = 0;
		for (var i = 0; i < str.length; i++) {
			if (str[i] === 'd') totalPlay++;
			if (str[i] === 'd' || str[i] === 'z') {
				if (event.length !== 0) {
					events.push(event);
					event = str[i];
				} else event = event + str[i];
			} else {
				if (event.length === 0) {
					// there was an error: the string should have started with d or z
					return { on: false };
				}
				event = event + str[i];
			}
		}

		if (event.length !== 0) events.push(event);

		// Now the events array should have one item per event.
		// There should be two more params for each event: the volume and the pitch.
		if (params.pattern.length !== totalPlay * 2 + 1) return { on: false };

		var ret = { on: true, bars: params.bars, pattern: [] };
		var beatLength = 1 / meter.den;
		var playCount = 0;
		for (var j = 0; j < events.length; j++) {
			event = events[j];
			var len = 1;
			var div = false;
			var num = 0;
			for (var k = 1; k < event.length; k++) {
				switch (event[k]) {
					case "/":
						if (num !== 0) len *= num;
						num = 0;
						div = true;
						break;
					case "1":
					case "2":
					case "3":
					case "4":
					case "5":
					case "6":
					case "7":
					case "8":
					case "9":
						num = num * 10 + event[k];
						break;
					default:
						return { on: false };
				}
			}
			if (div) {
				if (num === 0) num = 2; // a slash by itself is interpreted as "/2"
				len /= num;
			} else if (num) len *= num;
			if (event[0] === 'd') {
				ret.pattern.push({ len: len * beatLength, pitch: params.pattern[1 + playCount], velocity: params.pattern[1 + playCount + totalPlay] });
				playCount++;
			} else ret.pattern.push({ len: len * beatLength, pitch: null });
		}
		// Now normalize the pattern to cover the correct number of measures. The note lengths passed are relative to each other and need to be scaled to fit a measure.
		var totalTime = 0;
		var measuresPerBeat = meter.num / meter.den;
		for (var ii = 0; ii < ret.pattern.length; ii++) {
			totalTime += ret.pattern[ii].len;
		}var numBars = params.bars ? params.bars : 1;
		var factor = totalTime / numBars / measuresPerBeat;
		for (ii = 0; ii < ret.pattern.length; ii++) {
			ret.pattern[ii].len = ret.pattern[ii].len / factor;
		}return ret;
	}

	function drumBeat(pitch, soundLength, volume) {
		drumTrack.push({ cmd: 'start', pitch: pitch - 60, volume: volume });
		drumTrack.push({ cmd: 'move', duration: soundLength });
		drumTrack.push({ cmd: 'stop', pitch: pitch - 60 });
	}

	function writeDrum(channel) {
		if (drumTrack.length === 0 && !drumDefinition.on) return;

		var measureLen = meter.num / meter.den;
		if (drumTrack.length === 0) {
			drumTrack.push({ cmd: 'program', channel: channel, instrument: drumInstrument });
			// need to figure out how far in time the bar started: if there are pickup notes before the chords start, we need pauses.
			var distance = timeFromStart();
			if (distance > 0 && distance < measureLen - 0.01) {
				// because of floating point, adding the notes might not exactly equal the measure size.
				drumTrack.push({ cmd: 'move', duration: distance * tempoChangeFactor });
				return;
			}
		}

		if (!drumDefinition.on) {
			// this is the case where there has been a drum track, but it was specifically turned off.
			drumTrack.push({ cmd: 'move', duration: measureLen * tempoChangeFactor });
			return;
		}
		for (var i = 0; i < drumDefinition.pattern.length; i++) {
			var len = drumDefinition.pattern[i].len * tempoChangeFactor;
			if (drumDefinition.pattern[i].pitch) drumBeat(drumDefinition.pattern[i].pitch, len, drumDefinition.pattern[i].velocity);else drumTrack.push({ cmd: 'move', duration: len });
		}
	}
})();

module.exports = flatten;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_midi_js_preparer.js: Create the structure that MIDI.js expects.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var Preparer;

(function () {
	"use strict";

	Preparer = function Preparer() {
		this.tempo = 0;
		this.timeFactor = 0;
		this.output = [];
		this.currentChannel = 0;
		this.currentInstrument = 0;
		this.track = 0;
		this.nextDuration = 0;
		this.tracks = [[]];
	};

	Preparer.prototype.setInstrument = function (instrument) {
		this.currentInstrument = instrument;

		var ev = [{
			ticksToEvent: 0,
			track: this.track,
			event: {
				channel: this.currentChannel,
				deltaTime: 0,
				programNumber: this.currentInstrument,
				subtype: 'programChange',
				type: 'channel'
			}
		}, this.nextDuration * this.timeFactor];
		this.tracks[this.track].push(ev);
	};

	Preparer.prototype.setChannel = function (channel) {
		this.currentChannel = channel;
	};

	Preparer.prototype.startTrack = function () {
		this.track++;
		this.tracks[this.track] = [];
		this.nextDuration = 0;
	};

	Preparer.prototype.setGlobalInfo = function (tempo, title) {
		this.tempo = tempo;
		var mspb = Math.round(1.0 / tempo * 60000000);
		this.timeFactor = mspb / 480000;
		var ev = [{
			ticksToEvent: 0,
			track: this.track,
			event: {
				deltaTime: 0,
				microsecondsPerBeat: mspb,
				subtype: 'setTempo',
				type: 'meta'
			}
		}, this.nextDuration * this.timeFactor];
		//		this.tracks[this.track].push(ev);

		ev = [{
			ticksToEvent: 0,
			track: this.track,
			event: {
				deltaTime: 0,
				subtype: 'trackName',
				text: title,
				type: 'meta'
			}
		}, this.nextDuration * this.timeFactor];
		//		this.tracks[this.track].push(ev);

		ev = [{
			ticksToEvent: 0,
			track: this.track,
			event: {
				deltaTime: 0,
				subtype: 'endOfTrack',
				type: 'meta'
			}
		}, this.nextDuration * this.timeFactor];
		//		this.tracks[this.track].push(ev);
	};

	Preparer.prototype.startNote = function (pitch, volume) {
		var deltaTime = Math.floor(this.nextDuration / 5) * 5;
		var ev = [{
			ticksToEvent: deltaTime,
			track: this.track,
			event: {
				deltaTime: deltaTime,
				channel: this.currentChannel,
				type: "channel",
				noteNumber: pitch,
				velocity: volume,
				subtype: "noteOn"
			}
		}, this.nextDuration * this.timeFactor];
		this.tracks[this.track].push(ev);
		this.nextDuration = 0;
	};

	Preparer.prototype.endNote = function (pitch) {
		var deltaTime = Math.floor(this.nextDuration / 5) * 5;
		var ev = [{
			ticksToEvent: deltaTime,
			track: this.track,
			event: {
				deltaTime: deltaTime,
				channel: this.currentChannel,
				type: "channel",
				noteNumber: pitch,
				velocity: 0,
				subtype: "noteOff"
			}
		}, this.nextDuration * this.timeFactor];
		this.tracks[this.track].push(ev);
		this.nextDuration = 0;
	};

	Preparer.prototype.addRest = function (duration) {
		this.nextDuration += duration;
	};

	Preparer.prototype.endTrack = function () {
		var ev = [{
			ticksToEvent: 0,
			track: this.track,
			event: {
				deltaTime: 0,
				type: "meta",
				subtype: "endOfTrack"
			}
		}, 0];
		//		this.tracks[this.track].push(ev);
	};

	function addAbsoluteTime(tracks) {
		for (var i = 0; i < tracks.length; i++) {
			var absTime = 0;
			for (var j = 0; j < tracks[i].length; j++) {
				absTime += tracks[i][j][1];
				tracks[i][j].absTime = absTime;
			}
		}
	}

	function combineTracks(tracks) {
		var output = [];
		for (var i = 0; i < tracks.length; i++) {
			for (var j = 0; j < tracks[i].length; j++) {
				output.push(tracks[i][j]);
			}
		}
		return output;
	}

	function sortTracks(output) {
		return output.sort(function (a, b) {
			if (a.absTime > b.absTime) return 1;
			return -1;
		});
	}

	function adjustTime(output) {
		var lastTime = 0;
		for (var i = 0; i < output.length; i++) {
			var thisTime = output[i].absTime;
			output[i][1] = thisTime - lastTime;
			lastTime = thisTime;
		}
	}

	function weaveTracks(tracks) {
		// Each track has a progression of delta times. To combine them, first assign an absolute time to each event,
		// then make one large track of all the tracks, sort it by absolute time, then adjust the amount of time each
		// event causes time to move. That is, the movement was figured out as the distance from the last note in the track,
		// but now we want the distance from the last note on ANY track.
		addAbsoluteTime(tracks);
		var output = combineTracks(tracks);
		output = sortTracks(output);
		adjustTime(output);
		return output;
	}

	Preparer.prototype.getData = function () {
		return weaveTracks(this.tracks);
	};
})();

module.exports = Preparer;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_midi_renderer.js: Create the actual format for the midi.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var rendererFactory;

(function () {
	"use strict";

	function setAttributes(elm, attrs) {
		for (var attr in attrs) {
			if (attrs.hasOwnProperty(attr)) elm.setAttribute(attr, attrs[attr]);
		}return elm;
	}

	function Midi() {
		this.trackstrings = "";
		this.trackcount = 0;
		this.noteOnAndChannel = "%90";
	}

	Midi.prototype.setTempo = function (qpm) {
		//console.log("setTempo",qpm);
		if (this.trackcount === 0) {
			this.startTrack();
			this.track += "%00%FF%51%03" + toHex(Math.round(60000000 / qpm), 6);
			this.endTrack();
		}
	};

	Midi.prototype.setGlobalInfo = function (qpm, name) {
		//console.log("setGlobalInfo",qpm, key, time, name);
		if (this.trackcount === 0) {
			this.startTrack();
			this.track += "%00%FF%51%03" + toHex(Math.round(60000000 / qpm), 6);
			// TODO-PER: we could also store the key and time signatures, something like:
			//00 FF 5902 03 00 - key signature
			//00 FF 5804 04 02 30 08 - time signature
			if (name) {
				this.track += "%00%FF%03" + toHex(name.length, 2);
				for (var i = 0; i < name.length; i++) {
					this.track += toHex(name.charCodeAt(i), 2);
				}
			}
			this.endTrack();
		}
	};

	Midi.prototype.startTrack = function () {
		//console.log("startTrack");
		this.track = "";
		this.silencelength = 0;
		this.trackcount++;
		this.first = true;
		if (this.instrument) {
			this.setInstrument(this.instrument);
		}
	};

	Midi.prototype.endTrack = function () {
		//console.log("endTrack");
		var tracklength = toHex(this.track.length / 3 + 4, 8);
		this.track = "MTrk" + tracklength + // track header
		this.track + '%00%FF%2F%00'; // track end
		this.trackstrings += this.track;
	};

	Midi.prototype.setInstrument = function (number) {
		//console.log("setInstrument", number);
		if (this.track) this.track = "%00%C0" + toHex(number, 2) + this.track;else this.track = "%00%C0" + toHex(number, 2);
		this.instrument = number;
	};

	Midi.prototype.setChannel = function (number) {
		this.channel = number;
		this.noteOnAndChannel = "%9" + this.channel.toString(16);
	};

	Midi.prototype.startNote = function (pitch, loudness) {
		//console.log("startNote", pitch, loudness);
		this.track += toDurationHex(this.silencelength); // only need to shift by amount of silence (if there is any)
		this.silencelength = 0;
		if (this.first) {
			this.first = false;
			this.track += this.noteOnAndChannel;
		}
		this.track += "%" + pitch.toString(16) + toHex(loudness, 2); //note
	};

	Midi.prototype.endNote = function (pitch, length) {
		//console.log("endNote", pitch, length);
		this.track += toDurationHex(this.silencelength + length); // only need to shift by amount of silence (if there is any)
		this.silencelength = 0;
		//		this.track += toDurationHex(length); //duration
		this.track += "%" + pitch.toString(16) + "%00"; //end note
	};

	Midi.prototype.addRest = function (length) {
		//console.log("addRest", length);
		this.silencelength += length;
	};

	Midi.prototype.getData = function () {
		return "data:audio/midi," + "MThd%00%00%00%06%00%01" + toHex(this.trackcount, 4) + "%01%e0" + // header
		this.trackstrings;
	};

	Midi.prototype.embed = function (parent, noplayer) {

		var data = this.getData();

		var link = setAttributes(document.createElement('a'), {
			href: data
		});
		link.innerHTML = "download midi";
		parent.insertBefore(link, parent.firstChild);

		if (noplayer) return;

		var embed = setAttributes(document.createElement('embed'), {
			src: data,
			type: 'video/quicktime',
			controller: 'true',
			autoplay: 'false',
			loop: 'false',
			enablejavascript: 'true',
			style: 'display:block; height: 20px;'
		});
		parent.insertBefore(embed, parent.firstChild);
	};

	// s is assumed to be of even length
	function encodeHex(s) {
		var ret = "";
		for (var i = 0; i < s.length; i += 2) {
			ret += "%";
			ret += s.substr(i, 2);
		}
		return ret;
	}

	function toHex(n, padding) {
		var s = n.toString(16);
		while (s.length < padding) {
			s = "0" + s;
		}
		return encodeHex(s);
	}

	function toDurationHex(n) {
		var res = 0;
		var a = [];

		// cut up into 7 bit chunks;
		while (n !== 0) {
			a.push(n & 0x7F);
			n = n >> 7;
		}

		// join the 7 bit chunks together, all but last chunk get leading 1
		for (var i = a.length - 1; i >= 0; i--) {
			res = res << 8;
			var bits = a[i];
			if (i !== 0) {
				bits = bits | 0x80;
			}
			res = res | bits;
		}

		var padding = res.toString(16).length;
		padding += padding % 2;

		return toHex(res, padding);
	}

	rendererFactory = function rendererFactory() {
		return new Midi();
	};
})();

module.exports = rendererFactory;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_midi_sequencer.js: Turn parsed abc into a linear series of events.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var sequence;

(function () {
	"use strict";

	var measureLength;
	// The abc is provided to us line by line. It might have repeats in it. We want to re arrange the elements to
	// be an array of voices with all the repeats embedded, and no lines. Then it is trivial to go through the events
	// one at a time and turn it into midi.

	var PERCUSSION_PROGRAM = 128;

	sequence = function sequence(abctune, options) {
		// Global options
		options = options || {};
		var qpm = 180; // The tempo if there isn't a tempo specified.
		var program = options.program || 0; // The program if there isn't a program specified.
		var transpose = options.midiTranspose || 0;
		var channel = options.channel || 0;
		var drumPattern = options.drum || "";
		var drumBars = options.drumBars || 1;
		var drumIntro = options.drumIntro || 0;
		var drumOn = drumPattern !== "";

		// All of the above overrides need to be integers
		program = parseInt(program, 10);
		transpose = parseInt(transpose, 10);
		channel = parseInt(channel, 10);
		if (channel === 10) program = PERCUSSION_PROGRAM;
		drumPattern = drumPattern.split(" ");
		drumBars = parseInt(drumBars, 10);
		drumIntro = parseInt(drumIntro, 10);

		var bagpipes = abctune.formatting.bagpipes; // If it is bagpipes, then the gracenotes are played on top of the main note.
		if (bagpipes) program = 71;

		// %%MIDI fermatafixed
		// %%MIDI fermataproportional
		// %%MIDI deltaloudness n
		// %%MIDI gracedivider b
		// %%MIDI ratio n m
		// %%MIDI beat a b c n
		// %%MIDI grace a/b
		// %%MIDI trim x/y

		// %MIDI gchordon
		// %MIDI gchordoff
		// %%MIDI bassprog 45
		// %%MIDI chordprog 24
		// %%MIDI chordname name n1 n2 n3 n4 n5 n6

		//%%MIDI beat ⟨int1⟩ ⟨int2⟩ ⟨int3⟩ ⟨int4⟩: controls the volumes of the notes in a measure. The first note in a bar has volume ⟨int1⟩; other ‘strong’ notes have volume ⟨int2⟩ and all the rest have volume ⟨int3⟩. These values must be in the range 0–127. The parameter ⟨int4⟩ determines which notes are ‘strong’. If the time signature is x/y, then each note is given a position number k = 0, 1, 2. . . x-1 within each bar. If k is a multiple of ⟨int4⟩, then the note is ‘strong’.

		if (abctune.formatting.midi) {
			//console.log("MIDI Formatting:", abctune.formatting.midi);
			var globals = abctune.formatting.midi;
			if (globals.program) {
				program = globals.program[0];
				if (globals.program.length > 1) channel = globals.program[1];
			}
			if (globals.transpose) transpose = globals.transpose[0];
			if (globals.channel) channel = globals.channel[0];
			if (globals.drum) drumPattern = globals.drum;
			if (globals.drumbars) drumBars = globals.drumbars[0];
			if (globals.drumon) drumOn = true;
			if (channel === 10) program = PERCUSSION_PROGRAM;
		}

		// Specified options in abc string.

		// If the tempo was passed in, use that. If the tempo is specified, use that. Otherwise, use the default.
		if (abctune.metaText.tempo) qpm = interpretTempo(abctune.metaText.tempo);
		if (options.qpm) qpm = parseInt(options.qpm, 10);

		var startVoice = [];
		if (bagpipes) startVoice.push({ el_type: 'bagpipes' });
		startVoice.push({ el_type: 'instrument', program: program });
		if (channel) startVoice.push({ el_type: 'channel', channel: channel });
		if (transpose) startVoice.push({ el_type: 'transpose', transpose: transpose });
		startVoice.push({ el_type: 'tempo', qpm: qpm });

		// the relevant part of the input structure is:
		// abctune
		//		array lines
		//			array staff
		//				object key
		//				object meter
		//				array voices
		//					array abcelem

		// visit each voice completely in turn
		var voices = [];
		var startRepeatPlaceholder = []; // There is a place holder for each voice.
		var skipEndingPlaceholder = []; // This is the place where the first ending starts.
		var startingDrumSet = false;
		for (var i = 0; i < abctune.lines.length; i++) {
			// For each group of staff lines in the tune.
			var line = abctune.lines[i];
			if (line.staff) {
				var staves = line.staff;
				var voiceNumber = 0;
				for (var j = 0; j < staves.length; j++) {
					var staff = staves[j];
					// For each staff line
					for (var k = 0; k < staff.voices.length; k++) {
						// For each voice in a staff line
						var voice = staff.voices[k];
						if (!voices[voiceNumber]) {
							voices[voiceNumber] = [].concat(JSON.parse(JSON.stringify(startVoice)));
						}
						if (staff.clef && staff.clef.type === 'perc') {
							for (var cl = 0; cl < voices[voiceNumber].length; cl++) {
								if (voices[voiceNumber][cl].el_type === 'instrument') voices[voiceNumber][cl].program = PERCUSSION_PROGRAM;
							}
						} else if (staff.key) {
							if (staff.key.root === 'HP') voices[voiceNumber].push({ el_type: 'key', accidentals: [{ acc: 'natural', note: 'g' }, { acc: 'sharp', note: 'f' }, { acc: 'sharp', note: 'c' }] });else voices[voiceNumber].push({ el_type: 'key', accidentals: staff.key.accidentals });
						}
						if (staff.meter) {
							voices[voiceNumber].push(interpretMeter(staff.meter));
						}
						if (!startingDrumSet && drumOn) {
							// drum information is only needed once, so use the first line and track 0.
							voices[voiceNumber].push({ el_type: 'drum', params: { pattern: drumPattern, bars: drumBars, on: drumOn, intro: drumIntro } });
							startingDrumSet = true;
						}
						if (staff.clef && staff.clef.transpose) {
							staff.clef.el_type = 'clef';
							voices[voiceNumber].push({ el_type: 'transpose', transpose: staff.clef.transpose });
						}
						if (abctune.formatting.midi && abctune.formatting.midi.drumoff) {
							// If there is a drum off command right at the beginning it is put in the metaText instead of the stream,
							// so we will just insert it here.
							voices[voiceNumber].push({ el_type: 'bar' });
							voices[voiceNumber].push({ el_type: 'drum', params: { pattern: "", on: false } });
						}
						var noteEventsInBar = 0;
						for (var v = 0; v < voice.length; v++) {
							// For each element in a voice
							var elem = voice[v];
							switch (elem.el_type) {
								case "note":
									// regular items are just pushed.
									if (!elem.rest || elem.rest.type !== 'spacer') {
										elem['velocity'] = interpretVelocity(abctune, elem, noteEventsInBar);
										voices[voiceNumber].push(elem);
										noteEventsInBar++;
									}
									break;
								case "key":
									if (elem.root === 'HP') voices[voiceNumber].push({ el_type: 'key', accidentals: [{ acc: 'natural', note: 'g' }, { acc: 'sharp', note: 'f' }, { acc: 'sharp', note: 'c' }] });else voices[voiceNumber].push({ el_type: 'key', accidentals: elem.accidentals });
									break;
								case "meter":
									voices[voiceNumber].push(interpretMeter(elem));
									break;
								case "clef":
									// need to keep this to catch the "transpose" element.
									if (elem.transpose) voices[voiceNumber].push({ el_type: 'transpose', transpose: elem.transpose });
									break;
								case "tempo":
									qpm = interpretTempo(elem);
									voices[voiceNumber].push({ el_type: 'tempo', qpm: qpm });
									break;
								case "bar":
									if (noteEventsInBar > 0) // don't add two bars in a row.
										voices[voiceNumber].push({ el_type: 'bar' }); // We need the bar marking to reset the accidentals.
									noteEventsInBar = 0;
									// figure out repeats and endings --
									// The important part is where there is a start repeat, and end repeat, or a first ending.
									var endRepeat = elem.type === "bar_right_repeat" || elem.type === "bar_dbl_repeat";
									var startEnding = elem.startEnding === '1';
									var startRepeat = elem.type === "bar_left_repeat" || elem.type === "bar_dbl_repeat" || elem.type === "bar_right_repeat";
									if (endRepeat) {
										var s = startRepeatPlaceholder[voiceNumber];
										if (!s) s = 0; // If there wasn't a left repeat, then we repeat from the beginning.
										var e = skipEndingPlaceholder[voiceNumber];
										if (!e) e = voices[voiceNumber].length; // If there wasn't a first ending marker, then we copy everything.
										voices[voiceNumber] = voices[voiceNumber].concat(voices[voiceNumber].slice(s, e));
										// reset these in case there is a second repeat later on.
										skipEndingPlaceholder[voiceNumber] = undefined;
										startRepeatPlaceholder[voiceNumber] = undefined;
									}
									if (startEnding) skipEndingPlaceholder[voiceNumber] = voices[voiceNumber].length;
									if (startRepeat) startRepeatPlaceholder[voiceNumber] = voices[voiceNumber].length;
									break;
								case 'style':
									// TODO-PER: If this is set to rhythm heads, then it should use the percussion channel.
									break;
								case 'part':
									// TODO-PER: If there is a part section in the header, then this should probably affect the repeats.
									break;
								case 'stem':
								case 'scale':
									// These elements don't affect sound
									break;
								case 'midi':
									//console.log("MIDI inline", elem); // TODO-PER: for debugging. Remove this.
									var drumChange = false;
									switch (elem.cmd) {
										case "drumon":
											drumOn = true;drumChange = true;break;
										case "drumoff":
											drumOn = false;drumChange = true;break;
										case "drum":
											drumPattern = elem.params;drumChange = true;break;
										case "drumbars":
											drumBars = elem.params[0];drumChange = true;break;
										case "drummap":
											// This is handled before getting here so it can be ignored.
											break;
										case "program":
											voices[voiceNumber].push({ el_type: 'instrument', program: elem.params[0] });
											break;
										case "transpose":
											voices[voiceNumber].push({ el_type: 'transpose', transpose: elem.params[0] });
											break;
										default:
											console.log("MIDI seq: midi cmd not handled: ", elem.cmd, elem);
									}
									if (drumChange) {
										voices[0].push({ el_type: 'drum', params: { pattern: drumPattern, bars: drumBars, intro: drumIntro, on: drumOn } });
										startingDrumSet = true;
									}
									break;
								default:
									console.log("MIDI: element type " + elem.el_type + " not handled.");
							}
						}
						voiceNumber++;
					}
				}
			}
		}
		if (drumIntro) {
			var pickups = abctune.getPickupLength();
			// add some measures of rests to the start of each track.
			for (var vv = 0; vv < voices.length; vv++) {
				var insertPoint = 0;
				while (voices[vv][insertPoint].el_type !== "note" && voices[vv].length > insertPoint) {
					insertPoint++;
				}if (voices[vv].length > insertPoint) {
					for (var w = 0; w < drumIntro; w++) {
						// If it is the last measure of intro, subtract the pickups.
						if (pickups === 0 || w < drumIntro - 1) voices[vv].splice(insertPoint, 0, { el_type: "note", rest: { type: "rest" }, duration: measureLength }, { el_type: "bar" });else {
							voices[vv].splice(insertPoint, 0, { el_type: "note", rest: { type: "rest" }, duration: measureLength - pickups });
						}
					}
				}
			}
		}
		return voices;
	};

	function interpretVelocity(abctune, element, noteEventsInBar) {
		var velocity = 64;
		if (abctune.formatting.midi.beat) {
			var strongNote = abctune.formatting.midi.beat[3];
			if (noteEventsInBar === 0) {
				velocity = abctune.formatting.midi.beat[0];
			} else if (!(noteEventsInBar % strongNote)) {
				velocity = abctune.formatting.midi.beat[strongNote];
			} else {
				velocity = abctune.formatting.midi.beat[2];
			}
		}
		if (element.decoration) {
			if (element.decoration.indexOf("accent") !== -1) {
				velocity = 127;
			}
		}

		return velocity;
	}

	function interpretTempo(element) {
		var duration = 1 / 4;
		if (element.duration) {
			duration = element.duration[0];
		}
		var bpm = 60;
		if (element.bpm) {
			bpm = element.bpm;
		}
		// The tempo is defined with a beat of a 1/4 note, so we need to adjust it if the tempo is expressed with other than a quarter note.
		// expressedDuration * expressedBeatsPerMinute / lengthOfQuarterNote = quarterNotesPerMinute
		return duration * bpm / 0.25;
	}

	function interpretMeter(element) {
		var meter;
		switch (element.type) {
			case "common_time":
				meter = { el_type: 'meter', num: 4, den: 4 };
				break;
			case "cut_time":
				meter = { el_type: 'meter', num: 2, den: 2 };
				break;
			case "specified":
				// TODO-PER: only taking the first meter, so the complex meters are not handled.
				meter = { el_type: 'meter', num: element.value[0].num, den: element.value[0].den };
				break;
			default:
				// This should never happen.
				meter = { el_type: 'meter' };
		}
		measureLength = meter.num / meter.den;
		return meter;
	}
})();

module.exports = sequence;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// abc_editor.js
// window.ABCJS.Editor is the interface class for the area that contains the ABC text. It is responsible for
// holding the text of the tune and calling the parser and the rendering engines.
//
// EditArea is an example of using a textarea as the control that is shown to the user. As long as
// the same interface is used, window.ABCJS.Editor can use a different type of object.
//
// EditArea:
// - constructor(textareaid)
//		This contains the id of a textarea control that will be used.
// - addSelectionListener(listener)
//		A callback class that contains the entry point fireSelectionChanged()
// - addChangeListener(listener)
//		A callback class that contains the entry point fireChanged()
// - getSelection()
//		returns the object { start: , end: } with the current selection in characters
// - setSelection(start, end)
//		start and end are the character positions that should be selected.
// - getString()
//		returns the ABC text that is currently displayed.
// - setString(str)
//		sets the ABC text that is currently displayed, and resets the initialText variable
// - getElem()
//		returns the textarea element
// - string initialText
//		Contains the starting text. This can be compared against the current text to see if anything changed.
//

/*global document, window, clearTimeout, setTimeout */

var TuneBook = __webpack_require__(5).TuneBook;
var parseCommon = __webpack_require__(0);
var Parse = __webpack_require__(10);
var TextPrinter = __webpack_require__(57);
var EngraverController = __webpack_require__(12);

// Polyfill for CustomEvent for old IE versions
if (typeof window.CustomEvent !== "function") {
  var CustomEvent = function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
}

var EditArea = function EditArea(textareaid) {
  this.textarea = document.getElementById(textareaid);
  this.initialText = this.textarea.value;
  this.isDragging = false;
};

EditArea.prototype.addSelectionListener = function (listener) {
  this.textarea.onmousemove = function (ev) {
    if (this.isDragging) listener.fireSelectionChanged();
  };
};

EditArea.prototype.addChangeListener = function (listener) {
  this.changelistener = listener;
  this.textarea.onkeyup = function () {
    listener.fireChanged();
  };
  this.textarea.onmousedown = function () {
    this.isDragging = true;
    listener.fireSelectionChanged();
  };
  this.textarea.onmouseup = function () {
    this.isDragging = false;
    listener.fireChanged();
  };
  this.textarea.onchange = function () {
    listener.fireChanged();
  };
};

//TODO won't work under IE?
EditArea.prototype.getSelection = function () {
  return { start: this.textarea.selectionStart, end: this.textarea.selectionEnd };
};

EditArea.prototype.setSelection = function (start, end) {
  if (this.textarea.setSelectionRange) this.textarea.setSelectionRange(start, end);else if (this.textarea.createTextRange) {
    // For IE8
    var e = this.textarea.createTextRange();
    e.collapse(true);
    e.moveEnd('character', end);
    e.moveStart('character', start);
    e.select();
  }
  this.textarea.focus();
};

EditArea.prototype.getString = function () {
  return this.textarea.value;
};

EditArea.prototype.setString = function (str) {
  this.textarea.value = str;
  this.initialText = this.getString();
  if (this.changelistener) {
    this.changelistener.fireChanged();
  }
};

EditArea.prototype.getElem = function () {
  return this.textarea;
};

//
// window.ABCJS.Editor:
//
// constructor(editarea, params)
//		if editarea is a string, then it is an HTML id of a textarea control.
//		Otherwise, it should be an instantiation of an object that expresses the EditArea interface.
//
//		params is a hash of:
//		canvas_id: or paper_id: HTML id to draw in. If not present, then the drawing happens just below the editor.
//		generate_midi: if present, then midi is generated.
//		midi_id: if present, the HTML id to place the midi control. Otherwise it is placed in the same div as the paper.
//		midi_download_id: if present, the HTML id to place the midi download link. Otherwise it is placed in the same div as the paper.
//		generate_warnings: if present, then parser warnings are displayed on the page.
//		warnings_id: if present, the HTML id to place the warnings. Otherwise they are placed in the same div as the paper.
//		onchange: if present, the callback function to call whenever there has been a change.
//		gui: if present, the paper can send changes back to the editor (presumably because the user changed something directly.)
//		parser_options: options to send to the parser engine.
//		midi_options: options to send to the midi engine.
//		render_options: options to send to the render engine.
//		indicate_changed: the dirty flag is set if this is true.
//
// - setReadOnly(bool)
//		adds or removes the class abc_textarea_readonly, and adds or removes the attribute readonly=yes
// - setDirtyStyle(bool)
//		adds or removes the class abc_textarea_dirty
// - renderTune(abc, parserparams, div)
//		Immediately renders the tune. (Useful for creating the SVG output behind the scenes, if div is hidden)
//		string abc: the ABC text
//		parserparams: params to send to the parser
//		div: the HTML id to render to.
// - modelChanged()
//		Called when the model has been changed to trigger re-rendering
// - parseABC()
//		Called internally by fireChanged()
//		returns true if there has been a change since last call.
// - updateSelection()
//		Called when the user has changed the selection. This calls the engraver_controller to show the selection.
// - fireSelectionChanged()
//		Called by the textarea object when the user has changed the selection.
// - paramChanged(engraverparams)
//		Called to signal that the engraver params have changed, so re-rendering should occur.
// - fireChanged()
//		Called by the textarea object when the user has changed something.
// - setNotDirty()
//		Called by the client app to reset the dirty flag
// - isDirty()
//		Returns true or false, whether the textarea contains the same text that it started with.
// - highlight(abcelem)
//		Called by the engraver_controller to highlight an area.
// - pause(bool)
//		Stops the automatic rendering when the user is typing.
//

var Editor = function Editor(editarea, params) {
  // Copy all the options that will be passed through
  this.abcjsParams = {};
  var key;
  if (params.abcjsParams) {
    for (key in params.abcjsParams) {
      if (params.abcjsParams.hasOwnProperty(key)) {
        this.abcjsParams[key] = params.abcjsParams[key];
      }
    }
  }
  if (params.midi_options) {
    for (key in params.midi_options) {
      if (params.midi_options.hasOwnProperty(key)) {
        this.abcjsParams[key] = params.midi_options[key];
      }
    }
  }
  if (params.parser_options) {
    for (key in params.parser_options) {
      if (params.parser_options.hasOwnProperty(key)) {
        this.abcjsParams[key] = params.parser_options[key];
      }
    }
  }
  if (params.render_options) {
    for (key in params.render_options) {
      if (params.render_options.hasOwnProperty(key)) {
        this.abcjsParams[key] = params.render_options[key];
      }
    }
  }

  if (params.indicate_changed) this.indicate_changed = true;
  if (typeof editarea === "string") {
    this.editarea = new EditArea(editarea);
  } else {
    this.editarea = editarea;
  }
  this.editarea.addSelectionListener(this);
  this.editarea.addChangeListener(this);

  if (params.canvas_id) {
    this.div = document.getElementById(params.canvas_id);
  } else if (params.paper_id) {
    this.div = document.getElementById(params.paper_id);
  } else {
    this.div = document.createElement("DIV");
    this.editarea.getElem().parentNode.insertBefore(this.div, this.editarea.getElem());
  }

  // If the user wants midi, then store the elements that it will be written to. The element could either be passed in as an id,
  // an element, or nothing. If nothing is passed in, then just put the midi on top of the generated music.
  if (params.generate_midi) {
    this.generate_midi = params.generate_midi;
    if (this.abcjsParams.generateDownload) {
      if (typeof params.midi_download_id === 'string') this.downloadMidi = document.getElementById(params.midi_download_id);else if (params.midi_download_id) // assume, if the var is not a string it is an element. If not, it will crash soon enough.
        this.downloadMidi = params.midi_download_id;
    }
    if (this.abcjsParams.generateInline !== false) {
      // The default for this is true, so undefined is also true.
      if (typeof params.midi_id === 'string') this.inlineMidi = document.getElementById(params.midi_id);else if (params.midi_id) // assume, if the var is not a string it is an element. If not, it will crash soon enough.
        this.inlineMidi = params.midi_id;
    }
  }

  if (params.generate_warnings || params.warnings_id) {
    if (params.warnings_id) {
      this.warningsdiv = document.getElementById(params.warnings_id);
    } else {
      this.warningsdiv = this.div;
    }
  }

  this.onchangeCallback = params.onchange;

  if (params.gui) {
    this.target = document.getElementById(editarea);
    this.abcjsParams.editable = true;
  }
  this.oldt = "";
  this.bReentry = false;
  this.parseABC();
  this.modelChanged();

  this.addClassName = function (element, className) {
    var hasClassName = function hasClassName(element, className) {
      var elementClassName = element.className;
      return elementClassName.length > 0 && (elementClassName === className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName));
    };

    if (!hasClassName(element, className)) element.className += (element.className ? ' ' : '') + className;
    return element;
  };

  this.removeClassName = function (element, className) {
    element.className = parseCommon.strip(element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' '));
    return element;
  };

  this.setReadOnly = function (readOnly) {
    var readonlyClass = 'abc_textarea_readonly';
    var el = this.editarea.getElem();
    if (readOnly) {
      el.setAttribute('readonly', 'yes');
      this.addClassName(el, readonlyClass);
    } else {
      el.removeAttribute('readonly');
      this.removeClassName(el, readonlyClass);
    }
  };
};

Editor.prototype.renderTune = function (abc, params, div) {
  var tunebook = new TuneBook(abc);
  var abcParser = Parse();
  abcParser.parse(tunebook.tunes[0].abc, params); //TODO handle multiple tunes
  var tune = abcParser.getTune();
  var engraver_controller = new EngraverController(div, this.abcjsParams);
  engraver_controller.engraveABC(tune);
};

Editor.prototype.redrawMidi = function () {
  if (this.generate_midi && !this.midiPause) {
    var event = new window.CustomEvent("generateMidi", {
      detail: {
        tunes: this.tunes,
        abcjsParams: this.abcjsParams,
        downloadMidiEl: this.downloadMidi,
        inlineMidiEl: this.inlineMidi,
        engravingEl: this.div
      }
    });
    window.dispatchEvent(event);
  }
};

Editor.prototype.modelChanged = function () {
  if (this.tunes === undefined) {
    if (this.downloadMidi !== undefined) this.downloadMidi.innerHTML = "";
    if (this.inlineMidi !== undefined) this.inlineMidi.innerHTML = "";
    this.div.innerHTML = "";
    return;
  }

  if (this.bReentry) return; // TODO is this likely? maybe, if we rewrite abc immediately w/ abc2abc
  this.bReentry = true;
  this.timerId = null;
  this.div.innerHTML = "";
  this.engraver_controller = new EngraverController(this.div, this.abcjsParams);
  this.engraver_controller.engraveABC(this.tunes);
  this.tunes[0].engraver = this.engraver_controller; // TODO-PER: We actually want an output object for each tune, not the entire controller. When refactoring, don't save data in the controller.
  this.redrawMidi();

  if (this.warningsdiv) {
    this.warningsdiv.innerHTML = this.warnings ? this.warnings.join("<br />") : "No errors";
  }
  if (this.target) {
    var textprinter = new TextPrinter(this.target, true);
    textprinter.printABC(this.tunes[0]); //TODO handle multiple tunes
  }
  this.engraver_controller.addSelectListener(this.highlight.bind(this));
  this.updateSelection();
  this.bReentry = false;
};

// Call this to reparse in response to the printing parameters changing
Editor.prototype.paramChanged = function (engraverParams) {
  if (engraverParams) {
    for (var key in engraverParams) {
      if (engraverParams.hasOwnProperty(key)) {
        this.abcjsParams[key] = engraverParams[key];
      }
    }
  }
  this.oldt = "";
  this.fireChanged();
};

// return true if the model has changed
Editor.prototype.parseABC = function () {
  var t = this.editarea.getString();
  if (t === this.oldt) {
    this.updateSelection();
    return false;
  }

  this.oldt = t;
  if (t === "") {
    this.tunes = undefined;
    this.warnings = "";
    return true;
  }
  var tunebook = new TuneBook(t);

  this.tunes = [];
  this.startPos = [];
  this.warnings = [];
  for (var i = 0; i < tunebook.tunes.length; i++) {
    var abcParser = new Parse();
    abcParser.parse(tunebook.tunes[i].abc, this.abcjsParams);
    this.tunes[i] = abcParser.getTune();
    this.startPos[i] = tunebook.tunes[i].startPos;
    var warnings = abcParser.getWarnings() || [];
    for (var j = 0; j < warnings.length; j++) {
      this.warnings.push(warnings[j]);
    }
  }
  return true;
};

Editor.prototype.updateSelection = function () {
  var selection = this.editarea.getSelection();
  try {
    this.engraver_controller.rangeHighlight(selection.start, selection.end);
  } catch (e) {} // maybe printer isn't defined yet?
};

Editor.prototype.fireSelectionChanged = function () {
  this.updateSelection();
};

Editor.prototype.setDirtyStyle = function (isDirty) {
  if (this.indicate_changed === undefined) return;
  var addClassName = function addClassName(element, className) {
    var hasClassName = function hasClassName(element, className) {
      var elementClassName = element.className;
      return elementClassName.length > 0 && (elementClassName === className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName));
    };

    if (!hasClassName(element, className)) element.className += (element.className ? ' ' : '') + className;
    return element;
  };

  var removeClassName = function removeClassName(element, className) {
    element.className = parseCommon.strip(element.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' '));
    return element;
  };

  var readonlyClass = 'abc_textarea_dirty';
  var el = this.editarea.getElem();
  if (isDirty) {
    addClassName(el, readonlyClass);
  } else {
    removeClassName(el, readonlyClass);
  }
};

// call when abc text is changed and needs re-parsing
Editor.prototype.fireChanged = function () {
  if (this.bIsPaused) return;
  if (this.parseABC()) {
    var self = this;
    if (this.timerId) // If the user is still typing, cancel the update
      clearTimeout(this.timerId);
    this.timerId = setTimeout(function () {
      self.modelChanged();
    }, 300); // Is this a good compromise between responsiveness and not redrawing too much?
    var isDirty = this.isDirty();
    if (this.wasDirty !== isDirty) {
      this.wasDirty = isDirty;
      this.setDirtyStyle(isDirty);
    }
    if (this.onchangeCallback) this.onchangeCallback(this);
  }
};

Editor.prototype.setNotDirty = function () {
  this.editarea.initialText = this.editarea.getString();
  this.wasDirty = false;
  this.setDirtyStyle(false);
};

Editor.prototype.isDirty = function () {
  if (this.indicate_changed === undefined) return false;
  return this.editarea.initialText !== this.editarea.getString();
};

Editor.prototype.highlight = function (abcelem, tuneNumber, classes) {
  // TODO-PER: The marker appears to get off by one for each tune parsed. I'm not sure why, but adding the tuneNumber in corrects it for the time being.
  var offset = tuneNumber !== undefined ? this.startPos[tuneNumber] + tuneNumber : 0;

  this.editarea.setSelection(offset + abcelem.startChar, offset + abcelem.endChar);
};

Editor.prototype.pause = function (shouldPause) {
  this.bIsPaused = shouldPause;
  if (!shouldPause) this.fireChanged();
};

Editor.prototype.pauseMidi = function (shouldPause) {
  this.midiPause = shouldPause;
  if (!shouldPause) this.redrawMidi();
};

module.exports = Editor;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc2abc_write.js: Prints an abc file in text format parsed by abc_parse.js
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com)
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var TextPrinter = function TextPrinter(elem, reposition) {
   this.elem = elem;
   this.text = "";
   this.l = 1 / 8;
   this.reposition = reposition || false;
};

TextPrinter.prototype.printString = function (str, elem) {
   if (this.reposition && elem) elem.startChar = this.text.length;
   this.text += str;
   if (this.reposition && elem) elem.endChar = this.text.length;
};

TextPrinter.prototype.printNewLine = function () {
   this.text += "\n";
};

TextPrinter.prototype.printSpace = function () {
   if (this.text[this.text.length - 1].match(/\s/)) return; //TODO match whitespace
   this.text += " ";
};

TextPrinter.prototype.printABC = function (abctune) {
   this.text = "";
   this.abctune = abctune;
   //TODO formatting
   this.printHeader();
   this.printBody();
   this.elem.value = this.text;
};

TextPrinter.prototype.printHeader = function () {
   // much of this info is duplicated in metaTextHEaders in abc_parse_header.js
   this.printHeaderLine("x", "X", "1");
   this.printHeaderLine("title", "T");
   this.printHeaderLine("composer", "C");
   this.printHeaderLine("history", "H");
   this.printHeaderLine("author", "A");
   this.printHeaderLine("book", "B");
   this.printHeaderLine("discography", "D");
   this.printHeaderLine("url", "F");
   this.printHeaderLine("group", "G");
   this.printHeaderLine("instruction", "I");
   this.printHeaderLine("notes", "N");
   this.printHeaderLine("origin", "O");
   this.printHeaderLine("rhythm", "R");
   this.printHeaderLine("source", "S");
   this.printHeaderLine("unalignedwords", "W");
   this.printHeaderLine("transcription", "Z");
   //TODO part order
   //TODO Q tempo
   //TODO textBlock
   this.printHeaderLine("NULL", "L", "1/8"); //TODO L

   this.printHeaderLine("NULL", "M", this.getMeterString(this.abctune.lines[0].staff[0].meter));
   this.printHeaderLine("NULL", "K", this.getKeyString(this.abctune.lines[0].staff[0].key)); //TODO K
};

TextPrinter.prototype.getKeyString = function (key) {
   return key.root + key.acc + key.mode;
};

TextPrinter.prototype.getMeterString = function (meter) {
   switch (meter.type) {
      case "cut_time":
         return "C|";
      case "common_time":
         return "C";
      case "specified":
         if (meter.value[0].den) return meter.value[0].num + "/" + meter.value[0].den;else return meter.value[0].num;
   }
   return "";
};

TextPrinter.prototype.printHeaderLine = function (fieldname, abcfield, defaut) {
   var val = this.abctune.metaText[fieldname] || defaut;
   if (val !== undefined) {
      var valarray = val.split("\n");
      for (var i = 0; i < valarray.length; i++) {
         this.printString(abcfield + ": " + valarray[i]);
         this.printNewLine();
      }
   }
};

TextPrinter.prototype.getElem = function () {
   if (this.abcline.length <= this.pos) return null;
   return this.abcline[this.pos];
};

TextPrinter.prototype.getNextElem = function () {
   if (this.abcline.length <= this.pos + 1) return null;
   return this.abcline[this.pos + 1];
};

TextPrinter.prototype.printBody = function () {
   for (var line = 0; line < this.abctune.lines.length; line++) {
      var abcline = this.abctune.lines[line];
      if (abcline.staff) {
         this.printABCLine(abcline.staff);
      } else if (abcline.subtitle && line !== 0) {
         //TODO
      } else if (abcline.text) {
         //TODO
      }
   }
};

TextPrinter.prototype.printABCLine = function (staffs) {
   for (this.s = 0; this.s < staffs.length; this.s++) {
      this.printABCStaff(staffs[this.s]);
   }
};

TextPrinter.prototype.printABCStaff = function (abcstaff) {

   // TODO if (abcstaff.bracket) header += "bracket "+abcstaff.bracket+" ";
   // TODO if (abcstaff.brace) header += "brace "+abcstaff.brace+" ";


   for (this.v = 0; this.v < abcstaff.voices.length; this.v++) {
      // TODO stuff about voices

      // TODO this is where key sig is this.voice.addChild(this.printClef(abcstaff.clef));
      // this.voice.addChild(this.printKeySignature(abcstaff.key));
      // if (abcstaff.meter) this.voice.addChild(this.printTimeSignature(abcstaff.meter));
      this.printABCVoice(abcstaff.voices[this.v]);
   }
};

TextPrinter.prototype.printABCVoice = function (abcline) {
   this.abcline = abcline;
   for (this.pos = 0; this.pos < this.abcline.length; this.pos++) {
      this.printABCElement();
   }
   this.printNewLine();
};

TextPrinter.prototype.printABCElement = function () {
   var elem = this.getElem();
   switch (elem.el_type) {
      case "note":
         this.printBeam();
         break;
      case "bar":
         this.printBarLine(elem);
         break;
      case "meter":
         //TODO this.printTimeSignature(elem);
         break;
      case "clef":
         //TODO this.printClef(elem);
         break;
      case "key":
      //TODO this.printKeySignature(elem);
      case "stem":
         //TODO do nothing?
         break;
      case "part":
         //TODO print part
         break;
      default:
      //TODO show we're missing something
   }
};

TextPrinter.prototype.printBeam = function () {
   this.printSpace();
   if (this.getElem().startBeam && !this.getElem().endBeam) {
      while (this.getElem()) {
         this.printNote(this.getElem());
         if (this.getElem().endBeam) {
            break;
         }
         this.pos++;
      }
   } else {
      this.printNote(this.getElem());
   }
   this.printSpace();
};

TextPrinter.prototype.printNote = function (elem) {
   var str = "";
   var i;
   if (elem.chord !== undefined) {
      for (i = 0; i < elem.chord.length; i++) {
         str += '"' + elem.chord[i].name + '"';
      }
   }

   //TODO unify map between names and symbols (to be used with abcparse?)
   var decorations = {
      "staccato": ".",
      "upbow": "u",
      "downbow": "v",
      "roll": "~",
      "fermata": "H",
      "slide": "J",
      "accent": "L",
      "mordent": "M",
      "pralltriller": "P",
      "trill": "T",
      "lower": "."
   };

   if (elem.decoration !== undefined) {
      for (i = 0; i < elem.decoration.length; i++) {
         var dec = elem.decoration[i];
         if (decorations[dec]) {
            str += decorations[dec];
         } else {
            str += "!"; //TODO hardcoded
            str += dec;
            str += "!"; //TODO hardcoded
         }
      }
   }

   if (elem.gracenotes !== undefined) {
      str += "{";
      for (i = 0; i < elem.gracenotes.length; i++) {
         str += this.getNoteString(elem.gracenotes[i]);
      }
      str += "}";
   }

   var ignoreslur = false;
   if (elem.pitches.length === 1 && elem.pitches[0].startSlur) {
      ignoreslur = true;
      str += this.multiplyString("(", elem.pitches[0].startSlur.length);
   }

   if (elem.startSlur) {
      str += this.multiplyString("(", elem.startSlur.length);
   }

   if (elem.pitches.length === 1 && elem.pitches[0].endSlur || elem.endSlur) {
      ignoreslur = true;
   }

   if (elem.startTriplet) {
      str += "(3";
   }

   if (elem.pitches) {
      if (elem.pitches.length > 1) str += "[";
      for (i = 0; i < elem.pitches.length; i++) {
         elem.pitches[i].duration = elem.duration;
         str += this.getNoteString(elem.pitches[i], ignoreslur);
      }
      if (elem.pitches.length > 1) str += "]";
   }

   if (elem.pitches.length === 1 && elem.pitches[0].endSlur) {
      str += this.multiplyString(")", elem.pitches[0].endSlur.length);
   }

   if (elem.endSlur) {
      str += this.multiplyString(")", elem.endSlur.length);
   }

   this.printString(str, elem);
};

// accidentals, ties and sometimes slurs, sometimes duration
TextPrinter.prototype.getNoteString = function (pitchelem, ignoreslur) {
   var str = "";
   if (!ignoreslur && pitchelem.startSlur) {
      str += "(";
   }

   var symb = "";
   switch (pitchelem.accidental) {
      case "quartersharp":
         symb = "^/";
         break;
      case "dblsharp":
         symb = "^^";
         break;
      case "sharp":
         symb = "^";
         break;
      case "quarterflat":
         symb = "_/";
         break;
      case "flat":
         symb = "_";
         break;
      case "dblflat":
         symb = "__";
         break;
      case "natural":
         symb = "=";
   }
   str += symb;

   var pitches = ["C", "D", "E", "F", "G", "A", "B"];
   var pitchstr = pitches[this.extractNote(pitchelem.pitch)];
   var octave = this.extractOctave(pitchelem.pitch);
   if (octave > 0) {
      pitchstr = pitchstr.toLowerCase();
      octave--;
      while (octave > 0) {
         pitchstr += "'";
         octave--;
      }
   } else {
      while (octave < 0) {
         pitchstr += ",";
         octave++;
      }
   }

   str += pitchstr;

   if (pitchelem.duration) {
      str += this.getDurationString(pitchelem.duration);
   }

   if (!ignoreslur && pitchelem.endSlur) {
      str += ")";
   }

   if (pitchelem.startTie) {
      str += "-";
   }

   return str;
};

TextPrinter.prototype.getDurationString = function (duration) {
   //TODO detect crooked rhythm
   if (duration / this.l > 1) {
      return duration / this.l;
   }
   var ret = "";
   if (this.l / duration > 1) {
      ret += "/";
      if (this.l / duration > 2) {
         ret += this.l / duration;
      }
   }
   return ret;
};

TextPrinter.prototype.extractNote = function (pitch) {
   var pitch2 = pitch % 7;
   if (pitch2 < 0) pitch2 += 7;
   return pitch2;
};

TextPrinter.prototype.extractOctave = function (pitch) {
   return Math.floor(pitch / 7);
};

TextPrinter.prototype.printBarLine = function (elem) {
   var barstr = "";
   switch (elem.type) {
      case "bar_thin":
         barstr += "|";break;
      case "bar_thin_thick":
         barstr += "|]";break;
      case "bar_thin_thin":
         barstr += "||";break;
      case "bar_thick_thin":
         barstr += "[|";break;
      case "bar_dbl_repeat":
         barstr += ":||:";break;
      case "bar_left_repeat":
         barstr += "|:";break;
      case "bar_right_repeat":
         barstr += ":|";break;
      case "bar_invisible":
         barstr += "";break;
   }
   this.printString(barstr, elem);
};

TextPrinter.prototype.multiplyString = function (s, n) {
   var ret = "";
   for (; n > 0; n--) {
      ret += s;
   }return ret;
};

module.exports = TextPrinter;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//    abc_midi_ui_generator.js: Used by the editor to automatically generate the correct midi elements.
//    Copyright (C) 2010-2018 Gregory Dyke (gregdyke at gmail dot com) and Paul Rosen
//
//    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
//    documentation files (the "Software"), to deal in the Software without restriction, including without limitation
//    the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
//    to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
//    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
//    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var midi = __webpack_require__(9);
var midiCreate = __webpack_require__(14);
var abcMidiUiGenerator;

(function () {
	"use strict";

	abcMidiUiGenerator = function abcMidiUiGenerator(tunes, abcjsParams, downloadMidiEl, inlineMidiEl, engravingEl) {
		var downloadMidiHtml = "";
		var inlineMidiHtml = "";
		for (var i = 0; i < tunes.length; i++) {
			var midiInst = midiCreate(tunes[i], abcjsParams);

			var stopOld = !inlineMidiEl || inlineMidiEl.innerHTML.indexOf("abcjs-midi-current") >= 0;

			if (abcjsParams.generateInline && abcjsParams.generateDownload) {
				downloadMidiHtml += midi.generateMidiDownloadLink(tunes[i], abcjsParams, midiInst.download, i);
				inlineMidiHtml += midi.generateMidiControls(tunes[i], abcjsParams, midiInst.inline, i, stopOld);
			} else if (abcjsParams.generateInline) inlineMidiHtml += midi.generateMidiControls(tunes[i], abcjsParams, midiInst, i);else downloadMidiHtml += midi.generateMidiDownloadLink(tunes[i], abcjsParams, midiInst, i, stopOld);
		}
		if (abcjsParams.generateDownload) {
			if (downloadMidiEl) downloadMidiEl.innerHTML = downloadMidiHtml;else engravingEl.innerHTML += downloadMidiHtml;
		}
		var find = function find(element, cls) {
			var els = element.getElementsByClassName(cls);
			if (els.length === 0) return null;
			return els[0];
		};
		if (abcjsParams.generateInline) {
			var inlineDiv;
			if (inlineMidiEl) {
				inlineMidiEl.innerHTML = inlineMidiHtml;
				inlineDiv = inlineMidiEl;
			} else {
				engravingEl.innerHTML += inlineMidiHtml;
				inlineDiv = engravingEl;
			}
			if (abcjsParams.animate || abcjsParams.midiListener) {
				for (i = 0; i < tunes.length; i++) {
					var parent = find(inlineDiv, "abcjs-midi-" + i);
					parent.abcjsTune = tunes[i];
					parent.abcjsListener = abcjsParams.midiListener;
					parent.abcjsQpm = abcjsParams.qpm;
					parent.abcjsContext = abcjsParams.context;
					if (abcjsParams.animate) {
						var drumIntro = abcjsParams.drumIntro ? abcjsParams.drumIntro : 0;
						parent.abcjsAnimate = abcjsParams.animate.listener;
						parent.abcjsTune.setTiming(abcjsParams.qpm, drumIntro);
					}
				}
			}
		}
	};

	window.addEventListener("generateMidi", function (e) {
		var options = e.detail;
		abcMidiUiGenerator(options.tunes, options.abcjsParams, options.downloadMidiEl, options.inlineMidiEl, options.engravingEl);
	});
})();

module.exports = abcMidiUiGenerator;

/***/ })
/******/ ]);