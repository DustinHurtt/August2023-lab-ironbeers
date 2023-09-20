const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers.hbs', { beersFromApi })
  })
  .catch(error => console.log(error));
})

app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then((beersFromApi) => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('random.hbs', { beersFromApi })
  })
  .catch(error => console.log(error));
})

app.get('/beer/:id', (req, res, next) => {

  console.log("Params", req.params)
  
  punkAPI
  .getBeer(req.params.id)
  .then((beersFromApi) => {
    // console.log('Beers from the database: ', beersFromApi)
    res.render('random.hbs', { beersFromApi })
  })
  .catch(error => console.log(error));


})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
