import mongoose from "mongoose";
const { model, Schema } = mongoose

const recordSchema = new Schema({
    equipo: {
        type: Schema.Types.ObjectId,
        ref: 'Equipments'
    },
    marca: String,
    modelo: String,
    cantidad: Number,
    creacion: Date,
    creadoPor: String,
    modificacion: Date,
    modificadoPor: String,
    details:[{
        type: Schema.Types.ObjectId,
        ref: 'Details'
    }]
})

recordSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        returnedObject.creacion = returnedObject.creacion.toLocaleDateString()
        returnedObject.modificacion = returnedObject.modificacion.toLocaleDateString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
recordSchema.index({ marca: 'text', modelo: 'text', creadoPor: 'text', modificadoPor: 'text' })

export const Record = model('Record', recordSchema)