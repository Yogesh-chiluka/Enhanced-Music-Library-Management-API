import mongoose, { Schema } from 'mongoose'

const adminSchema = new Schema({

    adminflag:{
        type: Boolean,
        default: false
    },

},{
    timestamps:true
})

export const Admin = mongoose.model('Admin',adminSchema);