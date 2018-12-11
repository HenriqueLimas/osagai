var pageComponent =
webpackJsonppageComponent([20],{

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metalComponent = __webpack_require__(1);

var _metalComponent2 = _interopRequireDefault(_metalComponent);

var _metalSoy = __webpack_require__(2);

var _metalSoy2 = _interopRequireDefault(_metalSoy);

var _OlderPostsSoy = __webpack_require__(192);

var _OlderPostsSoy2 = _interopRequireDefault(_OlderPostsSoy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OlderPosts = function (_Component) {
	_inherits(OlderPosts, _Component);

	function OlderPosts() {
		_classCallCheck(this, OlderPosts);

		return _possibleConstructorReturn(this, (OlderPosts.__proto__ || Object.getPrototypeOf(OlderPosts)).apply(this, arguments));
	}

	_createClass(OlderPosts, [{
		key: 'attached',
		value: function attached() {
			this.filterPosts();
		}
	}, {
		key: 'filterPosts',
		value: function filterPosts() {
			if (this.blogObject && this.url) {
				var posts = [];

				for (var i in this.blogObject.childIds) {
					var childId = this.blogObject.childIds[i];
					var post = this.blogObject.children[childId];

					if (this.url !== post.url) {
						posts.push(post);
					}
				}

				this.posts = posts.slice(0, 3);
			}
		}
	}]);

	return OlderPosts;
}(_metalComponent2.default);

;

OlderPosts.STATE = {
	blogObject: {},
	url: {},
	posts: {
		internal: true,
		value: []
	}
};

_metalSoy2.default.register(OlderPosts, _OlderPostsSoy2.default);

exports.default = OlderPosts;

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OlderPosts", function() { return OlderPosts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "templates", function() { return templates; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_metal_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_metal_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_metal_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_metal_soy__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_metal_soy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_metal_soy__);
/* jshint ignore:start */


var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from OlderPosts.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace OlderPosts.
 * @public
 */

goog.module('OlderPosts.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
/** @suppress {extraRequire} */
goog.require('soy.asserts');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.string');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;


/**
 * @param {{
 *    posts: (?)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  ie_open('div', null, null,
      'class', 'posts-list');
    ie_open('div', null, null,
        'class', 'container');
      if (opt_data.posts) {
        var postList176 = opt_data.posts;
        var postListLen176 = postList176.length;
        for (var postIndex176 = 0; postIndex176 < postListLen176; postIndex176++) {
          var postData176 = postList176[postIndex176];
          ie_open('div', null, null,
              'class', 'post-item container-blog');
            ie_open('a', null, null,
                'class', 'post-item__link',
                'href', postData176.url);
              ie_open('small');
                itext('By ');
                var dyn15 = postData176.author;
                if (typeof dyn15 == 'function') dyn15(); else if (dyn15 != null) itext(dyn15);
                itext(' ');
                ie_open('span');
                  itext('| ');
                  var dyn16 = postData176.date;
                  if (typeof dyn16 == 'function') dyn16(); else if (dyn16 != null) itext(dyn16);
                ie_close('span');
              ie_close('small');
              ie_open('h4', null, null,
                  'class', 'post-item__title');
                var dyn17 = postData176.title;
                if (typeof dyn17 == 'function') dyn17(); else if (dyn17 != null) itext(dyn17);
              ie_close('h4');
            ie_close('a');
          ie_close('div');
        }
      }
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'OlderPosts.render';
}

exports.render.params = ["posts"];
exports.render.types = {"posts":"?"};
templates = exports;
return exports;

});

class OlderPosts extends __WEBPACK_IMPORTED_MODULE_0_metal_component___default.a {}
__WEBPACK_IMPORTED_MODULE_1_metal_soy___default.a.register(OlderPosts, templates);

/* harmony default export */ __webpack_exports__["default"] = (templates);
/* jshint ignore:end */


/***/ })

},[164]);