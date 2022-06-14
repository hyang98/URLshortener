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

module.exports = GlobalUrlMap;

app.listen(process.env.PORT || 5000);