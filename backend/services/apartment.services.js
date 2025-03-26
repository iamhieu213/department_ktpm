const Apartment = require("../config/models/apartment.models");
const ResidentServices = require("../services/residents.services");

class ApartmentService {
    async getAllApartments() {
        return await Apartment.find({});
    }

    async createApartment(data) {
        const {address_number , area , status} = data;

        if(!address_number || !area || !status) {
            throw new Error("Missing required fields!");
        }

        const newApartment = new Apartment({
            address_number : address_number,
            area : area,
            status : status
        })

        return await newApartment.save();
    }

    async findApartment(data) {
        return await Apartment.findOne(data);
    }
    async findApartmentbyId(id) {
        return await Apartment.findOne({_id : id});
    }

    async deleteApartment(id) {
        const apartment = await this.findApartmentbyId({_id: id});
        if(!apartment) {
            throw new Error(`Apartment not found: ${id}`);
        }
        console.log(apartment);
        if(apartment.numbers_of_members > 0 ){
            await ResidentServices.deleteResidentByAddressNumber(apartment.address_number);
        }

        return await Apartment.deleteOne({_id : id});
    }

    async updateApartment(id , data) {
        const apartment = await this.findApartmentbyId(id);
        if(!apartment) {
            throw new Error(`Apartment not found: ${id}`);
        }

        return await Apartment.updateOne({_id: id}, {$set: data} )
    }
    
}

module.exports = new  ApartmentService();
