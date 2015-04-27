(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _Uploader = require('./uploader');

var _Uploader2 = _interopRequireWildcard(_Uploader);

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

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

},{"./log":39,"./uploader":40,"babel-runtime/helpers/interop-require-wildcard":8}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":10}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":11}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":12}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":13}],6:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],7:[function(require,module,exports){
"use strict";

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{}],8:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],9:[function(require,module,exports){
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
},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/is-iterable":3}],10:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
require('../modules/core.iter-helpers');
module.exports = require('../modules/$').core.getIterator;
},{"../modules/$":21,"../modules/core.iter-helpers":26,"../modules/es6.string.iterator":30,"../modules/web.dom.iterable":31}],11:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
require('../modules/core.iter-helpers');
module.exports = require('../modules/$').core.isIterable;
},{"../modules/$":21,"../modules/core.iter-helpers":26,"../modules/es6.string.iterator":30,"../modules/web.dom.iterable":31}],12:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$').core.Object.assign;
},{"../../modules/$":21,"../../modules/es6.object.assign":28}],13:[function(require,module,exports){
require('../../modules/es6.object.statics-accept-primitives');
module.exports = require('../../modules/$').core.Object.keys;
},{"../../modules/$":21,"../../modules/es6.object.statics-accept-primitives":29}],14:[function(require,module,exports){
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
},{"./$":21}],15:[function(require,module,exports){
var $ = require('./$');
// 19.1.2.1 Object.assign(target, source, ...)
/*eslint-disable no-unused-vars */
module.exports = Object.assign || function assign(target, source){
/*eslint-enable no-unused-vars */
  var T = Object($.assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = $.ES5Object(arguments[i++])
      , keys   = $.getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
};
},{"./$":21}],16:[function(require,module,exports){
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
},{"./$":21,"./$.wks":25}],17:[function(require,module,exports){
// Optional / simple context binding
var assertFunction = require('./$.assert').fn;
module.exports = function(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  } return function(/* ...args */){
      return fn.apply(that, arguments);
    };
};
},{"./$.assert":14}],18:[function(require,module,exports){
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
},{"./$":21}],19:[function(require,module,exports){
module.exports = function($){
  $.FW   = false;
  $.path = $.core;
  return $;
};
},{}],20:[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , ctx               = require('./$.ctx')
  , cof               = require('./$.cof')
  , $def              = require('./$.def')
  , assertObject      = require('./$.assert').obj
  , SYMBOL_ITERATOR   = require('./$.wks')('iterator')
  , FF_ITERATOR       = '@@iterator'
  , Iterators         = {}
  , IteratorPrototype = {};
// Safari has byggy iterators w/o `next`
var BUGGY = 'keys' in [] && !('next' in [].keys());
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, $.that);
function setIterator(O, value){
  $.hide(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
}
function defineIterator(Constructor, NAME, value, DEFAULT){
  var proto = Constructor.prototype
    , iter  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT] || value;
  // Define iterator
  if($.FW)setIterator(proto, iter);
  if(iter !== value){
    var iterProto = $.getProto(iter.call(new Constructor));
    // Set @@toStringTag to native iterators
    cof.set(iterProto, NAME + ' Iterator', true);
    // FF fix
    if($.FW)$.has(proto, FF_ITERATOR) && setIterator(iterProto, $.that);
  }
  // Plug for library
  Iterators[NAME] = iter;
  // FF & v8 fix
  Iterators[NAME + ' Iterator'] = $.that;
  return iter;
}
function getIterator(it){
  var Symbol  = $.g.Symbol
    , ext     = it[Symbol && Symbol.iterator || FF_ITERATOR]
    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[cof.classof(it)];
  return assertObject(getIter.call(it));
}
function closeIterator(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)assertObject(ret.call(iterator));
}
function stepCall(iterator, fn, value, entries){
  try {
    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
  } catch(e){
    closeIterator(iterator);
    throw e;
  }
}
var $iter = module.exports = {
  BUGGY: BUGGY,
  Iterators: Iterators,
  prototype: IteratorPrototype,
  step: function(done, value){
    return {value: value, done: !!done};
  },
  stepCall: stepCall,
  close: closeIterator,
  is: function(it){
    var O      = Object(it)
      , Symbol = $.g.Symbol
      , SYM    = Symbol && Symbol.iterator || FF_ITERATOR;
    return SYM in O || SYMBOL_ITERATOR in O || $.has(Iterators, cof.classof(O));
  },
  get: getIterator,
  set: setIterator,
  create: function(Constructor, NAME, next, proto){
    Constructor.prototype = $.create(proto || $iter.prototype, {next: $.desc(1, next)});
    cof.set(Constructor, NAME + ' Iterator');
  },
  define: defineIterator,
  std: function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
    function createIter(kind){
      return function(){
        return new Constructor(this, kind);
      };
    }
    $iter.create(Constructor, NAME, next);
    var entries = createIter('key+value')
      , values  = createIter('value')
      , proto   = Base.prototype
      , methods, key;
    if(DEFAULT == 'value')values = defineIterator(Base, NAME, values, 'values');
    else entries = defineIterator(Base, NAME, entries, 'entries');
    if(DEFAULT){
      methods = {
        entries: entries,
        keys:    IS_SET ? values : createIter('key'),
        values:  values
      };
      $def($def.P + $def.F * BUGGY, NAME, methods);
      if(FORCE)for(key in methods){
        if(!(key in proto))$.hide(proto, key, methods[key]);
      }
    }
  },
  forOf: function(iterable, entries, fn, that){
    var iterator = getIterator(iterable)
      , f = ctx(fn, that, entries ? 2 : 1)
      , step;
    while(!(step = iterator.next()).done){
      if(stepCall(iterator, f, step.value, entries) === false){
        return closeIterator(iterator);
      }
    }
  }
};
},{"./$":21,"./$.assert":14,"./$.cof":16,"./$.ctx":17,"./$.def":18,"./$.wks":25}],21:[function(require,module,exports){
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
    return $.setDesc(object, key, desc(bitmap, value)); // eslint-disable-line no-use-before-define
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
  getKeys:    Object.keys,
  getNames:   Object.getOwnPropertyNames,
  getSymbols: Object.getOwnPropertySymbols,
  // Dummy, fix for not array-like ES3 string in es5 module
  assertDefined: assertDefined,
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
if(typeof __e != 'undefined')__e = core;
if(typeof __g != 'undefined')__g = global;
},{"./$.fw":19}],22:[function(require,module,exports){
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
},{"./$":21}],23:[function(require,module,exports){
var sid = 0;
function uid(key){
  return 'Symbol(' + key + ')_' + (++sid + Math.random()).toString(36);
}
uid.safe = require('./$').g.Symbol || uid;
module.exports = uid;
},{"./$":21}],24:[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var $           = require('./$')
  , UNSCOPABLES = require('./$.wks')('unscopables');
if($.FW && !(UNSCOPABLES in []))$.hide(Array.prototype, UNSCOPABLES, {});
module.exports = function(key){
  if($.FW)[][UNSCOPABLES][key] = true;
};
},{"./$":21,"./$.wks":25}],25:[function(require,module,exports){
var global = require('./$').g
  , store  = {};
module.exports = function(name){
  return store[name] || (store[name] =
    global.Symbol && global.Symbol[name] || require('./$.uid').safe('Symbol.' + name));
};
},{"./$":21,"./$.uid":23}],26:[function(require,module,exports){
var core  = require('./$').core
  , $iter = require('./$.iter');
core.isIterable  = $iter.is;
core.getIterator = $iter.get;
},{"./$":21,"./$.iter":20}],27:[function(require,module,exports){
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
$iter.std(Array, 'Array', function(iterated, kind){
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
  if(kind == 'key'  )return step(0, index);
  if(kind == 'value')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'value');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

setUnscope('keys');
setUnscope('values');
setUnscope('entries');
},{"./$":21,"./$.iter":20,"./$.uid":23,"./$.unscope":24}],28:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');
$def($def.S, 'Object', {assign: require('./$.assign')});
},{"./$.assign":15,"./$.def":18}],29:[function(require,module,exports){
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
},{"./$":21,"./$.def":18}],30:[function(require,module,exports){
var set   = require('./$').set
  , at    = require('./$.string-at')(true)
  , ITER  = require('./$.uid').safe('iter')
  , $iter = require('./$.iter')
  , step  = $iter.step;

// 21.1.3.27 String.prototype[@@iterator]()
$iter.std(String, 'String', function(iterated){
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
},{"./$":21,"./$.iter":20,"./$.string-at":22,"./$.uid":23}],31:[function(require,module,exports){
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
},{"./$":21,"./$.iter":20,"./$.wks":25,"./es6.array.iterator":27}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
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
},{"./core":32}],34:[function(require,module,exports){
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
},{"./core":32,"./hmac":35,"./sha256":36}],35:[function(require,module,exports){
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
},{"./core":32}],36:[function(require,module,exports){
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
},{"./core":32}],37:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _XHR = require('./xhr');

var _XHR2 = _interopRequireWildcard(_XHR);

var _utils = require('./utils');

var _utils2 = _interopRequireWildcard(_utils);

var _SHA256 = require('crypto-js/sha256');

var _SHA2562 = _interopRequireWildcard(_SHA256);

var _HmacSHA256 = require('crypto-js/hmac-sha256');

var _HmacSHA2562 = _interopRequireWildcard(_HmacSHA256);

var _Hex = require('crypto-js/enc-hex');

var _Hex2 = _interopRequireWildcard(_Hex);

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

      console.log(arguments);
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

},{"./utils":41,"./xhr":42,"babel-runtime/core-js/object/keys":5,"babel-runtime/helpers/class-call-check":6,"babel-runtime/helpers/create-class":7,"babel-runtime/helpers/interop-require-wildcard":8,"babel-runtime/helpers/sliced-to-array":9,"crypto-js/enc-hex":33,"crypto-js/hmac-sha256":34,"crypto-js/sha256":36}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
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

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
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

},{"./constants":38}],40:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _SHA256 = require('crypto-js/sha256');

var _SHA2562 = _interopRequireWildcard(_SHA256);

var _XHR = require('./xhr');

var _XHR2 = _interopRequireWildcard(_XHR);

var _AmazonXHR = require('./amazonXhr');

var _AmazonXHR2 = _interopRequireWildcard(_AmazonXHR);

var _Utils = require('./utils');

var _Utils2 = _interopRequireWildcard(_Utils);

var _log = require('./log');

