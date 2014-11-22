'use strict';

var Promise = require('i-promise');

module.exports = promisify;

function promisify() {
  //save the execution context
  var context = this;
  var args = Array.prototype.slice.call(arguments);
  
  //get the promises implementatin
  if (!Promise) throw new Error("Missing Promise implementation.");

  //return a new promise - all other errors will be in the promise
  return new Promise(function(resolve, reject){
    try {
      var fn = args.shift();

      if (typeof fn !== "function") return reject(new Error("Missing required function argument"));

      //push a callback method on the end of the arguments to pass to the function
      args.push(function callbackMethod(){
        var results = Array.prototype.slice.call(arguments);
        var err = results.shift();
        if (err) return reject.call(null,err);
        return resolve.apply(null, results);
      });

      //apply the original function
      fn.apply(context, args);
      
    } catch(err) {
      
      return reject(err);
      
    }
    
  });
}