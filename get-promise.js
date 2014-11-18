'use strict';

var g = (typeof global !== 'undefined') ? global : window;
var w = this.window;

//wrap require so browserify won't detect the modules
function getModule(name) {
  return require(name);
}

//get the promise implementation, if available
module.exports = function getPromise() {
  if (g.Promise) return g.Promise;
  
  //don't attempt to load shims for browsers
  if (w && w.document && w.navigator) return;
  
  // use _global.require so browserify doesn't attempt to load these
  try { return getModule('es6-promise'); } catch(err) {}
  try { return getModule('es6-promises'); } catch(err) {}
  try { return getModule('bluebird'); } catch(err) {}
  try { 
    //wrap Q
    var q = getModule('q'); 
    return function(resolver) {
      var def = q.defer();
      resolver(def.resolve.bind(def), def.reject.bind(def));
      return def.promise;
    }
  } catch(err) { console.log(err); console.log(err.stack); }
  
  throw new Error("Missing an EcmaScript 6 Promises implementation.");
}


