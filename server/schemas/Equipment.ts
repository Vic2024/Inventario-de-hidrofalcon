import mongoose from "mongoose";
const { model, Schema } = mongoose

const equipSchema = new Schema({
    equipment: String,
    records: [{
        type: Schema.Types.ObjectId,
        ref: 'Record'
    }]
})

equipSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

equipSchema.index({ equipment: 'text'})
export const Equipment = model('Equipments', equipSchema)