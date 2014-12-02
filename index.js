module.exports = AbstractResource;

var values = require('lodash/values');
var sortBy = require('lodash/sortBy');

function MemResource () {
  if (!(this instanceof MemResource)) return new MemResource()
  this.entities = {};
}

var filters = {
  sort: function (values, param) {
    return sortBy(values, function (item) {
      return item[param];
    });
  },
  order: function (values) {
    return values.reverse();
  },
  skip: function (values, param) {
    return values.slice(param);
  },
  limit: function (values, param) {
    return values.slice(0, param);
  }
};

Object.defineProperties(MemResource.prototype, {
  find: {
    value: function _MemResource_find (params, cb) {
      if (typeof params === 'function') {
        cb = params;
        params = {};
      }

      params.query = params.query || {};

      var values = values(this.entities);

      filters.forEach(function (handler, name) {
        values = params.query[name] ? handler(values, params.query[name]) : values;
      });

      cb(null, values);
    },
  },
  get: {
    value: function _MemResource_get (id, params, cb) {
      if (typeof params === 'function') {
        cb = params;
        params = {};
      }

    },
  },
  create: {
    value: function _MemResource_create () {

    },
  },
  update: {
    value: function _MemResource_update () {

    },
  },
  patch: {
    value: function _MemResource_patch () {

    },
  },
  remove: {
    value: function _MemResource_remove () {

    },
  },
});
