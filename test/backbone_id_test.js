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

  describe('model', function() {
    it('generates uuid-like id automatically', function() {
       var book = new Book({ title: 'The Lord of the Rings' });

       expect(book.get('title')).equal('The Lord of the Rings');
       expect(book.get('author')).equal('unknown');

       expect(book.id).exist;
       expect(book.get('_id')).length(36);
       // About UUID format https://gist.github.com/jed/982883#file-readme-md
       expect(book.id).match(/^[a-f,0-9]{8}\-[a-f,0-9]{4}\-4[a-f,0-9]{3}\-[a-b,8-9][a-f,0-9]{3}\-[a-f,0-9]{12}$/);
    });

    it('isNew works as expect', function() {
      // body...
    });

    it('does not change existing id', function() {
      // body...
    });

    it('does not change id on updates', function() {
      // body...
    });

    it('generates mongo-like id', function() {
      var Model = Backbone.Model.extend({});
      Backbone.Id(Model, 'mongo');

      var model = new Model({ name: 'test mongo id generator' });
      expect(model.id).length(24);
      expect(model.id).match(/[a-f,0-9]{24}/);
    });

    it('allows to use custom id function', function() {
      // body...
    });
  });

  describe('collection', function() {
    it('generates id on create');
  });
});
