// ...
// https://github.com/Ask11/backbone.id
//
// (c) 2013, Aleksey Kulikov
// May be freely distributed according to MIT license.

;(function(Backbone, _) {
  'use strict';

  var increment = 0x1000000
    , localId1  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1)
    , localId2  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1);

  function mongo() {
    var dateNow = ((new Date()).getTime()/100 | 0).toString(16);
    return dateNow + localId1 + localId2 + (++increment).toString(16).substring(1);
  }

  // http://stackoverflow.com/a/2117523/893744
  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  Backbone.Id = function(Model, method) {
    var idAttribute = Model.prototype.idAttribute
      , defaults    = Model.prototype.defaults;

    if (method === 'mongo') method = mongo;
    if (!method || method === 'guid') method = guid;

    Model.prototype.defaults = function() {
      var id = {};
      id[idAttribute] = method();
      return _.defaults(defaults || {}, id);
    };
  };
}).call(this, Backbone, _);
