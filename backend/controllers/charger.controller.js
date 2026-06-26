import Charger  from "../models/ChargerModel.js";
import asyncHandler from "../utils/asyncHandler.js";

// description create charging station
// api route POST /api/charger/:id
// accesss private
export const createCharger = asyncHandler(async(req,res) => {
    const {
        name,
        location,
        status,
        powerOutput,
        connectorType
    } = req.body;

    if(
        !name ||
        location?.lat === undefined ||
        location?.long === undefined ||
        !powerOutput ||
        !connectorType
    ){
        res.status(400)
        throw new Error("Please provide all charger details")
    }

    const charger = await Charger.create({
        name,location,status,powerOutput,connectorType,createdBy:req.user._id
    });

    res.status(201).json({message : "Charging station created successfully", 
        data :  charger
    })
})

// description get all charging stations
// api route get /api/chargers/
// accesss private
export const getChargers = asyncHandler(async(req,res) => {

    const {
        status,
        connectorType,
        powerOutput,
        search
    } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1 )*limit;

    let filter = {};

    if(status) {filter.status = status}
    if(connectorType) {filter.connectorType = connectorType }
    if( powerOutput ) {filter.powerOutput = {
        $gte:Number(powerOutput)
    } }

    if(search){
        filter.name = { 
            $regex:search,
            $options:"i"}
    }

    const total =
    await Charger.countDocuments(filter);

    const chargers =
    await Charger.find(filter)
    .populate(
        "createdBy",
        "name email"
    )
    .sort({
        createdAt:-1
    })
    .skip(skip)
    .limit(limit);

    res.status(200).json({
        success : true,
        count: chargers.length,
        pagination:{
            total,
            page,
            pages:Math.ceil(
                total/limit
            )
        },
        data:chargers
    })
})

// description get charging station
// api route GET /api/chargers/:id
// accesss private
export const getChargerById = asyncHandler(async(req,res) => {

    const charger = await Charger.findById(req.params.id)

    if(!charger){
        res.status(404)
        throw new Error("Charging station is not found")
    }

    res.status(200).json({
        success : true,
        message : "Charger is found",
        data:charger
    })
})

// description update charging station
// api route POST /api/chargers/:id
// accesss private
export const updateCharger = asyncHandler(async(req,res) => {
    const charger = await Charger.findById(req.params.id);

    if(!charger){
        res.status(404)
        throw new Error("Charging station not found")
    }

    // ownership check
    if(charger.createdBy.toString() !== req.user._id.toString()){
        res.status(403)
        throw new Error("You are not allowed to update this charger")
    }

    const updateCharger = await Charger.findByIdAndUpdate(
        req.params.id,
        req.body,
         {
            new:true,
            runValidators:true
        })
        res.status(200).json(
            {
                success:true,
                message : "Charging Station Updated",
                data :  updateCharger
            }
        )
})

// description delete charging station
// api route Delete /api/chargers/:id
// accesss private
export const deleteCharger = asyncHandler(async(req,res) => {
    const charger = await Charger.findById(req.params.id);

     if(!charger){
        res.status(404)
        throw new Error("Charging station not found")
    }
    // ownership check
    if(
        charger.createdBy.toString()
        !==
        req.user._id.toString()
    ){

        res.status(403);

        throw new Error(
            "You are not allowed to delete this charger"
        );

    }
    await charger.deleteOne();

    res.status(200).json({
        success : true,
        message : "Charging Stattion Deleted Successfully",
    })
})