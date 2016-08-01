var Curl = require('node-libcurl').Curl;
var comb = require('comb');

var logger = comb.logger('api.curl-helper');

var CurlHelper = comb.define({
    static : {

        // constants


        // functions
        getUrlSource : function (url) {
            return new Promise(function (resolve, reject) {
                logger.info("In getUrlSource()");

                var curl = new Curl();

                curl.setOpt( 'URL', url );
                curl.setOpt( 'FOLLOWLOCATION', true );

                curl.on('end', function (statusCode, body, headers) {
                    if (!comb.isUndefinedOrNull(body)) {
                        resolve(body);
                    } else {
                        throw TypeError("Body is null or undefined");
                    }

                    this.close();
                });

                curl.on( 'error', curl.close.bind( curl ) );
                curl.perform();
            });
        }

    }
});

module.exports = CurlHelper;