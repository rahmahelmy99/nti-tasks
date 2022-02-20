const router=require('express').Router()
const customerController=require("../controller/customer.controller")

router.get("",customerController.allCustomers)

router.get("/add", customerController.addCustomer)
router.post('/add', customerController.addCustomerLogic)

router.get('/single/:accNum', customerController.showSingle)

router.get('/edit/:accNum', customerController.editSingle)
router.post('/edit/:accNum', customerController.editSingleLogic)

router.post('/delAll', customerController.delAll)
router.get('/all/:accNum', customerController.delUser)

router.get("/addTrans/:accNum", customerController.addTrans)
router.post("/addTrans/:accNum", customerController.addTransLogic)

module.exports=router