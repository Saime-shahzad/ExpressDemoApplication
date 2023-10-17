const express = require("express");
const router = express.Router();

const createTestApi = require("../Apis/testApi");


const insertApi = require("../Apis/createApi");
const updateApi = require("../Apis/updateapi");
const deleteApi = require("../Apis/deleteApi");

router.use("/api/createTestApi", createTestApi);
router.use("/api/insertApi", insertApi);
router.use("/api/update", updateApi);
router.use("/api/deleteApi", deleteApi);



module.exports = router;
