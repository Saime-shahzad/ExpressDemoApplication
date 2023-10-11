const express = require("express");
const router = express.Router();

const createTestApi = require("../Apis/testApi");
// const insertApi=require("../Apis/createApi")
const insertApi = require("../Apis/createApi");

router.use("/api/createTestApi", createTestApi);
router.use("/api/testing/", insertApi);


module.exports = router;
