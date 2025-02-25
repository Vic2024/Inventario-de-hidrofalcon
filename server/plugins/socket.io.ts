import { Server as Engine } from 'engine.io'
import { Server, ServerOptions } from 'socket.io'
import { defineEventHandler } from 'h3'

const options: Partial<ServerOptions> = {
    path: '/socket/socket.io',
    serveClient: false,

}

interface User {
    socketId: string;
    id: string;
    username: string;
}

export default defineNitroPlugin((nitroApp) => {
    const users: { socketId: string, id: string, username: string }[] = []
    const engine = new Engine()
    const io = new Server(options, {
        cors: {
            origin: '*'
        },
        connectionStateRecovery: {
            maxDisconnectionDuration: 2 * 60 * 1000,
            skipMiddlewares: true
        }
    })

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

    io.bind(engine)

    io.on("connection", (socket) => {
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

    nitroApp.router.use("/socket.io/", defineEventHandler({
        handler(event) {
            // @ts-expect-error private method and property
            engine.handleRequest(event.node.req, event.node.res);
            event._handled = true;
        },
        websocket: {
            open(peer) {
                // @ts-expect-error private method and property
                engine.prepare(peer._internal.nodeReq);
                // @ts-expect-error private method and property
                engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
            }
        }
    }));
})