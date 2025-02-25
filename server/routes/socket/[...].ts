/* import { createRouter, useBase } from 'h3'
import { initSocket } from '@/server/routes/socket/socket'

const router = createRouter()
const users: { socketId: string, id: string, username: string }[] = []
router.get('/socket.io',
    defineEventHandler((event) => initSocket(event, users))
)

export default useBase('/socket', router.handler) */