const DrugRepository = require("../repositories/DrugRepository");
const PharmacyRepository = require("../repositories/PharmacyRepository");

let get = async (req, res) => {
    let drugs = await DrugRepository.get();
    res.json(drugs);
}

let getById = async (req, res) => {
    let id = req.params.id;

    let drug = await DrugRepository.findById(id);
    res.json(drug);
}

let getByNameAndPharmacyId = async (req, res) => {
    let data = { ...req.body };

    let drug = await DrugRepository.findByNameAndPharmacyId(data.id, data.name);
    res.json(drug);
}

let getDrugsForPharmacy = async (req, res) => {
    let id = req.params.id;

    let drugs = await DrugRepository.findAllDrugsForOnePharmacy(id);
    res.json(drugs);
}

let post = async (req, res, next) => {
    let data = { ...req.body };

    let drug = await DrugRepository.create(data);
    res.json(drug);
}


let removeDrugFromPharmacy = async (req, res) => {
    let drugId = req.params.drug;
    let pharmacyId = req.params.pharmacy;

    let drug = await DrugRepository.removeDrugFromPharmacy(drugId, pharmacyId);

    res.json(drug);
}

let remove = async (req, res) => {
    let id = req.params.id;

    let drug = await DrugRepository.remove(id);
    res.json(drug);
}

let update = async (req, res) => {
    let id = req.params.id;
    let data = { ...req.body };

    let newDrug = await DrugRepository.update(id, data);
    res.json(newDrug)
}

let findByName = async (req, res, next) => {
    await DrugRepository.findByName(req.body.name)
        .then(drug => {
            res.json(drug)
        })
        .catch(error => next(error))
}

module.exports = { get, getById, post, getByNameAndPharmacyId, getDrugsForPharmacy, removeDrugFromPharmacy, remove, update, findByName };