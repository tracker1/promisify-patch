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
  
  //browser window
  if (w && w.document && w.navigator) {
    //if Q is available, use it
    if (w.Q && w.Q.Promise) return w.Q.Promise;
    if (w.Q && w.Q.promise) return w.Q.promise;
    
    //not available
    throw new Error("Missing an EcmaScript 6 Promises implementation.");  
  }
  
  // use _global.require so browserify doesn't attempt to load these
  try { return getModule('es6-promise'); } catch(err) {}
  try { return getModule('es6-promises'); } catch(err) {}
  try { return getModule('bluebird'); } catch(err) {}
  try { 
    //wrap Q
    var q = getModule('q');
    if (q.Promise) return q.Promise; //latest
    if (q.promise) return q.promise; //older
  } catch(err) { console.log(err); console.log(err.stack); }
  
  throw new Error("Missing an EcmaScript 6 Promises implementation.");
}


