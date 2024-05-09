const { Router } = require("express");
const { getProductions , getProduction, getProductionById, getProductionsByType, createProduction, deleteProduction } = require("../controllers/productions");

const router = Router();

router.get("/getProductions", getProductions);

router.get("/getProduction", getProduction);

router.get("/getProductionById", getProductionById)

router.get("/getProductionsByType", getProductionsByType);

router.post("/createProduction", createProduction);

router.delete("/deleteProduction", deleteProduction);

module.exports = router;