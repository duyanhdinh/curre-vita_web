import { jsPDF as JsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const download = (n) => {
  const img = document.querySelector('.html2pdf')
  const numPages = document.querySelectorAll('.html2pdf--pages').length
  const pageWidth = 840
  const pageHeight = 1188
  const imgWidth = img.clientWidth
  const imgHeight = img.clientHeight
  const pdf = new JsPDF('p', 'pt', [pageWidth, pageHeight], false)

  html2canvas(img, { allowTaint: true }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg', 1.0)

    for (let i = 0; i < numPages; i++) {
      if (i) { pdf.addPage([pageWidth, pageHeight]) }
      pdf.addImage(imgData, 'JPG', 0, -(pageHeight * i), imgWidth, imgHeight)
    }

    pdf.save(`${n}.pdf`)
  })
}

export default (context, inject) => {
  inject('html2pdf', {
    download: n => download(n)
  })
}
