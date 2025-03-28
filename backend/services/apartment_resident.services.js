'use strict'

const ApartmentServices = require('./apartment.services');
const ResidentServices = require('./residents.services');
const Apart_ResModels = require('../config/models/apartment_residents.models')

class ApartmentResidentServices {
    async getAllResidents(apartmentId) {
        const apartment = await ApartmentServices.findApartmentbyId(apartmentId);
        if(!apartment) {
            throw new Error('Apartment not found');
        }

        const list = await Apart_ResModels.find({apartment_id : apartmentId})
            .populate("resident_id", "name dob gender status");

        if(list.length === 0){
            throw new Error('No resident found in apartment ');
        }

        return list ;
    }

    async addResident (apartmentId , userdata ) {
        const {name , dob , gender , phone , email  , status} = userdata;

        const newResident = await ResidentServices.createResident({name , dob , gender , phone , email  , status});

        if(role === "Owner" ){
            const owner = await Apart_ResModels.findOne({resident_id: residentId , role : "Owner"});
            if(owner){
                throw new Error("Apartment is already has owner!");
            }
        }

        const newRes = await Apart_ResModels.create({apartment_id : apartmentId, resident_id:newResident._id, role : role});

        return newRes;
    }

    async deleteResident (apartmentId , residentId) {
        const res_apart = await Apart_ResModels.findOne({apartmentId, residentId});

        if(res_apart === "Owner"){
            throw new Error("Cannot delete owner");
        }

        const result = await Apart_ResModels.deleteOne({apartment_id : apartmentId , resident_id : residentId});
        return result;
    }
}

module.exports = new  ApartmentResidentServices();