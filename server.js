const express = require("express");
const path = require( 'path' )
const app = express();

// express addons
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( express.static( 'public' ) )

// api routes
const apiRoutes = require('./routes/apiRoutes');
// html routes
const htmlRoutes = require('./routes/htmlRoutes');

// app use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});