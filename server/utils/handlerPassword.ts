import bcrypt from 'bcrypt'

export const createPassword = async (password: string) => await bcrypt.hash(password, 10)

export const comparePassword = async (currentPass: string, hash: (string | null | undefined)) => {
    if (hash) return await bcrypt.compare(currentPass, hash)
}