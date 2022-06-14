const assert = require('assert'); 
const { expect } = require('chai');
const validUrl = require('valid-url');
const urlhelper = require('../urlhelpers.js')

let TestUrlMap = new Map();
    
describe('Encode a URL', () => 
{
    it('should output a short URL ', () => 
    {
        var shorturl = urlhelper.encode("https://google.com", TestUrlMap);
        assert.notEqual(shorturl, null);
        assert.notEqual(shorturl, "https://google.com");
        assert.equal(TestUrlMap.get(shorturl), "https://google.com");
    });

    it('should be able to handle an invalid URL', () => 
    {
        var longUrl = urlhelper.encode("https:qsdwq.com", TestUrlMap);
        assert.equal(longUrl, validUrl.isWebUri(longUrl))
    });

    it('should be able to handle no input value', () => 
    {
        var longUrl = urlhelper.encode("", TestUrlMap);
        assert.equal(longUrl, validUrl.isWebUri(longUrl))
    });
})

describe('Decode a URL', () =>
{
    it('should output a full URL', () => 
    {
        var shorturl = urlhelper.encode("https://google.com", TestUrlMap);
        var result = urlhelper.decode(shorturl, TestUrlMap);
        assert.equal(result, "https://google.com");
        assert.equal(TestUrlMap.get(shorturl), result);
    });

})