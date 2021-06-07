const router = require( 'express' ).Router();

const apiRoutes = require('./api');
const userInViews = require('../lib/middleware/userInViews');
const authRoutes = require('./auth-routes');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use( userInViews() );
router.use( '/', authRoutes );
router.use( '/', homeRoutes );
router.use( '/api', apiRoutes );
router.use( '/dashboard', dashboardRoutes );

router.use( ( req, res ) => {
    res.status( 404) .end();
} );

module.exports = router;
