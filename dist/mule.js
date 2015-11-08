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

      var canonicalRequest = this.getCanonicalRequest(querystring);
      var stringToSign = this.getStringToSign(canonicalRequest, this.requestDate);
      var signature = this.signRequest(stringToSign);

      return signature;
    }
  }, {
    key: 'getCanonicalRequest',
    value: function getCanonicalRequest(querystring) {
      var _this = this;

      var request = '\n      ' + this.settings.method.toUpperCase() + '\n      /' + _utils2['default'].uriencode(this.settings.key).replace(/%2F/g, '/') + '\n    ';
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
exports.XHR = XHR;

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvbXVsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzLWNhbGwtY2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZS1jbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW50ZXJvcC1yZXF1aXJlLWRlZmF1bHQuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3NsaWNlZC10by1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmhpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLml0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQubGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1zYXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQucmVkZWYuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdXBwb3J0LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50YWcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQudG8taW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnVuc2NvcGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC53a3MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2NvcmUuanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2VuYy1oZXguanMiLCJub2RlX21vZHVsZXMvY3J5cHRvLWpzL2htYWMtc2hhMjU2LmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9obWFjLmpzIiwibm9kZV9tb2R1bGVzL2NyeXB0by1qcy9zaGEyNTYuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvYW1hem9uWGhyLmpzIiwiL2hvbWUvZ2FiaS9Xb3JrL211bGUtdXBsb2FkZXIvc3JjL2NvbnN0YW50cy5qcyIsIi9ob21lL2dhYmkvV29yay9tdWxlLXVwbG9hZGVyL3NyYy9sb2cuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvdXBsb2FkZXIuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMvdXRpbHMuanMiLCIvaG9tZS9nYWJpL1dvcmsvbXVsZS11cGxvYWRlci9zcmMveGhyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt3QkNFcUIsWUFBWTs7OzttQkFDakIsT0FBTzs7OztBQUV2QixTQUFTLFlBQVksQ0FBQyxRQUFRLEVBQUU7O0FBRTlCLE1BQUcsRUFBRSxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksT0FBTyxRQUFRLEtBQUssV0FBVyxJQUMvRCxPQUFPLElBQUksS0FBSyxXQUFXLENBQUEsQUFBQyxFQUFFO0FBQ2hDLDBCQUFJLDJCQUEyQixDQUFDLENBQUM7QUFDakMsV0FBTyxDQUFDLENBQUMsQ0FBQztHQUNYOzs7O0FBSUQsTUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRTtBQUNsRSxRQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7R0FDbkQ7O0FBRUQsTUFBRyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQy9CLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pELFFBQUk7QUFDRixVQUFJLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7S0FDNUMsQ0FBQyxPQUFNLENBQUMsRUFBRTtBQUNULGFBQU8sQ0FBQyxDQUFDLENBQUM7S0FDWDtHQUNGO0FBQ0Qsd0JBQUksSUFBSSxDQUFDLENBQUM7O0FBRVYsU0FBTywwQkFBYSxRQUFRLENBQUMsQ0FBQztDQUMvQjs7QUFFRCxJQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtBQUNoQyxRQUFNLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztDQUNwQzs7O0FDbkNEOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcnVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkNwTTRCLE9BQU87O3FCQUNqQixTQUFTOzs7OzhCQUNSLGtCQUFr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TUFBTSxDQUFDLENBQUMsQ0FBQztLQUNwRDtHQUNGOzs7QUFHRCxNQUFHLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDWixPQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUNyQixNQUFNO0FBQ0wsT0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0dBQ1o7QUFDRCxTQUFPLEdBQUcsQ0FBQztDQUNaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIEBmbG93ICovXG5cbmltcG9ydCBVcGxvYWRlciBmcm9tICcuL3VwbG9hZGVyJztcbmltcG9ydCBsb2cgZnJvbSAnLi9sb2cnO1xuXG5mdW5jdGlvbiBtdWxlVXBsb2FkZXIoc2V0dGluZ3MpIHtcbiAgLy8gVmVyaWZ5IHRoYXQgdGhlIGJyb3dzZXIgaGFzIHRoZSBuZWVkZWQgSFRNTDUgY2FwYWJpbGl0aWVzXG4gIGlmKCEodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBGaWxlTGlzdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICBsb2coJ0hUTUw1IEFQSXMgbm90IGF2YWlsYWJsZS4nKTtcbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvLyBGb3IgbmV3IHdlYmtpdCBicm93c2VycywgdGhlIC5zbGljZSgpIG1ldGhvZCBpcyBuYW1lZCAud2Via2l0U2xpY2UoKVxuICAvLyBzaW1pbGFyIGZvciBtb3ppbGxhXG4gIGlmICh0eXBlb2YgRmlsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIEZpbGUucHJvdG90eXBlID09PSAnb2JqZWN0Jykge1xuICAgIEZpbGUucHJvdG90eXBlLnNsaWNlID0gRmlsZS5wcm90b3R5cGUud2Via2l0U2xpY2UgfHxcbiAgICAgIEZpbGUucHJvdG90eXBlLm1velNsaWNlIHx8IEZpbGUucHJvdG90eXBlLnNsaWNlO1xuICB9XG5cbiAgaWYodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRmlyZWZveCcpICE9PSAtMSkge1xuICAgIHRyeSB7XG4gICAgICB2YXIganVzdENoZWNraW5nID0gbmV3IEJsb2IoWydzb21ldGhpbmcnXSk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG4gIGxvZygnT0snKTtcblxuICByZXR1cm4gbmV3IFVwbG9hZGVyKHNldHRpbmdzKTtcbn1cblxuaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgd2luZG93Lm11bGVVcGxvYWRlciA9IG11bGVVcGxvYWRlcjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfT2JqZWN0JGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpW1wiZGVmYXVsdFwiXTtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcblxuICAgICAgX09iamVjdCRkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSkoKTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufTtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF9nZXRJdGVyYXRvciA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpW1wiZGVmYXVsdFwiXTtcblxudmFyIF9pc0l0ZXJhYmxlID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9pcy1pdGVyYWJsZVwiKVtcImRlZmF1bHRcIl07XG5cbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gX2dldEl0ZXJhdG9yKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoX2lzSXRlcmFibGUoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KSgpO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlOyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJC5jb3JlJykuT2JqZWN0LmFzc2lnbjsiLCJ2YXIgJCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICQuc2V0RGVzYyhpdCwga2V5LCBkZXNjKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3Qua2V5czsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLyQuaXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vJC50by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi8kLmlvYmplY3QnKTtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBhID0gT2JqZWN0LmFzc2lnblxuICAgICwgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiBhKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKGEoe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsICQkICAgID0gYXJndW1lbnRzXG4gICAgLCAkJGxlbiA9ICQkLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRLZXlzICAgID0gJC5nZXRLZXlzXG4gICAgLCBnZXRTeW1ib2xzID0gJC5nZXRTeW1ib2xzXG4gICAgLCBpc0VudW0gICAgID0gJC5pc0VudW07XG4gIHdoaWxlKCQkbGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KCQkW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH1cbiAgcmV0dXJuIFQ7XG59IDogT2JqZWN0LmFzc2lnbjsiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vJC53a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gKE8gPSBPYmplY3QoaXQpKVtUQUddKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcxLjIuNCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vJC5jb3JlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBjdHggPSBmdW5jdGlvbihmbiwgdGhhdCl7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbnZhciAkZGVmID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxuICAgICwgaXNHbG9iYWwgPSB0eXBlICYgJGRlZi5HXG4gICAgLCBpc1Byb3RvICA9IHR5cGUgJiAkZGVmLlBcbiAgICAsIHRhcmdldCAgID0gaXNHbG9iYWwgPyBnbG9iYWwgOiB0eXBlICYgJGRlZi5TXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwgZXhwb3J0cyAgPSBpc0dsb2JhbCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICBpZihpc0dsb2JhbClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gISh0eXBlICYgJGRlZi5GKSAmJiB0YXJnZXQgJiYga2V5IGluIHRhcmdldDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGlmKGlzR2xvYmFsICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nKWV4cCA9IHNvdXJjZVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5XICYmIHRhcmdldFtrZXldID09IG91dCkhZnVuY3Rpb24oQyl7XG4gICAgICBleHAgPSBmdW5jdGlvbihwYXJhbSl7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQyA/IG5ldyBDKHBhcmFtKSA6IEMocGFyYW0pO1xuICAgICAgfTtcbiAgICAgIGV4cFtQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgIH0ob3V0KTtcbiAgICBlbHNlIGV4cCA9IGlzUHJvdG8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0XG4gICAgZXhwb3J0c1trZXldID0gZXhwO1xuICAgIGlmKGlzUHJvdG8pKGV4cG9ydHNbUFJPVE9UWVBFXSB8fCAoZXhwb3J0c1tQUk9UT1RZUEVdID0ge30pKVtrZXldID0gb3V0O1xuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRkZWYuRiA9IDE7ICAvLyBmb3JjZWRcbiRkZWYuRyA9IDI7ICAvLyBnbG9iYWxcbiRkZWYuUyA9IDQ7ICAvLyBzdGF0aWNcbiRkZWYuUCA9IDg7ICAvLyBwcm90b1xuJGRlZi5CID0gMTY7IC8vIGJpbmRcbiRkZWYuVyA9IDMyOyAvLyB3cmFwXG5tb2R1bGUuZXhwb3J0cyA9ICRkZWY7IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vJC5wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5zdXBwb3J0LWRlc2MnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vJC5jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi8kLnByb3BlcnR5LWRlc2MnKVxuICAsIHNldFRhZyAgICAgPSByZXF1aXJlKCcuLyQudGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLmhpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSAkLmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgID0gcmVxdWlyZSgnLi8kLmxpYnJhcnknKVxuICAsICRkZWYgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5kZWYnKVxuICAsICRyZWRlZiAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5yZWRlZicpXG4gICwgaGlkZSAgICAgICAgICAgID0gcmVxdWlyZSgnLi8kLmhpZGUnKVxuICAsIGhhcyAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vJC5oYXMnKVxuICAsIFNZTUJPTF9JVEVSQVRPUiA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyAgICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgICA9IHJlcXVpcmUoJy4vJC5pdGVyLWNyZWF0ZScpXG4gICwgc2V0VGFnICAgICAgICAgID0gcmVxdWlyZSgnLi8kLnRhZycpXG4gICwgZ2V0UHJvdG8gICAgICAgID0gcmVxdWlyZSgnLi8kJykuZ2V0UHJvdG9cbiAgLCBCVUdHWSAgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgICA9ICd2YWx1ZXMnO1xudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0Upe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgcHJvdG8gICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgX25hdGl2ZSAgPSBwcm90b1tTWU1CT0xfSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCBfZGVmYXVsdCA9IF9uYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCBtZXRob2RzLCBrZXk7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoX25hdGl2ZSl7XG4gICAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8oX2RlZmF1bHQuY2FsbChuZXcgQmFzZSkpO1xuICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICBzZXRUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgLy8gRkYgZml4XG4gICAgaWYoIUxJQlJBUlkgJiYgaGFzKHByb3RvLCBGRl9JVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgU1lNQk9MX0lURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFKSAmJiAoQlVHR1kgfHwgIShTWU1CT0xfSVRFUkFUT1IgaW4gcHJvdG8pKSl7XG4gICAgaGlkZShwcm90bywgU1lNQk9MX0lURVJBVE9SLCBfZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSBfZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRkFVTFQgPT0gVkFMVUVTID8gX2RlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgICAgICAgID8gX2RlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBERUZBVUxUICE9IFZBTFVFUyA/IF9kZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJylcbiAgICB9O1xuICAgIGlmKEZPUkNFKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpJHJlZGVmKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRkZWYoJGRlZi5QICsgJGRlZi5GICogQlVHR1ksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge307IiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRkZWYgID0gcmVxdWlyZSgnLi8kLmRlZicpXG4gICwgY29yZSAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgZmFpbHMgPSByZXF1aXJlKCcuLyQuZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJylcbiAgICAsIGZuICAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGRlZigkZGVmLlMgKyAkZGVmLkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuaGlkZScpOyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsIi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi8kLnRvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbFxuICAgICAgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vJCcpLnNldERlc2NcbiAgLCBoYXMgPSByZXF1aXJlKCcuLyQuaGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuLyQud2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTsiLCJ2YXIgc3RvcmUgID0gcmVxdWlyZSgnLi8kLnNoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vJC51aWQnKVxuICAsIFN5bWJvbCA9IHJlcXVpcmUoJy4vJC5nbG9iYWwnKS5TeW1ib2w7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBTeW1ib2wgJiYgU3ltYm9sW25hbWVdIHx8IChTeW1ib2wgfHwgdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuLyQuY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi8kLndrcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTsiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLyQuYW4tb2JqZWN0JylcbiAgLCBnZXQgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vJC5jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi8kLmNsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vJC53a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vJC5pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmNvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBJVEVSQVRPUiBpbiBPXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBzZXRVbnNjb3BlID0gcmVxdWlyZSgnLi8kLnVuc2NvcGUnKVxuICAsIHN0ZXAgICAgICAgPSByZXF1aXJlKCcuLyQuaXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi8kLml0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuc2V0VW5zY29wZSgna2V5cycpO1xuc2V0VW5zY29wZSgndmFsdWVzJyk7XG5zZXRVbnNjb3BlKCdlbnRyaWVzJyk7IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUyArICRkZWYuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vJC5hc3NpZ24nKX0pOyIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oJGtleXMpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vJC5zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi8kLml0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLyQuaXRlcmF0b3JzJyk7XG5JdGVyYXRvcnMuTm9kZUxpc3QgPSBJdGVyYXRvcnMuSFRNTENvbGxlY3Rpb24gPSBJdGVyYXRvcnMuQXJyYXk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdHJvb3QuQ3J5cHRvSlMgPSBmYWN0b3J5KCk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXG5cdC8qKlxuXHQgKiBDcnlwdG9KUyBjb3JlIGNvbXBvbmVudHMuXG5cdCAqL1xuXHR2YXIgQ3J5cHRvSlMgPSBDcnlwdG9KUyB8fCAoZnVuY3Rpb24gKE1hdGgsIHVuZGVmaW5lZCkge1xuXHQgICAgLyoqXG5cdCAgICAgKiBDcnlwdG9KUyBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGlicmFyeSBuYW1lc3BhY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBDX2xpYiA9IEMubGliID0ge307XG5cblx0ICAgIC8qKlxuXHQgICAgICogQmFzZSBvYmplY3QgZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2UuXG5cdCAgICAgKi9cblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZSA9IChmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgZnVuY3Rpb24gRigpIHt9XG5cblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3ZlcnJpZGVzIFByb3BlcnRpZXMgdG8gY29weSBpbnRvIHRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBuZXcgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBmaWVsZDogJ3ZhbHVlJyxcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgICAgICBtZXRob2Q6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICogICAgICAgICB9XG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGV4dGVuZDogZnVuY3Rpb24gKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgLy8gU3Bhd25cblx0ICAgICAgICAgICAgICAgIEYucHJvdG90eXBlID0gdGhpcztcblx0ICAgICAgICAgICAgICAgIHZhciBzdWJ0eXBlID0gbmV3IEYoKTtcblxuXHQgICAgICAgICAgICAgICAgLy8gQXVnbWVudFxuXHQgICAgICAgICAgICAgICAgaWYgKG92ZXJyaWRlcykge1xuXHQgICAgICAgICAgICAgICAgICAgIHN1YnR5cGUubWl4SW4ob3ZlcnJpZGVzKTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGRlZmF1bHQgaW5pdGlhbGl6ZXJcblx0ICAgICAgICAgICAgICAgIGlmICghc3VidHlwZS5oYXNPd25Qcm9wZXJ0eSgnaW5pdCcpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgc3VidHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICBzdWJ0eXBlLiRzdXBlci5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdCAgICAgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZXIncyBwcm90b3R5cGUgaXMgdGhlIHN1YnR5cGUgb2JqZWN0XG5cdCAgICAgICAgICAgICAgICBzdWJ0eXBlLmluaXQucHJvdG90eXBlID0gc3VidHlwZTtcblxuXHQgICAgICAgICAgICAgICAgLy8gUmVmZXJlbmNlIHN1cGVydHlwZVxuXHQgICAgICAgICAgICAgICAgc3VidHlwZS4kc3VwZXIgPSB0aGlzO1xuXG5cdCAgICAgICAgICAgICAgICByZXR1cm4gc3VidHlwZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRXh0ZW5kcyB0aGlzIG9iamVjdCBhbmQgcnVucyB0aGUgaW5pdCBtZXRob2QuXG5cdCAgICAgICAgICAgICAqIEFyZ3VtZW50cyB0byBjcmVhdGUoKSB3aWxsIGJlIHBhc3NlZCB0byBpbml0KCkuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG5ldyBvYmplY3QuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBpbnN0YW5jZSA9IE15VHlwZS5jcmVhdGUoKTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5leHRlbmQoKTtcblx0ICAgICAgICAgICAgICAgIGluc3RhbmNlLmluaXQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cyk7XG5cblx0ICAgICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcblx0ICAgICAgICAgICAgfSxcblxuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIG9iamVjdC5cblx0ICAgICAgICAgICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gYWRkIHNvbWUgbG9naWMgd2hlbiB5b3VyIG9iamVjdHMgYXJlIGNyZWF0ZWQuXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICB2YXIgTXlUeXBlID0gQ3J5cHRvSlMubGliLkJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAgICAgICogICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgICAqICAgICAgICAgICAgIC8vIC4uLlxuXHQgICAgICAgICAgICAgKiAgICAgICAgIH1cblx0ICAgICAgICAgICAgICogICAgIH0pO1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICB9LFxuXG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDb3BpZXMgcHJvcGVydGllcyBpbnRvIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgcHJvcGVydGllcyB0byBtaXggaW4uXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqICAgICBNeVR5cGUubWl4SW4oe1xuXHQgICAgICAgICAgICAgKiAgICAgICAgIGZpZWxkOiAndmFsdWUnXG5cdCAgICAgICAgICAgICAqICAgICB9KTtcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIG1peEluOiBmdW5jdGlvbiAocHJvcGVydGllcykge1xuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcGVydHlOYW1lIGluIHByb3BlcnRpZXMpIHtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbcHJvcGVydHlOYW1lXSA9IHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0ICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgICAgIC8vIElFIHdvbid0IGNvcHkgdG9TdHJpbmcgdXNpbmcgdGhlIGxvb3AgYWJvdmVcblx0ICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KCd0b1N0cmluZycpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IHByb3BlcnRpZXMudG9TdHJpbmc7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0sXG5cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENyZWF0ZXMgYSBjb3B5IG9mIHRoaXMgb2JqZWN0LlxuXHQgICAgICAgICAgICAgKlxuXHQgICAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgICAgICpcblx0ICAgICAgICAgICAgICogICAgIHZhciBjbG9uZSA9IGluc3RhbmNlLmNsb25lKCk7XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBjbG9uZTogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdC5wcm90b3R5cGUuZXh0ZW5kKHRoaXMpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfTtcblx0ICAgIH0oKSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQW4gYXJyYXkgb2YgMzItYml0IHdvcmRzLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHdvcmRzIFRoZSBhcnJheSBvZiAzMi1iaXQgd29yZHMuXG5cdCAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2lnQnl0ZXMgVGhlIG51bWJlciBvZiBzaWduaWZpY2FudCBieXRlcyBpbiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgKi9cblx0ICAgIHZhciBXb3JkQXJyYXkgPSBDX2xpYi5Xb3JkQXJyYXkgPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSB3b3JkcyAoT3B0aW9uYWwpIEFuIGFycmF5IG9mIDMyLWJpdCB3b3Jkcy5cblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gc2lnQnl0ZXMgKE9wdGlvbmFsKSBUaGUgbnVtYmVyIG9mIHNpZ25pZmljYW50IGJ5dGVzIGluIHRoZSB3b3Jkcy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmxpYi5Xb3JkQXJyYXkuY3JlYXRlKCk7XG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LmNyZWF0ZShbMHgwMDAxMDIwMywgMHgwNDA1MDYwN10pO1xuXHQgICAgICAgICAqICAgICB2YXIgd29yZEFycmF5ID0gQ3J5cHRvSlMubGliLldvcmRBcnJheS5jcmVhdGUoWzB4MDAwMTAyMDMsIDB4MDQwNTA2MDddLCA2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpbml0OiBmdW5jdGlvbiAod29yZHMsIHNpZ0J5dGVzKSB7XG5cdCAgICAgICAgICAgIHdvcmRzID0gdGhpcy53b3JkcyA9IHdvcmRzIHx8IFtdO1xuXG5cdCAgICAgICAgICAgIGlmIChzaWdCeXRlcyAhPSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSBzaWdCeXRlcztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgPSB3b3Jkcy5sZW5ndGggKiA0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIHRoaXMgd29yZCBhcnJheSB0byBhIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7RW5jb2Rlcn0gZW5jb2RlciAoT3B0aW9uYWwpIFRoZSBlbmNvZGluZyBzdHJhdGVneSB0byB1c2UuIERlZmF1bHQ6IENyeXB0b0pTLmVuYy5IZXhcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge3N0cmluZ30gVGhlIHN0cmluZ2lmaWVkIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciBzdHJpbmcgPSB3b3JkQXJyYXkgKyAnJztcblx0ICAgICAgICAgKiAgICAgdmFyIHN0cmluZyA9IHdvcmRBcnJheS50b1N0cmluZygpO1xuXHQgICAgICAgICAqICAgICB2YXIgc3RyaW5nID0gd29yZEFycmF5LnRvU3RyaW5nKENyeXB0b0pTLmVuYy5VdGY4KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB0b1N0cmluZzogZnVuY3Rpb24gKGVuY29kZXIpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIChlbmNvZGVyIHx8IEhleCkuc3RyaW5naWZ5KHRoaXMpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25jYXRlbmF0ZXMgYSB3b3JkIGFycmF5IHRvIHRoaXMgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheTEuY29uY2F0KHdvcmRBcnJheTIpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNvbmNhdDogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIHRoaXNXb3JkcyA9IHRoaXMud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGF0V29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciB0aGlzU2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXHQgICAgICAgICAgICB2YXIgdGhhdFNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wIGV4Y2VzcyBiaXRzXG5cdCAgICAgICAgICAgIHRoaXMuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDb25jYXRcblx0ICAgICAgICAgICAgaWYgKHRoaXNTaWdCeXRlcyAlIDQpIHtcblx0ICAgICAgICAgICAgICAgIC8vIENvcHkgb25lIGJ5dGUgYXQgYSB0aW1lXG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoYXRTaWdCeXRlczsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIHRoYXRCeXRlID0gKHRoYXRXb3Jkc1tpID4+PiAyXSA+Pj4gKDI0IC0gKGkgJSA0KSAqIDgpKSAmIDB4ZmY7XG5cdCAgICAgICAgICAgICAgICAgICAgdGhpc1dvcmRzWyh0aGlzU2lnQnl0ZXMgKyBpKSA+Pj4gMl0gfD0gdGhhdEJ5dGUgPDwgKDI0IC0gKCh0aGlzU2lnQnl0ZXMgKyBpKSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBDb3B5IG9uZSB3b3JkIGF0IGEgdGltZVxuXHQgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGF0U2lnQnl0ZXM7IGkgKz0gNCkge1xuXHQgICAgICAgICAgICAgICAgICAgIHRoaXNXb3Jkc1sodGhpc1NpZ0J5dGVzICsgaSkgPj4+IDJdID0gdGhhdFdvcmRzW2kgPj4+IDJdO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuc2lnQnl0ZXMgKz0gdGhhdFNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENoYWluYWJsZVxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcztcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVtb3ZlcyBpbnNpZ25pZmljYW50IGJpdHMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHdvcmRBcnJheS5jbGFtcCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsYW1wOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB0aGlzLndvcmRzO1xuXHQgICAgICAgICAgICB2YXIgc2lnQnl0ZXMgPSB0aGlzLnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENsYW1wXG5cdCAgICAgICAgICAgIHdvcmRzW3NpZ0J5dGVzID4+PiAyXSAmPSAweGZmZmZmZmZmIDw8ICgzMiAtIChzaWdCeXRlcyAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIHdvcmRzLmxlbmd0aCA9IE1hdGguY2VpbChzaWdCeXRlcyAvIDQpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgY29weSBvZiB0aGlzIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gd29yZEFycmF5LmNsb25lKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gQmFzZS5jbG9uZS5jYWxsKHRoaXMpO1xuXHQgICAgICAgICAgICBjbG9uZS53b3JkcyA9IHRoaXMud29yZHMuc2xpY2UoMCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgd29yZCBhcnJheSBmaWxsZWQgd2l0aCByYW5kb20gYnl0ZXMuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gbkJ5dGVzIFRoZSBudW1iZXIgb2YgcmFuZG9tIGJ5dGVzIHRvIGdlbmVyYXRlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgcmFuZG9tIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5saWIuV29yZEFycmF5LnJhbmRvbSgxNik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmFuZG9tOiBmdW5jdGlvbiAobkJ5dGVzKSB7XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXG5cdCAgICAgICAgICAgIHZhciByID0gKGZ1bmN0aW9uIChtX3cpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBtX3cgPSBtX3c7XG5cdCAgICAgICAgICAgICAgICB2YXIgbV96ID0gMHgzYWRlNjhiMTtcblx0ICAgICAgICAgICAgICAgIHZhciBtYXNrID0gMHhmZmZmZmZmZjtcblxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgICAgICBtX3ogPSAoMHg5MDY5ICogKG1feiAmIDB4RkZGRikgKyAobV96ID4+IDB4MTApKSAmIG1hc2s7XG5cdCAgICAgICAgICAgICAgICAgICAgbV93ID0gKDB4NDY1MCAqIChtX3cgJiAweEZGRkYpICsgKG1fdyA+PiAweDEwKSkgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAoKG1feiA8PCAweDEwKSArIG1fdykgJiBtYXNrO1xuXHQgICAgICAgICAgICAgICAgICAgIHJlc3VsdCAvPSAweDEwMDAwMDAwMDtcblx0ICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gMC41O1xuXHQgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgKiAoTWF0aC5yYW5kb20oKSA+IC41ID8gMSA6IC0xKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfSk7XG5cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJjYWNoZTsgaSA8IG5CeXRlczsgaSArPSA0KSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgX3IgPSByKChyY2FjaGUgfHwgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwMDAwMCk7XG5cblx0ICAgICAgICAgICAgICAgIHJjYWNoZSA9IF9yKCkgKiAweDNhZGU2N2I3O1xuXHQgICAgICAgICAgICAgICAgd29yZHMucHVzaCgoX3IoKSAqIDB4MTAwMDAwMDAwKSB8IDApO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIG5ldyBXb3JkQXJyYXkuaW5pdCh3b3JkcywgbkJ5dGVzKTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBFbmNvZGVyIG5hbWVzcGFjZS5cblx0ICAgICAqL1xuXHQgICAgdmFyIENfZW5jID0gQy5lbmMgPSB7fTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBIZXggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBIZXggPSBDX2VuYy5IZXggPSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ29udmVydHMgYSB3b3JkIGFycmF5IHRvIGEgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fSB3b3JkQXJyYXkgVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFRoZSBoZXggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGV4U3RyaW5nID0gQ3J5cHRvSlMuZW5jLkhleC5zdHJpbmdpZnkod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uICh3b3JkQXJyYXkpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRzXG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IHdvcmRBcnJheS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIHNpZ0J5dGVzID0gd29yZEFycmF5LnNpZ0J5dGVzO1xuXG5cdCAgICAgICAgICAgIC8vIENvbnZlcnRcblx0ICAgICAgICAgICAgdmFyIGhleENoYXJzID0gW107XG5cdCAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lnQnl0ZXM7IGkrKykge1xuXHQgICAgICAgICAgICAgICAgdmFyIGJpdGUgPSAod29yZHNbaSA+Pj4gMl0gPj4+ICgyNCAtIChpICUgNCkgKiA4KSkgJiAweGZmO1xuXHQgICAgICAgICAgICAgICAgaGV4Q2hhcnMucHVzaCgoYml0ZSA+Pj4gNCkudG9TdHJpbmcoMTYpKTtcblx0ICAgICAgICAgICAgICAgIGhleENoYXJzLnB1c2goKGJpdGUgJiAweDBmKS50b1N0cmluZygxNikpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhleENoYXJzLmpvaW4oJycpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIGhleCBzdHJpbmcgdG8gYSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGhleFN0ciBUaGUgaGV4IHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge1dvcmRBcnJheX0gVGhlIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAc3RhdGljXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIHZhciB3b3JkQXJyYXkgPSBDcnlwdG9KUy5lbmMuSGV4LnBhcnNlKGhleFN0cmluZyk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcGFyc2U6IGZ1bmN0aW9uIChoZXhTdHIpIHtcblx0ICAgICAgICAgICAgLy8gU2hvcnRjdXRcblx0ICAgICAgICAgICAgdmFyIGhleFN0ckxlbmd0aCA9IGhleFN0ci5sZW5ndGg7XG5cblx0ICAgICAgICAgICAgLy8gQ29udmVydFxuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSBbXTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZXhTdHJMZW5ndGg7IGkgKz0gMikge1xuXHQgICAgICAgICAgICAgICAgd29yZHNbaSA+Pj4gM10gfD0gcGFyc2VJbnQoaGV4U3RyLnN1YnN0cihpLCAyKSwgMTYpIDw8ICgyNCAtIChpICUgOCkgKiA0KTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQod29yZHMsIGhleFN0ckxlbmd0aCAvIDIpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogTGF0aW4xIGVuY29kaW5nIHN0cmF0ZWd5LlxuXHQgICAgICovXG5cdCAgICB2YXIgTGF0aW4xID0gQ19lbmMuTGF0aW4xID0ge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgd29yZCBhcnJheSB0byBhIExhdGluMSBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgTGF0aW4xIHN0cmluZy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGxhdGluMVN0cmluZyA9IENyeXB0b0pTLmVuYy5MYXRpbjEuc3RyaW5naWZ5KHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgc3RyaW5naWZ5OiBmdW5jdGlvbiAod29yZEFycmF5KSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgd29yZHMgPSB3b3JkQXJyYXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBzaWdCeXRlcyA9IHdvcmRBcnJheS5zaWdCeXRlcztcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciBsYXRpbjFDaGFycyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZ0J5dGVzOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIHZhciBiaXRlID0gKHdvcmRzW2kgPj4+IDJdID4+PiAoMjQgLSAoaSAlIDQpICogOCkpICYgMHhmZjtcblx0ICAgICAgICAgICAgICAgIGxhdGluMUNoYXJzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShiaXRlKSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbGF0aW4xQ2hhcnMuam9pbignJyk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENvbnZlcnRzIGEgTGF0aW4xIHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF0aW4xU3RyIFRoZSBMYXRpbjEgc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5MYXRpbjEucGFyc2UobGF0aW4xU3RyaW5nKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBwYXJzZTogZnVuY3Rpb24gKGxhdGluMVN0cikge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgbGF0aW4xU3RyTGVuZ3RoID0gbGF0aW4xU3RyLmxlbmd0aDtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0XG5cdCAgICAgICAgICAgIHZhciB3b3JkcyA9IFtdO1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhdGluMVN0ckxlbmd0aDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICB3b3Jkc1tpID4+PiAyXSB8PSAobGF0aW4xU3RyLmNoYXJDb2RlQXQoaSkgJiAweGZmKSA8PCAoMjQgLSAoaSAlIDQpICogOCk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICByZXR1cm4gbmV3IFdvcmRBcnJheS5pbml0KHdvcmRzLCBsYXRpbjFTdHJMZW5ndGgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogVVRGLTggZW5jb2Rpbmcgc3RyYXRlZ3kuXG5cdCAgICAgKi9cblx0ICAgIHZhciBVdGY4ID0gQ19lbmMuVXRmOCA9IHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIHdvcmQgYXJyYXkgdG8gYSBVVEYtOCBzdHJpbmcuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheX0gd29yZEFycmF5IFRoZSB3b3JkIGFycmF5LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7c3RyaW5nfSBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHN0YXRpY1xuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgdXRmOFN0cmluZyA9IENyeXB0b0pTLmVuYy5VdGY4LnN0cmluZ2lmeSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHdvcmRBcnJheSkge1xuXHQgICAgICAgICAgICB0cnkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoTGF0aW4xLnN0cmluZ2lmeSh3b3JkQXJyYXkpKSk7XG5cdCAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIFVURi04IGRhdGEnKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb252ZXJ0cyBhIFVURi04IHN0cmluZyB0byBhIHdvcmQgYXJyYXkuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXRmOFN0ciBUaGUgVVRGLTggc3RyaW5nLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7V29yZEFycmF5fSBUaGUgd29yZCBhcnJheS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHdvcmRBcnJheSA9IENyeXB0b0pTLmVuYy5VdGY4LnBhcnNlKHV0ZjhTdHJpbmcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHBhcnNlOiBmdW5jdGlvbiAodXRmOFN0cikge1xuXHQgICAgICAgICAgICByZXR1cm4gTGF0aW4xLnBhcnNlKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudCh1dGY4U3RyKSkpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgYnVmZmVyZWQgYmxvY2sgYWxnb3JpdGhtIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIFRoZSBwcm9wZXJ0eSBibG9ja1NpemUgbXVzdCBiZSBpbXBsZW1lbnRlZCBpbiBhIGNvbmNyZXRlIHN1YnR5cGUuXG5cdCAgICAgKlxuXHQgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IF9taW5CdWZmZXJTaXplIFRoZSBudW1iZXIgb2YgYmxvY2tzIHRoYXQgc2hvdWxkIGJlIGtlcHQgdW5wcm9jZXNzZWQgaW4gdGhlIGJ1ZmZlci4gRGVmYXVsdDogMFxuXHQgICAgICovXG5cdCAgICB2YXIgQnVmZmVyZWRCbG9ja0FsZ29yaXRobSA9IENfbGliLkJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0gPSBCYXNlLmV4dGVuZCh7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgZGF0YSBidWZmZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQoKTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXNldDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAvLyBJbml0aWFsIHZhbHVlc1xuXHQgICAgICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFdvcmRBcnJheS5pbml0KCk7XG5cdCAgICAgICAgICAgIHRoaXMuX25EYXRhQnl0ZXMgPSAwO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBBZGRzIG5ldyBkYXRhIHRvIHRoaXMgYmxvY2sgYWxnb3JpdGhtJ3MgYnVmZmVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGFwcGVuZC4gU3RyaW5ncyBhcmUgY29udmVydGVkIHRvIGEgV29yZEFycmF5IHVzaW5nIFVURi04LlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9hcHBlbmQoJ2RhdGEnKTtcblx0ICAgICAgICAgKiAgICAgYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fYXBwZW5kKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2FwcGVuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0ICAgICAgICAgICAgLy8gQ29udmVydCBzdHJpbmcgdG8gV29yZEFycmF5LCBlbHNlIGFzc3VtZSBXb3JkQXJyYXkgYWxyZWFkeVxuXHQgICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycpIHtcblx0ICAgICAgICAgICAgICAgIGRhdGEgPSBVdGY4LnBhcnNlKGRhdGEpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gQXBwZW5kXG5cdCAgICAgICAgICAgIHRoaXMuX2RhdGEuY29uY2F0KGRhdGEpO1xuXHQgICAgICAgICAgICB0aGlzLl9uRGF0YUJ5dGVzICs9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFByb2Nlc3NlcyBhdmFpbGFibGUgZGF0YSBibG9ja3MuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbnZva2VzIF9kb1Byb2Nlc3NCbG9jayhvZmZzZXQpLCB3aGljaCBtdXN0IGJlIGltcGxlbWVudGVkIGJ5IGEgY29uY3JldGUgc3VidHlwZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9GbHVzaCBXaGV0aGVyIGFsbCBibG9ja3MgYW5kIHBhcnRpYWwgYmxvY2tzIHNob3VsZCBiZSBwcm9jZXNzZWQuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBwcm9jZXNzZWQgZGF0YS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIHByb2Nlc3NlZERhdGEgPSBidWZmZXJlZEJsb2NrQWxnb3JpdGhtLl9wcm9jZXNzKCk7XG5cdCAgICAgICAgICogICAgIHZhciBwcm9jZXNzZWREYXRhID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5fcHJvY2VzcyghISdmbHVzaCcpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIF9wcm9jZXNzOiBmdW5jdGlvbiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhO1xuXHQgICAgICAgICAgICB2YXIgZGF0YVdvcmRzID0gZGF0YS53b3Jkcztcblx0ICAgICAgICAgICAgdmFyIGRhdGFTaWdCeXRlcyA9IGRhdGEuc2lnQnl0ZXM7XG5cdCAgICAgICAgICAgIHZhciBibG9ja1NpemUgPSB0aGlzLmJsb2NrU2l6ZTtcblx0ICAgICAgICAgICAgdmFyIGJsb2NrU2l6ZUJ5dGVzID0gYmxvY2tTaXplICogNDtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBibG9ja3MgcmVhZHlcblx0ICAgICAgICAgICAgdmFyIG5CbG9ja3NSZWFkeSA9IGRhdGFTaWdCeXRlcyAvIGJsb2NrU2l6ZUJ5dGVzO1xuXHQgICAgICAgICAgICBpZiAoZG9GbHVzaCkge1xuXHQgICAgICAgICAgICAgICAgLy8gUm91bmQgdXAgdG8gaW5jbHVkZSBwYXJ0aWFsIGJsb2Nrc1xuXHQgICAgICAgICAgICAgICAgbkJsb2Nrc1JlYWR5ID0gTWF0aC5jZWlsKG5CbG9ja3NSZWFkeSk7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICAvLyBSb3VuZCBkb3duIHRvIGluY2x1ZGUgb25seSBmdWxsIGJsb2Nrcyxcblx0ICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhlIG51bWJlciBvZiBibG9ja3MgdGhhdCBtdXN0IHJlbWFpbiBpbiB0aGUgYnVmZmVyXG5cdCAgICAgICAgICAgICAgICBuQmxvY2tzUmVhZHkgPSBNYXRoLm1heCgobkJsb2Nrc1JlYWR5IHwgMCkgLSB0aGlzLl9taW5CdWZmZXJTaXplLCAwKTtcblx0ICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgIC8vIENvdW50IHdvcmRzIHJlYWR5XG5cdCAgICAgICAgICAgIHZhciBuV29yZHNSZWFkeSA9IG5CbG9ja3NSZWFkeSAqIGJsb2NrU2l6ZTtcblxuXHQgICAgICAgICAgICAvLyBDb3VudCBieXRlcyByZWFkeVxuXHQgICAgICAgICAgICB2YXIgbkJ5dGVzUmVhZHkgPSBNYXRoLm1pbihuV29yZHNSZWFkeSAqIDQsIGRhdGFTaWdCeXRlcyk7XG5cblx0ICAgICAgICAgICAgLy8gUHJvY2VzcyBibG9ja3Ncblx0ICAgICAgICAgICAgaWYgKG5Xb3Jkc1JlYWR5KSB7XG5cdCAgICAgICAgICAgICAgICBmb3IgKHZhciBvZmZzZXQgPSAwOyBvZmZzZXQgPCBuV29yZHNSZWFkeTsgb2Zmc2V0ICs9IGJsb2NrU2l6ZSkge1xuXHQgICAgICAgICAgICAgICAgICAgIC8vIFBlcmZvcm0gY29uY3JldGUtYWxnb3JpdGhtIGxvZ2ljXG5cdCAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG9Qcm9jZXNzQmxvY2soZGF0YVdvcmRzLCBvZmZzZXQpO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICAvLyBSZW1vdmUgcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgICAgICB2YXIgcHJvY2Vzc2VkV29yZHMgPSBkYXRhV29yZHMuc3BsaWNlKDAsIG5Xb3Jkc1JlYWR5KTtcblx0ICAgICAgICAgICAgICAgIGRhdGEuc2lnQnl0ZXMgLT0gbkJ5dGVzUmVhZHk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gcHJvY2Vzc2VkIHdvcmRzXG5cdCAgICAgICAgICAgIHJldHVybiBuZXcgV29yZEFycmF5LmluaXQocHJvY2Vzc2VkV29yZHMsIG5CeXRlc1JlYWR5KTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIGNvcHkgb2YgdGhpcyBvYmplY3QuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBjbG9uZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGNsb25lID0gYnVmZmVyZWRCbG9ja0FsZ29yaXRobS5jbG9uZSgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGNsb25lOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHZhciBjbG9uZSA9IEJhc2UuY2xvbmUuY2FsbCh0aGlzKTtcblx0ICAgICAgICAgICAgY2xvbmUuX2RhdGEgPSB0aGlzLl9kYXRhLmNsb25lKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGNsb25lO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICBfbWluQnVmZmVyU2l6ZTogMFxuXHQgICAgfSk7XG5cblx0ICAgIC8qKlxuXHQgICAgICogQWJzdHJhY3QgaGFzaGVyIHRlbXBsYXRlLlxuXHQgICAgICpcblx0ICAgICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBibG9ja1NpemUgVGhlIG51bWJlciBvZiAzMi1iaXQgd29yZHMgdGhpcyBoYXNoZXIgb3BlcmF0ZXMgb24uIERlZmF1bHQ6IDE2ICg1MTIgYml0cylcblx0ICAgICAqL1xuXHQgICAgdmFyIEhhc2hlciA9IENfbGliLkhhc2hlciA9IEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0uZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMuXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgY2ZnOiBCYXNlLmV4dGVuZCgpLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSW5pdGlhbGl6ZXMgYSBuZXdseSBjcmVhdGVkIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjZmcgKE9wdGlvbmFsKSBUaGUgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIHVzZSBmb3IgdGhpcyBoYXNoIGNvbXB1dGF0aW9uLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaGVyID0gQ3J5cHRvSlMuYWxnby5TSEEyNTYuY3JlYXRlKCk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaW5pdDogZnVuY3Rpb24gKGNmZykge1xuXHQgICAgICAgICAgICAvLyBBcHBseSBjb25maWcgZGVmYXVsdHNcblx0ICAgICAgICAgICAgdGhpcy5jZmcgPSB0aGlzLmNmZy5leHRlbmQoY2ZnKTtcblxuXHQgICAgICAgICAgICAvLyBTZXQgaW5pdGlhbCB2YWx1ZXNcblx0ICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXNldHMgdGhpcyBoYXNoZXIgdG8gaXRzIGluaXRpYWwgc3RhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAZXhhbXBsZVxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogICAgIGhhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFJlc2V0IGRhdGEgYnVmZmVyXG5cdCAgICAgICAgICAgIEJ1ZmZlcmVkQmxvY2tBbGdvcml0aG0ucmVzZXQuY2FsbCh0aGlzKTtcblxuXHQgICAgICAgICAgICAvLyBQZXJmb3JtIGNvbmNyZXRlLWhhc2hlciBsb2dpY1xuXHQgICAgICAgICAgICB0aGlzLl9kb1Jlc2V0KCk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBoYXNoZXIgd2l0aCBhIG1lc3NhZ2UuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2VVcGRhdGUgVGhlIG1lc3NhZ2UgdG8gYXBwZW5kLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7SGFzaGVyfSBUaGlzIGhhc2hlci5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaGFzaGVyLnVwZGF0ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICBoYXNoZXIudXBkYXRlKHdvcmRBcnJheSk7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBBcHBlbmRcblx0ICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXG5cdCAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgaGFzaFxuXHQgICAgICAgICAgICB0aGlzLl9wcm9jZXNzKCk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIGhhc2ggY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSgnbWVzc2FnZScpO1xuXHQgICAgICAgICAqICAgICB2YXIgaGFzaCA9IGhhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBGaW5hbCBtZXNzYWdlIHVwZGF0ZVxuXHQgICAgICAgICAgICBpZiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gUGVyZm9ybSBjb25jcmV0ZS1oYXNoZXIgbG9naWNcblx0ICAgICAgICAgICAgdmFyIGhhc2ggPSB0aGlzLl9kb0ZpbmFsaXplKCk7XG5cblx0ICAgICAgICAgICAgcmV0dXJuIGhhc2g7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIGJsb2NrU2l6ZTogNTEyLzMyLFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlcyBhIHNob3J0Y3V0IGZ1bmN0aW9uIHRvIGEgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2hlciB0byBjcmVhdGUgYSBoZWxwZXIgZm9yLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIFNIQTI1NiA9IENyeXB0b0pTLmxpYi5IYXNoZXIuX2NyZWF0ZUhlbHBlcihDcnlwdG9KUy5hbGdvLlNIQTI1Nik7XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgX2NyZWF0ZUhlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGNmZykge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBoYXNoZXIuaW5pdChjZmcpLmZpbmFsaXplKG1lc3NhZ2UpO1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDcmVhdGVzIGEgc2hvcnRjdXQgZnVuY3Rpb24gdG8gdGhlIEhNQUMncyBvYmplY3QgaW50ZXJmYWNlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtIYXNoZXJ9IGhhc2hlciBUaGUgaGFzaGVyIHRvIHVzZSBpbiB0aGlzIEhNQUMgaGVscGVyLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBzaG9ydGN1dCBmdW5jdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBzdGF0aWNcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIEhtYWNTSEEyNTYgPSBDcnlwdG9KUy5saWIuSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKENyeXB0b0pTLmFsZ28uU0hBMjU2KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBfY3JlYXRlSG1hY0hlbHBlcjogZnVuY3Rpb24gKGhhc2hlcikge1xuXHQgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBDX2FsZ28uSE1BQy5pbml0KGhhc2hlciwga2V5KS5maW5hbGl6ZShtZXNzYWdlKTtcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBBbGdvcml0aG0gbmFtZXNwYWNlLlxuXHQgICAgICovXG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvID0ge307XG5cblx0ICAgIHJldHVybiBDO1xuXHR9KE1hdGgpKTtcblxuXG5cdHJldHVybiBDcnlwdG9KUztcblxufSkpOyIsIjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG5cdFx0Ly8gQ29tbW9uSlNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCIuL2NvcmVcIikpO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtcIi4vY29yZVwiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0cmV0dXJuIENyeXB0b0pTLmVuYy5IZXg7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5LCB1bmRlZikge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSwgcmVxdWlyZShcIi4vc2hhMjU2XCIpLCByZXF1aXJlKFwiLi9obWFjXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIiwgXCIuL3NoYTI1NlwiLCBcIi4vaG1hY1wiXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gR2xvYmFsIChicm93c2VyKVxuXHRcdGZhY3Rvcnkocm9vdC5DcnlwdG9KUyk7XG5cdH1cbn0odGhpcywgZnVuY3Rpb24gKENyeXB0b0pTKSB7XG5cblx0cmV0dXJuIENyeXB0b0pTLkhtYWNTSEEyNTY7XG5cbn0pKTsiLCI7KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG5cdGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIikge1xuXHRcdC8vIENvbW1vbkpTXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiLi9jb3JlXCIpKTtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIEFNRFxuXHRcdGRlZmluZShbXCIuL2NvcmVcIl0sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIEdsb2JhbCAoYnJvd3Nlcilcblx0XHRmYWN0b3J5KHJvb3QuQ3J5cHRvSlMpO1xuXHR9XG59KHRoaXMsIGZ1bmN0aW9uIChDcnlwdG9KUykge1xuXG5cdChmdW5jdGlvbiAoKSB7XG5cdCAgICAvLyBTaG9ydGN1dHNcblx0ICAgIHZhciBDID0gQ3J5cHRvSlM7XG5cdCAgICB2YXIgQ19saWIgPSBDLmxpYjtcblx0ICAgIHZhciBCYXNlID0gQ19saWIuQmFzZTtcblx0ICAgIHZhciBDX2VuYyA9IEMuZW5jO1xuXHQgICAgdmFyIFV0ZjggPSBDX2VuYy5VdGY4O1xuXHQgICAgdmFyIENfYWxnbyA9IEMuYWxnbztcblxuXHQgICAgLyoqXG5cdCAgICAgKiBITUFDIGFsZ29yaXRobS5cblx0ICAgICAqL1xuXHQgICAgdmFyIEhNQUMgPSBDX2FsZ28uSE1BQyA9IEJhc2UuZXh0ZW5kKHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJbml0aWFsaXplcyBhIG5ld2x5IGNyZWF0ZWQgSE1BQy5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7SGFzaGVyfSBoYXNoZXIgVGhlIGhhc2ggYWxnb3JpdGhtIHRvIHVzZS5cblx0ICAgICAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWNIYXNoZXIgPSBDcnlwdG9KUy5hbGdvLkhNQUMuY3JlYXRlKENyeXB0b0pTLmFsZ28uU0hBMjU2LCBrZXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChoYXNoZXIsIGtleSkge1xuXHQgICAgICAgICAgICAvLyBJbml0IGhhc2hlclxuXHQgICAgICAgICAgICBoYXNoZXIgPSB0aGlzLl9oYXNoZXIgPSBuZXcgaGFzaGVyLmluaXQoKTtcblxuXHQgICAgICAgICAgICAvLyBDb252ZXJ0IHN0cmluZyB0byBXb3JkQXJyYXksIGVsc2UgYXNzdW1lIFdvcmRBcnJheSBhbHJlYWR5XG5cdCAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnKSB7XG5cdCAgICAgICAgICAgICAgICBrZXkgPSBVdGY4LnBhcnNlKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIGhhc2hlckJsb2NrU2l6ZSA9IGhhc2hlci5ibG9ja1NpemU7XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXJCbG9ja1NpemVCeXRlcyA9IGhhc2hlckJsb2NrU2l6ZSAqIDQ7XG5cblx0ICAgICAgICAgICAgLy8gQWxsb3cgYXJiaXRyYXJ5IGxlbmd0aCBrZXlzXG5cdCAgICAgICAgICAgIGlmIChrZXkuc2lnQnl0ZXMgPiBoYXNoZXJCbG9ja1NpemVCeXRlcykge1xuXHQgICAgICAgICAgICAgICAga2V5ID0gaGFzaGVyLmZpbmFsaXplKGtleSk7XG5cdCAgICAgICAgICAgIH1cblxuXHQgICAgICAgICAgICAvLyBDbGFtcCBleGNlc3MgYml0c1xuXHQgICAgICAgICAgICBrZXkuY2xhbXAoKTtcblxuXHQgICAgICAgICAgICAvLyBDbG9uZSBrZXkgZm9yIGlubmVyIGFuZCBvdXRlciBwYWRzXG5cdCAgICAgICAgICAgIHZhciBvS2V5ID0gdGhpcy5fb0tleSA9IGtleS5jbG9uZSgpO1xuXHQgICAgICAgICAgICB2YXIgaUtleSA9IHRoaXMuX2lLZXkgPSBrZXkuY2xvbmUoKTtcblxuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dHNcblx0ICAgICAgICAgICAgdmFyIG9LZXlXb3JkcyA9IG9LZXkud29yZHM7XG5cdCAgICAgICAgICAgIHZhciBpS2V5V29yZHMgPSBpS2V5LndvcmRzO1xuXG5cdCAgICAgICAgICAgIC8vIFhPUiBrZXlzIHdpdGggcGFkIGNvbnN0YW50c1xuXHQgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhc2hlckJsb2NrU2l6ZTsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBvS2V5V29yZHNbaV0gXj0gMHg1YzVjNWM1Yztcblx0ICAgICAgICAgICAgICAgIGlLZXlXb3Jkc1tpXSBePSAweDM2MzYzNjM2O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIG9LZXkuc2lnQnl0ZXMgPSBpS2V5LnNpZ0J5dGVzID0gaGFzaGVyQmxvY2tTaXplQnl0ZXM7XG5cblx0ICAgICAgICAgICAgLy8gU2V0IGluaXRpYWwgdmFsdWVzXG5cdCAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVzZXRzIHRoaXMgSE1BQyB0byBpdHMgaW5pdGlhbCBzdGF0ZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci5yZXNldCgpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0XG5cdCAgICAgICAgICAgIHZhciBoYXNoZXIgPSB0aGlzLl9oYXNoZXI7XG5cblx0ICAgICAgICAgICAgLy8gUmVzZXRcblx0ICAgICAgICAgICAgaGFzaGVyLnJlc2V0KCk7XG5cdCAgICAgICAgICAgIGhhc2hlci51cGRhdGUodGhpcy5faUtleSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFVwZGF0ZXMgdGhpcyBITUFDIHdpdGggYSBtZXNzYWdlLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlVXBkYXRlIFRoZSBtZXNzYWdlIHRvIGFwcGVuZC5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEByZXR1cm4ge0hNQUN9IFRoaXMgSE1BQyBpbnN0YW5jZS5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBleGFtcGxlXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUoJ21lc3NhZ2UnKTtcblx0ICAgICAgICAgKiAgICAgaG1hY0hhc2hlci51cGRhdGUod29yZEFycmF5KTtcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB1cGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlVXBkYXRlKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2hlci51cGRhdGUobWVzc2FnZVVwZGF0ZSk7XG5cblx0ICAgICAgICAgICAgLy8gQ2hhaW5hYmxlXG5cdCAgICAgICAgICAgIHJldHVybiB0aGlzO1xuXHQgICAgICAgIH0sXG5cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBGaW5hbGl6ZXMgdGhlIEhNQUMgY29tcHV0YXRpb24uXG5cdCAgICAgICAgICogTm90ZSB0aGF0IHRoZSBmaW5hbGl6ZSBvcGVyYXRpb24gaXMgZWZmZWN0aXZlbHkgYSBkZXN0cnVjdGl2ZSwgcmVhZC1vbmNlIG9wZXJhdGlvbi5cblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqIEBwYXJhbSB7V29yZEFycmF5fHN0cmluZ30gbWVzc2FnZVVwZGF0ZSAoT3B0aW9uYWwpIEEgZmluYWwgbWVzc2FnZSB1cGRhdGUuXG5cdCAgICAgICAgICpcblx0ICAgICAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICAgICAqXG5cdCAgICAgICAgICogQGV4YW1wbGVcblx0ICAgICAgICAgKlxuXHQgICAgICAgICAqICAgICB2YXIgaG1hYyA9IGhtYWNIYXNoZXIuZmluYWxpemUoKTtcblx0ICAgICAgICAgKiAgICAgdmFyIGhtYWMgPSBobWFjSGFzaGVyLmZpbmFsaXplKCdtZXNzYWdlJyk7XG5cdCAgICAgICAgICogICAgIHZhciBobWFjID0gaG1hY0hhc2hlci5maW5hbGl6ZSh3b3JkQXJyYXkpO1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGZpbmFsaXplOiBmdW5jdGlvbiAobWVzc2FnZVVwZGF0ZSkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgaGFzaGVyID0gdGhpcy5faGFzaGVyO1xuXG5cdCAgICAgICAgICAgIC8vIENvbXB1dGUgSE1BQ1xuXHQgICAgICAgICAgICB2YXIgaW5uZXJIYXNoID0gaGFzaGVyLmZpbmFsaXplKG1lc3NhZ2VVcGRhdGUpO1xuXHQgICAgICAgICAgICBoYXNoZXIucmVzZXQoKTtcblx0ICAgICAgICAgICAgdmFyIGhtYWMgPSBoYXNoZXIuZmluYWxpemUodGhpcy5fb0tleS5jbG9uZSgpLmNvbmNhdChpbm5lckhhc2gpKTtcblxuXHQgICAgICAgICAgICByZXR1cm4gaG1hYztcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblx0fSgpKTtcblxuXG59KSk7IiwiOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXHRpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcblx0XHQvLyBDb21tb25KU1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIi4vY29yZVwiKSk7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW1wiLi9jb3JlXCJdLCBmYWN0b3J5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBHbG9iYWwgKGJyb3dzZXIpXG5cdFx0ZmFjdG9yeShyb290LkNyeXB0b0pTKTtcblx0fVxufSh0aGlzLCBmdW5jdGlvbiAoQ3J5cHRvSlMpIHtcblxuXHQoZnVuY3Rpb24gKE1hdGgpIHtcblx0ICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgdmFyIEMgPSBDcnlwdG9KUztcblx0ICAgIHZhciBDX2xpYiA9IEMubGliO1xuXHQgICAgdmFyIFdvcmRBcnJheSA9IENfbGliLldvcmRBcnJheTtcblx0ICAgIHZhciBIYXNoZXIgPSBDX2xpYi5IYXNoZXI7XG5cdCAgICB2YXIgQ19hbGdvID0gQy5hbGdvO1xuXG5cdCAgICAvLyBJbml0aWFsaXphdGlvbiBhbmQgcm91bmQgY29uc3RhbnRzIHRhYmxlc1xuXHQgICAgdmFyIEggPSBbXTtcblx0ICAgIHZhciBLID0gW107XG5cblx0ICAgIC8vIENvbXB1dGUgY29uc3RhbnRzXG5cdCAgICAoZnVuY3Rpb24gKCkge1xuXHQgICAgICAgIGZ1bmN0aW9uIGlzUHJpbWUobikge1xuXHQgICAgICAgICAgICB2YXIgc3FydE4gPSBNYXRoLnNxcnQobik7XG5cdCAgICAgICAgICAgIGZvciAodmFyIGZhY3RvciA9IDI7IGZhY3RvciA8PSBzcXJ0TjsgZmFjdG9yKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmICghKG4gJSBmYWN0b3IpKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfVxuXG5cdCAgICAgICAgZnVuY3Rpb24gZ2V0RnJhY3Rpb25hbEJpdHMobikge1xuXHQgICAgICAgICAgICByZXR1cm4gKChuIC0gKG4gfCAwKSkgKiAweDEwMDAwMDAwMCkgfCAwO1xuXHQgICAgICAgIH1cblxuXHQgICAgICAgIHZhciBuID0gMjtcblx0ICAgICAgICB2YXIgblByaW1lID0gMDtcblx0ICAgICAgICB3aGlsZSAoblByaW1lIDwgNjQpIHtcblx0ICAgICAgICAgICAgaWYgKGlzUHJpbWUobikpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChuUHJpbWUgPCA4KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgSFtuUHJpbWVdID0gZ2V0RnJhY3Rpb25hbEJpdHMoTWF0aC5wb3cobiwgMSAvIDIpKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIEtbblByaW1lXSA9IGdldEZyYWN0aW9uYWxCaXRzKE1hdGgucG93KG4sIDEgLyAzKSk7XG5cblx0ICAgICAgICAgICAgICAgIG5QcmltZSsrO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgbisrO1xuXHQgICAgICAgIH1cblx0ICAgIH0oKSk7XG5cblx0ICAgIC8vIFJldXNhYmxlIG9iamVjdFxuXHQgICAgdmFyIFcgPSBbXTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTSEEtMjU2IGhhc2ggYWxnb3JpdGhtLlxuXHQgICAgICovXG5cdCAgICB2YXIgU0hBMjU2ID0gQ19hbGdvLlNIQTI1NiA9IEhhc2hlci5leHRlbmQoe1xuXHQgICAgICAgIF9kb1Jlc2V0OiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIHRoaXMuX2hhc2ggPSBuZXcgV29yZEFycmF5LmluaXQoSC5zbGljZSgwKSk7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb1Byb2Nlc3NCbG9jazogZnVuY3Rpb24gKE0sIG9mZnNldCkge1xuXHQgICAgICAgICAgICAvLyBTaG9ydGN1dFxuXHQgICAgICAgICAgICB2YXIgSCA9IHRoaXMuX2hhc2gud29yZHM7XG5cblx0ICAgICAgICAgICAgLy8gV29ya2luZyB2YXJpYWJsZXNcblx0ICAgICAgICAgICAgdmFyIGEgPSBIWzBdO1xuXHQgICAgICAgICAgICB2YXIgYiA9IEhbMV07XG5cdCAgICAgICAgICAgIHZhciBjID0gSFsyXTtcblx0ICAgICAgICAgICAgdmFyIGQgPSBIWzNdO1xuXHQgICAgICAgICAgICB2YXIgZSA9IEhbNF07XG5cdCAgICAgICAgICAgIHZhciBmID0gSFs1XTtcblx0ICAgICAgICAgICAgdmFyIGcgPSBIWzZdO1xuXHQgICAgICAgICAgICB2YXIgaCA9IEhbN107XG5cblx0ICAgICAgICAgICAgLy8gQ29tcHV0YXRpb25cblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoaSA8IDE2KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IE1bb2Zmc2V0ICsgaV0gfCAwO1xuXHQgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEweCA9IFdbaSAtIDE1XTtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgZ2FtbWEwICA9ICgoZ2FtbWEweCA8PCAyNSkgfCAoZ2FtbWEweCA+Pj4gNykpICBeXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdhbW1hMHggPDwgMTQpIHwgKGdhbW1hMHggPj4+IDE4KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChnYW1tYTB4ID4+PiAzKTtcblxuXHQgICAgICAgICAgICAgICAgICAgIHZhciBnYW1tYTF4ID0gV1tpIC0gMl07XG5cdCAgICAgICAgICAgICAgICAgICAgdmFyIGdhbW1hMSAgPSAoKGdhbW1hMXggPDwgMTUpIHwgKGdhbW1hMXggPj4+IDE3KSkgXlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKChnYW1tYTF4IDw8IDEzKSB8IChnYW1tYTF4ID4+PiAxOSkpIF5cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZ2FtbWExeCA+Pj4gMTApO1xuXG5cdCAgICAgICAgICAgICAgICAgICAgV1tpXSA9IGdhbW1hMCArIFdbaSAtIDddICsgZ2FtbWExICsgV1tpIC0gMTZdO1xuXHQgICAgICAgICAgICAgICAgfVxuXG5cdCAgICAgICAgICAgICAgICB2YXIgY2ggID0gKGUgJiBmKSBeICh+ZSAmIGcpO1xuXHQgICAgICAgICAgICAgICAgdmFyIG1haiA9IChhICYgYikgXiAoYSAmIGMpIF4gKGIgJiBjKTtcblxuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMCA9ICgoYSA8PCAzMCkgfCAoYSA+Pj4gMikpIF4gKChhIDw8IDE5KSB8IChhID4+PiAxMykpIF4gKChhIDw8IDEwKSB8IChhID4+PiAyMikpO1xuXHQgICAgICAgICAgICAgICAgdmFyIHNpZ21hMSA9ICgoZSA8PCAyNikgfCAoZSA+Pj4gNikpIF4gKChlIDw8IDIxKSB8IChlID4+PiAxMSkpIF4gKChlIDw8IDcpICB8IChlID4+PiAyNSkpO1xuXG5cdCAgICAgICAgICAgICAgICB2YXIgdDEgPSBoICsgc2lnbWExICsgY2ggKyBLW2ldICsgV1tpXTtcblx0ICAgICAgICAgICAgICAgIHZhciB0MiA9IHNpZ21hMCArIG1hajtcblxuXHQgICAgICAgICAgICAgICAgaCA9IGc7XG5cdCAgICAgICAgICAgICAgICBnID0gZjtcblx0ICAgICAgICAgICAgICAgIGYgPSBlO1xuXHQgICAgICAgICAgICAgICAgZSA9IChkICsgdDEpIHwgMDtcblx0ICAgICAgICAgICAgICAgIGQgPSBjO1xuXHQgICAgICAgICAgICAgICAgYyA9IGI7XG5cdCAgICAgICAgICAgICAgICBiID0gYTtcblx0ICAgICAgICAgICAgICAgIGEgPSAodDEgKyB0MikgfCAwO1xuXHQgICAgICAgICAgICB9XG5cblx0ICAgICAgICAgICAgLy8gSW50ZXJtZWRpYXRlIGhhc2ggdmFsdWVcblx0ICAgICAgICAgICAgSFswXSA9IChIWzBdICsgYSkgfCAwO1xuXHQgICAgICAgICAgICBIWzFdID0gKEhbMV0gKyBiKSB8IDA7XG5cdCAgICAgICAgICAgIEhbMl0gPSAoSFsyXSArIGMpIHwgMDtcblx0ICAgICAgICAgICAgSFszXSA9IChIWzNdICsgZCkgfCAwO1xuXHQgICAgICAgICAgICBIWzRdID0gKEhbNF0gKyBlKSB8IDA7XG5cdCAgICAgICAgICAgIEhbNV0gPSAoSFs1XSArIGYpIHwgMDtcblx0ICAgICAgICAgICAgSFs2XSA9IChIWzZdICsgZykgfCAwO1xuXHQgICAgICAgICAgICBIWzddID0gKEhbN10gKyBoKSB8IDA7XG5cdCAgICAgICAgfSxcblxuXHQgICAgICAgIF9kb0ZpbmFsaXplOiBmdW5jdGlvbiAoKSB7XG5cdCAgICAgICAgICAgIC8vIFNob3J0Y3V0c1xuXHQgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGE7XG5cdCAgICAgICAgICAgIHZhciBkYXRhV29yZHMgPSBkYXRhLndvcmRzO1xuXG5cdCAgICAgICAgICAgIHZhciBuQml0c1RvdGFsID0gdGhpcy5fbkRhdGFCeXRlcyAqIDg7XG5cdCAgICAgICAgICAgIHZhciBuQml0c0xlZnQgPSBkYXRhLnNpZ0J5dGVzICogODtcblxuXHQgICAgICAgICAgICAvLyBBZGQgcGFkZGluZ1xuXHQgICAgICAgICAgICBkYXRhV29yZHNbbkJpdHNMZWZ0ID4+PiA1XSB8PSAweDgwIDw8ICgyNCAtIG5CaXRzTGVmdCAlIDMyKTtcblx0ICAgICAgICAgICAgZGF0YVdvcmRzWygoKG5CaXRzTGVmdCArIDY0KSA+Pj4gOSkgPDwgNCkgKyAxNF0gPSBNYXRoLmZsb29yKG5CaXRzVG90YWwgLyAweDEwMDAwMDAwMCk7XG5cdCAgICAgICAgICAgIGRhdGFXb3Jkc1soKChuQml0c0xlZnQgKyA2NCkgPj4+IDkpIDw8IDQpICsgMTVdID0gbkJpdHNUb3RhbDtcblx0ICAgICAgICAgICAgZGF0YS5zaWdCeXRlcyA9IGRhdGFXb3Jkcy5sZW5ndGggKiA0O1xuXG5cdCAgICAgICAgICAgIC8vIEhhc2ggZmluYWwgYmxvY2tzXG5cdCAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3MoKTtcblxuXHQgICAgICAgICAgICAvLyBSZXR1cm4gZmluYWwgY29tcHV0ZWQgaGFzaFxuXHQgICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzaDtcblx0ICAgICAgICB9LFxuXG5cdCAgICAgICAgY2xvbmU6IGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgdmFyIGNsb25lID0gSGFzaGVyLmNsb25lLmNhbGwodGhpcyk7XG5cdCAgICAgICAgICAgIGNsb25lLl9oYXNoID0gdGhpcy5faGFzaC5jbG9uZSgpO1xuXG5cdCAgICAgICAgICAgIHJldHVybiBjbG9uZTtcblx0ICAgICAgICB9XG5cdCAgICB9KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgaGFzaGVyJ3Mgb2JqZWN0IGludGVyZmFjZS5cblx0ICAgICAqXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gaGFzaC5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBoYXNoLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaGFzaCA9IENyeXB0b0pTLlNIQTI1NignbWVzc2FnZScpO1xuXHQgICAgICogICAgIHZhciBoYXNoID0gQ3J5cHRvSlMuU0hBMjU2KHdvcmRBcnJheSk7XG5cdCAgICAgKi9cblx0ICAgIEMuU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIZWxwZXIoU0hBMjU2KTtcblxuXHQgICAgLyoqXG5cdCAgICAgKiBTaG9ydGN1dCBmdW5jdGlvbiB0byB0aGUgSE1BQydzIG9iamVjdCBpbnRlcmZhY2UuXG5cdCAgICAgKlxuXHQgICAgICogQHBhcmFtIHtXb3JkQXJyYXl8c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGhhc2guXG5cdCAgICAgKiBAcGFyYW0ge1dvcmRBcnJheXxzdHJpbmd9IGtleSBUaGUgc2VjcmV0IGtleS5cblx0ICAgICAqXG5cdCAgICAgKiBAcmV0dXJuIHtXb3JkQXJyYXl9IFRoZSBITUFDLlxuXHQgICAgICpcblx0ICAgICAqIEBzdGF0aWNcblx0ICAgICAqXG5cdCAgICAgKiBAZXhhbXBsZVxuXHQgICAgICpcblx0ICAgICAqICAgICB2YXIgaG1hYyA9IENyeXB0b0pTLkhtYWNTSEEyNTYobWVzc2FnZSwga2V5KTtcblx0ICAgICAqL1xuXHQgICAgQy5IbWFjU0hBMjU2ID0gSGFzaGVyLl9jcmVhdGVIbWFjSGVscGVyKFNIQTI1Nik7XG5cdH0oTWF0aCkpO1xuXG5cblx0cmV0dXJuIENyeXB0b0pTLlNIQTI1NjtcblxufSkpOyIsIi8qIEBmbG93ICovXG5cbmltcG9ydCB7IFhIUiwgVEV2ZW50IH0gZnJvbSAnLi94aHInO1xuaW1wb3J0IHV0aWxzIGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IFNIQTI1NiBmcm9tICdjcnlwdG8tanMvc2hhMjU2JztcbmltcG9ydCBIbWFjU0hBMjU2IGZyb20gJ2NyeXB0by1qcy9obWFjLXNoYTI1Nic7XG5pbXBvcnQgSGV4IGZyb20gJ2NyeXB0by1qcy9lbmMtaGV4JztcblxuZXhwb3J0IHR5cGUgVEF1dGggPSB7XG4gIGJ1Y2tldDogc3RyaW5nO1xuICByZWdpb246IHN0cmluZztcbiAgZGF0ZTogRGF0ZTtcbiAgYWNjZXNzS2V5OiBzdHJpbmc7XG4gIHNpZ25hdHVyZTogc3RyaW5nO1xufTtcblxudHlwZSBUUXVlcnlzdHJpbmcgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xuXG50eXBlIFRIZWFkZXJzID0geyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcblxudHlwZSBUUGF5bG9hZCA9IHN0cmluZyB8IEJsb2I7XG5cbnR5cGUgVFNldHRpbmdzID0ge1xuICBhdXRoOiBUQXV0aDtcbiAgaGVhZGVyczogVEhlYWRlcnM7XG4gIHF1ZXJ5c3RyaW5nOiBUUXVlcnlzdHJpbmc7XG4gIGtleTogP3N0cmluZztcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHBheWxvYWQ6IFRQYXlsb2FkO1xuICBsb2FkQ2FsbGJhY2s6IChldmVudDogVEV2ZW50KSA9PiB2b2lkO1xuICBwcm9ncmVzc0NhbGxiYWNrOiAoKSA9PiB2b2lkO1xuICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiAoKSA9PiB2b2lkO1xuICBlcnJvckNhbGxiYWNrOiAoKSA9PiB2b2lkO1xuICB0aW1lb3V0Q2FsbGJhY2s6ICgpID0+IHZvaWQ7XG59O1xuXG50eXBlIFNlbmRDYWxsYmFjayA9ICgoKSA9PiB2b2lkKTtcblxuZXhwb3J0IGNsYXNzIEFtYXpvblhIUiB7XG4gIHNldHRpbmdzOiBUU2V0dGluZ3M7XG4gIHJlcXVlc3REYXRlOiBEYXRlO1xuICBoZWFkZXJzOiBPYmplY3Q7XG4gIHhocjogP1hIUjtcblxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogVFNldHRpbmdzKSB7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuICB9O1xuXG4gIHNlbmQoY2FsbGJhY2s6ID9TZW5kQ2FsbGJhY2spOiBBbWF6b25YSFIge1xuICAgIHRoaXMucmVxdWVzdERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgdGhpcy5oZWFkZXJzID0gdGhpcy5zZXR0aW5ncy5oZWFkZXJzO1xuXG4gICAgY29uc3QgYnVja2V0ID0gdGhpcy5zZXR0aW5ncy5hdXRoLmJ1Y2tldDtcbiAgICBjb25zdCByZWdpb25TdHJpbmcgPSB1dGlscy5yZWdpb25TdHJpbmcodGhpcy5zZXR0aW5ncy5hdXRoLnJlZ2lvbik7XG4gICAgdGhpcy5oZWFkZXJzLmhvc3QgPSBgJHtidWNrZXR9LnMzJHtyZWdpb25TdHJpbmd9LmFtYXpvbmF3cy5jb21gO1xuXG4gICAgY29uc3QgZGF0ZSA9IHRoaXMuc2V0dGluZ3MuYXV0aC5kYXRlO1xuICAgIHZhciBkYXRlU3RyaW5nID0gW1xuICAgICAgZGF0ZS5nZXRVVENGdWxsWWVhcigpLFxuICAgICAgdXRpbHMuemZpbGwoZGF0ZS5nZXRVVENNb250aCgpICsgMSwgMiksXG4gICAgICB1dGlscy56ZmlsbChkYXRlLmdldFVUQ0RhdGUoKSwgMiksXG4gICAgXS5qb2luKCcnKTtcblxuICAgIGNvbnN0IGVuY29kZWREYXRlID0gdXRpbHMudXJpZW5jb2RlKHV0aWxzLmlzbzg2MDEodGhpcy5yZXF1ZXN0RGF0ZSkpO1xuICAgIGxldCBxdWVyeXN0cmluZyA9IHt9O1xuICAgIGZvcih2YXIga2V5IGluIHRoaXMuc2V0dGluZ3MucXVlcnlzdHJpbmcgKSB7XG4gICAgICBxdWVyeXN0cmluZ1trZXldID0gdGhpcy5zZXR0aW5ncy5xdWVyeXN0cmluZ1trZXldO1xuICAgIH1cbiAgICBxdWVyeXN0cmluZ1snWC1BbXotRGF0ZSddID0gZW5jb2RlZERhdGU7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LUFsZ29yaXRobSddID0gJ0FXUzQtSE1BQy1TSEEyNTYnO1xuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1FeHBpcmVzJ10gPSAnODY0MDAnOyAvLyBPbmUgZGF5XG5cbiAgICBjb25zdCBhY2Nlc3NLZXkgPSB0aGlzLnNldHRpbmdzLmF1dGguYWNjZXNzS2V5O1xuICAgIGNvbnN0IHJlZ2lvbiA9IHRoaXMuc2V0dGluZ3MuYXV0aC5yZWdpb247XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LUNyZWRlbnRpYWwnXSA9IHV0aWxzLnVyaWVuY29kZShcbiAgICAgIGAke2FjY2Vzc0tleX0vJHtkYXRlU3RyaW5nfS8ke3JlZ2lvbn0vczMvYXdzNF9yZXF1ZXN0YFxuICAgICk7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LVNpZ25lZEhlYWRlcnMnXSA9ICcnO1xuXG4gICAgbGV0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpO1xuXG4gICAgaGVhZGVyS2V5cy5zb3J0KCk7XG4gICAgcXVlcnlzdHJpbmdbJ1gtQW16LVNpZ25lZEhlYWRlcnMnXSA9IHV0aWxzLnVyaWVuY29kZShcbiAgICAgIGhlYWRlcktleXMuam9pbignOycpXG4gICAgKTtcblxuICAgIHF1ZXJ5c3RyaW5nWydYLUFtei1TaWduYXR1cmUnXSA9IHRoaXMuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihcbiAgICAgIHF1ZXJ5c3RyaW5nXG4gICAgKTtcblxuICAgIHZhciB1cmwgPSBgJHtsb2NhdGlvbi5wcm90b2NvbH0vLyR7dGhpcy5oZWFkZXJzLmhvc3R9LyR7dGhpcy5zZXR0aW5ncy5rZXl9YDtcbiAgICBkZWxldGUgdGhpcy5oZWFkZXJzLmhvc3Q7ICAvLyBrZWVwIHRoaXMgaGVhZGVyIG9ubHkgZm9yIGhhc2hpbmdcblxuICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgT2JqZWN0LmtleXMocXVlcnlzdHJpbmcpLm1hcChrZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBxdWVyeXN0cmluZ1trZXldO1xuICAgICAgaWYoZmlyc3QpIHtcbiAgICAgICAgdXJsICs9ICc/JztcbiAgICAgIH1cbiAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICB1cmwgKz0gYCR7a2V5fT0ke3ZhbHVlfSZgO1xuICAgIH0pO1xuICAgIHVybCA9IHVybC5zbGljZSgwLCAtMSk7ICAvLyByZW1vdmUgZXh0cmEgYW1wZXJzYW5kXG5cbiAgICB0aGlzLnhociA9IFhIUih7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIG1ldGhvZDogdGhpcy5zZXR0aW5ncy5tZXRob2QsXG4gICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXG4gICAgICBib2R5OiB0aGlzLnNldHRpbmdzLnBheWxvYWQsXG5cbiAgICAgIGxvYWRDYWxsYmFjazogdGhpcy5zZXR0aW5ncy5sb2FkQ2FsbGJhY2ssXG4gICAgICBwcm9ncmVzc0NhbGxiYWNrOiB0aGlzLnNldHRpbmdzLnByb2dyZXNzQ2FsbGJhY2ssXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiB0aGlzLnNldHRpbmdzLnN0YXRlQ2hhbmdlQ2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrOiB0aGlzLnNldHRpbmdzLmVycm9yQ2FsbGJhY2ssXG4gICAgICB0aW1lb3V0Q2FsbGJhY2s6IHRoaXMuc2V0dGluZ3MudGltZW91dENhbGxiYWNrLFxuICAgIH0pO1xuICAgIGlmKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayh0aGlzLnhocik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXRBdXRob3JpemF0aW9uSGVhZGVyKHF1ZXJ5c3RyaW5nOiBUUXVlcnlzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBoZWFkZXIgPSAnJztcblxuICAgIGNvbnN0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpLnNvcnQoKTtcblxuICAgIGNvbnN0IHNpZ25lZEtleXMgPSBoZWFkZXJLZXlzLnJlZHVjZSgoYWNjLCB2YWwpID0+IHtcbiAgICAgIHJldHVybiBhY2MgKyAnOycgKyB2YWw7XG4gICAgfSk7XG5cbiAgICBsZXQgY2Fub25pY2FsUmVxdWVzdCA9IHRoaXMuZ2V0Q2Fub25pY2FsUmVxdWVzdChxdWVyeXN0cmluZyk7XG4gICAgbGV0IHN0cmluZ1RvU2lnbiA9IHRoaXMuZ2V0U3RyaW5nVG9TaWduKGNhbm9uaWNhbFJlcXVlc3QsIHRoaXMucmVxdWVzdERhdGUpO1xuICAgIGxldCBzaWduYXR1cmUgPSB0aGlzLnNpZ25SZXF1ZXN0KHN0cmluZ1RvU2lnbik7XG5cbiAgICByZXR1cm4gc2lnbmF0dXJlO1xuICB9XG5cbiAgZ2V0Q2Fub25pY2FsUmVxdWVzdChxdWVyeXN0cmluZzogVFF1ZXJ5c3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgcmVxdWVzdCA9IGBcbiAgICAgICR7dGhpcy5zZXR0aW5ncy5tZXRob2QudG9VcHBlckNhc2UoKX1cbiAgICAgIC8ke3V0aWxzLnVyaWVuY29kZSh0aGlzLnNldHRpbmdzLmtleSkucmVwbGFjZSgvJTJGL2csICcvJyl9XG4gICAgYDtcbiAgICByZXF1ZXN0ID0gcmVxdWVzdC50cmltKCkucmVwbGFjZSgvXlxccysvZ20sICcnKSArICdcXG4nO1xuXG4gICAgLy8gcXVlcnlzdHJpbmdcbiAgICByZXF1ZXN0ICs9IE9iamVjdC5rZXlzKFxuICAgICAgcXVlcnlzdHJpbmdcbiAgICApLnNvcnQoKS5yZWR1Y2UoKGFjYywga2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5c3RyaW5nW2tleV07XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY30mYW1wOyR7dXRpbHMudXJpZW5jb2RlKGtleSl9PSR7dmFsdWV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHt1dGlscy51cmllbmNvZGUoa2V5KX09JHt2YWx1ZX1gO1xuICAgICAgfVxuICAgIH0sICcnKTtcbiAgICByZXF1ZXN0ICs9ICdcXG4nO1xuXG4gICAgLy8gaGVhZGVyc1xuICAgIGNvbnN0IGhlYWRlcktleXMgPSBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpLnNvcnQoKTtcbiAgICByZXF1ZXN0ICs9IGhlYWRlcktleXMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmhlYWRlcnNba2V5XTtcbiAgICAgIGlmKGFjYykge1xuICAgICAgICByZXR1cm4gYCR7YWNjfVxcbiR7a2V5LnRvTG93ZXJDYXNlKCl9OiR7dmFsdWUudHJpbSgpfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYCR7a2V5LnRvTG93ZXJDYXNlKCl9OiR7dmFsdWUudHJpbSgpfWA7XG4gICAgICB9XG4gICAgfSwgJycpO1xuICAgIHJlcXVlc3QgKz0gJ1xcblxcbic7XG5cbiAgICAvLyBzaWduZWQgaGVhZGVyc1xuICAgIHJlcXVlc3QgKz0gaGVhZGVyS2V5cy5yZWR1Y2UoKGFjYywgdmFsKSA9PiB7XG4gICAgICBpZihhY2MpIHtcbiAgICAgICAgcmV0dXJuIGAke2FjY307JHt2YWwudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbC50b0xvd2VyQ2FzZSgpO1xuICAgICAgfVxuICAgIH0sICcnKTtcblxuICAgIHJlcXVlc3QgKz0gJ1xcbic7XG5cbiAgICByZXF1ZXN0ICs9ICdVTlNJR05FRC1QQVlMT0FEJztcblxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgZ2V0U3RyaW5nVG9TaWduKGNhbm9uaWNhbFJlcXVlc3Q6IHN0cmluZywgdGltZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBcbiAgICAgIEFXUzQtSE1BQy1TSEEyNTZcbiAgICAgICR7dXRpbHMuaXNvODYwMSh0aW1lKX1cbiAgICAgICR7XG4gICAgICAgIFtcbiAgICAgICAgICB0aW1lLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICAgICAgdXRpbHMuemZpbGwodGltZS5nZXRVVENNb250aCgpICsgMSwgMiksXG4gICAgICAgICAgdXRpbHMuemZpbGwodGltZS5nZXRVVENEYXRlKCksIDIpLFxuICAgICAgICAgICcvJyArIHRoaXMuc2V0dGluZ3MuYXV0aC5yZWdpb24gKyAnL3MzL2F3czRfcmVxdWVzdFxcbicsXG4gICAgICAgIF0uam9pbignJylcbiAgICAgIH1cbiAgICAgICR7U0hBMjU2KGNhbm9uaWNhbFJlcXVlc3QucmVwbGFjZSgvJmFtcDsvZywgJyYnKSkudG9TdHJpbmcoKX1cbiAgICBgLnRyaW0oKS5yZXBsYWNlKC9eXFxzKy9nbSwgJycpO1xuICB9XG5cbiAgc2lnblJlcXVlc3Qoc3RyaW5nVG9TaWduOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciByZXMgPSBIbWFjU0hBMjU2KFxuICAgICAgc3RyaW5nVG9TaWduLFxuICAgICAgSGV4LnBhcnNlKHRoaXMuc2V0dGluZ3MuYXV0aC5zaWduYXR1cmUpXG4gICAgKS50b1N0cmluZygpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvLyBzdGF0aWNcbiAgc3RhdGljIGluaXQoYXV0aCwga2V5LCBmaWxlLCBjYWxsYmFjayk6IFhIUiB7XG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIGtleToga2V5LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBxdWVyeXN0cmluZzoge1xuICAgICAgICB1cGxvYWRzOiAnJyxcbiAgICAgIH0sXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICd4LWFtei1hY2wnOiAncHVibGljLXJlYWQnLFxuICAgICAgICAnQ29udGVudC1EaXNwb3NpdGlvbic6IGBhdHRhY2htZW50OyBmaWxlbmFtZT0ke2ZpbGUubmFtZX1gLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogYXV0aC5jb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAgIH0sXG4gICAgICBwYXlsb2FkOiAnJyxcbiAgICAgIGxvYWRDYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICBlcnJvckNhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2s6ICgpID0+IHt9LFxuICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICB0aW1lb3V0Q2FsbGJhY2s6ICgpID0+IHt9LFxuICAgIH0pLnNlbmQoKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGxvYWRDaHVuayhhdXRoLCBrZXksIHVwbG9hZElkLCBjaHVua051bSxcbiAgICAgICAgICAgICAgICAgICAgIGNodW5rLCBjYWxsYmFja3MsIHhockNhbGxiYWNrKSB7XG4gICAgbGV0IGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrLCBwcm9ncmVzc0NhbGxiYWNrLCByZWFkeXN0YXRlQ2FsbGJhY2s7XG4gICAgaWYoY2FsbGJhY2tzIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICBjYWxsYmFjayA9IGNhbGxiYWNrcy5sb2FkQ2FsbGJhY2s7XG4gICAgICBlcnJvckNhbGxiYWNrID0gY2FsbGJhY2tzLmVycm9yQ2FsbGJhY2s7XG4gICAgICBwcm9ncmVzc0NhbGxiYWNrID0gY2FsbGJhY2tzLnByb2dyZXNzQ2FsbGJhY2s7XG4gICAgICByZWFkeXN0YXRlQ2FsbGJhY2sgPSBjYWxsYmFja3Muc3RhdGVDaGFuZ2VDYWxsYmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sgPSBjYWxsYmFja3M7XG4gICAgICBlcnJvckNhbGxiYWNrID0gKCkgPT4ge307XG4gICAgICBwcm9ncmVzc0NhbGxiYWNrID0gKCkgPT4ge307XG4gICAgICByZWFkeXN0YXRlQ2FsbGJhY2sgPSAoKSA9PiB7fTtcbiAgICB9XG4gICAgdmFyIHF1ZXJ5c3RyaW5nID0ge1xuICAgICAgcGFydE51bWJlcjogY2h1bmtOdW0gKyAxLFxuICAgICAgdXBsb2FkSWQsXG4gICAgfTtcbiAgICByZXR1cm4gKG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aDogYXV0aCxcbiAgICAgIGtleToga2V5LFxuICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nOiBxdWVyeXN0cmluZyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgcGF5bG9hZDogY2h1bmssXG4gICAgICBsb2FkQ2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFjazogZXJyb3JDYWxsYmFjayxcbiAgICAgIHByb2dyZXNzQ2FsbGJhY2s6IHByb2dyZXNzQ2FsbGJhY2ssXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiByZWFkeXN0YXRlQ2FsbGJhY2ssXG4gICAgICB0aW1lb3V0Q2FsbGJhY2s6ICgpID0+IHt9LFxuICAgIH0pKS5zZW5kKHhockNhbGxiYWNrKTtcbiAgfVxuXG4gIHN0YXRpYyBsaXN0KGF1dGgsIGZpbGU6IEZpbGUsIGtleTogc3RyaW5nLCB1cGxvYWRJZCwgY2h1bmtTaXplLCBjYWxsYmFjayxcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjazogKCkgPT4gdm9pZCwgbWFya2VyKSB7XG4gICAgdmFyIHF1ZXJ5c3RyaW5nOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICAgdXBsb2FkSWQsXG4gICAgfTtcbiAgICBpZihtYXJrZXIpIHtcbiAgICAgIHF1ZXJ5c3RyaW5nWydwYXJ0LW51bWJlcuKAiy1tYXJrZXInXSA9IG1hcmtlcjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBbWF6b25YSFIoe1xuICAgICAgYXV0aCxcbiAgICAgIGtleSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBxdWVyeXN0cmluZyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgcGF5bG9hZDogJycsXG4gICAgICBlcnJvckNhbGxiYWNrLFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHRpbWVvdXRDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBsb2FkQ2FsbGJhY2s6IGZ1bmN0aW9uKGU6IFRFdmVudCkge1xuICAgICAgICBpZihlLnRhcmdldC5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIC8vIEkuZS4gdGhlIGZpbGUgd2FzIGFscmVhZHkgdXBsb2FkZWQ7IHN0YXJ0IGZyZXNoXG4gICAgICAgICAgaWYoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjaygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcm9jZXNzIHRoZSBwYXJ0cywgYW5kIHJldHVybiBhbiBhcnJheSBvZlxuICAgICAgICAvLyBbcGFydF9udW1iZXIsIGV0YWcsIHNpemVdIHRocm91Z2ggdGhlIGdpdmVuIGNhbGxiYWNrXG4gICAgICAgIHZhciB4bWwgPSBlLnRhcmdldC5yZXNwb25zZVhNTDtcbiAgICAgICAgdmFyIHBhcnRzID0gW107XG4gICAgICAgIGlmKCF4bWwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHhtbFBhcnRzID0geG1sLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdQYXJ0Jyk7XG4gICAgICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwoZmlsZS5zaXplIC8gY2h1bmtTaXplKTtcbiAgICAgICAgbGV0IHRhZ0NvbnRlbnQgPSBmdW5jdGlvbih0YWcsIHByb3ApOiBzdHJpbmcge1xuICAgICAgICAgIHJldHVybiB0YWcuZ2V0RWxlbWVudHNCeVRhZ05hbWUocHJvcClbMF0udGV4dENvbnRlbnQ7XG4gICAgICAgIH07XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB4bWxQYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBwYXJ0TnVtYmVyID0gcGFyc2VJbnQoXG4gICAgICAgICAgICB0YWdDb250ZW50KHhtbFBhcnRzW2ldLCAnUGFydE51bWJlcicpLCAxMFxuICAgICAgICAgICk7XG4gICAgICAgICAgdmFyIGV0YWcgPSB0YWdDb250ZW50KHhtbFBhcnRzW2ldLCAnRVRhZycpO1xuICAgICAgICAgIHZhciBzaXplID0gcGFyc2VJbnQoXG4gICAgICAgICAgICB0YWdDb250ZW50KHhtbFBhcnRzW2ldLCAnU2l6ZScpLCAxMFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZihwYXJ0TnVtYmVyICE9PSBudW1DaHVua3MgJiYgc2l6ZSAhPT0gY2h1bmtTaXplKSB7XG4gICAgICAgICAgICBjb250aW51ZTsgLy8gQ2h1bmsgY29ycnVwdGVkXG4gICAgICAgICAgfSBlbHNlIGlmKHBhcnROdW1iZXIgPT09IG51bUNodW5rcyAmJlxuICAgICAgICAgICAgICBzaXplICE9PSBmaWxlLnNpemUgJSBjaHVua1NpemUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBGaW5hbCBjaHVuayBjb3JydXB0ZWRcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBwYXJ0cy5wdXNoKFtcbiAgICAgICAgICAgIHBhcnROdW1iZXIsXG4gICAgICAgICAgICBldGFnLFxuICAgICAgICAgICAgc2l6ZSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaXNUcnVuY2F0ZWQgPSB0YWdDb250ZW50KHhtbCwgJ0lzVHJ1bmNhdGVkJyk7XG4gICAgICAgIGlmKGlzVHJ1bmNhdGVkLnRvU3RyaW5nKCkgPT09ICd0cnVlJykge1xuICAgICAgICAgIHZhciBwYXJ0TWFya2VyID0gdGFnQ29udGVudCh4bWwsICdOZXh0UGFydE51bWJlck1hcmtlcicpO1xuICAgICAgICAgIEFtYXpvblhIUi5saXN0KFxuICAgICAgICAgICAgYXV0aCxcbiAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICB1cGxvYWRJZCxcbiAgICAgICAgICAgIGNodW5rU2l6ZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKG5ld1BhcnRzKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHBhcnRzLmNvbmNhdChuZXdQYXJ0cykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2ssXG4gICAgICAgICAgICBwYXJ0TWFya2VyXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsYmFjayhwYXJ0cyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSkuc2VuZCgpO1xuICB9XG5cbiAgc3RhdGljIGZpbmlzaChhdXRoLCBrZXksIHVwbG9hZElkLCBwYXJ0cywgY2FsbGJhY2spIHtcbiAgICB2YXIgcXVlcnlzdHJpbmcgPSB7IHVwbG9hZElkIH07XG5cbiAgICAvLyBjb21wb3NlIHRoZSBDb21wbGV0ZU11bHRpcGFydFVwbG9hZCByZXF1ZXN0IGZvciBwdXR0aW5nXG4gICAgLy8gdGhlIGNodW5rcyB0b2dldGhlclxuICAgIHZhciBkYXRhU3RyaW5nOiBzdHJpbmcgPSAnPENvbXBsZXRlTXVsdGlwYXJ0VXBsb2FkPic7XG5cbiAgICBwYXJ0cy5tYXAoKFtudW1iZXIsIGV0YWddKSA9PiB7XG4gICAgICBkYXRhU3RyaW5nICs9IGBcbiAgICAgICAgPFBhcnQ+XG4gICAgICAgIDxQYXJ0TnVtYmVyPiR7bnVtYmVyfTwvUGFydE51bWJlcj5cbiAgICAgICAgPEVUYWc+JHtldGFnfTwvRVRhZz5cbiAgICAgICAgPC9QYXJ0PlxuICAgICAgYC50cmltKCk7XG4gICAgfSk7XG4gICAgZGF0YVN0cmluZyArPSAnPC9Db21wbGV0ZU11bHRpcGFydFVwbG9hZD4nO1xuXG4gICAgdmFyIGRhdGE6IHN0cmluZyB8IEJsb2IgPSBkYXRhU3RyaW5nO1xuICAgIC8vIGZpcmVmb3ggcmVxdWlyZXMgYSBzbWFsbCBoYWNrXG4gICAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvciAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSAhPT0gLTEpIHtcbiAgICAgIGRhdGEgPSBuZXcgQmxvYihbZGF0YV0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgQW1hem9uWEhSKHtcbiAgICAgIGF1dGgsXG4gICAgICBrZXksXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHF1ZXJ5c3RyaW5nLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBwYXlsb2FkOiBkYXRhLFxuICAgICAgbG9hZENhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgIGVycm9yQ2FsbGJhY2s6ICgpID0+IHt9LFxuICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogKCkgPT4ge30sXG4gICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiAoKSA9PiB7fSxcbiAgICAgIHRpbWVvdXRDYWxsYmFjazogKCkgPT4ge30sXG4gICAgfSkuc2VuZCgpO1xuICB9XG59XG4iLCIvKiBAZmxvdyAqL1xuXG5leHBvcnQgY29uc3QgS0IgPSAxMDI0O1xuZXhwb3J0IGNvbnN0IE1CID0gMTAyNCAqIEtCO1xuZXhwb3J0IGNvbnN0IEdCID0gMTAyNCAqIE1CO1xuZXhwb3J0IGNvbnN0IFNFQ09ORFMgPSAxMDAwOyAvLyAxMDAwbXNcbmV4cG9ydCBjb25zdCBERUJVRyA9IHRydWU7XG4iLCIvKiBAZmxvdyAqL1xuXG5pbXBvcnQgeyBERUJVRyB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIGlmKCEoREVCVUcgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY29uc29sZS5sb2cgIT09ICd1bmRlZmluZWQnKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhcmdzID0gWydbTXVsZVVwbG9hZGVyXSddO1xuICBmb3IobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIH1cbiAgcmV0dXJuIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xufVxuIiwiLyogQGZsb3cgKi9cblxuaW1wb3J0IHsgWEhSLCBURXZlbnQgfSBmcm9tICcuL3hocic7XG5pbXBvcnQgeyBBbWF6b25YSFIsIFRBdXRoIH0gZnJvbSAnLi9hbWF6b25YaHInO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBLQiwgTUIsIEdCLCBTRUNPTkRTIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG50eXBlIFRTZXR0aW5ncyA9IHtcbiAgZmlsZUlucHV0OiBURmlsZUlucHV0O1xuICBmaWxlOiA/RmlsZTtcbiAgYXV0b3N0YXJ0OiBib29sO1xuICBjaHVua1NpemU6IG51bWJlcjtcbiAgbWF4U2l6ZTogbnVtYmVyO1xuICBudW1Xb3JrZXJzOiBudW1iZXI7XG4gIGtleTogc3RyaW5nO1xuICBiYWNrdXBLZXk6IHN0cmluZztcbiAgYnVja2V0OiBzdHJpbmc7XG4gIGFjY2Vzc0tleTogc3RyaW5nO1xuICBjb250ZW50VHlwZTogc3RyaW5nO1xuICBhY2w6IHN0cmluZztcbiAgb25Qcm9ncmVzczogKCkgPT4gdm9pZDtcbiAgb25DaHVua1Byb2dyZXNzOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdDogKCkgPT4gdm9pZDtcbiAgb25FcnJvcjogKCkgPT4gdm9pZDtcbiAgb25Db21wbGV0ZTogKCkgPT4gdm9pZDtcbiAgb25Jbml0OiAoKSA9PiB2b2lkO1xuICBvblN0YXJ0OiAoKSA9PiB2b2lkO1xuICBvbkNodW5rVXBsb2FkZWQ6ICgpID0+IHZvaWQ7XG4gIGFqYXhCYXNlOiBzdHJpbmc7XG4gIGFjY2VwdGVkRXh0ZW5zaW9uczogc3RyaW5nO1xufTtcblxudHlwZSBUUGFydCA9IFtudW1iZXIsIHN0cmluZywgbnVtYmVyXTtcblxudHlwZSBURmlsZUV2ZW50ID0ge1xuICB0YXJnZXQ6IHtcbiAgICBmaWxlczogW0ZpbGVdO1xuICB9O1xufTtcblxudHlwZSBURmlsZUlucHV0ID0ge1xuICBvbmNoYW5nZTogKGU6IFRGaWxlRXZlbnQsIGZvcmNlOiBib29sZWFuKSA9PiA/Ym9vbDtcbiAgdmFsdWU6IHN0cmluZztcbn07XG5cbnR5cGUgVEludGVydmFsID0gbnVtYmVyO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGxvYWRlciB7XG4gIGlucHV0OiBURmlsZUlucHV0O1xuICBmaWxlOiA/RmlsZTtcbiAgc2V0dGluZ3M6IFRTZXR0aW5ncztcbiAgYXV0aDogVEF1dGg7XG4gIHVwbG9hZElkOiA/c3RyaW5nO1xuICBjaHVua3M6IEFycmF5PGJvb2xlYW4+O1xuICBsb2FkZWRDaHVua3M6IEFycmF5PE51bWJlcj47XG4gIHByb2dyZXNzOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9O1xuICB0b3RhbFByb2dyZXNzOiBudW1iZXI7XG4gIGxvYWRlZENodW5rczogP0FycmF5PG51bWJlcj47XG4gIHVwbG9hZGluZ0NodW5rczogP0FycmF5PG51bWJlcj47XG4gIHN0YXJ0RmlyZWQ6IGJvb2xlYW47XG4gIGludGVydmFsczogeyBba2V5OiBudW1iZXJdOiBUSW50ZXJ2YWwgfTtcbiAgY2h1bmtYaHI6IEFycmF5PFhNTEh0dHBSZXF1ZXN0PjtcbiAgc3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihzZXR0aW5nczogVFNldHRpbmdzKSB7XG4gICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgc2V0dGluZ3MgPSBzZXR0aW5ncyB8fCB7fTtcblxuICAgIC8vIE1ha2UgdGhlIGlucHV0IGVsZW1lbnQgYW5vdGhlciBwb3NzaWJsZSBzZXR0aW5nXG4gICAgLy8gaW4gc29tZSBjYXNlcyAoZS5nLiBkcmFnICYgZHJvcCkgdGhlcmUgaXMgbm8gaW5wdXQgZWxlbWVudFxuICAgIHRoaXMuaW5wdXQgPSBzZXR0aW5ncy5maWxlSW5wdXQ7XG4gICAgdGhpcy5maWxlICA9IHNldHRpbmdzLmZpbGU7XG5cbiAgICAvLyBUaGUgZmlsZSBzdGFydHMgYXV0b21hdGljYWxseSBieSBkZWZhdWx0OyB5b3UgaGF2ZSB0byBzZXRcbiAgICAvLyBhdXRvc3RhcnQ6IGZhbHNlIGV4cGxpY2l0bHkgaWYgeW91IHdhbnQgdG8gdXNlIGEgc3RhcnQgYnV0dG9uXG4gICAgLy8gaWYgYXV0b3N0YXJ0IGlzIGZhbHNlLCB5b3UgY2FuIHVzZSB0aGUgVXBsb2FkZXIucHJvdG90eXBlLnN0YXJ0KClcbiAgICAvLyBmdW5jdGlvbi4gTm90ZSB0aGF0IHRoZSB1c2VyIGhhcyB0byBzZWxlY3QgYSBmaWxlIGZpcnN0XG4gICAgc2V0dGluZ3MuYXV0b3N0YXJ0ID0gKCdhdXRvc3RhcnQnIGluIHNldHRpbmdzID8gc2V0dGluZ3MuYXV0b3N0YXJ0IDogdHJ1ZSk7XG5cbiAgICAvLyBOT1RFOiBGb3IgQW1hem9uIFMzLCB0aGUgbWluaW11bSBjaHVuayBzaXplIGlzIDVNQlxuICAgIC8vIHdlIGFyZSB1c2luZyA2IGZvciBzYWZlIG1lYXN1cmUuIE5vdGUgdGhhdCB0aGUgbWF4aW11bSBudW1iZXIgb2YgY2h1bmtzXG4gICAgLy8gaXMgMTAsMDAwLCBzbyBmb3IgZXhhbXBsZSwgaWYgdGhlIGNodW5rIHNpemUgaXMgNk1CLCB0aGUgbWF4aW11bVxuICAgIC8vIHBvc3NpYmxlIGZpbGUgc2l6ZSBpcyA2TUIgKiAxMCwwMDAgPSB+NThHQlxuICAgIHNldHRpbmdzLmNodW5rU2l6ZSA9IHNldHRpbmdzLmNodW5rU2l6ZSB8fCAoNiAqIE1CKTsgLy8gZGVmYXVsdCA2TUJcbiAgICBzZXR0aW5ncy5tYXhTaXplID0gc2V0dGluZ3MubWF4U2l6ZSB8fCA1ICogR0I7IC8vIDVHQlxuXG4gICAgLy8gVGhlIG51bWJlciBvZiBwYXJhbGxlbCB1cGxvYWQgeGhyJ3NcbiAgICBzZXR0aW5ncy5udW1Xb3JrZXJzID0gc2V0dGluZ3MubnVtV29ya2VycyB8fCAxO1xuXG4gICAgLy8gVGhlIFMzIG9iamVjdCBrZXk7IEkgcmVjb21tZW5kIHRvIGdlbmVyYXRlIHRoaXMgZHluYW1pY2FsbHkgKGUuZy5cbiAgICAvLyBhIHJhbmRvbSBzdHJpbmcpIHRvIGF2b2lkIHVud2FudGVkIG92ZXJ3cml0ZXMuXG4gICAgc2V0dGluZ3Mua2V5ID0gc2V0dGluZ3Mua2V5IHx8ICd0aGVfa2V5JztcblxuICAgIC8vIFRoZSBBbWF6b24gUzMgYnVja2V0IHdoZXJlIHlvdSdsbCBzdG9yZSB0aGUgdXBsb2Fkc1xuICAgIHNldHRpbmdzLmJ1Y2tldCA9IHNldHRpbmdzLmJ1Y2tldDtcblxuICAgIC8vIFRoZSBBbWF6b24gUzMgYWNjZXNzIGtleS4gRE8gTk9UIGdpdmUgdGhlIEFXUyBTZWNyZXQgY29kZSFcbiAgICBzZXR0aW5ncy5hY2Nlc3NLZXkgPSBzZXR0aW5ncy5hY2Nlc3NLZXk7XG5cbiAgICAvLyBUaGUgTWltZS1UeXBlIG9mIHRoZSBjb250ZW50LiBZb3UgbXVzdCBtYXRjaCB0aGlzIHdpdGggdGhlIGJhY2tlbmQgdmFsdWVcbiAgICAvLyBvciB5b3UnbGwgZ2V0IGFuIEludmFsaWQgU2lnbmF0dXJlIGVycm9yLiBJZiB1bnN1cmUgYWJvdXQgdGhlXG4gICAgLy8gbWltZSB0eXBlLCB1c2UgYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXG4gICAgc2V0dGluZ3MuY29udGVudFR5cGUgPSBzZXR0aW5ncy5jb250ZW50VHlwZSB8fCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJztcblxuXG4gICAgLy8gQUNMIGNhbiBiZSBzZXQgdG86XG4gICAgLy8gcHJpdmF0ZVxuICAgIC8vIHB1YmxpYy1yZWFkICgqIGRlZmF1bHQpXG4gICAgLy8gcHVibGljLXJlYWQtd3JpdGVcbiAgICAvLyBhdXRoZW50aWNhdGVkLXJlYWRcbiAgICAvLyBidWNrZXQtb3duZXItcmVhZFxuICAgIC8vIGJ1Y2tldC1vd25lci1mdWxsLWNvbnRyb2xcbiAgICAvLyBsb2ctZGVsaXZlcnktd3JpdGVcbiAgICBzZXR0aW5ncy5hY2wgPSBzZXR0aW5ncy5hY2wgfHwgJ3B1YmxpYy1yZWFkJztcblxuICAgIC8vIFZhcmlvdXMgY2FsbGJhY2tzXG4gICAgc2V0dGluZ3Mub25Qcm9ncmVzcyA9IHNldHRpbmdzLm9uUHJvZ3Jlc3MgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MgPSBzZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uU2VsZWN0ID0gc2V0dGluZ3Mub25TZWxlY3QgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25FcnJvciA9IHNldHRpbmdzLm9uRXJyb3IgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNvbXBsZXRlID0gc2V0dGluZ3Mub25Db21wbGV0ZSAgICAgICAgICAgICB8fCBmdW5jdGlvbigpIHt9O1xuICAgIHNldHRpbmdzLm9uSW5pdCA9IHNldHRpbmdzLm9uSW5pdCAgICAgICAgICAgICAgICAgICAgIHx8IGZ1bmN0aW9uKCkge307XG4gICAgc2V0dGluZ3Mub25TdGFydCA9IHNldHRpbmdzLm9uU3RhcnQgICAgICAgICAgICAgICAgICAgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICBzZXR0aW5ncy5vbkNodW5rVXBsb2FkZWQgPSBzZXR0aW5ncy5vbkNodW5rVXBsb2FkZWQgICB8fCBmdW5jdGlvbigpIHt9O1xuXG4gICAgLy8gVGhlIGxvY2F0aW9uIHByZWZpeCBvZiB0aGUgdXBsb2FkZXIncyBiYWNrZW5kXG4gICAgc2V0dGluZ3MuYWpheEJhc2UgPSBzZXR0aW5ncy5hamF4QmFzZSB8fCAnL3VwbG9hZC1iYWNrZW5kJztcblxuICAgIC8vIEV4dGVuc2lvbnMgY29tbWEgZGVsaW1pdGVkIHdpdGhvdXQgcGVyaW9kIChqcGcsanBlZyxwbmcsZ2lmKVxuICAgIHNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucyA9IHNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucyB8fCAnJztcblxuICAgIC8vIFNldCB0aGUgdmFsdWVzIHNvIHRoYXQgdGhleSBjYW4gYmUgdXNlZCBldmVyeXdoZXJlLCBhcyBuZWVkZWRcbiAgICBzZWxmLnNldHRpbmdzID0gc2V0dGluZ3M7XG5cbiAgICAvLyBUaGUgXCJ3YWl0aW5nXCIgc3RhdGUgbWVhbnMgdGhlIHVwbG9hZGVyIGlzIHdhaXRpbmcgZm9yIHRoZSB1c2VyXG4gICAgLy8gdG8gc2VsZWN0IGEgZmlsZVxuICAgIHNlbGYuc2V0U3RhdGUoJ3dhaXRpbmcnKTtcblxuICAgIGlmKHNlbGYuaW5wdXQpIHtcbiAgICAgIHNlbGYuaW5wdXQub25jaGFuZ2UgPSBmdW5jdGlvbihlLCBmb3JjZSkge1xuICAgICAgICBpZighc2VsZi5zZXR0aW5ncy5hdXRvc3RhcnQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGUgYG9uY2hhbmdlYCBldmVudCBtYXkgYmUgdHJpZ2dlcmVkIG11bHRpcGxlIHRpbWVzLCBzbyB3ZVxuICAgICAgICAvLyBtdXN0IGVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBvbmx5IGV4ZWN1dGVkIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIHVwbG9hZGVyIGRvZXNuJ3Qgc3VwcG9ydCBtdWx0aXBsZSB1cGxvYWRzIGF0IHRoaXMgdGltZSxcbiAgICAgICAgLy8gc28gd2UgZ2V0IHRoZSBmaXJzdCBmaWxlXG4gICAgICAgIHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgIHNlbGYudXBsb2FkRmlsZShmaWxlLCBmb3JjZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyB0cmlnZ2VyIHRoZSBpbml0IGV2ZW50IGNhbGxiYWNrXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Jbml0LmFwcGx5KHNlbGYpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZih0aGlzLmlucHV0ICYmIHRoaXMuaW5wdXQuZmlsZXMgJiYgdGhpcy5pbnB1dC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy51cGxvYWRGaWxlKHRoaXMuaW5wdXQuZmlsZXNbMF0sIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoJ05vIGZpbGUgc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cblxuICB1cGxvYWRGaWxlKGZpbGU6IEZpbGUsIGZvcmNlOiBib29sZWFuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gVGhlIGBvbmNoYW5nZWAgZXZlbnQgbWF5IGJlIHRyaWdnZXJlZCBtdWx0aXBsZSB0aW1lcywgc28gd2VcbiAgICAvLyBtdXN0IGVuc3VyZSB0aGF0IHRoZSBjYWxsYmFjayBpcyBvbmx5IGV4ZWN1dGVkIHRoZSBmaXJzdCB0aW1lXG4gICAgLy8gYWxzbyBtYWtlIHN1cmUgdGhlIGZpbGUgaXMgbm90IGFscmVhZHkgc2V0LlxuICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSAhPT0gJ3dhaXRpbmcnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoZmlsZSkge1xuICAgICAgc2VsZi5maWxlID0gZmlsZTtcbiAgICB9XG5cbiAgICBpZighc2VsZi5maWxlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gV2UgdXNlIHRoZSBsYXN0TW9kaWZpZWREYXRlLCB0aGUgZmlsZSBuYW1lIGFuZCBzaXplIHRvIHVuaXF1ZWx5XG4gICAgLy8gaWRlbnRpZnkgYSBmaWxlLiBUaGVyZSBtYXkgYmUgZmFsc2UgcG9zaXRpdmVzIGFuZCBuZWdhdGl2ZXMsXG4gICAgLy8gYnV0IHRoZSBjaGFuY2UgZm9yIGEgZmFsc2UgcG9zaXRpdmUgaXMgYmFzaWNhbGx5IHplcm9cbiAgICAvLyBzb21lIGJyb3dzZXJzIGRvbid0IHJlcG9ydCB0aGUgbGFzdCBtb2RpZmllZCBkYXRlLCBzbyB3ZSBkZWZhdWx0XG4gICAgLy8gdG8gYSBibGFuayBkYXRlXG4gICAgaWYoc2VsZi5maWxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZWxmLmZpbGUubGFzdE1vZGlmaWVkRGF0ZSA9IHNlbGYuZmlsZS5sYXN0TW9kaWZpZWREYXRlIHx8IG5ldyBEYXRlKDApO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoc2VsZi5maWxlLnNpemUgPiBzZWxmLnNldHRpbmdzLm1heFNpemUpIHtcbiAgICAgIGFsZXJ0KFtcbiAgICAgICAgJ1RoZSBtYXhpbXVtIGFsbG93ZWQgZmlsZSBzaXplIGlzICcsXG4gICAgICAgIChzZWxmLnNldHRpbmdzLm1heFNpemUgLyBHQiksXG4gICAgICAgICdHQi4gUGxlYXNlIHNlbGVjdCBhbm90aGVyIGZpbGUuJyxcbiAgICAgIF0uam9pbignJykpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBhY2NlcHRlZCBleHRlbnNpb25zLCBpZiBhcHBsaWNhYmxlXG4gICAgaWYoc2VsZi5zZXR0aW5ncy5hY2NlcHRlZEV4dGVuc2lvbnMpIHtcbiAgICAgIC8vIEdldCB0aGUgZmlsZSBleHRlbnNpb25cbiAgICAgIHZhciBmaWxlRXh0ZW5zaW9uID0gZmlsZS5uYW1lLnNwbGl0KCcuJykucG9wKCk7XG5cbiAgICAgIC8vIFNwbGl0IHRoZSBnaXZlbiBleHRlbnNpb25zIGludG8gYW4gYXJyYXlcbiAgICAgIHZhciBleHRlbnNpb25zQXJyYXkgPSBzZWxmLnNldHRpbmdzLmFjY2VwdGVkRXh0ZW5zaW9ucy5zcGxpdCgnLCcpO1xuXG4gICAgICAvLyBBbmQgbWF0Y2ggdGhlIGV4dGVuc2lvbiBhZ2FpbnN0IHRoZSBnaXZlbiBleHRlbnNpb24gbGlzdFxuICAgICAgdmFyIGZpbGVBY2NlcHRlZCA9IGZhbHNlO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGV4dGVuc2lvbnNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihmaWxlRXh0ZW5zaW9uID09PSBleHRlbnNpb25zQXJyYXlbaV0pIHtcbiAgICAgICAgICBmaWxlQWNjZXB0ZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBmaWxlIGlzIG5vdCBhY2NlcHRlZCwgbm90aWZ5IHRoZSB1c2VyIGFuZCByZXR1cm5cbiAgICAgIGlmKCFmaWxlQWNjZXB0ZWQpIHtcbiAgICAgICAgYWxlcnQoW1xuICAgICAgICAgICdUaGlzIGZpbGUgZm9ybWF0IGlzIG5vdCBhY2NlcHRlZC4gJyxcbiAgICAgICAgICAnUGxlYXNlIHVzZSBhIGZpbGUgd2l0aCBhbiBleHRlbnNpb24gbGlrZSAnLFxuICAgICAgICAgIHNlbGYuc2V0dGluZ3MuYWNjZXB0ZWRFeHRlbnNpb25zLFxuICAgICAgICBdLmpvaW4oJycpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgdGhlIGZpbGUgdXBsb2FkXG4gICAgLy8gYWxzbywgYWxsb3cgdGhlIGxpYnJhcnkgdXNlciB0byBwcm9ncmFtYXRpY2FsbHkgY2FuY2VsIHRoZSB1cGxvYWQgaWYsXG4gICAgLy8gZm9yIGV4YW1wbGUsIHRoZSBmaWxlIGlzIHRvbyBsYXJnZVxuICAgIGNvbnN0IHJlc3VsdCA9IHNlbGYuc2V0dGluZ3Mub25TZWxlY3QuY2FsbCh0aGlzLCBmaWxlKTtcbiAgICBpZihyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICBzZWxmLmZpbGUgPSBudWxsO1xuICAgICAgc2VsZi5pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBhcmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLnNldHRpbmdzLmV4dHJhUGFyYW1zIHx8IHt9LCB7XG4gICAgICBmaWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgZmlsZXNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWREYXRlLnZhbHVlT2YoKSxcbiAgICB9KTtcblxuICAgIGlmKGZvcmNlKSB7XG4gICAgICBhcmdzLmZvcmNlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIHNpZ25pbmcga2V5LiBJdCB3aWxsIGFsc28gcmV0dXJuXG4gICAgLy8gYSBmaWxlIGtleSArIHVwbG9hZElkIHBhaXIgaWYgdGhlIHNlbGVjdGVkIGZpbGVcbiAgICAvLyBpcyBhbHJlYWR5IHVwbG9hZGluZy4gSXQgYWxzbyByZXR1cm5zIGFcbiAgICAvLyBiYWNrdXBfa2V5IGluIGNhc2UgdGhhdCBmaWxlIHVwbG9hZCBhbHJlYWR5IGNvbXBsZXRlZC5cbiAgICAvLyBUaGUgc2lnbmluZyBrZXkgaXMgdmFsaWQgZm9yIDcgZGF5c1xuICAgIFhIUih7XG4gICAgICB1cmw6IHNlbGYuc2V0dGluZ3MuYWpheEJhc2UgKyAnL3NpZ25pbmdfa2V5LycsXG4gICAgICBleHRyYVBhcmFtczogYXJncyxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGxvYWRDYWxsYmFjazogZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIganNvbiA9IEpTT04ucGFyc2UoZS50YXJnZXQucmVzcG9uc2VUZXh0KTtcbiAgICAgICAganNvbi5kYXRlID0gbmV3IERhdGUoanNvbi5kYXRlKTtcbiAgICAgICAgc2VsZi5hdXRoID0ganNvbjtcbiAgICAgICAgc2VsZi51cGxvYWRJZCA9IGpzb24udXBsb2FkSWQ7XG4gICAgICAgIHNlbGYuY2h1bmtzID0ganNvbi5jaHVua3M7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mua2V5ID0ganNvbi5rZXkgfHwgc2VsZi5zZXR0aW5ncy5rZXk7XG4gICAgICAgIHNlbGYuc2V0dGluZ3MuYmFja3VwS2V5ID0gc2VsZi5zZXR0aW5ncy5rZXk7XG5cbiAgICAgICAgaWYoIXNlbGYudXBsb2FkSWQpIHtcbiAgICAgICAgICBBbWF6b25YSFIuaW5pdChqc29uLCBzZWxmLnNldHRpbmdzLmtleSwgZmlsZSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHhtbCA9IGUudGFyZ2V0LnJlc3BvbnNlWE1MO1xuXG4gICAgICAgICAgICAvLyBHZXQgdGhlIGdpdmVuIHVwbG9hZCBpZFxuICAgICAgICAgICAgc2VsZi51cGxvYWRJZCA9IHhtbC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVXBsb2FkSWQnKVswXS50ZXh0Q29udGVudDtcblxuICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlc3VtZSBhIHByZXZpdXMgdXBsb2FkXG4gICAgICAgICAgaWYoIWZvcmNlICYmIHNlbGYuZmlsZSkge1xuICAgICAgICAgICAgLy8gR2V0IHRoZSB1cGxvYWRlZCBwYXJ0cyBmcm9tIFMzXG4gICAgICAgICAgICBBbWF6b25YSFIubGlzdChcbiAgICAgICAgICAgICAgc2VsZi5hdXRoLCBzZWxmLmZpbGUsIHNlbGYuc2V0dGluZ3Mua2V5LFxuICAgICAgICAgICAgICBzZWxmLnVwbG9hZElkLCBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSwgZnVuY3Rpb24ocGFydHMpIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBjaHVuayA9IHBhcnRzW2ldWzBdIC0gMTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuc2V0UHJvZ3Jlc3MoY2h1bmssIHNlbGYuZ2V0Q2h1bmtTaXplKGNodW5rKSk7XG4gICAgICAgICAgICAgICAgICBzZWxmLnNldENodW5rRmluaXNoZWQoY2h1bmspO1xuICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuaywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRGaWxlKCk7XG4gICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIElmIGl0IGZhaWxzLCByZS1pbml0aWF0ZSB0aGUgdXBsb2FkLCBhbmQgZm9yY2VcbiAgICAgICAgICAgICAgICAvLyBpdCB0byBzdGFydCBhIG5ldyB1cGxvYWRcbiAgICAgICAgICAgICAgICBzZWxmLnVwbG9hZElkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLmxvYWRlZENodW5rcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5wcm9ncmVzcyA9IHt9O1xuICAgICAgICAgICAgICAgIHNlbGYudG90YWxQcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICAgICAgc2VsZi5sb2FkZWRDaHVua3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIHNlbGYudXBsb2FkaW5nQ2h1bmtzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzZWxmLmNodW5rcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0dGluZ3Mua2V5ID0gc2VsZi5zZXR0aW5ncy5iYWNrdXBLZXk7XG4gICAgICAgICAgICAgICAgc2VsZi51cGxvYWRGaWxlKGZpbGUsIHRydWUpOyAvLyBGb3JjZSByZWxvYWRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZm9yY2Utc3RhcnQgdGhlIHVwbG9hZFxuICAgICAgICAgICAgc2VsZi5sb2FkRmlsZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRGaWxlKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFdlIGNhbid0IHN0YXJ0IHRoZSB1cGxvYWQgaWYgd2UgYXJlIHdhaXRpbmcgZm9yIHVzZXIgaW5wdXRcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICd3YWl0aW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBmaWxlID0gc2VsZi5maWxlO1xuXG4gICAgaWYoZmlsZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTWFrZSBzdXJlIHdlIG9ubHkgdHJpZ2dlciB0aGUgc3RhcnQgZXZlbnQgb25jZVxuICAgIGlmKCFzZWxmLl9zdGFydEZpcmVkKSB7XG4gICAgICAvLyBUcmlnZ2VyIHRoZSBzdGFydCBldmVudCBjYWxsYmFja1xuICAgICAgc2VsZi5zZXR0aW5ncy5vblN0YXJ0LmNhbGwoc2VsZiwgc2VsZi5maWxlKTtcblxuICAgICAgLy8gQW5kIGFsc28gdHJpZ2dlciBhIHByb2dyZXNzIGNhbGxiYWNrIHdpdGggMCVcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKHNlbGYsIDAsIGZpbGUuc2l6ZSk7XG4gICAgICBzZWxmLnN0YXJ0RmlyZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZyb20gbm93IG9uLCB3ZSBhcmUgXCJwcm9jZXNzaW5nXCIgdGhlIGZpbGUgdXBsb2FkXG4gICAgc2VsZi5zZXRTdGF0ZSgncHJvY2Vzc2luZycpO1xuXG4gICAgLy8gQXQgdGhpcyBwb2ludCB3ZSBtYXkgaGF2ZSBzb21lIGNodW5rcyBhbHJlYWR5IHVwbG9hZGVkLFxuICAgIC8vIFNvIHdlIG1heSB0cmlnZ2VyIGEgcHJvZ3Jlc3MgY2FsbGJhY2sgd2l0aCB0aGUgcmVwb3J0ZWQgcHJvZ3Jlc3NcbiAgICBzZWxmLnNldHRpbmdzLm9uUHJvZ3Jlc3MuY2FsbChcbiAgICAgIHNlbGYsIHNlbGYuZ2V0VG90YWxQcm9ncmVzcygpLCBmaWxlLnNpemVcbiAgICApO1xuXG4gICAgLy8gR2V0IHRoZSBuZXh0IGNodW5rXG4gICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG5cbiAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAvLyBBbmQgc3RhcnQgdXBsb2FkaW5nIGl0XG4gICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgfSBlbHNlIGlmKHNlbGYudXBsb2FkRmluaXNoZWQoKSkge1xuICAgICAgLy8gSWYgd2UgZmluaXNoZWQsIHRyaWdnZXIgdGhlIHVwbG9hZCBmaW5pc2ggc2VxdWVuY2VcbiAgICAgIGxvZygnQWxsIGRvbmU7IGZpbmlzaCB1cGxvYWQnKTtcbiAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0dGluZ3MubnVtV29ya2VycyAtIDE7IGkrKykge1xuICAgICAgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBsb2FkQ2h1bmsoY2h1bms6IG51bWJlcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIE1ha2Ugc3VyZSB3ZSdyZSBpbiBwcm9jZXNzaW5nIG1vZGVcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgbG9nKCdOT1QgcHJvY2Vzc2luZzsgcmV0dXJuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQWxzbyBtYWtlIHN1cmUgd2UncmUgbm90IGFscmVhZHkgdXBsb2FkaW5nIHRoaXMgY2h1bmtcbiAgICBpZihzZWxmLmdldENodW5rVXBsb2FkaW5nKGNodW5rKSkge1xuICAgICAgbG9nKCdBbHJlYWR5IFVwbG9hZGluZycpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKHNlbGYuZ2V0TmV4dENodW5rKCkpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTWFyayB0aGlzIGNodW5rIGFzIHVwbG9hZGluZ1xuICAgICAgc2VsZi5zZXRDaHVua1VwbG9hZGluZyhjaHVuayk7XG4gICAgfVxuICAgIGxvZyhgVXBsb2FkaW5nIENodW5rOiAke2NodW5rfWApO1xuXG4gICAgLy8gSWYgd2UgYWxyZWFkeSB1cGxvYWRlZCB0aGlzIGNodW5rLCBnZXQgdG8gdGhlIG5leHQgb25lXG4gICAgLy8gaWYgdGhlcmUgaXMgbm8gbmV4dCBjaHVuaywgZmluaXNoIHRoZSB1cGxvYWRcbiAgICBpZihzZWxmLmlzQ2h1bmtMb2FkZWQoY2h1bmspKSB7XG4gICAgICB2YXIgbmV4dENodW5rID0gc2VsZi5nZXROZXh0Q2h1bmsoKTtcbiAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgbG9nKCdObyBuZXh0IGNodW5rOyBmaW5pc2ggdXBsb2FkJyk7XG4gICAgICAgICAgc2VsZi5maW5pc2hVcGxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZTtcblxuICAgIC8vIEdldCB0aGUgc3RhcnQgYW5kIGVuZCBieXRlcyBmb3IgdGhlIG5lZWRlZCBjaHVua1xuICAgIHZhciBzdGFydCA9IGNodW5rICogbGVuZ3RoO1xuICAgIHZhciBmaWxlID0gc2VsZi5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbmQgPSBNYXRoLm1pbihzdGFydCArIGxlbmd0aCwgZmlsZS5zaXplKTtcblxuICAgIC8vIFdlIG5lZWQgdGhlIGxhc3QgcHJvZ3Jlc3MgdGltZSBpbiBvcmRlciB0byBkZXRlY3QgaGFuZ2luZ1xuICAgIC8vIHVwbG9hZHNcbiAgICB2YXIgbGFzdFByb2dyZXNzVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgc2VsZi5pbnRlcnZhbHMgPSBzZWxmLmludGVydmFscyB8fCB7fTtcblxuICAgIHZhciBlcnJvckhhbmRsZWQgPSBmYWxzZTtcbiAgICB2YXIgZXJyb3JIYW5kbGVyOiAoKSA9PiB2b2lkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXJyb3JBcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgeGhyID0gdGhpcztcbiAgICAgIC8vIFRoZSB1cGxvYWQgbWF5IGhhdmUgZmluaXNoZWQsIHNvIGNoZWNrIGZvciB0aGF0XG4gICAgICBzZWxmLmNoZWNrQWxyZWFkeVVwbG9hZGVkKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZighZmlsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBhbHJlYWR5IHVwbG9hZGVkXG4gICAgICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGVkJyk7XG5cbiAgICAgICAgLy8gVE9ETzogd2hhdCBpcyB0aGlzP1xuICAgICAgICAvLyBzZWxmLm5vdGlmeVVwbG9hZEZpbmlzaGVkKCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBhIGZpbmFsIHByb2dyZXNzIGV2ZW50IGNhbGxiYWNrLCB3aXRoIDEwMCVcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vblByb2dyZXNzLmNhbGwoXG4gICAgICAgICAgc2VsZixcbiAgICAgICAgICBmaWxlLnNpemUsXG4gICAgICAgICAgZmlsZS5zaXplXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQWxzbyB0cmlnZ2VyIHRoZSBjb21wbGV0ZSBldmVudCBjYWxsYmFja1xuICAgICAgICBzZWxmLnNldHRpbmdzLm9uQ29tcGxldGUuY2FsbChzZWxmKTtcbiAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBXZSBoYXZlIGEgZ2VudWluZSBlcnJvclxuICAgICAgICBsb2coYEVycm9yOiAke2Vycm9yQXJndW1lbnRzfWApO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBkb24ndCBoYW5kbGUgdGhlIHNhbWUgZXJyb3IgbW9yZSB0aGFuIG9uY2VcbiAgICAgICAgaWYoZXJyb3JIYW5kbGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVycm9ySGFuZGxlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gYWJvcnQgdGhlIGNodW5rIHVwbG9hZFxuICAgICAgICBzZWxmLnNldENodW5rVXBsb2FkaW5nKGNodW5rLCBmYWxzZSk7XG4gICAgICAgIHNlbGYuc2V0Q2h1bmtGaW5pc2hlZChjaHVuaywgZmFsc2UpO1xuICAgICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCAwKTtcbiAgICAgICAgbG9nKCdBYm9ydCcpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBsb2coZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2coYFJldHJ5IGNodW5rOiAke2NodW5rfWApO1xuXG4gICAgICAgIC8vIENsZWFyIHRoZSB3YXRjaGVyIGludGVydmFsXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5pbnRlcnZhbHNbY2h1bmtdKTtcblxuICAgICAgICAvLyBSZS10cnkgdGhlIHVwbG9hZFxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSA9PT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgICAgICAvLyBBbmQgcHJvY2VlZFxuICAgICAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKGNodW5rKTtcbiAgICAgICAgICAgIGlmKG5leHRDaHVuayAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgc2VsZi51cGxvYWRDaHVuayhuZXh0Q2h1bmspO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gVGhlIFwicmVhZHlzdGF0ZWNoYW5nZVwiIGhhbmRsZXJcbiAgICB2YXIgaGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIFdlIGNhcmUgYWJvdXQgdGhlIFwiZG9uZVwiIGV2ZW50IHRyaWdnZXJlZCB3aGlsZSBwcm9jZXNzaW5nXG4gICAgICBpZihlLnRhcmdldC5yZWFkeVN0YXRlICE9PSB0aGlzLkRPTkUgfHxcbiAgICAgICAgICBzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgICBsb2coZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgZG9uJ3QgcmVjZWl2ZSBhIDJYWCByZXNwb25zZSwgdHJpZ2dlciBhbiBlcnJvclxuICAgICAgaWYocGFyc2VJbnQoZS50YXJnZXQuc3RhdHVzKSAvIDEwMCAhPT0gMikge1xuICAgICAgICBpZih0eXBlb2YgZXJyb3JIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlci5hcHBseSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBrbm93IHRoYXQgdGhpcyBjaHVuayBmaW5pc2hlZCB1cGxvYWRpbmdcbiAgICAgIGxvZyhgQ2h1bmsgdXBsb2FkZWQ6ICR7Y2h1bmt9YCk7XG5cbiAgICAgIC8vIE5vdGlmeSB0aGUgc2VydmVyIG9mIHRoZSB1cGxvYWRlZCBjaHVua1xuICAgICAgc2VsZi5ub3RpZnlDaHVua1VwbG9hZGVkKGNodW5rKTtcblxuICAgICAgLy8gQW5kIGFsc28gdHJpZ2dlciB0aGUgY2h1bmtfdXBsb2FkZWQgY2FsbGJhY2tcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkLmNhbGwoc2VsZiwgY2h1bmspO1xuXG4gICAgICAvLyBDYW5jZWwgdGhlIHhociB3YXRjaGVyIGludGVydmFsXG4gICAgICBjbGVhckludGVydmFsKHNlbGYuaW50ZXJ2YWxzW2NodW5rXSk7XG5cbiAgICAgIC8vIE1hcmsgdGhlIGNodW5rIGFzIGZpbmlzaGVkXG4gICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCBzZWxmLmdldENodW5rU2l6ZShjaHVuaykpO1xuICAgICAgc2VsZi5zZXRDaHVua0ZpbmlzaGVkKGNodW5rKTtcbiAgICAgIHNlbGYuc2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmssIGZhbHNlKTtcblxuICAgICAgLy8gR2V0IG5leHQgY2h1bms7IGlmIHdlJ3JlIG91dCBvZiBjaHVua3MsXG4gICAgICAvLyBmaW5pc2ggdGhlIHVwbG9hZFxuICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICBpZihuZXh0Q2h1bmsgIT09IC0xKSB7XG4gICAgICAgIHNlbGYudXBsb2FkQ2h1bmsobmV4dENodW5rKTtcbiAgICAgIH0gZWxzZSBpZihzZWxmLnVwbG9hZEZpbmlzaGVkKCkpIHtcbiAgICAgICAgbG9nKCdEb25lJyk7XG4gICAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgY2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgICAgIGlmKGNodW5rICE9PSAtMSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKGNodW5rKTtcbiAgICAgICAgICB9IGVsc2UgaWYoc2VsZi51cGxvYWRGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgIHNlbGYuZmluaXNoVXBsb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gVGhlIHVwbG9hZCBwcm9ncmVzcyBoYW5kbGVyXG4gICAgdmFyIHByb2dyZXNzSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIC8vIFNldCB0aGUgaW50ZXJuYWwgY2h1bmsncyBwcm9ncmVzcyB2YWx1ZSB0byB0aGUgcmVwb3J0ZWQgYW1vdW50XG4gICAgICBzZWxmLnNldFByb2dyZXNzKGNodW5rLCBlLmxvYWRlZCk7XG4gICAgICB2YXIgZmlsZSA9IHNlbGYuZmlsZTtcbiAgICAgIGlmKCFmaWxlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVHJpZ2dlciB0aGUgcHJvZ3Jlc3MgZXZlbnQgY2FsbGJhY2tcbiAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgICBzZWxmLCBzZWxmLmdldFRvdGFsUHJvZ3Jlc3MoKSwgZmlsZS5zaXplXG4gICAgICApO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIGxhc3RfcHJvZ3Jlc3NfdGltZSBmb3IgdGhlIHdhdGNoZXIgaW50ZXJ2YWxcbiAgICAgIGxhc3RQcm9ncmVzc1RpbWUgPSBuZXcgRGF0ZSgpO1xuICAgIH07XG5cbiAgICBBbWF6b25YSFIudXBsb2FkQ2h1bmsoXG4gICAgICBzZWxmLmF1dGgsIHNlbGYuc2V0dGluZ3Mua2V5LCBzZWxmLnVwbG9hZElkLFxuICAgICAgY2h1bmssIGZpbGUuc2xpY2Uoc3RhcnQsIGVuZCksIHtcbiAgICAgICAgcHJvZ3Jlc3NDYWxsYmFjazogcHJvZ3Jlc3NIYW5kbGVyLFxuICAgICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiBoYW5kbGVyLFxuICAgICAgICBlcnJvckNhbGxiYWNrOiBlcnJvckhhbmRsZXIsXG4gICAgICAgIHRpbWVvdXRDYWxsYmFjazogZXJyb3JIYW5kbGVyLFxuICAgICAgfSwgZnVuY3Rpb24oeGhyKSB7XG4gICAgICAgIHNlbGYuY2h1bmtYaHIgPSBzZWxmLmNodW5rWGhyIHx8IFtdO1xuICAgICAgICBzZWxmLmNodW5rWGhyLnB1c2goeGhyKTtcblxuICAgICAgICAvLyBUaGUgd2F0Y2hlciBpbnRlcnZhbDsgaXQgY2FuY2VscyB0aGUgeGhyIGlmIGl0IHRpbWVzIG91dFxuICAgICAgICBzZWxmLmludGVydmFsc1tjaHVua10gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZihsYXN0UHJvZ3Jlc3NUaW1lICYmXG4gICAgICAgICAgICAgIChuZXcgRGF0ZSgpIC0gbGFzdFByb2dyZXNzVGltZSkgPiAxNSAqIFNFQ09ORFMpIHsgLy8gMTVzXG4gICAgICAgICAgICBsb2coJ0NodW5rIEZhaWxlZDsgcmV0cnknKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2VsZi5pbnRlcnZhbHNbY2h1bmtdKTtcbiAgICAgICAgICAgIGlmKHNlbGYuZ2V0U3RhdGUoKSA9PT0gJ3Byb2Nlc3NpbmcnKSB7XG4gICAgICAgICAgICAgIHhoci5hYm9ydCgpO1xuICAgICAgICAgICAgICBlcnJvckhhbmRsZXIuY2FsbCh4aHIpO1xuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jaHVua1hoclt0aGlzLl9jaHVua1hoci5pbmRleE9mKHhocildXG4gICAgICAgICAgICAgICAgICAgICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmNodW5rWGhyW3RoaXMuX2NodW5rWGhyLmluZGV4T2YoeGhyKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sIDQgKiBTRUNPTkRTKTsgLy8gRXZlcnkgNHNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgZmluaXNoVXBsb2FkKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgZmlsZSA9IHNlbGYuZmlsZTtcbiAgICBpZighZmlsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE1ha2Ugc3VyZSBpdCdzIG5vdCB0cmlnZ2VyZWQgd2hlbiBub3QgcHJvY2Vzc2luZyAoZS5nLiBtdWx0aXBsZSB0aW1lcylcbiAgICBpZihzZWxmLmdldFN0YXRlKCkgIT09ICdwcm9jZXNzaW5nJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoYW5nZSB0aGUgdXBsb2FkJ3Mgc3RhdGVcbiAgICBzZWxmLnNldFN0YXRlKCdmaW5pc2hpbmcnKTtcblxuICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgc2VsZiwgZmlsZS5zaXplLCBmaWxlLnNpemVcbiAgICApOyAvLyAxMDAlIGRvbmUuXG5cblxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24oZTogVEV2ZW50KSB7XG4gICAgICBpZighZmlsZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBJLmUuIGlmIGl0J3MgYSAyWFggcmVzcG9uc2VcbiAgICAgIGlmKE1hdGguZmxvb3IoZS50YXJnZXQuc3RhdHVzIC8gMTAwKSA9PT0gMikge1xuICAgICAgICBsb2coJ0ZpbmlzaGVkIGZpbGUuJyk7XG4gICAgICAgIHNlbGYuc2V0U3RhdGUoJ2ZpbmlzaGVkJyk7XG4gICAgICAgIHNlbGYuc2V0dGluZ3Mub25Qcm9ncmVzcy5jYWxsKFxuICAgICAgICAgIHNlbGYsIGZpbGUuc2l6ZSwgZmlsZS5zaXplXG4gICAgICAgICk7IC8vIEl0J3MgMTAwJSBkb25lXG5cbiAgICAgICAgLy8gVHJpZ2dlciB0aGUgY29tcGxldGUgZXZlbnQgY2FsbGJhY2tcbiAgICAgICAgc2VsZi5zZXR0aW5ncy5vbkNvbXBsZXRlLmNhbGwoc2VsZik7XG4gICAgICB9IGVsc2UgaWYoXG4gICAgICAgIGUudGFyZ2V0LnN0YXR1cyA9PT0gNDAwICYmXG4gICAgICAgIGUudGFyZ2V0LnJlc3BvbnNlVGV4dCAmJlxuICAgICAgICBlLnRhcmdldC5yZXNwb25zZVRleHQuaW5kZXhPZignRW50aXR5VG9vU21hbGwnKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICAvLyBBbiBcIkVudGl0eVRvb1NtYWxsXCIgZXJyb3IgbWVhbnMgdGhhdCB3ZSBtaXNzZWQgYSBjaHVua1xuICAgICAgICBBbWF6b25YSFIubGlzdChcbiAgICAgICAgICBzZWxmLmF1dGgsXG4gICAgICAgICAgZmlsZSxcbiAgICAgICAgICBzZWxmLnNldHRpbmdzLmtleSxcbiAgICAgICAgICBzZWxmLnVwbG9hZElkLFxuICAgICAgICAgIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplLFxuICAgICAgICAgIChwYXJ0cykgPT4ge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVDaHVua3MocGFydHMpO1xuICAgICAgICAgICAgdmFyIG5leHRDaHVuayA9IHNlbGYuZ2V0TmV4dENodW5rKCk7XG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKCdwcm9jZXNzaW5nJyk7XG4gICAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoKSA9PiB7fVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmKGUudGFyZ2V0LnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIC8vIDQwNCA9IE5vU3VjaFVwbG9hZCA9IGNoZWNrIGlmIGFscmVhZHkgZmluaXNoZWRcbiAgICAgICAgLy8gSWYgc28sIHN0YXJ0IGEgbmV3IHVwbG9hZFxuICAgICAgICBzZWxmLmNhbmNlbChmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZighc2VsZi5maWxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlbGYudXBsb2FkRmlsZShzZWxmLmZpbGUsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuY2hlY2tBbHJlYWR5VXBsb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlcih7XG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgICAgICAgIHJlc3BvbnNlVGV4dDogbnVsbCxcbiAgICAgICAgICAgICAgcmVzcG9uc2VYTUw6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICBoYW5kbGVyKHtcbiAgICAgICAgICAgIHRhcmdldDoge1xuICAgICAgICAgICAgICBzdGF0dXM6IDQwNCxcbiAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0OiBudWxsLFxuICAgICAgICAgICAgICByZXNwb25zZVhNTDogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBBbWF6b25YSFIubGlzdChcbiAgICAgIHNlbGYuYXV0aCwgZmlsZSwgc2VsZi5zZXR0aW5ncy5rZXksXG4gICAgICBzZWxmLnVwbG9hZElkLCBzZWxmLnNldHRpbmdzLmNodW5rU2l6ZSxcbiAgICAgIChwYXJ0cykgPT4ge1xuICAgICAgICBpZighZmlsZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbnVtQ2h1bmtzID0gTWF0aC5jZWlsKGZpbGUuc2l6ZSAvIHNlbGYuc2V0dGluZ3MuY2h1bmtTaXplKTtcblxuICAgICAgICAvLyBDaGVjayB0aGF0IHdlIHVwbG9hZGVkIGFsbCB0aGUgY2h1bmtzOyBpZiB3ZSBkaWRuJ3QsXG4gICAgICAgIC8vIHN0YXJ0IHVwbG9hZGluZyB0aGUgbWlzc2luZyBvbmVzXG4gICAgICAgIGlmKHBhcnRzLmxlbmd0aCAhPT0gbnVtQ2h1bmtzKSB7XG4gICAgICAgICAgc2VsZi51cGRhdGVDaHVua3MocGFydHMpO1xuICAgICAgICAgIHZhciBuZXh0Q2h1bmsgPSBzZWxmLmdldE5leHRDaHVuaygpO1xuICAgICAgICAgIHNlbGYuc2V0U3RhdGUoJ3Byb2Nlc3NpbmcnKTtcbiAgICAgICAgICBzZWxmLnVwbG9hZENodW5rKG5leHRDaHVuayk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgQW1hem9uWEhSLmZpbmlzaChcbiAgICAgICAgICBzZWxmLmF1dGgsIHNlbGYuc2V0dGluZ3Mua2V5LCBzZWxmLnVwbG9hZElkLCBwYXJ0cywgaGFuZGxlclxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgICgpID0+IHt9LFxuICAgICk7XG4gIH1cblxuICBub3RpZnlDaHVua1VwbG9hZGVkKGNodW5rOiBudW1iZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYoc2VsZi5nZXRTdGF0ZSgpICE9PSAncHJvY2Vzc2luZycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGtleSA9IHNlbGYuc2V0dGluZ3Mua2V5O1xuICAgIHZhciB1cGxvYWRJZCA9IHNlbGYudXBsb2FkSWQ7XG4gICAgdmFyIHVybCA9IGAke3NlbGYuc2V0dGluZ3MuYWpheEJhc2V9L2NodW5rX2xvYWRlZC9gO1xuICAgIHZhciBmaWxlID0gc2VsZi5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBPYmplY3QuYXNzaWduKHNlbGYuc2V0dGluZ3MuZXh0cmFQYXJhbXMgfHwge30sIHtcbiAgICAgIGNodW5rLFxuICAgICAga2V5LFxuICAgICAgdXBsb2FkSWQsXG4gICAgICBmaWxlbmFtZTogZmlsZS5uYW1lLFxuICAgICAgZmlsZXNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWREYXRlLnZhbHVlT2YoKSxcbiAgICB9KTtcblxuICAgIFhIUih7XG4gICAgICB1cmwsXG4gICAgICBoZWFkZXJzOiB7fSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBleHRyYVBhcmFtczogYXJncyxcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrQWxyZWFkeVVwbG9hZGVkKGNhbGxiYWNrOiAoKSA9PiB2b2lkLCBlcnJvckNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBtZXRob2QgPSAnSEVBRCc7XG4gICAgdmFyIHBhdGggPSBgLyR7c2VsZi5zZXR0aW5ncy5rZXl9YDtcbiAgICB2YXIgaW5uZXJIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgLy8gVGhlIGhhbmRsZXIgb25seSBjaGVja3MgZm9yIHN0YXR1cyBjb2RlO1xuICAgICAgLy8gaWYgdGhlIEhFQUQgcmV0dXJucyA0MDQsIHJlLXVwbG9hZCxcbiAgICAgIC8vIGVsc2UsIGl0IHJldHVybnMgMjAwIGFuZCBmaW5pc2ggdGhlIHVwbG9hZFxuICAgICAgaWYoTWF0aC5jZWlsKGUudGFyZ2V0LnN0YXR1cyAvIDEwMCkgPT09IDIpIHtcbiAgICAgICAgbG9nKCdBbHJlYWR5IFVwbG9hZGVkJyk7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2coJ0Vycm9yIScpO1xuICAgICAgICBlcnJvckNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmKCFlcnJvckNhbGxiYWNrICYmIHR5cGVvZihlcnJvckNhbGxiYWNrKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZXJyb3JDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBzZWxmLmNoZWNrQWxyZWFkeVVwbG9hZGVkKGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICAgICAgfSwgMjUwMCk7XG4gICAgICB9O1xuICAgIH1cblxuXG4gICAgY29uc3QgcmVnaW9uU3RyaW5nID0gdXRpbHMucmVnaW9uU3RyaW5nKHNlbGYuYXV0aC5yZWdpb24pO1xuICAgIGNvbnN0IHByb3RvY29sID0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgY29uc3QgYnVja2V0ID0gc2VsZi5hdXRoLmJ1Y2tldDtcbiAgICB2YXIgaG9zdCA9IGBzMyR7cmVnaW9uU3RyaW5nfS5hbWF6b25hd3MuY29tYDtcbiAgICB2YXIgdXJsID0gYCR7cHJvdG9jb2x9Ly8ke2hvc3R9LyR7YnVja2V0fS8ke3BhdGh9YDtcbiAgICBYSFIoe1xuICAgICAgdXJsLFxuICAgICAgbWV0aG9kLFxuICAgICAgaGVhZGVyczoge30sXG4gICAgICBsb2FkQ2FsbGJhY2s6IGlubmVySGFuZGxlcixcbiAgICAgIGVycm9yQ2FsbGJhY2s6IGVycm9yQ2FsbGJhY2ssXG4gICAgfSk7XG4gIH1cblxuICBjYW5jZWwoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICAvLyBFbXB0eSBhbGwgZmllbGRzLCBjYW5jZWwgYWxsIGludGVydmFscywgYWJvcnQgYWxsIHhocidzXG4gICAgdGhpcy5jaHVua1hoci5tYXAoKGNodW5rKSA9PiB7XG4gICAgICBsb2coYEFib3J0IGNodW5rOiAke2NodW5rfWApO1xuICAgICAgY2h1bmsuYWJvcnQoKTtcbiAgICB9KTtcbiAgICB0aGlzLmludGVydmFscyA9IHRoaXMuX2ludGVydmFscyB8fCB7fTtcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLmludGVydmFscykge1xuICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICBpZih0aGlzLmludGVydmFscy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbHNba2V5XSk7XG4gICAgICB9XG4gICAgfVxuICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiAgICB0aGlzLnNldFN0YXRlKCdjYW5jZWxlZCcpO1xuICAgIHRoaXMuY2h1bmtYaHIgPSB0aGlzLl9jaHVua1hociB8fCBbXTtcbiAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MuY2FsbCh0aGlzLCAwLCAwKTtcbiAgICB0aGlzLmNodW5rWGhyID0gW107XG4gICAgdGhpcy5jaHVua3MgPSBbXTtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IG51bGw7XG4gICAgdGhpcy5sb2FkZWRDaHVua3MgPSBudWxsO1xuICAgIHRoaXMuc3RhcnRGaXJlZCA9IGZhbHNlO1xuICAgIHRoaXMudXBsb2FkSWQgPSBudWxsO1xuICAgIHRoaXMucHJvZ3Jlc3MgPSB7fTtcbiAgICB0aGlzLnNldFN0YXRlKCd3YWl0aW5nJyk7IC8vIHdhaXQgZm9yIGEgbmV3IHVwbG9hZFxuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICB1cGRhdGVDaHVua3MocGFydHM6IEFycmF5PFRQYXJ0Pikge1xuICAgIHZhciBmaWxlID0gdGhpcy5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBudW1DaHVua3MgPSBNYXRoLmNlaWwoZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemUpO1xuXG4gICAgdGhpcy5faW5pdENodW5rcyh0cnVlKTtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IFtdO1xuICAgIHRoaXMubG9hZGVkQ2h1bmtzID0gW107XG5cbiAgICBjb25zdCBsb2FkZWQgPSBwYXJ0cy5tYXAoKHBhcnQpID0+IHtcbiAgICAgIHZhciBwYXJ0TnVtYmVyID0gcGFydFswXTtcbiAgICAgIHRoaXMuYWRkTG9hZGVkQ2h1bmsocGFydE51bWJlciAtIDEpO1xuICAgICAgdGhpcy5zZXRDaHVua0ZpbmlzaGVkKHBhcnROdW1iZXIgLSAxKTtcbiAgICAgIHJldHVybiBwYXJ0TnVtYmVyIC0gMTtcbiAgICB9KTtcblxuICAgIGZvcihsZXQgY2h1bmtOdW0gPSAwOyBjaHVua051bSA8IG51bUNodW5rczsgY2h1bmtOdW0rKykge1xuICAgICAgaWYobG9hZGVkLmluZGV4T2YoY2h1bmtOdW0pID09PSAtMSkge1xuICAgICAgICBsb2coYENodW5rIG5vdCB1cGxvYWRlZDogJHtjaHVua051bX1gKTtcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcyhjaHVua051bSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLmZpbGU7XG4gIH1cblxuICBnZXRTdGF0ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICB9XG5cbiAgc2V0U3RhdGUoc3RhdGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHNldFByb2dyZXNzKGNodW5rOiBudW1iZXIsIGxvYWRlZDogbnVtYmVyKSB7XG4gICAgdGhpcy5wcm9ncmVzcyA9IHRoaXMucHJvZ3Jlc3MgfHwge307XG4gICAgdGhpcy50b3RhbFByb2dyZXNzID0gKHRoaXMudG90YWxQcm9ncmVzcyB8fCAwKSArXG4gICAgICBsb2FkZWQgLSAodGhpcy5wcm9ncmVzc1tjaHVua10gfHwgMCk7XG4gICAgdGhpcy5wcm9ncmVzc1tjaHVua10gPSBsb2FkZWQ7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkNodW5rUHJvZ3Jlc3MuY2FsbChcbiAgICAgIHRoaXMsIGNodW5rLCBsb2FkZWQsIHRoaXMuZ2V0Q2h1bmtTaXplKGNodW5rKSk7XG4gIH1cblxuICBnZXRUb3RhbFByb2dyZXNzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMudG90YWxQcm9ncmVzcyB8fCAwO1xuICB9XG5cbiAgaXNDaHVua0xvYWRlZChjaHVuazogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgdGhpcy5sb2FkZWRDaHVua3MgPSB0aGlzLmxvYWRlZENodW5rcyB8fCBbXTtcbiAgICByZXR1cm4gdGhpcy5sb2FkZWRDaHVua3MuaW5kZXhPZihjaHVuaykgIT09IC0xO1xuICB9XG5cbiAgYWRkTG9hZGVkQ2h1bmsoY2h1bms6IG51bWJlcikge1xuICAgIHRoaXMubG9hZGVkQ2h1bmtzID0gdGhpcy5sb2FkZWRDaHVua3MgfHwgW107XG4gICAgdGhpcy5sb2FkZWRDaHVua3MucHVzaChjaHVuayk7XG4gICAgdGhpcy5zZXRQcm9ncmVzcyhjaHVuaywgdGhpcy5nZXRDaHVua1NpemUoY2h1bmspKTtcbiAgfVxuXG4gIGdldENodW5rVXBsb2FkaW5nKGNodW5rOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICB0aGlzLnVwbG9hZGluZ0NodW5rcyA9IHRoaXMudXBsb2FkaW5nQ2h1bmtzIHx8IFtdO1xuICAgIHJldHVybiB0aGlzLnVwbG9hZGluZ0NodW5rcy5pbmRleE9mKGNodW5rKSAhPT0gLTE7XG4gIH1cblxuICBzZXRDaHVua1VwbG9hZGluZyhjaHVuazogbnVtYmVyLCB2YWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy51cGxvYWRpbmdDaHVua3MgPSB0aGlzLnVwbG9hZGluZ0NodW5rcyB8fCBbXTtcbiAgICBpZih2YWwpIHtcbiAgICAgIHRoaXMudXBsb2FkaW5nQ2h1bmtzLnB1c2goY2h1bmspO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaWR4O1xuICAgICAgd2hpbGUodHJ1ZSkge1xuICAgICAgICBpZHggPSB0aGlzLnVwbG9hZGluZ0NodW5rcy5pbmRleE9mKGNodW5rKTtcbiAgICAgICAgaWYoaWR4ID09PSAtMSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnVwbG9hZGluZ0NodW5rcykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwbG9hZGluZ0NodW5rcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaW5pdENodW5rcyhmb3JjZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgdmFyIGZpbGUgPSB0aGlzLmZpbGU7XG4gICAgaWYoIWZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYoIXRoaXMuY2h1bmtzIHx8IGZvcmNlKSB7XG4gICAgICB0aGlzLmNodW5rcyA9IFtdO1xuICAgICAgdmFyIG51bUNodW5rcyA9IE1hdGguY2VpbChcbiAgICAgICAgZmlsZS5zaXplIC8gdGhpcy5zZXR0aW5ncy5jaHVua1NpemVcbiAgICAgICk7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbnVtQ2h1bmtzOyBpKyspIHtcbiAgICAgICAgdGhpcy5jaHVua3MucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0Q2h1bmtGaW5pc2hlZChjaHVuazogbnVtYmVyLCB2YWw6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIHRoaXMuY2h1bmtzW2NodW5rXSA9ICEhdmFsO1xuICB9XG5cbiAgZ2V0TmV4dENodW5rKGNodW5rOiA/bnVtYmVyID0gbnVsbCk6IG51bWJlciB7XG4gICAgdGhpcy5faW5pdENodW5rcygpO1xuICAgIGlmKGNodW5rICYmICF0aGlzLmNodW5rc1tjaHVua10gJiYgIXRoaXMuZ2V0Q2h1bmtVcGxvYWRpbmcoY2h1bmspKSB7XG4gICAgICByZXR1cm4gY2h1bms7XG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoIXRoaXMuY2h1bmtzW2ldICYmICF0aGlzLmdldENodW5rVXBsb2FkaW5nKGkpKSB7XG4gICAgICAgIHJldHVybiBpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICB1cGxvYWRGaW5pc2hlZCgpOiBib29sZWFuIHtcbiAgICB0aGlzLl9pbml0Q2h1bmtzKCk7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZighdGhpcy5jaHVua3NbaV0gfHwgdGhpcy5nZXRDaHVua1VwbG9hZGluZyhpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNMYXN0Q2h1bmsoY2h1bms6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHZhciBmaWxlID0gdGhpcy5maWxlO1xuICAgIGlmKCFmaWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2Ugc2VsZWN0IGEgZmlsZSBmaXJzdFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGguY2VpbChmaWxlLnNpemUgLyB0aGlzLnNldHRpbmdzLmNodW5rU2l6ZSkgLSAxID09PSBjaHVuaztcbiAgfVxuXG4gIGdldENodW5rU2l6ZShjaHVuazogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBpZih0aGlzLmlzTGFzdENodW5rKGNodW5rKSkge1xuICAgICAgaWYoIXRoaXMuZmlsZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2Ugc2VsZWN0IGEgZmlsZSBmaXJzdFwiKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmZpbGUuc2l6ZSAlIHRoaXMuc2V0dGluZ3MuY2h1bmtTaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy5jaHVua1NpemU7XG4gICAgfVxuICB9XG5cbiAgb25DaHVua1Byb2dyZXNzKGY6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uQ2h1bmtQcm9ncmVzcyA9IGY7XG4gIH1cblxuICBvblByb2dyZXNzKGY6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MgPSBmO1xuICB9XG5cbiAgb25TZWxlY3QoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25TZWxlY3QgPSBmO1xuICB9XG5cbiAgb25FcnJvcihmOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5zZXR0aW5ncy5vbkVycm9yID0gZjtcbiAgfVxuXG4gIG9uQ29tcGxldGUoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Db21wbGV0ZSA9IGY7XG4gIH1cblxuICBvbkluaXQoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25Jbml0ID0gZjtcbiAgfVxuXG4gIG9uU3RhcnQoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25TdGFydCA9IGY7XG4gIH1cblxuICBvbkNodW5rVXBsb2FkZWQoZjogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMuc2V0dGluZ3Mub25DaHVua1VwbG9hZGVkID0gZjtcbiAgfVxufVxuIiwiLyogQGZsb3cgKi9cblxuZGVjbGFyZSBmdW5jdGlvbiBlc2NhcGUoc291cmNlOiBzdHJpbmcpOiBzdHJpbmc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcbiAgc3RhdGljIHJlZ2lvblN0cmluZyhyZWdpb24pIHtcbiAgICAvLyBHaXZlbiBhbiBBV1MgcmVnaW9uLCBpdCBlaXRoZXIgcmV0dXJucyBhbiBlbXB0eSBzdHJpbmcgZm9yXG4gICAgLy8gVVMtYmFzZWQgcmVnaW9ucyBvciB0aGUgcmVnaW9uIG5hbWUgcHJlY2VkZWQgYnkgYSBkYXNoIGZvciBub24tVVMtYmFzZWRcbiAgICAvLyByZWdpb25zLlxuICAgIC8vIFNlZSB0aGlzIGZvciBtb3JlIGRldGFpbHM6XG4gICAgLy8gaHR0cDovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L2Rldi9WaXJ0dWFsSG9zdGluZy5odG1sXG4gICAgaWYocmVnaW9uICYmIHJlZ2lvbi5zbGljZSgwLCAyKSAhPT0gJ3VzJykge1xuICAgICAgcmV0dXJuICctJyArIHJlZ2lvbjtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHN0YXRpYyB6ZmlsbChzdHIsIG51bSkge1xuICAgIGxldCB6ZXJvcyA9ICcnO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBudW07IGkrKykge1xuICAgICAgemVyb3MgKz0gJzAnO1xuICAgIH1cblxuICAgIHJldHVybiAoemVyb3MgKyBzdHIpLnN1YnN0cigtTWF0aC5tYXgobnVtLCBzdHIudG9TdHJpbmcoKS5sZW5ndGgpKTtcbiAgfVxuICBzdGF0aWMgdXJpZW5jb2RlKHN0cmluZykge1xuICAgIHZhciBvdXRwdXQgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5nKTtcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvW15BLVphLXowLTlfLn5cXC0lXSsvZywgZXNjYXBlKTtcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvOy9nLCAnJTNCJyk7XG5cbiAgICAvLyBBV1MgcGVyY2VudC1lbmNvZGVzIHNvbWUgZXh0cmEgbm9uLXN0YW5kYXJkIGNoYXJhY3RlcnMgaW4gYSBVUklcbiAgICBvdXRwdXQgPSBvdXRwdXQucmVwbGFjZSgvWypdL2csIGZ1bmN0aW9uKGNoKSB7XG4gICAgICByZXR1cm4gJyUnICsgY2guY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgc3RhdGljIGlzbzg2MDEoZGF0ZSkge1xuICAgIHJldHVybiBbXG4gICAgICBkYXRlLmdldFVUQ0Z1bGxZZWFyKCksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ01vbnRoKCkgKyAxLCAyKSxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDRGF0ZSgpLCAyKSxcbiAgICAgICdUJyxcbiAgICAgIFV0aWxzLnpmaWxsKGRhdGUuZ2V0VVRDSG91cnMoKSwgMiksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ01pbnV0ZXMoKSwgMiksXG4gICAgICBVdGlscy56ZmlsbChkYXRlLmdldFVUQ1NlY29uZHMoKSwgMiksXG4gICAgICAnWicsXG4gICAgXS5qb2luKCcnKTtcblxuICB9XG59XG4iLCIvKiBAZmxvdyAqL1xuXG50eXBlIFRTZXR0aW5ncyA9IHtcbiAgaGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcbiAgbWV0aG9kOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuICBleHRyYVBhcmFtcz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG59O1xuXG50eXBlIFRYTUwgPSB7XG4gIGdldEVsZW1lbnRzQnlUYWdOYW1lOiAodGFnOiBzdHJpbmcpID0+IFtUWE1MXTtcbiAgdGV4dENvbnRlbnQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFRFdmVudCA9IHtcbiAgdGFyZ2V0OiB7XG4gICAgc3RhdHVzOiBudW1iZXI7XG4gICAgcmVzcG9uc2VYTUw6ID9UWE1MO1xuICAgIHJlc3BvbnNlVGV4dDogP3N0cmluZztcbiAgfTtcbn07XG5cblxuZXhwb3J0IGZ1bmN0aW9uIFhIUihhcmdzOiBUU2V0dGluZ3MpOiBYTUxIdHRwUmVxdWVzdCB7XG4gIC8vIFRoZSB1c2VyIG1heSBvciBtYXkgbm90IHBhc3MgYW55IGhlYWRlcnNcbiAgYXJncy5oZWFkZXJzID0gYXJncy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIElmIG5vIG1ldGhvZCBpcyBnaXZlbiwgZGVmYXVsdCB0byBHRVRcbiAgYXJncy5tZXRob2QgPSBhcmdzLm1ldGhvZCB8fCAnR0VUJztcblxuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgLy8gU2V0IHRoZSBcImxvYWRcIiBjYWxsYmFjayBpZiBnaXZlblxuICBpZihhcmdzLmxvYWRDYWxsYmFjayAmJiB0eXBlb2YgYXJncy5sb2FkQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFyZ3MubG9hZENhbGxiYWNrLCB0cnVlKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJlcnJvclwiIGNhbGxiYWNrIGlmIGdpdmVuXG4gIGlmKGFyZ3MuZXJyb3JDYWxsYmFjayAmJiB0eXBlb2YgYXJncy5lcnJvckNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgYXJncy5lcnJvckNhbGxiYWNrLCB0cnVlKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJyZWFkeXN0YXRlY2hhbmdlXCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy5zdGF0ZUNoYW5nZUNhbGxiYWNrICYmXG4gICAgICB0eXBlb2YgYXJncy5zdGF0ZUNoYW5nZUNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBhcmdzLnN0YXRlQ2hhbmdlQ2FsbGJhY2spO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBcInByb2dyZXNzXCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy5wcm9ncmVzc0NhbGxiYWNrICYmIHR5cGVvZiBhcmdzLnByb2dyZXNzQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgYXJncy5wcm9ncmVzc0NhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgXCJ0aW1lb3V0XCIgY2FsbGJhY2sgaWYgZ2l2ZW5cbiAgaWYoYXJncy50aW1lb3V0Q2FsbGJhY2sgJiYgdHlwZW9mIGFyZ3MudGltZW91dENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWVvdXQnLCBhcmdzLnRpbWVvdXRDYWxsYmFjayk7XG4gIH1cblxuICAvLyBBZGRpbmcgZXh0cmEgcGFyYW1zIGFzIG5lZWRlZFxuICB2YXIgdXJsID0gYXJncy51cmw7XG4gIGlmKHR5cGVvZiBhcmdzLmV4dHJhUGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgIGZvcih2YXIgcGFyYW1OYW1lIGluIGFyZ3MuZXh0cmFQYXJhbXMpIHtcbiAgICAgIGlmKGFyZ3MuZXh0cmFQYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW1OYW1lKSkge1xuICAgICAgICBpZih1cmwuaW5kZXhPZignPycpICE9PSAtMSkge1xuICAgICAgICAgIHVybCArPSAnJic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsICs9ICc/JztcbiAgICAgICAgfVxuXG4gICAgICAgIHVybCArPSBlbmNvZGVVUklDb21wb25lbnQocGFyYW1OYW1lKSArICc9JztcbiAgICAgICAgLy8ga2VlcCB0aGUgdHlwZWNoZWNrZXIgaGFwcHlcbiAgICAgICAgaWYodHlwZW9mIGFyZ3MuZXh0cmFQYXJhbXMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdXJsICs9IGVuY29kZVVSSUNvbXBvbmVudChhcmdzLmV4dHJhUGFyYW1zW3BhcmFtTmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gT3BlbiB0aGUgeGhyIGNvbm5lY3Rpb25cbiAgeGhyLm9wZW4oYXJncy5tZXRob2QsIHVybCk7XG5cbiAgLy8gU2V0IHRoZSBoZWFkZXJzXG4gIGZvcih2YXIgaGVhZGVyIGluIGFyZ3MuaGVhZGVycykge1xuICAgIGlmKGFyZ3MuaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZWFkZXIpKSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihoZWFkZXIsIGFyZ3MuaGVhZGVyc1toZWFkZXJdKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZW5kIHRoZSBhamF4IGNhbGxcbiAgaWYoYXJncy5ib2R5KSB7XG4gICAgeGhyLnNlbmQoYXJncy5ib2R5KTtcbiAgfSBlbHNlIHtcbiAgICB4aHIuc2VuZCgpO1xuICB9XG4gIHJldHVybiB4aHI7XG59XG4iXX0=
