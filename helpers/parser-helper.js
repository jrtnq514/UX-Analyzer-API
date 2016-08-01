/**
 * Created by JT on 7/30/16.
 */

var htmlparser = require('htmlparser2');
var comb = require('comb');

var logger = comb.logger('api.parser-helper');

var ParserHelper = comb.define({

    static : {

        // constants


        // functions
        parseSourceRaw : function (sourceRaw) {
            return new Promise(function (resolve, reject) {
                logger.info("In parseSourceRaw()");

                // handler for DOM elements
                var domHandler = new htmlparser.DomHandler(function (error, domObject) {
                    if (error) {
                        logger.error("Error parsing sourceRaw");
                    } else {
                        logger.info("Successfully parsed sourceRaw");
                        resolve(domObject);
                    }
                });

                var parser = new htmlparser.Parser(domHandler, {decodeEntities: true, recognizeSelfClosing: true});
                parser.write(sourceRaw);
                parser.end();
            });
        },

        buildData : function (object) {
            return new Promise(function (resolve, reject) {
                logger.info("Building data...");
                var recursiveFunc = function (object, tab, depth) {
                    if (depth === null || depth === undefined) {
                        depth = 1;
                    }
                    if (typeof object === 'object' && object !== null) {
                        if (object.name !== undefined && object.type === 'tag') {
                            // most logic goes here
                            if (depth > maxDepth) {
                                maxDepth = depth;
                            }
                            // replace this with an object
                            console.log(tab + object.name + " (" + depth + ")");
                        }
                        for (var property in object) {
                            if (object.hasOwnProperty(property)) {
                                if (!(property.trim() === 'prev' || property.trim() === 'parent' || property.trim() === 'next')) {
                                    if (property.trim() === 'children') {
                                        depth++;
                                    }
                                    recursiveFunc(object[property], tab + "  ", depth);
                                }
                            }
                        }
                    } else {
                        // ignore for now
                    }
                }
                var maxDepth = 0;
                recursiveFunc(object, "");
            });
        }

    }
});

module.exports = ParserHelper;