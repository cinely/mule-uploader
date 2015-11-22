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
      var querystring = {};
      for (var key in this.settings.querystring) {
        querystring[key] = this.settings.querystring[key];
      }
      querystring['X-Amz-Date'] = encodedDate;
      querystring['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
      querystring['X-Amz-Expires'] = '86400'; // One day

      var accessKey = this.settings.auth.accessKey;
      var region = this.settings.auth.region;
      querystring['X-Amz-Credential'] = _utils2['default'].uriencode(accessKey + '/' + dateString + '/' + region + '/s3/aws4_request');
      querystring['X-Amz-SignedHeaders'] = '';

      var headerKeys = _Object$keys(this.headers);

      headerKeys.sort();
      querystring['X-Amz-SignedHeaders'] = _utils2['default'].uriencode(headerKeys.join(';'));

      querystring['X-Amz-Signature'] = this.getAuthorizationHeader(querystring);

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

      this.xhr = (0, _xhr.XHR)({
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
    value: function getAuthorizationHeader(querystring) {
      var header = '';

      var headerKeys = _Object$keys(this.headers).sort();

      var signedKeys = headerKeys.reduce(function (acc, val) {
        return acc + ';' + val;
      });

      if (!this.settings.key) {
        throw new Error("Key undefined");
      }

      var canonicalRequest = this.getCanonicalRequest({
        method: this.settings.method,
        key: this.settings.key,
        headers: this.headers,
        querystring: querystring
      });
      var stringToSign = this.getStringToSign({
        canonicalRequest: canonicalRequest,
        requestDate: this.requestDate,
        region: this.settings.auth.region,
        signature: this.settings.auth.signature
      });
      var signature = this.signRequest({
        stringToSign: stringToSign,
        signature: this.settings.auth.signature
      });

      return signature;
    }
  }, {
    key: 'getCanonicalRequest',
    value: function getCanonicalRequest(_ref) {
      var method = _ref.method;
      var key = _ref.key;
      var querystring = _ref.querystring;
      var headers = _ref.headers;
      return (function () {
        var request = '\n      ' + method.toUpperCase() + '\n      /' + _utils2['default'].uriencode(key).replace(/%2F/g, '/') + '\n    ';
        request = request.trim().replace(/^\s+/gm, '') + '\n';

        // querystring
        request += _Object$keys(querystring).sort().reduce(function (acc, key) {
          var value = querystring[key];
          if (acc) {
            return acc + '&amp;' + _utils2['default'].uriencode(key) + '=' + value;
          } else {
            return _utils2['default'].uriencode(key) + '=' + value;
          }
        }, '');
        request += '\n';

        // headers
        var headerKeys = _Object$keys(headers).sort();
        request += headerKeys.reduce(function (acc, key) {
          var value = headers[key];
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
      })();
    }
  }, {
    key: 'getStringToSign',
    value: function getStringToSign(_ref2) {
      var canonicalRequest = _ref2.canonicalRequest;
      var requestDate = _ref2.requestDate;
      var region = _ref2.region;
      var signature = _ref2.signature;
      return (function () {
        return ('\n      AWS4-HMAC-SHA256\n      ' + _utils2['default'].iso8601(requestDate) + '\n      ' + [requestDate.getUTCFullYear(), _utils2['default'].zfill(requestDate.getUTCMonth() + 1, 2), _utils2['default'].zfill(requestDate.getUTCDate(), 2), '/' + region + '/s3/aws4_request\n'].join('') + '\n      ' + (0, _cryptoJsSha2562['default'])(canonicalRequest.replace(/&amp;/g, '&')).toString() + '\n    ').trim().replace(/^\s+/gm, '');
      })();
    }
  }, {
    key: 'signRequest',
    value: function signRequest(_ref3) {
      var stringToSign = _ref3.stringToSign;
      var signature = _ref3.signature;
      return (function () {
        var res = (0, _cryptoJsHmacSha2562['default'])(stringToSign, _cryptoJsEncHex2['default'].parse(signature)).toString();
        return res;
      })();
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
          if (!xml) {
            return;
          }
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

      parts.map(function (_ref4) {
        var _ref42 = _slicedToArray(_ref4, 2);

        var number = _ref42[0];
        var etag = _ref42[1];

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
    settings.numWorkers = settings.numWorkers || 1;

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
      if (self.file) {
        try {
          self.file.lastModifiedDate = self.file.lastModifiedDate || new Date(0);
        } catch (e) {}
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
      (0, _xhr.XHR)({
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
            if (!force && self.file) {
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

      var file = self.file;

      if (file == null) {
        return;
      }

      // Make sure we only trigger the start event once
      if (!self._startFired) {
        // Trigger the start event callback
        self.settings.onStart.call(self, self.file);

        // And also trigger a progress callback with 0%
        self.settings.onProgress.call(self, 0, file.size);
        self.startFired = true;
      }

      // From now on, we are "processing" the file upload
      self.setState('processing');

      // At this point we may have some chunks already uploaded,
      // So we may trigger a progress callback with the reported progress
      self.settings.onProgress.call(self, self.getTotalProgress(), file.size);

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
      var file = self.file;
      if (!file) {
        return;
      }
      var end = Math.min(start + length, file.size);

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
          if (!file) {
            return;
          }
          // If already uploaded
          self.setState('finished');

          // TODO: what is this?
          // self.notifyUploadFinished();

          // Trigger a final progress event callback, with 100%
          self.settings.onProgress.call(self, file.size, file.size);

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
        var file = self.file;
        if (!file) {
          return;
        }

        // Trigger the progress event callback
        self.settings.onProgress.call(self, self.getTotalProgress(), file.size);

        // Update the last_progress_time for the watcher interval
        lastProgressTime = new Date();
      };

      _amazonXhr.AmazonXHR.uploadChunk(self.auth, self.settings.key, self.uploadId, chunk, file.slice(start, end), {
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
      var file = self.file;
      if (!file) {
        return;
      }

      // Make sure it's not triggered when not processing (e.g. multiple times)
      if (self.getState() !== 'processing') {
        return;
      }

      // Change the upload's state
      self.setState('finishing');

      self.settings.onProgress.call(self, file.size, file.size); // 100% done.

      var handler = function handler(e) {
        if (!file) {
          return;
        }
        // I.e. if it's a 2XX response
        if (Math.floor(e.target.status / 100) === 2) {
          (0, _log2['default'])('Finished file.');
          self.setState('finished');
          self.settings.onProgress.call(self, file.size, file.size); // It's 100% done

          // Trigger the complete event callback
          self.settings.onComplete.call(self);
        } else if (e.target.status === 400 && e.target.responseText && e.target.responseText.indexOf('EntityTooSmall') !== -1) {
          // An "EntityTooSmall" error means that we missed a chunk
          _amazonXhr.AmazonXHR.list(self.auth, file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
            self.updateChunks(parts);
            var nextChunk = self.getNextChunk();
            self.setState('processing');
            self.uploadChunk(nextChunk);
          }, function () {});
        } else if (e.target.status === 404) {
          // 404 = NoSuchUpload = check if already finished
          // If so, start a new upload
          self.cancel(function () {
            if (!self.file) {
              return;
            }
            self.uploadFile(self.file, true);
          });
        } else {
          self.checkAlreadyUploaded(function () {
            handler({
              target: {
                status: 200,
                responseText: null,
                responseXML: null
              }
            });
          }, function () {
            handler({
              target: {
                status: 404,
                responseText: null,
                responseXML: null
              }
            });
          });
        }
      };

      _amazonXhr.AmazonXHR.list(self.auth, file, self.settings.key, self.uploadId, self.settings.chunkSize, function (parts) {
        if (!file) {
          return;
        }
        var numChunks = Math.ceil(file.size / self.settings.chunkSize);

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
      var file = self.file;
      if (!file) {
        return;
      }

      var args = _Object$assign(self.settings.extraParams || {}, {
        chunk: chunk,
        key: key,
        uploadId: uploadId,
        filename: file.name,
        filesize: file.size,
        lastModified: file.lastModifiedDate.valueOf()
      });

      (0, _xhr.XHR)({
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
      (0, _xhr.XHR)({
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
        _key = parseInt(_key, 10);
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

      var file = this.file;
      if (!file) {
        return;
      }
      var numChunks = Math.ceil(file.size / this.settings.chunkSize);

      this._initChunks(true);
      this.uploadingChunks = [];
      this.loadedChunks = [];

      var loaded = parts.map(function (part) {
        var partNumber = part[0];
        _this.addLoadedChunk(partNumber - 1);
        _this.setChunkFinished(partNumber - 1);
        return partNumber - 1;
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
          if (!this.uploadingChunks) {
            return;
          }
          this.uploadingChunks.splice(idx, 1);
        }
      }
    }
  }, {
    key: '_initChunks',
    value: function _initChunks() {
      var force = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var file = this.file;
      if (!file) {
        return;
      }
      if (!this.chunks || force) {
        this.chunks = [];
        var numChunks = Math.ceil(file.size / this.settings.chunkSize);
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
      var file = this.file;
      if (!file) {
        throw new Error("Please select a file first");
      }
      return Math.ceil(file.size / this.settings.chunkSize) - 1 === chunk;
    }
  }, {
    key: 'getChunkSize',
    value: function getChunkSize(chunk) {
      if (this.isLastChunk(chunk)) {
        if (!this.file) {
          throw new Error("Please select a file first");
        }
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

exports.XHR = XHR;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvbXVsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZC10by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdXBwb3J0LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVuc2NvcGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2NvcmUuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1oZXguanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2htYWMtc2hhMjU2LmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9obWFjLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEyNTYuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvYW1hem9uWGhyLmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvc3JjL2NvbnN0YW50cy5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL3NyYy9sb2cuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvdXBsb2FkZXIuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvdXRpbHMuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMveGhyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt3QkNFcUIsWUFBWTs7OzttQkFDakIsT0FBTzs7OztBQUV2QixTQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUU7O0FBRTlCLE1BQUcsRUFBRSxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxJQUMvRCxPQUFPLElBQUksS0FBSyxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQ2hDLDBCQUFJLDJCQUEyQixDQUFDLENBQUM7QUFDakMsV0FBTyxDQUFDLENBQUMsQ0FBQztHQUNYOzs7O0FBSUQsTUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxRQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7R0FDbkQ7O0FBRUQsTUFBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQy9CLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pELFFBQUk7QUFDRixVQUFJLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDNUMsQ0FBQyxPQUFNLENBQUMsRUFBRTtBQUNULGFBQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDtHQUNGO0FBQ0Qsd0JBQUksSUFBSSxDQUFDLENBQUM7O0FBRVYsU0FBTywwQkFBYSxRQUFRLENBQUMsQ0FBQztDQUMvQjs7QUFFRCxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtBQUNoQyxRQUFNLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztDQUNwQzs7O0FDbkNEOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcnVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkNwTTRCLE9BQU87O3FCQUNqQixTQUFTOzs7OzhCQUNSLGtCQUFr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IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgVXBsb2FkZXIgZnJvbSAnLi91cGxvYWRlcic7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nJztcblxuZnVuY3Rpb24gbXVsZVVwbG9hZGVyKHNldHRpbmdzKSB7XG4gIC8vIFZlcmlmeSB0aGF0IHRoZSBicm93c2VyIGhhcyB0aGUgbmVlZGVkIEhUTUw1IGNhcGFiaWxpdGllc1xuICBpZighKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgRmlsZUxpc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgbG9nKCdIVE1MNSBBUElzIG5vdCBhdmFpbGFibGUuJyk7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLy8gRm9yIG5ldyB3ZWJraXQgYnJvd3NlcnMsIHRoZSAuc2xpY2UoKSBtZXRob2QgaXMgbmFtZWQgLndlYmtpdFNsaWNlKClcbiAgLy8gc2ltaWxhciBmb3IgbW96aWxsYVxuICBpZiAodHlwZW9mIEZpbGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBGaWxlLnByb3RvdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBGaWxlLnByb3RvdHlwZS5zbGljZSA9IEZpbGUucHJvdG90eXBlLndlYmtpdFNsaWNlIHx8XG4gICAgICBGaWxlLnByb3RvdHlwZS5tb3pTbGljZSB8fCBGaWxlLnByb3RvdHlwZS5zbGljZTtcbiAgfVxuXG4gIGlmKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSAhPT0gLTEpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGp1c3RDaGVja2luZyA9IG5ldyBCbG9iKFsnc29tZXRoaW5nJ10pO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxuICBsb2coJ09LJyk7XG5cbiAgcmV0dXJuIG5ldyBVcGxvYWRlcihzZXR0aW5ncyk7XG59XG5cbmlmKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHdpbmRvdy5tdWxlVXBsb2FkZXIgPSBtdWxlVXBsb2FkZXI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG5cbiAgICAgIF9PYmplY3QkZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgIFwiZGVmYXVsdFwiOiBvYmpcbiAgfTtcbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfZ2V0SXRlcmF0b3IgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvclwiKVtcImRlZmF1bHRcIl07XG5cbnZhciBfaXNJdGVyYWJsZSA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGVcIilbXCJkZWZhdWx0XCJdO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9IF9nZXRJdGVyYXRvcihhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKF9pc0l0ZXJhYmxlKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSkoKTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5hc3NpZ247IiwidmFyICQgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkLnNldERlc2MoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmtleXM7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0Jyk7XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgYSA9IE9iamVjdC5hc3NpZ25cbiAgICAsIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gYSh7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cyhhKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICwgJCRsZW4gPSAkJC5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0S2V5cyAgICA9ICQuZ2V0S2V5c1xuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9sc1xuICAgICwgaXNFbnVtICAgICA9ICQuaXNFbnVtO1xuICB3aGlsZSgkJGxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdCgkJFtpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9XG4gIHJldHVybiBUO1xufSA6IE9iamVjdC5hc3NpZ247IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IChPID0gT2JqZWN0KGl0KSlbVEFHXSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMS4yLjQnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgY3R4ID0gZnVuY3Rpb24oZm4sIHRoYXQpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG52YXIgJGRlZiA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBrZXksIG93biwgb3V0LCBleHBcbiAgICAsIGlzR2xvYmFsID0gdHlwZSAmICRkZWYuR1xuICAgICwgaXNQcm90byAgPSB0eXBlICYgJGRlZi5QXG4gICAgLCB0YXJnZXQgICA9IGlzR2xvYmFsID8gZ2xvYmFsIDogdHlwZSAmICRkZWYuU1xuICAgICAgICA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgaWYoaXNHbG9iYWwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICEodHlwZSAmICRkZWYuRikgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBpZihpc0dsb2JhbCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJylleHAgPSBzb3VyY2Vba2V5XTtcbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuQiAmJiBvd24pZXhwID0gY3R4KG91dCwgZ2xvYmFsKTtcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIGVsc2UgaWYodHlwZSAmICRkZWYuVyAmJiB0YXJnZXRba2V5XSA9PSBvdXQpIWZ1bmN0aW9uKEMpe1xuICAgICAgZXhwID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIEMgPyBuZXcgQyhwYXJhbSkgOiBDKHBhcmFtKTtcbiAgICAgIH07XG4gICAgICBleHBbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICB9KG91dCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydFxuICAgIGV4cG9ydHNba2V5XSA9IGV4cDtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZGVmLkYgPSAxOyAgLy8gZm9yY2VkXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXG4kZGVmLlMgPSA0OyAgLy8gc3RhdGljXG4kZGVmLlAgPSA4OyAgLy8gcHJvdG9cbiRkZWYuQiA9IDE2OyAvLyBiaW5kXG4kZGVmLlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZGVmOyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyICQgICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuLyQucHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuc3VwcG9ydC1kZXNjJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gJC5zZXREZXNjKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZGVzY3JpcHRvciA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUYWcgICAgID0gcmVxdWlyZSgnLi8kLnRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gJC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgICA9IHJlcXVpcmUoJy4vJC5saWJyYXJ5JylcbiAgLCAkZGVmICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgLCAkcmVkZWYgICAgICAgICAgPSByZXF1aXJlKCcuLyQucmVkZWYnKVxuICAsIGhpZGUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICAgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBTWU1CT0xfSVRFUkFUT1IgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1jcmVhdGUnKVxuICAsIHNldFRhZyAgICAgICAgICA9IHJlcXVpcmUoJy4vJC50YWcnKVxuICAsIGdldFByb3RvICAgICAgICA9IHJlcXVpcmUoJy4vJCcpLmdldFByb3RvXG4gICwgQlVHR1kgICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICAgPSAndmFsdWVzJztcbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIHByb3RvICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsIF9uYXRpdmUgID0gcHJvdG9bU1lNQk9MX0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgX2RlZmF1bHQgPSBfbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgbWV0aG9kcywga2V5O1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKF9uYXRpdmUpe1xuICAgIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvKF9kZWZhdWx0LmNhbGwobmV3IEJhc2UpKTtcbiAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgc2V0VGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgIC8vIEZGIGZpeFxuICAgIGlmKCFMSUJSQVJZICYmIGhhcyhwcm90bywgRkZfSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIFNZTUJPTF9JVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRSkgJiYgKEJVR0dZIHx8ICEoU1lNQk9MX0lURVJBVE9SIGluIHByb3RvKSkpe1xuICAgIGhpZGUocHJvdG8sIFNZTUJPTF9JVEVSQVRPUiwgX2RlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gX2RlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZBVUxUID09IFZBTFVFUyA/IF9kZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgICAgICAgICA/IF9kZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogREVGQVVMVCAhPSBWQUxVRVMgPyBfZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpXG4gICAgfTtcbiAgICBpZihGT1JDRSlmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKSRyZWRlZihwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZGVmKCRkZWYuUCArICRkZWYuRiAqIEJVR0dZLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciAkT2JqZWN0ID0gT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNyZWF0ZTogICAgICRPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICAkT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICBpc0VudW06ICAgICB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgZ2V0RGVzYzogICAgJE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgICRPYmplY3QuZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgICRPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgJE9iamVjdC5rZXlzLFxuICBnZXROYW1lczogICAkT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6ICRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBlYWNoOiAgICAgICBbXS5mb3JFYWNoXG59OyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTsiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZGVmICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsIGNvcmUgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGZhaWxzID0gcmVxdWlyZSgnLi8kLmZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICAgLCBmbiAgID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRkZWYoJGRlZi5TICsgJGRlZi5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmhpZGUnKTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi8kLmdsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCIvLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vJC50by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGxcbiAgICAgIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi8kLmZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBkZWYgPSByZXF1aXJlKCcuLyQnKS5zZXREZXNjXG4gICwgaGFzID0gcmVxdWlyZSgnLi8kLmhhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi8kLndrcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuLyQuZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIHN0b3JlICA9IHJlcXVpcmUoJy4vJC5zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuLyQudWlkJylcbiAgLCBTeW1ib2wgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJykuU3ltYm9sO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgU3ltYm9sICYmIFN5bWJvbFtuYW1lXSB8fCAoU3ltYm9sIHx8IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi8kLmFuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vJC5jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuLyQud2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gSVRFUkFUT1IgaW4gT1xuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgc2V0VW5zY29wZSA9IHJlcXVpcmUoJy4vJC51bnNjb3BlJylcbiAgLCBzdGVwICAgICAgID0gcmVxdWlyZSgnLi8kLml0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgPSByZXF1aXJlKCcuLyQudG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbnNldFVuc2NvcGUoJ2tleXMnKTtcbnNldFVuc2NvcGUoJ3ZhbHVlcycpO1xuc2V0VW5zY29wZSgnZW50cmllcycpOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlMgKyAkZGVmLkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTsiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCRrZXlzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuLyQuc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vJC5pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xuSXRlcmF0b3JzLk5vZGVMaXN0ID0gSXRlcmF0b3JzLkhUTUxDb2xsZWN0aW9uID0gSXRlcmF0b3JzLkFycmF5OyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRyb290LkNyeXB0b0pTID0gZmFjdG9yeSgpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuXHQvKipcblx0ICogQ3J5cHRvSlMgY29yZSBjb21wb25lbnRzLlxuXHQgKi9cblx0dmFyIENyeXB0b0pTID0gQ3J5cHRvSlMgfHwgKGZ1bmN0aW9uIChNYXRoLCB1bmRlZmluZWQpIHtcblx0ICAgIC8qKlxuXHQgICAgICogQ3J5cHRvSlMgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQyA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExpYnJhcnkgbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYiA9IHt9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEJhc2Ugb2JqZWN0IGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2UgPSAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuXG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG92ZXJyaWRlcyBQcm9wZXJ0aWVzIHRvIGNvcHkgaW50byB0aGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgbmV3IG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgZmllbGQ6ICd2YWx1ZScsXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICAgICAgbWV0aG9kOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgfVxuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBleHRlbmQ6IGZ1bmN0aW9uIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFNwYXduXG5cdCAgICAgICAgICAgICAgICBGLnByb3RvdHlwZSA9IHRoaXM7XG5cdCAgICAgICAgICAgICAgICB2YXIgc3VidHlwZSA9IG5ldyBGKCk7XG5cblx0ICAgICAgICAgICAgICAgIC8vIEF1Z21lbnRcblx0ICAgICAgICAgICAgICAgIGlmIChvdmVycmlkZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLm1peEluKG92ZXJyaWRlcyk7XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBkZWZhdWx0IGluaXRpYWxpemVyXG5cdCAgICAgICAgICAgICAgICBpZiAoIXN1YnR5cGUuaGFzT3duUHJvcGVydHkoJ2luaXQnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIuaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHQgICAgICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemVyJ3MgcHJvdG90eXBlIGlzIHRoZSBzdWJ0eXBlIG9iamVjdFxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0LnByb3RvdHlwZSA9IHN1YnR5cGU7XG5cblx0ICAgICAgICAgICAgICAgIC8vIFJlZmVyZW5jZSBzdXBlcnR5cGVcblx0ICAgICAgICAgICAgICAgIHN1YnR5cGUuJHN1cGVyID0gdGhpcztcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHN1YnR5cGU7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEV4dGVuZHMgdGhpcyBvYmplY3QgYW5kIHJ1bnMgdGhlIGluaXQgbWV0aG9kLlxuXHQgICAgICAgICAgICAgKiBBcmd1bWVudHMgdG8gY3JlYXRlKCkgd2lsbCBiZSBwYXNzZWQgdG8gaW5pdCgpLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgaW5zdGFuY2UgPSBNeVR5cGUuY3JlYXRlKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjcmVhdGU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuZXh0ZW5kKCk7XG5cdCAgICAgICAgICAgICAgICBpbnN0YW5jZS5pbml0LmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBvYmplY3QuXG5cdCAgICAgICAgICAgICAqIE92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGFkZCBzb21lIGxvZ2ljIHdoZW4geW91ciBvYmplY3RzIGFyZSBjcmVhdGVkLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgdmFyIE15VHlwZSA9IENyeXB0b0pTLmxpYi5CYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgKiAgICAgICAgICAgICAvLyAuLi5cblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ29waWVzIHByb3BlcnRpZXMgaW50byB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgVGhlIHByb3BlcnRpZXMgdG8gbWl4IGluLlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiAgICAgTXlUeXBlLm1peEluKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJ1xuXHQgICAgICAgICAgICAgKiAgICAgfSk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBtaXhJbjogZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5TmFtZSBpbiBwcm9wZXJ0aWVzKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocHJvcGVydHlOYW1lKSkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW3Byb3BlcnR5TmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBJRSB3b24ndCBjb3B5IHRvU3RyaW5nIHVzaW5nIHRoZSBsb29wIGFib3ZlXG5cdCAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBwcm9wZXJ0aWVzLnRvU3RyaW5nO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIG9iamVjdC5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgY2xvbmUgPSBpbnN0YW5jZS5jbG9uZSgpO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluaXQucHJvdG90eXBlLmV4dGVuZCh0aGlzKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH07XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge0FycmF5fSB3b3JkcyBUaGUgYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNpZ0J5dGVzIFRoZSBudW1iZXIgb2Ygc2lnbmlmaWNhbnQgYnl0ZXMgaW4gdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICovXG5cdCAgICB2YXIgV29yZEFycmF5ID0gQ19saWIuV29yZEFycmF5ID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtBcnJheX0gd29yZHMgKE9wdGlvbmFsKSBBbiBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IHNpZ0J5dGVzIChPcHRpb25hbCkgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGUgd29yZHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKFsweDAwMDEwMjAzLCAweDA0MDUwNjA3XSwgNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKHdvcmRzLCBzaWdCeXRlcykge1xuXHQgICAgICAgICAgICB3b3JkcyA9IHRoaXMud29yZHMgPSB3b3JkcyB8fCBbXTtcblxuXHQgICAgICAgICAgICBpZiAoc2lnQnl0ZXMgIT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzID0gd29yZHMubGVuZ3RoICogNDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyB0aGlzIHdvcmQgYXJyYXkgdG8gYSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0VuY29kZXJ9IGVuY29kZXIgKE9wdGlvbmFsKSBUaGUgZW5jb2Rpbmcgc3RyYXRlZ3kgdG8gdXNlLiBEZWZhdWx0OiBDcnlwdG9KUy5lbmMuSGV4XG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBzdHJpbmdpZmllZCB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5ICsgJyc7XG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkudG9TdHJpbmcoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZyhDcnlwdG9KUy5lbmMuVXRmOCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uIChlbmNvZGVyKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAoZW5jb2RlciB8fCBIZXgpLnN0cmluZ2lmeSh0aGlzKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uY2F0ZW5hdGVzIGEgd29yZCBhcnJheSB0byB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5IHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkxLmNvbmNhdCh3b3JkQXJyYXkyKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjb25jYXQ6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB0aGlzV29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgdGhpc1NpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblx0ICAgICAgICAgICAgdmFyIHRoYXRTaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICB0aGlzLmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29uY2F0XG5cdCAgICAgICAgICAgIGlmICh0aGlzU2lnQnl0ZXMgJSA0KSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSBieXRlIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciB0aGF0Qnl0ZSA9ICh0aGF0V29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdIHw9IHRoYXRCeXRlIDw8ICgyNCAtICgodGhpc1NpZ0J5dGVzICsgaSkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gQ29weSBvbmUgd29yZCBhdCBhIHRpbWVcblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhhdFNpZ0J5dGVzOyBpICs9IDQpIHtcblx0ICAgICAgICAgICAgICAgICAgICB0aGlzV29yZHNbKHRoaXNTaWdCeXRlcyArIGkpID4+PiAyXSA9IHRoYXRXb3Jkc1tpID4+PiAyXTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB0aGlzLnNpZ0J5dGVzICs9IHRoYXRTaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDaGFpbmFibGVcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlbW92ZXMgaW5zaWduaWZpY2FudCBiaXRzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB3b3JkQXJyYXkuY2xhbXAoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbGFtcDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gdGhpcy53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gdGhpcy5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDbGFtcFxuXHQgICAgICAgICAgICB3b3Jkc1tzaWdCeXRlcyA+Pj4gMl0gJj0gMHhmZmZmZmZmZiA8PCAoMzIgLSAoc2lnQnl0ZXMgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB3b3Jkcy5sZW5ndGggPSBNYXRoLmNlaWwoc2lnQnl0ZXMgLyA0KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IHdvcmRBcnJheS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUud29yZHMgPSB0aGlzLndvcmRzLnNsaWNlKDApO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHdvcmQgYXJyYXkgZmlsbGVkIHdpdGggcmFuZG9tIGJ5dGVzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IG5CeXRlcyBUaGUgbnVtYmVyIG9mIHJhbmRvbSBieXRlcyB0byBnZW5lcmF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHJhbmRvbSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5yYW5kb20oMTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJhbmRvbTogZnVuY3Rpb24gKG5CeXRlcykge1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblxuXHQgICAgICAgICAgICB2YXIgciA9IChmdW5jdGlvbiAobV93KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV93ID0gbV93O1xuXHQgICAgICAgICAgICAgICAgdmFyIG1feiA9IDB4M2FkZTY4YjE7XG5cdCAgICAgICAgICAgICAgICB2YXIgbWFzayA9IDB4ZmZmZmZmZmY7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgbV96ID0gKDB4OTA2OSAqIChtX3ogJiAweEZGRkYpICsgKG1feiA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIG1fdyA9ICgweDQ2NTAgKiAobV93ICYgMHhGRkZGKSArIChtX3cgPj4gMHgxMCkpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gKChtX3ogPDwgMHgxMCkgKyBtX3cpICYgbWFzaztcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgLz0gMHgxMDAwMDAwMDA7XG5cdCAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IDAuNTtcblx0ICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICogKE1hdGgucmFuZG9tKCkgPiAuNSA/IDEgOiAtMSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0pO1xuXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCByY2FjaGU7IGkgPCBuQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIF9yID0gcigocmNhY2hlIHx8IE1hdGgucmFuZG9tKCkpICogMHgxMDAwMDAwMDApO1xuXG5cdCAgICAgICAgICAgICAgICByY2FjaGUgPSBfcigpICogMHgzYWRlNjdiNztcblx0ICAgICAgICAgICAgICAgIHdvcmRzLnB1c2goKF9yKCkgKiAweDEwMDAwMDAwMCkgfCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIG5CeXRlcyk7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogRW5jb2RlciBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogSGV4IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgSGV4ID0gQ19lbmMuSGV4ID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhleFN0cmluZyA9IENyeXB0b0pTLmVuYy5IZXguc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBoZXhDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgPj4+IDQpLnRvU3RyaW5nKDE2KSk7XG5cdCAgICAgICAgICAgICAgICBoZXhDaGFycy5wdXNoKChiaXRlICYgMHgwZikudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBoZXhDaGFycy5qb2luKCcnKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBoZXggc3RyaW5nIHRvIGEgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHIgVGhlIGhleCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMuZW5jLkhleC5wYXJzZShoZXhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAoaGV4U3RyKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoZXhTdHJMZW5ndGggPSBoZXhTdHIubGVuZ3RoO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGV4U3RyTGVuZ3RoOyBpICs9IDIpIHtcblx0ICAgICAgICAgICAgICAgIHdvcmRzW2kgPj4+IDNdIHw9IHBhcnNlSW50KGhleFN0ci5zdWJzdHIoaSwgMiksIDE2KSA8PCAoMjQgLSAoaSAlIDgpICogNCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBoZXhTdHJMZW5ndGggLyAyKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIExhdGluMSBlbmNvZGluZyBzdHJhdGVneS5cblx0ICAgICAqL1xuXHQgICAgdmFyIExhdGluMSA9IENfZW5jLkxhdGluMSA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBsYXRpbjFTdHJpbmcgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHdvcmRzID0gd29yZEFycmF5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB3b3JkQXJyYXkuc2lnQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xQ2hhcnMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgYml0ZSA9ICh3b3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICBsYXRpbjFDaGFycy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoYml0ZSkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGxhdGluMUNoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIExhdGluMSBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGxhdGluMVN0ciBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuTGF0aW4xLnBhcnNlKGxhdGluMVN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChsYXRpbjFTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGxhdGluMVN0ckxlbmd0aCA9IGxhdGluMVN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXRpbjFTdHJMZW5ndGg7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gMl0gfD0gKGxhdGluMVN0ci5jaGFyQ29kZUF0KGkpICYgMHhmZikgPDwgKDI0IC0gKGkgJSA0KSAqIDgpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbGF0aW4xU3RyTGVuZ3RoKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIFVURi04IGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgVXRmOCA9IENfZW5jLlV0ZjggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl9IHdvcmRBcnJheSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHV0ZjhTdHJpbmcgPSBDcnlwdG9KUy5lbmMuVXRmOC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKExhdGluMS5zdHJpbmdpZnkod29yZEFycmF5KSkpO1xuXHQgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBVVEYtOCBkYXRhJyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSBVVEYtOCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IHV0ZjhTdHIgVGhlIFVURi04IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuVXRmOC5wYXJzZSh1dGY4U3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKHV0ZjhTdHIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIExhdGluMS5wYXJzZSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQodXRmOFN0cikpKTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGJ1ZmZlcmVkIGJsb2NrIGFsZ29yaXRobSB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBUaGUgcHJvcGVydHkgYmxvY2tTaXplIG11c3QgYmUgaW1wbGVtZW50ZWQgaW4gYSBjb25jcmV0ZSBzdWJ0eXBlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfbWluQnVmZmVyU2l6ZSBUaGUgbnVtYmVyIG9mIGJsb2NrcyB0aGF0IHNob3VsZCBiZSBrZXB0IHVucHJvY2Vzc2VkIGluIHRoZSBidWZmZXIuIERlZmF1bHQ6IDBcblx0ICAgICAqL1xuXHQgICAgdmFyIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBDX2xpYi5CdWZmZXJlZEJsb2NrQWxnb3JpdGhtID0gQmFzZS5leHRlbmQoe1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGRhdGEgYnVmZmVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0KCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBXb3JkQXJyYXkuaW5pdCgpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzID0gMDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQWRkcyBuZXcgZGF0YSB0byB0aGlzIGJsb2NrIGFsZ29yaXRobSdzIGJ1ZmZlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBhcHBlbmQuIFN0cmluZ3MgYXJlIGNvbnZlcnRlZCB0byBhIFdvcmRBcnJheSB1c2luZyBVVEYtOC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKCdkYXRhJyk7XG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX2FwcGVuZCh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9hcHBlbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdCAgICAgICAgICAgIC8vIENvbnZlcnQgc3RyaW5nIHRvIFdvcmRBcnJheSwgZWxzZSBhc3N1bWUgV29yZEFycmF5IGFscmVhZHlcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBkYXRhID0gVXRmOC5wYXJzZShkYXRhKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEFwcGVuZFxuXHQgICAgICAgICAgICB0aGlzLl9kYXRhLmNvbmNhdChkYXRhKTtcblx0ICAgICAgICAgICAgdGhpcy5fbkRhdGFCeXRlcyArPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBQcm9jZXNzZXMgYXZhaWxhYmxlIGRhdGEgYmxvY2tzLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogVGhpcyBtZXRob2QgaW52b2tlcyBfZG9Qcm9jZXNzQmxvY2sob2Zmc2V0KSwgd2hpY2ggbXVzdCBiZSBpbXBsZW1lbnRlZCBieSBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRvRmx1c2ggV2hldGhlciBhbGwgYmxvY2tzIGFuZCBwYXJ0aWFsIGJsb2NrcyBzaG91bGQgYmUgcHJvY2Vzc2VkLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcHJvY2Vzc2VkIGRhdGEuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcygpO1xuXHQgICAgICAgICAqICAgICB2YXIgcHJvY2Vzc2VkRGF0YSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uX3Byb2Nlc3MoISEnZmx1c2gnKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfcHJvY2VzczogZnVuY3Rpb24gKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YTtcblx0ICAgICAgICAgICAgdmFyIGRhdGFXb3JkcyA9IGRhdGEud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBkYXRhU2lnQnl0ZXMgPSBkYXRhLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgYmxvY2tTaXplID0gdGhpcy5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemVCeXRlcyA9IGJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYmxvY2tzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuQmxvY2tzUmVhZHkgPSBkYXRhU2lnQnl0ZXMgLyBibG9ja1NpemVCeXRlcztcblx0ICAgICAgICAgICAgaWYgKGRvRmx1c2gpIHtcblx0ICAgICAgICAgICAgICAgIC8vIFJvdW5kIHVwIHRvIGluY2x1ZGUgcGFydGlhbCBibG9ja3Ncblx0ICAgICAgICAgICAgICAgIG5CbG9ja3NSZWFkeSA9IE1hdGguY2VpbChuQmxvY2tzUmVhZHkpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgZG93biB0byBpbmNsdWRlIG9ubHkgZnVsbCBibG9ja3MsXG5cdCAgICAgICAgICAgICAgICAvLyBsZXNzIHRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgbXVzdCByZW1haW4gaW4gdGhlIGJ1ZmZlclxuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5tYXgoKG5CbG9ja3NSZWFkeSB8IDApIC0gdGhpcy5fbWluQnVmZmVyU2l6ZSwgMCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDb3VudCB3b3JkcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbldvcmRzUmVhZHkgPSBuQmxvY2tzUmVhZHkgKiBibG9ja1NpemU7XG5cblx0ICAgICAgICAgICAgLy8gQ291bnQgYnl0ZXMgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CeXRlc1JlYWR5ID0gTWF0aC5taW4obldvcmRzUmVhZHkgKiA0LCBkYXRhU2lnQnl0ZXMpO1xuXG5cdCAgICAgICAgICAgIC8vIFByb2Nlc3MgYmxvY2tzXG5cdCAgICAgICAgICAgIGlmIChuV29yZHNSZWFkeSkge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgb2Zmc2V0ID0gMDsgb2Zmc2V0IDwgbldvcmRzUmVhZHk7IG9mZnNldCArPSBibG9ja1NpemUpIHtcblx0ICAgICAgICAgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWFsZ29yaXRobSBsb2dpY1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RvUHJvY2Vzc0Jsb2NrKGRhdGFXb3Jkcywgb2Zmc2V0KTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICAgICAgdmFyIHByb2Nlc3NlZFdvcmRzID0gZGF0YVdvcmRzLnNwbGljZSgwLCBuV29yZHNSZWFkeSk7XG5cdCAgICAgICAgICAgICAgICBkYXRhLnNpZ0J5dGVzIC09IG5CeXRlc1JlYWR5O1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIHByb2Nlc3NlZCB3b3Jkc1xuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHByb2Nlc3NlZFdvcmRzLCBuQnl0ZXNSZWFkeSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgY2xvbmUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uY2xvbmUoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB2YXIgY2xvbmUgPSBCYXNlLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9kYXRhID0gdGhpcy5fZGF0YS5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgX21pbkJ1ZmZlclNpemU6IDBcblx0ICAgIH0pO1xuXG5cdCAgICAvKipcblx0ICAgICAqIEFic3RyYWN0IGhhc2hlciB0ZW1wbGF0ZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYmxvY2tTaXplIFRoZSBudW1iZXIgb2YgMzItYml0IHdvcmRzIHRoaXMgaGFzaGVyIG9wZXJhdGVzIG9uLiBEZWZhdWx0OiAxNiAoNTEyIGJpdHMpXG5cdCAgICAgKi9cblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXIgPSBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zLlxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNmZzogQmFzZS5leHRlbmQoKSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIEluaXRpYWxpemVzIGEgbmV3bHkgY3JlYXRlZCBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY2ZnIChPcHRpb25hbCkgVGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyB0byB1c2UgZm9yIHRoaXMgaGFzaCBjb21wdXRhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2hlciA9IENyeXB0b0pTLmFsZ28uU0hBMjU2LmNyZWF0ZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChjZmcpIHtcblx0ICAgICAgICAgICAgLy8gQXBwbHkgY29uZmlnIGRlZmF1bHRzXG5cdCAgICAgICAgICAgIHRoaXMuY2ZnID0gdGhpcy5jZmcuZXh0ZW5kKGNmZyk7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgaGFzaGVyIHRvIGl0cyBpbml0aWFsIHN0YXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBSZXNldCBkYXRhIGJ1ZmZlclxuXHQgICAgICAgICAgICBCdWZmZXJlZEJsb2NrQWxnb3JpdGhtLnJlc2V0LmNhbGwodGhpcyk7XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdGhpcy5fZG9SZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgaGFzaGVyIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hhc2hlcn0gVGhpcyBoYXNoZXIuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblxuXHQgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIGhhc2hcblx0ICAgICAgICAgICAgdGhpcy5fcHJvY2VzcygpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhhc2ggPSBoYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gRmluYWwgbWVzc2FnZSB1cGRhdGVcblx0ICAgICAgICAgICAgaWYgKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuX2FwcGVuZChtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtaGFzaGVyIGxvZ2ljXG5cdCAgICAgICAgICAgIHZhciBoYXNoID0gdGhpcy5fZG9GaW5hbGl6ZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBoYXNoO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBibG9ja1NpemU6IDUxMi8zMixcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENyZWF0ZXMgYSBzaG9ydGN1dCBmdW5jdGlvbiB0byBhIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoZXIgdG8gY3JlYXRlIGEgaGVscGVyIGZvci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIZWxwZXIoQ3J5cHRvSlMuYWxnby5TSEEyNTYpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9jcmVhdGVIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBjZmcpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgaGFzaGVyLmluaXQoY2ZnKS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIHRoZSBITUFDJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byB1c2UgaW4gdGhpcyBITUFDIGhlbHBlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgc2hvcnRjdXQgZnVuY3Rpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBIbWFjU0hBMjU2ID0gQ3J5cHRvSlMubGliLkhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhtYWNIZWxwZXI6IGZ1bmN0aW9uIChoYXNoZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQ19hbGdvLkhNQUMuaW5pdChoYXNoZXIsIGtleSkuZmluYWxpemUobWVzc2FnZSk7XG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWxnb3JpdGhtIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbyA9IHt9O1xuXG5cdCAgICByZXR1cm4gQztcblx0fShNYXRoKSk7XG5cblxuXHRyZXR1cm4gQ3J5cHRvSlM7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5lbmMuSGV4O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSwgdW5kZWYpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIiksIHJlcXVpcmUoXCIuL3NoYTI1NlwiKSwgcmVxdWlyZShcIi4vaG1hY1wiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCIsIFwiLi9zaGEyNTZcIiwgXCIuL2htYWNcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdHJldHVybiBDcnlwdG9KUy5IbWFjU0hBMjU2O1xuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKCkge1xuXHQgICAgLy8gU2hvcnRjdXRzXG5cdCAgICB2YXIgQyA9IENyeXB0b0pTO1xuXHQgICAgdmFyIENfbGliID0gQy5saWI7XG5cdCAgICB2YXIgQmFzZSA9IENfbGliLkJhc2U7XG5cdCAgICB2YXIgQ19lbmMgPSBDLmVuYztcblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmODtcblx0ICAgIHZhciBDX2FsZ28gPSBDLmFsZ287XG5cblx0ICAgIC8qKlxuXHQgICAgICogSE1BQyBhbGdvcml0aG0uXG5cdCAgICAgKi9cblx0ICAgIHZhciBITUFDID0gQ19hbGdvLkhNQUMgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIEhNQUMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0hhc2hlcn0gaGFzaGVyIFRoZSBoYXNoIGFsZ29yaXRobSB0byB1c2UuXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBobWFjSGFzaGVyID0gQ3J5cHRvSlMuYWxnby5ITUFDLmNyZWF0ZShDcnlwdG9KUy5hbGdvLlNIQTI1Niwga2V5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAoaGFzaGVyLCBrZXkpIHtcblx0ICAgICAgICAgICAgLy8gSW5pdCBoYXNoZXJcblx0ICAgICAgICAgICAgaGFzaGVyID0gdGhpcy5faGFzaGVyID0gbmV3IGhhc2hlci5pbml0KCk7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGtleSA9PSAnc3RyaW5nJykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gVXRmOC5wYXJzZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemUgPSBoYXNoZXIuYmxvY2tTaXplO1xuXHQgICAgICAgICAgICB2YXIgaGFzaGVyQmxvY2tTaXplQnl0ZXMgPSBoYXNoZXJCbG9ja1NpemUgKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEFsbG93IGFyYml0cmFyeSBsZW5ndGgga2V5c1xuXHQgICAgICAgICAgICBpZiAoa2V5LnNpZ0J5dGVzID4gaGFzaGVyQmxvY2tTaXplQnl0ZXMpIHtcblx0ICAgICAgICAgICAgICAgIGtleSA9IGhhc2hlci5maW5hbGl6ZShrZXkpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQ2xhbXAgZXhjZXNzIGJpdHNcblx0ICAgICAgICAgICAga2V5LmNsYW1wKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2xvbmUga2V5IGZvciBpbm5lciBhbmQgb3V0ZXIgcGFkc1xuXHQgICAgICAgICAgICB2YXIgb0tleSA9IHRoaXMuX29LZXkgPSBrZXkuY2xvbmUoKTtcblx0ICAgICAgICAgICAgdmFyIGlLZXkgPSB0aGlzLl9pS2V5ID0ga2V5LmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5V29yZHMgPSBvS2V5LndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgaUtleVdvcmRzID0gaUtleS53b3JkcztcblxuXHQgICAgICAgICAgICAvLyBYT1Iga2V5cyB3aXRoIHBhZCBjb25zdGFudHNcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYXNoZXJCbG9ja1NpemU7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgb0tleVdvcmRzW2ldIF49IDB4NWM1YzVjNWM7XG5cdCAgICAgICAgICAgICAgICBpS2V5V29yZHNbaV0gXj0gMHgzNjM2MzYzNjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBvS2V5LnNpZ0J5dGVzID0gaUtleS5zaWdCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZUJ5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIFNldCBpbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFJlc2V0cyB0aGlzIEhNQUMgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIFJlc2V0XG5cdCAgICAgICAgICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAgICBoYXNoZXIudXBkYXRlKHRoaXMuX2lLZXkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBVcGRhdGVzIHRoaXMgSE1BQyB3aXRoIGEgbWVzc2FnZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSBUaGUgbWVzc2FnZSB0byBhcHBlbmQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtITUFDfSBUaGlzIEhNQUMgaW5zdGFuY2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIGhtYWNIYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoZXIudXBkYXRlKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogRmluYWxpemVzIHRoZSBITUFDIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqIE5vdGUgdGhhdCB0aGUgZmluYWxpemUgb3BlcmF0aW9uIGlzIGVmZmVjdGl2ZWx5IGEgZGVzdHJ1Y3RpdmUsIHJlYWQtb25jZSBvcGVyYXRpb24uXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgKE9wdGlvbmFsKSBBIGZpbmFsIG1lc3NhZ2UgdXBkYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBmaW5hbGl6ZTogZnVuY3Rpb24gKG1lc3NhZ2VVcGRhdGUpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhhc2hlciA9IHRoaXMuX2hhc2hlcjtcblxuXHQgICAgICAgICAgICAvLyBDb21wdXRlIEhNQUNcblx0ICAgICAgICAgICAgdmFyIGlubmVySGFzaCA9IGhhc2hlci5maW5hbGl6ZShtZXNzYWdlVXBkYXRlKTtcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIHZhciBobWFjID0gaGFzaGVyLmZpbmFsaXplKHRoaXMuX29LZXkuY2xvbmUoKS5jb25jYXQoaW5uZXJIYXNoKSk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhtYWM7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cdH0oKSk7XG5cblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0KGZ1bmN0aW9uIChNYXRoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXk7XG5cdCAgICB2YXIgSGFzaGVyID0gQ19saWIuSGFzaGVyO1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLy8gSW5pdGlhbGl6YXRpb24gYW5kIHJvdW5kIGNvbnN0YW50cyB0YWJsZXNcblx0ICAgIHZhciBIID0gW107XG5cdCAgICB2YXIgSyA9IFtdO1xuXG5cdCAgICAvLyBDb21wdXRlIGNvbnN0YW50c1xuXHQgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICBmdW5jdGlvbiBpc1ByaW1lKG4pIHtcblx0ICAgICAgICAgICAgdmFyIHNxcnROID0gTWF0aC5zcXJ0KG4pO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBmYWN0b3IgPSAyOyBmYWN0b3IgPD0gc3FydE47IGZhY3RvcisrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoIShuICUgZmFjdG9yKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIGZ1bmN0aW9uIGdldEZyYWN0aW9uYWxCaXRzKG4pIHtcblx0ICAgICAgICAgICAgcmV0dXJuICgobiAtIChuIHwgMCkpICogMHgxMDAwMDAwMDApIHwgMDtcblx0ICAgICAgICB9XG5cblx0ICAgICAgICB2YXIgbiA9IDI7XG5cdCAgICAgICAgdmFyIG5QcmltZSA9IDA7XG5cdCAgICAgICAgd2hpbGUgKG5QcmltZSA8IDY0KSB7XG5cdCAgICAgICAgICAgIGlmIChpc1ByaW1lKG4pKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoblByaW1lIDwgOCkge1xuXHQgICAgICAgICAgICAgICAgICAgIEhbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAyKSk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICBLW25QcmltZV0gPSBnZXRGcmFjdGlvbmFsQml0cyhNYXRoLnBvdyhuLCAxIC8gMykpO1xuXG5cdCAgICAgICAgICAgICAgICBuUHJpbWUrKztcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIG4rKztcblx0ICAgICAgICB9XG5cdCAgICB9KCkpO1xuXG5cdCAgICAvLyBSZXVzYWJsZSBvYmplY3Rcblx0ICAgIHZhciBXID0gW107XG5cblx0ICAgIC8qKlxuXHQgICAgICogU0hBLTI1NiBoYXNoIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIFNIQTI1NiA9IENfYWxnby5TSEEyNTYgPSBIYXNoZXIuZXh0ZW5kKHtcblx0ICAgICAgICBfZG9SZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB0aGlzLl9oYXNoID0gbmV3IFdvcmRBcnJheS5pbml0KEguc2xpY2UoMCkpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9Qcm9jZXNzQmxvY2s6IGZ1bmN0aW9uIChNLCBvZmZzZXQpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIEggPSB0aGlzLl9oYXNoLndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFdvcmtpbmcgdmFyaWFibGVzXG5cdCAgICAgICAgICAgIHZhciBhID0gSFswXTtcblx0ICAgICAgICAgICAgdmFyIGIgPSBIWzFdO1xuXHQgICAgICAgICAgICB2YXIgYyA9IEhbMl07XG5cdCAgICAgICAgICAgIHZhciBkID0gSFszXTtcblx0ICAgICAgICAgICAgdmFyIGUgPSBIWzRdO1xuXHQgICAgICAgICAgICB2YXIgZiA9IEhbNV07XG5cdCAgICAgICAgICAgIHZhciBnID0gSFs2XTtcblx0ICAgICAgICAgICAgdmFyIGggPSBIWzddO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGF0aW9uXG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjQ7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgaWYgKGkgPCAxNikge1xuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBNW29mZnNldCArIGldIHwgMDtcblx0ICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMHggPSBXW2kgLSAxNV07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMCAgPSAoKGdhbW1hMHggPDwgMjUpIHwgKGdhbW1hMHggPj4+IDcpKSAgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTB4IDw8IDE0KSB8IChnYW1tYTB4ID4+PiAxOCkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWEweCA+Pj4gMyk7XG5cblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWExeCA9IFdbaSAtIDJdO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTEgID0gKChnYW1tYTF4IDw8IDE1KSB8IChnYW1tYTF4ID4+PiAxNykpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZ2FtbWExeCA8PCAxMykgfCAoZ2FtbWExeCA+Pj4gMTkpKSBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGdhbW1hMXggPj4+IDEwKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIFdbaV0gPSBnYW1tYTAgKyBXW2kgLSA3XSArIGdhbW1hMSArIFdbaSAtIDE2XTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgdmFyIGNoICA9IChlICYgZikgXiAofmUgJiBnKTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYWogPSAoYSAmIGIpIF4gKGEgJiBjKSBeIChiICYgYyk7XG5cblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTAgPSAoKGEgPDwgMzApIHwgKGEgPj4+IDIpKSBeICgoYSA8PCAxOSkgfCAoYSA+Pj4gMTMpKSBeICgoYSA8PCAxMCkgfCAoYSA+Pj4gMjIpKTtcblx0ICAgICAgICAgICAgICAgIHZhciBzaWdtYTEgPSAoKGUgPDwgMjYpIHwgKGUgPj4+IDYpKSBeICgoZSA8PCAyMSkgfCAoZSA+Pj4gMTEpKSBeICgoZSA8PCA3KSAgfCAoZSA+Pj4gMjUpKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHQxID0gaCArIHNpZ21hMSArIGNoICsgS1tpXSArIFdbaV07XG5cdCAgICAgICAgICAgICAgICB2YXIgdDIgPSBzaWdtYTAgKyBtYWo7XG5cblx0ICAgICAgICAgICAgICAgIGggPSBnO1xuXHQgICAgICAgICAgICAgICAgZyA9IGY7XG5cdCAgICAgICAgICAgICAgICBmID0gZTtcblx0ICAgICAgICAgICAgICAgIGUgPSAoZCArIHQxKSB8IDA7XG5cdCAgICAgICAgICAgICAgICBkID0gYztcblx0ICAgICAgICAgICAgICAgIGMgPSBiO1xuXHQgICAgICAgICAgICAgICAgYiA9IGE7XG5cdCAgICAgICAgICAgICAgICBhID0gKHQxICsgdDIpIHwgMDtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIEludGVybWVkaWF0ZSBoYXNoIHZhbHVlXG5cdCAgICAgICAgICAgIEhbMF0gPSAoSFswXSArIGEpIHwgMDtcblx0ICAgICAgICAgICAgSFsxXSA9IChIWzFdICsgYikgfCAwO1xuXHQgICAgICAgICAgICBIWzJdID0gKEhbMl0gKyBjKSB8IDA7XG5cdCAgICAgICAgICAgIEhbM10gPSAoSFszXSArIGQpIHwgMDtcblx0ICAgICAgICAgICAgSFs0XSA9IChIWzRdICsgZSkgfCAwO1xuXHQgICAgICAgICAgICBIWzVdID0gKEhbNV0gKyBmKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNl0gPSAoSFs2XSArIGcpIHwgMDtcblx0ICAgICAgICAgICAgSFs3XSA9IChIWzddICsgaCkgfCAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfZG9GaW5hbGl6ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3JkcztcblxuXHQgICAgICAgICAgICB2YXIgbkJpdHNUb3RhbCA9IHRoaXMuX25EYXRhQnl0ZXMgKiA4O1xuXHQgICAgICAgICAgICB2YXIgbkJpdHNMZWZ0ID0gZGF0YS5zaWdCeXRlcyAqIDg7XG5cblx0ICAgICAgICAgICAgLy8gQWRkIHBhZGRpbmdcblx0ICAgICAgICAgICAgZGF0YVdvcmRzW25CaXRzTGVmdCA+Pj4gNV0gfD0gMHg4MCA8PCAoMjQgLSBuQml0c0xlZnQgJSAzMik7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTRdID0gTWF0aC5mbG9vcihuQml0c1RvdGFsIC8gMHgxMDAwMDAwMDApO1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbKCgobkJpdHNMZWZ0ICsgNjQpID4+PiA5KSA8PCA0KSArIDE1XSA9IG5CaXRzVG90YWw7XG5cdCAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgPSBkYXRhV29yZHMubGVuZ3RoICogNDtcblxuXHQgICAgICAgICAgICAvLyBIYXNoIGZpbmFsIGJsb2Nrc1xuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gUmV0dXJuIGZpbmFsIGNvbXB1dGVkIGhhc2hcblx0ICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEhhc2hlci5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS5faGFzaCA9IHRoaXMuX2hhc2guY2xvbmUoKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gY2xvbmU7XG5cdCAgICAgICAgfVxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIGhhc2hlcidzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhhc2ggPSBDcnlwdG9KUy5TSEEyNTYoJ21lc3NhZ2UnKTtcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1Nih3b3JkQXJyYXkpO1xuXHQgICAgICovXG5cdCAgICBDLlNIQTI1NiA9IEhhc2hlci5fY3JlYXRlSGVscGVyKFNIQTI1Nik7XG5cblx0ICAgIC8qKlxuXHQgICAgICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICpcblx0ICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZSBUaGUgbWVzc2FnZSB0byBoYXNoLlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBrZXkgVGhlIHNlY3JldCBrZXkuXG5cdCAgICAgKlxuXHQgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgSE1BQy5cblx0ICAgICAqXG5cdCAgICAgKiBAc3RhdGljXG5cdCAgICAgKlxuXHQgICAgICogQGV4YW1wbGVcblx0ICAgICAqXG5cdCAgICAgKiAgICAgdmFyIGhtYWMgPSBDcnlwdG9KUy5IbWFjU0hBMjU2KG1lc3NhZ2UsIGtleSk7XG5cdCAgICAgKi9cblx0ICAgIEMuSG1hY1NIQTI1NiA9IEhhc2hlci5fY3JlYXRlSG1hY0hlbHBlcihTSEEyNTYpO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUy5TSEEyNTY7XG5cbn0pKTsiLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBYSFIsIFRFdmVudCB9IGZyb20gJy4veGhyJztcbmltcG9ydCB1dGlscyBmcm9tICcuL3V0aWxzJztcbmltcG9ydCBTSEEyNTYgZnJvbSAnY3J5cHRvLWpzL3NoYTI1Nic7XG5pbXBvcnQgSG1hY1NIQTI1NiBmcm9tICdjcnlwdG8tanMvaG1hYy1zaGEyNTYnO1xuaW1wb3J0IEhleCBmcm9tICdjcnlwdG8tanMvZW5jLWhleCc7XG5cbmV4cG9ydCB0eXBlIFRBdXRoID0ge1xuICBidWNrZXQ6IHN0cmluZztcbiAgcmVnaW9uOiBzdHJpbmc7XG4gIGRhdGU6IERhdGU7XG4gIGFjY2Vzc0tleTogc3RyaW5nO1xuICBzaWduYXR1cmU6IHN0cmluZztcbn07XG5cbnR5cGUgVFF1ZXJ5c3RyaW5nID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxudHlwZSBUSGVhZGVycyA9IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG5cbnR5cGUgVFBheWxvYWQgPSBzdHJpbmcgfCBCbG9iO1xuXG50eXBlIFRTZXR0aW5ncyA9IHtcbiAgYXV0aDogVEF1dGg7XG4gIGhlYWRlcnM6IFRIZWFkZXJzO1xuICBxdWVyeXN0cmluZzogVFF1ZXJ5c3RyaW5nO1xuICBrZXk6ID9zdHJpbmc7XG4gIG1ldGhvZDogc3RyaW5nO1xuICBwYXlsb2FkOiBUUGF5bG9hZDtcbiAgbG9hZENhbGxiYWNrOiAoZXZlbnQ6IFRFdmVudCkgPT4gdm9pZDtcbiAgcHJvZ3Jlc3NDYWxsYmFjazogKCkgPT4gdm9pZDtcbiAgc3RhdGVDaGFuZ2VDYWxsYmFjazogKCkgPT4gdm9pZDtcbiAgZXJyb3JDYWxsYmFjazogKCkgPT4gdm9pZDtcbiAgdGltZW91dENhbGxiYWNrOiAoKSA9PiB2b2lkO1xufTtcblxudHlwZSBTZW5kQ2FsbGJhY2sgPSAoKCkgPT4gdm9pZCk7XG5cbmNsYXNzIEFtYXpvblhIUiB7XG4gIHNldHRpbmdzOiBUU2V0dGluZ3M7XG4gIHJlcXVlc3REYXRlOiBEYXRlO1xuICBoZWFkZXJzOiBPYmplY3Q7XG4gIHhocjogP1hIUjtcblxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogVFNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICB9O1xuXG4gIHNlbmQoY2FsbGJhY2s6ID9TZW5kQ2FsbGJhY2spOiBBbWF6b25YSFIge1xuICAgIHRoaXMucmVxdWVzdERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgdGhpcy5oZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xuXG4gICAgY29uc3QgYnVja2V0ID0gdGhpcy5zZXR0aW5ncy5hdXRoLmJ1Y2tldDtcbiAgICBjb25zdCByZWdpb25TdHJpbmcgPSB1dGlscy5yZWdpb25TdHJpbmcodGhpcy5zZXR0aW5ncy5hdXRoLnJlZ2lvbik7XG4gICAgdGhpcy5oZWFkZXJzLmhvc3QgPSBgJHtidWNrZXR9LnMzJHtyZWdpb25TdHJpbmd9LmFtYXpvbmF3cy5jb21gO1xuXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuc2V0dGluZ3MuYXV0aC5kYXRlO1xuICAgIHZhciBkYXRlU3RyaW5nID0gW1xuICAgICAgZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgdXRpbHMuemZpbGwoZGF0ZS5nZXRVVENNb250aCgpICsgMSwgMiksXG4gICAgICB1dGlscy56ZmlsbChkYXRlLmdldFVUQ0RhdGUoKSwgMiksXG4gICAgXS5qb2luKCcnKTtcblxuICAgIGNvbnN0IGVuY29kZWREYXRlID0gdXRpbHMudXJpZW5jb2RlKHV0aWxzLmlzbzg2MDEodGhpcy5yZXF1ZXN0RGF0ZSkpO1xuICAgIGxldCBxdWVyeXN0cmluZyA9IHt9O1xuICAgIGZvcih2YXIga2V5IGluIHRoaXMuc2V0dGluZ3MucXVlcnlzdHJpbmcgKSB7XG4gICAgICBxdWVyeXN0cmluZ1trZXldID0gdGhpcy5zZXR0aW5ncy5xdWVyeXN0cmluZ1trZXldO1xuICAgIH1cbiAgICBxdWVyeXN0cmluZ1snWC1BbXotRGF0ZSddID0gZW5jb2RlZERhdGU7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LUFsZ29yaXRobSddID0gJ0FXUzQtSE1BQy1TSEEyNTYnO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1FeHBpcmVzJ10gPSAnODY0MDAnOyAvLyBPbmUgZGF5XG5cbiAgICBjb25zdCBhY2Nlc3NLZXkgPSB0aGlzLnNldHRpbmdzLmF1dGguYWNjZXNzS2V5O1xuICAgIGNvbnN0IHJlZ2lvbiA9IHRoaXMuc2V0dGluZ3MuYXV0aC5yZWdpb247XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LUNyZWRlbnRpYWwnXSA9IHV0aWxzLnVyaWVuY29kZShcbiAgICAgIGAke2FjY2Vzc0tleX0vJHtkYXRlU3RyaW5nfS8ke3JlZ2lvbn0vczMvYXdzNF9yZXF1ZXN0YFxuICAgICk7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LVNpZ25lZEhlYWRlcnMnXSA9ICcnO1xuXG4gICAgbGV0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpO1xuXG4gICAgaGVhZGVyS2V5cy5zb3J0KCk7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LVNpZ25lZEhlYWRlcnMnXSA9IHV0aWxzLnVyaWVuY29kZShcbiAgICAgIGhlYWRlcktleXMuam9pbignOycpXG4gICAgKTtcblxuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1TaWduYXR1cmUnXSA9IHRoaXMuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihcbiAgICAgIHF1ZXJ5c3RyaW5nXG4gICAgKTtcblxuICAgIHZhciB1cmwgPSBgJHtsb2NhdGlvbi5wcm90b2NvbH0vLyR7dGhpcy5oZWFkZXJzLmhvc3R9LyR7dGhpcy5zZXR0aW5ncy5rZXl9YDtcbiAgICBkZWxldGUgdGhpcy5oZWFkZXJzLmhvc3Q7ICAvLyBrZWVwIHRoaXMgaGVhZGVyIG9ubHkgZm9yIGhhc2hpbmdcblxuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgT2JqZWN0LmtleXMocXVlcnlzdHJpbmcpLm1hcChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeXN0cmluZ1trZXldO1xuICAgICAgaWYoZmlyc3QpIHtcbiAgICAgICAgdXJsICs9ICc/JztcbiAgICAgIH1cbiAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICB1cmwgKz0gYCR7a2V5fT0ke3ZhbHVlfSZgO1xuICAgIH0pO1xuICAgIHVybCA9IHVybC5zbGljZSgwLCAtMSk7ICAvLyByZW1vdmUgZXh0cmEgYW1wZXJzYW5kXG5cbiAgICB0aGlzLnhociA9IFhIUih7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIG1ldGhvZDogdGhpcy5zZXR0aW5ncy5tZXRob2QsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiB0aGlzLnNldHRpbmdzLnBheWxvYWQsXG5cbiAgICAgIGxvYWRDYWxsYmFjazogdGhpcy5zZXR0aW5ncy5sb2FkQ2FsbGJhY2ssXG4gICAgICBwcm9ncmVzc0NhbGxiYWNrOiB0aGlzLnNldHRpbmdzLnByb2dyZXNzQ2FsbGJhY2ssXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiB0aGlzLnNldHRpbmdzLnN0YXRlQ2hhbmdlQ2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrOiB0aGlzLnNldHRpbmdzLmVycm9yQ2FsbGJhY2ssXG4gICAgICB0aW1lb3V0Q2FsbGJhY2s6IHRoaXMuc2V0dGluZ3MudGltZW91dENhbGxiYWNrLFxuICAgIH0pO1xuICAgIGlmKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayh0aGlzLnhocik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRBdXRob3JpemF0aW9uSGVhZGVyKHF1ZXJ5c3RyaW5nOiBUUXVlcnlzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBoZWFkZXIgPSAnJztcblxuICAgIGNvbnN0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpLnNvcnQoKTtcblxuICAgIGNvbnN0IHNpZ25lZEtleXMgPSBoZWFkZXJLZXlzLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICAgIHJldHVybiBhY2MgKyAnOycgKyB2YWw7XG4gICAgfSk7XG5cbiAgICBpZighdGhpcy5zZXR0aW5ncy5rZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIktleSB1bmRlZmluZWRcIik7XG4gICAgfVxuXG4gICAgbGV0IGNhbm9uaWNhbFJlcXVlc3QgPSB0aGlzLmdldENhbm9uaWNhbFJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiB0aGlzLnNldHRpbmdzLm1ldGhvZCxcbiAgICAgIGtleTogdGhpcy5zZXR0aW5ncy5rZXksXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBxdWVyeXN0cmluZyxcbiAgICB9KTtcbiAgICBsZXQgc3RyaW5nVG9TaWduID0gdGhpcy5nZXRTdHJpbmdUb1NpZ24oe1xuICAgICAgY2Fub25pY2FsUmVxdWVzdCxcbiAgICAgIHJlcXVlc3REYXRlOiB0aGlzLnJlcXVlc3REYXRlLFxuICAgICAgcmVnaW9uOiB0aGlzLnNldHRpbmdzLmF1dGgucmVnaW9uLFxuICAgICAgc2lnbmF0dXJlOiB0aGlzLnNldHRpbmdzLmF1dGguc2lnbmF0dXJlLFxuICAgIH0pO1xuICAgIGxldCBzaWduYXR1cmUgPSB0aGlzLnNpZ25SZXF1ZXN0KHtcbiAgICAgIHN0cmluZ1RvU2lnbixcbiAgICAgIHNpZ25hdHVyZTogdGhpcy5zZXR0aW5ncy5hdXRoLnNpZ25hdHVyZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBzaWduYXR1cmU7XG4gIH1cblxuICBnZXRDYW5vbmljYWxSZXF1ZXN0KHsgbWV0aG9kLCBrZXksIHF1ZXJ5c3RyaW5nLCBoZWFkZXJzIH06IHtcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBrZXk6IHN0cmluZyxcbiAgICBxdWVyeXN0cmluZzogVFF1ZXJ5c3RyaW5nLFxuICAgIGhlYWRlcnM6IFRIZWFkZXJzLFxuICB9KTogc3RyaW5nIHtcbiAgICBsZXQgcmVxdWVzdCA9IGBcbiAgICAgICR7bWV0aG9kLnRvVXBwZXJDYXNlKCl9XG4gICAgICAvJHt1dGlscy51cmllbmNvZGUoa2V5KS5yZXBsYWNlKC8lMkYvZywgJy8nKX1cbiAgICBgO1xuICAgIHJlcXVlc3QgPSByZXF1ZXN0LnRyaW0oKS5yZXBsYWNlKC9eXFxzKy9nbSwgJycpICsgJ1xcbic7XG5cbiAgICAvLyBxdWVyeXN0cmluZ1xuICAgIHJlcXVlc3QgKz0gT2JqZWN0LmtleXMoXG4gICAgICBxdWVyeXN0cmluZ1xuICAgICkuc29ydCgpLnJlZHVjZSgoYWNjLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcXVlcnlzdHJpbmdba2V5XTtcbiAgICAgIGlmKGFjYykge1xuICAgICAgICByZXR1cm4gYCR7YWNjfSZhbXA7JHt1dGlscy51cmllbmNvZGUoa2V5KX09JHt2YWx1ZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAke3V0aWxzLnVyaWVuY29kZShrZXkpfT0ke3ZhbHVlfWA7XG4gICAgICB9XG4gICAgfSwgJycpO1xuICAgIHJlcXVlc3QgKz0gJ1xcbic7XG5cbiAgICAvLyBoZWFkZXJzXG4gICAgY29uc3QgaGVhZGVyS2V5cyA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLnNvcnQoKTtcbiAgICByZXF1ZXN0ICs9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBoZWFkZXJzW2tleV07XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY31cXG4ke2tleS50b0xvd2VyQ2FzZSgpfToke3ZhbHVlLnRyaW0oKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAke2tleS50b0xvd2VyQ2FzZSgpfToke3ZhbHVlLnRyaW0oKX1gO1xuICAgICAgfVxuICAgIH0sICcnKTtcbiAgICByZXF1ZXN0ICs9ICdcXG5cXG4nO1xuXG4gICAgLy8gc2lnbmVkIGhlYWRlcnNcbiAgICByZXF1ZXN0ICs9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIHZhbCkgPT4ge1xuICAgICAgaWYoYWNjKSB7XG4gICAgICAgIHJldHVybiBgJHthY2N9OyR7dmFsLnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICB9LCAnJyk7XG5cbiAgICByZXF1ZXN0ICs9ICdcXG4nO1xuXG4gICAgcmVxdWVzdCArPSAnVU5TSUdORUQtUEFZTE9BRCc7XG5cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG4gIGdldFN0cmluZ1RvU2lnbih7XG4gICAgY2Fub25pY2FsUmVxdWVzdCxcbiAgICByZXF1ZXN0RGF0ZSxcbiAgICByZWdpb24sXG4gICAgc2lnbmF0dXJlXG4gIH06IHtcbiAgICBjYW5vbmljYWxSZXF1ZXN0OiBzdHJpbmcsXG4gICAgcmVxdWVzdERhdGU6IERhdGUsXG4gICAgcmVnaW9uOiBzdHJpbmcsXG4gICAgc2lnbmF0dXJlOiBzdHJpbmcsXG4gIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiBgXG4gICAgICBBV1M0LUhNQUMtU0hBMjU2XG4gICAgICAke3V0aWxzLmlzbzg2MDEocmVxdWVzdERhdGUpfVxuICAgICAgJHtcbiAgICAgICAgW1xuICAgICAgICAgIHJlcXVlc3REYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgdXRpbHMuemZpbGwocmVxdWVzdERhdGUuZ2V0VVRDTW9udGgoKSArIDEsIDIpLFxuICAgICAgICAgIHV0aWxzLnpmaWxsKHJlcXVlc3REYXRlLmdldFVUQ0RhdGUoKSwgMiksXG4gICAgICAgICAgJy8nICsgcmVnaW9uICsgJy9zMy9hd3M0X3JlcXVlc3RcXG4nLFxuICAgICAgICBdLmpvaW4oJycpXG4gICAgICB9XG4gICAgICAke1NIQTI1NihjYW5vbmljYWxSZXF1ZXN0LnJlcGxhY2UoLyZhbXA7L2csICcmJykpLnRvU3RyaW5nKCl9XG4gICAgYC50cmltKCkucmVwbGFjZSgvXlxccysvZ20sICcnKTtcbiAgfVxuXG4gIHNpZ25SZXF1ZXN0KHtzdHJpbmdUb1NpZ24sIHNpZ25hdHVyZX06IHtcbiAgICBzdHJpbmdUb1NpZ246IHN0cmluZyxcbiAgICBzaWduYXR1cmU6IHN0cmluZyxcbiAgfSk6IHN0cmluZyB7XG4gICAgdmFyIHJlcyA9IEhtYWNTSEEyNTYoXG4gICAgICBzdHJpbmdUb1NpZ24sXG4gICAgICBIZXgucGFyc2Uoc2lnbmF0dXJlKSxcbiAgICApLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8vIHN0YXRpY1xuICBzdGF0aWMgaW5pdChhdXRoLCBrZXksIGZpbGUsIGNhbGxiYWNrKTogWEhSIHtcbiAgICByZXR1cm4gbmV3IEFtYXpvblhIUih7XG4gICAgICBhdXRoOiBhdXRoLFxuICAgICAga2V5OiBrZXksXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nOiB7XG4gICAgICAgIHVwbG9hZHM6ICcnLFxuICAgICAgfSxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ3gtYW16LWFjbCc6ICdwdWJsaWMtcmVhZCcsXG4gICAgICAgICdDb250ZW50LURpc3Bvc2l0aW9uJzogYGF0dGFjaG1lbnQ7IGZpbGVuYW1lPSR7ZmlsZS5uYW1lfWAsXG4gICAgICAgICdDb250ZW50LVR5cGUnOiBhdXRoLmNvbnRlbnRUeXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgfSxcbiAgICAgIHBheWxvYWQ6ICcnLFxuICAgICAgbG9hZENhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2s6ICgpID0+IHt9LFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHRpbWVvdXRDYWxsYmFjazogKCkgPT4ge30sXG4gICAgfSkuc2VuZCgpO1xuICB9XG5cbiAgc3RhdGljIHVwbG9hZENodW5rKGF1dGgsIGtleSwgdXBsb2FkSWQsIGNodW5rTnVtLFxuICAgICAgICAgICAgICAgICAgICAgY2h1bmssIGNhbGxiYWNrcywgeGhyQ2FsbGJhY2spIHtcbiAgICBsZXQgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2ssIHByb2dyZXNzQ2FsbGJhY2ssIHJlYWR5c3RhdGVDYWxsYmFjaztcbiAgICBpZihjYWxsYmFja3MgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzLmxvYWRDYWxsYmFjaztcbiAgICAgIGVycm9yQ2FsbGJhY2sgPSBjYWxsYmFja3MuZXJyb3JDYWxsYmFjaztcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2sgPSBjYWxsYmFja3MucHJvZ3Jlc3NDYWxsYmFjaztcbiAgICAgIHJlYWR5c3RhdGVDYWxsYmFjayA9IGNhbGxiYWNrcy5zdGF0ZUNoYW5nZUNhbGxiYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayA9IGNhbGxiYWNrcztcbiAgICAgIGVycm9yQ2FsbGJhY2sgPSAoKSA9PiB7fTtcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2sgPSAoKSA9PiB7fTtcbiAgICAgIHJlYWR5c3RhdGVDYWxsYmFjayA9ICgpID0+IHt9O1xuICAgIH1cbiAgICB2YXIgcXVlcnlzdHJpbmcgPSB7XG4gICAgICBwYXJ0TnVtYmVyOiBjaHVua051bSArIDEsXG4gICAgICB1cGxvYWRJZCxcbiAgICB9O1xuICAgIHJldHVybiAobmV3IEFtYXpvblhIUih7XG4gICAgICBhdXRoOiBhdXRoLFxuICAgICAga2V5OiBrZXksXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgcXVlcnlzdHJpbmc6IHF1ZXJ5c3RyaW5nLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBwYXlsb2FkOiBjaHVuayxcbiAgICAgIGxvYWRDYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckNhbGxiYWNrLFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogcHJvZ3Jlc3NDYWxsYmFjayxcbiAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2s6IHJlYWR5c3RhdGVDYWxsYmFjayxcbiAgICAgIHRpbWVvdXRDYWxsYmFjazogKCkgPT4ge30sXG4gICAgfSkpLnNlbmQoeGhyQ2FsbGJhY2spO1xuICB9XG5cbiAgc3RhdGljIGxpc3QoYXV0aCwgZmlsZTogRmlsZSwga2V5OiBzdHJpbmcsIHVwbG9hZElkLCBjaHVua1NpemUsIGNhbGxiYWNrLFxuICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrOiAoKSA9PiB2b2lkLCBtYXJrZXIpIHtcbiAgICB2YXIgcXVlcnlzdHJpbmc6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICAgICB1cGxvYWRJZCxcbiAgICB9O1xuICAgIGlmKG1hcmtlcikge1xuICAgICAgcXVlcnlzdHJpbmdbJ3BhcnQtbnVtYmVy4oCLLW1hcmtlciddID0gbWFya2VyO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEFtYXpvblhIUih7XG4gICAgICBhdXRoLFxuICAgICAga2V5LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBwYXlsb2FkOiAnJyxcbiAgICAgIGVycm9yQ2FsbGJhY2ssXG4gICAgICBwcm9ncmVzc0NhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2s6ICgpID0+IHt9LFxuICAgICAgdGltZW91dENhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIGxvYWRDYWxsYmFjazogZnVuY3Rpb24oZTogVEV2ZW50KSB7XG4gICAgICAgIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgLy8gSS5lLiB0aGUgZmlsZSB3YXMgYWxyZWFkeSB1cGxvYWRlZDsgc3RhcnQgZnJlc2hcbiAgICAgICAgICBpZihlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb2Nlc3MgdGhlIHBhcnRzLCBhbmQgcmV0dXJuIGFuIGFycmF5IG9mXG4gICAgICAgIC8vIFtwYXJ0X251bWJlciwgZXRhZywgc2l6ZV0gdGhyb3VnaCB0aGUgZ2l2ZW4gY2FsbGJhY2tcbiAgICAgICAgdmFyIHhtbCA9IGUudGFyZ2V0LnJlc3BvbnNlWE1MO1xuICAgICAgICB2YXIgcGFydHMgPSBbXTtcbiAgICAgICAgaWYoIXhtbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeG1sUGFydHMgPSB4bWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ1BhcnQnKTtcbiAgICAgICAgdmFyIG51bUNodW5rcyA9IE1hdGguY2VpbChmaWxlLnNpemUgLyBjaHVua1NpemUpO1xuICAgICAgICBsZXQgdGFnQ29udGVudCA9IGZ1bmN0aW9uKHRhZywgcHJvcCk6IHN0cmluZyB7XG4gICAgICAgICAgcmV0dXJuIHRhZy5nZXRFbGVtZW50c0J5VGFnTmFtZShwcm9wKVswXS50ZXh0Q29udGVudDtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHhtbFBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHBhcnROdW1iZXIgPSBwYXJzZUludChcbiAgICAgICAgICAgIHRhZ0NvbnRlbnQoeG1sUGFydHNbaV0sICdQYXJ0TnVtYmVyJyksIDEwXG4gICAgICAgICAgKTtcbiAgICAgICAgICB2YXIgZXRhZyA9IHRhZ0NvbnRlbnQoeG1sUGFydHNbaV0sICdFVGFnJyk7XG4gICAgICAgICAgdmFyIHNpemUgPSBwYXJzZUludChcbiAgICAgICAgICAgIHRhZ0NvbnRlbnQoeG1sUGFydHNbaV0sICdTaXplJyksIDEwXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmKHBhcnROdW1iZXIgIT09IG51bUNodW5rcyAmJiBzaXplICE9PSBjaHVua1NpemUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBDaHVuayBjb3JydXB0ZWRcbiAgICAgICAgICB9IGVsc2UgaWYocGFydE51bWJlciA9PT0gbnVtQ2h1bmtzICYmXG4gICAgICAgICAgICAgIHNpemUgIT09IGZpbGUuc2l6ZSAlIGNodW5rU2l6ZSkge1xuICAgICAgICAgICAgY29udGludWU7IC8vIEZpbmFsIGNodW5rIGNvcnJ1cHRlZFxuICAgICAgICAgIH1cblxuICAgICAgICAgIHBhcnRzLnB1c2goW1xuICAgICAgICAgICAgcGFydE51bWJlcixcbiAgICAgICAgICAgIGV0YWcsXG4gICAgICAgICAgICBzaXplLFxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpc1RydW5jYXRlZCA9IHRhZ0NvbnRlbnQoeG1sLCAnSXNUcnVuY2F0ZWQnKTtcbiAgICAgICAgaWYoaXNUcnVuY2F0ZWQudG9TdHJpbmcoKSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgdmFyIHBhcnRNYXJrZXIgPSB0YWdDb250ZW50KHhtbCwgJ05leHRQYXJ0TnVtYmVyTWFya2VyJyk7XG4gICAgICAgICAgQW1hem9uWEhSLmxpc3QoXG4gICAgICAgICAgICBhdXRoLFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHVwbG9hZElkLFxuICAgICAgICAgICAgY2h1bmtTaXplLFxuICAgICAgICAgICAgZnVuY3Rpb24obmV3UGFydHMpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socGFydHMuY29uY2F0KG5ld1BhcnRzKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayxcbiAgICAgICAgICAgIHBhcnRNYXJrZXJcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNhbGxiYWNrKHBhcnRzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KS5zZW5kKCk7XG4gIH1cblxuICBzdGF0aWMgZmluaXNoKGF1dGgsIGtleSwgdXBsb2FkSWQsIHBhcnRzLCBjYWxsYmFjaykge1xuICAgIHZhciBxdWVyeXN0cmluZyA9IHsgdXBsb2FkSWQgfTtcblxuICAgIC8vIGNvbXBvc2UgdGhlIENvbXBsZXRlTXVsdGlwYXJ0VXBsb2FkIHJlcXVlc3QgZm9yIHB1dHRpbmdcbiAgICAvLyB0aGUgY2h1bmtzIHRvZ2V0aGVyXG4gICAgdmFyIGRhdGFTdHJpbmc6IHN0cmluZyA9ICc8Q29tcGxldGVNdWx0aXBhcnRVcGxvYWQ+JztcblxuICAgIHBhcnRzLm1hcCgoW251bWJlciwgZXRhZ10pID0+IHtcbiAgICAgIGRhdGFTdHJpbmcgKz0gYFxuICAgICAgICA8UGFydD5cbiAgICAgICAgPFBhcnROdW1iZXI+JHtudW1iZXJ9PC9QYXJ0TnVtYmVyPlxuICAgICAgICA8RVRhZz4ke2V0YWd9PC9FVGFnPlxuICAgICAgICA8L1BhcnQ+XG4gICAgICBgLnRyaW0oKTtcbiAgICB9KTtcbiAgICBkYXRhU3RyaW5nICs9ICc8L0NvbXBsZXRlTXVsdGlwYXJ0VXBsb2FkPic7XG5cbiAgICB2YXIgZGF0YTogc3RyaW5nIHwgQmxvYiA9IGRhdGFTdHJpbmc7XG4gICAgLy8gZmlyZWZveCByZXF1aXJlcyBhIHNtYWxsIGhhY2tcbiAgICBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yICYmXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgZGF0YSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aCxcbiAgICAgIGtleSxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgcXVlcnlzdHJpbmcsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIHBheWxvYWQ6IGRhdGEsXG4gICAgICBsb2FkQ2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBwcm9ncmVzc0NhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2s6ICgpID0+IHt9LFxuICAgICAgdGltZW91dENhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICB9KS5zZW5kKCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgQW1hem9uWEhSIH07XG4iLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgY29uc3QgS0IgPSAxMDI0O1xuZXhwb3J0IGNvbnN0IE1CID0gMTAyNCAqIEtCO1xuZXhwb3J0IGNvbnN0IEdCID0gMTAyNCAqIE1CO1xuZXhwb3J0IGNvbnN0IFNFQ09ORFMgPSAxMDAwOyAvLyAxMDAwbXNcbmV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBERUJVRyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIGlmKCEoREVCVUcgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY29uc29sZS5sb2cgIT09ICd1bmRlZmluZWQnKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhcmdzID0gWydbTXVsZVVwbG9hZGVyXSddO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIH1cbiAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufVxuIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgWEhSLCBURXZlbnQgfSBmcm9tICcuL3hocic7XG5pbXBvcnQgeyBBbWF6b25YSFIsIFRBdXRoIH0gZnJvbSAnLi9hbWF6b25YaHInO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBLQiwgTUIsIEdCLCBTRUNPTkRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG50eXBlIFRTZXR0aW5ncyA9IHtcbiAgZmlsZUlucHV0OiBURmlsZUlucHV0O1xuICBmaWxlOiA/RmlsZTtcbiAgYXV0b3N0YXJ0OiBib29sO1xuICBjaHVua1NpemU6IG51bWJlcjtcbiAgbWF4U2l6ZTogbnVtYmVyO1xuICBudW1Xb3JrZXJzOiBudW1iZXI7XG4gIGtleTogc3RyaW5nO1xuICBiYWNrdXBLZXk6IHN0cmluZztcbiAgYnVja2V0OiBzdHJpbmc7XG4gIGFjY2Vzc0tleTogc3RyaW5nO1xuICBjb250ZW50VHlwZTogc3RyaW5nO1xuICBhY2w6IHN0cmluZztcbiAgb25Qcm9ncmVzczogKCkgPT4gdm9pZDtcbiAgb25DaHVua1Byb2dyZXNzOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdDogKCkgPT4gdm9pZDtcbiAgb25FcnJvcjogKCkgPT4gdm9pZDtcbiAgb25Db21wbGV0ZTogKCkgPT4gdm9pZDtcbiAgb25Jbml0OiAoKSA9PiB2b2lkO1xuICBvblN0YXJ0OiAoKSA9PiB2b2lkO1xuICBvbkNodW5rVXBsb2FkZWQ6ICgpID0+IHZvaWQ7XG4gIGFqYXhCYXNlOiBzdHJpbmc7XG4gIGFjY2VwdGVkRXh0ZW5zaW9uczogc3RyaW5nO1xufTtcblxudHlwZSBUUGFydCA9IFtudW1iZXIsIHN0cmluZywgbnVtYmVyXTtcblxudHlwZSBURmlsZUV2ZW50ID0ge1xuICB0YXJnZXQ6IHtcbiAgICBmaWxlczogW0ZpbGVdO1xuICB9O1xufTtcblxudHlwZSBURmlsZUlucHV0ID0ge1xuICBvbmNoYW5nZTogKGU6IFRGaWxlRXZlbnQsIGZvcmNlOiBib29sZWFuKSA9PiA/Ym9vbDtcbiAgdmFsdWU6IHN0cmluZztcbn07XG5cbnR5cGUgVEludGVydmFsID0gbnVtYmVyO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRlciB7XG4gIGlucHV0OiBURmlsZUlucHV0O1xuICBmaWxlOiA/RmlsZTtcbiAgc2V0dGluZ3M6IFRTZXR0aW5ncztcbiAgYXV0aDogVEF1dGg7XG4gIHVwbG9hZElkOiA/c3RyaW5nO1xuICBjaHVua3M6IEFycmF5PGJvb2xlYW4+O1xuICBsb2FkZWRDaHVua3M6IEFycmF5PE51bWJlcj47XG4gIHByb2dyZXNzOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9O1xuICB0b3RhbFByb2dyZXNzOiBudW1iZXI7XG4gIGxvYWRlZENodW5rczogP0FycmF5PG51bWJlcj47XG4gIHVwbG9hZGluZ0NodW5rczogP0FycmF5PG51bWJlcj47XG4gIHN0YXJ0RmlyZWQ6IGJvb2xlYW47XG4gIGludGVydmFsczogeyBba2V5OiBudW1iZXJdOiBUSW50ZXJ2YWwgfTtcbiAgY2h1bmtYaHI6IEFycmF5PFhNTEh0dHBSZXF1ZXN0PjtcbiAgc3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogVFNldHRpbmdzKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCB7fTtcblxuICAgIC8vIE1ha2UgdGhlIGlucHV0IGVsZW1lbnQgYW5vdGhlciBwb3NzaWJsZSBzZXR0aW5nXG4gICAgLy8gaW4gc29tZSBjYXNlcyAoZS5nLiBkcmFnICYgZHJvcCkgdGhlcmUgaXMgbm8gaW5wdXQgZWxlbWVudFxuICAgIHRoaXMuaW5wdXQgPSBzZXR0aW5ncy5maWxlSW5wdXQ7XG4gICAgdGhpcy5maWxlICA9IHNldHRpbmdzLmZpbGU7XG5cbiAgICAvLyBUaGUgZmlsZSBzdGFydHMgYXV0b21hdGljYWxseSBieSBkZWZhdWx0OyB5b3UgaGF2ZSB0byBzZXRcbiAgICAvLyBhdXRvc3RhcnQ6IGZhbHNlIGV4cGxpY2l0bHkgaWYgeW91IHdhbnQgdG8gdXNlIGEgc3RhcnQgYnV0dG9uXG4gICAgLy8gaWYgYXV0b3N0YXJ0IGlzIGZhbHNlLCB5b3UgY2FuIHVzZSB0aGUgVXBsb2FkZXIucHJvdG90eXBlLnN0YXJ0KClcbiAgICAvLyBmdW5jdGlvbi4gTm90ZSB0aGF0IHRoZSB1c2VyIGhhcyB0byBzZWxlY3QgYSBmaWxlIGZpcnN0XG4gICAgc2V0dGluZ3MuYXV0b3N0YXJ0ID0gKCdhdXRvc3RhcnQnIGluIHNldHRpbmdzID8gc2V0dGluZ3MuYXV0b3N0YXJ0IDogdHJ1ZSk7XG5cbiAgICAvLyBOT1RFOiBGb3IgQW1hem9uIFMzLCB0aGUgbWluaW11bSBjaHVuayBzaXplIGlzIDVNQlxuICAgIC8vIHdlIGFyZSB1c2luZyA2IGZvciBzYWZlIG1lYXN1cmUuIE5vdGUgdGhhdCB0aGUgbWF4aW11bSBudW1iZXIgb2YgY2h1bmtzXG4gICAgLy8gaXMgMTAsMDAwLCBzbyBmb3IgZXhhbXBsZSwgaWYgdGhlIGNodW5rIHNpemUgaXMgNk1CLCB0aGUgbWF4aW11bVxuICAgIC8vIHBvc3NpYmxlIGZpbGUgc2l6ZSBpcyA2TUIgKiAxMCwwMDAgPSB+NThHQlxuICAgIHNldHRpbmdzLmNodW5rU2l6ZSA9IHNldHRpbmdzLmNodW5rU2l6ZSB8fCAoNiAqIE1CKTsgLy8gZGVmYXVsdCA2TUJcbiAgICBzZXR0aW5ncy5tYXhTaXplID0gc2V0dGluZ3MubWF4U2l6ZSB8fCA1ICogR0I7IC8vIDVHQlxuXG4gICAgLy8gVGhlIG51bWJlciBvZiBwYXJhbGxlbCB1cGxvYWQgeGhyJ3NcbiAgICBzZXR0aW5ncy5udW1Xb3JrZXJzID0gc2V0dGluZ3MubnVtV29ya2VycyB8fCAxO1xuXG4gICAgLy8gVGhlIFMzIG9iamVjdCBrZXk7IEkgcmVjb21tZW5kIHRvIGdlbmVyYXRlIHRoaXMgZHluYW1pY2FsbHkgKGUuZy5cbiAgICAvLyBhIHJhbmRvbSBzdHJpbmcpIHRvIGF2b2lkIHVud2FudGVkIG92ZXJ3cml0ZXMuXG4gICAgc2V0dGluZ3Mua2V5ID0gc2V0dGluZ3Mua2V5IHx8ICd0aGVfa2V5JztcblxuICAgIC8vIFRoZSBBbWF6b24gUzMgYnVja2V0IHdoZXJlIHlvdSdsbCBzdG9yZSB0aGUgdXBsb2Fkc1xuICAgIHNldHRpbmdzLmJ1Y2tldCA9IHNldHRpbmdzLmJ1Y2tldDtcblxuICAgIC8vIFRoZSBBbWF6b24gUzMgYWNjZXNzIGtleS4gRE8gTk9UIGdpdmUgdGhlIEFXUyBTZWNyZXQgY29kZSFcbiAgICBzZXR0aW5ncy5hY2Nlc3NLZXkgPSBzZXR0aW5ncy5hY2Nlc3NLZXk7XG5cbiAgICAvLyBUaGUgTWltZS1UeXBlIG9mIHRoZSBjb250ZW50LiBZb3UgbXVzdCBtYXRjaCB0aGlzIHdpdGggdGhlIGJhY2tlbmQgdmFsdWVcbiAgICAvLyBvciB5b3UnbGwgZ2V0IGFuIEludmFsaWQgU2lnbmF0dXJlIGVycm9yLiBJZiB1bnN1cmUgYWJvdXQgdGhlXG4gICAgLy8gbWltZSB0eXBlLCB1c2UgYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgc2V0dGluZ3MuY29udGVudFR5cGUgPSBzZXR0aW5ncy5jb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcblxuXG4gICAgLy8gQUNMIGNhbiBiZSBzZXQgdG86XG4gICAgLy8gcHJpdmF0ZVxuICAgIC8vIHB1YmxpYy1yZWFkICgqIGRlZmF1bHQpXG4gICAgLy8gcHVibGljLXJlYWQtd3JpdGVcbiAgICAvLyBhdXRoZW50aWNhdGVkLXJlYWRcbiAgICAvLyBidWNrZXQtb3duZXItcmVhZFxuICAgIC8vIGJ1Y2tldC1vd25lci1mdWxsLWNvbnRyb2xcbiAgICAvLyBsb2ctZGVsaXZlcnktd3JpdGVcbiAgICBzZXR0aW5ncy5hY2wgPSBzZXR0aW5ncy5hY2wgfHwgJ3B1YmxpYy1yZWFkJztcblxuICAgIC8vIFZhcmlvdXMgY2FsbGJhY2tzXG4gICAgc2V0dGluZ3Mub25Qcm9ncmVzcyA9IHNldHRpbmdzLm9uUHJvZ3Jlc3MgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MgPSBzZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uU2VsZWN0ID0gc2V0dGluZ3Mub25TZWxlY3QgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25FcnJvciA9IHNldHRpbmdzLm9uRXJyb3IgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNvbXBsZXRlID0gc2V0dGluZ3Mub25Db21wbGV0ZSAgICAgICAgICAgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uSW5pdCA9IHNldHRpbmdzLm9uSW5pdCAgICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25TdGFydCA9IHNldHRpbmdzLm9uU3RhcnQgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNodW5rVXBsb2FkZWQgPSBzZXR0aW5ncy5vbkNodW5rVXBsb2FkZWQgICB8fCBmdW5jdGlvbigpIHt9O1xuXG4gICAgLy8gVGhlIGxvY2F0aW9uIHByZWZpeCBvZiB0aGUgdXBsb2FkZXIncyBiYWNrZW5kXG4gICAgc2V0dGluZ3MuYWpheEJhc2UgPSBzZXR0aW5ncy5hamF4QmFzZSB8fCAnL3VwbG9hZC1iYWNrZW5kJztcblxuICAgIC8vIEV4dGVuc2lvbnMgY29tbWEgZGVsaW1pdGVkIHdpdGhvdXQgcGVyaW9kIChqcGcsanBlZyxwbmcsZ2lmKVxuICAgIHNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucyA9IHNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucyB8fCAnJztcblxuICAgIC8vIFNldCB0aGUgdmFsdWVzIHNvIHRoYXQgdGhleSBjYW4gYmUgdXNlZCBldmVyeXdoZXJlLCBhcyBuZWVkZWRcbiAgICBzZWxmLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICAvLyBUaGUgXCJ3YWl0aW5nXCIgc3RhdGUgbWVhbnMgdGhlIHVwbG9hZGVyIGlzIHdhaXRpbmcgZm9yIHRoZSB1c2VyXG4gICAgLy8gdG8gc2VsZWN0IGEgZmlsZVxuICAgIHNlbGYuc2V0U3RhdGUoJ3dhaXRpbmcnKTtcblxuICAgIGlmKHNlbGYuaW5wdXQpIHtcbiAgICAgIHNlbGYuaW5wdXQub25jaGFuZ2UgPSBmdW5jdGlvbihlLCBmb3JjZSkge1xuICAgICAgICBpZighc2VsZi5zZXR0aW5ncy5hdXRvc3RhcnQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGUgYG9uY2hhbmdlYCBldmVudCBtYXkgYmUgdHJpZ2dlcmVkIG11bHRpcGxlIHRpbWVzLCBzbyB3ZVxuICAgICAgICAvLyBtdXN0IGVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBvbmx5IGV4ZWN1dGVkIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIHVwbG9hZGVyIGRvZXNuJ3Qgc3VwcG9ydCBtdWx0aXBsZSB1cGxvYWRzIGF0IHRoaXMgdGltZSxcbiAgICAgICAgLy8gc28gd2UgZ2V0IHRoZSBmaXJzdCBmaWxlXG4gICAgICAgIHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgIHNlbGYudXBsb2FkRmlsZShmaWxlLCBmb3JjZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIHRoZSBpbml0IGV2ZW50IGNhbGxiYWNrXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Jbml0LmFwcGx5KHNlbGYpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZih0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZmlsZXMgJiYgdGhpcy5pbnB1dC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlKHRoaXMuaW5wdXQuZmlsZXNbMF0sIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoJ05vIGZpbGUgc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cblxuICB1cGxvYWRGaWxlKGZpbGU6IEZpbGUsIGZvcmNlOiBib29sZWFuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gVGhlIGBvbmNoYW5nZWAgZXZlbnQgbWF5IGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcywgc28gd2VcbiAgICAvLyBtdXN0IGVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBvbmx5IGV4ZWN1dGVkIHRoZSBmaXJzdCB0aW1lXG4gICAgLy8gYWxzbyBtYWtlIHN1cmUgdGhlIGZpbGUgaXMgbm90IGFscmVhZHkgc2V0LlxuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoZmlsZSkge1xuICAgICAgc2VsZi5maWxlID0gZmlsZTtcbiAgICB9XG5cbiAgICBpZighc2VsZi5maWxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gV2UgdXNlIHRoZSBsYXN0TW9kaWZpZWREYXRlLCB0aGUgZmlsZSBuYW1lIGFuZCBzaXplIHRvIHVuaXF1ZWx5XG4gICAgLy8gaWRlbnRpZnkgYSBmaWxlLiBUaGVyZSBtYXkgYmUgZmFsc2UgcG9zaXRpdmVzIGFuZCBuZWdhdGl2ZXMsXG4gICAgLy8gYnV0IHRoZSBjaGFuY2UgZm9yIGEgZmFsc2UgcG9zaXRpdmUgaXMgYmFzaWNhbGx5IHplcm9cbiAgICAvLyBzb21lIGJyb3dzZXJzIGRvbid0IHJlcG9ydCB0aGUgbGFzdCBtb2RpZmllZCBkYXRlLCBzbyB3ZSBkZWZhdWx0XG4gICAgLy8gdG8gYSBibGFuayBkYXRlXG4gICAgaWYoc2VsZi5maWxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZWxmLmZpbGUubGFzdE1vZGlmaWVkRGF0ZSA9IHNlbGYuZmlsZS5sYXN0TW9kaWZpZWREYXRlIHx8IG5ldyBEYXRlKDApO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoc2VsZi5maWxlLnNpemUgPiBzZWxmLnNldHRpbmdzLm1heFNpemUpIHtcbiAgICAgIGFsZXJ0KFtcbiAgICAgICAgJ1RoZSBtYXhpbXVtIGFsbG93ZWQgZmlsZSBzaXplIGlzICcsXG4gICAgICAgIChzZWxmLnNldHRpbmdzLm1heFNpemUgLyBHQiksXG4gICAgICAgICdHQi4gUGxlYXNlIHNlbGVjdCBhbm90aGVyIGZpbGUuJyxcbiAgICAgIF0uam9pbignJykpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBhY2NlcHRlZCBleHRlbnNpb25zLCBpZiBhcHBsaWNhYmxlXG4gICAgaWYoc2VsZi5zZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMpIHtcbiAgICAgIC8vIEdldCB0aGUgZmlsZSBleHRlbnNpb25cbiAgICAgIHZhciBmaWxlRXh0ZW5zaW9uID0gZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCk7XG5cbiAgICAgIC8vIFNwbGl0IHRoZSBnaXZlbiBleHRlbnNpb25zIGludG8gYW4gYXJyYXlcbiAgICAgIHZhciBleHRlbnNpb25zQXJyYXkgPSBzZWxmLnNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucy5zcGxpdCgnLCcpO1xuXG4gICAgICAvLyBBbmQgbWF0Y2ggdGhlIGV4dGVuc2lvbiBhZ2FpbnN0IHRoZSBnaXZlbiBleHRlbnNpb24gbGlzdFxuICAgICAgdmFyIGZpbGVBY2NlcHRlZCA9IGZhbHNlO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGV4dGVuc2lvbnNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihmaWxlRXh0ZW5zaW9uID09PSBleHRlbnNpb25zQXJyYXlbaV0pIHtcbiAgICAgICAgICBmaWxlQWNjZXB0ZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBmaWxlIGlzIG5vdCBhY2NlcHRlZCwgbm90aWZ5IHRoZSB1c2VyIGFuZCByZXR1cm5cbiAgICAgIGlmKCFmaWxlQWNjZXB0ZWQpIHtcbiAgICAgICAgYWxlcnQoW1xuICAgICAgICAgICdUaGlzIGZpbGUgZm9ybWF0IGlzIG5vdCBhY2NlcHRlZC4gJyxcbiAgICAgICAgICAnUGxlYXNlIHVzZSBhIGZpbGUgd2l0aCBhbiBleHRlbnNpb24gbGlrZSAnLFxuICAgICAgICAgIHNlbGYuc2V0dGluZ3MuYWNjZXB0ZWRFeHRlbnNpb25zLFxuICAgICAgICBdLmpvaW4oJycpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGZpbGUgdXBsb2FkXG4gICAgLy8gYWxzbywgYWxsb3cgdGhlIGxpYnJhcnkgdXNlciB0byBwcm9ncmFtYXRpY2FsbHkgY2FuY2VsIHRoZSB1cGxvYWQgaWYsXG4gICAgLy8gZm9yIGV4YW1wbGUsIHRoZSBmaWxlIGlzIHRvbyBsYXJnZVxuICAgIGNvbnN0IHJlc3VsdCA9IHNlbGYuc2V0dGluZ3Mub25TZWxlY3QuY2FsbCh0aGlzLCBmaWxlKTtcbiAgICBpZihyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICBzZWxmLmZpbGUgPSBudWxsO1xuICAgICAgc2VsZi5pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBhcmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLnNldHRpbmdzLmV4dHJhUGFyYW1zIHx8IHt9LCB7XG4gICAgICBmaWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgZmlsZXNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWREYXRlLnZhbHVlT2YoKSxcbiAgICB9KTtcblxuICAgIGlmKGZvcmNlKSB7XG4gICAgICBhcmdzLmZvcmNlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIHNpZ25pbmcga2V5LiBJdCB3aWxsIGFsc28gcmV0dXJuXG4gICAgLy8gYSBmaWxlIGtleSArIHVwbG9hZElkIHBhaXIgaWYgdGhlIHNlbGVjdGVkIGZpbGVcbiAgICAvLyBpcyBhbHJlYWR5IHVwbG9hZGluZy4gSXQgYWxzbyByZXR1cm5zIGFcbiAgICAvLyBiYWNrdXBfa2V5IGluIGNhc2UgdGhhdCBmaWxlIHVwbG9hZCBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAvLyBUaGUgc2lnbmluZyBrZXkgaXMgdmFsaWQgZm9yIDcgZGF5c1xuICAgIFhIUih7XG4gICAgICB1cmw6IHNlbGYuc2V0dGluZ3MuYWpheEJhc2UgKyAnL3NpZ25pbmdfa2V5LycsXG4gICAgICBleHRyYVBhcmFtczogYXJncyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGxvYWRDYWxsYmFjazogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UoZS50YXJnZXQucmVzcG9uc2VUZXh0KTtcbiAgICAgICAganNvbi5kYXRlID0gbmV3IERhdGUoanNvbi5kYXRlKTtcbiAgICAgICAgc2VsZi5hdXRoID0ganNvbjtcbiAgICAgICAgc2VsZi51cGxvYWRJZCA9IGpzb24udXBsb2FkSWQ7XG4gICAgICAgIHNlbGYuY2h1bmtzID0ganNvbi5jaHVua3M7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mua2V5ID0ganNvbi5rZXkgfHwgc2VsZi5zZXR0aW5ncy5rZXk7XG4gICAgICAgIHNlbGYuc2V0dGluZ3MuYmFja3VwS2V5ID0gc2VsZi5zZXR0aW5ncy5rZXk7XG5cbiAgICAgICAgaWYoIXNlbGYudXBsb2FkSWQpIHtcbiAgICAgICAgICBBbWF6b25YSFIuaW5pdChqc29uLCBzZWxmLnNldHRpbmdzLmtleSwgZmlsZSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHhtbCA9IGUudGFyZ2V0LnJlc3BvbnNlWE1MO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGdpdmVuIHVwbG9hZCBpZFxuICAgICAgICAgICAgc2VsZi51cGxvYWRJZCA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVXBsb2FkSWQnKVswXS50ZXh0Q29udGVudDtcblxuICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlc3VtZSBhIHByZXZpdXMgdXBsb2FkXG4gICAgICAgICAgaWYoIWZvcmNlICYmIHNlbGYuZmlsZSkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSB1cGxvYWRlZCBwYXJ0cyBmcm9tIFMzXG4gICAgICAgICAgICBBbWF6b25YSFIubGlzdChcbiAgICAgICAgICAgICAgc2VsZi5hdXRoLCBzZWxmLmZpbGUsIHNlbGYuc2V0dGluZ3Mua2V5LFxuICAgICAgICAgICAgICBzZWxmLnVwbG9hZElkLCBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSwgZnVuY3Rpb24ocGFydHMpIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBjaHVuayA9IHBhcnRzW2ldWzBdIC0gMTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UHJvZ3Jlc3MoY2h1bmssIHNlbGYuZ2V0Q2h1bmtTaXplKGNodW5rKSk7XG4gICAgICAgICAgICAgICAgICBzZWxmLnNldENodW5rRmluaXNoZWQoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuaywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRGaWxlKCk7XG4gICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIElmIGl0IGZhaWxzLCByZS1pbml0aWF0ZSB0aGUgdXBsb2FkLCBhbmQgZm9yY2VcbiAgICAgICAgICAgICAgICAvLyBpdCB0byBzdGFydCBhIG5ldyB1cGxvYWRcbiAgICAgICAgICAgICAgICBzZWxmLnVwbG9hZElkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlZENodW5rcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5wcm9ncmVzcyA9IHt9O1xuICAgICAgICAgICAgICAgIHNlbGYudG90YWxQcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkZWRDaHVua3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nQ2h1bmtzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLmNodW5rcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mua2V5ID0gc2VsZi5zZXR0aW5ncy5iYWNrdXBLZXk7XG4gICAgICAgICAgICAgICAgc2VsZi51cGxvYWRGaWxlKGZpbGUsIHRydWUpOyAvLyBGb3JjZSByZWxvYWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZm9yY2Utc3RhcnQgdGhlIHVwbG9hZFxuICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRGaWxlKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFdlIGNhbid0IHN0YXJ0IHRoZSB1cGxvYWQgaWYgd2UgYXJlIHdhaXRpbmcgZm9yIHVzZXIgaW5wdXRcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICd3YWl0aW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBmaWxlID0gc2VsZi5maWxlO1xuXG4gICAgaWYoZmlsZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHdlIG9ubHkgdHJpZ2dlciB0aGUgc3RhcnQgZXZlbnQgb25jZVxuICAgIGlmKCFzZWxmLl9zdGFydEZpcmVkKSB7XG4gICAgICAvLyBUcmlnZ2VyIHRoZSBzdGFydCBldmVudCBjYWxsYmFja1xuICAgICAgc2VsZi5zZXR0aW5ncy5vblN0YXJ0LmNhbGwoc2VsZiwgc2VsZi5maWxlKTtcblxuICAgICAgLy8gQW5kIGFsc28gdHJpZ2dlciBhIHByb2dyZXNzIGNhbGxiYWNrIHdpdGggMCVcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKHNlbGYsIDAsIGZpbGUuc2l6ZSk7XG4gICAgICBzZWxmLnN0YXJ0RmlyZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZyb20gbm93IG9uLCB3ZSBhcmUgXCJwcm9jZXNzaW5nXCIgdGhlIGZpbGUgdXBsb2FkXG4gICAgc2VsZi5zZXRTdGF0ZSgncHJvY2Vzc2luZycpO1xuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBtYXkgaGF2ZSBzb21lIGNodW5rcyBhbHJlYWR5IHVwbG9hZGVkLFxuICAgIC8vIFNvIHdlIG1heSB0cmlnZ2VyIGEgcHJvZ3Jlc3MgY2FsbGJhY2sgd2l0aCB0aGUgcmVwb3J0ZWQgcHJvZ3Jlc3NcbiAgICBzZWxmLnNldHRpbmdzLm9uUHJvZ3Jlc3MuY2FsbChcbiAgICAgIHNlbGYsIHNlbGYuZ2V0VG90YWxQcm9ncmVzcygpLCBmaWxlLnNpemVcbiAgICApO1xuXG4gICAgLy8gR2V0IHRoZSBuZXh0IGNodW5rXG4gICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG5cbiAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAvLyBBbmQgc3RhcnQgdXBsb2FkaW5nIGl0XG4gICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgfSBlbHNlIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgLy8gSWYgd2UgZmluaXNoZWQsIHRyaWdnZXIgdGhlIHVwbG9hZCBmaW5pc2ggc2VxdWVuY2VcbiAgICAgIGxvZygnQWxsIGRvbmU7IGZpbmlzaCB1cGxvYWQnKTtcbiAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0dGluZ3MubnVtV29ya2VycyAtIDE7IGkrKykge1xuICAgICAgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkQ2h1bmsoY2h1bms6IG51bWJlcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSdyZSBpbiBwcm9jZXNzaW5nIG1vZGVcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgbG9nKCdOT1QgcHJvY2Vzc2luZzsgcmV0dXJuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWxzbyBtYWtlIHN1cmUgd2UncmUgbm90IGFscmVhZHkgdXBsb2FkaW5nIHRoaXMgY2h1bmtcbiAgICBpZihzZWxmLmdldENodW5rVXBsb2FkaW5nKGNodW5rKSkge1xuICAgICAgbG9nKCdBbHJlYWR5IFVwbG9hZGluZycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKHNlbGYuZ2V0TmV4dENodW5rKCkpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTWFyayB0aGlzIGNodW5rIGFzIHVwbG9hZGluZ1xuICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuayk7XG4gICAgfVxuICAgIGxvZyhgVXBsb2FkaW5nIENodW5rOiAke2NodW5rfWApO1xuXG4gICAgLy8gSWYgd2UgYWxyZWFkeSB1cGxvYWRlZCB0aGlzIGNodW5rLCBnZXQgdG8gdGhlIG5leHQgb25lXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbmV4dCBjaHVuaywgZmluaXNoIHRoZSB1cGxvYWRcbiAgICBpZihzZWxmLmlzQ2h1bmtMb2FkZWQoY2h1bmspKSB7XG4gICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgbG9nKCdObyBuZXh0IGNodW5rOyBmaW5pc2ggdXBsb2FkJyk7XG4gICAgICAgICAgc2VsZi5maW5pc2hVcGxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZTtcblxuICAgIC8vIEdldCB0aGUgc3RhcnQgYW5kIGVuZCBieXRlcyBmb3IgdGhlIG5lZWRlZCBjaHVua1xuICAgIHZhciBzdGFydCA9IGNodW5rICogbGVuZ3RoO1xuICAgIHZhciBmaWxlID0gc2VsZi5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbmQgPSBNYXRoLm1pbihzdGFydCArIGxlbmd0aCwgZmlsZS5zaXplKTtcblxuICAgIC8vIFdlIG5lZWQgdGhlIGxhc3QgcHJvZ3Jlc3MgdGltZSBpbiBvcmRlciB0byBkZXRlY3QgaGFuZ2luZ1xuICAgIC8vIHVwbG9hZHNcbiAgICB2YXIgbGFzdFByb2dyZXNzVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgc2VsZi5pbnRlcnZhbHMgPSBzZWxmLmludGVydmFscyB8fCB7fTtcblxuICAgIHZhciBlcnJvckhhbmRsZWQgPSBmYWxzZTtcbiAgICB2YXIgZXJyb3JIYW5kbGVyOiAoKSA9PiB2b2lkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXJyb3JBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgeGhyID0gdGhpcztcbiAgICAgIC8vIFRoZSB1cGxvYWQgbWF5IGhhdmUgZmluaXNoZWQsIHNvIGNoZWNrIGZvciB0aGF0XG4gICAgICBzZWxmLmNoZWNrQWxyZWFkeVVwbG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighZmlsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBhbHJlYWR5IHVwbG9hZGVkXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGVkJyk7XG5cbiAgICAgICAgLy8gVE9ETzogd2hhdCBpcyB0aGlzP1xuICAgICAgICAvLyBzZWxmLm5vdGlmeVVwbG9hZEZpbmlzaGVkKCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBhIGZpbmFsIHByb2dyZXNzIGV2ZW50IGNhbGxiYWNrLCB3aXRoIDEwMCVcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICAgICAgc2VsZixcbiAgICAgICAgICBmaWxlLnNpemUsXG4gICAgICAgICAgZmlsZS5zaXplXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQWxzbyB0cmlnZ2VyIHRoZSBjb21wbGV0ZSBldmVudCBjYWxsYmFja1xuICAgICAgICBzZWxmLnNldHRpbmdzLm9uQ29tcGxldGUuY2FsbChzZWxmKTtcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXZSBoYXZlIGEgZ2VudWluZSBlcnJvclxuICAgICAgICBsb2coYEVycm9yOiAke2Vycm9yQXJndW1lbnRzfWApO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBkb24ndCBoYW5kbGUgdGhlIHNhbWUgZXJyb3IgbW9yZSB0aGFuIG9uY2VcbiAgICAgICAgaWYoZXJyb3JIYW5kbGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVycm9ySGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gYWJvcnQgdGhlIGNodW5rIHVwbG9hZFxuICAgICAgICBzZWxmLnNldENodW5rVXBsb2FkaW5nKGNodW5rLCBmYWxzZSk7XG4gICAgICAgIHNlbGYuc2V0Q2h1bmtGaW5pc2hlZChjaHVuaywgZmFsc2UpO1xuICAgICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCAwKTtcbiAgICAgICAgbG9nKCdBYm9ydCcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBsb2coZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2coYFJldHJ5IGNodW5rOiAke2NodW5rfWApO1xuXG4gICAgICAgIC8vIENsZWFyIHRoZSB3YXRjaGVyIGludGVydmFsXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5pbnRlcnZhbHNbY2h1bmtdKTtcblxuICAgICAgICAvLyBSZS10cnkgdGhlIHVwbG9hZFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSA9PT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgICAgICAvLyBBbmQgcHJvY2VlZFxuICAgICAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKGNodW5rKTtcbiAgICAgICAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gVGhlIFwicmVhZHlzdGF0ZWNoYW5nZVwiIGhhbmRsZXJcbiAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIFdlIGNhcmUgYWJvdXQgdGhlIFwiZG9uZVwiIGV2ZW50IHRyaWdnZXJlZCB3aGlsZSBwcm9jZXNzaW5nXG4gICAgICBpZihlLnRhcmdldC5yZWFkeVN0YXRlICE9PSB0aGlzLkRPTkUgfHxcbiAgICAgICAgICBzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgICBsb2coZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgZG9uJ3QgcmVjZWl2ZSBhIDJYWCByZXNwb25zZSwgdHJpZ2dlciBhbiBlcnJvclxuICAgICAgaWYocGFyc2VJbnQoZS50YXJnZXQuc3RhdHVzKSAvIDEwMCAhPT0gMikge1xuICAgICAgICBpZih0eXBlb2YgZXJyb3JIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlci5hcHBseSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBrbm93IHRoYXQgdGhpcyBjaHVuayBmaW5pc2hlZCB1cGxvYWRpbmdcbiAgICAgIGxvZyhgQ2h1bmsgdXBsb2FkZWQ6ICR7Y2h1bmt9YCk7XG5cbiAgICAgIC8vIE5vdGlmeSB0aGUgc2VydmVyIG9mIHRoZSB1cGxvYWRlZCBjaHVua1xuICAgICAgc2VsZi5ub3RpZnlDaHVua1VwbG9hZGVkKGNodW5rKTtcblxuICAgICAgLy8gQW5kIGFsc28gdHJpZ2dlciB0aGUgY2h1bmtfdXBsb2FkZWQgY2FsbGJhY2tcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkLmNhbGwoc2VsZiwgY2h1bmspO1xuXG4gICAgICAvLyBDYW5jZWwgdGhlIHhociB3YXRjaGVyIGludGVydmFsXG4gICAgICBjbGVhckludGVydmFsKHNlbGYuaW50ZXJ2YWxzW2NodW5rXSk7XG5cbiAgICAgIC8vIE1hcmsgdGhlIGNodW5rIGFzIGZpbmlzaGVkXG4gICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCBzZWxmLmdldENodW5rU2l6ZShjaHVuaykpO1xuICAgICAgc2VsZi5zZXRDaHVua0ZpbmlzaGVkKGNodW5rKTtcbiAgICAgIHNlbGYuc2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmssIGZhbHNlKTtcblxuICAgICAgLy8gR2V0IG5leHQgY2h1bms7IGlmIHdlJ3JlIG91dCBvZiBjaHVua3MsXG4gICAgICAvLyBmaW5pc2ggdGhlIHVwbG9hZFxuICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAgIHNlbGYudXBsb2FkQ2h1bmsobmV4dENodW5rKTtcbiAgICAgIH0gZWxzZSBpZihzZWxmLnVwbG9hZEZpbmlzaGVkKCkpIHtcbiAgICAgICAgbG9nKCdEb25lJyk7XG4gICAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgICAgIGlmKGNodW5rICE9PSAtMSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKGNodW5rKTtcbiAgICAgICAgICB9IGVsc2UgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gVGhlIHVwbG9hZCBwcm9ncmVzcyBoYW5kbGVyXG4gICAgdmFyIHByb2dyZXNzSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIFNldCB0aGUgaW50ZXJuYWwgY2h1bmsncyBwcm9ncmVzcyB2YWx1ZSB0byB0aGUgcmVwb3J0ZWQgYW1vdW50XG4gICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCBlLmxvYWRlZCk7XG4gICAgICB2YXIgZmlsZSA9IHNlbGYuZmlsZTtcbiAgICAgIGlmKCFmaWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVHJpZ2dlciB0aGUgcHJvZ3Jlc3MgZXZlbnQgY2FsbGJhY2tcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgICBzZWxmLCBzZWxmLmdldFRvdGFsUHJvZ3Jlc3MoKSwgZmlsZS5zaXplXG4gICAgICApO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIGxhc3RfcHJvZ3Jlc3NfdGltZSBmb3IgdGhlIHdhdGNoZXIgaW50ZXJ2YWxcbiAgICAgIGxhc3RQcm9ncmVzc1RpbWUgPSBuZXcgRGF0ZSgpO1xuICAgIH07XG5cbiAgICBBbWF6b25YSFIudXBsb2FkQ2h1bmsoXG4gICAgICBzZWxmLmF1dGgsIHNlbGYuc2V0dGluZ3Mua2V5LCBzZWxmLnVwbG9hZElkLFxuICAgICAgY2h1bmssIGZpbGUuc2xpY2Uoc3RhcnQsIGVuZCksIHtcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogcHJvZ3Jlc3NIYW5kbGVyLFxuICAgICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiBoYW5kbGVyLFxuICAgICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckhhbmRsZXIsXG4gICAgICAgIHRpbWVvdXRDYWxsYmFjazogZXJyb3JIYW5kbGVyLFxuICAgICAgfSwgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIHNlbGYuY2h1bmtYaHIgPSBzZWxmLmNodW5rWGhyIHx8IFtdO1xuICAgICAgICBzZWxmLmNodW5rWGhyLnB1c2goeGhyKTtcblxuICAgICAgICAvLyBUaGUgd2F0Y2hlciBpbnRlcnZhbDsgaXQgY2FuY2VscyB0aGUgeGhyIGlmIGl0IHRpbWVzIG91dFxuICAgICAgICBzZWxmLmludGVydmFsc1tjaHVua10gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZihsYXN0UHJvZ3Jlc3NUaW1lICYmXG4gICAgICAgICAgICAgIChuZXcgRGF0ZSgpIC0gbGFzdFByb2dyZXNzVGltZSkgPiAxNSAqIFNFQ09ORFMpIHsgLy8gMTVzXG4gICAgICAgICAgICBsb2coJ0NodW5rIEZhaWxlZDsgcmV0cnknKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5pbnRlcnZhbHNbY2h1bmtdKTtcbiAgICAgICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSA9PT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICBlcnJvckhhbmRsZXIuY2FsbCh4aHIpO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jaHVua1hoclt0aGlzLl9jaHVua1hoci5pbmRleE9mKHhocildXG4gICAgICAgICAgICAgICAgICAgICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmNodW5rWGhyW3RoaXMuX2NodW5rWGhyLmluZGV4T2YoeGhyKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIDQgKiBTRUNPTkRTKTsgLy8gRXZlcnkgNHNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZmluaXNoVXBsb2FkKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZmlsZSA9IHNlbGYuZmlsZTtcbiAgICBpZighZmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSBpdCdzIG5vdCB0cmlnZ2VyZWQgd2hlbiBub3QgcHJvY2Vzc2luZyAoZS5nLiBtdWx0aXBsZSB0aW1lcylcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoYW5nZSB0aGUgdXBsb2FkJ3Mgc3RhdGVcbiAgICBzZWxmLnNldFN0YXRlKCdmaW5pc2hpbmcnKTtcblxuICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgc2VsZiwgZmlsZS5zaXplLCBmaWxlLnNpemVcbiAgICApOyAvLyAxMDAlIGRvbmUuXG5cblxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oZTogVEV2ZW50KSB7XG4gICAgICBpZighZmlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBJLmUuIGlmIGl0J3MgYSAyWFggcmVzcG9uc2VcbiAgICAgIGlmKE1hdGguZmxvb3IoZS50YXJnZXQuc3RhdHVzIC8gMTAwKSA9PT0gMikge1xuICAgICAgICBsb2coJ0ZpbmlzaGVkIGZpbGUuJyk7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGVkJyk7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgICAgIHNlbGYsIGZpbGUuc2l6ZSwgZmlsZS5zaXplXG4gICAgICAgICk7IC8vIEl0J3MgMTAwJSBkb25lXG5cbiAgICAgICAgLy8gVHJpZ2dlciB0aGUgY29tcGxldGUgZXZlbnQgY2FsbGJhY2tcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNvbXBsZXRlLmNhbGwoc2VsZik7XG4gICAgICB9IGVsc2UgaWYoXG4gICAgICAgIGUudGFyZ2V0LnN0YXR1cyA9PT0gNDAwICYmXG4gICAgICAgIGUudGFyZ2V0LnJlc3BvbnNlVGV4dCAmJlxuICAgICAgICBlLnRhcmdldC5yZXNwb25zZVRleHQuaW5kZXhPZignRW50aXR5VG9vU21hbGwnKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICAvLyBBbiBcIkVudGl0eVRvb1NtYWxsXCIgZXJyb3IgbWVhbnMgdGhhdCB3ZSBtaXNzZWQgYSBjaHVua1xuICAgICAgICBBbWF6b25YSFIubGlzdChcbiAgICAgICAgICBzZWxmLmF1dGgsXG4gICAgICAgICAgZmlsZSxcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLmtleSxcbiAgICAgICAgICBzZWxmLnVwbG9hZElkLFxuICAgICAgICAgIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplLFxuICAgICAgICAgIChwYXJ0cykgPT4ge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVDaHVua3MocGFydHMpO1xuICAgICAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKCdwcm9jZXNzaW5nJyk7XG4gICAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7fVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIC8vIDQwNCA9IE5vU3VjaFVwbG9hZCA9IGNoZWNrIGlmIGFscmVhZHkgZmluaXNoZWRcbiAgICAgICAgLy8gSWYgc28sIHN0YXJ0IGEgbmV3IHVwbG9hZFxuICAgICAgICBzZWxmLmNhbmNlbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZighc2VsZi5maWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYudXBsb2FkRmlsZShzZWxmLmZpbGUsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuY2hlY2tBbHJlYWR5VXBsb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgIHJlc3BvbnNlVGV4dDogbnVsbCxcbiAgICAgICAgICAgICAgcmVzcG9uc2VYTUw6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBoYW5kbGVyKHtcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0OiBudWxsLFxuICAgICAgICAgICAgICByZXNwb25zZVhNTDogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBBbWF6b25YSFIubGlzdChcbiAgICAgIHNlbGYuYXV0aCwgZmlsZSwgc2VsZi5zZXR0aW5ncy5rZXksXG4gICAgICBzZWxmLnVwbG9hZElkLCBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSxcbiAgICAgIChwYXJ0cykgPT4ge1xuICAgICAgICBpZighZmlsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbnVtQ2h1bmtzID0gTWF0aC5jZWlsKGZpbGUuc2l6ZSAvIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplKTtcblxuICAgICAgICAvLyBDaGVjayB0aGF0IHdlIHVwbG9hZGVkIGFsbCB0aGUgY2h1bmtzOyBpZiB3ZSBkaWRuJ3QsXG4gICAgICAgIC8vIHN0YXJ0IHVwbG9hZGluZyB0aGUgbWlzc2luZyBvbmVzXG4gICAgICAgIGlmKHBhcnRzLmxlbmd0aCAhPT0gbnVtQ2h1bmtzKSB7XG4gICAgICAgICAgc2VsZi51cGRhdGVDaHVua3MocGFydHMpO1xuICAgICAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgICAgIHNlbGYuc2V0U3RhdGUoJ3Byb2Nlc3NpbmcnKTtcbiAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgQW1hem9uWEhSLmZpbmlzaChcbiAgICAgICAgICBzZWxmLmF1dGgsIHNlbGYuc2V0dGluZ3Mua2V5LCBzZWxmLnVwbG9hZElkLCBwYXJ0cywgaGFuZGxlclxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgICgpID0+IHt9LFxuICAgICk7XG4gIH1cblxuICBub3RpZnlDaHVua1VwbG9hZGVkKGNodW5rOiBudW1iZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYoc2VsZi5nZXRTdGF0ZSgpICE9PSAncHJvY2Vzc2luZycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGtleSA9IHNlbGYuc2V0dGluZ3Mua2V5O1xuICAgIHZhciB1cGxvYWRJZCA9IHNlbGYudXBsb2FkSWQ7XG4gICAgdmFyIHVybCA9IGAke3NlbGYuc2V0dGluZ3MuYWpheEJhc2V9L2NodW5rX2xvYWRlZC9gO1xuICAgIHZhciBmaWxlID0gc2VsZi5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBPYmplY3QuYXNzaWduKHNlbGYuc2V0dGluZ3MuZXh0cmFQYXJhbXMgfHwge30sIHtcbiAgICAgIGNodW5rLFxuICAgICAga2V5LFxuICAgICAgdXBsb2FkSWQsXG4gICAgICBmaWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgZmlsZXNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWREYXRlLnZhbHVlT2YoKSxcbiAgICB9KTtcblxuICAgIFhIUih7XG4gICAgICB1cmwsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBleHRyYVBhcmFtczogYXJncyxcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrQWxyZWFkeVVwbG9hZGVkKGNhbGxiYWNrOiAoKSA9PiB2b2lkLCBlcnJvckNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBtZXRob2QgPSAnSEVBRCc7XG4gICAgdmFyIHBhdGggPSBgLyR7c2VsZi5zZXR0aW5ncy5rZXl9YDtcbiAgICB2YXIgaW5uZXJIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgLy8gVGhlIGhhbmRsZXIgb25seSBjaGVja3MgZm9yIHN0YXR1cyBjb2RlO1xuICAgICAgLy8gaWYgdGhlIEhFQUQgcmV0dXJucyA0MDQsIHJlLXVwbG9hZCxcbiAgICAgIC8vIGVsc2UsIGl0IHJldHVybnMgMjAwIGFuZCBmaW5pc2ggdGhlIHVwbG9hZFxuICAgICAgaWYoTWF0aC5jZWlsKGUudGFyZ2V0LnN0YXR1cyAvIDEwMCkgPT09IDIpIHtcbiAgICAgICAgbG9nKCdBbHJlYWR5IFVwbG9hZGVkJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2coJ0Vycm9yIScpO1xuICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmKCFlcnJvckNhbGxiYWNrICYmIHR5cGVvZihlcnJvckNhbGxiYWNrKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmNoZWNrQWxyZWFkeVVwbG9hZGVkKGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSwgMjUwMCk7XG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgY29uc3QgcmVnaW9uU3RyaW5nID0gdXRpbHMucmVnaW9uU3RyaW5nKHNlbGYuYXV0aC5yZWdpb24pO1xuICAgIGNvbnN0IHByb3RvY29sID0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgY29uc3QgYnVja2V0ID0gc2VsZi5hdXRoLmJ1Y2tldDtcbiAgICB2YXIgaG9zdCA9IGBzMyR7cmVnaW9uU3RyaW5nfS5hbWF6b25hd3MuY29tYDtcbiAgICB2YXIgdXJsID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3R9LyR7YnVja2V0fS8ke3BhdGh9YDtcbiAgICBYSFIoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBsb2FkQ2FsbGJhY2s6IGlubmVySGFuZGxlcixcbiAgICAgIGVycm9yQ2FsbGJhY2s6IGVycm9yQ2FsbGJhY2ssXG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWwoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICAvLyBFbXB0eSBhbGwgZmllbGRzLCBjYW5jZWwgYWxsIGludGVydmFscywgYWJvcnQgYWxsIHhocidzXG4gICAgdGhpcy5jaHVua1hoci5tYXAoKGNodW5rKSA9PiB7XG4gICAgICBsb2coYEFib3J0IGNodW5rOiAke2NodW5rfWApO1xuICAgICAgY2h1bmsuYWJvcnQoKTtcbiAgICB9KTtcbiAgICB0aGlzLmludGVydmFscyA9IHRoaXMuX2ludGVydmFscyB8fCB7fTtcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLmludGVydmFscykge1xuICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICBpZih0aGlzLmludGVydmFscy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbHNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICB0aGlzLnNldFN0YXRlKCdjYW5jZWxlZCcpO1xuICAgIHRoaXMuY2h1bmtYaHIgPSB0aGlzLl9jaHVua1hociB8fCBbXTtcbiAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MuY2FsbCh0aGlzLCAwLCAwKTtcbiAgICB0aGlzLmNodW5rWGhyID0gW107XG4gICAgdGhpcy5jaHVua3MgPSBbXTtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IG51bGw7XG4gICAgdGhpcy5sb2FkZWRDaHVua3MgPSBudWxsO1xuICAgIHRoaXMuc3RhcnRGaXJlZCA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkSWQgPSBudWxsO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSB7fTtcbiAgICB0aGlzLnNldFN0YXRlKCd3YWl0aW5nJyk7IC8vIHdhaXQgZm9yIGEgbmV3IHVwbG9hZFxuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICB1cGRhdGVDaHVua3MocGFydHM6IEFycmF5PFRQYXJ0Pikge1xuICAgIHZhciBmaWxlID0gdGhpcy5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwoZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemUpO1xuXG4gICAgdGhpcy5faW5pdENodW5rcyh0cnVlKTtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IFtdO1xuICAgIHRoaXMubG9hZGVkQ2h1bmtzID0gW107XG5cbiAgICBjb25zdCBsb2FkZWQgPSBwYXJ0cy5tYXAoKHBhcnQpID0+IHtcbiAgICAgIHZhciBwYXJ0TnVtYmVyID0gcGFydFswXTtcbiAgICAgIHRoaXMuYWRkTG9hZGVkQ2h1bmsocGFydE51bWJlciAtIDEpO1xuICAgICAgdGhpcy5zZXRDaHVua0ZpbmlzaGVkKHBhcnROdW1iZXIgLSAxKTtcbiAgICAgIHJldHVybiBwYXJ0TnVtYmVyIC0gMTtcbiAgICB9KTtcblxuICAgIGZvcihsZXQgY2h1bmtOdW0gPSAwOyBjaHVua051bSA8IG51bUNodW5rczsgY2h1bmtOdW0rKykge1xuICAgICAgaWYobG9hZGVkLmluZGV4T2YoY2h1bmtOdW0pID09PSAtMSkge1xuICAgICAgICBsb2coYENodW5rIG5vdCB1cGxvYWRlZDogJHtjaHVua051bX1gKTtcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhjaHVua051bSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbGU7XG4gIH1cblxuICBnZXRTdGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgc2V0U3RhdGUoc3RhdGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHNldFByb2dyZXNzKGNodW5rOiBudW1iZXIsIGxvYWRlZDogbnVtYmVyKSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3MgfHwge307XG4gICAgdGhpcy50b3RhbFByb2dyZXNzID0gKHRoaXMudG90YWxQcm9ncmVzcyB8fCAwKSArXG4gICAgICBsb2FkZWQgLSAodGhpcy5wcm9ncmVzc1tjaHVua10gfHwgMCk7XG4gICAgdGhpcy5wcm9ncmVzc1tjaHVua10gPSBsb2FkZWQ7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MuY2FsbChcbiAgICAgIHRoaXMsIGNodW5rLCBsb2FkZWQsIHRoaXMuZ2V0Q2h1bmtTaXplKGNodW5rKSk7XG4gIH1cblxuICBnZXRUb3RhbFByb2dyZXNzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudG90YWxQcm9ncmVzcyB8fCAwO1xuICB9XG5cbiAgaXNDaHVua0xvYWRlZChjaHVuazogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgdGhpcy5sb2FkZWRDaHVua3MgPSB0aGlzLmxvYWRlZENodW5rcyB8fCBbXTtcbiAgICByZXR1cm4gdGhpcy5sb2FkZWRDaHVua3MuaW5kZXhPZihjaHVuaykgIT09IC0xO1xuICB9XG5cbiAgYWRkTG9hZGVkQ2h1bmsoY2h1bms6IG51bWJlcikge1xuICAgIHRoaXMubG9hZGVkQ2h1bmtzID0gdGhpcy5sb2FkZWRDaHVua3MgfHwgW107XG4gICAgdGhpcy5sb2FkZWRDaHVua3MucHVzaChjaHVuayk7XG4gICAgdGhpcy5zZXRQcm9ncmVzcyhjaHVuaywgdGhpcy5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgfVxuXG4gIGdldENodW5rVXBsb2FkaW5nKGNodW5rOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IHRoaXMudXBsb2FkaW5nQ2h1bmtzIHx8IFtdO1xuICAgIHJldHVybiB0aGlzLnVwbG9hZGluZ0NodW5rcy5pbmRleE9mKGNodW5rKSAhPT0gLTE7XG4gIH1cblxuICBzZXRDaHVua1VwbG9hZGluZyhjaHVuazogbnVtYmVyLCB2YWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy51cGxvYWRpbmdDaHVua3MgPSB0aGlzLnVwbG9hZGluZ0NodW5rcyB8fCBbXTtcbiAgICBpZih2YWwpIHtcbiAgICAgIHRoaXMudXBsb2FkaW5nQ2h1bmtzLnB1c2goY2h1bmspO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaWR4O1xuICAgICAgd2hpbGUodHJ1ZSkge1xuICAgICAgICBpZHggPSB0aGlzLnVwbG9hZGluZ0NodW5rcy5pbmRleE9mKGNodW5rKTtcbiAgICAgICAgaWYoaWR4ID09PSAtMSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnVwbG9hZGluZ0NodW5rcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwbG9hZGluZ0NodW5rcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaW5pdENodW5rcyhmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdmFyIGZpbGUgPSB0aGlzLmZpbGU7XG4gICAgaWYoIWZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoIXRoaXMuY2h1bmtzIHx8IGZvcmNlKSB7XG4gICAgICB0aGlzLmNodW5rcyA9IFtdO1xuICAgICAgdmFyIG51bUNodW5rcyA9IE1hdGguY2VpbChcbiAgICAgICAgZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemVcbiAgICAgICk7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbnVtQ2h1bmtzOyBpKyspIHtcbiAgICAgICAgdGhpcy5jaHVua3MucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0Q2h1bmtGaW5pc2hlZChjaHVuazogbnVtYmVyLCB2YWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIHRoaXMuY2h1bmtzW2NodW5rXSA9ICEhdmFsO1xuICB9XG5cbiAgZ2V0TmV4dENodW5rKGNodW5rOiA/bnVtYmVyID0gbnVsbCk6IG51bWJlciB7XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIGlmKGNodW5rICYmICF0aGlzLmNodW5rc1tjaHVua10gJiYgIXRoaXMuZ2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmspKSB7XG4gICAgICByZXR1cm4gY2h1bms7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoIXRoaXMuY2h1bmtzW2ldICYmICF0aGlzLmdldENodW5rVXBsb2FkaW5nKGkpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICB1cGxvYWRGaW5pc2hlZCgpOiBib29sZWFuIHtcbiAgICB0aGlzLl9pbml0Q2h1bmtzKCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZighdGhpcy5jaHVua3NbaV0gfHwgdGhpcy5nZXRDaHVua1VwbG9hZGluZyhpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNMYXN0Q2h1bmsoY2h1bms6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHZhciBmaWxlID0gdGhpcy5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2Ugc2VsZWN0IGEgZmlsZSBmaXJzdFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguY2VpbChmaWxlLnNpemUgLyB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZSkgLSAxID09PSBjaHVuaztcbiAgfVxuXG4gIGdldENodW5rU2l6ZShjaHVuazogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZih0aGlzLmlzTGFzdENodW5rKGNodW5rKSkge1xuICAgICAgaWYoIXRoaXMuZmlsZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2Ugc2VsZWN0IGEgZmlsZSBmaXJzdFwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmZpbGUuc2l6ZSAlIHRoaXMuc2V0dGluZ3MuY2h1bmtTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5jaHVua1NpemU7XG4gICAgfVxuICB9XG5cbiAgb25DaHVua1Byb2dyZXNzKGY6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uQ2h1bmtQcm9ncmVzcyA9IGY7XG4gIH1cblxuICBvblByb2dyZXNzKGY6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MgPSBmO1xuICB9XG5cbiAgb25TZWxlY3QoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25TZWxlY3QgPSBmO1xuICB9XG5cbiAgb25FcnJvcihmOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkVycm9yID0gZjtcbiAgfVxuXG4gIG9uQ29tcGxldGUoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Db21wbGV0ZSA9IGY7XG4gIH1cblxuICBvbkluaXQoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Jbml0ID0gZjtcbiAgfVxuXG4gIG9uU3RhcnQoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25TdGFydCA9IGY7XG4gIH1cblxuICBvbkNodW5rVXBsb2FkZWQoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkID0gZjtcbiAgfVxufVxuIiwiLyogQGZsb3cgKi9cblxuZGVjbGFyZSBmdW5jdGlvbiBlc2NhcGUoc291cmNlOiBzdHJpbmcpOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcbiAgc3RhdGljIHJlZ2lvblN0cmluZyhyZWdpb24pIHtcbiAgICAvLyBHaXZlbiBhbiBBV1MgcmVnaW9uLCBpdCBlaXRoZXIgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcgZm9yXG4gICAgLy8gVVMtYmFzZWQgcmVnaW9ucyBvciB0aGUgcmVnaW9uIG5hbWUgcHJlY2VkZWQgYnkgYSBkYXNoIGZvciBub24tVVMtYmFzZWRcbiAgICAvLyByZWdpb25zLlxuICAgIC8vIFNlZSB0aGlzIGZvciBtb3JlIGRldGFpbHM6XG4gICAgLy8gaHR0cDovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L2Rldi9WaXJ0dWFsSG9zdGluZy5odG1sXG4gICAgaWYocmVnaW9uICYmIHJlZ2lvbi5zbGljZSgwLCAyKSAhPT0gJ3VzJykge1xuICAgICAgcmV0dXJuICctJyArIHJlZ2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHN0YXRpYyB6ZmlsbChzdHIsIG51bSkge1xuICAgIGxldCB6ZXJvcyA9ICcnO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgemVyb3MgKz0gJzAnO1xuICAgIH1cblxuICAgIHJldHVybiAoemVyb3MgKyBzdHIpLnN1YnN0cigtTWF0aC5tYXgobnVtLCBzdHIudG9TdHJpbmcoKS5sZW5ndGgpKTtcbiAgfVxuICBzdGF0aWMgdXJpZW5jb2RlKHN0cmluZykge1xuICAgIHZhciBvdXRwdXQgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nKTtcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvW15BLVphLXowLTlfLn5cXC0lXSsvZywgZXNjYXBlKTtcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvOy9nLCAnJTNCJyk7XG5cbiAgICAvLyBBV1MgcGVyY2VudC1lbmNvZGVzIHNvbWUgZXh0cmEgbm9uLXN0YW5kYXJkIGNoYXJhY3RlcnMgaW4gYSBVUklcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvWypdL2csIGZ1bmN0aW9uKGNoKSB7XG4gICAgICByZXR1cm4gJyUnICsgY2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgc3RhdGljIGlzbzg2MDEoZGF0ZSkge1xuICAgIHJldHVybiBbXG4gICAgICBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAyKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDRGF0ZSgpLCAyKSxcbiAgICAgICdUJyxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDSG91cnMoKSwgMiksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ01pbnV0ZXMoKSwgMiksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ1NlY29uZHMoKSwgMiksXG4gICAgICAnWicsXG4gICAgXS5qb2luKCcnKTtcblxuICB9XG59XG4iLCIvKiBAZmxvdyAqL1xuXG50eXBlIFRTZXR0aW5ncyA9IHtcbiAgaGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBleHRyYVBhcmFtcz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG59O1xuXG50eXBlIFRYTUwgPSB7XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lOiAodGFnOiBzdHJpbmcpID0+IFtUWE1MXTtcbiAgdGV4dENvbnRlbnQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFRFdmVudCA9IHtcbiAgdGFyZ2V0OiB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgcmVzcG9uc2VYTUw6ID9UWE1MO1xuICAgIHJlc3BvbnNlVGV4dDogP3N0cmluZztcbiAgfTtcbn07XG5cblxuZnVuY3Rpb24gWEhSKGFyZ3M6IFRTZXR0aW5ncyk6IFhNTEh0dHBSZXF1ZXN0IHtcbiAgLy8gVGhlIHVzZXIgbWF5IG9yIG1heSBub3QgcGFzcyBhbnkgaGVhZGVyc1xuICBhcmdzLmhlYWRlcnMgPSBhcmdzLmhlYWRlcnMgfHwge307XG5cbiAgLy8gSWYgbm8gbWV0aG9kIGlzIGdpdmVuLCBkZWZhdWx0IHRvIEdFVFxuICBhcmdzLm1ldGhvZCA9IGFyZ3MubWV0aG9kIHx8ICdHRVQnO1xuXG4gIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAvLyBTZXQgdGhlIFwibG9hZFwiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3MubG9hZENhbGxiYWNrICYmIHR5cGVvZiBhcmdzLmxvYWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgYXJncy5sb2FkQ2FsbGJhY2ssIHRydWUpO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBcImVycm9yXCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy5lcnJvckNhbGxiYWNrICYmIHR5cGVvZiBhcmdzLmVycm9yQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBhcmdzLmVycm9yQ2FsbGJhY2ssIHRydWUpO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBcInJlYWR5c3RhdGVjaGFuZ2VcIiBjYWxsYmFjayBpZiBnaXZlblxuICBpZihhcmdzLnN0YXRlQ2hhbmdlQ2FsbGJhY2sgJiZcbiAgICAgIHR5cGVvZiBhcmdzLnN0YXRlQ2hhbmdlQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIGFyZ3Muc3RhdGVDaGFuZ2VDYWxsYmFjayk7XG4gIH1cblxuICAvLyBTZXQgdGhlIFwicHJvZ3Jlc3NcIiBjYWxsYmFjayBpZiBnaXZlblxuICBpZihhcmdzLnByb2dyZXNzQ2FsbGJhY2sgJiYgdHlwZW9mIGFyZ3MucHJvZ3Jlc3NDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBhcmdzLnByb2dyZXNzQ2FsbGJhY2spO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBcInRpbWVvdXRcIiBjYWxsYmFjayBpZiBnaXZlblxuICBpZihhcmdzLnRpbWVvdXRDYWxsYmFjayAmJiB0eXBlb2YgYXJncy50aW1lb3V0Q2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigndGltZW91dCcsIGFyZ3MudGltZW91dENhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIEFkZGluZyBleHRyYSBwYXJhbXMgYXMgbmVlZGVkXG4gIHZhciB1cmwgPSBhcmdzLnVybDtcbiAgaWYodHlwZW9mIGFyZ3MuZXh0cmFQYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgZm9yKHZhciBwYXJhbU5hbWUgaW4gYXJncy5leHRyYVBhcmFtcykge1xuICAgICAgaWYoYXJncy5leHRyYVBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwYXJhbU5hbWUpKSB7XG4gICAgICAgIGlmKHVybC5pbmRleE9mKCc/JykgIT09IC0xKSB7XG4gICAgICAgICAgdXJsICs9ICcmJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmwgKz0gJz8nO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsICs9IGVuY29kZVVSSUNvbXBvbmVudChwYXJhbU5hbWUpICsgJz0nO1xuICAgICAgICAvLyBrZWVwIHRoZSB0eXBlY2hlY2tlciBoYXBweVxuICAgICAgICBpZih0eXBlb2YgYXJncy5leHRyYVBhcmFtcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB1cmwgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3MuZXh0cmFQYXJhbXNbcGFyYW1OYW1lXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBPcGVuIHRoZSB4aHIgY29ubmVjdGlvblxuICB4aHIub3BlbihhcmdzLm1ldGhvZCwgdXJsKTtcblxuICAvLyBTZXQgdGhlIGhlYWRlcnNcbiAgZm9yKHZhciBoZWFkZXIgaW4gYXJncy5oZWFkZXJzKSB7XG4gICAgaWYoYXJncy5oZWFkZXJzLmhhc093blByb3BlcnR5KGhlYWRlcikpIHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGhlYWRlciwgYXJncy5oZWFkZXJzW2hlYWRlcl0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNlbmQgdGhlIGFqYXggY2FsbFxuICBpZihhcmdzLmJvZHkpIHtcbiAgICB4aHIuc2VuZChhcmdzLmJvZHkpO1xuICB9IGVsc2Uge1xuICAgIHhoci5zZW5kKCk7XG4gIH1cbiAgcmV0dXJuIHhocjtcbn1cblxuZXhwb3J0IHsgWEhSIH07XG4iXX0=
