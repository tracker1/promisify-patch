# promisify-patch

Will wrap node-style callback methods as a promise.

Browser: If you use this in the browser (via browserify), you should have an ES6-shim that includes a Promise implementation loaded before this library.


## Installation

`npm install promisify-patch`

### Promise implementation

This project does not install any promise implementation itself or as a dependency.  If you are running an older version of node that does not implement promises, this module will attempt to load one of the following (in order).  `es6-promise`, `es6-promises`, `bluebird`, `Q`.

In the browser (via browserify), no promise implementation will be loaded by this module.  You should use an appropriate ES6 shim that provides a global Promise class/method.

Should you want to access the promise detection/use that this module uses, you can do so.

```
var Promise = require('promisify-patch').getPromiseImplementation();
if (typeof Promise !== 'function') throw new Error("No Promise implementation available.');
...
  return new Promise(function(resolve, reject){
    ...
  });
```

## Usage

**Single Use:**
```
var promisify = require('promisify-patch');

promisify(fs.readdir, '/some/path')
	//.then
    //.catch
    ;
```

**Patch Use**
```
//only needs to be done once
require('promisify-patch').patch(); //adds itself as Function.prototype.promise

//somewhere ehlse
fs.readdir.promise('/some/path')
	//.then
    //.catch
    ;

//if you need to call a method bound against an object context
return context.foo.bind(context).promise(...);
```

NOTE: if you have a method that needs to be bound to a context object, you will need to explicitely bind it before `.promise`. (ex: `return context.foo.bind(context).promise(...);`)
