const { Router } = require("express");
const { getUsers, postUsers, putUsers, deleteUsers, getUsersDos } = require("../controllers/asd");

const router = Router();

router.get("/", getUsers);

router.get("/getDos", getUsersDos);
  
router.post("/", postUsers);

router.put("/:id", putUsers);

router.delete("/", deleteUsers);


module.exports = router;