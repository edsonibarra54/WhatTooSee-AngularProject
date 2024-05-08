const { Router } = require("express");
const { getProfile , getProfileId , authenticateUser, registerUser, updateFollowing, updateFollowersCount, updateProfile} = require("../controllers/users");

const router = Router();

router.get("/getUser", getProfile);

router.get("/getUserId", getProfileId);

router.get("/auth", authenticateUser);

router.put("/updateFollowing/:id", updateFollowing);

router.put("/updateFollowersCount/:id/:increment", updateFollowersCount);

router.put("/updateProfile/:id", updateProfile);

router.post("/registerUser", registerUser);

module.exports = router;