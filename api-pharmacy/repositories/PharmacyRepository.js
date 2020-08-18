var Pharmacy = require('../models/Pharmacy');
var Drug = require('../models/Drug');
var Repository = require('./Repository');

class PharmacyRepository extends Repository {
    constructor(model) {
        super(model);
    }

    async findAllPharmacysForOneDrug(drugId){
        return await this.model.find({drugs: drugId});
    }

    async findByName(name){
        return await this.model.find({name:name});
    }

    async findByLocation(location){
        return await this.model.find({location: location});
    }

    async addDrug(pharmacy,drug){
        return await this.model.findByIdAndUpdate(pharmacy, {$push: {drugs: drug}}, {new: true, useFindAndModify:false});
    }

    async remove(id){
        const pharmacyDel = await this.model.findByIdAndRemove(id);

        const drugs = await Drug.find({pharmacys: id});
        drugs.map(async drug => {
            let pharmacys = drug.pharmacys.filter(pharmacy => {return pharmacy!=id})
            drug.pharmacys = pharmacys;
            await drug.save();
        })

        return pharmacyDel;
    }

    async update(id,pharmParam){
        const pharmacy = await this.model.findById(id);

        if(!pharmacy) throw new Error("Doctor not found");

        Object.assign(pharmacy, pharmParam);

        const newPharmacy = await pharmacy.save();

        return newPharmacy;
    }

}

var pharmacyRepository = new PharmacyRepository(Pharmacy);
module.exports = pharmacyRepository;