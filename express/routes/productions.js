const { Router } = require("express");
const { getProductions , getProduction, getProductionById, getProductionsByType, createProduction, deleteProduction, updateProduction, getBannerProductions } = require("../controllers/productions");
const { validateJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");

const router = Router();

router.get("/getProductions", getProductions);

router.get("/getProduction", getProduction);

router.get("/getProductionById", getProductionById)

router.get("/getProductionsByType", getProductionsByType);

router.get("/getBannerProductions", getBannerProductions);

router.post("/createProduction", [validateJWT, verifyAdminRole], createProduction);

router.delete("/deleteProduction", [validateJWT, verifyAdminRole], deleteProduction);

router.put("/updateProduction", [validateJWT, verifyAdminRole], updateProduction)

module.exports = router;