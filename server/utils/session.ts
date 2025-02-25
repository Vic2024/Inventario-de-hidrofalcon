import type { H3Event } from "h3"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Role } from "../schemas/Role"
import { User } from "../schemas/User"

export async function getUserFromSession(event: H3Event) {
    const config = useRuntimeConfig(event)
    const cookie = getCookie(event, config.cookieNameAccess)
    if (!cookie) return null
    const tokens = JSON.parse(cookie)
    const verifyToken = <JwtPayload>jwt.verify(tokens.refreshToken, config.cookieSecretRefresh)
    if (!verifyToken) return null
    const { id } = verifyToken
    const getUser = await User.findById(id).populate('role', { role: 1, _id: 0, }, Role)
    if (!getUser) return null
    const dataForToken = { id: getUser.id, username: getUser.username }
    const token = jwt.sign(dataForToken, config.cookieSecret, {
        expiresIn: '120'
    })

    setCookie(event, config.cookieNameAccess, JSON.stringify({ ...tokens, token }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })
    return getUser
}