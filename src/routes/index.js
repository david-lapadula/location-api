const express = require('express');
const router = express.Router();

// use middleware in URL for each set of controllers
// would help clarify functionality and organize once application grows
router.use('/users', require('./users'));
router.use('/tracking', require('./tracking'));


module.exports = router;