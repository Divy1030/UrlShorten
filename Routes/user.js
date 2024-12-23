const express= require('express');
const router = express.Router();
const {handleSignup} = require('../controllers/user');


router.get('/',handleSignup);

module.exports = router;