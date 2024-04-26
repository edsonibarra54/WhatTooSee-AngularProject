const { Router } = require("express");
const { getProfile , getProfileId} = require("../controllers/users");

const router = Router();

router.get("/getUser", getProfile);

router.get("/getUserId", getProfileId);

module.exports = router;