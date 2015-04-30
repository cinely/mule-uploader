(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _Uploader = require('./uploader');

var _Uploader2 = _interopRequireDefault(_Uploader);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function muleUploader(settings) {
  // Verify that the browser has the needed HTML5 capabilities
  if (!(typeof File !== 'undefined' && typeof FileList !== 'undefined' && typeof Blob !== 'undefined')) {
    _log2['default']('HTML5 APIs not available.');
    return -1;
  }

  // For new webkit browsers, the .slice() method is named .webkitSlice()
  // similar for mozilla
  File.prototype.slice = File.prototype.webkitSlice || File.prototype.mozSlice || File.prototype.slice;

  if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') !== -1) {
    try {
      var justChecking = new Blob(['something']);
    } catch (e) {
      return -1;
    }
  }
  _log2['default']('OK');

  return new _Uploader2['default'](settings);
}

if (typeof window !== 'undefined') {
  window.muleUploader = muleUploader;
}

},{"./log":42,"./uploader":43,"babel-runtime/helpers/interop-require-default":9}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":11}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":12}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":13}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":14}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":15}],7:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],8:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":5}],9:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],10:[function(require,module,exports){
"use strict";

var _isIterable = require("babel-runtime/core-js/is-iterable")["default"];

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

exports["default"] = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (_isIterable(Object(arr))) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/is-iterable":3}],11:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
require('../modules/core.iter-helpers');
module.exports = require('../modules/$').core.getIterator;
},{"../modules/$":24,"../modules/core.iter-helpers":29,"../modules/es6.string.iterator":33,"../modules/web.dom.iterable":34}],12:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
require('../modules/core.iter-helpers');
module.exports = require('../modules/$').core.isIterable;
},{"../modules/$":24,"../modules/core.iter-helpers":29,"../modules/es6.string.iterator":33,"../modules/web.dom.iterable":34}],13:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$').core.Object.assign;
},{"../../modules/$":24,"../../modules/es6.object.assign":31}],14:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":24}],15:[function(require,module,exports){
require('../../modules/es6.object.statics-accept-primitives');
module.exports = require('../../modules/$').core.Object.keys;
},{"../../modules/$":24,"../../modules/es6.object.statics-accept-primitives":32}],16:[function(require,module,exports){
var $ = require('./$');
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
assert.def = $.assertDefined;
assert.fn = function(it){
  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
  return it;
};
assert.obj = function(it){
  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
assert.inst = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
module.exports = assert;
},{"./$":24}],17:[function(require,module,exports){
var $        = require('./$')
  , enumKeys = require('./$.enum-keys');
// 19.1.2.1 Object.assign(target, source, ...)
/* eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/* eslint-enable no-unused-vars */
  var T = Object($.assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = $.ES5Object(arguments[i++])
      , keys   = enumKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$":24,"./$.enum-keys":20}],18:[function(require,module,exports){
var $        = require('./$')
  , TAG      = require('./$.wks')('toStringTag')
  , toString = {}.toString;
function cof(it){
  return toString.call(it).slice(8, -1);
}
cof.classof = function(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
};
cof.set = function(it, tag, stat){
  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
};
module.exports = cof;
},{"./$":24,"./$.wks":28}],19:[function(require,module,exports){
var $          = require('./$')
  , global     = $.g
  , core       = $.core
  , isFunction = $.isFunction;
function ctx(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
}
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
function $def(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {}).prototype
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && !isFunction(target[key]))exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp.prototype = C.prototype;
    }(out);
    else exp = type & $def.P && isFunction(out) ? ctx(Function.call, out) : out;
    // export
    $.hide(exports, key, exp);
  }
}
module.exports = $def;
},{"./$":24}],20:[function(require,module,exports){
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getDesc    = $.getDesc
    , getSymbols = $.getSymbols;
  if(getSymbols)$.each.call(getSymbols(it), function(key){
    if(getDesc(it, key).enumerable)keys.push(key);
  });
  return keys;
};
},{"./$":24}],21:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],22:[function(require,module,exports){
var $def            = require('./$.def')
  , $               = require('./$')
  , cof             = require('./$.cof')
  , $iter           = require('./$.iter')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , FF_ITERATOR     = '@@iterator'
  , VALUES          = 'values'
  , Iterators       = $iter.Iterators;
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iter.create(Constructor, NAME, next);
  function createMethod(kind){
    return function(){
      return new Constructor(this, kind);
    };
  }
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || createMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = $.getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    cof.set(IteratorPrototype, TAG, true);
    // FF fix
    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
  }
  // Define iterator
  if($.FW)$iter.set(proto, _default);
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = $.that;
  if(DEFAULT){
    methods = {
      keys:    IS_SET            ? _default : createMethod('keys'),
      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
      entries: DEFAULT != VALUES ? _default : createMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$.hide(proto, key, methods[key]);
    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
  }
};
},{"./$":24,"./$.cof":18,"./$.def":19,"./$.iter":23,"./$.wks":28}],23:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , cof               = require('./$.cof')
  , assertObject      = require('./$.assert').obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = {}
  , IteratorPrototype = {};
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}

module.exports = {
  // Safari has buggy iterators w/o `next`
  BUGGY: 'keys' in [] && !('next' in [].keys()),
  Iterators: Iterators,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol
      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
  },
  get: function(it){
    var Symbol  = $.g.Symbol
      , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
      , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
    return assertObject(getIter.call(it));
  },
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  }
};
},{"./$":24,"./$.assert":16,"./$.cof":18,"./$.wks":28}],24:[function(require,module,exports){
'use strict';
var global = typeof self != 'undefined' ? self : Function('return this')()
  , core   = {}
  , defineProperty = Object.defineProperty
  , hasOwnProperty = {}.hasOwnProperty
  , ceil  = Math.ceil
  , floor = Math.floor
  , max   = Math.max
  , min   = Math.min;
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
  try {
    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
  } catch(e){ /* empty */ }
}();
var hide = createDefiner(1);
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
}
function desc(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return $.setDesc(object, key, desc(bitmap, value));
  } : simpleSet;
}

function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
function assertDefined(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
}

var $ = module.exports = require('./$.fw')({
  g: global,
  core: core,
  html: global.document && document.documentElement,
  // http://jsperf.com/core-js-isobject
  isObject:   isObject,
  isFunction: isFunction,
  it: function(it){
    return it;
  },
  that: function(){
    return this;
  },
  // 7.1.4 ToInteger
  toInteger: toInteger,
  // 7.1.15 ToLength
  toLength: function(it){
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  },
  toIndex: function(index, length){
    index = toInteger(index);
    return index < 0 ? max(index + length, 0) : min(index, length);
  },
  has: function(it, key){
    return hasOwnProperty.call(it, key);
  },
  create:     Object.create,
  getProto:   Object.getPrototypeOf,
  DESC:       DESC,
  desc:       desc,
  getDesc:    Object.getOwnPropertyDescriptor,
  setDesc:    defineProperty,
  setDescs:   Object.defineProperties,
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  assertDefined: assertDefined,
  // Dummy, fix for not array-like ES3 string in es5 module
  ES5Object: Object,
  toObject: function(it){
    return $.ES5Object(assertDefined(it));
  },
  hide: hide,
  def: createDefiner(0),
  set: global.Symbol ? simpleSet : hide,
  mix: function(target, src){
    for(var key in src)hide(target, key, src[key]);
    return target;
  },
  each: [].forEach
});
/* eslint-disable no-undef */
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":21}],25:[function(require,module,exports){
'use strict';
// true  -> String#at
// false -> String#codePointAt
var $ = require('./$');
module.exports = function(TO_STRING){
  return function(pos){
    var s = String($.assertDefined(this))
      , i = $.toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l
      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
        ? TO_STRING ? s.charAt(i) : a
        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$":24}],26:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":24}],27:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var $           = require('./$')
  , UNSCOPABLES = require('./$.wks')('unscopables');
if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  if($.FW)[][UNSCOPABLES][key] = true;
};
},{"./$":24,"./$.wks":28}],28:[function(require,module,exports){
var global = require('./$').g
  , store  = {};
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":24,"./$.uid":26}],29:[function(require,module,exports){
var core  = require('./$').core
  , $iter = require('./$.iter');
core.isIterable  = $iter.is;
core.getIterator = $iter.get;
},{"./$":24,"./$.iter":23}],30:[function(require,module,exports){
var $          = require('./$')
  , setUnscope = require('./$.unscope')
  , ITER       = require('./$.uid').safe('iter')
  , $iter      = require('./$.iter')
  , step       = $iter.step
  , Iterators  = $iter.Iterators;

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , kind  = iter.k
    , index = iter.i++;
  if(!O || index >= O.length){
    iter.o = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":24,"./$.iter":23,"./$.iter-define":22,"./$.uid":26,"./$.unscope":27}],31:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":17,"./$.def":19}],32:[function(require,module,exports){
var $        = require('./$')
  , $def     = require('./$.def')
  , isObject = $.isObject
  , toObject = $.toObject;
function wrapObjectMethod(METHOD, MODE){
  var fn  = ($.core.Object || {})[METHOD] || Object[METHOD]
    , f   = 0
    , o   = {};
  o[METHOD] = MODE == 1 ? function(it){
    return isObject(it) ? fn(it) : it;
  } : MODE == 2 ? function(it){
    return isObject(it) ? fn(it) : true;
  } : MODE == 3 ? function(it){
    return isObject(it) ? fn(it) : false;
  } : MODE == 4 ? function getOwnPropertyDescriptor(it, key){
    return fn(toObject(it), key);
  } : MODE == 5 ? function getPrototypeOf(it){
    return fn(Object($.assertDefined(it)));
  } : function(it){
    return fn(toObject(it));
  };
  try {
    fn('z');
  } catch(e){
    f = 1;
  }
  $def($def.S + $def.F * f, 'Object', o);
}
wrapObjectMethod('freeze', 1);
wrapObjectMethod('seal', 1);
wrapObjectMethod('preventExtensions', 1);
wrapObjectMethod('isFrozen', 2);
wrapObjectMethod('isSealed', 2);
wrapObjectMethod('isExtensible', 3);
wrapObjectMethod('getOwnPropertyDescriptor', 4);
wrapObjectMethod('getPrototypeOf', 5);
wrapObjectMethod('keys');
wrapObjectMethod('getOwnPropertyNames');
},{"./$":24,"./$.def":19}],33:[function(require,module,exports){
var set   = require('./$').set
  , at    = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  set(this, ITER, {o: String(iterated), i: 0});
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var iter  = this[ITER]
    , O     = iter.o
    , index = iter.i
    , point;
  if(index >= O.length)return step(1);
  point = at.call(O, index);
  iter.i += point.length;
  return step(0, point);
});
},{"./$":24,"./$.iter":23,"./$.iter-define":22,"./$.string-at":25,"./$.uid":26}],34:[function(require,module,exports){
require('./es6.array.iterator');
var $           = require('./$')
  , Iterators   = require('./$.iter').Iterators
  , ITERATOR    = require('./$.wks')('iterator')
  , ArrayValues = Iterators.Array
  , NodeList    = $.g.NodeList;
if($.FW && NodeList && !(ITERATOR in NodeList.prototype)){
  $.hide(NodeList.prototype, ITERATOR, ArrayValues);
}
Iterators.NodeList = ArrayValues;
},{"./$":24,"./$.iter":23,"./$.wks":28,"./es6.array.iterator":30}],35:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {
	        function F() {}

	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                F.prototype = this;
	                var subtype = new F();

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init')) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else if (thatWords.length > 0xffff) {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            } else {
	                // Copy all words at once
	                thisWords.push.apply(thisWords, thatWords);
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));
},{}],36:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));
},{"./core":35}],37:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha256"), require("./hmac"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha256", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.HmacSHA256;

}));
},{"./core":35,"./hmac":38,"./sha256":39}],38:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));
},{"./core":35}],39:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));
},{"./core":35}],40:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _XHR = require('./xhr');

var _XHR2 = _interopRequireDefault(_XHR);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _SHA256 = require('crypto-js/sha256');

var _SHA2562 = _interopRequireDefault(_SHA256);

var _HmacSHA256 = require('crypto-js/hmac-sha256');

var _HmacSHA2562 = _interopRequireDefault(_HmacSHA256);

var _Hex = require('crypto-js/enc-hex');

var _Hex2 = _interopRequireDefault(_Hex);

var AmazonXHR = (function () {
  function AmazonXHR(settings) {
    _classCallCheck(this, AmazonXHR);

    this.settings = settings || {};
    this.settings.auth = this.settings.auth || {};
    this.settings.headers = this.settings.headers || {};
    this.settings.querystring = this.settings.querystring || {};

    if (!this.settings.auth.date) {
      throw new Error('Invalid instantiation, missing auth.date');
    }
    if (!this.settings.auth.signature) {
      throw new Error('No signature provided.');
    }
  }

  _createClass(AmazonXHR, [{
    key: 'send',
    value: function send(callback) {
      this.requestDate = new Date();

      this.headers = this.settings.headers;

      var bucket = this.settings.auth.bucket;
      var regionString = _utils2['default'].regionString(this.settings.auth.region);
      this.headers.host = '' + bucket + '.s3' + regionString + '.amazonaws.com';

      var date = this.settings.auth.date;
      var dateString = [date.getUTCFullYear(), _utils2['default'].zfill(date.getUTCMonth() + 1, 2), _utils2['default'].zfill(date.getUTCDate(), 2)].join('');

      var encodedDate = _utils2['default'].uriencode(_utils2['default'].iso8601(this.requestDate));
      var querystring = this.settings.querystring;
      querystring['X-Amz-Date'] = encodedDate;
      querystring['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
      querystring['X-Amz-Expires'] = 86400; // One day

      var accessKey = this.settings.auth.accessKey;
      var region = this.settings.auth.region;
      querystring['X-Amz-Credential'] = _utils2['default'].uriencode('' + accessKey + '/' + dateString + '/' + region + '/s3/aws4_request');
      querystring['X-Amz-SignedHeaders'] = '';

      var headerKeys = _Object$keys(this.headers);

      headerKeys.sort();
      querystring['X-Amz-SignedHeaders'] = _utils2['default'].uriencode(headerKeys.join(';'));

      querystring['X-Amz-Signature'] = this.getAuthorizationHeader();

      var url = '' + location.protocol + '//' + this.headers.host + '/' + this.settings.key;
      delete this.headers.host; // keep this header only for hashing

      var first = true;
      _Object$keys(querystring).map(function (key) {
        var value = querystring[key];
        if (first) {
          url += '?';
        }
        first = false;
        url += '' + key + '=' + value + '&';
      });
      url = url.slice(0, -1); // remove extra ampersand

      this.xhr = _XHR2['default']({
        url: url,
        method: this.settings.method,
        headers: this.headers,
        body: this.settings.payload,

        loadCallback: this.settings.loadCallback,
        progressCallback: this.settings.progressCallback,
        stateChangeCallback: this.settings.stateChangeCallback,
        errorCallback: this.settings.errorCallback,
        timeoutCallback: this.settings.timeoutCallback });
      if (callback) {
        callback(this.xhr);
      }

      return this;
    }
  }, {
    key: 'getAuthorizationHeader',
    value: function getAuthorizationHeader() {
      var header = '';

      var headerKeys = _Object$keys(this.headers).sort();

      var signedKeys = headerKeys.reduce(function (acc, val) {
        return acc + ';' + val;
      });

      var canonicalRequest = this.getCanonicalRequest();
      var stringToSign = this.getStringToSign(canonicalRequest, this.requestDate);
      var signature = this.signRequest(stringToSign);

      return signature;
    }
  }, {
    key: 'getCanonicalRequest',
    value: function getCanonicalRequest() {
      var _this = this;

      var request = '\n      ' + this.settings.method.toUpperCase() + '\n      /' + _utils2['default'].uriencode(this.settings.key).replace(/%2F/g, '/') + '\n    ';
      request = request.trim().replace(/^\s+/gm, '') + '\n';

      // querystring
      request += _Object$keys(this.settings.querystring).sort().reduce(function (acc, key) {
        var value = _this.settings.querystring[key];
        if (acc) {
          return '' + acc + '&amp;' + _utils2['default'].uriencode(key) + '=' + value;
        } else {
          return '' + _utils2['default'].uriencode(key) + '=' + value;
        }
      }, '');
      request += '\n';

      // headers
      var headerKeys = _Object$keys(this.headers).sort();
      request += headerKeys.reduce(function (acc, key) {
        var value = _this.headers[key];
        if (acc) {
          return '' + acc + '\n' + key.toLowerCase() + ':' + value.trim();
        } else {
          return '' + key.toLowerCase() + ':' + value.trim();
        }
      }, '');
      request += '\n\n';

      // signed headers
      request += headerKeys.reduce(function (acc, val) {
        if (acc) {
          return '' + acc + ';' + val.toLowerCase();
        } else {
          return val.toLowerCase();
        }
      }, '');

      request += '\n';

      request += 'UNSIGNED-PAYLOAD';

      return request;
    }
  }, {
    key: 'getStringToSign',
    value: function getStringToSign(canonicalRequest, time) {
      return ('\n      AWS4-HMAC-SHA256\n      ' + _utils2['default'].iso8601(time) + '\n      ' + [time.getUTCFullYear(), _utils2['default'].zfill(time.getUTCMonth() + 1, 2), _utils2['default'].zfill(time.getUTCDate(), 2), '/' + this.settings.auth.region + '/s3/aws4_request\n'].join('') + '\n      ' + _SHA2562['default'](canonicalRequest.replace(/&amp;/g, '&')).toString() + '\n    ').trim().replace(/^\s+/gm, '');
    }
  }, {
    key: 'signRequest',
    value: function signRequest(stringToSign) {
      var res = _HmacSHA2562['default'](stringToSign, _Hex2['default'].parse(this.settings.auth.signature)).toString();
      return res;
    }
  }], [{
    key: 'init',

    // static
    value: function init(auth, key, file, callback) {
      return new AmazonXHR({
        auth: auth,
        key: key,
        method: 'POST',
        querystring: {
          uploads: '' },
        headers: {
          'x-amz-acl': 'public-read',
          'Content-Disposition': 'attachment; filename=' + file.name,
          'Content-Type': auth.contentType || 'application/octet-stream' },
        payload: '',
        loadCallback: callback }).send();
    }
  }, {
    key: 'uploadChunk',
    value: function uploadChunk(auth, key, uploadId, chunkNum, chunk, callbacks, xhrCallback) {
      var callback = undefined,
          errorCallback = undefined,
          progressCallback = undefined,
          readystateCallback = undefined;
      if (callbacks instanceof Object) {
        callback = callbacks.loadCallback;
        errorCallback = callbacks.errorCallback;
        progressCallback = callbacks.progressCallback;
        readystateCallback = callbacks.stateChangeCallback;
      } else {
        callback = callbacks;
      }
      var querystring = {
        partNumber: chunkNum + 1,
        uploadId: uploadId };
      return new AmazonXHR({
        auth: auth,
        key: key,
        method: 'PUT',
        querystring: querystring,
        headers: {},
        payload: chunk,
        loadCallback: callback,
        errorCallback: errorCallback,
        progressCallback: progressCallback,
        stateChangeCallback: readystateCallback }).send(xhrCallback);
    }
  }, {
    key: 'list',
    value: function list(auth, file, key, uploadId, chunkSize, callback, errorCallback, marker) {
      var querystring = {
        uploadId: uploadId };
      if (marker) {
        querystring['part-number​-marker'] = marker;
      }
      return new AmazonXHR({
        auth: auth,
        key: key,
        method: 'GET',
        querystring: querystring,
        headers: {},
        payload: '',
        errorCallback: errorCallback,
        loadCallback: function loadCallback(e) {
          if (e.target.status === 404) {
            // I.e. the file was already uploaded; start fresh
            if (errorCallback) {
              errorCallback();
            }
            return;
          }

          // Process the parts, and return an array of
          // [part_number, etag, size] through the given callback
          var xml = e.target.responseXML;
          var parts = [];
          var xmlParts = xml.getElementsByTagName('Part');
          var numChunks = Math.ceil(file.size / chunkSize);
          var tagContent = function tagContent(tag, prop) {
            return tag.getElementsByTagName(prop)[0].textContent;
          };
          for (var i = 0; i < xmlParts.length; i++) {
            var partNumber = parseInt(tagContent(xmlParts[i], 'PartNumber'), 10);
            var etag = tagContent(xmlParts[i], 'ETag');
            var size = parseInt(tagContent(xmlParts[i], 'Size'), 10);

            if (partNumber !== numChunks && size !== chunkSize) {
              continue; // Chunk corrupted
            } else if (partNumber === numChunks && size !== file.size % chunkSize) {
              continue; // Final chunk corrupted
            }

            parts.push([partNumber, etag, size]);
          }
          var isTruncated = tagContent(xml, 'IsTruncated');
          if (isTruncated.toString() === 'true') {
            var partMarker = tagContent(xml, 'NextPartNumberMarker');
            AmazonXHR.list(auth, key, uploadId, chunkSize, function (newParts) {
              callback(parts.concat(newParts));
            }, errorCallback, partMarker);
          } else {
            callback(parts);
          }
        } }).send();
    }
  }, {
    key: 'finish',
    value: function finish(auth, key, uploadId, parts, callback) {
      var querystring = { uploadId: uploadId };

      // compose the CompleteMultipartUpload request for putting
      // the chunks together
      var data = '<CompleteMultipartUpload>';

      parts.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var number = _ref2[0];
        var etag = _ref2[1];

        data += ('\n        <Part>\n        <PartNumber>' + number + '</PartNumber>\n        <ETag>' + etag + '</ETag>\n        </Part>\n      ').trim();
      });
      data += '</CompleteMultipartUpload>';

      // firefox requires a small hack
      if (typeof window !== 'undefined' && window.navigator && navigator.userAgent.indexOf('Firefox') !== -1) {
        data = new Blob([data]);
      }

      return new AmazonXHR({
        auth: auth,
        key: key,
        method: 'POST',
        querystring: querystring,
        headers: {},
        payload: data,
        loadCallback: callback }).send();
    }
  }]);

  return AmazonXHR;
})();

