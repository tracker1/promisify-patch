'use strict';

var getPromise = require('./get-promise');
var promisify = require('./promisify');
var patched = false;
var originalPatch = null;

exports = module.exports = promisify;
exports.getPromiseImplementation = getPromise;
exports.patch = patch;
exports.unpatch = unpatch;


function patch() {
  if (patched) return; //already patched
  
  patched = true;
  originalPatch = Function.prototype.promise;
  
  Function.prototype.promise = function() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this);
    return promisify.apply(null, args);
  }
  
  return promisify;
  
};


function unpatch() {
  if (!patched) return; //not patched
  
  patched = false;
  Function.prototype.promise = originalPatch;
  originalPatch = undefined;
  
  return promisify;
}