import jsPDF from "jspdf";
/* import autoTable from "jspdf-autotable"; */
import logo from '~/public/img/Logo Hidrofalcon.png'
import type { getData } from "~/types";
import { optionsToTable } from "~/composable/transformToTable";
export default function convertToPdf(url: string, result: getData, titles: string[] | null) {
    const toTable = optionsToTable[url] ? optionsToTable[url](result) : optionsToTable['default'](result)
    const doc = new jsPDF()
    const titlePage = document.getElementById('titlePage')?.textContent
    const subTitle = document.getElementById('subTitlePage')?.textContent ?? ''
    const titlesToPdf = titles ?? []
    doc.addImage(logo, 'png', 185, 4, 24, 24)
    doc.text(['HIDROFALCON C.A', 'DEPARTAMENTO DE TECNOLOGIA E INFORMACION'], 105, 28, { align: 'center' })
    doc.text(`REGISTRO DE ${titlePage?.toUpperCase()}`, 105, 23, { align: 'center' })
    if (subTitle.length > 0) doc.text(`MODELO ${subTitle?.toUpperCase()}`, 105, 42, { align: 'center' })
    var pageCount = doc.getNumberOfPages();
    for (let i = 0; i < pageCount; i++) {
        doc.setPage(i);
        let pageCurrent = doc.getCurrentPageInfo().pageNumber;
        doc.setFontSize(12);
        doc.text(`Pagina numero: ${pageCurrent} de ${pageCount}`, 10, doc.internal.pageSize.height - 10);
    }

    const columnStyles: { [propsName: string]: any } = {}
    titlesToPdf.forEach((_, index) => {
        columnStyles[index] = { lineColor: '#CCCCCC', lineWidth: 0.1, fillColor: '#FFFFFF' }
    })

   /*  autoTable(doc, {
        startY: 60,
        headStyles: { fillColor: '#042B82', lineWidth: 0, lineColor: '#042B82' },
        head: [titlesToPdf],
        body: toTable,
        columnStyles: { ...columnStyles }
    }) */
    doc.save(`tabla_de_${titlePage}${subTitle.length > 0 ? `_${subTitle}` : ''}.pdf`)
}