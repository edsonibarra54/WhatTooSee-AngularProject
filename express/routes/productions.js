const { Router } = require("express");
const { getProduction } = require("../controllers/productions");

const router = Router();

router.get("/getProduction", getProduction);


module.exports = router;