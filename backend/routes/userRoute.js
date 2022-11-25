const express = require('express');
const user = require('../controllers/userController')

const router = express.Router()



router.post('/login',user.login);

router.post('/register',user.register);

router.patch('/update/:user_id',user.updateUser);

router.get('/getOneUser/:user_id',user.getOneUser);
//router.get('/getAllUsers',user.getAllUsers);


module.exports = router;