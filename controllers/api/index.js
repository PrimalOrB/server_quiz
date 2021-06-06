const router = require('express').Router();

const userRoutes = require('./user-routes');
// const quizzesRoutes = require('../apiRoutes/quizzesRoutes');
// const questionsRoutes = require('../apiRoutes/questionsRoutes');
// const scoresRoutes = require('../apiRoutes/scoresRoutes');

router.use( '/users', userRoutes );
// router.use(quizzesRoutes);
// router.use(questionsRoutes);
// router.use(scoresRoutes);

module.exports = router;