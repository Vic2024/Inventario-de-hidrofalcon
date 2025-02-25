import mongoose from "mongoose";
const { model, Schema } = mongoose

export const roleSchema = new Schema({
    role: String,
    users: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

roleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const Role = model('Role', roleSchema)
