import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { userSchema } from "~/server/schemas/User";
import { roleSchema } from "~/server/schemas/Role";
type urlDB = string | undefined

const bdUrlProd: urlDB = process.env.DB_URL_PROD
const bdUrlDev: urlDB = process.env.DB_URL_DEV

const hashPassword = async () => await bcrypt.hash('hidro_Tech_2024', 10)

const superUser = {
  name: 'Super',
  lastname: 'Usuario',
  username: 'SuperUsuario',
  password: await hashPassword(),
  role: {}
}

const connection = async (url: string) => {
  const db = mongoose.createConnection(url)
  db.on('open', () => console.log(`base de datos conectada a ${url}`))
  db.on('err', err => console.log(`hubo un error ${err}`))
  return db
}

const createSuperUser = async (db: mongoose.Connection) => {
  const User = db.model('User',userSchema)
  const Role = db.model('Role', roleSchema)
  const allUser = await User.find({}).populate('role', { role: 1, _id: 1, })
  if (allUser.length === 0) {
    const roleRes = await Role.findByIdAndUpdate('66ba330e7b773b7f756ed8fb')
    if (roleRes) {
      const res = await new User({ ...superUser, role: roleRes._id }).save()
      roleRes.users = roleRes.users.concat(res.id)
      await roleRes.save()
      try {
        const getUser = await User.findById(res.id).populate('role', { role: 1, _id: 1, })
        return {
          isSuccess: true,
          res: getUser
        }
      } catch (err) {
        return {
          isSuccess: false,
          res: err
        }
      }
    }
  } else {
    const [user] = allUser.filter(user => {
      if (user.role) return user.role.id.toString() === '66ba330e7b773b7f756ed8fb'
    })
    return {
      isSuccess: true,
      res: user
    }
  }
}

async function Init(url: urlDB) {
  if (url !== undefined) {
    const db = await connection(url)
    const response = await createSuperUser(db)
    if (response?.isSuccess !== false) {
     /*  await disconnect() */
      return {
        isSuccess: true,
        res: response?.res
      }
    }
  } else {
    return {
      isSuccess: false,
      res: 'Error: Verifique que la variable de enotrono exista o verifique que la url sea correcta'
    }
  }
}

const results = await Promise.allSettled([Init(bdUrlDev), Init(bdUrlProd)])

const object = results.map(res => {
  if(res.status === 'fulfilled'){
    if(res.value?.isSuccess !== false){
      return res.value?.res
    }
  }
})

console.log(object)
