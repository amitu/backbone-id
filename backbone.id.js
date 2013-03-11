// ...
// https://github.com/Ask11/backbone.id
//
// (c) 2013, Aleksey Kulikov
// May be freely distributed according to MIT license.

;(function(Backbone, _) {
  'use strict';

  // http://stackoverflow.com/a/2117523/893744
  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  Backbone.Id = function(Model, options) {
    var idAttribute = Model.prototype.idAttribute
      , defaults    = Model.prototype.defaults;

    Model.prototype.defaults = function() {
      var id = {};
      id[idAttribute] = guid();
      return _.defaults(defaults, id);
    };
  };
}).call(this, Backbone, _);

// increment = 0x1000000
// localId1  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1)
// localId2  = ((1+Math.random())*0x100000 | 0).toString(16).substring(1)

// objectId = ->
//   ((new Date).getTime()/100 | 0).toString(16) + localId1 + localId2 + (++increment).toString(16).substring(1)

// module.exports = Model = Backbone.Model.extend
//   idAttribute: '_id'
//   isNew: ->
//     !!@get('_new')

// Backbone.Timestamp(Model)

// Model.create = (attrs = {}, options = {}) ->
//   new @(_.extend(attrs, {_id: objectId(), _new: true}), options)
