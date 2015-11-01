(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _uploader = require('./uploader');

var _uploader2 = _interopRequireDefault(_uploader);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

function muleUploader(settings) {
  // Verify that the browser has the needed HTML5 capabilities
  if (!(typeof File !== 'undefined' && typeof FileList !== 'undefined' && typeof Blob !== 'undefined')) {
    (0, _log2['default'])('HTML5 APIs not available.');
    return -1;
  }

  // For new webkit browsers, the .slice() method is named .webkitSlice()
  // similar for mozilla
  if (typeof File === 'object' && typeof File.prototype === 'object') {
    File.prototype.slice = File.prototype.webkitSlice || File.prototype.mozSlice || File.prototype.slice;
  }

  if (typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') !== -1) {
    try {
      var justChecking = new Blob(['something']);
    } catch (e) {
      return -1;
    }
  }
  (0, _log2['default'])('OK');

  return new _uploader2['default'](settings);
}

if (typeof window !== 'undefined') {
  window.muleUploader = muleUploader;
}

},{"./log":63,"./uploader":64,"babel-runtime/helpers/interop-require-default":9}],2:[function(require,module,exports){
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

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _isIterable = require("babel-runtime/core-js/is-iterable")["default"];

exports["default"] = (function () {
  function sliceIterator(arr, i) {
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
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (_isIterable(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/is-iterable":3}],11:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":49,"../modules/es6.string.iterator":54,"../modules/web.dom.iterable":55}],12:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":50,"../modules/es6.string.iterator":54,"../modules/web.dom.iterable":55}],13:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":20,"../../modules/es6.object.assign":52}],14:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":33}],15:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":20,"../../modules/es6.object.keys":53}],16:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":28}],17:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":33,"./$.fails":23,"./$.iobject":27,"./$.to-object":44}],18:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":19,"./$.wks":47}],19:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],20:[function(require,module,exports){
var core = module.exports = {version: '1.2.4'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],21:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , PROTOTYPE = 'prototype';
var ctx = function(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
};
var $def = function(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && typeof target[key] != 'function')exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp[PROTOTYPE] = C[PROTOTYPE];
    }(out);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
module.exports = $def;
},{"./$.core":20,"./$.global":24}],22:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],23:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],24:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],25:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],26:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.support-desc') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":33,"./$.property-desc":36,"./$.support-desc":40}],27:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":19}],28:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],29:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , descriptor = require('./$.property-desc')
  , setTag     = require('./$.tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setTag(Constructor, NAME + ' Iterator');
};
},{"./$":33,"./$.hide":26,"./$.property-desc":36,"./$.tag":41,"./$.wks":47}],30:[function(require,module,exports){
'use strict';
var LIBRARY         = require('./$.library')
  , $def            = require('./$.def')
  , $redef          = require('./$.redef')
  , hide            = require('./$.hide')
  , has             = require('./$.has')
  , SYMBOL_ITERATOR = require('./$.wks')('iterator')
  , Iterators       = require('./$.iterators')
  , $iterCreate     = require('./$.iter-create')
  , setTag          = require('./$.tag')
  , getProto        = require('./$').getProto
  , BUGGY           = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR     = '@@iterator'
  , KEYS            = 'keys'
  , VALUES          = 'values';
var returnThis = function(){ return this; };
module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG      = NAME + ' Iterator'
    , proto    = Base.prototype
    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , _default = _native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if(_native){
    var IteratorPrototype = getProto(_default.call(new Base));
    // Set @@toStringTag to native iterators
    setTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, SYMBOL_ITERATOR, returnThis);
  }
  // Define iterator
  if((!LIBRARY || FORCE) && (BUGGY || !(SYMBOL_ITERATOR in proto))){
    hide(proto, SYMBOL_ITERATOR, _default);
  }
  // Plug for library
  Iterators[NAME] = _default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEFAULT == VALUES ? _default : getMethod(VALUES),
      keys:    IS_SET            ? _default : getMethod(KEYS),
      entries: DEFAULT != VALUES ? _default : getMethod('entries')
    };
    if(FORCE)for(key in methods){
      if(!(key in proto))$redef(proto, key, methods[key]);
    } else $def($def.P + $def.F * BUGGY, NAME, methods);
  }
  return methods;
};
},{"./$":33,"./$.def":21,"./$.has":25,"./$.hide":26,"./$.iter-create":29,"./$.iterators":32,"./$.library":34,"./$.redef":37,"./$.tag":41,"./$.wks":47}],31:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],32:[function(require,module,exports){
module.exports = {};
},{}],33:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],34:[function(require,module,exports){
module.exports = true;
},{}],35:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $def  = require('./$.def')
  , core  = require('./$.core')
  , fails = require('./$.fails');
module.exports = function(KEY, exec){
  var $def = require('./$.def')
    , fn   = (core.Object || {})[KEY] || Object[KEY]
    , exp  = {};
  exp[KEY] = exec(fn);
  $def($def.S + $def.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":20,"./$.def":21,"./$.fails":23}],36:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],37:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":26}],38:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":24}],39:[function(require,module,exports){
// true  -> String#at
// false -> String#codePointAt
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
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
},{"./$.defined":22,"./$.to-integer":42}],40:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":23}],41:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":33,"./$.has":25,"./$.wks":47}],42:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],43:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":22,"./$.iobject":27}],44:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":22}],45:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],46:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],47:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":24,"./$.shared":38,"./$.uid":45}],48:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":18,"./$.core":20,"./$.iterators":32,"./$.wks":47}],49:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":16,"./$.core":20,"./core.get-iterator-method":48}],50:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').isIterable = function(it){
  var O = Object(it);
  return ITERATOR in O
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./$.classof":18,"./$.core":20,"./$.iterators":32,"./$.wks":47}],51:[function(require,module,exports){
'use strict';
var setUnscope = require('./$.unscope')
  , step       = require('./$.iter-step')
  , Iterators  = require('./$.iterators')
  , toIObject  = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
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
},{"./$.iter-define":30,"./$.iter-step":31,"./$.iterators":32,"./$.to-iobject":43,"./$.unscope":46}],52:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');

$def($def.S + $def.F, 'Object', {assign: require('./$.assign')});
},{"./$.assign":17,"./$.def":21}],53:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":35,"./$.to-object":44}],54:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":30,"./$.string-at":39}],55:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":32,"./es6.array.iterator":51}],56:[function(require,module,exports){
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
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
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
},{}],57:[function(require,module,exports){
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
},{"./core":56}],58:[function(require,module,exports){
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
},{"./core":56,"./hmac":59,"./sha256":60}],59:[function(require,module,exports){
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
},{"./core":56}],60:[function(require,module,exports){
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
},{"./core":56}],61:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _cryptoJsSha256 = require('crypto-js/sha256');

var _cryptoJsSha2562 = _interopRequireDefault(_cryptoJsSha256);

var _cryptoJsHmacSha256 = require('crypto-js/hmac-sha256');

var _cryptoJsHmacSha2562 = _interopRequireDefault(_cryptoJsHmacSha256);

var _cryptoJsEncHex = require('crypto-js/enc-hex');

var _cryptoJsEncHex2 = _interopRequireDefault(_cryptoJsEncHex);

var AmazonXHR = (function () {
  function AmazonXHR(settings) {
    _classCallCheck(this, AmazonXHR);

    this.settings = settings;
  }

  _createClass(AmazonXHR, [{
    key: 'send',
    value: function send(callback) {
      this.requestDate = new Date();

      this.headers = this.settings.headers;

      var bucket = this.settings.auth.bucket;
      var regionString = _utils2['default'].regionString(this.settings.auth.region);
      this.headers.host = bucket + '.s3' + regionString + '.amazonaws.com';

      var date = this.settings.auth.date;
      var dateString = [date.getUTCFullYear(), _utils2['default'].zfill(date.getUTCMonth() + 1, 2), _utils2['default'].zfill(date.getUTCDate(), 2)].join('');

      var encodedDate = _utils2['default'].uriencode(_utils2['default'].iso8601(this.requestDate));
      var querystring = this.settings.querystring;
      querystring['X-Amz-Date'] = encodedDate;
      querystring['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
      querystring['X-Amz-Expires'] = 86400; // One day

      var accessKey = this.settings.auth.accessKey;
      var region = this.settings.auth.region;
      querystring['X-Amz-Credential'] = _utils2['default'].uriencode(accessKey + '/' + dateString + '/' + region + '/s3/aws4_request');
      querystring['X-Amz-SignedHeaders'] = '';

      var headerKeys = _Object$keys(this.headers);

      headerKeys.sort();
      querystring['X-Amz-SignedHeaders'] = _utils2['default'].uriencode(headerKeys.join(';'));

      querystring['X-Amz-Signature'] = this.getAuthorizationHeader();

      var url = location.protocol + '//' + this.headers.host + '/' + this.settings.key;
      delete this.headers.host; // keep this header only for hashing

      var first = true;
      _Object$keys(querystring).map(function (key) {
        var value = querystring[key];
        if (first) {
          url += '?';
        }
        first = false;
        url += key + '=' + value + '&';
      });
      url = url.slice(0, -1); // remove extra ampersand

      this.xhr = (0, _xhr2['default'])({
        url: url,
        method: this.settings.method,
        headers: this.headers,
        body: this.settings.payload,

        loadCallback: this.settings.loadCallback,
        progressCallback: this.settings.progressCallback,
        stateChangeCallback: this.settings.stateChangeCallback,
        errorCallback: this.settings.errorCallback,
        timeoutCallback: this.settings.timeoutCallback
      });
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
          return acc + '&amp;' + _utils2['default'].uriencode(key) + '=' + value;
        } else {
          return _utils2['default'].uriencode(key) + '=' + value;
        }
      }, '');
      request += '\n';

      // headers
      var headerKeys = _Object$keys(this.headers).sort();
      request += headerKeys.reduce(function (acc, key) {
        var value = _this.headers[key];
        if (acc) {
          return acc + '\n' + key.toLowerCase() + ':' + value.trim();
        } else {
          return key.toLowerCase() + ':' + value.trim();
        }
      }, '');
      request += '\n\n';

      // signed headers
      request += headerKeys.reduce(function (acc, val) {
        if (acc) {
          return acc + ';' + val.toLowerCase();
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
      return ('\n      AWS4-HMAC-SHA256\n      ' + _utils2['default'].iso8601(time) + '\n      ' + [time.getUTCFullYear(), _utils2['default'].zfill(time.getUTCMonth() + 1, 2), _utils2['default'].zfill(time.getUTCDate(), 2), '/' + this.settings.auth.region + '/s3/aws4_request\n'].join('') + '\n      ' + (0, _cryptoJsSha2562['default'])(canonicalRequest.replace(/&amp;/g, '&')).toString() + '\n    ').trim().replace(/^\s+/gm, '');
    }
  }, {
    key: 'signRequest',
    value: function signRequest(stringToSign) {
      var res = (0, _cryptoJsHmacSha2562['default'])(stringToSign, _cryptoJsEncHex2['default'].parse(this.settings.auth.signature)).toString();
      return res;
    }

    // static
  }], [{
    key: 'init',
    value: function init(auth, key, file, callback) {
      return new AmazonXHR({
        auth: auth,
        key: key,
        method: 'POST',
        querystring: {
          uploads: ''
        },
        headers: {
          'x-amz-acl': 'public-read',
          'Content-Disposition': 'attachment; filename=' + file.name,
          'Content-Type': auth.contentType || 'application/octet-stream'
        },
        payload: '',
        loadCallback: callback,
        errorCallback: function errorCallback() {},
        progressCallback: function progressCallback() {},
        stateChangeCallback: function stateChangeCallback() {},
        timeoutCallback: function timeoutCallback() {}
      }).send();
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
        errorCallback = function () {};
        progressCallback = function () {};
        readystateCallback = function () {};
      }
      var querystring = {
        partNumber: chunkNum + 1,
        uploadId: uploadId
      };
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
        stateChangeCallback: readystateCallback,
        timeoutCallback: function timeoutCallback() {}
      }).send(xhrCallback);
    }
  }, {
    key: 'list',
    value: function list(auth, file, key, uploadId, chunkSize, callback, errorCallback, marker) {
      var querystring = {
        uploadId: uploadId
      };
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
        progressCallback: function progressCallback() {},
        stateChangeCallback: function stateChangeCallback() {},
        timeoutCallback: function timeoutCallback() {},
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
            AmazonXHR.list(auth, file, key, uploadId, chunkSize, function (newParts) {
              callback(parts.concat(newParts));
            }, errorCallback, partMarker);
          } else {
            callback(parts);
          }
        }
      }).send();
    }
  }, {
    key: 'finish',
    value: function finish(auth, key, uploadId, parts, callback) {
      var querystring = { uploadId: uploadId };

      // compose the CompleteMultipartUpload request for putting
      // the chunks together
      var dataString = '<CompleteMultipartUpload>';

      parts.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var number = _ref2[0];
        var etag = _ref2[1];

        dataString += ('\n        <Part>\n        <PartNumber>' + number + '</PartNumber>\n        <ETag>' + etag + '</ETag>\n        </Part>\n      ').trim();
      });
      dataString += '</CompleteMultipartUpload>';

      var data = dataString;
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
        loadCallback: callback,
        errorCallback: function errorCallback() {},
        progressCallback: function progressCallback() {},
        stateChangeCallback: function stateChangeCallback() {},
        timeoutCallback: function timeoutCallback() {}
      }).send();
    }
  }]);

  return AmazonXHR;
})();

