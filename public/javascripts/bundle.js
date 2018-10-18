(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){
if(process.env.NODE_ENV === 'production'){
	module.exports = require('./keys_prod');
} else {
	module.exports = require('./keys_dev');
}

}).call(this,require('_process'))
},{"./keys_dev":2,"./keys_prod":3,"_process":5}],2:[function(require,module,exports){
module.exports = {
	firebaseKey: 'AIzaSyAsUe2Y1zOEUnUZERf7I6LGKeKszu0dYDU',
	mailchimpKey: 'f1ec9aa756e1ac33805ce862244d5acb-us19'
}; 

},{}],3:[function(require,module,exports){
(function (process){
// this file will be pushed to the repo. hide your keys in heroku then make sure the
// naming matches. 

module.exports = {
	firebaseKey: process.env.FIREBASE_KEY,
	mailchimpKey: process.env.MAILCHIMP_KEY
}

}).call(this,require('_process'))
},{"_process":5}],4:[function(require,module,exports){
// Initialize Firebase
var apiKeys = require('../config/keys/keys');

// remove before pushing up to the repo
// console.log('**** firebase key', apiKeys.firebaseKey);
// console.log('**** mailchimp key', apiKeys.mailchimpKey);

var config = {
  // use line 10 instead
  apiKey: apiKeys.firebaseKey,
  authDomain: "pet-pride.firebaseapp.com",
  databaseURL: "https://pet-pride.firebaseio.com",
  projectId: "pet-pride",
  storageBucket: "",
  messagingSenderId: "1083593070841"
};
firebase.initializeApp(config);

var dataRef = firebase.database();
var first_name = "";
var last_name = "";
var mail_address = "";
var email_address = "";


$("#btn-add").on("click", function(event){
  event.preventDefault();

  // Add the values from form fields into the variable
  first_name = $("#firstName").val().trim();
  last_name = $("#lastName").val().trim();
  mail_address = $("#mailingAddress").val().trim();
  email_address = $("#emailAddress").val().trim();

  // Push the data from the variables into the firebase db
  dataRef.ref("subscribers").push({
    first_name: first_name,
    last_name: last_name,
    mail_address: mail_address,
    email_address: email_address,
    subscriber_status: "1",
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $.ajax({
    "async": true,
  "crossDomain": true,
    url: "https://us19.api.mailchimp.com/3.0/lists/ba051ccc3c/members/",
    method: "POST",
    "headers": {
      "Content-Type": "application/json",
      "username": "anyuser",
      "password": "f1ec9aa756e1ac33805ce862244d5acb-us19"
    },
    "data":{email_address: email_address,
      status: "subscribed",
      merge_fields: {
        FNAME: first_name,
        LNAME: last_name,
        ADDRESS: mail_address
      }}
  });

  // Clear the form fields on submit
  $("#firstName").val("");
  $("#lastName").val("");
  $("#mailingAddress").val("");
  $("#emailAddress").val("");
});

},{"../config/keys/keys":1}],5:[function(require,module,exports){
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

},{}]},{},[4]);
