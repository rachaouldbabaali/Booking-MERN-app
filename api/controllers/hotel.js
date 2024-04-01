import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) => {
    const hotel = new Hotel(req.body);
    try {
        const newHotel = await hotel.save();
        res.status(201).send(newHotel);
    } catch (error) {
        next(error);
    }
    };

export const updateHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" });
        }
        res.status(200).send(hotel);
    }
    catch (error) {
        next(error);
    }
    };

export const deleteHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" });
        }
        res.status(200).send({ message: "Hotel deleted" });
    } catch (error) {
        next(error);
    }
    };

export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).send(hotels);
    } catch (error) {
        next(error);
    }
    };

export const getHotelById = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).send({ message: "Hotel not found" });
        }
        res.status(200).send(hotel);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    };

export const countByCity = async (req, res, next) => {
    const cities= req.query.cities.split(",");
    try {
        const hotels = await Hotel.find({city: { $in: cities }});
        res.status(200).send(hotels);
    } catch (error) {
        next(error);
    }
    };
