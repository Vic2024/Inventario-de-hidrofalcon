import mongoose from "mongoose";
const { model, Schema } = mongoose

export const userSchema = new Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role"
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

const User = model('User', userSchema)

export { User }

