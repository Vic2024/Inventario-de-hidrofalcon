/* import { Server, type ServerOptions } from 'socket.io'
import type { H3Event } from 'h3'
interface User {
    socketId: string;
    id: string;
    username: string;
}

const options: Partial<ServerOptions> = {
    path: '/socket/socket.io',
    serveClient: false,

}

export const io = new Server(options)

function userActive(user: User, users: User[]): { isSucces: boolean, result: { oldSocketId: string } | null } {
    const isUserLogged = users.some(u => u.id === user.id)
    if (!isUserLogged) {
        users.push(user)
        return { isSucces: false, result: null }
    }
    else {
        const indexUserLogged = users.findIndex(u => u.id === user.id)
        const oldSocketId = users[indexUserLogged].socketId
        users[indexUserLogged] = user
        return { isSucces: true, result: { oldSocketId } }
    }
}

export function initSocket(event: H3Event, users: User[]) {
    //@ts-ignore 
    io.attach(event.node.res.socket?.server)

    io.of('/dashboard').on('connection', (socket) => {
        const isUserActive = userActive({
            socketId: socket.id,
            username: socket.handshake.auth.username,
            id: socket.handshake.auth.id
        }, users)
        if (isUserActive.isSucces && isUserActive.result) {
            socket.to(isUserActive.result.oldSocketId).emit('logout', { isLogged: true })
        }
        socket.on('disconnect', () => {
            const index = users.findIndex(user => user.socketId === socket.id)
            users.slice(index, 1)
        })
    })

}    */