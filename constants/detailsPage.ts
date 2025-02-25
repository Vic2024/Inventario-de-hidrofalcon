import location from "~/constants/location"
export const filterBoxs = [
    { title: "Serial", id: "serial", value: "serial" },
    { title: "Ubicacion", id: "location", value: "ubicacion" },
    { title: "Descripcion", id: "description", value: "descripcion" },
    { title: "Fecha de Creacion", id: "creacion", value: "creacion" },
    { title: "Fecha de Modificacion", id: "modificacion", value: "modificacion" },
    { title: "Creador", id: "creadoPor", value: "creadoPor" },
    { title: "Modificador", id: "modificadoPor", value: "modificadoPor" },
    { title: "Reiniciar filtro", id: "reiniciar", value: "reiniciar" }

]
export const form = [
    { typeInput: 'normalInput', id: 'serial', labelName: 'Serial', required: true, type: 'text', idHelpMessage: 'serialHelpMessage', helpMessage: 'Este campo debe de tener al menos 4 caracteres' },
    { typeInput: 'selectInput', id: 'ubicacion', nameLabel: 'Ubicacion', required: true, options: location },
    { typeInput: 'textArea', id: 'descripcion', labelName: 'Descripcion', required: true, type: 'number', idHelpMessage: 'descriptionHelpMessage', helpMessage: 'Este campo debe de tener al menos 4 caracteres' },
]

export const initValues = { id: '', serial: '', ubicacion: '', descripcion: '', estado: '' } 

export const initErrors = { serial: null, location: null, description: null, state: null }

