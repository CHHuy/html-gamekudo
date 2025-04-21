function detectDevice() {
  let device = ''
  const swapStyle = document.getElementById('swapStyle')
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    device = true
    swapStyle.setAttribute('href', 'customs/touch_style.css')
  } else {
    device = false
    swapStyle.setAttribute('href', 'customs/style.css')
  }
  console.log(device)
}

detectDevice()
