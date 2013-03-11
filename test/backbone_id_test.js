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

       // About UUID format https://gist.github.com/jed/982883#file-readme-md
       expect(book.id).exist;
       expect(book.id).length(36);
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
  });

  describe('collection', function() {
    it('generates id on create');
  });
});

// expect(@storage.mid()).toMatch /[a-f,0-9]{24}/