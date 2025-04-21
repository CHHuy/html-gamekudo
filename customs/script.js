function detectDevice() {
  let device = ''
  const homeStyle = document.getElementById('homeStyle')
  if (homeStyle) {
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
      homeStyle.setAttribute('href', 'customs/home_touch.css')
    } else {
      device = false
      homeStyle.setAttribute('href', 'customs/home.css')
    }
  }

  console.log(device)
}

detectDevice()
