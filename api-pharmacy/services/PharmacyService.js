const PharmacyRepository = require('../repositories/PharmacyRepository')
const DrugRepository = require('../repositories/DrugRepository');

let get = async (req, res) => {
    let pharmacys = await PharmacyRepository.get();
    res.json(pharmacys);
}

let getById = async (req, res) => {
    let id = req.params.id;
    let pharmacy = await PharmacyRepository.findById(id);

    res.json(pharmacy);
}

let post = async (req, res) => {
    let data = { ...req.body };

    let pharmacy = await PharmacyRepository.create(data);
    res.json(pharmacy);
}

let addNewDrug = async (req, res) => {
    let id = req.params.id;
    let data = { ...req.body };

    let drug = await DrugRepository.create(data);
    let pharmacy = await PharmacyRepository.addDrug(id, drug);
    let newDrug = await DrugRepository.addPharmacy(drug.id, pharmacy);

    res.json({ pharmacy: pharmacy, drug: newDrug });
}

let addDrug = async (req, res) => {
    let pharmacy = req.params.pharmacy;
    let drug = req.params.drug;

    let newPharmacy = await PharmacyRepository.addDrug(pharmacy, drug);
    let newDrug = await DrugRepository.addPharmacy(drug, pharmacy);

    res.json({ pharmacy: newPharmacy, drug: newDrug });
}

let remove = async (req, res) => {
    let id = req.params.id;

    let pharm = await PharmacyRepository.remove(id);
    res.json(pharm);
}

let update = async (req, res) => {
    let id = req.params.id;
    let data = { ...req.body };

    let newPharmacy = await PharmacyRepository.update(id, data);
    res.json(newPharmacy)
}

let findByName = async (req, res, next) => {
    await PharmacyRepository.findByName(req.body.name)
        .then(pharmacy => {
            res.json(pharmacy)
        })
        .catch(error => next(error))
}

module.exports = { get, getById, post, addDrug, remove, addNewDrug, update, findByName };