export default function useMenu() {
    const handlerMenu = (): void => {
        const nav: HTMLElement | null = document.querySelector('.menu');
        if (nav) {
            nav.classList.toggle('opacity-100');
            nav.classList.toggle('pointer-events-auto');
        }
    }

    onMounted(() =>{
        document.addEventListener("click", (e: MouseEvent): void => {
            if (!(e.target instanceof Element) || !e.target.matches(".menu a")) return;
            const nav: HTMLElement | null = document.querySelector('.menu');
            if (nav) {
                nav.classList.remove('opacity-100');
                nav.classList.remove('pointer-events-auto');
            }
        });
    })

    return { handlerMenu }
}