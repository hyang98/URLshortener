const express = require('express')
const urlhelpers = require('./urlhelpers')

const app = express()
let GlobalUrlMap = new Map();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => 
{
  res.render('index.ejs', {shortUrls: GlobalUrlMap});
})


app.post('/shortUrls', async (req, res) =>
{
  var shortUrl = await urlhelpers.encode(req.body.fullUrl, GlobalUrlMap);
  console.log(shortUrl);
  res.redirect('/');
})

app.get('/:shortUrl', async (req, res) => 
{
  var longUrl = urlhelpers.decode(req.params.shortUrl, GlobalUrlMap);
  if (longUrl == null)
  {
    return res.sendStatus(404);
  } 

  res.redirect(longUrl);
})

/*
function encode() 
{
  app.post('/shortUrls', async (req, res) => 
  {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
  })
}


function decode() 
{
  app.get('/:shortUrl', async (req, res) => 
  {
    const shortUrl = await ShortUrl.findOne({ short: res.params.shortUrl });
    if (shortUrl == null)
    {
      return res.sendStatus(404);
    } 
  
    shortUrl.clicks++;
    shortUrl.save();
  
    req.redirect(shortUrl.full);
  })
}

module.exports = { encode, decode };

encode();
decode();
*/

module.exports = GlobalUrlMap;

app.listen(process.env.PORT || 5000);