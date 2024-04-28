const { Router } = require("express");
const { getProfile , getProfileId , authenticateUser, registerUser} = require("../controllers/users");

const router = Router();

router.get("/getUser", getProfile);

router.get("/getUserId", getProfileId);

router.get("/auth", authenticateUser);

router.post("/registerUser", registerUser);

module.exports = router;