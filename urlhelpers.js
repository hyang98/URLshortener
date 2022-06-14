const shortid = require('shortid');
const validUrl = require('valid-url');

function encode(fullUrl, GlobalUrlMap)
{
    if (!validUrl.isWebUri(fullUrl) || fullUrl == '') 
    {
        return console.log('Undefined');  
    }
    var shortUrl = shortid.generate(fullUrl);
    GlobalUrlMap.set(shortUrl, fullUrl);
    return shortUrl;
}

function decode(shortUrl, GlobalUrlMap)
{
    var fullUrl = GlobalUrlMap.get(shortUrl);
    return fullUrl;
}

module.exports = {encode, decode};
