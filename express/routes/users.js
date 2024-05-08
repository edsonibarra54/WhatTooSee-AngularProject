const { Router } = require("express");
const { getProfile , getProfileId , authenticateUser, registerUser, updateFollowing} = require("../controllers/users");

const router = Router();

router.get("/getUser", getProfile);

router.get("/getUserId", getProfileId);

router.get("/auth", authenticateUser);

router.put("/updateFollowing/:id", updateFollowing);

router.post("/registerUser", registerUser);

module.exports = router;