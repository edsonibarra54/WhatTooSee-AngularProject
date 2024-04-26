const { Router } = require("express");
const { getCommentsUser } = require("../controllers/comments");

const router = Router();

router.get("/getCommentsUser", getCommentsUser);


module.exports = router;