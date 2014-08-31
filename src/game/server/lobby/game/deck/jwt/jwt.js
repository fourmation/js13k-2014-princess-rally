/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
var hashFnv32a = (function(){

    return function(str, asString, seed) {
        /*jshint bitwise:false */
        var i, l,
            hval = (seed === undefined) ? 0x811c9dc5 : seed;

        for (i = 0, l = str.length; i < l; i++) {
            hval ^= str.charCodeAt(i);
            hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
        }
        if( asString ){
            // Convert to 8 digit hex string
            return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
        }
        return hval >>> 0;

    }
})();

var buffer = require('buffer');
var JWT = (function (Buffer) {

    var secret = null;

    var btoa = function(string){
        return new Buffer(string).toString('base64');
    };

    var atob = function(string){
        return new Buffer(string, 'base64').toString();
    };

    var encode = function(data){

        var header = {
            typ:"JWT",
            alg:"Fnv32a"
        };

        var payload = btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(data));

        var signature = btoa(hashFnv32a(payload + secret, true));

        return payload + '.' + signature;

    };

    var chunkJWT = function(jwt){

        var signatureDivide = jwt.lastIndexOf('.');

        if (signatureDivide < 0){
            throw 'Could not find signature in JWT';
        }

        return {
            payload : jwt.substr(0, signatureDivide),
            signature: jwt.substr(signatureDivide + 1)
        }

    };

    var validate = function(jwt, key){

        key = key || secret;

        try{
            var chunks = chunkJWT(jwt);
        }catch(e){
            console.error(e);
            return false;
        }

        var signature = atob(chunks.signature);

        var expectedSignature = hashFnv32a(chunks.payload + key, true);

        return expectedSignature === signature;

    };

    var decode = function(jwt, key){

        key = key || secret;

        if (!validate(jwt)){
            return false;
        }

        var chunks = chunkJWT(jwt);
        var data = atob(chunks.payload.split('.')[1]);

        try{
            var object = JSON.parse(data);
        }catch(e){

            return false;
        }

        if (object){
            return object;
        }

        return false;

    };


    return function(secretString){

        secret = secretString;

        this.validate = validate;
        this.encode = encode;
        this.decode = decode;

    };

})(buffer.Buffer);

module.exports = JWT;