import { Nitro } from 'nitropack'
import mongoose from 'mongoose'

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig()
    try {
        await mongoose.connect(config.mongodbUri)
        console.log('Conectado a la base de datos')
    } catch (err) {
        console.log('No conecta a la base de datos')
    }
}