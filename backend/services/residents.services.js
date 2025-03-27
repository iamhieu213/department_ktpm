'use strict'

const Residents = require('../config/models/residents.models')

class ResidentsServices {
    async findAllResidents (req,res) {
       return await Residents.find({});
    }

    async findResidentById (id) {
        return await Residents.findOne({_id : id});
    }

    async createResident (data) {
        const { name , dob , gender , status } = data ;

        if(!name || !dob || !gender || !status){
            throw new Error("Please fill all required fields!");
        }

        const newResident = await new Residents({
            name : name,
            dob : dob,
            gender : gender,
            status : status
        })

        newResident.save();
        return newResident;
    }

    async findResident (data){
        const listResidents = await Residents.find({data});
        return listResidents;
    }


    async updateResident (id , data ) {
        const resident = this.findResidentById(id);
        if(!resident){
            throw new Error("No existing Resident!");
        }

        const updatedResident = await Residents.updateOne({_id:id}, {$set:data})
        return updatedResident;
    }

    async deleteResident (id) {
        return await Residents.deleteOne({_id:id});
    }
}

module.exports = new ResidentsServices();