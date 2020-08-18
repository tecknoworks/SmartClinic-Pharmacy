var Drug = require('../models/Drug');
var Repository = require('./Repository');
const Pharmacy = require('../models/Pharmacy');

class DrugRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findAllDrugsForOnePharmacy(pharmacyId){
        return await this.model.find({pharmacys: pharmacyId});
    }

    async findByNameAndPharmacyId(id,name){
        return await this.model.find({name: name, pharmacys: id})
    }

    async findByName(name){
        return await this.model.find({name: name});
    }

    async addPharmacy(drugId, pharmacy){
        return await this.model.findByIdAndUpdate(drugId, {$push: {pharmacys: pharmacy}}, {new: true, useFindAndModify: false})
    }

    async removeDrugFromPharmacy(drugId,pharmacyId){
        const drug = await this.model.findById(drugId);
        const pharmacy = await Pharmacy.findById(pharmacyId);

        let drugs = pharmacy.drugs.filter( drug=> {return drug != drugId})
        pharmacy.drugs = drugs;

        let pharmacys = drug.pharmacys.filter(pharmacy => {return pharmacy != pharmacyId})
        drug.pharmacys = pharmacys;

        const newPharm = await pharmacy.save();
        const newDrug = await drug.save();

        return ({pharmacy: newPharm, drug: newDrug});
    }

    async remove(drugId){
        const drugDel = await this.model.findByIdAndRemove(drugId);

        const pharmacys = await Pharmacy.find({drugs: drugId});
        pharmacys.map(async pharm => {
            let drugs = pharm.drugs.filter(drug => {return drug!=drugId})
            pharm.drugs = drugs;
            await pharm.save();
        })

        return drugDel;
    }

    async update(id,drugParam){
        const drug = await this.model.findById(id);

        if(!drug) throw new Error("Doctor not found");

        Object.assign(drug, drugParam);

        const newDrug = await drug.save();

        return newDrug;
    }

}

var druRepository = new DrugRepository(Drug);

module.exports = druRepository;