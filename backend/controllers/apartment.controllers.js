'use strict'

const ApartmentServices = require("../services/apartment.services");

class ApartmentControllers {
    async getAllApartments(req,res) {
        try {
            const listApartment = await ApartmentServices.getAllApartments();
            res.status(200).json({
                success: true,
                message: 'Apartment list successfully',
                list: listApartment
            });
        }catch(error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Failed to get all Apartments",
                error: error
            })
        }
    }

    async findApartmentbyId(req, res) {
        try {
            const apartment = await ApartmentServices.findApartmentbyId(req.params.id);
            res.status(200).json({
                message: 'Apartment found successfully.',
                apartment: apartment
            })
        }catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Failed to find  Apartments",
                error: error
            })
        }
    }

    async createApartment(req, res) {
        try {
            const newApartment = await ApartmentServices.createApartment(req.body);
            res.status(200).json({
                success: true,
                message: 'Apartment created successfully',
                newApartment: newApartment
            })
        }catch(error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Failed to create Apartment!!",
                error: error
            })
        }
    }

    async updateApartmentbyId(req, res) {
        try {
            const updatedApartment = await ApartmentServices.updateApartment(req.params.id, req.body);
            res.status(200).json({
                message: 'Apartment updated successfully',
                apartment: updatedApartment
            })
        }catch(error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Failed to update Apartments !!",
                error: error
            })
        }
    }

    async deleteApartment(req, res) {
        try {
            const deleteApartment = await ApartmentServices.deleteApartment(req.params.id);
            res.status(200).json({
                message: 'Apartment deleted successfully',
            })
        }catch(error) {
            console.log(error);
            res.status(500).json({
                message: 'Failed to delete Apartment',
                error: error
            })
        }
    }

}

module.exports = new ApartmentControllers();