const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const taskcontroller = require("../controller/taskcontroller");
const { authuser } = require("../middleware/auth");
const {upload} = require("../middleware/upload");


router.post("/register", usercontroller.register);

router.post("/login", usercontroller.login);

router.post("/addblog", authuser,upload, taskcontroller.task);

router.get("/alldata",authuser,taskcontroller.user_list);

router.get("/singlerecord/:id",authuser,taskcontroller.single_Record);

router.delete("/deletedata/:id",authuser,taskcontroller.delete_Record)

router.put("/updatedata/:id", authuser, taskcontroller.updatedata);

router.put("/updateavatar/:id", authuser, upload, taskcontroller.updateavatar);






module.exports = router
