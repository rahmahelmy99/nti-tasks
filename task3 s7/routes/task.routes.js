const router =require('express').Router()
const taskController = require("../controller/task.controller")

router.get("", taskController.alltasks)
router.get("/all", taskController.alltasks)

router.get("/add", taskController.addtask)
router.post("/add", taskController.addtaskLogic)

router.get("/single/:title", taskController.showSingle)

router.get("/edit/:title", taskController.editSingle)
router.post('/edit/:title', taskController.editSingleLogic)


router.get("/all/:title", taskController.delTask)
router.post('/all/:title', taskController.delTask)

router.post('/delAll', taskController.delAll)
module.exports = router