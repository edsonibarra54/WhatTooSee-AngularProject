const { Router } = require("express");
const { getCommentsUser, getCommentsProduction, createComment, deleteComments } = require("../controllers/comments");
const { validateJWT } = require("../middlewares/verifyJWT");

const router = Router();

router.get("/getCommentsUser", getCommentsUser);

router.get("/getCommentsProduction", getCommentsProduction);

router.post("/createComment", [validateJWT], createComment)

router.delete("/deleteComments", deleteComments)

module.exports = router;