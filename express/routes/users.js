const { Router } = require("express");
const { getProfile , getProfileId , authenticateUser} = require("../controllers/users");

const router = Router();

router.get("/getUser", getProfile);

router.get("/getUserId", getProfileId);

router.get("/auth", authenticateUser);

module.exports = router;