exports['default'] = AmazonXHR;
module.exports = exports['default'];

},{"./utils":44,"./xhr":45,"babel-runtime/core-js/object/define-property":5,"babel-runtime/core-js/object/keys":6,"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8,"babel-runtime/helpers/interop-require-default":9,"babel-runtime/helpers/sliced-to-array":10,"crypto-js/enc-hex":36,"crypto-js/hmac-sha256":37,"crypto-js/sha256":39}],41:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

_Object$defineProperty(exports, "__esModule", {
  value: true
});

var KB = 1024;
exports.KB = KB;
var MB = 1024 * KB;
exports.MB = MB;
var GB = 1024 * MB;
exports.GB = GB;
var SECONDS = 1000;exports.SECONDS = SECONDS;
// 1000ms
var DEBUG = true;
exports.DEBUG = DEBUG;

},{"babel-runtime/core-js/object/define-property":5}],42:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _DEBUG = require('./constants');

exports['default'] = function () {
  if (!(_DEBUG.DEBUG && typeof console !== 'undefined' && typeof console.log !== 'undefined')) {
    return;
  }

  var args = ['[MuleUploader]'];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return console.log.apply(console, args);
};

module.exports = exports['default'];

},{"./constants":41,"babel-runtime/core-js/object/define-property":5}],43:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _XHR = require('./xhr');

var _XHR2 = _interopRequireDefault(_XHR);

var _AmazonXHR = require('./amazonXhr');

var _AmazonXHR2 = _interopRequireDefault(_AmazonXHR);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _KB$MB$GB$SECONDS = require('./constants');

var Uploader = (function () {
  function Uploader(settings) {
    _classCallCheck(this, Uploader);

    var self = this;

    settings = settings || {};

    // Make the input element another possible setting
    // in some cases (e.g. drag & drop) there is no input element
    this.input = settings.fileInput;
    this.file = settings.file;

    // The file starts automatically by default; you have to set
    // autostart: false explicitly if you want to use a start button
    // if autostart is false, you can use the Uploader.prototype.start()
    // function. Note that the user has to select a file first
    settings.autostart = 'autostart' in settings ? settings.autostart : true;

    // NOTE: For Amazon S3, the minimum chunk size is 5MB
    // we are using 6 for safe measure. Note that the maximum number of chunks
    // is 10,000, so for example, if the chunk size is 6MB, the maximum
    // possible file size is 6MB * 10,000 = ~58GB
    settings.chunkSize = settings.chunkSize || 6 * _KB$MB$GB$SECONDS.MB; // default 6MB
    settings.maxSize = settings.maxSize || 5 * _KB$MB$GB$SECONDS.GB; // 5GB

    // The number of parallel upload xhr's
    settings.numWorkers = settings.numWorkers || 4;

    // The S3 object key; I recommend to generate this dynamically (e.g.
    // a random string) to avoid unwanted overwrites.
    settings.key = settings.key || 'the_key';

    // The Amazon S3 bucket where you'll store the uploads
    settings.bucket = settings.bucket;

    // The Amazon S3 access key. DO NOT give the AWS Secret code!
    settings.accessKey = settings.accessKey;

    // The Mime-Type of the content. You must match this with the backend value
    // or you'll get an Invalid Signature error. If unsure about the
    // mime type, use application/octet-stream
    settings.contentType = settings.contentType || 'application/octet-stream';

    // ACL can be set to:
    // private
    // public-read (* default)
    // public-read-write
    // authenticated-read
    // bucket-owner-read
    // bucket-owner-full-control
    // log-delivery-write
    settings.acl = settings.acl || 'public-read';

    // Various callbacks
    settings.onProgress = settings.onProgress || function () {};
    settings.onChunkProgress = settings.onChunkProgress || function () {};
    settings.onSelect = settings.onSelect || function () {};
    settings.onError = settings.onError || function () {};
    settings.onComplete = settings.onComplete || function () {};
    settings.onInit = settings.onInit || function () {};
    settings.onStart = settings.onStart || function () {};
    settings.onChunkUploaded = settings.onChunkUploaded || function () {};

    // The location prefix of the uploader's backend
    settings.ajaxBase = settings.ajaxBase || '/upload-backend';

    // Extensions comma delimited without period (jpg,jpeg,png,gif)
    settings.acceptedExtensions = settings.acceptedExtensions || '';

    // Set the values so that they can be used everywhere, as needed
    self.settings = settings;

    // The "waiting" state means the uploader is waiting for the user
    // to select a file
    self.setState('waiting');

    if (self.input) {
      self.input.onchange = function (e, force) {
        if (!self.settings.autostart) {
          return true;
        }
        // the `onchange` event may be triggered multiple times, so we
        // must ensure that the callback is only executed the first time
        if (self.getState() !== 'waiting') {
          return false;
        }

        // the uploader doesn't support multiple uploads at this time,
        // so we get the first file
        var file = e.target.files[0];
        self.uploadFile(file, force);
        return true;
      };
    }

    // trigger the init event callback
    setTimeout(function () {
      self.settings.onInit.apply(self);
    }, 100);
  }

  _createClass(Uploader, [{
    key: 'start',
    value: function start() {
      if (this.input && this.input.files && this.input.files.length > 0) {
        return this.uploadFile(this.input.files[0], false);
      } else {
        alert('No file selected');
      }
    }
  }, {
    key: 'uploadFile',
    value: function uploadFile(file, force) {
      var self = this;

      // The `onchange` event may be triggered multiple times, so we
      // must ensure that the callback is only executed the first time
      // also make sure the file is not already set.
      if (self.getState() !== 'waiting') {
        return false;
      }

      if (file) {
        self.file = file;
      }

      if (!self.file) {
        return false;
      }

      // We use the lastModifiedDate, the file name and size to uniquely
      // identify a file. There may be false positives and negatives,
      // but the chance for a false positive is basically zero
      // some browsers don't report the last modified date, so we default
      // to a blank date
      self.file.lastModifiedDate = this.file.lastModifiedDate || new Date(0);

      if (self.file.size > self.settings.maxSize) {
        alert(['The maximum allowed file size is ', self.settings.maxSize / _KB$MB$GB$SECONDS.GB, 'GB. Please select another file.'].join(''));
        return false;
      }

      // Check for accepted extensions, if applicable
      if (self.settings.acceptedExtensions) {
        // Get the file extension
        var fileExtension = file.name.split('.').pop();

        // Split the given extensions into an array
        var extensionsArray = self.settings.acceptedExtensions.split(',');

        // And match the extension against the given extension list
        var fileAccepted = false;
        for (var i = 0; i < extensionsArray.length; i++) {
          if (fileExtension === extensionsArray[i]) {
            fileAccepted = true;
            break;
          }
        }

        // If the file is not accepted, notify the user and return
        if (!fileAccepted) {
          alert(['This file format is not accepted. ', 'Please use a file with an extension like ', self.settings.acceptedExtensions].join(''));
          return false;
        }
      }

      // Initialize the file upload
      // also, allow the library user to programatically cancel the upload if,
      // for example, the file is too large
      var result = self.settings.onSelect.call(this, file);
      if (result === false) {
        self.file = null;
        self.input.value = '';
        return;
      }

      var args = _Object$assign(this.settings.extraParams || {}, {
        filename: file.name,
        filesize: file.size,
        lastModified: file.lastModifiedDate.valueOf() });

      if (force) {
        args.force = true;
      }

      // Get the signing key. It will also return
      // a file key + uploadId pair if the selected file
      // is already uploading. It also returns a
      // backup_key in case that file upload already completed.
      // The signing key is valid for 7 days
      _XHR2['default']({
        url: self.settings.ajaxBase + '/signing_key/',
        extraParams: args,
        loadCallback: function loadCallback(e) {
          var json = JSON.parse(e.target.responseText);
          json.date = new Date(json.date);
          self.auth = json;
          self.uploadId = json.uploadId;
          self.chunks = json.chunks;
          self.settings.key = json.key || self.settings.key;
          self.settings.backupKey = self.settings.key;

          if (!self.uploadId) {
            _AmazonXHR2['default'].init(json, self.settings.key, file, function (e) {
              var xml = e.target.responseXML;

              // Get the given upload id
              self.uploadId = xml.getElementsByTagName('UploadId')[0].textContent;

              self.loadFile();
            });
          } else {
            // Resume a previus upload
            if (!force) {
              // Get the uploaded parts from S3
              _AmazonXHR2['default'].list(self.auth, self.file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
                for (var i = 0; i < parts.length; i++) {
                  var chunk = parts[i][0] - 1;
                  self.setProgress(chunk, self.getChunkSize(chunk));
                  self.setChunkFinished(chunk);
                  self.setChunkUploading(chunk, false);
                }
                self.loadFile();
              }, function () {
                // If it fails, re-initiate the upload, and force
                // it to start a new upload
                self.uploadId = null;
                self._loadedChunks = null;
                self._progress = null;
                self._totalProgress = null;
                self._loadedChunks = null;
                self._uploadingChunks = null;
                self._chunks = null;
                self.settings.key = self.settings.backupKey;
                self.uploadFile(file, true); // Force reload
              });
            } else {
              // force-start the upload
              self.loadFile();
            }
          }
        } });
    }
  }, {
    key: 'loadFile',
    value: function loadFile() {
      var self = this;

      // We can't start the upload if we are waiting for user input
      if (self.getState() !== 'waiting') {
        return;
      }

      // Make sure we only trigger the start event once
      if (!self._startFired) {
        // Trigger the start event callback
        self.settings.onStart.call(self, self.file);

        // And also trigger a progress callback with 0%
        self.settings.onProgress.call(self, 0, self.file.size);
        self._startFired = true;
      }

      // From now on, we are "processing" the file upload
      self.setState('processing');

      // At this point we may have some chunks already uploaded,
      // So we may trigger a progress callback with the reported progress
      self.settings.onProgress.call(self, self.getTotalProgress(), self.file.size);

      // Get the next chunk
      var nextChunk = self.getNextChunk();

      if (nextChunk !== -1) {
        // And start uploading it
        self.uploadChunk(nextChunk);
      } else if (self.uploadFinished()) {
        // If we finished, trigger the upload finish sequence
        _log2['default']('All done; finish upload');
        self.finishUpload();
      }

      for (var i = 0; i < this.settings.numWorkers - 1; i++) {
        nextChunk = self.getNextChunk();
        if (nextChunk !== -1) {
          self.uploadChunk(nextChunk);
        } else {
          break;
        }
      }
    }
  }, {
    key: 'uploadChunk',
    value: function uploadChunk(chunk) {
      var self = this;

      // Make sure we're in processing mode
      if (self.getState() !== 'processing') {
        _log2['default']('NOT processing; return');
        return;
      }

      // Also make sure we're not already uploading this chunk
      if (self.getChunkUploading(chunk)) {
        _log2['default']('Already Uploading');
        setTimeout(function () {
          var nextChunk = self.getNextChunk();
          if (nextChunk !== -1) {
            self.uploadChunk(self.getNextChunk());
          }
        }, 1000);
        return;
      } else {
        // Mark this chunk as uploading
        self.setChunkUploading(chunk);
      }
      _log2['default']('Uploading Chunk: ' + chunk);

      // If we already uploaded this chunk, get to the next one
      // if there is no next chunk, finish the upload
      if (self.isChunkLoaded(chunk)) {
        var nextChunk = self.getNextChunk();
        if (nextChunk !== -1) {
          self.uploadChunk(nextChunk);
        } else {
          if (self.uploadFinished()) {
            _log2['default']('No next chunk; finish upload');
            self.finishUpload();
          }
        }
      }

      var length = self.settings.chunkSize;

      // Get the start and end bytes for the needed chunk
      var start = chunk * length;
      var end = Math.min(start + length, self.file.size);

      // We need the last progress time in order to detect hanging
      // uploads
      var lastProgressTime = new Date();
      self._intervals = self._intervals || {};

      // The "readystatechange" handler
      var handler = function handler(e) {
        // We care about the "done" event triggered while processing
        if (e.target.readyState !== this.DONE || self.getState() !== 'processing') {
          _log2['default'](e);
          return;
        }

        // If we don't receive a 2XX response, trigger an error
        if (parseInt(e.target.status) / 100 !== 2) {
          return errorHandler();
        }

        // At this point, we know that this chunk finished uploading
        _log2['default']('Chunk uploaded: ' + chunk);

        // Notify the server of the uploaded chunk
        self.notifyChunkUploaded(chunk);

        // And also trigger the chunk_uploaded callback
        self.settings.onChunkUploaded.call(self, chunk);

        // Cancel the xhr watcher interval
        clearInterval(self._intervals[chunk]);

        // Mark the chunk as finished
        self.setProgress(chunk, self.getChunkSize(chunk));
        self.setChunkFinished(chunk);
        self.setChunkUploading(chunk, false);

        // Get next chunk; if we're out of chunks,
        // finish the upload
        var nextChunk = self.getNextChunk();
        if (nextChunk !== -1) {
          self.uploadChunk(nextChunk);
        } else if (self.uploadFinished()) {
          _log2['default']('Done');
          self.finishUpload();
        } else {
          var interval = setInterval(function () {
            var chunk = self.getNextChunk();
            if (chunk !== -1) {
              clearInterval(interval);
              self.uploadChunk(chunk);
            } else if (self.uploadFinished()) {
              clearInterval(interval);
              self.finishUpload();
            }
          }, 1000);
        }
      };

      // The upload progress handler
      var progressHandler = function progressHandler(e) {
        // Set the internal chunk's progress value to the reported amount
        self.setProgress(chunk, e.loaded);

        // Trigger the progress event callback
        self.settings.onProgress.call(self, self.getTotalProgress(), self.file.size);

        // Update the last_progress_time for the watcher interval
        lastProgressTime = new Date();
      };

      var errorHandled = false;
      var errorHandler = function errorHandler() {
        var errorArguments = arguments;
        var xhr = this;
        // The upload may have finished, so check for that
        self.checkAlreadyUploaded(function () {
          // If already uploaded
          self.setState('finished');

          self.notifyUploadFinished();

          // Trigger a final progress event callback, with 100%
          self.settings.onProgress.call(self, self.file.size, self.file.size);

          // Also trigger the complete event callback
          self.settings.onComplete.call(self);
        }, function () {
          // We have a genuine error
          _log2['default']('Error: ' + errorArguments);

          // make sure we don't handle the same error more than once
          if (errorHandled) {
            return;
          }
          errorHandled = true;

          // abort the chunk upload
          self.setChunkUploading(chunk, false);
          self.setChunkFinished(chunk, false);
          self.setProgress(chunk, 0);
          _log2['default']('Abort');
          try {
            xhr.abort();
          } catch (e) {
            _log2['default'](e);
          }

          _log2['default']('Retry chunk: ' + chunk);

          // Clear the watcher interval
          clearInterval(self._intervals[chunk]);

          // Re-try the upload
          setTimeout(function () {
            if (self.getState() === 'processing') {
              // And proceed
              var nextChunk = self.getNextChunk(chunk);
              if (nextChunk !== -1) {
                self.uploadChunk(nextChunk);
              }
            }
          }, 1000);
        });
      };

      _AmazonXHR2['default'].uploadChunk(self.auth, self.settings.key, self.uploadId, chunk, self.file.slice(start, end), {
        progressCallback: progressHandler,
        stateChangeCallback: handler,
        errorCallback: errorHandler,
        timeoutCallback: errorHandler }, function (xhr) {
        self._chunkXhr = self._chunkXhr || [];
        self._chunkXhr.push(xhr);

        // The watcher interval; it cancels the xhr if it times out
        self._intervals[chunk] = setInterval(function () {
          if (lastProgressTime && new Date() - lastProgressTime > 15 * _KB$MB$GB$SECONDS.SECONDS) {
            // 15s
            _log2['default']('Chunk Failed; retry');
            clearInterval(self._intervals[chunk]);
            if (self.getState() === 'processing') {
              xhr.abort();
              errorHandler.call(xhr);
              self._chunkXhr[this._chunkXhr.indexOf(xhr)] = null;
            }
          }
        }, 4 * _KB$MB$GB$SECONDS.SECONDS); // Every 4s
      });
    }
  }, {
    key: 'finishUpload',
    value: function finishUpload() {
      var self = this;

      // Make sure it's not triggered when not processing (e.g. multiple times)
      if (self.getState() !== 'processing') {
        return;
      }

      // Change the upload's state
      self.setState('finishing');

      self.settings.onProgress.call(self, self.file.size, self.file.size); // 100% done.

      var handler = (function (_handler) {
        function handler(_x) {
          return _handler.apply(this, arguments);
        }

        handler.toString = function () {
          return _handler.toString();
        };

        return handler;
      })(function (e) {
        // I.e. if it's a 2XX response
        if (parseInt(e.target.status / 100) === 2) {
          _log2['default']('Finished file.');
          self.setState('finished');
          self.settings.onProgress.call(self, self.file.size, self.file.size); // It's 100% done

          // Trigger the complete event callback
          self.settings.onComplete.call(self);
        } else if (e.target.status === 400 && e.target.responseText.indexOf('EntityTooSmall') !== -1) {
          // An "EntityTooSmall" error means that we missed a chunk
          _AmazonXHR2['default'].list(self.auth, self.file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
            self.updateChunks(parts);
            var nextChunk = self.getNextChunk();
            self.setState('processing');
            self.uploadChunk(nextChunk);
          });
        } else if (e.target.status === 404) {
          // 404 = NoSuchUpload = check if already finished
          // If so, start a new upload
          self.cancel(function () {
            self.uploadFile(self.file, true);
          });
        } else {
          self.checkAlreadyUploaded(function () {
            handler({
              target: {
                status: 200 } });
          }, function () {
            handler({
              target: {
                status: 404 } });
          });
        }
      });

      _AmazonXHR2['default'].list(self.auth, self.file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
        var numChunks = Math.ceil(self.file.size / self.settings.chunkSize);

        // Check that we uploaded all the chunks; if we didn't,
        // start uploading the missing ones
        if (parts.length !== numChunks) {
          self.updateChunks(parts);
          var nextChunk = self.getNextChunk();
          self.setState('processing');
          self.uploadChunk(nextChunk);
          return;
        }

        _AmazonXHR2['default'].finish(self.auth, self.settings.key, self.uploadId, parts, handler);
      });
    }
  }, {
    key: 'notifyChunkUploaded',
    value: function notifyChunkUploaded(chunk) {
      var self = this;
      if (self.getState() !== 'processing') {
        return;
      }
      var key = self.settings.key;
      var uploadId = self.uploadId;
      var url = '' + self.settings.ajaxBase + '/chunk_loaded/';

      var args = _Object$assign(self.settings.extraParams || {}, {
        chunk: chunk,
        key: key,
        uploadId: uploadId,
        filename: self.file.name,
        filesize: self.file.size,
        lastModified: self.file.lastModifiedDate.valueOf() });

      _XHR2['default']({
        url: url,
        extraParams: args });
    }
  }, {
    key: 'checkAlreadyUploaded',
    value: function checkAlreadyUploaded(callback, errorCallback) {
      var self = this;
      var method = 'HEAD';
      var path = '/' + self.settings.key;
      var innerHandler = function innerHandler(e) {
        // The handler only checks for status code;
        // if the HEAD returns 404, re-upload,
        // else, it returns 200 and finish the upload
        if (parseInt(e.target.status / 100) === 2) {
          _log2['default']('Already Uploaded');
          callback();
        } else {
          _log2['default']('Error!');
          errorCallback();
        }
      };

      if (!errorCallback && typeof errorCallback !== 'function') {
        errorCallback = function () {
          setTimeout(function () {
            return self.checkAlreadyUploaded(callback, errorCallback);
          }, 2500);
        };
      }

      var regionString = util.regionString(self.settings.auth.region);
      var protocol = location.protocol;
      var bucket = self.settings.auth.bucket;
      var host = 's3' + regionString + '.amazonaws.com';
      var url = '' + protocol + '//' + host + '/' + bucket + '/' + path;
      _XHR2['default']({
        url: url,
        method: method,
        loadCallback: innerHandler,
        errorCallback: errorCallback });
    }
  }, {
    key: 'cancel',
    value: function cancel(callback) {
      // Empty all fields, cancel all intervals, abort all xhr's
      this._chunkXhr.map(function (chunk) {
        _log2['default']('Abort chunk: ' + chunk);
        chunk.abort();
      });
      this._intervals = this._intervals || {};
      for (var key in this._intervals) {
        if (this._intervals.hasOwnProperty(key)) {
          clearInterval(this._intervals[key]);
        }
      }
      callback = callback || function () {};
      this.setState('canceled');
      this._chunkXhr = this._chunkXhr || [];
      this.settings.onProgress.call(this, 0, 0);
      this._chunkXhr = null;
      this._chunks = null;
      this._uploadingChunks = null;
      this._loadedChunks = null;
      this._startFired = false;
      this.uploadId = null;
      this._progress = null;
      this.setState('waiting'); // wait for a new upload
      callback();
    }
  }, {
    key: 'updateChunks',
    value: function updateChunks(parts) {
      var _this = this;

      var loaded = [];
      var numChunks = Math.ceil(this.file.size / this.settings.chunkSize);

      this._initChunks(true);
      this._uploadingChunks = [];
      this._loadedChunks = [];

      parts.map(function (part) {
        var partNumber = parseInt(part[0], 10);
        _this.addLoadedChunk(partNumber - 1);
        _this.setChunkFinished(partNumber - 1);
        loaded.push(partNumber - 1);
      });

      for (var chunkNum = 0; chunkNum < numChunks; chunkNum++) {
        if (loaded.indexOf(chunkNum) === -1) {
          _log2['default']('Chunk not uploaded: ' + chunkNum);
          this.setProgress(chunkNum, 0);
        }
      }
    }
  }, {
    key: 'isSelected',
    value: function isSelected() {
      return !!this.file;
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this._state;
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this._state = state;
      return state;
    }
  }, {
    key: 'setProgress',
    value: function setProgress(chunk, loaded) {
      this._progress = this._progress || {};
      this._totalProgress = (this._totalProgress || 0) + loaded - (this._progress[chunk] || 0);
      this._progress[chunk] = loaded;
      this.settings.onChunkProgress.call(this, chunk, loaded, this.getChunkSize(chunk));
    }
  }, {
    key: 'getTotalProgress',
    value: function getTotalProgress() {
      return this._totalProgress || 0;
    }
  }, {
    key: 'isChunkLoaded',
    value: function isChunkLoaded(chunk) {
      this._loadedChunks = this._loadedChunks || [];
      return this._loadedChunks.indexOf(chunk) !== -1;
    }
  }, {
    key: 'addLoadedChunk',
    value: function addLoadedChunk(chunk) {
      this._loadedChunks = this._loadedChunks || [];
      this._loadedChunks.push(chunk);
      this.setProgress(chunk, this.getChunkSize(chunk));
    }
  }, {
    key: 'getChunkUploading',
    value: function getChunkUploading(chunk) {
      this._uploadingChunks = this._uploadingChunks || [];
      return this._uploadingChunks.indexOf(chunk) !== -1;
    }
  }, {
    key: 'setChunkUploading',
    value: function setChunkUploading(chunk, val) {
      if (typeof val === 'undefined') {
        val = true;
      }
      this._uploadingChunks = this._uploadingChunks || [];
      if (val) {
        this._uploadingChunks.push(chunk);
      } else {
        var idx = undefined;
        while (true) {
          idx = this._uploadingChunks.indexOf(chunk);
          if (idx === -1) {
            break;
          }
          this._uploadingChunks.splice(idx, 1);
        }
      }
    }
  }, {
    key: '_initChunks',
    value: function _initChunks(force) {
      if (!this._chunks || force) {
        this._chunks = [];
        var numChunks = Math.ceil(this.file.size / this.settings.chunkSize);
        for (var i = 0; i < numChunks; i++) {
          this._chunks.push(false);
        }
      }
    }
  }, {
    key: 'setChunkFinished',
    value: function setChunkFinished(chunk, val) {
      if (typeof val === 'undefined') {
        val = true;
      }
      this._initChunks();
      this._chunks[chunk] = !!val;
    }
  }, {
    key: 'getNextChunk',
    value: function getNextChunk(chunk) {
      this._initChunks();
      if (chunk && !this._chunks[chunk] && !this.getChunkCploading(chunk)) {
        return chunk;
      }
      for (var i = 0; i < this._chunks.length; i++) {
        if (!this._chunks[i] && !this.getChunkUploading(i)) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: 'uploadFinished',
    value: function uploadFinished() {
      this._initChunks();
      for (var i = 0; i < this._chunks.length; i++) {
        if (!this._chunks[i] || this.getChunkUploading(i)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'isLastChunk',
    value: function isLastChunk(chunk) {
      return Math.ceil(this.file.size / this.settings.chunkSize) - 1 === chunk;
    }
  }, {
    key: 'getChunkSize',
    value: function getChunkSize(chunk) {
      if (this.isLastChunk(chunk)) {
        return this.file.size % this.settings.chunkSize;
      } else {
        return this.settings.chunkSize;
      }
    }
  }, {
    key: 'onChunkProgress',
    value: function onChunkProgress(f) {
      this.settings.onChunkProgress = f;
    }
  }, {
    key: 'onProgress',
    value: function onProgress(f) {
      this.settings.onProgressrogress = f;
    }
  }, {
    key: 'onSelect',
    value: function onSelect(f) {
      this.settings.onSelect = f;
    }
  }, {
    key: 'onError',
    value: function onError(f) {
      this.settings.onError = f;
    }
  }, {
    key: 'onComplete',
    value: function onComplete(f) {
      this.settings.onComplete = f;
    }
  }, {
    key: 'onInit',
    value: function onInit(f) {
      this.settings.onInit = f;
    }
  }, {
    key: 'onStart',
    value: function onStart(f) {
      this.settings.onStart = f;
    }
  }, {
    key: 'onChunkUploaded',
    value: function onChunkUploaded(f) {
      this.settings.onChunkUploaded = f;
    }
  }]);

  return Uploader;
})();

exports['default'] = Uploader;
module.exports = exports['default'];

},{"./amazonXhr":40,"./constants":41,"./log":42,"./utils":44,"./xhr":45,"babel-runtime/core-js/object/assign":4,"babel-runtime/core-js/object/define-property":5,"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8,"babel-runtime/helpers/interop-require-default":9}],44:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var Utils = (function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'regionString',
    value: function regionString(region) {
      // Given an AWS region, it either returns an empty string for
      // US-based regions or the region name preceded by a dash for non-US-based
      // regions.
      // See this for more details:
      // http://docs.aws.amazon.com/AmazonS3/latest/dev/VirtualHosting.html
      if (region && region.slice(0, 2) !== 'us') {
        return '-' + region;
      }
      return '';
    }
  }, {
    key: 'zfill',
    value: function zfill(str, num) {
      var zeros = '';
      for (var i = 0; i < num; i++) {
        zeros += '0';
      }

      return (zeros + str).substr(-Math.max(num, str.toString().length));
    }
  }, {
    key: 'uriencode',
    value: function uriencode(string) {
      var output = encodeURIComponent(string);
      output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);
      output = output.replace(/;/g, '%3B');

      // AWS percent-encodes some extra non-standard characters in a URI
      output = output.replace(/[*]/g, function (ch) {
        return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
      });

      return output;
    }
  }, {
    key: 'iso8601',
    value: function iso8601(date) {
      return [date.getUTCFullYear(), Utils.zfill(date.getUTCMonth() + 1, 2), Utils.zfill(date.getUTCDate(), 2), 'T', Utils.zfill(date.getUTCHours(), 2), Utils.zfill(date.getUTCMinutes(), 2), Utils.zfill(date.getUTCSeconds(), 2), 'Z'].join('');
    }
  }]);

  return Utils;
})();

