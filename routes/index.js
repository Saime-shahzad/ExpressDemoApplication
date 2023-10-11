const express = require("express");
const router = express.Router();

const createTestApi = require("../Apis/testApi");

const insertApi = require("../Apis/createApi");
const updateApi = require("../Apis/updateapi");

router.use("/api/createTestApi", createTestApi);
router.use("/api/testing/", insertApi);
router.use("/api/update", updateApi);


module.exports = router;
