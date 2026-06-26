import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    email: {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
},{
       timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }    
})

const User = mongoose.model("User",UserSchema);
export default User; 