/**
 * Created by JT on 7/29/16.
 */

var express = require('express');
var analyze_router = express.Router();
var comb = require('comb');

// logger
var logger = comb.logger('api.routes.analyze_routes');


// helpers
var CurlHelper = require('../helpers/curl-helper');
var ParserHelper = require('../helpers/parser-helper');

// models
var Site = require('../models/site.js');

/**
 * Todo apidocs
 */

// get page analyzed results
analyze_router.get('/analyze', function (req, res, next) {
    var url = req.query.url;

    var site = new Site({ url : url });

    // get source from url
    CurlHelper.getUrlSource(url)
        .then(function (sourceRaw) {
            site.sourceRaw = sourceRaw;
            logger.info("Got url source");
            return ParserHelper.parseSourceRaw(site.sourceRaw);
        }).then(function (parsedSource) {
            // return ParserHelper.buildData(parsedSource);
        }).then(function (builtData) {
            console.log(builtData);
            res.json(site);
        }).catch(function (reason) {
            logger.error("Error getting source from url. Reason: " + reason);
        });

    
});

module.exports = analyze_router;