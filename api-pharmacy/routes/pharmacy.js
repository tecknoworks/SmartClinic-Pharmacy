var express = require("express");
var router = express.Router();

const PharmacyService = require('../services/PharmacyService');

router.get("/", PharmacyService.get);
router.get("/:id", PharmacyService.getById);
router.get("/drug/:id", PharmacyService);

router.post("/findByName", PharmacyService.findByName)
router.post("/", PharmacyService.post);
router.post("/add/newDrug/:id", PharmacyService.addNewDrug);
router.post("/add/Drug/:pharmacy/:drug", PharmacyService.addDrug);

router.delete("/:id", PharmacyService.remove);
router.put('/:id', PharmacyService.update);

module.exports = router;