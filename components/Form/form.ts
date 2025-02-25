export default function useForm() {
  const handlerHelpMessage = (idHelpMessage: string | undefined) => {
    if (idHelpMessage) {
      const helpMessage = document.getElementById(idHelpMessage) as HTMLElement
      helpMessage.classList.toggle("hidden");
    }
  };
  const showPassword = (idInput: string | undefined, idButton: string | undefined) => {
    if (idInput && idButton){
      const buttonsShow = document.getElementsByName(idButton) as NodeListOf<HTMLElement>;
      const inputsPassword = document.getElementsByName(idInput) as NodeListOf<HTMLElement>;
      buttonsShow.forEach((button) => {
        const [showPass, hiddenPass] = button.childNodes as NodeListOf<HTMLElement>;
        showPass.classList.toggle("hidden");
        hiddenPass.classList.toggle("hidden");
      });
      inputsPassword.forEach((input) => {
        if (input.getAttribute("type") === "password")
          input.setAttribute("type", "text");
        else input.setAttribute("type", "password");
      });
    }
  };

  return { handlerHelpMessage, showPassword };
}
