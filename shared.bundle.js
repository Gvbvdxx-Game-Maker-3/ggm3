(self["webpackChunkgvbvdxx_game_maker_3"] = self["webpackChunkgvbvdxx_game_maker_3"] || []).push([[804],{

/***/ 228:
/***/ ((module) => {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ 484:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
var Easing = Object.freeze({
    Linear: Object.freeze({
        None: function (amount) {
            return amount;
        },
        In: function (amount) {
            return amount;
        },
        Out: function (amount) {
            return amount;
        },
        InOut: function (amount) {
            return amount;
        },
    }),
    Quadratic: Object.freeze({
        In: function (amount) {
            return amount * amount;
        },
        Out: function (amount) {
            return amount * (2 - amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount;
            }
            return -0.5 * (--amount * (amount - 2) - 1);
        },
    }),
    Cubic: Object.freeze({
        In: function (amount) {
            return amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    }),
    Quartic: Object.freeze({
        In: function (amount) {
            return amount * amount * amount * amount;
        },
        Out: function (amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount;
            }
            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    }),
    Quintic: Object.freeze({
        In: function (amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    }),
    Sinusoidal: Object.freeze({
        In: function (amount) {
            return 1 - Math.sin(((1.0 - amount) * Math.PI) / 2);
        },
        Out: function (amount) {
            return Math.sin((amount * Math.PI) / 2);
        },
        InOut: function (amount) {
            return 0.5 * (1 - Math.sin(Math.PI * (0.5 - amount)));
        },
    }),
    Exponential: Object.freeze({
        In: function (amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function (amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            if ((amount *= 2) < 1) {
                return 0.5 * Math.pow(1024, amount - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        },
    }),
    Circular: Object.freeze({
        In: function (amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function (amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    }),
    Elastic: Object.freeze({
        In: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            amount *= 2;
            if (amount < 1) {
                return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    }),
    Back: Object.freeze({
        In: function (amount) {
            var s = 1.70158;
            return amount === 1 ? 1 : amount * amount * ((s + 1) * amount - s);
        },
        Out: function (amount) {
            var s = 1.70158;
            return amount === 0 ? 0 : --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function (amount) {
            var s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            }
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    }),
    Bounce: Object.freeze({
        In: function (amount) {
            return 1 - Easing.Bounce.Out(1 - amount);
        },
        Out: function (amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }
            else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
            }
        },
        InOut: function (amount) {
            if (amount < 0.5) {
                return Easing.Bounce.In(amount * 2) * 0.5;
            }
            return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        },
    }),
    generatePow: function (power) {
        if (power === void 0) { power = 4; }
        power = power < Number.EPSILON ? Number.EPSILON : power;
        power = power > 10000 ? 10000 : power;
        return {
            In: function (amount) {
                return Math.pow(amount, power);
            },
            Out: function (amount) {
                return 1 - Math.pow((1 - amount), power);
            },
            InOut: function (amount) {
                if (amount < 0.5) {
                    return Math.pow((amount * 2), power) / 2;
                }
                return (1 - Math.pow((2 - amount * 2), power)) / 2 + 0.5;
            },
        };
    },
});

var now = function () { return performance.now(); };

/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tween
 */
var Group = /** @class */ (function () {
    function Group() {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
        this.add.apply(this, tweens);
    }
    Group.prototype.getAll = function () {
        var _this = this;
        return Object.keys(this._tweens).map(function (tweenId) { return _this._tweens[tweenId]; });
    };
    Group.prototype.removeAll = function () {
        this._tweens = {};
    };
    Group.prototype.add = function () {
        var _a;
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        for (var _b = 0, tweens_1 = tweens; _b < tweens_1.length; _b++) {
            var tween = tweens_1[_b];
            // Remove from any other group first, a tween can only be in one group at a time.
            // @ts-expect-error library internal access
            (_a = tween._group) === null || _a === void 0 ? void 0 : _a.remove(tween);
            // @ts-expect-error library internal access
            tween._group = this;
            this._tweens[tween.getId()] = tween;
            this._tweensAddedDuringUpdate[tween.getId()] = tween;
        }
    };
    Group.prototype.remove = function () {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        for (var _a = 0, tweens_2 = tweens; _a < tweens_2.length; _a++) {
            var tween = tweens_2[_a];
            // @ts-expect-error library internal access
            tween._group = undefined;
            delete this._tweens[tween.getId()];
            delete this._tweensAddedDuringUpdate[tween.getId()];
        }
    };
    /** Return true if all tweens in the group are not paused or playing. */
    Group.prototype.allStopped = function () {
        return this.getAll().every(function (tween) { return !tween.isPlaying(); });
    };
    Group.prototype.update = function (time, preserve) {
        if (time === void 0) { time = now(); }
        if (preserve === void 0) { preserve = true; }
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0)
            return;
        // Tweens are updated in "batches". If you add a new tween during an
        // update, then the new tween will be updated in the next batch.
        // If you remove a tween during an update, it may or may not be updated.
        // However, if the removed tween was added during the current batch,
        // then it will not be updated.
        while (tweenIds.length > 0) {
            this._tweensAddedDuringUpdate = {};
            for (var i = 0; i < tweenIds.length; i++) {
                var tween = this._tweens[tweenIds[i]];
                var autoStart = !preserve;
                if (tween && tween.update(time, autoStart) === false && !preserve)
                    this.remove(tween);
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
    };
    return Group;
}());

/**
 *
 */
var Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function (n, i) {
            var fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function () {
            var a = [1];
            return function (n) {
                var s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (var i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        },
    },
};

/**
 * Utils
 */
var Sequence = /** @class */ (function () {
    function Sequence() {
    }
    Sequence.nextId = function () {
        return Sequence._nextId++;
    };
    Sequence._nextId = 0;
    return Sequence;
}());

var mainGroup = new Group();

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var Tween = /** @class */ (function () {
    function Tween(object, group) {
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1000;
        this._isDynamic = false;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = Easing.Linear.None;
        this._interpolationFunction = Interpolation.Linear;
        // eslint-disable-next-line
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._onEveryStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._propertiesAreSetUp = false;
        this._goToEnd = false;
        this._object = object;
        if (typeof group === 'object') {
            this._group = group;
            group.add(this);
        }
        // Use "true" to restore old behavior (will be removed in future release).
        else if (group === true) {
            this._group = mainGroup;
            mainGroup.add(this);
        }
    }
    Tween.prototype.getId = function () {
        return this._id;
    };
    Tween.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    Tween.prototype.isPaused = function () {
        return this._isPaused;
    };
    Tween.prototype.getDuration = function () {
        return this._duration;
    };
    Tween.prototype.to = function (target, duration) {
        if (duration === void 0) { duration = 1000; }
        if (this._isPlaying)
            throw new Error('Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.');
        this._valuesEnd = target;
        this._propertiesAreSetUp = false;
        this._duration = duration < 0 ? 0 : duration;
        return this;
    };
    Tween.prototype.duration = function (duration) {
        if (duration === void 0) { duration = 1000; }
        this._duration = duration < 0 ? 0 : duration;
        return this;
    };
    Tween.prototype.dynamic = function (dynamic) {
        if (dynamic === void 0) { dynamic = false; }
        this._isDynamic = dynamic;
        return this;
    };
    Tween.prototype.start = function (time, overrideStartingValues) {
        if (time === void 0) { time = now(); }
        if (overrideStartingValues === void 0) { overrideStartingValues = false; }
        if (this._isPlaying) {
            return this;
        }
        this._repeat = this._initialRepeat;
        if (this._reversed) {
            // If we were reversed (f.e. using the yoyo feature) then we need to
            // flip the tween direction back to forward.
            this._reversed = false;
            for (var property in this._valuesStartRepeat) {
                this._swapEndStartRepeatValues(property);
                this._valuesStart[property] = this._valuesStartRepeat[property];
            }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._onEveryStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time;
        this._startTime += this._delayTime;
        if (!this._propertiesAreSetUp || overrideStartingValues) {
            this._propertiesAreSetUp = true;
            // If dynamic is not enabled, clone the end values instead of using the passed-in end values.
            if (!this._isDynamic) {
                var tmp = {};
                for (var prop in this._valuesEnd)
                    tmp[prop] = this._valuesEnd[prop];
                this._valuesEnd = tmp;
            }
            this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, overrideStartingValues);
        }
        return this;
    };
    Tween.prototype.startFromCurrentValues = function (time) {
        return this.start(time, true);
    };
    Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat, overrideStartingValues) {
        for (var property in _valuesEnd) {
            var startValue = _object[property];
            var startValueIsArray = Array.isArray(startValue);
            var propType = startValueIsArray ? 'array' : typeof startValue;
            var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
            // If `to()` specifies a property that doesn't exist in the source object,
            // we should not set that property in the object
            if (propType === 'undefined' || propType === 'function') {
                continue;
            }
            // Check if an Array was provided as property value
            if (isInterpolationList) {
                var endValues = _valuesEnd[property];
                if (endValues.length === 0) {
                    continue;
                }
                // Handle an array of relative values.
                // Creates a local copy of the Array with the start value at the front
                var temp = [startValue];
                for (var i = 0, l = endValues.length; i < l; i += 1) {
                    var value = this._handleRelativeValue(startValue, endValues[i]);
                    if (isNaN(value)) {
                        isInterpolationList = false;
                        console.warn('Found invalid interpolation list. Skipping.');
                        break;
                    }
                    temp.push(value);
                }
                if (isInterpolationList) {
                    // if (_valuesStart[property] === undefined) { // handle end values only the first time. NOT NEEDED? setupProperties is now guarded by _propertiesAreSetUp.
                    _valuesEnd[property] = temp;
                    // }
                }
            }
            // handle the deepness of the values
            if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
                _valuesStart[property] = startValueIsArray ? [] : {};
                var nestedObject = startValue;
                for (var prop in nestedObject) {
                    _valuesStart[property][prop] = nestedObject[prop];
                }
                // TODO? repeat nested values? And yoyo? And array values?
                _valuesStartRepeat[property] = startValueIsArray ? [] : {};
                var endValues = _valuesEnd[property];
                // If dynamic is not enabled, clone the end values instead of using the passed-in end values.
                if (!this._isDynamic) {
                    var tmp = {};
                    for (var prop in endValues)
                        tmp[prop] = endValues[prop];
                    _valuesEnd[property] = endValues = tmp;
                }
                this._setupProperties(nestedObject, _valuesStart[property], endValues, _valuesStartRepeat[property], overrideStartingValues);
            }
            else {
                // Save the starting value, but only once unless override is requested.
                if (typeof _valuesStart[property] === 'undefined' || overrideStartingValues) {
                    _valuesStart[property] = startValue;
                }
                if (!startValueIsArray) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                if (isInterpolationList) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                }
                else {
                    _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }
            }
        }
    };
    Tween.prototype.stop = function () {
        if (!this._isChainStopped) {
            this._isChainStopped = true;
            this.stopChainedTweens();
        }
        if (!this._isPlaying) {
            return this;
        }
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
            this._onStopCallback(this._object);
        }
        return this;
    };
    Tween.prototype.end = function () {
        this._goToEnd = true;
        this.update(this._startTime + this._duration);
        return this;
    };
    Tween.prototype.pause = function (time) {
        if (time === void 0) { time = now(); }
        if (this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        return this;
    };
    Tween.prototype.resume = function (time) {
        if (time === void 0) { time = now(); }
        if (!this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        return this;
    };
    Tween.prototype.stopChainedTweens = function () {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
        return this;
    };
    Tween.prototype.group = function (group) {
        if (!group) {
            console.warn('tween.group() without args has been removed, use group.add(tween) instead.');
            return this;
        }
        group.add(this);
        return this;
    };
    /**
     * Removes the tween from whichever group it is in.
     */
    Tween.prototype.remove = function () {
        var _a;
        (_a = this._group) === null || _a === void 0 ? void 0 : _a.remove(this);
        return this;
    };
    Tween.prototype.delay = function (amount) {
        if (amount === void 0) { amount = 0; }
        this._delayTime = amount;
        return this;
    };
    Tween.prototype.repeat = function (times) {
        if (times === void 0) { times = 0; }
        this._initialRepeat = times;
        this._repeat = times;
        return this;
    };
    Tween.prototype.repeatDelay = function (amount) {
        this._repeatDelayTime = amount;
        return this;
    };
    Tween.prototype.yoyo = function (yoyo) {
        if (yoyo === void 0) { yoyo = false; }
        this._yoyo = yoyo;
        return this;
    };
    Tween.prototype.easing = function (easingFunction) {
        if (easingFunction === void 0) { easingFunction = Easing.Linear.None; }
        this._easingFunction = easingFunction;
        return this;
    };
    Tween.prototype.interpolation = function (interpolationFunction) {
        if (interpolationFunction === void 0) { interpolationFunction = Interpolation.Linear; }
        this._interpolationFunction = interpolationFunction;
        return this;
    };
    // eslint-disable-next-line
    Tween.prototype.chain = function () {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        this._chainedTweens = tweens;
        return this;
    };
    Tween.prototype.onStart = function (callback) {
        this._onStartCallback = callback;
        return this;
    };
    Tween.prototype.onEveryStart = function (callback) {
        this._onEveryStartCallback = callback;
        return this;
    };
    Tween.prototype.onUpdate = function (callback) {
        this._onUpdateCallback = callback;
        return this;
    };
    Tween.prototype.onRepeat = function (callback) {
        this._onRepeatCallback = callback;
        return this;
    };
    Tween.prototype.onComplete = function (callback) {
        this._onCompleteCallback = callback;
        return this;
    };
    Tween.prototype.onStop = function (callback) {
        this._onStopCallback = callback;
        return this;
    };
    /**
     * @returns true if the tween is still playing after the update, false
     * otherwise (calling update on a paused tween still returns true because
     * it is still playing, just paused).
     *
     * @param autoStart - When true, calling update will implicitly call start()
     * as well. Note, if you stop() or end() the tween, but are still calling
     * update(), it will start again!
     */
    Tween.prototype.update = function (time, autoStart) {
        var _this = this;
        var _a;
        if (time === void 0) { time = now(); }
        if (autoStart === void 0) { autoStart = Tween.autoStartOnUpdate; }
        if (this._isPaused)
            return true;
        var property;
        if (!this._goToEnd && !this._isPlaying) {
            if (autoStart)
                this.start(time, true);
            else
                return false;
        }
        this._goToEnd = false;
        if (time < this._startTime) {
            return true;
        }
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback) {
                this._onStartCallback(this._object);
            }
            this._onStartCallbackFired = true;
        }
        if (this._onEveryStartCallbackFired === false) {
            if (this._onEveryStartCallback) {
                this._onEveryStartCallback(this._object);
            }
            this._onEveryStartCallbackFired = true;
        }
        var elapsedTime = time - this._startTime;
        var durationAndDelay = this._duration + ((_a = this._repeatDelayTime) !== null && _a !== void 0 ? _a : this._delayTime);
        var totalTime = this._duration + this._repeat * durationAndDelay;
        var calculateElapsedPortion = function () {
            if (_this._duration === 0)
                return 1;
            if (elapsedTime > totalTime) {
                return 1;
            }
            var timesRepeated = Math.trunc(elapsedTime / durationAndDelay);
            var timeIntoCurrentRepeat = elapsedTime - timesRepeated * durationAndDelay;
            // TODO use %?
            // const timeIntoCurrentRepeat = elapsedTime % durationAndDelay
            var portion = Math.min(timeIntoCurrentRepeat / _this._duration, 1);
            if (portion === 0 && elapsedTime === _this._duration) {
                return 1;
            }
            return portion;
        };
        var elapsed = calculateElapsedPortion();
        var value = this._easingFunction(elapsed);
        // properties transformations
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
            this._onUpdateCallback(this._object, elapsed);
        }
        if (this._duration === 0 || elapsedTime >= this._duration) {
            if (this._repeat > 0) {
                var completeCount = Math.min(Math.trunc((elapsedTime - this._duration) / durationAndDelay) + 1, this._repeat);
                if (isFinite(this._repeat)) {
                    this._repeat -= completeCount;
                }
                // Reassign starting values, restart by making startTime = now
                for (property in this._valuesStartRepeat) {
                    if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
                        this._valuesStartRepeat[property] =
                            // eslint-disable-next-line
                            // @ts-ignore FIXME?
                            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    }
                    if (this._yoyo) {
                        this._swapEndStartRepeatValues(property);
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }
                this._startTime += durationAndDelay * completeCount;
                if (this._onRepeatCallback) {
                    this._onRepeatCallback(this._object);
                }
                this._onEveryStartCallbackFired = false;
                return true;
            }
            else {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this._object);
                }
                for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                    // Make the chained tweens start exactly at the time they should,
                    // even if the `update()` method was called way past the duration of the tween
                    this._chainedTweens[i].start(this._startTime + this._duration, false);
                }
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    };
    Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
        for (var property in _valuesEnd) {
            // Don't update properties that do not exist in the source object
            if (_valuesStart[property] === undefined) {
                continue;
            }
            var start = _valuesStart[property] || 0;
            var end = _valuesEnd[property];
            var startIsArray = Array.isArray(_object[property]);
            var endIsArray = Array.isArray(end);
            var isInterpolationList = !startIsArray && endIsArray;
            if (isInterpolationList) {
                _object[property] = this._interpolationFunction(end, value);
            }
            else if (typeof end === 'object' && end) {
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._updateProperties(_object[property], start, end, value);
            }
            else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                end = this._handleRelativeValue(start, end);
                // Protect against non numeric properties.
                if (typeof end === 'number') {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _object[property] = start + (end - start) * value;
                }
            }
        }
    };
    Tween.prototype._handleRelativeValue = function (start, end) {
        if (typeof end !== 'string') {
            return end;
        }
        if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            return start + parseFloat(end);
        }
        return parseFloat(end);
    };
    Tween.prototype._swapEndStartRepeatValues = function (property) {
        var tmp = this._valuesStartRepeat[property];
        var endValue = this._valuesEnd[property];
        if (typeof endValue === 'string') {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        }
        else {
            this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
    };
    Tween.autoStartOnUpdate = false;
    return Tween;
}());

var VERSION = '25.0.0';

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var nextId = Sequence.nextId;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tweens.
 */
var TWEEN = mainGroup;
// This is the best way to export things in a way that's compatible with both ES
// Modules and CommonJS, without build hacks, and so as not to break the
// existing API.
// https://github.com/rollup/rollup/issues/1961#issuecomment-423037881
/**
 * @deprecated The global TWEEN Group will be removed in a following major
 * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
 * group.
 *
 * Old code:
 *
 * ```js
 * import * as TWEEN from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new TWEEN.Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   TWEEN.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 *
 * New code:
 *
 * ```js
 * import {Tween, Group} from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * const group = new Group()
 * group.add(tween)
 * group.add(tween2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   group.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 */
var getAll = TWEEN.getAll.bind(TWEEN);
/**
 * @deprecated The global TWEEN Group will be removed in a following major
 * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
 * group.
 *
 * Old code:
 *
 * ```js
 * import * as TWEEN from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new TWEEN.Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   TWEEN.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 *
 * New code:
 *
 * ```js
 * import {Tween, Group} from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * const group = new Group()
 * group.add(tween)
 * group.add(tween2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   group.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 */
var removeAll = TWEEN.removeAll.bind(TWEEN);
/**
 * @deprecated The global TWEEN Group will be removed in a following major
 * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
 * group.
 *
 * Old code:
 *
 * ```js
 * import * as TWEEN from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new TWEEN.Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   TWEEN.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 *
 * New code:
 *
 * ```js
 * import {Tween, Group} from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * const group = new Group()
 * group.add(tween)
 * group.add(tween2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   group.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 */
var add = TWEEN.add.bind(TWEEN);
/**
 * @deprecated The global TWEEN Group will be removed in a following major
 * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
 * group.
 *
 * Old code:
 *
 * ```js
 * import * as TWEEN from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new TWEEN.Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   TWEEN.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 *
 * New code:
 *
 * ```js
 * import {Tween, Group} from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * const group = new Group()
 * group.add(tween)
 * group.add(tween2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   group.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 */
var remove = TWEEN.remove.bind(TWEEN);
/**
 * @deprecated The global TWEEN Group will be removed in a following major
 * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
 * group.
 *
 * Old code:
 *
 * ```js
 * import * as TWEEN from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new TWEEN.Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   TWEEN.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 *
 * New code:
 *
 * ```js
 * import {Tween, Group} from '@tweenjs/tween.js'
 *
 * //...
 *
 * const tween = new Tween(obj)
 * const tween2 = new TWEEN.Tween(obj2)
 *
 * //...
 *
 * const group = new Group()
 * group.add(tween)
 * group.add(tween2)
 *
 * //...
 *
 * requestAnimationFrame(function loop(time) {
 *   group.update(time)
 *   requestAnimationFrame(loop)
 * })
 * ```
 */
var update = TWEEN.update.bind(TWEEN);
var exports$1 = {
    Easing: Easing,
    Group: Group,
    Interpolation: Interpolation,
    now: now,
    Sequence: Sequence,
    nextId: nextId,
    Tween: Tween,
    VERSION: VERSION,
    /**
     * @deprecated The global TWEEN Group will be removed in a following major
     * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
     * group.
     *
     * Old code:
     *
     * ```js
     * import * as TWEEN from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new TWEEN.Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   TWEEN.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     *
     * New code:
     *
     * ```js
     * import {Tween, Group} from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * const group = new Group()
     * group.add(tween)
     * group.add(tween2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   group.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     */
    getAll: getAll,
    /**
     * @deprecated The global TWEEN Group will be removed in a following major
     * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
     * group.
     *
     * Old code:
     *
     * ```js
     * import * as TWEEN from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new TWEEN.Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   TWEEN.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     *
     * New code:
     *
     * ```js
     * import {Tween, Group} from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * const group = new Group()
     * group.add(tween)
     * group.add(tween2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   group.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     */
    removeAll: removeAll,
    /**
     * @deprecated The global TWEEN Group will be removed in a following major
     * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
     * group.
     *
     * Old code:
     *
     * ```js
     * import * as TWEEN from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new TWEEN.Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   TWEEN.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     *
     * New code:
     *
     * ```js
     * import {Tween, Group} from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * const group = new Group()
     * group.add(tween)
     * group.add(tween2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   group.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     */
    add: add,
    /**
     * @deprecated The global TWEEN Group will be removed in a following major
     * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
     * group.
     *
     * Old code:
     *
     * ```js
     * import * as TWEEN from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new TWEEN.Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   TWEEN.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     *
     * New code:
     *
     * ```js
     * import {Tween, Group} from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * const group = new Group()
     * group.add(tween)
     * group.add(tween2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   group.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     */
    remove: remove,
    /**
     * @deprecated The global TWEEN Group will be removed in a following major
     * release. To migrate, create a `new Group()` instead of using `TWEEN` as a
     * group.
     *
     * Old code:
     *
     * ```js
     * import * as TWEEN from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new TWEEN.Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   TWEEN.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     *
     * New code:
     *
     * ```js
     * import {Tween, Group} from '@tweenjs/tween.js'
     *
     * //...
     *
     * const tween = new Tween(obj)
     * const tween2 = new TWEEN.Tween(obj2)
     *
     * //...
     *
     * const group = new Group()
     * group.add(tween)
     * group.add(tween2)
     *
     * //...
     *
     * requestAnimationFrame(function loop(time) {
     *   group.update(time)
     *   requestAnimationFrame(loop)
     * })
     * ```
     */
    update: update,
};

exports.Easing = Easing;
exports.Group = Group;
exports.Interpolation = Interpolation;
exports.Sequence = Sequence;
exports.Tween = Tween;
exports.VERSION = VERSION;
exports.add = add;
exports["default"] = exports$1;
exports.getAll = getAll;
exports.nextId = nextId;
exports.now = now;
exports.remove = remove;
exports.removeAll = removeAll;
exports.update = update;


/***/ }),

/***/ 602:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteDB: () => (/* binding */ deleteDB),
/* harmony export */   openDB: () => (/* binding */ openDB),
/* harmony export */   unwrap: () => (/* binding */ unwrap),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    // This mapping exists in reverseTransformCache but doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(this.request);
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
        });
    }
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event.newVersion, event));
    }
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking) {
            db.addEventListener('versionchange', (event) => blocking(event.oldVersion, event.newVersion, event));
        }
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event));
    }
    return wrap(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

const advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
    get(target, prop) {
        if (!advanceMethodProps.includes(prop))
            return target[prop];
        let cachedFunc = methodMap[prop];
        if (!cachedFunc) {
            cachedFunc = methodMap[prop] = function (...args) {
                advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
            };
        }
        return cachedFunc;
    },
};
async function* iterate(...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
        cursor = await cursor.openCursor(...args);
    }
    if (!cursor)
        return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
    reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while (cursor) {
        yield proxiedCursor;
        // If one of the advancing methods was not called, call continue().
        cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
        advanceResults.delete(proxiedCursor);
    }
}
function isIteratorProp(target, prop) {
    return ((prop === Symbol.asyncIterator &&
        instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor])) ||
        (prop === 'iterate' && instanceOfAny(target, [IDBIndex, IDBObjectStore])));
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get(target, prop, receiver) {
        if (isIteratorProp(target, prop))
            return iterate;
        return oldTraps.get(target, prop, receiver);
    },
    has(target, prop) {
        return isIteratorProp(target, prop) || oldTraps.has(target, prop);
    },
}));




/***/ }),

/***/ 1710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(5606);
/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/

!function(e){if(true)module.exports=e();else // removed by dead control flow
{}}(function(){return function s(a,o,h){function u(r,e){if(!o[r]){if(!a[r]){var t=undefined;if(!e&&t)return require(r,!0);if(l)return l(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var i=o[r]={exports:{}};a[r][0].call(i.exports,function(e){var t=a[r][1][e];return u(t||e)},i,i.exports,s,a,o,h)}return o[r].exports}for(var l=undefined,e=0;e<h.length;e++)u(h[e]);return u}({1:[function(e,t,r){"use strict";var d=e("./utils"),c=e("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(e){for(var t,r,n,i,s,a,o,h=[],u=0,l=e.length,f=l,c="string"!==d.getTypeOf(e);u<e.length;)f=l-u,n=c?(t=e[u++],r=u<l?e[u++]:0,u<l?e[u++]:0):(t=e.charCodeAt(u++),r=u<l?e.charCodeAt(u++):0,u<l?e.charCodeAt(u++):0),i=t>>2,s=(3&t)<<4|r>>4,a=1<f?(15&r)<<2|n>>6:64,o=2<f?63&n:64,h.push(p.charAt(i)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(e){var t,r,n,i,s,a,o=0,h=0,u="data:";if(e.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(e=e.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(e.charAt(e.length-1)===p.charAt(64)&&f--,e.charAt(e.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=c.uint8array?new Uint8Array(0|f):new Array(0|f);o<e.length;)t=p.indexOf(e.charAt(o++))<<2|(i=p.indexOf(e.charAt(o++)))>>4,r=(15&i)<<4|(s=p.indexOf(e.charAt(o++)))>>2,n=(3&s)<<6|(a=p.indexOf(e.charAt(o++))),l[h++]=t,64!==s&&(l[h++]=r),64!==a&&(l[h++]=n);return l}},{"./support":30,"./utils":32}],2:[function(e,t,r){"use strict";var n=e("./external"),i=e("./stream/DataWorker"),s=e("./stream/Crc32Probe"),a=e("./stream/DataLengthProbe");function o(e,t,r,n,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=r,this.compression=n,this.compressedContent=i}o.prototype={getContentWorker:function(){var e=new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),t=this;return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(e,t,r){return e.pipe(new s).pipe(new a("uncompressedSize")).pipe(t.compressWorker(r)).pipe(new a("compressedSize")).withStreamInfo("compression",t)},t.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,t,r){"use strict";var n=e("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(){return new n("STORE compression")},uncompressWorker:function(){return new n("STORE decompression")}},r.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,t,r){"use strict";var n=e("./utils");var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t){return void 0!==e&&e.length?"string"!==n.getTypeOf(e)?function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}(0|t,e,e.length,0):function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t.charCodeAt(a))];return-1^e}(0|t,e,e.length,0):0}},{"./utils":32}],5:[function(e,t,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(e,t,r){"use strict";var n=null;n="undefined"!=typeof Promise?Promise:e("lie"),t.exports={Promise:n}},{lie:37}],7:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,i=e("pako"),s=e("./utils"),a=e("./stream/GenericWorker"),o=n?"uint8array":"array";function h(e,t){a.call(this,"FlateWorker/"+e),this._pako=null,this._pakoAction=e,this._pakoOptions=t,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(e){this.meta=e.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,e.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new i[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var t=this;this._pako.onData=function(e){t.push({data:e,meta:t.meta})}},r.compressWorker=function(e){return new h("Deflate",e)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,t,r){"use strict";function A(e,t){var r,n="";for(r=0;r<t;r++)n+=String.fromCharCode(255&e),e>>>=8;return n}function n(e,t,r,n,i,s){var a,o,h=e.file,u=e.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),c=I.transformTo("string",O.utf8encode(h.name)),d=h.comment,p=I.transformTo("string",s(d)),m=I.transformTo("string",O.utf8encode(d)),_=c.length!==h.name.length,g=m.length!==d.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};t&&!r||(x.crc32=e.crc32,x.compressedSize=e.compressedSize,x.uncompressedSize=e.uncompressedSize);var S=0;t&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===i?(C=798,z|=function(e,t){var r=e;return e||(r=t?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(e){return 63&(e||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+c,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(n,4)+f+b+p}}var I=e("../utils"),i=e("../stream/GenericWorker"),O=e("../utf8"),B=e("../crc32"),R=e("../signature");function s(e,t,r,n){i.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=r,this.encodeFileName=n,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,i),s.prototype.push=function(e){var t=e.meta.percent||0,r=this.entriesCount,n=this._sources.length;this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,i.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:r?(t+100*(r-n-1))/r:100}}))},s.prototype.openedSource=function(e){this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name;var t=this.streamFiles&&!e.file.dir;if(t){var r=n(e,t,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(e){this.accumulate=!1;var t=this.streamFiles&&!e.file.dir,r=n(e,t,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),t)this.push({data:function(e){return R.DATA_DESCRIPTOR+A(e.crc32,4)+A(e.compressedSize,4)+A(e.uncompressedSize,4)}(e),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}});var r=this.bytesWritten-e,n=function(e,t,r,n,i){var s=I.transformTo("string",i(n));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(e,2)+A(e,2)+A(t,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,e,this.zipComment,this.encodeFileName);this.push({data:n,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(e){this._sources.push(e);var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(e){var t=this._sources;if(!i.prototype.error.call(this,e))return!1;for(var r=0;r<t.length;r++)try{t[r].error(e)}catch(e){}return!0},s.prototype.lock=function(){i.prototype.lock.call(this);for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,t,r){"use strict";var u=e("../compressions"),n=e("./ZipFileWorker");r.generateWorker=function(e,a,t){var o=new n(a.streamFiles,t,a.platform,a.encodeFileName),h=0;try{e.forEach(function(e,t){h++;var r=function(e,t){var r=e||t,n=u[r];if(!n)throw new Error(r+" is not a valid compression method !");return n}(t.options.compression,a.compression),n=t.options.compressionOptions||a.compressionOptions||{},i=t.dir,s=t.date;t._compressWorker(r,n).withStreamInfo("file",{name:e,dir:i,date:s,comment:t.comment||"",unixPermissions:t.unixPermissions,dosPermissions:t.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(e){o.error(e)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,r){"use strict";function n(){if(!(this instanceof n))return new n;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var e=new n;for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t]);return e}}(n.prototype=e("./object")).loadAsync=e("./load"),n.support=e("./support"),n.defaults=e("./defaults"),n.version="3.10.1",n.loadAsync=function(e,t){return(new n).loadAsync(e,t)},n.external=e("./external"),t.exports=n},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,t,r){"use strict";var u=e("./utils"),i=e("./external"),n=e("./utf8"),s=e("./zipEntries"),a=e("./stream/Crc32Probe"),l=e("./nodejsUtils");function f(n){return new i.Promise(function(e,t){var r=n.decompressed.getContentWorker().pipe(new a);r.on("error",function(e){t(e)}).on("end",function(){r.streamInfo.crc32!==n.decompressed.crc32?t(new Error("Corrupted zip : CRC32 mismatch")):e()}).resume()})}t.exports=function(e,o){var h=this;return o=u.extend(o||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:n.utf8decode}),l.isNode&&l.isStream(e)?i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):u.prepareContent("the loaded zip file",e,!0,o.optimizedBinaryString,o.base64).then(function(e){var t=new s(o);return t.load(e),t}).then(function(e){var t=[i.Promise.resolve(e)],r=e.files;if(o.checkCRC32)for(var n=0;n<r.length;n++)t.push(f(r[n]));return i.Promise.all(t)}).then(function(e){for(var t=e.shift(),r=t.files,n=0;n<r.length;n++){var i=r[n],s=i.fileNameStr,a=u.resolve(i.fileNameStr);h.file(a,i.decompressed,{binary:!0,optimizedBinaryString:!0,date:i.date,dir:i.dir,comment:i.fileCommentStr.length?i.fileCommentStr:null,unixPermissions:i.unixPermissions,dosPermissions:i.dosPermissions,createFolders:o.createFolders}),i.dir||(h.file(a).unsafeOriginalName=s)}return t.zipComment.length&&(h.comment=t.zipComment),h})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../stream/GenericWorker");function s(e,t){i.call(this,"Nodejs stream input adapter for "+e),this._upstreamEnded=!1,this._bindStream(t)}n.inherits(s,i),s.prototype._bindStream=function(e){var t=this;(this._stream=e).pause(),e.on("data",function(e){t.push({data:e,meta:{percent:0}})}).on("error",function(e){t.isPaused?this.generatedError=e:t.error(e)}).on("end",function(){t.isPaused?t._upstreamEnded=!0:t.end()})},s.prototype.pause=function(){return!!i.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},t.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,t,r){"use strict";var i=e("readable-stream").Readable;function n(e,t,r){i.call(this,t),this._helper=e;var n=this;e.on("data",function(e,t){n.push(e)||n._helper.pause(),r&&r(t)}).on("error",function(e){n.emit("error",e)}).on("end",function(){n.push(null)})}e("../utils").inherits(n,i),n.prototype._read=function(){this._helper.resume()},t.exports=n},{"../utils":32,"readable-stream":16}],14:[function(e,t,r){"use strict";t.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(e,t){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(e,t);if("number"==typeof e)throw new Error('The "data" argument must not be a number');return new Buffer(e,t)},allocBuffer:function(e){if(Buffer.alloc)return Buffer.alloc(e);var t=new Buffer(e);return t.fill(0),t},isBuffer:function(e){return Buffer.isBuffer(e)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}},{}],15:[function(e,t,r){"use strict";function s(e,t,r){var n,i=u.getTypeOf(t),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(e=g(e)),s.createFolders&&(n=_(e))&&b.call(this,n,!0);var a="string"===i&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(t instanceof c&&0===t.uncompressedSize||s.dir||!t||0===t.length)&&(s.base64=!1,s.binary=!0,t="",s.compression="STORE",i="string");var o=null;o=t instanceof c||t instanceof l?t:p.isNode&&p.isStream(t)?new m(e,t):u.prepareContent(e,t,s.binary,s.optimizedBinaryString,s.base64);var h=new d(e,o,s);this.files[e]=h}var i=e("./utf8"),u=e("./utils"),l=e("./stream/GenericWorker"),a=e("./stream/StreamHelper"),f=e("./defaults"),c=e("./compressedObject"),d=e("./zipObject"),o=e("./generate"),p=e("./nodejsUtils"),m=e("./nodejs/NodejsStreamInputAdapter"),_=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1));var t=e.lastIndexOf("/");return 0<t?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},b=function(e,t){return t=void 0!==t?t:f.createFolders,e=g(e),this.files[e]||s.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]};function h(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var n={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,r,n;for(t in this.files)n=this.files[t],(r=t.slice(this.root.length,t.length))&&t.slice(0,this.root.length)===this.root&&e(r,n)},filter:function(r){var n=[];return this.forEach(function(e,t){r(e,t)&&n.push(t)}),n},file:function(e,t,r){if(1!==arguments.length)return e=this.root+e,s.call(this,e,t,r),this;if(h(e)){var n=e;return this.filter(function(e,t){return!t.dir&&n.test(e)})}var i=this.files[this.root+e];return i&&!i.dir?i:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(e,t){return t.dir&&r.test(e)});var e=this.root+r,t=b.call(this,e),n=this.clone();return n.root=t.name,n},remove:function(r){r=this.root+r;var e=this.files[r];if(e||("/"!==r.slice(-1)&&(r+="/"),e=this.files[r]),e&&!e.dir)delete this.files[r];else for(var t=this.filter(function(e,t){return t.name.slice(0,r.length)===r}),n=0;n<t.length;n++)delete this.files[t[n].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,r={};try{if((r=u.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var n=r.comment||this.comment||"";t=o.generateWorker(this,r,n)}catch(e){(t=new l("error")).error(e)}return new a(t,r.type||"string",r.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return(e=e||{}).type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}};t.exports=n},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,t,r){"use strict";t.exports=e("stream")},{stream:void 0}],17:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e);for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data[this.zero+e]},i.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===t&&this.data[s+1]===r&&this.data[s+2]===n&&this.data[s+3]===i)return s-this.zero;return-1},i.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1),n=e.charCodeAt(2),i=e.charCodeAt(3),s=this.readData(4);return t===s[0]&&r===s[1]&&n===s[2]&&i===s[3]},i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[];var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],18:[function(e,t,r){"use strict";var n=e("../utils");function i(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}i.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||e<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(){},readInt:function(e){var t,r=0;for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)r=(r<<8)+this.byteAt(t);return this.index+=e,r},readString:function(e){return n.transformTo("string",this.readData(e))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var e=this.readInt(4);return new Date(Date.UTC(1980+(e>>25&127),(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=i},{"../utils":32}],19:[function(e,t,r){"use strict";var n=e("./Uint8ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,t,r){"use strict";var n=e("./DataReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},i.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},i.prototype.readAndCheckSignature=function(e){return e===this.readData(4)},i.prototype.readData=function(e){this.checkOffset(e);var t=this.data.slice(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./DataReader":18}],21:[function(e,t,r){"use strict";var n=e("./ArrayReader");function i(e){n.call(this,e)}e("../utils").inherits(i,n),i.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0);var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e);return this.index+=e,t},t.exports=i},{"../utils":32,"./ArrayReader":17}],22:[function(e,t,r){"use strict";var n=e("../utils"),i=e("../support"),s=e("./ArrayReader"),a=e("./StringReader"),o=e("./NodeBufferReader"),h=e("./Uint8ArrayReader");t.exports=function(e){var t=n.getTypeOf(e);return n.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new o(e):i.uint8array?new h(n.transformTo("uint8array",e)):new s(n.transformTo("array",e)):new a(e)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,t,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../utils");function s(e){n.call(this,"ConvertWorker to "+e),this.destType=e}i.inherits(s,n),s.prototype.processChunk=function(e){this.push({data:i.transformTo(this.destType,e.data),meta:e.meta})},t.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(e,t,r){"use strict";var n=e("./GenericWorker"),i=e("../crc32");function s(){n.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(s,n),s.prototype.processChunk=function(e){this.streamInfo.crc32=i(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}n.inherits(s,i),s.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=t+e.data.length}i.prototype.processChunk.call(this,e)},t.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(e,t,r){"use strict";var n=e("../utils"),i=e("./GenericWorker");function s(e){i.call(this,"DataWorker");var t=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=n.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}n.inherits(s,i),s.prototype.cleanUp=function(){i.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!i.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,n.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(n.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var e=null,t=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":e=this.data.substring(this.index,t);break;case"uint8array":e=this.data.subarray(this.index,t);break;case"array":case"nodebuffer":e=this.data.slice(this.index,t)}return this.index=t,this.push({data:e,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(e,t,r){"use strict";function n(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}n.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var r=0;r<this._listeners[e].length;r++)this._listeners[e][r].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e;var t=this;return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var e=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name;return this.previous?this.previous+" -> "+e:e}},t.exports=n},{}],29:[function(e,t,r){"use strict";var h=e("../utils"),i=e("./ConvertWorker"),s=e("./GenericWorker"),u=e("../base64"),n=e("../support"),a=e("../external"),o=null;if(n.nodestream)try{o=e("../nodejs/NodejsStreamOutputAdapter")}catch(e){}function l(e,o){return new a.Promise(function(t,r){var n=[],i=e._internalType,s=e._outputType,a=e._mimeType;e.on("data",function(e,t){n.push(e),o&&o(t)}).on("error",function(e){n=[],r(e)}).on("end",function(){try{var e=function(e,t,r){switch(e){case"blob":return h.newBlob(h.transformTo("arraybuffer",t),r);case"base64":return u.encode(t);default:return h.transformTo(e,t)}}(s,function(e,t){var r,n=0,i=null,s=0;for(r=0;r<t.length;r++)s+=t[r].length;switch(e){case"string":return t.join("");case"array":return Array.prototype.concat.apply([],t);case"uint8array":for(i=new Uint8Array(s),r=0;r<t.length;r++)i.set(t[r],n),n+=t[r].length;return i;case"nodebuffer":return Buffer.concat(t);default:throw new Error("concat : unsupported type '"+e+"'")}}(i,n),a);t(e)}catch(e){r(e)}n=[]}).resume()})}function f(e,t,r){var n=t;switch(t){case"blob":case"arraybuffer":n="uint8array";break;case"base64":n="string"}try{this._internalType=n,this._outputType=t,this._mimeType=r,h.checkSupport(n),this._worker=e.pipe(new i(n)),e.lock()}catch(e){this._worker=new s("error"),this._worker.error(e)}}f.prototype={accumulate:function(e){return l(this,e)},on:function(e,t){var r=this;return"data"===e?this._worker.on(e,function(e){t.call(r,e.data,e.meta)}):this._worker.on(e,function(){h.delay(t,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,t,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var n=new ArrayBuffer(0);try{r.blob=0===new Blob([n],{type:"application/zip"}).size}catch(e){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);i.append(n),r.blob=0===i.getBlob("application/zip").size}catch(e){r.blob=!1}}}try{r.nodestream=!!e("readable-stream").Readable}catch(e){r.nodestream=!1}},{"readable-stream":16}],31:[function(e,t,s){"use strict";for(var o=e("./utils"),h=e("./support"),r=e("./nodejsUtils"),n=e("./stream/GenericWorker"),u=new Array(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;u[254]=u[254]=1;function a(){n.call(this,"utf-8 decode"),this.leftOver=null}function l(){n.call(this,"utf-8 encode")}s.utf8encode=function(e){return h.nodebuffer?r.newBufferFrom(e,"utf-8"):function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=h.uint8array?new Uint8Array(o):new Array(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t}(e)},s.utf8decode=function(e){return h.nodebuffer?o.transformTo("nodebuffer",e).toString("utf-8"):function(e){var t,r,n,i,s=e.length,a=new Array(2*s);for(t=r=0;t<s;)if((n=e[t++])<128)a[r++]=n;else if(4<(i=u[n]))a[r++]=65533,t+=i-1;else{for(n&=2===i?31:3===i?15:7;1<i&&t<s;)n=n<<6|63&e[t++],i--;1<i?a[r++]=65533:n<65536?a[r++]=n:(n-=65536,a[r++]=55296|n>>10&1023,a[r++]=56320|1023&n)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(e=o.transformTo(h.uint8array?"uint8array":"array",e))},o.inherits(a,n),a.prototype.processChunk=function(e){var t=o.transformTo(h.uint8array?"uint8array":"array",e.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=t;(t=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t);this.leftOver=null}var n=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}(t),i=t;n!==t.length&&(h.uint8array?(i=t.subarray(0,n),this.leftOver=t.subarray(n,t.length)):(i=t.slice(0,n),this.leftOver=t.slice(n,t.length))),this.push({data:s.utf8decode(i),meta:e.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,n),l.prototype.processChunk=function(e){this.push({data:s.utf8encode(e.data),meta:e.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,t,a){"use strict";var o=e("./support"),h=e("./base64"),r=e("./nodejsUtils"),u=e("./external");function n(e){return e}function l(e,t){for(var r=0;r<e.length;++r)t[r]=255&e.charCodeAt(r);return t}e("setimmediate"),a.newBlob=function(t,r){a.checkSupport("blob");try{return new Blob([t],{type:r})}catch(e){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return n.append(t),n.getBlob(r)}catch(e){throw new Error("Bug : can't construct the Blob.")}}};var i={stringifyByChunk:function(e,t,r){var n=[],i=0,s=e.length;if(s<=r)return String.fromCharCode.apply(null,e);for(;i<s;)"array"===t||"nodebuffer"===t?n.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+r,s)))):n.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+r,s)))),i+=r;return n.join("")},stringifyByChar:function(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(e){return!1}}()}};function s(e){var t=65536,r=a.getTypeOf(e),n=!0;if("uint8array"===r?n=i.applyCanBeUsed.uint8array:"nodebuffer"===r&&(n=i.applyCanBeUsed.nodebuffer),n)for(;1<t;)try{return i.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return i.stringifyByChar(e)}function f(e,t){for(var r=0;r<e.length;r++)t[r]=e[r];return t}a.applyFromCharCode=s;var c={};c.string={string:n,array:function(e){return l(e,new Array(e.length))},arraybuffer:function(e){return c.string.uint8array(e).buffer},uint8array:function(e){return l(e,new Uint8Array(e.length))},nodebuffer:function(e){return l(e,r.allocBuffer(e.length))}},c.array={string:s,array:n,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(e)}},c.arraybuffer={string:function(e){return s(new Uint8Array(e))},array:function(e){return f(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:n,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return r.newBufferFrom(new Uint8Array(e))}},c.uint8array={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:n,nodebuffer:function(e){return r.newBufferFrom(e)}},c.nodebuffer={string:s,array:function(e){return f(e,new Array(e.length))},arraybuffer:function(e){return c.nodebuffer.uint8array(e).buffer},uint8array:function(e){return f(e,new Uint8Array(e.length))},nodebuffer:n},a.transformTo=function(e,t){if(t=t||"",!e)return t;a.checkSupport(e);var r=a.getTypeOf(t);return c[r][e](t)},a.resolve=function(e){for(var t=e.split("/"),r=[],n=0;n<t.length;n++){var i=t[n];"."===i||""===i&&0!==n&&n!==t.length-1||(".."===i?r.pop():r.push(i))}return r.join("/")},a.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":o.nodebuffer&&r.isBuffer(e)?"nodebuffer":o.uint8array&&e instanceof Uint8Array?"uint8array":o.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(e){if(!o[e.toLowerCase()])throw new Error(e+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(e){var t,r,n="";for(r=0;r<(e||"").length;r++)n+="\\x"+((t=e.charCodeAt(r))<16?"0":"")+t.toString(16).toUpperCase();return n},a.delay=function(e,t,r){setImmediate(function(){e.apply(r||null,t||[])})},a.inherits=function(e,t){function r(){}r.prototype=t.prototype,e.prototype=new r},a.extend=function(){var e,t,r={};for(e=0;e<arguments.length;e++)for(t in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],t)&&void 0===r[t]&&(r[t]=arguments[e][t]);return r},a.prepareContent=function(r,e,n,i,s){return u.Promise.resolve(e).then(function(n){return o.blob&&(n instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(n)))&&"undefined"!=typeof FileReader?new u.Promise(function(t,r){var e=new FileReader;e.onload=function(e){t(e.target.result)},e.onerror=function(e){r(e.target.error)},e.readAsArrayBuffer(n)}):n}).then(function(e){var t=a.getTypeOf(e);return t?("arraybuffer"===t?e=a.transformTo("uint8array",e):"string"===t&&(s?e=h.decode(e):n&&!0!==i&&(e=function(e){return l(e,o.uint8array?new Uint8Array(e.length):new Array(e.length))}(e))),e):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),i=e("./utils"),s=e("./signature"),a=e("./zipEntry"),o=e("./support");function h(e){this.files=[],this.loadOptions=e}h.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4;var t=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+i.pretty(t)+", expected "+i.pretty(e)+")")}},isSignature:function(e,t){var r=this.reader.index;this.reader.setIndex(e);var n=this.reader.readString(4)===t;return this.reader.setIndex(r),n},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var e=this.reader.readData(this.zipCommentLength),t=o.uint8array?"uint8array":"array",r=i.transformTo(t,e);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var e,t,r,n=this.zip64EndOfCentralSize-44;0<n;)e=this.reader.readInt(2),t=this.reader.readInt(4),r=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t;for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(e=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(e);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(e<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(e);var t=e;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===i.MAX_VALUE_16BITS||this.diskWithCentralDirStart===i.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===i.MAX_VALUE_16BITS||this.centralDirRecords===i.MAX_VALUE_16BITS||this.centralDirSize===i.MAX_VALUE_32BITS||this.centralDirOffset===i.MAX_VALUE_32BITS){if(this.zip64=!0,(e=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(e),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var n=t-r;if(0<n)this.isSignature(t,s.CENTRAL_FILE_HEADER)||(this.reader.zero=n);else if(n<0)throw new Error("Corrupted zip: missing "+Math.abs(n)+" bytes.")},prepareReader:function(e){this.reader=n(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,t,r){"use strict";var n=e("./reader/readerFor"),s=e("./utils"),i=e("./compressedObject"),a=e("./crc32"),o=e("./utf8"),h=e("./compressions"),u=e("./support");function l(e,t){this.options=e,this.loadOptions=t}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(e){var t,r;if(e.skip(22),this.fileNameLength=e.readInt(2),r=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(t=function(e){for(var t in h)if(Object.prototype.hasOwnProperty.call(h,t)&&h[t].magic===e)return h[t];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new i(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4);var t=e.readInt(2);if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var e=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==e&&(this.dosPermissions=63&this.externalFileAttributes),3==e&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var e=n(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(e){var t,r,n,i=e.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});e.index+4<i;)t=e.readInt(2),r=e.readInt(2),n=e.readData(r),this.extraFields[t]={id:t,length:r,value:n};e.setIndex(i)},handleUTF8:function(){var e=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var t=this.findExtraFieldUnicodePath();if(null!==t)this.fileNameStr=t;else{var r=s.transformTo(e,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var n=this.findExtraFieldUnicodeComment();if(null!==n)this.fileCommentStr=n;else{var i=s.transformTo(e,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileName)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461];if(e){var t=n(e.value);return 1!==t.readInt(1)?null:a(this.fileComment)!==t.readInt(4)?null:o.utf8decode(t.readData(e.length-5))}return null}},t.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,t,r){"use strict";function n(e,t,r){this.name=e,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=t,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),h=e("./stream/GenericWorker");n.prototype={internalStream:function(e){var t=null,r="string";try{if(!e)throw new Error("No output type specified.");var n="string"===(r=e.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),t=this._decompressWorker();var i=!this._dataBinary;i&&!n&&(t=t.pipe(new a.Utf8EncodeWorker)),!i&&n&&(t=t.pipe(new a.Utf8DecodeWorker))}catch(e){(t=new h("error")).error(e)}return new s(t,r,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new i(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)n.prototype[u[f]]=l;t.exports=n},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,l,t){(function(t){"use strict";var r,n,e=t.MutationObserver||t.WebKitMutationObserver;if(e){var i=0,s=new e(u),a=t.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=i=++i%2}}else if(t.setImmediate||void 0===t.MessageChannel)r="document"in t&&"onreadystatechange"in t.document.createElement("script")?function(){var e=t.document.createElement("script");e.onreadystatechange=function(){u(),e.onreadystatechange=null,e.parentNode.removeChild(e),e=null},t.document.documentElement.appendChild(e)}:function(){setTimeout(u,0)};else{var o=new t.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var e,t;n=!0;for(var r=h.length;r;){for(t=h,h=[],e=-1;++e<r;)t[e]();r=h.length}n=!1}l.exports=function(e){1!==h.push(e)||n||r()}}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(e,t,r){"use strict";var i=e("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],n=["PENDING"];function o(e){if("function"!=typeof e)throw new TypeError("resolver must be a function");this.state=n,this.queue=[],this.outcome=void 0,e!==u&&d(this,e)}function h(e,t,r){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(t,r,n){i(function(){var e;try{e=r(n)}catch(e){return l.reject(t,e)}e===t?l.reject(t,new TypeError("Cannot resolve promise with itself")):l.resolve(t,e)})}function c(e){var t=e&&e.then;if(e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof t)return function(){t.apply(e,arguments)}}function d(t,e){var r=!1;function n(e){r||(r=!0,l.reject(t,e))}function i(e){r||(r=!0,l.resolve(t,e))}var s=p(function(){e(i,n)});"error"===s.status&&n(s.value)}function p(e,t){var r={};try{r.value=e(t),r.status="success"}catch(e){r.status="error",r.value=e}return r}(t.exports=o).prototype.finally=function(t){if("function"!=typeof t)return this;var r=this.constructor;return this.then(function(e){return r.resolve(t()).then(function(){return e})},function(e){return r.resolve(t()).then(function(){throw e})})},o.prototype.catch=function(e){return this.then(null,e)},o.prototype.then=function(e,t){if("function"!=typeof e&&this.state===a||"function"!=typeof t&&this.state===s)return this;var r=new this.constructor(u);this.state!==n?f(r,this.state===a?e:t,this.outcome):this.queue.push(new h(r,e,t));return r},h.prototype.callFulfilled=function(e){l.resolve(this.promise,e)},h.prototype.otherCallFulfilled=function(e){f(this.promise,this.onFulfilled,e)},h.prototype.callRejected=function(e){l.reject(this.promise,e)},h.prototype.otherCallRejected=function(e){f(this.promise,this.onRejected,e)},l.resolve=function(e,t){var r=p(c,t);if("error"===r.status)return l.reject(e,r.value);var n=r.value;if(n)d(e,n);else{e.state=a,e.outcome=t;for(var i=-1,s=e.queue.length;++i<s;)e.queue[i].callFulfilled(t)}return e},l.reject=function(e,t){e.state=s,e.outcome=t;for(var r=-1,n=e.queue.length;++r<n;)e.queue[r].callRejected(t);return e},o.resolve=function(e){if(e instanceof this)return e;return l.resolve(new this(u),e)},o.reject=function(e){var t=new this(u);return l.reject(t,e)},o.all=function(e){var r=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var n=e.length,i=!1;if(!n)return this.resolve([]);var s=new Array(n),a=0,t=-1,o=new this(u);for(;++t<n;)h(e[t],t);return o;function h(e,t){r.resolve(e).then(function(e){s[t]=e,++a!==n||i||(i=!0,l.resolve(o,s))},function(e){i||(i=!0,l.reject(o,e))})}},o.race=function(e){var t=this;if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"));var r=e.length,n=!1;if(!r)return this.resolve([]);var i=-1,s=new this(u);for(;++i<r;)a=e[i],t.resolve(a).then(function(e){n||(n=!0,l.resolve(s,e))},function(e){n||(n=!0,l.reject(s,e))});var a;return s}},{immediate:36}],38:[function(e,t,r){"use strict";var n={};(0,e("./lib/utils/common").assign)(n,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),t.exports=n},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,r){"use strict";var a=e("./zlib/deflate"),o=e("./utils/common"),h=e("./utils/strings"),i=e("./zlib/messages"),s=e("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,c=0,d=8;function p(e){if(!(this instanceof p))return new p(e);this.options=o.assign({level:f,method:d,chunkSize:16384,windowBits:15,memLevel:8,strategy:c,to:""},e||{});var t=this.options;t.raw&&0<t.windowBits?t.windowBits=-t.windowBits:t.gzip&&0<t.windowBits&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(r!==l)throw new Error(i[r]);if(t.header&&a.deflateSetHeader(this.strm,t.header),t.dictionary){var n;if(n="string"==typeof t.dictionary?h.string2buf(t.dictionary):"[object ArrayBuffer]"===u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,(r=a.deflateSetDictionary(this.strm,n))!==l)throw new Error(i[r]);this._dict_set=!0}}function n(e,t){var r=new p(t);if(r.push(e,!0),r.err)throw r.msg||i[r.err];return r.result}p.prototype.push=function(e,t){var r,n,i=this.strm,s=this.options.chunkSize;if(this.ended)return!1;n=t===~~t?t:!0===t?4:0,"string"==typeof e?i.input=h.string2buf(e):"[object ArrayBuffer]"===u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;do{if(0===i.avail_out&&(i.output=new o.Buf8(s),i.next_out=0,i.avail_out=s),1!==(r=a.deflate(i,n))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==i.avail_out&&(0!==i.avail_in||4!==n&&2!==n)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(i.output,i.next_out))):this.onData(o.shrinkBuf(i.output,i.next_out)))}while((0<i.avail_in||0===i.avail_out)&&1!==r);return 4===n?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==n||(this.onEnd(l),!(i.avail_out=0))},p.prototype.onData=function(e){this.chunks.push(e)},p.prototype.onEnd=function(e){e===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Deflate=p,r.deflate=n,r.deflateRaw=function(e,t){return(t=t||{}).raw=!0,n(e,t)},r.gzip=function(e,t){return(t=t||{}).gzip=!0,n(e,t)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,r){"use strict";var c=e("./zlib/inflate"),d=e("./utils/common"),p=e("./utils/strings"),m=e("./zlib/constants"),n=e("./zlib/messages"),i=e("./zlib/zstream"),s=e("./zlib/gzheader"),_=Object.prototype.toString;function a(e){if(!(this instanceof a))return new a(e);this.options=d.assign({chunkSize:16384,windowBits:0,to:""},e||{});var t=this.options;t.raw&&0<=t.windowBits&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(0<=t.windowBits&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),15<t.windowBits&&t.windowBits<48&&0==(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new i,this.strm.avail_out=0;var r=c.inflateInit2(this.strm,t.windowBits);if(r!==m.Z_OK)throw new Error(n[r]);this.header=new s,c.inflateGetHeader(this.strm,this.header)}function o(e,t){var r=new a(t);if(r.push(e,!0),r.err)throw r.msg||n[r.err];return r.result}a.prototype.push=function(e,t){var r,n,i,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;n=t===~~t?t:!0===t?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof e?h.input=p.binstring2buf(e):"[object ArrayBuffer]"===_.call(e)?h.input=new Uint8Array(e):h.input=e,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new d.Buf8(u),h.next_out=0,h.avail_out=u),(r=c.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=c.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||n!==m.Z_FINISH&&n!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(i=p.utf8border(h.output,h.next_out),s=h.next_out-i,a=p.buf2string(h.output,i),h.next_out=s,h.avail_out=u-s,s&&d.arraySet(h.output,h.output,i,s,0),this.onData(a)):this.onData(d.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(n=m.Z_FINISH),n===m.Z_FINISH?(r=c.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):n!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(e){this.chunks.push(e)},a.prototype.onEnd=function(e){e===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=d.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(e,t){return(t=t||{}).raw=!0,o(e,t)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,r){"use strict";var n="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var r=t.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}}return e},r.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)};var i={arraySet:function(e,t,r,n,i){if(t.subarray&&e.subarray)e.set(t.subarray(r,r+n),i);else for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){var t,r,n,i,s,a;for(t=n=0,r=e.length;t<r;t++)n+=e[t].length;for(a=new Uint8Array(n),t=i=0,r=e.length;t<r;t++)s=e[t],a.set(s,i),i+=s.length;return a}},s={arraySet:function(e,t,r,n,i){for(var s=0;s<n;s++)e[i+s]=t[r+s]},flattenChunks:function(e){return[].concat.apply([],e)}};r.setTyped=function(e){e?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,i)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(n)},{}],42:[function(e,t,r){"use strict";var h=e("./common"),i=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(e){i=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){s=!1}for(var u=new h.Buf8(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;function l(e,t){if(t<65537&&(e.subarray&&s||!e.subarray&&i))return String.fromCharCode.apply(null,h.shrinkBuf(e,t));for(var r="",n=0;n<t;n++)r+=String.fromCharCode(e[n]);return r}u[254]=u[254]=1,r.string2buf=function(e){var t,r,n,i,s,a=e.length,o=0;for(i=0;i<a;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),o+=r<128?1:r<2048?2:r<65536?3:4;for(t=new h.Buf8(o),i=s=0;s<o;i++)55296==(64512&(r=e.charCodeAt(i)))&&i+1<a&&56320==(64512&(n=e.charCodeAt(i+1)))&&(r=65536+(r-55296<<10)+(n-56320),i++),r<128?t[s++]=r:(r<2048?t[s++]=192|r>>>6:(r<65536?t[s++]=224|r>>>12:(t[s++]=240|r>>>18,t[s++]=128|r>>>12&63),t[s++]=128|r>>>6&63),t[s++]=128|63&r);return t},r.buf2binstring=function(e){return l(e,e.length)},r.binstring2buf=function(e){for(var t=new h.Buf8(e.length),r=0,n=t.length;r<n;r++)t[r]=e.charCodeAt(r);return t},r.buf2string=function(e,t){var r,n,i,s,a=t||e.length,o=new Array(2*a);for(r=n=0;r<a;)if((i=e[r++])<128)o[n++]=i;else if(4<(s=u[i]))o[n++]=65533,r+=s-1;else{for(i&=2===s?31:3===s?15:7;1<s&&r<a;)i=i<<6|63&e[r++],s--;1<s?o[n++]=65533:i<65536?o[n++]=i:(i-=65536,o[n++]=55296|i>>10&1023,o[n++]=56320|1023&i)}return l(o,n)},r.utf8border=function(e,t){var r;for((t=t||e.length)>e.length&&(t=e.length),r=t-1;0<=r&&128==(192&e[r]);)r--;return r<0?t:0===r?t:r+u[e[r]]>t?r:t}},{"./common":41}],43:[function(e,t,r){"use strict";t.exports=function(e,t,r,n){for(var i=65535&e|0,s=e>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(i=i+t[n++]|0)|0,--a;);i%=65521,s%=65521}return i|s<<16|0}},{}],44:[function(e,t,r){"use strict";t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,r){"use strict";var o=function(){for(var e,t=[],r=0;r<256;r++){e=r;for(var n=0;n<8;n++)e=1&e?3988292384^e>>>1:e>>>1;t[r]=e}return t}();t.exports=function(e,t,r,n){var i=o,s=n+r;e^=-1;for(var a=n;a<s;a++)e=e>>>8^i[255&(e^t[a])];return-1^e}},{}],46:[function(e,t,r){"use strict";var h,c=e("../utils/common"),u=e("./trees"),d=e("./adler32"),p=e("./crc32"),n=e("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,i=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(e,t){return e.msg=n[t],t}function T(e){return(e<<1)-(4<e?9:0)}function D(e){for(var t=e.length;0<=--t;)e[t]=0}function F(e){var t=e.state,r=t.pending;r>e.avail_out&&(r=e.avail_out),0!==r&&(c.arraySet(e.output,t.pending_buf,t.pending_out,r,e.next_out),e.next_out+=r,t.pending_out+=r,e.total_out+=r,e.avail_out-=r,t.pending-=r,0===t.pending&&(t.pending_out=0))}function N(e,t){u._tr_flush_block(e,0<=e.block_start?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,F(e.strm)}function U(e,t){e.pending_buf[e.pending++]=t}function P(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function L(e,t){var r,n,i=e.max_chain_length,s=e.strstart,a=e.prev_length,o=e.nice_match,h=e.strstart>e.w_size-z?e.strstart-(e.w_size-z):0,u=e.window,l=e.w_mask,f=e.prev,c=e.strstart+S,d=u[s+a-1],p=u[s+a];e.prev_length>=e.good_match&&(i>>=2),o>e.lookahead&&(o=e.lookahead);do{if(u[(r=t)+a]===p&&u[r+a-1]===d&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<c);if(n=S-(c-s),s=c-S,a<n){if(e.match_start=t,o<=(a=n))break;d=u[s+a-1],p=u[s+a]}}}while((t=f[t&l])>h&&0!=--i);return a<=e.lookahead?a:e.lookahead}function j(e){var t,r,n,i,s,a,o,h,u,l,f=e.w_size;do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=f+(f-z)){for(c.arraySet(e.window,e.window,f,f,0),e.match_start-=f,e.strstart-=f,e.block_start-=f,t=r=e.hash_size;n=e.head[--t],e.head[t]=f<=n?n-f:0,--r;);for(t=r=f;n=e.prev[--t],e.prev[t]=f<=n?n-f:0,--r;);i+=f}if(0===e.strm.avail_in)break;if(a=e.strm,o=e.window,h=e.strstart+e.lookahead,u=i,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,c.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=d(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),e.lookahead+=r,e.lookahead+e.insert>=x)for(s=e.strstart-e.insert,e.ins_h=e.window[s],e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[s+x-1])&e.hash_mask,e.prev[s&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=s,s++,e.insert--,!(e.lookahead+e.insert<x)););}while(e.lookahead<z&&0!==e.strm.avail_in)}function Z(e,t){for(var r,n;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==r&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r)),e.match_length>=x)if(n=u._tr_tally(e,e.strstart-e.match_start,e.match_length-x),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=x){for(e.match_length--;e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart,0!=--e.match_length;);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask;else n=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(n&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function W(e,t){for(var r,n,i;;){if(e.lookahead<z){if(j(e),e.lookahead<z&&t===l)return A;if(0===e.lookahead)break}if(r=0,e.lookahead>=x&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=x-1,0!==r&&e.prev_length<e.max_lazy_match&&e.strstart-r<=e.w_size-z&&(e.match_length=L(e,r),e.match_length<=5&&(1===e.strategy||e.match_length===x&&4096<e.strstart-e.match_start)&&(e.match_length=x-1)),e.prev_length>=x&&e.match_length<=e.prev_length){for(i=e.strstart+e.lookahead-x,n=u._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-x),e.lookahead-=e.prev_length-1,e.prev_length-=2;++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+x-1])&e.hash_mask,r=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!=--e.prev_length;);if(e.match_available=0,e.match_length=x-1,e.strstart++,n&&(N(e,!1),0===e.strm.avail_out))return A}else if(e.match_available){if((n=u._tr_tally(e,0,e.window[e.strstart-1]))&&N(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return A}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(n=u._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<x-1?e.strstart:x-1,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}function M(e,t,r,n,i){this.good_length=e,this.max_lazy=t,this.nice_length=r,this.max_chain=n,this.func=i}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new c.Buf16(2*w),this.dyn_dtree=new c.Buf16(2*(2*a+1)),this.bl_tree=new c.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new c.Buf16(k+1),this.heap=new c.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new c.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(e){var t;return e&&e.state?(e.total_in=e.total_out=0,e.data_type=i,(t=e.state).pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?C:E,e.adler=2===t.wrap?0:1,t.last_flush=l,u._tr_init(t),m):R(e,_)}function K(e){var t=G(e);return t===m&&function(e){e.window_size=2*e.w_size,D(e.head),e.max_lazy_match=h[e.level].max_lazy,e.good_match=h[e.level].good_length,e.nice_match=h[e.level].nice_length,e.max_chain_length=h[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=x-1,e.match_available=0,e.ins_h=0}(e.state),t}function Y(e,t,r,n,i,s){if(!e)return _;var a=1;if(t===g&&(t=6),n<0?(a=0,n=-n):15<n&&(a=2,n-=16),i<1||y<i||r!==v||n<8||15<n||t<0||9<t||s<0||b<s)return R(e,_);8===n&&(n=9);var o=new H;return(e.state=o).strm=e,o.wrap=a,o.gzhead=null,o.w_bits=n,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=i+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new c.Buf8(2*o.w_size),o.head=new c.Buf16(o.hash_size),o.prev=new c.Buf16(o.w_size),o.lit_bufsize=1<<i+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new c.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=t,o.strategy=s,o.method=r,K(e)}h=[new M(0,0,0,0,function(e,t){var r=65535;for(r>e.pending_buf_size-5&&(r=e.pending_buf_size-5);;){if(e.lookahead<=1){if(j(e),0===e.lookahead&&t===l)return A;if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0;var n=e.block_start+r;if((0===e.strstart||e.strstart>=n)&&(e.lookahead=e.strstart-n,e.strstart=n,N(e,!1),0===e.strm.avail_out))return A;if(e.strstart-e.block_start>=e.w_size-z&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):(e.strstart>e.block_start&&(N(e,!1),e.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(e,t){return Y(e,t,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(e,t){return e&&e.state?2!==e.state.wrap?_:(e.state.gzhead=t,m):_},r.deflate=function(e,t){var r,n,i,s;if(!e||!e.state||5<t||t<0)return e?R(e,_):_;if(n=e.state,!e.output||!e.input&&0!==e.avail_in||666===n.status&&t!==f)return R(e,0===e.avail_out?-5:_);if(n.strm=e,r=n.last_flush,n.last_flush=t,n.status===C)if(2===n.wrap)e.adler=0,U(n,31),U(n,139),U(n,8),n.gzhead?(U(n,(n.gzhead.text?1:0)+(n.gzhead.hcrc?2:0)+(n.gzhead.extra?4:0)+(n.gzhead.name?8:0)+(n.gzhead.comment?16:0)),U(n,255&n.gzhead.time),U(n,n.gzhead.time>>8&255),U(n,n.gzhead.time>>16&255),U(n,n.gzhead.time>>24&255),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,255&n.gzhead.os),n.gzhead.extra&&n.gzhead.extra.length&&(U(n,255&n.gzhead.extra.length),U(n,n.gzhead.extra.length>>8&255)),n.gzhead.hcrc&&(e.adler=p(e.adler,n.pending_buf,n.pending,0)),n.gzindex=0,n.status=69):(U(n,0),U(n,0),U(n,0),U(n,0),U(n,0),U(n,9===n.level?2:2<=n.strategy||n.level<2?4:0),U(n,3),n.status=E);else{var a=v+(n.w_bits-8<<4)<<8;a|=(2<=n.strategy||n.level<2?0:n.level<6?1:6===n.level?2:3)<<6,0!==n.strstart&&(a|=32),a+=31-a%31,n.status=E,P(n,a),0!==n.strstart&&(P(n,e.adler>>>16),P(n,65535&e.adler)),e.adler=1}if(69===n.status)if(n.gzhead.extra){for(i=n.pending;n.gzindex<(65535&n.gzhead.extra.length)&&(n.pending!==n.pending_buf_size||(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending!==n.pending_buf_size));)U(n,255&n.gzhead.extra[n.gzindex]),n.gzindex++;n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),n.gzindex===n.gzhead.extra.length&&(n.gzindex=0,n.status=73)}else n.status=73;if(73===n.status)if(n.gzhead.name){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.name.length?255&n.gzhead.name.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.gzindex=0,n.status=91)}else n.status=91;if(91===n.status)if(n.gzhead.comment){i=n.pending;do{if(n.pending===n.pending_buf_size&&(n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),F(e),i=n.pending,n.pending===n.pending_buf_size)){s=1;break}s=n.gzindex<n.gzhead.comment.length?255&n.gzhead.comment.charCodeAt(n.gzindex++):0,U(n,s)}while(0!==s);n.gzhead.hcrc&&n.pending>i&&(e.adler=p(e.adler,n.pending_buf,n.pending-i,i)),0===s&&(n.status=103)}else n.status=103;if(103===n.status&&(n.gzhead.hcrc?(n.pending+2>n.pending_buf_size&&F(e),n.pending+2<=n.pending_buf_size&&(U(n,255&e.adler),U(n,e.adler>>8&255),e.adler=0,n.status=E)):n.status=E),0!==n.pending){if(F(e),0===e.avail_out)return n.last_flush=-1,m}else if(0===e.avail_in&&T(t)<=T(r)&&t!==f)return R(e,-5);if(666===n.status&&0!==e.avail_in)return R(e,-5);if(0!==e.avail_in||0!==n.lookahead||t!==l&&666!==n.status){var o=2===n.strategy?function(e,t){for(var r;;){if(0===e.lookahead&&(j(e),0===e.lookahead)){if(t===l)return A;break}if(e.match_length=0,r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):3===n.strategy?function(e,t){for(var r,n,i,s,a=e.window;;){if(e.lookahead<=S){if(j(e),e.lookahead<=S&&t===l)return A;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=x&&0<e.strstart&&(n=a[i=e.strstart-1])===a[++i]&&n===a[++i]&&n===a[++i]){s=e.strstart+S;do{}while(n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&n===a[++i]&&i<s);e.match_length=S-(s-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=x?(r=u._tr_tally(e,1,e.match_length-x),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(r=u._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),r&&(N(e,!1),0===e.strm.avail_out))return A}return e.insert=0,t===f?(N(e,!0),0===e.strm.avail_out?O:B):e.last_lit&&(N(e,!1),0===e.strm.avail_out)?A:I}(n,t):h[n.level].func(n,t);if(o!==O&&o!==B||(n.status=666),o===A||o===O)return 0===e.avail_out&&(n.last_flush=-1),m;if(o===I&&(1===t?u._tr_align(n):5!==t&&(u._tr_stored_block(n,0,0,!1),3===t&&(D(n.head),0===n.lookahead&&(n.strstart=0,n.block_start=0,n.insert=0))),F(e),0===e.avail_out))return n.last_flush=-1,m}return t!==f?m:n.wrap<=0?1:(2===n.wrap?(U(n,255&e.adler),U(n,e.adler>>8&255),U(n,e.adler>>16&255),U(n,e.adler>>24&255),U(n,255&e.total_in),U(n,e.total_in>>8&255),U(n,e.total_in>>16&255),U(n,e.total_in>>24&255)):(P(n,e.adler>>>16),P(n,65535&e.adler)),F(e),0<n.wrap&&(n.wrap=-n.wrap),0!==n.pending?m:1)},r.deflateEnd=function(e){var t;return e&&e.state?(t=e.state.status)!==C&&69!==t&&73!==t&&91!==t&&103!==t&&t!==E&&666!==t?R(e,_):(e.state=null,t===E?R(e,-3):m):_},r.deflateSetDictionary=function(e,t){var r,n,i,s,a,o,h,u,l=t.length;if(!e||!e.state)return _;if(2===(s=(r=e.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(e.adler=d(e.adler,t,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new c.Buf8(r.w_size),c.arraySet(u,t,l-r.w_size,r.w_size,0),t=u,l=r.w_size),a=e.avail_in,o=e.next_in,h=e.input,e.avail_in=l,e.next_in=0,e.input=t,j(r);r.lookahead>=x;){for(n=r.strstart,i=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[n+x-1])&r.hash_mask,r.prev[n&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=n,n++,--i;);r.strstart=n,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,e.next_in=o,e.input=h,e.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,r){"use strict";t.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,t,r){"use strict";t.exports=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C;r=e.state,n=e.next_in,z=e.input,i=n+(e.avail_in-5),s=e.next_out,C=e.output,a=s-(t-e.avail_out),o=s+(e.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,c=r.window,d=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;e:do{p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=m[d&g];t:for(;;){if(d>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(d&(1<<y)-1)];continue t}if(32&y){r.mode=12;break e}e.msg="invalid literal/length code",r.mode=30;break e}w=65535&v,(y&=15)&&(p<y&&(d+=z[n++]<<p,p+=8),w+=d&(1<<y)-1,d>>>=y,p-=y),p<15&&(d+=z[n++]<<p,p+=8,d+=z[n++]<<p,p+=8),v=_[d&b];r:for(;;){if(d>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(d&(1<<y)-1)];continue r}e.msg="invalid distance code",r.mode=30;break e}if(k=65535&v,p<(y&=15)&&(d+=z[n++]<<p,(p+=8)<y&&(d+=z[n++]<<p,p+=8)),h<(k+=d&(1<<y)-1)){e.msg="invalid distance too far back",r.mode=30;break e}if(d>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){e.msg="invalid distance too far back",r.mode=30;break e}if(S=c,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=c[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=c[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=c[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(n<i&&s<o);n-=w=p>>3,d&=(1<<(p-=w<<3))-1,e.next_in=n,e.next_out=s,e.avail_in=n<i?i-n+5:5-(n-i),e.avail_out=s<o?o-s+257:257-(s-o),r.hold=d,r.bits=p}},{}],49:[function(e,t,r){"use strict";var I=e("../utils/common"),O=e("./adler32"),B=e("./crc32"),R=e("./inffast"),T=e("./inftrees"),D=1,F=2,N=0,U=-2,P=1,n=852,i=592;function L(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t;return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=P,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new I.Buf32(n),t.distcode=t.distdyn=new I.Buf32(i),t.sane=1,t.back=-1,N):U}function o(e){var t;return e&&e.state?((t=e.state).wsize=0,t.whave=0,t.wnext=0,a(e)):U}function h(e,t){var r,n;return e&&e.state?(n=e.state,t<0?(r=0,t=-t):(r=1+(t>>4),t<48&&(t&=15)),t&&(t<8||15<t)?U:(null!==n.window&&n.wbits!==t&&(n.window=null),n.wrap=r,n.wbits=t,o(e))):U}function u(e,t){var r,n;return e?(n=new s,(e.state=n).window=null,(r=h(e,t))!==N&&(e.state=null),r):U}var l,f,c=!0;function j(e){if(c){var t;for(l=new I.Buf32(512),f=new I.Buf32(32),t=0;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(T(D,e.lens,0,288,l,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;T(F,e.lens,0,32,f,0,e.work,{bits:5}),c=!1}e.lencode=l,e.lenbits=9,e.distcode=f,e.distbits=5}function Z(e,t,r,n){var i,s=e.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),n>=s.wsize?(I.arraySet(s.window,t,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(n<(i=s.wsize-s.wnext)&&(i=n),I.arraySet(s.window,t,r-n,i,s.wnext),(n-=i)?(I.arraySet(s.window,t,r-n,n,0),s.wnext=n,s.whave=s.wsize):(s.wnext+=i,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=i))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(e){return u(e,15)},r.inflateInit2=u,r.inflate=function(e,t){var r,n,i,s,a,o,h,u,l,f,c,d,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return U;12===(r=e.state).mode&&(r.mode=13),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,f=o,c=h,x=N;e:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){e.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){e.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){e.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,e.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){e.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){e.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(d=r.length)&&(d=o),d&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,n,s,d,k)),512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,r.length-=d),r.length))break e;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break e;for(d=0;k=n[s+d++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&d<o;);if(512&r.flags&&(r.check=B(r.check,n,d,s)),o-=d,s+=d,k)break e}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(65535&r.check)){e.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),e.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}e.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,2;e.adler=r.check=1,r.mode=12;case 12:if(5===t||6===t)break e;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==t)break;u>>>=2,l-=2;break e;case 2:r.mode=17;break;case 3:e.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){e.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===t)break e;case 15:r.mode=16;case 16:if(d=r.length){if(o<d&&(d=o),h<d&&(d=h),0===d)break e;I.arraySet(i,n,s,d,a),o-=d,s+=d,h-=d,a+=d,r.length-=d;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){e.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){e.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],d=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}l-=_,k=0,d=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+d>r.nlen+r.ndist){e.msg="invalid bit length repeat",r.mode=30;break}for(;d--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){e.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){e.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){e.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===t)break e;case 20:r.mode=21;case 21:if(6<=o&&258<=h){e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,R(e,c),a=e.next_out,i=e.output,h=e.avail_out,s=e.next_in,n=e.input,o=e.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){e.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){e.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){e.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break e;if(d=c-h,r.offset>d){if((d=r.offset-d)>r.whave&&r.sane){e.msg="invalid distance too far back",r.mode=30;break}p=d>r.wnext?(d-=r.wnext,r.wsize-d):r.wnext-d,d>r.length&&(d=r.length),m=r.window}else m=i,p=a-r.offset,d=r.length;for(h<d&&(d=h),h-=d,r.length-=d;i[a++]=m[p++],--d;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break e;i[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break e;o--,u|=n[s++]<<l,l+=8}if(c-=h,e.total_out+=c,r.total+=c,c&&(e.adler=r.check=r.flags?B(r.check,i,c,a-c):O(r.check,i,c,a-c)),c=h,(r.flags?u:L(u))!==r.check){e.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break e;o--,u+=n[s++]<<l,l+=8}if(u!==(4294967295&r.total)){e.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break e;case 30:x=-3;break e;case 31:return-4;case 32:default:return U}return e.next_out=a,e.avail_out=h,e.next_in=s,e.avail_in=o,r.hold=u,r.bits=l,(r.wsize||c!==e.avail_out&&r.mode<30&&(r.mode<27||4!==t))&&Z(e,e.output,e.next_out,c-e.avail_out)?(r.mode=31,-4):(f-=e.avail_in,c-=e.avail_out,e.total_in+=f,e.total_out+=c,r.total+=c,r.wrap&&c&&(e.adler=r.check=r.flags?B(r.check,i,c,e.next_out-c):O(r.check,i,c,e.next_out-c)),e.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===c||4===t)&&x===N&&(x=-5),x)},r.inflateEnd=function(e){if(!e||!e.state)return U;var t=e.state;return t.window&&(t.window=null),e.state=null,N},r.inflateGetHeader=function(e,t){var r;return e&&e.state?0==(2&(r=e.state).wrap)?U:((r.head=t).done=!1,N):U},r.inflateSetDictionary=function(e,t){var r,n=t.length;return e&&e.state?0!==(r=e.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,t,n,0)!==r.check?-3:Z(e,t,n,n)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,r){"use strict";var D=e("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];t.exports=function(e,t,r,n,i,s,a,o){var h,u,l,f,c,d,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<n;v++)O[t[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return i[s++]=20971520,i[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===e||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<n;v++)0!==t[r+v]&&(a[B[t[r+v]]++]=v);if(d=0===e?(A=R=a,19):1===e?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,c=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===e&&852<C||2===e&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<d?(m=0,a[v]):a[v]>d?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;i[c+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=t[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),c+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===e&&852<C||2===e&&592<C)return 1;i[l=E&f]=k<<24|x<<16|c-s|0}}return 0!==E&&(i[c+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(e,t,r){"use strict";t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,r){"use strict";var i=e("../utils/common"),o=0,h=1;function n(e){for(var t=e.length;0<=--t;)e[t]=0}var s=0,a=29,u=256,l=u+1+a,f=30,c=19,_=2*l+1,g=15,d=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));n(z);var C=new Array(2*f);n(C);var E=new Array(512);n(E);var A=new Array(256);n(A);var I=new Array(a);n(I);var O,B,R,T=new Array(f);function D(e,t,r,n,i){this.static_tree=e,this.extra_bits=t,this.extra_base=r,this.elems=n,this.max_length=i,this.has_stree=e&&e.length}function F(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function N(e){return e<256?E[e]:E[256+(e>>>7)]}function U(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function P(e,t,r){e.bi_valid>d-r?(e.bi_buf|=t<<e.bi_valid&65535,U(e,e.bi_buf),e.bi_buf=t>>d-e.bi_valid,e.bi_valid+=r-d):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=r)}function L(e,t,r){P(e,r[2*t],r[2*t+1])}function j(e,t){for(var r=0;r|=1&e,e>>>=1,r<<=1,0<--t;);return r>>>1}function Z(e,t,r){var n,i,s=new Array(g+1),a=0;for(n=1;n<=g;n++)s[n]=a=a+r[n-1]<<1;for(i=0;i<=t;i++){var o=e[2*i+1];0!==o&&(e[2*i]=j(s[o]++,o))}}function W(e){var t;for(t=0;t<l;t++)e.dyn_ltree[2*t]=0;for(t=0;t<f;t++)e.dyn_dtree[2*t]=0;for(t=0;t<c;t++)e.bl_tree[2*t]=0;e.dyn_ltree[2*m]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function M(e){8<e.bi_valid?U(e,e.bi_buf):0<e.bi_valid&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function H(e,t,r,n){var i=2*t,s=2*r;return e[i]<e[s]||e[i]===e[s]&&n[t]<=n[r]}function G(e,t,r){for(var n=e.heap[r],i=r<<1;i<=e.heap_len&&(i<e.heap_len&&H(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!H(t,n,e.heap[i],e.depth));)e.heap[r]=e.heap[i],r=i,i<<=1;e.heap[r]=n}function K(e,t,r){var n,i,s,a,o=0;if(0!==e.last_lit)for(;n=e.pending_buf[e.d_buf+2*o]<<8|e.pending_buf[e.d_buf+2*o+1],i=e.pending_buf[e.l_buf+o],o++,0===n?L(e,i,t):(L(e,(s=A[i])+u+1,t),0!==(a=w[s])&&P(e,i-=I[s],a),L(e,s=N(--n),r),0!==(a=k[s])&&P(e,n-=T[s],a)),o<e.last_lit;);L(e,m,t)}function Y(e,t){var r,n,i,s=t.dyn_tree,a=t.stat_desc.static_tree,o=t.stat_desc.has_stree,h=t.stat_desc.elems,u=-1;for(e.heap_len=0,e.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(e.heap[++e.heap_len]=u=r,e.depth[r]=0):s[2*r+1]=0;for(;e.heap_len<2;)s[2*(i=e.heap[++e.heap_len]=u<2?++u:0)]=1,e.depth[i]=0,e.opt_len--,o&&(e.static_len-=a[2*i+1]);for(t.max_code=u,r=e.heap_len>>1;1<=r;r--)G(e,s,r);for(i=h;r=e.heap[1],e.heap[1]=e.heap[e.heap_len--],G(e,s,1),n=e.heap[1],e.heap[--e.heap_max]=r,e.heap[--e.heap_max]=n,s[2*i]=s[2*r]+s[2*n],e.depth[i]=(e.depth[r]>=e.depth[n]?e.depth[r]:e.depth[n])+1,s[2*r+1]=s[2*n+1]=i,e.heap[1]=i++,G(e,s,1),2<=e.heap_len;);e.heap[--e.heap_max]=e.heap[1],function(e,t){var r,n,i,s,a,o,h=t.dyn_tree,u=t.max_code,l=t.stat_desc.static_tree,f=t.stat_desc.has_stree,c=t.stat_desc.extra_bits,d=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0;for(s=0;s<=g;s++)e.bl_count[s]=0;for(h[2*e.heap[e.heap_max]+1]=0,r=e.heap_max+1;r<_;r++)p<(s=h[2*h[2*(n=e.heap[r])+1]+1]+1)&&(s=p,m++),h[2*n+1]=s,u<n||(e.bl_count[s]++,a=0,d<=n&&(a=c[n-d]),o=h[2*n],e.opt_len+=o*(s+a),f&&(e.static_len+=o*(l[2*n+1]+a)));if(0!==m){do{for(s=p-1;0===e.bl_count[s];)s--;e.bl_count[s]--,e.bl_count[s+1]+=2,e.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(n=e.bl_count[s];0!==n;)u<(i=e.heap[--r])||(h[2*i+1]!==s&&(e.opt_len+=(s-h[2*i+1])*h[2*i],h[2*i+1]=s),n--)}}(e,t),Z(s,u,e.bl_count)}function X(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),t[2*(r+1)+1]=65535,n=0;n<=r;n++)i=a,a=t[2*(n+1)+1],++o<h&&i===a||(o<u?e.bl_tree[2*i]+=o:0!==i?(i!==s&&e.bl_tree[2*i]++,e.bl_tree[2*b]++):o<=10?e.bl_tree[2*v]++:e.bl_tree[2*y]++,s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4))}function V(e,t,r){var n,i,s=-1,a=t[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),n=0;n<=r;n++)if(i=a,a=t[2*(n+1)+1],!(++o<h&&i===a)){if(o<u)for(;L(e,i,e.bl_tree),0!=--o;);else 0!==i?(i!==s&&(L(e,i,e.bl_tree),o--),L(e,b,e.bl_tree),P(e,o-3,2)):o<=10?(L(e,v,e.bl_tree),P(e,o-3,3)):(L(e,y,e.bl_tree),P(e,o-11,7));s=i,u=(o=0)===a?(h=138,3):i===a?(h=6,3):(h=7,4)}}n(T);var q=!1;function J(e,t,r,n){P(e,(s<<1)+(n?1:0),3),function(e,t,r,n){M(e),n&&(U(e,r),U(e,~r)),i.arraySet(e.pending_buf,e.window,t,r,e.pending),e.pending+=r}(e,t,r,!0)}r._tr_init=function(e){q||(function(){var e,t,r,n,i,s=new Array(g+1);for(n=r=0;n<a-1;n++)for(I[n]=r,e=0;e<1<<w[n];e++)A[r++]=n;for(A[r-1]=n,n=i=0;n<16;n++)for(T[n]=i,e=0;e<1<<k[n];e++)E[i++]=n;for(i>>=7;n<f;n++)for(T[n]=i<<7,e=0;e<1<<k[n]-7;e++)E[256+i++]=n;for(t=0;t<=g;t++)s[t]=0;for(e=0;e<=143;)z[2*e+1]=8,e++,s[8]++;for(;e<=255;)z[2*e+1]=9,e++,s[9]++;for(;e<=279;)z[2*e+1]=7,e++,s[7]++;for(;e<=287;)z[2*e+1]=8,e++,s[8]++;for(Z(z,l+1,s),e=0;e<f;e++)C[2*e+1]=5,C[2*e]=j(e,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,c,p)}(),q=!0),e.l_desc=new F(e.dyn_ltree,O),e.d_desc=new F(e.dyn_dtree,B),e.bl_desc=new F(e.bl_tree,R),e.bi_buf=0,e.bi_valid=0,W(e)},r._tr_stored_block=J,r._tr_flush_block=function(e,t,r,n){var i,s,a=0;0<e.level?(2===e.strm.data_type&&(e.strm.data_type=function(e){var t,r=4093624447;for(t=0;t<=31;t++,r>>>=1)if(1&r&&0!==e.dyn_ltree[2*t])return o;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return h;for(t=32;t<u;t++)if(0!==e.dyn_ltree[2*t])return h;return o}(e)),Y(e,e.l_desc),Y(e,e.d_desc),a=function(e){var t;for(X(e,e.dyn_ltree,e.l_desc.max_code),X(e,e.dyn_dtree,e.d_desc.max_code),Y(e,e.bl_desc),t=c-1;3<=t&&0===e.bl_tree[2*S[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}(e),i=e.opt_len+3+7>>>3,(s=e.static_len+3+7>>>3)<=i&&(i=s)):i=s=r+5,r+4<=i&&-1!==t?J(e,t,r,n):4===e.strategy||s===i?(P(e,2+(n?1:0),3),K(e,z,C)):(P(e,4+(n?1:0),3),function(e,t,r,n){var i;for(P(e,t-257,5),P(e,r-1,5),P(e,n-4,4),i=0;i<n;i++)P(e,e.bl_tree[2*S[i]+1],3);V(e,e.dyn_ltree,t-1),V(e,e.dyn_dtree,r-1)}(e,e.l_desc.max_code+1,e.d_desc.max_code+1,a+1),K(e,e.dyn_ltree,e.dyn_dtree)),W(e),n&&M(e)},r._tr_tally=function(e,t,r){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&r,e.last_lit++,0===t?e.dyn_ltree[2*r]++:(e.matches++,t--,e.dyn_ltree[2*(A[r]+u+1)]++,e.dyn_dtree[2*N(t)]++),e.last_lit===e.lit_bufsize-1},r._tr_align=function(e){P(e,2,3),L(e,m,z),function(e){16===e.bi_valid?(U(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):8<=e.bi_valid&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}(e)}},{"../utils/common":41}],53:[function(e,t,r){"use strict";t.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,t,r){(function(e){!function(r,n){"use strict";if(!r.setImmediate){var i,s,t,a,o=1,h={},u=!1,l=r.document,e=Object.getPrototypeOf&&Object.getPrototypeOf(r);e=e&&e.setTimeout?e:r,i="[object process]"==={}.toString.call(r.process)?function(e){process.nextTick(function(){c(e)})}:function(){if(r.postMessage&&!r.importScripts){var e=!0,t=r.onmessage;return r.onmessage=function(){e=!1},r.postMessage("","*"),r.onmessage=t,e}}()?(a="setImmediate$"+Math.random()+"$",r.addEventListener?r.addEventListener("message",d,!1):r.attachEvent("onmessage",d),function(e){r.postMessage(a+e,"*")}):r.MessageChannel?((t=new MessageChannel).port1.onmessage=function(e){c(e.data)},function(e){t.port2.postMessage(e)}):l&&"onreadystatechange"in l.createElement("script")?(s=l.documentElement,function(e){var t=l.createElement("script");t.onreadystatechange=function(){c(e),t.onreadystatechange=null,s.removeChild(t),t=null},s.appendChild(t)}):function(e){setTimeout(c,0,e)},e.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),r=0;r<t.length;r++)t[r]=arguments[r+1];var n={callback:e,args:t};return h[o]=n,i(o),o++},e.clearImmediate=f}function f(e){delete h[e]}function c(e){if(u)setTimeout(c,0,e);else{var t=h[e];if(t){u=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{f(e),u=!1}}}}function d(e){e.source===r&&"string"==typeof e.data&&0===e.data.indexOf(a)&&c(+e.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[10])(10)});

/***/ }),

/***/ 4391:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addExtensionsToContext: () => (/* binding */ addExtensionsToContext),
/* harmony export */   attributes: () => (/* binding */ attributes),
/* harmony export */   bindFramebufferInfo: () => (/* binding */ bindFramebufferInfo),
/* harmony export */   bindTransformFeedbackInfo: () => (/* binding */ bindTransformFeedbackInfo),
/* harmony export */   bindUniformBlock: () => (/* binding */ bindUniformBlock),
/* harmony export */   canFilter: () => (/* binding */ canFilter),
/* harmony export */   canGenerateMipmap: () => (/* binding */ canGenerateMipmap),
/* harmony export */   createAttribsFromArrays: () => (/* binding */ createAttribsFromArrays),
/* harmony export */   createAttributeSetters: () => (/* binding */ createAttributeSetters),
/* harmony export */   createBufferFromArray: () => (/* binding */ createBufferFromArray),
/* harmony export */   createBufferFromTypedArray: () => (/* binding */ createBufferFromTypedArray),
/* harmony export */   createBufferInfoFromArrays: () => (/* binding */ createBufferInfoFromArrays),
/* harmony export */   createBuffersFromArrays: () => (/* binding */ createBuffersFromArrays),
/* harmony export */   createFramebufferInfo: () => (/* binding */ createFramebufferInfo),
/* harmony export */   createProgram: () => (/* binding */ createProgram),
/* harmony export */   createProgramAsync: () => (/* binding */ createProgramAsync),
/* harmony export */   createProgramFromScripts: () => (/* binding */ createProgramFromScripts),
/* harmony export */   createProgramFromSources: () => (/* binding */ createProgramFromSources),
/* harmony export */   createProgramInfo: () => (/* binding */ createProgramInfo),
/* harmony export */   createProgramInfoAsync: () => (/* binding */ createProgramInfoAsync),
/* harmony export */   createProgramInfoFromProgram: () => (/* binding */ createProgramInfoFromProgram),
/* harmony export */   createProgramInfos: () => (/* binding */ createProgramInfos),
/* harmony export */   createProgramInfosAsync: () => (/* binding */ createProgramInfosAsync),
/* harmony export */   createPrograms: () => (/* binding */ createPrograms),
/* harmony export */   createProgramsAsync: () => (/* binding */ createProgramsAsync),
/* harmony export */   createSampler: () => (/* binding */ createSampler),
/* harmony export */   createSamplers: () => (/* binding */ createSamplers),
/* harmony export */   createTexture: () => (/* binding */ createTexture),
/* harmony export */   createTextureAsync: () => (/* binding */ createTextureAsync),
/* harmony export */   createTextures: () => (/* binding */ createTextures),
/* harmony export */   createTexturesAsync: () => (/* binding */ createTexturesAsync),
/* harmony export */   createTransformFeedback: () => (/* binding */ createTransformFeedback),
/* harmony export */   createTransformFeedbackInfo: () => (/* binding */ createTransformFeedbackInfo),
/* harmony export */   createUniformBlockInfo: () => (/* binding */ createUniformBlockInfo),
/* harmony export */   createUniformBlockInfoFromProgram: () => (/* binding */ createUniformBlockInfoFromProgram),
/* harmony export */   createUniformBlockSpecFromProgram: () => (/* binding */ createUniformBlockSpecFromProgram),
/* harmony export */   createUniformSetters: () => (/* binding */ createUniformSetters),
/* harmony export */   createVAOAndSetAttributes: () => (/* binding */ createVAOAndSetAttributes),
/* harmony export */   createVAOFromBufferInfo: () => (/* binding */ createVAOFromBufferInfo),
/* harmony export */   createVertexArrayInfo: () => (/* binding */ createVertexArrayInfo),
/* harmony export */   draw: () => (/* binding */ draw),
/* harmony export */   drawBufferInfo: () => (/* binding */ drawBufferInfo),
/* harmony export */   drawObjectList: () => (/* binding */ drawObjectList),
/* harmony export */   framebuffers: () => (/* binding */ framebuffers),
/* harmony export */   getArray_: () => (/* binding */ getArray$1),
/* harmony export */   getBytesPerElementForInternalFormat: () => (/* binding */ getBytesPerElementForInternalFormat),
/* harmony export */   getContext: () => (/* binding */ getContext),
/* harmony export */   getFormatAndTypeForInternalFormat: () => (/* binding */ getFormatAndTypeForInternalFormat),
/* harmony export */   getGLTypeForTypedArray: () => (/* binding */ getGLTypeForTypedArray),
/* harmony export */   getGLTypeForTypedArrayType: () => (/* binding */ getGLTypeForTypedArrayType),
/* harmony export */   getNumComponentsForFormat: () => (/* binding */ getNumComponentsForFormat),
/* harmony export */   getNumComponents_: () => (/* binding */ getNumComponents$1),
/* harmony export */   getTypedArrayTypeForGLType: () => (/* binding */ getTypedArrayTypeForGLType),
/* harmony export */   getWebGLContext: () => (/* binding */ getWebGLContext),
/* harmony export */   glEnumToString: () => (/* binding */ glEnumToString),
/* harmony export */   isArrayBuffer: () => (/* binding */ isArrayBuffer$1),
/* harmony export */   isWebGL1: () => (/* binding */ isWebGL1),
/* harmony export */   isWebGL2: () => (/* binding */ isWebGL2),
/* harmony export */   loadTextureFromUrl: () => (/* binding */ loadTextureFromUrl),
/* harmony export */   m4: () => (/* binding */ m4),
/* harmony export */   primitives: () => (/* binding */ primitives),
/* harmony export */   programs: () => (/* binding */ programs),
/* harmony export */   resizeCanvasToDisplaySize: () => (/* binding */ resizeCanvasToDisplaySize),
/* harmony export */   resizeFramebufferInfo: () => (/* binding */ resizeFramebufferInfo),
/* harmony export */   resizeTexture: () => (/* binding */ resizeTexture),
/* harmony export */   setAttribInfoBufferFromArray: () => (/* binding */ setAttribInfoBufferFromArray),
/* harmony export */   setAttributeDefaults_: () => (/* binding */ setDefaults$2),
/* harmony export */   setAttributePrefix: () => (/* binding */ setAttributePrefix),
/* harmony export */   setAttributes: () => (/* binding */ setAttributes),
/* harmony export */   setBlockUniforms: () => (/* binding */ setBlockUniforms),
/* harmony export */   setBuffersAndAttributes: () => (/* binding */ setBuffersAndAttributes),
/* harmony export */   setDefaultTextureColor: () => (/* binding */ setDefaultTextureColor),
/* harmony export */   setDefaults: () => (/* binding */ setDefaults),
/* harmony export */   setEmptyTexture: () => (/* binding */ setEmptyTexture),
/* harmony export */   setSamplerParameters: () => (/* binding */ setSamplerParameters),
/* harmony export */   setTextureDefaults_: () => (/* binding */ setDefaults$1),
/* harmony export */   setTextureFilteringForSize: () => (/* binding */ setTextureFilteringForSize),
/* harmony export */   setTextureFromArray: () => (/* binding */ setTextureFromArray),
/* harmony export */   setTextureFromElement: () => (/* binding */ setTextureFromElement),
/* harmony export */   setTextureParameters: () => (/* binding */ setTextureParameters),
/* harmony export */   setUniformBlock: () => (/* binding */ setUniformBlock),
/* harmony export */   setUniforms: () => (/* binding */ setUniforms),
/* harmony export */   setUniformsAndBindTextures: () => (/* binding */ setUniformsAndBindTextures),
/* harmony export */   textures: () => (/* binding */ textures),
/* harmony export */   typedarrays: () => (/* binding */ typedarrays),
/* harmony export */   utils: () => (/* binding */ utils),
/* harmony export */   v3: () => (/* binding */ v3),
/* harmony export */   vertexArrays: () => (/* binding */ vertexArrays)
/* harmony export */ });
/* @license twgl.js 7.0.0 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
Available via the MIT license.
see: http://github.com/greggman/twgl.js for details */
/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 *
 * Vec3 math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new Vec3. In other words you can do this
 *
 *     var v = v3.cross(v1, v2);  // Creates a new Vec3 with the cross product of v1 x v2.
 *
 * or
 *
 *     var v = v3.create();
 *     v3.cross(v1, v2, v);  // Puts the cross product of v1 x v2 in v
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any vector as the destination. So for example
 *
 *     v3.cross(v1, v2, v1);  // Puts the cross product of v1 x v2 in v1
 *
 * @module twgl/v3
 */

let VecType = Float32Array;

/**
 * A JavaScript array with 3 values or a Float32Array with 3 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/v3.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Vec3
 * @memberOf module:twgl/v3
 */

/**
 * Sets the type this library creates for a Vec3
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Vec3
 * @memberOf module:twgl/v3
 */
function setDefaultType$1(ctor) {
  const oldType = VecType;
  VecType = ctor;
  return oldType;
}

/**
 * Creates a vec3; may be called with x, y, z to set initial values.
 * @param {number} [x] Initial x value.
 * @param {number} [y] Initial y value.
 * @param {number} [z] Initial z value.
 * @return {module:twgl/v3.Vec3} the created vector
 * @memberOf module:twgl/v3
 */
function create$1(x, y, z) {
  const dst = new VecType(3);
  if (x) {
    dst[0] = x;
  }
  if (y) {
    dst[1] = y;
  }
  if (z) {
    dst[2] = z;
  }
  return dst;
}

/**
 * Adds two vectors; assumes a and b have the same dimension.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector tha tis the sum of a and b.
 * @memberOf module:twgl/v3
 */
function add(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] + b[0];
  dst[1] = a[1] + b[1];
  dst[2] = a[2] + b[2];

  return dst;
}

/**
 * Subtracts two vectors.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A vector that is the difference of a and b.
 * @memberOf module:twgl/v3
 */
function subtract(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] - b[0];
  dst[1] = a[1] - b[1];
  dst[2] = a[2] - b[2];

  return dst;
}

/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {number} t Interpolation coefficient.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The linear interpolated result.
 * @memberOf module:twgl/v3
 */
function lerp(a, b, t, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] + t * (b[0] - a[0]);
  dst[1] = a[1] + t * (b[1] - a[1]);
  dst[2] = a[2] + t * (b[2] - a[2]);

  return dst;
}

/**
 * Performs linear interpolation on two vectors.
 * Given vectors a and b and interpolation coefficient vector t, returns
 * a + t * (b - a).
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} t Interpolation coefficients vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} the linear interpolated result.
 * @memberOf module:twgl/v3
 */
function lerpV(a, b, t, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] + t[0] * (b[0] - a[0]);
  dst[1] = a[1] + t[1] * (b[1] - a[1]);
  dst[2] = a[2] + t[2] * (b[2] - a[2]);

  return dst;
}

/**
 * Return max values of two vectors.
 * Given vectors a and b returns
 * [max(a[0], b[0]), max(a[1], b[1]), max(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The max components vector.
 * @memberOf module:twgl/v3
 */
function max(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = Math.max(a[0], b[0]);
  dst[1] = Math.max(a[1], b[1]);
  dst[2] = Math.max(a[2], b[2]);

  return dst;
}

/**
 * Return min values of two vectors.
 * Given vectors a and b returns
 * [min(a[0], b[0]), min(a[1], b[1]), min(a[2], b[2])].
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The min components vector.
 * @memberOf module:twgl/v3
 */
function min(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = Math.min(a[0], b[0]);
  dst[1] = Math.min(a[1], b[1]);
  dst[2] = Math.min(a[2], b[2]);

  return dst;
}

/**
 * Multiplies a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */
function mulScalar(v, k, dst) {
  dst = dst || new VecType(3);

  dst[0] = v[0] * k;
  dst[1] = v[1] * k;
  dst[2] = v[2] * k;

  return dst;
}

/**
 * Divides a vector by a scalar.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {number} k The scalar.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The scaled vector.
 * @memberOf module:twgl/v3
 */
function divScalar(v, k, dst) {
  dst = dst || new VecType(3);

  dst[0] = v[0] / k;
  dst[1] = v[1] / k;
  dst[2] = v[2] / k;

  return dst;
}

/**
 * Computes the cross product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of a cross b.
 * @memberOf module:twgl/v3
 */
function cross(a, b, dst) {
  dst = dst || new VecType(3);

  const t1 = a[2] * b[0] - a[0] * b[2];
  const t2 = a[0] * b[1] - a[1] * b[0];
  dst[0] = a[1] * b[2] - a[2] * b[1];
  dst[1] = t1;
  dst[2] = t2;

  return dst;
}

/**
 * Computes the dot product of two vectors; assumes both vectors have
 * three entries.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @return {number} dot product
 * @memberOf module:twgl/v3
 */
function dot(a, b) {
  return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
}

/**
 * Computes the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} length of vector.
 * @memberOf module:twgl/v3
 */
function length$1(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
}

/**
 * Computes the square of the length of vector
 * @param {module:twgl/v3.Vec3} v vector.
 * @return {number} square of the length of vector.
 * @memberOf module:twgl/v3
 */
function lengthSq(v) {
  return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}

/**
 * Computes the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} distance between a and b
 * @memberOf module:twgl/v3
 */
function distance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Computes the square of the distance between 2 points
 * @param {module:twgl/v3.Vec3} a vector.
 * @param {module:twgl/v3.Vec3} b vector.
 * @return {number} square of the distance between a and b
 * @memberOf module:twgl/v3
 */
function distanceSq(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return dx * dx + dy * dy + dz * dz;
}

/**
 * Divides a vector by its Euclidean length and returns the quotient.
 * @param {module:twgl/v3.Vec3} a The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The normalized vector.
 * @memberOf module:twgl/v3
 */
function normalize(a, dst) {
  dst = dst || new VecType(3);

  const lenSq = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
  const len = Math.sqrt(lenSq);
  if (len > 0.00001) {
    dst[0] = a[0] / len;
    dst[1] = a[1] / len;
    dst[2] = a[2] / len;
  } else {
    dst[0] = 0;
    dst[1] = 0;
    dst[2] = 0;
  }

  return dst;
}

/**
 * Negates a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} -v.
 * @memberOf module:twgl/v3
 */
function negate$1(v, dst) {
  dst = dst || new VecType(3);

  dst[0] = -v[0];
  dst[1] = -v[1];
  dst[2] = -v[2];

  return dst;
}

/**
 * Copies a vector.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} A copy of v.
 * @memberOf module:twgl/v3
 */
function copy$1(v, dst) {
  dst = dst || new VecType(3);

  dst[0] = v[0];
  dst[1] = v[1];
  dst[2] = v[2];

  return dst;
}

/**
 * Multiplies a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of products of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */
function multiply$1(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] * b[0];
  dst[1] = a[1] * b[1];
  dst[2] = a[2] * b[2];

  return dst;
}

/**
 * Divides a vector by another vector (component-wise); assumes a and
 * b have the same length.
 * @param {module:twgl/v3.Vec3} a Operand vector.
 * @param {module:twgl/v3.Vec3} b Operand vector.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not new one is created.
 * @return {module:twgl/v3.Vec3} The vector of quotients of entries of a and
 *     b.
 * @memberOf module:twgl/v3
 */
function divide(a, b, dst) {
  dst = dst || new VecType(3);

  dst[0] = a[0] / b[0];
  dst[1] = a[1] / b[1];
  dst[2] = a[2] / b[2];

  return dst;
}

var v3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  add: add,
  copy: copy$1,
  create: create$1,
  cross: cross,
  distance: distance,
  distanceSq: distanceSq,
  divide: divide,
  divScalar: divScalar,
  dot: dot,
  lerp: lerp,
  lerpV: lerpV,
  length: length$1,
  lengthSq: lengthSq,
  max: max,
  min: min,
  mulScalar: mulScalar,
  multiply: multiply$1,
  negate: negate$1,
  normalize: normalize,
  setDefaultType: setDefaultType$1,
  subtract: subtract
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * 4x4 Matrix math math functions.
 *
 * Almost all functions take an optional `dst` argument. If it is not passed in the
 * functions will create a new matrix. In other words you can do this
 *
 *     const mat = m4.translation([1, 2, 3]);  // Creates a new translation matrix
 *
 * or
 *
 *     const mat = m4.create();
 *     m4.translation([1, 2, 3], mat);  // Puts translation matrix in mat.
 *
 * The first style is often easier but depending on where it's used it generates garbage where
 * as there is almost never allocation with the second style.
 *
 * It is always save to pass any matrix as the destination. So for example
 *
 *     const mat = m4.identity();
 *     const trans = m4.translation([1, 2, 3]);
 *     m4.multiply(mat, trans, mat);  // Multiplies mat * trans and puts result in mat.
 *
 * @module twgl/m4
 */
let MatType = Float32Array;

/**
 * A JavaScript array with 16 values or a Float32Array with 16 values.
 * When created by the library will create the default type which is `Float32Array`
 * but can be set by calling {@link module:twgl/m4.setDefaultType}.
 * @typedef {(number[]|Float32Array)} Mat4
 * @memberOf module:twgl/m4
 */

/**
 * Sets the type this library creates for a Mat4
 * @param {constructor} ctor the constructor for the type. Either `Float32Array` or `Array`
 * @return {constructor} previous constructor for Mat4
 * @memberOf module:twgl/m4
 */
function setDefaultType(ctor) {
  const oldType = MatType;
  MatType = ctor;
  return oldType;
}

/**
 * Negates a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} -m.
 * @memberOf module:twgl/m4
 */
function negate(m, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = -m[ 0];
  dst[ 1] = -m[ 1];
  dst[ 2] = -m[ 2];
  dst[ 3] = -m[ 3];
  dst[ 4] = -m[ 4];
  dst[ 5] = -m[ 5];
  dst[ 6] = -m[ 6];
  dst[ 7] = -m[ 7];
  dst[ 8] = -m[ 8];
  dst[ 9] = -m[ 9];
  dst[10] = -m[10];
  dst[11] = -m[11];
  dst[12] = -m[12];
  dst[13] = -m[13];
  dst[14] = -m[14];
  dst[15] = -m[15];

  return dst;
}

/**
 * Creates a matrix.
 * @return {module:twgl/m4.Mat4} A new matrix.
 * @memberOf module:twgl/m4
 */
function create() {
  return new MatType(16).fill(0);
}

/**
 * Copies a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] The matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A copy of m.
 * @memberOf module:twgl/m4
 */
function copy(m, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = m[ 0];
  dst[ 1] = m[ 1];
  dst[ 2] = m[ 2];
  dst[ 3] = m[ 3];
  dst[ 4] = m[ 4];
  dst[ 5] = m[ 5];
  dst[ 6] = m[ 6];
  dst[ 7] = m[ 7];
  dst[ 8] = m[ 8];
  dst[ 9] = m[ 9];
  dst[10] = m[10];
  dst[11] = m[11];
  dst[12] = m[12];
  dst[13] = m[13];
  dst[14] = m[14];
  dst[15] = m[15];

  return dst;
}

/**
 * Creates an n-by-n identity matrix.
 *
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} An n-by-n identity matrix.
 * @memberOf module:twgl/m4
 */
function identity(dst) {
  dst = dst || new MatType(16);

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Takes the transpose of a matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The transpose of m.
 * @memberOf module:twgl/m4
 */
 function transpose(m, dst) {
  dst = dst || new MatType(16);
  if (dst === m) {
    let t;

    t = m[1];
    m[1] = m[4];
    m[4] = t;

    t = m[2];
    m[2] = m[8];
    m[8] = t;

    t = m[3];
    m[3] = m[12];
    m[12] = t;

    t = m[6];
    m[6] = m[9];
    m[9] = t;

    t = m[7];
    m[7] = m[13];
    m[13] = t;

    t = m[11];
    m[11] = m[14];
    m[14] = t;
    return dst;
  }

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];

  dst[ 0] = m00;
  dst[ 1] = m10;
  dst[ 2] = m20;
  dst[ 3] = m30;
  dst[ 4] = m01;
  dst[ 5] = m11;
  dst[ 6] = m21;
  dst[ 7] = m31;
  dst[ 8] = m02;
  dst[ 9] = m12;
  dst[10] = m22;
  dst[11] = m32;
  dst[12] = m03;
  dst[13] = m13;
  dst[14] = m23;
  dst[15] = m33;

  return dst;
}

/**
 * Computes the inverse of a 4-by-4 matrix.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The inverse of m.
 * @memberOf module:twgl/m4
 */
function inverse(m, dst) {
  dst = dst || new MatType(16);

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];
  const tmp_0  = m22 * m33;
  const tmp_1  = m32 * m23;
  const tmp_2  = m12 * m33;
  const tmp_3  = m32 * m13;
  const tmp_4  = m12 * m23;
  const tmp_5  = m22 * m13;
  const tmp_6  = m02 * m33;
  const tmp_7  = m32 * m03;
  const tmp_8  = m02 * m23;
  const tmp_9  = m22 * m03;
  const tmp_10 = m02 * m13;
  const tmp_11 = m12 * m03;
  const tmp_12 = m20 * m31;
  const tmp_13 = m30 * m21;
  const tmp_14 = m10 * m31;
  const tmp_15 = m30 * m11;
  const tmp_16 = m10 * m21;
  const tmp_17 = m20 * m11;
  const tmp_18 = m00 * m31;
  const tmp_19 = m30 * m01;
  const tmp_20 = m00 * m21;
  const tmp_21 = m20 * m01;
  const tmp_22 = m00 * m11;
  const tmp_23 = m10 * m01;

  const t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
      (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
  const t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
      (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
  const t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
      (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
  const t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
      (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

  const d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

  dst[ 0] = d * t0;
  dst[ 1] = d * t1;
  dst[ 2] = d * t2;
  dst[ 3] = d * t3;
  dst[ 4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
  dst[ 5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
  dst[ 6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
  dst[ 7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
  dst[ 8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
  dst[ 9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
  dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
  dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
  dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
  dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
  dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
  dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

  return dst;
}

/**
 * Multiplies two 4-by-4 matrices with a on the left and b on the right
 * @param {module:twgl/m4.Mat4} a The matrix on the left.
 * @param {module:twgl/m4.Mat4} b The matrix on the right.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix product of a and b.
 * @memberOf module:twgl/m4
 */
function multiply(a, b, dst) {
  dst = dst || new MatType(16);

  const a00 = a[0];
  const a01 = a[1];
  const a02 = a[2];
  const a03 = a[3];
  const a10 = a[ 4 + 0];
  const a11 = a[ 4 + 1];
  const a12 = a[ 4 + 2];
  const a13 = a[ 4 + 3];
  const a20 = a[ 8 + 0];
  const a21 = a[ 8 + 1];
  const a22 = a[ 8 + 2];
  const a23 = a[ 8 + 3];
  const a30 = a[12 + 0];
  const a31 = a[12 + 1];
  const a32 = a[12 + 2];
  const a33 = a[12 + 3];
  const b00 = b[0];
  const b01 = b[1];
  const b02 = b[2];
  const b03 = b[3];
  const b10 = b[ 4 + 0];
  const b11 = b[ 4 + 1];
  const b12 = b[ 4 + 2];
  const b13 = b[ 4 + 3];
  const b20 = b[ 8 + 0];
  const b21 = b[ 8 + 1];
  const b22 = b[ 8 + 2];
  const b23 = b[ 8 + 3];
  const b30 = b[12 + 0];
  const b31 = b[12 + 1];
  const b32 = b[12 + 2];
  const b33 = b[12 + 3];

  dst[ 0] = a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03;
  dst[ 1] = a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03;
  dst[ 2] = a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03;
  dst[ 3] = a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03;
  dst[ 4] = a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13;
  dst[ 5] = a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13;
  dst[ 6] = a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13;
  dst[ 7] = a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13;
  dst[ 8] = a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23;
  dst[ 9] = a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23;
  dst[10] = a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23;
  dst[11] = a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23;
  dst[12] = a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33;
  dst[13] = a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33;
  dst[14] = a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33;
  dst[15] = a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33;

  return dst;
}

/**
 * Sets the translation component of a 4-by-4 matrix to the given
 * vector.
 * @param {module:twgl/m4.Mat4} a The matrix.
 * @param {module:twgl/v3.Vec3} v The vector.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with translation set.
 * @memberOf module:twgl/m4
 */
function setTranslation(a, v, dst) {
  dst = dst || identity();
  if (a !== dst) {
    dst[ 0] = a[ 0];
    dst[ 1] = a[ 1];
    dst[ 2] = a[ 2];
    dst[ 3] = a[ 3];
    dst[ 4] = a[ 4];
    dst[ 5] = a[ 5];
    dst[ 6] = a[ 6];
    dst[ 7] = a[ 7];
    dst[ 8] = a[ 8];
    dst[ 9] = a[ 9];
    dst[10] = a[10];
    dst[11] = a[11];
  }
  dst[12] = v[0];
  dst[13] = v[1];
  dst[14] = v[2];
  dst[15] = 1;
  return dst;
}

/**
 * Returns the translation component of a 4-by-4 matrix as a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} [dst] vector to hold result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The translation component of m.
 * @memberOf module:twgl/m4
 */
function getTranslation(m, dst) {
  dst = dst || create$1();
  dst[0] = m[12];
  dst[1] = m[13];
  dst[2] = m[14];
  return dst;
}

/**
 * Returns an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} axis The axis 0 = x, 1 = y, 2 = z;
 * @return {module:twgl/v3.Vec3} [dst] vector.
 * @return {module:twgl/v3.Vec3} The axis component of m.
 * @memberOf module:twgl/m4
 */
function getAxis(m, axis, dst) {
  dst = dst || create$1();
  const off = axis * 4;
  dst[0] = m[off + 0];
  dst[1] = m[off + 1];
  dst[2] = m[off + 2];
  return dst;
}

/**
 * Sets an axis of a 4x4 matrix as a vector with 3 entries
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v the axis vector
 * @param {number} axis The axis  0 = x, 1 = y, 2 = z;
 * @param {module:twgl/m4.Mat4} [dst] The matrix to set. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The matrix with axis set.
 * @memberOf module:twgl/m4
 */
function setAxis(a, v, axis, dst) {
  if (dst !== a) {
    dst = copy(a, dst);
  }
  const off = axis * 4;
  dst[off + 0] = v[0];
  dst[off + 1] = v[1];
  dst[off + 2] = v[2];
  return dst;
}

/**
 * Computes a 4-by-4 perspective transformation matrix given the angular height
 * of the frustum, the aspect ratio, and the near and far clipping planes.  The
 * arguments define a frustum extending in the negative z direction.  The given
 * angle is the vertical angle of the frustum, and the horizontal angle is
 * determined to produce the given aspect ratio.  The arguments near and far are
 * the distances to the near and far clipping planes.  Note that near and far
 * are not z coordinates, but rather they are distances along the negative
 * z-axis.  The matrix generated sends the viewing frustum to the unit box.
 * We assume a unit box extending from -1 to 1 in the x and y dimensions and
 * from 0 to 1 in the z dimension.
 * @param {number} fieldOfViewYInRadians The camera angle from top to bottom (in radians).
 * @param {number} aspect The aspect ratio width / height.
 * @param {number} zNear The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} zFar The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */
function perspective(fieldOfViewYInRadians, aspect, zNear, zFar, dst) {
  dst = dst || new MatType(16);

  const f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewYInRadians);
  const rangeInv = 1.0 / (zNear - zFar);

  dst[0]  = f / aspect;
  dst[1]  = 0;
  dst[2]  = 0;
  dst[3]  = 0;

  dst[4]  = 0;
  dst[5]  = f;
  dst[6]  = 0;
  dst[7]  = 0;

  dst[8]  = 0;
  dst[9]  = 0;
  dst[10] = (zNear + zFar) * rangeInv;
  dst[11] = -1;

  dst[12] = 0;
  dst[13] = 0;
  dst[14] = zNear * zFar * rangeInv * 2;
  dst[15] = 0;

  return dst;
}

/**
 * Computes a 4-by-4 orthogonal transformation matrix given the left, right,
 * bottom, and top dimensions of the near clipping plane as well as the
 * near and far clipping plane distances.
 * @param {number} left Left side of the near clipping plane viewport.
 * @param {number} right Right side of the near clipping plane viewport.
 * @param {number} bottom Bottom of the near clipping plane viewport.
 * @param {number} top Top of the near clipping plane viewport.
 * @param {number} near The depth (negative z coordinate)
 *     of the near clipping plane.
 * @param {number} far The depth (negative z coordinate)
 *     of the far clipping plane.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective matrix.
 * @memberOf module:twgl/m4
 */
function ortho(left, right, bottom, top, near, far, dst) {
  dst = dst || new MatType(16);

  dst[0]  = 2 / (right - left);
  dst[1]  = 0;
  dst[2]  = 0;
  dst[3]  = 0;

  dst[4]  = 0;
  dst[5]  = 2 / (top - bottom);
  dst[6]  = 0;
  dst[7]  = 0;

  dst[8]  = 0;
  dst[9]  = 0;
  dst[10] = 2 / (near - far);
  dst[11] = 0;

  dst[12] = (right + left) / (left - right);
  dst[13] = (top + bottom) / (bottom - top);
  dst[14] = (far + near) / (near - far);
  dst[15] = 1;

  return dst;
}

/**
 * Computes a 4-by-4 perspective transformation matrix given the left, right,
 * top, bottom, near and far clipping planes. The arguments define a frustum
 * extending in the negative z direction. The arguments near and far are the
 * distances to the near and far clipping planes. Note that near and far are not
 * z coordinates, but rather they are distances along the negative z-axis. The
 * matrix generated sends the viewing frustum to the unit box. We assume a unit
 * box extending from -1 to 1 in the x and y dimensions and from 0 to 1 in the z
 * dimension.
 * @param {number} left The x coordinate of the left plane of the box.
 * @param {number} right The x coordinate of the right plane of the box.
 * @param {number} bottom The y coordinate of the bottom plane of the box.
 * @param {number} top The y coordinate of the right plane of the box.
 * @param {number} near The negative z coordinate of the near plane of the box.
 * @param {number} far The negative z coordinate of the far plane of the box.
 * @param {module:twgl/m4.Mat4} [dst] Output matrix. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The perspective projection matrix.
 * @memberOf module:twgl/m4
 */
function frustum(left, right, bottom, top, near, far, dst) {
  dst = dst || new MatType(16);

  const dx = (right - left);
  const dy = (top - bottom);
  const dz = (near - far);

  dst[ 0] = 2 * near / dx;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 2 * near / dy;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = (left + right) / dx;
  dst[ 9] = (top + bottom) / dy;
  dst[10] = far / dz;
  dst[11] = -1;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = near * far / dz;
  dst[15] = 0;

  return dst;
}

let xAxis;
let yAxis;
let zAxis;

/**
 * Computes a 4-by-4 look-at transformation.
 *
 * This is a matrix which positions the camera itself. If you want
 * a view matrix (a matrix which moves things in front of the camera)
 * take the inverse of this.
 *
 * @param {module:twgl/v3.Vec3} eye The position of the eye.
 * @param {module:twgl/v3.Vec3} target The position meant to be viewed.
 * @param {module:twgl/v3.Vec3} up A vector pointing up.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The look-at matrix.
 * @memberOf module:twgl/m4
 */
function lookAt(eye, target, up, dst) {
  dst = dst || new MatType(16);

  xAxis = xAxis || create$1();
  yAxis = yAxis || create$1();
  zAxis = zAxis || create$1();

  normalize(
      subtract(eye, target, zAxis), zAxis);
  normalize(cross(up, zAxis, xAxis), xAxis);
  normalize(cross(zAxis, xAxis, yAxis), yAxis);

  dst[ 0] = xAxis[0];
  dst[ 1] = xAxis[1];
  dst[ 2] = xAxis[2];
  dst[ 3] = 0;
  dst[ 4] = yAxis[0];
  dst[ 5] = yAxis[1];
  dst[ 6] = yAxis[2];
  dst[ 7] = 0;
  dst[ 8] = zAxis[0];
  dst[ 9] = zAxis[1];
  dst[10] = zAxis[2];
  dst[11] = 0;
  dst[12] = eye[0];
  dst[13] = eye[1];
  dst[14] = eye[2];
  dst[15] = 1;

  return dst;
}

/**
 * Creates a 4-by-4 matrix which translates by the given vector v.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translation matrix.
 * @memberOf module:twgl/m4
 */
function translation(v, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = v[0];
  dst[13] = v[1];
  dst[14] = v[2];
  dst[15] = 1;
  return dst;
}

/**
 * Translates the given 4-by-4 matrix by the given vector v.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The vector by
 *     which to translate.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The translated matrix.
 * @memberOf module:twgl/m4
 */
function translate(m, v, dst) {
  dst = dst || new MatType(16);

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const m30 = m[3 * 4 + 0];
  const m31 = m[3 * 4 + 1];
  const m32 = m[3 * 4 + 2];
  const m33 = m[3 * 4 + 3];

  if (m !== dst) {
    dst[ 0] = m00;
    dst[ 1] = m01;
    dst[ 2] = m02;
    dst[ 3] = m03;
    dst[ 4] = m10;
    dst[ 5] = m11;
    dst[ 6] = m12;
    dst[ 7] = m13;
    dst[ 8] = m20;
    dst[ 9] = m21;
    dst[10] = m22;
    dst[11] = m23;
  }

  dst[12] = m00 * v0 + m10 * v1 + m20 * v2 + m30;
  dst[13] = m01 * v0 + m11 * v1 + m21 * v2 + m31;
  dst[14] = m02 * v0 + m12 * v1 + m22 * v2 + m32;
  dst[15] = m03 * v0 + m13 * v1 + m23 * v2 + m33;

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the x-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */
function rotationX(angleInRadians, dst) {
  dst = dst || new MatType(16);

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = 1;
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = c;
  dst[ 6] = s;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = -s;
  dst[10] = c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the x-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function rotateX(m, angleInRadians, dst) {
  dst = dst || new MatType(16);

  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[4]  = c * m10 + s * m20;
  dst[5]  = c * m11 + s * m21;
  dst[6]  = c * m12 + s * m22;
  dst[7]  = c * m13 + s * m23;
  dst[8]  = c * m20 - s * m10;
  dst[9]  = c * m21 - s * m11;
  dst[10] = c * m22 - s * m12;
  dst[11] = c * m23 - s * m13;

  if (m !== dst) {
    dst[ 0] = m[ 0];
    dst[ 1] = m[ 1];
    dst[ 2] = m[ 2];
    dst[ 3] = m[ 3];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the y-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */
function rotationY(angleInRadians, dst) {
  dst = dst || new MatType(16);

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c;
  dst[ 1] = 0;
  dst[ 2] = -s;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = 1;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = s;
  dst[ 9] = 0;
  dst[10] = c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the y-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function rotateY(m, angleInRadians, dst) {
  dst = dst || new MatType(16);

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m20 = m[2 * 4 + 0];
  const m21 = m[2 * 4 + 1];
  const m22 = m[2 * 4 + 2];
  const m23 = m[2 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c * m00 - s * m20;
  dst[ 1] = c * m01 - s * m21;
  dst[ 2] = c * m02 - s * m22;
  dst[ 3] = c * m03 - s * m23;
  dst[ 8] = c * m20 + s * m00;
  dst[ 9] = c * m21 + s * m01;
  dst[10] = c * m22 + s * m02;
  dst[11] = c * m23 + s * m03;

  if (m !== dst) {
    dst[ 4] = m[ 4];
    dst[ 5] = m[ 5];
    dst[ 6] = m[ 6];
    dst[ 7] = m[ 7];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the z-axis by the given angle.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotation matrix.
 * @memberOf module:twgl/m4
 */
function rotationZ(angleInRadians, dst) {
  dst = dst || new MatType(16);

  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c;
  dst[ 1] = s;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = -s;
  dst[ 5] = c;
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = 1;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the z-axis by the given
 * angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function rotateZ(m, angleInRadians, dst) {
  dst = dst || new MatType(16);

  const m00 = m[0 * 4 + 0];
  const m01 = m[0 * 4 + 1];
  const m02 = m[0 * 4 + 2];
  const m03 = m[0 * 4 + 3];
  const m10 = m[1 * 4 + 0];
  const m11 = m[1 * 4 + 1];
  const m12 = m[1 * 4 + 2];
  const m13 = m[1 * 4 + 3];
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  dst[ 0] = c * m00 + s * m10;
  dst[ 1] = c * m01 + s * m11;
  dst[ 2] = c * m02 + s * m12;
  dst[ 3] = c * m03 + s * m13;
  dst[ 4] = c * m10 - s * m00;
  dst[ 5] = c * m11 - s * m01;
  dst[ 6] = c * m12 - s * m02;
  dst[ 7] = c * m13 - s * m03;

  if (m !== dst) {
    dst[ 8] = m[ 8];
    dst[ 9] = m[ 9];
    dst[10] = m[10];
    dst[11] = m[11];
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which rotates around the given axis by the given
 * angle.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} A matrix which rotates angle radians
 *     around the axis.
 * @memberOf module:twgl/m4
 */
function axisRotation(axis, angleInRadians, dst) {
  dst = dst || new MatType(16);

  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;

  dst[ 0] = xx + (1 - xx) * c;
  dst[ 1] = x * y * oneMinusCosine + z * s;
  dst[ 2] = x * z * oneMinusCosine - y * s;
  dst[ 3] = 0;
  dst[ 4] = x * y * oneMinusCosine - z * s;
  dst[ 5] = yy + (1 - yy) * c;
  dst[ 6] = y * z * oneMinusCosine + x * s;
  dst[ 7] = 0;
  dst[ 8] = x * z * oneMinusCosine + y * s;
  dst[ 9] = y * z * oneMinusCosine - x * s;
  dst[10] = zz + (1 - zz) * c;
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Rotates the given 4-by-4 matrix around the given axis by the
 * given angle.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} axis The axis
 *     about which to rotate.
 * @param {number} angleInRadians The angle by which to rotate (in radians).
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The rotated matrix.
 * @memberOf module:twgl/m4
 */
function axisRotate(m, axis, angleInRadians, dst) {
  dst = dst || new MatType(16);

  let x = axis[0];
  let y = axis[1];
  let z = axis[2];
  const n = Math.sqrt(x * x + y * y + z * z);
  x /= n;
  y /= n;
  z /= n;
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  const oneMinusCosine = 1 - c;

  const r00 = xx + (1 - xx) * c;
  const r01 = x * y * oneMinusCosine + z * s;
  const r02 = x * z * oneMinusCosine - y * s;
  const r10 = x * y * oneMinusCosine - z * s;
  const r11 = yy + (1 - yy) * c;
  const r12 = y * z * oneMinusCosine + x * s;
  const r20 = x * z * oneMinusCosine + y * s;
  const r21 = y * z * oneMinusCosine - x * s;
  const r22 = zz + (1 - zz) * c;

  const m00 = m[0];
  const m01 = m[1];
  const m02 = m[2];
  const m03 = m[3];
  const m10 = m[4];
  const m11 = m[5];
  const m12 = m[6];
  const m13 = m[7];
  const m20 = m[8];
  const m21 = m[9];
  const m22 = m[10];
  const m23 = m[11];

  dst[ 0] = r00 * m00 + r01 * m10 + r02 * m20;
  dst[ 1] = r00 * m01 + r01 * m11 + r02 * m21;
  dst[ 2] = r00 * m02 + r01 * m12 + r02 * m22;
  dst[ 3] = r00 * m03 + r01 * m13 + r02 * m23;
  dst[ 4] = r10 * m00 + r11 * m10 + r12 * m20;
  dst[ 5] = r10 * m01 + r11 * m11 + r12 * m21;
  dst[ 6] = r10 * m02 + r11 * m12 + r12 * m22;
  dst[ 7] = r10 * m03 + r11 * m13 + r12 * m23;
  dst[ 8] = r20 * m00 + r21 * m10 + r22 * m20;
  dst[ 9] = r20 * m01 + r21 * m11 + r22 * m21;
  dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
  dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

  if (m !== dst) {
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Creates a 4-by-4 matrix which scales in each dimension by an amount given by
 * the corresponding entry in the given vector; assumes the vector has three
 * entries.
 * @param {module:twgl/v3.Vec3} v A vector of
 *     three entries specifying the factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaling matrix.
 * @memberOf module:twgl/m4
 */
function scaling(v, dst) {
  dst = dst || new MatType(16);

  dst[ 0] = v[0];
  dst[ 1] = 0;
  dst[ 2] = 0;
  dst[ 3] = 0;
  dst[ 4] = 0;
  dst[ 5] = v[1];
  dst[ 6] = 0;
  dst[ 7] = 0;
  dst[ 8] = 0;
  dst[ 9] = 0;
  dst[10] = v[2];
  dst[11] = 0;
  dst[12] = 0;
  dst[13] = 0;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

/**
 * Scales the given 4-by-4 matrix in each dimension by an amount
 * given by the corresponding entry in the given vector; assumes the vector has
 * three entries.
 * @param {module:twgl/m4.Mat4} m The matrix to be modified.
 * @param {module:twgl/v3.Vec3} v A vector of three entries specifying the
 *     factor by which to scale in each dimension.
 * @param {module:twgl/m4.Mat4} [dst] matrix to hold result. If not passed a new one is created.
 * @return {module:twgl/m4.Mat4} The scaled matrix.
 * @memberOf module:twgl/m4
 */
function scale(m, v, dst) {
  dst = dst || new MatType(16);

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[ 0] = v0 * m[0 * 4 + 0];
  dst[ 1] = v0 * m[0 * 4 + 1];
  dst[ 2] = v0 * m[0 * 4 + 2];
  dst[ 3] = v0 * m[0 * 4 + 3];
  dst[ 4] = v1 * m[1 * 4 + 0];
  dst[ 5] = v1 * m[1 * 4 + 1];
  dst[ 6] = v1 * m[1 * 4 + 2];
  dst[ 7] = v1 * m[1 * 4 + 3];
  dst[ 8] = v2 * m[2 * 4 + 0];
  dst[ 9] = v2 * m[2 * 4 + 1];
  dst[10] = v2 * m[2 * 4 + 2];
  dst[11] = v2 * m[2 * 4 + 3];

  if (m !== dst) {
    dst[12] = m[12];
    dst[13] = m[13];
    dst[14] = m[14];
    dst[15] = m[15];
  }

  return dst;
}

/**
 * Takes a 4-by-4 matrix and a vector with 3 entries,
 * interprets the vector as a point, transforms that point by the matrix, and
 * returns the result as a vector with 3 entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The point.
 * @param {module:twgl/v3.Vec3} [dst] optional vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed point.
 * @memberOf module:twgl/m4
 */
function transformPoint(m, v, dst) {
  dst = dst || create$1();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];
  const d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

  dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
  dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
  dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

  return dst;
}

/**
 * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
 * direction, transforms that direction by the matrix, and returns the result;
 * assumes the transformation of 3-dimensional space represented by the matrix
 * is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion. Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The direction.
 * @param {module:twgl/v3.Vec3} [dst] optional Vec3 to store result. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed direction.
 * @memberOf module:twgl/m4
 */
function transformDirection(m, v, dst) {
  dst = dst || create$1();

  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
  dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
  dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

  return dst;
}

/**
 * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
 * as a normal to a surface, and computes a vector which is normal upon
 * transforming that surface by the matrix. The effect of this function is the
 * same as transforming v (as a direction) by the inverse-transpose of m.  This
 * function assumes the transformation of 3-dimensional space represented by the
 * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
 * translation, but not a perspective distortion.  Returns a vector with 3
 * entries.
 * @param {module:twgl/m4.Mat4} m The matrix.
 * @param {module:twgl/v3.Vec3} v The normal.
 * @param {module:twgl/v3.Vec3} [dst] The direction. If not passed a new one is created.
 * @return {module:twgl/v3.Vec3} The transformed normal.
 * @memberOf module:twgl/m4
 */
function transformNormal$1(m, v, dst) {
  dst = dst || create$1();
  const mi = inverse(m);
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

  return dst;
}

var m4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  axisRotate: axisRotate,
  axisRotation: axisRotation,
  copy: copy,
  create: create,
  frustum: frustum,
  getAxis: getAxis,
  getTranslation: getTranslation,
  identity: identity,
  inverse: inverse,
  lookAt: lookAt,
  multiply: multiply,
  negate: negate,
  ortho: ortho,
  perspective: perspective,
  rotateX: rotateX,
  rotateY: rotateY,
  rotateZ: rotateZ,
  rotationX: rotationX,
  rotationY: rotationY,
  rotationZ: rotationZ,
  scale: scale,
  scaling: scaling,
  setAxis: setAxis,
  setDefaultType: setDefaultType,
  setTranslation: setTranslation,
  transformDirection: transformDirection,
  transformNormal: transformNormal$1,
  transformPoint: transformPoint,
  translate: translate,
  translation: translation,
  transpose: transpose
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/* DataType */
const BYTE$2                           = 0x1400;
const UNSIGNED_BYTE$3                  = 0x1401;
const SHORT$2                          = 0x1402;
const UNSIGNED_SHORT$3                 = 0x1403;
const INT$3                            = 0x1404;
const UNSIGNED_INT$3                   = 0x1405;
const FLOAT$3                          = 0x1406;
const UNSIGNED_SHORT_4_4_4_4$1       = 0x8033;
const UNSIGNED_SHORT_5_5_5_1$1       = 0x8034;
const UNSIGNED_SHORT_5_6_5$1         = 0x8363;
const HALF_FLOAT$1                   = 0x140B;
const UNSIGNED_INT_2_10_10_10_REV$1  = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV$1 = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV$1     = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV$1 = 0x8DAD;
const UNSIGNED_INT_24_8$1            = 0x84FA;

const glTypeToTypedArray = {};
{
  const tt = glTypeToTypedArray;
  tt[BYTE$2]                           = Int8Array;
  tt[UNSIGNED_BYTE$3]                  = Uint8Array;
  tt[SHORT$2]                          = Int16Array;
  tt[UNSIGNED_SHORT$3]                 = Uint16Array;
  tt[INT$3]                            = Int32Array;
  tt[UNSIGNED_INT$3]                   = Uint32Array;
  tt[FLOAT$3]                          = Float32Array;
  tt[UNSIGNED_SHORT_4_4_4_4$1]         = Uint16Array;
  tt[UNSIGNED_SHORT_5_5_5_1$1]         = Uint16Array;
  tt[UNSIGNED_SHORT_5_6_5$1]           = Uint16Array;
  tt[HALF_FLOAT$1]                     = Uint16Array;
  tt[UNSIGNED_INT_2_10_10_10_REV$1]    = Uint32Array;
  tt[UNSIGNED_INT_10F_11F_11F_REV$1]   = Uint32Array;
  tt[UNSIGNED_INT_5_9_9_9_REV$1]       = Uint32Array;
  tt[FLOAT_32_UNSIGNED_INT_24_8_REV$1] = Uint32Array;
  tt[UNSIGNED_INT_24_8$1]              = Uint32Array;
}

/**
 * Get the GL type for a typedArray
 * @param {ArrayBufferView} typedArray a typedArray
 * @return {number} the GL type for array. For example pass in an `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in a `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */
function getGLTypeForTypedArray(typedArray) {
  if (typedArray instanceof Int8Array)         { return BYTE$2; }           // eslint-disable-line
  if (typedArray instanceof Uint8Array)        { return UNSIGNED_BYTE$3; }  // eslint-disable-line
  if (typedArray instanceof Uint8ClampedArray) { return UNSIGNED_BYTE$3; }  // eslint-disable-line
  if (typedArray instanceof Int16Array)        { return SHORT$2; }          // eslint-disable-line
  if (typedArray instanceof Uint16Array)       { return UNSIGNED_SHORT$3; } // eslint-disable-line
  if (typedArray instanceof Int32Array)        { return INT$3; }            // eslint-disable-line
  if (typedArray instanceof Uint32Array)       { return UNSIGNED_INT$3; }   // eslint-disable-line
  if (typedArray instanceof Float32Array)      { return FLOAT$3; }          // eslint-disable-line
  throw new Error('unsupported typed array type');
}

/**
 * Get the GL type for a typedArray type
 * @param {ArrayBufferView} typedArrayType a typedArray constructor
 * @return {number} the GL type for type. For example pass in `Int8Array` and `gl.BYTE` will
 *   be returned. Pass in `Uint32Array` and `gl.UNSIGNED_INT` will be returned
 * @memberOf module:twgl/typedArray
 */
function getGLTypeForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array)         { return BYTE$2; }           // eslint-disable-line
  if (typedArrayType === Uint8Array)        { return UNSIGNED_BYTE$3; }  // eslint-disable-line
  if (typedArrayType === Uint8ClampedArray) { return UNSIGNED_BYTE$3; }  // eslint-disable-line
  if (typedArrayType === Int16Array)        { return SHORT$2; }          // eslint-disable-line
  if (typedArrayType === Uint16Array)       { return UNSIGNED_SHORT$3; } // eslint-disable-line
  if (typedArrayType === Int32Array)        { return INT$3; }            // eslint-disable-line
  if (typedArrayType === Uint32Array)       { return UNSIGNED_INT$3; }   // eslint-disable-line
  if (typedArrayType === Float32Array)      { return FLOAT$3; }          // eslint-disable-line
  throw new Error('unsupported typed array type');
}

/**
 * Get the typed array constructor for a given GL type
 * @param {number} type the GL type. (eg: `gl.UNSIGNED_INT`)
 * @return {function} the constructor for a the corresponding typed array. (eg. `Uint32Array`).
 * @memberOf module:twgl/typedArray
 */
function getTypedArrayTypeForGLType(type) {
  const CTOR = glTypeToTypedArray[type];
  if (!CTOR) {
    throw new Error('unknown gl type');
  }
  return CTOR;
}

const isArrayBuffer$1 = typeof SharedArrayBuffer !== 'undefined'
  ? function isArrayBufferOrSharedArrayBuffer(a) {
    return a && a.buffer && (a.buffer instanceof ArrayBuffer || a.buffer instanceof SharedArrayBuffer);
  }
  : function isArrayBuffer(a) {
    return a && a.buffer && a.buffer instanceof ArrayBuffer;
  };

var typedarrays = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getGLTypeForTypedArray: getGLTypeForTypedArray,
  getGLTypeForTypedArrayType: getGLTypeForTypedArrayType,
  getTypedArrayTypeForGLType: getTypedArrayTypeForGLType,
  isArrayBuffer: isArrayBuffer$1
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/* eslint no-console: "off" */

/**
 * Copy named properties
 *
 * @param {string[]} names names of properties to copy
 * @param {object} src object to copy properties from
 * @param {object} dst object to copy properties to
 * @private
 */
function copyNamedProperties(names, src, dst) {
  names.forEach(function(name) {
    const value = src[name];
    if (value !== undefined) {
      dst[name] = value;
    }
  });
}

/**
 * Copies properties from source to dest only if a matching key is in dest
 *
 * @param {Object.<string, ?>} src the source
 * @param {Object.<string, ?>} dst the dest
 * @private
 */
function copyExistingProperties(src, dst) {
  Object.keys(dst).forEach(function(key) {
    if (dst.hasOwnProperty(key) && src.hasOwnProperty(key)) {  /* eslint no-prototype-builtins: 0 */
      dst[key] = src[key];
    }
  });
}

function error$1(...args) {
  console.error(...args);
}

function warn$1(...args) {
  console.warn(...args);
}

const isTypeWeakMaps = new Map();

function isType(object, type) {
  if (!object || typeof object !== 'object') {
    return false;
  }
  let weakMap = isTypeWeakMaps.get(type);
  if (!weakMap) {
    weakMap = new WeakMap();
    isTypeWeakMaps.set(type, weakMap);
  }
  let isOfType = weakMap.get(object);
  if (isOfType === undefined) {
    const s = Object.prototype.toString.call(object);
    isOfType = s.substring(8, s.length - 1) === type;
    weakMap.set(object, isOfType);
  }
  return isOfType;
}

function isBuffer(gl, t) {
  return typeof WebGLBuffer !== 'undefined' && isType(t, 'WebGLBuffer');
}

function isRenderbuffer(gl, t) {
  return typeof WebGLRenderbuffer !== 'undefined' && isType(t, 'WebGLRenderbuffer');
}

function isTexture(gl, t) {
  return typeof WebGLTexture !== 'undefined' && isType(t, 'WebGLTexture');
}

function isSampler(gl, t) {
  return typeof WebGLSampler !== 'undefined' && isType(t, 'WebGLSampler');
}

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const STATIC_DRAW                  = 0x88e4;
const ARRAY_BUFFER$1                 = 0x8892;
const ELEMENT_ARRAY_BUFFER$2         = 0x8893;
const BUFFER_SIZE                  = 0x8764;

const BYTE$1                         = 0x1400;
const UNSIGNED_BYTE$2                = 0x1401;
const SHORT$1                        = 0x1402;
const UNSIGNED_SHORT$2               = 0x1403;
const INT$2                          = 0x1404;
const UNSIGNED_INT$2                 = 0x1405;
const FLOAT$2                        = 0x1406;
const defaults$2 = {
  attribPrefix: "",
};

/**
 * Sets the default attrib prefix
 *
 * When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 * as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 * In other words I'll create arrays of geometry like this
 *
 *     var arrays = {
 *       position: ...
 *       normal: ...
 *       texcoord: ...
 *     };
 *
 * But need those mapped to attributes and my attributes start with `a_`.
 *
 * @deprecated see {@link module:twgl.setDefaults}
 * @param {string} prefix prefix for attribs
 * @memberOf module:twgl/attributes
 */
function setAttributePrefix(prefix) {
  defaults$2.attribPrefix = prefix;
}

function setDefaults$2(newDefaults) {
  copyExistingProperties(newDefaults, defaults$2);
}

function setBufferFromTypedArray(gl, type, buffer, array, drawType) {
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, array, drawType || STATIC_DRAW);
}

/**
 * Given typed array creates a WebGLBuffer and copies the typed array
 * into it.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {ArrayBuffer|SharedArrayBuffer|ArrayBufferView|WebGLBuffer} typedArray the typed array. Note: If a WebGLBuffer is passed in it will just be returned. No action will be taken
 * @param {number} [type] the GL bind type for the buffer. Default = `gl.ARRAY_BUFFER`.
 * @param {number} [drawType] the GL draw type for the buffer. Default = 'gl.STATIC_DRAW`.
 * @return {WebGLBuffer} the created WebGLBuffer
 * @memberOf module:twgl/attributes
 */
function createBufferFromTypedArray(gl, typedArray, type, drawType) {
  if (isBuffer(gl, typedArray)) {
    return typedArray;
  }
  type = type || ARRAY_BUFFER$1;
  const buffer = gl.createBuffer();
  setBufferFromTypedArray(gl, type, buffer, typedArray, drawType);
  return buffer;
}

function isIndices(name) {
  return name === "indices";
}

// This is really just a guess. Though I can't really imagine using
// anything else? Maybe for some compression?
function getNormalizationForTypedArrayType(typedArrayType) {
  if (typedArrayType === Int8Array)    { return true; }  // eslint-disable-line
  if (typedArrayType === Uint8Array)   { return true; }  // eslint-disable-line
  return false;
}

function getArray$1(array) {
  return array.length ? array : array.data;
}

const texcoordRE = /coord|texture/i;
const colorRE = /color|colour/i;

function guessNumComponentsFromName(name, length) {
  let numComponents;
  if (texcoordRE.test(name)) {
    numComponents = 2;
  } else if (colorRE.test(name)) {
    numComponents = 4;
  } else {
    numComponents = 3;  // position, normals, indices ...
  }

  if (length % numComponents > 0) {
    throw new Error(`Can not guess numComponents for attribute '${name}'. Tried ${numComponents} but ${length} values is not evenly divisible by ${numComponents}. You should specify it.`);
  }

  return numComponents;
}

function getNumComponents$1(array, arrayName, numValues) {
  return array.numComponents || array.size || guessNumComponentsFromName(arrayName, numValues || getArray$1(array).length);
}

function makeTypedArray(array, name) {
  if (isArrayBuffer$1(array)) {
    return array;
  }

  if (isArrayBuffer$1(array.data)) {
    return array.data;
  }

  if (Array.isArray(array)) {
    array = {
      data: array,
    };
  }

  let Type = array.type ? typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type) : undefined;
  if (!Type) {
    if (isIndices(name)) {
      Type = Uint16Array;
    } else {
      Type = Float32Array;
    }
  }
  return new Type(array.data);
}

function glTypeFromGLTypeOrTypedArrayType(glTypeOrTypedArrayCtor) {
  return typeof glTypeOrTypedArrayCtor === 'number'
      ? glTypeOrTypedArrayCtor
      : glTypeOrTypedArrayCtor ? getGLTypeForTypedArrayType(glTypeOrTypedArrayCtor) : FLOAT$2;
}

function typedArrayTypeFromGLTypeOrTypedArrayCtor(glTypeOrTypedArrayCtor) {
  return typeof glTypeOrTypedArrayCtor === 'number'
      ? getTypedArrayTypeForGLType(glTypeOrTypedArrayCtor)
      : glTypeOrTypedArrayCtor || Float32Array;
}

function attribBufferFromBuffer(gl, array/*, arrayName */) {
  return {
    buffer: array.buffer,
    numValues: 2 * 3 * 4,  // safely divided by 2, 3, 4
    type: glTypeFromGLTypeOrTypedArrayType(array.type),
    arrayType: typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type),
  };
}

function attribBufferFromSize(gl, array/*, arrayName*/) {
  const numValues = array.data || array;
  const arrayType = typedArrayTypeFromGLTypeOrTypedArrayCtor(array.type);
  const numBytes = numValues * arrayType.BYTES_PER_ELEMENT;
  const buffer = gl.createBuffer();
  gl.bindBuffer(ARRAY_BUFFER$1, buffer);
  gl.bufferData(ARRAY_BUFFER$1, numBytes, array.drawType || STATIC_DRAW);
  return {
    buffer,
    numValues,
    type: getGLTypeForTypedArrayType(arrayType),
    arrayType,
  };
}

function attribBufferFromArrayLike(gl, array, arrayName) {
  const typedArray = makeTypedArray(array, arrayName);
  return {
    arrayType: typedArray.constructor,
    buffer: createBufferFromTypedArray(gl, typedArray, undefined, array.drawType),
    type: getGLTypeForTypedArray(typedArray),
    numValues: 0,
  };
}

/**
 * The info for an attribute. This is effectively just the arguments to `gl.vertexAttribPointer` plus the WebGLBuffer
 * for the attribute.
 *
 * @typedef {Object} AttribInfo
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {number} [numComponents] the number of components for this attribute.
 * @property {number} [size] synonym for `numComponents`.
 * @property {number} [type] the type of the attribute (eg. `gl.FLOAT`, `gl.UNSIGNED_BYTE`, etc...) Default = `gl.FLOAT`
 * @property {boolean} [normalize] whether or not to normalize the data. Default = false
 * @property {number} [offset] offset into buffer in bytes. Default = 0
 * @property {number} [stride] the stride in bytes per element. Default = 0
 * @property {number} [divisor] the divisor in instances. Default = 0.
 *    Requires WebGL2 or the ANGLE_instanced_arrays extension.
 *    and, if you're using WebGL1 you must have called {@link module:twgl.addExtensionsToContext}
 * @property {WebGLBuffer} buffer the buffer that contains the data for this attribute
 * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
 * @memberOf module:twgl
 */

/**
 * @typedef {(Int8ArrayConstructor|Uint8ArrayConstructor|Int16ArrayConstructor|Uint16ArrayConstructor|Int32ArrayConstructor|Uint32ArrayConstructor|Float32ArrayConstructor)} TypedArrayConstructor
 */

/**
 * Use this type of array spec when TWGL can't guess the type or number of components of an array
 * @typedef {Object} FullArraySpec
 * @property {number[]|ArrayBufferView} [value] a constant value for the attribute. Note: if this is set the attribute will be
 *    disabled and set to this constant value and all other values will be ignored.
 * @property {(number|number[]|ArrayBufferView)} [data] The data of the array. A number alone becomes the number of elements of type.
 * @property {number} [numComponents] number of components for `vertexAttribPointer`. Default is based on the name of the array.
 *    If `coord` is in the name assumes `numComponents = 2`.
 *    If `color` is in the name assumes `numComponents = 4`.
 *    otherwise assumes `numComponents = 3`
 * @property {number|TypedArrayConstructor} [type] type. This is used if `data` is a JavaScript array, or `buffer` is passed in, or `data` is a number.
 *   It can either be the constructor for a typedarray. (eg. `Uint8Array`) OR a WebGL type, (eg `gl.UNSIGNED_BYTE`).
 *   For example if you want colors in a `Uint8Array` you might have a `FullArraySpec` like `{ type: gl.UNSIGNED_BYTE, data: [255,0,255,255, ...], }`.
 * @property {number} [size] synonym for `numComponents`.
 * @property {boolean} [normalize] normalize for `vertexAttribPointer`. Default is true if type is `Int8Array` or `Uint8Array` otherwise false.
 * @property {number} [stride] stride for `vertexAttribPointer`. Default = 0
 * @property {number} [offset] offset for `vertexAttribPointer`. Default = 0
 * @property {number} [divisor] divisor for `vertexAttribDivisor`. Default = 0.
 *     Requires WebGL2 or the ANGLE_instanced_arrays extension.
 *     and, if you using WebGL1 you must have called {@link module:twgl.addExtensionsToContext}
 * @property {string} [attrib] name of attribute this array maps to. Defaults to same name as array prefixed by the default attribPrefix.
 * @property {string} [name] synonym for `attrib`.
 * @property {string} [attribName] synonym for `attrib`.
 * @property {WebGLBuffer} [buffer] Buffer to use for this attribute. This lets you use your own buffer
 *    but you will need to supply `numComponents` and `type`. You can effectively pass an `AttribInfo`
 *    to provide this. Example:
 *
 *         const bufferInfo1 = twgl.createBufferInfoFromArrays(gl, {
 *           position: [1, 2, 3, ... ],
 *         });
 *         const bufferInfo2 = twgl.createBufferInfoFromArrays(gl, {
 *           position: bufferInfo1.attribs.position,  // use the same buffer from bufferInfo1
 *         });
 *
 * @property {number} [drawType] the draw type passed to gl.bufferData. Default = gl.STATIC_DRAW
 * @memberOf module:twgl
 */

/**
 * An individual array in {@link module:twgl.Arrays}
 *
 * When passed to {@link module:twgl.createBufferInfoFromArrays} if an ArraySpec is `number[]` or `ArrayBufferView`
 * the types will be guessed based on the name. `indices` will be `Uint16Array`, everything else will
 * be `Float32Array`. If an ArraySpec is a number it's the number of floats for an empty (zeroed) buffer.
 *
 * @typedef {(number|number[]|ArrayBufferView|module:twgl.FullArraySpec)} ArraySpec
 * @memberOf module:twgl
 */

/**
 * This is a JavaScript object of arrays by name. The names should match your shader's attributes. If your
 * attributes have a common prefix you can specify it by calling {@link module:twgl.setAttributePrefix}.
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * Objects with various fields. See {@link module:twgl.FullArraySpec}.
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 * @typedef {Object.<string, module:twgl.ArraySpec>} Arrays
 * @memberOf module:twgl
 */


/**
 * Creates a set of attribute data and WebGLBuffers from set of arrays
 *
 * Given
 *
 *      var arrays = {
 *        position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *        texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *        normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *        color:    { numComponents: 4, data: [255, 255, 255, 255, 255, 0, 0, 255, 0, 0, 255, 255], type: Uint8Array, },
 *        indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *      };
 *
 * returns something like
 *
 *      var attribs = {
 *        position: { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        texcoord: { numComponents: 2, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        normal:   { numComponents: 3, type: gl.FLOAT,         normalize: false, buffer: WebGLBuffer, },
 *        color:    { numComponents: 4, type: gl.UNSIGNED_BYTE, normalize: true,  buffer: WebGLBuffer, },
 *      };
 *
 * notes:
 *
 * *   Arrays can take various forms
 *
 *     Bare JavaScript Arrays
 *
 *         var arrays = {
 *            position: [-1, 1, 0],
 *            normal: [0, 1, 0],
 *            ...
 *         }
 *
 *     Bare TypedArrays
 *
 *         var arrays = {
 *            position: new Float32Array([-1, 1, 0]),
 *            color: new Uint8Array([255, 128, 64, 255]),
 *            ...
 *         }
 *
 * *   Will guess at `numComponents` if not specified based on name.
 *
 *     If `coord` is in the name assumes `numComponents = 2`
 *
 *     If `color` is in the name assumes `numComponents = 4`
 *
 *     otherwise assumes `numComponents = 3`
 *
 * @param {WebGLRenderingContext} gl The webgl rendering context.
 * @param {module:twgl.Arrays} arrays The arrays
 * @param {module:twgl.BufferInfo} [srcBufferInfo] a BufferInfo to copy from
 *   This lets you share buffers. Any arrays you supply will override
 *   the buffers from srcBufferInfo.
 * @return {Object.<string, module:twgl.AttribInfo>} the attribs
 * @memberOf module:twgl/attributes
 */
function createAttribsFromArrays(gl, arrays) {
  const attribs = {};
  Object.keys(arrays).forEach(function(arrayName) {
    if (!isIndices(arrayName)) {
      const array = arrays[arrayName];
      const attribName = array.attrib || array.name || array.attribName || (defaults$2.attribPrefix + arrayName);
      if (array.value) {
        if (!Array.isArray(array.value) && !isArrayBuffer$1(array.value)) {
          throw new Error('array.value is not array or typedarray');
        }
        attribs[attribName] = {
          value: array.value,
        };
      } else {
        let fn;
        if (array.buffer && array.buffer instanceof WebGLBuffer) {
          fn = attribBufferFromBuffer;
        } else if (typeof array === "number" || typeof array.data === "number") {
          fn = attribBufferFromSize;
        } else {
          fn = attribBufferFromArrayLike;
        }
        const {buffer, type, numValues, arrayType} = fn(gl, array, arrayName);
        const normalization = array.normalize !== undefined ? array.normalize : getNormalizationForTypedArrayType(arrayType);
        const numComponents = getNumComponents$1(array, arrayName, numValues);
        attribs[attribName] = {
          buffer:        buffer,
          numComponents: numComponents,
          type:          type,
          normalize:     normalization,
          stride:        array.stride || 0,
          offset:        array.offset || 0,
          divisor:       array.divisor === undefined ? undefined : array.divisor,
          drawType:      array.drawType,
        };
      }
    }
  });
  gl.bindBuffer(ARRAY_BUFFER$1, null);
  return attribs;
}

/**
 * Sets the contents of a buffer attached to an attribInfo
 *
 * This is helper function to dynamically update a buffer.
 *
 * Let's say you make a bufferInfo
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *     var bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 *
 *  And you want to dynamically update the positions. You could do this
 *
 *     // assuming arrays.position has already been updated with new data.
 *     twgl.setAttribInfoBufferFromArray(gl, bufferInfo.attribs.position, arrays.position);
 *
 * @param {WebGLRenderingContext} gl
 * @param {AttribInfo} attribInfo The attribInfo who's buffer contents to set. NOTE: If you have an attribute prefix
 *   the name of the attribute will include the prefix.
 * @param {ArraySpec} array Note: it is arguably inefficient to pass in anything but a typed array because anything
 *    else will have to be converted to a typed array before it can be used by WebGL. During init time that
 *    inefficiency is usually not important but if you're updating data dynamically best to be efficient.
 * @param {number} [offset] an optional offset into the buffer. This is only an offset into the WebGL buffer
 *    not the array. To pass in an offset into the array itself use a typed array and create an `ArrayBufferView`
 *    for the portion of the array you want to use.
 *
 *        var someArray = new Float32Array(1000); // an array with 1000 floats
 *        var someSubArray = new Float32Array(someArray.buffer, offsetInBytes, sizeInUnits); // a view into someArray
 *
 *    Now you can pass `someSubArray` into setAttribInfoBufferFromArray`
 * @memberOf module:twgl/attributes
 */
function setAttribInfoBufferFromArray(gl, attribInfo, array, offset) {
  array = makeTypedArray(array);
  if (offset !== undefined) {
    gl.bindBuffer(ARRAY_BUFFER$1, attribInfo.buffer);
    gl.bufferSubData(ARRAY_BUFFER$1, offset, array);
  } else {
    setBufferFromTypedArray(gl, ARRAY_BUFFER$1, attribInfo.buffer, array, attribInfo.drawType);
  }
}

function getBytesPerValueForGLType(gl, type) {
  if (type === BYTE$1)           return 1;  // eslint-disable-line
  if (type === UNSIGNED_BYTE$2)  return 1;  // eslint-disable-line
  if (type === SHORT$1)          return 2;  // eslint-disable-line
  if (type === UNSIGNED_SHORT$2) return 2;  // eslint-disable-line
  if (type === INT$2)            return 4;  // eslint-disable-line
  if (type === UNSIGNED_INT$2)   return 4;  // eslint-disable-line
  if (type === FLOAT$2)          return 4;  // eslint-disable-line
  return 0;
}

// Tries to get the number of elements from a set of arrays.
const positionKeys = ['position', 'positions', 'a_position'];
function getNumElementsFromNonIndexedArrays(arrays) {
  let key;
  let ii;
  for (ii = 0; ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in arrays) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(arrays)[0];
  }
  const array = arrays[key];
  const length = getArray$1(array).length;
  if (length === undefined) {
    return 1;   // There's no arrays
  }
  const numComponents = getNumComponents$1(array, key);
  const numElements = length / numComponents;
  if (length % numComponents > 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
  }
  return numElements;
}

function getNumElementsFromAttributes(gl, attribs) {
  let key;
  let ii;
  for (ii = 0; ii < positionKeys.length; ++ii) {
    key = positionKeys[ii];
    if (key in attribs) {
      break;
    }
    key = defaults$2.attribPrefix + key;
    if (key in attribs) {
      break;
    }
  }
  if (ii === positionKeys.length) {
    key = Object.keys(attribs)[0];
  }
  const attrib = attribs[key];
  if (!attrib.buffer) {
    return 1; // There's no buffer
  }
  gl.bindBuffer(ARRAY_BUFFER$1, attrib.buffer);
  const numBytes = gl.getBufferParameter(ARRAY_BUFFER$1, BUFFER_SIZE);
  gl.bindBuffer(ARRAY_BUFFER$1, null);

  const bytesPerValue = getBytesPerValueForGLType(gl, attrib.type);
  const totalElements = numBytes / bytesPerValue;
  const numComponents = attrib.numComponents || attrib.size;
  // TODO: check stride
  const numElements = totalElements / numComponents;
  if (numElements % 1 !== 0) {
    throw new Error(`numComponents ${numComponents} not correct for length ${length}`);
  }
  return numElements;
}

/**
 * @typedef {Object} BufferInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLBuffer} [indices] The indices `ELEMENT_ARRAY_BUFFER` if any indices exist.
 * @property {Object.<string, module:twgl.AttribInfo>} [attribs] The attribs appropriate to call `setAttributes`
 * @memberOf module:twgl
 */

/**
 * Creates a BufferInfo from an object of arrays.
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * Given an object like
 *
 *     var arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *       normal:   { numComponents: 3, data: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],     },
 *       indices:  { numComponents: 3, data: [0, 1, 2, 1, 2, 3],                       },
 *     };
 *
 *  Creates an BufferInfo like this
 *
 *     bufferInfo = {
 *       numElements: 4,        // or whatever the number of elements is
 *       indices: WebGLBuffer,  // this property will not exist if there are no indices
 *       attribs: {
 *         position: { buffer: WebGLBuffer, numComponents: 3, },
 *         normal:   { buffer: WebGLBuffer, numComponents: 3, },
 *         texcoord: { buffer: WebGLBuffer, numComponents: 2, },
 *       },
 *     };
 *
 *  The properties of arrays can be JavaScript arrays in which case the number of components
 *  will be guessed.
 *
 *     var arrays = {
 *        position: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0],
 *        texcoord: [0, 0, 0, 1, 1, 0, 1, 1],
 *        normal:   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
 *        indices:  [0, 1, 2, 1, 2, 3],
 *     };
 *
 *  They can also be TypedArrays
 *
 *     var arrays = {
 *        position: new Float32Array([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]),
 *        texcoord: new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]),
 *        normal:   new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]),
 *        indices:  new Uint16Array([0, 1, 2, 1, 2, 3]),
 *     };
 *
 *  Or AugmentedTypedArrays
 *
 *     var positions = createAugmentedTypedArray(3, 4);
 *     var texcoords = createAugmentedTypedArray(2, 4);
 *     var normals   = createAugmentedTypedArray(3, 4);
 *     var indices   = createAugmentedTypedArray(3, 2, Uint16Array);
 *
 *     positions.push([0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0]);
 *     texcoords.push([0, 0, 0, 1, 1, 0, 1, 1]);
 *     normals.push([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
 *     indices.push([0, 1, 2, 1, 2, 3]);
 *
 *     var arrays = {
 *        position: positions,
 *        texcoord: texcoords,
 *        normal:   normals,
 *        indices:  indices,
 *     };
 *
 * For the last example it is equivalent to
 *
 *     var bufferInfo = {
 *       attribs: {
 *         position: { numComponents: 3, buffer: gl.createBuffer(), },
 *         texcoord: { numComponents: 2, buffer: gl.createBuffer(), },
 *         normal: { numComponents: 3, buffer: gl.createBuffer(), },
 *       },
 *       indices: gl.createBuffer(),
 *       numElements: 6,
 *     };
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.position.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.position, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.texcoord.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.texcoord, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.attribs.normal.buffer);
 *     gl.bufferData(gl.ARRAY_BUFFER, arrays.normal, gl.STATIC_DRAW);
 *     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.indices);
 *     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, arrays.indices, gl.STATIC_DRAW);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.Arrays} arrays Your data
 * @param {module:twgl.BufferInfo} [srcBufferInfo] An existing
 *        buffer info to start from. WebGLBuffers etc specified
 *        in the srcBufferInfo will be used in a new BufferInfo
 *        with any arrays specified overriding the ones in
 *        srcBufferInfo.
 * @return {module:twgl.BufferInfo} A BufferInfo
 * @memberOf module:twgl/attributes
 */
function createBufferInfoFromArrays(gl, arrays, srcBufferInfo) {
  const newAttribs = createAttribsFromArrays(gl, arrays);
  const bufferInfo = Object.assign({}, srcBufferInfo ? srcBufferInfo : {});
  bufferInfo.attribs = Object.assign({}, srcBufferInfo ? srcBufferInfo.attribs : {}, newAttribs);
  const indices = arrays.indices;
  if (indices) {
    const newIndices = makeTypedArray(indices, "indices");
    bufferInfo.indices = createBufferFromTypedArray(gl, newIndices, ELEMENT_ARRAY_BUFFER$2);
    bufferInfo.numElements = newIndices.length;
    bufferInfo.elementType = getGLTypeForTypedArray(newIndices);
  } else if (!bufferInfo.numElements) {
    bufferInfo.numElements = getNumElementsFromAttributes(gl, bufferInfo.attribs);
  }

  return bufferInfo;
}

/**
 * Creates a buffer from an array, typed array, or array spec
 *
 * Given something like this
 *
 *     [1, 2, 3],
 *
 * or
 *
 *     new Uint16Array([1,2,3]);
 *
 * or
 *
 *     {
 *        data: [1, 2, 3],
 *        type: Uint8Array,
 *     }
 *
 * returns a WebGLBuffer that contains the given data.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.ArraySpec} array an array, typed array, or array spec.
 * @param {string} arrayName name of array. Used to guess the type if type can not be derived otherwise.
 * @return {WebGLBuffer} a WebGLBuffer containing the data in array.
 * @memberOf module:twgl/attributes
 */
function createBufferFromArray(gl, array, arrayName) {
  const type = arrayName === "indices" ? ELEMENT_ARRAY_BUFFER$2 : ARRAY_BUFFER$1;
  const typedArray = makeTypedArray(array, arrayName);
  return createBufferFromTypedArray(gl, typedArray, type);
}

/**
 * Creates buffers from arrays or typed arrays
 *
 * Given something like this
 *
 *     var arrays = {
 *        positions: [1, 2, 3],
 *        normals: [0, 0, 1],
 *     }
 *
 * returns something like
 *
 *     buffers = {
 *       positions: WebGLBuffer,
 *       normals: WebGLBuffer,
 *     }
 *
 * If the buffer is named 'indices' it will be made an ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {module:twgl.Arrays} arrays
 * @return {Object<string, WebGLBuffer>} returns an object with one WebGLBuffer per array
 * @memberOf module:twgl/attributes
 */
function createBuffersFromArrays(gl, arrays) {
  const buffers = { };
  Object.keys(arrays).forEach(function(key) {
    buffers[key] = createBufferFromArray(gl, arrays[key], key);
  });

  // Ugh!
  if (arrays.indices) {
    buffers.numElements = arrays.indices.length;
    buffers.elementType = getGLTypeForTypedArray(makeTypedArray(arrays.indices));
  } else {
    buffers.numElements = getNumElementsFromNonIndexedArrays(arrays);
  }

  return buffers;
}

var attributes = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createAttribsFromArrays: createAttribsFromArrays,
  createBuffersFromArrays: createBuffersFromArrays,
  createBufferFromArray: createBufferFromArray,
  createBufferFromTypedArray: createBufferFromTypedArray,
  createBufferInfoFromArrays: createBufferInfoFromArrays,
  setAttribInfoBufferFromArray: setAttribInfoBufferFromArray,
  setAttributePrefix: setAttributePrefix,
  setAttributeDefaults_: setDefaults$2,
  getNumComponents_: getNumComponents$1,
  getArray_: getArray$1
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const getArray = getArray$1;  // eslint-disable-line
const getNumComponents = getNumComponents$1;  // eslint-disable-line

/**
 * @typedef {(Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array)} TypedArray
 */

/**
 * Add `push` to a typed array. It just keeps a 'cursor'
 * and allows use to `push` values into the array so we
 * don't have to manually compute offsets
 * @param {TypedArray} typedArray TypedArray to augment
 * @param {number} numComponents number of components.
 * @private
 */
function augmentTypedArray(typedArray, numComponents) {
  let cursor = 0;
  typedArray.push = function() {
    for (let ii = 0; ii < arguments.length; ++ii) {
      const value = arguments[ii];
      if (value instanceof Array || isArrayBuffer$1(value)) {
        for (let jj = 0; jj < value.length; ++jj) {
          typedArray[cursor++] = value[jj];
        }
      } else {
        typedArray[cursor++] = value;
      }
    }
  };
  typedArray.reset = function(opt_index) {
    cursor = opt_index || 0;
  };
  typedArray.numComponents = numComponents;
  Object.defineProperty(typedArray, 'numElements', {
    get: function() {
      return this.length / this.numComponents | 0;
    },
  });
  return typedArray;
}

/**
 * creates a typed array with a `push` function attached
 * so that you can easily *push* values.
 *
 * `push` can take multiple arguments. If an argument is an array each element
 * of the array will be added to the typed array.
 *
 * Example:
 *
 *     const array = createAugmentedTypedArray(3, 2);  // creates a Float32Array with 6 values
 *     array.push(1, 2, 3);
 *     array.push([4, 5, 6]);
 *     // array now contains [1, 2, 3, 4, 5, 6]
 *
 * Also has `numComponents` and `numElements` properties.
 *
 * @param {number} numComponents number of components
 * @param {number} numElements number of elements. The total size of the array will be `numComponents * numElements`.
 * @param {constructor} opt_type A constructor for the type. Default = `Float32Array`.
 * @return {ArrayBufferView} A typed array.
 * @memberOf module:twgl/primitives
 */
function createAugmentedTypedArray(numComponents, numElements, opt_type) {
  const Type = opt_type || Float32Array;
  return augmentTypedArray(new Type(numComponents * numElements), numComponents);
}

function allButIndices(name) {
  return name !== "indices";
}

/**
 * Given indexed vertices creates a new set of vertices un-indexed by expanding the indexed vertices.
 * @param {Object.<string, TypedArray>} vertices The indexed vertices to deindex
 * @return {Object.<string, TypedArray>} The deindexed vertices
 * @memberOf module:twgl/primitives
 */
function deindexVertices(vertices) {
  const indices = vertices.indices;
  const newVertices = {};
  const numElements = indices.length;

  function expandToUnindexed(channel) {
    const srcBuffer = vertices[channel];
    const numComponents = srcBuffer.numComponents;
    const dstBuffer = createAugmentedTypedArray(numComponents, numElements, srcBuffer.constructor);
    for (let ii = 0; ii < numElements; ++ii) {
      const ndx = indices[ii];
      const offset = ndx * numComponents;
      for (let jj = 0; jj < numComponents; ++jj) {
        dstBuffer.push(srcBuffer[offset + jj]);
      }
    }
    newVertices[channel] = dstBuffer;
  }

  Object.keys(vertices).filter(allButIndices).forEach(expandToUnindexed);

  return newVertices;
}

/**
 * flattens the normals of deindexed vertices in place.
 * @param {Object.<string, TypedArray>} vertices The deindexed vertices who's normals to flatten
 * @return {Object.<string, TypedArray>} The flattened vertices (same as was passed in)
 * @memberOf module:twgl/primitives
 */
function flattenNormals(vertices) {
  if (vertices.indices) {
    throw new Error('can not flatten normals of indexed vertices. deindex them first');
  }

  const normals = vertices.normal;
  const numNormals = normals.length;
  for (let ii = 0; ii < numNormals; ii += 9) {
    // pull out the 3 normals for this triangle
    const nax = normals[ii + 0];
    const nay = normals[ii + 1];
    const naz = normals[ii + 2];

    const nbx = normals[ii + 3];
    const nby = normals[ii + 4];
    const nbz = normals[ii + 5];

    const ncx = normals[ii + 6];
    const ncy = normals[ii + 7];
    const ncz = normals[ii + 8];

    // add them
    let nx = nax + nbx + ncx;
    let ny = nay + nby + ncy;
    let nz = naz + nbz + ncz;

    // normalize them
    const length = Math.sqrt(nx * nx + ny * ny + nz * nz);

    nx /= length;
    ny /= length;
    nz /= length;

    // copy them back in
    normals[ii + 0] = nx;
    normals[ii + 1] = ny;
    normals[ii + 2] = nz;

    normals[ii + 3] = nx;
    normals[ii + 4] = ny;
    normals[ii + 5] = nz;

    normals[ii + 6] = nx;
    normals[ii + 7] = ny;
    normals[ii + 8] = nz;
  }

  return vertices;
}

function applyFuncToV3Array(array, matrix, fn) {
  const len = array.length;
  const tmp = new Float32Array(3);
  for (let ii = 0; ii < len; ii += 3) {
    fn(matrix, [array[ii], array[ii + 1], array[ii + 2]], tmp);
    array[ii    ] = tmp[0];
    array[ii + 1] = tmp[1];
    array[ii + 2] = tmp[2];
  }
}

function transformNormal(mi, v, dst) {
  dst = dst || create$1();
  const v0 = v[0];
  const v1 = v[1];
  const v2 = v[2];

  dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
  dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
  dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

  return dst;
}

/**
 * Reorients directions by the given matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */
function reorientDirections(array, matrix) {
  applyFuncToV3Array(array, matrix, transformDirection);
  return array;
}

/**
 * Reorients normals by the inverse-transpose of the given
 * matrix..
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */
function reorientNormals(array, matrix) {
  applyFuncToV3Array(array, inverse(matrix), transformNormal);
  return array;
}

/**
 * Reorients positions by the given matrix. In other words, it
 * multiplies each vertex by the given matrix.
 * @param {(number[]|TypedArray)} array The array. Assumes value floats per element.
 * @param {module:twgl/m4.Mat4} matrix A matrix to multiply by.
 * @return {(number[]|TypedArray)} the same array that was passed in
 * @memberOf module:twgl/primitives
 */
function reorientPositions(array, matrix) {
  applyFuncToV3Array(array, matrix, transformPoint);
  return array;
}

/**
 * @typedef {(number[]|TypedArray)} NativeArrayOrTypedArray
 */

/**
 * Reorients arrays by the given matrix. Assumes arrays have
 * names that contains 'pos' could be reoriented as positions,
 * 'binorm' or 'tan' as directions, and 'norm' as normals.
 *
 * @param {Object.<string, NativeArrayOrTypedArray>} arrays The vertices to reorient
 * @param {module:twgl/m4.Mat4} matrix matrix to reorient by.
 * @return {Object.<string, NativeArrayOrTypedArray>} same arrays that were passed in.
 * @memberOf module:twgl/primitives
 */
function reorientVertices(arrays, matrix) {
  Object.keys(arrays).forEach(function(name) {
    const array = arrays[name];
    if (name.indexOf("pos") >= 0) {
      reorientPositions(array, matrix);
    } else if (name.indexOf("tan") >= 0 || name.indexOf("binorm") >= 0) {
      reorientDirections(array, matrix);
    } else if (name.indexOf("norm") >= 0) {
      reorientNormals(array, matrix);
    }
  });
  return arrays;
}

/**
 * Creates XY quad BufferInfo
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, WebGLBuffer>} the created XY Quad BufferInfo
 * @memberOf module:twgl/primitives
 * @function createXYQuadBuffers
 */

/**
 * Creates XY quad Buffers
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadBufferInfo(gl, 1, 0, 0.5);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {module:twgl.BufferInfo} the created XY Quad buffers
 * @memberOf module:twgl/primitives
 * @function createXYQuadBufferInfo
 */

/**
 * Creates XY quad vertices
 *
 * The default with no parameters will return a 2x2 quad with values from -1 to +1.
 * If you want a unit quad with that goes from 0 to 1 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0.5, 0.5);
 *
 * If you want a unit quad centered above 0,0 you'd call it with
 *
 *     twgl.primitives.createXYQuadVertices(1, 0, 0.5);
 *
 * @param {number} [size] the size across the quad. Defaults to 2 which means vertices will go from -1 to +1
 * @param {number} [xOffset] the amount to offset the quad in X
 * @param {number} [yOffset] the amount to offset the quad in Y
 * @return {Object.<string, TypedArray>} the created XY Quad vertices
 * @memberOf module:twgl/primitives
 */
function createXYQuadVertices(size, xOffset, yOffset) {
  size = size || 2;
  xOffset = xOffset || 0;
  yOffset = yOffset || 0;
  size *= 0.5;
  return {
    position: {
      numComponents: 2,
      data: [
        xOffset + -1 * size, yOffset + -1 * size,
        xOffset +  1 * size, yOffset + -1 * size,
        xOffset + -1 * size, yOffset +  1 * size,
        xOffset +  1 * size, yOffset +  1 * size,
      ],
    },
    normal: [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ],
    texcoord: [
      0, 0,
      1, 0,
      0, 1,
      1, 1,
    ],
    indices: [ 0, 1, 2, 2, 1, 3 ],
  };
}

/**
 * Creates XZ plane BufferInfo.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {module:twgl.BufferInfo} The created plane BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createPlaneBufferInfo
 */

/**
 * Creates XZ plane buffers.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, WebGLBuffer>} The created plane buffers.
 * @memberOf module:twgl/primitives
 * @function createPlaneBuffers
 */

/**
 * Creates XZ plane vertices.
 *
 * The created plane has position, normal, and texcoord data
 *
 * @param {number} [width] Width of the plane. Default = 1
 * @param {number} [depth] Depth of the plane. Default = 1
 * @param {number} [subdivisionsWidth] Number of steps across the plane. Default = 1
 * @param {number} [subdivisionsDepth] Number of steps down the plane. Default = 1
 * @param {module:twgl/m4.Mat4} [matrix] A matrix by which to multiply all the vertices.
 * @return {Object.<string, TypedArray>} The created plane vertices.
 * @memberOf module:twgl/primitives
 */
function createPlaneVertices(
    width,
    depth,
    subdivisionsWidth,
    subdivisionsDepth,
    matrix) {
  width = width || 1;
  depth = depth || 1;
  subdivisionsWidth = subdivisionsWidth || 1;
  subdivisionsDepth = subdivisionsDepth || 1;
  matrix = matrix || identity();

  const numVertices = (subdivisionsWidth + 1) * (subdivisionsDepth + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);

  for (let z = 0; z <= subdivisionsDepth; z++) {
    for (let x = 0; x <= subdivisionsWidth; x++) {
      const u = x / subdivisionsWidth;
      const v = z / subdivisionsDepth;
      positions.push(
          width * u - width * 0.5,
          0,
          depth * v - depth * 0.5);
      normals.push(0, 1, 0);
      texcoords.push(u, v);
    }
  }

  const numVertsAcross = subdivisionsWidth + 1;
  const indices = createAugmentedTypedArray(
      3, subdivisionsWidth * subdivisionsDepth * 2, Uint16Array);

  for (let z = 0; z < subdivisionsDepth; z++) {  // eslint-disable-line
    for (let x = 0; x < subdivisionsWidth; x++) {  // eslint-disable-line
      // Make triangle 1 of quad.
      indices.push(
          (z + 0) * numVertsAcross + x,
          (z + 1) * numVertsAcross + x,
          (z + 0) * numVertsAcross + x + 1);

      // Make triangle 2 of quad.
      indices.push(
          (z + 1) * numVertsAcross + x,
          (z + 1) * numVertsAcross + x + 1,
          (z + 0) * numVertsAcross + x + 1);
    }
  }

  const arrays = reorientVertices({
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  }, matrix);
  return arrays;
}

/**
 * Creates sphere BufferInfo.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {module:twgl.BufferInfo} The created sphere BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createSphereBufferInfo
 */

/**
 * Creates sphere buffers.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, WebGLBuffer>} The created sphere buffers.
 * @memberOf module:twgl/primitives
 * @function createSphereBuffers
 */

/**
 * Creates sphere vertices.
 *
 * The created sphere has position, normal, and texcoord data
 *
 * @param {number} radius radius of the sphere.
 * @param {number} subdivisionsAxis number of steps around the sphere.
 * @param {number} subdivisionsHeight number of vertically on the sphere.
 * @param {number} [opt_startLatitudeInRadians] where to start the
 *     top of the sphere. Default = 0.
 * @param {number} [opt_endLatitudeInRadians] Where to end the
 *     bottom of the sphere. Default = Math.PI.
 * @param {number} [opt_startLongitudeInRadians] where to start
 *     wrapping the sphere. Default = 0.
 * @param {number} [opt_endLongitudeInRadians] where to end
 *     wrapping the sphere. Default = 2 * Math.PI.
 * @return {Object.<string, TypedArray>} The created sphere vertices.
 * @memberOf module:twgl/primitives
 */
function createSphereVertices(
    radius,
    subdivisionsAxis,
    subdivisionsHeight,
    opt_startLatitudeInRadians,
    opt_endLatitudeInRadians,
    opt_startLongitudeInRadians,
    opt_endLongitudeInRadians) {
  if (subdivisionsAxis <= 0 || subdivisionsHeight <= 0) {
    throw new Error('subdivisionAxis and subdivisionHeight must be > 0');
  }

  opt_startLatitudeInRadians = opt_startLatitudeInRadians || 0;
  opt_endLatitudeInRadians = opt_endLatitudeInRadians || Math.PI;
  opt_startLongitudeInRadians = opt_startLongitudeInRadians || 0;
  opt_endLongitudeInRadians = opt_endLongitudeInRadians || (Math.PI * 2);

  const latRange = opt_endLatitudeInRadians - opt_startLatitudeInRadians;
  const longRange = opt_endLongitudeInRadians - opt_startLongitudeInRadians;

  // We are going to generate our sphere by iterating through its
  // spherical coordinates and generating 2 triangles for each quad on a
  // ring of the sphere.
  const numVertices = (subdivisionsAxis + 1) * (subdivisionsHeight + 1);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);

  // Generate the individual vertices in our vertex buffer.
  for (let y = 0; y <= subdivisionsHeight; y++) {
    for (let x = 0; x <= subdivisionsAxis; x++) {
      // Generate a vertex based on its spherical coordinates
      const u = x / subdivisionsAxis;
      const v = y / subdivisionsHeight;
      const theta = longRange * u + opt_startLongitudeInRadians;
      const phi = latRange * v + opt_startLatitudeInRadians;
      const sinTheta = Math.sin(theta);
      const cosTheta = Math.cos(theta);
      const sinPhi = Math.sin(phi);
      const cosPhi = Math.cos(phi);
      const ux = cosTheta * sinPhi;
      const uy = cosPhi;
      const uz = sinTheta * sinPhi;
      positions.push(radius * ux, radius * uy, radius * uz);
      normals.push(ux, uy, uz);
      texcoords.push(1 - u, v);
    }
  }

  const numVertsAround = subdivisionsAxis + 1;
  const indices = createAugmentedTypedArray(3, subdivisionsAxis * subdivisionsHeight * 2, Uint16Array);
  for (let x = 0; x < subdivisionsAxis; x++) {  // eslint-disable-line
    for (let y = 0; y < subdivisionsHeight; y++) {  // eslint-disable-line
      // Make triangle 1 of quad.
      indices.push(
          (y + 0) * numVertsAround + x,
          (y + 0) * numVertsAround + x + 1,
          (y + 1) * numVertsAround + x);

      // Make triangle 2 of quad.
      indices.push(
          (y + 1) * numVertsAround + x,
          (y + 0) * numVertsAround + x + 1,
          (y + 1) * numVertsAround + x + 1);
    }
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * Array of the indices of corners of each face of a cube.
 * @type {Array.<number[]>}
 * @private
 */
const CUBE_FACE_INDICES = [
  [3, 7, 5, 1],  // right
  [6, 2, 0, 4],  // left
  [6, 7, 3, 2],  // ??
  [0, 1, 5, 4],  // ??
  [7, 6, 4, 5],  // front
  [2, 3, 1, 0],  // back
];

/**
 * Creates a BufferInfo for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCubeBufferInfo
 */

/**
 * Creates the buffers and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCubeBuffers
 */

/**
 * Creates the vertices and indices for a cube.
 *
 * The cube is created around the origin. (-size / 2, size / 2).
 *
 * @param {number} [size] width, height and depth of the cube.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function createCubeVertices(size) {
  size = size || 1;
  const k = size / 2;

  const cornerVertices = [
    [-k, -k, -k],
    [+k, -k, -k],
    [-k, +k, -k],
    [+k, +k, -k],
    [-k, -k, +k],
    [+k, -k, +k],
    [-k, +k, +k],
    [+k, +k, +k],
  ];

  const faceNormals = [
    [+1, +0, +0],
    [-1, +0, +0],
    [+0, +1, +0],
    [+0, -1, +0],
    [+0, +0, +1],
    [+0, +0, -1],
  ];

  const uvCoords = [
    [1, 0],
    [0, 0],
    [0, 1],
    [1, 1],
  ];

  const numVertices = 6 * 4;
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2 , numVertices);
  const indices   = createAugmentedTypedArray(3, 6 * 2, Uint16Array);

  for (let f = 0; f < 6; ++f) {
    const faceIndices = CUBE_FACE_INDICES[f];
    for (let v = 0; v < 4; ++v) {
      const position = cornerVertices[faceIndices[v]];
      const normal = faceNormals[f];
      const uv = uvCoords[v];

      // Each face needs all four vertices because the normals and texture
      // coordinates are not all the same.
      positions.push(position);
      normals.push(normal);
      texcoords.push(uv);

    }
    // Two triangles make a square face.
    const offset = 4 * f;
    indices.push(offset + 0, offset + 1, offset + 2);
    indices.push(offset + 0, offset + 2, offset + 3);
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * Creates a BufferInfo for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created cone BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBufferInfo
 */

/**
 * Creates buffers for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, WebGLBuffer>} The created cone buffers.
 * @memberOf module:twgl/primitives
 * @function createTruncatedConeBuffers
 */

/**
 * Creates vertices for a truncated cone, which is like a cylinder
 * except that it has different top and bottom radii. A truncated cone
 * can also be used to create cylinders and regular cones. The
 * truncated cone will be created centered about the origin, with the
 * y axis as its vertical axis. .
 *
 * @param {number} bottomRadius Bottom radius of truncated cone.
 * @param {number} topRadius Top radius of truncated cone.
 * @param {number} height Height of truncated cone.
 * @param {number} radialSubdivisions The number of subdivisions around the
 *     truncated cone.
 * @param {number} verticalSubdivisions The number of subdivisions down the
 *     truncated cone.
 * @param {boolean} [opt_topCap] Create top cap. Default = true.
 * @param {boolean} [opt_bottomCap] Create bottom cap. Default = true.
 * @return {Object.<string, TypedArray>} The created cone vertices.
 * @memberOf module:twgl/primitives
 */
function createTruncatedConeVertices(
    bottomRadius,
    topRadius,
    height,
    radialSubdivisions,
    verticalSubdivisions,
    opt_topCap,
    opt_bottomCap) {
  if (radialSubdivisions < 3) {
    throw new Error('radialSubdivisions must be 3 or greater');
  }

  if (verticalSubdivisions < 1) {
    throw new Error('verticalSubdivisions must be 1 or greater');
  }

  const topCap = (opt_topCap === undefined) ? true : opt_topCap;
  const bottomCap = (opt_bottomCap === undefined) ? true : opt_bottomCap;

  const extra = (topCap ? 2 : 0) + (bottomCap ? 2 : 0);

  const numVertices = (radialSubdivisions + 1) * (verticalSubdivisions + 1 + extra);
  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices   = createAugmentedTypedArray(3, radialSubdivisions * (verticalSubdivisions + extra / 2) * 2, Uint16Array);

  const vertsAroundEdge = radialSubdivisions + 1;

  // The slant of the cone is constant across its surface
  const slant = Math.atan2(bottomRadius - topRadius, height);
  const cosSlant = Math.cos(slant);
  const sinSlant = Math.sin(slant);

  const start = topCap ? -2 : 0;
  const end = verticalSubdivisions + (bottomCap ? 2 : 0);

  for (let yy = start; yy <= end; ++yy) {
    let v = yy / verticalSubdivisions;
    let y = height * v;
    let ringRadius;
    if (yy < 0) {
      y = 0;
      v = 1;
      ringRadius = bottomRadius;
    } else if (yy > verticalSubdivisions) {
      y = height;
      v = 1;
      ringRadius = topRadius;
    } else {
      ringRadius = bottomRadius +
        (topRadius - bottomRadius) * (yy / verticalSubdivisions);
    }
    if (yy === -2 || yy === verticalSubdivisions + 2) {
      ringRadius = 0;
      v = 0;
    }
    y -= height / 2;
    for (let ii = 0; ii < vertsAroundEdge; ++ii) {
      const sin = Math.sin(ii * Math.PI * 2 / radialSubdivisions);
      const cos = Math.cos(ii * Math.PI * 2 / radialSubdivisions);
      positions.push(sin * ringRadius, y, cos * ringRadius);
      if (yy < 0) {
        normals.push(0, -1, 0);
      } else if (yy > verticalSubdivisions) {
        normals.push(0, 1, 0);
      } else if (ringRadius === 0.0) {
        normals.push(0, 0, 0);
      } else {
        normals.push(sin * cosSlant, sinSlant, cos * cosSlant);
      }
      texcoords.push((ii / radialSubdivisions), 1 - v);
    }
  }

  for (let yy = 0; yy < verticalSubdivisions + extra; ++yy) {  // eslint-disable-line
    if (yy === 1 && topCap || yy === verticalSubdivisions + extra - 2 && bottomCap) {
      continue;
    }
    for (let ii = 0; ii < radialSubdivisions; ++ii) {  // eslint-disable-line
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii,
                   vertsAroundEdge * (yy + 0) + 1 + ii,
                   vertsAroundEdge * (yy + 1) + 1 + ii);
      indices.push(vertsAroundEdge * (yy + 0) + 0 + ii,
                   vertsAroundEdge * (yy + 1) + 1 + ii,
                   vertsAroundEdge * (yy + 1) + 0 + ii);
    }
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * Expands RLE data
 * @param {number[]} rleData data in format of run-length, x, y, z, run-length, x, y, z
 * @param {number[]} [padding] value to add each entry with.
 * @return {number[]} the expanded rleData
 * @private
 */
function expandRLEData(rleData, padding) {
  padding = padding || [];
  const data = [];
  for (let ii = 0; ii < rleData.length; ii += 4) {
    const runLength = rleData[ii];
    const element = rleData.slice(ii + 1, ii + 4);
    element.push.apply(element, padding);
    for (let jj = 0; jj < runLength; ++jj) {
      data.push.apply(data, element);
    }
  }
  return data;
}

/**
 * Creates 3D 'F' BufferInfo.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function create3DFBufferInfo
 */

/**
 * Creates 3D 'F' buffers.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function create3DFBuffers
 */

/**
 * Creates 3D 'F' vertices.
 * An 'F' is useful because you can easily tell which way it is oriented.
 * The created 'F' has position, normal, texcoord, and color arrays.
 *
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function create3DFVertices() {

  const positions = [
    // left column front
    0,   0,  0,
    0, 150,  0,
    30,   0,  0,
    0, 150,  0,
    30, 150,  0,
    30,   0,  0,

    // top rung front
    30,   0,  0,
    30,  30,  0,
    100,   0,  0,
    30,  30,  0,
    100,  30,  0,
    100,   0,  0,

    // middle rung front
    30,  60,  0,
    30,  90,  0,
    67,  60,  0,
    30,  90,  0,
    67,  90,  0,
    67,  60,  0,

    // left column back
      0,   0,  30,
     30,   0,  30,
      0, 150,  30,
      0, 150,  30,
     30,   0,  30,
     30, 150,  30,

    // top rung back
     30,   0,  30,
    100,   0,  30,
     30,  30,  30,
     30,  30,  30,
    100,   0,  30,
    100,  30,  30,

    // middle rung back
     30,  60,  30,
     67,  60,  30,
     30,  90,  30,
     30,  90,  30,
     67,  60,  30,
     67,  90,  30,

    // top
      0,   0,   0,
    100,   0,   0,
    100,   0,  30,
      0,   0,   0,
    100,   0,  30,
      0,   0,  30,

    // top rung front
    100,   0,   0,
    100,  30,   0,
    100,  30,  30,
    100,   0,   0,
    100,  30,  30,
    100,   0,  30,

    // under top rung
    30,   30,   0,
    30,   30,  30,
    100,  30,  30,
    30,   30,   0,
    100,  30,  30,
    100,  30,   0,

    // between top rung and middle
    30,   30,   0,
    30,   60,  30,
    30,   30,  30,
    30,   30,   0,
    30,   60,   0,
    30,   60,  30,

    // top of middle rung
    30,   60,   0,
    67,   60,  30,
    30,   60,  30,
    30,   60,   0,
    67,   60,   0,
    67,   60,  30,

    // front of middle rung
    67,   60,   0,
    67,   90,  30,
    67,   60,  30,
    67,   60,   0,
    67,   90,   0,
    67,   90,  30,

    // bottom of middle rung.
    30,   90,   0,
    30,   90,  30,
    67,   90,  30,
    30,   90,   0,
    67,   90,  30,
    67,   90,   0,

    // front of bottom
    30,   90,   0,
    30,  150,  30,
    30,   90,  30,
    30,   90,   0,
    30,  150,   0,
    30,  150,  30,

    // bottom
    0,   150,   0,
    0,   150,  30,
    30,  150,  30,
    0,   150,   0,
    30,  150,  30,
    30,  150,   0,

    // left side
    0,   0,   0,
    0,   0,  30,
    0, 150,  30,
    0,   0,   0,
    0, 150,  30,
    0, 150,   0,
  ];

  const texcoords = [
    // left column front
    0.22, 0.19,
    0.22, 0.79,
    0.34, 0.19,
    0.22, 0.79,
    0.34, 0.79,
    0.34, 0.19,

    // top rung front
    0.34, 0.19,
    0.34, 0.31,
    0.62, 0.19,
    0.34, 0.31,
    0.62, 0.31,
    0.62, 0.19,

    // middle rung front
    0.34, 0.43,
    0.34, 0.55,
    0.49, 0.43,
    0.34, 0.55,
    0.49, 0.55,
    0.49, 0.43,

    // left column back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // top rung back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // middle rung back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // top
    0, 0,
    1, 0,
    1, 1,
    0, 0,
    1, 1,
    0, 1,

    // top rung front
    0, 0,
    1, 0,
    1, 1,
    0, 0,
    1, 1,
    0, 1,

    // under top rung
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // between top rung and middle
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // top of middle rung
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // front of middle rung
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // bottom of middle rung.
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // front of bottom
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // bottom
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // left side
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,
  ];

  const normals = expandRLEData([
    // left column front
    // top rung front
    // middle rung front
    18, 0, 0, 1,

    // left column back
    // top rung back
    // middle rung back
    18, 0, 0, -1,

    // top
    6, 0, 1, 0,

    // top rung front
    6, 1, 0, 0,

    // under top rung
    6, 0, -1, 0,

    // between top rung and middle
    6, 1, 0, 0,

    // top of middle rung
    6, 0, 1, 0,

    // front of middle rung
    6, 1, 0, 0,

    // bottom of middle rung.
    6, 0, -1, 0,

    // front of bottom
    6, 1, 0, 0,

    // bottom
    6, 0, -1, 0,

    // left side
    6, -1, 0, 0,
  ]);

  const colors = expandRLEData([
        // left column front
        // top rung front
        // middle rung front
      18, 200,  70, 120,

        // left column back
        // top rung back
        // middle rung back
      18, 80, 70, 200,

        // top
      6, 70, 200, 210,

        // top rung front
      6, 200, 200, 70,

        // under top rung
      6, 210, 100, 70,

        // between top rung and middle
      6, 210, 160, 70,

        // top of middle rung
      6, 70, 180, 210,

        // front of middle rung
      6, 100, 70, 210,

        // bottom of middle rung.
      6, 76, 210, 100,

        // front of bottom
      6, 140, 210, 80,

        // bottom
      6, 90, 130, 110,

        // left side
      6, 160, 160, 220,
  ], [255]);

  const numVerts = positions.length / 3;

  const arrays = {
    position: createAugmentedTypedArray(3, numVerts),
    texcoord: createAugmentedTypedArray(2,  numVerts),
    normal: createAugmentedTypedArray(3, numVerts),
    color: createAugmentedTypedArray(4, numVerts, Uint8Array),
    indices: createAugmentedTypedArray(3, numVerts / 3, Uint16Array),
  };

  arrays.position.push(positions);
  arrays.texcoord.push(texcoords);
  arrays.normal.push(normals);
  arrays.color.push(colors);

  for (let ii = 0; ii < numVerts; ++ii) {
    arrays.indices.push(ii);
  }

  return arrays;
}

/**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCresentBufferInfo
 */

/**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */

/**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 * @function createCresentBuffers
 */

/**
 * Creates crescent BufferInfo.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCrescentBufferInfo
 */

/**
 * Creates crescent buffers.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createCrescentBuffers
 */

/**
 * Creates crescent vertices.
 *
 * @param {number} verticalRadius The vertical radius of the crescent.
 * @param {number} outerRadius The outer radius of the crescent.
 * @param {number} innerRadius The inner radius of the crescent.
 * @param {number} thickness The thickness of the crescent.
 * @param {number} subdivisionsDown number of steps around the crescent.
 * @param {number} [startOffset] Where to start arc. Default 0.
 * @param {number} [endOffset] Where to end arg. Default 1.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
 function createCrescentVertices(
    verticalRadius,
    outerRadius,
    innerRadius,
    thickness,
    subdivisionsDown,
    startOffset,
    endOffset) {
  if (subdivisionsDown <= 0) {
    throw new Error('subdivisionDown must be > 0');
  }

  startOffset = startOffset || 0;
  endOffset   = endOffset || 1;

  const subdivisionsThick = 2;

  const offsetRange = endOffset - startOffset;
  const numVertices = (subdivisionsDown + 1) * 2 * (2 + subdivisionsThick);
  const positions   = createAugmentedTypedArray(3, numVertices);
  const normals     = createAugmentedTypedArray(3, numVertices);
  const texcoords   = createAugmentedTypedArray(2, numVertices);

  function lerp(a, b, s) {
    return a + (b - a) * s;
  }

  function createArc(arcRadius, x, normalMult, normalAdd, uMult, uAdd) {
    for (let z = 0; z <= subdivisionsDown; z++) {
      const uBack = x / (subdivisionsThick - 1);
      const v = z / subdivisionsDown;
      const xBack = (uBack - 0.5) * 2;
      const angle = (startOffset + (v * offsetRange)) * Math.PI;
      const s = Math.sin(angle);
      const c = Math.cos(angle);
      const radius = lerp(verticalRadius, arcRadius, s);
      const px = xBack * thickness;
      const py = c * verticalRadius;
      const pz = s * radius;
      positions.push(px, py, pz);
      const n = add(multiply$1([0, s, c], normalMult), normalAdd);
      normals.push(n);
      texcoords.push(uBack * uMult + uAdd, v);
    }
  }

  // Generate the individual vertices in our vertex buffer.
  for (let x = 0; x < subdivisionsThick; x++) {
    const uBack = (x / (subdivisionsThick - 1) - 0.5) * 2;
    createArc(outerRadius, x, [1, 1, 1], [0,     0, 0], 1, 0);
    createArc(outerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 0);
    createArc(innerRadius, x, [1, 1, 1], [0,     0, 0], 1, 0);
    createArc(innerRadius, x, [0, 0, 0], [uBack, 0, 0], 0, 1);
  }

  // Do outer surface.
  const indices = createAugmentedTypedArray(3, (subdivisionsDown * 2) * (2 + subdivisionsThick), Uint16Array);

  function createSurface(leftArcOffset, rightArcOffset) {
    for (let z = 0; z < subdivisionsDown; ++z) {
      // Make triangle 1 of quad.
      indices.push(
          leftArcOffset + z + 0,
          leftArcOffset + z + 1,
          rightArcOffset + z + 0);

      // Make triangle 2 of quad.
      indices.push(
          leftArcOffset + z + 1,
          rightArcOffset + z + 1,
          rightArcOffset + z + 0);
    }
  }

  const numVerticesDown = subdivisionsDown + 1;
  // front
  createSurface(numVerticesDown * 0, numVerticesDown * 4);
  // right
  createSurface(numVerticesDown * 5, numVerticesDown * 7);
  // back
  createSurface(numVerticesDown * 6, numVerticesDown * 2);
  // left
  createSurface(numVerticesDown * 3, numVerticesDown * 1);

  return {
    position: positions,
    normal:   normals,
    texcoord: texcoords,
    indices:  indices,
  };
}

/**
 * Creates cylinder BufferInfo. The cylinder will be created around the origin
 * along the y-axis.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of cylinder.
 * @param {number} height Height of cylinder.
 * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
 * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
 * @param {boolean} [topCap] Create top cap. Default = true.
 * @param {boolean} [bottomCap] Create bottom cap. Default = true.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createCylinderBufferInfo
 */

 /**
  * Creates cylinder buffers. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, WebGLBuffer>} The created buffers.
  * @memberOf module:twgl/primitives
  * @function createCylinderBuffers
  */

 /**
  * Creates cylinder vertices. The cylinder will be created around the origin
  * along the y-axis.
  *
  * @param {number} radius Radius of cylinder.
  * @param {number} height Height of cylinder.
  * @param {number} radialSubdivisions The number of subdivisions around the cylinder.
  * @param {number} verticalSubdivisions The number of subdivisions down the cylinder.
  * @param {boolean} [topCap] Create top cap. Default = true.
  * @param {boolean} [bottomCap] Create bottom cap. Default = true.
  * @return {Object.<string, TypedArray>} The created vertices.
  * @memberOf module:twgl/primitives
  */
function createCylinderVertices(
    radius,
    height,
    radialSubdivisions,
    verticalSubdivisions,
    topCap,
    bottomCap) {
  return createTruncatedConeVertices(
      radius,
      radius,
      height,
      radialSubdivisions,
      verticalSubdivisions,
      topCap,
      bottomCap);
}

/**
 * Creates BufferInfo for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createTorusBufferInfo
 */

/**
 * Creates buffers for a torus
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createTorusBuffers
 */

/**
 * Creates vertices for a torus
 *
 * @param {number} radius radius of center of torus circle.
 * @param {number} thickness radius of torus ring.
 * @param {number} radialSubdivisions The number of subdivisions around the torus.
 * @param {number} bodySubdivisions The number of subdivisions around the body torus.
 * @param {boolean} [startAngle] start angle in radians. Default = 0.
 * @param {boolean} [endAngle] end angle in radians. Default = Math.PI * 2.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function createTorusVertices(
    radius,
    thickness,
    radialSubdivisions,
    bodySubdivisions,
    startAngle,
    endAngle) {
  if (radialSubdivisions < 3) {
    throw new Error('radialSubdivisions must be 3 or greater');
  }

  if (bodySubdivisions < 3) {
    throw new Error('verticalSubdivisions must be 3 or greater');
  }

  startAngle = startAngle || 0;
  endAngle = endAngle || Math.PI * 2;
  const range = endAngle - startAngle;

  const radialParts = radialSubdivisions + 1;
  const bodyParts   = bodySubdivisions + 1;
  const numVertices = radialParts * bodyParts;
  const positions   = createAugmentedTypedArray(3, numVertices);
  const normals     = createAugmentedTypedArray(3, numVertices);
  const texcoords   = createAugmentedTypedArray(2, numVertices);
  const indices     = createAugmentedTypedArray(3, (radialSubdivisions) * (bodySubdivisions) * 2, Uint16Array);

  for (let slice = 0; slice < bodyParts; ++slice) {
    const v = slice / bodySubdivisions;
    const sliceAngle = v * Math.PI * 2;
    const sliceSin = Math.sin(sliceAngle);
    const ringRadius = radius + sliceSin * thickness;
    const ny = Math.cos(sliceAngle);
    const y = ny * thickness;
    for (let ring = 0; ring < radialParts; ++ring) {
      const u = ring / radialSubdivisions;
      const ringAngle = startAngle + u * range;
      const xSin = Math.sin(ringAngle);
      const zCos = Math.cos(ringAngle);
      const x = xSin * ringRadius;
      const z = zCos * ringRadius;
      const nx = xSin * sliceSin;
      const nz = zCos * sliceSin;
      positions.push(x, y, z);
      normals.push(nx, ny, nz);
      texcoords.push(u, 1 - v);
    }
  }

  for (let slice = 0; slice < bodySubdivisions; ++slice) {  // eslint-disable-line
    for (let ring = 0; ring < radialSubdivisions; ++ring) {  // eslint-disable-line
      const nextRingIndex  = 1 + ring;
      const nextSliceIndex = 1 + slice;
      indices.push(radialParts * slice          + ring,
                   radialParts * nextSliceIndex + ring,
                   radialParts * slice          + nextRingIndex);
      indices.push(radialParts * nextSliceIndex + ring,
                   radialParts * nextSliceIndex + nextRingIndex,
                   radialParts * slice          + nextRingIndex);
    }
  }

  return {
    position: positions,
    normal:   normals,
    texcoord: texcoords,
    indices:  indices,
  };
}


/**
 * Creates a disc BufferInfo. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {module:twgl.BufferInfo} The created BufferInfo.
 * @memberOf module:twgl/primitives
 * @function createDiscBufferInfo
 */

/**
 * Creates disc buffers. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext.
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, WebGLBuffer>} The created buffers.
 * @memberOf module:twgl/primitives
 * @function createDiscBuffers
 */

/**
 * Creates disc vertices. The disc will be in the xz plane, centered at
 * the origin. When creating, at least 3 divisions, or pie
 * pieces, need to be specified, otherwise the triangles making
 * up the disc will be degenerate. You can also specify the
 * number of radial pieces `stacks`. A value of 1 for
 * stacks will give you a simple disc of pie pieces.  If you
 * want to create an annulus you can set `innerRadius` to a
 * value > 0. Finally, `stackPower` allows you to have the widths
 * increase or decrease as you move away from the center. This
 * is particularly useful when using the disc as a ground plane
 * with a fixed camera such that you don't need the resolution
 * of small triangles near the perimeter. For example, a value
 * of 2 will produce stacks whose outside radius increases with
 * the square of the stack index. A value of 1 will give uniform
 * stacks.
 *
 * @param {number} radius Radius of the ground plane.
 * @param {number} divisions Number of triangles in the ground plane (at least 3).
 * @param {number} [stacks] Number of radial divisions (default=1).
 * @param {number} [innerRadius] Default 0.
 * @param {number} [stackPower] Power to raise stack size to for decreasing width.
 * @return {Object.<string, TypedArray>} The created vertices.
 * @memberOf module:twgl/primitives
 */
function createDiscVertices(
    radius,
    divisions,
    stacks,
    innerRadius,
    stackPower) {
  if (divisions < 3) {
    throw new Error('divisions must be at least 3');
  }

  stacks = stacks ? stacks : 1;
  stackPower = stackPower ? stackPower : 1;
  innerRadius = innerRadius ? innerRadius : 0;

  // Note: We don't share the center vertex because that would
  // mess up texture coordinates.
  const numVertices = (divisions + 1) * (stacks + 1);

  const positions = createAugmentedTypedArray(3, numVertices);
  const normals   = createAugmentedTypedArray(3, numVertices);
  const texcoords = createAugmentedTypedArray(2, numVertices);
  const indices   = createAugmentedTypedArray(3, stacks * divisions * 2, Uint16Array);

  let firstIndex = 0;
  const radiusSpan = radius - innerRadius;
  const pointsPerStack = divisions + 1;

  // Build the disk one stack at a time.
  for (let stack = 0; stack <= stacks; ++stack) {
    const stackRadius = innerRadius + radiusSpan * Math.pow(stack / stacks, stackPower);

    for (let i = 0; i <= divisions; ++i) {
      const theta = 2.0 * Math.PI * i / divisions;
      const x = stackRadius * Math.cos(theta);
      const z = stackRadius * Math.sin(theta);

      positions.push(x, 0, z);
      normals.push(0, 1, 0);
      texcoords.push(1 - (i / divisions), stack / stacks);
      if (stack > 0 && i !== divisions) {
        // a, b, c and d are the indices of the vertices of a quad.  unless
        // the current stack is the one closest to the center, in which case
        // the vertices a and b connect to the center vertex.
        const a = firstIndex + (i + 1);
        const b = firstIndex + i;
        const c = firstIndex + i - pointsPerStack;
        const d = firstIndex + (i + 1) - pointsPerStack;

        // Make a quad of the vertices a, b, c, d.
        indices.push(a, b, c);
        indices.push(a, c, d);
      }
    }

    firstIndex += divisions + 1;
  }

  return {
    position: positions,
    normal: normals,
    texcoord: texcoords,
    indices: indices,
  };
}

/**
 * creates a random integer between 0 and range - 1 inclusive.
 * @param {number} range
 * @return {number} random value between 0 and range - 1 inclusive.
 * @private
 */
function randInt(range) {
  return Math.random() * range | 0;
}

/**
 * Used to supply random colors
 * @callback RandomColorFunc
 * @param {number} ndx index of triangle/quad if unindexed or index of vertex if indexed
 * @param {number} channel 0 = red, 1 = green, 2 = blue, 3 = alpha
 * @return {number} a number from 0 to 255
 * @memberOf module:twgl/primitives
 */

/**
 * @typedef {Object} RandomVerticesOptions
 * @property {number} [vertsPerColor] Defaults to 3 for non-indexed vertices
 * @property {module:twgl/primitives.RandomColorFunc} [rand] A function to generate random numbers
 * @memberOf module:twgl/primitives
 */

/**
 * Creates an augmentedTypedArray of random vertex colors.
 * If the vertices are indexed (have an indices array) then will
 * just make random colors. Otherwise assumes they are triangles
 * and makes one random color for every 3 vertices.
 * @param {Object.<string, AugmentedTypedArray>} vertices Vertices as returned from one of the createXXXVertices functions.
 * @param {module:twgl/primitives.RandomVerticesOptions} [options] options.
 * @return {Object.<string, AugmentedTypedArray>} same vertices as passed in with `color` added.
 * @memberOf module:twgl/primitives
 */
function makeRandomVertexColors(vertices, options) {
  options = options || {};
  const numElements = vertices.position.numElements;
  const vColors = createAugmentedTypedArray(4, numElements, Uint8Array);
  const rand = options.rand || function(ndx, channel) {
    return channel < 3 ? randInt(256) : 255;
  };
  vertices.color = vColors;
  if (vertices.indices) {
    // just make random colors if index
    for (let ii = 0; ii < numElements; ++ii) {
      vColors.push(rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3));
    }
  } else {
    // make random colors per triangle
    const numVertsPerColor = options.vertsPerColor || 3;
    const numSets = numElements / numVertsPerColor;
    for (let ii = 0; ii < numSets; ++ii) {  // eslint-disable-line
      const color = [rand(ii, 0), rand(ii, 1), rand(ii, 2), rand(ii, 3)];
      for (let jj = 0; jj < numVertsPerColor; ++jj) {
        vColors.push(color);
      }
    }
  }
  return vertices;
}

/**
 * creates a function that calls fn to create vertices and then
 * creates a buffers for them
 * @private
 */
function createBufferFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(this, Array.prototype.slice.call(arguments, 1));
    return createBuffersFromArrays(gl, arrays);
  };
}

/**
 * creates a function that calls fn to create vertices and then
 * creates a bufferInfo object for them
 * @private
 */
function createBufferInfoFunc(fn) {
  return function(gl) {
    const arrays = fn.apply(null,  Array.prototype.slice.call(arguments, 1));
    return createBufferInfoFromArrays(gl, arrays);
  };
}

const arraySpecPropertyNames = [
  "numComponents",
  "size",
  "type",
  "normalize",
  "stride",
  "offset",
  "attrib",
  "name",
  "attribName",
];

/**
 * Copy elements from one array to another
 *
 * @param {Array|TypedArray} src source array
 * @param {Array|TypedArray} dst dest array
 * @param {number} dstNdx index in dest to copy src
 * @param {number} [offset] offset to add to copied values
 * @private
 */
function copyElements(src, dst, dstNdx, offset) {
  offset = offset || 0;
  const length = src.length;
  for (let ii = 0; ii < length; ++ii) {
    dst[dstNdx + ii] = src[ii] + offset;
  }
}

/**
 * Creates an array of the same time
 *
 * @param {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} srcArray array who's type to copy
 * @param {number} length size of new array
 * @return {(number[]|ArrayBufferView|module:twgl.FullArraySpec)} array with same type as srcArray
 * @private
 */
function createArrayOfSameType(srcArray, length) {
  const arraySrc = getArray(srcArray);
  const newArray = new arraySrc.constructor(length);
  let newArraySpec = newArray;
  // If it appears to have been augmented make new one augmented
  if (arraySrc.numComponents && arraySrc.numElements) {
    augmentTypedArray(newArray, arraySrc.numComponents);
  }
  // If it was a full spec make new one a full spec
  if (srcArray.data) {
    newArraySpec = {
      data: newArray,
    };
    copyNamedProperties(arraySpecPropertyNames, srcArray, newArraySpec);
  }
  return newArraySpec;
}

/**
 * Concatenates sets of vertices
 *
 * Assumes the vertices match in composition. For example
 * if one set of vertices has positions, normals, and indices
 * all sets of vertices must have positions, normals, and indices
 * and of the same type.
 *
 * Example:
 *
 *      const cubeVertices = twgl.primitives.createCubeVertices(2);
 *      const sphereVertices = twgl.primitives.createSphereVertices(1, 10, 10);
 *      // move the sphere 2 units up
 *      twgl.primitives.reorientVertices(
 *          sphereVertices, twgl.m4.translation([0, 2, 0]));
 *      // merge the sphere with the cube
 *      const cubeSphereVertices = twgl.primitives.concatVertices(
 *          [cubeVertices, sphereVertices]);
 *      // turn them into WebGL buffers and attrib data
 *      const bufferInfo = twgl.createBufferInfoFromArrays(gl, cubeSphereVertices);
 *
 * @param {module:twgl.Arrays[]} arrays Array of arrays of vertices
 * @return {module:twgl.Arrays} The concatenated vertices.
 * @memberOf module:twgl/primitives
 */
function concatVertices(arrayOfArrays) {
  const names = {};
  let baseName;
  // get names of all arrays.
  // and numElements for each set of vertices
  for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
    const arrays = arrayOfArrays[ii];
    Object.keys(arrays).forEach(function(name) {  // eslint-disable-line
      if (!names[name]) {
        names[name] = [];
      }
      if (!baseName && name !== 'indices') {
        baseName = name;
      }
      const arrayInfo = arrays[name];
      const numComponents = getNumComponents(arrayInfo, name);
      const array = getArray(arrayInfo);
      const numElements = array.length / numComponents;
      names[name].push(numElements);
    });
  }

  // compute length of combined array
  // and return one for reference
  function getLengthOfCombinedArrays(name) {
    let length = 0;
    let arraySpec;
    for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
      const arrays = arrayOfArrays[ii];
      const arrayInfo = arrays[name];
      const array = getArray(arrayInfo);
      length += array.length;
      if (!arraySpec || arrayInfo.data) {
        arraySpec = arrayInfo;
      }
    }
    return {
      length: length,
      spec: arraySpec,
    };
  }

  function copyArraysToNewArray(name, base, newArray) {
    let baseIndex = 0;
    let offset = 0;
    for (let ii = 0; ii < arrayOfArrays.length; ++ii) {
      const arrays = arrayOfArrays[ii];
      const arrayInfo = arrays[name];
      const array = getArray(arrayInfo);
      if (name === 'indices') {
        copyElements(array, newArray, offset, baseIndex);
        baseIndex += base[ii];
      } else {
        copyElements(array, newArray, offset);
      }
      offset += array.length;
    }
  }

  const base = names[baseName];

  const newArrays = {};
  Object.keys(names).forEach(function(name) {
    const info = getLengthOfCombinedArrays(name);
    const newArraySpec = createArrayOfSameType(info.spec, info.length);
    copyArraysToNewArray(name, base, getArray(newArraySpec));
    newArrays[name] = newArraySpec;
  });
  return newArrays;
}

/**
 * Creates a duplicate set of vertices
 *
 * This is useful for calling reorientVertices when you
 * also want to keep the original available
 *
 * @param {module:twgl.Arrays} arrays of vertices
 * @return {module:twgl.Arrays} The duplicated vertices.
 * @memberOf module:twgl/primitives
 */
function duplicateVertices(arrays) {
  const newArrays = {};
  Object.keys(arrays).forEach(function(name) {
    const arraySpec = arrays[name];
    const srcArray = getArray(arraySpec);
    const newArraySpec = createArrayOfSameType(arraySpec, srcArray.length);
    copyElements(srcArray, getArray(newArraySpec), 0);
    newArrays[name] = newArraySpec;
  });
  return newArrays;
}

const create3DFBufferInfo = createBufferInfoFunc(create3DFVertices);
const create3DFBuffers = createBufferFunc(create3DFVertices);
const createCubeBufferInfo = createBufferInfoFunc(createCubeVertices);
const createCubeBuffers = createBufferFunc(createCubeVertices);
const createPlaneBufferInfo = createBufferInfoFunc(createPlaneVertices);
const createPlaneBuffers = createBufferFunc(createPlaneVertices);
const createSphereBufferInfo = createBufferInfoFunc(createSphereVertices);
const createSphereBuffers = createBufferFunc(createSphereVertices);
const createTruncatedConeBufferInfo = createBufferInfoFunc(createTruncatedConeVertices);
const createTruncatedConeBuffers = createBufferFunc(createTruncatedConeVertices);
const createXYQuadBufferInfo = createBufferInfoFunc(createXYQuadVertices);
const createXYQuadBuffers = createBufferFunc(createXYQuadVertices);
const createCrescentBufferInfo = createBufferInfoFunc(createCrescentVertices);
const createCrescentBuffers = createBufferFunc(createCrescentVertices);
const createCylinderBufferInfo = createBufferInfoFunc(createCylinderVertices);
const createCylinderBuffers = createBufferFunc(createCylinderVertices);
const createTorusBufferInfo = createBufferInfoFunc(createTorusVertices);
const createTorusBuffers = createBufferFunc(createTorusVertices);
const createDiscBufferInfo = createBufferInfoFunc(createDiscVertices);
const createDiscBuffers = createBufferFunc(createDiscVertices);

// these were mis-spelled until 4.12
const createCresentBufferInfo = createCrescentBufferInfo;
const createCresentBuffers = createCrescentBuffers;
const createCresentVertices = createCrescentVertices;

var primitives = /*#__PURE__*/Object.freeze({
  __proto__: null,
  create3DFBufferInfo: create3DFBufferInfo,
  create3DFBuffers: create3DFBuffers,
  create3DFVertices: create3DFVertices,
  createAugmentedTypedArray: createAugmentedTypedArray,
  createCubeBufferInfo: createCubeBufferInfo,
  createCubeBuffers: createCubeBuffers,
  createCubeVertices: createCubeVertices,
  createPlaneBufferInfo: createPlaneBufferInfo,
  createPlaneBuffers: createPlaneBuffers,
  createPlaneVertices: createPlaneVertices,
  createSphereBufferInfo: createSphereBufferInfo,
  createSphereBuffers: createSphereBuffers,
  createSphereVertices: createSphereVertices,
  createTruncatedConeBufferInfo: createTruncatedConeBufferInfo,
  createTruncatedConeBuffers: createTruncatedConeBuffers,
  createTruncatedConeVertices: createTruncatedConeVertices,
  createXYQuadBufferInfo: createXYQuadBufferInfo,
  createXYQuadBuffers: createXYQuadBuffers,
  createXYQuadVertices: createXYQuadVertices,
  createCresentBufferInfo: createCresentBufferInfo,
  createCresentBuffers: createCresentBuffers,
  createCresentVertices: createCresentVertices,
  createCrescentBufferInfo: createCrescentBufferInfo,
  createCrescentBuffers: createCrescentBuffers,
  createCrescentVertices: createCrescentVertices,
  createCylinderBufferInfo: createCylinderBufferInfo,
  createCylinderBuffers: createCylinderBuffers,
  createCylinderVertices: createCylinderVertices,
  createTorusBufferInfo: createTorusBufferInfo,
  createTorusBuffers: createTorusBuffers,
  createTorusVertices: createTorusVertices,
  createDiscBufferInfo: createDiscBufferInfo,
  createDiscBuffers: createDiscBuffers,
  createDiscVertices: createDiscVertices,
  deindexVertices: deindexVertices,
  flattenNormals: flattenNormals,
  makeRandomVertexColors: makeRandomVertexColors,
  reorientDirections: reorientDirections,
  reorientNormals: reorientNormals,
  reorientPositions: reorientPositions,
  reorientVertices: reorientVertices,
  concatVertices: concatVertices,
  duplicateVertices: duplicateVertices
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * Gets the gl version as a number
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {number} version of gl
 * @private
 */
//function getVersionAsNumber(gl) {
//  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
//}

/**
 * Check if context is WebGL 2.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 2.0
 * @memberOf module:twgl
 */
function isWebGL2(gl) {
  // This is the correct check but it's slow
  //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
  // This might also be the correct check but I'm assuming it's slow-ish
  // return gl instanceof WebGL2RenderingContext;
  return !!gl.texStorage2D;
}

/**
 * Check if context is WebGL 1.0
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @return {bool} true if it's WebGL 1.0
 * @memberOf module:twgl
 */
function isWebGL1(gl) {
  // This is the correct check but it's slow
  // const version = getVersionAsNumber(gl);
  // return version <= 1.0 && version > 0.0;  // because as of 2016/5 Edge returns 0.96
  // This might also be the correct check but I'm assuming it's slow-ish
  // return gl instanceof WebGLRenderingContext;
  return !gl.texStorage2D;
}

/**
 * Gets a string for WebGL enum
 *
 * Note: Several enums are the same. Without more
 * context (which function) it's impossible to always
 * give the correct enum. As it is, for matching values
 * it gives all enums. Checking the WebGL2RenderingContext
 * that means
 *
 *      0     = ZERO | POINT | NONE | NO_ERROR
 *      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
 *      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
 *      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
 *      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
 *      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
 *
 * It's also not useful for bits really unless you pass in individual bits.
 * In other words
 *
 *     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
 *     twgl.glEnumToString(gl, bits);  // not going to work
 *
 * Note that some enums only exist on extensions. If you
 * want them to show up you need to pass the extension at least
 * once. For example
 *
 *     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
 *     if (ext) {
 *        twgl.glEnumToString(ext, 0);  // just prime the function
 *
 *        ..later..
 *
 *        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
 *        console.log(twgl.glEnumToString(gl, internalFormat));
 *
 * Notice I didn't have to pass the extension the second time. This means
 * you can have place that generically gets an enum for texture formats for example.
 * and as long as you primed the function with the extensions
 *
 * If you're using `twgl.addExtensionsToContext` to enable your extensions
 * then twgl will automatically get the extension's enums.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
 * @param {number} value the value of the enum you want to look up.
 * @return {string} enum string or hex value
 * @memberOf module:twgl
 * @function glEnumToString
 */
const glEnumToString = (function() {
  const haveEnumsForType = {};
  const enums = {};

  function addEnums(gl) {
    const type = gl.constructor.name;
    if (!haveEnumsForType[type]) {
      for (const key in gl) {
        if (typeof gl[key] === 'number') {
          const existing = enums[gl[key]];
          enums[gl[key]] = existing ? `${existing} | ${key}` : key;
        }
      }
      haveEnumsForType[type] = true;
    }
  }

  return function glEnumToString(gl, value) {
    addEnums(gl);
    return enums[value] || (typeof value === 'number' ? `0x${value.toString(16)}` : value);
  };
}());

var utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  glEnumToString: glEnumToString,
  isWebGL1: isWebGL1,
  isWebGL2: isWebGL2
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * Low level texture related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.textures` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/textures
 */

// make sure we don't see a global gl
const gl = undefined;  /* eslint-disable-line */
const defaults$1 = {
  textureColor: new Uint8Array([128, 192, 255, 255]),
  textureOptions: {},
  crossOrigin: undefined,
};
const isArrayBuffer = isArrayBuffer$1;

// Should we make this on demand?
const getShared2DContext = function() {
  let s_ctx;
  return function getShared2DContext() {
    s_ctx = s_ctx ||
        ((typeof document !== 'undefined' && document.createElement)
          ? document.createElement("canvas").getContext("2d")
          : null);
    return s_ctx;
  };
}();

// NOTE: Chrome supports 2D canvas in a Worker (behind flag as of v64 but
//       not only does Firefox NOT support it but Firefox freezes immediately
//       if you try to create one instead of just returning null and continuing.
//  : (global.OffscreenCanvas && (new global.OffscreenCanvas(1, 1)).getContext("2d"));  // OffscreenCanvas may not support 2d

// NOTE: We can maybe remove some of the need for the 2d canvas. In WebGL2
// we can use the various unpack settings. Otherwise we could try using
// the ability of an ImageBitmap to be cut. Unfortunately cutting an ImageBitmap
// is async and the current TWGL code expects a non-Async result though that
// might not be a problem. ImageBitmap though is not available in Edge or Safari
// as of 2018-01-02

/* PixelFormat */
const ALPHA                          = 0x1906;
const RGB                            = 0x1907;
const RGBA$1                           = 0x1908;
const LUMINANCE                      = 0x1909;
const LUMINANCE_ALPHA                = 0x190A;
const DEPTH_COMPONENT$1                = 0x1902;
const DEPTH_STENCIL$1                  = 0x84F9;

/* TextureWrapMode */
// const REPEAT                         = 0x2901;
// const MIRRORED_REPEAT                = 0x8370;
const CLAMP_TO_EDGE$1                  = 0x812f;

/* TextureMagFilter */
const NEAREST                        = 0x2600;
const LINEAR$1                         = 0x2601;
const NEAREST_MIPMAP_LINEAR          = 0x2702;

/* TextureMinFilter */
// const NEAREST_MIPMAP_NEAREST         = 0x2700;
// const LINEAR_MIPMAP_NEAREST          = 0x2701;
// const NEAREST_MIPMAP_LINEAR          = 0x2702;
// const LINEAR_MIPMAP_LINEAR           = 0x2703;

/* Texture Target */
const TEXTURE_2D$2                     = 0x0de1;
const TEXTURE_CUBE_MAP$1               = 0x8513;
const TEXTURE_3D$1                     = 0x806f;
const TEXTURE_2D_ARRAY$1               = 0x8c1a;

/* Cubemap Targets */
const TEXTURE_CUBE_MAP_POSITIVE_X    = 0x8515;
const TEXTURE_CUBE_MAP_NEGATIVE_X    = 0x8516;
const TEXTURE_CUBE_MAP_POSITIVE_Y    = 0x8517;
const TEXTURE_CUBE_MAP_NEGATIVE_Y    = 0x8518;
const TEXTURE_CUBE_MAP_POSITIVE_Z    = 0x8519;
const TEXTURE_CUBE_MAP_NEGATIVE_Z    = 0x851a;

/* Texture Parameters */
const TEXTURE_MIN_FILTER             = 0x2801;
const TEXTURE_MAG_FILTER             = 0x2800;
const TEXTURE_WRAP_S                 = 0x2802;
const TEXTURE_WRAP_T                 = 0x2803;
const TEXTURE_WRAP_R                 = 0x8072;
const TEXTURE_MIN_LOD                = 0x813a;
const TEXTURE_MAX_LOD                = 0x813b;
const TEXTURE_BASE_LEVEL             = 0x813c;
const TEXTURE_MAX_LEVEL              = 0x813d;
const TEXTURE_COMPARE_MODE           = 0x884C;
const TEXTURE_COMPARE_FUNC           = 0x884D;

/* Pixel store */
const UNPACK_ALIGNMENT                   = 0x0cf5;
const UNPACK_ROW_LENGTH                  = 0x0cf2;
const UNPACK_IMAGE_HEIGHT                = 0x806e;
const UNPACK_SKIP_PIXELS                 = 0x0cf4;
const UNPACK_SKIP_ROWS                   = 0x0cf3;
const UNPACK_SKIP_IMAGES                 = 0x806d;
const UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
const UNPACK_PREMULTIPLY_ALPHA_WEBGL     = 0x9241;
const UNPACK_FLIP_Y_WEBGL                = 0x9240;

const R8                           = 0x8229;
const R8_SNORM                     = 0x8F94;
const R16F                         = 0x822D;
const R32F                         = 0x822E;
const R8UI                         = 0x8232;
const R8I                          = 0x8231;
const RG16UI                       = 0x823A;
const RG16I                        = 0x8239;
const RG32UI                       = 0x823C;
const RG32I                        = 0x823B;
const RG8                          = 0x822B;
const RG8_SNORM                    = 0x8F95;
const RG16F                        = 0x822F;
const RG32F                        = 0x8230;
const RG8UI                        = 0x8238;
const RG8I                         = 0x8237;
const R16UI                        = 0x8234;
const R16I                         = 0x8233;
const R32UI                        = 0x8236;
const R32I                         = 0x8235;
const RGB8                         = 0x8051;
const SRGB8                        = 0x8C41;
const RGB565$1                       = 0x8D62;
const RGB8_SNORM                   = 0x8F96;
const R11F_G11F_B10F               = 0x8C3A;
const RGB9_E5                      = 0x8C3D;
const RGB16F                       = 0x881B;
const RGB32F                       = 0x8815;
const RGB8UI                       = 0x8D7D;
const RGB8I                        = 0x8D8F;
const RGB16UI                      = 0x8D77;
const RGB16I                       = 0x8D89;
const RGB32UI                      = 0x8D71;
const RGB32I                       = 0x8D83;
const RGBA8                        = 0x8058;
const SRGB8_ALPHA8                 = 0x8C43;
const RGBA8_SNORM                  = 0x8F97;
const RGB5_A1$1                      = 0x8057;
const RGBA4$1                        = 0x8056;
const RGB10_A2                     = 0x8059;
const RGBA16F                      = 0x881A;
const RGBA32F                      = 0x8814;
const RGBA8UI                      = 0x8D7C;
const RGBA8I                       = 0x8D8E;
const RGB10_A2UI                   = 0x906F;
const RGBA16UI                     = 0x8D76;
const RGBA16I                      = 0x8D88;
const RGBA32I                      = 0x8D82;
const RGBA32UI                     = 0x8D70;

const DEPTH_COMPONENT16$1            = 0x81A5;
const DEPTH_COMPONENT24$1            = 0x81A6;
const DEPTH_COMPONENT32F$1           = 0x8CAC;
const DEPTH32F_STENCIL8$1            = 0x8CAD;
const DEPTH24_STENCIL8$1             = 0x88F0;

/* DataType */
const BYTE                         = 0x1400;
const UNSIGNED_BYTE$1                = 0x1401;
const SHORT                        = 0x1402;
const UNSIGNED_SHORT$1               = 0x1403;
const INT$1                          = 0x1404;
const UNSIGNED_INT$1                 = 0x1405;
const FLOAT$1                        = 0x1406;
const UNSIGNED_SHORT_4_4_4_4       = 0x8033;
const UNSIGNED_SHORT_5_5_5_1       = 0x8034;
const UNSIGNED_SHORT_5_6_5         = 0x8363;
const HALF_FLOAT                   = 0x140B;
const HALF_FLOAT_OES               = 0x8D61;  // Thanks Khronos for making this different >:(
const UNSIGNED_INT_2_10_10_10_REV  = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV = 0x8C3B;
const UNSIGNED_INT_5_9_9_9_REV     = 0x8C3E;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8DAD;
const UNSIGNED_INT_24_8            = 0x84FA;

const RG                           = 0x8227;
const RG_INTEGER                   = 0x8228;
const RED                          = 0x1903;
const RED_INTEGER                  = 0x8D94;
const RGB_INTEGER                  = 0x8D98;
const RGBA_INTEGER                 = 0x8D99;

/* Compressed Texture Formats */
// s3tc
const COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
const COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
const COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
const COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;
// s3tc_srgb
const COMPRESSED_SRGB_S3TC_DXT1_EXT       = 0x8C4C;
const COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 0x8C4D;
const COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 0x8C4E;
const COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 0x8C4F;
// etc
const COMPRESSED_RGB_ETC1_WEBGL    = 0x8D64;
const COMPRESSED_R11_EAC = 0x9270;
const COMPRESSED_SIGNED_R11_EAC = 0x9271;
const COMPRESSED_RG11_EAC = 0x9272;
const COMPRESSED_SIGNED_RG11_EAC = 0x9273;
const COMPRESSED_RGB8_ETC2 = 0x9274;
const COMPRESSED_SRGB8_ETC2 = 0x9275;
const COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 0x9276;
const COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 0x9277;
const COMPRESSED_RGBA8_ETC2_EAC = 0x9278;
const COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 0x9279;
// pvrtc
const COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
const COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;
const COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;
const COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03;
// astc
const COMPRESSED_RGBA_ASTC_4x4_KHR = 0x93B0;
const COMPRESSED_RGBA_ASTC_5x4_KHR = 0x93B1;
const COMPRESSED_RGBA_ASTC_5x5_KHR = 0x93B2;
const COMPRESSED_RGBA_ASTC_6x5_KHR = 0x93B3;
const COMPRESSED_RGBA_ASTC_6x6_KHR = 0x93B4;
const COMPRESSED_RGBA_ASTC_8x5_KHR = 0x93B5;
const COMPRESSED_RGBA_ASTC_8x6_KHR = 0x93B6;
const COMPRESSED_RGBA_ASTC_8x8_KHR = 0x93B7;
const COMPRESSED_RGBA_ASTC_10x5_KHR = 0x93B8;
const COMPRESSED_RGBA_ASTC_10x6_KHR = 0x93B9;
const COMPRESSED_RGBA_ASTC_10x8_KHR = 0x93BA;
const COMPRESSED_RGBA_ASTC_10x10_KHR = 0x93BB;
const COMPRESSED_RGBA_ASTC_12x10_KHR = 0x93BC;
const COMPRESSED_RGBA_ASTC_12x12_KHR = 0x93BD;
const COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR = 0x93D0;
const COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR = 0x93D1;
const COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR = 0x93D2;
const COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR = 0x93D3;
const COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR = 0x93D4;
const COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR = 0x93D5;
const COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR = 0x93D6;
const COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR = 0x93D7;
const COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR = 0x93D8;
const COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR = 0x93D9;
const COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR = 0x93DA;
const COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR = 0x93DB;
const COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR = 0x93DC;
const COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR = 0x93DD;
// bptc
const COMPRESSED_RGBA_BPTC_UNORM_EXT = 0x8E8C;
const COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT = 0x8E8D;
const COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT = 0x8E8E;
const COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT = 0x8E8F;
// rgtc
const COMPRESSED_RED_RGTC1_EXT = 0x8DBB;
const COMPRESSED_SIGNED_RED_RGTC1_EXT = 0x8DBC;
const COMPRESSED_RED_GREEN_RGTC2_EXT = 0x8DBD;
const COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT = 0x8DBE;

const formatInfo = {};
{
  // NOTE: this is named `numColorComponents` vs `numComponents` so we can let Uglify mangle
  // the name.
  const f = formatInfo;
  f[ALPHA]           = { numColorComponents: 1, };
  f[LUMINANCE]       = { numColorComponents: 1, };
  f[LUMINANCE_ALPHA] = { numColorComponents: 2, };
  f[RGB]             = { numColorComponents: 3, };
  f[RGBA$1]            = { numColorComponents: 4, };
  f[RED]             = { numColorComponents: 1, };
  f[RED_INTEGER]     = { numColorComponents: 1, };
  f[RG]              = { numColorComponents: 2, };
  f[RG_INTEGER]      = { numColorComponents: 2, };
  f[RGB]             = { numColorComponents: 3, };
  f[RGB_INTEGER]     = { numColorComponents: 3, };
  f[RGBA$1]            = { numColorComponents: 4, };
  f[RGBA_INTEGER]    = { numColorComponents: 4, };
  f[DEPTH_COMPONENT$1] = { numColorComponents: 1, };
  f[DEPTH_STENCIL$1]   = { numColorComponents: 2, };
}

/**
 * @typedef {Object} BlockInfo
 * @property {number} bytes number of bytes in the block
 * @property {number} width width of the block
 * @property {number} height height of the block
 * @private
 */

/**
 * @typedef {Object} TextureFormatDetails
 * @property {number} textureFormat format to pass texImage2D and similar functions.
 * @property {boolean} colorRenderable true if you can render to this format of texture.
 * @property {boolean} textureFilterable true if you can filter the texture, false if you can ony use `NEAREST`.
 * @property {number[]} type Array of possible types you can pass to texImage2D and similar function
 * @property {Object.<number,number>} [bytesPerElementMap] A map of types to bytes per element
 * @property {BlockInfo} [block] block size, only for compressed textures
 * @private
 */

let s_textureInternalFormatInfo;
function getTextureInternalFormatInfo(internalFormat) {
  if (!s_textureInternalFormatInfo) {
    // NOTE: these properties need unique names so we can let Uglify mangle the name.
    const t = {};
    // unsized formats
    t[ALPHA]              = { textureFormat: ALPHA,           colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1, 2, 2, 4],        type: [UNSIGNED_BYTE$1, HALF_FLOAT, HALF_FLOAT_OES, FLOAT$1], };
    t[LUMINANCE]          = { textureFormat: LUMINANCE,       colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1, 2, 2, 4],        type: [UNSIGNED_BYTE$1, HALF_FLOAT, HALF_FLOAT_OES, FLOAT$1], };
    t[LUMINANCE_ALPHA]    = { textureFormat: LUMINANCE_ALPHA, colorRenderable: true,  textureFilterable: true,  bytesPerElement: [2, 4, 4, 8],        type: [UNSIGNED_BYTE$1, HALF_FLOAT, HALF_FLOAT_OES, FLOAT$1], };
    t[RGB]                = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3, 6, 6, 12, 2],    type: [UNSIGNED_BYTE$1, HALF_FLOAT, HALF_FLOAT_OES, FLOAT$1, UNSIGNED_SHORT_5_6_5], };
    t[RGBA$1]               = { textureFormat: RGBA$1,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 8, 8, 16, 2, 2], type: [UNSIGNED_BYTE$1, HALF_FLOAT, HALF_FLOAT_OES, FLOAT$1, UNSIGNED_SHORT_4_4_4_4, UNSIGNED_SHORT_5_5_5_1], };
    t[DEPTH_COMPONENT$1]    = { textureFormat: DEPTH_COMPONENT$1, colorRenderable: true,  textureFilterable: false, bytesPerElement: [2, 4],              type: [UNSIGNED_INT$1, UNSIGNED_SHORT$1], };

    // sized formats
    t[R8]                 = { textureFormat: RED,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [1],        type: [UNSIGNED_BYTE$1], };
    t[R8_SNORM]           = { textureFormat: RED,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [1],        type: [BYTE], };
    t[R16F]               = { textureFormat: RED,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [4, 2],     type: [FLOAT$1, HALF_FLOAT], };
    t[R32F]               = { textureFormat: RED,             colorRenderable: false, textureFilterable: false, bytesPerElement: [4],        type: [FLOAT$1], };
    t[R8UI]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [1],        type: [UNSIGNED_BYTE$1], };
    t[R8I]                = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [1],        type: [BYTE], };
    t[R16UI]              = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [UNSIGNED_SHORT$1], };
    t[R16I]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [SHORT], };
    t[R32UI]              = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT$1], };
    t[R32I]               = { textureFormat: RED_INTEGER,     colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [INT$1], };
    t[RG8]                = { textureFormat: RG,              colorRenderable: true,  textureFilterable: true,  bytesPerElement: [2],        type: [UNSIGNED_BYTE$1], };
    t[RG8_SNORM]          = { textureFormat: RG,              colorRenderable: false, textureFilterable: true,  bytesPerElement: [2],        type: [BYTE], };
    t[RG16F]              = { textureFormat: RG,              colorRenderable: false, textureFilterable: true,  bytesPerElement: [8, 4],     type: [FLOAT$1, HALF_FLOAT], };
    t[RG32F]              = { textureFormat: RG,              colorRenderable: false, textureFilterable: false, bytesPerElement: [8],        type: [FLOAT$1], };
    t[RG8UI]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [UNSIGNED_BYTE$1], };
    t[RG8I]               = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [2],        type: [BYTE], };
    t[RG16UI]             = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_SHORT$1], };
    t[RG16I]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [SHORT], };
    t[RG32UI]             = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [UNSIGNED_INT$1], };
    t[RG32I]              = { textureFormat: RG_INTEGER,      colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [INT$1], };
    t[RGB8]               = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3],        type: [UNSIGNED_BYTE$1], };
    t[SRGB8]              = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [3],        type: [UNSIGNED_BYTE$1], };
    t[RGB565$1]             = { textureFormat: RGB,             colorRenderable: true,  textureFilterable: true,  bytesPerElement: [3, 2],     type: [UNSIGNED_BYTE$1, UNSIGNED_SHORT_5_6_5], };
    t[RGB8_SNORM]         = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [3],        type: [BYTE], };
    t[R11F_G11F_B10F]     = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6, 4], type: [FLOAT$1, HALF_FLOAT, UNSIGNED_INT_10F_11F_11F_REV], };
    t[RGB9_E5]            = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6, 4], type: [FLOAT$1, HALF_FLOAT, UNSIGNED_INT_5_9_9_9_REV], };
    t[RGB16F]             = { textureFormat: RGB,             colorRenderable: false, textureFilterable: true,  bytesPerElement: [12, 6],    type: [FLOAT$1, HALF_FLOAT], };
    t[RGB32F]             = { textureFormat: RGB,             colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [FLOAT$1], };
    t[RGB8UI]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [3],        type: [UNSIGNED_BYTE$1], };
    t[RGB8I]              = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [3],        type: [BYTE], };
    t[RGB16UI]            = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [6],        type: [UNSIGNED_SHORT$1], };
    t[RGB16I]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [6],        type: [SHORT], };
    t[RGB32UI]            = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [UNSIGNED_INT$1], };
    t[RGB32I]             = { textureFormat: RGB_INTEGER,     colorRenderable: false, textureFilterable: false, bytesPerElement: [12],       type: [INT$1], };
    t[RGBA8]              = { textureFormat: RGBA$1,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_BYTE$1], };
    t[SRGB8_ALPHA8]       = { textureFormat: RGBA$1,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_BYTE$1], };
    t[RGBA8_SNORM]        = { textureFormat: RGBA$1,            colorRenderable: false, textureFilterable: true,  bytesPerElement: [4],        type: [BYTE], };
    t[RGB5_A1$1]            = { textureFormat: RGBA$1,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 2, 4],  type: [UNSIGNED_BYTE$1, UNSIGNED_SHORT_5_5_5_1, UNSIGNED_INT_2_10_10_10_REV], };
    t[RGBA4$1]              = { textureFormat: RGBA$1,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4, 2],     type: [UNSIGNED_BYTE$1, UNSIGNED_SHORT_4_4_4_4], };
    t[RGB10_A2]           = { textureFormat: RGBA$1,            colorRenderable: true,  textureFilterable: true,  bytesPerElement: [4],        type: [UNSIGNED_INT_2_10_10_10_REV], };
    t[RGBA16F]            = { textureFormat: RGBA$1,            colorRenderable: false, textureFilterable: true,  bytesPerElement: [16, 8],    type: [FLOAT$1, HALF_FLOAT], };
    t[RGBA32F]            = { textureFormat: RGBA$1,            colorRenderable: false, textureFilterable: false, bytesPerElement: [16],       type: [FLOAT$1], };
    t[RGBA8UI]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_BYTE$1], };
    t[RGBA8I]             = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [BYTE], };
    t[RGB10_A2UI]         = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT_2_10_10_10_REV], };
    t[RGBA16UI]           = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [UNSIGNED_SHORT$1], };
    t[RGBA16I]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [8],        type: [SHORT], };
    t[RGBA32I]            = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [16],       type: [INT$1], };
    t[RGBA32UI]           = { textureFormat: RGBA_INTEGER,    colorRenderable: true,  textureFilterable: false, bytesPerElement: [16],       type: [UNSIGNED_INT$1], };
    // Sized Internal
    t[DEPTH_COMPONENT16$1]  = { textureFormat: DEPTH_COMPONENT$1, colorRenderable: true,  textureFilterable: false, bytesPerElement: [2, 4],     type: [UNSIGNED_SHORT$1, UNSIGNED_INT$1], };
    t[DEPTH_COMPONENT24$1]  = { textureFormat: DEPTH_COMPONENT$1, colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT$1], };
    t[DEPTH_COMPONENT32F$1] = { textureFormat: DEPTH_COMPONENT$1, colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [FLOAT$1], };
    t[DEPTH24_STENCIL8$1]   = { textureFormat: DEPTH_STENCIL$1,   colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [UNSIGNED_INT_24_8], };
    t[DEPTH32F_STENCIL8$1]  = { textureFormat: DEPTH_STENCIL$1,   colorRenderable: true,  textureFilterable: false, bytesPerElement: [4],        type: [FLOAT_32_UNSIGNED_INT_24_8_REV], };

    Object.keys(t).forEach(function(internalFormat) {
      const info = t[internalFormat];
      info.bytesPerElementMap = {};
      info.bytesPerElement.forEach(function(bytesPerElement, ndx) {
        const type = info.type[ndx];
        info.bytesPerElementMap[type] = bytesPerElement;
      });
    });

    const block8_4_4 = { bytes:  8, width: 4, height: 4 };
    const block16_4_4 = { bytes: 16, width: 4, height: 4 };

    // compressed texture formats
    // s3tc:https://registry.khronos.org/OpenGL/extensions/EXT/EXT_texture_compression_s3tc.txt
    t[COMPRESSED_RGB_S3TC_DXT1_EXT]  = { textureFormat: COMPRESSED_RGB_S3TC_DXT1_EXT,  colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_RGBA_S3TC_DXT1_EXT] = { textureFormat: COMPRESSED_RGBA_S3TC_DXT1_EXT, colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_RGBA_S3TC_DXT3_EXT] = { textureFormat: COMPRESSED_RGBA_S3TC_DXT3_EXT, colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_RGBA_S3TC_DXT5_EXT] = { textureFormat: COMPRESSED_RGBA_S3TC_DXT5_EXT, colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    // https://registry.khronos.org/OpenGL/extensions/EXT/EXT_texture_compression_s3tc_srgb.txt
    t[COMPRESSED_SRGB_S3TC_DXT1_EXT]       = { textureFormat: COMPRESSED_SRGB_S3TC_DXT1_EXT,       colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = { textureFormat: COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT, colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = { textureFormat: COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT, colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = { textureFormat: COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT, colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    // https://registry.khronos.org/OpenGL/extensions/OES/OES_compressed_ETC1_RGB8_texture.txt
    t[COMPRESSED_RGB_ETC1_WEBGL]                 = { textureFormat: COMPRESSED_RGB_ETC1_WEBGL,                 colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_R11_EAC]                        = { textureFormat: COMPRESSED_R11_EAC,                        colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_SIGNED_R11_EAC]                 = { textureFormat: COMPRESSED_SIGNED_R11_EAC,                 colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_RG11_EAC]                       = { textureFormat: COMPRESSED_RG11_EAC,                       colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_SIGNED_RG11_EAC]                = { textureFormat: COMPRESSED_SIGNED_RG11_EAC,                colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_RGB8_ETC2]                      = { textureFormat: COMPRESSED_RGB8_ETC2,                      colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_SRGB8_ETC2]                     = { textureFormat: COMPRESSED_SRGB8_ETC2,                     colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2]  = { textureFormat: COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2,  colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = { textureFormat: COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2, colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_RGBA8_ETC2_EAC]                 = { textureFormat: COMPRESSED_RGBA8_ETC2_EAC,                 colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_SRGB8_ALPHA8_ETC2_EAC]          = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ETC2_EAC,          colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    // https://registry.khronos.org/OpenGL/extensions/IMG/IMG_texture_compression_pvrtc.txt
    t[COMPRESSED_RGB_PVRTC_4BPPV1_IMG]  = { textureFormat: COMPRESSED_RGB_PVRTC_4BPPV1_IMG,  colorRenderable: false, textureFilterable: true, block: { bytes: 32, width:  8, height:  8, } };
    t[COMPRESSED_RGB_PVRTC_2BPPV1_IMG]  = { textureFormat: COMPRESSED_RGB_PVRTC_2BPPV1_IMG,  colorRenderable: false, textureFilterable: true, block: { bytes: 32, width: 16, height:  8, } };
    t[COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = { textureFormat: COMPRESSED_RGBA_PVRTC_4BPPV1_IMG, colorRenderable: false, textureFilterable: true, block: { bytes: 32, width:  8, height:  8, } };
    t[COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = { textureFormat: COMPRESSED_RGBA_PVRTC_2BPPV1_IMG, colorRenderable: false, textureFilterable: true, block: { bytes: 32, width: 16, height:  8, } };
    // https://registry.khronos.org/OpenGL/extensions/KHR/KHR_texture_compression_astc_hdr.txt
    t[COMPRESSED_RGBA_ASTC_4x4_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_4x4_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  4, height:  4, } };
    t[COMPRESSED_RGBA_ASTC_5x4_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_5x4_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  5, height:  4, } };
    t[COMPRESSED_RGBA_ASTC_5x5_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_5x5_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  5, height:  5, } };
    t[COMPRESSED_RGBA_ASTC_6x5_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_6x5_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  6, height:  5, } };
    t[COMPRESSED_RGBA_ASTC_6x6_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_6x6_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  6, height:  6, } };
    t[COMPRESSED_RGBA_ASTC_8x5_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_8x5_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  8, height:  5, } };
    t[COMPRESSED_RGBA_ASTC_8x6_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_8x6_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  8, height:  6, } };
    t[COMPRESSED_RGBA_ASTC_8x8_KHR]           = { textureFormat: COMPRESSED_RGBA_ASTC_8x8_KHR,           colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  8, height:  8, } };
    t[COMPRESSED_RGBA_ASTC_10x5_KHR]          = { textureFormat: COMPRESSED_RGBA_ASTC_10x5_KHR,          colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height:  5, } };
    t[COMPRESSED_RGBA_ASTC_10x6_KHR]          = { textureFormat: COMPRESSED_RGBA_ASTC_10x6_KHR,          colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height:  6, } };
    t[COMPRESSED_RGBA_ASTC_10x8_KHR]          = { textureFormat: COMPRESSED_RGBA_ASTC_10x8_KHR,          colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height:  8, } };
    t[COMPRESSED_RGBA_ASTC_10x10_KHR]         = { textureFormat: COMPRESSED_RGBA_ASTC_10x10_KHR,         colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height: 10, } };
    t[COMPRESSED_RGBA_ASTC_12x10_KHR]         = { textureFormat: COMPRESSED_RGBA_ASTC_12x10_KHR,         colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 12, height: 10, } };
    t[COMPRESSED_RGBA_ASTC_12x12_KHR]         = { textureFormat: COMPRESSED_RGBA_ASTC_12x12_KHR,         colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 12, height: 12, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  4, height:  4, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  5, height:  4, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  5, height:  5, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  6, height:  5, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  6, height:  6, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  8, height:  5, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  8, height:  6, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR]   = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR,   colorRenderable: false, textureFilterable: true, block: { bytes: 16, width:  8, height:  8, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR]  = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR,  colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height:  5, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR]  = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR,  colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height:  6, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR]  = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR,  colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height:  8, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR] = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR, colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 10, height: 10, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR] = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR, colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 12, height: 10, } };
    t[COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR] = { textureFormat: COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR, colorRenderable: false, textureFilterable: true, block: { bytes: 16, width: 12, height: 12, } };
    // https://registry.khronos.org/OpenGL/extensions/EXT/EXT_texture_compression_bptc.txt
    t[COMPRESSED_RGBA_BPTC_UNORM_EXT]         = { textureFormat: COMPRESSED_RGBA_BPTC_UNORM_EXT,         colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT]   = { textureFormat: COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT,   colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT]   = { textureFormat: COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT,   colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    t[COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT] = { textureFormat: COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT, colorRenderable: false, textureFilterable: true, block: block16_4_4 };
    // https://registry.khronos.org/OpenGL/extensions/EXT/EXT_texture_compression_rgtc.txt
    t[COMPRESSED_RED_RGTC1_EXT]              = { textureFormat: COMPRESSED_RED_RGTC1_EXT,              colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_SIGNED_RED_RGTC1_EXT]       = { textureFormat: COMPRESSED_SIGNED_RED_RGTC1_EXT,       colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_RED_GREEN_RGTC2_EXT]        = { textureFormat: COMPRESSED_RED_GREEN_RGTC2_EXT,        colorRenderable: false, textureFilterable: true, block: block8_4_4 };
    t[COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT] = { textureFormat: COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT, colorRenderable: false, textureFilterable: true, block: block8_4_4 };

    s_textureInternalFormatInfo = t;
  }
  const info = s_textureInternalFormatInfo[internalFormat];
  if (!info) {
    throw new Error("unknown internal format");
  }
  return info;
}

/**
 * Gets the number of bytes per element for a given internalFormat / type
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @param {number} type The type parameter for texImage2D etc..
 * @return {number} the number of bytes per element for the given internalFormat, type combo
 * @memberOf module:twgl/textures
 */
function getBytesPerElementForInternalFormat(internalFormat, type) {
  const info = getTextureInternalFormatInfo(internalFormat);
  const bytesPerElement = info.bytesPerElementMap[type];
  if (bytesPerElement === undefined) {
    throw new Error("type not supported for internal format");
  }
  return bytesPerElement;
}

/**
 * Info related to a specific texture internalFormat as returned
 * from {@link module:twgl/textures.getFormatAndTypeForInternalFormat}.
 *
 * @typedef {Object} TextureFormatInfo
 * @property {number} format Format to pass to texImage2D and related functions
 * @property {number} type Type to pass to texImage2D and related functions
 * @memberOf module:twgl/textures
 */

/**
 * Gets the format and type for a given internalFormat
 *
 * @param {number} internalFormat The internal format
 * @return {module:twgl/textures.TextureFormatInfo} the corresponding format and type,
 * @memberOf module:twgl/textures
 */
function getFormatAndTypeForInternalFormat(internalFormat) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (!info) {
    throw new Error("unknown internal format");
  }
  return {
    format: info.textureFormat,
    type: info.type?.[0] ?? UNSIGNED_BYTE$1,
  };
}

/**
 * @param {number} internalFormat The internal format
 * @returns if the internalFormat is a compressed format
 * @private
 */
function isCompressedInternalFormat(internalFormat) {
  const info = getTextureInternalFormatInfo(internalFormat);
  return !!info.block;
}

/**
 * Gets the width, height, and bytes per block for the given internal format
 * @param {number} internalFormat
 * @param {number} type
 * @private
 */
function getBlockInfoForInternalFormat(internalFormat, type) {
  const info = getTextureInternalFormatInfo(internalFormat);
  if (info.block) {
    return { blockWidth: info.block.width, blockHeight: info.block.height, bytesPerBlock: info.block.bytes };
  }
  const bytesPerBlock = getBytesPerElementForInternalFormat(internalFormat, type);
  return { blockWidth: 1, blockHeight: 1, bytesPerBlock };
}

/**
 * Returns true if value is power of 2
 * @param {number} value number to check.
 * @return true if value is power of 2
 * @private
 */
function isPowerOf2(value) {
  return (value & (value - 1)) === 0;
}

/**
 * Gets whether or not we can generate mips for the given
 * internal format.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number} width The width parameter from texImage2D etc..
 * @param {number} height The height parameter from texImage2D etc..
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */
function canGenerateMipmap(gl, width, height, internalFormat) {
  if (!isWebGL2(gl)) {
    return isPowerOf2(width) && isPowerOf2(height);
  }
  const info = getTextureInternalFormatInfo(internalFormat);
  return info.colorRenderable && info.textureFilterable;
}

/**
 * Gets whether or not we can generate mips for the given format
 * @param {number} internalFormat The internalFormat parameter from texImage2D etc..
 * @return {boolean} true if we can generate mips
 * @memberOf module:twgl/textures
 */
function canFilter(internalFormat) {
  const info = getTextureInternalFormatInfo(internalFormat);
  return info.textureFilterable;
}

/**
 * Gets the number of components for a given image format.
 * @param {number} format the format.
 * @return {number} the number of components for the format.
 * @memberOf module:twgl/textures
 */
function getNumComponentsForFormat(format) {
  const info = formatInfo[format];
  return info.numColorComponents;
}

/**
 * Gets the texture type for a given array type.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @return {number} the gl texture type
 * @private
 */
function getTextureTypeForArrayType(gl, src, defaultType) {
  if (isArrayBuffer(src)) {
    return getGLTypeForTypedArray(src);
  }
  return defaultType || UNSIGNED_BYTE$1;
}

function guessDimensions(gl, target, width, height, numElements) {
  if (numElements % 1 !== 0) {
    throw new Error("can't guess dimensions");
  }
  if (!width && !height) {
    const size = Math.sqrt(numElements / (target === TEXTURE_CUBE_MAP$1 ? 6 : 1));
    if (size % 1 === 0) {
      width = size;
      height = size;
    } else {
      width = numElements;
      height = 1;
    }
  } else if (!height) {
    height = numElements / width;
    if (height % 1) {
      throw new Error("can't guess dimensions");
    }
  } else if (!width) {
    width = numElements / height;
    if (width % 1) {
      throw new Error("can't guess dimensions");
    }
  }
  return {
    width: width,
    height: height,
  };
}

/**
 * Sets the default texture color.
 *
 * The default texture color is used when loading textures from
 * urls. Because the URL will be loaded async we'd like to be
 * able to use the texture immediately. By putting a 1x1 pixel
 * color in the texture we can start using the texture before
 * the URL has loaded.
 *
 * @param {number[]} color Array of 4 values in the range 0 to 1
 * @deprecated see {@link module:twgl.setDefaults}
 * @memberOf module:twgl/textures
 */
function setDefaultTextureColor(color) {
  defaults$1.textureColor = new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
}

function setDefaults$1(newDefaults) {
  copyExistingProperties(newDefaults, defaults$1);
  if (newDefaults.textureColor) {
    setDefaultTextureColor(newDefaults.textureColor);
  }
}

/**
 * A function to generate the source for a texture.
 * @callback TextureFunc
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options the texture options
 * @return {*} Returns any of the things documented for `src` for {@link module:twgl.TextureOptions}.
 * @memberOf module:twgl
 */

/**
 * Texture options passed to most texture functions. Each function will use whatever options
 * are appropriate for its needs. This lets you pass the same options to all functions.
 *
 * Note: A `TexImageSource` is defined in the WebGL spec as a `HTMLImageElement`, `HTMLVideoElement`,
 * `HTMLCanvasElement`, `ImageBitmap`, or `ImageData`.
 *
 * @typedef {Object} TextureOptions
 * @property {number} [target] the type of texture `gl.TEXTURE_2D` or `gl.TEXTURE_CUBE_MAP`. Defaults to `gl.TEXTURE_2D`.
 * @property {number} [level] the mip level to affect. Defaults to 0. Note, if set auto will be considered false unless explicitly set to true.
 * @property {number} [width] the width of the texture. Only used if src is an array or typed array or null.
 * @property {number} [height] the height of a texture. Only used if src is an array or typed array or null.
 * @property {number} [depth] the depth of a texture. Only used if src is an array or typed array or null and target is `TEXTURE_3D` .
 * @property {number} [min] the min filter setting (eg. `gl.LINEAR`). Defaults to `gl.NEAREST_MIPMAP_LINEAR`
 *     or if texture is not a power of 2 on both dimensions then defaults to `gl.LINEAR`.
 * @property {number} [mag] the mag filter setting (eg. `gl.LINEAR`). Defaults to `gl.LINEAR`
 * @property {number} [minMag] both the min and mag filter settings.
 * @property {number} [internalFormat] internal format for texture. Defaults to `gl.RGBA`
 * @property {number} [format] format for texture. Defaults to `gl.RGBA`.
 * @property {number} [type] type for texture. Defaults to `gl.UNSIGNED_BYTE` unless `src` is ArrayBufferView. If `src`
 *     is ArrayBufferView defaults to type that matches ArrayBufferView type.
 * @property {number} [wrap] Texture wrapping for both S and T (and R if TEXTURE_3D or WebGLSampler). Defaults to `gl.REPEAT` for 2D unless src is WebGL1 and src not npot and `gl.CLAMP_TO_EDGE` for cube
 * @property {number} [wrapS] Texture wrapping for S. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapT] Texture wrapping for T. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [wrapR] Texture wrapping for R. Defaults to `gl.REPEAT` and `gl.CLAMP_TO_EDGE` for cube. If set takes precedence over `wrap`.
 * @property {number} [minLod] TEXTURE_MIN_LOD setting
 * @property {number} [maxLod] TEXTURE_MAX_LOD setting
 * @property {number} [baseLevel] TEXTURE_BASE_LEVEL setting
 * @property {number} [maxLevel] TEXTURE_MAX_LEVEL setting
 * @property {number} [compareFunc] TEXTURE_COMPARE_FUNC setting
 * @property {number} [compareMode] TEXTURE_COMPARE_MODE setting
 * @property {number} [unpackAlignment] The `gl.UNPACK_ALIGNMENT` used when uploading an array. Defaults to 1.
 * @property {number[]|ArrayBufferView} [color] Color to initialize this texture with if loading an image asynchronously.
 *     The default use a blue 1x1 pixel texture. You can set another default by calling `twgl.setDefaults`
 *     or you can set an individual texture's initial color by setting this property. Example: `[1, .5, .5, 1]` = pink
 * @property {number} [premultiplyAlpha] Whether or not to premultiply alpha. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [flipY] Whether or not to flip the texture vertically on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {number} [colorspaceConversion] Whether or not to let the browser do colorspace conversion of the texture on upload. Defaults to whatever the current setting is.
 *     This lets you set it once before calling `twgl.createTexture` or `twgl.createTextures` and only override
 *     the current setting for specific textures.
 * @property {boolean} [auto] If `undefined` or `true`, in WebGL1, texture filtering is set automatically for non-power of 2 images and
 *    mips are generated for power of 2 images. In WebGL2 mips are generated if they can be. Note: if `level` is set above
 *    then then `auto` is assumed to be `false` unless explicity set to `true`.
 * @property {number[]} [cubeFaceOrder] The order that cube faces are pulled out of an img or set of images. The default is
 *
 *     [gl.TEXTURE_CUBE_MAP_POSITIVE_X,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
 *      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
 *      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z]
 *
 * @property {(number[]|ArrayBufferView|TexImageSource|TexImageSource[]|string|string[]|module:twgl.TextureFunc)} [src] source for texture
 *
 *    If `string` then it's assumed to be a URL to an image. The image will be downloaded async. A usable
 *    1x1 pixel texture will be returned immediately. The texture will be updated once the image has downloaded.
 *    If `target` is `gl.TEXTURE_CUBE_MAP` will attempt to divide image into 6 square pieces. 1x6, 6x1, 3x2, 2x3.
 *    The pieces will be uploaded in `cubeFaceOrder`
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_CUBE_MAP` then it must have 6 entries, one for each face of a cube map.
 *
 *    If `string[]` or `TexImageSource[]` and target is `gl.TEXTURE_2D_ARRAY` then each entry is a slice of the a 2d array texture
 *    and will be scaled to the specified width and height OR to the size of the first image that loads.
 *
 *    If `TexImageSource` then it wil be used immediately to create the contents of the texture. Examples `HTMLImageElement`,
 *    `HTMLCanvasElement`, `HTMLVideoElement`.
 *
 *    If `number[]` or `ArrayBufferView` it's assumed to be data for a texture.
 *
 *    *  If `width` or `height` is not specified it is guessed as follows.
 *
 *       First the number of elements is computed by `src.length / numComponents`
 *       where `numComponents` is derived from `format`. If `target` is `gl.TEXTURE_CUBE_MAP` then `numElements` is divided
 *       by 6. Then
 *
 *       *   If neither `width` nor `height` are specified and `sqrt(numElements)` is an integer then width and height
 *           are set to `sqrt(numElements)`. Otherwise `width = numElements` and `height = 1`.
 *
 *       *   If only one of `width` or `height` is specified then the other equals `numElements / specifiedDimension`.
 *
 *    * If both `width` and `height` is specified, then, the size of mip levels from `level` will be computed
 *      and data for consecutive mip levels will be uploaded until the data runs out.
 *
 *      In other words: `{ format: g.RGBA, width: 4, height: 4, src: Uint8Array((4 * 4 + 2 * 2 + 1) * 4) }`
 *      uploads 3 mip levels (4x4, 2x2, 1x1) because src is more than the data for the first mip level.
 *
 * If `number[]` will be converted to `type`.
 *
 * If `src` is a function it will be called with a `WebGLRenderingContext` and these options.
 * Whatever it returns is subject to these rules. So it can return a string url, an `HTMLElement`
 * an array etc...
 *
 * If `src` is undefined then an empty texture will be created of size `width` by `height`.
 *
 * @property {string} [crossOrigin] What to set the crossOrigin property of images when they are downloaded.
 *    default: undefined. Also see {@link module:twgl.setDefaults}.
 *
 * @memberOf module:twgl
 */

/**
 * Saves the current packing state, sets the packing state as specified
 * then calls a function, after which the packing state will be restored.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {function():void} [fn] A function to call, after which the packing state will be restored.
 * @private
 */
function scopedSetPackState(gl, options, fn) {
  let colorspaceConversion;
  let premultiplyAlpha;
  let flipY;

  if (options.colorspaceConversion !== undefined) {
    colorspaceConversion = gl.getParameter(UNPACK_COLORSPACE_CONVERSION_WEBGL);
    gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, options.colorspaceConversion);
  }
  if (options.premultiplyAlpha !== undefined) {
    premultiplyAlpha = gl.getParameter(UNPACK_PREMULTIPLY_ALPHA_WEBGL);
    gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, options.premultiplyAlpha);
  }
  if (options.flipY !== undefined) {
    flipY = gl.getParameter(UNPACK_FLIP_Y_WEBGL);
    gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, options.flipY);
  }

  fn();

  if (colorspaceConversion !== undefined) {
    gl.pixelStorei(UNPACK_COLORSPACE_CONVERSION_WEBGL, colorspaceConversion);
  }
  if (premultiplyAlpha !== undefined) {
    gl.pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
  }
  if (flipY !== undefined) {
    gl.pixelStorei(UNPACK_FLIP_Y_WEBGL, flipY);
  }
}

/**
 * returns the property if set or the corresponding state if undefined
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options
 * @param {string} property the name of the property to copy
 * @param {number} pname
 * @return {module:twgl.TextureOptions}
 */
function getPackStateOption(gl, options, property, pname) {
  const v = options[property];
  return {
    [property]: v === undefined ? gl.getParameter(pname) : v,
  };
}

/**
 * Copy the options object and apply pack state
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options
 * @return {module:twgl.TextureOptions}
 */
function copyOptionsAndApplyPackState(gl, options) {
  return {
    ...options,
    ...getPackStateOption(gl, options, 'flipY', UNPACK_FLIP_Y_WEBGL),
    ...getPackStateOption(gl, options, 'premultiplyAlpha', UNPACK_PREMULTIPLY_ALPHA_WEBGL),
    ...getPackStateOption(gl, options, 'colorspaceConversion', UNPACK_COLORSPACE_CONVERSION_WEBGL),
  };
}

/**
 * Set skip state to defaults
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @private
 */
function setSkipStateToDefault(gl) {
  gl.pixelStorei(UNPACK_ALIGNMENT, 4);
  if (isWebGL2(gl)) {
    gl.pixelStorei(UNPACK_ROW_LENGTH, 0);
    gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
    gl.pixelStorei(UNPACK_SKIP_PIXELS, 0);
    gl.pixelStorei(UNPACK_SKIP_ROWS, 0);
    gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
  }
}

/**
 * Sets the parameters of a texture or sampler
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {number|WebGLSampler} target texture target or sampler
 * @param {function()} parameteriFn texParameteri or samplerParameteri fn
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @private
 */
function setTextureSamplerParameters(gl, target, parameteriFn, options) {
  if (options.minMag) {
    parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.minMag);
    parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.minMag);
  }
  if (options.min) {
    parameteriFn.call(gl, target, TEXTURE_MIN_FILTER, options.min);
  }
  if (options.mag) {
    parameteriFn.call(gl, target, TEXTURE_MAG_FILTER, options.mag);
  }
  if (options.wrap) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrap);
    parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrap);
    if (target === TEXTURE_3D$1 || isSampler(gl, target)) {
      parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrap);
    }
  }
  if (options.wrapR) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_R, options.wrapR);
  }
  if (options.wrapS) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_S, options.wrapS);
  }
  if (options.wrapT) {
    parameteriFn.call(gl, target, TEXTURE_WRAP_T, options.wrapT);
  }
  if (options.minLod !== undefined) {
    parameteriFn.call(gl, target, TEXTURE_MIN_LOD, options.minLod);
  }
  if (options.maxLod !== undefined) {
    parameteriFn.call(gl, target, TEXTURE_MAX_LOD, options.maxLod);
  }
  if (options.baseLevel !== undefined) {
    parameteriFn.call(gl, target, TEXTURE_BASE_LEVEL, options.baseLevel);
  }
  if (options.maxLevel !== undefined) {
    parameteriFn.call(gl, target, TEXTURE_MAX_LEVEL, options.maxLevel);
  }
  if (options.compareFunc !== undefined) {
    parameteriFn.call(gl, target, TEXTURE_COMPARE_FUNC, options.compareFunc);
  }
  if (options.compareMode !== undefined) {
    parameteriFn.call(gl, target, TEXTURE_COMPARE_MODE, options.compareMode);
  }
}

/**
 * Sets the texture parameters of a texture.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */
function setTextureParameters(gl, tex, options) {
  const target = options.target || TEXTURE_2D$2;
  gl.bindTexture(target, tex);
  setTextureSamplerParameters(gl, target, gl.texParameteri, options);
}

/**
 * Sets the sampler parameters of a sampler.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLSampler} sampler the WebGLSampler to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */
function setSamplerParameters(gl, sampler, options) {
  setTextureSamplerParameters(gl, sampler, gl.samplerParameteri, options);
}

/**
 * Creates a new sampler object and sets parameters.
 *
 * Example:
 *
 *      const sampler = twgl.createSampler(gl, {
 *        minMag: gl.NEAREST,         // sets both TEXTURE_MIN_FILTER and TEXTURE_MAG_FILTER
 *        wrap: gl.CLAMP_TO_NEAREST,  // sets both TEXTURE_WRAP_S and TEXTURE_WRAP_T and TEXTURE_WRAP_R
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per sampler.
 * @return {Object.<string,WebGLSampler>} the created samplers by name
 * @private
 */
function createSampler(gl, options) {
  const sampler = gl.createSampler();
  setSamplerParameters(gl, sampler, options);
  return sampler;
}

/**
 * Creates a multiple sampler objects and sets parameters on each.
 *
 * Example:
 *
 *      const samplers = twgl.createSamplers(gl, {
 *        nearest: {
 *          minMag: gl.NEAREST,
 *        },
 *        nearestClampS: {
 *          minMag: gl.NEAREST,
 *          wrapS: gl.CLAMP_TO_NEAREST,
 *        },
 *        linear: {
 *          minMag: gl.LINEAR,
 *        },
 *        nearestClamp: {
 *          minMag: gl.NEAREST,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClamp: {
 *          minMag: gl.LINEAR,
 *          wrap: gl.CLAMP_TO_EDGE,
 *        },
 *        linearClampT: {
 *          minMag: gl.LINEAR,
 *          wrapT: gl.CLAMP_TO_EDGE,
 *        },
 *      });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set on the sampler
 * @private
 */
function createSamplers(gl, samplerOptions) {
  const samplers = {};
  Object.keys(samplerOptions).forEach(function(name) {
    samplers[name] = createSampler(gl, samplerOptions[name]);
  });
  return samplers;
}

/**
 * Makes a 1x1 pixel
 * If no color is passed in uses the default color which can be set by calling `setDefaultTextureColor`.
 * @param {(number[]|ArrayBufferView)} [color] The color using 0-1 values
 * @return {Uint8Array} Unit8Array with color.
 * @private
 */
function make1Pixel(color) {
  color = color || defaults$1.textureColor;
  if (isArrayBuffer(color)) {
    return color;
  }
  return new Uint8Array([color[0] * 255, color[1] * 255, color[2] * 255, color[3] * 255]);
}

/**
 * @typedef {Object} SetTextureFilteringInternalOptions
 * @property {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @property {number} [width] width of texture
 * @property {number} [height] height of texture
 * @property {number} [internalFormat] The internalFormat parameter from texImage2D etc..
 * @property {number} [lastMipLevelUploaded] The last mip level manually uploaded
 * @private
 */

/**
 * Sets filtering or generates mips for texture based on width or height
 * If width or height is not passed in uses `options.width` and//or `options.height`
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {SetTextureFilteringInternalOptions} p
 * @private
 */
function setTextureFilteringForSizeInternal(gl, tex, {options, width, height, internalFormat, lastMipLevelUploaded }) {
  options = options || defaults$1.textureOptions;
  internalFormat = internalFormat || RGBA$1;
  const target = options.target || TEXTURE_2D$2;
  width = width || options.width;
  height = height || options.height;
  gl.bindTexture(target, tex);
  if (lastMipLevelUploaded > 1) {
    const lastLevelWidth = Math.max(1, width >> lastMipLevelUploaded);
    const lastLevelHeight = Math.max(1, height >> lastMipLevelUploaded);
    // Note: This is a guess. The user can set maxLod etc...
    const canUseMips = lastLevelWidth === 1 && lastLevelHeight === 1;
    const magFiltering = canFilter(internalFormat) ? LINEAR$1 : NEAREST;
    const minFiltering = canFilter(internalFormat)
      ? canUseMips
      ? NEAREST_MIPMAP_LINEAR
      : LINEAR$1
      : NEAREST;
    gl.texParameteri(target, TEXTURE_MAG_FILTER, magFiltering);
    gl.texParameteri(target, TEXTURE_MIN_FILTER, minFiltering);
  } else if (canGenerateMipmap(gl, width, height, internalFormat)) {
    gl.generateMipmap(target);
  } else {
    const filtering = canFilter(internalFormat) ? LINEAR$1 : NEAREST;
    gl.texParameteri(target, TEXTURE_MIN_FILTER, filtering);
    gl.texParameteri(target, TEXTURE_MAG_FILTER, filtering);
    gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE$1);
    gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE$1);
  }
}

/**
 * Sets filtering or generates mips for texture based on width or height
 * If width or height is not passed in uses `options.width` and//or `options.height`
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @param {number} [width] width of texture
 * @param {number} [height] height of texture
 * @param {number} [internalFormat] The internalFormat parameter from texImage2D etc..
 * @memberOf module:twgl/textures
 */
function setTextureFilteringForSize(gl, tex, options, width, height, internalFormat) {
  setTextureFilteringForSizeInternal(gl, tex, { options, width, height, internalFormat });
}

function shouldAutomaticallySetTextureFilteringForSize(options) {
  return options.auto === true || (options.auto === undefined && options.level === undefined);
}

/**
 * Gets an array of cubemap face enums
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @return {number[]} cubemap face enums
 * @private
 */
function getCubeFaceOrder(gl, options) {
  options = options || {};
  return options.cubeFaceOrder || [
      TEXTURE_CUBE_MAP_POSITIVE_X,
      TEXTURE_CUBE_MAP_NEGATIVE_X,
      TEXTURE_CUBE_MAP_POSITIVE_Y,
      TEXTURE_CUBE_MAP_NEGATIVE_Y,
      TEXTURE_CUBE_MAP_POSITIVE_Z,
      TEXTURE_CUBE_MAP_NEGATIVE_Z,
    ];
}

/**
 * @typedef {Object} FaceInfo
 * @property {number} face gl enum for texImage2D
 * @property {number} ndx face index (0 - 5) into source data
 * @ignore
 */

/**
 * Gets an array of FaceInfos
 * There's a bug in some NVidia drivers that will crash the driver if
 * `gl.TEXTURE_CUBE_MAP_POSITIVE_X` is not uploaded first. So, we take
 * the user's desired order from his faces to WebGL and make sure we
 * do the faces in WebGL order
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @return {FaceInfo[]} cubemap face infos. Arguably the `face` property of each element is redundant but
 *    it's needed internally to sort the array of `ndx` properties by `face`.
 * @private
 */
function getCubeFacesWithNdx(gl, options) {
  const faces = getCubeFaceOrder(gl, options);
  // work around bug in NVidia drivers. We have to upload the first face first else the driver crashes :(
  const facesWithNdx = faces.map(function(face, ndx) {
    return { face: face, ndx: ndx };
  });
  facesWithNdx.sort(function(a, b) {
    return a.face - b.face;
  });
  return facesWithNdx;
}

/**
 * Set a texture from the contents of an element. Will also set
 * texture filtering or generate mips based on the dimensions of the element
 * unless `options.auto === false`. If `target === gl.TEXTURE_CUBE_MAP` will
 * attempt to slice image into 1x6, 2x3, 3x2, or 6x1 images, one for each face.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {HTMLElement} element a canvas, img, or video element.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 * @kind function
 */
function setTextureFromElement(gl, tex, element, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D$2;
  const level = options.level || 0;
  let width = element.width;
  let height = element.height;
  const internalFormat = options.internalFormat || options.format || RGBA$1;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || formatType.type;
  gl.bindTexture(target, tex);
  if (target === TEXTURE_CUBE_MAP$1) {
    // guess the parts
    const imgWidth  = element.width;
    const imgHeight = element.height;
    let size;
    let slices;
    if (imgWidth / 6 === imgHeight) {
      // It's 6x1
      size = imgHeight;
      slices = [0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0];
    } else if (imgHeight / 6 === imgWidth) {
      // It's 1x6
      size = imgWidth;
      slices = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5];
    } else if (imgWidth / 3 === imgHeight / 2) {
      // It's 3x2
      size = imgWidth / 3;
      slices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1];
    } else if (imgWidth / 2 === imgHeight / 3) {
      // It's 2x3
      size = imgWidth / 2;
      slices = [0, 0, 1, 0, 0, 1, 1, 1, 0, 2, 1, 2];
    } else {
      throw new Error(`can't figure out cube map from element: ${element.src ? element.src : element.nodeName}`);
    }
    const ctx = getShared2DContext();
    if (ctx) {
      ctx.canvas.width = size;
      ctx.canvas.height = size;
      width = size;
      height = size;
      scopedSetPackState(gl, options, () => {
        getCubeFacesWithNdx(gl, options).forEach(function(f) {
          const xOffset = slices[f.ndx * 2 + 0] * size;
          const yOffset = slices[f.ndx * 2 + 1] * size;
          ctx.drawImage(element, xOffset, yOffset, size, size, 0, 0, size, size);
          gl.texImage2D(f.face, level, internalFormat, format, type, ctx.canvas);
        });
        // Free up the canvas memory
        ctx.canvas.width = 1;
        ctx.canvas.height = 1;
      });
    } else if (typeof createImageBitmap !== 'undefined') {
      // NOTE: It seems like we should prefer ImageBitmap because unlike canvas it's
      // note lossy? (alpha is not premultiplied? although I'm not sure what
      width = size;
      height = size;
      getCubeFacesWithNdx(gl, options).forEach(function(f) {
        const xOffset = slices[f.ndx * 2 + 0] * size;
        const yOffset = slices[f.ndx * 2 + 1] * size;
        // We can't easily use a default texture color here as it would have to match
        // the type across all faces where as with a 2D one there's only one face
        // so we're replacing everything all at once. It also has to be the correct size.
        // On the other hand we need all faces to be the same size so as one face loads
        // the rest match else the texture will be un-renderable.
        gl.texImage2D(f.face, level, internalFormat, size, size, 0, format, type, null);
        createImageBitmap(element, xOffset, yOffset, size, size, {
          premultiplyAlpha: 'none',
          colorSpaceConversion: 'none',
        })
        .then(function(imageBitmap) {
          scopedSetPackState(gl, options, () => {
            gl.bindTexture(target, tex);
            gl.texImage2D(f.face, level, internalFormat, format, type, imageBitmap);
            if (shouldAutomaticallySetTextureFilteringForSize(options)) {
              setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
            }
          });
        });
      });
    }
  } else if (target === TEXTURE_3D$1 || target === TEXTURE_2D_ARRAY$1) {
    scopedSetPackState(gl, options, () => {
      const smallest = Math.min(element.width, element.height);
      const largest = Math.max(element.width, element.height);
      const depth = largest / smallest;
      if (depth % 1 !== 0) {
        throw new Error("can not compute 3D dimensions of element");
      }
      const xMult = element.width  === largest ? 1 : 0;
      const yMult = element.height === largest ? 1 : 0;
      gl.pixelStorei(UNPACK_ALIGNMENT, 1);
      gl.pixelStorei(UNPACK_ROW_LENGTH, element.width);
      gl.pixelStorei(UNPACK_IMAGE_HEIGHT, 0);
      gl.pixelStorei(UNPACK_SKIP_IMAGES, 0);
      gl.texImage3D(target, level, internalFormat, smallest, smallest, smallest, 0, format, type, null);
      for (let d = 0; d < depth; ++d) {
        const srcX = d * smallest * xMult;
        const srcY = d * smallest * yMult;
        gl.pixelStorei(UNPACK_SKIP_PIXELS, srcX);
        gl.pixelStorei(UNPACK_SKIP_ROWS, srcY);
        gl.texSubImage3D(target, level, 0, 0, d, smallest, smallest, 1, format, type, element);
      }
      setSkipStateToDefault(gl);
    });
  } else {
    scopedSetPackState(gl, options, () => {
      gl.texImage2D(target, level, internalFormat, format, type, element);
    });
  }
  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
    setTextureFilteringForSize(gl, tex, options, width, height, internalFormat);
  }
  setTextureParameters(gl, tex, options);
}

function noop() {
}

/**
 * Checks whether the url's origin is the same so that we can set the `crossOrigin`
 * @param {string} url url to image
 * @returns {boolean} true if the window's origin is the same as image's url
 * @private
 */
function urlIsSameOrigin(url) {
  if (typeof document !== 'undefined') {
    // for IE really
    const a = document.createElement('a');
    a.href = url;
    return a.hostname === location.hostname &&
           a.port     === location.port &&
           a.protocol === location.protocol;
  } else {
    const localOrigin = (new URL(location.href)).origin;
    const urlOrigin = (new URL(url, location.href)).origin;
    return urlOrigin === localOrigin;
  }
}

function setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin) {
  return crossOrigin === undefined && !urlIsSameOrigin(url)
     ? 'anonymous'
     : crossOrigin;
}

/**
 * Loads an image
 * @param {string} url url to image
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @return {HTMLImageElement} the image being loaded.
 * @private
 */
function loadImage(url, crossOrigin, callback) {
  callback = callback || noop;
  let img;
  crossOrigin = crossOrigin !== undefined ? crossOrigin : defaults$1.crossOrigin;
  crossOrigin = setToAnonymousIfUndefinedAndURLIsNotSameOrigin(url, crossOrigin);
  if (typeof Image !== 'undefined') {
    img = new Image();
    if (crossOrigin !== undefined) {
      img.crossOrigin = crossOrigin;
    }

    const clearEventHandlers = function clearEventHandlers() {
      img.removeEventListener('error', onError);  // eslint-disable-line
      img.removeEventListener('load', onLoad);  // eslint-disable-line
      img = null;
    };

    const onError = function onError() {
      const msg = "couldn't load image: " + url;
      error$1(msg);
      callback(msg, img);
      clearEventHandlers();
    };

    const onLoad = function onLoad() {
      callback(null, img);
      clearEventHandlers();
    };

    img.addEventListener('error', onError);
    img.addEventListener('load', onLoad);
    img.src = url;
    return img;
  } else if (typeof ImageBitmap !== 'undefined') {
    let err;
    let bm;
    const cb = function cb() {
      callback(err, bm);
    };

    const options = {};
    if (crossOrigin) {
      options.mode = 'cors'; // TODO: not sure how to translate image.crossOrigin
    }
    fetch(url, options).then(function(response) {
      if (!response.ok) {
        throw response;
      }
      return response.blob();
    }).then(function(blob) {
      return createImageBitmap(blob, {
        premultiplyAlpha: 'none',
        colorSpaceConversion: 'none',
      });
    }).then(function(bitmap) {
      // not sure if this works. We don't want
      // to catch the user's error. So, call
      // the callback in a timeout so we're
      // not in this scope inside the promise.
      bm = bitmap;
      setTimeout(cb);
    }).catch(function(e) {
      err = e;
      setTimeout(cb);
    });
    img = null;
  }
  return img;
}

/**
 * check if object is a TexImageSource
 *
 * @param {Object} obj Object to test
 * @return {boolean} true if object is a TexImageSource
 * @private
 */
function isTexImageSource(obj) {
  return (typeof ImageBitmap !== 'undefined' && obj instanceof ImageBitmap) ||
         (typeof ImageData !== 'undefined'  && obj instanceof ImageData) ||
         (typeof HTMLElement !== 'undefined'  && obj instanceof HTMLElement);
}

/**
 * if obj is an TexImageSource then just
 * uses it otherwise if obj is a string
 * then load it first.
 *
 * @param {string|TexImageSource} obj
 * @param {string} crossOrigin
 * @param {function(err, img)} [callback] a callback that's passed an error and the image. The error will be non-null
 *     if there was an error
 * @private
 */
function loadAndUseImage(obj, crossOrigin, callback) {
  if (isTexImageSource(obj)) {
    setTimeout(function() {
      callback(null, obj);
    });
    return obj;
  }

  return loadImage(obj, crossOrigin, callback);
}

/**
 * Sets a texture to a 1x1 pixel color. If `options.color === false` is nothing happens. If it's not set
 * the default texture color is used which can be set by calling `setDefaultTextureColor`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 * @private
 */
function setTextureTo1PixelColor(gl, tex, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D$2;
  gl.bindTexture(target, tex);
  if (options.color === false) {
    return;
  }
  // Assume it's a URL
  // Put 1x1 pixels in texture. That makes it renderable immediately regardless of filtering.
  const color = make1Pixel(options.color);
  if (target === TEXTURE_CUBE_MAP$1) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, 0, RGBA$1, 1, 1, 0, RGBA$1, UNSIGNED_BYTE$1, color);
    }
  } else if (target === TEXTURE_3D$1 || target === TEXTURE_2D_ARRAY$1) {
    gl.texImage3D(target, 0, RGBA$1, 1, 1, 1, 0, RGBA$1, UNSIGNED_BYTE$1, color);
  } else {
    gl.texImage2D(target, 0, RGBA$1, 1, 1, 0, RGBA$1, UNSIGNED_BYTE$1, color);
  }
}

/**
 * The src image(s) used to create a texture.
 *
 * When you call {@link module:twgl.createTexture} or {@link module:twgl.createTextures}
 * you can pass in urls for images to load into the textures. If it's a single url
 * then this will be a single HTMLImageElement. If it's an array of urls used for a cubemap
 * this will be a corresponding array of images for the cubemap.
 *
 * @typedef {HTMLImageElement|HTMLImageElement[]} TextureSrc
 * @memberOf module:twgl
 */

/**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback TextureReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} texture the texture.
 * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
 * @memberOf module:twgl
 */

/**
 * A callback for when all images have finished downloading and been uploaded into their respective textures
 * @callback TexturesReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
 * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
 * @memberOf module:twgl
 */

/**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback CubemapReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each face.
 * @memberOf module:twgl
 */

/**
 * A callback for when an image finished downloading and been uploaded into a texture
 * @callback ThreeDReadyCallback
 * @param {*} err If truthy there was an error.
 * @param {WebGLTexture} tex the texture.
 * @param {HTMLImageElement[]} imgs the images for each slice.
 * @memberOf module:twgl
 */

/**
 * Loads a texture from an image from a Url as specified in `options.src`
 * If `options.color !== false` will set the texture to a 1x1 pixel color so that the texture is
 * immediately useable. It will be updated with the contents of the image once the image has finished
 * downloading. Filtering options will be set as appropriate for image unless `options.auto === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A function to be called when the image has finished loading. err will
 *    be non null if there was an error.
 * @return {HTMLImageElement} the image being downloaded.
 * @memberOf module:twgl/textures
 */
function loadTextureFromUrl(gl, tex, options, callback) {
  callback = callback || noop;
  options = options || defaults$1.textureOptions;
  setTextureTo1PixelColor(gl, tex, options);
  // Because it's async we need to copy the options.
  options = copyOptionsAndApplyPackState(gl, options);
  const img = loadAndUseImage(options.src, options.crossOrigin, function(err, img) {
    if (err) {
      callback(err, tex, img);
    } else {
      setTextureFromElement(gl, tex, img, options);
      callback(null, tex, img);
    }
  });
  return img;
}

/**
 * Loads a cubemap from 6 urls or TexImageSources as specified in `options.src`. Will set the cubemap to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.CubemapReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 * @private
 */
function loadCubemapFromUrls(gl, tex, options, callback) {
  callback = callback || noop;
  const urls = options.src;
  if (urls.length !== 6) {
    throw new Error("there must be 6 urls for a cubemap");
  }
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA$1;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || UNSIGNED_BYTE$1;
  const target = options.target || TEXTURE_2D$2;
  if (target !== TEXTURE_CUBE_MAP$1) {
    throw new Error("target must be TEXTURE_CUBE_MAP");
  }
  setTextureTo1PixelColor(gl, tex, options);
  // Because it's async we need to copy the options.
  options = copyOptionsAndApplyPackState(gl, options);
  let numToLoad = 6;
  const errors = [];
  const faces = getCubeFaceOrder(gl, options);
  let imgs;  // eslint-disable-line

  function uploadImg(faceTarget) {
    return function(err, img) {
      --numToLoad;
      if (err) {
        errors.push(err);
      } else {
        if (img.width !== img.height) {
          errors.push("cubemap face img is not a square: " + img.src);
        } else {
          scopedSetPackState(gl, options, () => {
            gl.bindTexture(target, tex);

            // So assuming this is the first image we now have one face that's img sized
            // and 5 faces that are 1x1 pixel so size the other faces
            if (numToLoad === 5) {
              // use the default order
              getCubeFaceOrder().forEach(function(otherTarget) {
                // Should we re-use the same face or a color?
                gl.texImage2D(otherTarget, level, internalFormat, format, type, img);
              });
            } else {
              gl.texImage2D(faceTarget, level, internalFormat, format, type, img);
            }

            if (shouldAutomaticallySetTextureFilteringForSize(options)) {
              gl.generateMipmap(target);
            }
          });
        }
      }

      if (numToLoad === 0) {
        callback(errors.length ? errors : undefined, tex, imgs);
      }
    };
  }

  imgs = urls.map(function(url, ndx) {
    return loadAndUseImage(url, options.crossOrigin, uploadImg(faces[ndx]));
  });
}

/**
 * Loads a 2d array or 3d texture from urls OR TexImageSources as specified in `options.src`.
 * Will set the texture to a 1x1 pixel color
 * so that it is usable immediately unless `option.color === false`.
 *
 * If the width and height is not specified the width and height of the first
 * image loaded will be used. Note that since images are loaded async
 * which image downloads first is unknown.
 *
 * If an image is not the same size as the width and height it will be scaled
 * to that width and height.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.ThreeDReadyCallback} [callback] A function to be called when all the images have finished loading. err will
 *    be non null if there was an error.
 * @memberOf module:twgl/textures
 * @private
 */
function loadSlicesFromUrls(gl, tex, options, callback) {
  callback = callback || noop;
  const urls = options.src;
  const internalFormat = options.internalFormat || options.format || RGBA$1;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || UNSIGNED_BYTE$1;
  const target = options.target || TEXTURE_2D_ARRAY$1;
  if (target !== TEXTURE_3D$1 && target !== TEXTURE_2D_ARRAY$1) {
    throw new Error("target must be TEXTURE_3D or TEXTURE_2D_ARRAY");
  }
  setTextureTo1PixelColor(gl, tex, options);
  // Because it's async we need to copy the options.
  options = copyOptionsAndApplyPackState(gl, options);
  let numToLoad = urls.length;
  const errors = [];
  let imgs;  // eslint-disable-line
  const level = options.level || 0;
  let width = options.width;
  let height = options.height;
  const depth = urls.length;
  let firstImage = true;

  function uploadImg(slice) {
    return function(err, img) {
      --numToLoad;
      if (err) {
        errors.push(err);
      } else {
        scopedSetPackState(gl, options, () => {
          gl.bindTexture(target, tex);

          if (firstImage) {
            firstImage = false;
            width = options.width || img.width;
            height = options.height || img.height;
            gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);

            // put it in every slice otherwise some slices will be 0,0,0,0
            for (let s = 0; s < depth; ++s) {
              gl.texSubImage3D(target, level, 0, 0, s, width, height, 1, format, type, img);
            }
          } else {
            let src = img;
            let ctx;
            if (img.width !== width || img.height !== height) {
              // Size the image to fix
              ctx = getShared2DContext();
              src = ctx.canvas;
              ctx.canvas.width = width;
              ctx.canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
            }

            gl.texSubImage3D(target, level, 0, 0, slice, width, height, 1, format, type, src);

            // free the canvas memory
            if (ctx && src === ctx.canvas) {
              ctx.canvas.width = 0;
              ctx.canvas.height = 0;
            }
          }

          if (shouldAutomaticallySetTextureFilteringForSize(options)) {
            gl.generateMipmap(target);
          }
        });
      }

      if (numToLoad === 0) {
        callback(errors.length ? errors : undefined, tex, imgs);
      }
    };
  }

  imgs = urls.map(function(url, ndx) {
    return loadAndUseImage(url, options.crossOrigin, uploadImg(ndx));
  });
}

/**
 * Sets a texture from an array or typed array. If the width or height is not provided will attempt to
 * guess the size. See {@link module:twgl.TextureOptions}.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {(number[]|ArrayBufferView)} src An array or typed arry with texture data.
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 *   This is often the same options you passed in when you created the texture.
 * @memberOf module:twgl/textures
 */
function setTextureFromArray(gl, tex, src, options) {
  options = options || defaults$1.textureOptions;
  const target = options.target || TEXTURE_2D$2;
  gl.bindTexture(target, tex);
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA$1;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
  if (!isArrayBuffer(src)) {
    const Type = getTypedArrayTypeForGLType(type);
    src = new Type(src);
  } else if (src instanceof Uint8ClampedArray) {
    src = new Uint8Array(src.buffer);
  }

  const { width, height, depth } = getTextureSize(target, src, options, internalFormat, format, type);
  const compressed = isCompressedInternalFormat(internalFormat);

  setSkipStateToDefault(gl);
  gl.pixelStorei(UNPACK_ALIGNMENT, options.unpackAlignment || 1);
  let mipLevelOffset = 0;  // this is in addition to level
  scopedSetPackState(gl, options, () => {
    let mipLevelByteOffset = 0;
    const { blockWidth, blockHeight, bytesPerBlock } = getBlockInfoForInternalFormat(internalFormat, type);
    while (mipLevelByteOffset < src.byteLength) {
      const mipWidth = Math.max(1, width >> mipLevelOffset);
      const mipHeight = Math.max(1, height >> mipLevelOffset);
      const mipDepth = target === TEXTURE_2D$2 ? Math.max(1, depth >> mipLevelOffset) : depth;
      const blocksAcross = Math.ceil(mipWidth / blockWidth);
      const blocksDown = Math.ceil(mipHeight / blockHeight);
      const numFaces = target === TEXTURE_CUBE_MAP$1 ? 6 : 1;
      const bytesPerMipLevel = blocksAcross * blocksDown * bytesPerBlock * mipDepth * numFaces;
      if (mipLevelByteOffset + bytesPerMipLevel > src.byteLength) {
        throw new Error('src size does not match number of mip levels');
      }
      const mipSource = src.subarray(mipLevelByteOffset / src.BYTES_PER_ELEMENT, (mipLevelByteOffset + bytesPerMipLevel) / src.BYTES_PER_ELEMENT);
      const mipLevel = level + mipLevelOffset;

      if (target === TEXTURE_CUBE_MAP$1) {
        const faceSize = mipSource.length / 6;
        getCubeFacesWithNdx(gl, options).forEach(f => {
          const offset = faceSize * f.ndx;
          const data = mipSource.subarray(offset, offset + faceSize);
          if (compressed) {
            gl.compressedTexImage2D(f.face, mipLevel, internalFormat, mipWidth, mipHeight, 0, data);
          } else {
            gl.texImage2D(f.face, mipLevel, internalFormat, mipWidth, mipHeight, 0, format, type, data);
          }
        });
      } else if (target === TEXTURE_3D$1 || target === TEXTURE_2D_ARRAY$1) {
        gl.texImage3D(target, mipLevel, internalFormat, mipWidth, mipHeight, mipDepth, 0, format, type, mipSource);
      } else {
        if (compressed) {
          gl.compressedTexImage2D(target, mipLevel, internalFormat, mipWidth, mipHeight, 0, mipSource);
        } else {
          gl.texImage2D(target, mipLevel, internalFormat, mipWidth, mipHeight, 0, format, type, mipSource);
        }
      }
      ++mipLevelOffset;
      mipLevelByteOffset += bytesPerMipLevel;
      if (mipWidth === 1 && mipHeight === 1 && mipDepth === 1 && mipLevelByteOffset !== src.byteLength) {
        throw new Error('src size has more data than can fit in mip levels');
      }
    }
  });
  return { width, height, depth, type, lastMipLevelUploaded: level + mipLevelOffset - 1 };
}

function getTextureSize(target, src, options, internalFormat, format, type) {
  let width = options.width;
  let height = options.height;
  let depth = options.depth;

  const compressed = isCompressedInternalFormat(internalFormat);

  if (compressed) {
    if (!width || !height) {
      throw new Error("compressed texture needs to set width and height!");
    }
    depth = depth || 1;
  } else {
    const bytesPerElement = getBytesPerElementForInternalFormat(internalFormat, type);
    const numElements = src.byteLength / bytesPerElement;  // TODO: check UNPACK_ALIGNMENT?
    if (numElements % 1) {
      throw new Error(`length wrong size for format: ${glEnumToString(gl, format)}`);
    }
    if (compressed && (!width || !height)) {
      throw new Error("compressed texture needs to set width and height!");
    }
    let dimensions;
    if (target === TEXTURE_3D$1 || target === TEXTURE_2D_ARRAY$1) {
      if (!width && !height && !depth) {
        const size = Math.cbrt(numElements);
        if (size % 1 !== 0) {
          throw new Error(`can't guess cube size of array of numElements: ${numElements}`);
        }
        width = size;
        height = size;
        depth = size;
      } else if (width && (!height || !depth)) {
        dimensions = guessDimensions(gl, target, height, depth, numElements / width);
        height = dimensions.width;
        depth = dimensions.height;
      } else if (height && (!width || !depth)) {
        dimensions = guessDimensions(gl, target, width, depth, numElements / height);
        width = dimensions.width;
        depth = dimensions.height;
      } else {
        dimensions = guessDimensions(gl, target, width, height, numElements / depth);
        width = dimensions.width;
        height = dimensions.height;
      }
    } else {
      dimensions = guessDimensions(gl, target, width, height, numElements);
      width = dimensions.width;
      height = dimensions.height;
    }
  }

  return {
    width,
    height,
    depth,
  };
}

/**
 * Sets a texture with no contents of a certain size. In other words calls `gl.texImage2D` with `null`.
 * You must set `options.width` and `options.height`.
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the WebGLTexture to set parameters for
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @memberOf module:twgl/textures
 */
function setEmptyTexture(gl, tex, options) {
  const target = options.target || TEXTURE_2D$2;
  gl.bindTexture(target, tex);
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA$1;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  const type = options.type || formatType.type;
  scopedSetPackState(gl, options, () => {
    if (target === TEXTURE_CUBE_MAP$1) {
      for (let ii = 0; ii < 6; ++ii) {
        gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, options.width, options.height, 0, format, type, null);
      }
    } else if (target === TEXTURE_3D$1 || target === TEXTURE_2D_ARRAY$1) {
      gl.texImage3D(target, level, internalFormat, options.width, options.height, options.depth, 0, format, type, null);
    } else {
      gl.texImage2D(target, level, internalFormat, options.width, options.height, 0, format, type, null);
    }
  });
}

/**
 * Creates a texture based on the options passed in.
 *
 * See {@link module:twgl.TextureOptions}
 *
 * Note: may reset UNPACK_ALIGNMENT, UNPACK_ROW_LENGTH, UNPACK_IMAGE_HEIGHT, UNPACK_SKIP_IMAGES
 * UNPACK_SKIP_PIXELS, and UNPACK_SKIP_ROWS
 *
 * UNPACK_FLIP_Y_WEBGL, UNPACK_PREMULTIPLY_ALPHA_WEBGL, UNPACK_COLORSPACE_CONVERSION_WEBGL
 * are left as is though you can pass in options for flipY, premultiplyAlpha, and colorspaceConversion
 * to override them.
 *
 * As for the behavior of these settings
 *
 * ```js
 * gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
 * t1 = twgl.createTexture({src: someImage }); // flipped
 * t2 = twgl.createTexture({src: someImage, flipY: true }); // flipped
 * t3 = twgl.createTexture({src: someImage, flipY: false }); // not flipped
 * t4 = twgl.createTexture({src: someImage }); // flipped
 * ```
 *
 * * t1 is flipped because UNPACK_FLIP_Y_WEBGL is true
 * * t2 is flipped because it was requested
 * * t3 is not flipped because it was requested
 * * t4 is flipped because UNPACK_FLIP_Y_WEBGL has been restored to true
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @param {module:twgl.TextureReadyCallback} [callback] A callback called when an image has been downloaded and uploaded to the texture.
 * @return {WebGLTexture} the created texture.
 * @memberOf module:twgl/textures
 */
function createTexture(gl, options, callback) {
  callback = callback || noop;
  options = options || defaults$1.textureOptions;
  const tex = gl.createTexture();
  const target = options.target || TEXTURE_2D$2;
  let width  = options.width  || 1;
  let height = options.height || 1;
  let lastMipLevelUploaded = 0;
  const internalFormat = options.internalFormat || RGBA$1;
  gl.bindTexture(target, tex);
  if (target === TEXTURE_CUBE_MAP$1) {
    // this should have been the default for cubemaps :(
    gl.texParameteri(target, TEXTURE_WRAP_S, CLAMP_TO_EDGE$1);
    gl.texParameteri(target, TEXTURE_WRAP_T, CLAMP_TO_EDGE$1);
  }
  let src = options.src;
  if (src) {
    if (typeof src === "function") {
      src = src(gl, options);
    }
    if (typeof (src) === "string") {
      loadTextureFromUrl(gl, tex, options, callback);
    } else if (isArrayBuffer(src) ||
               (Array.isArray(src) && (
                    typeof src[0] === 'number' ||
                    Array.isArray(src[0]) ||
                    isArrayBuffer(src[0]))
               )
              ) {
      const dimensions = setTextureFromArray(gl, tex, src, options);
      width  = dimensions.width;
      height = dimensions.height;
      lastMipLevelUploaded = dimensions.lastMipLevelUploaded;
    } else if (Array.isArray(src) && (typeof (src[0]) === 'string' || isTexImageSource(src[0]))) {
      if (target === TEXTURE_CUBE_MAP$1) {
        loadCubemapFromUrls(gl, tex, options, callback);
      } else {
        loadSlicesFromUrls(gl, tex, options, callback);
      }
    } else { // if (isTexImageSource(src))
      setTextureFromElement(gl, tex, src, options);
      width  = src.width;
      height = src.height;
    }
  } else {
    setEmptyTexture(gl, tex, options);
  }
  if (shouldAutomaticallySetTextureFilteringForSize(options)) {
    setTextureFilteringForSizeInternal(gl, tex, { options, width, height, internalFormat, lastMipLevelUploaded });
  }
  setTextureParameters(gl, tex, options);
  return tex;
}

/**
 * Value returned by createTextureAsync
 *
 * @typedef {Object} CreateTextureInfo
 * @param {WebGLTexture} texture the texture.
 * @param {module:twgl.TextureSrc} source image(s) used to as the src for the texture
 * @memberOf module:twgl
 */

/**
 * Creates a texture based on the options passed in.
 *
 * see {@link module:twgl/textures.createTexture}.
 * The only difference is this function returns a promise
 * where as the other returns a texture and takes a callback.
 *
 * Note: this is here for completeness. It is probably better to use
 * the non-async version as it returns a usable texture immediately
 * where as this one you have to wait for it to load.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.TextureOptions} [options] A TextureOptions object with whatever parameters you want set.
 * @return {Promise<CreateTextureInfo>} The created texture and source.
 */
function createTextureAsync(gl, options) {
  return new Promise((resolve, reject) => {
    createTexture(gl, options, (err, texture, source) => {
      if (err) {
        reject(err);
      } else {
        resolve({ texture, source });
      }
    });
  });
}

/**
 * Resizes a texture based on the options passed in.
 *
 * Note: This is not a generic resize anything function.
 * It's mostly used by {@link module:twgl.resizeFramebufferInfo}
 * It will use `options.src` if it exists to try to determine a `type`
 * otherwise it will assume `gl.UNSIGNED_BYTE`. No data is provided
 * for the texture. Texture parameters will be set accordingly
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {WebGLTexture} tex the texture to resize
 * @param {module:twgl.TextureOptions} options A TextureOptions object with whatever parameters you want set.
 * @param {number} [width] the new width. If not passed in will use `options.width`
 * @param {number} [height] the new height. If not passed in will use `options.height`
 * @param {number} [depth] the new depth. If not passed in will use `options.depth`
 * @memberOf module:twgl/textures
 */
function resizeTexture(gl, tex, options, width, height, depth) {
  width = width || options.width;
  height = height || options.height;
  depth = depth || options.depth;
  const target = options.target || TEXTURE_2D$2;
  gl.bindTexture(target, tex);
  const level = options.level || 0;
  const internalFormat = options.internalFormat || options.format || RGBA$1;
  const formatType = getFormatAndTypeForInternalFormat(internalFormat);
  const format = options.format || formatType.format;
  let type;
  const src = options.src;
  if (!src) {
    type = options.type || formatType.type;
  } else if (isArrayBuffer(src) || (Array.isArray(src) && typeof (src[0]) === 'number')) {
    type = options.type || getTextureTypeForArrayType(gl, src, formatType.type);
  } else {
    type = options.type || formatType.type;
  }
  if (target === TEXTURE_CUBE_MAP$1) {
    for (let ii = 0; ii < 6; ++ii) {
      gl.texImage2D(TEXTURE_CUBE_MAP_POSITIVE_X + ii, level, internalFormat, width, height, 0, format, type, null);
    }
  } else if (target === TEXTURE_3D$1 || target === TEXTURE_2D_ARRAY$1) {
    gl.texImage3D(target, level, internalFormat, width, height, depth, 0, format, type, null);
  } else {
    gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
  }
}

/**
 * Check if a src is an async request.
 * if src is a string we're going to download an image
 * if src is an array of strings we're going to download cubemap images
 * @param {*} src The src from a TextureOptions
 * @returns {bool} true if src is async.
 * @private
 */
function isAsyncSrc(src) {
  return typeof src === 'string' ||
         (Array.isArray(src) && typeof src[0] === 'string');
}

/**
 * Creates a bunch of textures based on the passed in options.
 *
 * Example:
 *
 *     const textures = twgl.createTextures(gl, {
 *       // a power of 2 image
 *       hftIcon: { src: "images/hft-icon-16.png", mag: gl.NEAREST },
 *       // a non-power of 2 image
 *       clover: { src: "images/clover.jpg" },
 *       // From a canvas
 *       fromCanvas: { src: ctx.canvas },
 *       // A cubemap from 6 images
 *       yokohama: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: [
 *           'images/yokohama/posx.jpg',
 *           'images/yokohama/negx.jpg',
 *           'images/yokohama/posy.jpg',
 *           'images/yokohama/negy.jpg',
 *           'images/yokohama/posz.jpg',
 *           'images/yokohama/negz.jpg',
 *         ],
 *       },
 *       // A cubemap from 1 image (can be 1x6, 2x3, 3x2, 6x1)
 *       goldengate: {
 *         target: gl.TEXTURE_CUBE_MAP,
 *         src: 'images/goldengate.jpg',
 *       },
 *       // A 2x2 pixel texture from a JavaScript array
 *       checker: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         src: [
 *           255,255,255,255,
 *           192,192,192,255,
 *           192,192,192,255,
 *           255,255,255,255,
 *         ],
 *       },
 *       // a 1x2 pixel texture from a typed array.
 *       stripe: {
 *         mag: gl.NEAREST,
 *         min: gl.LINEAR,
 *         format: gl.LUMINANCE,
 *         src: new Uint8Array([
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *           255,
 *           128,
 *         ]),
 *         width: 1,
 *       },
 *     });
 *
 * Now
 *
 * *   `textures.hftIcon` will be a 2d texture
 * *   `textures.clover` will be a 2d texture
 * *   `textures.fromCanvas` will be a 2d texture
 * *   `textures.yohohama` will be a cubemap texture
 * *   `textures.goldengate` will be a cubemap texture
 * *   `textures.checker` will be a 2d texture
 * *   `textures.stripe` will be a 2d texture
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
 * @param {module:twgl.TexturesReadyCallback} [callback] A callback called when all textures have been downloaded.
 * @return {Object.<string,WebGLTexture>} the created textures by name
 * @memberOf module:twgl/textures
 */
function createTextures(gl, textureOptions, callback) {
  callback = callback || noop;
  let numDownloading = 0;
  const errors = [];
  const textures = {};
  const images = {};

  function callCallbackIfReady() {
    if (numDownloading === 0) {
      setTimeout(function() {
        callback(errors.length ? errors : undefined, textures, images);
      }, 0);
    }
  }

  Object.keys(textureOptions).forEach(function(name) {
    const options = textureOptions[name];
    let onLoadFn;
    if (isAsyncSrc(options.src)) {
      onLoadFn = function(err, tex, img) {
        images[name] = img;
        --numDownloading;
        if (err) {
          errors.push(err);
        }
        callCallbackIfReady();
      };
      ++numDownloading;
    }
    textures[name] = createTexture(gl, options, onLoadFn);
  });

  // queue the callback if there are no images to download.
  // We do this because if your code is structured to wait for
  // images to download but then you comment out all the async
  // images your code would break.
  callCallbackIfReady();

  return textures;
}

/**
 * Value returned by createTextureAsync
 *
 * @typedef {Object} CreateTexturesInfo
 * @param {Object.<string, WebGLTexture>} textures the created textures by name. Same as returned by {@link module:twgl.createTextures}.
 * @param {Object.<string, module:twgl.TextureSrc>} sources the image(s) used for the texture by name.
 * @memberOf module:twgl
 */

/**
 * Creates textures based on the options passed in.
 *
 * see {@link module:twgl/textures.createTextures}.
 * The only difference is this function returns a promise
 * where as the other returns a texture and takes a callback.
 *
 * Note: this is here for completeness. It is probably better to use
 * the non-async version as it returns usable textures immediately
 * where as this one you have to wait for them to load.
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string,module:twgl.TextureOptions>} options A object of TextureOptions one per texture.
 * @return {Promise<CreateTexturesInfo>} The created textures and sources.
 */
function createTexturesAsync(gl, options) {
  return new Promise((resolve, reject) => {
    createTexture(gl, options, (err, textures, sources) => {
      if (err) {
        reject(err);
      } else {
        resolve({ textures, sources });
      }
    });
  });
}

var textures = /*#__PURE__*/Object.freeze({
  __proto__: null,
  setTextureDefaults_: setDefaults$1,
  createSampler: createSampler,
  createSamplers: createSamplers,
  setSamplerParameters: setSamplerParameters,
  createTexture: createTexture,
  createTextureAsync: createTextureAsync,
  setEmptyTexture: setEmptyTexture,
  setTextureFromArray: setTextureFromArray,
  loadTextureFromUrl: loadTextureFromUrl,
  setTextureFromElement: setTextureFromElement,
  setTextureFilteringForSize: setTextureFilteringForSize,
  setTextureParameters: setTextureParameters,
  setDefaultTextureColor: setDefaultTextureColor,
  createTextures: createTextures,
  createTexturesAsync: createTexturesAsync,
  resizeTexture: resizeTexture,
  canGenerateMipmap: canGenerateMipmap,
  canFilter: canFilter,
  getNumComponentsForFormat: getNumComponentsForFormat,
  getBytesPerElementForInternalFormat: getBytesPerElementForInternalFormat,
  getFormatAndTypeForInternalFormat: getFormatAndTypeForInternalFormat
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * Low level shader program related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.programs` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/programs
 */

const error = error$1;
const warn = warn$1;
function getElementById(id) {
  return (typeof document !== 'undefined' && document.getElementById)
      ? document.getElementById(id)
      : null;
}

const TEXTURE0                       = 0x84c0;
const DYNAMIC_DRAW                   = 0x88e8;

const ARRAY_BUFFER                   = 0x8892;
const ELEMENT_ARRAY_BUFFER$1           = 0x8893;
const UNIFORM_BUFFER                 = 0x8a11;
const TRANSFORM_FEEDBACK_BUFFER      = 0x8c8e;

const TRANSFORM_FEEDBACK             = 0x8e22;

const COMPILE_STATUS                 = 0x8b81;
const LINK_STATUS                    = 0x8b82;
const FRAGMENT_SHADER                = 0x8b30;
const VERTEX_SHADER                  = 0x8b31;
const SEPARATE_ATTRIBS               = 0x8c8d;

const ACTIVE_UNIFORMS                = 0x8b86;
const ACTIVE_ATTRIBUTES              = 0x8b89;
const TRANSFORM_FEEDBACK_VARYINGS    = 0x8c83;
const ACTIVE_UNIFORM_BLOCKS          = 0x8a36;
const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER   = 0x8a44;
const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
const UNIFORM_BLOCK_DATA_SIZE                     = 0x8a40;
const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES        = 0x8a43;

const FLOAT                         = 0x1406;
const FLOAT_VEC2                    = 0x8B50;
const FLOAT_VEC3                    = 0x8B51;
const FLOAT_VEC4                    = 0x8B52;
const INT                           = 0x1404;
const INT_VEC2                      = 0x8B53;
const INT_VEC3                      = 0x8B54;
const INT_VEC4                      = 0x8B55;
const BOOL                          = 0x8B56;
const BOOL_VEC2                     = 0x8B57;
const BOOL_VEC3                     = 0x8B58;
const BOOL_VEC4                     = 0x8B59;
const FLOAT_MAT2                    = 0x8B5A;
const FLOAT_MAT3                    = 0x8B5B;
const FLOAT_MAT4                    = 0x8B5C;
const SAMPLER_2D                    = 0x8B5E;
const SAMPLER_CUBE                  = 0x8B60;
const SAMPLER_3D                    = 0x8B5F;
const SAMPLER_2D_SHADOW             = 0x8B62;
const FLOAT_MAT2x3                  = 0x8B65;
const FLOAT_MAT2x4                  = 0x8B66;
const FLOAT_MAT3x2                  = 0x8B67;
const FLOAT_MAT3x4                  = 0x8B68;
const FLOAT_MAT4x2                  = 0x8B69;
const FLOAT_MAT4x3                  = 0x8B6A;
const SAMPLER_2D_ARRAY              = 0x8DC1;
const SAMPLER_2D_ARRAY_SHADOW       = 0x8DC4;
const SAMPLER_CUBE_SHADOW           = 0x8DC5;
const UNSIGNED_INT                  = 0x1405;
const UNSIGNED_INT_VEC2             = 0x8DC6;
const UNSIGNED_INT_VEC3             = 0x8DC7;
const UNSIGNED_INT_VEC4             = 0x8DC8;
const INT_SAMPLER_2D                = 0x8DCA;
const INT_SAMPLER_3D                = 0x8DCB;
const INT_SAMPLER_CUBE              = 0x8DCC;
const INT_SAMPLER_2D_ARRAY          = 0x8DCF;
const UNSIGNED_INT_SAMPLER_2D       = 0x8DD2;
const UNSIGNED_INT_SAMPLER_3D       = 0x8DD3;
const UNSIGNED_INT_SAMPLER_CUBE     = 0x8DD4;
const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;

const TEXTURE_2D$1                    = 0x0DE1;
const TEXTURE_CUBE_MAP              = 0x8513;
const TEXTURE_3D                    = 0x806F;
const TEXTURE_2D_ARRAY              = 0x8C1A;

const typeMap = {};

/**
 * Returns the corresponding bind point for a given sampler type
 * @private
 */
function getBindPointForSamplerType(gl, type) {
  return typeMap[type].bindPoint;
}

// This kind of sucks! If you could compose functions as in `var fn = gl[name];`
// this code could be a lot smaller but that is sadly really slow (T_T)

function floatSetter(gl, location) {
  return function(v) {
    gl.uniform1f(location, v);
  };
}

function floatArraySetter(gl, location) {
  return function(v) {
    gl.uniform1fv(location, v);
  };
}

function floatVec2Setter(gl, location) {
  return function(v) {
    gl.uniform2fv(location, v);
  };
}

function floatVec3Setter(gl, location) {
  return function(v) {
    gl.uniform3fv(location, v);
  };
}

function floatVec4Setter(gl, location) {
  return function(v) {
    gl.uniform4fv(location, v);
  };
}

function intSetter(gl, location) {
  return function(v) {
    gl.uniform1i(location, v);
  };
}

function intArraySetter(gl, location) {
  return function(v) {
    gl.uniform1iv(location, v);
  };
}

function intVec2Setter(gl, location) {
  return function(v) {
    gl.uniform2iv(location, v);
  };
}

function intVec3Setter(gl, location) {
  return function(v) {
    gl.uniform3iv(location, v);
  };
}

function intVec4Setter(gl, location) {
  return function(v) {
    gl.uniform4iv(location, v);
  };
}

function uintSetter(gl, location) {
  return function(v) {
    gl.uniform1ui(location, v);
  };
}

function uintArraySetter(gl, location) {
  return function(v) {
    gl.uniform1uiv(location, v);
  };
}

function uintVec2Setter(gl, location) {
  return function(v) {
    gl.uniform2uiv(location, v);
  };
}

function uintVec3Setter(gl, location) {
  return function(v) {
    gl.uniform3uiv(location, v);
  };
}

function uintVec4Setter(gl, location) {
  return function(v) {
    gl.uniform4uiv(location, v);
  };
}

function floatMat2Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix2fv(location, false, v);
  };
}

function floatMat3Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix3fv(location, false, v);
  };
}

function floatMat4Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix4fv(location, false, v);
  };
}

function floatMat23Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix2x3fv(location, false, v);
  };
}

function floatMat32Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix3x2fv(location, false, v);
  };
}

function floatMat24Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix2x4fv(location, false, v);
  };
}

function floatMat42Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix4x2fv(location, false, v);
  };
}

function floatMat34Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix3x4fv(location, false, v);
  };
}

function floatMat43Setter(gl, location) {
  return function(v) {
    gl.uniformMatrix4x3fv(location, false, v);
  };
}

function samplerSetter(gl, type, unit, location) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  return isWebGL2(gl) ? function(textureOrPair) {
    let texture;
    let sampler;
    if (!textureOrPair || isTexture(gl, textureOrPair)) {
      texture = textureOrPair;
      sampler = null;
    } else {
      texture = textureOrPair.texture;
      sampler = textureOrPair.sampler;
    }
    gl.uniform1i(location, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
    gl.bindSampler(unit, sampler);
  } : function(texture) {
    gl.uniform1i(location, unit);
    gl.activeTexture(TEXTURE0 + unit);
    gl.bindTexture(bindPoint, texture);
  };
}

function samplerArraySetter(gl, type, unit, location, size) {
  const bindPoint = getBindPointForSamplerType(gl, type);
  const units = new Int32Array(size);
  for (let ii = 0; ii < size; ++ii) {
    units[ii] = unit + ii;
  }

  return isWebGL2(gl) ? function(textures) {
    gl.uniform1iv(location, units);
    textures.forEach(function(textureOrPair, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      let texture;
      let sampler;
      if (!textureOrPair || isTexture(gl, textureOrPair)) {
        texture = textureOrPair;
        sampler = null;
      } else {
        texture = textureOrPair.texture;
        sampler = textureOrPair.sampler;
      }
      gl.bindSampler(unit, sampler);
      gl.bindTexture(bindPoint, texture);
    });
  } : function(textures) {
    gl.uniform1iv(location, units);
    textures.forEach(function(texture, index) {
      gl.activeTexture(TEXTURE0 + units[index]);
      gl.bindTexture(bindPoint, texture);
    });
  };
}

typeMap[FLOAT]                         = { Type: Float32Array, size:  4, setter: floatSetter,      arraySetter: floatArraySetter, };
typeMap[FLOAT_VEC2]                    = { Type: Float32Array, size:  8, setter: floatVec2Setter,  cols: 2, };
typeMap[FLOAT_VEC3]                    = { Type: Float32Array, size: 12, setter: floatVec3Setter,  cols: 3, };
typeMap[FLOAT_VEC4]                    = { Type: Float32Array, size: 16, setter: floatVec4Setter,  cols: 4, };
typeMap[INT]                           = { Type: Int32Array,   size:  4, setter: intSetter,        arraySetter: intArraySetter, };
typeMap[INT_VEC2]                      = { Type: Int32Array,   size:  8, setter: intVec2Setter,    cols: 2, };
typeMap[INT_VEC3]                      = { Type: Int32Array,   size: 12, setter: intVec3Setter,    cols: 3, };
typeMap[INT_VEC4]                      = { Type: Int32Array,   size: 16, setter: intVec4Setter,    cols: 4, };
typeMap[UNSIGNED_INT]                  = { Type: Uint32Array,  size:  4, setter: uintSetter,       arraySetter: uintArraySetter, };
typeMap[UNSIGNED_INT_VEC2]             = { Type: Uint32Array,  size:  8, setter: uintVec2Setter,   cols: 2, };
typeMap[UNSIGNED_INT_VEC3]             = { Type: Uint32Array,  size: 12, setter: uintVec3Setter,   cols: 3, };
typeMap[UNSIGNED_INT_VEC4]             = { Type: Uint32Array,  size: 16, setter: uintVec4Setter,   cols: 4, };
typeMap[BOOL]                          = { Type: Uint32Array,  size:  4, setter: intSetter,        arraySetter: intArraySetter, };
typeMap[BOOL_VEC2]                     = { Type: Uint32Array,  size:  8, setter: intVec2Setter,    cols: 2, };
typeMap[BOOL_VEC3]                     = { Type: Uint32Array,  size: 12, setter: intVec3Setter,    cols: 3, };
typeMap[BOOL_VEC4]                     = { Type: Uint32Array,  size: 16, setter: intVec4Setter,    cols: 4, };
typeMap[FLOAT_MAT2]                    = { Type: Float32Array, size: 32, setter: floatMat2Setter,  rows: 2, cols: 2, };
typeMap[FLOAT_MAT3]                    = { Type: Float32Array, size: 48, setter: floatMat3Setter,  rows: 3, cols: 3, };
typeMap[FLOAT_MAT4]                    = { Type: Float32Array, size: 64, setter: floatMat4Setter,  rows: 4, cols: 4, };
typeMap[FLOAT_MAT2x3]                  = { Type: Float32Array, size: 32, setter: floatMat23Setter, rows: 2, cols: 3, };
typeMap[FLOAT_MAT2x4]                  = { Type: Float32Array, size: 32, setter: floatMat24Setter, rows: 2, cols: 4, };
typeMap[FLOAT_MAT3x2]                  = { Type: Float32Array, size: 48, setter: floatMat32Setter, rows: 3, cols: 2, };
typeMap[FLOAT_MAT3x4]                  = { Type: Float32Array, size: 48, setter: floatMat34Setter, rows: 3, cols: 4, };
typeMap[FLOAT_MAT4x2]                  = { Type: Float32Array, size: 64, setter: floatMat42Setter, rows: 4, cols: 2, };
typeMap[FLOAT_MAT4x3]                  = { Type: Float32Array, size: 64, setter: floatMat43Setter, rows: 4, cols: 3, };
typeMap[SAMPLER_2D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[SAMPLER_CUBE]                  = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
typeMap[SAMPLER_3D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D,       };
typeMap[SAMPLER_2D_SHADOW]             = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[SAMPLER_2D_ARRAY]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };
typeMap[SAMPLER_2D_ARRAY_SHADOW]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };
typeMap[SAMPLER_CUBE_SHADOW]           = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
typeMap[INT_SAMPLER_2D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[INT_SAMPLER_3D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D,       };
typeMap[INT_SAMPLER_CUBE]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
typeMap[INT_SAMPLER_2D_ARRAY]          = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };
typeMap[UNSIGNED_INT_SAMPLER_2D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
typeMap[UNSIGNED_INT_SAMPLER_3D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D,       };
typeMap[UNSIGNED_INT_SAMPLER_CUBE]     = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP, };
typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY, };

function floatAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      switch (b.value.length) {
        case 4:
          gl.vertexAttrib4fv(index, b.value);
          break;
        case 3:
          gl.vertexAttrib3fv(index, b.value);
          break;
        case 2:
          gl.vertexAttrib2fv(index, b.value);
          break;
        case 1:
          gl.vertexAttrib1fv(index, b.value);
          break;
        default:
          throw new Error('the length of a float constant value must be between 1 and 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribPointer(
          index, b.numComponents || b.size, b.type || FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index, b.divisor || 0);
      }
    }
  };
}

function intAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4iv(index, b.value);
      } else {
        throw new Error('The length of an integer constant value must be 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(
          index, b.numComponents || b.size, b.type || INT, b.stride || 0, b.offset || 0);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index, b.divisor || 0);
      }
    }
  };
}

function uintAttribSetter(gl, index) {
  return function(b) {
    if (b.value) {
      gl.disableVertexAttribArray(index);
      if (b.value.length === 4) {
        gl.vertexAttrib4uiv(index, b.value);
      } else {
        throw new Error('The length of an unsigned integer constant value must be 4!');
      }
    } else {
      gl.bindBuffer(ARRAY_BUFFER, b.buffer);
      gl.enableVertexAttribArray(index);
      gl.vertexAttribIPointer(
          index, b.numComponents || b.size, b.type || UNSIGNED_INT, b.stride || 0, b.offset || 0);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index, b.divisor || 0);
      }
    }
  };
}

function matAttribSetter(gl, index, typeInfo) {
  const defaultSize = typeInfo.size;
  const count = typeInfo.count;

  return function(b) {
    gl.bindBuffer(ARRAY_BUFFER, b.buffer);
    const numComponents = b.size || b.numComponents || defaultSize;
    const size = numComponents / count;
    const type = b.type || FLOAT;
    const typeInfo = typeMap[type];
    const stride = typeInfo.size * numComponents;
    const normalize = b.normalize || false;
    const offset = b.offset || 0;
    const rowOffset = stride / count;
    for (let i = 0; i < count; ++i) {
      gl.enableVertexAttribArray(index + i);
      gl.vertexAttribPointer(
          index + i, size, type, normalize, stride, offset + rowOffset * i);
      if (gl.vertexAttribDivisor) {
        gl.vertexAttribDivisor(index + i, b.divisor || 0);
      }
    }
  };
}



const attrTypeMap = {};
attrTypeMap[FLOAT]             = { size:  4, setter: floatAttribSetter, };
attrTypeMap[FLOAT_VEC2]        = { size:  8, setter: floatAttribSetter, };
attrTypeMap[FLOAT_VEC3]        = { size: 12, setter: floatAttribSetter, };
attrTypeMap[FLOAT_VEC4]        = { size: 16, setter: floatAttribSetter, };
attrTypeMap[INT]               = { size:  4, setter: intAttribSetter,   };
attrTypeMap[INT_VEC2]          = { size:  8, setter: intAttribSetter,   };
attrTypeMap[INT_VEC3]          = { size: 12, setter: intAttribSetter,   };
attrTypeMap[INT_VEC4]          = { size: 16, setter: intAttribSetter,   };
attrTypeMap[UNSIGNED_INT]      = { size:  4, setter: uintAttribSetter,  };
attrTypeMap[UNSIGNED_INT_VEC2] = { size:  8, setter: uintAttribSetter,  };
attrTypeMap[UNSIGNED_INT_VEC3] = { size: 12, setter: uintAttribSetter,  };
attrTypeMap[UNSIGNED_INT_VEC4] = { size: 16, setter: uintAttribSetter,  };
attrTypeMap[BOOL]              = { size:  4, setter: intAttribSetter,   };
attrTypeMap[BOOL_VEC2]         = { size:  8, setter: intAttribSetter,   };
attrTypeMap[BOOL_VEC3]         = { size: 12, setter: intAttribSetter,   };
attrTypeMap[BOOL_VEC4]         = { size: 16, setter: intAttribSetter,   };
attrTypeMap[FLOAT_MAT2]        = { size:  4, setter: matAttribSetter,   count: 2, };
attrTypeMap[FLOAT_MAT3]        = { size:  9, setter: matAttribSetter,   count: 3, };
attrTypeMap[FLOAT_MAT4]        = { size: 16, setter: matAttribSetter,   count: 4, };

const errorRE = /ERROR:\s*\d+:(\d+)/gi;
function addLineNumbersWithError(src, log = '', lineOffset = 0) {
  // Note: Error message formats are not defined by any spec so this may or may not work.
  const matches = [...log.matchAll(errorRE)];
  const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
    const lineNo = parseInt(m[1]);
    const next = matches[ndx + 1];
    const end = next ? next.index : log.length;
    const msg = log.substring(m.index, end);
    return [lineNo - 1, msg];
  }));
  return src.split('\n').map((line, lineNo) => {
    const err = lineNoToErrorMap.get(lineNo);
    return `${lineNo + 1 + lineOffset}: ${line}${err ? `\n\n^^^ ${err}` : ''}`;
  }).join('\n');
}

/**
 * Error Callback
 * @callback ErrorCallback
 * @param {string} msg error message.
 * @param {number} [lineOffset] amount to add to line number
 * @memberOf module:twgl
 */

/**
 * Program Callback
 * @callback ProgramCallback
 * @param {string} [err] error message, falsy if no error
 * @param {WebGLProgram|module:twgl.ProgramInfo} [result] the program or programInfo
 */

const spaceRE = /^[ \t]*\n/;

/**
 * Remove the first end of line because WebGL 2.0 requires
 * #version 300 es
 * as the first line. No whitespace allowed before that line
 * so
 *
 * <script>
 * #version 300 es
 * </script>
 *
 * Has one line before it which is invalid according to GLSL ES 3.00
 *
 * @param {string} shaderSource The source of the shader
 * @returns {{shaderSource: string, lineOffset: number}}
 * @private
 */
function prepShaderSource(shaderSource) {
  let lineOffset = 0;
  if (spaceRE.test(shaderSource)) {
    lineOffset = 1;
    shaderSource = shaderSource.replace(spaceRE, '');
  }
  return {lineOffset, shaderSource};
}

/**
 * @param {module:twgl.ProgramOptions} progOptions
 * @param {string} msg
 * @return null
 * @private
 */
function reportError(progOptions, msg) {
  progOptions.errorCallback(msg);
  if (progOptions.callback) {
    setTimeout(() => {
      progOptions.callback(`${msg}\n${progOptions.errors.join('\n')}`);
    });
  }
  return null;
}

/**
 * Check Shader status
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {number} shaderType The shader type
 * @param {WebGLShader} shader The shader
 * @param {ErrorCallback} [errFn] function to receive error message.
 * @return {string} errors or empty string
 * @private
 */
function checkShaderStatus(gl, shaderType, shader, errFn) {
  errFn = errFn || error;
  // Check the compile status
  const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    const lastError = gl.getShaderInfoLog(shader);
    const {lineOffset, shaderSource} = prepShaderSource(gl.getShaderSource(shader));
    const error = `${addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${glEnumToString(gl, shaderType)}: ${lastError}`;
    errFn(error);
    return error;
  }
  return '';
}

/**
 * @typedef {Object} FullProgramSpec
 * @property {string[]} shaders the shader source or element ids.
 * @property {function(string)} [errorCallback] callback for errors
 * @property {Object.<string,number>|string[]} [attribLocations] a attribute name to location map, or array of attribute names where index = location.
 * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
 *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
 *   you can pass an array of names.
 * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
 * @property {ProgramCallback} [callback] callback for async program compilation.
 * @memberOf module:twgl
 */

/**
 * @typedef {string[]|module:twgl.FullProgramSpec} ProgramSpec
 * @memberOf module:twgl
 */

/**
 * @typedef {Object} ProgramOptions
 * @property {function(string)} [errorCallback] callback for errors
 * @property {Object.<string,number>|string[]} [attribLocations] a attribute name to location map, or array of attribute names where index = location.
 * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
 *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
 *   you can pass an array of names.
 * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
 * @property {ProgramCallback} [callback] callback for async program compilation.
 * @memberOf module:twgl
 */

/**
 * Gets the program options based on all these optional arguments
 * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
 * @private
 */
function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
  let transformFeedbackVaryings;
  let transformFeedbackMode;
  let callback;
  if (typeof opt_locations === 'function') {
    opt_errorCallback = opt_locations;
    opt_locations = undefined;
  }
  if (typeof opt_attribs === 'function') {
    opt_errorCallback = opt_attribs;
    opt_attribs = undefined;
  } else if (opt_attribs && !Array.isArray(opt_attribs)) {
    const opt = opt_attribs;
    opt_errorCallback = opt.errorCallback;
    opt_attribs = opt.attribLocations;
    transformFeedbackVaryings = opt.transformFeedbackVaryings;
    transformFeedbackMode = opt.transformFeedbackMode;
    callback = opt.callback;
  }

  const errorCallback = opt_errorCallback || error;
  const errors = [];
  const options = {
    errorCallback(msg, ...args) {
      errors.push(msg);
      errorCallback(msg, ...args);
    },
    transformFeedbackVaryings,
    transformFeedbackMode,
    callback,
    errors,
  };

  {
    let attribLocations = {};
    if (Array.isArray(opt_attribs)) {
      opt_attribs.forEach(function(attrib,  ndx) {
        attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
      });
    } else {
      attribLocations = opt_attribs || {};
    }
    options.attribLocations = attribLocations;
  }

  return options;
}

const defaultShaderType = [
  "VERTEX_SHADER",
  "FRAGMENT_SHADER",
];

function getShaderTypeFromScriptType(gl, scriptType) {
  if (scriptType.indexOf("frag") >= 0) {
    return FRAGMENT_SHADER;
  } else if (scriptType.indexOf("vert") >= 0) {
    return VERTEX_SHADER;
  }
  return undefined;
}

function deleteProgramAndShaders(gl, program, notThese) {
  const shaders = gl.getAttachedShaders(program);
  for (const shader of shaders) {
    if (!notThese.has(shader)) {
      gl.deleteShader(shader);
    }
  }
  gl.deleteProgram(program);
}

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

function createProgramNoCheck(gl, shaders, programOptions) {
  const program = gl.createProgram();
  const {
    attribLocations,
    transformFeedbackVaryings,
    transformFeedbackMode,
  } = getProgramOptions(programOptions);

  for (let ndx = 0; ndx < shaders.length; ++ndx) {
    let shader = shaders[ndx];
    if (typeof shader === 'string') {
      const elem = getElementById(shader);
      const src = elem ? elem.text : shader;
      let type = gl[defaultShaderType[ndx]];
      if (elem && elem.type) {
        type = getShaderTypeFromScriptType(gl, elem.type) || type;
      }
      shader = gl.createShader(type);
      gl.shaderSource(shader, prepShaderSource(src).shaderSource);
      gl.compileShader(shader);
    }
    gl.attachShader(program, shader);
  }

  Object.entries(attribLocations).forEach(([attrib, loc]) => gl.bindAttribLocation(program, loc, attrib));

  {
    let varyings = transformFeedbackVaryings;
    if (varyings) {
      if (varyings.attribs) {
        varyings = varyings.attribs;
      }
      if (!Array.isArray(varyings)) {
        varyings = Object.keys(varyings);
      }
      gl.transformFeedbackVaryings(program, varyings, transformFeedbackMode || SEPARATE_ATTRIBS);
    }
  }

  gl.linkProgram(program);
  return program;
}

/**
 * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
 * program.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgram(gl, [vs, fs], options);
 *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error of a callback was provided.
 * @memberOf module:twgl/programs
 */
function createProgram(
    gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  // This code is really convoluted, because it may or may not be async
  // Maybe it would be better to have a separate function
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaderSet = new Set(shaders);
  const program = createProgramNoCheck(gl, shaders, progOptions);

  function hasErrors(gl, program) {
    const errors = getProgramErrors(gl, program, progOptions.errorCallback);
    if (errors) {
      deleteProgramAndShaders(gl, program, shaderSet);
    }
    return errors;
  }

  if (progOptions.callback) {
    waitForProgramLinkCompletionAsync(gl, program).then(() => {
      const errors = hasErrors(gl, program);
      progOptions.callback(errors, errors ? undefined : program);
    });
    return undefined;
  }

  return hasErrors(gl, program) ? undefined : program;
}

/**
 * This only works because the functions it wraps the first 2 arguments
 * are gl and any, followed by things that become programOptions
 * @private
 */
function wrapCallbackFnToAsyncFn(fn) {
  return function(gl, arg1, ...args) {
    return new Promise((resolve, reject) => {
      const programOptions = getProgramOptions(...args);
      programOptions.callback = (err, program) => {
        if (err) {
          reject(err);
        } else {
          resolve(program);
        }
      };
      fn(gl, arg1, programOptions);
    });
  };
}

/**
 * Same as createProgram but returns a promise
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramAsync(gl, [vs, fs], options);
 *     twgl.createProgramAsync(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramAsync(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramAsync(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @function
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {Promise<WebGLProgram>} The created program
 * @memberOf module:twgl/programs
 */
const createProgramAsync = wrapCallbackFnToAsyncFn(createProgram);

/**
 * Same as createProgramInfo but returns a promise
 * @function
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders or ids. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {Promise<module:twgl.ProgramInfo>} The created ProgramInfo
 * @memberOf module:twgl/programs
 */
const createProgramInfoAsync = wrapCallbackFnToAsyncFn(createProgramInfo);

async function waitForProgramLinkCompletionAsync(gl, program) {
  const ext = gl.getExtension('KHR_parallel_shader_compile');
  const checkFn = ext
      ? (gl, program) => gl.getProgramParameter(program, ext.COMPLETION_STATUS_KHR)
      : () => true;

  let waitTime = 0;
  do {
    await wait(waitTime);  // must wait at least once
    waitTime = 1000 / 60;
  } while (!checkFn(gl, program));
}

async function waitForAllProgramsLinkCompletionAsync(gl, programs) {
  for (const program of Object.values(programs)) {
    await waitForProgramLinkCompletionAsync(gl, program);
  }
}

/**
 * Check a program's link status
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program Program to check
 * @param {ErrorCallback} [errFn] func for errors
 * @return {string?} errors if program is failed, else undefined
 * @private
 */
function getProgramErrors(gl, program, errFn) {
  errFn = errFn || error;
  // Check the link status
  const linked = gl.getProgramParameter(program, LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    errFn(`Error in program linking: ${lastError}`);
    // print any errors from these shaders
    const shaders = gl.getAttachedShaders(program);
    const errors = shaders.map(shader => checkShaderStatus(gl, gl.getShaderParameter(shader, gl.SHADER_TYPE), shader, errFn));
    return `${lastError}\n${errors.filter(_ => _).join('\n')}`;
  }
  return undefined;
}

/**
 * Creates a program from 2 script tags.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromScripts(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderScriptIds Array of ids of the script
 *        tags for the shaders. The first is assumed to be the
 *        vertex shader, the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error or a callback was provided.
 * @memberOf module:twgl/programs
 */
function createProgramFromScripts(
    gl, shaderScriptIds, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const shaders = [];
  for (const scriptId of shaderScriptIds) {
    const shaderScript = getElementById(scriptId);
    if (!shaderScript) {
      return reportError(progOptions, `unknown script element: ${scriptId}`);
    }
    shaders.push(shaderScript.text);
  }
  return createProgram(gl, shaders, progOptions);
}

/**
 * Creates a program from 2 sources.
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram?} the created program or null if error or a callback was provided.
 * @memberOf module:twgl/programs
 */
function createProgramFromSources(
    gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  return createProgram(gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback);
}

/**
 * Returns true if attribute/uniform is a reserved/built in
 *
 * It makes no sense to me why GL returns these because it's
 * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
 * with names that start with `gl_` (and `webgl_` in WebGL)
 *
 * I can only assume they are there because they might count
 * when computing the number of uniforms/attributes used when you want to
 * know if you are near the limit. That doesn't really make sense
 * to me but the fact that these get returned are in the spec.
 *
 * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
 *    `gl.getActiveAttrib`.
 * @return {bool} true if it's reserved
 * @private
 */
function isBuiltIn(info) {
  const name = info.name;
  return name.startsWith("gl_") || name.startsWith("webgl_");
}

const tokenRE = /(\.|\[|]|\w+)/g;
const isDigit = s => s >= '0' && s <= '9';
function addSetterToUniformTree(fullPath, setter, node, uniformSetters) {
  const tokens = fullPath.split(tokenRE).filter(s => s !== '');
  let tokenNdx = 0;
  let path = '';

  for (;;) {
    const token = tokens[tokenNdx++];  // has to be name or number
    path += token;
    const isArrayIndex = isDigit(token[0]);
    const accessor = isArrayIndex
        ? parseInt(token)
        : token;
    if (isArrayIndex) {
      path += tokens[tokenNdx++];  // skip ']'
    }
    const isLastToken = tokenNdx === tokens.length;
    if (isLastToken) {
      node[accessor] = setter;
      break;
    } else {
      const token = tokens[tokenNdx++];  // has to be . or [
      const isArray = token === '[';
      const child = node[accessor] || (isArray ? [] : {});
      node[accessor] = child;
      node = child;
      uniformSetters[path] = uniformSetters[path] || function(node) {
        return function(value) {
          setUniformTree(node, value);
        };
      }(child);
      path += token;
    }
  }
}

/**
 * Creates setter functions for all uniforms of a shader
 * program.
 *
 * @see {@link module:twgl.setUniforms}
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @returns {Object.<string, function>} an object with a setter by name for each uniform
 * @memberOf module:twgl/programs
 */
function createUniformSetters(gl, program) {
  let textureUnit = 0;

  /**
   * Creates a setter for a uniform of the given program with it's
   * location embedded in the setter.
   * @param {WebGLProgram} program
   * @param {WebGLUniformInfo} uniformInfo
   * @returns {function} the created setter.
   */
  function createUniformSetter(program, uniformInfo, location) {
    const isArray = uniformInfo.name.endsWith("[0]");
    const type = uniformInfo.type;
    const typeInfo = typeMap[type];
    if (!typeInfo) {
      throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
    }
    let setter;
    if (typeInfo.bindPoint) {
      // it's a sampler
      const unit = textureUnit;
      textureUnit += uniformInfo.size;
      if (isArray) {
        setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
      } else {
        setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
      }
    } else {
      if (typeInfo.arraySetter && isArray) {
        setter = typeInfo.arraySetter(gl, location);
      } else {
        setter = typeInfo.setter(gl, location);
      }
    }
    setter.location = location;
    return setter;
  }

  const uniformSetters = {};
  const uniformTree = {};
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);

  for (let ii = 0; ii < numUniforms; ++ii) {
    const uniformInfo = gl.getActiveUniform(program, ii);
    if (isBuiltIn(uniformInfo)) {
      continue;
    }
    let name = uniformInfo.name;
    // remove the array suffix.
    if (name.endsWith("[0]")) {
      name = name.substr(0, name.length - 3);
    }
    const location = gl.getUniformLocation(program, uniformInfo.name);
    // the uniform will have no location if it's in a uniform block
    if (location) {
      const setter = createUniformSetter(program, uniformInfo, location);
      uniformSetters[name] = setter;
      addSetterToUniformTree(name, setter, uniformTree, uniformSetters);
    }
  }

  return uniformSetters;
}

/**
 * @typedef {Object} TransformFeedbackInfo
 * @property {number} index index of transform feedback
 * @property {number} type GL type
 * @property {number} size 1 - 4
 * @memberOf module:twgl
 */

/**
 * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {Object<string, module:twgl.TransformFeedbackInfo>}
 * @memberOf module:twgl
 */
function createTransformFeedbackInfo(gl, program) {
  const info = {};
  const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
  for (let ii = 0; ii < numVaryings; ++ii) {
    const varying = gl.getTransformFeedbackVarying(program, ii);
    info[varying.name] = {
      index: ii,
      type: varying.type,
      size: varying.size,
    };
  }
  return info;
}

/**
 * Binds buffers for transform feedback.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {(module:twgl.ProgramInfo|Object<string, module:twgl.TransformFeedbackInfo>)} transformFeedbackInfo A ProgramInfo or TransformFeedbackInfo.
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @memberOf module:twgl
 */
function bindTransformFeedbackInfo(gl, transformFeedbackInfo, bufferInfo) {
  if (transformFeedbackInfo.transformFeedbackInfo) {
    transformFeedbackInfo = transformFeedbackInfo.transformFeedbackInfo;
  }
  if (bufferInfo.attribs) {
    bufferInfo = bufferInfo.attribs;
  }
  for (const name in bufferInfo) {
    const varying = transformFeedbackInfo[name];
    if (varying) {
      const buf = bufferInfo[name];
      if (buf.offset) {
        gl.bindBufferRange(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer, buf.offset, buf.size);
      } else {
        gl.bindBufferBase(TRANSFORM_FEEDBACK_BUFFER, varying.index, buf.buffer);
      }
    }
  }
}

/**
 * Creates a transform feedback and sets the buffers
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @param {(module:twgl.BufferInfo|Object<string, module:twgl.AttribInfo>)} [bufferInfo] A BufferInfo or set of AttribInfos.
 * @return {WebGLTransformFeedback} the created transform feedback
 * @memberOf module:twgl
 */
function createTransformFeedback(gl, programInfo, bufferInfo) {
  const tf = gl.createTransformFeedback();
  gl.bindTransformFeedback(TRANSFORM_FEEDBACK, tf);
  gl.useProgram(programInfo.program);
  bindTransformFeedbackInfo(gl, programInfo, bufferInfo);
  gl.bindTransformFeedback(TRANSFORM_FEEDBACK, null);
  return tf;
}

/**
 * @typedef {Object} UniformData
 * @property {string} name The name of the uniform
 * @property {number} type The WebGL type enum for this uniform
 * @property {number} size The number of elements for this uniform
 * @property {number} blockNdx The block index this uniform appears in
 * @property {number} offset The byte offset in the block for this uniform's value
 * @memberOf module:twgl
 */

/**
 * The specification for one UniformBlockObject
 *
 * @typedef {Object} BlockSpec
 * @property {number} index The index of the block.
 * @property {number} size The size in bytes needed for the block
 * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
 *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
 * @property {bool} usedByVertexShader Self explanatory
 * @property {bool} usedByFragmentShader Self explanatory
 * @property {bool} used Self explanatory
 * @memberOf module:twgl
 */

/**
 * A `UniformBlockSpec` represents the data needed to create and bind
 * UniformBlockObjects for a given program
 *
 * @typedef {Object} UniformBlockSpec
 * @property {Object.<string, module:twgl.BlockSpec>} blockSpecs The BlockSpec for each block by block name
 * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
 * @memberOf module:twgl
 */

/**
 * Creates a UniformBlockSpec for the given program.
 *
 * A UniformBlockSpec represents the data needed to create and bind
 * UniformBlockObjects
 *
 * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
 * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
 * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
 * @memberOf module:twgl/programs
 */
function createUniformBlockSpecFromProgram(gl, program) {
  const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
  const uniformData = [];
  const uniformIndices = [];

  for (let ii = 0; ii < numUniforms; ++ii) {
    uniformIndices.push(ii);
    uniformData.push({});
    const uniformInfo = gl.getActiveUniform(program, ii);
    uniformData[ii].name = uniformInfo.name;
  }

  [
    [ "UNIFORM_TYPE", "type" ],
    [ "UNIFORM_SIZE", "size" ],  // num elements
    [ "UNIFORM_BLOCK_INDEX", "blockNdx" ],
    [ "UNIFORM_OFFSET", "offset", ],
  ].forEach(function(pair) {
    const pname = pair[0];
    const key = pair[1];
    gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
      uniformData[ndx][key] = value;
    });
  });

  const blockSpecs = {};

  const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
  for (let ii = 0; ii < numUniformBlocks; ++ii) {
    const name = gl.getActiveUniformBlockName(program, ii);
    const blockSpec = {
      index: gl.getUniformBlockIndex(program, name),
      usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
      usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
      size: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_DATA_SIZE),
      uniformIndices: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),
    };
    blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
    blockSpecs[name] = blockSpec;
  }

  return {
    blockSpecs: blockSpecs,
    uniformData: uniformData,
  };
}

const arraySuffixRE = /\[\d+\]\.$/;  // better way to check?

const pad = (v, padding) => ((v + (padding - 1)) / padding | 0) * padding;

function createUniformBlockUniformSetter(view, isArray, rows, cols) {
  if (isArray || rows) {
    cols = cols || 1;
    const numElements = view.length;
    const totalRows = numElements / 4;
    return function(value) {
      let dst = 0;
      let src = 0;
      for (let row = 0; row < totalRows; ++row) {
        for (let col = 0; col < cols; ++col) {
          view[dst++] = value[src++];
        }
        dst += 4 - cols;
      }
    };
  } else {
    return function(value) {
      if (value.length) {
        view.set(value);
      } else {
        view[0] = value;
      }
    };
  }
}

/**
 * Represents a UniformBlockObject including an ArrayBuffer with all the uniform values
 * and a corresponding WebGLBuffer to hold those values on the GPU
 *
 * @typedef {Object} UniformBlockInfo
 * @property {string} name The name of the block
 * @property {ArrayBuffer} array The array buffer that contains the uniform values
 * @property {Float32Array} asFloat A float view on the array buffer. This is useful
 *    inspecting the contents of the buffer in the debugger.
 * @property {Uint8Array} asUint8t A uint8 view on the array buffer.
 * @property {WebGLBuffer} buffer A WebGL buffer that will hold a copy of the uniform values for rendering.
 * @property {number} [offset] offset into buffer
 * @property {Object<string, ArrayBufferView>} uniforms A uniform name to ArrayBufferView map.
 *   each Uniform has a correctly typed `ArrayBufferView` into array at the correct offset
 *   and length of that uniform. So for example a float uniform would have a 1 float `Float32Array`
 *   view. A single mat4 would have a 16 element `Float32Array` view. An ivec2 would have an
 *   `Int32Array` view, etc.
 * @property {Object<string, function>} setters A setter for this uniform.
 *   The reason to use setters is elements of arrays are padded to vec4 sizes which
 *   means if you want to set an array of 4 floats you'd need to set 16 values
 *   (or set elements 0, 4, 8, 12). In other words
 *   `someBlockInfo.uniforms.some4FloatArrayUniform.set([0, , , , 1, , , , 2, , , , 3])`
 *   where as the setter handles just passing in [0, 1, 2, 3] either directly as in
 *   `someBlockInfo.setter.some4FloatArrayUniform.set([0, 1, 2, 3])` (not recommended)
 *   or via {@link module:twgl.setBlockUniforms}
 * @memberOf module:twgl
 */

/**
 * Options to allow createUniformBlockInfo to use an existing buffer and arrayBuffer at an offset
 * @typedef {Object} UniformBlockInfoOptions
 * @property {ArrayBuffer} [array] an existing array buffer to use for values
 * @property {number} [offset] the offset in bytes to use in the array buffer (default = 0)
 * @property {WebGLBuffer} [buffer] the buffer to use for this uniform block info
 * @property {number} [bufferOffset] the offset in bytes in the buffer to use (default = use offset above)
 */

/**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {WebGLProgram} program A WebGLProgram
 * @param {module:twgl.UniformBlockSpec} uniformBlockSpec. A UniformBlockSpec as returned
 *     from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {string} blockName The name of the block.
 * @param {module:twgl.UniformBlockInfoOptions} [options] Optional options for using existing an existing buffer and arrayBuffer
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */
function createUniformBlockInfoFromProgram(gl, program, uniformBlockSpec, blockName, options = {}) {
  const blockSpecs = uniformBlockSpec.blockSpecs;
  const uniformData = uniformBlockSpec.uniformData;
  const blockSpec = blockSpecs[blockName];
  if (!blockSpec) {
    warn("no uniform block object named:", blockName);
    return {
      name: blockName,
      uniforms: {},
    };
  }
  const offset = options.offset ?? 0;
  const array = options.array ?? new ArrayBuffer(blockSpec.size);
  const buffer = options.buffer ?? gl.createBuffer();
  const uniformBufferIndex = blockSpec.index;
  gl.bindBuffer(UNIFORM_BUFFER, buffer);
  if (!options.buffer) {
    gl.bufferData(UNIFORM_BUFFER, array.byteLength, DYNAMIC_DRAW);
  }
  gl.uniformBlockBinding(program, blockSpec.index, uniformBufferIndex);

  let prefix = blockName + ".";
  if (arraySuffixRE.test(prefix)) {
    prefix = prefix.replace(arraySuffixRE, ".");
  }
  const uniforms = {};
  const setters = {};
  const setterTree = {};
  blockSpec.uniformIndices.forEach(function(uniformNdx) {
    const data = uniformData[uniformNdx];
    let name = data.name;
    if (name.startsWith(prefix)) {
      name = name.substr(prefix.length);
    }
    const isArray = name.endsWith('[0]');
    if (isArray) {
      name = name.substr(0, name.length - 3);
    }
    const typeInfo = typeMap[data.type];
    const Type = typeInfo.Type;
    const byteLength = isArray
        ? pad(typeInfo.size, 16) * data.size
        : typeInfo.size * data.size;
    const uniformView = new Type(array, offset + data.offset, byteLength / Type.BYTES_PER_ELEMENT);
    uniforms[name] = uniformView;
    // Note: I'm not sure what to do here. The original
    // idea was to create TypedArray views into each part
    // of the block. This is useful, for example if you have
    // a block with { mat4: model; mat4 view; mat4 projection; }
    // you'll get a Float32Array for each one suitable for
    // passing to most JS math libraries including twgl's and glMatrix.js.
    //
    // But, if you have a an array of structures, especially if that
    // array is large, you get a whole bunch of TypedArray views.
    // Every one of them has overhead and switching between them all
    // is probably a cache miss. In that case it would really be better
    // to just have one view (asFloat) and have all the setters
    // just reference the correct portion. But, then you can't easily
    // treat a matrix, or a vec4, as a standalone thing like you can
    // with all the views.
    //
    // Another problem with the views is they are not shared. With
    // uniforms you have one set of setters. With UniformBlockInfo
    // you have a set of setters *pre block instance*. That's because
    // TypedArray views can't be mapped to different buffers.
    //
    // My gut right now is if you really want the speed and compactness
    // then you should probably roll your own solution. TWGL's goal
    // here is ease of use as AFAICT there is no simple generic efficient
    // solution.
    const setter = createUniformBlockUniformSetter(uniformView, isArray, typeInfo.rows, typeInfo.cols);
    setters[name] = setter;
    addSetterToUniformTree(name, setter, setterTree, setters);
  });
  return {
    name: blockName,
    array,
    asFloat: new Float32Array(array),  // for debugging
    asUint8: new Uint8Array(array),  // needed for gl.bufferSubData because it doesn't take an array buffer
    buffer,
    uniforms,
    setters,
    offset: options.bufferOffset ?? offset,
    size: blockSpec.size,
  };
}

/**
 * Creates a `UniformBlockInfo` for the specified block
 *
 * Note: **If the blockName matches no existing blocks a warning is printed to the console and a dummy
 * `UniformBlockInfo` is returned**. This is because when debugging GLSL
 * it is common to comment out large portions of a shader or for example set
 * the final output to a constant. When that happens blocks get optimized out.
 * If this function did not create dummy blocks your code would crash when debugging.
 *
 * @param {WebGL2RenderingContext} gl A WebGL2RenderingContext
 * @param {module:twgl.ProgramInfo} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo}
 * @param {string} blockName The name of the block.
 * @param {module:twgl.UniformBlockInfoOptions} [options] Optional options for using existing an existing buffer and arrayBuffer
 * @return {module:twgl.UniformBlockInfo} The created UniformBlockInfo
 * @memberOf module:twgl/programs
 */
function createUniformBlockInfo(gl, programInfo, blockName, options = {}) {
  return createUniformBlockInfoFromProgram(gl, programInfo.program, programInfo.uniformBlockSpec, blockName, options);
}

/**
 * Binds a uniform block to the matching uniform block point.
 * Matches by blocks by name so blocks must have the same name not just the same
 * structure.
 *
 * If you have changed any values and you upload the values into the corresponding WebGLBuffer
 * call {@link module:twgl.setUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @return {bool} true if buffer was bound. If the programInfo has no block with the same block name
 *     no buffer is bound.
 * @memberOf module:twgl/programs
 */
function bindUniformBlock(gl, programInfo, uniformBlockInfo) {
  const uniformBlockSpec = programInfo.uniformBlockSpec || programInfo;
  const blockSpec = uniformBlockSpec.blockSpecs[uniformBlockInfo.name];
  if (blockSpec) {
    const bufferBindIndex = blockSpec.index;
    gl.bindBufferRange(UNIFORM_BUFFER, bufferBindIndex, uniformBlockInfo.buffer, uniformBlockInfo.offset || 0, uniformBlockInfo.size ?? uniformBlockInfo.array.byteLength);
    return true;
  }
  return false;
}

/**
 * Uploads the current uniform values to the corresponding WebGLBuffer
 * and binds that buffer to the program's corresponding bind point for the uniform block object.
 *
 * If you haven't changed any values and you only need to bind the uniform block object
 * call {@link module:twgl.bindUniformBlock} instead.
 *
 * @param {WebGL2RenderingContext} gl A WebGL 2 rendering context.
 * @param {(module:twgl.ProgramInfo|module:twgl.UniformBlockSpec)} programInfo a `ProgramInfo`
 *     as returned from {@link module:twgl.createProgramInfo} or or `UniformBlockSpec` as
 *     returned from {@link module:twgl.createUniformBlockSpecFromProgram}.
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo a `UniformBlockInfo` as returned from
 *     {@link module:twgl.createUniformBlockInfo}.
 * @memberOf module:twgl/programs
 */
function setUniformBlock(gl, programInfo, uniformBlockInfo) {
  if (bindUniformBlock(gl, programInfo, uniformBlockInfo)) {
    gl.bufferSubData(UNIFORM_BUFFER, 0, uniformBlockInfo.asUint8, uniformBlockInfo.offset || 0, uniformBlockInfo.size || 0);
  }
}

/**
 * Sets values of a uniform block object
 *
 * @param {module:twgl.UniformBlockInfo} uniformBlockInfo A UniformBlockInfo as returned by {@link module:twgl.createUniformBlockInfo}.
 * @param {Object.<string, ?>} values A uniform name to value map where the value is correct for the given
 *    type of uniform. So for example given a block like
 *
 *       uniform SomeBlock {
 *         float someFloat;
 *         vec2 someVec2;
 *         vec3 someVec3Array[2];
 *         int someInt;
 *       }
 *
 *  You can set the values of the uniform block with
 *
 *       twgl.setBlockUniforms(someBlockInfo, {
 *          someFloat: 12.3,
 *          someVec2: [1, 2],
 *          someVec3Array: [1, 2, 3, 4, 5, 6],
 *          someInt: 5,
 *       }
 *
 *  Arrays can be JavaScript arrays or typed arrays
 *
 *  You can also fill out structure and array values either via
 *  shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *       float nearFar[2];
 *     };
 *     uniform Lights {
 *       Light lights[2];
 *     };
 *
 *     // in JavaScript
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.1, 10] },
 *         { intensity: 2.0, color: [0, 0, 1, 1], nearFar[0.2, 15] },
 *       ],
 *     });
 *
 *   or the more traditional way
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[0].nearFar": [0.1, 10],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *       "lights[1].nearFar": [0.2, 15],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       'lights[1]': { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.2, 15] },
 *     });
 *
 *   But you can not specify leaf array indices.
 *
 *     twgl.setBlockUniforms(someBlockInfo, {
 *       'lights[1].nearFar[1]': 15,     // BAD! nearFar is a leaf
 *       'lights[1].nearFar': [0.2, 15], // GOOD
 *     });
 *
 *  **IMPORTANT!**, packing in a UniformBlock is unintuitive.
 *  For example the actual layout of `someVec3Array` above in memory
 *  is `1, 2, 3, unused, 4, 5, 6, unused`. twgl takes in 6 values
 *  as shown about and copies them, skipping the padding. This might
 *  be confusing if you're already familiar with Uniform blocks.
 *
 *  If you want to deal with the padding yourself you can access the array
 *  buffer views directly. eg:
 *
 *      someBlockInfo.someVec3Array.set([1, 2, 3, 0, 4, 5, 6, 0]);
 *
 *  Any name that doesn't match will be ignored
 * @memberOf module:twgl/programs
 */
function setBlockUniforms(uniformBlockInfo, values) {
  const setters = uniformBlockInfo.setters;
  for (const name in values) {
    const setter = setters[name];
    if (setter) {
      const value = values[name];
      setter(value);
    }
  }
}

function setUniformTree(tree, values) {
  for (const name in values) {
    const prop = tree[name];
    if (typeof prop === 'function') {
      prop(values[name]);
    } else {
      setUniformTree(tree[name], values[name]);
    }
  }
}

/**
 * Set uniforms and binds related textures.
 *
 * example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs"]);
 *
 *     const tex1 = gl.createTexture();
 *     const tex2 = gl.createTexture();
 *
 *     ... assume we setup the textures with data ...
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     gl.useProgram(programInfo.program);
 *
 * This will automatically bind the textures AND set the
 * uniforms.
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *
 * For the example above it is equivalent to
 *
 *     let texUnit = 0;
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex1);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.activeTexture(gl.TEXTURE0 + texUnit);
 *     gl.bindTexture(gl.TEXTURE_2D, tex2);
 *     gl.uniform1i(u_someSamplerLocation, texUnit++);
 *     gl.uniform4fv(u_someColorLocation, [1, 0, 0, 1]);
 *     gl.uniform3fv(u_somePositionLocation, [0, 1, 1]);
 *     gl.uniformMatrix4fv(u_someMatrix, false, [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ]);
 *
 * Note it is perfectly reasonable to call `setUniforms` multiple times. For example
 *
 *     const uniforms = {
 *       u_someSampler: tex1,
 *       u_someOtherSampler: tex2,
 *     };
 *
 *     const moreUniforms {
 *       u_someColor: [1,0,0,1],
 *       u_somePosition: [0,1,1],
 *       u_someMatrix: [
 *         1,0,0,0,
 *         0,1,0,0,
 *         0,0,1,0,
 *         0,0,0,0,
 *       ],
 *     };
 *
 *     twgl.setUniforms(programInfo, uniforms);
 *     twgl.setUniforms(programInfo, moreUniforms);
 *
 * You can also add WebGLSamplers to uniform samplers as in
 *
 *     const uniforms = {
 *       u_someSampler: {
 *         texture: someWebGLTexture,
 *         sampler: someWebGLSampler,
 *       },
 *     };
 *
 * In which case both the sampler and texture will be bound to the
 * same unit.
 *
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 *        uniforms.
 *   You can pass multiple objects by putting them in an array or by calling with more arguments.For example
 *
 *     const sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     const localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     twgl.setUniforms(programInfo, sharedUniforms, localUniforms);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, [sharedUniforms, localUniforms]);
 *
 *     // is the same as
 *
 *     twgl.setUniforms(programInfo, sharedUniforms);
 *     twgl.setUniforms(programInfo, localUniforms};
 *
 *   You can also fill out structure and array values either via
 *   shortcut. Example
 *
 *     // -- in shader --
 *     struct Light {
 *       float intensity;
 *       vec4 color;
 *       float nearFar[2];
 *     };
 *     uniform Light lights[2];
 *
 *     // in JavaScript
 *
 *     twgl.setUniforms(programInfo, {
 *       lights: [
 *         { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.1, 10] },
 *         { intensity: 2.0, color: [0, 0, 1, 1], nearFar[0.2, 15] },
 *       ],
 *     });
 *
 *   or the more traditional way
 *
 *     twgl.setUniforms(programInfo, {
 *       "lights[0].intensity": 5.0,
 *       "lights[0].color": [1, 0, 0, 1],
 *       "lights[0].nearFar": [0.1, 10],
 *       "lights[1].intensity": 2.0,
 *       "lights[1].color": [0, 0, 1, 1],
 *       "lights[1].nearFar": [0.2, 15],
 *     });
 *
 *   You can also specify partial paths
 *
 *     twgl.setUniforms(programInfo, {
 *       'lights[1]': { intensity: 5.0, color: [1, 0, 0, 1], nearFar[0.2, 15] },
 *     });
 *
 *   But you can not specify leaf array indices
 *
 *     twgl.setUniforms(programInfo, {
 *       'lights[1].nearFar[1]': 15,     // BAD! nearFar is a leaf
 *       'lights[1].nearFar': [0.2, 15], // GOOD
 *     });
 *
 * @memberOf module:twgl/programs
 */
function setUniforms(setters, ...args) {  // eslint-disable-line
  const actualSetters = setters.uniformSetters || setters;
  const numArgs = args.length;
  for (let aNdx = 0; aNdx < numArgs; ++aNdx) {
    const values = args[aNdx];
    if (Array.isArray(values)) {
      const numValues = values.length;
      for (let ii = 0; ii < numValues; ++ii) {
        setUniforms(actualSetters, values[ii]);
      }
    } else {
      for (const name in values) {
        const setter = actualSetters[name];
        if (setter) {
          setter(values[name]);
        }
      }
    }
  }
}

/**
 * Alias for `setUniforms`
 * @function
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters a `ProgramInfo` as returned from `createProgramInfo` or the setters returned from
 *        `createUniformSetters`.
 * @param {Object.<string, ?>} values an object with values for the
 * @memberOf module:twgl/programs
 */
const setUniformsAndBindTextures = setUniforms;

/**
 * Creates setter functions for all attributes of a shader
 * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
 *
 * @see {@link module:twgl.setAttributes} for example
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {WebGLProgram} program the program to create setters for.
 * @return {Object.<string, function>} an object with a setter for each attribute by name.
 * @memberOf module:twgl/programs
 */
function createAttributeSetters(gl, program) {
  const attribSetters = {
  };

  const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
  for (let ii = 0; ii < numAttribs; ++ii) {
    const attribInfo = gl.getActiveAttrib(program, ii);
    if (isBuiltIn(attribInfo)) {
      continue;
    }
    const index = gl.getAttribLocation(program, attribInfo.name);
    const typeInfo = attrTypeMap[attribInfo.type];
    const setter = typeInfo.setter(gl, index, typeInfo);
    setter.location = index;
    attribSetters[attribInfo.name] = setter;
  }

  return attribSetters;
}

/**
 * Sets attributes and binds buffers (deprecated... use {@link module:twgl.setBuffersAndAttributes})
 *
 * Example:
 *
 *     const program = createProgramFromScripts(
 *         gl, ["some-vs", "some-fs");
 *
 *     const attribSetters = createAttributeSetters(program);
 *
 *     const positionBuffer = gl.createBuffer();
 *     const texcoordBuffer = gl.createBuffer();
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *     };
 *
 *     gl.useProgram(program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setAttributes(attribSetters, attribs);
 *
 * Properties of attribs. For each attrib you can add
 * properties:
 *
 * *   type: the type of data in the buffer. Default = gl.FLOAT
 * *   normalize: whether or not to normalize the data. Default = false
 * *   stride: the stride. Default = 0
 * *   offset: offset into the buffer. Default = 0
 * *   divisor: the divisor for instances. Default = undefined
 *
 * For example if you had 3 value float positions, 2 value
 * float texcoord and 4 value uint8 colors you'd setup your
 * attribs like this
 *
 *     const attribs = {
 *       a_position: {buffer: positionBuffer, numComponents: 3},
 *       a_texcoord: {buffer: texcoordBuffer, numComponents: 2},
 *       a_color: {
 *         buffer: colorBuffer,
 *         numComponents: 4,
 *         type: gl.UNSIGNED_BYTE,
 *         normalize: true,
 *       },
 *     };
 *
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} buffers AttribInfos mapped by attribute name.
 * @memberOf module:twgl/programs
 * @deprecated use {@link module:twgl.setBuffersAndAttributes}
 * @private
 */
function setAttributes(setters, buffers) {
  for (const name in buffers) {
    const setter = setters[name];
    if (setter) {
      setter(buffers[name]);
    }
  }
}

/**
 * Sets attributes and buffers including the `ELEMENT_ARRAY_BUFFER` if appropriate
 *
 * Example:
 *
 *     const programInfo = createProgramInfo(
 *         gl, ["some-vs", "some-fs");
 *
 *     const arrays = {
 *       position: { numComponents: 3, data: [0, 0, 0, 10, 0, 0, 0, 10, 0, 10, 10, 0], },
 *       texcoord: { numComponents: 2, data: [0, 0, 0, 1, 1, 0, 1, 1],                 },
 *     };
 *
 *     const bufferInfo = createBufferInfoFromArrays(gl, arrays);
 *
 *     gl.useProgram(programInfo.program);
 *
 * This will automatically bind the buffers AND set the
 * attributes.
 *
 *     setBuffersAndAttributes(gl, programInfo, bufferInfo);
 *
 * For the example above it is equivalent to
 *
 *     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
 *     gl.enableVertexAttribArray(a_positionLocation);
 *     gl.vertexAttribPointer(a_positionLocation, 3, gl.FLOAT, false, 0, 0);
 *     gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
 *     gl.enableVertexAttribArray(a_texcoordLocation);
 *     gl.vertexAttribPointer(a_texcoordLocation, 4, gl.FLOAT, false, 0, 0);
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext.
 * @param {(module:twgl.ProgramInfo|Object.<string, function>)} setters A `ProgramInfo` as returned from {@link module:twgl.createProgramInfo} or Attribute setters as returned from {@link module:twgl.createAttributeSetters}
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} buffers a `BufferInfo` as returned from {@link module:twgl.createBufferInfoFromArrays}.
 *   or a `VertexArrayInfo` as returned from {@link module:twgl.createVertexArrayInfo}
 * @memberOf module:twgl/programs
 */
function setBuffersAndAttributes(gl, programInfo, buffers) {
  if (buffers.vertexArrayObject) {
    gl.bindVertexArray(buffers.vertexArrayObject);
  } else {
    setAttributes(programInfo.attribSetters || programInfo, buffers.attribs);
    if (buffers.indices) {
      gl.bindBuffer(ELEMENT_ARRAY_BUFFER$1, buffers.indices);
    }
  }
}

/**
 * @typedef {Object} ProgramInfo
 * @property {WebGLProgram} program A shader program
 * @property {Object<string, WebGLUniformLocation>} uniformLocations The uniform locations of each uniform
 * @property {Object<string, number>} attribLocations The locations of each attribute
 * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
 * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
 * @property {module:twgl.UniformBlockSpec} [uniformBlockSpec] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
 * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
 * @memberOf module:twgl
 */

/**
 * Creates a ProgramInfo from an existing program.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {WebGLProgram} program an existing WebGLProgram.
 * @return {module:twgl.ProgramInfo} The created ProgramInfo.
 * @memberOf module:twgl/programs
 */
function createProgramInfoFromProgram(gl, program) {
  const uniformSetters = createUniformSetters(gl, program);
  const attribSetters = createAttributeSetters(gl, program);
  const programInfo = {
    program,
    uniformSetters,
    attribSetters,
    uniformLocations: Object.fromEntries(Object.entries(uniformSetters).map(([k, v]) => [k, v.location])),
    attribLocations: Object.fromEntries(Object.entries(attribSetters).map(([k, v]) => [k, v.location])),
  };

  if (isWebGL2(gl)) {
    programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
    programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
  }

  return programInfo;
}

const notIdRE = /\s|{|}|;/;

/**
 * Creates a ProgramInfo from 2 sources.
 *
 * A ProgramInfo contains
 *
 *     programInfo = {
 *        program: WebGLProgram,
 *        uniformSetters: object of setters as returned from createUniformSetters,
 *        attribSetters: object of setters as returned from createAttribSetters,
 *     }
 *
 * NOTE: There are 4 signatures for this function
 *
 *     twgl.createProgramInfo(gl, [vs, fs], options);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
 *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSources Array of sources for the
 *        shaders or ids. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
 * @param {number[]|module:twgl.ErrorCallback} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
 * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
 * @memberOf module:twgl/programs
 */
function createProgramInfo(
    gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
  const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
  const errors = [];
  shaderSources = shaderSources.map(function(source) {
    // Lets assume if there is no \n it's an id
    if (!notIdRE.test(source)) {
      const script = getElementById(source);
      if (!script) {
        const err = `no element with id: ${source}`;
        progOptions.errorCallback(err);
        errors.push(err);
      } else {
        source = script.text;
      }
    }
    return source;
  });

  if (errors.length) {
    return reportError(progOptions, '');
  }

  const origCallback = progOptions.callback;
  if (origCallback) {
    progOptions.callback = (err, program) => {
      origCallback(err, err ? undefined : createProgramInfoFromProgram(gl, program));
    };
  }

  const program = createProgramFromSources(gl, shaderSources, progOptions);
  if (!program) {
    return null;
  }

  return createProgramInfoFromProgram(gl, program);
}

function checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions) {
  // check errors for everything.
  for (const [name, program] of Object.entries(programs)) {
    const options = {...programOptions};
    const spec = programSpecs[name];
    if (!Array.isArray(spec)) {
      Object.assign(options, spec);
    }
    const errors = getProgramErrors(gl, program, options.errorCallback);
    if (errors) {
      // delete everything we created
      for (const program of Object.values(programs)) {
        const shaders = gl.getAttachedShaders(program);
        gl.deleteProgram(program);
        for (const shader of shaders) {
          // Don't delete it if we didn't create it.
          if (!noDeleteShadersSet.has(shader)) {
            gl.deleteShader(shader);
          }
        }
      }
      return errors;
    }
  }

  return undefined;
}

/**
 * Creates multiple programs
 *
 * Note: the reason this function exists is because the fastest way to create multiple
 * programs in WebGL is to create and compile all shaders and link all programs and only
 * afterwards check if they succeeded. In that way, giving all your shaders
 *
 * @see {@link module:twgl.createProgram}
 *
 * Example:
 *
 *     const programs = twgl.createPrograms(gl, {
 *       lambert: [lambertVS, lambertFS],
 *       phong: [phongVS, phoneFS],
 *       particles: {
 *         shaders: [particlesVS, particlesFS],
 *         transformFeedbackVaryings: ['position', 'velocity'],
 *       },
 *     });
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string, module:twgl.ProgramSpec>} programSpecs An object of ProgramSpecs, one per program.
 * @param {module:twgl.ProgramOptions} [programOptions] options to apply to all programs
 * @return {Object.<string, WebGLProgram>?} the created programInfos by name
 */
function createPrograms(gl, programSpecs, programOptions = {}) {
  // Remember existing shaders so that if there is an error we don't delete them
  const noDeleteShadersSet = new Set();

  // compile and link everything
  const programs = Object.fromEntries(Object.entries(programSpecs).map(([name, spec]) => {
    const options = {...programOptions};
    const shaders = Array.isArray(spec) ? spec : spec.shaders;
    if (!Array.isArray(spec)) {
      Object.assign(options, spec);
    }
    shaders.forEach(noDeleteShadersSet.add, noDeleteShadersSet);
    return [name, createProgramNoCheck(gl, shaders, options)];
  }));

  if (programOptions.callback) {
    waitForAllProgramsLinkCompletionAsync(gl, programs).then(() => {
      const errors = checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions);
      programOptions.callback(errors, errors ? undefined : programs);
    });
    return undefined;
  }

  const errors = checkAllPrograms(gl, programs, programSpecs, noDeleteShadersSet, programOptions);
  return errors ? undefined : programs;
}

/**
 * Creates multiple programInfos
 *
 * Note: the reason this function exists is because the fastest way to create multiple
 * programs in WebGL is to create and compile all shaders and link all programs and only
 * afterwards check if they succeeded. In that way, giving all your shaders
 *
 * @see {@link module:twgl.createProgramInfo}
 *
 * Examples:
 *
 *     const programInfos = twgl.createProgramInfos(gl, {
 *       lambert: [lambertVS, lambertFS],
 *       phong: [phongVS, phoneFS],
 *       particles: {
 *         shaders: [particlesVS, particlesFS],
 *         transformFeedbackVaryings: ['position', 'velocity'],
 *       },
 *     });
 *
 * or
 *
 *     const {lambert, phong, particles} = twgl.createProgramInfos(gl, {
 *       lambert: [lambertVS, lambertFS],
 *       phong: [phongVS, phoneFS],
 *       particles: {
 *         shaders: [particlesVS, particlesFS],
 *         transformFeedbackVaryings: ['position', 'velocity'],
 *       },
 *     });
 *
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string, module:twgl.ProgramSpec>} programSpecs An object of ProgramSpecs, one per program.
 * @param {module:twgl.ProgramOptions} [programOptions] options to apply to all programs
 * @return {Object.<string, module:twgl.ProgramInfo>?} the created programInfos by name
 */
function createProgramInfos(gl, programSpecs, programOptions) {
  programOptions = getProgramOptions(programOptions);

  function createProgramInfosForPrograms(gl, programs) {
    return Object.fromEntries(Object.entries(programs).map(([name, program]) =>
      [name, createProgramInfoFromProgram(gl, program)]
    ));
  }

  const origCallback = programOptions.callback;
  if (origCallback) {
    programOptions.callback = (err, programs) => {
      origCallback(err, err ? undefined : createProgramInfosForPrograms(gl, programs));
    };
  }

  const programs = createPrograms(gl, programSpecs, programOptions);
  if (origCallback || !programs) {
    return undefined;
  }

  return createProgramInfosForPrograms(gl, programs);
}

/**
 * Creates multiple programs asynchronously
 *
 * @see {@link module:twgl.createProgramAsync}
 *
 * Example:
 *
 *     const programs = await twgl.createProgramsAsync(gl, {
 *       lambert: [lambertVS, lambertFS],
 *       phong: [phongVS, phoneFS],
 *       particles: {
 *         shaders: [particlesVS, particlesFS],
 *         transformFeedbackVaryings: ['position', 'velocity'],
 *       },
 *     });
 *
 * @function
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string, module:twgl.ProgramSpec>} programSpecs An object of ProgramSpecs, one per program.
 * @param {module:twgl.ProgramOptions} [programOptions] options to apply to all programs
 * @return {Object.<string, WebGLProgram>?} the created programInfos by name
 */
const createProgramsAsync = wrapCallbackFnToAsyncFn(createPrograms);

/**
 * Creates multiple programInfos asynchronously
 *
 * @see {@link module:twgl.createProgramInfoAsync}
 *
 * Example:
 *
 *     const programInfos = await twgl.createProgramInfosAsync(gl, {
 *       lambert: [lambertVS, lambertFS],
 *       phong: [phongVS, phoneFS],
 *       particles: {
 *         shaders: [particlesVS, particlesFS],
 *         transformFeedbackVaryings: ['position', 'velocity'],
 *       },
 *     });
 *
 * @function
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {Object.<string, module:twgl.ProgramSpec>} programSpecs An object of ProgramSpecs, one per program.
 * @param {module:twgl.ProgramOptions} [programOptions] options to apply to all programs
 * @return {Promise<Object.<string, module:twgl.ProgramInfo>>} the created programInfos by name
 */
const createProgramInfosAsync = wrapCallbackFnToAsyncFn(createProgramInfos);

var programs = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createAttributeSetters: createAttributeSetters,
  createProgram: createProgram,
  createProgramAsync: createProgramAsync,
  createPrograms: createPrograms,
  createProgramsAsync: createProgramsAsync,
  createProgramFromScripts: createProgramFromScripts,
  createProgramFromSources: createProgramFromSources,
  createProgramInfo: createProgramInfo,
  createProgramInfoAsync: createProgramInfoAsync,
  createProgramInfos: createProgramInfos,
  createProgramInfosAsync: createProgramInfosAsync,
  createProgramInfoFromProgram: createProgramInfoFromProgram,
  createUniformSetters: createUniformSetters,
  createUniformBlockSpecFromProgram: createUniformBlockSpecFromProgram,
  createUniformBlockInfoFromProgram: createUniformBlockInfoFromProgram,
  createUniformBlockInfo: createUniformBlockInfo,
  createTransformFeedback: createTransformFeedback,
  createTransformFeedbackInfo: createTransformFeedbackInfo,
  bindTransformFeedbackInfo: bindTransformFeedbackInfo,
  setAttributes: setAttributes,
  setBuffersAndAttributes: setBuffersAndAttributes,
  setUniforms: setUniforms,
  setUniformsAndBindTextures: setUniformsAndBindTextures,
  setUniformBlock: setUniformBlock,
  setBlockUniforms: setBlockUniforms,
  bindUniformBlock: bindUniformBlock
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const TRIANGLES                      = 0x0004;
const UNSIGNED_SHORT                 = 0x1403;

/**
 * Drawing related functions
 *
 * For backward compatibility they are available at both `twgl.draw` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/draw
 */

/**
 * Calls `gl.drawElements` or `gl.drawArrays`, whichever is appropriate
 *
 * normally you'd call `gl.drawElements` or `gl.drawArrays` yourself
 * but calling this means if you switch from indexed data to non-indexed
 * data you don't have to remember to update your draw call.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {(module:twgl.BufferInfo|module:twgl.VertexArrayInfo)} bufferInfo A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays} or
 *   a VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @param {number} [type] eg (gl.TRIANGLES, gl.LINES, gl.POINTS, gl.TRIANGLE_STRIP, ...). Defaults to `gl.TRIANGLES`
 * @param {number} [count] An optional count. Defaults to bufferInfo.numElements
 * @param {number} [offset] An optional offset. Defaults to 0.
 * @param {number} [instanceCount] An optional instanceCount. if set then `drawArraysInstanced` or `drawElementsInstanced` will be called
 * @memberOf module:twgl/draw
 */
function drawBufferInfo(gl, bufferInfo, type, count, offset, instanceCount) {
  type = type === undefined ? TRIANGLES : type;
  const indices = bufferInfo.indices;
  const elementType = bufferInfo.elementType;
  const numElements = count === undefined ? bufferInfo.numElements : count;
  offset = offset === undefined ? 0 : offset;
  if (elementType || indices) {
    if (instanceCount !== undefined) {
      gl.drawElementsInstanced(type, numElements, elementType === undefined ? UNSIGNED_SHORT : bufferInfo.elementType, offset, instanceCount);
    } else {
      gl.drawElements(type, numElements, elementType === undefined ? UNSIGNED_SHORT : bufferInfo.elementType, offset);
    }
  } else {
    if (instanceCount !== undefined) {
      gl.drawArraysInstanced(type, offset, numElements, instanceCount);
    } else {
      gl.drawArrays(type, offset, numElements);
    }
  }
}

/**
 * A DrawObject is useful for putting objects in to an array and passing them to {@link module:twgl.drawObjectList}.
 *
 * You need either a `BufferInfo` or a `VertexArrayInfo`.
 *
 * @typedef {Object} DrawObject
 * @property {boolean} [active] whether or not to draw. Default = `true` (must be `false` to be not true). In other words `undefined` = `true`
 * @property {number} [type] type to draw eg. `gl.TRIANGLES`, `gl.LINES`, etc...
 * @property {module:twgl.ProgramInfo} programInfo A ProgramInfo as returned from {@link module:twgl.createProgramInfo}
 * @property {module:twgl.BufferInfo} [bufferInfo] A BufferInfo as returned from {@link module:twgl.createBufferInfoFromArrays}
 * @property {module:twgl.VertexArrayInfo} [vertexArrayInfo] A VertexArrayInfo as returned from {@link module:twgl.createVertexArrayInfo}
 * @property {Object<string, ?>} uniforms The values for the uniforms.
 *   You can pass multiple objects by putting them in an array. For example
 *
 *     var sharedUniforms = {
 *       u_fogNear: 10,
 *       u_projection: ...
 *       ...
 *     };
 *
 *     var localUniforms = {
 *       u_world: ...
 *       u_diffuseColor: ...
 *     };
 *
 *     var drawObj = {
 *       ...
 *       uniforms: [sharedUniforms, localUniforms],
 *     };
 *
 * @property {number} [offset] the offset to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to 0.
 * @property {number} [count] the count to pass to `gl.drawArrays` or `gl.drawElements`. Defaults to bufferInfo.numElements.
 * @property {number} [instanceCount] the number of instances. Defaults to undefined.
 * @memberOf module:twgl
 */

/**
 * Draws a list of objects
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {DrawObject[]} objectsToDraw an array of objects to draw.
 * @memberOf module:twgl/draw
 */
function drawObjectList(gl, objectsToDraw) {
  let lastUsedProgramInfo = null;
  let lastUsedBufferInfo = null;

  objectsToDraw.forEach(function(object) {
    if (object.active === false) {
      return;
    }

    const programInfo = object.programInfo;
    const bufferInfo = object.vertexArrayInfo || object.bufferInfo;
    let bindBuffers = false;
    const type = object.type === undefined ? TRIANGLES : object.type;

    if (programInfo !== lastUsedProgramInfo) {
      lastUsedProgramInfo = programInfo;
      gl.useProgram(programInfo.program);

      // We have to rebind buffers when changing programs because we
      // only bind buffers the program uses. So if 2 programs use the same
      // bufferInfo but the 1st one uses only positions the when the
      // we switch to the 2nd one some of the attributes will not be on.
      bindBuffers = true;
    }

    // Setup all the needed attributes.
    if (bindBuffers || bufferInfo !== lastUsedBufferInfo) {
      if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject && !bufferInfo.vertexArrayObject) {
        gl.bindVertexArray(null);
      }
      lastUsedBufferInfo = bufferInfo;
      setBuffersAndAttributes(gl, programInfo, bufferInfo);
    }

    // Set the uniforms.
    setUniforms(programInfo, object.uniforms);

    // Draw
    drawBufferInfo(gl, bufferInfo, type, object.count, object.offset, object.instanceCount);
  });

  if (lastUsedBufferInfo && lastUsedBufferInfo.vertexArrayObject) {
    gl.bindVertexArray(null);
  }
}

var draw = /*#__PURE__*/Object.freeze({
  __proto__: null,
  drawBufferInfo: drawBufferInfo,
  drawObjectList: drawObjectList
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const FRAMEBUFFER                    = 0x8d40;
const RENDERBUFFER                   = 0x8d41;
const TEXTURE_2D                     = 0x0de1;

const UNSIGNED_BYTE                  = 0x1401;

/* PixelFormat */
const DEPTH_COMPONENT                = 0x1902;
const RGBA                           = 0x1908;
const DEPTH_COMPONENT24              = 0x81a6;
const DEPTH_COMPONENT32F             = 0x8cac;
const DEPTH24_STENCIL8               = 0x88f0;
const DEPTH32F_STENCIL8              = 0x8cad;

/* Framebuffer Object. */
const RGBA4                          = 0x8056;
const RGB5_A1                        = 0x8057;
const RGB565                         = 0x8D62;
const DEPTH_COMPONENT16              = 0x81A5;
const STENCIL_INDEX                  = 0x1901;
const STENCIL_INDEX8                 = 0x8D48;
const DEPTH_STENCIL                  = 0x84F9;
const COLOR_ATTACHMENT0              = 0x8CE0;
const DEPTH_ATTACHMENT               = 0x8D00;
const STENCIL_ATTACHMENT             = 0x8D20;
const DEPTH_STENCIL_ATTACHMENT       = 0x821A;

/* TextureWrapMode */
const CLAMP_TO_EDGE                  = 0x812F;

/* TextureMagFilter */
const LINEAR                         = 0x2601;

/**
 * The options for a framebuffer attachment.
 *
 * Note: For a `format` that is a texture include all the texture
 * options from {@link module:twgl.TextureOptions} for example
 * `min`, `mag`, `clamp`, etc... Note that unlike {@link module:twgl.TextureOptions}
 * `auto` defaults to `false` for attachment textures but `min` and `mag` default
 * to `gl.LINEAR` and `wrap` defaults to `CLAMP_TO_EDGE`
 *
 * @typedef {Object} AttachmentOptions
 * @property {number} [attachmentPoint] The attachment point. Defaults
 *   to `gl.COLOR_ATTACHMENT0 + ndx` unless type is a depth or stencil type
 *   then it's gl.DEPTH_ATTACHMENT or `gl.DEPTH_STENCIL_ATTACHMENT` depending
 *   on the format or attachment type.
 * @property {number} [format] The format. If one of `gl.RGBA4`,
 *   `gl.RGB565`, `gl.RGB5_A1`, `gl.DEPTH_COMPONENT16`,
 *   `gl.STENCIL_INDEX8` or `gl.DEPTH_STENCIL` then will create a
 *   renderbuffer. Otherwise will create a texture. Default = `gl.RGBA`
 * @property {number} [type] The type. Used for texture. Default = `gl.UNSIGNED_BYTE`.
 * @property {number} [target] The texture target for `gl.framebufferTexture2D`.
 *   Defaults to `gl.TEXTURE_2D`. Set to appropriate face for cube maps.
 * @property {number} [samples] The number of samples. Default = 1
 * @property {number} [level] level for `gl.framebufferTexture2D`. Defaults to 0.
 * @property {number} [layer] layer for `gl.framebufferTextureLayer`. Defaults to undefined.
 *   If set then `gl.framebufferTextureLayer` is called, if not then `gl.framebufferTexture2D`
 * @property {(WebGLRenderbuffer | WebGLTexture)} [attachment] An existing renderbuffer or texture.
 *    If provided will attach this Object. This allows you to share
 *    attachments across framebuffers.
 * @memberOf module:twgl
 * @mixes module:twgl.TextureOptions
 */

const defaultAttachments = [
  { format: RGBA, type: UNSIGNED_BYTE, min: LINEAR, wrap: CLAMP_TO_EDGE, },
  { format: DEPTH_STENCIL, },
];

const attachmentsByFormat = {};
attachmentsByFormat[DEPTH_STENCIL] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX] = STENCIL_ATTACHMENT;
attachmentsByFormat[STENCIL_INDEX8] = STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT16] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT24] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH_COMPONENT32F] = DEPTH_ATTACHMENT;
attachmentsByFormat[DEPTH24_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;
attachmentsByFormat[DEPTH32F_STENCIL8] = DEPTH_STENCIL_ATTACHMENT;

function getAttachmentPointForFormat(format, internalFormat) {
  return attachmentsByFormat[format] || attachmentsByFormat[internalFormat];
}

const renderbufferFormats = {};
renderbufferFormats[RGBA4] = true;
renderbufferFormats[RGB5_A1] = true;
renderbufferFormats[RGB565] = true;
renderbufferFormats[DEPTH_STENCIL] = true;
renderbufferFormats[DEPTH_COMPONENT16] = true;
renderbufferFormats[STENCIL_INDEX] = true;
renderbufferFormats[STENCIL_INDEX8] = true;

function isRenderbufferFormat(format) {
  return renderbufferFormats[format];
}

const MAX_COLOR_ATTACHMENT_POINTS = 32;  // even an 3090 only supports 8 but WebGL/OpenGL ES define constants for 32

function isColorAttachmentPoint(attachmentPoint) {
  return attachmentPoint >= COLOR_ATTACHMENT0 && attachmentPoint < COLOR_ATTACHMENT0 + MAX_COLOR_ATTACHMENT_POINTS;
}

/**
 * @typedef {Object} FramebufferInfo
 * @property {WebGLFramebuffer} framebuffer The WebGLFramebuffer for this framebufferInfo
 * @property {Array.<(WebGLRenderbuffer | WebGLTexture)>} attachments The created attachments in the same order as passed in to {@link module:twgl.createFramebufferInfo}.
 * @property {number} width The width of the framebuffer and its attachments
 * @property {number} height The width of the framebuffer and its attachments
 * @memberOf module:twgl
 */

/**
 * Creates a framebuffer and attachments.
 *
 * This returns a {@link module:twgl.FramebufferInfo} because it needs to return the attachments as well as the framebuffer.
 * It also leaves the framebuffer it just created as the currently bound `FRAMEBUFFER`.
 * Note: If this is WebGL2 or if you called {@link module:twgl.addExtensionsToContext} then it will set the drawBuffers
 * to `[COLOR_ATTACHMENT0, COLOR_ATTACHMENT1, ...]` for how ever many color attachments were created.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 * Passing in a specific size
 *
 *     const width = 256;
 *     const height = 256;
 *     const fbi = twgl.createFramebufferInfo(gl, attachments, width, height);
 *
 * **Note!!** It is up to you to check if the framebuffer is renderable by calling `gl.checkFramebufferStatus`.
 * [WebGL1 only guarantees 3 combinations of attachments work](https://www.khronos.org/registry/webgl/specs/latest/1.0/#6.6).
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.AttachmentOptions[]} [attachments] which attachments to create. If not provided the default is a framebuffer with an
 *    `RGBA`, `UNSIGNED_BYTE` texture `COLOR_ATTACHMENT0` and a `DEPTH_STENCIL` renderbuffer `DEPTH_STENCIL_ATTACHMENT`.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @return {module:twgl.FramebufferInfo} the framebuffer and attachments.
 * @memberOf module:twgl/framebuffers
 */
function createFramebufferInfo(gl, attachments, width, height) {
  const target = FRAMEBUFFER;
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(target, fb);
  width  = width  || gl.drawingBufferWidth;
  height = height || gl.drawingBufferHeight;
  attachments = attachments || defaultAttachments;
  const usedColorAttachmentsPoints = [];
  const framebufferInfo = {
    framebuffer: fb,
    attachments: [],
    width: width,
    height: height,
  };

  attachments.forEach(function(attachmentOptions, i) {
    let attachment = attachmentOptions.attachment;
    const samples = attachmentOptions.samples;
    const format = attachmentOptions.format;
    let attachmentPoint = attachmentOptions.attachmentPoint || getAttachmentPointForFormat(format, attachmentOptions.internalFormat);
    if (!attachmentPoint) {
      attachmentPoint = COLOR_ATTACHMENT0 + i;
    }
    if (isColorAttachmentPoint(attachmentPoint)) {
      usedColorAttachmentsPoints.push(attachmentPoint);
    }
    if (!attachment) {
      if (samples !== undefined || isRenderbufferFormat(format)) {
        attachment = gl.createRenderbuffer();
        gl.bindRenderbuffer(RENDERBUFFER, attachment);
        if (samples > 1) {
          gl.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
        } else {
          gl.renderbufferStorage(RENDERBUFFER, format, width, height);
        }
      } else {
        const textureOptions = Object.assign({}, attachmentOptions);
        textureOptions.width = width;
        textureOptions.height = height;
        if (textureOptions.auto === undefined) {
          textureOptions.auto = false;
          textureOptions.min = textureOptions.min || textureOptions.minMag || LINEAR;
          textureOptions.mag = textureOptions.mag || textureOptions.minMag || LINEAR;
          textureOptions.wrapS = textureOptions.wrapS || textureOptions.wrap || CLAMP_TO_EDGE;
          textureOptions.wrapT = textureOptions.wrapT || textureOptions.wrap || CLAMP_TO_EDGE;
        }
        attachment = createTexture(gl, textureOptions);
      }
    }
    if (isRenderbuffer(gl, attachment)) {
      gl.framebufferRenderbuffer(target, attachmentPoint, RENDERBUFFER, attachment);
    } else if (isTexture(gl, attachment)) {
      if (attachmentOptions.layer !== undefined) {
        gl.framebufferTextureLayer(
          target,
          attachmentPoint,
          attachment,
          attachmentOptions.level || 0,
          attachmentOptions.layer);
      } else {
        gl.framebufferTexture2D(
            target,
            attachmentPoint,
            attachmentOptions.target || TEXTURE_2D,
            attachment,
            attachmentOptions.level || 0);
      }
    } else {
      throw new Error('unknown attachment type');
    }
    framebufferInfo.attachments.push(attachment);
  });
  if (gl.drawBuffers) {
    gl.drawBuffers(usedColorAttachmentsPoints);
  }
  return framebufferInfo;
}

/**
 * Resizes the attachments of a framebuffer.
 *
 * You need to pass in the same `attachments` as you passed in {@link module:twgl.createFramebufferInfo}
 * because TWGL has no idea the format/type of each attachment.
 *
 * The simplest usage
 *
 *     // create an RGBA/UNSIGNED_BYTE texture and DEPTH_STENCIL renderbuffer
 *     const fbi = twgl.createFramebufferInfo(gl);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments
 *         twgl.resizeFramebufferInfo(gl, fbi);
 *       }
 *
 * More complex usage
 *
 *     // create an RGB565 renderbuffer and a STENCIL_INDEX8 renderbuffer
 *     const attachments = [
 *       { format: RGB565, mag: NEAREST },
 *       { format: STENCIL_INDEX8 },
 *     ]
 *     const fbi = twgl.createFramebufferInfo(gl, attachments);
 *
 *     ...
 *
 *     function render() {
 *       if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
 *         // resize the attachments to match
 *         twgl.resizeFramebufferInfo(gl, fbi, attachments);
 *       }
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo} framebufferInfo a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 * @param {module:twgl.AttachmentOptions[]} [attachments] the same attachments options as passed to {@link module:twgl.createFramebufferInfo}.
 * @param {number} [width] the width for the attachments. Default = size of drawingBuffer
 * @param {number} [height] the height for the attachments. Default = size of drawingBuffer
 * @memberOf module:twgl/framebuffers
 */
function resizeFramebufferInfo(gl, framebufferInfo, attachments, width, height) {
  width  = width  || gl.drawingBufferWidth;
  height = height || gl.drawingBufferHeight;
  framebufferInfo.width = width;
  framebufferInfo.height = height;
  attachments = attachments || defaultAttachments;
  attachments.forEach(function(attachmentOptions, ndx) {
    const attachment = framebufferInfo.attachments[ndx];
    const format = attachmentOptions.format;
    const samples = attachmentOptions.samples;
    if (samples !== undefined || isRenderbuffer(gl, attachment)) {
      gl.bindRenderbuffer(RENDERBUFFER, attachment);
      if (samples > 1) {
        gl.renderbufferStorageMultisample(RENDERBUFFER, samples, format, width, height);
      } else {
        gl.renderbufferStorage(RENDERBUFFER, format, width, height);
      }
    } else if (isTexture(gl, attachment)) {
      resizeTexture(gl, attachment, attachmentOptions, width, height);
    } else {
      throw new Error('unknown attachment type');
    }
  });
}

/**
 * Binds a framebuffer
 *
 * This function pretty much solely exists because I spent hours
 * trying to figure out why something I wrote wasn't working only
 * to realize I forget to set the viewport dimensions.
 * My hope is this function will fix that.
 *
 * It is effectively the same as
 *
 *     gl.bindFramebuffer(gl.FRAMEBUFFER, someFramebufferInfo.framebuffer);
 *     gl.viewport(0, 0, someFramebufferInfo.width, someFramebufferInfo.height);
 *
 * @param {WebGLRenderingContext} gl the WebGLRenderingContext
 * @param {module:twgl.FramebufferInfo|null} [framebufferInfo] a framebufferInfo as returned from {@link module:twgl.createFramebufferInfo}.
 *   If falsy will bind the canvas.
 * @param {number} [target] The target. If not passed `gl.FRAMEBUFFER` will be used.
 * @memberOf module:twgl/framebuffers
 */

function bindFramebufferInfo(gl, framebufferInfo, target) {
  target = target || FRAMEBUFFER;
  if (framebufferInfo) {
    gl.bindFramebuffer(target, framebufferInfo.framebuffer);
    gl.viewport(0, 0, framebufferInfo.width, framebufferInfo.height);
  } else {
    gl.bindFramebuffer(target, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }
}

var framebuffers = /*#__PURE__*/Object.freeze({
  __proto__: null,
  bindFramebufferInfo: bindFramebufferInfo,
  createFramebufferInfo: createFramebufferInfo,
  resizeFramebufferInfo: resizeFramebufferInfo
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * vertex array object related functions
 *
 * You should generally not need to use these functions. They are provided
 * for those cases where you're doing something out of the ordinary
 * and you need lower level access.
 *
 * For backward compatibility they are available at both `twgl.attributes` and `twgl`
 * itself
 *
 * See {@link module:twgl} for core functions
 *
 * @module twgl/vertexArrays
 */

const ELEMENT_ARRAY_BUFFER           = 0x8893;

/**
 * @typedef {Object} VertexArrayInfo
 * @property {number} numElements The number of elements to pass to `gl.drawArrays` or `gl.drawElements`.
 * @property {number} [elementType] The type of indices `UNSIGNED_BYTE`, `UNSIGNED_SHORT` etc..
 * @property {WebGLVertexArrayObject} [vertexArrayObject] a vertex array object
 * @memberOf module:twgl
 */

/**
 * Creates a VertexArrayInfo from a BufferInfo and one or more ProgramInfos
 *
 * This can be passed to {@link module:twgl.setBuffersAndAttributes} and to
 * {@link module:twgl:drawBufferInfo}.
 *
 * > **IMPORTANT:** Vertex Array Objects are **not** a direct analog for a BufferInfo. Vertex Array Objects
 *   assign buffers to specific attributes at creation time. That means they can only be used with programs
 *   who's attributes use the same attribute locations for the same purposes.
 *
 * > Bind your attribute locations by passing an array of attribute names to {@link module:twgl.createProgramInfo}
 *   or use WebGL 2's GLSL ES 3's `layout(location = <num>)` to make sure locations match.
 *
 * also
 *
 * > **IMPORTANT:** After calling twgl.setBuffersAndAttribute with a BufferInfo that uses a Vertex Array Object
 *   that Vertex Array Object will be bound. That means **ANY MANIPULATION OF ELEMENT_ARRAY_BUFFER or ATTRIBUTES**
 *   will affect the Vertex Array Object state.
 *
 * > Call `gl.bindVertexArray(null)` to get back manipulating the global attributes and ELEMENT_ARRAY_BUFFER.
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @param {module:twgl.ProgramInfo|module:twgl.ProgramInfo[]} programInfo a programInfo or array of programInfos
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 *
 *    You need to make sure every attribute that will be used is bound. So for example assume shader 1
 *    uses attributes A, B, C and shader 2 uses attributes A, B, D. If you only pass in the programInfo
 *    for shader 1 then only attributes A, B, and C will have their attributes set because TWGL doesn't
 *    now attribute D's location.
 *
 *    So, you can pass in both shader 1 and shader 2's programInfo
 *
 * @return {module:twgl.VertexArrayInfo} The created VertexArrayInfo
 *
 * @memberOf module:twgl/vertexArrays
 */
function createVertexArrayInfo(gl, programInfos, bufferInfo) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  if (!programInfos.length) {
    programInfos = [programInfos];
  }
  programInfos.forEach(function(programInfo) {
    setBuffersAndAttributes(gl, programInfo, bufferInfo);
  });
  gl.bindVertexArray(null);
  return {
    numElements: bufferInfo.numElements,
    elementType: bufferInfo.elementType,
    vertexArrayObject: vao,
  };
}

/**
 * Creates a vertex array object and then sets the attributes on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {Object.<string, function>} setters Attribute setters as returned from createAttributeSetters
 * @param {Object.<string, module:twgl.AttribInfo>} attribs AttribInfos mapped by attribute name.
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 *
 * @return {WebGLVertexArrayObject|null} The created WebGLVertexArrayObject
 *
 * @memberOf module:twgl/vertexArrays
 */
function createVAOAndSetAttributes(gl, setters, attribs, indices) {
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  setAttributes(setters, attribs);
  if (indices) {
    gl.bindBuffer(ELEMENT_ARRAY_BUFFER, indices);
  }
  // We unbind this because otherwise any change to ELEMENT_ARRAY_BUFFER
  // like when creating buffers for other stuff will mess up this VAO's binding
  gl.bindVertexArray(null);
  return vao;
}

/**
 * Creates a vertex array object and then sets the attributes
 * on it
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {Object.<string, function>| module:twgl.ProgramInfo} programInfo as returned from createProgramInfo or Attribute setters as returned from createAttributeSetters
 * @param {module:twgl.BufferInfo} bufferInfo BufferInfo as returned from createBufferInfoFromArrays etc...
 * @param {WebGLBuffer} [indices] an optional ELEMENT_ARRAY_BUFFER of indices
 *
 * @return {WebGLVertexArrayObject|null} The created WebGLVertexArrayObject
 *
 * @memberOf module:twgl/vertexArrays
 */
function createVAOFromBufferInfo(gl, programInfo, bufferInfo) {
  return createVAOAndSetAttributes(gl, programInfo.attribSetters || programInfo, bufferInfo.attribs, bufferInfo.indices);
}

var vertexArrays = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createVertexArrayInfo: createVertexArrayInfo,
  createVAOAndSetAttributes: createVAOAndSetAttributes,
  createVAOFromBufferInfo: createVAOFromBufferInfo
});

/*
 * Copyright 2019 Gregg Tavares
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
const defaults = {
  addExtensionsToContext: true,
};

/**
 * Various default settings for twgl.
 *
 * Note: You can call this any number of times. Example:
 *
 *     twgl.setDefaults({ textureColor: [1, 0, 0, 1] });
 *     twgl.setDefaults({ attribPrefix: 'a_' });
 *
 * is equivalent to
 *
 *     twgl.setDefaults({
 *       textureColor: [1, 0, 0, 1],
 *       attribPrefix: 'a_',
 *     });
 *
 * @typedef {Object} Defaults
 * @property {string} [attribPrefix] The prefix to stick on attributes
 *
 *   When writing shaders I prefer to name attributes with `a_`, uniforms with `u_` and varyings with `v_`
 *   as it makes it clear where they came from. But, when building geometry I prefer using un-prefixed names.
 *
 *   In other words I'll create arrays of geometry like this
 *
 *       const arrays = {
 *         position: ...
 *         normal: ...
 *         texcoord: ...
 *       };
 *
 *   But need those mapped to attributes and my attributes start with `a_`.
 *
 *   Default: `""`
 *
 * @property {number[]} [textureColor] Array of 4 values in the range 0 to 1
 *
 *   The default texture color is used when loading textures from
 *   urls. Because the URL will be loaded async we'd like to be
 *   able to use the texture immediately. By putting a 1x1 pixel
 *   color in the texture we can start using the texture before
 *   the URL has loaded.
 *
 *   Default: `[0.5, 0.75, 1, 1]`
 *
 * @property {string} [crossOrigin]
 *
 *   If not undefined sets the crossOrigin attribute on images
 *   that twgl creates when downloading images for textures.
 *
 *   Also see {@link module:twgl.TextureOptions}.
 *
 * @property {bool} [addExtensionsToContext]
 *
 *   If true, then, when twgl will try to add any supported WebGL extensions
 *   directly to the context under their normal GL names. For example
 *   if ANGLE_instances_arrays exists then twgl would enable it,
 *   add the functions `vertexAttribDivisor`, `drawArraysInstanced`,
 *   `drawElementsInstanced`, and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR`
 *   to the `WebGLRenderingContext`.
 *
 * @memberOf module:twgl
 */

/**
 * Sets various defaults for twgl.
 *
 * In the interest of terseness which is kind of the point
 * of twgl I've integrated a few of the older functions here
 *
 * @param {module:twgl.Defaults} newDefaults The default settings.
 * @memberOf module:twgl
 */
function setDefaults(newDefaults) {
  copyExistingProperties(newDefaults, defaults);
  setDefaults$2(newDefaults);  // eslint-disable-line
  setDefaults$1(newDefaults);  // eslint-disable-line
}

const prefixRE = /^(.*?)_/;
function addExtensionToContext(gl, extensionName) {
  glEnumToString(gl, 0);
  const ext = gl.getExtension(extensionName);
  if (ext) {
    const enums = {};
    const fnSuffix = prefixRE.exec(extensionName)[1];
    const enumSuffix = '_' + fnSuffix;
    for (const key in ext) {
      const value = ext[key];
      const isFunc = typeof (value) === 'function';
      const suffix = isFunc ? fnSuffix : enumSuffix;
      let name = key;
      // examples of where this is not true are WEBGL_compressed_texture_s3tc
      // and WEBGL_compressed_texture_pvrtc
      if (key.endsWith(suffix)) {
        name = key.substring(0, key.length - suffix.length);
      }
      if (gl[name] !== undefined) {
        if (!isFunc && gl[name] !== value) {
          warn$1(name, gl[name], value, key);
        }
      } else {
        if (isFunc) {
          gl[name] = function(origFn) {
            return function() {
              return origFn.apply(ext, arguments);
            };
          }(value);
        } else {
          gl[name] = value;
          enums[name] = value;
        }
      }
    }
    // pass the modified enums to glEnumToString
    enums.constructor = {
      name: ext.constructor.name,
    };
    glEnumToString(enums, 0);
  }
  return ext;
}

/*
 * If you're wondering why the code doesn't just iterate
 * over all extensions using `gl.getExtensions` is that it's possible
 * some future extension is incompatible with this code. Rather than
 * have thing suddenly break it seems better to manually add to this
 * list.
 *
 */
const supportedExtensions = [
  'ANGLE_instanced_arrays',
  'EXT_blend_minmax',
  'EXT_color_buffer_float',
  'EXT_color_buffer_half_float',
  'EXT_disjoint_timer_query',
  'EXT_disjoint_timer_query_webgl2',
  'EXT_frag_depth',
  'EXT_sRGB',
  'EXT_shader_texture_lod',
  'EXT_texture_compression_bptc',
  'EXT_texture_compression_rgtc',
  'EXT_texture_filter_anisotropic',
  'OES_element_index_uint',
  'OES_standard_derivatives',
  'OES_texture_float',
  'OES_texture_float_linear',
  'OES_texture_half_float',
  'OES_texture_half_float_linear',
  'OES_vertex_array_object',
  'WEBGL_color_buffer_float',
  'WEBGL_compressed_texture_atc',
  'WEBGL_compressed_texture_etc1',
  'WEBGL_compressed_texture_etc',
  'WEBGL_compressed_texture_pvrtc',
  'WEBGL_compressed_texture_s3tc',
  'WEBGL_compressed_texture_s3tc_srgb',
  'WEBGL_depth_texture',
  'WEBGL_draw_buffers',
];

/**
 * Attempts to enable all of the following extensions
 * and add their functions and constants to the
 * `WebGLRenderingContext` using their normal non-extension like names.
 *
 *      ANGLE_instanced_arrays
 *      EXT_blend_minmax
 *      EXT_color_buffer_float
 *      EXT_color_buffer_half_float
 *      EXT_disjoint_timer_query
 *      EXT_disjoint_timer_query_webgl2
 *      EXT_frag_depth
 *      EXT_sRGB
 *      EXT_shader_texture_lod
 *      EXT_texture_filter_anisotropic
 *      OES_element_index_uint
 *      OES_standard_derivatives
 *      OES_texture_float
 *      OES_texture_float_linear
 *      OES_texture_half_float
 *      OES_texture_half_float_linear
 *      OES_vertex_array_object
 *      WEBGL_color_buffer_float
 *      WEBGL_compressed_texture_atc
 *      WEBGL_compressed_texture_etc1
 *      WEBGL_compressed_texture_pvrtc
 *      WEBGL_compressed_texture_s3tc
 *      WEBGL_compressed_texture_s3tc_srgb
 *      WEBGL_depth_texture
 *      WEBGL_draw_buffers
 *
 * For example if `ANGLE_instanced_arrays` exists then the functions
 * `drawArraysInstanced`, `drawElementsInstanced`, `vertexAttribDivisor`
 * and the constant `VERTEX_ATTRIB_ARRAY_DIVISOR` are added to the
 * `WebGLRenderingContext`.
 *
 * Note that if you want to know if the extension exists you should
 * probably call `gl.getExtension` for each extension. Alternatively
 * you can check for the existence of the functions or constants that
 * are expected to be added. For example
 *
 *    if (gl.drawBuffers) {
 *      // Either WEBGL_draw_buffers was enabled OR you're running in WebGL2
 *      ....
 *
 * @param {WebGLRenderingContext} gl A WebGLRenderingContext
 * @memberOf module:twgl
 */
function addExtensionsToContext(gl) {
  for (let ii = 0; ii < supportedExtensions.length; ++ii) {
    addExtensionToContext(gl, supportedExtensions[ii]);
  }
}

/**
 * Creates a webgl context.
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 * @private
 */
function create3DContext(canvas, opt_attribs) {
  const names = ["webgl", "experimental-webgl"];
  let context = null;
  for (let ii = 0; ii < names.length; ++ii) {
    context = canvas.getContext(names[ii], opt_attribs);
    if (context) {
      if (defaults.addExtensionsToContext) {
        addExtensionsToContext(context);
      }
      break;
    }
  }
  return context;
}

/**
 * Gets a WebGL1 context.
 *
 * Note: Will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 * @deprecated
 * @private
 */
function getWebGLContext(canvas, opt_attribs) {
  const gl = create3DContext(canvas, opt_attribs);
  return gl;
}

/**
 * Creates a webgl context.
 *
 * Will return a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *     twgl.isWebGL2(gl);
 *
 * @param {HTMLCanvasElement} canvas The canvas tag to get
 *     context from. If one is not passed in one will be
 *     created.
 * @return {WebGLRenderingContext} The created context.
 */
function createContext(canvas, opt_attribs) {
  const names = ["webgl2", "webgl", "experimental-webgl"];
  let context = null;
  for (let ii = 0; ii < names.length; ++ii) {
    context = canvas.getContext(names[ii], opt_attribs);
    if (context) {
      if (defaults.addExtensionsToContext) {
        addExtensionsToContext(context);
      }
      break;
    }
  }
  return context;
}

/**
 * Gets a WebGL context.  Will create a WebGL2 context if possible.
 *
 * You can check if it's WebGL2 with
 *
 *    function isWebGL2(gl) {
 *      return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0 ") == 0;
 *    }
 *
 * Note: For a WebGL1 context will attempt to enable Vertex Array Objects
 * and add WebGL2 entry points. (unless you first set defaults with
 * `twgl.setDefaults({enableVertexArrayObjects: false})`;
 *
 * @param {HTMLCanvasElement} canvas a canvas element.
 * @param {WebGLContextAttributes} [opt_attribs] optional webgl context creation attributes
 * @return {WebGLRenderingContext} The created context.
 * @memberOf module:twgl
 */
function getContext(canvas, opt_attribs) {
  const gl = createContext(canvas, opt_attribs);
  return gl;
}

/**
 * Resize a canvas to match the size it's displayed.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] So you can pass in `window.devicePixelRatio` or other scale value if you want to.
 * @return {boolean} true if the canvas was resized.
 * @memberOf module:twgl
 */
function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  multiplier = Math.max(0, multiplier);
  const width  = canvas.clientWidth  * multiplier | 0;
  const height = canvas.clientHeight * multiplier | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}




/***/ }),

/***/ 5606:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })

}]);