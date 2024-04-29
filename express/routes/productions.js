const { Router } = require("express");
const { getProductions , getProduction, getProductionById } = require("../controllers/productions");

const router = Router();

router.get("/getProductions", getProductions);

router.get("/getProduction", getProduction);

router.get("/getProductionById", getProductionById)

module.exports = router;