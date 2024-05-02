const { Router } = require("express");
const { getProductions , getProduction, getProductionById, getProductionsByType } = require("../controllers/productions");

const router = Router();

router.get("/getProductions", getProductions);

router.get("/getProduction", getProduction);

router.get("/getProductionById", getProductionById)

router.get("/getProductionsByType", getProductionsByType);

module.exports = router;