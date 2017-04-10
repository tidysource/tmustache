'use strict';

var val = require('tidyval');
var objRef = require('objref');
var Mustache = require('mustache');

module.exports = function tMustache(view, template, partials){
	val(view).validate('object');
	val(template).validate('string');
	val(partials).validate(['function', 'object', 'undefined']);
	
	if (typeof partials === 'object'){
		var partialsObj = partials;
		partials = function (name){
			return objRef(partialsObj, name, '.');
		};
	}
	
	return Mustache.render(template, view, partials);
};