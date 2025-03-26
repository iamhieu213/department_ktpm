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

        if(!list.length){
            throw new Error('No resident found in apartment ');
        }

        return list ;
    }

    async addResident (apartmentId , residentId , role ) {
        const apartment = await ApartmentServices.findApartmentbyId(apartmentId);
        if(!apartment) {
            throw new Error('Apartment not found');
        }

        const existingRes = await Apart_ResModels.findOne({resident_id : residentId , apartment_id : apartmentId})

        if(existingRes){
            throw new Error("Resident is already in this apartment");
        }

        if(role === "Owner" ){
            const owner = await Apart_ResModels.findOne({resident_id: residentId , role : "Owner"});
            if(owner){
                throw new Error("Apartment is already has owner!");
            }
        }

        const newRes = await Apart_ResModels.create({apartment_id : apartmentId, resident_id:residentId , role : role});



        return newRes;
    }
}

module.exports = new  ApartmentResidentServices();