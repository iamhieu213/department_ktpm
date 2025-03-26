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
        const { name , dob , gender , phone , email , status } = data ;

        if(!name || !dob || !gender || !status || !phone || !email){
            throw new Error("Please fill all required fields!");
        }

        const newResident = await new Residents({
            name : name,
            dob : dob,
            gender : gender,
            phone : phone,
            email : email,
            status : status
        })

        await newResident.save();
        return newResident;
    }

    async findResident (data){
        const listResidents = await Residents.find(data);
        return listResidents;
    }


    async updateResident (id , data ) {
        const resident = await this.findResidentById(id);
        if(!resident){
            throw new Error("No existing Resident!");
        }

        const updatedResident = await Residents.updateOne({_id:id}, {$set:data})
        return updatedResident;
    }

    async deleteResident (id) {
        return await Residents.deleteOne({_id:id});
    }

    async deleteResidentByAddressNumber (addressNumber) {
        const list = await this.findResident({addressNumber});

        for(let res of list){
            const res = await this.updateResident(res._id, {addressNumber: null});
            console.log(res);
        }
    }
}

module.exports = new ResidentsServices();