const express = require('express');
const user = require('../controllers/invoiceController')

const router = express.Router()



router.post('/',user.addInvoice);

router.get('/',user.getInvoice);

router.patch('/update/:invoice_id',user.updateStatus);

router.get('/getOneInvoice/:invoice_id',user.getOneInvoice);



module.exports = router;