import { jsPDF as JsPDF } from 'jspdf'
import domtoimage from 'dom-to-image'

export default (context, inject) => {
  inject('html2pdf', {
    view: () => view(),
    download: n => download(context, n)
  })
}

const view = () => {
  action('view')
}

const download = (context, n) => {
  action('download', n)
}

const action = (mode, name = 'name') => {
  const pages = document.querySelectorAll('.html2pdf--pages')
  const numPages = pages.length
  const pageWidth = 840
  const pageHeight = 1188
  const pdf = new JsPDF('p', 'pt', [pageWidth, pageHeight], false)

  pages.forEach((e, index) => {
    const scale = 3
    domtoimage.toPng(e, {
      width: pageWidth * scale,
      height: pageHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left'
      }
    })
      .then(function (url) {
        if (index) { pdf.addPage([pageWidth, pageHeight]) }

        pdf.addImage(url, 'PNG', 0, 0, pageWidth, pageHeight)

        if (index === numPages - 1) {
          switch (mode) {
            case 'view':
              window.open(pdf.output('bloburl'), '_blank')
              break
            case 'download':
              pdf.save(`${name}.pdf`)
              break
          }
        }
      })
  })
}
