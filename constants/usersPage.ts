import roles from "./roles";
export const filterBoxs = [
  { title: "Nombre", id: "nombre", value: "nombre" },
  { title: "Apellido", id: "apellido", value: "apellido" },
  { title: "Username", id: "username", value: "username" },
  { title: "Role", id: "role", value: "role" },
  { title: "Correo", id: "email", value: "correo" },
  { title: "Reiniciar filtro", id: "reiniciar", value: "reiniciar" },
];

export const initValues = { id: '', name: '', lastname: '', username: '', password: '', email: '', role: '', confirPassword: '' }
export const initErrors = { name: null, lastname: null, username: null, password: null, email: null, role: null, confirPassword: null }

export const form = [
  { typeInput: 'normalInput', id: 'name', labelName: 'Nombre', required: true, type: 'text', idHelpMessage: 'nameHelpMessage', helpMessage: 'Este campo tiene que tener al menos 3 caracteres' },
  { typeInput: 'normalInput', id: 'lastname', labelName: 'Apellido', required: true, type: 'text', idHelpMessage: 'lastnameHelpMessage', helpMessage: 'Este campo tiene que tener al menos 3 caracteres' },
  { typeInput: 'normalInput', id: 'username', labelName: 'Nombre de usuario', required: true, type: 'text', idHelpMessage: 'usernameHelpMessage', helpMessage: 'Este campo debe de tener al menos 8 caracteres' },
  { typeInput: 'normalInput', id: 'password', labelName: 'Contraseña', required: true, type: 'password', idHelpMessage: 'passwordHelpMessage', helpMessage: 'Este campo debe de tener al menos 8 caracteres' },
  { typeInput: 'normalInput', id: 'email', labelName: 'Correo electronico', required: true, type: 'text', idHelpMessage: 'emailHelpMessage', helpMessage: 'Ingrese una direccion de email valida' },
  { typeInput: 'selectInput', id: 'role', nameLabel: 'Role', required: true, options: roles },
]

