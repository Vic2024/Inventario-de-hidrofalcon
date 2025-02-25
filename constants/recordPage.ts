export const filterBoxs = [
    { title: "Marca", id: "marca", value: "marca" },
    { title: "Modelo", id: "modelo", value: "modelo" },
    { title: "Cantidad", id: "cantidad", value: "cantidad" },
    { title: "Fecha de Creacion", id: "creacion", value: "creacion" },
    { title: "Fecha de Modificacion", id: "modificacion", value: "modificacion" },
    { title: "Creador", id: "creadoPor", value: "creadoPor" },
    { title: "Modificador", id: "modificadoPor", value: "modificadoPor" },
    { title: "Reiniciar filtro", id: "reiniciar", value: "reiniciar" }

]

export const initValues = { id: '', marca: '', modelo: '', cantidad: 1 }
export const initErrors = { marca: null, modelo: null, cantidad: null, }

export const form = [
    { typeInput: 'normalInput', id: 'marca', labelName: 'Marca', required: true, type: 'text', idHelpMessage: 'marcaHelpMessage', helpMessage: 'Este campo debe de tener al menos 2 caracteres' },
    { typeInput: 'normalInput', id: 'modelo', labelName: 'Modelo', required: true, type: 'text', idHelpMessage: 'modeloHelpMessage', helpMessage: 'Este campo debe de tener al menos 2 caracteres' },
    { typeInput: 'normalInput', id: 'cantidad', labelName: 'Cantidad', required: true, type: 'number', idHelpMessage: 'cantidadHelpMessage', helpMessage: 'Este campo debe de tener al menos 2 caracteres' },
]