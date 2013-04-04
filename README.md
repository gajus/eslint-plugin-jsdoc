Jsdoc strict type parser [![Build Status](https://travis-ci.org/OrgaChem/jsdoc-strict-type-parser.png?branch=master)](https://travis-ci.org/OrgaChem/jsdoc-strict-type-parser)
========================
This module is Jsdoc type expression parser.

This parser provide:

* Parse strict
* Convert a type name to a link by ```toHtml()```

This parser can parse:

* [JsDoc type expressions](https://code.google.com/p/jsdoc-toolkit/wiki/TagParam)
  * ```foo.bar```, ```String[]```
* [Closure Compiler type expressions](https://developers.google.com/closure/compiler/docs/js-for-compiler)
  * ```Array.<string>```, ```function(this: Objext, arg1, arg2): ret```
* Nested type expressions
  * ```Array.<Array.<string>>```, ```function(function(Function))```

Sample
======

Parsing
-------
```
var Parser = require('jsdoctypeparser').Parser;
var parser = new Parser();
var result = parser.parse('Array.<string|number, ?Object=>|string|undefined');
```

The ```result``` is:

```
{
  optional: true,
  types: [
    {
      parameterTypeUnions: [
        {
          types: [
            { name: 'string' },
            { name: 'number' }
          ]
        },
        {
          nullable: true
          optional: true
          types: [
            { name: 'Object' }
          ]
        }
      ]
    }, {
      { name: 'string' }
    }
  ]
}
```

Publishing
----------

```
var Parser = require('jsdoctypeparser).Parser;
var parser = new Parser();
var result = parser.parse('Array.<MyClass>=');
```

* ```result.toString()``` ⇒ ```'Array.<MyClass>|undefined'```

* ```result.toHtml()``` ⇒ ```'Array.&lt;<a href="MyClass.html">MyClass</a>&gt;|undefined'```

### File name config
You can change a file URL by set ```TypeBulder.TypeName.getUrlByTypeName(typeName)```.

```
var Builder = require('jsdoctypeparser').Builder;
Bulder.TypeName.getUrlByTypeName = function(typeName) {
  // do something.
  return typeName;
}; 
```

Specification
=============
Type name
---------
```
TypeName = {
  name: string
};
```

Type Union
----------
```
TypeUnion = {
  optional: boolean,
  nullable: boolean,
  variable: boolean,
  nonNullable: boolean,
  all: boolean,
  unknown: boolean,
  types: Array.<TypeName|GenericType|FunctionType|RecordType>
};
```

Generic type
-----------
```
GenericType = {
  genericTypeName: string,
  parameterTypeUnions: Array.<TypeUnion>
};
```

Function type
-------------
```
FunctionType = {
  parameterTypeUnions: Array.<TypeUnion>,
  returnTypeUnion: TypeUnion|null,
  isConstructor: boolean,
  contextTypeUnion: TypeUnion|null
};
```

Record type
-----------
```
RecordType = {
  entries: Array.<RecordEntry>
};

RecordEntry = {
  name: string,
  typeUnion: TypeUnion
};
```

License
=======
This script licensed under the MIT.
See: [http://orgachem.mit-license.org](http://orgachem.mit-license.org)
