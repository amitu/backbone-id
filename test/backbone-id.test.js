describe('Backbone.Id', function() {
  var expect = chai.expect;
  var Book = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
      title: 'unknown book',
      author: 'unknown'
    }
  });
  Backbone.Id(Book);
  Backbone.sync = function() {};

  it('generates uuid-like id automatically', function() {
     var book = new Book({ title: 'The Lord of the Rings' });

     expect(book.get('title')).equal('The Lord of the Rings');
     expect(book.get('author')).equal('unknown');

     expect(book.get('_id')).length(36);
     expect(book.id).match(/^[a-f,0-9]{8}\-[a-f,0-9]{4}\-4[a-f,0-9]{3}\-[a-b,8-9][a-f,0-9]{3}\-[a-f,0-9]{12}$/);
  });

  it('generates mongo-like id', function() {
    var Model = Backbone.Model.extend({});
    Backbone.Id(Model, 'mongo');

    var model = new Model({ name: 'test mongo id generator' });
    expect(model.id).length(24);
    expect(model.id).match(/[a-f,0-9]{24}/);
  });

  it('allows to use custom id function', function() {
    var iterator = 1, model;
    var Model = Backbone.Model.extend({});
    Backbone.Id(Model, function() {
      return iterator++;
    });

    _.times(100, function() {
      model = new Model();
    });

    expect(model.id).equal(100);
  });

  it('isNew works as expect', function() {
    var book = new Book({ title: 'The Hobbit' });
    expect(book.isNew()).equal(true);
  });

  it('removes _new pseudo attribute on first sync', function() {
    var Model = Backbone.Model.extend({
      sync: function(method, model, options) {
        return expect(method).equal('create');
      }
    });

    Backbone.Id(Model);
    var model = new Model({ name: 'test' });
    model.save();

    expect(_.values(model.attributes)).length(2);
    expect(model.isNew()).equal(false);
  });

  it('does not change existing id', function() {
    var book = new Book({ _id: 1, title: 'A Tale of Two Cities' });
    expect(book.id).equal(1);
  });

  it('does not add _new when id exists', function() {
    var book = new Book({ _id: 'asd', title: 'Romeo & Juliet' });
    expect(book.has('_new')).equal(false);
    expect(book.isNew()).equal(false);
  });

  it('generates id on collection.create', function () {
    var Library = Backbone.Collection.extend({
      model: Book
    });

    var library = new Library();
    library.create({ title: 'And Then There Were None' });
    expect(library.at(0).id).length(36);
  });
});
