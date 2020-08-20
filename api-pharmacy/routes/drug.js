var express = require("express");
var router = express.Router();

const DrugService = require('../services/DrugService');

router.get("/", DrugService.get);
router.get("/:id", DrugService.getById);
router.get("/pharmacy/:id", DrugService.getDrugsForPharmacy)

router.post("/name/id", DrugService.getByNameAndPharmacyId);
router.post("/", DrugService.post);
router.post("/findByName", DrugService.findByName)

router.delete("/:drug/:pharmacy", DrugService.removeDrugFromPharmacy);
router.delete('/:id',DrugService.remove);

router.put('/:id', DrugService.update);

module.exports = router;