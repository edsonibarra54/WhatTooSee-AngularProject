const { Router } = require("express");
const { getCommentsUser, getCommentsProduction, createComment, deleteComments } = require("../controllers/comments");

const router = Router();

router.get("/getCommentsUser", getCommentsUser);

router.get("/getCommentsProduction", getCommentsProduction);

router.post("/createComment", createComment)

router.delete("/deleteComments", deleteComments)

module.exports = router;