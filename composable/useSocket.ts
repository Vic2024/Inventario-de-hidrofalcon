import { logout } from "./useAuth";
import { useAuthUser } from "./useAuthUser"
import { io, type Socket } from 'socket.io-client';

export default function useSocket() {
    const socket = ref<Socket>()
    const user = useAuthUser()

    const initSocket = () => {
        if (user.value) {
            socket.value = io('', {
                auth: {
                    id: user.value.id,
                    username: user.value.username
                }
            })
        }
    }

    const disconnectSocket = () => {
        if (socket.value) socket.value.disconnect()
    }

    const isUserActive = () => {
        if (socket.value) socket.value.on('logout', async ({ isLogged }: { isLogged: boolean }) => {
            if(isLogged){
                try {
                    await logout()
                    await navigateTo('/')
                } catch (err) {
                    console.log(err)
                } 
            }
        })
    }

    onMounted(() => {
        if (user.value) initSocket()
        isUserActive()
    })
    onBeforeUnmount(() => disconnectSocket())

}