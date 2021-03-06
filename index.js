'use strict';

var promisify = require('./promisify')
    ,patched = false
    ,originalPatch = null
    ;

exports = module.exports = promisify;
exports.getPromiseImplementation = getPromiseImplementation;
exports.patch = patch;
exports.unpatch = unpatch;

function getPromiseImplementation() {
  return require('i-promise');
}

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