[![Build Status](https://secure.travis-ci.org/ask11/backbone-id.png?branch=master)](https://travis-ci.org/ask11/backbone-id)

# Backbone.Id

  Generates Id for new instance of Backbone.Model on the client.
  Sometimes it useful to generate model's id imediately, in order to create relationships with other models and generate views. Supports [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier), [MongoDB ObjectId](http://docs.mongodb.org/manual/core/object-id/) and custom generators.

## Installation

    $ bower install backbone-id --save

## Example

```js
// we have model
var Book = Backbone.Model.extend({
  idAttribute: '_id',
  defaults: {
    title: 'unknown book',
    author: 'unknown'
  }
});

// apply Backbone.Id to Book model
Backbone.Id(Book);

var book = new Book({ title: 'The Lord of the Rings' });
book.toJSON();
// => {
//  title: "The Lord of the Rings",
//  author: "unknown",
//  _id: "9f08362e-dbbd-4675-9ff7-f96c9726f29f"
// }

book.isNew(); // => true
```

## API

### Backbone.Id(Model, method)

  Plugin adds one `Backbone.Id` function to patch existing Backbone.Model with id-generator functionality.
  By default it uses UUID, and shiped with MongoDB's ObjectId generator

```js
Backbone.Id(Book, 'mongo');
var book = new Book({ title: 'Red' });
book.toJSON(); // => { title: "Red", author: "unknown", _id: "305fd868a7627428df000002" }
```

  Also it supports custom function as a generator.

```js
var iterator = 101;
Backbone.Id(Book, function() {
  return iterator++;
});

model = new Book({ title: 'Effective Javascript' });
model.id; // => 101

model = new Book({ title: 'Node.js in action' });
model.id; // => 102
```

### Backbone.Id.guid()

  Generates [UUID](http://en.wikipedia.org/wiki/Universally_unique_identifier).

### Backbone.Id.mongo()

  Generates [MongoDB ObjectId](http://docs.mongodb.org/manual/core/object-id/).

## Development

  - `npm install` to install development dependencies: bower & testem.
  - `npm test` to ensure that all tests pass
  - `npm start` to run test watcher on [localhost:7357](http://localhost:7357/)

## Licence

  Aleksey Kulikov, [MIT](http://ask11.mit-license.org/)
