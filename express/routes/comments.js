const { Router } = require("express");
const { getCommentsUser, getCommentsProduction } = require("../controllers/comments");

const router = Router();

router.get("/getCommentsUser", getCommentsUser);

router.get("/getCommentsProduction", getCommentsProduction);

module.exports = router;