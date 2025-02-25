const useModal = () => {
    const closeModal = (id: string) => document.getElementById(id)?.removeAttribute('open')

    const openModal = (id: string) => document.getElementById(id)?.setAttribute('open', '')

    return { closeModal, openModal }
}

export default useModal