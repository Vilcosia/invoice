const express = require('express');
const user = require('../controllers/clientController')

const router = express.Router()



router.post('/',user.addClient);

router.post('/getClients',user.getClients);

//router.patch('/update/:client_id',user.updateClient);

router.get('/getOneClient/:client_id',user.getOneClient);
//router.get('/getAllUsers',user.getAllUsers);


module.exports = router;