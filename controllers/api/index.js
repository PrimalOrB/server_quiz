const router = require('express').Router();

const userRoutes = require('./user-routes');
const quizRoutes = require('./quiz-routes');
// const questionsRoutes = require('../apiRoutes/questionsRoutes');
// const scoresRoutes = require('../apiRoutes/scoresRoutes');

router.use( '/users', userRoutes );
router.use( '/quiz', quizRoutes);
// router.use(questionsRoutes);
// router.use(scoresRoutes);

module.exports = router;