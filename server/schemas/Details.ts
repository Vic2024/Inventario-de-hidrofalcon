import mongoose from 'mongoose'
const { model, Schema } = mongoose

const detailsSchema = new Schema({
    record:{
        type: Schema.Types.ObjectId,
        ref: 'Record'
    },
    serial: String,
    descripcion: String,
    ubicacion: String,
    estado: String,
    creacion: Date,
    creadoPor: String,
    modificacion: Date,
    modificadoPor: String,
})

detailsSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        returnedObject.creacion = returnedObject.creacion.toLocaleDateString()
        returnedObject.modificacion = returnedObject.modificacion.toLocaleDateString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

detailsSchema.index({ serial: 'text', ubicacion: 'text', estado: 'text', creadoPor: 'text', modificadoPor: 'text' })

export const Details = model('Details', detailsSchema)