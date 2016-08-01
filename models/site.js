/**
 * Created by JT on 7/29/16.
 */
var comb = require('comb');
var logger = comb.logger("api.site");

// site object
var Site = comb.define({
   instance : {

       // properties
       _url : null,
       _source : null,
       _sourceRaw : null,
       _complexity : null,
       _maxElementDepth : null,
       _averageElementDepth : null,

       // constructor
       constructor : function (options) {
           options = options || {};
           // this._super(arguments);
           var url = options.url,
               source = options.source,
               sourceRaw = options.sourceRaw;
           url && ( this._url = url );
           source && ( this._source = source );
           sourceRaw && ( this._sourceRaw = sourceRaw );
       },

       // getters
       getters : {
           url : function () {
               return this._url;
           },

           source : function () {
               return this._source;
           },

           sourceRaw : function () {
               return this._sourceRaw;
           },

           complexity : function () {
               return this._complexity;
           },

           maxElementDepth : function () {
               return this._maxElementDepth;
           },

           averageElementDepth : function () {
               return this._averageElementDepth;
           }
       },

       // setters
       setters : {
           url : function (url) {
               if (comb.isString(url)) {
                    this._url = url;
               } else {
                    throw TypeError("Url must be a string");
               }
           },

           source : function (source) {
               if (comb.isObject(source)) {
                   this._source = source;
                   // this._buildData(source);

               } else {
                   throw TypeError("Source must be a object");
               }
           },

           sourceRaw : function (sourceRaw) {
               if (comb.isString(sourceRaw)) {
                   this._sourceRaw = sourceRaw;
               } else {
                   throw TypeError("Source Raw must be a string");
               }
           },

           complexity : function (complexity) {
               if (comb.isString(complexity)) {
                   this._complexity = complexity;
               } else {
                   throw TypeError("Complexity must be a string");
               }
           }
       }

       // functions

   }
});

module.exports = Site;