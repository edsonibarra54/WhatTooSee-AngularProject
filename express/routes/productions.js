const { Router } = require("express");
const { getProductions , getProduction, getProductionById, getProductionsByType, createProduction, deleteProduction, updateProduction, getBannerProductions } = require("../controllers/productions");

const router = Router();

router.get("/getProductions", getProductions);

router.get("/getProduction", getProduction);

router.get("/getProductionById", getProductionById)

router.get("/getProductionsByType", getProductionsByType);

router.get("/getBannerProductions", getBannerProductions);

router.post("/createProduction", createProduction);

router.delete("/deleteProduction", deleteProduction);

router.put("/updateProduction", updateProduction)

module.exports = router;