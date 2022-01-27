import { jsPDF as JsPDF } from 'jspdf'
import domtoimage from 'dom-to-image'

export default (context, inject) => {
  inject('html2pdf', {
    view: () => view(context),
    download: n => download(context, n)
  })
}

const view = async (context) => {
  context.$resume.output.view()
  await action('view', { context })
  context.$resume.output.done()
  return new Promise(resolve => resolve('success'))
}

const download = async (context, name) => {
  context.$resume.output.print()
  await action('download', { context, name })
  context.$resume.output.done()
  return new Promise(resolve => resolve('success'))
}

const action = async (mode, payload) => {
  await storeData(payload.context).catch(() => {})
  await createPdf()
    .then((pdf) => {
      switch (mode) {
        case 'view':
          window.open(pdf.output('bloburl'), '_blank')
          break
        case 'download':
          pdf.save(`${payload.name}.pdf`)
          break
      }
    })
}

const storeData = async (context) => {
  return await context.$api.resume.store(context.$resume.edit.exportData())
}

const createPdf = async () => {
  const element = document.querySelector('.html2pdf')
  const pages = document.querySelectorAll('.html2pdf--pages')
  const numPages = pages.length
  const pageWidth = 840
  const pageHeight = 1188
  const marginY = 16
  const pdf = new JsPDF('p', 'pt', [pageWidth, pageHeight], false)

  await captureImage(element, scaleElement(element))
    .then((img) => {
      for (let i = 0; i < numPages; i++) {
        if (i) { pdf.addPage([pageWidth, pageHeight]) }

        pdf.addImage(img, 'PNG', 0, -(i * (pageHeight + marginY)), element.clientWidth, element.clientHeight)
      }
    })

  return new Promise(resolve => resolve(pdf))
}

const scaleElement = (element, scale = 3) => {
  return {
    width: element.clientWidth * scale,
    height: element.clientHeight * scale,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    }
  }
}

const captureImage = async (element, option) => {
  let img = null

  await domtoimage.toPng(element, option).then((url) => { img = url })

  return new Promise(resolve => resolve(img))
}