exports.AmazonXHR = AmazonXHR;

},{"./utils":65,"./xhr":66,"babel-runtime/core-js/object/keys":6,"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8,"babel-runtime/helpers/interop-require-default":9,"babel-runtime/helpers/sliced-to-array":10,"crypto-js/enc-hex":57,"crypto-js/hmac-sha256":58,"crypto-js/sha256":60}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _constants = require('./constants');

exports['default'] = function () {
  if (!(_constants.DEBUG && typeof console !== 'undefined' && typeof console.log !== 'undefined')) {
    return;
  }

  var args = ['[MuleUploader]'];
  for (var i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return console.log.apply(console, args);
};

module.exports = exports['default'];

},{"./constants":62}],64:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _amazonXhr = require('./amazonXhr');

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _constants = require('./constants');

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
    settings.chunkSize = settings.chunkSize || 6 * _constants.MB; // default 6MB
    settings.maxSize = settings.maxSize || 5 * _constants.GB; // 5GB

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
      try {
        self.file.lastModifiedDate = this.file.lastModifiedDate || new Date(0);
      } catch (e) {
        // ...
      }

      if (self.file.size > self.settings.maxSize) {
        alert(['The maximum allowed file size is ', self.settings.maxSize / _constants.GB, 'GB. Please select another file.'].join(''));
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
        lastModified: file.lastModifiedDate.valueOf()
      });

      if (force) {
        args.force = true;
      }

      // Get the signing key. It will also return
      // a file key + uploadId pair if the selected file
      // is already uploading. It also returns a
      // backup_key in case that file upload already completed.
      // The signing key is valid for 7 days
      (0, _xhr2['default'])({
        url: self.settings.ajaxBase + '/signing_key/',
        extraParams: args,
        headers: {},
        method: 'GET',
        loadCallback: function loadCallback(e) {
          var json = JSON.parse(e.target.responseText);
          json.date = new Date(json.date);
          self.auth = json;
          self.uploadId = json.uploadId;
          self.chunks = json.chunks;
          self.settings.key = json.key || self.settings.key;
          self.settings.backupKey = self.settings.key;

          if (!self.uploadId) {
            _amazonXhr.AmazonXHR.init(json, self.settings.key, file, function (e) {
              var xml = e.target.responseXML;

              // Get the given upload id
              self.uploadId = xml.getElementsByTagName('UploadId')[0].textContent;

              self.loadFile();
            });
          } else {
            // Resume a previus upload
            if (!force) {
              // Get the uploaded parts from S3
              _amazonXhr.AmazonXHR.list(self.auth, self.file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
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
                self.loadedChunks = null;
                self.progress = {};
                self.totalProgress = 0;
                self.loadedChunks = null;
                self.uploadingChunks = null;
                self.chunks = [];
                self.settings.key = self.settings.backupKey;
                self.uploadFile(file, true); // Force reload
              });
            } else {
                // force-start the upload
                self.loadFile();
              }
          }
        }
      });
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
        self.startFired = true;
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
        (0, _log2['default'])('All done; finish upload');
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
        (0, _log2['default'])('NOT processing; return');
        return;
      }

      // Also make sure we're not already uploading this chunk
      if (self.getChunkUploading(chunk)) {
        (0, _log2['default'])('Already Uploading');
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
      (0, _log2['default'])('Uploading Chunk: ' + chunk);

      // If we already uploaded this chunk, get to the next one
      // if there is no next chunk, finish the upload
      if (self.isChunkLoaded(chunk)) {
        var nextChunk = self.getNextChunk();
        if (nextChunk !== -1) {
          self.uploadChunk(nextChunk);
        } else {
          if (self.uploadFinished()) {
            (0, _log2['default'])('No next chunk; finish upload');
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
      self.intervals = self.intervals || {};

      var errorHandled = false;
      var errorHandler = function errorHandler() {
        var errorArguments = arguments;
        var xhr = this;
        // The upload may have finished, so check for that
        self.checkAlreadyUploaded(function () {
          // If already uploaded
          self.setState('finished');

          // TODO: what is this?
          // self.notifyUploadFinished();

          // Trigger a final progress event callback, with 100%
          self.settings.onProgress.call(self, self.file.size, self.file.size);

          // Also trigger the complete event callback
          self.settings.onComplete.call(self);
        }, function () {
          // We have a genuine error
          (0, _log2['default'])('Error: ' + errorArguments);

          // make sure we don't handle the same error more than once
          if (errorHandled) {
            return;
          }
          errorHandled = true;

          // abort the chunk upload
          self.setChunkUploading(chunk, false);
          self.setChunkFinished(chunk, false);
          self.setProgress(chunk, 0);
          (0, _log2['default'])('Abort');
          try {
            xhr.abort();
          } catch (e) {
            (0, _log2['default'])(e);
          }

          (0, _log2['default'])('Retry chunk: ' + chunk);

          // Clear the watcher interval
          clearInterval(self.intervals[chunk]);

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

      // The "readystatechange" handler
      var handler = function handler(e) {
        // We care about the "done" event triggered while processing
        if (e.target.readyState !== this.DONE || self.getState() !== 'processing') {
          (0, _log2['default'])(e);
          return;
        }

        // If we don't receive a 2XX response, trigger an error
        if (parseInt(e.target.status) / 100 !== 2) {
          if (typeof errorHandler === 'function') {
            return errorHandler.apply(this);
          }
        }

        // At this point, we know that this chunk finished uploading
        (0, _log2['default'])('Chunk uploaded: ' + chunk);

        // Notify the server of the uploaded chunk
        self.notifyChunkUploaded(chunk);

        // And also trigger the chunk_uploaded callback
        self.settings.onChunkUploaded.call(self, chunk);

        // Cancel the xhr watcher interval
        clearInterval(self.intervals[chunk]);

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
          (0, _log2['default'])('Done');
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

      _amazonXhr.AmazonXHR.uploadChunk(self.auth, self.settings.key, self.uploadId, chunk, self.file.slice(start, end), {
        progressCallback: progressHandler,
        stateChangeCallback: handler,
        errorCallback: errorHandler,
        timeoutCallback: errorHandler
      }, function (xhr) {
        self.chunkXhr = self.chunkXhr || [];
        self.chunkXhr.push(xhr);

        // The watcher interval; it cancels the xhr if it times out
        self.intervals[chunk] = setInterval(function () {
          if (lastProgressTime && new Date() - lastProgressTime > 15 * _constants.SECONDS) {
            // 15s
            (0, _log2['default'])('Chunk Failed; retry');
            clearInterval(self.intervals[chunk]);
            if (self.getState() === 'processing') {
              xhr.abort();
              errorHandler.call(xhr);

              if (typeof self.chunkXhr[this._chunkXhr.indexOf(xhr)] !== 'undefined') {
                delete self.chunkXhr[this._chunkXhr.indexOf(xhr)];
              }
            }
          }
        }, 4 * _constants.SECONDS); // Every 4s
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

      var handler = function handler(e) {
        // I.e. if it's a 2XX response
        if (Math.floor(e.target.status / 100) === 2) {
          (0, _log2['default'])('Finished file.');
          self.setState('finished');
          self.settings.onProgress.call(self, self.file.size, self.file.size); // It's 100% done

          // Trigger the complete event callback
          self.settings.onComplete.call(self);
        } else if (e.target.status === 400 && e.target.responseText.indexOf('EntityTooSmall') !== -1) {
          // An "EntityTooSmall" error means that we missed a chunk
          _amazonXhr.AmazonXHR.list(self.auth, self.file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
            self.updateChunks(parts);
            var nextChunk = self.getNextChunk();
            self.setState('processing');
            self.uploadChunk(nextChunk);
          }, function () {});
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
                status: 200,
                responseXML: '',
                responseText: ''
              }
            });
          }, function () {
            handler({
              target: {
                status: 404,
                responseXML: '',
                responseText: ''
              }
            });
          });
        }
      };

      _amazonXhr.AmazonXHR.list(self.auth, self.file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
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

        _amazonXhr.AmazonXHR.finish(self.auth, self.settings.key, self.uploadId, parts, handler);
      }, function () {});
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
      var url = self.settings.ajaxBase + '/chunk_loaded/';

      var args = _Object$assign(self.settings.extraParams || {}, {
        chunk: chunk,
        key: key,
        uploadId: uploadId,
        filename: self.file.name,
        filesize: self.file.size,
        lastModified: self.file.lastModifiedDate.valueOf()
      });

      (0, _xhr2['default'])({
        url: url,
        headers: {},
        method: 'GET',
        extraParams: args
      });
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
        if (Math.ceil(e.target.status / 100) === 2) {
          (0, _log2['default'])('Already Uploaded');
          callback();
        } else {
          (0, _log2['default'])('Error!');
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

      var regionString = _utils2['default'].regionString(self.auth.region);
      var protocol = location.protocol;
      var bucket = self.auth.bucket;
      var host = 's3' + regionString + '.amazonaws.com';
      var url = protocol + '//' + host + '/' + bucket + '/' + path;
      (0, _xhr2['default'])({
        url: url,
        method: method,
        headers: {},
        loadCallback: innerHandler,
        errorCallback: errorCallback
      });
    }
  }, {
    key: 'cancel',
    value: function cancel(callback) {
      // Empty all fields, cancel all intervals, abort all xhr's
      this.chunkXhr.map(function (chunk) {
        (0, _log2['default'])('Abort chunk: ' + chunk);
        chunk.abort();
      });
      this.intervals = this._intervals || {};
      for (var _key in this.intervals) {
        if (this.intervals.hasOwnProperty(_key)) {
          clearInterval(this.intervals[_key]);
        }
      }
      callback = callback || function () {};
      this.setState('canceled');
      this.chunkXhr = this._chunkXhr || [];
      this.settings.onProgress.call(this, 0, 0);
      this.chunkXhr = [];
      this.chunks = [];
      this.uploadingChunks = null;
      this.loadedChunks = null;
      this.startFired = false;
      this.uploadId = null;
      this.progress = {};
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
      this.uploadingChunks = [];
      this.loadedChunks = [];

      parts.map(function (part) {
        var partNumber = parseInt(part[0], 10);
        _this.addLoadedChunk(partNumber - 1);
        _this.setChunkFinished(partNumber - 1);
        loaded.push(partNumber - 1);
      });

      for (var chunkNum = 0; chunkNum < numChunks; chunkNum++) {
        if (loaded.indexOf(chunkNum) === -1) {
          (0, _log2['default'])('Chunk not uploaded: ' + chunkNum);
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
      return this.state;
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this.state = state;
      return state;
    }
  }, {
    key: 'setProgress',
    value: function setProgress(chunk, loaded) {
      this.progress = this.progress || {};
      this.totalProgress = (this.totalProgress || 0) + loaded - (this.progress[chunk] || 0);
      this.progress[chunk] = loaded;
      this.settings.onChunkProgress.call(this, chunk, loaded, this.getChunkSize(chunk));
    }
  }, {
    key: 'getTotalProgress',
    value: function getTotalProgress() {
      return this.totalProgress || 0;
    }
  }, {
    key: 'isChunkLoaded',
    value: function isChunkLoaded(chunk) {
      this.loadedChunks = this.loadedChunks || [];
      return this.loadedChunks.indexOf(chunk) !== -1;
    }
  }, {
    key: 'addLoadedChunk',
    value: function addLoadedChunk(chunk) {
      this.loadedChunks = this.loadedChunks || [];
      this.loadedChunks.push(chunk);
      this.setProgress(chunk, this.getChunkSize(chunk));
    }
  }, {
    key: 'getChunkUploading',
    value: function getChunkUploading(chunk) {
      this.uploadingChunks = this.uploadingChunks || [];
      return this.uploadingChunks.indexOf(chunk) !== -1;
    }
  }, {
    key: 'setChunkUploading',
    value: function setChunkUploading(chunk) {
      var val = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      this.uploadingChunks = this.uploadingChunks || [];
      if (val) {
        this.uploadingChunks.push(chunk);
      } else {
        var idx = undefined;
        while (true) {
          idx = this.uploadingChunks.indexOf(chunk);
          if (idx === -1) {
            break;
          }
          this.uploadingChunks.splice(idx, 1);
        }
      }
    }
  }, {
    key: '_initChunks',
    value: function _initChunks() {
      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (!this.chunks || force) {
        this.chunks = [];
        var numChunks = Math.ceil(this.file.size / this.settings.chunkSize);
        for (var i = 0; i < numChunks; i++) {
          this.chunks.push(false);
        }
      }
    }
  }, {
    key: 'setChunkFinished',
    value: function setChunkFinished(chunk) {
      var val = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      this._initChunks();
      this.chunks[chunk] = !!val;
    }
  }, {
    key: 'getNextChunk',
    value: function getNextChunk() {
      var chunk = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      this._initChunks();
      if (chunk && !this.chunks[chunk] && !this.getChunkUploading(chunk)) {
        return chunk;
      }
      for (var i = 0; i < this.chunks.length; i++) {
        if (!this.chunks[i] && !this.getChunkUploading(i)) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: 'uploadFinished',
    value: function uploadFinished() {
      this._initChunks();
      for (var i = 0; i < this.chunks.length; i++) {
        if (!this.chunks[i] || this.getChunkUploading(i)) {
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
      this.settings.onProgress = f;
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

},{"./amazonXhr":61,"./constants":62,"./log":63,"./utils":65,"./xhr":66,"babel-runtime/core-js/object/assign":4,"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8,"babel-runtime/helpers/interop-require-default":9}],65:[function(require,module,exports){
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

},{"babel-runtime/helpers/class-call-check":7,"babel-runtime/helpers/create-class":8}],66:[function(require,module,exports){
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
  if (typeof args.extraParams === 'object') {
    for (var paramName in args.extraParams) {
      if (args.extraParams.hasOwnProperty(paramName)) {
        if (url.indexOf('?') !== -1) {
          url += '&';
        } else {
          url += '?';
        }

        url += encodeURIComponent(paramName) + '=';
        // keep the typechecker happy
        if (typeof args.extraParams === 'object') {
          url += encodeURIComponent(args.extraParams[paramName]);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvbXVsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZC10by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdXBwb3J0LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVuc2NvcGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2NvcmUuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1oZXguanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2htYWMtc2hhMjU2LmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9obWFjLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEyNTYuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvYW1hem9uWGhyLmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvc3JjL2NvbnN0YW50cy5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL3NyYy9sb2cuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvdXBsb2FkZXIuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvdXRpbHMuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMveGhyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt3QkNFcUIsWUFBWTs7OzttQkFDakIsT0FBTzs7OztBQUV2QixTQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUU7O0FBRTlCLE1BQUcsRUFBRSxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxJQUMvRCxPQUFPLElBQUksS0FBSyxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQ2hDLDBCQUFJLDJCQUEyQixDQUFDLENBQUM7QUFDakMsV0FBTyxDQUFDLENBQUMsQ0FBQztHQUNYOzs7O0FBSUQsTUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxRQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7R0FDbkQ7O0FBRUQsTUFBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQy9CLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pELFFBQUk7QUFDRixVQUFJLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDNUMsQ0FBQyxPQUFNLENBQUMsRUFBRTtBQUNULGFBQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDtHQUNGO0FBQ0Qsd0JBQUksSUFBSSxDQUFDLENBQUM7O0FBRVYsU0FBTywwQkFBYSxRQUFRLENBQUMsQ0FBQztDQUMvQjs7QUFFRCxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtBQUNoQyxRQUFNLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztDQUNwQzs7O0FDbkNEOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcnVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkNwTWdCLE9BQU87Ozs7cUJBQ0wsU0FBUzs7Ozs4QkFDUixrQkFB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QUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNaO0FBQ0QsU0FBTyxHQUFHLENBQUM7Q0FDWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgVXBsb2FkZXIgZnJvbSAnLi91cGxvYWRlcic7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nJztcblxuZnVuY3Rpb24gbXVsZVVwbG9hZGVyKHNldHRpbmdzKSB7XG4gIC8vIFZlcmlmeSB0aGF0IHRoZSBicm93c2VyIGhhcyB0aGUgbmVlZGVkIEhUTUw1IGNhcGFiaWxpdGllc1xuICBpZighKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRmlsZUxpc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgbG9nKCdIVE1MNSBBUElzIG5vdCBhdmFpbGFibGUuJyk7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLy8gRm9yIG5ldyB3ZWJraXQgYnJvd3NlcnMsIHRoZSAuc2xpY2UoKSBtZXRob2QgaXMgbmFtZWQgLndlYmtpdFNsaWNlKClcbiAgLy8gc2ltaWxhciBmb3IgbW96aWxsYVxuICBpZiAodHlwZW9mIEZpbGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBGaWxlLnByb3RvdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBGaWxlLnByb3RvdHlwZS5zbGljZSA9IEZpbGUucHJvdG90eXBlLndlYmtpdFNsaWNlIHx8XG4gICAgICBGaWxlLnByb3RvdHlwZS5tb3pTbGljZSB8fCBGaWxlLnByb3RvdHlwZS5zbGljZTtcbiAgfVxuXG4gIGlmKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSAhPT0gLTEpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGp1c3RDaGVja2luZyA9IG5ldyBCbG9iKFsnc29tZXRoaW5nJ10pO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxuICBsb2coJ09LJyk7XG5cbiAgcmV0dXJuIG5ldyBVcGxvYWRlcihzZXR0aW5ncyk7XG59XG5cbmlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5tdWxlVXBsb2FkZXIgPSBtdWxlVXBsb2FkZXI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaXNJdGVyYWJsZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGVcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IF9nZXRJdGVyYXRvcihhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKF9pc0l0ZXJhYmxlKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSkoKTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5hc3NpZ247IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmtleXM7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0Jyk7XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgYSA9IE9iamVjdC5hc3NpZ25cbiAgICAsIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gYSh7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cyhhKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICwgJCRsZW4gPSAkJC5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0S2V5cyAgICA9ICQuZ2V0S2V5c1xuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9sc1xuICAgICwgaXNFbnVtICAgICA9ICQuaXNFbnVtO1xuICB3aGlsZSgkJGxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdCgkJFtpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9XG4gIHJldHVybiBUO1xufSA6IE9iamVjdC5hc3NpZ247IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IChPID0gT2JqZWN0KGl0KSlbVEFHXSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMS4yLjQnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgY3R4ID0gZnVuY3Rpb24oZm4sIHRoYXQpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG52YXIgJGRlZiA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgaWYoaXNHbG9iYWwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICEodHlwZSAmICRkZWYuRikgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBpZihpc0dsb2JhbCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJylleHAgPSBzb3VyY2Vba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuQiAmJiBvd24pZXhwID0gY3R4KG91dCwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xuICAgICAgZXhwID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBleHBbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICB9KG91dCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydFxuICAgIGV4cG9ydHNba2V5XSA9IGV4cDtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZGVmLkYgPSAxOyAgLy8gZm9yY2VkXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXG4kZGVmLlMgPSA0OyAgLy8gc3RhdGljXG4kZGVmLlAgPSA4OyAgLy8gcHJvdG9cbiRkZWYuQiA9IDE2OyAvLyBiaW5kXG4kZGVmLlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZGVmOyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUYWcgICAgID0gcmVxdWlyZSgnLi8kLnRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gJC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCAkZGVmICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkcmVkZWYgICAgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGhpZGUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKVxuICAsIHNldFRhZyAgICAgICAgICA9IHJlcXVpcmUoJy4vJC50YWcnKVxuICAsIGdldFByb3RvICAgICAgICA9IHJlcXVpcmUoJy4vJCcpLmdldFByb3RvXG4gICwgQlVHR1kgICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICAgPSAndmFsdWVzJztcbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIHByb3RvICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsIF9uYXRpdmUgID0gcHJvdG9bU1lNQk9MX0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgX2RlZmF1bHQgPSBfbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgbWV0aG9kcywga2V5O1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKF9uYXRpdmUpe1xuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvKF9kZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgc2V0VGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgIC8vIEZGIGZpeFxuICAgIGlmKCFMSUJSQVJZICYmIGhhcyhwcm90bywgRkZfSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIFNZTUJPTF9JVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRSkgJiYgKEJVR0dZIHx8ICEoU1lNQk9MX0lURVJBVE9SIGluIHByb3RvKSkpe1xuICAgIGhpZGUocHJvdG8sIFNZTUJPTF9JVEVSQVRPUiwgX2RlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZBVUxUID09IFZBTFVFUyA/IF9kZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqIEJVR0dZLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59OyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTsiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGNvcmUgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGZhaWxzID0gcmVxdWlyZSgnLi8kLmZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICAgLCBmbiAgID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRkZWYoJGRlZi5TICsgJGRlZi5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmhpZGUnKTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCIvLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGxcbiAgICAgIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBkZWYgPSByZXF1aXJlKCcuLyQnKS5zZXREZXNjXG4gICwgaGFzID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gSVRFUkFUT1IgaW4gT1xuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgc2V0VW5zY29wZSA9IHJlcXVpcmUoJy4vJC51bnNjb3BlJylcbiAgLCBzdGVwICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnNldFVuc2NvcGUoJ2tleXMnKTtcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xuc2V0VW5zY29wZSgnZW50cmllcycpOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMgKyAkZGVmLkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTsiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCRrZXlzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gSXRlcmF0b3JzLkFycmF5OyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblx0ICAgIC8qKlxuXHQgICAgICogQ3J5cHRvSlMgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExpYnJhcnkgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYiA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2Ugb2JqZWN0IGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2UgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICBGLnByb3RvdHlwZSA9IHRoaXM7XG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSA9IHRoYXRXb3Jkc1tpID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAobV93KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV93ID0gbV93O1xuXHQgICAgICAgICAgICAgICAgdmFyIG1feiA9IDB4M2FkZTY4YjE7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFzayA9IDB4ZmZmZmZmZmY7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbV96ID0gKDB4OTA2OSAqIChtX3ogJiAweEZGRkYpICsgKG1feiA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIG1fdyA9ICgweDQ2NTAgKiAobV93ICYgMHhGRkZGKSArIChtX3cgPj4gMHgxMCkpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gKChtX3ogPDwgMHgxMCkgKyBtX3cpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgLz0gMHgxMDAwMDAwMDA7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDAuNTtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICogKE1hdGgucmFuZG9tKCkgPiAuNSA/IDEgOiAtMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByY2FjaGU7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIF9yID0gcigocmNhY2hlIHx8IE1hdGgucmFuZG9tKCkpICogMHgxMDAwMDAwMDApO1xuXG5cdCAgICAgICAgICAgICAgICByY2FjaGUgPSBfcigpICogMHgzYWRlNjdiNztcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goKF9yKCkgKiAweDEwMDAwMDAwMCkgfCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuSGV4O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTI1NlwiKSwgcmVxdWlyZShcIi4vaG1hY1wiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9zaGEyNTZcIiwgXCIuL2htYWNcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5IbWFjU0hBMjU2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmODtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8qKlxuXHQgICAgICogSE1BQyBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBITUFDID0gQ19hbGdvLkhNQUMgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIEhNQUMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBobWFjSGFzaGVyID0gQ3J5cHRvSlMuYWxnby5ITUFDLmNyZWF0ZShDcnlwdG9KUy5hbGdvLlNIQTI1Niwga2V5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoaGFzaGVyLCBrZXkpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdCBoYXNoZXJcblx0ICAgICAgICAgICAgaGFzaGVyID0gdGhpcy5faGFzaGVyID0gbmV3IGhhc2hlci5pbml0KCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gVXRmOC5wYXJzZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemUgPSBoYXNoZXIuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgaGFzaGVyQmxvY2tTaXplQnl0ZXMgPSBoYXNoZXJCbG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEFsbG93IGFyYml0cmFyeSBsZW5ndGgga2V5c1xuXHQgICAgICAgICAgICBpZiAoa2V5LnNpZ0J5dGVzID4gaGFzaGVyQmxvY2tTaXplQnl0ZXMpIHtcblx0ICAgICAgICAgICAgICAgIGtleSA9IGhhc2hlci5maW5hbGl6ZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAga2V5LmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUga2V5IGZvciBpbm5lciBhbmQgb3V0ZXIgcGFkc1xuXHQgICAgICAgICAgICB2YXIgb0tleSA9IHRoaXMuX29LZXkgPSBrZXkuY2xvbmUoKTtcblx0ICAgICAgICAgICAgdmFyIGlLZXkgPSB0aGlzLl9pS2V5ID0ga2V5LmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5V29yZHMgPSBvS2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaUtleVdvcmRzID0gaUtleS53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBYT1Iga2V5cyB3aXRoIHBhZCBjb25zdGFudHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYXNoZXJCbG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgb0tleVdvcmRzW2ldIF49IDB4NWM1YzVjNWM7XG5cdCAgICAgICAgICAgICAgICBpS2V5V29yZHNbaV0gXj0gMHgzNjM2MzYzNjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBvS2V5LnNpZ0J5dGVzID0gaUtleS5zaWdCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZUJ5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIEhNQUMgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIFJlc2V0XG5cdCAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAgICBoYXNoZXIudXBkYXRlKHRoaXMuX2lLZXkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgSE1BQyB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtITUFDfSBUaGlzIEhNQUMgaW5zdGFuY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoZXIudXBkYXRlKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBITUFDIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhhc2hlciA9IHRoaXMuX2hhc2hlcjtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIEhNQUNcblx0ICAgICAgICAgICAgdmFyIGlubmVySGFzaCA9IGhhc2hlci5maW5hbGl6ZShtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIHZhciBobWFjID0gaGFzaGVyLmZpbmFsaXplKHRoaXMuX29LZXkuY2xvbmUoKS5jb25jYXQoaW5uZXJIYXNoKSk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhtYWM7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gSW5pdGlhbGl6YXRpb24gYW5kIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBIID0gW107XG5cdCAgICB2YXIgSyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcblx0ICAgICAgICAgICAgdmFyIHNxcnROID0gTWF0aC5zcXJ0KG4pO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIShuICUgZmFjdG9yKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgbiA9IDI7XG5cdCAgICAgICAgdmFyIG5QcmltZSA9IDA7XG5cdCAgICAgICAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG5cdCAgICAgICAgICAgIGlmIChpc1ByaW1lKG4pKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoblByaW1lIDwgOCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEhbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAyKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpO1xuXG5cdCAgICAgICAgICAgICAgICBuUHJpbWUrKztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIG4rKztcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3Rcblx0ICAgIHZhciBXID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTI1NiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTI1NiA9IENfYWxnby5TSEEyNTYgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KEguc2xpY2UoMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIGUgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgZiA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBnID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIGggPSBIWzddO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCA9IFdbaSAtIDJdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWogPSAoYSAmIGIpIF4gKGEgJiBjKSBeIChiICYgYyk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cblx0ICAgICAgICAgICAgICAgIGggPSBnO1xuXHQgICAgICAgICAgICAgICAgZyA9IGY7XG5cdCAgICAgICAgICAgICAgICBmID0gZTtcblx0ICAgICAgICAgICAgICAgIGUgPSAoZCArIHQxKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBkID0gYztcblx0ICAgICAgICAgICAgICAgIGMgPSBiO1xuXHQgICAgICAgICAgICAgICAgYiA9IGE7XG5cdCAgICAgICAgICAgICAgICBhID0gKHQxICsgdDIpIHwgMDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICAgICAgSFs0XSA9IChIWzRdICsgZSkgfCAwO1xuXHQgICAgICAgICAgICBIWzVdID0gKEhbNV0gKyBmKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNl0gPSAoSFs2XSArIGcpIHwgMDtcblx0ICAgICAgICAgICAgSFs3XSA9IChIWzddICsgaCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1Nih3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTI1NiA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFNIQTI1Nik7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMjU2KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTI1NiA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihTSEEyNTYpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyNTY7XG5cbn0pKTsiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgWEhSIGZyb20gJy4veGhyJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBTSEEyNTYgZnJvbSAnY3J5cHRvLWpzL3NoYTI1Nic7XG5pbXBvcnQgSG1hY1NIQTI1NiBmcm9tICdjcnlwdG8tanMvaG1hYy1zaGEyNTYnO1xuaW1wb3J0IEhleCBmcm9tICdjcnlwdG8tanMvZW5jLWhleCc7XG5cbnR5cGUgQW1hem9uWEhSU2V0dGluZ3MgPSB7XG4gIGF1dGg6IGFueTtcbiAgaGVhZGVyczogYW55O1xuICBxdWVyeXN0cmluZzogYW55O1xuICBrZXk6ID9zdHJpbmc7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXlsb2FkOiBhbnk7XG4gIGxvYWRDYWxsYmFjazogKGV2ZW50OiBYSFJFdmVudCkgPT4gdm9pZDtcbiAgcHJvZ3Jlc3NDYWxsYmFjazogKCkgPT4gdm9pZDtcbiAgc3RhdGVDaGFuZ2VDYWxsYmFjazogKCkgPT4gdm9pZDtcbiAgZXJyb3JDYWxsYmFjazogKCkgPT4gdm9pZDtcbiAgdGltZW91dENhbGxiYWNrOiAoKSA9PiB2b2lkO1xufTtcblxudHlwZSBTZW5kQ2FsbGJhY2sgPSAoKCkgPT4gdm9pZCk7XG5cbmV4cG9ydCB0eXBlIFhIUkV2ZW50ID0ge1xuICB0YXJnZXQ6IHtcbiAgICBzdGF0dXM6IG51bWJlcjtcbiAgICByZXNwb25zZVhNTDogYW55O1xuICAgIHJlc3BvbnNlVGV4dDogc3RyaW5nO1xuICB9O1xufTtcblxuZXhwb3J0IGNsYXNzIEFtYXpvblhIUiB7XG4gIHNldHRpbmdzOiBBbWF6b25YSFJTZXR0aW5ncztcbiAgcmVxdWVzdERhdGU6IERhdGU7XG4gIGhlYWRlcnM6IE9iamVjdDtcbiAgeGhyOiA/WEhSO1xuXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzOiBBbWF6b25YSFJTZXR0aW5ncykge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgfTtcblxuICBzZW5kKGNhbGxiYWNrOiA/U2VuZENhbGxiYWNrKTogQW1hem9uWEhSIHtcbiAgICB0aGlzLnJlcXVlc3REYXRlID0gbmV3IERhdGUoKTtcblxuICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuc2V0dGluZ3MuaGVhZGVycztcblxuICAgIGNvbnN0IGJ1Y2tldCA9IHRoaXMuc2V0dGluZ3MuYXV0aC5idWNrZXQ7XG4gICAgY29uc3QgcmVnaW9uU3RyaW5nID0gdXRpbHMucmVnaW9uU3RyaW5nKHRoaXMuc2V0dGluZ3MuYXV0aC5yZWdpb24pO1xuICAgIHRoaXMuaGVhZGVycy5ob3N0ID0gYCR7YnVja2V0fS5zMyR7cmVnaW9uU3RyaW5nfS5hbWF6b25hd3MuY29tYDtcblxuICAgIGNvbnN0IGRhdGUgPSB0aGlzLnNldHRpbmdzLmF1dGguZGF0ZTtcbiAgICB2YXIgZGF0ZVN0cmluZyA9IFtcbiAgICAgIGRhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgIHV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIDIpLFxuICAgICAgdXRpbHMuemZpbGwoZGF0ZS5nZXRVVENEYXRlKCksIDIpLFxuICAgIF0uam9pbignJyk7XG5cbiAgICBjb25zdCBlbmNvZGVkRGF0ZSA9IHV0aWxzLnVyaWVuY29kZSh1dGlscy5pc284NjAxKHRoaXMucmVxdWVzdERhdGUpKTtcbiAgICBsZXQgcXVlcnlzdHJpbmcgPSB0aGlzLnNldHRpbmdzLnF1ZXJ5c3RyaW5nO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1EYXRlJ10gPSBlbmNvZGVkRGF0ZTtcbiAgICBxdWVyeXN0cmluZ1snWC1BbXotQWxnb3JpdGhtJ10gPSAnQVdTNC1ITUFDLVNIQTI1Nic7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LUV4cGlyZXMnXSA9ICA4NjQwMDsgLy8gT25lIGRheVxuXG4gICAgY29uc3QgYWNjZXNzS2V5ID0gdGhpcy5zZXR0aW5ncy5hdXRoLmFjY2Vzc0tleTtcbiAgICBjb25zdCByZWdpb24gPSB0aGlzLnNldHRpbmdzLmF1dGgucmVnaW9uO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1DcmVkZW50aWFsJ10gPSB1dGlscy51cmllbmNvZGUoXG4gICAgICBgJHthY2Nlc3NLZXl9LyR7ZGF0ZVN0cmluZ30vJHtyZWdpb259L3MzL2F3czRfcmVxdWVzdGBcbiAgICApO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1TaWduZWRIZWFkZXJzJ10gPSAnJztcblxuICAgIGxldCBoZWFkZXJLZXlzID0gT2JqZWN0LmtleXModGhpcy5oZWFkZXJzKTtcblxuICAgIGhlYWRlcktleXMuc29ydCgpO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1TaWduZWRIZWFkZXJzJ10gPSB1dGlscy51cmllbmNvZGUoXG4gICAgICBoZWFkZXJLZXlzLmpvaW4oJzsnKVxuICAgICk7XG5cbiAgICBxdWVyeXN0cmluZ1snWC1BbXotU2lnbmF0dXJlJ10gPSB0aGlzLmdldEF1dGhvcml6YXRpb25IZWFkZXIoKTtcblxuICAgIHZhciB1cmwgPSBgJHtsb2NhdGlvbi5wcm90b2NvbH0vLyR7dGhpcy5oZWFkZXJzLmhvc3R9LyR7dGhpcy5zZXR0aW5ncy5rZXl9YDtcbiAgICBkZWxldGUgdGhpcy5oZWFkZXJzLmhvc3Q7ICAvLyBrZWVwIHRoaXMgaGVhZGVyIG9ubHkgZm9yIGhhc2hpbmdcblxuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgT2JqZWN0LmtleXMocXVlcnlzdHJpbmcpLm1hcChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeXN0cmluZ1trZXldO1xuICAgICAgaWYoZmlyc3QpIHtcbiAgICAgICAgdXJsICs9ICc/JztcbiAgICAgIH1cbiAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICB1cmwgKz0gYCR7a2V5fT0ke3ZhbHVlfSZgO1xuICAgIH0pO1xuICAgIHVybCA9IHVybC5zbGljZSgwLCAtMSk7ICAvLyByZW1vdmUgZXh0cmEgYW1wZXJzYW5kXG5cbiAgICB0aGlzLnhociA9IFhIUih7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIG1ldGhvZDogdGhpcy5zZXR0aW5ncy5tZXRob2QsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiB0aGlzLnNldHRpbmdzLnBheWxvYWQsXG5cbiAgICAgIGxvYWRDYWxsYmFjazogdGhpcy5zZXR0aW5ncy5sb2FkQ2FsbGJhY2ssXG4gICAgICBwcm9ncmVzc0NhbGxiYWNrOiB0aGlzLnNldHRpbmdzLnByb2dyZXNzQ2FsbGJhY2ssXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiB0aGlzLnNldHRpbmdzLnN0YXRlQ2hhbmdlQ2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrOiB0aGlzLnNldHRpbmdzLmVycm9yQ2FsbGJhY2ssXG4gICAgICB0aW1lb3V0Q2FsbGJhY2s6IHRoaXMuc2V0dGluZ3MudGltZW91dENhbGxiYWNrLFxuICAgIH0pO1xuICAgIGlmKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayh0aGlzLnhocik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRBdXRob3JpemF0aW9uSGVhZGVyKCk6IHN0cmluZyB7XG4gICAgbGV0IGhlYWRlciA9ICcnO1xuXG4gICAgY29uc3QgaGVhZGVyS2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuaGVhZGVycykuc29ydCgpO1xuXG4gICAgY29uc3Qgc2lnbmVkS2V5cyA9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgcmV0dXJuIGFjYyArICc7JyArIHZhbDtcbiAgICB9KTtcblxuICAgIGxldCBjYW5vbmljYWxSZXF1ZXN0ID0gdGhpcy5nZXRDYW5vbmljYWxSZXF1ZXN0KCk7XG4gICAgbGV0IHN0cmluZ1RvU2lnbiA9IHRoaXMuZ2V0U3RyaW5nVG9TaWduKGNhbm9uaWNhbFJlcXVlc3QsIHRoaXMucmVxdWVzdERhdGUpO1xuICAgIGxldCBzaWduYXR1cmUgPSB0aGlzLnNpZ25SZXF1ZXN0KHN0cmluZ1RvU2lnbik7XG5cbiAgICByZXR1cm4gc2lnbmF0dXJlO1xuICB9XG5cbiAgZ2V0Q2Fub25pY2FsUmVxdWVzdCgpOiBzdHJpbmcge1xuICAgIGxldCByZXF1ZXN0ID0gYFxuICAgICAgJHt0aGlzLnNldHRpbmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpfVxuICAgICAgLyR7dXRpbHMudXJpZW5jb2RlKHRoaXMuc2V0dGluZ3Mua2V5KS5yZXBsYWNlKC8lMkYvZywgJy8nKX1cbiAgICBgO1xuICAgIHJlcXVlc3QgPSByZXF1ZXN0LnRyaW0oKS5yZXBsYWNlKC9eXFxzKy9nbSwgJycpICsgJ1xcbic7XG5cbiAgICAvLyBxdWVyeXN0cmluZ1xuICAgIHJlcXVlc3QgKz0gT2JqZWN0LmtleXMoXG4gICAgICB0aGlzLnNldHRpbmdzLnF1ZXJ5c3RyaW5nXG4gICAgKS5zb3J0KCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnNldHRpbmdzLnF1ZXJ5c3RyaW5nW2tleV07XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY30mYW1wOyR7dXRpbHMudXJpZW5jb2RlKGtleSl9PSR7dmFsdWV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHt1dGlscy51cmllbmNvZGUoa2V5KX09JHt2YWx1ZX1gO1xuICAgICAgfVxuICAgIH0sICcnKTtcbiAgICByZXF1ZXN0ICs9ICdcXG4nO1xuXG4gICAgLy8gaGVhZGVyc1xuICAgIGNvbnN0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpLnNvcnQoKTtcbiAgICByZXF1ZXN0ICs9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmhlYWRlcnNba2V5XTtcbiAgICAgIGlmKGFjYykge1xuICAgICAgICByZXR1cm4gYCR7YWNjfVxcbiR7a2V5LnRvTG93ZXJDYXNlKCl9OiR7dmFsdWUudHJpbSgpfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYCR7a2V5LnRvTG93ZXJDYXNlKCl9OiR7dmFsdWUudHJpbSgpfWA7XG4gICAgICB9XG4gICAgfSwgJycpO1xuICAgIHJlcXVlc3QgKz0gJ1xcblxcbic7XG5cbiAgICAvLyBzaWduZWQgaGVhZGVyc1xuICAgIHJlcXVlc3QgKz0gaGVhZGVyS2V5cy5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY307JHt2YWwudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgIH0sICcnKTtcblxuICAgIHJlcXVlc3QgKz0gJ1xcbic7XG5cbiAgICByZXF1ZXN0ICs9ICdVTlNJR05FRC1QQVlMT0FEJztcblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgZ2V0U3RyaW5nVG9TaWduKGNhbm9uaWNhbFJlcXVlc3Q6IHN0cmluZywgdGltZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICAgIEFXUzQtSE1BQy1TSEEyNTZcbiAgICAgICR7dXRpbHMuaXNvODYwMSh0aW1lKX1cbiAgICAgICR7XG4gICAgICAgIFtcbiAgICAgICAgICB0aW1lLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgdXRpbHMuemZpbGwodGltZS5nZXRVVENNb250aCgpICsgMSwgMiksXG4gICAgICAgICAgdXRpbHMuemZpbGwodGltZS5nZXRVVENEYXRlKCksIDIpLFxuICAgICAgICAgICcvJyArIHRoaXMuc2V0dGluZ3MuYXV0aC5yZWdpb24gKyAnL3MzL2F3czRfcmVxdWVzdFxcbicsXG4gICAgICAgIF0uam9pbignJylcbiAgICAgIH1cbiAgICAgICR7U0hBMjU2KGNhbm9uaWNhbFJlcXVlc3QucmVwbGFjZSgvJmFtcDsvZywgJyYnKSkudG9TdHJpbmcoKX1cbiAgICBgLnRyaW0oKS5yZXBsYWNlKC9eXFxzKy9nbSwgJycpO1xuICB9XG5cbiAgc2lnblJlcXVlc3Qoc3RyaW5nVG9TaWduOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciByZXMgPSBIbWFjU0hBMjU2KFxuICAgICAgc3RyaW5nVG9TaWduLFxuICAgICAgSGV4LnBhcnNlKHRoaXMuc2V0dGluZ3MuYXV0aC5zaWduYXR1cmUpXG4gICAgKS50b1N0cmluZygpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvLyBzdGF0aWNcbiAgc3RhdGljIGluaXQoYXV0aCwga2V5LCBmaWxlLCBjYWxsYmFjayk6IFhIUiB7XG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIGtleToga2V5LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBxdWVyeXN0cmluZzoge1xuICAgICAgICB1cGxvYWRzOiAnJyxcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICd4LWFtei1hY2wnOiAncHVibGljLXJlYWQnLFxuICAgICAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6IGBhdHRhY2htZW50OyBmaWxlbmFtZT0ke2ZpbGUubmFtZX1gLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogYXV0aC5jb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAgIH0sXG4gICAgICBwYXlsb2FkOiAnJyxcbiAgICAgIGxvYWRDYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2s6ICgpID0+IHt9LFxuICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICB0aW1lb3V0Q2FsbGJhY2s6ICgpID0+IHt9LFxuICAgIH0pLnNlbmQoKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGxvYWRDaHVuayhhdXRoLCBrZXksIHVwbG9hZElkLCBjaHVua051bSxcbiAgICAgICAgICAgICAgICAgICAgIGNodW5rLCBjYWxsYmFja3MsIHhockNhbGxiYWNrKSB7XG4gICAgbGV0IGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBwcm9ncmVzc0NhbGxiYWNrLCByZWFkeXN0YXRlQ2FsbGJhY2s7XG4gICAgaWYoY2FsbGJhY2tzIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjYWxsYmFjayA9IGNhbGxiYWNrcy5sb2FkQ2FsbGJhY2s7XG4gICAgICBlcnJvckNhbGxiYWNrID0gY2FsbGJhY2tzLmVycm9yQ2FsbGJhY2s7XG4gICAgICBwcm9ncmVzc0NhbGxiYWNrID0gY2FsbGJhY2tzLnByb2dyZXNzQ2FsbGJhY2s7XG4gICAgICByZWFkeXN0YXRlQ2FsbGJhY2sgPSBjYWxsYmFja3Muc3RhdGVDaGFuZ2VDYWxsYmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sgPSBjYWxsYmFja3M7XG4gICAgICBlcnJvckNhbGxiYWNrID0gKCkgPT4ge307XG4gICAgICBwcm9ncmVzc0NhbGxiYWNrID0gKCkgPT4ge307XG4gICAgICByZWFkeXN0YXRlQ2FsbGJhY2sgPSAoKSA9PiB7fTtcbiAgICB9XG4gICAgdmFyIHF1ZXJ5c3RyaW5nID0ge1xuICAgICAgcGFydE51bWJlcjogY2h1bmtOdW0gKyAxLFxuICAgICAgdXBsb2FkSWQsXG4gICAgfTtcbiAgICByZXR1cm4gKG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIGtleToga2V5LFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nOiBxdWVyeXN0cmluZyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgcGF5bG9hZDogY2h1bmssXG4gICAgICBsb2FkQ2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFjazogZXJyb3JDYWxsYmFjayxcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2s6IHByb2dyZXNzQ2FsbGJhY2ssXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiByZWFkeXN0YXRlQ2FsbGJhY2ssXG4gICAgICB0aW1lb3V0Q2FsbGJhY2s6ICgpID0+IHt9LFxuICAgIH0pKS5zZW5kKHhockNhbGxiYWNrKTtcbiAgfVxuXG4gIHN0YXRpYyBsaXN0KGF1dGgsIGZpbGU6IEZpbGUsIGtleTogc3RyaW5nLCB1cGxvYWRJZCwgY2h1bmtTaXplLCBjYWxsYmFjayxcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjazogKCkgPT4gdm9pZCwgbWFya2VyKSB7XG4gICAgdmFyIHF1ZXJ5c3RyaW5nOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICAgdXBsb2FkSWQsXG4gICAgfTtcbiAgICBpZihtYXJrZXIpIHtcbiAgICAgIHF1ZXJ5c3RyaW5nWydwYXJ0LW51bWJlcuKAiy1tYXJrZXInXSA9IG1hcmtlcjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aCxcbiAgICAgIGtleSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxdWVyeXN0cmluZyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgcGF5bG9hZDogJycsXG4gICAgICBlcnJvckNhbGxiYWNrLFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHRpbWVvdXRDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBsb2FkQ2FsbGJhY2s6IGZ1bmN0aW9uKGU6IFhIUkV2ZW50KSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgLy8gSS5lLiB0aGUgZmlsZSB3YXMgYWxyZWFkeSB1cGxvYWRlZDsgc3RhcnQgZnJlc2hcbiAgICAgICAgICBpZihlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb2Nlc3MgdGhlIHBhcnRzLCBhbmQgcmV0dXJuIGFuIGFycmF5IG9mXG4gICAgICAgIC8vIFtwYXJ0X251bWJlciwgZXRhZywgc2l6ZV0gdGhyb3VnaCB0aGUgZ2l2ZW4gY2FsbGJhY2tcbiAgICAgICAgdmFyIHhtbCA9IGUudGFyZ2V0LnJlc3BvbnNlWE1MO1xuICAgICAgICB2YXIgcGFydHMgPSBbXTtcbiAgICAgICAgdmFyIHhtbFBhcnRzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdQYXJ0Jyk7XG4gICAgICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwoZmlsZS5zaXplIC8gY2h1bmtTaXplKTtcbiAgICAgICAgbGV0IHRhZ0NvbnRlbnQgPSBmdW5jdGlvbih0YWcsIHByb3ApOiBzdHJpbmcge1xuICAgICAgICAgIHJldHVybiB0YWcuZ2V0RWxlbWVudHNCeVRhZ05hbWUocHJvcClbMF0udGV4dENvbnRlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB4bWxQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwYXJ0TnVtYmVyID0gcGFyc2VJbnQoXG4gICAgICAgICAgICB0YWdDb250ZW50KHhtbFBhcnRzW2ldLCAnUGFydE51bWJlcicpLCAxMFxuICAgICAgICAgICk7XG4gICAgICAgICAgdmFyIGV0YWcgPSB0YWdDb250ZW50KHhtbFBhcnRzW2ldLCAnRVRhZycpO1xuICAgICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQoXG4gICAgICAgICAgICB0YWdDb250ZW50KHhtbFBhcnRzW2ldLCAnU2l6ZScpLCAxMFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZihwYXJ0TnVtYmVyICE9PSBudW1DaHVua3MgJiYgc2l6ZSAhPT0gY2h1bmtTaXplKSB7XG4gICAgICAgICAgICBjb250aW51ZTsgLy8gQ2h1bmsgY29ycnVwdGVkXG4gICAgICAgICAgfSBlbHNlIGlmKHBhcnROdW1iZXIgPT09IG51bUNodW5rcyAmJlxuICAgICAgICAgICAgICBzaXplICE9PSBmaWxlLnNpemUgJSBjaHVua1NpemUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBGaW5hbCBjaHVuayBjb3JydXB0ZWRcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJ0cy5wdXNoKFtcbiAgICAgICAgICAgIHBhcnROdW1iZXIsXG4gICAgICAgICAgICBldGFnLFxuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNUcnVuY2F0ZWQgPSB0YWdDb250ZW50KHhtbCwgJ0lzVHJ1bmNhdGVkJyk7XG4gICAgICAgIGlmKGlzVHJ1bmNhdGVkLnRvU3RyaW5nKCkgPT09ICd0cnVlJykge1xuICAgICAgICAgIHZhciBwYXJ0TWFya2VyID0gdGFnQ29udGVudCh4bWwsICdOZXh0UGFydE51bWJlck1hcmtlcicpO1xuICAgICAgICAgIEFtYXpvblhIUi5saXN0KFxuICAgICAgICAgICAgYXV0aCxcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB1cGxvYWRJZCxcbiAgICAgICAgICAgIGNodW5rU2l6ZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKG5ld1BhcnRzKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHBhcnRzLmNvbmNhdChuZXdQYXJ0cykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2ssXG4gICAgICAgICAgICBwYXJ0TWFya2VyXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayhwYXJ0cyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSkuc2VuZCgpO1xuICB9XG5cbiAgc3RhdGljIGZpbmlzaChhdXRoLCBrZXksIHVwbG9hZElkLCBwYXJ0cywgY2FsbGJhY2spIHtcbiAgICB2YXIgcXVlcnlzdHJpbmcgPSB7IHVwbG9hZElkIH07XG5cbiAgICAvLyBjb21wb3NlIHRoZSBDb21wbGV0ZU11bHRpcGFydFVwbG9hZCByZXF1ZXN0IGZvciBwdXR0aW5nXG4gICAgLy8gdGhlIGNodW5rcyB0b2dldGhlclxuICAgIHZhciBkYXRhU3RyaW5nOiBzdHJpbmcgPSAnPENvbXBsZXRlTXVsdGlwYXJ0VXBsb2FkPic7XG5cbiAgICBwYXJ0cy5tYXAoKFtudW1iZXIsIGV0YWddKSA9PiB7XG4gICAgICBkYXRhU3RyaW5nICs9IGBcbiAgICAgICAgPFBhcnQ+XG4gICAgICAgIDxQYXJ0TnVtYmVyPiR7bnVtYmVyfTwvUGFydE51bWJlcj5cbiAgICAgICAgPEVUYWc+JHtldGFnfTwvRVRhZz5cbiAgICAgICAgPC9QYXJ0PlxuICAgICAgYC50cmltKCk7XG4gICAgfSk7XG4gICAgZGF0YVN0cmluZyArPSAnPC9Db21wbGV0ZU11bHRpcGFydFVwbG9hZD4nO1xuXG4gICAgdmFyIGRhdGE6IHN0cmluZyB8IEJsb2IgPSBkYXRhU3RyaW5nO1xuICAgIC8vIGZpcmVmb3ggcmVxdWlyZXMgYSBzbWFsbCBoYWNrXG4gICAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvciAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSAhPT0gLTEpIHtcbiAgICAgIGRhdGEgPSBuZXcgQmxvYihbZGF0YV0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQW1hem9uWEhSKHtcbiAgICAgIGF1dGgsXG4gICAgICBrZXksXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBwYXlsb2FkOiBkYXRhLFxuICAgICAgbG9hZENhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2s6ICgpID0+IHt9LFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHRpbWVvdXRDYWxsYmFjazogKCkgPT4ge30sXG4gICAgfSkuc2VuZCgpO1xuICB9XG59XG4iLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgY29uc3QgS0IgPSAxMDI0O1xuZXhwb3J0IGNvbnN0IE1CID0gMTAyNCAqIEtCO1xuZXhwb3J0IGNvbnN0IEdCID0gMTAyNCAqIE1CO1xuZXhwb3J0IGNvbnN0IFNFQ09ORFMgPSAxMDAwOyAvLyAxMDAwbXNcbmV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBERUJVRyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIGlmKCEoREVCVUcgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY29uc29sZS5sb2cgIT09ICd1bmRlZmluZWQnKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhcmdzID0gWydbTXVsZVVwbG9hZGVyXSddO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIH1cbiAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufVxuIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IFhIUiBmcm9tICcuL3hocic7XG5pbXBvcnQgeyBBbWF6b25YSFIsIFhIUkV2ZW50IH0gZnJvbSAnLi9hbWF6b25YaHInO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBLQiwgTUIsIEdCLCBTRUNPTkRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG50eXBlIFVwbG9hZGVyU2V0dGluZ3MgPSB7XG4gIGZpbGVJbnB1dDogYW55O1xuICBmaWxlOiBhbnk7XG4gIGF1dG9zdGFydDogYW55O1xuICBjaHVua1NpemU6IG51bWJlcjtcbiAgbWF4U2l6ZTogbnVtYmVyO1xuICBudW1Xb3JrZXJzOiBudW1iZXI7XG4gIGtleTogc3RyaW5nO1xuICBiYWNrdXBLZXk6IHN0cmluZztcbiAgYnVja2V0OiBzdHJpbmc7XG4gIGFjY2Vzc0tleTogc3RyaW5nO1xuICBjb250ZW50VHlwZTogc3RyaW5nO1xuICBhY2w6IHN0cmluZztcbiAgb25Qcm9ncmVzczogKCkgPT4gdm9pZDtcbiAgb25DaHVua1Byb2dyZXNzOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdDogKCkgPT4gdm9pZDtcbiAgb25FcnJvcjogKCkgPT4gdm9pZDtcbiAgb25Db21wbGV0ZTogKCkgPT4gdm9pZDtcbiAgb25Jbml0OiAoKSA9PiB2b2lkO1xuICBvblN0YXJ0OiAoKSA9PiB2b2lkO1xuICBvbkNodW5rVXBsb2FkZWQ6ICgpID0+IHZvaWQ7XG4gIGFqYXhCYXNlOiBzdHJpbmc7XG4gIGFjY2VwdGVkRXh0ZW5zaW9uczogc3RyaW5nO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkZXIge1xuICBpbnB1dDogYW55O1xuICBmaWxlOiBhbnk7XG4gIHNldHRpbmdzOiBVcGxvYWRlclNldHRpbmdzO1xuICBhdXRoOiBhbnk7XG4gIHVwbG9hZElkOiBhbnk7XG4gIGNodW5rczogQXJyYXk8Ym9vbGVhbj47XG4gIGxvYWRlZENodW5rczogQXJyYXk8TnVtYmVyPjtcbiAgcHJvZ3Jlc3M6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH07XG4gIHRvdGFsUHJvZ3Jlc3M6IG51bWJlcjtcbiAgbG9hZGVkQ2h1bmtzOiBhbnk7XG4gIHVwbG9hZGluZ0NodW5rczogYW55O1xuICBzdGFydEZpcmVkOiBib29sZWFuO1xuICBpbnRlcnZhbHM6IGFueTtcbiAgY2h1bmtYaHI6IEFycmF5PFhNTEh0dHBSZXF1ZXN0PjtcbiAgc3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogVXBsb2FkZXJTZXR0aW5ncykge1xuICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgIHNldHRpbmdzID0gc2V0dGluZ3MgfHwge307XG5cbiAgICAvLyBNYWtlIHRoZSBpbnB1dCBlbGVtZW50IGFub3RoZXIgcG9zc2libGUgc2V0dGluZ1xuICAgIC8vIGluIHNvbWUgY2FzZXMgKGUuZy4gZHJhZyAmIGRyb3ApIHRoZXJlIGlzIG5vIGlucHV0IGVsZW1lbnRcbiAgICB0aGlzLmlucHV0ID0gc2V0dGluZ3MuZmlsZUlucHV0O1xuICAgIHRoaXMuZmlsZSAgPSBzZXR0aW5ncy5maWxlO1xuXG4gICAgLy8gVGhlIGZpbGUgc3RhcnRzIGF1dG9tYXRpY2FsbHkgYnkgZGVmYXVsdDsgeW91IGhhdmUgdG8gc2V0XG4gICAgLy8gYXV0b3N0YXJ0OiBmYWxzZSBleHBsaWNpdGx5IGlmIHlvdSB3YW50IHRvIHVzZSBhIHN0YXJ0IGJ1dHRvblxuICAgIC8vIGlmIGF1dG9zdGFydCBpcyBmYWxzZSwgeW91IGNhbiB1c2UgdGhlIFVwbG9hZGVyLnByb3RvdHlwZS5zdGFydCgpXG4gICAgLy8gZnVuY3Rpb24uIE5vdGUgdGhhdCB0aGUgdXNlciBoYXMgdG8gc2VsZWN0IGEgZmlsZSBmaXJzdFxuICAgIHNldHRpbmdzLmF1dG9zdGFydCA9ICgnYXV0b3N0YXJ0JyBpbiBzZXR0aW5ncyA/IHNldHRpbmdzLmF1dG9zdGFydCA6IHRydWUpO1xuXG4gICAgLy8gTk9URTogRm9yIEFtYXpvbiBTMywgdGhlIG1pbmltdW0gY2h1bmsgc2l6ZSBpcyA1TUJcbiAgICAvLyB3ZSBhcmUgdXNpbmcgNiBmb3Igc2FmZSBtZWFzdXJlLiBOb3RlIHRoYXQgdGhlIG1heGltdW0gbnVtYmVyIG9mIGNodW5rc1xuICAgIC8vIGlzIDEwLDAwMCwgc28gZm9yIGV4YW1wbGUsIGlmIHRoZSBjaHVuayBzaXplIGlzIDZNQiwgdGhlIG1heGltdW1cbiAgICAvLyBwb3NzaWJsZSBmaWxlIHNpemUgaXMgNk1CICogMTAsMDAwID0gfjU4R0JcbiAgICBzZXR0aW5ncy5jaHVua1NpemUgPSBzZXR0aW5ncy5jaHVua1NpemUgfHwgKDYgKiBNQik7IC8vIGRlZmF1bHQgNk1CXG4gICAgc2V0dGluZ3MubWF4U2l6ZSA9IHNldHRpbmdzLm1heFNpemUgfHwgNSAqIEdCOyAvLyA1R0JcblxuICAgIC8vIFRoZSBudW1iZXIgb2YgcGFyYWxsZWwgdXBsb2FkIHhocidzXG4gICAgc2V0dGluZ3MubnVtV29ya2VycyA9IHNldHRpbmdzLm51bVdvcmtlcnMgfHwgNDtcblxuICAgIC8vIFRoZSBTMyBvYmplY3Qga2V5OyBJIHJlY29tbWVuZCB0byBnZW5lcmF0ZSB0aGlzIGR5bmFtaWNhbGx5IChlLmcuXG4gICAgLy8gYSByYW5kb20gc3RyaW5nKSB0byBhdm9pZCB1bndhbnRlZCBvdmVyd3JpdGVzLlxuICAgIHNldHRpbmdzLmtleSA9IHNldHRpbmdzLmtleSB8fCAndGhlX2tleSc7XG5cbiAgICAvLyBUaGUgQW1hem9uIFMzIGJ1Y2tldCB3aGVyZSB5b3UnbGwgc3RvcmUgdGhlIHVwbG9hZHNcbiAgICBzZXR0aW5ncy5idWNrZXQgPSBzZXR0aW5ncy5idWNrZXQ7XG5cbiAgICAvLyBUaGUgQW1hem9uIFMzIGFjY2VzcyBrZXkuIERPIE5PVCBnaXZlIHRoZSBBV1MgU2VjcmV0IGNvZGUhXG4gICAgc2V0dGluZ3MuYWNjZXNzS2V5ID0gc2V0dGluZ3MuYWNjZXNzS2V5O1xuXG4gICAgLy8gVGhlIE1pbWUtVHlwZSBvZiB0aGUgY29udGVudC4gWW91IG11c3QgbWF0Y2ggdGhpcyB3aXRoIHRoZSBiYWNrZW5kIHZhbHVlXG4gICAgLy8gb3IgeW91J2xsIGdldCBhbiBJbnZhbGlkIFNpZ25hdHVyZSBlcnJvci4gSWYgdW5zdXJlIGFib3V0IHRoZVxuICAgIC8vIG1pbWUgdHlwZSwgdXNlIGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVxuICAgIHNldHRpbmdzLmNvbnRlbnRUeXBlID0gc2V0dGluZ3MuY29udGVudFR5cGUgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSc7XG5cblxuICAgIC8vIEFDTCBjYW4gYmUgc2V0IHRvOlxuICAgIC8vIHByaXZhdGVcbiAgICAvLyBwdWJsaWMtcmVhZCAoKiBkZWZhdWx0KVxuICAgIC8vIHB1YmxpYy1yZWFkLXdyaXRlXG4gICAgLy8gYXV0aGVudGljYXRlZC1yZWFkXG4gICAgLy8gYnVja2V0LW93bmVyLXJlYWRcbiAgICAvLyBidWNrZXQtb3duZXItZnVsbC1jb250cm9sXG4gICAgLy8gbG9nLWRlbGl2ZXJ5LXdyaXRlXG4gICAgc2V0dGluZ3MuYWNsID0gc2V0dGluZ3MuYWNsIHx8ICdwdWJsaWMtcmVhZCc7XG5cbiAgICAvLyBWYXJpb3VzIGNhbGxiYWNrc1xuICAgIHNldHRpbmdzLm9uUHJvZ3Jlc3MgPSBzZXR0aW5ncy5vblByb2dyZXNzICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25DaHVua1Byb2dyZXNzID0gc2V0dGluZ3Mub25DaHVua1Byb2dyZXNzICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vblNlbGVjdCA9IHNldHRpbmdzLm9uU2VsZWN0ICAgICAgICAgICAgICAgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uRXJyb3IgPSBzZXR0aW5ncy5vbkVycm9yICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25Db21wbGV0ZSA9IHNldHRpbmdzLm9uQ29tcGxldGUgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkluaXQgPSBzZXR0aW5ncy5vbkluaXQgICAgICAgICAgICAgICAgICAgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uU3RhcnQgPSBzZXR0aW5ncy5vblN0YXJ0ICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkID0gc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkICAgfHwgZnVuY3Rpb24oKSB7fTtcblxuICAgIC8vIFRoZSBsb2NhdGlvbiBwcmVmaXggb2YgdGhlIHVwbG9hZGVyJ3MgYmFja2VuZFxuICAgIHNldHRpbmdzLmFqYXhCYXNlID0gc2V0dGluZ3MuYWpheEJhc2UgfHwgJy91cGxvYWQtYmFja2VuZCc7XG5cbiAgICAvLyBFeHRlbnNpb25zIGNvbW1hIGRlbGltaXRlZCB3aXRob3V0IHBlcmlvZCAoanBnLGpwZWcscG5nLGdpZilcbiAgICBzZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMgPSBzZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMgfHwgJyc7XG5cbiAgICAvLyBTZXQgdGhlIHZhbHVlcyBzbyB0aGF0IHRoZXkgY2FuIGJlIHVzZWQgZXZlcnl3aGVyZSwgYXMgbmVlZGVkXG4gICAgc2VsZi5zZXR0aW5ncyA9IHNldHRpbmdzO1xuXG4gICAgLy8gVGhlIFwid2FpdGluZ1wiIHN0YXRlIG1lYW5zIHRoZSB1cGxvYWRlciBpcyB3YWl0aW5nIGZvciB0aGUgdXNlclxuICAgIC8vIHRvIHNlbGVjdCBhIGZpbGVcbiAgICBzZWxmLnNldFN0YXRlKCd3YWl0aW5nJyk7XG5cbiAgICBpZihzZWxmLmlucHV0KSB7XG4gICAgICBzZWxmLmlucHV0Lm9uY2hhbmdlID0gZnVuY3Rpb24oZSwgZm9yY2UpIHtcbiAgICAgICAgaWYoIXNlbGYuc2V0dGluZ3MuYXV0b3N0YXJ0KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlIGBvbmNoYW5nZWAgZXZlbnQgbWF5IGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcywgc28gd2VcbiAgICAgICAgLy8gbXVzdCBlbnN1cmUgdGhhdCB0aGUgY2FsbGJhY2sgaXMgb25seSBleGVjdXRlZCB0aGUgZmlyc3QgdGltZVxuICAgICAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICd3YWl0aW5nJykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSB1cGxvYWRlciBkb2Vzbid0IHN1cHBvcnQgbXVsdGlwbGUgdXBsb2FkcyBhdCB0aGlzIHRpbWUsXG4gICAgICAgIC8vIHNvIHdlIGdldCB0aGUgZmlyc3QgZmlsZVxuICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICBzZWxmLnVwbG9hZEZpbGUoZmlsZSwgZm9yY2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gdHJpZ2dlciB0aGUgaW5pdCBldmVudCBjYWxsYmFja1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnNldHRpbmdzLm9uSW5pdC5hcHBseShzZWxmKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYodGhpcy5pbnB1dCAmJiB0aGlzLmlucHV0LmZpbGVzICYmIHRoaXMuaW5wdXQuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudXBsb2FkRmlsZSh0aGlzLmlucHV0LmZpbGVzWzBdLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KCdObyBmaWxlIHNlbGVjdGVkJyk7XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkRmlsZShmaWxlOiBhbnksIGZvcmNlOiBib29sZWFuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gVGhlIGBvbmNoYW5nZWAgZXZlbnQgbWF5IGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcywgc28gd2VcbiAgICAvLyBtdXN0IGVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBvbmx5IGV4ZWN1dGVkIHRoZSBmaXJzdCB0aW1lXG4gICAgLy8gYWxzbyBtYWtlIHN1cmUgdGhlIGZpbGUgaXMgbm90IGFscmVhZHkgc2V0LlxuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoZmlsZSkge1xuICAgICAgc2VsZi5maWxlID0gZmlsZTtcbiAgICB9XG5cbiAgICBpZighc2VsZi5maWxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gV2UgdXNlIHRoZSBsYXN0TW9kaWZpZWREYXRlLCB0aGUgZmlsZSBuYW1lIGFuZCBzaXplIHRvIHVuaXF1ZWx5XG4gICAgLy8gaWRlbnRpZnkgYSBmaWxlLiBUaGVyZSBtYXkgYmUgZmFsc2UgcG9zaXRpdmVzIGFuZCBuZWdhdGl2ZXMsXG4gICAgLy8gYnV0IHRoZSBjaGFuY2UgZm9yIGEgZmFsc2UgcG9zaXRpdmUgaXMgYmFzaWNhbGx5IHplcm9cbiAgICAvLyBzb21lIGJyb3dzZXJzIGRvbid0IHJlcG9ydCB0aGUgbGFzdCBtb2RpZmllZCBkYXRlLCBzbyB3ZSBkZWZhdWx0XG4gICAgLy8gdG8gYSBibGFuayBkYXRlXG4gICAgdHJ5IHtcbiAgICAgIHNlbGYuZmlsZS5sYXN0TW9kaWZpZWREYXRlID0gdGhpcy5maWxlLmxhc3RNb2RpZmllZERhdGUgfHwgbmV3IERhdGUoMCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyAuLi5cbiAgICB9XG5cbiAgICBpZihzZWxmLmZpbGUuc2l6ZSA+IHNlbGYuc2V0dGluZ3MubWF4U2l6ZSkge1xuICAgICAgYWxlcnQoW1xuICAgICAgICAnVGhlIG1heGltdW0gYWxsb3dlZCBmaWxlIHNpemUgaXMgJyxcbiAgICAgICAgKHNlbGYuc2V0dGluZ3MubWF4U2l6ZSAvIEdCKSxcbiAgICAgICAgJ0dCLiBQbGVhc2Ugc2VsZWN0IGFub3RoZXIgZmlsZS4nLFxuICAgICAgXS5qb2luKCcnKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGFjY2VwdGVkIGV4dGVuc2lvbnMsIGlmIGFwcGxpY2FibGVcbiAgICBpZihzZWxmLnNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucykge1xuICAgICAgLy8gR2V0IHRoZSBmaWxlIGV4dGVuc2lvblxuICAgICAgdmFyIGZpbGVFeHRlbnNpb24gPSBmaWxlLm5hbWUuc3BsaXQoJy4nKS5wb3AoKTtcblxuICAgICAgLy8gU3BsaXQgdGhlIGdpdmVuIGV4dGVuc2lvbnMgaW50byBhbiBhcnJheVxuICAgICAgdmFyIGV4dGVuc2lvbnNBcnJheSA9IHNlbGYuc2V0dGluZ3MuYWNjZXB0ZWRFeHRlbnNpb25zLnNwbGl0KCcsJyk7XG5cbiAgICAgIC8vIEFuZCBtYXRjaCB0aGUgZXh0ZW5zaW9uIGFnYWluc3QgdGhlIGdpdmVuIGV4dGVuc2lvbiBsaXN0XG4gICAgICB2YXIgZmlsZUFjY2VwdGVkID0gZmFsc2U7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZXh0ZW5zaW9uc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGZpbGVFeHRlbnNpb24gPT09IGV4dGVuc2lvbnNBcnJheVtpXSkge1xuICAgICAgICAgIGZpbGVBY2NlcHRlZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhlIGZpbGUgaXMgbm90IGFjY2VwdGVkLCBub3RpZnkgdGhlIHVzZXIgYW5kIHJldHVyblxuICAgICAgaWYoIWZpbGVBY2NlcHRlZCkge1xuICAgICAgICBhbGVydChbXG4gICAgICAgICAgJ1RoaXMgZmlsZSBmb3JtYXQgaXMgbm90IGFjY2VwdGVkLiAnLFxuICAgICAgICAgICdQbGVhc2UgdXNlIGEgZmlsZSB3aXRoIGFuIGV4dGVuc2lvbiBsaWtlICcsXG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMsXG4gICAgICAgIF0uam9pbignJykpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZmlsZSB1cGxvYWRcbiAgICAvLyBhbHNvLCBhbGxvdyB0aGUgbGlicmFyeSB1c2VyIHRvIHByb2dyYW1hdGljYWxseSBjYW5jZWwgdGhlIHVwbG9hZCBpZixcbiAgICAvLyBmb3IgZXhhbXBsZSwgdGhlIGZpbGUgaXMgdG9vIGxhcmdlXG4gICAgY29uc3QgcmVzdWx0ID0gc2VsZi5zZXR0aW5ncy5vblNlbGVjdC5jYWxsKHRoaXMsIGZpbGUpO1xuICAgIGlmKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgIHNlbGYuZmlsZSA9IG51bGw7XG4gICAgICBzZWxmLmlucHV0LnZhbHVlID0gJyc7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuc2V0dGluZ3MuZXh0cmFQYXJhbXMgfHwge30sIHtcbiAgICAgIGZpbGVuYW1lOiBmaWxlLm5hbWUsXG4gICAgICBmaWxlc2l6ZTogZmlsZS5zaXplLFxuICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZERhdGUudmFsdWVPZigpLFxuICAgIH0pO1xuXG4gICAgaWYoZm9yY2UpIHtcbiAgICAgIGFyZ3MuZm9yY2UgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgc2lnbmluZyBrZXkuIEl0IHdpbGwgYWxzbyByZXR1cm5cbiAgICAvLyBhIGZpbGUga2V5ICsgdXBsb2FkSWQgcGFpciBpZiB0aGUgc2VsZWN0ZWQgZmlsZVxuICAgIC8vIGlzIGFscmVhZHkgdXBsb2FkaW5nLiBJdCBhbHNvIHJldHVybnMgYVxuICAgIC8vIGJhY2t1cF9rZXkgaW4gY2FzZSB0aGF0IGZpbGUgdXBsb2FkIGFscmVhZHkgY29tcGxldGVkLlxuICAgIC8vIFRoZSBzaWduaW5nIGtleSBpcyB2YWxpZCBmb3IgNyBkYXlzXG4gICAgWEhSKHtcbiAgICAgIHVybDogc2VsZi5zZXR0aW5ncy5hamF4QmFzZSArICcvc2lnbmluZ19rZXkvJyxcbiAgICAgIGV4dHJhUGFyYW1zOiBhcmdzLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgbG9hZENhbGxiYWNrOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBqc29uID0gSlNPTi5wYXJzZShlLnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICBqc29uLmRhdGUgPSBuZXcgRGF0ZShqc29uLmRhdGUpO1xuICAgICAgICBzZWxmLmF1dGggPSBqc29uO1xuICAgICAgICBzZWxmLnVwbG9hZElkID0ganNvbi51cGxvYWRJZDtcbiAgICAgICAgc2VsZi5jaHVua3MgPSBqc29uLmNodW5rcztcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5rZXkgPSBqc29uLmtleSB8fCBzZWxmLnNldHRpbmdzLmtleTtcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5iYWNrdXBLZXkgPSBzZWxmLnNldHRpbmdzLmtleTtcblxuICAgICAgICBpZighc2VsZi51cGxvYWRJZCkge1xuICAgICAgICAgIEFtYXpvblhIUi5pbml0KGpzb24sIHNlbGYuc2V0dGluZ3Mua2V5LCBmaWxlLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgeG1sID0gZS50YXJnZXQucmVzcG9uc2VYTUw7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgZ2l2ZW4gdXBsb2FkIGlkXG4gICAgICAgICAgICBzZWxmLnVwbG9hZElkID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdVcGxvYWRJZCcpWzBdLnRleHRDb250ZW50O1xuXG4gICAgICAgICAgICBzZWxmLmxvYWRGaWxlKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUmVzdW1lIGEgcHJldml1cyB1cGxvYWRcbiAgICAgICAgICBpZighZm9yY2UpIHtcbiAgICAgICAgICAgIC8vIEdldCB0aGUgdXBsb2FkZWQgcGFydHMgZnJvbSBTM1xuICAgICAgICAgICAgQW1hem9uWEhSLmxpc3QoXG4gICAgICAgICAgICAgIHNlbGYuYXV0aCwgc2VsZi5maWxlLCBzZWxmLnNldHRpbmdzLmtleSxcbiAgICAgICAgICAgICAgc2VsZi51cGxvYWRJZCwgc2VsZi5zZXR0aW5ncy5jaHVua1NpemUsIGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY2h1bmsgPSBwYXJ0c1tpXVswXSAtIDE7XG4gICAgICAgICAgICAgICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCBzZWxmLmdldENodW5rU2l6ZShjaHVuaykpO1xuICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaHVua0ZpbmlzaGVkKGNodW5rKTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmssIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBmYWlscywgcmUtaW5pdGlhdGUgdGhlIHVwbG9hZCwgYW5kIGZvcmNlXG4gICAgICAgICAgICAgICAgLy8gaXQgdG8gc3RhcnQgYSBuZXcgdXBsb2FkXG4gICAgICAgICAgICAgICAgc2VsZi51cGxvYWRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkZWRDaHVua3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYucHJvZ3Jlc3MgPSB7fTtcbiAgICAgICAgICAgICAgICBzZWxmLnRvdGFsUHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgIHNlbGYubG9hZGVkQ2h1bmtzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLnVwbG9hZGluZ0NodW5rcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5jaHVua3MgPSBbXTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldHRpbmdzLmtleSA9IHNlbGYuc2V0dGluZ3MuYmFja3VwS2V5O1xuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkRmlsZShmaWxlLCB0cnVlKTsgLy8gRm9yY2UgcmVsb2FkXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGZvcmNlLXN0YXJ0IHRoZSB1cGxvYWRcbiAgICAgICAgICAgIHNlbGYubG9hZEZpbGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBsb2FkRmlsZSgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBXZSBjYW4ndCBzdGFydCB0aGUgdXBsb2FkIGlmIHdlIGFyZSB3YWl0aW5nIGZvciB1c2VyIGlucHV0XG4gICAgaWYoc2VsZi5nZXRTdGF0ZSgpICE9PSAnd2FpdGluZycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBNYWtlIHN1cmUgd2Ugb25seSB0cmlnZ2VyIHRoZSBzdGFydCBldmVudCBvbmNlXG4gICAgaWYoIXNlbGYuX3N0YXJ0RmlyZWQpIHtcbiAgICAgIC8vIFRyaWdnZXIgdGhlIHN0YXJ0IGV2ZW50IGNhbGxiYWNrXG4gICAgICBzZWxmLnNldHRpbmdzLm9uU3RhcnQuY2FsbChzZWxmLCBzZWxmLmZpbGUpO1xuXG4gICAgICAvLyBBbmQgYWxzbyB0cmlnZ2VyIGEgcHJvZ3Jlc3MgY2FsbGJhY2sgd2l0aCAwJVxuICAgICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoc2VsZiwgMCwgc2VsZi5maWxlLnNpemUpO1xuICAgICAgc2VsZi5zdGFydEZpcmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGcm9tIG5vdyBvbiwgd2UgYXJlIFwicHJvY2Vzc2luZ1wiIHRoZSBmaWxlIHVwbG9hZFxuICAgIHNlbGYuc2V0U3RhdGUoJ3Byb2Nlc3NpbmcnKTtcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgd2UgbWF5IGhhdmUgc29tZSBjaHVua3MgYWxyZWFkeSB1cGxvYWRlZCxcbiAgICAvLyBTbyB3ZSBtYXkgdHJpZ2dlciBhIHByb2dyZXNzIGNhbGxiYWNrIHdpdGggdGhlIHJlcG9ydGVkIHByb2dyZXNzXG4gICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICBzZWxmLCBzZWxmLmdldFRvdGFsUHJvZ3Jlc3MoKSwgc2VsZi5maWxlLnNpemVcbiAgICApO1xuXG4gICAgLy8gR2V0IHRoZSBuZXh0IGNodW5rXG4gICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG5cbiAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAvLyBBbmQgc3RhcnQgdXBsb2FkaW5nIGl0XG4gICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgfSBlbHNlIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgLy8gSWYgd2UgZmluaXNoZWQsIHRyaWdnZXIgdGhlIHVwbG9hZCBmaW5pc2ggc2VxdWVuY2VcbiAgICAgIGxvZygnQWxsIGRvbmU7IGZpbmlzaCB1cGxvYWQnKTtcbiAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0dGluZ3MubnVtV29ya2VycyAtIDE7IGkrKykge1xuICAgICAgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkQ2h1bmsoY2h1bms6IG51bWJlcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSdyZSBpbiBwcm9jZXNzaW5nIG1vZGVcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgbG9nKCdOT1QgcHJvY2Vzc2luZzsgcmV0dXJuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWxzbyBtYWtlIHN1cmUgd2UncmUgbm90IGFscmVhZHkgdXBsb2FkaW5nIHRoaXMgY2h1bmtcbiAgICBpZihzZWxmLmdldENodW5rVXBsb2FkaW5nKGNodW5rKSkge1xuICAgICAgbG9nKCdBbHJlYWR5IFVwbG9hZGluZycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKHNlbGYuZ2V0TmV4dENodW5rKCkpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTWFyayB0aGlzIGNodW5rIGFzIHVwbG9hZGluZ1xuICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuayk7XG4gICAgfVxuICAgIGxvZyhgVXBsb2FkaW5nIENodW5rOiAke2NodW5rfWApO1xuXG4gICAgLy8gSWYgd2UgYWxyZWFkeSB1cGxvYWRlZCB0aGlzIGNodW5rLCBnZXQgdG8gdGhlIG5leHQgb25lXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbmV4dCBjaHVuaywgZmluaXNoIHRoZSB1cGxvYWRcbiAgICBpZihzZWxmLmlzQ2h1bmtMb2FkZWQoY2h1bmspKSB7XG4gICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgbG9nKCdObyBuZXh0IGNodW5rOyBmaW5pc2ggdXBsb2FkJyk7XG4gICAgICAgICAgc2VsZi5maW5pc2hVcGxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZTtcblxuICAgIC8vIEdldCB0aGUgc3RhcnQgYW5kIGVuZCBieXRlcyBmb3IgdGhlIG5lZWRlZCBjaHVua1xuICAgIHZhciBzdGFydCA9IGNodW5rICogbGVuZ3RoO1xuICAgIHZhciBlbmQgPSBNYXRoLm1pbihzdGFydCArIGxlbmd0aCwgc2VsZi5maWxlLnNpemUpO1xuXG4gICAgLy8gV2UgbmVlZCB0aGUgbGFzdCBwcm9ncmVzcyB0aW1lIGluIG9yZGVyIHRvIGRldGVjdCBoYW5naW5nXG4gICAgLy8gdXBsb2Fkc1xuICAgIHZhciBsYXN0UHJvZ3Jlc3NUaW1lID0gbmV3IERhdGUoKTtcbiAgICBzZWxmLmludGVydmFscyA9IHNlbGYuaW50ZXJ2YWxzIHx8IHt9O1xuXG4gICAgdmFyIGVycm9ySGFuZGxlZCA9IGZhbHNlO1xuICAgIHZhciBlcnJvckhhbmRsZXI6ICgpID0+IHZvaWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlcnJvckFyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciB4aHIgPSB0aGlzO1xuICAgICAgLy8gVGhlIHVwbG9hZCBtYXkgaGF2ZSBmaW5pc2hlZCwgc28gY2hlY2sgZm9yIHRoYXRcbiAgICAgIHNlbGYuY2hlY2tBbHJlYWR5VXBsb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIElmIGFscmVhZHkgdXBsb2FkZWRcbiAgICAgICAgc2VsZi5zZXRTdGF0ZSgnZmluaXNoZWQnKTtcblxuICAgICAgICAvLyBUT0RPOiB3aGF0IGlzIHRoaXM/XG4gICAgICAgIC8vIHNlbGYubm90aWZ5VXBsb2FkRmluaXNoZWQoKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGEgZmluYWwgcHJvZ3Jlc3MgZXZlbnQgY2FsbGJhY2ssIHdpdGggMTAwJVxuICAgICAgICBzZWxmLnNldHRpbmdzLm9uUHJvZ3Jlc3MuY2FsbChzZWxmLCBzZWxmLmZpbGUuc2l6ZSwgc2VsZi5maWxlLnNpemUpO1xuXG4gICAgICAgIC8vIEFsc28gdHJpZ2dlciB0aGUgY29tcGxldGUgZXZlbnQgY2FsbGJhY2tcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNvbXBsZXRlLmNhbGwoc2VsZik7XG4gICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBhIGdlbnVpbmUgZXJyb3JcbiAgICAgICAgbG9nKGBFcnJvcjogJHtlcnJvckFyZ3VtZW50c31gKTtcblxuICAgICAgICAvLyBtYWtlIHN1cmUgd2UgZG9uJ3QgaGFuZGxlIHRoZSBzYW1lIGVycm9yIG1vcmUgdGhhbiBvbmNlXG4gICAgICAgIGlmKGVycm9ySGFuZGxlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlcnJvckhhbmRsZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIGFib3J0IHRoZSBjaHVuayB1cGxvYWRcbiAgICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuaywgZmFsc2UpO1xuICAgICAgICBzZWxmLnNldENodW5rRmluaXNoZWQoY2h1bmssIGZhbHNlKTtcbiAgICAgICAgc2VsZi5zZXRQcm9ncmVzcyhjaHVuaywgMCk7XG4gICAgICAgIGxvZygnQWJvcnQnKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgbG9nKGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nKGBSZXRyeSBjaHVuazogJHtjaHVua31gKTtcblxuICAgICAgICAvLyBDbGVhciB0aGUgd2F0Y2hlciBpbnRlcnZhbFxuICAgICAgICBjbGVhckludGVydmFsKHNlbGYuaW50ZXJ2YWxzW2NodW5rXSk7XG5cbiAgICAgICAgLy8gUmUtdHJ5IHRoZSB1cGxvYWRcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZihzZWxmLmdldFN0YXRlKCkgPT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgICAgICAgLy8gQW5kIHByb2NlZWRcbiAgICAgICAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuayhjaHVuayk7XG4gICAgICAgICAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAgICAgICAgIHNlbGYudXBsb2FkQ2h1bmsobmV4dENodW5rKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIFRoZSBcInJlYWR5c3RhdGVjaGFuZ2VcIiBoYW5kbGVyXG4gICAgdmFyIGhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBXZSBjYXJlIGFib3V0IHRoZSBcImRvbmVcIiBldmVudCB0cmlnZ2VyZWQgd2hpbGUgcHJvY2Vzc2luZ1xuICAgICAgaWYoZS50YXJnZXQucmVhZHlTdGF0ZSAhPT0gdGhpcy5ET05FIHx8XG4gICAgICAgICAgc2VsZi5nZXRTdGF0ZSgpICE9PSAncHJvY2Vzc2luZycpIHtcbiAgICAgICAgbG9nKGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIGRvbid0IHJlY2VpdmUgYSAyWFggcmVzcG9uc2UsIHRyaWdnZXIgYW4gZXJyb3JcbiAgICAgIGlmKHBhcnNlSW50KGUudGFyZ2V0LnN0YXR1cykgLyAxMDAgIT09IDIpIHtcbiAgICAgICAgaWYodHlwZW9mIGVycm9ySGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIuYXBwbHkodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2Uga25vdyB0aGF0IHRoaXMgY2h1bmsgZmluaXNoZWQgdXBsb2FkaW5nXG4gICAgICBsb2coYENodW5rIHVwbG9hZGVkOiAke2NodW5rfWApO1xuXG4gICAgICAvLyBOb3RpZnkgdGhlIHNlcnZlciBvZiB0aGUgdXBsb2FkZWQgY2h1bmtcbiAgICAgIHNlbGYubm90aWZ5Q2h1bmtVcGxvYWRlZChjaHVuayk7XG5cbiAgICAgIC8vIEFuZCBhbHNvIHRyaWdnZXIgdGhlIGNodW5rX3VwbG9hZGVkIGNhbGxiYWNrXG4gICAgICBzZWxmLnNldHRpbmdzLm9uQ2h1bmtVcGxvYWRlZC5jYWxsKHNlbGYsIGNodW5rKTtcblxuICAgICAgLy8gQ2FuY2VsIHRoZSB4aHIgd2F0Y2hlciBpbnRlcnZhbFxuICAgICAgY2xlYXJJbnRlcnZhbChzZWxmLmludGVydmFsc1tjaHVua10pO1xuXG4gICAgICAvLyBNYXJrIHRoZSBjaHVuayBhcyBmaW5pc2hlZFxuICAgICAgc2VsZi5zZXRQcm9ncmVzcyhjaHVuaywgc2VsZi5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgICAgIHNlbGYuc2V0Q2h1bmtGaW5pc2hlZChjaHVuayk7XG4gICAgICBzZWxmLnNldENodW5rVXBsb2FkaW5nKGNodW5rLCBmYWxzZSk7XG5cbiAgICAgIC8vIEdldCBuZXh0IGNodW5rOyBpZiB3ZSdyZSBvdXQgb2YgY2h1bmtzLFxuICAgICAgLy8gZmluaXNoIHRoZSB1cGxvYWRcbiAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgaWYobmV4dENodW5rICE9PSAtMSkge1xuICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICB9IGVsc2UgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgIGxvZygnRG9uZScpO1xuICAgICAgICBzZWxmLmZpbmlzaFVwbG9hZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGNodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgICAgICBpZihjaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhjaHVuayk7XG4gICAgICAgICAgfSBlbHNlIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICBzZWxmLmZpbmlzaFVwbG9hZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIFRoZSB1cGxvYWQgcHJvZ3Jlc3MgaGFuZGxlclxuICAgIHZhciBwcm9ncmVzc0hhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAvLyBTZXQgdGhlIGludGVybmFsIGNodW5rJ3MgcHJvZ3Jlc3MgdmFsdWUgdG8gdGhlIHJlcG9ydGVkIGFtb3VudFxuICAgICAgc2VsZi5zZXRQcm9ncmVzcyhjaHVuaywgZS5sb2FkZWQpO1xuXG4gICAgICAvLyBUcmlnZ2VyIHRoZSBwcm9ncmVzcyBldmVudCBjYWxsYmFja1xuICAgICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICAgIHNlbGYsIHNlbGYuZ2V0VG90YWxQcm9ncmVzcygpLCBzZWxmLmZpbGUuc2l6ZVxuICAgICAgKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBsYXN0X3Byb2dyZXNzX3RpbWUgZm9yIHRoZSB3YXRjaGVyIGludGVydmFsXG4gICAgICBsYXN0UHJvZ3Jlc3NUaW1lID0gbmV3IERhdGUoKTtcbiAgICB9O1xuXG4gICAgQW1hem9uWEhSLnVwbG9hZENodW5rKFxuICAgICAgc2VsZi5hdXRoLCBzZWxmLnNldHRpbmdzLmtleSwgc2VsZi51cGxvYWRJZCxcbiAgICAgIGNodW5rLCBzZWxmLmZpbGUuc2xpY2Uoc3RhcnQsIGVuZCksIHtcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogcHJvZ3Jlc3NIYW5kbGVyLFxuICAgICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiBoYW5kbGVyLFxuICAgICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckhhbmRsZXIsXG4gICAgICAgIHRpbWVvdXRDYWxsYmFjazogZXJyb3JIYW5kbGVyLFxuICAgICAgfSwgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIHNlbGYuY2h1bmtYaHIgPSBzZWxmLmNodW5rWGhyIHx8IFtdO1xuICAgICAgICBzZWxmLmNodW5rWGhyLnB1c2goeGhyKTtcblxuICAgICAgICAvLyBUaGUgd2F0Y2hlciBpbnRlcnZhbDsgaXQgY2FuY2VscyB0aGUgeGhyIGlmIGl0IHRpbWVzIG91dFxuICAgICAgICBzZWxmLmludGVydmFsc1tjaHVua10gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZihsYXN0UHJvZ3Jlc3NUaW1lICYmXG4gICAgICAgICAgICAgIChuZXcgRGF0ZSgpIC0gbGFzdFByb2dyZXNzVGltZSkgPiAxNSAqIFNFQ09ORFMpIHsgLy8gMTVzXG4gICAgICAgICAgICBsb2coJ0NodW5rIEZhaWxlZDsgcmV0cnknKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5pbnRlcnZhbHNbY2h1bmtdKTtcbiAgICAgICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSA9PT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICBlcnJvckhhbmRsZXIuY2FsbCh4aHIpO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jaHVua1hoclt0aGlzLl9jaHVua1hoci5pbmRleE9mKHhocildXG4gICAgICAgICAgICAgICAgICAgICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmNodW5rWGhyW3RoaXMuX2NodW5rWGhyLmluZGV4T2YoeGhyKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIDQgKiBTRUNPTkRTKTsgLy8gRXZlcnkgNHNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZmluaXNoVXBsb2FkKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1ha2Ugc3VyZSBpdCdzIG5vdCB0cmlnZ2VyZWQgd2hlbiBub3QgcHJvY2Vzc2luZyAoZS5nLiBtdWx0aXBsZSB0aW1lcylcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoYW5nZSB0aGUgdXBsb2FkJ3Mgc3RhdGVcbiAgICBzZWxmLnNldFN0YXRlKCdmaW5pc2hpbmcnKTtcblxuICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgc2VsZiwgc2VsZi5maWxlLnNpemUsIHNlbGYuZmlsZS5zaXplXG4gICAgKTsgLy8gMTAwJSBkb25lLlxuXG5cbiAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGU6IFhIUkV2ZW50KSB7XG4gICAgICAvLyBJLmUuIGlmIGl0J3MgYSAyWFggcmVzcG9uc2VcbiAgICAgIGlmKE1hdGguZmxvb3IoZS50YXJnZXQuc3RhdHVzIC8gMTAwKSA9PT0gMikge1xuICAgICAgICBsb2coJ0ZpbmlzaGVkIGZpbGUuJyk7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGVkJyk7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgICAgIHNlbGYsIHNlbGYuZmlsZS5zaXplLCBzZWxmLmZpbGUuc2l6ZVxuICAgICAgICApOyAvLyBJdCdzIDEwMCUgZG9uZVxuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIGNvbXBsZXRlIGV2ZW50IGNhbGxiYWNrXG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Db21wbGV0ZS5jYWxsKHNlbGYpO1xuICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDAwICYmXG4gICAgICAgICAgZS50YXJnZXQucmVzcG9uc2VUZXh0LmluZGV4T2YoJ0VudGl0eVRvb1NtYWxsJykgIT09IC0xKSB7XG4gICAgICAgIC8vIEFuIFwiRW50aXR5VG9vU21hbGxcIiBlcnJvciBtZWFucyB0aGF0IHdlIG1pc3NlZCBhIGNodW5rXG4gICAgICAgIEFtYXpvblhIUi5saXN0KFxuICAgICAgICAgIHNlbGYuYXV0aCxcbiAgICAgICAgICBzZWxmLmZpbGUsXG4gICAgICAgICAgc2VsZi5zZXR0aW5ncy5rZXksXG4gICAgICAgICAgc2VsZi51cGxvYWRJZCxcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSxcbiAgICAgICAgICAocGFydHMpID0+IHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlQ2h1bmtzKHBhcnRzKTtcbiAgICAgICAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZSgncHJvY2Vzc2luZycpO1xuICAgICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4ge31cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZihlLnRhcmdldC5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAvLyA0MDQgPSBOb1N1Y2hVcGxvYWQgPSBjaGVjayBpZiBhbHJlYWR5IGZpbmlzaGVkXG4gICAgICAgIC8vIElmIHNvLCBzdGFydCBhIG5ldyB1cGxvYWRcbiAgICAgICAgc2VsZi5jYW5jZWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2VsZi51cGxvYWRGaWxlKHNlbGYuZmlsZSwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5jaGVja0FscmVhZHlVcGxvYWRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICBoYW5kbGVyKHtcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcbiAgICAgICAgICAgICAgcmVzcG9uc2VYTUw6ICcnLFxuICAgICAgICAgICAgICByZXNwb25zZVRleHQ6ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiA0MDQsXG4gICAgICAgICAgICAgIHJlc3BvbnNlWE1MOiAnJyxcbiAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0OiAnJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBBbWF6b25YSFIubGlzdChcbiAgICAgIHNlbGYuYXV0aCwgc2VsZi5maWxlLCBzZWxmLnNldHRpbmdzLmtleSxcbiAgICAgIHNlbGYudXBsb2FkSWQsIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplLFxuICAgICAgKHBhcnRzKSA9PiB7XG4gICAgICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwoc2VsZi5maWxlLnNpemUgLyBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSk7XG5cbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB3ZSB1cGxvYWRlZCBhbGwgdGhlIGNodW5rczsgaWYgd2UgZGlkbid0LFxuICAgICAgICAvLyBzdGFydCB1cGxvYWRpbmcgdGhlIG1pc3Npbmcgb25lc1xuICAgICAgICBpZihwYXJ0cy5sZW5ndGggIT09IG51bUNodW5rcykge1xuICAgICAgICAgIHNlbGYudXBkYXRlQ2h1bmtzKHBhcnRzKTtcbiAgICAgICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgICAgICBzZWxmLnNldFN0YXRlKCdwcm9jZXNzaW5nJyk7XG4gICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIEFtYXpvblhIUi5maW5pc2goXG4gICAgICAgICAgc2VsZi5hdXRoLCBzZWxmLnNldHRpbmdzLmtleSwgc2VsZi51cGxvYWRJZCwgcGFydHMsIGhhbmRsZXJcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7fSxcbiAgICApO1xuICB9XG5cbiAgbm90aWZ5Q2h1bmtVcGxvYWRlZChjaHVuazogbnVtYmVyKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBrZXkgPSBzZWxmLnNldHRpbmdzLmtleTtcbiAgICB2YXIgdXBsb2FkSWQgPSBzZWxmLnVwbG9hZElkO1xuICAgIHZhciB1cmwgPSBgJHtzZWxmLnNldHRpbmdzLmFqYXhCYXNlfS9jaHVua19sb2FkZWQvYDtcblxuICAgIHZhciBhcmdzID0gT2JqZWN0LmFzc2lnbihzZWxmLnNldHRpbmdzLmV4dHJhUGFyYW1zIHx8IHt9LCB7XG4gICAgICBjaHVuayxcbiAgICAgIGtleSxcbiAgICAgIHVwbG9hZElkLFxuICAgICAgZmlsZW5hbWU6IHNlbGYuZmlsZS5uYW1lLFxuICAgICAgZmlsZXNpemU6IHNlbGYuZmlsZS5zaXplLFxuICAgICAgbGFzdE1vZGlmaWVkOiBzZWxmLmZpbGUubGFzdE1vZGlmaWVkRGF0ZS52YWx1ZU9mKCksXG4gICAgfSk7XG5cbiAgICBYSFIoe1xuICAgICAgdXJsLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgZXh0cmFQYXJhbXM6IGFyZ3MsXG4gICAgfSk7XG4gIH1cblxuICBjaGVja0FscmVhZHlVcGxvYWRlZChjYWxsYmFjazogKCkgPT4gdm9pZCwgZXJyb3JDYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbWV0aG9kID0gJ0hFQUQnO1xuICAgIHZhciBwYXRoID0gYC8ke3NlbGYuc2V0dGluZ3Mua2V5fWA7XG4gICAgdmFyIGlubmVySGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIFRoZSBoYW5kbGVyIG9ubHkgY2hlY2tzIGZvciBzdGF0dXMgY29kZTtcbiAgICAgIC8vIGlmIHRoZSBIRUFEIHJldHVybnMgNDA0LCByZS11cGxvYWQsXG4gICAgICAvLyBlbHNlLCBpdCByZXR1cm5zIDIwMCBhbmQgZmluaXNoIHRoZSB1cGxvYWRcbiAgICAgIGlmKE1hdGguY2VpbChlLnRhcmdldC5zdGF0dXMgLyAxMDApID09PSAyKSB7XG4gICAgICAgIGxvZygnQWxyZWFkeSBVcGxvYWRlZCcpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nKCdFcnJvciEnKTtcbiAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZighZXJyb3JDYWxsYmFjayAmJiB0eXBlb2YoZXJyb3JDYWxsYmFjaykgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVycm9yQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc2VsZi5jaGVja0FscmVhZHlVcGxvYWRlZChjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgICAgIH0sIDI1MDApO1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIGNvbnN0IHJlZ2lvblN0cmluZyA9IHV0aWxzLnJlZ2lvblN0cmluZyhzZWxmLmF1dGgucmVnaW9uKTtcbiAgICBjb25zdCBwcm90b2NvbCA9IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIGNvbnN0IGJ1Y2tldCA9IHNlbGYuYXV0aC5idWNrZXQ7XG4gICAgdmFyIGhvc3QgPSBgczMke3JlZ2lvblN0cmluZ30uYW1hem9uYXdzLmNvbWA7XG4gICAgdmFyIHVybCA9IGAke3Byb3RvY29sfS8vJHtob3N0fS8ke2J1Y2tldH0vJHtwYXRofWA7XG4gICAgWEhSKHtcbiAgICAgIHVybCxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgbG9hZENhbGxiYWNrOiBpbm5lckhhbmRsZXIsXG4gICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrLFxuICAgIH0pO1xuICB9XG5cbiAgY2FuY2VsKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgLy8gRW1wdHkgYWxsIGZpZWxkcywgY2FuY2VsIGFsbCBpbnRlcnZhbHMsIGFib3J0IGFsbCB4aHInc1xuICAgIHRoaXMuY2h1bmtYaHIubWFwKChjaHVuaykgPT4ge1xuICAgICAgbG9nKGBBYm9ydCBjaHVuazogJHtjaHVua31gKTtcbiAgICAgIGNodW5rLmFib3J0KCk7XG4gICAgfSk7XG4gICAgdGhpcy5pbnRlcnZhbHMgPSB0aGlzLl9pbnRlcnZhbHMgfHwge307XG4gICAgZm9yKGxldCBrZXkgaW4gdGhpcy5pbnRlcnZhbHMpIHtcbiAgICAgIGlmKHRoaXMuaW50ZXJ2YWxzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsc1trZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHRoaXMuc2V0U3RhdGUoJ2NhbmNlbGVkJyk7XG4gICAgdGhpcy5jaHVua1hociA9IHRoaXMuX2NodW5rWGhyIHx8IFtdO1xuICAgIHRoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKHRoaXMsIDAsIDApO1xuICAgIHRoaXMuY2h1bmtYaHIgPSBbXTtcbiAgICB0aGlzLmNodW5rcyA9IFtdO1xuICAgIHRoaXMudXBsb2FkaW5nQ2h1bmtzID0gbnVsbDtcbiAgICB0aGlzLmxvYWRlZENodW5rcyA9IG51bGw7XG4gICAgdGhpcy5zdGFydEZpcmVkID0gZmFsc2U7XG4gICAgdGhpcy51cGxvYWRJZCA9IG51bGw7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHt9O1xuICAgIHRoaXMuc2V0U3RhdGUoJ3dhaXRpbmcnKTsgLy8gd2FpdCBmb3IgYSBuZXcgdXBsb2FkXG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIHVwZGF0ZUNodW5rcyhwYXJ0czogQXJyYXk8YW55Pikge1xuICAgIHZhciBsb2FkZWQgPSBbXTtcbiAgICB2YXIgbnVtQ2h1bmtzID0gTWF0aC5jZWlsKHRoaXMuZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemUpO1xuXG4gICAgdGhpcy5faW5pdENodW5rcyh0cnVlKTtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IFtdO1xuICAgIHRoaXMubG9hZGVkQ2h1bmtzID0gW107XG5cbiAgICBwYXJ0cy5tYXAoKHBhcnQpID0+IHtcbiAgICAgIHZhciBwYXJ0TnVtYmVyID0gcGFyc2VJbnQocGFydFswXSwgMTApO1xuICAgICAgdGhpcy5hZGRMb2FkZWRDaHVuayhwYXJ0TnVtYmVyIC0gMSk7XG4gICAgICB0aGlzLnNldENodW5rRmluaXNoZWQocGFydE51bWJlciAtIDEpO1xuICAgICAgbG9hZGVkLnB1c2gocGFydE51bWJlciAtIDEpO1xuICAgIH0pO1xuXG4gICAgZm9yKGxldCBjaHVua051bSA9IDA7IGNodW5rTnVtIDwgbnVtQ2h1bmtzOyBjaHVua051bSsrKSB7XG4gICAgICBpZihsb2FkZWQuaW5kZXhPZihjaHVua051bSkgPT09IC0xKSB7XG4gICAgICAgIGxvZyhgQ2h1bmsgbm90IHVwbG9hZGVkOiAke2NodW5rTnVtfWApO1xuICAgICAgICB0aGlzLnNldFByb2dyZXNzKGNodW5rTnVtLCAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZmlsZTtcbiAgfVxuXG4gIGdldFN0YXRlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG4gIH1cblxuICBzZXRTdGF0ZShzdGF0ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgc2V0UHJvZ3Jlc3MoY2h1bms6IG51bWJlciwgbG9hZGVkOiBudW1iZXIpIHtcbiAgICB0aGlzLnByb2dyZXNzID0gdGhpcy5wcm9ncmVzcyB8fCB7fTtcbiAgICB0aGlzLnRvdGFsUHJvZ3Jlc3MgPSAodGhpcy50b3RhbFByb2dyZXNzIHx8IDApICtcbiAgICAgIGxvYWRlZCAtICh0aGlzLnByb2dyZXNzW2NodW5rXSB8fCAwKTtcbiAgICB0aGlzLnByb2dyZXNzW2NodW5rXSA9IGxvYWRlZDtcbiAgICB0aGlzLnNldHRpbmdzLm9uQ2h1bmtQcm9ncmVzcy5jYWxsKFxuICAgICAgdGhpcywgY2h1bmssIGxvYWRlZCwgdGhpcy5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgfVxuXG4gIGdldFRvdGFsUHJvZ3Jlc3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b3RhbFByb2dyZXNzIHx8IDA7XG4gIH1cblxuICBpc0NodW5rTG9hZGVkKGNodW5rOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICB0aGlzLmxvYWRlZENodW5rcyA9IHRoaXMubG9hZGVkQ2h1bmtzIHx8IFtdO1xuICAgIHJldHVybiB0aGlzLmxvYWRlZENodW5rcy5pbmRleE9mKGNodW5rKSAhPT0gLTE7XG4gIH1cblxuICBhZGRMb2FkZWRDaHVuayhjaHVuazogbnVtYmVyKSB7XG4gICAgdGhpcy5sb2FkZWRDaHVua3MgPSB0aGlzLmxvYWRlZENodW5rcyB8fCBbXTtcbiAgICB0aGlzLmxvYWRlZENodW5rcy5wdXNoKGNodW5rKTtcbiAgICB0aGlzLnNldFByb2dyZXNzKGNodW5rLCB0aGlzLmdldENodW5rU2l6ZShjaHVuaykpO1xuICB9XG5cbiAgZ2V0Q2h1bmtVcGxvYWRpbmcoY2h1bms6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHRoaXMudXBsb2FkaW5nQ2h1bmtzID0gdGhpcy51cGxvYWRpbmdDaHVua3MgfHwgW107XG4gICAgcmV0dXJuIHRoaXMudXBsb2FkaW5nQ2h1bmtzLmluZGV4T2YoY2h1bmspICE9PSAtMTtcbiAgfVxuXG4gIHNldENodW5rVXBsb2FkaW5nKGNodW5rOiBudW1iZXIsIHZhbDogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IHRoaXMudXBsb2FkaW5nQ2h1bmtzIHx8IFtdO1xuICAgIGlmKHZhbCkge1xuICAgICAgdGhpcy51cGxvYWRpbmdDaHVua3MucHVzaChjaHVuayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpZHg7XG4gICAgICB3aGlsZSh0cnVlKSB7XG4gICAgICAgIGlkeCA9IHRoaXMudXBsb2FkaW5nQ2h1bmtzLmluZGV4T2YoY2h1bmspO1xuICAgICAgICBpZihpZHggPT09IC0xKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGxvYWRpbmdDaHVua3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2luaXRDaHVua3MoZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmKCF0aGlzLmNodW5rcyB8fCBmb3JjZSkge1xuICAgICAgdGhpcy5jaHVua3MgPSBbXTtcbiAgICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwodGhpcy5maWxlLnNpemUgLyB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZSk7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbnVtQ2h1bmtzOyBpKyspIHtcbiAgICAgICAgdGhpcy5jaHVua3MucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0Q2h1bmtGaW5pc2hlZChjaHVuazogbnVtYmVyLCB2YWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIHRoaXMuY2h1bmtzW2NodW5rXSA9ICEhdmFsO1xuICB9XG5cbiAgZ2V0TmV4dENodW5rKGNodW5rOiA/bnVtYmVyID0gbnVsbCk6IG51bWJlciB7XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIGlmKGNodW5rICYmICF0aGlzLmNodW5rc1tjaHVua10gJiYgIXRoaXMuZ2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmspKSB7XG4gICAgICByZXR1cm4gY2h1bms7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoIXRoaXMuY2h1bmtzW2ldICYmICF0aGlzLmdldENodW5rVXBsb2FkaW5nKGkpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICB1cGxvYWRGaW5pc2hlZCgpOiBib29sZWFuIHtcbiAgICB0aGlzLl9pbml0Q2h1bmtzKCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZighdGhpcy5jaHVua3NbaV0gfHwgdGhpcy5nZXRDaHVua1VwbG9hZGluZyhpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNMYXN0Q2h1bmsoY2h1bms6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy5maWxlLnNpemUgLyB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZSkgLSAxID09PSBjaHVuaztcbiAgfVxuXG4gIGdldENodW5rU2l6ZShjaHVuazogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZih0aGlzLmlzTGFzdENodW5rKGNodW5rKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZmlsZS5zaXplICUgdGhpcy5zZXR0aW5ncy5jaHVua1NpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZTtcbiAgICB9XG4gIH1cblxuICBvbkNodW5rUHJvZ3Jlc3MoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25DaHVua1Byb2dyZXNzID0gZjtcbiAgfVxuXG4gIG9uUHJvZ3Jlc3MoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcyA9IGY7XG4gIH1cblxuICBvblNlbGVjdChmOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vblNlbGVjdCA9IGY7XG4gIH1cblxuICBvbkVycm9yKGY6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uRXJyb3IgPSBmO1xuICB9XG5cbiAgb25Db21wbGV0ZShmOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkNvbXBsZXRlID0gZjtcbiAgfVxuXG4gIG9uSW5pdChmOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkluaXQgPSBmO1xuICB9XG5cbiAgb25TdGFydChmOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vblN0YXJ0ID0gZjtcbiAgfVxuXG4gIG9uQ2h1bmtVcGxvYWRlZChmOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkNodW5rVXBsb2FkZWQgPSBmO1xuICB9XG59XG4iLCIvKiBAZmxvdyAqL1xuXG5kZWNsYXJlIGZ1bmN0aW9uIGVzY2FwZShzb3VyY2U6IHN0cmluZyk6IHN0cmluZztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgcmVnaW9uU3RyaW5nKHJlZ2lvbikge1xuICAgIC8vIEdpdmVuIGFuIEFXUyByZWdpb24sIGl0IGVpdGhlciByZXR1cm5zIGFuIGVtcHR5IHN0cmluZyBmb3JcbiAgICAvLyBVUy1iYXNlZCByZWdpb25zIG9yIHRoZSByZWdpb24gbmFtZSBwcmVjZWRlZCBieSBhIGRhc2ggZm9yIG5vbi1VUy1iYXNlZFxuICAgIC8vIHJlZ2lvbnMuXG4gICAgLy8gU2VlIHRoaXMgZm9yIG1vcmUgZGV0YWlsczpcbiAgICAvLyBodHRwOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25TMy9sYXRlc3QvZGV2L1ZpcnR1YWxIb3N0aW5nLmh0bWxcbiAgICBpZihyZWdpb24gJiYgcmVnaW9uLnNsaWNlKDAsIDIpICE9PSAndXMnKSB7XG4gICAgICByZXR1cm4gJy0nICsgcmVnaW9uO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgc3RhdGljIHpmaWxsKHN0ciwgbnVtKSB7XG4gICAgbGV0IHplcm9zID0gJyc7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG51bTsgaSsrKSB7XG4gICAgICB6ZXJvcyArPSAnMCc7XG4gICAgfVxuXG4gICAgcmV0dXJuICh6ZXJvcyArIHN0cikuc3Vic3RyKC1NYXRoLm1heChudW0sIHN0ci50b1N0cmluZygpLmxlbmd0aCkpO1xuICB9XG4gIHN0YXRpYyB1cmllbmNvZGUoc3RyaW5nKSB7XG4gICAgdmFyIG91dHB1dCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmcpO1xuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOV8uflxcLSVdKy9nLCBlc2NhcGUpO1xuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC87L2csICclM0InKTtcblxuICAgIC8vIEFXUyBwZXJjZW50LWVuY29kZXMgc29tZSBleHRyYSBub24tc3RhbmRhcmQgY2hhcmFjdGVycyBpbiBhIFVSSVxuICAgIG91dHB1dCA9IG91dHB1dC5yZXBsYWNlKC9bKl0vZywgZnVuY3Rpb24oY2gpIHtcbiAgICAgIHJldHVybiAnJScgKyBjaC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuICBzdGF0aWMgaXNvODYwMShkYXRlKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGRhdGUuZ2V0VVRDRnVsbFllYXIoKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIDIpLFxuICAgICAgVXRpbHMuemZpbGwoZGF0ZS5nZXRVVENEYXRlKCksIDIpLFxuICAgICAgJ1QnLFxuICAgICAgVXRpbHMuemZpbGwoZGF0ZS5nZXRVVENIb3VycygpLCAyKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDTWludXRlcygpLCAyKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDU2Vjb25kcygpLCAyKSxcbiAgICAgICdaJyxcbiAgICBdLmpvaW4oJycpO1xuXG4gIH1cbn1cbiIsIi8qIEBmbG93ICovXG5cbnR5cGUgWEhSU2V0dGluZ3MgPSB7XG4gIGhlYWRlcnM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG4gIG1ldGhvZDogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgZXh0cmFQYXJhbXM/OiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gWEhSKGFyZ3M6IFhIUlNldHRpbmdzKTogWE1MSHR0cFJlcXVlc3Qge1xuICAvLyBUaGUgdXNlciBtYXkgb3IgbWF5IG5vdCBwYXNzIGFueSBoZWFkZXJzXG4gIGFyZ3MuaGVhZGVycyA9IGFyZ3MuaGVhZGVycyB8fCB7fTtcblxuICAvLyBJZiBubyBtZXRob2QgaXMgZ2l2ZW4sIGRlZmF1bHQgdG8gR0VUXG4gIGFyZ3MubWV0aG9kID0gYXJncy5tZXRob2QgfHwgJ0dFVCc7XG5cbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIC8vIFNldCB0aGUgXCJsb2FkXCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy5sb2FkQ2FsbGJhY2sgJiYgdHlwZW9mIGFyZ3MubG9hZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBhcmdzLmxvYWRDYWxsYmFjaywgdHJ1ZSk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFwiZXJyb3JcIiBjYWxsYmFjayBpZiBnaXZlblxuICBpZihhcmdzLmVycm9yQ2FsbGJhY2sgJiYgdHlwZW9mIGFyZ3MuZXJyb3JDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGFyZ3MuZXJyb3JDYWxsYmFjaywgdHJ1ZSk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFwicmVhZHlzdGF0ZWNoYW5nZVwiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3Muc3RhdGVDaGFuZ2VDYWxsYmFjayAmJlxuICAgICAgdHlwZW9mIGFyZ3Muc3RhdGVDaGFuZ2VDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgYXJncy5zdGF0ZUNoYW5nZUNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJwcm9ncmVzc1wiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3MucHJvZ3Jlc3NDYWxsYmFjayAmJiB0eXBlb2YgYXJncy5wcm9ncmVzc0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGFyZ3MucHJvZ3Jlc3NDYWxsYmFjayk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFwidGltZW91dFwiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3MudGltZW91dENhbGxiYWNrICYmIHR5cGVvZiBhcmdzLnRpbWVvdXRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCd0aW1lb3V0JywgYXJncy50aW1lb3V0Q2FsbGJhY2spO1xuICB9XG5cbiAgLy8gQWRkaW5nIGV4dHJhIHBhcmFtcyBhcyBuZWVkZWRcbiAgdmFyIHVybCA9IGFyZ3MudXJsO1xuICBpZih0eXBlb2YgYXJncy5leHRyYVBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IodmFyIHBhcmFtTmFtZSBpbiBhcmdzLmV4dHJhUGFyYW1zKSB7XG4gICAgICBpZihhcmdzLmV4dHJhUGFyYW1zLmhhc093blByb3BlcnR5KHBhcmFtTmFtZSkpIHtcbiAgICAgICAgaWYodXJsLmluZGV4T2YoJz8nKSAhPT0gLTEpIHtcbiAgICAgICAgICB1cmwgKz0gJyYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybCArPSAnPyc7XG4gICAgICAgIH1cblxuICAgICAgICB1cmwgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtTmFtZSkgKyAnPSc7XG4gICAgICAgIC8vIGtlZXAgdGhlIHR5cGVjaGVja2VyIGhhcHB5XG4gICAgICAgIGlmKHR5cGVvZiBhcmdzLmV4dHJhUGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHVybCArPSBlbmNvZGVVUklDb21wb25lbnQoYXJncy5leHRyYVBhcmFtc1twYXJhbU5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE9wZW4gdGhlIHhociBjb25uZWN0aW9uXG4gIHhoci5vcGVuKGFyZ3MubWV0aG9kLCB1cmwpO1xuXG4gIC8vIFNldCB0aGUgaGVhZGVyc1xuICBmb3IodmFyIGhlYWRlciBpbiBhcmdzLmhlYWRlcnMpIHtcbiAgICBpZihhcmdzLmhlYWRlcnMuaGFzT3duUHJvcGVydHkoaGVhZGVyKSkge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaGVhZGVyLCBhcmdzLmhlYWRlcnNbaGVhZGVyXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gU2VuZCB0aGUgYWpheCBjYWxsXG4gIGlmKGFyZ3MuYm9keSkge1xuICAgIHhoci5zZW5kKGFyZ3MuYm9keSk7XG4gIH0gZWxzZSB7XG4gICAgeGhyLnNlbmQoKTtcbiAgfVxuICByZXR1cm4geGhyO1xufVxuIl19
