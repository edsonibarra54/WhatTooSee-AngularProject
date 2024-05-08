const { Router } = require("express");
const { getCommentsUser, getCommentsProduction, createComment } = require("../controllers/comments");

const router = Router();

router.get("/getCommentsUser", getCommentsUser);

router.get("/getCommentsProduction", getCommentsProduction);

router.post("/createComment", createComment)

module.exports = router;