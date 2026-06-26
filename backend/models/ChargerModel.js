import mongoose from "mongoose";
import User from "../models/UserModel.js"

const chargerSchema = new mongoose.Schema({
    name: {
        type : String,
        required :  true,
    },
    location: {
        lat: {
            type: Number,
            required : true,
        },
        long: {
            type: Number,
            required :  true,
        }
    },

    status: {
        type: String,
        enum:["Active","Inactive"],
        default: "Active"
    },

    powerOutput : {
        type: Number,
        required : true
    },

    connectorType : {
        type: String,
        required:  true
    },

    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
{
    timestamps: true
})

const Charger = mongoose.model("Charger",chargerSchema);
export default Charger; 