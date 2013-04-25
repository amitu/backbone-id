// ...
// https://github.com/Ask11/backbone-id
//
// (c) 2013, Aleksey Kulikov
// May be freely distributed according to MIT license.

;(function(Backbone, _) {
  'use strict';

  // Basic implementation of ObjectId generator
  // http://docs.mongodb.org/manual/core/object-id/
  var increment = 0x1000000
    , localId1  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1)
    , localId2  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1);

  function mongo() {
    var dateNow = ((new Date()).getTime()/100 | 0).toString(16);
    return dateNow + localId1 + localId2 + (++increment).toString(16).substring(1);
  }

  // http://stackoverflow.com/a/2117523/893744
  // About UUID format https://gist.github.com/jed/982883#file-readme-md
  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  Backbone.Id = function(Model, method) {
    var idAttribute = Model.prototype.idAttribute
      , defaults    = Model.prototype.defaults
      , sync        = Model.prototype.sync
      , initialize  = Model.prototype.initialize;

    if (method == 'mongo') method = mongo;
    if (!method || method == 'guid') method = guid;

    Model.prototype.defaults = function() {
      var defaultValues = _.isFunction(defaults) ? defaults() : defaults || {};

      var id = method();
      var backboneId = { _new: id };
      backboneId[idAttribute] = id;
      return _.defaults({}, defaultValues, backboneId);
    };

    Model.prototype.initialize = function() {
      if (this.get(idAttribute) !== this.get('_new')) this.unset('_new');
      return initialize.apply(this, arguments);
    };

    Model.prototype.isNew = function() {
      return !!this.get('_new');
    };

    Model.prototype.sync = function() {
      var defer = sync.apply(this, arguments);
      if (this.isNew()) this.unset('_new');
      return defer;
    };
  };
}).call(this, Backbone, _);
