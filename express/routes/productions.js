const { Router } = require("express");
const { getProductions , getProduction } = require("../controllers/productions");

const router = Router();

router.get("/getProductions", getProductions);
router.get("/getProduction", getProduction);

module.exports = router;