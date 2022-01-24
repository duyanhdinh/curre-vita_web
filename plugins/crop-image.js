import Cropper from 'cropperjs'

export default (context, inject) => {
  inject('crop', {
    init: n => init(context, n)
  })
}

const init = (context, n) => {
  /* eslint-disable no-new */
  const image = document.getElementById(n.imageId)
  const replace = document.getElementById(n.replaceId)
  const save = document.getElementById(n.saveId)

  const cropper = new Cropper(image, {
    aspectRatio: n.width / n.height,
    viewMode: 1,
    autoCropArea: n.area ?? 0.6,
    dragMode: 'move',
    center: false,
    guides: false,
    checkCrossOrigin: false,
    cropBoxMovable: false,
    cropBoxResizable: false,
    toggleDragModeOnDblclick: false
  })

  save.onclick = () => {
    cropper.getCroppedCanvas().toBlob((blob) => {
      context.$resume.edit.personal.saveAvatarData(blob)
    })
  }

  replace.onclick = () => cropper.replace(context.$resume.edit.personal.getAvatar())
}