exports['default'] = Utils;
module.exports = exports['default'];

},{"babel-runtime/core-js/object/define-property":5,"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8}],45:[function(require,module,exports){
'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = XHR;

function XHR(args) {
  // The user may or may not pass any headers
  args.headers = args.headers || {};

  // If no method is given, default to GET
  args.method = args.method || 'GET';

  var xhr = new XMLHttpRequest();

  // Set the "load" callback if given
  if (args.loadCallback && typeof args.loadCallback === 'function') {
    xhr.addEventListener('load', args.loadCallback, true);
  }

  // Set the "error" callback if given
  if (args.errorCallback && typeof args.errorCallback === 'function') {
    xhr.addEventListener('error', args.errorCallback, true);
  }

  // Set the "readystatechange" callback if given
  if (args.stateChangeCallback && typeof args.stateChangeCallback === 'function') {
    xhr.addEventListener('readystatechange', args.stateChangeCallback);
  }

  // Set the "progress" callback if given
  if (args.progressCallback && typeof args.progressCallback === 'function') {
    xhr.upload.addEventListener('progress', args.progressCallback);
  }

  // Set the "timeout" callback if given
  if (args.timeoutCallback && typeof args.timeoutCallback === 'function') {
    xhr.addEventListener('timeout', args.timeoutCallback);
  }

  // Adding extra params as needed
  var url = args.url;
  if (args.extraParams) {
    for (var paramName in args.extraParams) {
      if (args.extraParams.hasOwnProperty(paramName)) {
        if (url.indexOf('?') !== -1) {
          url += '&';
        } else {
          url += '?';
        }

        url += encodeURIComponent(paramName) + '=';
        url += encodeURIComponent(args.extraParams[paramName]);
      }
    }
  }

  // Open the xhr connection
  xhr.open(args.method, url);

  // Set the headers
  for (var header in args.headers) {
    if (args.headers.hasOwnProperty(header)) {
      xhr.setRequestHeader(header, args.headers[header]);
    }
  }

  // Send the ajax call
  if (args.body) {
    xhr.send(args.body);
  } else {
    xhr.send();
  }
  return xhr;
}

module.exports = exports['default'];

},{"babel-runtime/core-js/object/define-property":5}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvbXVsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZC10by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NlcnQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWYuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mdy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuc3RyaW5nLWF0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudWlkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudW5zY29wZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLndrcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLml0ZXItaGVscGVycy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5zdGF0aWNzLWFjY2VwdC1wcmltaXRpdmVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdG8tanMvY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdG8tanMvZW5jLWhleC5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdG8tanMvaG1hYy1zaGEyNTYuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2htYWMuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL3NoYTI1Ni5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL3NyYy9hbWF6b25YaHIuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvY29uc3RhbnRzLmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvc3JjL2xvZy5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL3NyYy91cGxvYWRlci5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL3NyYy91dGlscy5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL3NyYy94aHIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3dCQ0FxQixZQUFZOzs7O21CQUNqQixPQUFPOzs7O0FBRXZCLFNBQVMsWUFBWSxDQUFDLFFBQVEsRUFBRTs7QUFFOUIsTUFBRyxFQUFFLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxPQUFPLFFBQVEsS0FBSyxXQUFXLElBQy9ELE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFDaEMscUJBQUksMkJBQTJCLENBQUMsQ0FBQztBQUNqQyxXQUFPLENBQUMsQ0FBQyxDQUFDO0dBQ1g7Ozs7QUFJRCxNQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7O0FBRWxELE1BQUcsT0FBTyxTQUFTLEtBQUssV0FBVyxJQUMvQixTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNqRCxRQUFJO0FBQ0YsVUFBSSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0tBQzVDLENBQUMsT0FBTSxDQUFDLEVBQUU7QUFDVCxhQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ1g7R0FDRjtBQUNELG1CQUFJLElBQUksQ0FBQyxDQUFDOztBQUVWLFNBQU8sMEJBQWEsUUFBUSxDQUFDLENBQUM7Q0FDL0I7O0FBRUQsSUFBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDaEMsUUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7Q0FDcEM7OztBQy9CRDs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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SSxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUM5QixRQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3RDLFNBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0dBQ0Y7OztBQUdELE1BQUcsSUFBSSxDQUFDLElBQUksRUFBRTtBQUNaLE9BQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3JCLE1BQU07QUFDTCxPQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDWjtBQUNELFNBQU8sR0FBRyxDQUFDO0NBQ1oiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFVwbG9hZGVyIGZyb20gJy4vdXBsb2FkZXInO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5cbmZ1bmN0aW9uIG11bGVVcGxvYWRlcihzZXR0aW5ncykge1xuICAvLyBWZXJpZnkgdGhhdCB0aGUgYnJvd3NlciBoYXMgdGhlIG5lZWRlZCBIVE1MNSBjYXBhYmlsaXRpZXNcbiAgaWYoISh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEZpbGVMaXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnKSkge1xuICAgIGxvZygnSFRNTDUgQVBJcyBub3QgYXZhaWxhYmxlLicpO1xuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8vIEZvciBuZXcgd2Via2l0IGJyb3dzZXJzLCB0aGUgLnNsaWNlKCkgbWV0aG9kIGlzIG5hbWVkIC53ZWJraXRTbGljZSgpXG4gIC8vIHNpbWlsYXIgZm9yIG1vemlsbGFcbiAgRmlsZS5wcm90b3R5cGUuc2xpY2UgPSBGaWxlLnByb3RvdHlwZS53ZWJraXRTbGljZSB8fFxuICAgIEZpbGUucHJvdG90eXBlLm1velNsaWNlIHx8IEZpbGUucHJvdG90eXBlLnNsaWNlO1xuXG4gIGlmKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSAhPT0gLTEpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGp1c3RDaGVja2luZyA9IG5ldyBCbG9iKFsnc29tZXRoaW5nJ10pO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxuICBsb2coJ09LJyk7XG5cbiAgcmV0dXJuIG5ldyBVcGxvYWRlcihzZXR0aW5ncyk7XG59XG5cbmlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5tdWxlVXBsb2FkZXIgPSBtdWxlVXBsb2FkZXI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaXNJdGVyYWJsZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGVcIilbXCJkZWZhdWx0XCJdO1xuXG52YXIgX2dldEl0ZXJhdG9yID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3JcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIHJldHVybiBhcnI7XG4gIH0gZWxzZSBpZiAoX2lzSXRlcmFibGUoT2JqZWN0KGFycikpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IF9nZXRJdGVyYXRvcihhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgfVxufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcclxucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XHJcbnJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pdGVyLWhlbHBlcnMnKTtcclxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQnKS5jb3JlLmdldEl0ZXJhdG9yOyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xyXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcclxucmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLml0ZXItaGVscGVycycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvJCcpLmNvcmUuaXNJdGVyYWJsZTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJykuY29yZS5PYmplY3QuYXNzaWduOyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XHJcbiAgcmV0dXJuICQuc2V0RGVzYyhpdCwga2V5LCBkZXNjKTtcclxufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc3RhdGljcy1hY2NlcHQtcHJpbWl0aXZlcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpLmNvcmUuT2JqZWN0LmtleXM7IiwidmFyICQgPSByZXF1aXJlKCcuLyQnKTtcclxuZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbXNnMSwgbXNnMil7XHJcbiAgaWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMiA/IG1zZzEgKyBtc2cyIDogbXNnMSk7XHJcbn1cclxuYXNzZXJ0LmRlZiA9ICQuYXNzZXJ0RGVmaW5lZDtcclxuYXNzZXJ0LmZuID0gZnVuY3Rpb24oaXQpe1xyXG4gIGlmKCEkLmlzRnVuY3Rpb24oaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XHJcbiAgcmV0dXJuIGl0O1xyXG59O1xyXG5hc3NlcnQub2JqID0gZnVuY3Rpb24oaXQpe1xyXG4gIGlmKCEkLmlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XHJcbiAgcmV0dXJuIGl0O1xyXG59O1xyXG5hc3NlcnQuaW5zdCA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XHJcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcclxuICByZXR1cm4gaXQ7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gYXNzZXJ0OyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKTtcclxuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXtcclxuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4gIHZhciBUID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKVxyXG4gICAgLCBsID0gYXJndW1lbnRzLmxlbmd0aFxyXG4gICAgLCBpID0gMTtcclxuICB3aGlsZShsID4gaSl7XHJcbiAgICB2YXIgUyAgICAgID0gJC5FUzVPYmplY3QoYXJndW1lbnRzW2krK10pXHJcbiAgICAgICwga2V5cyAgID0gZW51bUtleXMoUylcclxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxyXG4gICAgICAsIGogICAgICA9IDBcclxuICAgICAgLCBrZXk7XHJcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIFQ7XHJcbn07IiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIFRBRyAgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXHJcbiAgLCB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xyXG5mdW5jdGlvbiBjb2YoaXQpe1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XHJcbn1cclxuY29mLmNsYXNzb2YgPSBmdW5jdGlvbihpdCl7XHJcbiAgdmFyIE8sIFQ7XHJcbiAgcmV0dXJuIGl0ID09IHVuZGVmaW5lZCA/IGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6ICdOdWxsJ1xyXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVCA6IGNvZihPKTtcclxufTtcclxuY29mLnNldCA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xyXG4gIGlmKGl0ICYmICEkLmhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkkLmhpZGUoaXQsIFRBRywgdGFnKTtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBjb2Y7IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgZ2xvYmFsICAgICA9ICQuZ1xyXG4gICwgY29yZSAgICAgICA9ICQuY29yZVxyXG4gICwgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbjtcclxuZnVuY3Rpb24gY3R4KGZuLCB0aGF0KXtcclxuICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gIH07XHJcbn1cclxuLy8gdHlwZSBiaXRtYXBcclxuJGRlZi5GID0gMTsgIC8vIGZvcmNlZFxyXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXHJcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcclxuJGRlZi5QID0gODsgIC8vIHByb3RvXHJcbiRkZWYuQiA9IDE2OyAvLyBiaW5kXHJcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXHJcbmZ1bmN0aW9uICRkZWYodHlwZSwgbmFtZSwgc291cmNlKXtcclxuICB2YXIga2V5LCBvd24sIG91dCwgZXhwXHJcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xyXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xyXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSkucHJvdG90eXBlXHJcbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcclxuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xyXG4gIGZvcihrZXkgaW4gc291cmNlKXtcclxuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxyXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcclxuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcclxuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXHJcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xyXG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXHJcbiAgICBpZihpc0dsb2JhbCAmJiAhaXNGdW5jdGlvbih0YXJnZXRba2V5XSkpZXhwID0gc291cmNlW2tleV07XHJcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxyXG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xyXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcclxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xyXG4gICAgICBleHAgPSBmdW5jdGlvbihwYXJhbSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XHJcbiAgICAgIH07XHJcbiAgICAgIGV4cC5wcm90b3R5cGUgPSBDLnByb3RvdHlwZTtcclxuICAgIH0ob3V0KTtcclxuICAgIGVsc2UgZXhwID0gdHlwZSAmICRkZWYuUCAmJiBpc0Z1bmN0aW9uKG91dCkgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcclxuICAgIC8vIGV4cG9ydFxyXG4gICAgJC5oaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSAkZGVmOyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xyXG4gIHZhciBrZXlzICAgICAgID0gJC5nZXRLZXlzKGl0KVxyXG4gICAgLCBnZXREZXNjICAgID0gJC5nZXREZXNjXHJcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHM7XHJcbiAgaWYoZ2V0U3ltYm9scykkLmVhY2guY2FsbChnZXRTeW1ib2xzKGl0KSwgZnVuY3Rpb24oa2V5KXtcclxuICAgIGlmKGdldERlc2MoaXQsIGtleSkuZW51bWVyYWJsZSlrZXlzLnB1c2goa2V5KTtcclxuICB9KTtcclxuICByZXR1cm4ga2V5cztcclxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCQpe1xyXG4gICQuRlcgICA9IGZhbHNlO1xyXG4gICQucGF0aCA9ICQuY29yZTtcclxuICByZXR1cm4gJDtcclxufTsiLCJ2YXIgJGRlZiAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCAkICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgY29mICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXHJcbiAgLCAkaXRlciAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXHJcbiAgLCBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcclxuICAsIEZGX0lURVJBVE9SICAgICA9ICdAQGl0ZXJhdG9yJ1xyXG4gICwgVkFMVUVTICAgICAgICAgID0gJ3ZhbHVlcydcclxuICAsIEl0ZXJhdG9ycyAgICAgICA9ICRpdGVyLkl0ZXJhdG9ycztcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRSl7XHJcbiAgJGl0ZXIuY3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcclxuICBmdW5jdGlvbiBjcmVhdGVNZXRob2Qoa2luZCl7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTtcclxuICAgIH07XHJcbiAgfVxyXG4gIHZhciBUQUcgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xyXG4gICAgLCBwcm90byAgICA9IEJhc2UucHJvdG90eXBlXHJcbiAgICAsIF9uYXRpdmUgID0gcHJvdG9bU1lNQk9MX0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxyXG4gICAgLCBfZGVmYXVsdCA9IF9uYXRpdmUgfHwgY3JlYXRlTWV0aG9kKERFRkFVTFQpXHJcbiAgICAsIG1ldGhvZHMsIGtleTtcclxuICAvLyBGaXggbmF0aXZlXHJcbiAgaWYoX25hdGl2ZSl7XHJcbiAgICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSAkLmdldFByb3RvKF9kZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcclxuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcclxuICAgIGNvZi5zZXQoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XHJcbiAgICAvLyBGRiBmaXhcclxuICAgIGlmKCQuRlcgJiYgJC5oYXMocHJvdG8sIEZGX0lURVJBVE9SKSkkaXRlci5zZXQoSXRlcmF0b3JQcm90b3R5cGUsICQudGhhdCk7XHJcbiAgfVxyXG4gIC8vIERlZmluZSBpdGVyYXRvclxyXG4gIGlmKCQuRlcpJGl0ZXIuc2V0KHByb3RvLCBfZGVmYXVsdCk7XHJcbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxyXG4gIEl0ZXJhdG9yc1tOQU1FXSA9IF9kZWZhdWx0O1xyXG4gIEl0ZXJhdG9yc1tUQUddICA9ICQudGhhdDtcclxuICBpZihERUZBVUxUKXtcclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgICAgICAgID8gX2RlZmF1bHQgOiBjcmVhdGVNZXRob2QoJ2tleXMnKSxcclxuICAgICAgdmFsdWVzOiAgREVGQVVMVCA9PSBWQUxVRVMgPyBfZGVmYXVsdCA6IGNyZWF0ZU1ldGhvZChWQUxVRVMpLFxyXG4gICAgICBlbnRyaWVzOiBERUZBVUxUICE9IFZBTFVFUyA/IF9kZWZhdWx0IDogY3JlYXRlTWV0aG9kKCdlbnRyaWVzJylcclxuICAgIH07XHJcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xyXG4gICAgICBpZighKGtleSBpbiBwcm90bykpJC5oaWRlKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XHJcbiAgICB9IGVsc2UgJGRlZigkZGVmLlAgKyAkZGVmLkYgKiAkaXRlci5CVUdHWSwgTkFNRSwgbWV0aG9kcyk7XHJcbiAgfVxyXG59OyIsIid1c2Ugc3RyaWN0JztcclxudmFyICQgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGNvZiAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmNvZicpXHJcbiAgLCBhc3NlcnRPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5vYmpcclxuICAsIFNZTUJPTF9JVEVSQVRPUiAgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXHJcbiAgLCBGRl9JVEVSQVRPUiAgICAgICA9ICdAQGl0ZXJhdG9yJ1xyXG4gICwgSXRlcmF0b3JzICAgICAgICAgPSB7fVxyXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcclxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcclxuc2V0SXRlcmF0b3IoSXRlcmF0b3JQcm90b3R5cGUsICQudGhhdCk7XHJcbmZ1bmN0aW9uIHNldEl0ZXJhdG9yKE8sIHZhbHVlKXtcclxuICAkLmhpZGUoTywgU1lNQk9MX0lURVJBVE9SLCB2YWx1ZSk7XHJcbiAgLy8gQWRkIGl0ZXJhdG9yIGZvciBGRiBpdGVyYXRvciBwcm90b2NvbFxyXG4gIGlmKEZGX0lURVJBVE9SIGluIFtdKSQuaGlkZShPLCBGRl9JVEVSQVRPUiwgdmFsdWUpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXHJcbiAgQlVHR1k6ICdrZXlzJyBpbiBbXSAmJiAhKCduZXh0JyBpbiBbXS5rZXlzKCkpLFxyXG4gIEl0ZXJhdG9yczogSXRlcmF0b3JzLFxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcclxuICAgIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xyXG4gIH0sXHJcbiAgaXM6IGZ1bmN0aW9uKGl0KXtcclxuICAgIHZhciBPICAgICAgPSBPYmplY3QoaXQpXHJcbiAgICAgICwgU3ltYm9sID0gJC5nLlN5bWJvbFxyXG4gICAgICAsIFNZTSAgICA9IFN5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgRkZfSVRFUkFUT1I7XHJcbiAgICByZXR1cm4gU1lNIGluIE8gfHwgU1lNQk9MX0lURVJBVE9SIGluIE8gfHwgJC5oYXMoSXRlcmF0b3JzLCBjb2YuY2xhc3NvZihPKSk7XHJcbiAgfSxcclxuICBnZXQ6IGZ1bmN0aW9uKGl0KXtcclxuICAgIHZhciBTeW1ib2wgID0gJC5nLlN5bWJvbFxyXG4gICAgICAsIGV4dCAgICAgPSBpdFtTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SXVxyXG4gICAgICAsIGdldEl0ZXIgPSBleHQgfHwgaXRbU1lNQk9MX0lURVJBVE9SXSB8fCBJdGVyYXRvcnNbY29mLmNsYXNzb2YoaXQpXTtcclxuICAgIHJldHVybiBhc3NlcnRPYmplY3QoZ2V0SXRlci5jYWxsKGl0KSk7XHJcbiAgfSxcclxuICBzZXQ6IHNldEl0ZXJhdG9yLFxyXG4gIGNyZWF0ZTogZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQsIHByb3RvKXtcclxuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKHByb3RvIHx8IEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogJC5kZXNjKDEsIG5leHQpfSk7XHJcbiAgICBjb2Yuc2V0KENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xyXG4gIH1cclxufTsiLCIndXNlIHN0cmljdCc7XHJcbnZhciBnbG9iYWwgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpXHJcbiAgLCBjb3JlICAgPSB7fVxyXG4gICwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcclxuICAsIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHlcclxuICAsIGNlaWwgID0gTWF0aC5jZWlsXHJcbiAgLCBmbG9vciA9IE1hdGguZmxvb3JcclxuICAsIG1heCAgID0gTWF0aC5tYXhcclxuICAsIG1pbiAgID0gTWF0aC5taW47XHJcbi8vIFRoZSBlbmdpbmUgd29ya3MgZmluZSB3aXRoIGRlc2NyaXB0b3JzPyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5LlxyXG52YXIgREVTQyA9ICEhZnVuY3Rpb24oKXtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiAyOyB9fSkuYSA9PSAyO1xyXG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cclxufSgpO1xyXG52YXIgaGlkZSA9IGNyZWF0ZURlZmluZXIoMSk7XHJcbi8vIDcuMS40IFRvSW50ZWdlclxyXG5mdW5jdGlvbiB0b0ludGVnZXIoaXQpe1xyXG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xyXG59XHJcbmZ1bmN0aW9uIGRlc2MoYml0bWFwLCB2YWx1ZSl7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcclxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcclxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcclxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcclxuICB9O1xyXG59XHJcbmZ1bmN0aW9uIHNpbXBsZVNldChvYmplY3QsIGtleSwgdmFsdWUpe1xyXG4gIG9iamVjdFtrZXldID0gdmFsdWU7XHJcbiAgcmV0dXJuIG9iamVjdDtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVEZWZpbmVyKGJpdG1hcCl7XHJcbiAgcmV0dXJuIERFU0MgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xyXG4gICAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgZGVzYyhiaXRtYXAsIHZhbHVlKSk7XHJcbiAgfSA6IHNpbXBsZVNldDtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPYmplY3QoaXQpe1xyXG4gIHJldHVybiBpdCAhPT0gbnVsbCAmJiAodHlwZW9mIGl0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nKTtcclxufVxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGl0KXtcclxuICByZXR1cm4gdHlwZW9mIGl0ID09ICdmdW5jdGlvbic7XHJcbn1cclxuZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZChpdCl7XHJcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcclxuICByZXR1cm4gaXQ7XHJcbn1cclxuXHJcbnZhciAkID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZncnKSh7XHJcbiAgZzogZ2xvYmFsLFxyXG4gIGNvcmU6IGNvcmUsXHJcbiAgaHRtbDogZ2xvYmFsLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcclxuICAvLyBodHRwOi8vanNwZXJmLmNvbS9jb3JlLWpzLWlzb2JqZWN0XHJcbiAgaXNPYmplY3Q6ICAgaXNPYmplY3QsXHJcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcclxuICBpdDogZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGl0O1xyXG4gIH0sXHJcbiAgdGhhdDogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0sXHJcbiAgLy8gNy4xLjQgVG9JbnRlZ2VyXHJcbiAgdG9JbnRlZ2VyOiB0b0ludGVnZXIsXHJcbiAgLy8gNy4xLjE1IFRvTGVuZ3RoXHJcbiAgdG9MZW5ndGg6IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXHJcbiAgfSxcclxuICB0b0luZGV4OiBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcclxuICAgIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcclxuICAgIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xyXG4gIH0sXHJcbiAgaGFzOiBmdW5jdGlvbihpdCwga2V5KXtcclxuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlOiAgICAgT2JqZWN0LmNyZWF0ZSxcclxuICBnZXRQcm90bzogICBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXHJcbiAgREVTQzogICAgICAgREVTQyxcclxuICBkZXNjOiAgICAgICBkZXNjLFxyXG4gIGdldERlc2M6ICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXHJcbiAgc2V0RGVzYzogICAgZGVmaW5lUHJvcGVydHksXHJcbiAgc2V0RGVzY3M6ICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMsXHJcbiAgZ2V0S2V5czogICAgT2JqZWN0LmtleXMsXHJcbiAgZ2V0TmFtZXM6ICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXHJcbiAgZ2V0U3ltYm9sczogT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcclxuICBhc3NlcnREZWZpbmVkOiBhc3NlcnREZWZpbmVkLFxyXG4gIC8vIER1bW15LCBmaXggZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmcgaW4gZXM1IG1vZHVsZVxyXG4gIEVTNU9iamVjdDogT2JqZWN0LFxyXG4gIHRvT2JqZWN0OiBmdW5jdGlvbihpdCl7XHJcbiAgICByZXR1cm4gJC5FUzVPYmplY3QoYXNzZXJ0RGVmaW5lZChpdCkpO1xyXG4gIH0sXHJcbiAgaGlkZTogaGlkZSxcclxuICBkZWY6IGNyZWF0ZURlZmluZXIoMCksXHJcbiAgc2V0OiBnbG9iYWwuU3ltYm9sID8gc2ltcGxlU2V0IDogaGlkZSxcclxuICBtaXg6IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcclxuICAgIGZvcih2YXIga2V5IGluIHNyYyloaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH0sXHJcbiAgZWFjaDogW10uZm9yRWFjaFxyXG59KTtcclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuaWYodHlwZW9mIF9fZSAhPSAndW5kZWZpbmVkJylfX2UgPSBjb3JlO1xyXG5pZih0eXBlb2YgX19nICE9ICd1bmRlZmluZWQnKV9fZyA9IGdsb2JhbDsiLCIndXNlIHN0cmljdCc7XHJcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxyXG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcclxudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xyXG4gIHJldHVybiBmdW5jdGlvbihwb3Mpe1xyXG4gICAgdmFyIHMgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxyXG4gICAgICAsIGkgPSAkLnRvSW50ZWdlcihwb3MpXHJcbiAgICAgICwgbCA9IHMubGVuZ3RoXHJcbiAgICAgICwgYSwgYjtcclxuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XHJcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxyXG4gICAgICB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcclxuICAgICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxyXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xyXG4gIH07XHJcbn07IiwidmFyIHNpZCA9IDA7XHJcbmZ1bmN0aW9uIHVpZChrZXkpe1xyXG4gIHJldHVybiAnU3ltYm9sKCcgKyBrZXkgKyAnKV8nICsgKCsrc2lkICsgTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoMzYpO1xyXG59XHJcbnVpZC5zYWZlID0gcmVxdWlyZSgnLi8kJykuZy5TeW1ib2wgfHwgdWlkO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHVpZDsiLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXHJcbnZhciAkICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndW5zY29wYWJsZXMnKTtcclxuaWYoJC5GVyAmJiAhKFVOU0NPUEFCTEVTIGluIFtdKSkkLmhpZGUoQXJyYXkucHJvdG90eXBlLCBVTlNDT1BBQkxFUywge30pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgaWYoJC5GVylbXVtVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XHJcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJCcpLmdcclxuICAsIHN0b3JlICA9IHt9O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xyXG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxyXG4gICAgZ2xvYmFsLlN5bWJvbCAmJiBnbG9iYWwuU3ltYm9sW25hbWVdIHx8IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdTeW1ib2wuJyArIG5hbWUpKTtcclxufTsiLCJ2YXIgY29yZSAgPSByZXF1aXJlKCcuLyQnKS5jb3JlXHJcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJyk7XHJcbmNvcmUuaXNJdGVyYWJsZSAgPSAkaXRlci5pcztcclxuY29yZS5nZXRJdGVyYXRvciA9ICRpdGVyLmdldDsiLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxyXG4gICwgSVRFUiAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcclxuICAsICRpdGVyICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXHJcbiAgLCBzdGVwICAgICAgID0gJGl0ZXIuc3RlcFxyXG4gICwgSXRlcmF0b3JzICA9ICRpdGVyLkl0ZXJhdG9ycztcclxuXHJcbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcclxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcclxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxyXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcclxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcclxuICAkLnNldCh0aGlzLCBJVEVSLCB7bzogJC50b09iamVjdChpdGVyYXRlZCksIGk6IDAsIGs6IGtpbmR9KTtcclxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXHJcbn0sIGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGl0ZXIgID0gdGhpc1tJVEVSXVxyXG4gICAgLCBPICAgICA9IGl0ZXIub1xyXG4gICAgLCBraW5kICA9IGl0ZXIua1xyXG4gICAgLCBpbmRleCA9IGl0ZXIuaSsrO1xyXG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcclxuICAgIGl0ZXIubyA9IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBzdGVwKDEpO1xyXG4gIH1cclxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcclxuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcclxuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XHJcbn0sICd2YWx1ZXMnKTtcclxuXHJcbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcclxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcclxuXHJcbnNldFVuc2NvcGUoJ2tleXMnKTtcclxuc2V0VW5zY29wZSgndmFsdWVzJyk7XHJcbnNldFVuc2NvcGUoJ2VudHJpZXMnKTsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxyXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcclxuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTsiLCJ2YXIgJCAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgJGRlZiAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsIGlzT2JqZWN0ID0gJC5pc09iamVjdFxyXG4gICwgdG9PYmplY3QgPSAkLnRvT2JqZWN0O1xyXG5mdW5jdGlvbiB3cmFwT2JqZWN0TWV0aG9kKE1FVEhPRCwgTU9ERSl7XHJcbiAgdmFyIGZuICA9ICgkLmNvcmUuT2JqZWN0IHx8IHt9KVtNRVRIT0RdIHx8IE9iamVjdFtNRVRIT0RdXHJcbiAgICAsIGYgICA9IDBcclxuICAgICwgbyAgID0ge307XHJcbiAgb1tNRVRIT0RdID0gTU9ERSA9PSAxID8gZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGl0O1xyXG4gIH0gOiBNT0RFID09IDIgPyBmdW5jdGlvbihpdCl7XHJcbiAgICByZXR1cm4gaXNPYmplY3QoaXQpID8gZm4oaXQpIDogdHJ1ZTtcclxuICB9IDogTU9ERSA9PSAzID8gZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IGZhbHNlO1xyXG4gIH0gOiBNT0RFID09IDQgPyBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XHJcbiAgICByZXR1cm4gZm4odG9PYmplY3QoaXQpLCBrZXkpO1xyXG4gIH0gOiBNT0RFID09IDUgPyBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XHJcbiAgICByZXR1cm4gZm4oT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZChpdCkpKTtcclxuICB9IDogZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGZuKHRvT2JqZWN0KGl0KSk7XHJcbiAgfTtcclxuICB0cnkge1xyXG4gICAgZm4oJ3onKTtcclxuICB9IGNhdGNoKGUpe1xyXG4gICAgZiA9IDE7XHJcbiAgfVxyXG4gICRkZWYoJGRlZi5TICsgJGRlZi5GICogZiwgJ09iamVjdCcsIG8pO1xyXG59XHJcbndyYXBPYmplY3RNZXRob2QoJ2ZyZWV6ZScsIDEpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdzZWFsJywgMSk7XHJcbndyYXBPYmplY3RNZXRob2QoJ3ByZXZlbnRFeHRlbnNpb25zJywgMSk7XHJcbndyYXBPYmplY3RNZXRob2QoJ2lzRnJvemVuJywgMik7XHJcbndyYXBPYmplY3RNZXRob2QoJ2lzU2VhbGVkJywgMik7XHJcbndyYXBPYmplY3RNZXRob2QoJ2lzRXh0ZW5zaWJsZScsIDMpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3InLCA0KTtcclxud3JhcE9iamVjdE1ldGhvZCgnZ2V0UHJvdG90eXBlT2YnLCA1KTtcclxud3JhcE9iamVjdE1ldGhvZCgna2V5cycpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdnZXRPd25Qcm9wZXJ0eU5hbWVzJyk7IiwidmFyIHNldCAgID0gcmVxdWlyZSgnLi8kJykuc2V0XHJcbiAgLCBhdCAgICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKVxyXG4gICwgSVRFUiAgPSByZXF1aXJlKCcuLyQudWlkJykuc2FmZSgnaXRlcicpXHJcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJylcclxuICAsIHN0ZXAgID0gJGl0ZXIuc3RlcDtcclxuXHJcbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcclxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xyXG4gIHNldCh0aGlzLCBJVEVSLCB7bzogU3RyaW5nKGl0ZXJhdGVkKSwgaTogMH0pO1xyXG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXHJcbn0sIGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGl0ZXIgID0gdGhpc1tJVEVSXVxyXG4gICAgLCBPICAgICA9IGl0ZXIub1xyXG4gICAgLCBpbmRleCA9IGl0ZXIuaVxyXG4gICAgLCBwb2ludDtcclxuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4gc3RlcCgxKTtcclxuICBwb2ludCA9IGF0LmNhbGwoTywgaW5kZXgpO1xyXG4gIGl0ZXIuaSArPSBwb2ludC5sZW5ndGg7XHJcbiAgcmV0dXJuIHN0ZXAoMCwgcG9pbnQpO1xyXG59KTsiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xyXG52YXIgJCAgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgSXRlcmF0b3JzICAgPSByZXF1aXJlKCcuLyQuaXRlcicpLkl0ZXJhdG9yc1xyXG4gICwgSVRFUkFUT1IgICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcclxuICAsIEFycmF5VmFsdWVzID0gSXRlcmF0b3JzLkFycmF5XHJcbiAgLCBOb2RlTGlzdCAgICA9ICQuZy5Ob2RlTGlzdDtcclxuaWYoJC5GVyAmJiBOb2RlTGlzdCAmJiAhKElURVJBVE9SIGluIE5vZGVMaXN0LnByb3RvdHlwZSkpe1xyXG4gICQuaGlkZShOb2RlTGlzdC5wcm90b3R5cGUsIElURVJBVE9SLCBBcnJheVZhbHVlcyk7XHJcbn1cclxuSXRlcmF0b3JzLk5vZGVMaXN0ID0gQXJyYXlWYWx1ZXM7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdHJvb3QuQ3J5cHRvSlMgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gRigpIHt9XG5cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3ZlcnJpZGVzIFByb3BlcnRpZXMgdG8gY29weSBpbnRvIHRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJyxcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3Bhd25cblx0ICAgICAgICAgICAgICAgIEYucHJvdG90eXBlID0gdGhpcztcblx0ICAgICAgICAgICAgICAgIHZhciBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdFdvcmRzLmxlbmd0aCA+IDB4ZmZmZikge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSA9IHRoYXRXb3Jkc1tpID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgYWxsIHdvcmRzIGF0IG9uY2Vcblx0ICAgICAgICAgICAgICAgIHRoaXNXb3Jkcy5wdXNoLmFwcGx5KHRoaXNXb3JkcywgdGhhdFdvcmRzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAobV93KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV93ID0gbV93O1xuXHQgICAgICAgICAgICAgICAgdmFyIG1feiA9IDB4M2FkZTY4YjE7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFzayA9IDB4ZmZmZmZmZmY7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbV96ID0gKDB4OTA2OSAqIChtX3ogJiAweEZGRkYpICsgKG1feiA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIG1fdyA9ICgweDQ2NTAgKiAobV93ICYgMHhGRkZGKSArIChtX3cgPj4gMHgxMCkpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gKChtX3ogPDwgMHgxMCkgKyBtX3cpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgLz0gMHgxMDAwMDAwMDA7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDAuNTtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICogKE1hdGgucmFuZG9tKCkgPiAuNSA/IDEgOiAtMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByY2FjaGU7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIF9yID0gcigocmNhY2hlIHx8IE1hdGgucmFuZG9tKCkpICogMHgxMDAwMDAwMDApO1xuXG5cdCAgICAgICAgICAgICAgICByY2FjaGUgPSBfcigpICogMHgzYWRlNjdiNztcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goKF9yKCkgKiAweDEwMDAwMDAwMCkgfCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuSGV4O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTI1NlwiKSwgcmVxdWlyZShcIi4vaG1hY1wiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9zaGEyNTZcIiwgXCIuL2htYWNcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5IbWFjU0hBMjU2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmODtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8qKlxuXHQgICAgICogSE1BQyBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBITUFDID0gQ19hbGdvLkhNQUMgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIEhNQUMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBobWFjSGFzaGVyID0gQ3J5cHRvSlMuYWxnby5ITUFDLmNyZWF0ZShDcnlwdG9KUy5hbGdvLlNIQTI1Niwga2V5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoaGFzaGVyLCBrZXkpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdCBoYXNoZXJcblx0ICAgICAgICAgICAgaGFzaGVyID0gdGhpcy5faGFzaGVyID0gbmV3IGhhc2hlci5pbml0KCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gVXRmOC5wYXJzZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemUgPSBoYXNoZXIuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgaGFzaGVyQmxvY2tTaXplQnl0ZXMgPSBoYXNoZXJCbG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEFsbG93IGFyYml0cmFyeSBsZW5ndGgga2V5c1xuXHQgICAgICAgICAgICBpZiAoa2V5LnNpZ0J5dGVzID4gaGFzaGVyQmxvY2tTaXplQnl0ZXMpIHtcblx0ICAgICAgICAgICAgICAgIGtleSA9IGhhc2hlci5maW5hbGl6ZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAga2V5LmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUga2V5IGZvciBpbm5lciBhbmQgb3V0ZXIgcGFkc1xuXHQgICAgICAgICAgICB2YXIgb0tleSA9IHRoaXMuX29LZXkgPSBrZXkuY2xvbmUoKTtcblx0ICAgICAgICAgICAgdmFyIGlLZXkgPSB0aGlzLl9pS2V5ID0ga2V5LmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5V29yZHMgPSBvS2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaUtleVdvcmRzID0gaUtleS53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBYT1Iga2V5cyB3aXRoIHBhZCBjb25zdGFudHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYXNoZXJCbG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgb0tleVdvcmRzW2ldIF49IDB4NWM1YzVjNWM7XG5cdCAgICAgICAgICAgICAgICBpS2V5V29yZHNbaV0gXj0gMHgzNjM2MzYzNjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBvS2V5LnNpZ0J5dGVzID0gaUtleS5zaWdCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZUJ5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIEhNQUMgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIFJlc2V0XG5cdCAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAgICBoYXNoZXIudXBkYXRlKHRoaXMuX2lLZXkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgSE1BQyB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtITUFDfSBUaGlzIEhNQUMgaW5zdGFuY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoZXIudXBkYXRlKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBITUFDIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhhc2hlciA9IHRoaXMuX2hhc2hlcjtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIEhNQUNcblx0ICAgICAgICAgICAgdmFyIGlubmVySGFzaCA9IGhhc2hlci5maW5hbGl6ZShtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIHZhciBobWFjID0gaGFzaGVyLmZpbmFsaXplKHRoaXMuX29LZXkuY2xvbmUoKS5jb25jYXQoaW5uZXJIYXNoKSk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhtYWM7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gSW5pdGlhbGl6YXRpb24gYW5kIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBIID0gW107XG5cdCAgICB2YXIgSyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcblx0ICAgICAgICAgICAgdmFyIHNxcnROID0gTWF0aC5zcXJ0KG4pO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIShuICUgZmFjdG9yKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgbiA9IDI7XG5cdCAgICAgICAgdmFyIG5QcmltZSA9IDA7XG5cdCAgICAgICAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG5cdCAgICAgICAgICAgIGlmIChpc1ByaW1lKG4pKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoblByaW1lIDwgOCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEhbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAyKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpO1xuXG5cdCAgICAgICAgICAgICAgICBuUHJpbWUrKztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIG4rKztcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3Rcblx0ICAgIHZhciBXID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTI1NiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTI1NiA9IENfYWxnby5TSEEyNTYgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KEguc2xpY2UoMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIGUgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgZiA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBnID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIGggPSBIWzddO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCA9IFdbaSAtIDJdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWogPSAoYSAmIGIpIF4gKGEgJiBjKSBeIChiICYgYyk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cblx0ICAgICAgICAgICAgICAgIGggPSBnO1xuXHQgICAgICAgICAgICAgICAgZyA9IGY7XG5cdCAgICAgICAgICAgICAgICBmID0gZTtcblx0ICAgICAgICAgICAgICAgIGUgPSAoZCArIHQxKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBkID0gYztcblx0ICAgICAgICAgICAgICAgIGMgPSBiO1xuXHQgICAgICAgICAgICAgICAgYiA9IGE7XG5cdCAgICAgICAgICAgICAgICBhID0gKHQxICsgdDIpIHwgMDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICAgICAgSFs0XSA9IChIWzRdICsgZSkgfCAwO1xuXHQgICAgICAgICAgICBIWzVdID0gKEhbNV0gKyBmKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNl0gPSAoSFs2XSArIGcpIHwgMDtcblx0ICAgICAgICAgICAgSFs3XSA9IChIWzddICsgaCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1Nih3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTI1NiA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFNIQTI1Nik7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMjU2KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTI1NiA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihTSEEyNTYpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyNTY7XG5cbn0pKTsiLCJpbXBvcnQgWEhSIGZyb20gJy4veGhyJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBTSEEyNTYgZnJvbSAnY3J5cHRvLWpzL3NoYTI1Nic7XG5pbXBvcnQgSG1hY1NIQTI1NiBmcm9tICdjcnlwdG8tanMvaG1hYy1zaGEyNTYnO1xuaW1wb3J0IEhleCBmcm9tICdjcnlwdG8tanMvZW5jLWhleCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFtYXpvblhIUiB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzIHx8IHt9O1xuICAgIHRoaXMuc2V0dGluZ3MuYXV0aCA9IHRoaXMuc2V0dGluZ3MuYXV0aCB8fCB7fTtcbiAgICB0aGlzLnNldHRpbmdzLmhlYWRlcnMgPSB0aGlzLnNldHRpbmdzLmhlYWRlcnMgfHwge307XG4gICAgdGhpcy5zZXR0aW5ncy5xdWVyeXN0cmluZyA9IHRoaXMuc2V0dGluZ3MucXVlcnlzdHJpbmcgfHwge307XG5cbiAgICBpZighdGhpcy5zZXR0aW5ncy5hdXRoLmRhdGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnN0YW50aWF0aW9uLCBtaXNzaW5nIGF1dGguZGF0ZScpO1xuICAgIH1cbiAgICBpZighdGhpcy5zZXR0aW5ncy5hdXRoLnNpZ25hdHVyZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBzaWduYXR1cmUgcHJvdmlkZWQuJyk7XG4gICAgfVxuICB9XG5cbiAgc2VuZChjYWxsYmFjaykge1xuICAgIHRoaXMucmVxdWVzdERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgdGhpcy5oZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xuXG4gICAgY29uc3QgYnVja2V0ID0gdGhpcy5zZXR0aW5ncy5hdXRoLmJ1Y2tldDtcbiAgICBjb25zdCByZWdpb25TdHJpbmcgPSB1dGlscy5yZWdpb25TdHJpbmcodGhpcy5zZXR0aW5ncy5hdXRoLnJlZ2lvbik7XG4gICAgdGhpcy5oZWFkZXJzLmhvc3QgPSBgJHtidWNrZXR9LnMzJHtyZWdpb25TdHJpbmd9LmFtYXpvbmF3cy5jb21gO1xuXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuc2V0dGluZ3MuYXV0aC5kYXRlO1xuICAgIHZhciBkYXRlU3RyaW5nID0gW1xuICAgICAgZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgdXRpbHMuemZpbGwoZGF0ZS5nZXRVVENNb250aCgpICsgMSwgMiksXG4gICAgICB1dGlscy56ZmlsbChkYXRlLmdldFVUQ0RhdGUoKSwgMiksXG4gICAgXS5qb2luKCcnKTtcblxuICAgIGNvbnN0IGVuY29kZWREYXRlID0gdXRpbHMudXJpZW5jb2RlKHV0aWxzLmlzbzg2MDEodGhpcy5yZXF1ZXN0RGF0ZSkpO1xuICAgIGxldCBxdWVyeXN0cmluZyA9IHRoaXMuc2V0dGluZ3MucXVlcnlzdHJpbmc7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LURhdGUnXSA9IGVuY29kZWREYXRlO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1BbGdvcml0aG0nXSA9ICdBV1M0LUhNQUMtU0hBMjU2JztcbiAgICBxdWVyeXN0cmluZ1snWC1BbXotRXhwaXJlcyddID0gIDg2NDAwOyAvLyBPbmUgZGF5XG5cbiAgICBjb25zdCBhY2Nlc3NLZXkgPSB0aGlzLnNldHRpbmdzLmF1dGguYWNjZXNzS2V5O1xuICAgIGNvbnN0IHJlZ2lvbiA9IHRoaXMuc2V0dGluZ3MuYXV0aC5yZWdpb247XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LUNyZWRlbnRpYWwnXSA9IHV0aWxzLnVyaWVuY29kZShcbiAgICAgIGAke2FjY2Vzc0tleX0vJHtkYXRlU3RyaW5nfS8ke3JlZ2lvbn0vczMvYXdzNF9yZXF1ZXN0YFxuICAgICk7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LVNpZ25lZEhlYWRlcnMnXSA9ICcnO1xuXG4gICAgbGV0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpO1xuXG4gICAgaGVhZGVyS2V5cy5zb3J0KCk7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LVNpZ25lZEhlYWRlcnMnXSA9IHV0aWxzLnVyaWVuY29kZShcbiAgICAgIGhlYWRlcktleXMuam9pbignOycpXG4gICAgKTtcblxuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1TaWduYXR1cmUnXSA9IHRoaXMuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcigpO1xuXG4gICAgdmFyIHVybCA9IGAke2xvY2F0aW9uLnByb3RvY29sfS8vJHt0aGlzLmhlYWRlcnMuaG9zdH0vJHt0aGlzLnNldHRpbmdzLmtleX1gO1xuICAgIGRlbGV0ZSB0aGlzLmhlYWRlcnMuaG9zdDsgIC8vIGtlZXAgdGhpcyBoZWFkZXIgb25seSBmb3IgaGFzaGluZ1xuXG4gICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICBPYmplY3Qua2V5cyhxdWVyeXN0cmluZykubWFwKGtleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5c3RyaW5nW2tleV07XG4gICAgICBpZihmaXJzdCkge1xuICAgICAgICB1cmwgKz0gJz8nO1xuICAgICAgfVxuICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgIHVybCArPSBgJHtrZXl9PSR7dmFsdWV9JmA7XG4gICAgfSk7XG4gICAgdXJsID0gdXJsLnNsaWNlKDAsIC0xKTsgIC8vIHJlbW92ZSBleHRyYSBhbXBlcnNhbmRcblxuICAgIHRoaXMueGhyID0gWEhSKHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgbWV0aG9kOiB0aGlzLnNldHRpbmdzLm1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgIGJvZHk6IHRoaXMuc2V0dGluZ3MucGF5bG9hZCxcblxuICAgICAgbG9hZENhbGxiYWNrOiB0aGlzLnNldHRpbmdzLmxvYWRDYWxsYmFjayxcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2s6IHRoaXMuc2V0dGluZ3MucHJvZ3Jlc3NDYWxsYmFjayxcbiAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2s6IHRoaXMuc2V0dGluZ3Muc3RhdGVDaGFuZ2VDYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2s6IHRoaXMuc2V0dGluZ3MuZXJyb3JDYWxsYmFjayxcbiAgICAgIHRpbWVvdXRDYWxsYmFjazogdGhpcy5zZXR0aW5ncy50aW1lb3V0Q2FsbGJhY2ssXG4gICAgfSk7XG4gICAgaWYoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKHRoaXMueGhyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldEF1dGhvcml6YXRpb25IZWFkZXIoKSB7XG4gICAgbGV0IGhlYWRlciA9ICcnO1xuXG4gICAgY29uc3QgaGVhZGVyS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuaGVhZGVycykuc29ydCgpO1xuXG4gICAgY29uc3Qgc2lnbmVkS2V5cyA9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgcmV0dXJuIGFjYyArICc7JyArIHZhbDtcbiAgICB9KTtcblxuICAgIGxldCBjYW5vbmljYWxSZXF1ZXN0ID0gdGhpcy5nZXRDYW5vbmljYWxSZXF1ZXN0KCk7XG4gICAgbGV0IHN0cmluZ1RvU2lnbiA9IHRoaXMuZ2V0U3RyaW5nVG9TaWduKGNhbm9uaWNhbFJlcXVlc3QsIHRoaXMucmVxdWVzdERhdGUpO1xuICAgIGxldCBzaWduYXR1cmUgPSB0aGlzLnNpZ25SZXF1ZXN0KHN0cmluZ1RvU2lnbik7XG5cbiAgICByZXR1cm4gc2lnbmF0dXJlO1xuICB9XG5cbiAgZ2V0Q2Fub25pY2FsUmVxdWVzdCgpIHtcbiAgICBsZXQgcmVxdWVzdCA9IGBcbiAgICAgICR7dGhpcy5zZXR0aW5ncy5tZXRob2QudG9VcHBlckNhc2UoKX1cbiAgICAgIC8ke3V0aWxzLnVyaWVuY29kZSh0aGlzLnNldHRpbmdzLmtleSkucmVwbGFjZSgvJTJGL2csICcvJyl9XG4gICAgYDtcbiAgICByZXF1ZXN0ID0gcmVxdWVzdC50cmltKCkucmVwbGFjZSgvXlxccysvZ20sICcnKSArICdcXG4nO1xuXG4gICAgLy8gcXVlcnlzdHJpbmdcbiAgICByZXF1ZXN0ICs9IE9iamVjdC5rZXlzKFxuICAgICAgdGhpcy5zZXR0aW5ncy5xdWVyeXN0cmluZ1xuICAgICkuc29ydCgpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zZXR0aW5ncy5xdWVyeXN0cmluZ1trZXldO1xuICAgICAgaWYoYWNjKSB7XG4gICAgICAgIHJldHVybiBgJHthY2N9JmFtcDske3V0aWxzLnVyaWVuY29kZShrZXkpfT0ke3ZhbHVlfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYCR7dXRpbHMudXJpZW5jb2RlKGtleSl9PSR7dmFsdWV9YDtcbiAgICAgIH1cbiAgICB9LCAnJyk7XG4gICAgcmVxdWVzdCArPSAnXFxuJztcblxuICAgIC8vIGhlYWRlcnNcbiAgICBjb25zdCBoZWFkZXJLZXlzID0gT2JqZWN0LmtleXModGhpcy5oZWFkZXJzKS5zb3J0KCk7XG4gICAgcmVxdWVzdCArPSBoZWFkZXJLZXlzLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5oZWFkZXJzW2tleV07XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY31cXG4ke2tleS50b0xvd2VyQ2FzZSgpfToke3ZhbHVlLnRyaW0oKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAke2tleS50b0xvd2VyQ2FzZSgpfToke3ZhbHVlLnRyaW0oKX1gO1xuICAgICAgfVxuICAgIH0sICcnKTtcbiAgICByZXF1ZXN0ICs9ICdcXG5cXG4nO1xuXG4gICAgLy8gc2lnbmVkIGhlYWRlcnNcbiAgICByZXF1ZXN0ICs9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgaWYoYWNjKSB7XG4gICAgICAgIHJldHVybiBgJHthY2N9OyR7dmFsLnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICB9LCAnJyk7XG5cbiAgICByZXF1ZXN0ICs9ICdcXG4nO1xuXG4gICAgcmVxdWVzdCArPSAnVU5TSUdORUQtUEFZTE9BRCc7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIGdldFN0cmluZ1RvU2lnbihjYW5vbmljYWxSZXF1ZXN0LCB0aW1lKSB7XG4gICAgcmV0dXJuIGBcbiAgICAgIEFXUzQtSE1BQy1TSEEyNTZcbiAgICAgICR7dXRpbHMuaXNvODYwMSh0aW1lKX1cbiAgICAgICR7XG4gICAgICAgIFtcbiAgICAgICAgICB0aW1lLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgdXRpbHMuemZpbGwodGltZS5nZXRVVENNb250aCgpICsgMSwgMiksXG4gICAgICAgICAgdXRpbHMuemZpbGwodGltZS5nZXRVVENEYXRlKCksIDIpLFxuICAgICAgICAgICcvJyArIHRoaXMuc2V0dGluZ3MuYXV0aC5yZWdpb24gKyAnL3MzL2F3czRfcmVxdWVzdFxcbicsXG4gICAgICAgIF0uam9pbignJylcbiAgICAgIH1cbiAgICAgICR7U0hBMjU2KGNhbm9uaWNhbFJlcXVlc3QucmVwbGFjZSgvJmFtcDsvZywgJyYnKSkudG9TdHJpbmcoKX1cbiAgICBgLnRyaW0oKS5yZXBsYWNlKC9eXFxzKy9nbSwgJycpO1xuICB9XG5cbiAgc2lnblJlcXVlc3Qoc3RyaW5nVG9TaWduKSB7XG4gICAgdmFyIHJlcyA9IEhtYWNTSEEyNTYoXG4gICAgICBzdHJpbmdUb1NpZ24sXG4gICAgICBIZXgucGFyc2UodGhpcy5zZXR0aW5ncy5hdXRoLnNpZ25hdHVyZSlcbiAgICApLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8vIHN0YXRpY1xuICBzdGF0aWMgaW5pdChhdXRoLCBrZXksIGZpbGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIGtleToga2V5LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBxdWVyeXN0cmluZzoge1xuICAgICAgICB1cGxvYWRzOiAnJyxcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICd4LWFtei1hY2wnOiAncHVibGljLXJlYWQnLFxuICAgICAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6IGBhdHRhY2htZW50OyBmaWxlbmFtZT0ke2ZpbGUubmFtZX1gLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogYXV0aC5jb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAgIH0sXG4gICAgICBwYXlsb2FkOiAnJyxcbiAgICAgIGxvYWRDYWxsYmFjazogY2FsbGJhY2ssXG4gICAgfSkuc2VuZCgpO1xuICB9XG5cbiAgc3RhdGljIHVwbG9hZENodW5rKGF1dGgsIGtleSwgdXBsb2FkSWQsIGNodW5rTnVtLFxuICAgICAgICAgICAgICAgICAgICAgY2h1bmssIGNhbGxiYWNrcywgeGhyQ2FsbGJhY2spIHtcbiAgICBsZXQgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2ssIHJlYWR5c3RhdGVDYWxsYmFjaztcbiAgICBpZihjYWxsYmFja3MgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzLmxvYWRDYWxsYmFjaztcbiAgICAgIGVycm9yQ2FsbGJhY2sgPSBjYWxsYmFja3MuZXJyb3JDYWxsYmFjaztcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2sgPSBjYWxsYmFja3MucHJvZ3Jlc3NDYWxsYmFjaztcbiAgICAgIHJlYWR5c3RhdGVDYWxsYmFjayA9IGNhbGxiYWNrcy5zdGF0ZUNoYW5nZUNhbGxiYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayA9IGNhbGxiYWNrcztcbiAgICB9XG4gICAgdmFyIHF1ZXJ5c3RyaW5nID0ge1xuICAgICAgcGFydE51bWJlcjogY2h1bmtOdW0gKyAxLFxuICAgICAgdXBsb2FkSWQsXG4gICAgfTtcbiAgICByZXR1cm4gKG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIGtleToga2V5LFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nOiBxdWVyeXN0cmluZyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgcGF5bG9hZDogY2h1bmssXG4gICAgICBsb2FkQ2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFjazogZXJyb3JDYWxsYmFjayxcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2s6IHByb2dyZXNzQ2FsbGJhY2ssXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiByZWFkeXN0YXRlQ2FsbGJhY2ssXG4gICAgfSkpLnNlbmQoeGhyQ2FsbGJhY2spO1xuICB9XG5cbiAgc3RhdGljIGxpc3QoYXV0aCwgZmlsZSwga2V5LCB1cGxvYWRJZCwgY2h1bmtTaXplLCBjYWxsYmFjayxcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjaywgbWFya2VyKSB7XG4gICAgdmFyIHF1ZXJ5c3RyaW5nID0ge1xuICAgICAgdXBsb2FkSWQsXG4gICAgfTtcbiAgICBpZihtYXJrZXIpIHtcbiAgICAgIHF1ZXJ5c3RyaW5nWydwYXJ0LW51bWJlcuKAiy1tYXJrZXInXSA9IG1hcmtlcjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIGtleToga2V5LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nOiBxdWVyeXN0cmluZyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgcGF5bG9hZDogJycsXG4gICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrLFxuICAgICAgbG9hZENhbGxiYWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgLy8gSS5lLiB0aGUgZmlsZSB3YXMgYWxyZWFkeSB1cGxvYWRlZDsgc3RhcnQgZnJlc2hcbiAgICAgICAgICBpZihlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb2Nlc3MgdGhlIHBhcnRzLCBhbmQgcmV0dXJuIGFuIGFycmF5IG9mXG4gICAgICAgIC8vIFtwYXJ0X251bWJlciwgZXRhZywgc2l6ZV0gdGhyb3VnaCB0aGUgZ2l2ZW4gY2FsbGJhY2tcbiAgICAgICAgdmFyIHhtbCA9IGUudGFyZ2V0LnJlc3BvbnNlWE1MO1xuICAgICAgICB2YXIgcGFydHMgPSBbXTtcbiAgICAgICAgdmFyIHhtbFBhcnRzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdQYXJ0Jyk7XG4gICAgICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwoZmlsZS5zaXplIC8gY2h1bmtTaXplKTtcbiAgICAgICAgbGV0IHRhZ0NvbnRlbnQgPSAodGFnLCBwcm9wKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRhZy5nZXRFbGVtZW50c0J5VGFnTmFtZShwcm9wKVswXS50ZXh0Q29udGVudDtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHhtbFBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHBhcnROdW1iZXIgPSBwYXJzZUludChcbiAgICAgICAgICAgIHRhZ0NvbnRlbnQoeG1sUGFydHNbaV0sICdQYXJ0TnVtYmVyJyksIDEwXG4gICAgICAgICAgKTtcbiAgICAgICAgICB2YXIgZXRhZyA9IHRhZ0NvbnRlbnQoeG1sUGFydHNbaV0sICdFVGFnJyk7XG4gICAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludChcbiAgICAgICAgICAgIHRhZ0NvbnRlbnQoeG1sUGFydHNbaV0sICdTaXplJyksIDEwXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmKHBhcnROdW1iZXIgIT09IG51bUNodW5rcyAmJiBzaXplICE9PSBjaHVua1NpemUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBDaHVuayBjb3JydXB0ZWRcbiAgICAgICAgICB9IGVsc2UgaWYocGFydE51bWJlciA9PT0gbnVtQ2h1bmtzICYmXG4gICAgICAgICAgICAgIHNpemUgIT09IGZpbGUuc2l6ZSAlIGNodW5rU2l6ZSkge1xuICAgICAgICAgICAgY29udGludWU7IC8vIEZpbmFsIGNodW5rIGNvcnJ1cHRlZFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhcnRzLnB1c2goW1xuICAgICAgICAgICAgcGFydE51bWJlcixcbiAgICAgICAgICAgIGV0YWcsXG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc1RydW5jYXRlZCA9IHRhZ0NvbnRlbnQoeG1sLCAnSXNUcnVuY2F0ZWQnKTtcbiAgICAgICAgaWYoaXNUcnVuY2F0ZWQudG9TdHJpbmcoKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgdmFyIHBhcnRNYXJrZXIgPSB0YWdDb250ZW50KHhtbCwgJ05leHRQYXJ0TnVtYmVyTWFya2VyJyk7XG4gICAgICAgICAgQW1hem9uWEhSLmxpc3QoYXV0aCwga2V5LCB1cGxvYWRJZCwgY2h1bmtTaXplLCBmdW5jdGlvbihuZXdQYXJ0cykge1xuICAgICAgICAgICAgY2FsbGJhY2socGFydHMuY29uY2F0KG5ld1BhcnRzKSk7XG4gICAgICAgICAgfSwgZXJyb3JDYWxsYmFjaywgcGFydE1hcmtlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FsbGJhY2socGFydHMpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLnNlbmQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5pc2goYXV0aCwga2V5LCB1cGxvYWRJZCwgcGFydHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHF1ZXJ5c3RyaW5nID0geyB1cGxvYWRJZCB9O1xuXG4gICAgLy8gY29tcG9zZSB0aGUgQ29tcGxldGVNdWx0aXBhcnRVcGxvYWQgcmVxdWVzdCBmb3IgcHV0dGluZ1xuICAgIC8vIHRoZSBjaHVua3MgdG9nZXRoZXJcbiAgICB2YXIgZGF0YSA9ICc8Q29tcGxldGVNdWx0aXBhcnRVcGxvYWQ+JztcblxuICAgIHBhcnRzLm1hcCgoW251bWJlciwgZXRhZ10pID0+IHtcbiAgICAgIGRhdGEgKz0gYFxuICAgICAgICA8UGFydD5cbiAgICAgICAgPFBhcnROdW1iZXI+JHtudW1iZXJ9PC9QYXJ0TnVtYmVyPlxuICAgICAgICA8RVRhZz4ke2V0YWd9PC9FVGFnPlxuICAgICAgICA8L1BhcnQ+XG4gICAgICBgLnRyaW0oKTtcbiAgICB9KTtcbiAgICBkYXRhICs9ICc8L0NvbXBsZXRlTXVsdGlwYXJ0VXBsb2FkPic7XG5cbiAgICAvLyBmaXJlZm94IHJlcXVpcmVzIGEgc21hbGwgaGFja1xuICAgIGlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IgJiZcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgIT09IC0xKSB7XG4gICAgICBkYXRhID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEFtYXpvblhIUih7XG4gICAgICBhdXRoLFxuICAgICAga2V5LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBxdWVyeXN0cmluZyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgcGF5bG9hZDogZGF0YSxcbiAgICAgIGxvYWRDYWxsYmFjazogY2FsbGJhY2ssXG4gICAgfSkuc2VuZCgpO1xuICB9XG59XG4iLCJleHBvcnQgY29uc3QgS0IgPSAxMDI0O1xuZXhwb3J0IGNvbnN0IE1CID0gMTAyNCAqIEtCO1xuZXhwb3J0IGNvbnN0IEdCID0gMTAyNCAqIE1CO1xuZXhwb3J0IGNvbnN0IFNFQ09ORFMgPSAxMDAwOyAvLyAxMDAwbXNcbmV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XG4iLCJpbXBvcnQgeyBERUJVRyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIGlmKCEoREVCVUcgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY29uc29sZS5sb2cgIT09ICd1bmRlZmluZWQnKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhcmdzID0gWydbTXVsZVVwbG9hZGVyXSddO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIH1cbiAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufVxuIiwiaW1wb3J0IFhIUiBmcm9tICcuL3hocic7XG5pbXBvcnQgQW1hem9uWEhSIGZyb20gJy4vYW1hem9uWGhyJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgS0IsIE1CLCBHQiwgU0VDT05EUyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkZXIge1xuICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG5cbiAgICAvLyBNYWtlIHRoZSBpbnB1dCBlbGVtZW50IGFub3RoZXIgcG9zc2libGUgc2V0dGluZ1xuICAgIC8vIGluIHNvbWUgY2FzZXMgKGUuZy4gZHJhZyAmIGRyb3ApIHRoZXJlIGlzIG5vIGlucHV0IGVsZW1lbnRcbiAgICB0aGlzLmlucHV0ID0gc2V0dGluZ3MuZmlsZUlucHV0O1xuICAgIHRoaXMuZmlsZSAgPSBzZXR0aW5ncy5maWxlO1xuXG4gICAgLy8gVGhlIGZpbGUgc3RhcnRzIGF1dG9tYXRpY2FsbHkgYnkgZGVmYXVsdDsgeW91IGhhdmUgdG8gc2V0XG4gICAgLy8gYXV0b3N0YXJ0OiBmYWxzZSBleHBsaWNpdGx5IGlmIHlvdSB3YW50IHRvIHVzZSBhIHN0YXJ0IGJ1dHRvblxuICAgIC8vIGlmIGF1dG9zdGFydCBpcyBmYWxzZSwgeW91IGNhbiB1c2UgdGhlIFVwbG9hZGVyLnByb3RvdHlwZS5zdGFydCgpXG4gICAgLy8gZnVuY3Rpb24uIE5vdGUgdGhhdCB0aGUgdXNlciBoYXMgdG8gc2VsZWN0IGEgZmlsZSBmaXJzdFxuICAgIHNldHRpbmdzLmF1dG9zdGFydCA9ICgnYXV0b3N0YXJ0JyBpbiBzZXR0aW5ncyA/IHNldHRpbmdzLmF1dG9zdGFydCA6IHRydWUpO1xuXG4gICAgLy8gTk9URTogRm9yIEFtYXpvbiBTMywgdGhlIG1pbmltdW0gY2h1bmsgc2l6ZSBpcyA1TUJcbiAgICAvLyB3ZSBhcmUgdXNpbmcgNiBmb3Igc2FmZSBtZWFzdXJlLiBOb3RlIHRoYXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGNodW5rc1xuICAgIC8vIGlzIDEwLDAwMCwgc28gZm9yIGV4YW1wbGUsIGlmIHRoZSBjaHVuayBzaXplIGlzIDZNQiwgdGhlIG1heGltdW1cbiAgICAvLyBwb3NzaWJsZSBmaWxlIHNpemUgaXMgNk1CICogMTAsMDAwID0gfjU4R0JcbiAgICBzZXR0aW5ncy5jaHVua1NpemUgPSBzZXR0aW5ncy5jaHVua1NpemUgfHwgKDYgKiBNQik7IC8vIGRlZmF1bHQgNk1CXG4gICAgc2V0dGluZ3MubWF4U2l6ZSA9IHNldHRpbmdzLm1heFNpemUgfHwgNSAqIEdCOyAvLyA1R0JcblxuICAgIC8vIFRoZSBudW1iZXIgb2YgcGFyYWxsZWwgdXBsb2FkIHhocidzXG4gICAgc2V0dGluZ3MubnVtV29ya2VycyA9IHNldHRpbmdzLm51bVdvcmtlcnMgfHwgNDtcblxuICAgIC8vIFRoZSBTMyBvYmplY3Qga2V5OyBJIHJlY29tbWVuZCB0byBnZW5lcmF0ZSB0aGlzIGR5bmFtaWNhbGx5IChlLmcuXG4gICAgLy8gYSByYW5kb20gc3RyaW5nKSB0byBhdm9pZCB1bndhbnRlZCBvdmVyd3JpdGVzLlxuICAgIHNldHRpbmdzLmtleSA9IHNldHRpbmdzLmtleSB8fCAndGhlX2tleSc7XG5cbiAgICAvLyBUaGUgQW1hem9uIFMzIGJ1Y2tldCB3aGVyZSB5b3UnbGwgc3RvcmUgdGhlIHVwbG9hZHNcbiAgICBzZXR0aW5ncy5idWNrZXQgPSBzZXR0aW5ncy5idWNrZXQ7XG5cbiAgICAvLyBUaGUgQW1hem9uIFMzIGFjY2VzcyBrZXkuIERPIE5PVCBnaXZlIHRoZSBBV1MgU2VjcmV0IGNvZGUhXG4gICAgc2V0dGluZ3MuYWNjZXNzS2V5ID0gc2V0dGluZ3MuYWNjZXNzS2V5O1xuXG4gICAgLy8gVGhlIE1pbWUtVHlwZSBvZiB0aGUgY29udGVudC4gWW91IG11c3QgbWF0Y2ggdGhpcyB3aXRoIHRoZSBiYWNrZW5kIHZhbHVlXG4gICAgLy8gb3IgeW91J2xsIGdldCBhbiBJbnZhbGlkIFNpZ25hdHVyZSBlcnJvci4gSWYgdW5zdXJlIGFib3V0IHRoZVxuICAgIC8vIG1pbWUgdHlwZSwgdXNlIGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxuICAgIHNldHRpbmdzLmNvbnRlbnRUeXBlID0gc2V0dGluZ3MuY29udGVudFR5cGUgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG5cblxuICAgIC8vIEFDTCBjYW4gYmUgc2V0IHRvOlxuICAgIC8vIHByaXZhdGVcbiAgICAvLyBwdWJsaWMtcmVhZCAoKiBkZWZhdWx0KVxuICAgIC8vIHB1YmxpYy1yZWFkLXdyaXRlXG4gICAgLy8gYXV0aGVudGljYXRlZC1yZWFkXG4gICAgLy8gYnVja2V0LW93bmVyLXJlYWRcbiAgICAvLyBidWNrZXQtb3duZXItZnVsbC1jb250cm9sXG4gICAgLy8gbG9nLWRlbGl2ZXJ5LXdyaXRlXG4gICAgc2V0dGluZ3MuYWNsID0gc2V0dGluZ3MuYWNsIHx8ICdwdWJsaWMtcmVhZCc7XG5cbiAgICAvLyBWYXJpb3VzIGNhbGxiYWNrc1xuICAgIHNldHRpbmdzLm9uUHJvZ3Jlc3MgPSBzZXR0aW5ncy5vblByb2dyZXNzICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25DaHVua1Byb2dyZXNzID0gc2V0dGluZ3Mub25DaHVua1Byb2dyZXNzICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vblNlbGVjdCA9IHNldHRpbmdzLm9uU2VsZWN0ICAgICAgICAgICAgICAgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uRXJyb3IgPSBzZXR0aW5ncy5vbkVycm9yICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25Db21wbGV0ZSA9IHNldHRpbmdzLm9uQ29tcGxldGUgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkluaXQgPSBzZXR0aW5ncy5vbkluaXQgICAgICAgICAgICAgICAgICAgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uU3RhcnQgPSBzZXR0aW5ncy5vblN0YXJ0ICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkID0gc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkICAgfHwgZnVuY3Rpb24oKSB7fTtcblxuICAgIC8vIFRoZSBsb2NhdGlvbiBwcmVmaXggb2YgdGhlIHVwbG9hZGVyJ3MgYmFja2VuZFxuICAgIHNldHRpbmdzLmFqYXhCYXNlID0gc2V0dGluZ3MuYWpheEJhc2UgfHwgJy91cGxvYWQtYmFja2VuZCc7XG5cbiAgICAvLyBFeHRlbnNpb25zIGNvbW1hIGRlbGltaXRlZCB3aXRob3V0IHBlcmlvZCAoanBnLGpwZWcscG5nLGdpZilcbiAgICBzZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMgPSBzZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMgfHwgJyc7XG5cbiAgICAvLyBTZXQgdGhlIHZhbHVlcyBzbyB0aGF0IHRoZXkgY2FuIGJlIHVzZWQgZXZlcnl3aGVyZSwgYXMgbmVlZGVkXG4gICAgc2VsZi5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG4gICAgLy8gVGhlIFwid2FpdGluZ1wiIHN0YXRlIG1lYW5zIHRoZSB1cGxvYWRlciBpcyB3YWl0aW5nIGZvciB0aGUgdXNlclxuICAgIC8vIHRvIHNlbGVjdCBhIGZpbGVcbiAgICBzZWxmLnNldFN0YXRlKCd3YWl0aW5nJyk7XG5cbiAgICBpZihzZWxmLmlucHV0KSB7XG4gICAgICBzZWxmLmlucHV0Lm9uY2hhbmdlID0gZnVuY3Rpb24oZSwgZm9yY2UpIHtcbiAgICAgICAgaWYoIXNlbGYuc2V0dGluZ3MuYXV0b3N0YXJ0KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlIGBvbmNoYW5nZWAgZXZlbnQgbWF5IGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcywgc28gd2VcbiAgICAgICAgLy8gbXVzdCBlbnN1cmUgdGhhdCB0aGUgY2FsbGJhY2sgaXMgb25seSBleGVjdXRlZCB0aGUgZmlyc3QgdGltZVxuICAgICAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICd3YWl0aW5nJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSB1cGxvYWRlciBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgdXBsb2FkcyBhdCB0aGlzIHRpbWUsXG4gICAgICAgIC8vIHNvIHdlIGdldCB0aGUgZmlyc3QgZmlsZVxuICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICBzZWxmLnVwbG9hZEZpbGUoZmlsZSwgZm9yY2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciB0aGUgaW5pdCBldmVudCBjYWxsYmFja1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnNldHRpbmdzLm9uSW5pdC5hcHBseShzZWxmKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmZpbGVzICYmIHRoaXMuaW5wdXQuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudXBsb2FkRmlsZSh0aGlzLmlucHV0LmZpbGVzWzBdLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KCdObyBmaWxlIHNlbGVjdGVkJyk7XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkRmlsZShmaWxlLCBmb3JjZSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFRoZSBgb25jaGFuZ2VgIGV2ZW50IG1heSBiZSB0cmlnZ2VyZWQgbXVsdGlwbGUgdGltZXMsIHNvIHdlXG4gICAgLy8gbXVzdCBlbnN1cmUgdGhhdCB0aGUgY2FsbGJhY2sgaXMgb25seSBleGVjdXRlZCB0aGUgZmlyc3QgdGltZVxuICAgIC8vIGFsc28gbWFrZSBzdXJlIHRoZSBmaWxlIGlzIG5vdCBhbHJlYWR5IHNldC5cbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICd3YWl0aW5nJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKGZpbGUpIHtcbiAgICAgIHNlbGYuZmlsZSA9IGZpbGU7XG4gICAgfVxuXG4gICAgaWYoIXNlbGYuZmlsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFdlIHVzZSB0aGUgbGFzdE1vZGlmaWVkRGF0ZSwgdGhlIGZpbGUgbmFtZSBhbmQgc2l6ZSB0byB1bmlxdWVseVxuICAgIC8vIGlkZW50aWZ5IGEgZmlsZS4gVGhlcmUgbWF5IGJlIGZhbHNlIHBvc2l0aXZlcyBhbmQgbmVnYXRpdmVzLFxuICAgIC8vIGJ1dCB0aGUgY2hhbmNlIGZvciBhIGZhbHNlIHBvc2l0aXZlIGlzIGJhc2ljYWxseSB6ZXJvXG4gICAgLy8gc29tZSBicm93c2VycyBkb24ndCByZXBvcnQgdGhlIGxhc3QgbW9kaWZpZWQgZGF0ZSwgc28gd2UgZGVmYXVsdFxuICAgIC8vIHRvIGEgYmxhbmsgZGF0ZVxuICAgIHNlbGYuZmlsZS5sYXN0TW9kaWZpZWREYXRlID0gdGhpcy5maWxlLmxhc3RNb2RpZmllZERhdGUgfHwgbmV3IERhdGUoMCk7XG5cbiAgICBpZihzZWxmLmZpbGUuc2l6ZSA+IHNlbGYuc2V0dGluZ3MubWF4U2l6ZSkge1xuICAgICAgYWxlcnQoW1xuICAgICAgICAnVGhlIG1heGltdW0gYWxsb3dlZCBmaWxlIHNpemUgaXMgJyxcbiAgICAgICAgKHNlbGYuc2V0dGluZ3MubWF4U2l6ZSAvIEdCKSxcbiAgICAgICAgJ0dCLiBQbGVhc2Ugc2VsZWN0IGFub3RoZXIgZmlsZS4nLFxuICAgICAgXS5qb2luKCcnKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGFjY2VwdGVkIGV4dGVuc2lvbnMsIGlmIGFwcGxpY2FibGVcbiAgICBpZihzZWxmLnNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucykge1xuICAgICAgLy8gR2V0IHRoZSBmaWxlIGV4dGVuc2lvblxuICAgICAgdmFyIGZpbGVFeHRlbnNpb24gPSBmaWxlLm5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcblxuICAgICAgLy8gU3BsaXQgdGhlIGdpdmVuIGV4dGVuc2lvbnMgaW50byBhbiBhcnJheVxuICAgICAgdmFyIGV4dGVuc2lvbnNBcnJheSA9IHNlbGYuc2V0dGluZ3MuYWNjZXB0ZWRFeHRlbnNpb25zLnNwbGl0KCcsJyk7XG5cbiAgICAgIC8vIEFuZCBtYXRjaCB0aGUgZXh0ZW5zaW9uIGFnYWluc3QgdGhlIGdpdmVuIGV4dGVuc2lvbiBsaXN0XG4gICAgICB2YXIgZmlsZUFjY2VwdGVkID0gZmFsc2U7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZXh0ZW5zaW9uc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGZpbGVFeHRlbnNpb24gPT09IGV4dGVuc2lvbnNBcnJheVtpXSkge1xuICAgICAgICAgIGZpbGVBY2NlcHRlZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGZpbGUgaXMgbm90IGFjY2VwdGVkLCBub3RpZnkgdGhlIHVzZXIgYW5kIHJldHVyblxuICAgICAgaWYoIWZpbGVBY2NlcHRlZCkge1xuICAgICAgICBhbGVydChbXG4gICAgICAgICAgJ1RoaXMgZmlsZSBmb3JtYXQgaXMgbm90IGFjY2VwdGVkLiAnLFxuICAgICAgICAgICdQbGVhc2UgdXNlIGEgZmlsZSB3aXRoIGFuIGV4dGVuc2lvbiBsaWtlICcsXG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMsXG4gICAgICAgIF0uam9pbignJykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZmlsZSB1cGxvYWRcbiAgICAvLyBhbHNvLCBhbGxvdyB0aGUgbGlicmFyeSB1c2VyIHRvIHByb2dyYW1hdGljYWxseSBjYW5jZWwgdGhlIHVwbG9hZCBpZixcbiAgICAvLyBmb3IgZXhhbXBsZSwgdGhlIGZpbGUgaXMgdG9vIGxhcmdlXG4gICAgY29uc3QgcmVzdWx0ID0gc2VsZi5zZXR0aW5ncy5vblNlbGVjdC5jYWxsKHRoaXMsIGZpbGUpO1xuICAgIGlmKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgIHNlbGYuZmlsZSA9IG51bGw7XG4gICAgICBzZWxmLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuc2V0dGluZ3MuZXh0cmFQYXJhbXMgfHwge30sIHtcbiAgICAgIGZpbGVuYW1lOiBmaWxlLm5hbWUsXG4gICAgICBmaWxlc2l6ZTogZmlsZS5zaXplLFxuICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZERhdGUudmFsdWVPZigpLFxuICAgIH0pO1xuXG4gICAgaWYoZm9yY2UpIHtcbiAgICAgIGFyZ3MuZm9yY2UgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgc2lnbmluZyBrZXkuIEl0IHdpbGwgYWxzbyByZXR1cm5cbiAgICAvLyBhIGZpbGUga2V5ICsgdXBsb2FkSWQgcGFpciBpZiB0aGUgc2VsZWN0ZWQgZmlsZVxuICAgIC8vIGlzIGFscmVhZHkgdXBsb2FkaW5nLiBJdCBhbHNvIHJldHVybnMgYVxuICAgIC8vIGJhY2t1cF9rZXkgaW4gY2FzZSB0aGF0IGZpbGUgdXBsb2FkIGFscmVhZHkgY29tcGxldGVkLlxuICAgIC8vIFRoZSBzaWduaW5nIGtleSBpcyB2YWxpZCBmb3IgNyBkYXlzXG4gICAgWEhSKHtcbiAgICAgIHVybDogc2VsZi5zZXR0aW5ncy5hamF4QmFzZSArICcvc2lnbmluZ19rZXkvJyxcbiAgICAgIGV4dHJhUGFyYW1zOiBhcmdzLFxuICAgICAgbG9hZENhbGxiYWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShlLnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICBqc29uLmRhdGUgPSBuZXcgRGF0ZShqc29uLmRhdGUpO1xuICAgICAgICBzZWxmLmF1dGggPSBqc29uO1xuICAgICAgICBzZWxmLnVwbG9hZElkID0ganNvbi51cGxvYWRJZDtcbiAgICAgICAgc2VsZi5jaHVua3MgPSBqc29uLmNodW5rcztcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5rZXkgPSBqc29uLmtleSB8fCBzZWxmLnNldHRpbmdzLmtleTtcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5iYWNrdXBLZXkgPSBzZWxmLnNldHRpbmdzLmtleTtcblxuICAgICAgICBpZighc2VsZi51cGxvYWRJZCkge1xuICAgICAgICAgIEFtYXpvblhIUi5pbml0KGpzb24sIHNlbGYuc2V0dGluZ3Mua2V5LCBmaWxlLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgeG1sID0gZS50YXJnZXQucmVzcG9uc2VYTUw7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgZ2l2ZW4gdXBsb2FkIGlkXG4gICAgICAgICAgICBzZWxmLnVwbG9hZElkID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdVcGxvYWRJZCcpWzBdLnRleHRDb250ZW50O1xuXG4gICAgICAgICAgICBzZWxmLmxvYWRGaWxlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUmVzdW1lIGEgcHJldml1cyB1cGxvYWRcbiAgICAgICAgICBpZighZm9yY2UpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgdXBsb2FkZWQgcGFydHMgZnJvbSBTM1xuICAgICAgICAgICAgQW1hem9uWEhSLmxpc3QoXG4gICAgICAgICAgICAgIHNlbGYuYXV0aCwgc2VsZi5maWxlLCBzZWxmLnNldHRpbmdzLmtleSxcbiAgICAgICAgICAgICAgc2VsZi51cGxvYWRJZCwgc2VsZi5zZXR0aW5ncy5jaHVua1NpemUsIGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2h1bmsgPSBwYXJ0c1tpXVswXSAtIDE7XG4gICAgICAgICAgICAgICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCBzZWxmLmdldENodW5rU2l6ZShjaHVuaykpO1xuICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaHVua0ZpbmlzaGVkKGNodW5rKTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmssIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBmYWlscywgcmUtaW5pdGlhdGUgdGhlIHVwbG9hZCwgYW5kIGZvcmNlXG4gICAgICAgICAgICAgICAgLy8gaXQgdG8gc3RhcnQgYSBuZXcgdXBsb2FkXG4gICAgICAgICAgICAgICAgc2VsZi51cGxvYWRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5fbG9hZGVkQ2h1bmtzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLl9wcm9ncmVzcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5fdG90YWxQcm9ncmVzcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5fbG9hZGVkQ2h1bmtzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLl91cGxvYWRpbmdDaHVua3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYuX2NodW5rcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXR0aW5ncy5rZXkgPSBzZWxmLnNldHRpbmdzLmJhY2t1cEtleTtcbiAgICAgICAgICAgICAgICBzZWxmLnVwbG9hZEZpbGUoZmlsZSwgdHJ1ZSk7IC8vIEZvcmNlIHJlbG9hZFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBmb3JjZS1zdGFydCB0aGUgdXBsb2FkXG4gICAgICAgICAgICBzZWxmLmxvYWRGaWxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgbG9hZEZpbGUoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gV2UgY2FuJ3Qgc3RhcnQgdGhlIHVwbG9hZCBpZiB3ZSBhcmUgd2FpdGluZyBmb3IgdXNlciBpbnB1dFxuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHdlIG9ubHkgdHJpZ2dlciB0aGUgc3RhcnQgZXZlbnQgb25jZVxuICAgIGlmKCFzZWxmLl9zdGFydEZpcmVkKSB7XG4gICAgICAvLyBUcmlnZ2VyIHRoZSBzdGFydCBldmVudCBjYWxsYmFja1xuICAgICAgc2VsZi5zZXR0aW5ncy5vblN0YXJ0LmNhbGwoc2VsZiwgc2VsZi5maWxlKTtcblxuICAgICAgLy8gQW5kIGFsc28gdHJpZ2dlciBhIHByb2dyZXNzIGNhbGxiYWNrIHdpdGggMCVcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKHNlbGYsIDAsIHNlbGYuZmlsZS5zaXplKTtcbiAgICAgIHNlbGYuX3N0YXJ0RmlyZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZyb20gbm93IG9uLCB3ZSBhcmUgXCJwcm9jZXNzaW5nXCIgdGhlIGZpbGUgdXBsb2FkXG4gICAgc2VsZi5zZXRTdGF0ZSgncHJvY2Vzc2luZycpO1xuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBtYXkgaGF2ZSBzb21lIGNodW5rcyBhbHJlYWR5IHVwbG9hZGVkLFxuICAgIC8vIFNvIHdlIG1heSB0cmlnZ2VyIGEgcHJvZ3Jlc3MgY2FsbGJhY2sgd2l0aCB0aGUgcmVwb3J0ZWQgcHJvZ3Jlc3NcbiAgICBzZWxmLnNldHRpbmdzLm9uUHJvZ3Jlc3MuY2FsbChcbiAgICAgIHNlbGYsIHNlbGYuZ2V0VG90YWxQcm9ncmVzcygpLCBzZWxmLmZpbGUuc2l6ZVxuICAgICk7XG5cbiAgICAvLyBHZXQgdGhlIG5leHQgY2h1bmtcbiAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcblxuICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgIC8vIEFuZCBzdGFydCB1cGxvYWRpbmcgaXRcbiAgICAgIHNlbGYudXBsb2FkQ2h1bmsobmV4dENodW5rKTtcbiAgICB9IGVsc2UgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAvLyBJZiB3ZSBmaW5pc2hlZCwgdHJpZ2dlciB0aGUgdXBsb2FkIGZpbmlzaCBzZXF1ZW5jZVxuICAgICAgbG9nKCdBbGwgZG9uZTsgZmluaXNoIHVwbG9hZCcpO1xuICAgICAgc2VsZi5maW5pc2hVcGxvYWQoKTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zZXR0aW5ncy5udW1Xb3JrZXJzIC0gMTsgaSsrKSB7XG4gICAgICBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgaWYobmV4dENodW5rICE9PSAtMSkge1xuICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGxvYWRDaHVuayhjaHVuaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSdyZSBpbiBwcm9jZXNzaW5nIG1vZGVcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgbG9nKCdOT1QgcHJvY2Vzc2luZzsgcmV0dXJuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWxzbyBtYWtlIHN1cmUgd2UncmUgbm90IGFscmVhZHkgdXBsb2FkaW5nIHRoaXMgY2h1bmtcbiAgICBpZihzZWxmLmdldENodW5rVXBsb2FkaW5nKGNodW5rKSkge1xuICAgICAgbG9nKCdBbHJlYWR5IFVwbG9hZGluZycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKHNlbGYuZ2V0TmV4dENodW5rKCkpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTWFyayB0aGlzIGNodW5rIGFzIHVwbG9hZGluZ1xuICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuayk7XG4gICAgfVxuICAgIGxvZyhgVXBsb2FkaW5nIENodW5rOiAke2NodW5rfWApO1xuXG4gICAgLy8gSWYgd2UgYWxyZWFkeSB1cGxvYWRlZCB0aGlzIGNodW5rLCBnZXQgdG8gdGhlIG5leHQgb25lXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbmV4dCBjaHVuaywgZmluaXNoIHRoZSB1cGxvYWRcbiAgICBpZihzZWxmLmlzQ2h1bmtMb2FkZWQoY2h1bmspKSB7XG4gICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgbG9nKCdObyBuZXh0IGNodW5rOyBmaW5pc2ggdXBsb2FkJyk7XG4gICAgICAgICAgc2VsZi5maW5pc2hVcGxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZTtcblxuICAgIC8vIEdldCB0aGUgc3RhcnQgYW5kIGVuZCBieXRlcyBmb3IgdGhlIG5lZWRlZCBjaHVua1xuICAgIHZhciBzdGFydCA9IGNodW5rICogbGVuZ3RoO1xuICAgIHZhciBlbmQgPSBNYXRoLm1pbihzdGFydCArIGxlbmd0aCwgc2VsZi5maWxlLnNpemUpO1xuXG4gICAgLy8gV2UgbmVlZCB0aGUgbGFzdCBwcm9ncmVzcyB0aW1lIGluIG9yZGVyIHRvIGRldGVjdCBoYW5naW5nXG4gICAgLy8gdXBsb2Fkc1xuICAgIHZhciBsYXN0UHJvZ3Jlc3NUaW1lID0gbmV3IERhdGUoKTtcbiAgICBzZWxmLl9pbnRlcnZhbHMgPSBzZWxmLl9pbnRlcnZhbHMgfHwge307XG5cblxuICAgIC8vIFRoZSBcInJlYWR5c3RhdGVjaGFuZ2VcIiBoYW5kbGVyXG4gICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBXZSBjYXJlIGFib3V0IHRoZSBcImRvbmVcIiBldmVudCB0cmlnZ2VyZWQgd2hpbGUgcHJvY2Vzc2luZ1xuICAgICAgaWYoZS50YXJnZXQucmVhZHlTdGF0ZSAhPT0gdGhpcy5ET05FIHx8XG4gICAgICAgICAgc2VsZi5nZXRTdGF0ZSgpICE9PSAncHJvY2Vzc2luZycpIHtcbiAgICAgICAgbG9nKGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGRvbid0IHJlY2VpdmUgYSAyWFggcmVzcG9uc2UsIHRyaWdnZXIgYW4gZXJyb3JcbiAgICAgIGlmKHBhcnNlSW50KGUudGFyZ2V0LnN0YXR1cykgLyAxMDAgIT09IDIpIHtcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcigpO1xuICAgICAgfVxuXG4gICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBrbm93IHRoYXQgdGhpcyBjaHVuayBmaW5pc2hlZCB1cGxvYWRpbmdcbiAgICAgIGxvZyhgQ2h1bmsgdXBsb2FkZWQ6ICR7Y2h1bmt9YCk7XG5cbiAgICAgIC8vIE5vdGlmeSB0aGUgc2VydmVyIG9mIHRoZSB1cGxvYWRlZCBjaHVua1xuICAgICAgc2VsZi5ub3RpZnlDaHVua1VwbG9hZGVkKGNodW5rKTtcblxuICAgICAgLy8gQW5kIGFsc28gdHJpZ2dlciB0aGUgY2h1bmtfdXBsb2FkZWQgY2FsbGJhY2tcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkLmNhbGwoc2VsZiwgY2h1bmspO1xuXG4gICAgICAvLyBDYW5jZWwgdGhlIHhociB3YXRjaGVyIGludGVydmFsXG4gICAgICBjbGVhckludGVydmFsKHNlbGYuX2ludGVydmFsc1tjaHVua10pO1xuXG4gICAgICAvLyBNYXJrIHRoZSBjaHVuayBhcyBmaW5pc2hlZFxuICAgICAgc2VsZi5zZXRQcm9ncmVzcyhjaHVuaywgc2VsZi5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgICAgIHNlbGYuc2V0Q2h1bmtGaW5pc2hlZChjaHVuayk7XG4gICAgICBzZWxmLnNldENodW5rVXBsb2FkaW5nKGNodW5rLCBmYWxzZSk7XG5cbiAgICAgIC8vIEdldCBuZXh0IGNodW5rOyBpZiB3ZSdyZSBvdXQgb2YgY2h1bmtzLFxuICAgICAgLy8gZmluaXNoIHRoZSB1cGxvYWRcbiAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgaWYobmV4dENodW5rICE9PSAtMSkge1xuICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICB9IGVsc2UgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgIGxvZygnRG9uZScpO1xuICAgICAgICBzZWxmLmZpbmlzaFVwbG9hZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgICAgICBpZihjaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhjaHVuayk7XG4gICAgICAgICAgfSBlbHNlIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICBzZWxmLmZpbmlzaFVwbG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFRoZSB1cGxvYWQgcHJvZ3Jlc3MgaGFuZGxlclxuICAgIHZhciBwcm9ncmVzc0hhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBTZXQgdGhlIGludGVybmFsIGNodW5rJ3MgcHJvZ3Jlc3MgdmFsdWUgdG8gdGhlIHJlcG9ydGVkIGFtb3VudFxuICAgICAgc2VsZi5zZXRQcm9ncmVzcyhjaHVuaywgZS5sb2FkZWQpO1xuXG4gICAgICAvLyBUcmlnZ2VyIHRoZSBwcm9ncmVzcyBldmVudCBjYWxsYmFja1xuICAgICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICAgIHNlbGYsIHNlbGYuZ2V0VG90YWxQcm9ncmVzcygpLCBzZWxmLmZpbGUuc2l6ZVxuICAgICAgKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBsYXN0X3Byb2dyZXNzX3RpbWUgZm9yIHRoZSB3YXRjaGVyIGludGVydmFsXG4gICAgICBsYXN0UHJvZ3Jlc3NUaW1lID0gbmV3IERhdGUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGVycm9ySGFuZGxlZCA9IGZhbHNlO1xuICAgIHZhciBlcnJvckhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlcnJvckFyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciB4aHIgPSB0aGlzO1xuICAgICAgLy8gVGhlIHVwbG9hZCBtYXkgaGF2ZSBmaW5pc2hlZCwgc28gY2hlY2sgZm9yIHRoYXRcbiAgICAgIHNlbGYuY2hlY2tBbHJlYWR5VXBsb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIElmIGFscmVhZHkgdXBsb2FkZWRcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSgnZmluaXNoZWQnKTtcblxuICAgICAgICBzZWxmLm5vdGlmeVVwbG9hZEZpbmlzaGVkKCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBhIGZpbmFsIHByb2dyZXNzIGV2ZW50IGNhbGxiYWNrLCB3aXRoIDEwMCVcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoc2VsZiwgc2VsZi5maWxlLnNpemUsIHNlbGYuZmlsZS5zaXplKTtcblxuICAgICAgICAvLyBBbHNvIHRyaWdnZXIgdGhlIGNvbXBsZXRlIGV2ZW50IGNhbGxiYWNrXG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Db21wbGV0ZS5jYWxsKHNlbGYpO1xuICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgYSBnZW51aW5lIGVycm9yXG4gICAgICAgIGxvZyhgRXJyb3I6ICR7ZXJyb3JBcmd1bWVudHN9YCk7XG5cbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIGRvbid0IGhhbmRsZSB0aGUgc2FtZSBlcnJvciBtb3JlIHRoYW4gb25jZVxuICAgICAgICBpZihlcnJvckhhbmRsZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JIYW5kbGVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBhYm9ydCB0aGUgY2h1bmsgdXBsb2FkXG4gICAgICAgIHNlbGYuc2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmssIGZhbHNlKTtcbiAgICAgICAgc2VsZi5zZXRDaHVua0ZpbmlzaGVkKGNodW5rLCBmYWxzZSk7XG4gICAgICAgIHNlbGYuc2V0UHJvZ3Jlc3MoY2h1bmssIDApO1xuICAgICAgICBsb2coJ0Fib3J0Jyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIGxvZyhlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZyhgUmV0cnkgY2h1bms6ICR7Y2h1bmt9YCk7XG5cbiAgICAgICAgLy8gQ2xlYXIgdGhlIHdhdGNoZXIgaW50ZXJ2YWxcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLl9pbnRlcnZhbHNbY2h1bmtdKTtcblxuICAgICAgICAvLyBSZS10cnkgdGhlIHVwbG9hZFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSA9PT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgICAgICAvLyBBbmQgcHJvY2VlZFxuICAgICAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKGNodW5rKTtcbiAgICAgICAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgQW1hem9uWEhSLnVwbG9hZENodW5rKFxuICAgICAgc2VsZi5hdXRoLCBzZWxmLnNldHRpbmdzLmtleSwgc2VsZi51cGxvYWRJZCxcbiAgICAgIGNodW5rLCBzZWxmLmZpbGUuc2xpY2Uoc3RhcnQsIGVuZCksIHtcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogcHJvZ3Jlc3NIYW5kbGVyLFxuICAgICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiBoYW5kbGVyLFxuICAgICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckhhbmRsZXIsXG4gICAgICAgIHRpbWVvdXRDYWxsYmFjazogZXJyb3JIYW5kbGVyLFxuICAgICAgfSwgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIHNlbGYuX2NodW5rWGhyID0gc2VsZi5fY2h1bmtYaHIgfHwgW107XG4gICAgICAgIHNlbGYuX2NodW5rWGhyLnB1c2goeGhyKTtcblxuICAgICAgICAvLyBUaGUgd2F0Y2hlciBpbnRlcnZhbDsgaXQgY2FuY2VscyB0aGUgeGhyIGlmIGl0IHRpbWVzIG91dFxuICAgICAgICBzZWxmLl9pbnRlcnZhbHNbY2h1bmtdID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYobGFzdFByb2dyZXNzVGltZSAmJlxuICAgICAgICAgICAgICAobmV3IERhdGUoKSAtIGxhc3RQcm9ncmVzc1RpbWUpID4gMTUgKiBTRUNPTkRTKSB7IC8vIDE1c1xuICAgICAgICAgICAgbG9nKCdDaHVuayBGYWlsZWQ7IHJldHJ5Jyk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHNlbGYuX2ludGVydmFsc1tjaHVua10pO1xuICAgICAgICAgICAgaWYoc2VsZi5nZXRTdGF0ZSgpID09PSAncHJvY2Vzc2luZycpIHtcbiAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgIGVycm9ySGFuZGxlci5jYWxsKHhocik7XG4gICAgICAgICAgICAgIHNlbGYuX2NodW5rWGhyW3RoaXMuX2NodW5rWGhyLmluZGV4T2YoeGhyKV0gPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgNCAqIFNFQ09ORFMpOyAvLyBFdmVyeSA0c1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBmaW5pc2hVcGxvYWQoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gTWFrZSBzdXJlIGl0J3Mgbm90IHRyaWdnZXJlZCB3aGVuIG5vdCBwcm9jZXNzaW5nIChlLmcuIG11bHRpcGxlIHRpbWVzKVxuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hhbmdlIHRoZSB1cGxvYWQncyBzdGF0ZVxuICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGluZycpO1xuXG4gICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICBzZWxmLCBzZWxmLmZpbGUuc2l6ZSwgc2VsZi5maWxlLnNpemVcbiAgICApOyAvLyAxMDAlIGRvbmUuXG5cblxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgLy8gSS5lLiBpZiBpdCdzIGEgMlhYIHJlc3BvbnNlXG4gICAgICBpZihwYXJzZUludChlLnRhcmdldC5zdGF0dXMgLyAxMDApID09PSAyKSB7XG4gICAgICAgIGxvZygnRmluaXNoZWQgZmlsZS4nKTtcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSgnZmluaXNoZWQnKTtcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICAgICAgc2VsZiwgc2VsZi5maWxlLnNpemUsIHNlbGYuZmlsZS5zaXplXG4gICAgICAgICk7IC8vIEl0J3MgMTAwJSBkb25lXG5cbiAgICAgICAgLy8gVHJpZ2dlciB0aGUgY29tcGxldGUgZXZlbnQgY2FsbGJhY2tcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNvbXBsZXRlLmNhbGwoc2VsZik7XG4gICAgICB9IGVsc2UgaWYoZS50YXJnZXQuc3RhdHVzID09PSA0MDAgJiZcbiAgICAgICAgICBlLnRhcmdldC5yZXNwb25zZVRleHQuaW5kZXhPZignRW50aXR5VG9vU21hbGwnKSAhPT0gLTEpIHtcbiAgICAgICAgLy8gQW4gXCJFbnRpdHlUb29TbWFsbFwiIGVycm9yIG1lYW5zIHRoYXQgd2UgbWlzc2VkIGEgY2h1bmtcbiAgICAgICAgQW1hem9uWEhSLmxpc3QoXG4gICAgICAgICAgc2VsZi5hdXRoLCBzZWxmLmZpbGUsIHNlbGYuc2V0dGluZ3Mua2V5LFxuICAgICAgICAgIHNlbGYudXBsb2FkSWQsIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplLFxuICAgICAgICAgIGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNodW5rcyhwYXJ0cyk7XG4gICAgICAgICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoJ3Byb2Nlc3NpbmcnKTtcbiAgICAgICAgICAgIHNlbGYudXBsb2FkQ2h1bmsobmV4dENodW5rKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYoZS50YXJnZXQuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgLy8gNDA0ID0gTm9TdWNoVXBsb2FkID0gY2hlY2sgaWYgYWxyZWFkeSBmaW5pc2hlZFxuICAgICAgICAvLyBJZiBzbywgc3RhcnQgYSBuZXcgdXBsb2FkXG4gICAgICAgIHNlbGYuY2FuY2VsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYudXBsb2FkRmlsZShzZWxmLmZpbGUsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuY2hlY2tBbHJlYWR5VXBsb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBoYW5kbGVyKHtcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBBbWF6b25YSFIubGlzdChcbiAgICAgIHNlbGYuYXV0aCwgc2VsZi5maWxlLCBzZWxmLnNldHRpbmdzLmtleSxcbiAgICAgIHNlbGYudXBsb2FkSWQsIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplLFxuICAgICAgZnVuY3Rpb24ocGFydHMpIHtcbiAgICAgICAgdmFyIG51bUNodW5rcyA9IE1hdGguY2VpbChzZWxmLmZpbGUuc2l6ZSAvIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplKTtcblxuICAgICAgICAvLyBDaGVjayB0aGF0IHdlIHVwbG9hZGVkIGFsbCB0aGUgY2h1bmtzOyBpZiB3ZSBkaWRuJ3QsXG4gICAgICAgIC8vIHN0YXJ0IHVwbG9hZGluZyB0aGUgbWlzc2luZyBvbmVzXG4gICAgICAgIGlmKHBhcnRzLmxlbmd0aCAhPT0gbnVtQ2h1bmtzKSB7XG4gICAgICAgICAgc2VsZi51cGRhdGVDaHVua3MocGFydHMpO1xuICAgICAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgICAgIHNlbGYuc2V0U3RhdGUoJ3Byb2Nlc3NpbmcnKTtcbiAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgQW1hem9uWEhSLmZpbmlzaChcbiAgICAgICAgICBzZWxmLmF1dGgsIHNlbGYuc2V0dGluZ3Mua2V5LCBzZWxmLnVwbG9hZElkLCBwYXJ0cywgaGFuZGxlclxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBub3RpZnlDaHVua1VwbG9hZGVkKGNodW5rKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBrZXkgPSBzZWxmLnNldHRpbmdzLmtleTtcbiAgICB2YXIgdXBsb2FkSWQgPSBzZWxmLnVwbG9hZElkO1xuICAgIHZhciB1cmwgPSBgJHtzZWxmLnNldHRpbmdzLmFqYXhCYXNlfS9jaHVua19sb2FkZWQvYDtcblxuICAgIHZhciBhcmdzID0gT2JqZWN0LmFzc2lnbihzZWxmLnNldHRpbmdzLmV4dHJhUGFyYW1zIHx8IHt9LCB7XG4gICAgICBjaHVuayxcbiAgICAgIGtleSxcbiAgICAgIHVwbG9hZElkLFxuICAgICAgZmlsZW5hbWU6IHNlbGYuZmlsZS5uYW1lLFxuICAgICAgZmlsZXNpemU6IHNlbGYuZmlsZS5zaXplLFxuICAgICAgbGFzdE1vZGlmaWVkOiBzZWxmLmZpbGUubGFzdE1vZGlmaWVkRGF0ZS52YWx1ZU9mKCksXG4gICAgfSk7XG5cbiAgICBYSFIoe1xuICAgICAgdXJsLFxuICAgICAgZXh0cmFQYXJhbXM6IGFyZ3MsXG4gICAgfSk7XG4gIH1cblxuICBjaGVja0FscmVhZHlVcGxvYWRlZChjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbWV0aG9kID0gJ0hFQUQnO1xuICAgIHZhciBwYXRoID0gYC8ke3NlbGYuc2V0dGluZ3Mua2V5fWA7XG4gICAgdmFyIGlubmVySGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIFRoZSBoYW5kbGVyIG9ubHkgY2hlY2tzIGZvciBzdGF0dXMgY29kZTtcbiAgICAgIC8vIGlmIHRoZSBIRUFEIHJldHVybnMgNDA0LCByZS11cGxvYWQsXG4gICAgICAvLyBlbHNlLCBpdCByZXR1cm5zIDIwMCBhbmQgZmluaXNoIHRoZSB1cGxvYWRcbiAgICAgIGlmKHBhcnNlSW50KGUudGFyZ2V0LnN0YXR1cyAvIDEwMCkgPT09IDIpIHtcbiAgICAgICAgbG9nKCdBbHJlYWR5IFVwbG9hZGVkJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2coJ0Vycm9yIScpO1xuICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmKCFlcnJvckNhbGxiYWNrICYmIHR5cGVvZihlcnJvckNhbGxiYWNrKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmNoZWNrQWxyZWFkeVVwbG9hZGVkKGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSwgMjUwMCk7XG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgY29uc3QgcmVnaW9uU3RyaW5nID0gdXRpbC5yZWdpb25TdHJpbmcoc2VsZi5zZXR0aW5ncy5hdXRoLnJlZ2lvbik7XG4gICAgY29uc3QgcHJvdG9jb2wgPSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICBjb25zdCBidWNrZXQgPSBzZWxmLnNldHRpbmdzLmF1dGguYnVja2V0O1xuICAgIHZhciBob3N0ID0gYHMzJHtyZWdpb25TdHJpbmd9LmFtYXpvbmF3cy5jb21gO1xuICAgIHZhciB1cmwgPSBgJHtwcm90b2NvbH0vLyR7aG9zdH0vJHtidWNrZXR9LyR7cGF0aH1gO1xuICAgIFhIUih7XG4gICAgICB1cmwsXG4gICAgICBtZXRob2QsXG4gICAgICBsb2FkQ2FsbGJhY2s6IGlubmVySGFuZGxlcixcbiAgICAgIGVycm9yQ2FsbGJhY2s6IGVycm9yQ2FsbGJhY2ssXG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWwoY2FsbGJhY2spIHtcbiAgICAvLyBFbXB0eSBhbGwgZmllbGRzLCBjYW5jZWwgYWxsIGludGVydmFscywgYWJvcnQgYWxsIHhocidzXG4gICAgdGhpcy5fY2h1bmtYaHIubWFwKChjaHVuaykgPT4ge1xuICAgICAgbG9nKGBBYm9ydCBjaHVuazogJHtjaHVua31gKTtcbiAgICAgIGNodW5rLmFib3J0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5faW50ZXJ2YWxzID0gdGhpcy5faW50ZXJ2YWxzIHx8IHt9O1xuICAgIGZvcihsZXQga2V5IGluIHRoaXMuX2ludGVydmFscykge1xuICAgICAgaWYodGhpcy5faW50ZXJ2YWxzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbHNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICB0aGlzLnNldFN0YXRlKCdjYW5jZWxlZCcpO1xuICAgIHRoaXMuX2NodW5rWGhyID0gdGhpcy5fY2h1bmtYaHIgfHwgW107XG4gICAgdGhpcy5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwodGhpcywgMCwgMCk7XG4gICAgdGhpcy5fY2h1bmtYaHIgPSBudWxsO1xuICAgIHRoaXMuX2NodW5rcyA9IG51bGw7XG4gICAgdGhpcy5fdXBsb2FkaW5nQ2h1bmtzID0gbnVsbDtcbiAgICB0aGlzLl9sb2FkZWRDaHVua3MgPSBudWxsO1xuICAgIHRoaXMuX3N0YXJ0RmlyZWQgPSBmYWxzZTtcbiAgICB0aGlzLnVwbG9hZElkID0gbnVsbDtcbiAgICB0aGlzLl9wcm9ncmVzcyA9IG51bGw7XG4gICAgdGhpcy5zZXRTdGF0ZSgnd2FpdGluZycpOyAvLyB3YWl0IGZvciBhIG5ldyB1cGxvYWRcbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgdXBkYXRlQ2h1bmtzKHBhcnRzKSB7XG4gICAgdmFyIGxvYWRlZCA9IFtdO1xuICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwodGhpcy5maWxlLnNpemUgLyB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZSk7XG5cbiAgICB0aGlzLl9pbml0Q2h1bmtzKHRydWUpO1xuICAgIHRoaXMuX3VwbG9hZGluZ0NodW5rcyA9IFtdO1xuICAgIHRoaXMuX2xvYWRlZENodW5rcyA9IFtdO1xuXG4gICAgcGFydHMubWFwKChwYXJ0KSA9PiB7XG4gICAgICB2YXIgcGFydE51bWJlciA9IHBhcnNlSW50KHBhcnRbMF0sIDEwKTtcbiAgICAgIHRoaXMuYWRkTG9hZGVkQ2h1bmsocGFydE51bWJlciAtIDEpO1xuICAgICAgdGhpcy5zZXRDaHVua0ZpbmlzaGVkKHBhcnROdW1iZXIgLSAxKTtcbiAgICAgIGxvYWRlZC5wdXNoKHBhcnROdW1iZXIgLSAxKTtcbiAgICB9KTtcblxuICAgIGZvcihsZXQgY2h1bmtOdW0gPSAwOyBjaHVua051bSA8IG51bUNodW5rczsgY2h1bmtOdW0rKykge1xuICAgICAgaWYobG9hZGVkLmluZGV4T2YoY2h1bmtOdW0pID09PSAtMSkge1xuICAgICAgICBsb2coYENodW5rIG5vdCB1cGxvYWRlZDogJHtjaHVua051bX1gKTtcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhjaHVua051bSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNTZWxlY3RlZCgpIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbGU7XG4gIH1cblxuICBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdGU7XG4gIH1cblxuICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgc2V0UHJvZ3Jlc3MoY2h1bmssIGxvYWRlZCkge1xuICAgIHRoaXMuX3Byb2dyZXNzID0gdGhpcy5fcHJvZ3Jlc3MgfHwge307XG4gICAgdGhpcy5fdG90YWxQcm9ncmVzcyA9ICh0aGlzLl90b3RhbFByb2dyZXNzIHx8IDApICtcbiAgICAgIGxvYWRlZCAtICh0aGlzLl9wcm9ncmVzc1tjaHVua10gfHwgMCk7XG4gICAgdGhpcy5fcHJvZ3Jlc3NbY2h1bmtdID0gbG9hZGVkO1xuICAgIHRoaXMuc2V0dGluZ3Mub25DaHVua1Byb2dyZXNzLmNhbGwoXG4gICAgICB0aGlzLCBjaHVuaywgbG9hZGVkLCB0aGlzLmdldENodW5rU2l6ZShjaHVuaykpO1xuICB9XG5cbiAgZ2V0VG90YWxQcm9ncmVzcygpIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxQcm9ncmVzcyB8fCAwO1xuICB9XG5cbiAgaXNDaHVua0xvYWRlZChjaHVuaykge1xuICAgIHRoaXMuX2xvYWRlZENodW5rcyA9IHRoaXMuX2xvYWRlZENodW5rcyB8fCBbXTtcbiAgICByZXR1cm4gdGhpcy5fbG9hZGVkQ2h1bmtzLmluZGV4T2YoY2h1bmspICE9PSAtMTtcbiAgfVxuXG4gIGFkZExvYWRlZENodW5rKGNodW5rKSB7XG4gICAgdGhpcy5fbG9hZGVkQ2h1bmtzID0gdGhpcy5fbG9hZGVkQ2h1bmtzIHx8IFtdO1xuICAgIHRoaXMuX2xvYWRlZENodW5rcy5wdXNoKGNodW5rKTtcbiAgICB0aGlzLnNldFByb2dyZXNzKGNodW5rLCB0aGlzLmdldENodW5rU2l6ZShjaHVuaykpO1xuICB9XG5cbiAgZ2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmspIHtcbiAgICB0aGlzLl91cGxvYWRpbmdDaHVua3MgPSB0aGlzLl91cGxvYWRpbmdDaHVua3MgfHwgW107XG4gICAgcmV0dXJuIHRoaXMuX3VwbG9hZGluZ0NodW5rcy5pbmRleE9mKGNodW5rKSAhPT0gLTE7XG4gIH1cblxuICBzZXRDaHVua1VwbG9hZGluZyhjaHVuaywgdmFsKSB7XG4gICAgaWYodHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX3VwbG9hZGluZ0NodW5rcyA9IHRoaXMuX3VwbG9hZGluZ0NodW5rcyB8fCBbXTtcbiAgICBpZih2YWwpIHtcbiAgICAgIHRoaXMuX3VwbG9hZGluZ0NodW5rcy5wdXNoKGNodW5rKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGlkeDtcbiAgICAgIHdoaWxlKHRydWUpIHtcbiAgICAgICAgaWR4ID0gdGhpcy5fdXBsb2FkaW5nQ2h1bmtzLmluZGV4T2YoY2h1bmspO1xuICAgICAgICBpZihpZHggPT09IC0xKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBsb2FkaW5nQ2h1bmtzLnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9pbml0Q2h1bmtzKGZvcmNlKSB7XG4gICAgaWYoIXRoaXMuX2NodW5rcyB8fCBmb3JjZSkge1xuICAgICAgdGhpcy5fY2h1bmtzID0gW107XG4gICAgICB2YXIgbnVtQ2h1bmtzID0gTWF0aC5jZWlsKHRoaXMuZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemUpO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG51bUNodW5rczsgaSsrKSB7XG4gICAgICAgIHRoaXMuX2NodW5rcy5wdXNoKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRDaHVua0ZpbmlzaGVkKGNodW5rLCB2YWwpIHtcbiAgICBpZih0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFsID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIHRoaXMuX2NodW5rc1tjaHVua10gPSAhIXZhbDtcbiAgfVxuXG4gIGdldE5leHRDaHVuayhjaHVuaykge1xuICAgIHRoaXMuX2luaXRDaHVua3MoKTtcbiAgICBpZihjaHVuayAmJiAhdGhpcy5fY2h1bmtzW2NodW5rXSAmJiAhdGhpcy5nZXRDaHVua0NwbG9hZGluZyhjaHVuaykpIHtcbiAgICAgIHJldHVybiBjaHVuaztcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2NodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoIXRoaXMuX2NodW5rc1tpXSAmJiAhdGhpcy5nZXRDaHVua1VwbG9hZGluZyhpKSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgdXBsb2FkRmluaXNoZWQoKSB7XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9jaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKCF0aGlzLl9jaHVua3NbaV0gfHwgdGhpcy5nZXRDaHVua1VwbG9hZGluZyhpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNMYXN0Q2h1bmsoY2h1bmspIHtcbiAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMuZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemUpIC0gMSA9PT0gY2h1bms7XG4gIH1cblxuICBnZXRDaHVua1NpemUoY2h1bmspIHtcbiAgICBpZih0aGlzLmlzTGFzdENodW5rKGNodW5rKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZS5zaXplICUgdGhpcy5zZXR0aW5ncy5jaHVua1NpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZTtcbiAgICB9XG4gIH1cblxuICBvbkNodW5rUHJvZ3Jlc3MoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25DaHVua1Byb2dyZXNzID0gZjtcbiAgfVxuXG4gIG9uUHJvZ3Jlc3MoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Qcm9ncmVzc3JvZ3Jlc3MgPSBmO1xuICB9XG5cbiAgb25TZWxlY3QoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25TZWxlY3QgPSBmO1xuICB9XG5cbiAgb25FcnJvcihmKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkVycm9yID0gZjtcbiAgfVxuXG4gIG9uQ29tcGxldGUoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Db21wbGV0ZSA9IGY7XG4gIH1cblxuICBvbkluaXQoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Jbml0ID0gZjtcbiAgfVxuXG4gIG9uU3RhcnQoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25TdGFydCA9IGY7XG4gIH1cblxuICBvbkNodW5rVXBsb2FkZWQoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkID0gZjtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgcmVnaW9uU3RyaW5nKHJlZ2lvbikge1xuICAgIC8vIEdpdmVuIGFuIEFXUyByZWdpb24sIGl0IGVpdGhlciByZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBmb3JcbiAgICAvLyBVUy1iYXNlZCByZWdpb25zIG9yIHRoZSByZWdpb24gbmFtZSBwcmVjZWRlZCBieSBhIGRhc2ggZm9yIG5vbi1VUy1iYXNlZFxuICAgIC8vIHJlZ2lvbnMuXG4gICAgLy8gU2VlIHRoaXMgZm9yIG1vcmUgZGV0YWlsczpcbiAgICAvLyBodHRwOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25TMy9sYXRlc3QvZGV2L1ZpcnR1YWxIb3N0aW5nLmh0bWxcbiAgICBpZihyZWdpb24gJiYgcmVnaW9uLnNsaWNlKDAsIDIpICE9PSAndXMnKSB7XG4gICAgICByZXR1cm4gJy0nICsgcmVnaW9uO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgc3RhdGljIHpmaWxsKHN0ciwgbnVtKSB7XG4gICAgbGV0IHplcm9zID0gJyc7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICB6ZXJvcyArPSAnMCc7XG4gICAgfVxuXG4gICAgcmV0dXJuICh6ZXJvcyArIHN0cikuc3Vic3RyKC1NYXRoLm1heChudW0sIHN0ci50b1N0cmluZygpLmxlbmd0aCkpO1xuICB9XG4gIHN0YXRpYyB1cmllbmNvZGUoc3RyaW5nKSB7XG4gICAgdmFyIG91dHB1dCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmcpO1xuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOV8uflxcLSVdKy9nLCBlc2NhcGUpO1xuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC87L2csICclM0InKTtcblxuICAgIC8vIEFXUyBwZXJjZW50LWVuY29kZXMgc29tZSBleHRyYSBub24tc3RhbmRhcmQgY2hhcmFjdGVycyBpbiBhIFVSSVxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9bKl0vZywgZnVuY3Rpb24oY2gpIHtcbiAgICAgIHJldHVybiAnJScgKyBjaC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuICBzdGF0aWMgaXNvODYwMShkYXRlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGRhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIDIpLFxuICAgICAgVXRpbHMuemZpbGwoZGF0ZS5nZXRVVENEYXRlKCksIDIpLFxuICAgICAgJ1QnLFxuICAgICAgVXRpbHMuemZpbGwoZGF0ZS5nZXRVVENIb3VycygpLCAyKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDTWludXRlcygpLCAyKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDU2Vjb25kcygpLCAyKSxcbiAgICAgICdaJyxcbiAgICBdLmpvaW4oJycpO1xuXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFhIUihhcmdzKSB7XG4gIC8vIFRoZSB1c2VyIG1heSBvciBtYXkgbm90IHBhc3MgYW55IGhlYWRlcnNcbiAgYXJncy5oZWFkZXJzID0gYXJncy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIElmIG5vIG1ldGhvZCBpcyBnaXZlbiwgZGVmYXVsdCB0byBHRVRcbiAgYXJncy5tZXRob2QgPSBhcmdzLm1ldGhvZCB8fCAnR0VUJztcblxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgLy8gU2V0IHRoZSBcImxvYWRcIiBjYWxsYmFjayBpZiBnaXZlblxuICBpZihhcmdzLmxvYWRDYWxsYmFjayAmJiB0eXBlb2YgYXJncy5sb2FkQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFyZ3MubG9hZENhbGxiYWNrLCB0cnVlKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJlcnJvclwiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3MuZXJyb3JDYWxsYmFjayAmJiB0eXBlb2YgYXJncy5lcnJvckNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgYXJncy5lcnJvckNhbGxiYWNrLCB0cnVlKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJyZWFkeXN0YXRlY2hhbmdlXCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy5zdGF0ZUNoYW5nZUNhbGxiYWNrICYmXG4gICAgICB0eXBlb2YgYXJncy5zdGF0ZUNoYW5nZUNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBhcmdzLnN0YXRlQ2hhbmdlQ2FsbGJhY2spO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBcInByb2dyZXNzXCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy5wcm9ncmVzc0NhbGxiYWNrICYmIHR5cGVvZiBhcmdzLnByb2dyZXNzQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgYXJncy5wcm9ncmVzc0NhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJ0aW1lb3V0XCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy50aW1lb3V0Q2FsbGJhY2sgJiYgdHlwZW9mIGFyZ3MudGltZW91dENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWVvdXQnLCBhcmdzLnRpbWVvdXRDYWxsYmFjayk7XG4gIH1cblxuICAvLyBBZGRpbmcgZXh0cmEgcGFyYW1zIGFzIG5lZWRlZFxuICB2YXIgdXJsID0gYXJncy51cmw7XG4gIGlmKGFyZ3MuZXh0cmFQYXJhbXMpIHtcbiAgICBmb3IodmFyIHBhcmFtTmFtZSBpbiBhcmdzLmV4dHJhUGFyYW1zKSB7XG4gICAgICBpZihhcmdzLmV4dHJhUGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtTmFtZSkpIHtcbiAgICAgICAgaWYodXJsLmluZGV4T2YoJz8nKSAhPT0gLTEpIHtcbiAgICAgICAgICB1cmwgKz0gJyYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCArPSAnPyc7XG4gICAgICAgIH1cblxuICAgICAgICB1cmwgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtTmFtZSkgKyAnPSc7XG4gICAgICAgIHVybCArPSBlbmNvZGVVUklDb21wb25lbnQoYXJncy5leHRyYVBhcmFtc1twYXJhbU5hbWVdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBPcGVuIHRoZSB4aHIgY29ubmVjdGlvblxuICB4aHIub3BlbihhcmdzLm1ldGhvZCwgdXJsKTtcblxuICAvLyBTZXQgdGhlIGhlYWRlcnNcbiAgZm9yKHZhciBoZWFkZXIgaW4gYXJncy5oZWFkZXJzKSB7XG4gICAgaWYoYXJncy5oZWFkZXJzLmhhc093blByb3BlcnR5KGhlYWRlcikpIHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgYXJncy5oZWFkZXJzW2hlYWRlcl0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNlbmQgdGhlIGFqYXggY2FsbFxuICBpZihhcmdzLmJvZHkpIHtcbiAgICB4aHIuc2VuZChhcmdzLmJvZHkpO1xuICB9IGVsc2Uge1xuICAgIHhoci5zZW5kKCk7XG4gIH1cbiAgcmV0dXJuIHhocjtcbn1cbiJdfQ==