var _log2 = _interopRequireWildcard(_log);

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
      self.settings.onSelect.call(this, file);

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

          if (!this.uploadId) {
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
                this._loadedChunks = null;
                self._progress = null;
                self._totalProgress = null;
                self._loadedChunks = null;
                self._uploadingChunks = null;
                self._chunks = null;
                self.settings.key = this.settings.backupKey;
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

},{"./amazonXhr":37,"./constants":38,"./log":39,"./utils":41,"./xhr":42,"babel-runtime/core-js/object/assign":4,"babel-runtime/helpers/class-call-check":6,"babel-runtime/helpers/create-class":7,"babel-runtime/helpers/interop-require-wildcard":8,"crypto-js/sha256":36}],41:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
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

},{"babel-runtime/helpers/class-call-check":6,"babel-runtime/helpers/create-class":7}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9iYWJlbC9zcmMvbXVsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLXdpbGRjYXJkLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWQtdG8tYXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYXNzZXJ0LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY3R4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZGVmLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZncuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51aWQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC51bnNjb3BlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQud2tzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXRlci1oZWxwZXJzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnN0YXRpY3MtYWNjZXB0LXByaW1pdGl2ZXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9lbmMtaGV4LmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9obWFjLXNoYTI1Ni5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdG8tanMvaG1hYy5qcyIsIm5vZGVfbW9kdWxlcy9jcnlwdG8tanMvc2hhMjU2LmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvYmFiZWwvc3JjL2FtYXpvblhoci5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL2JhYmVsL3NyYy9jb25zdGFudHMuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9iYWJlbC9zcmMvbG9nLmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvYmFiZWwvc3JjL3VwbG9hZGVyLmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvYmFiZWwvc3JjL3V0aWxzLmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvYmFiZWwvc3JjL3hoci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7d0JDQXFCLFlBQVk7Ozs7bUJBQ2pCLE9BQU87Ozs7QUFFdkIsU0FBUyxZQUFZLENBQUMsUUFBUSxFQUFFOztBQUU5QixNQUFHLEVBQUUsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFDL0QsT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFBLEFBQUMsRUFBRTtBQUNoQyxxQkFBSSwyQkFBMkIsQ0FBQyxDQUFDO0FBQ2pDLFdBQU8sQ0FBQyxDQUFDLENBQUM7R0FDWDs7OztBQUlELE1BQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxJQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQzs7QUFFbEQsTUFBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQy9CLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pELFFBQUk7QUFDRixVQUFJLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDNUMsQ0FBQyxPQUFNLENBQUMsRUFBRTtBQUNULGFBQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDtHQUNGO0FBQ0QsbUJBQUksSUFBSSxDQUFDLENBQUM7O0FBRVYsU0FBTywwQkFBYSxRQUFRLENBQUMsQ0FBQztDQUMvQjs7QUFFRCxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtBQUNoQyxRQUFNLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztDQUNwQzs7O0FDL0JEOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4dUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQ3RNZ0IsT0FBTzs7OztxQkFDTCxTQUFTOzs7O3NCQUNSLGtCQUFrQjs7OzswQkFDZCx1QkFBdUI7Ozs7bUJBQzlCLG1CQUFtQjs7OztJQUVkLFNBQVM7QUFDakIsV0FEUSxTQUFTLENBQ2hCLFFBQVEsRUFBRTswQkFESCxTQUFTOztBQUUxQixRQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxFQUFFLENBQUM7QUFDL0IsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQzlDLFFBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUNwRCxRQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUM7O0FBRTVELFFBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDM0IsWUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0tBQzdEO0FBQ0QsUUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNoQyxZQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7S0FDM0M7R0FDRjs7ZUFia0IsU0FBUzs7V0FleEIsY0FBQyxRQUFRLEVBQUU7QUFDYixVQUFJLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7O0FBRTlCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7O0FBRXJDLFVBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6QyxVQUFNLFlBQVksR0FBRyxtQkFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsVUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQU0sTUFBTSxXQUFNLFlBQVksbUJBQWdCLENBQUM7O0FBRWhFLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNyQyxVQUFJLFVBQVUsR0FBRyxDQUNmLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFDckIsbUJBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3RDLG1CQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQ2xDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUVYLFVBQU0sV0FBVyxHQUFHLG1CQUFNLFNBQVMsQ0FBQyxtQkFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDckUsVUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7QUFDNUMsaUJBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDeEMsaUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0FBQ3BELGlCQUFXLENBQUMsZUFBZSxDQUFDLEdBQUksS0FBSyxDQUFDOztBQUV0QyxVQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDL0MsVUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3pDLGlCQUFXLENBQUMsa0JBQWtCLENBQUMsR0FBRyxtQkFBTSxTQUFTLE1BQzVDLFNBQVMsU0FBSSxVQUFVLFNBQUksTUFBTSxzQkFDckMsQ0FBQztBQUNGLGlCQUFXLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUM7O0FBRXhDLFVBQUksVUFBVSxHQUFHLGFBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUzQyxnQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2xCLGlCQUFXLENBQUMscUJBQXFCLENBQUMsR0FBRyxtQkFBTSxTQUFTLENBQ2xELFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ3JCLENBQUM7O0FBRUYsaUJBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOztBQUUvRCxVQUFJLEdBQUcsUUFBTSxRQUFRLENBQUMsUUFBUSxVQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxBQUFFLENBQUM7QUFDNUUsYUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFekIsVUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLG1CQUFZLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsRUFBSTtBQUNsQyxZQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsWUFBRyxLQUFLLEVBQUU7QUFDUixhQUFHLElBQUksR0FBRyxDQUFDO1NBQ1o7QUFDRCxhQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ2QsV0FBRyxTQUFPLEdBQUcsU0FBSSxLQUFLLE1BQUcsQ0FBQztPQUMzQixDQUFDLENBQUM7QUFDSCxTQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdkIsVUFBSSxDQUFDLEdBQUcsR0FBRyxpQkFBSTtBQUNiLFdBQUcsRUFBRSxHQUFHO0FBQ1IsY0FBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTTtBQUM1QixlQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87QUFDckIsWUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTzs7QUFFM0Isb0JBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVk7QUFDeEMsd0JBQWdCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0I7QUFDaEQsMkJBQW1CLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUI7QUFDdEQscUJBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWE7QUFDMUMsdUJBQWUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFDL0MsQ0FBQyxDQUFDO0FBQ0gsVUFBRyxRQUFRLEVBQUU7QUFDWCxnQkFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztPQUNwQjs7QUFFRCxhQUFPLElBQUksQ0FBQztLQUNiOzs7V0FFcUIsa0NBQUc7QUFDdkIsVUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOztBQUVoQixVQUFNLFVBQVUsR0FBRyxhQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFcEQsVUFBTSxVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDakQsZUFBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztPQUN4QixDQUFDLENBQUM7O0FBRUgsVUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztBQUNsRCxVQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1RSxVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUUvQyxhQUFPLFNBQVMsQ0FBQztLQUNsQjs7O1dBRWtCLCtCQUFHOzs7QUFDcEIsVUFBSSxPQUFPLGdCQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxpQkFDakMsbUJBQU0sU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsV0FDM0QsQ0FBQztBQUNGLGFBQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7OztBQUd0RCxhQUFPLElBQUksYUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FDMUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQzVCLFlBQU0sS0FBSyxHQUFHLE1BQUssUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QyxZQUFHLEdBQUcsRUFBRTtBQUNOLHNCQUFVLEdBQUcsYUFBUSxtQkFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQUksS0FBSyxDQUFHO1NBQ3RELE1BQU07QUFDTCxzQkFBVSxtQkFBTSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQUksS0FBSyxDQUFHO1NBQzNDO09BQ0YsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNQLGFBQU8sSUFBSSxJQUFJLENBQUM7OztBQUdoQixVQUFNLFVBQVUsR0FBRyxhQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwRCxhQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUs7QUFDekMsWUFBTSxLQUFLLEdBQUcsTUFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEMsWUFBRyxHQUFHLEVBQUU7QUFDTixzQkFBVSxHQUFHLFVBQUssR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRztTQUN2RCxNQUFNO0FBQ0wsc0JBQVUsR0FBRyxDQUFDLFdBQVcsRUFBRSxTQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBRztTQUMvQztPQUNGLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDUCxhQUFPLElBQUksTUFBTSxDQUFDOzs7QUFHbEIsYUFBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ3pDLFlBQUcsR0FBRyxFQUFFO0FBQ04sc0JBQVUsR0FBRyxTQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBRztTQUN0QyxNQUFNO0FBQ0wsaUJBQU8sR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFCO09BQ0YsRUFBRSxFQUFFLENBQUMsQ0FBQzs7QUFFUCxhQUFPLElBQUksSUFBSSxDQUFDOztBQUVoQixhQUFPLElBQUksa0JBQWtCLENBQUM7O0FBRTlCLGFBQU8sT0FBTyxDQUFDO0tBQ2hCOzs7V0FFYyx5QkFBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUU7QUFDdEMsYUFBTyxzQ0FFSCxtQkFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUVuQixDQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFDckIsbUJBQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3RDLG1CQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQ2pDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQ3ZELENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFFVixvQkFBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLGFBQzVELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDaEM7OztXQUVVLHFCQUFDLFlBQVksRUFBRTtBQUN4QixVQUFJLEdBQUcsR0FBRyx3QkFDUixZQUFZLEVBQ1osaUJBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUN4QyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2IsYUFBTyxHQUFHLENBQUM7S0FDWjs7Ozs7V0FHVSxjQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNyQyxhQUFPLElBQUksU0FBUyxDQUFDO0FBQ25CLFlBQUksRUFBRSxJQUFJO0FBQ1YsV0FBRyxFQUFFLEdBQUc7QUFDUixjQUFNLEVBQUUsTUFBTTtBQUNkLG1CQUFXLEVBQUU7QUFDWCxpQkFBTyxFQUFFLEVBQUUsRUFDWjtBQUNELGVBQU8sRUFBRTtBQUNQLHFCQUFXLEVBQUUsYUFBYTtBQUMxQiwrQkFBcUIsNEJBQTBCLElBQUksQ0FBQyxJQUFJLEFBQUU7QUFDMUQsd0JBQWMsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLDBCQUEwQixFQUMvRDtBQUNELGVBQU8sRUFBRSxFQUFFO0FBQ1gsb0JBQVksRUFBRSxRQUFRLEVBQ3ZCLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNYOzs7V0FFaUIscUJBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUM3QixLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRTtBQUNoRCxVQUFJLFFBQVEsWUFBQTtVQUFFLGFBQWEsWUFBQTtVQUFFLGdCQUFnQixZQUFBO1VBQUUsa0JBQWtCLFlBQUEsQ0FBQztBQUNsRSxVQUFHLFNBQVMsWUFBWSxNQUFNLEVBQUU7QUFDOUIsZ0JBQVEsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQ2xDLHFCQUFhLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQztBQUN4Qyx3QkFBZ0IsR0FBRyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7QUFDOUMsMEJBQWtCLEdBQUcsU0FBUyxDQUFDLG1CQUFtQixDQUFDO09BQ3BELE1BQU07QUFDTCxnQkFBUSxHQUFHLFNBQVMsQ0FBQztPQUN0QjtBQUNELFVBQUksV0FBVyxHQUFHO0FBQ2hCLGtCQUFVLEVBQUUsUUFBUSxHQUFHLENBQUM7QUFDeEIsZ0JBQVEsRUFBUixRQUFRLEVBQ1QsQ0FBQztBQUNGLGFBQU8sQUFBQyxJQUFJLFNBQVMsQ0FBQztBQUNwQixZQUFJLEVBQUUsSUFBSTtBQUNWLFdBQUcsRUFBRSxHQUFHO0FBQ1IsY0FBTSxFQUFFLEtBQUs7QUFDYixtQkFBVyxFQUFFLFdBQVc7QUFDeEIsZUFBTyxFQUFFLEVBQUU7QUFDWCxlQUFPLEVBQUUsS0FBSztBQUNkLG9CQUFZLEVBQUUsUUFBUTtBQUN0QixxQkFBYSxFQUFFLGFBQWE7QUFDNUIsd0JBQWdCLEVBQUUsZ0JBQWdCO0FBQ2xDLDJCQUFtQixFQUFFLGtCQUFrQixFQUN4QyxDQUFDLENBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3ZCOzs7V0FFVSxjQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUM5QyxhQUFhLEVBQUUsTUFBTSxFQUFFO0FBQ2pDLFVBQUksV0FBVyxHQUFHO0FBQ2hCLGdCQUFRLEVBQVIsUUFBUSxFQUNULENBQUM7QUFDRixVQUFHLE1BQU0sRUFBRTtBQUNULG1CQUFXLENBQUMscUJBQXFCLENBQUMsR0FBRyxNQUFNLENBQUM7T0FDN0M7QUFDRCxhQUFPLElBQUksU0FBUyxDQUFDO0FBQ25CLFlBQUksRUFBRSxJQUFJO0FBQ1YsV0FBRyxFQUFFLEdBQUc7QUFDUixjQUFNLEVBQUUsS0FBSztBQUNiLG1CQUFXLEVBQUUsV0FBVztBQUN4QixlQUFPLEVBQUUsRUFBRTtBQUNYLGVBQU8sRUFBRSxFQUFFO0FBQ1gscUJBQWEsRUFBRSxhQUFhO0FBQzVCLG9CQUFZLEVBQUUsc0JBQVMsQ0FBQyxFQUFFO0FBQ3hCLGNBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFOztBQUUxQixnQkFBRyxhQUFhLEVBQUU7QUFDaEIsMkJBQWEsRUFBRSxDQUFDO2FBQ2pCO0FBQ0QsbUJBQU87V0FDUjs7OztBQUlELGNBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQy9CLGNBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUNmLGNBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoRCxjQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDakQsY0FBSSxVQUFVLEdBQUcsb0JBQUMsR0FBRyxFQUFFLElBQUksRUFBSztBQUM5QixtQkFBTyxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1dBQ3RELENBQUM7QUFDRixlQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxnQkFBSSxVQUFVLEdBQUcsUUFBUSxDQUN2QixVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FDMUMsQ0FBQztBQUNGLGdCQUFJLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzNDLGdCQUFJLElBQUksR0FBRyxRQUFRLENBQ2pCLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUNwQyxDQUFDOztBQUVGLGdCQUFHLFVBQVUsS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUNqRCx1QkFBUzthQUNWLE1BQU0sSUFBRyxVQUFVLEtBQUssU0FBUyxJQUM5QixJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLEVBQUU7QUFDbEMsdUJBQVM7YUFDVjs7QUFFRCxpQkFBSyxDQUFDLElBQUksQ0FBQyxDQUNULFVBQVUsRUFDVixJQUFJLEVBQ0osSUFBSSxDQUNMLENBQUMsQ0FBQztXQUNKO0FBQ0QsY0FBSSxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNqRCxjQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxNQUFNLEVBQUU7QUFDcEMsZ0JBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUN6RCxxQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBUyxRQUFRLEVBQUU7QUFDaEUsc0JBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDbEMsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7V0FDL0IsTUFBTTtBQUNMLG9CQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7V0FDakI7U0FDRixFQUNGLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNYOzs7V0FFWSxnQkFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2xELFVBQUksV0FBVyxHQUFHLEVBQUUsUUFBUSxFQUFSLFFBQVEsRUFBRSxDQUFDOzs7O0FBSS9CLFVBQUksSUFBSSxHQUFHLDJCQUEyQixDQUFDOztBQUV2QyxhQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZCLFdBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQW9COzs7WUFBbEIsTUFBTTtZQUFFLElBQUk7O0FBQ3RCLFlBQUksSUFBSSw0Q0FFUSxNQUFNLHFDQUNaLElBQUksdUNBRVosSUFBSSxFQUFFLENBQUM7T0FDVixDQUFDLENBQUM7QUFDSCxVQUFJLElBQUksNEJBQTRCLENBQUM7OztBQUdyQyxVQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFDNUIsTUFBTSxDQUFDLFNBQVMsSUFDaEIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDakQsWUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztPQUN6Qjs7QUFFRCxhQUFPLElBQUksU0FBUyxDQUFDO0FBQ25CLFlBQUksRUFBSixJQUFJO0FBQ0osV0FBRyxFQUFILEdBQUc7QUFDSCxjQUFNLEVBQUUsTUFBTTtBQUNkLG1CQUFXLEVBQVgsV0FBVztBQUNYLGVBQU8sRUFBRSxFQUFFO0FBQ1gsZUFBTyxFQUFFLElBQUk7QUFDYixvQkFBWSxFQUFFLFFBQVEsRUFDdkIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ1g7OztTQXJVa0IsU0FBUzs7O3FCQUFULFNBQVM7Ozs7Ozs7OztBQ052QixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFBVixFQUFFLEdBQUYsRUFBRTtBQUNSLElBQU0sRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFBZixFQUFFLEdBQUYsRUFBRTtBQUNSLElBQU0sRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFBZixFQUFFLEdBQUYsRUFBRTtBQUNSLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFmLE9BQU8sR0FBUCxPQUFPOztBQUNiLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUFiLEtBQUssR0FBTCxLQUFLOzs7Ozs7Ozs7cUJDSkksYUFBYTs7cUJBRXBCLFlBQVc7QUFDeEIsTUFBRyxFQUFFLE9BSEUsS0FBSyxJQUdFLE9BQU8sT0FBTyxLQUFLLFdBQVcsSUFDeEMsT0FBTyxPQUFPLENBQUMsR0FBRyxLQUFLLFdBQVcsQ0FBQSxBQUFDLEVBQUU7QUFDdkMsV0FBTztHQUNSOztBQUVELE1BQUksSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM5QixPQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4QyxRQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ3pCO0FBQ0QsU0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDYmtCLGtCQUFrQjs7OzttQkFDckIsT0FBTzs7Ozt5QkFDRCxhQUFhOzs7O3FCQUNqQixTQUFTOzs7O21CQUNYLE9BQU87Ozs7Z0NBQ2EsYUFBYTs7SUFFNUIsUUFBUTtBQUNoQixXQURRLFFBQVEsQ0FDZixRQUFRLEVBQUU7MEJBREgsUUFBUTs7QUFFekIsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixZQUFRLEdBQUcsUUFBUSxJQUFJLEVBQUUsQ0FBQzs7OztBQUkxQixRQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7QUFDaEMsUUFBSSxDQUFDLElBQUksR0FBSSxRQUFRLENBQUMsSUFBSSxDQUFDOzs7Ozs7QUFNM0IsWUFBUSxDQUFDLFNBQVMsR0FBSSxXQUFXLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxBQUFDLENBQUM7Ozs7OztBQU0zRSxZQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLElBQUssQ0FBQyxxQkF2QnBDLEVBQUUsQUF1QnVDLEFBQUMsQ0FBQztBQUNwRCxZQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxxQkF4QjNCLEVBQUUsQUF3QjhCLENBQUM7OztBQUc5QyxZQUFRLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDOzs7O0FBSS9DLFlBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUM7OztBQUd6QyxZQUFRLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7OztBQUdsQyxZQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7Ozs7O0FBS3hDLFlBQVEsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFdBQVcsSUFBSSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7OztBQVcxRSxZQUFRLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksYUFBYSxDQUFDOzs7QUFHN0MsWUFBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxJQUFnQixZQUFXLEVBQUUsQ0FBQztBQUN2RSxZQUFRLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLElBQU0sWUFBVyxFQUFFLENBQUM7QUFDdkUsWUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxJQUFvQixZQUFXLEVBQUUsQ0FBQztBQUN2RSxZQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQXNCLFlBQVcsRUFBRSxDQUFDO0FBQ3ZFLFlBQVEsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsSUFBZ0IsWUFBVyxFQUFFLENBQUM7QUFDdkUsWUFBUSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTSxJQUF3QixZQUFXLEVBQUUsQ0FBQztBQUN2RSxZQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQXNCLFlBQVcsRUFBRSxDQUFDO0FBQ3ZFLFlBQVEsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGVBQWUsSUFBTSxZQUFXLEVBQUUsQ0FBQzs7O0FBR3ZFLFlBQVEsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsQ0FBQzs7O0FBRzNELFlBQVEsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDOzs7QUFHaEUsUUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Ozs7QUFJekIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFekIsUUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2IsVUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBUyxDQUFDLEVBQUUsS0FBSyxFQUFFO0FBQ3ZDLFlBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtBQUMzQixpQkFBTyxJQUFJLENBQUM7U0FDYjs7O0FBR0QsWUFBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssU0FBUyxFQUFFO0FBQ2hDLGlCQUFPLEtBQUssQ0FBQztTQUNkOzs7O0FBSUQsWUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDN0IsZUFBTyxJQUFJLENBQUM7T0FDYixDQUFDO0tBQ0g7OztBQUdELGNBQVUsQ0FBQyxZQUFXO0FBQ3BCLFVBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNsQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0dBQ1Q7O2VBbkdrQixRQUFROztXQXFHdEIsaUJBQUc7QUFDTixVQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNoRSxlQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7T0FDcEQsTUFBTTtBQUNMLGFBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO09BQzNCO0tBQ0Y7OztXQUVTLG9CQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7QUFDdEIsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOzs7OztBQUtoQixVQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxTQUFTLEVBQUU7QUFDaEMsZUFBTyxLQUFLLENBQUM7T0FDZDs7QUFFRCxVQUFHLElBQUksRUFBRTtBQUNQLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO09BQ2xCOztBQUVELFVBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ2IsZUFBTyxLQUFLLENBQUM7T0FDZDs7Ozs7OztBQU9ELFVBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFdkUsVUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtBQUN6QyxhQUFLLENBQUMsQ0FDSixtQ0FBbUMsRUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLHFCQTNJYixFQUFFLEFBMklnQixFQUMzQixpQ0FBaUMsQ0FDbEMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNaLGVBQU8sS0FBSyxDQUFDO09BQ2Q7OztBQUdELFVBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRTs7QUFFbkMsWUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7OztBQUcvQyxZQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0FBR2xFLFlBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QixhQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM5QyxjQUFHLGFBQWEsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdkMsd0JBQVksR0FBRyxJQUFJLENBQUM7QUFDcEIsa0JBQU07V0FDUDtTQUNGOzs7QUFHRCxZQUFHLENBQUMsWUFBWSxFQUFFO0FBQ2hCLGVBQUssQ0FBQyxDQUNKLG9DQUFvQyxFQUNwQywyQ0FBMkMsRUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FDakMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNaLGlCQUFPLEtBQUssQ0FBQztTQUNkO09BQ0Y7OztBQUdELFVBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRXhDLFVBQUksSUFBSSxHQUFHLGVBQWMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO0FBQ3hELGdCQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDbkIsZ0JBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtBQUNuQixvQkFBWSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsRUFDOUMsQ0FBQyxDQUFDOztBQUVILFVBQUcsS0FBSyxFQUFFO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7T0FDbkI7Ozs7Ozs7QUFPRCx1QkFBSTtBQUNGLFdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxlQUFlO0FBQzdDLG1CQUFXLEVBQUUsSUFBSTtBQUNqQixvQkFBWSxFQUFFLHNCQUFTLENBQUMsRUFBRTtBQUN4QixjQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDN0MsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsY0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsY0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzlCLGNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMxQixjQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO0FBQ2xELGNBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDOztBQUU1QyxjQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNqQixtQ0FBVSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFTLENBQUMsRUFBRTtBQUN4RCxrQkFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7OztBQUcvQixrQkFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDOztBQUVwRSxrQkFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCLENBQUMsQ0FBQztXQUNKLE1BQU07O0FBRUwsZ0JBQUcsQ0FBQyxLQUFLLEVBQUU7O0FBRVQscUNBQVUsSUFBSSxDQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFDdkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxVQUFTLEtBQUssRUFBRTtBQUN0RCxxQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsc0JBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUIsc0JBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNsRCxzQkFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdCLHNCQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN0QztBQUNELG9CQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7ZUFDakIsRUFBRSxZQUFXOzs7QUFHWixvQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsb0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLG9CQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixvQkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDM0Isb0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLG9CQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLG9CQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUNwQixvQkFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7QUFDNUMsb0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2VBQzdCLENBQ0YsQ0FBQzthQUNILE1BQU07O0FBRUwsa0JBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjtXQUNGO1NBQ0YsRUFDRixDQUFDLENBQUM7S0FDSjs7O1dBRU8sb0JBQUc7QUFDVCxVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7OztBQUdoQixVQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxTQUFTLEVBQUU7QUFDaEMsZUFBTztPQUNSOzs7QUFHRCxVQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTs7QUFFcEIsWUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUc1QyxZQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELFlBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO09BQ3pCOzs7QUFHRCxVQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7O0FBSTVCLFVBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDM0IsSUFBSSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUM5QyxDQUFDOzs7QUFHRixVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7O0FBRXBDLFVBQUcsU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFOztBQUVuQixZQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO09BQzdCLE1BQU0sSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7O0FBRS9CLHlCQUFJLHlCQUF5QixDQUFDLENBQUM7QUFDL0IsWUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO09BQ3JCOztBQUVELFdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEQsaUJBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDaEMsWUFBRyxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDbkIsY0FBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM3QixNQUFNO0FBQ0wsZ0JBQU07U0FDUDtPQUNGO0tBQ0Y7OztXQUVVLHFCQUFDLEtBQUssRUFBRTtBQUNqQixVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7OztBQUdoQixVQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxZQUFZLEVBQUU7QUFDbkMseUJBQUksd0JBQXdCLENBQUMsQ0FBQztBQUM5QixlQUFPO09BQ1I7OztBQUdELFVBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2hDLHlCQUFJLG1CQUFtQixDQUFDLENBQUM7QUFDekIsa0JBQVUsQ0FBQyxZQUFXO0FBQ3BCLGNBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNwQyxjQUFHLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNuQixnQkFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztXQUN2QztTQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDVCxlQUFPO09BQ1IsTUFBTTs7QUFFTCxZQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDL0I7QUFDRCw2Q0FBd0IsS0FBSyxDQUFHLENBQUM7Ozs7QUFJakMsVUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzVCLFlBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNwQyxZQUFHLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNuQixjQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdCLE1BQU07QUFDTCxjQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtBQUN4Qiw2QkFBSSw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3BDLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7V0FDckI7U0FDRjtPQUNGOztBQUVELFVBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDOzs7QUFHckMsVUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUMzQixVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7OztBQUluRCxVQUFJLGdCQUFnQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDbEMsVUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQzs7O0FBSXhDLFVBQUksT0FBTyxHQUFHLGlCQUFTLENBQUMsRUFBRTs7QUFFeEIsWUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsSUFBSSxJQUNoQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssWUFBWSxFQUFFO0FBQ3BDLDJCQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ1AsaUJBQU87U0FDUjs7O0FBR0QsWUFBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLGlCQUFPLFlBQVksRUFBRSxDQUFDO1NBQ3ZCOzs7QUFHRCw4Q0FBdUIsS0FBSyxDQUFHLENBQUM7OztBQUdoQyxZQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7OztBQUdoQyxZQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7QUFHaEQscUJBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OztBQUd0QyxZQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbEQsWUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdCLFlBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Ozs7QUFJckMsWUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3BDLFlBQUcsU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ25CLGNBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDN0IsTUFBTSxJQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtBQUMvQiwyQkFBSSxNQUFNLENBQUMsQ0FBQztBQUNaLGNBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUNyQixNQUFNO0FBQ0wsY0FBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLFlBQVc7QUFDcEMsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNoQyxnQkFBRyxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDZiwyQkFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLGtCQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3pCLE1BQU0sSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUU7QUFDL0IsMkJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QixrQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO1dBQ0YsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNWO09BQ0YsQ0FBQzs7O0FBR0YsVUFBSSxlQUFlLEdBQUcseUJBQVMsQ0FBQyxFQUFFOztBQUVoQyxZQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUdsQyxZQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDOUMsQ0FBQzs7O0FBR0Ysd0JBQWdCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztPQUMvQixDQUFDOztBQUVGLFVBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QixVQUFJLFlBQVksR0FBRyx3QkFBVztBQUM1QixZQUFJLGNBQWMsR0FBRyxTQUFTLENBQUM7QUFDL0IsWUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDOztBQUVmLFlBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFXOztBQUVuQyxjQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUxQixjQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7O0FBRzVCLGNBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBR3BFLGNBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQyxFQUFFLFlBQVc7O0FBRVosdUNBQWMsY0FBYyxDQUFHLENBQUM7OztBQUdoQyxjQUFHLFlBQVksRUFBRTtBQUNmLG1CQUFPO1dBQ1I7QUFDRCxzQkFBWSxHQUFHLElBQUksQ0FBQzs7O0FBR3BCLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckMsY0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNwQyxjQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQiwyQkFBSSxPQUFPLENBQUMsQ0FBQztBQUNiLGNBQUk7QUFDRixlQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7V0FDYixDQUFDLE9BQU0sQ0FBQyxFQUFFO0FBQ1QsNkJBQUksQ0FBQyxDQUFDLENBQUM7V0FDUjs7QUFFRCw2Q0FBb0IsS0FBSyxDQUFHLENBQUM7OztBQUc3Qix1QkFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O0FBR3RDLG9CQUFVLENBQUMsWUFBVztBQUNwQixnQkFBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssWUFBWSxFQUFFOztBQUVuQyxrQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QyxrQkFBRyxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDbkIsb0JBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7ZUFDN0I7YUFDRjtXQUNGLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDVixDQUFDLENBQUM7T0FDSixDQUFDOztBQUVGLDZCQUFVLFdBQVcsQ0FDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUMzQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ2xDLHdCQUFnQixFQUFFLGVBQWU7QUFDakMsMkJBQW1CLEVBQUUsT0FBTztBQUM1QixxQkFBYSxFQUFFLFlBQVk7QUFDM0IsdUJBQWUsRUFBRSxZQUFZLEVBQzlCLEVBQUUsVUFBUyxHQUFHLEVBQUU7QUFDZixZQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0FBQ3RDLFlBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7QUFHekIsWUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsWUFBVztBQUM5QyxjQUFHLGdCQUFnQixJQUNmLEFBQUMsSUFBSSxJQUFJLEVBQUUsR0FBRyxnQkFBZ0IsR0FBSSxFQUFFLHFCQXJlN0IsT0FBTyxBQXFlZ0MsRUFBRTs7QUFDbEQsNkJBQUkscUJBQXFCLENBQUMsQ0FBQztBQUMzQix5QkFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN0QyxnQkFBRyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssWUFBWSxFQUFFO0FBQ25DLGlCQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDWiwwQkFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixrQkFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNwRDtXQUNGO1NBQ0YsRUFBRSxDQUFDLHFCQTllUyxPQUFPLEFBOGVOLENBQUMsQ0FBQztPQUNqQixDQUNGLENBQUM7S0FDSDs7O1dBRVcsd0JBQUc7QUFDYixVQUFJLElBQUksR0FBRyxJQUFJLENBQUM7OztBQUdoQixVQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxZQUFZLEVBQUU7QUFDbkMsZUFBTztPQUNSOzs7QUFHRCxVQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUUzQixVQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDckMsQ0FBQzs7QUFHRixVQUFJLE9BQU87Ozs7Ozs7Ozs7U0FBRyxVQUFTLENBQUMsRUFBRTs7QUFFeEIsWUFBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLDJCQUFJLGdCQUFnQixDQUFDLENBQUM7QUFDdEIsY0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQixjQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDckMsQ0FBQzs7O0FBR0YsY0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JDLE1BQU0sSUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQzdCLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFOztBQUUxRCxpQ0FBVSxJQUFJLENBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUN2QyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUN0QyxVQUFTLEtBQUssRUFBRTtBQUNkLGdCQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLGdCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEMsZ0JBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7V0FDN0IsQ0FDRixDQUFDO1NBQ0gsTUFBTSxJQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTs7O0FBR2pDLGNBQUksQ0FBQyxNQUFNLENBQUMsWUFBVztBQUNyQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1dBQ2xDLENBQUMsQ0FBQztTQUNKLE1BQU07QUFDTCxjQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBVztBQUNuQyxtQkFBTyxDQUFDO0FBQ04sb0JBQU0sRUFBRTtBQUNOLHNCQUFNLEVBQUUsR0FBRyxFQUNaLEVBQ0YsQ0FBQyxDQUFDO1dBQ0osRUFBRSxZQUFXO0FBQ1osbUJBQU8sQ0FBQztBQUNOLG9CQUFNLEVBQUU7QUFDTixzQkFBTSxFQUFFLEdBQUcsRUFDWixFQUNGLENBQUMsQ0FBQztXQUNKLENBQUMsQ0FBQztTQUNKO09BQ0YsQ0FBQSxDQUFDOztBQUVGLDZCQUFVLElBQUksQ0FDWixJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQ3ZDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQ3RDLFVBQVMsS0FBSyxFQUFFO0FBQ2QsWUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O0FBSXBFLFlBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDN0IsY0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixjQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEMsY0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM1QixjQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVCLGlCQUFPO1NBQ1I7O0FBRUQsK0JBQVUsTUFBTSxDQUNkLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUM1RCxDQUFDO09BQ0gsQ0FDRixDQUFDO0tBQ0g7OztXQUVrQiw2QkFBQyxLQUFLLEVBQUU7QUFDekIsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFVBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLFlBQVksRUFBRTtBQUNuQyxlQUFPO09BQ1I7QUFDRCxVQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUM1QixVQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzdCLFVBQUksR0FBRyxRQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxtQkFBZ0IsQ0FBQzs7QUFFcEQsVUFBSSxJQUFJLEdBQUcsZUFBYyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7QUFDeEQsYUFBSyxFQUFMLEtBQUs7QUFDTCxXQUFHLEVBQUgsR0FBRztBQUNILGdCQUFRLEVBQVIsUUFBUTtBQUNSLGdCQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQ3hCLGdCQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQ3hCLG9CQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsRUFDbkQsQ0FBQyxDQUFDOztBQUVILHVCQUFJO0FBQ0YsV0FBRyxFQUFILEdBQUc7QUFDSCxtQkFBVyxFQUFFLElBQUksRUFDbEIsQ0FBQyxDQUFDO0tBQ0o7OztXQUVtQiw4QkFBQyxRQUFRLEVBQUUsYUFBYSxFQUFFO0FBQzVDLFVBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixVQUFJLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDcEIsVUFBSSxJQUFJLFNBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEFBQUUsQ0FBQztBQUNuQyxVQUFJLFlBQVksR0FBRyxzQkFBUyxDQUFDLEVBQUU7Ozs7QUFJN0IsWUFBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLDJCQUFJLGtCQUFrQixDQUFDLENBQUM7QUFDeEIsa0JBQVEsRUFBRSxDQUFDO1NBQ1osTUFBTTtBQUNMLDJCQUFJLFFBQVEsQ0FBQyxDQUFDO0FBQ2QsdUJBQWEsRUFBRSxDQUFDO1NBQ2pCO09BQ0YsQ0FBQzs7QUFFRixVQUFHLENBQUMsYUFBYSxJQUFJLE9BQU8sYUFBYSxBQUFDLEtBQUssVUFBVSxFQUFFO0FBQ3pELHFCQUFhLEdBQUcsWUFBVztBQUN6QixvQkFBVSxDQUFDLFlBQVc7QUFDcEIsbUJBQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQztXQUMzRCxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ1YsQ0FBQztPQUNIOztBQUdELFVBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEUsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUNuQyxVQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekMsVUFBSSxJQUFJLFVBQVEsWUFBWSxtQkFBZ0IsQ0FBQztBQUM3QyxVQUFJLEdBQUcsUUFBTSxRQUFRLFVBQUssSUFBSSxTQUFJLE1BQU0sU0FBSSxJQUFJLEFBQUUsQ0FBQztBQUNuRCx1QkFBSTtBQUNGLFdBQUcsRUFBSCxHQUFHO0FBQ0gsY0FBTSxFQUFOLE1BQU07QUFDTixvQkFBWSxFQUFFLFlBQVk7QUFDMUIscUJBQWEsRUFBRSxhQUFhLEVBQzdCLENBQUMsQ0FBQztLQUNKOzs7V0FFSyxnQkFBQyxRQUFRLEVBQUU7O0FBRWYsVUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLLEVBQUs7QUFDNUIsMkNBQW9CLEtBQUssQ0FBRyxDQUFDO0FBQzdCLGFBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztPQUNmLENBQUMsQ0FBQztBQUNILFVBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7QUFDeEMsV0FBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQzlCLFlBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDdEMsdUJBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDckM7T0FDRjtBQUNELGNBQVEsR0FBRyxRQUFRLElBQUksWUFBVyxFQUFFLENBQUM7QUFDckMsVUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQixVQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0FBQ3RDLFVBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFDLFVBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFVBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFVBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7QUFDN0IsVUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsVUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDekIsVUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsVUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsVUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QixjQUFRLEVBQUUsQ0FBQztLQUNaOzs7V0FFVyxzQkFBQyxLQUFLLEVBQUU7OztBQUNsQixVQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVwRSxVQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZCLFVBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDM0IsVUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7O0FBRXhCLFdBQUssQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFJLEVBQUs7QUFDbEIsWUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN2QyxjQUFLLGNBQWMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDcEMsY0FBSyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDdEMsY0FBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7T0FDN0IsQ0FBQyxDQUFDOztBQUVILFdBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxTQUFTLEVBQUUsUUFBUSxFQUFFLEVBQUU7QUFDdEQsWUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2xDLG9EQUEyQixRQUFRLENBQUcsQ0FBQztBQUN2QyxjQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMvQjtPQUNGO0tBQ0Y7OztXQUVTLHNCQUFHO0FBQ1gsYUFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNwQjs7O1dBRU8sb0JBQUc7QUFDVCxhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7OztXQUVPLGtCQUFDLEtBQUssRUFBRTtBQUNkLFVBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztXQUVVLHFCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7QUFDekIsVUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztBQUN0QyxVQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUEsR0FDN0MsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLEFBQUMsQ0FBQztBQUN4QyxVQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUMvQixVQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQ2hDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNsRDs7O1dBRWUsNEJBQUc7QUFDakIsYUFBTyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQztLQUNqQzs7O1dBRVksdUJBQUMsS0FBSyxFQUFFO0FBQ25CLFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7QUFDOUMsYUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNqRDs7O1dBRWEsd0JBQUMsS0FBSyxFQUFFO0FBQ3BCLFVBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7QUFDOUMsVUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsVUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQ25EOzs7V0FFZ0IsMkJBQUMsS0FBSyxFQUFFO0FBQ3ZCLFVBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDO0FBQ3BELGFBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNwRDs7O1dBRWdCLDJCQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDNUIsVUFBRyxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUU7QUFDN0IsV0FBRyxHQUFHLElBQUksQ0FBQztPQUNaO0FBQ0QsVUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7QUFDcEQsVUFBRyxHQUFHLEVBQUU7QUFDTixZQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ25DLE1BQU07QUFDTCxZQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1IsZUFBTSxJQUFJLEVBQUU7QUFDVixhQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxjQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNiLGtCQUFNO1dBQ1A7QUFDRCxjQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN0QztPQUNGO0tBQ0Y7OztXQUVVLHFCQUFDLEtBQUssRUFBRTtBQUNqQixVQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLEVBQUU7QUFDekIsWUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsWUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BFLGFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDakMsY0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUI7T0FDRjtLQUNGOzs7V0FFZSwwQkFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQzNCLFVBQUcsT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO0FBQzdCLFdBQUcsR0FBRyxJQUFJLENBQUM7T0FDWjtBQUNELFVBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixVQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDN0I7OztXQUVXLHNCQUFDLEtBQUssRUFBRTtBQUNsQixVQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkIsVUFBRyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2xFLGVBQU8sS0FBSyxDQUFDO09BQ2Q7QUFDRCxXQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0MsWUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDakQsaUJBQU8sQ0FBQyxDQUFDO1NBQ1Y7T0FDRjtBQUNELGFBQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDs7O1dBRWEsMEJBQUc7QUFDZixVQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkIsV0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLFlBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUNoRCxpQkFBTyxLQUFLLENBQUM7U0FDZDtPQUNGO0FBQ0QsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBRVUscUJBQUMsS0FBSyxFQUFFO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUM7S0FDMUU7OztXQUVXLHNCQUFDLEtBQUssRUFBRTtBQUNsQixVQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDMUIsZUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztPQUNqRCxNQUFNO0FBQ0wsZUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztPQUNoQztLQUNGOzs7V0FFYyx5QkFBQyxDQUFDLEVBQUU7QUFDakIsVUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO0tBQ25DOzs7V0FFUyxvQkFBQyxDQUFDLEVBQUU7QUFDWixVQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztLQUNyQzs7O1dBRU8sa0JBQUMsQ0FBQyxFQUFFO0FBQ1YsVUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0tBQzVCOzs7V0FFTSxpQkFBQyxDQUFDLEVBQUU7QUFDVCxVQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDM0I7OztXQUVTLG9CQUFDLENBQUMsRUFBRTtBQUNaLFVBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztLQUM5Qjs7O1dBRUssZ0JBQUMsQ0FBQyxFQUFFO0FBQ1IsVUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQzFCOzs7V0FFTSxpQkFBQyxDQUFDLEVBQUU7QUFDVCxVQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDM0I7OztXQUVjLHlCQUFDLENBQUMsRUFBRTtBQUNqQixVQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7S0FDbkM7OztTQXgwQmtCLFFBQVE7OztxQkFBUixRQUFROzs7Ozs7Ozs7Ozs7OztJQ1BSLEtBQUs7V0FBTCxLQUFLOzBCQUFMLEtBQUs7OztlQUFMLEtBQUs7O1dBQ0wsc0JBQUMsTUFBTSxFQUFFOzs7Ozs7QUFNMUIsVUFBRyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO0FBQ3hDLGVBQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQztPQUNyQjtBQUNELGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztXQUNXLGVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNyQixVQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDZixXQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNCLGFBQUssSUFBSSxHQUFHLENBQUM7T0FDZDs7QUFFRCxhQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3BFOzs7V0FDZSxtQkFBQyxNQUFNLEVBQUU7QUFDdkIsVUFBSSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsWUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEQsWUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7QUFHckMsWUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQzNDLGVBQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO09BQzFELENBQUMsQ0FBQzs7QUFFSCxhQUFPLE1BQU0sQ0FBQztLQUNmOzs7V0FDYSxpQkFBQyxJQUFJLEVBQUU7QUFDbkIsYUFBTyxDQUNMLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFDckIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUN0QyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFDakMsR0FBRyxFQUNILEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUNsQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQ3BDLEdBQUcsQ0FDSixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUVaOzs7U0E1Q2tCLEtBQUs7OztxQkFBTCxLQUFLOzs7Ozs7Ozs7cUJDQUYsR0FBRzs7QUFBWixTQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUU7O0FBRWhDLE1BQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7OztBQUdsQyxNQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDOztBQUVuQyxNQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDOzs7QUFHL0IsTUFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxVQUFVLEVBQUU7QUFDL0QsT0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ3ZEOzs7QUFHRCxNQUFHLElBQUksQ0FBQyxhQUFhLElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxLQUFLLFVBQVUsRUFBRTtBQUNqRSxPQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDekQ7OztBQUdELE1BQUcsSUFBSSxDQUFDLG1CQUFtQixJQUN2QixPQUFPLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxVQUFVLEVBQUU7QUFDbEQsT0FBRyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0dBQ3BFOzs7QUFHRCxNQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxVQUFVLEVBQUU7QUFDdkUsT0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7R0FDaEU7OztBQUdELE1BQUcsSUFBSSxDQUFDLGVBQWUsSUFBSSxPQUFPLElBQUksQ0FBQyxlQUFlLEtBQUssVUFBVSxFQUFFO0FBQ3JFLE9BQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0dBQ3ZEOzs7QUFHRCxNQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ25CLE1BQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQixTQUFJLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDckMsVUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUM3QyxZQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDMUIsYUFBRyxJQUFJLEdBQUcsQ0FBQztTQUNaLE1BQU07QUFDTCxhQUFHLElBQUksR0FBRyxDQUFDO1NBQ1o7O0FBRUQsV0FBRyxJQUFJLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzQyxXQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO09BQ3hEO0tBQ0Y7R0FDRjs7O0FBR0QsS0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7QUFHM0IsT0FBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQzlCLFFBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDdEMsU0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDcEQ7R0FDRjs7O0FBR0QsTUFBRyxJQUFJLENBQUMsSUFBSSxFQUFFO0FBQ1osT0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDckIsTUFBTTtBQUNMLE9BQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNaO0FBQ0QsU0FBTyxHQUFHLENBQUM7Q0FDWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVXBsb2FkZXIgZnJvbSAnLi91cGxvYWRlcic7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nJztcblxuZnVuY3Rpb24gbXVsZVVwbG9hZGVyKHNldHRpbmdzKSB7XG4gIC8vIFZlcmlmeSB0aGF0IHRoZSBicm93c2VyIGhhcyB0aGUgbmVlZGVkIEhUTUw1IGNhcGFiaWxpdGllc1xuICBpZighKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRmlsZUxpc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgbG9nKCdIVE1MNSBBUElzIG5vdCBhdmFpbGFibGUuJyk7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLy8gRm9yIG5ldyB3ZWJraXQgYnJvd3NlcnMsIHRoZSAuc2xpY2UoKSBtZXRob2QgaXMgbmFtZWQgLndlYmtpdFNsaWNlKClcbiAgLy8gc2ltaWxhciBmb3IgbW96aWxsYVxuICBGaWxlLnByb3RvdHlwZS5zbGljZSA9IEZpbGUucHJvdG90eXBlLndlYmtpdFNsaWNlIHx8XG4gICAgRmlsZS5wcm90b3R5cGUubW96U2xpY2UgfHwgRmlsZS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgaWYodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIganVzdENoZWNraW5nID0gbmV3IEJsb2IoWydzb21ldGhpbmcnXSk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG4gIGxvZygnT0snKTtcblxuICByZXR1cm4gbmV3IFVwbG9hZGVyKHNldHRpbmdzKTtcbn1cblxuaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93Lm11bGVVcGxvYWRlciA9IG11bGVVcGxvYWRlcjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KSgpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2lzSXRlcmFibGUgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICByZXR1cm4gYXJyO1xuICB9IGVsc2UgaWYgKF9pc0l0ZXJhYmxlKE9iamVjdChhcnIpKSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSBfZ2V0SXRlcmF0b3IoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gIH1cbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XHJcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xyXG5yZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXRlci1oZWxwZXJzJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy8kJykuY29yZS5nZXRJdGVyYXRvcjsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcclxucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XHJcbnJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pdGVyLWhlbHBlcnMnKTtcclxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzLyQnKS5jb3JlLmlzSXRlcmFibGU7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpLmNvcmUuT2JqZWN0LmFzc2lnbjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc3RhdGljcy1hY2NlcHQtcHJpbWl0aXZlcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpLmNvcmUuT2JqZWN0LmtleXM7IiwidmFyICQgPSByZXF1aXJlKCcuLyQnKTtcclxuZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbXNnMSwgbXNnMil7XHJcbiAgaWYoIWNvbmRpdGlvbil0aHJvdyBUeXBlRXJyb3IobXNnMiA/IG1zZzEgKyBtc2cyIDogbXNnMSk7XHJcbn1cclxuYXNzZXJ0LmRlZiA9ICQuYXNzZXJ0RGVmaW5lZDtcclxuYXNzZXJ0LmZuID0gZnVuY3Rpb24oaXQpe1xyXG4gIGlmKCEkLmlzRnVuY3Rpb24oaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XHJcbiAgcmV0dXJuIGl0O1xyXG59O1xyXG5hc3NlcnQub2JqID0gZnVuY3Rpb24oaXQpe1xyXG4gIGlmKCEkLmlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XHJcbiAgcmV0dXJuIGl0O1xyXG59O1xyXG5hc3NlcnQuaW5zdCA9IGZ1bmN0aW9uKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSl7XHJcbiAgaWYoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl0aHJvdyBUeXBlRXJyb3IobmFtZSArIFwiOiB1c2UgdGhlICduZXcnIG9wZXJhdG9yIVwiKTtcclxuICByZXR1cm4gaXQ7XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gYXNzZXJ0OyIsInZhciAkID0gcmVxdWlyZSgnLi8kJyk7XHJcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcclxuLyplc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXtcclxuLyplc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXHJcbiAgdmFyIFQgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKHRhcmdldCkpXHJcbiAgICAsIGwgPSBhcmd1bWVudHMubGVuZ3RoXHJcbiAgICAsIGkgPSAxO1xyXG4gIHdoaWxlKGwgPiBpKXtcclxuICAgIHZhciBTICAgICAgPSAkLkVTNU9iamVjdChhcmd1bWVudHNbaSsrXSlcclxuICAgICAgLCBrZXlzICAgPSAkLmdldEtleXMoUylcclxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxyXG4gICAgICAsIGogICAgICA9IDBcclxuICAgICAgLCBrZXk7XHJcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIFQ7XHJcbn07IiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIFRBRyAgICAgID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpXHJcbiAgLCB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xyXG5mdW5jdGlvbiBjb2YoaXQpe1xyXG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XHJcbn1cclxuY29mLmNsYXNzb2YgPSBmdW5jdGlvbihpdCl7XHJcbiAgdmFyIE8sIFQ7XHJcbiAgcmV0dXJuIGl0ID09IHVuZGVmaW5lZCA/IGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6ICdOdWxsJ1xyXG4gICAgOiB0eXBlb2YgKFQgPSAoTyA9IE9iamVjdChpdCkpW1RBR10pID09ICdzdHJpbmcnID8gVCA6IGNvZihPKTtcclxufTtcclxuY29mLnNldCA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xyXG4gIGlmKGl0ICYmICEkLmhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkkLmhpZGUoaXQsIFRBRywgdGFnKTtcclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBjb2Y7IiwiLy8gT3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXHJcbnZhciBhc3NlcnRGdW5jdGlvbiA9IHJlcXVpcmUoJy4vJC5hc3NlcnQnKS5mbjtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcclxuICBhc3NlcnRGdW5jdGlvbihmbik7XHJcbiAgaWYofmxlbmd0aCAmJiB0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xyXG4gIHN3aXRjaChsZW5ndGgpe1xyXG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XHJcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xyXG4gICAgfTtcclxuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xyXG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcclxuICAgIH07XHJcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcclxuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XHJcbiAgICB9O1xyXG4gIH0gcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xyXG4gICAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbn07IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxyXG4gICwgZ2xvYmFsICAgICA9ICQuZ1xyXG4gICwgY29yZSAgICAgICA9ICQuY29yZVxyXG4gICwgaXNGdW5jdGlvbiA9ICQuaXNGdW5jdGlvbjtcclxuZnVuY3Rpb24gY3R4KGZuLCB0aGF0KXtcclxuICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gIH07XHJcbn1cclxuLy8gdHlwZSBiaXRtYXBcclxuJGRlZi5GID0gMTsgIC8vIGZvcmNlZFxyXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXHJcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcclxuJGRlZi5QID0gODsgIC8vIHByb3RvXHJcbiRkZWYuQiA9IDE2OyAvLyBiaW5kXHJcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXHJcbmZ1bmN0aW9uICRkZWYodHlwZSwgbmFtZSwgc291cmNlKXtcclxuICB2YXIga2V5LCBvd24sIG91dCwgZXhwXHJcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xyXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xyXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSkucHJvdG90eXBlXHJcbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcclxuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xyXG4gIGZvcihrZXkgaW4gc291cmNlKXtcclxuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxyXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcclxuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcclxuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXHJcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xyXG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXHJcbiAgICBpZihpc0dsb2JhbCAmJiAhaXNGdW5jdGlvbih0YXJnZXRba2V5XSkpZXhwID0gc291cmNlW2tleV07XHJcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxyXG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xyXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcclxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xyXG4gICAgICBleHAgPSBmdW5jdGlvbihwYXJhbSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XHJcbiAgICAgIH07XHJcbiAgICAgIGV4cC5wcm90b3R5cGUgPSBDLnByb3RvdHlwZTtcclxuICAgIH0ob3V0KTtcclxuICAgIGVsc2UgZXhwID0gdHlwZSAmICRkZWYuUCAmJiBpc0Z1bmN0aW9uKG91dCkgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcclxuICAgIC8vIGV4cG9ydFxyXG4gICAgJC5oaWRlKGV4cG9ydHMsIGtleSwgZXhwKTtcclxuICB9XHJcbn1cclxubW9kdWxlLmV4cG9ydHMgPSAkZGVmOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJCl7XHJcbiAgJC5GVyAgID0gZmFsc2U7XHJcbiAgJC5wYXRoID0gJC5jb3JlO1xyXG4gIHJldHVybiAkO1xyXG59OyIsIid1c2Ugc3RyaWN0JztcclxudmFyICQgICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsIGN0eCAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXHJcbiAgLCBjb2YgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5jb2YnKVxyXG4gICwgJGRlZiAgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcclxuICAsIGFzc2VydE9iamVjdCAgICAgID0gcmVxdWlyZSgnLi8kLmFzc2VydCcpLm9ialxyXG4gICwgU1lNQk9MX0lURVJBVE9SICAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcclxuICAsIEZGX0lURVJBVE9SICAgICAgID0gJ0BAaXRlcmF0b3InXHJcbiAgLCBJdGVyYXRvcnMgICAgICAgICA9IHt9XHJcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xyXG4vLyBTYWZhcmkgaGFzIGJ5Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXHJcbnZhciBCVUdHWSA9ICdrZXlzJyBpbiBbXSAmJiAhKCduZXh0JyBpbiBbXS5rZXlzKCkpO1xyXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxyXG5zZXRJdGVyYXRvcihJdGVyYXRvclByb3RvdHlwZSwgJC50aGF0KTtcclxuZnVuY3Rpb24gc2V0SXRlcmF0b3IoTywgdmFsdWUpe1xyXG4gICQuaGlkZShPLCBTWU1CT0xfSVRFUkFUT1IsIHZhbHVlKTtcclxuICAvLyBBZGQgaXRlcmF0b3IgZm9yIEZGIGl0ZXJhdG9yIHByb3RvY29sXHJcbiAgaWYoRkZfSVRFUkFUT1IgaW4gW10pJC5oaWRlKE8sIEZGX0lURVJBVE9SLCB2YWx1ZSk7XHJcbn1cclxuZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3IoQ29uc3RydWN0b3IsIE5BTUUsIHZhbHVlLCBERUZBVUxUKXtcclxuICB2YXIgcHJvdG8gPSBDb25zdHJ1Y3Rvci5wcm90b3R5cGVcclxuICAgICwgaXRlciAgPSBwcm90b1tTWU1CT0xfSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdIHx8IHZhbHVlO1xyXG4gIC8vIERlZmluZSBpdGVyYXRvclxyXG4gIGlmKCQuRlcpc2V0SXRlcmF0b3IocHJvdG8sIGl0ZXIpO1xyXG4gIGlmKGl0ZXIgIT09IHZhbHVlKXtcclxuICAgIHZhciBpdGVyUHJvdG8gPSAkLmdldFByb3RvKGl0ZXIuY2FsbChuZXcgQ29uc3RydWN0b3IpKTtcclxuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcclxuICAgIGNvZi5zZXQoaXRlclByb3RvLCBOQU1FICsgJyBJdGVyYXRvcicsIHRydWUpO1xyXG4gICAgLy8gRkYgZml4XHJcbiAgICBpZigkLkZXKSQuaGFzKHByb3RvLCBGRl9JVEVSQVRPUikgJiYgc2V0SXRlcmF0b3IoaXRlclByb3RvLCAkLnRoYXQpO1xyXG4gIH1cclxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XHJcbiAgSXRlcmF0b3JzW05BTUVdID0gaXRlcjtcclxuICAvLyBGRiAmIHY4IGZpeFxyXG4gIEl0ZXJhdG9yc1tOQU1FICsgJyBJdGVyYXRvciddID0gJC50aGF0O1xyXG4gIHJldHVybiBpdGVyO1xyXG59XHJcbmZ1bmN0aW9uIGdldEl0ZXJhdG9yKGl0KXtcclxuICB2YXIgU3ltYm9sICA9ICQuZy5TeW1ib2xcclxuICAgICwgZXh0ICAgICA9IGl0W1N5bWJvbCAmJiBTeW1ib2wuaXRlcmF0b3IgfHwgRkZfSVRFUkFUT1JdXHJcbiAgICAsIGdldEl0ZXIgPSBleHQgfHwgaXRbU1lNQk9MX0lURVJBVE9SXSB8fCBJdGVyYXRvcnNbY29mLmNsYXNzb2YoaXQpXTtcclxuICByZXR1cm4gYXNzZXJ0T2JqZWN0KGdldEl0ZXIuY2FsbChpdCkpO1xyXG59XHJcbmZ1bmN0aW9uIGNsb3NlSXRlcmF0b3IoaXRlcmF0b3Ipe1xyXG4gIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XHJcbiAgaWYocmV0ICE9PSB1bmRlZmluZWQpYXNzZXJ0T2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XHJcbn1cclxuZnVuY3Rpb24gc3RlcENhbGwoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYXNzZXJ0T2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xyXG4gIH0gY2F0Y2goZSl7XHJcbiAgICBjbG9zZUl0ZXJhdG9yKGl0ZXJhdG9yKTtcclxuICAgIHRocm93IGU7XHJcbiAgfVxyXG59XHJcbnZhciAkaXRlciA9IG1vZHVsZS5leHBvcnRzID0ge1xyXG4gIEJVR0dZOiBCVUdHWSxcclxuICBJdGVyYXRvcnM6IEl0ZXJhdG9ycyxcclxuICBwcm90b3R5cGU6IEl0ZXJhdG9yUHJvdG90eXBlLFxyXG4gIHN0ZXA6IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcclxuICAgIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xyXG4gIH0sXHJcbiAgc3RlcENhbGw6IHN0ZXBDYWxsLFxyXG4gIGNsb3NlOiBjbG9zZUl0ZXJhdG9yLFxyXG4gIGlzOiBmdW5jdGlvbihpdCl7XHJcbiAgICB2YXIgTyAgICAgID0gT2JqZWN0KGl0KVxyXG4gICAgICAsIFN5bWJvbCA9ICQuZy5TeW1ib2xcclxuICAgICAgLCBTWU0gICAgPSBTeW1ib2wgJiYgU3ltYm9sLml0ZXJhdG9yIHx8IEZGX0lURVJBVE9SO1xyXG4gICAgcmV0dXJuIFNZTSBpbiBPIHx8IFNZTUJPTF9JVEVSQVRPUiBpbiBPIHx8ICQuaGFzKEl0ZXJhdG9ycywgY29mLmNsYXNzb2YoTykpO1xyXG4gIH0sXHJcbiAgZ2V0OiBnZXRJdGVyYXRvcixcclxuICBzZXQ6IHNldEl0ZXJhdG9yLFxyXG4gIGNyZWF0ZTogZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQsIHByb3RvKXtcclxuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9ICQuY3JlYXRlKHByb3RvIHx8ICRpdGVyLnByb3RvdHlwZSwge25leHQ6ICQuZGVzYygxLCBuZXh0KX0pO1xyXG4gICAgY29mLnNldChDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcclxuICB9LFxyXG4gIGRlZmluZTogZGVmaW5lSXRlcmF0b3IsXHJcbiAgc3RkOiBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRSl7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVJdGVyKGtpbmQpe1xyXG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgJGl0ZXIuY3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcclxuICAgIHZhciBlbnRyaWVzID0gY3JlYXRlSXRlcigna2V5K3ZhbHVlJylcclxuICAgICAgLCB2YWx1ZXMgID0gY3JlYXRlSXRlcigndmFsdWUnKVxyXG4gICAgICAsIHByb3RvICAgPSBCYXNlLnByb3RvdHlwZVxyXG4gICAgICAsIG1ldGhvZHMsIGtleTtcclxuICAgIGlmKERFRkFVTFQgPT0gJ3ZhbHVlJyl2YWx1ZXMgPSBkZWZpbmVJdGVyYXRvcihCYXNlLCBOQU1FLCB2YWx1ZXMsICd2YWx1ZXMnKTtcclxuICAgIGVsc2UgZW50cmllcyA9IGRlZmluZUl0ZXJhdG9yKEJhc2UsIE5BTUUsIGVudHJpZXMsICdlbnRyaWVzJyk7XHJcbiAgICBpZihERUZBVUxUKXtcclxuICAgICAgbWV0aG9kcyA9IHtcclxuICAgICAgICBlbnRyaWVzOiBlbnRyaWVzLFxyXG4gICAgICAgIGtleXM6ICAgIElTX1NFVCA/IHZhbHVlcyA6IGNyZWF0ZUl0ZXIoJ2tleScpLFxyXG4gICAgICAgIHZhbHVlczogIHZhbHVlc1xyXG4gICAgICB9O1xyXG4gICAgICAkZGVmKCRkZWYuUCArICRkZWYuRiAqIEJVR0dZLCBOQU1FLCBtZXRob2RzKTtcclxuICAgICAgaWYoRk9SQ0UpZm9yKGtleSBpbiBtZXRob2RzKXtcclxuICAgICAgICBpZighKGtleSBpbiBwcm90bykpJC5oaWRlKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGZvck9mOiBmdW5jdGlvbihpdGVyYWJsZSwgZW50cmllcywgZm4sIHRoYXQpe1xyXG4gICAgdmFyIGl0ZXJhdG9yID0gZ2V0SXRlcmF0b3IoaXRlcmFibGUpXHJcbiAgICAgICwgZiA9IGN0eChmbiwgdGhhdCwgZW50cmllcyA/IDIgOiAxKVxyXG4gICAgICAsIHN0ZXA7XHJcbiAgICB3aGlsZSghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpe1xyXG4gICAgICBpZihzdGVwQ2FsbChpdGVyYXRvciwgZiwgc3RlcC52YWx1ZSwgZW50cmllcykgPT09IGZhbHNlKXtcclxuICAgICAgICByZXR1cm4gY2xvc2VJdGVyYXRvcihpdGVyYXRvcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn07IiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgZ2xvYmFsID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKVxyXG4gICwgY29yZSAgID0ge31cclxuICAsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XHJcbiAgLCBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5XHJcbiAgLCBjZWlsICA9IE1hdGguY2VpbFxyXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yXHJcbiAgLCBtYXggICA9IE1hdGgubWF4XHJcbiAgLCBtaW4gICA9IE1hdGgubWluO1xyXG4vLyBUaGUgZW5naW5lIHdvcmtzIGZpbmUgd2l0aCBkZXNjcmlwdG9ycz8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eS5cclxudmFyIERFU0MgPSAhIWZ1bmN0aW9uKCl7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gMjsgfX0pLmEgPT0gMjtcclxuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XHJcbn0oKTtcclxudmFyIGhpZGUgPSBjcmVhdGVEZWZpbmVyKDEpO1xyXG4vLyA3LjEuNCBUb0ludGVnZXJcclxuZnVuY3Rpb24gdG9JbnRlZ2VyKGl0KXtcclxuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcclxufVxyXG5mdW5jdGlvbiBkZXNjKGJpdG1hcCwgdmFsdWUpe1xyXG4gIHJldHVybiB7XHJcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXHJcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXHJcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXHJcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXHJcbiAgfTtcclxufVxyXG5mdW5jdGlvbiBzaW1wbGVTZXQob2JqZWN0LCBrZXksIHZhbHVlKXtcclxuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xyXG4gIHJldHVybiBvYmplY3Q7XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlRGVmaW5lcihiaXRtYXApe1xyXG4gIHJldHVybiBERVNDID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcclxuICAgIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGRlc2MoYml0bWFwLCB2YWx1ZSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXHJcbiAgfSA6IHNpbXBsZVNldDtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPYmplY3QoaXQpe1xyXG4gIHJldHVybiBpdCAhPT0gbnVsbCAmJiAodHlwZW9mIGl0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nKTtcclxufVxyXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGl0KXtcclxuICByZXR1cm4gdHlwZW9mIGl0ID09ICdmdW5jdGlvbic7XHJcbn1cclxuZnVuY3Rpb24gYXNzZXJ0RGVmaW5lZChpdCl7XHJcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcclxuICByZXR1cm4gaXQ7XHJcbn1cclxuXHJcbnZhciAkID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZncnKSh7XHJcbiAgZzogZ2xvYmFsLFxyXG4gIGNvcmU6IGNvcmUsXHJcbiAgaHRtbDogZ2xvYmFsLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcclxuICAvLyBodHRwOi8vanNwZXJmLmNvbS9jb3JlLWpzLWlzb2JqZWN0XHJcbiAgaXNPYmplY3Q6ICAgaXNPYmplY3QsXHJcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcclxuICBpdDogZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGl0O1xyXG4gIH0sXHJcbiAgdGhhdDogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0sXHJcbiAgLy8gNy4xLjQgVG9JbnRlZ2VyXHJcbiAgdG9JbnRlZ2VyOiB0b0ludGVnZXIsXHJcbiAgLy8gNy4xLjE1IFRvTGVuZ3RoXHJcbiAgdG9MZW5ndGg6IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXHJcbiAgfSxcclxuICB0b0luZGV4OiBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcclxuICAgIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcclxuICAgIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xyXG4gIH0sXHJcbiAgaGFzOiBmdW5jdGlvbihpdCwga2V5KXtcclxuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlOiAgICAgT2JqZWN0LmNyZWF0ZSxcclxuICBnZXRQcm90bzogICBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXHJcbiAgREVTQzogICAgICAgREVTQyxcclxuICBkZXNjOiAgICAgICBkZXNjLFxyXG4gIGdldERlc2M6ICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXHJcbiAgc2V0RGVzYzogICAgZGVmaW5lUHJvcGVydHksXHJcbiAgZ2V0S2V5czogICAgT2JqZWN0LmtleXMsXHJcbiAgZ2V0TmFtZXM6ICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXHJcbiAgZ2V0U3ltYm9sczogT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcclxuICAvLyBEdW1teSwgZml4IGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5nIGluIGVzNSBtb2R1bGVcclxuICBhc3NlcnREZWZpbmVkOiBhc3NlcnREZWZpbmVkLFxyXG4gIEVTNU9iamVjdDogT2JqZWN0LFxyXG4gIHRvT2JqZWN0OiBmdW5jdGlvbihpdCl7XHJcbiAgICByZXR1cm4gJC5FUzVPYmplY3QoYXNzZXJ0RGVmaW5lZChpdCkpO1xyXG4gIH0sXHJcbiAgaGlkZTogaGlkZSxcclxuICBkZWY6IGNyZWF0ZURlZmluZXIoMCksXHJcbiAgc2V0OiBnbG9iYWwuU3ltYm9sID8gc2ltcGxlU2V0IDogaGlkZSxcclxuICBtaXg6IGZ1bmN0aW9uKHRhcmdldCwgc3JjKXtcclxuICAgIGZvcih2YXIga2V5IGluIHNyYyloaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH0sXHJcbiAgZWFjaDogW10uZm9yRWFjaFxyXG59KTtcclxuaWYodHlwZW9mIF9fZSAhPSAndW5kZWZpbmVkJylfX2UgPSBjb3JlO1xyXG5pZih0eXBlb2YgX19nICE9ICd1bmRlZmluZWQnKV9fZyA9IGdsb2JhbDsiLCIndXNlIHN0cmljdCc7XHJcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxyXG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcclxudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xyXG4gIHJldHVybiBmdW5jdGlvbihwb3Mpe1xyXG4gICAgdmFyIHMgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxyXG4gICAgICAsIGkgPSAkLnRvSW50ZWdlcihwb3MpXHJcbiAgICAgICwgbCA9IHMubGVuZ3RoXHJcbiAgICAgICwgYSwgYjtcclxuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XHJcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xyXG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxyXG4gICAgICB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcclxuICAgICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxyXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xyXG4gIH07XHJcbn07IiwidmFyIHNpZCA9IDA7XHJcbmZ1bmN0aW9uIHVpZChrZXkpe1xyXG4gIHJldHVybiAnU3ltYm9sKCcgKyBrZXkgKyAnKV8nICsgKCsrc2lkICsgTWF0aC5yYW5kb20oKSkudG9TdHJpbmcoMzYpO1xyXG59XHJcbnVpZC5zYWZlID0gcmVxdWlyZSgnLi8kJykuZy5TeW1ib2wgfHwgdWlkO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHVpZDsiLCIvLyAyMi4xLjMuMzEgQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXHJcbnZhciAkICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBVTlNDT1BBQkxFUyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndW5zY29wYWJsZXMnKTtcclxuaWYoJC5GVyAmJiAhKFVOU0NPUEFCTEVTIGluIFtdKSkkLmhpZGUoQXJyYXkucHJvdG90eXBlLCBVTlNDT1BBQkxFUywge30pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgaWYoJC5GVylbXVtVTlNDT1BBQkxFU11ba2V5XSA9IHRydWU7XHJcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vJCcpLmdcclxuICAsIHN0b3JlICA9IHt9O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xyXG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxyXG4gICAgZ2xvYmFsLlN5bWJvbCAmJiBnbG9iYWwuU3ltYm9sW25hbWVdIHx8IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdTeW1ib2wuJyArIG5hbWUpKTtcclxufTsiLCJ2YXIgY29yZSAgPSByZXF1aXJlKCcuLyQnKS5jb3JlXHJcbiAgLCAkaXRlciA9IHJlcXVpcmUoJy4vJC5pdGVyJyk7XHJcbmNvcmUuaXNJdGVyYWJsZSAgPSAkaXRlci5pcztcclxuY29yZS5nZXRJdGVyYXRvciA9ICRpdGVyLmdldDsiLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxyXG4gICwgSVRFUiAgICAgICA9IHJlcXVpcmUoJy4vJC51aWQnKS5zYWZlKCdpdGVyJylcclxuICAsICRpdGVyICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcicpXHJcbiAgLCBzdGVwICAgICAgID0gJGl0ZXIuc3RlcFxyXG4gICwgSXRlcmF0b3JzICA9ICRpdGVyLkl0ZXJhdG9ycztcclxuXHJcbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcclxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcclxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxyXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcclxuJGl0ZXIuc3RkKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XHJcbiAgJC5zZXQodGhpcywgSVRFUiwge286ICQudG9PYmplY3QoaXRlcmF0ZWQpLCBpOiAwLCBrOiBraW5kfSk7XHJcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxyXG59LCBmdW5jdGlvbigpe1xyXG4gIHZhciBpdGVyICA9IHRoaXNbSVRFUl1cclxuICAgICwgTyAgICAgPSBpdGVyLm9cclxuICAgICwga2luZCAgPSBpdGVyLmtcclxuICAgICwgaW5kZXggPSBpdGVyLmkrKztcclxuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XHJcbiAgICBpdGVyLm8gPSB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4gc3RlcCgxKTtcclxuICB9XHJcbiAgaWYoa2luZCA9PSAna2V5JyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcclxuICBpZihraW5kID09ICd2YWx1ZScpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xyXG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcclxufSwgJ3ZhbHVlJyk7XHJcblxyXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXHJcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XHJcblxyXG5zZXRVbnNjb3BlKCdrZXlzJyk7XHJcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xyXG5zZXRVbnNjb3BlKCdlbnRyaWVzJyk7IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcclxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XHJcbiRkZWYoJGRlZi5TLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi8kLmFzc2lnbicpfSk7IiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcclxuICAsICRkZWYgICAgID0gcmVxdWlyZSgnLi8kLmRlZicpXHJcbiAgLCBpc09iamVjdCA9ICQuaXNPYmplY3RcclxuICAsIHRvT2JqZWN0ID0gJC50b09iamVjdDtcclxuZnVuY3Rpb24gd3JhcE9iamVjdE1ldGhvZChNRVRIT0QsIE1PREUpe1xyXG4gIHZhciBmbiAgPSAoJC5jb3JlLk9iamVjdCB8fCB7fSlbTUVUSE9EXSB8fCBPYmplY3RbTUVUSE9EXVxyXG4gICAgLCBmICAgPSAwXHJcbiAgICAsIG8gICA9IHt9O1xyXG4gIG9bTUVUSE9EXSA9IE1PREUgPT0gMSA/IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBpdDtcclxuICB9IDogTU9ERSA9PSAyID8gZnVuY3Rpb24oaXQpe1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KGl0KSA/IGZuKGl0KSA6IHRydWU7XHJcbiAgfSA6IE1PREUgPT0gMyA/IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiBpc09iamVjdChpdCkgPyBmbihpdCkgOiBmYWxzZTtcclxuICB9IDogTU9ERSA9PSA0ID8gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xyXG4gICAgcmV0dXJuIGZuKHRvT2JqZWN0KGl0KSwga2V5KTtcclxuICB9IDogTU9ERSA9PSA1ID8gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xyXG4gICAgcmV0dXJuIGZuKE9iamVjdCgkLmFzc2VydERlZmluZWQoaXQpKSk7XHJcbiAgfSA6IGZ1bmN0aW9uKGl0KXtcclxuICAgIHJldHVybiBmbih0b09iamVjdChpdCkpO1xyXG4gIH07XHJcbiAgdHJ5IHtcclxuICAgIGZuKCd6Jyk7XHJcbiAgfSBjYXRjaChlKXtcclxuICAgIGYgPSAxO1xyXG4gIH1cclxuICAkZGVmKCRkZWYuUyArICRkZWYuRiAqIGYsICdPYmplY3QnLCBvKTtcclxufVxyXG53cmFwT2JqZWN0TWV0aG9kKCdmcmVlemUnLCAxKTtcclxud3JhcE9iamVjdE1ldGhvZCgnc2VhbCcsIDEpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdwcmV2ZW50RXh0ZW5zaW9ucycsIDEpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdpc0Zyb3plbicsIDIpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdpc1NlYWxlZCcsIDIpO1xyXG53cmFwT2JqZWN0TWV0aG9kKCdpc0V4dGVuc2libGUnLCAzKTtcclxud3JhcE9iamVjdE1ldGhvZCgnZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJywgNCk7XHJcbndyYXBPYmplY3RNZXRob2QoJ2dldFByb3RvdHlwZU9mJywgNSk7XHJcbndyYXBPYmplY3RNZXRob2QoJ2tleXMnKTtcclxud3JhcE9iamVjdE1ldGhvZCgnZ2V0T3duUHJvcGVydHlOYW1lcycpOyIsInZhciBzZXQgICA9IHJlcXVpcmUoJy4vJCcpLnNldFxyXG4gICwgYXQgICAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSlcclxuICAsIElURVIgID0gcmVxdWlyZSgnLi8kLnVpZCcpLnNhZmUoJ2l0ZXInKVxyXG4gICwgJGl0ZXIgPSByZXF1aXJlKCcuLyQuaXRlcicpXHJcbiAgLCBzdGVwICA9ICRpdGVyLnN0ZXA7XHJcblxyXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXHJcbiRpdGVyLnN0ZChTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XHJcbiAgc2V0KHRoaXMsIElURVIsIHtvOiBTdHJpbmcoaXRlcmF0ZWQpLCBpOiAwfSk7XHJcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcclxufSwgZnVuY3Rpb24oKXtcclxuICB2YXIgaXRlciAgPSB0aGlzW0lURVJdXHJcbiAgICAsIE8gICAgID0gaXRlci5vXHJcbiAgICAsIGluZGV4ID0gaXRlci5pXHJcbiAgICAsIHBvaW50O1xyXG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiBzdGVwKDEpO1xyXG4gIHBvaW50ID0gYXQuY2FsbChPLCBpbmRleCk7XHJcbiAgaXRlci5pICs9IHBvaW50Lmxlbmd0aDtcclxuICByZXR1cm4gc3RlcCgwLCBwb2ludCk7XHJcbn0pOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XHJcbnZhciAkICAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXHJcbiAgLCBJdGVyYXRvcnMgICA9IHJlcXVpcmUoJy4vJC5pdGVyJykuSXRlcmF0b3JzXHJcbiAgLCBJVEVSQVRPUiAgICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxyXG4gICwgQXJyYXlWYWx1ZXMgPSBJdGVyYXRvcnMuQXJyYXlcclxuICAsIE5vZGVMaXN0ICAgID0gJC5nLk5vZGVMaXN0O1xyXG5pZigkLkZXICYmIE5vZGVMaXN0ICYmICEoSVRFUkFUT1IgaW4gTm9kZUxpc3QucHJvdG90eXBlKSl7XHJcbiAgJC5oaWRlKE5vZGVMaXN0LnByb3RvdHlwZSwgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcclxufVxyXG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBBcnJheVZhbHVlczsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeSgpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0cm9vdC5DcnlwdG9KUyA9IGZhY3RvcnkoKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cblx0LyoqXG5cdCAqIENyeXB0b0pTIGNvcmUgY29tcG9uZW50cy5cblx0ICovXG5cdHZhciBDcnlwdG9KUyA9IENyeXB0b0pTIHx8IChmdW5jdGlvbiAoTWF0aCwgdW5kZWZpbmVkKSB7XG5cdCAgICAvKipcblx0ICAgICAqIENyeXB0b0pTIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBMaWJyYXJ5IG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfbGliID0gQy5saWIgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBCYXNlIG9iamVjdCBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEJhc2UgPSBDX2xpYi5CYXNlID0gKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBGKCkge31cblxuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvdmVycmlkZXMgUHJvcGVydGllcyB0byBjb3B5IGludG8gdGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnLFxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIG1ldGhvZDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgZXh0ZW5kOiBmdW5jdGlvbiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBTcGF3blxuXHQgICAgICAgICAgICAgICAgRi5wcm90b3R5cGUgPSB0aGlzO1xuXHQgICAgICAgICAgICAgICAgdmFyIHN1YnR5cGUgPSBuZXcgRigpO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBBdWdtZW50XG5cdCAgICAgICAgICAgICAgICBpZiAob3ZlcnJpZGVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5taXhJbihvdmVycmlkZXMpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBDcmVhdGUgZGVmYXVsdCBpbml0aWFsaXplclxuXHQgICAgICAgICAgICAgICAgaWYgKCFzdWJ0eXBlLmhhc093blByb3BlcnR5KCdpbml0JykpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0ICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplcidzIHByb3RvdHlwZSBpcyB0aGUgc3VidHlwZSBvYmplY3Rcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdC5wcm90b3R5cGUgPSBzdWJ0eXBlO1xuXG5cdCAgICAgICAgICAgICAgICAvLyBSZWZlcmVuY2Ugc3VwZXJ0eXBlXG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlciA9IHRoaXM7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBzdWJ0eXBlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBFeHRlbmRzIHRoaXMgb2JqZWN0IGFuZCBydW5zIHRoZSBpbml0IG1ldGhvZC5cblx0ICAgICAgICAgICAgICogQXJndW1lbnRzIHRvIGNyZWF0ZSgpIHdpbGwgYmUgcGFzc2VkIHRvIGluaXQoKS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGluc3RhbmNlID0gTXlUeXBlLmNyZWF0ZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmV4dGVuZCgpO1xuXHQgICAgICAgICAgICAgICAgaW5zdGFuY2UuaW5pdC5hcHBseShpbnN0YW5jZSwgYXJndW1lbnRzKTtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKiBPdmVycmlkZSB0aGlzIG1ldGhvZCB0byBhZGQgc29tZSBsb2dpYyB3aGVuIHlvdXIgb2JqZWN0cyBhcmUgY3JlYXRlZC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBNeVR5cGUgPSBDcnlwdG9KUy5saWIuQmFzZS5leHRlbmQoe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICAgICAgLy8gLi4uXG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENvcGllcyBwcm9wZXJ0aWVzIGludG8gdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIFRoZSBwcm9wZXJ0aWVzIHRvIG1peCBpbi5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIE15VHlwZS5taXhJbih7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZSdcblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgbWl4SW46IGZ1bmN0aW9uIChwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHByb3BlcnR5TmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1twcm9wZXJ0eU5hbWVdID0gcHJvcGVydGllc1twcm9wZXJ0eU5hbWVdO1xuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSUUgd29uJ3QgY29weSB0b1N0cmluZyB1c2luZyB0aGUgbG9vcCBhYm92ZVxuXHQgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzLnRvU3RyaW5nID0gcHJvcGVydGllcy50b1N0cmluZztcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGNsb25lLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gaW5zdGFuY2UuY2xvbmUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0LnByb3RvdHlwZS5leHRlbmQodGhpcyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9O1xuXHQgICAgfSgpKTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtBcnJheX0gd29yZHMgVGhlIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzaWdCeXRlcyBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheSA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHdvcmRzIChPcHRpb25hbCkgQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzaWdCeXRlcyAoT3B0aW9uYWwpIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhlIHdvcmRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10sIDYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uICh3b3Jkcywgc2lnQnl0ZXMpIHtcblx0ICAgICAgICAgICAgd29yZHMgPSB0aGlzLndvcmRzID0gd29yZHMgfHwgW107XG5cblx0ICAgICAgICAgICAgaWYgKHNpZ0J5dGVzICE9IHVuZGVmaW5lZCkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5zaWdCeXRlcyA9IHdvcmRzLmxlbmd0aCAqIDQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgdGhpcyB3b3JkIGFycmF5IHRvIGEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtFbmNvZGVyfSBlbmNvZGVyIChPcHRpb25hbCkgVGhlIGVuY29kaW5nIHN0cmF0ZWd5IHRvIHVzZS4gRGVmYXVsdDogQ3J5cHRvSlMuZW5jLkhleFxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgc3RyaW5naWZpZWQgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheSArICcnO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKCk7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoQ3J5cHRvSlMuZW5jLlV0ZjgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbiAoZW5jb2Rlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gKGVuY29kZXIgfHwgSGV4KS5zdHJpbmdpZnkodGhpcyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbmNhdGVuYXRlcyBhIHdvcmQgYXJyYXkgdG8gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgd29yZEFycmF5MS5jb25jYXQod29yZEFycmF5Mik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY29uY2F0OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgdGhpc1dvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRXb3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHRoaXNTaWdCeXRlcyA9IHRoaXMuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0U2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAgdGhpcy5jbGFtcCgpO1xuXG5cdCAgICAgICAgICAgIC8vIENvbmNhdFxuXHQgICAgICAgICAgICBpZiAodGhpc1NpZ0J5dGVzICUgNCkge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgYnl0ZSBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgdGhhdEJ5dGUgPSAodGhhdFdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSB8PSB0aGF0Qnl0ZSA8PCAoMjQgLSAoKHRoaXNTaWdCeXRlcyArIGkpICUgNCkgKiA4KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0V29yZHMubGVuZ3RoID4gMHhmZmZmKSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdID0gdGhhdFdvcmRzW2kgPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBhbGwgd29yZHMgYXQgb25jZVxuXHQgICAgICAgICAgICAgICAgdGhpc1dvcmRzLnB1c2guYXBwbHkodGhpc1dvcmRzLCB0aGF0V29yZHMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIHZhciByID0gKGZ1bmN0aW9uIChtX3cpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBtX3cgPSBtX3c7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV96ID0gMHgzYWRlNjhiMTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYXNrID0gMHhmZmZmZmZmZjtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBtX3ogPSAoMHg5MDY5ICogKG1feiAmIDB4RkZGRikgKyAobV96ID4+IDB4MTApKSAmIG1hc2s7XG5cdCAgICAgICAgICAgICAgICAgICAgbV93ID0gKDB4NDY1MCAqIChtX3cgJiAweEZGRkYpICsgKG1fdyA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAoKG1feiA8PCAweDEwKSArIG1fdykgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlc3VsdCAvPSAweDEwMDAwMDAwMDtcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMC41O1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgKiAoTWF0aC5yYW5kb20oKSA+IC41ID8gMSA6IC0xKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJjYWNoZTsgaSA8IG5CeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgX3IgPSByKChyY2FjaGUgfHwgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwMDAwMCk7XG5cblx0ICAgICAgICAgICAgICAgIHJjYWNoZSA9IF9yKCkgKiAweDNhZGU2N2I3O1xuXHQgICAgICAgICAgICAgICAgd29yZHMucHVzaCgoX3IoKSAqIDB4MTAwMDAwMDAwKSB8IDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGRhdGFTaWdCeXRlcyA9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSB0aGlzLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBibG9ja3MgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CbG9ja3NSZWFkeSA9IGRhdGFTaWdCeXRlcyAvIGJsb2NrU2l6ZUJ5dGVzO1xuXHQgICAgICAgICAgICBpZiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gaW5jbHVkZSBwYXJ0aWFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5jZWlsKG5CbG9ja3NSZWFkeSk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCBkb3duIHRvIGluY2x1ZGUgb25seSBmdWxsIGJsb2Nrcyxcblx0ICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBtdXN0IHJlbWFpbiBpbiB0aGUgYnVmZmVyXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLm1heCgobkJsb2Nrc1JlYWR5IHwgMCkgLSB0aGlzLl9taW5CdWZmZXJTaXplLCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvdW50IHdvcmRzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuV29yZHNSZWFkeSA9IG5CbG9ja3NSZWFkeSAqIGJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBieXRlcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJ5dGVzUmVhZHkgPSBNYXRoLm1pbihuV29yZHNSZWFkeSAqIDQsIGRhdGFTaWdCeXRlcyk7XG5cblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBibG9ja3Ncblx0ICAgICAgICAgICAgaWYgKG5Xb3Jkc1JlYWR5KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBuV29yZHNSZWFkeTsgb2Zmc2V0ICs9IGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtYWxnb3JpdGhtIGxvZ2ljXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9Qcm9jZXNzQmxvY2soZGF0YVdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0cmV0dXJuIENyeXB0b0pTLmVuYy5IZXg7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMjU2XCIpLCByZXF1aXJlKFwiLi9obWFjXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3NoYTI1NlwiLCBcIi4vaG1hY1wiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0cmV0dXJuIENyeXB0b0pTLkhtYWNTSEEyNTY7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBITUFDIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhNQUMgPSBDX2FsZ28uSE1BQyA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2ggYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWNIYXNoZXIgPSBDcnlwdG9KUy5hbGdvLkhNQUMuY3JlYXRlKENyeXB0b0pTLmFsZ28uU0hBMjU2LCBrZXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChoYXNoZXIsIGtleSkge1xuXHQgICAgICAgICAgICAvLyBJbml0IGhhc2hlclxuXHQgICAgICAgICAgICBoYXNoZXIgPSB0aGlzLl9oYXNoZXIgPSBuZXcgaGFzaGVyLmluaXQoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBrZXkgPSBVdGY4LnBhcnNlKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2hlckJsb2NrU2l6ZSA9IGhhc2hlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemVCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQWxsb3cgYXJiaXRyYXJ5IGxlbmd0aCBrZXlzXG5cdCAgICAgICAgICAgIGlmIChrZXkuc2lnQnl0ZXMgPiBoYXNoZXJCbG9ja1NpemVCeXRlcykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gaGFzaGVyLmZpbmFsaXplKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICBrZXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBrZXkgZm9yIGlubmVyIGFuZCBvdXRlciBwYWRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5ID0gdGhpcy5fb0tleSA9IGtleS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB2YXIgaUtleSA9IHRoaXMuX2lLZXkgPSBrZXkuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIG9LZXlXb3JkcyA9IG9LZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpS2V5V29yZHMgPSBpS2V5LndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFhPUiBrZXlzIHdpdGggcGFkIGNvbnN0YW50c1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhc2hlckJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBvS2V5V29yZHNbaV0gXj0gMHg1YzVjNWM1Yztcblx0ICAgICAgICAgICAgICAgIGlLZXlXb3Jkc1tpXSBePSAweDM2MzYzNjM2O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG9LZXkuc2lnQnl0ZXMgPSBpS2V5LnNpZ0J5dGVzID0gaGFzaGVyQmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgSE1BQyB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXIgPSB0aGlzLl9oYXNoZXI7XG5cblx0ICAgICAgICAgICAgLy8gUmVzZXRcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIGhhc2hlci51cGRhdGUodGhpcy5faUtleSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBITUFDIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hNQUN9IFRoaXMgSE1BQyBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2hlci51cGRhdGUobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIEhNQUMgY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgSE1BQ1xuXHQgICAgICAgICAgICB2YXIgaW5uZXJIYXNoID0gaGFzaGVyLmZpbmFsaXplKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgdmFyIGhtYWMgPSBoYXNoZXIuZmluYWxpemUodGhpcy5fb0tleS5jbG9uZSgpLmNvbmNhdChpbm5lckhhc2gpKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaG1hYztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBJbml0aWFsaXphdGlvbiBhbmQgcm91bmQgY29uc3RhbnRzIHRhYmxlc1xuXHQgICAgdmFyIEggPSBbXTtcblx0ICAgIHZhciBLID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIGlzUHJpbWUobikge1xuXHQgICAgICAgICAgICB2YXIgc3FydE4gPSBNYXRoLnNxcnQobik7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGZhY3RvciA9IDI7IGZhY3RvciA8PSBzcXJ0TjsgZmFjdG9yKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmICghKG4gJSBmYWN0b3IpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZnVuY3Rpb24gZ2V0RnJhY3Rpb25hbEJpdHMobikge1xuXHQgICAgICAgICAgICByZXR1cm4gKChuIC0gKG4gfCAwKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBuID0gMjtcblx0ICAgICAgICB2YXIgblByaW1lID0gMDtcblx0ICAgICAgICB3aGlsZSAoblByaW1lIDwgNjQpIHtcblx0ICAgICAgICAgICAgaWYgKGlzUHJpbWUobikpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChuUHJpbWUgPCA4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgSFtuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDIpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIEtbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAzKSk7XG5cblx0ICAgICAgICAgICAgICAgIG5QcmltZSsrO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgbisrO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdFxuXHQgICAgdmFyIFcgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMjU2IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1NiA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoSC5zbGljZSgwKSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cdCAgICAgICAgICAgIHZhciBmID0gSFs1XTtcblx0ICAgICAgICAgICAgdmFyIGcgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgaCA9IEhbN107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCA9IFdbaSAtIDE1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwICA9ICgoZ2FtbWEweCA8PCAyNSkgfCAoZ2FtbWEweCA+Pj4gNykpICBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMHggPDwgMTQpIHwgKGdhbW1hMHggPj4+IDE4KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTB4ID4+PiAzKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4ID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMSAgPSAoKGdhbW1hMXggPDwgMTUpIHwgKGdhbW1hMXggPj4+IDE3KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTF4IDw8IDEzKSB8IChnYW1tYTF4ID4+PiAxOSkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWExeCA+Pj4gMTApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2ggID0gKGUgJiBmKSBeICh+ZSAmIGcpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1haiA9IChhICYgYikgXiAoYSAmIGMpIF4gKGIgJiBjKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMCA9ICgoYSA8PCAzMCkgfCAoYSA+Pj4gMikpIF4gKChhIDw8IDE5KSB8IChhID4+PiAxMykpIF4gKChhIDw8IDEwKSB8IChhID4+PiAyMikpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMSA9ICgoZSA8PCAyNikgfCAoZSA+Pj4gNikpIF4gKChlIDw8IDIxKSB8IChlID4+PiAxMSkpIF4gKChlIDw8IDcpICB8IChlID4+PiAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IHNpZ21hMCArIG1hajtcblxuXHQgICAgICAgICAgICAgICAgaCA9IGc7XG5cdCAgICAgICAgICAgICAgICBnID0gZjtcblx0ICAgICAgICAgICAgICAgIGYgPSBlO1xuXHQgICAgICAgICAgICAgICAgZSA9IChkICsgdDEpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IGI7XG5cdCAgICAgICAgICAgICAgICBiID0gYTtcblx0ICAgICAgICAgICAgICAgIGEgPSAodDEgKyB0MikgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgICAgICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNV0gPSAoSFs1XSArIGYpIHwgMDtcblx0ICAgICAgICAgICAgSFs2XSA9IChIWzZdICsgZykgfCAwO1xuXHQgICAgICAgICAgICBIWzddID0gKEhbN10gKyBoKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1NignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMjU2KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEyNTYobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTI1Nik7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTI1NjtcblxufSkpOyIsImltcG9ydCBYSFIgZnJvbSAnLi94aHInO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFNIQTI1NiBmcm9tICdjcnlwdG8tanMvc2hhMjU2JztcbmltcG9ydCBIbWFjU0hBMjU2IGZyb20gJ2NyeXB0by1qcy9obWFjLXNoYTI1Nic7XG5pbXBvcnQgSGV4IGZyb20gJ2NyeXB0by1qcy9lbmMtaGV4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW1hem9uWEhSIHtcbiAgY29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG4gICAgdGhpcy5zZXR0aW5ncy5hdXRoID0gdGhpcy5zZXR0aW5ncy5hdXRoIHx8IHt9O1xuICAgIHRoaXMuc2V0dGluZ3MuaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycyB8fCB7fTtcbiAgICB0aGlzLnNldHRpbmdzLnF1ZXJ5c3RyaW5nID0gdGhpcy5zZXR0aW5ncy5xdWVyeXN0cmluZyB8fCB7fTtcblxuICAgIGlmKCF0aGlzLnNldHRpbmdzLmF1dGguZGF0ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGluc3RhbnRpYXRpb24sIG1pc3NpbmcgYXV0aC5kYXRlJyk7XG4gICAgfVxuICAgIGlmKCF0aGlzLnNldHRpbmdzLmF1dGguc2lnbmF0dXJlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHNpZ25hdHVyZSBwcm92aWRlZC4nKTtcbiAgICB9XG4gIH1cblxuICBzZW5kKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZXF1ZXN0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLnNldHRpbmdzLmhlYWRlcnM7XG5cbiAgICBjb25zdCBidWNrZXQgPSB0aGlzLnNldHRpbmdzLmF1dGguYnVja2V0O1xuICAgIGNvbnN0IHJlZ2lvblN0cmluZyA9IHV0aWxzLnJlZ2lvblN0cmluZyh0aGlzLnNldHRpbmdzLmF1dGgucmVnaW9uKTtcbiAgICB0aGlzLmhlYWRlcnMuaG9zdCA9IGAke2J1Y2tldH0uczMke3JlZ2lvblN0cmluZ30uYW1hem9uYXdzLmNvbWA7XG5cbiAgICBjb25zdCBkYXRlID0gdGhpcy5zZXR0aW5ncy5hdXRoLmRhdGU7XG4gICAgdmFyIGRhdGVTdHJpbmcgPSBbXG4gICAgICBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICB1dGlscy56ZmlsbChkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAyKSxcbiAgICAgIHV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDRGF0ZSgpLCAyKSxcbiAgICBdLmpvaW4oJycpO1xuXG4gICAgY29uc3QgZW5jb2RlZERhdGUgPSB1dGlscy51cmllbmNvZGUodXRpbHMuaXNvODYwMSh0aGlzLnJlcXVlc3REYXRlKSk7XG4gICAgbGV0IHF1ZXJ5c3RyaW5nID0gdGhpcy5zZXR0aW5ncy5xdWVyeXN0cmluZztcbiAgICBxdWVyeXN0cmluZ1snWC1BbXotRGF0ZSddID0gZW5jb2RlZERhdGU7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LUFsZ29yaXRobSddID0gJ0FXUzQtSE1BQy1TSEEyNTYnO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1FeHBpcmVzJ10gPSAgODY0MDA7IC8vIE9uZSBkYXlcblxuICAgIGNvbnN0IGFjY2Vzc0tleSA9IHRoaXMuc2V0dGluZ3MuYXV0aC5hY2Nlc3NLZXk7XG4gICAgY29uc3QgcmVnaW9uID0gdGhpcy5zZXR0aW5ncy5hdXRoLnJlZ2lvbjtcbiAgICBxdWVyeXN0cmluZ1snWC1BbXotQ3JlZGVudGlhbCddID0gdXRpbHMudXJpZW5jb2RlKFxuICAgICAgYCR7YWNjZXNzS2V5fS8ke2RhdGVTdHJpbmd9LyR7cmVnaW9ufS9zMy9hd3M0X3JlcXVlc3RgXG4gICAgKTtcbiAgICBxdWVyeXN0cmluZ1snWC1BbXotU2lnbmVkSGVhZGVycyddID0gJyc7XG5cbiAgICBsZXQgaGVhZGVyS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuaGVhZGVycyk7XG5cbiAgICBoZWFkZXJLZXlzLnNvcnQoKTtcbiAgICBxdWVyeXN0cmluZ1snWC1BbXotU2lnbmVkSGVhZGVycyddID0gdXRpbHMudXJpZW5jb2RlKFxuICAgICAgaGVhZGVyS2V5cy5qb2luKCc7JylcbiAgICApO1xuXG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LVNpZ25hdHVyZSddID0gdGhpcy5nZXRBdXRob3JpemF0aW9uSGVhZGVyKCk7XG5cbiAgICB2YXIgdXJsID0gYCR7bG9jYXRpb24ucHJvdG9jb2x9Ly8ke3RoaXMuaGVhZGVycy5ob3N0fS8ke3RoaXMuc2V0dGluZ3Mua2V5fWA7XG4gICAgZGVsZXRlIHRoaXMuaGVhZGVycy5ob3N0OyAgLy8ga2VlcCB0aGlzIGhlYWRlciBvbmx5IGZvciBoYXNoaW5nXG5cbiAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgIE9iamVjdC5rZXlzKHF1ZXJ5c3RyaW5nKS5tYXAoa2V5ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlzdHJpbmdba2V5XTtcbiAgICAgIGlmKGZpcnN0KSB7XG4gICAgICAgIHVybCArPSAnPyc7XG4gICAgICB9XG4gICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgdXJsICs9IGAke2tleX09JHt2YWx1ZX0mYDtcbiAgICB9KTtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpOyAgLy8gcmVtb3ZlIGV4dHJhIGFtcGVyc2FuZFxuXG4gICAgdGhpcy54aHIgPSBYSFIoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBtZXRob2Q6IHRoaXMuc2V0dGluZ3MubWV0aG9kLFxuICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxuICAgICAgYm9keTogdGhpcy5zZXR0aW5ncy5wYXlsb2FkLFxuXG4gICAgICBsb2FkQ2FsbGJhY2s6IHRoaXMuc2V0dGluZ3MubG9hZENhbGxiYWNrLFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogdGhpcy5zZXR0aW5ncy5wcm9ncmVzc0NhbGxiYWNrLFxuICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjazogdGhpcy5zZXR0aW5ncy5zdGF0ZUNoYW5nZUNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFjazogdGhpcy5zZXR0aW5ncy5lcnJvckNhbGxiYWNrLFxuICAgICAgdGltZW91dENhbGxiYWNrOiB0aGlzLnNldHRpbmdzLnRpbWVvdXRDYWxsYmFjayxcbiAgICB9KTtcbiAgICBpZihjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sodGhpcy54aHIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0QXV0aG9yaXphdGlvbkhlYWRlcigpIHtcbiAgICBsZXQgaGVhZGVyID0gJyc7XG5cbiAgICBjb25zdCBoZWFkZXJLZXlzID0gT2JqZWN0LmtleXModGhpcy5oZWFkZXJzKS5zb3J0KCk7XG5cbiAgICBjb25zdCBzaWduZWRLZXlzID0gaGVhZGVyS2V5cy5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICByZXR1cm4gYWNjICsgJzsnICsgdmFsO1xuICAgIH0pO1xuXG4gICAgbGV0IGNhbm9uaWNhbFJlcXVlc3QgPSB0aGlzLmdldENhbm9uaWNhbFJlcXVlc3QoKTtcbiAgICBsZXQgc3RyaW5nVG9TaWduID0gdGhpcy5nZXRTdHJpbmdUb1NpZ24oY2Fub25pY2FsUmVxdWVzdCwgdGhpcy5yZXF1ZXN0RGF0ZSk7XG4gICAgbGV0IHNpZ25hdHVyZSA9IHRoaXMuc2lnblJlcXVlc3Qoc3RyaW5nVG9TaWduKTtcblxuICAgIHJldHVybiBzaWduYXR1cmU7XG4gIH1cblxuICBnZXRDYW5vbmljYWxSZXF1ZXN0KCkge1xuICAgIGxldCByZXF1ZXN0ID0gYFxuICAgICAgJHt0aGlzLnNldHRpbmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpfVxuICAgICAgLyR7dXRpbHMudXJpZW5jb2RlKHRoaXMuc2V0dGluZ3Mua2V5KS5yZXBsYWNlKC8lMkYvZywgJy8nKX1cbiAgICBgO1xuICAgIHJlcXVlc3QgPSByZXF1ZXN0LnRyaW0oKS5yZXBsYWNlKC9eXFxzKy9nbSwgJycpICsgJ1xcbic7XG5cbiAgICAvLyBxdWVyeXN0cmluZ1xuICAgIHJlcXVlc3QgKz0gT2JqZWN0LmtleXMoXG4gICAgICB0aGlzLnNldHRpbmdzLnF1ZXJ5c3RyaW5nXG4gICAgKS5zb3J0KCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnNldHRpbmdzLnF1ZXJ5c3RyaW5nW2tleV07XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY30mYW1wOyR7dXRpbHMudXJpZW5jb2RlKGtleSl9PSR7dmFsdWV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHt1dGlscy51cmllbmNvZGUoa2V5KX09JHt2YWx1ZX1gO1xuICAgICAgfVxuICAgIH0sICcnKTtcbiAgICByZXF1ZXN0ICs9ICdcXG4nO1xuXG4gICAgLy8gaGVhZGVyc1xuICAgIGNvbnN0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpLnNvcnQoKTtcbiAgICByZXF1ZXN0ICs9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmhlYWRlcnNba2V5XTtcbiAgICAgIGlmKGFjYykge1xuICAgICAgICByZXR1cm4gYCR7YWNjfVxcbiR7a2V5LnRvTG93ZXJDYXNlKCl9OiR7dmFsdWUudHJpbSgpfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYCR7a2V5LnRvTG93ZXJDYXNlKCl9OiR7dmFsdWUudHJpbSgpfWA7XG4gICAgICB9XG4gICAgfSwgJycpO1xuICAgIHJlcXVlc3QgKz0gJ1xcblxcbic7XG5cbiAgICAvLyBzaWduZWQgaGVhZGVyc1xuICAgIHJlcXVlc3QgKz0gaGVhZGVyS2V5cy5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY307JHt2YWwudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgIH0sICcnKTtcblxuICAgIHJlcXVlc3QgKz0gJ1xcbic7XG5cbiAgICByZXF1ZXN0ICs9ICdVTlNJR05FRC1QQVlMT0FEJztcblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgZ2V0U3RyaW5nVG9TaWduKGNhbm9uaWNhbFJlcXVlc3QsIHRpbWUpIHtcbiAgICByZXR1cm4gYFxuICAgICAgQVdTNC1ITUFDLVNIQTI1NlxuICAgICAgJHt1dGlscy5pc284NjAxKHRpbWUpfVxuICAgICAgJHtcbiAgICAgICAgW1xuICAgICAgICAgIHRpbWUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgICAgICB1dGlscy56ZmlsbCh0aW1lLmdldFVUQ01vbnRoKCkgKyAxLCAyKSxcbiAgICAgICAgICB1dGlscy56ZmlsbCh0aW1lLmdldFVUQ0RhdGUoKSwgMiksXG4gICAgICAgICAgJy8nICsgdGhpcy5zZXR0aW5ncy5hdXRoLnJlZ2lvbiArICcvczMvYXdzNF9yZXF1ZXN0XFxuJyxcbiAgICAgICAgXS5qb2luKCcnKVxuICAgICAgfVxuICAgICAgJHtTSEEyNTYoY2Fub25pY2FsUmVxdWVzdC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpKS50b1N0cmluZygpfVxuICAgIGAudHJpbSgpLnJlcGxhY2UoL15cXHMrL2dtLCAnJyk7XG4gIH1cblxuICBzaWduUmVxdWVzdChzdHJpbmdUb1NpZ24pIHtcbiAgICB2YXIgcmVzID0gSG1hY1NIQTI1NihcbiAgICAgIHN0cmluZ1RvU2lnbixcbiAgICAgIEhleC5wYXJzZSh0aGlzLnNldHRpbmdzLmF1dGguc2lnbmF0dXJlKVxuICAgICkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgLy8gc3RhdGljXG4gIHN0YXRpYyBpbml0KGF1dGgsIGtleSwgZmlsZSwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gbmV3IEFtYXpvblhIUih7XG4gICAgICBhdXRoOiBhdXRoLFxuICAgICAga2V5OiBrZXksXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nOiB7XG4gICAgICAgIHVwbG9hZHM6ICcnLFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ3gtYW16LWFjbCc6ICdwdWJsaWMtcmVhZCcsXG4gICAgICAgICdDb250ZW50LURpc3Bvc2l0aW9uJzogYGF0dGFjaG1lbnQ7IGZpbGVuYW1lPSR7ZmlsZS5uYW1lfWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiBhdXRoLmNvbnRlbnRUeXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgfSxcbiAgICAgIHBheWxvYWQ6ICcnLFxuICAgICAgbG9hZENhbGxiYWNrOiBjYWxsYmFjayxcbiAgICB9KS5zZW5kKCk7XG4gIH1cblxuICBzdGF0aWMgdXBsb2FkQ2h1bmsoYXV0aCwga2V5LCB1cGxvYWRJZCwgY2h1bmtOdW0sXG4gICAgICAgICAgICAgICAgICAgICBjaHVuaywgY2FsbGJhY2tzLCB4aHJDYWxsYmFjaykge1xuICAgIGxldCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaywgcHJvZ3Jlc3NDYWxsYmFjaywgcmVhZHlzdGF0ZUNhbGxiYWNrO1xuICAgIGlmKGNhbGxiYWNrcyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgY2FsbGJhY2sgPSBjYWxsYmFja3MubG9hZENhbGxiYWNrO1xuICAgICAgZXJyb3JDYWxsYmFjayA9IGNhbGxiYWNrcy5lcnJvckNhbGxiYWNrO1xuICAgICAgcHJvZ3Jlc3NDYWxsYmFjayA9IGNhbGxiYWNrcy5wcm9ncmVzc0NhbGxiYWNrO1xuICAgICAgcmVhZHlzdGF0ZUNhbGxiYWNrID0gY2FsbGJhY2tzLnN0YXRlQ2hhbmdlQ2FsbGJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzO1xuICAgIH1cbiAgICB2YXIgcXVlcnlzdHJpbmcgPSB7XG4gICAgICBwYXJ0TnVtYmVyOiBjaHVua051bSArIDEsXG4gICAgICB1cGxvYWRJZCxcbiAgICB9O1xuICAgIHJldHVybiAobmV3IEFtYXpvblhIUih7XG4gICAgICBhdXRoOiBhdXRoLFxuICAgICAga2V5OiBrZXksXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgcXVlcnlzdHJpbmc6IHF1ZXJ5c3RyaW5nLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBwYXlsb2FkOiBjaHVuayxcbiAgICAgIGxvYWRDYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrLFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogcHJvZ3Jlc3NDYWxsYmFjayxcbiAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2s6IHJlYWR5c3RhdGVDYWxsYmFjayxcbiAgICB9KSkuc2VuZCh4aHJDYWxsYmFjayk7XG4gIH1cblxuICBzdGF0aWMgbGlzdChhdXRoLCBmaWxlLCBrZXksIHVwbG9hZElkLCBjaHVua1NpemUsIGNhbGxiYWNrLFxuICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrLCBtYXJrZXIpIHtcbiAgICB2YXIgcXVlcnlzdHJpbmcgPSB7XG4gICAgICB1cGxvYWRJZCxcbiAgICB9O1xuICAgIGlmKG1hcmtlcikge1xuICAgICAgcXVlcnlzdHJpbmdbJ3BhcnQtbnVtYmVy4oCLLW1hcmtlciddID0gbWFya2VyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEFtYXpvblhIUih7XG4gICAgICBhdXRoOiBhdXRoLFxuICAgICAga2V5OiBrZXksXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcXVlcnlzdHJpbmc6IHF1ZXJ5c3RyaW5nLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBwYXlsb2FkOiAnJyxcbiAgICAgIGVycm9yQ2FsbGJhY2s6IGVycm9yQ2FsbGJhY2ssXG4gICAgICBsb2FkQ2FsbGJhY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYoZS50YXJnZXQuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAvLyBJLmUuIHRoZSBmaWxlIHdhcyBhbHJlYWR5IHVwbG9hZGVkOyBzdGFydCBmcmVzaFxuICAgICAgICAgIGlmKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJvY2VzcyB0aGUgcGFydHMsIGFuZCByZXR1cm4gYW4gYXJyYXkgb2ZcbiAgICAgICAgLy8gW3BhcnRfbnVtYmVyLCBldGFnLCBzaXplXSB0aHJvdWdoIHRoZSBnaXZlbiBjYWxsYmFja1xuICAgICAgICB2YXIgeG1sID0gZS50YXJnZXQucmVzcG9uc2VYTUw7XG4gICAgICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgICAgICB2YXIgeG1sUGFydHMgPSB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1BhcnQnKTtcbiAgICAgICAgdmFyIG51bUNodW5rcyA9IE1hdGguY2VpbChmaWxlLnNpemUgLyBjaHVua1NpemUpO1xuICAgICAgICBsZXQgdGFnQ29udGVudCA9ICh0YWcsIHByb3ApID0+IHtcbiAgICAgICAgICByZXR1cm4gdGFnLmdldEVsZW1lbnRzQnlUYWdOYW1lKHByb3ApWzBdLnRleHRDb250ZW50O1xuICAgICAgICB9O1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgeG1sUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgcGFydE51bWJlciA9IHBhcnNlSW50KFxuICAgICAgICAgICAgdGFnQ29udGVudCh4bWxQYXJ0c1tpXSwgJ1BhcnROdW1iZXInKSwgMTBcbiAgICAgICAgICApO1xuICAgICAgICAgIHZhciBldGFnID0gdGFnQ29udGVudCh4bWxQYXJ0c1tpXSwgJ0VUYWcnKTtcbiAgICAgICAgICB2YXIgc2l6ZSA9IHBhcnNlSW50KFxuICAgICAgICAgICAgdGFnQ29udGVudCh4bWxQYXJ0c1tpXSwgJ1NpemUnKSwgMTBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYocGFydE51bWJlciAhPT0gbnVtQ2h1bmtzICYmIHNpemUgIT09IGNodW5rU2l6ZSkge1xuICAgICAgICAgICAgY29udGludWU7IC8vIENodW5rIGNvcnJ1cHRlZFxuICAgICAgICAgIH0gZWxzZSBpZihwYXJ0TnVtYmVyID09PSBudW1DaHVua3MgJiZcbiAgICAgICAgICAgICAgc2l6ZSAhPT0gZmlsZS5zaXplICUgY2h1bmtTaXplKSB7XG4gICAgICAgICAgICBjb250aW51ZTsgLy8gRmluYWwgY2h1bmsgY29ycnVwdGVkXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGFydHMucHVzaChbXG4gICAgICAgICAgICBwYXJ0TnVtYmVyLFxuICAgICAgICAgICAgZXRhZyxcbiAgICAgICAgICAgIHNpemUsXG4gICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzVHJ1bmNhdGVkID0gdGFnQ29udGVudCh4bWwsICdJc1RydW5jYXRlZCcpO1xuICAgICAgICBpZihpc1RydW5jYXRlZC50b1N0cmluZygpID09PSAndHJ1ZScpIHtcbiAgICAgICAgICB2YXIgcGFydE1hcmtlciA9IHRhZ0NvbnRlbnQoeG1sLCAnTmV4dFBhcnROdW1iZXJNYXJrZXInKTtcbiAgICAgICAgICBBbWF6b25YSFIubGlzdChhdXRoLCBrZXksIHVwbG9hZElkLCBjaHVua1NpemUsIGZ1bmN0aW9uKG5ld1BhcnRzKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhwYXJ0cy5jb25jYXQobmV3UGFydHMpKTtcbiAgICAgICAgICB9LCBlcnJvckNhbGxiYWNrLCBwYXJ0TWFya2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayhwYXJ0cyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSkuc2VuZCgpO1xuICB9XG5cbiAgc3RhdGljIGZpbmlzaChhdXRoLCBrZXksIHVwbG9hZElkLCBwYXJ0cywgY2FsbGJhY2spIHtcbiAgICB2YXIgcXVlcnlzdHJpbmcgPSB7IHVwbG9hZElkIH07XG5cbiAgICAvLyBjb21wb3NlIHRoZSBDb21wbGV0ZU11bHRpcGFydFVwbG9hZCByZXF1ZXN0IGZvciBwdXR0aW5nXG4gICAgLy8gdGhlIGNodW5rcyB0b2dldGhlclxuICAgIHZhciBkYXRhID0gJzxDb21wbGV0ZU11bHRpcGFydFVwbG9hZD4nO1xuXG4gICAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICBwYXJ0cy5tYXAoKFtudW1iZXIsIGV0YWddKSA9PiB7XG4gICAgICBkYXRhICs9IGBcbiAgICAgICAgPFBhcnQ+XG4gICAgICAgIDxQYXJ0TnVtYmVyPiR7bnVtYmVyfTwvUGFydE51bWJlcj5cbiAgICAgICAgPEVUYWc+JHtldGFnfTwvRVRhZz5cbiAgICAgICAgPC9QYXJ0PlxuICAgICAgYC50cmltKCk7XG4gICAgfSk7XG4gICAgZGF0YSArPSAnPC9Db21wbGV0ZU11bHRpcGFydFVwbG9hZD4nO1xuXG4gICAgLy8gZmlyZWZveCByZXF1aXJlcyBhIHNtYWxsIGhhY2tcbiAgICBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yICYmXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgZGF0YSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aCxcbiAgICAgIGtleSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgcXVlcnlzdHJpbmcsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIHBheWxvYWQ6IGRhdGEsXG4gICAgICBsb2FkQ2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIH0pLnNlbmQoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IEtCID0gMTAyNDtcbmV4cG9ydCBjb25zdCBNQiA9IDEwMjQgKiBLQjtcbmV4cG9ydCBjb25zdCBHQiA9IDEwMjQgKiBNQjtcbmV4cG9ydCBjb25zdCBTRUNPTkRTID0gMTAwMDsgLy8gMTAwMG1zXG5leHBvcnQgY29uc3QgREVCVUcgPSB0cnVlO1xuIiwiaW1wb3J0IHsgREVCVUcgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBpZighKERFQlVHICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNvbnNvbGUubG9nICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYXJncyA9IFsnW011bGVVcGxvYWRlcl0nXTtcbiAgZm9yKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB9XG4gIHJldHVybiBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKTtcbn1cbiIsImltcG9ydCBTSEEyNTYgZnJvbSAnY3J5cHRvLWpzL3NoYTI1Nic7XG5pbXBvcnQgWEhSIGZyb20gJy4veGhyJztcbmltcG9ydCBBbWF6b25YSFIgZnJvbSAnLi9hbWF6b25YaHInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgeyBLQiwgTUIsIEdCLCBTRUNPTkRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCB7fTtcblxuICAgIC8vIE1ha2UgdGhlIGlucHV0IGVsZW1lbnQgYW5vdGhlciBwb3NzaWJsZSBzZXR0aW5nXG4gICAgLy8gaW4gc29tZSBjYXNlcyAoZS5nLiBkcmFnICYgZHJvcCkgdGhlcmUgaXMgbm8gaW5wdXQgZWxlbWVudFxuICAgIHRoaXMuaW5wdXQgPSBzZXR0aW5ncy5maWxlSW5wdXQ7XG4gICAgdGhpcy5maWxlICA9IHNldHRpbmdzLmZpbGU7XG5cbiAgICAvLyBUaGUgZmlsZSBzdGFydHMgYXV0b21hdGljYWxseSBieSBkZWZhdWx0OyB5b3UgaGF2ZSB0byBzZXRcbiAgICAvLyBhdXRvc3RhcnQ6IGZhbHNlIGV4cGxpY2l0bHkgaWYgeW91IHdhbnQgdG8gdXNlIGEgc3RhcnQgYnV0dG9uXG4gICAgLy8gaWYgYXV0b3N0YXJ0IGlzIGZhbHNlLCB5b3UgY2FuIHVzZSB0aGUgVXBsb2FkZXIucHJvdG90eXBlLnN0YXJ0KClcbiAgICAvLyBmdW5jdGlvbi4gTm90ZSB0aGF0IHRoZSB1c2VyIGhhcyB0byBzZWxlY3QgYSBmaWxlIGZpcnN0XG4gICAgc2V0dGluZ3MuYXV0b3N0YXJ0ID0gKCdhdXRvc3RhcnQnIGluIHNldHRpbmdzID8gc2V0dGluZ3MuYXV0b3N0YXJ0IDogdHJ1ZSk7XG5cbiAgICAvLyBOT1RFOiBGb3IgQW1hem9uIFMzLCB0aGUgbWluaW11bSBjaHVuayBzaXplIGlzIDVNQlxuICAgIC8vIHdlIGFyZSB1c2luZyA2IGZvciBzYWZlIG1lYXN1cmUuIE5vdGUgdGhhdCB0aGUgbWF4aW11bSBudW1iZXIgb2YgY2h1bmtzXG4gICAgLy8gaXMgMTAsMDAwLCBzbyBmb3IgZXhhbXBsZSwgaWYgdGhlIGNodW5rIHNpemUgaXMgNk1CLCB0aGUgbWF4aW11bVxuICAgIC8vIHBvc3NpYmxlIGZpbGUgc2l6ZSBpcyA2TUIgKiAxMCwwMDAgPSB+NThHQlxuICAgIHNldHRpbmdzLmNodW5rU2l6ZSA9IHNldHRpbmdzLmNodW5rU2l6ZSB8fCAoNiAqIE1CKTsgLy8gZGVmYXVsdCA2TUJcbiAgICBzZXR0aW5ncy5tYXhTaXplID0gc2V0dGluZ3MubWF4U2l6ZSB8fCA1ICogR0I7IC8vIDVHQlxuXG4gICAgLy8gVGhlIG51bWJlciBvZiBwYXJhbGxlbCB1cGxvYWQgeGhyJ3NcbiAgICBzZXR0aW5ncy5udW1Xb3JrZXJzID0gc2V0dGluZ3MubnVtV29ya2VycyB8fCA0O1xuXG4gICAgLy8gVGhlIFMzIG9iamVjdCBrZXk7IEkgcmVjb21tZW5kIHRvIGdlbmVyYXRlIHRoaXMgZHluYW1pY2FsbHkgKGUuZy5cbiAgICAvLyBhIHJhbmRvbSBzdHJpbmcpIHRvIGF2b2lkIHVud2FudGVkIG92ZXJ3cml0ZXMuXG4gICAgc2V0dGluZ3Mua2V5ID0gc2V0dGluZ3Mua2V5IHx8ICd0aGVfa2V5JztcblxuICAgIC8vIFRoZSBBbWF6b24gUzMgYnVja2V0IHdoZXJlIHlvdSdsbCBzdG9yZSB0aGUgdXBsb2Fkc1xuICAgIHNldHRpbmdzLmJ1Y2tldCA9IHNldHRpbmdzLmJ1Y2tldDtcblxuICAgIC8vIFRoZSBBbWF6b24gUzMgYWNjZXNzIGtleS4gRE8gTk9UIGdpdmUgdGhlIEFXUyBTZWNyZXQgY29kZSFcbiAgICBzZXR0aW5ncy5hY2Nlc3NLZXkgPSBzZXR0aW5ncy5hY2Nlc3NLZXk7XG5cbiAgICAvLyBUaGUgTWltZS1UeXBlIG9mIHRoZSBjb250ZW50LiBZb3UgbXVzdCBtYXRjaCB0aGlzIHdpdGggdGhlIGJhY2tlbmQgdmFsdWVcbiAgICAvLyBvciB5b3UnbGwgZ2V0IGFuIEludmFsaWQgU2lnbmF0dXJlIGVycm9yLiBJZiB1bnN1cmUgYWJvdXQgdGhlXG4gICAgLy8gbWltZSB0eXBlLCB1c2UgYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgc2V0dGluZ3MuY29udGVudFR5cGUgPSBzZXR0aW5ncy5jb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcblxuXG4gICAgLy8gQUNMIGNhbiBiZSBzZXQgdG86XG4gICAgLy8gcHJpdmF0ZVxuICAgIC8vIHB1YmxpYy1yZWFkICgqIGRlZmF1bHQpXG4gICAgLy8gcHVibGljLXJlYWQtd3JpdGVcbiAgICAvLyBhdXRoZW50aWNhdGVkLXJlYWRcbiAgICAvLyBidWNrZXQtb3duZXItcmVhZFxuICAgIC8vIGJ1Y2tldC1vd25lci1mdWxsLWNvbnRyb2xcbiAgICAvLyBsb2ctZGVsaXZlcnktd3JpdGVcbiAgICBzZXR0aW5ncy5hY2wgPSBzZXR0aW5ncy5hY2wgfHwgJ3B1YmxpYy1yZWFkJztcblxuICAgIC8vIFZhcmlvdXMgY2FsbGJhY2tzXG4gICAgc2V0dGluZ3Mub25Qcm9ncmVzcyA9IHNldHRpbmdzLm9uUHJvZ3Jlc3MgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MgPSBzZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uU2VsZWN0ID0gc2V0dGluZ3Mub25TZWxlY3QgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25FcnJvciA9IHNldHRpbmdzLm9uRXJyb3IgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNvbXBsZXRlID0gc2V0dGluZ3Mub25Db21wbGV0ZSAgICAgICAgICAgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uSW5pdCA9IHNldHRpbmdzLm9uSW5pdCAgICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25TdGFydCA9IHNldHRpbmdzLm9uU3RhcnQgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNodW5rVXBsb2FkZWQgPSBzZXR0aW5ncy5vbkNodW5rVXBsb2FkZWQgICB8fCBmdW5jdGlvbigpIHt9O1xuXG4gICAgLy8gVGhlIGxvY2F0aW9uIHByZWZpeCBvZiB0aGUgdXBsb2FkZXIncyBiYWNrZW5kXG4gICAgc2V0dGluZ3MuYWpheEJhc2UgPSBzZXR0aW5ncy5hamF4QmFzZSB8fCAnL3VwbG9hZC1iYWNrZW5kJztcblxuICAgIC8vIEV4dGVuc2lvbnMgY29tbWEgZGVsaW1pdGVkIHdpdGhvdXQgcGVyaW9kIChqcGcsanBlZyxwbmcsZ2lmKVxuICAgIHNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucyA9IHNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucyB8fCAnJztcblxuICAgIC8vIFNldCB0aGUgdmFsdWVzIHNvIHRoYXQgdGhleSBjYW4gYmUgdXNlZCBldmVyeXdoZXJlLCBhcyBuZWVkZWRcbiAgICBzZWxmLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICAvLyBUaGUgXCJ3YWl0aW5nXCIgc3RhdGUgbWVhbnMgdGhlIHVwbG9hZGVyIGlzIHdhaXRpbmcgZm9yIHRoZSB1c2VyXG4gICAgLy8gdG8gc2VsZWN0IGEgZmlsZVxuICAgIHNlbGYuc2V0U3RhdGUoJ3dhaXRpbmcnKTtcblxuICAgIGlmKHNlbGYuaW5wdXQpIHtcbiAgICAgIHNlbGYuaW5wdXQub25jaGFuZ2UgPSBmdW5jdGlvbihlLCBmb3JjZSkge1xuICAgICAgICBpZighc2VsZi5zZXR0aW5ncy5hdXRvc3RhcnQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGUgYG9uY2hhbmdlYCBldmVudCBtYXkgYmUgdHJpZ2dlcmVkIG11bHRpcGxlIHRpbWVzLCBzbyB3ZVxuICAgICAgICAvLyBtdXN0IGVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBvbmx5IGV4ZWN1dGVkIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIHVwbG9hZGVyIGRvZXNuJ3Qgc3VwcG9ydCBtdWx0aXBsZSB1cGxvYWRzIGF0IHRoaXMgdGltZSxcbiAgICAgICAgLy8gc28gd2UgZ2V0IHRoZSBmaXJzdCBmaWxlXG4gICAgICAgIHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgIHNlbGYudXBsb2FkRmlsZShmaWxlLCBmb3JjZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIHRoZSBpbml0IGV2ZW50IGNhbGxiYWNrXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Jbml0LmFwcGx5KHNlbGYpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZih0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZmlsZXMgJiYgdGhpcy5pbnB1dC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlKHRoaXMuaW5wdXQuZmlsZXNbMF0sIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoJ05vIGZpbGUgc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cblxuICB1cGxvYWRGaWxlKGZpbGUsIGZvcmNlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gVGhlIGBvbmNoYW5nZWAgZXZlbnQgbWF5IGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcywgc28gd2VcbiAgICAvLyBtdXN0IGVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBvbmx5IGV4ZWN1dGVkIHRoZSBmaXJzdCB0aW1lXG4gICAgLy8gYWxzbyBtYWtlIHN1cmUgdGhlIGZpbGUgaXMgbm90IGFscmVhZHkgc2V0LlxuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoZmlsZSkge1xuICAgICAgc2VsZi5maWxlID0gZmlsZTtcbiAgICB9XG5cbiAgICBpZighc2VsZi5maWxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gV2UgdXNlIHRoZSBsYXN0TW9kaWZpZWREYXRlLCB0aGUgZmlsZSBuYW1lIGFuZCBzaXplIHRvIHVuaXF1ZWx5XG4gICAgLy8gaWRlbnRpZnkgYSBmaWxlLiBUaGVyZSBtYXkgYmUgZmFsc2UgcG9zaXRpdmVzIGFuZCBuZWdhdGl2ZXMsXG4gICAgLy8gYnV0IHRoZSBjaGFuY2UgZm9yIGEgZmFsc2UgcG9zaXRpdmUgaXMgYmFzaWNhbGx5IHplcm9cbiAgICAvLyBzb21lIGJyb3dzZXJzIGRvbid0IHJlcG9ydCB0aGUgbGFzdCBtb2RpZmllZCBkYXRlLCBzbyB3ZSBkZWZhdWx0XG4gICAgLy8gdG8gYSBibGFuayBkYXRlXG4gICAgc2VsZi5maWxlLmxhc3RNb2RpZmllZERhdGUgPSB0aGlzLmZpbGUubGFzdE1vZGlmaWVkRGF0ZSB8fCBuZXcgRGF0ZSgwKTtcblxuICAgIGlmKHNlbGYuZmlsZS5zaXplID4gc2VsZi5zZXR0aW5ncy5tYXhTaXplKSB7XG4gICAgICBhbGVydChbXG4gICAgICAgICdUaGUgbWF4aW11bSBhbGxvd2VkIGZpbGUgc2l6ZSBpcyAnLFxuICAgICAgICAoc2VsZi5zZXR0aW5ncy5tYXhTaXplIC8gR0IpLFxuICAgICAgICAnR0IuIFBsZWFzZSBzZWxlY3QgYW5vdGhlciBmaWxlLicsXG4gICAgICBdLmpvaW4oJycpKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgYWNjZXB0ZWQgZXh0ZW5zaW9ucywgaWYgYXBwbGljYWJsZVxuICAgIGlmKHNlbGYuc2V0dGluZ3MuYWNjZXB0ZWRFeHRlbnNpb25zKSB7XG4gICAgICAvLyBHZXQgdGhlIGZpbGUgZXh0ZW5zaW9uXG4gICAgICB2YXIgZmlsZUV4dGVuc2lvbiA9IGZpbGUubmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuXG4gICAgICAvLyBTcGxpdCB0aGUgZ2l2ZW4gZXh0ZW5zaW9ucyBpbnRvIGFuIGFycmF5XG4gICAgICB2YXIgZXh0ZW5zaW9uc0FycmF5ID0gc2VsZi5zZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMuc3BsaXQoJywnKTtcblxuICAgICAgLy8gQW5kIG1hdGNoIHRoZSBleHRlbnNpb24gYWdhaW5zdCB0aGUgZ2l2ZW4gZXh0ZW5zaW9uIGxpc3RcbiAgICAgIHZhciBmaWxlQWNjZXB0ZWQgPSBmYWxzZTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBleHRlbnNpb25zQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoZmlsZUV4dGVuc2lvbiA9PT0gZXh0ZW5zaW9uc0FycmF5W2ldKSB7XG4gICAgICAgICAgZmlsZUFjY2VwdGVkID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZmlsZSBpcyBub3QgYWNjZXB0ZWQsIG5vdGlmeSB0aGUgdXNlciBhbmQgcmV0dXJuXG4gICAgICBpZighZmlsZUFjY2VwdGVkKSB7XG4gICAgICAgIGFsZXJ0KFtcbiAgICAgICAgICAnVGhpcyBmaWxlIGZvcm1hdCBpcyBub3QgYWNjZXB0ZWQuICcsXG4gICAgICAgICAgJ1BsZWFzZSB1c2UgYSBmaWxlIHdpdGggYW4gZXh0ZW5zaW9uIGxpa2UgJyxcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucyxcbiAgICAgICAgXS5qb2luKCcnKSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBmaWxlIHVwbG9hZFxuICAgIHNlbGYuc2V0dGluZ3Mub25TZWxlY3QuY2FsbCh0aGlzLCBmaWxlKTtcblxuICAgIHZhciBhcmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLnNldHRpbmdzLmV4dHJhUGFyYW1zIHx8IHt9LCB7XG4gICAgICBmaWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgZmlsZXNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWREYXRlLnZhbHVlT2YoKSxcbiAgICB9KTtcblxuICAgIGlmKGZvcmNlKSB7XG4gICAgICBhcmdzLmZvcmNlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIHNpZ25pbmcga2V5LiBJdCB3aWxsIGFsc28gcmV0dXJuXG4gICAgLy8gYSBmaWxlIGtleSArIHVwbG9hZElkIHBhaXIgaWYgdGhlIHNlbGVjdGVkIGZpbGVcbiAgICAvLyBpcyBhbHJlYWR5IHVwbG9hZGluZy4gSXQgYWxzbyByZXR1cm5zIGFcbiAgICAvLyBiYWNrdXBfa2V5IGluIGNhc2UgdGhhdCBmaWxlIHVwbG9hZCBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAvLyBUaGUgc2lnbmluZyBrZXkgaXMgdmFsaWQgZm9yIDcgZGF5c1xuICAgIFhIUih7XG4gICAgICB1cmw6IHNlbGYuc2V0dGluZ3MuYWpheEJhc2UgKyAnL3NpZ25pbmdfa2V5LycsXG4gICAgICBleHRyYVBhcmFtczogYXJncyxcbiAgICAgIGxvYWRDYWxsYmFjazogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UoZS50YXJnZXQucmVzcG9uc2VUZXh0KTtcbiAgICAgICAganNvbi5kYXRlID0gbmV3IERhdGUoanNvbi5kYXRlKTtcbiAgICAgICAgc2VsZi5hdXRoID0ganNvbjtcbiAgICAgICAgc2VsZi51cGxvYWRJZCA9IGpzb24udXBsb2FkSWQ7XG4gICAgICAgIHNlbGYuY2h1bmtzID0ganNvbi5jaHVua3M7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mua2V5ID0ganNvbi5rZXkgfHwgc2VsZi5zZXR0aW5ncy5rZXk7XG4gICAgICAgIHNlbGYuc2V0dGluZ3MuYmFja3VwS2V5ID0gc2VsZi5zZXR0aW5ncy5rZXk7XG5cbiAgICAgICAgaWYoIXRoaXMudXBsb2FkSWQpIHtcbiAgICAgICAgICBBbWF6b25YSFIuaW5pdChqc29uLCBzZWxmLnNldHRpbmdzLmtleSwgZmlsZSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHhtbCA9IGUudGFyZ2V0LnJlc3BvbnNlWE1MO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGdpdmVuIHVwbG9hZCBpZFxuICAgICAgICAgICAgc2VsZi51cGxvYWRJZCA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVXBsb2FkSWQnKVswXS50ZXh0Q29udGVudDtcblxuICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlc3VtZSBhIHByZXZpdXMgdXBsb2FkXG4gICAgICAgICAgaWYoIWZvcmNlKSB7XG4gICAgICAgICAgICAvLyBHZXQgdGhlIHVwbG9hZGVkIHBhcnRzIGZyb20gUzNcbiAgICAgICAgICAgIEFtYXpvblhIUi5saXN0KFxuICAgICAgICAgICAgICBzZWxmLmF1dGgsIHNlbGYuZmlsZSwgc2VsZi5zZXR0aW5ncy5rZXksXG4gICAgICAgICAgICAgIHNlbGYudXBsb2FkSWQsIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplLCBmdW5jdGlvbihwYXJ0cykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgdmFyIGNodW5rID0gcGFydHNbaV1bMF0gLSAxO1xuICAgICAgICAgICAgICAgICAgc2VsZi5zZXRQcm9ncmVzcyhjaHVuaywgc2VsZi5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2h1bmtGaW5pc2hlZChjaHVuayk7XG4gICAgICAgICAgICAgICAgICBzZWxmLnNldENodW5rVXBsb2FkaW5nKGNodW5rLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYubG9hZEZpbGUoKTtcbiAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgaXQgZmFpbHMsIHJlLWluaXRpYXRlIHRoZSB1cGxvYWQsIGFuZCBmb3JjZVxuICAgICAgICAgICAgICAgIC8vIGl0IHRvIHN0YXJ0IGEgbmV3IHVwbG9hZFxuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkSWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvYWRlZENodW5rcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5fcHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYuX3RvdGFsUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRlZENodW5rcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5fdXBsb2FkaW5nQ2h1bmtzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLl9jaHVua3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mua2V5ID0gdGhpcy5zZXR0aW5ncy5iYWNrdXBLZXk7XG4gICAgICAgICAgICAgICAgc2VsZi51cGxvYWRGaWxlKGZpbGUsIHRydWUpOyAvLyBGb3JjZSByZWxvYWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZm9yY2Utc3RhcnQgdGhlIHVwbG9hZFxuICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRGaWxlKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFdlIGNhbid0IHN0YXJ0IHRoZSB1cGxvYWQgaWYgd2UgYXJlIHdhaXRpbmcgZm9yIHVzZXIgaW5wdXRcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICd3YWl0aW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSBvbmx5IHRyaWdnZXIgdGhlIHN0YXJ0IGV2ZW50IG9uY2VcbiAgICBpZighc2VsZi5fc3RhcnRGaXJlZCkge1xuICAgICAgLy8gVHJpZ2dlciB0aGUgc3RhcnQgZXZlbnQgY2FsbGJhY2tcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25TdGFydC5jYWxsKHNlbGYsIHNlbGYuZmlsZSk7XG5cbiAgICAgIC8vIEFuZCBhbHNvIHRyaWdnZXIgYSBwcm9ncmVzcyBjYWxsYmFjayB3aXRoIDAlXG4gICAgICBzZWxmLnNldHRpbmdzLm9uUHJvZ3Jlc3MuY2FsbChzZWxmLCAwLCBzZWxmLmZpbGUuc2l6ZSk7XG4gICAgICBzZWxmLl9zdGFydEZpcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGcm9tIG5vdyBvbiwgd2UgYXJlIFwicHJvY2Vzc2luZ1wiIHRoZSBmaWxlIHVwbG9hZFxuICAgIHNlbGYuc2V0U3RhdGUoJ3Byb2Nlc3NpbmcnKTtcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgd2UgbWF5IGhhdmUgc29tZSBjaHVua3MgYWxyZWFkeSB1cGxvYWRlZCxcbiAgICAvLyBTbyB3ZSBtYXkgdHJpZ2dlciBhIHByb2dyZXNzIGNhbGxiYWNrIHdpdGggdGhlIHJlcG9ydGVkIHByb2dyZXNzXG4gICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICBzZWxmLCBzZWxmLmdldFRvdGFsUHJvZ3Jlc3MoKSwgc2VsZi5maWxlLnNpemVcbiAgICApO1xuXG4gICAgLy8gR2V0IHRoZSBuZXh0IGNodW5rXG4gICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG5cbiAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAvLyBBbmQgc3RhcnQgdXBsb2FkaW5nIGl0XG4gICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgfSBlbHNlIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgLy8gSWYgd2UgZmluaXNoZWQsIHRyaWdnZXIgdGhlIHVwbG9hZCBmaW5pc2ggc2VxdWVuY2VcbiAgICAgIGxvZygnQWxsIGRvbmU7IGZpbmlzaCB1cGxvYWQnKTtcbiAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0dGluZ3MubnVtV29ya2VycyAtIDE7IGkrKykge1xuICAgICAgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkQ2h1bmsoY2h1bmspIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBNYWtlIHN1cmUgd2UncmUgaW4gcHJvY2Vzc2luZyBtb2RlXG4gICAgaWYoc2VsZi5nZXRTdGF0ZSgpICE9PSAncHJvY2Vzc2luZycpIHtcbiAgICAgIGxvZygnTk9UIHByb2Nlc3Npbmc7IHJldHVybicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEFsc28gbWFrZSBzdXJlIHdlJ3JlIG5vdCBhbHJlYWR5IHVwbG9hZGluZyB0aGlzIGNodW5rXG4gICAgaWYoc2VsZi5nZXRDaHVua1VwbG9hZGluZyhjaHVuaykpIHtcbiAgICAgIGxvZygnQWxyZWFkeSBVcGxvYWRpbmcnKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhzZWxmLmdldE5leHRDaHVuaygpKTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1hcmsgdGhpcyBjaHVuayBhcyB1cGxvYWRpbmdcbiAgICAgIHNlbGYuc2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmspO1xuICAgIH1cbiAgICBsb2coYFVwbG9hZGluZyBDaHVuazogJHtjaHVua31gKTtcblxuICAgIC8vIElmIHdlIGFscmVhZHkgdXBsb2FkZWQgdGhpcyBjaHVuaywgZ2V0IHRvIHRoZSBuZXh0IG9uZVxuICAgIC8vIGlmIHRoZXJlIGlzIG5vIG5leHQgY2h1bmssIGZpbmlzaCB0aGUgdXBsb2FkXG4gICAgaWYoc2VsZi5pc0NodW5rTG9hZGVkKGNodW5rKSkge1xuICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAgIHNlbGYudXBsb2FkQ2h1bmsobmV4dENodW5rKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgICAgIGxvZygnTm8gbmV4dCBjaHVuazsgZmluaXNoIHVwbG9hZCcpO1xuICAgICAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGVuZ3RoID0gc2VsZi5zZXR0aW5ncy5jaHVua1NpemU7XG5cbiAgICAvLyBHZXQgdGhlIHN0YXJ0IGFuZCBlbmQgYnl0ZXMgZm9yIHRoZSBuZWVkZWQgY2h1bmtcbiAgICB2YXIgc3RhcnQgPSBjaHVuayAqIGxlbmd0aDtcbiAgICB2YXIgZW5kID0gTWF0aC5taW4oc3RhcnQgKyBsZW5ndGgsIHNlbGYuZmlsZS5zaXplKTtcblxuICAgIC8vIFdlIG5lZWQgdGhlIGxhc3QgcHJvZ3Jlc3MgdGltZSBpbiBvcmRlciB0byBkZXRlY3QgaGFuZ2luZ1xuICAgIC8vIHVwbG9hZHNcbiAgICB2YXIgbGFzdFByb2dyZXNzVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgc2VsZi5faW50ZXJ2YWxzID0gc2VsZi5faW50ZXJ2YWxzIHx8IHt9O1xuXG5cbiAgICAvLyBUaGUgXCJyZWFkeXN0YXRlY2hhbmdlXCIgaGFuZGxlclxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgLy8gV2UgY2FyZSBhYm91dCB0aGUgXCJkb25lXCIgZXZlbnQgdHJpZ2dlcmVkIHdoaWxlIHByb2Nlc3NpbmdcbiAgICAgIGlmKGUudGFyZ2V0LnJlYWR5U3RhdGUgIT09IHRoaXMuRE9ORSB8fFxuICAgICAgICAgIHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgIGxvZyhlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBkb24ndCByZWNlaXZlIGEgMlhYIHJlc3BvbnNlLCB0cmlnZ2VyIGFuIGVycm9yXG4gICAgICBpZihwYXJzZUludChlLnRhcmdldC5zdGF0dXMpIC8gMTAwICE9PSAyKSB7XG4gICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIoKTtcbiAgICAgIH1cblxuICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2Uga25vdyB0aGF0IHRoaXMgY2h1bmsgZmluaXNoZWQgdXBsb2FkaW5nXG4gICAgICBsb2coYENodW5rIHVwbG9hZGVkOiAke2NodW5rfWApO1xuXG4gICAgICAvLyBOb3RpZnkgdGhlIHNlcnZlciBvZiB0aGUgdXBsb2FkZWQgY2h1bmtcbiAgICAgIHNlbGYubm90aWZ5Q2h1bmtVcGxvYWRlZChjaHVuayk7XG5cbiAgICAgIC8vIEFuZCBhbHNvIHRyaWdnZXIgdGhlIGNodW5rX3VwbG9hZGVkIGNhbGxiYWNrXG4gICAgICBzZWxmLnNldHRpbmdzLm9uQ2h1bmtVcGxvYWRlZC5jYWxsKHNlbGYsIGNodW5rKTtcblxuICAgICAgLy8gQ2FuY2VsIHRoZSB4aHIgd2F0Y2hlciBpbnRlcnZhbFxuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLl9pbnRlcnZhbHNbY2h1bmtdKTtcblxuICAgICAgLy8gTWFyayB0aGUgY2h1bmsgYXMgZmluaXNoZWRcbiAgICAgIHNlbGYuc2V0UHJvZ3Jlc3MoY2h1bmssIHNlbGYuZ2V0Q2h1bmtTaXplKGNodW5rKSk7XG4gICAgICBzZWxmLnNldENodW5rRmluaXNoZWQoY2h1bmspO1xuICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuaywgZmFsc2UpO1xuXG4gICAgICAvLyBHZXQgbmV4dCBjaHVuazsgaWYgd2UncmUgb3V0IG9mIGNodW5rcyxcbiAgICAgIC8vIGZpbmlzaCB0aGUgdXBsb2FkXG4gICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgICBsb2coJ0RvbmUnKTtcbiAgICAgICAgc2VsZi5maW5pc2hVcGxvYWQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBjaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgICAgaWYoY2h1bmsgIT09IC0xKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIHNlbGYudXBsb2FkQ2h1bmsoY2h1bmspO1xuICAgICAgICAgIH0gZWxzZSBpZihzZWxmLnVwbG9hZEZpbmlzaGVkKCkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgc2VsZi5maW5pc2hVcGxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBUaGUgdXBsb2FkIHByb2dyZXNzIGhhbmRsZXJcbiAgICB2YXIgcHJvZ3Jlc3NIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgLy8gU2V0IHRoZSBpbnRlcm5hbCBjaHVuaydzIHByb2dyZXNzIHZhbHVlIHRvIHRoZSByZXBvcnRlZCBhbW91bnRcbiAgICAgIHNlbGYuc2V0UHJvZ3Jlc3MoY2h1bmssIGUubG9hZGVkKTtcblxuICAgICAgLy8gVHJpZ2dlciB0aGUgcHJvZ3Jlc3MgZXZlbnQgY2FsbGJhY2tcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgICBzZWxmLCBzZWxmLmdldFRvdGFsUHJvZ3Jlc3MoKSwgc2VsZi5maWxlLnNpemVcbiAgICAgICk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgbGFzdF9wcm9ncmVzc190aW1lIGZvciB0aGUgd2F0Y2hlciBpbnRlcnZhbFxuICAgICAgbGFzdFByb2dyZXNzVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBlcnJvckhhbmRsZWQgPSBmYWxzZTtcbiAgICB2YXIgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXJyb3JBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgeGhyID0gdGhpcztcbiAgICAgIC8vIFRoZSB1cGxvYWQgbWF5IGhhdmUgZmluaXNoZWQsIHNvIGNoZWNrIGZvciB0aGF0XG4gICAgICBzZWxmLmNoZWNrQWxyZWFkeVVwbG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBJZiBhbHJlYWR5IHVwbG9hZGVkXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGVkJyk7XG5cbiAgICAgICAgc2VsZi5ub3RpZnlVcGxvYWRGaW5pc2hlZCgpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgYSBmaW5hbCBwcm9ncmVzcyBldmVudCBjYWxsYmFjaywgd2l0aCAxMDAlXG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKHNlbGYsIHNlbGYuZmlsZS5zaXplLCBzZWxmLmZpbGUuc2l6ZSk7XG5cbiAgICAgICAgLy8gQWxzbyB0cmlnZ2VyIHRoZSBjb21wbGV0ZSBldmVudCBjYWxsYmFja1xuICAgICAgICBzZWxmLnNldHRpbmdzLm9uQ29tcGxldGUuY2FsbChzZWxmKTtcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXZSBoYXZlIGEgZ2VudWluZSBlcnJvclxuICAgICAgICBsb2coYEVycm9yOiAke2Vycm9yQXJndW1lbnRzfWApO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBkb24ndCBoYW5kbGUgdGhlIHNhbWUgZXJyb3IgbW9yZSB0aGFuIG9uY2VcbiAgICAgICAgaWYoZXJyb3JIYW5kbGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVycm9ySGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gYWJvcnQgdGhlIGNodW5rIHVwbG9hZFxuICAgICAgICBzZWxmLnNldENodW5rVXBsb2FkaW5nKGNodW5rLCBmYWxzZSk7XG4gICAgICAgIHNlbGYuc2V0Q2h1bmtGaW5pc2hlZChjaHVuaywgZmFsc2UpO1xuICAgICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCAwKTtcbiAgICAgICAgbG9nKCdBYm9ydCcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBsb2coZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2coYFJldHJ5IGNodW5rOiAke2NodW5rfWApO1xuXG4gICAgICAgIC8vIENsZWFyIHRoZSB3YXRjaGVyIGludGVydmFsXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5faW50ZXJ2YWxzW2NodW5rXSk7XG5cbiAgICAgICAgLy8gUmUtdHJ5IHRoZSB1cGxvYWRcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZihzZWxmLmdldFN0YXRlKCkgPT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgICAgICAgLy8gQW5kIHByb2NlZWRcbiAgICAgICAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuayhjaHVuayk7XG4gICAgICAgICAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAgICAgICAgIHNlbGYudXBsb2FkQ2h1bmsobmV4dENodW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIEFtYXpvblhIUi51cGxvYWRDaHVuayhcbiAgICAgIHNlbGYuYXV0aCwgc2VsZi5zZXR0aW5ncy5rZXksIHNlbGYudXBsb2FkSWQsXG4gICAgICBjaHVuaywgc2VsZi5maWxlLnNsaWNlKHN0YXJ0LCBlbmQpLCB7XG4gICAgICAgIHByb2dyZXNzQ2FsbGJhY2s6IHByb2dyZXNzSGFuZGxlcixcbiAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjazogaGFuZGxlcixcbiAgICAgICAgZXJyb3JDYWxsYmFjazogZXJyb3JIYW5kbGVyLFxuICAgICAgICB0aW1lb3V0Q2FsbGJhY2s6IGVycm9ySGFuZGxlcixcbiAgICAgIH0sIGZ1bmN0aW9uKHhocikge1xuICAgICAgICBzZWxmLl9jaHVua1hociA9IHNlbGYuX2NodW5rWGhyIHx8IFtdO1xuICAgICAgICBzZWxmLl9jaHVua1hoci5wdXNoKHhocik7XG5cbiAgICAgICAgLy8gVGhlIHdhdGNoZXIgaW50ZXJ2YWw7IGl0IGNhbmNlbHMgdGhlIHhociBpZiBpdCB0aW1lcyBvdXRcbiAgICAgICAgc2VsZi5faW50ZXJ2YWxzW2NodW5rXSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKGxhc3RQcm9ncmVzc1RpbWUgJiZcbiAgICAgICAgICAgICAgKG5ldyBEYXRlKCkgLSBsYXN0UHJvZ3Jlc3NUaW1lKSA+IDE1ICogU0VDT05EUykgeyAvLyAxNXNcbiAgICAgICAgICAgIGxvZygnQ2h1bmsgRmFpbGVkOyByZXRyeScpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLl9pbnRlcnZhbHNbY2h1bmtdKTtcbiAgICAgICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSA9PT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICBlcnJvckhhbmRsZXIuY2FsbCh4aHIpO1xuICAgICAgICAgICAgICBzZWxmLl9jaHVua1hoclt0aGlzLl9jaHVua1hoci5pbmRleE9mKHhocildID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIDQgKiBTRUNPTkRTKTsgLy8gRXZlcnkgNHNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZmluaXNoVXBsb2FkKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1ha2Ugc3VyZSBpdCdzIG5vdCB0cmlnZ2VyZWQgd2hlbiBub3QgcHJvY2Vzc2luZyAoZS5nLiBtdWx0aXBsZSB0aW1lcylcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoYW5nZSB0aGUgdXBsb2FkJ3Mgc3RhdGVcbiAgICBzZWxmLnNldFN0YXRlKCdmaW5pc2hpbmcnKTtcblxuICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgc2VsZiwgc2VsZi5maWxlLnNpemUsIHNlbGYuZmlsZS5zaXplXG4gICAgKTsgLy8gMTAwJSBkb25lLlxuXG5cbiAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIEkuZS4gaWYgaXQncyBhIDJYWCByZXNwb25zZVxuICAgICAgaWYocGFyc2VJbnQoZS50YXJnZXQuc3RhdHVzIC8gMTAwKSA9PT0gMikge1xuICAgICAgICBsb2coJ0ZpbmlzaGVkIGZpbGUuJyk7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGVkJyk7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgICAgIHNlbGYsIHNlbGYuZmlsZS5zaXplLCBzZWxmLmZpbGUuc2l6ZVxuICAgICAgICApOyAvLyBJdCdzIDEwMCUgZG9uZVxuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIGNvbXBsZXRlIGV2ZW50IGNhbGxiYWNrXG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Db21wbGV0ZS5jYWxsKHNlbGYpO1xuICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDAwICYmXG4gICAgICAgICAgZS50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ0VudGl0eVRvb1NtYWxsJykgIT09IC0xKSB7XG4gICAgICAgIC8vIEFuIFwiRW50aXR5VG9vU21hbGxcIiBlcnJvciBtZWFucyB0aGF0IHdlIG1pc3NlZCBhIGNodW5rXG4gICAgICAgIEFtYXpvblhIUi5saXN0KFxuICAgICAgICAgIHNlbGYuYXV0aCwgc2VsZi5maWxlLCBzZWxmLnNldHRpbmdzLmtleSxcbiAgICAgICAgICBzZWxmLnVwbG9hZElkLCBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSxcbiAgICAgICAgICBmdW5jdGlvbihwYXJ0cykge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVDaHVua3MocGFydHMpO1xuICAgICAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKCdwcm9jZXNzaW5nJyk7XG4gICAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIC8vIDQwNCA9IE5vU3VjaFVwbG9hZCA9IGNoZWNrIGlmIGFscmVhZHkgZmluaXNoZWRcbiAgICAgICAgLy8gSWYgc28sIHN0YXJ0IGEgbmV3IHVwbG9hZFxuICAgICAgICBzZWxmLmNhbmNlbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBzZWxmLnVwbG9hZEZpbGUoc2VsZi5maWxlLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmNoZWNrQWxyZWFkeVVwbG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGhhbmRsZXIoe1xuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgIHN0YXR1czogMjAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiA0MDQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQW1hem9uWEhSLmxpc3QoXG4gICAgICBzZWxmLmF1dGgsIHNlbGYuZmlsZSwgc2VsZi5zZXR0aW5ncy5rZXksXG4gICAgICBzZWxmLnVwbG9hZElkLCBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSxcbiAgICAgIGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwoc2VsZi5maWxlLnNpemUgLyBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSk7XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB3ZSB1cGxvYWRlZCBhbGwgdGhlIGNodW5rczsgaWYgd2UgZGlkbid0LFxuICAgICAgICAvLyBzdGFydCB1cGxvYWRpbmcgdGhlIG1pc3Npbmcgb25lc1xuICAgICAgICBpZihwYXJ0cy5sZW5ndGggIT09IG51bUNodW5rcykge1xuICAgICAgICAgIHNlbGYudXBkYXRlQ2h1bmtzKHBhcnRzKTtcbiAgICAgICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgICAgICBzZWxmLnNldFN0YXRlKCdwcm9jZXNzaW5nJyk7XG4gICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFtYXpvblhIUi5maW5pc2goXG4gICAgICAgICAgc2VsZi5hdXRoLCBzZWxmLnNldHRpbmdzLmtleSwgc2VsZi51cGxvYWRJZCwgcGFydHMsIGhhbmRsZXJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbm90aWZ5Q2h1bmtVcGxvYWRlZChjaHVuaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIga2V5ID0gc2VsZi5zZXR0aW5ncy5rZXk7XG4gICAgdmFyIHVwbG9hZElkID0gc2VsZi51cGxvYWRJZDtcbiAgICB2YXIgdXJsID0gYCR7c2VsZi5zZXR0aW5ncy5hamF4QmFzZX0vY2h1bmtfbG9hZGVkL2A7XG5cbiAgICB2YXIgYXJncyA9IE9iamVjdC5hc3NpZ24oc2VsZi5zZXR0aW5ncy5leHRyYVBhcmFtcyB8fCB7fSwge1xuICAgICAgY2h1bmssXG4gICAgICBrZXksXG4gICAgICB1cGxvYWRJZCxcbiAgICAgIGZpbGVuYW1lOiBzZWxmLmZpbGUubmFtZSxcbiAgICAgIGZpbGVzaXplOiBzZWxmLmZpbGUuc2l6ZSxcbiAgICAgIGxhc3RNb2RpZmllZDogc2VsZi5maWxlLmxhc3RNb2RpZmllZERhdGUudmFsdWVPZigpLFxuICAgIH0pO1xuXG4gICAgWEhSKHtcbiAgICAgIHVybCxcbiAgICAgIGV4dHJhUGFyYW1zOiBhcmdzLFxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tBbHJlYWR5VXBsb2FkZWQoY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG1ldGhvZCA9ICdIRUFEJztcbiAgICB2YXIgcGF0aCA9IGAvJHtzZWxmLnNldHRpbmdzLmtleX1gO1xuICAgIHZhciBpbm5lckhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBUaGUgaGFuZGxlciBvbmx5IGNoZWNrcyBmb3Igc3RhdHVzIGNvZGU7XG4gICAgICAvLyBpZiB0aGUgSEVBRCByZXR1cm5zIDQwNCwgcmUtdXBsb2FkLFxuICAgICAgLy8gZWxzZSwgaXQgcmV0dXJucyAyMDAgYW5kIGZpbmlzaCB0aGUgdXBsb2FkXG4gICAgICBpZihwYXJzZUludChlLnRhcmdldC5zdGF0dXMgLyAxMDApID09PSAyKSB7XG4gICAgICAgIGxvZygnQWxyZWFkeSBVcGxvYWRlZCcpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nKCdFcnJvciEnKTtcbiAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZighZXJyb3JDYWxsYmFjayAmJiB0eXBlb2YoZXJyb3JDYWxsYmFjaykgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVycm9yQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5jaGVja0FscmVhZHlVcGxvYWRlZChjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0sIDI1MDApO1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJlZ2lvblN0cmluZyA9IHV0aWwucmVnaW9uU3RyaW5nKHNlbGYuc2V0dGluZ3MuYXV0aC5yZWdpb24pO1xuICAgIGNvbnN0IHByb3RvY29sID0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgY29uc3QgYnVja2V0ID0gc2VsZi5zZXR0aW5ncy5hdXRoLmJ1Y2tldDtcbiAgICB2YXIgaG9zdCA9IGBzMyR7cmVnaW9uU3RyaW5nfS5hbWF6b25hd3MuY29tYDtcbiAgICB2YXIgdXJsID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3R9LyR7YnVja2V0fS8ke3BhdGh9YDtcbiAgICBYSFIoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgbG9hZENhbGxiYWNrOiBpbm5lckhhbmRsZXIsXG4gICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrLFxuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsKGNhbGxiYWNrKSB7XG4gICAgLy8gRW1wdHkgYWxsIGZpZWxkcywgY2FuY2VsIGFsbCBpbnRlcnZhbHMsIGFib3J0IGFsbCB4aHInc1xuICAgIHRoaXMuX2NodW5rWGhyLm1hcCgoY2h1bmspID0+IHtcbiAgICAgIGxvZyhgQWJvcnQgY2h1bms6ICR7Y2h1bmt9YCk7XG4gICAgICBjaHVuay5hYm9ydCgpO1xuICAgIH0pO1xuICAgIHRoaXMuX2ludGVydmFscyA9IHRoaXMuX2ludGVydmFscyB8fCB7fTtcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLl9pbnRlcnZhbHMpIHtcbiAgICAgIGlmKHRoaXMuX2ludGVydmFscy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5faW50ZXJ2YWxzW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBjYWxsYmFjayA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gICAgdGhpcy5zZXRTdGF0ZSgnY2FuY2VsZWQnKTtcbiAgICB0aGlzLl9jaHVua1hociA9IHRoaXMuX2NodW5rWGhyIHx8IFtdO1xuICAgIHRoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKHRoaXMsIDAsIDApO1xuICAgIHRoaXMuX2NodW5rWGhyID0gbnVsbDtcbiAgICB0aGlzLl9jaHVua3MgPSBudWxsO1xuICAgIHRoaXMuX3VwbG9hZGluZ0NodW5rcyA9IG51bGw7XG4gICAgdGhpcy5fbG9hZGVkQ2h1bmtzID0gbnVsbDtcbiAgICB0aGlzLl9zdGFydEZpcmVkID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRJZCA9IG51bGw7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSBudWxsO1xuICAgIHRoaXMuc2V0U3RhdGUoJ3dhaXRpbmcnKTsgLy8gd2FpdCBmb3IgYSBuZXcgdXBsb2FkXG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHVwZGF0ZUNodW5rcyhwYXJ0cykge1xuICAgIHZhciBsb2FkZWQgPSBbXTtcbiAgICB2YXIgbnVtQ2h1bmtzID0gTWF0aC5jZWlsKHRoaXMuZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemUpO1xuXG4gICAgdGhpcy5faW5pdENodW5rcyh0cnVlKTtcbiAgICB0aGlzLl91cGxvYWRpbmdDaHVua3MgPSBbXTtcbiAgICB0aGlzLl9sb2FkZWRDaHVua3MgPSBbXTtcblxuICAgIHBhcnRzLm1hcCgocGFydCkgPT4ge1xuICAgICAgdmFyIHBhcnROdW1iZXIgPSBwYXJzZUludChwYXJ0WzBdLCAxMCk7XG4gICAgICB0aGlzLmFkZExvYWRlZENodW5rKHBhcnROdW1iZXIgLSAxKTtcbiAgICAgIHRoaXMuc2V0Q2h1bmtGaW5pc2hlZChwYXJ0TnVtYmVyIC0gMSk7XG4gICAgICBsb2FkZWQucHVzaChwYXJ0TnVtYmVyIC0gMSk7XG4gICAgfSk7XG5cbiAgICBmb3IobGV0IGNodW5rTnVtID0gMDsgY2h1bmtOdW0gPCBudW1DaHVua3M7IGNodW5rTnVtKyspIHtcbiAgICAgIGlmKGxvYWRlZC5pbmRleE9mKGNodW5rTnVtKSA9PT0gLTEpIHtcbiAgICAgICAgbG9nKGBDaHVuayBub3QgdXBsb2FkZWQ6ICR7Y2h1bmtOdW19YCk7XG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoY2h1bmtOdW0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5maWxlO1xuICB9XG5cbiAgZ2V0U3RhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xuICB9XG5cbiAgc2V0U3RhdGUoc3RhdGUpIHtcbiAgICB0aGlzLl9zdGF0ZSA9IHN0YXRlO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHNldFByb2dyZXNzKGNodW5rLCBsb2FkZWQpIHtcbiAgICB0aGlzLl9wcm9ncmVzcyA9IHRoaXMuX3Byb2dyZXNzIHx8IHt9O1xuICAgIHRoaXMuX3RvdGFsUHJvZ3Jlc3MgPSAodGhpcy5fdG90YWxQcm9ncmVzcyB8fCAwKSArXG4gICAgICBsb2FkZWQgLSAodGhpcy5fcHJvZ3Jlc3NbY2h1bmtdIHx8IDApO1xuICAgIHRoaXMuX3Byb2dyZXNzW2NodW5rXSA9IGxvYWRlZDtcbiAgICB0aGlzLnNldHRpbmdzLm9uQ2h1bmtQcm9ncmVzcy5jYWxsKFxuICAgICAgdGhpcywgY2h1bmssIGxvYWRlZCwgdGhpcy5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgfVxuXG4gIGdldFRvdGFsUHJvZ3Jlc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsUHJvZ3Jlc3MgfHwgMDtcbiAgfVxuXG4gIGlzQ2h1bmtMb2FkZWQoY2h1bmspIHtcbiAgICB0aGlzLl9sb2FkZWRDaHVua3MgPSB0aGlzLl9sb2FkZWRDaHVua3MgfHwgW107XG4gICAgcmV0dXJuIHRoaXMuX2xvYWRlZENodW5rcy5pbmRleE9mKGNodW5rKSAhPT0gLTE7XG4gIH1cblxuICBhZGRMb2FkZWRDaHVuayhjaHVuaykge1xuICAgIHRoaXMuX2xvYWRlZENodW5rcyA9IHRoaXMuX2xvYWRlZENodW5rcyB8fCBbXTtcbiAgICB0aGlzLl9sb2FkZWRDaHVua3MucHVzaChjaHVuayk7XG4gICAgdGhpcy5zZXRQcm9ncmVzcyhjaHVuaywgdGhpcy5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgfVxuXG4gIGdldENodW5rVXBsb2FkaW5nKGNodW5rKSB7XG4gICAgdGhpcy5fdXBsb2FkaW5nQ2h1bmtzID0gdGhpcy5fdXBsb2FkaW5nQ2h1bmtzIHx8IFtdO1xuICAgIHJldHVybiB0aGlzLl91cGxvYWRpbmdDaHVua3MuaW5kZXhPZihjaHVuaykgIT09IC0xO1xuICB9XG5cbiAgc2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmssIHZhbCkge1xuICAgIGlmKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YWwgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl91cGxvYWRpbmdDaHVua3MgPSB0aGlzLl91cGxvYWRpbmdDaHVua3MgfHwgW107XG4gICAgaWYodmFsKSB7XG4gICAgICB0aGlzLl91cGxvYWRpbmdDaHVua3MucHVzaChjaHVuayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpZHg7XG4gICAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAgIGlkeCA9IHRoaXMuX3VwbG9hZGluZ0NodW5rcy5pbmRleE9mKGNodW5rKTtcbiAgICAgICAgaWYoaWR4ID09PSAtMSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwbG9hZGluZ0NodW5rcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaW5pdENodW5rcyhmb3JjZSkge1xuICAgIGlmKCF0aGlzLl9jaHVua3MgfHwgZm9yY2UpIHtcbiAgICAgIHRoaXMuX2NodW5rcyA9IFtdO1xuICAgICAgdmFyIG51bUNodW5rcyA9IE1hdGguY2VpbCh0aGlzLmZpbGUuc2l6ZSAvIHRoaXMuc2V0dGluZ3MuY2h1bmtTaXplKTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBudW1DaHVua3M7IGkrKykge1xuICAgICAgICB0aGlzLl9jaHVua3MucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0Q2h1bmtGaW5pc2hlZChjaHVuaywgdmFsKSB7XG4gICAgaWYodHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX2luaXRDaHVua3MoKTtcbiAgICB0aGlzLl9jaHVua3NbY2h1bmtdID0gISF2YWw7XG4gIH1cblxuICBnZXROZXh0Q2h1bmsoY2h1bmspIHtcbiAgICB0aGlzLl9pbml0Q2h1bmtzKCk7XG4gICAgaWYoY2h1bmsgJiYgIXRoaXMuX2NodW5rc1tjaHVua10gJiYgIXRoaXMuZ2V0Q2h1bmtDcGxvYWRpbmcoY2h1bmspKSB7XG4gICAgICByZXR1cm4gY2h1bms7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9jaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKCF0aGlzLl9jaHVua3NbaV0gJiYgIXRoaXMuZ2V0Q2h1bmtVcGxvYWRpbmcoaSkpIHtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIHVwbG9hZEZpbmlzaGVkKCkge1xuICAgIHRoaXMuX2luaXRDaHVua3MoKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZighdGhpcy5fY2h1bmtzW2ldIHx8IHRoaXMuZ2V0Q2h1bmtVcGxvYWRpbmcoaSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzTGFzdENodW5rKGNodW5rKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLmZpbGUuc2l6ZSAvIHRoaXMuc2V0dGluZ3MuY2h1bmtTaXplKSAtIDEgPT09IGNodW5rO1xuICB9XG5cbiAgZ2V0Q2h1bmtTaXplKGNodW5rKSB7XG4gICAgaWYodGhpcy5pc0xhc3RDaHVuayhjaHVuaykpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpbGUuc2l6ZSAlIHRoaXMuc2V0dGluZ3MuY2h1bmtTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5jaHVua1NpemU7XG4gICAgfVxuICB9XG5cbiAgb25DaHVua1Byb2dyZXNzKGYpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uQ2h1bmtQcm9ncmVzcyA9IGY7XG4gIH1cblxuICBvblByb2dyZXNzKGYpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3Nyb2dyZXNzID0gZjtcbiAgfVxuXG4gIG9uU2VsZWN0KGYpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uU2VsZWN0ID0gZjtcbiAgfVxuXG4gIG9uRXJyb3IoZikge1xuICAgIHRoaXMuc2V0dGluZ3Mub25FcnJvciA9IGY7XG4gIH1cblxuICBvbkNvbXBsZXRlKGYpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uQ29tcGxldGUgPSBmO1xuICB9XG5cbiAgb25Jbml0KGYpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uSW5pdCA9IGY7XG4gIH1cblxuICBvblN0YXJ0KGYpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uU3RhcnQgPSBmO1xuICB9XG5cbiAgb25DaHVua1VwbG9hZGVkKGYpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uQ2h1bmtVcGxvYWRlZCA9IGY7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcbiAgc3RhdGljIHJlZ2lvblN0cmluZyhyZWdpb24pIHtcbiAgICAvLyBHaXZlbiBhbiBBV1MgcmVnaW9uLCBpdCBlaXRoZXIgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcgZm9yXG4gICAgLy8gVVMtYmFzZWQgcmVnaW9ucyBvciB0aGUgcmVnaW9uIG5hbWUgcHJlY2VkZWQgYnkgYSBkYXNoIGZvciBub24tVVMtYmFzZWRcbiAgICAvLyByZWdpb25zLlxuICAgIC8vIFNlZSB0aGlzIGZvciBtb3JlIGRldGFpbHM6XG4gICAgLy8gaHR0cDovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L2Rldi9WaXJ0dWFsSG9zdGluZy5odG1sXG4gICAgaWYocmVnaW9uICYmIHJlZ2lvbi5zbGljZSgwLCAyKSAhPT0gJ3VzJykge1xuICAgICAgcmV0dXJuICctJyArIHJlZ2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHN0YXRpYyB6ZmlsbChzdHIsIG51bSkge1xuICAgIGxldCB6ZXJvcyA9ICcnO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgemVyb3MgKz0gJzAnO1xuICAgIH1cblxuICAgIHJldHVybiAoemVyb3MgKyBzdHIpLnN1YnN0cigtTWF0aC5tYXgobnVtLCBzdHIudG9TdHJpbmcoKS5sZW5ndGgpKTtcbiAgfVxuICBzdGF0aWMgdXJpZW5jb2RlKHN0cmluZykge1xuICAgIHZhciBvdXRwdXQgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nKTtcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvW15BLVphLXowLTlfLn5cXC0lXSsvZywgZXNjYXBlKTtcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvOy9nLCAnJTNCJyk7XG5cbiAgICAvLyBBV1MgcGVyY2VudC1lbmNvZGVzIHNvbWUgZXh0cmEgbm9uLXN0YW5kYXJkIGNoYXJhY3RlcnMgaW4gYSBVUklcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvWypdL2csIGZ1bmN0aW9uKGNoKSB7XG4gICAgICByZXR1cm4gJyUnICsgY2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgc3RhdGljIGlzbzg2MDEoZGF0ZSkge1xuICAgIHJldHVybiBbXG4gICAgICBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAyKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDRGF0ZSgpLCAyKSxcbiAgICAgICdUJyxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDSG91cnMoKSwgMiksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ01pbnV0ZXMoKSwgMiksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ1NlY29uZHMoKSwgMiksXG4gICAgICAnWicsXG4gICAgXS5qb2luKCcnKTtcblxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBYSFIoYXJncykge1xuICAvLyBUaGUgdXNlciBtYXkgb3IgbWF5IG5vdCBwYXNzIGFueSBoZWFkZXJzXG4gIGFyZ3MuaGVhZGVycyA9IGFyZ3MuaGVhZGVycyB8fCB7fTtcblxuICAvLyBJZiBubyBtZXRob2QgaXMgZ2l2ZW4sIGRlZmF1bHQgdG8gR0VUXG4gIGFyZ3MubWV0aG9kID0gYXJncy5tZXRob2QgfHwgJ0dFVCc7XG5cbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIC8vIFNldCB0aGUgXCJsb2FkXCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy5sb2FkQ2FsbGJhY2sgJiYgdHlwZW9mIGFyZ3MubG9hZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhcmdzLmxvYWRDYWxsYmFjaywgdHJ1ZSk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFwiZXJyb3JcIiBjYWxsYmFjayBpZiBnaXZlblxuICBpZihhcmdzLmVycm9yQ2FsbGJhY2sgJiYgdHlwZW9mIGFyZ3MuZXJyb3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGFyZ3MuZXJyb3JDYWxsYmFjaywgdHJ1ZSk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFwicmVhZHlzdGF0ZWNoYW5nZVwiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3Muc3RhdGVDaGFuZ2VDYWxsYmFjayAmJlxuICAgICAgdHlwZW9mIGFyZ3Muc3RhdGVDaGFuZ2VDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgYXJncy5zdGF0ZUNoYW5nZUNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJwcm9ncmVzc1wiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3MucHJvZ3Jlc3NDYWxsYmFjayAmJiB0eXBlb2YgYXJncy5wcm9ncmVzc0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGFyZ3MucHJvZ3Jlc3NDYWxsYmFjayk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFwidGltZW91dFwiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3MudGltZW91dENhbGxiYWNrICYmIHR5cGVvZiBhcmdzLnRpbWVvdXRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCd0aW1lb3V0JywgYXJncy50aW1lb3V0Q2FsbGJhY2spO1xuICB9XG5cbiAgLy8gQWRkaW5nIGV4dHJhIHBhcmFtcyBhcyBuZWVkZWRcbiAgdmFyIHVybCA9IGFyZ3MudXJsO1xuICBpZihhcmdzLmV4dHJhUGFyYW1zKSB7XG4gICAgZm9yKHZhciBwYXJhbU5hbWUgaW4gYXJncy5leHRyYVBhcmFtcykge1xuICAgICAgaWYoYXJncy5leHRyYVBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbU5hbWUpKSB7XG4gICAgICAgIGlmKHVybC5pbmRleE9mKCc/JykgIT09IC0xKSB7XG4gICAgICAgICAgdXJsICs9ICcmJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwgKz0gJz8nO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsICs9IGVuY29kZVVSSUNvbXBvbmVudChwYXJhbU5hbWUpICsgJz0nO1xuICAgICAgICB1cmwgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3MuZXh0cmFQYXJhbXNbcGFyYW1OYW1lXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gT3BlbiB0aGUgeGhyIGNvbm5lY3Rpb25cbiAgeGhyLm9wZW4oYXJncy5tZXRob2QsIHVybCk7XG5cbiAgLy8gU2V0IHRoZSBoZWFkZXJzXG4gIGZvcih2YXIgaGVhZGVyIGluIGFyZ3MuaGVhZGVycykge1xuICAgIGlmKGFyZ3MuaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZWFkZXIpKSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGFyZ3MuaGVhZGVyc1toZWFkZXJdKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIHRoZSBhamF4IGNhbGxcbiAgaWYoYXJncy5ib2R5KSB7XG4gICAgeGhyLnNlbmQoYXJncy5ib2R5KTtcbiAgfSBlbHNlIHtcbiAgICB4aHIuc2VuZCgpO1xuICB9XG4gIHJldHVybiB4aHI7XG59XG4iXX0=
