/*!--------------------------------------------------------------------------------

 Theme Name: Frontend Seed 4
 Author:     trungnghia112 <trungnghia112@gmail.com>

 -----------------------------------------------------------------------------------*/

if (Modernizr.touch === true && window.innerWidth <= 767) {
  //alert('Touch Screen');
} else {
}

;(function () {
  'use strict'

  /* ==================================================
  # Get scroll bar width
  ===================================================*/
  function getBarwidth() {
    // Create the measurement node
    let scrollDiv = document.createElement('div')
    scrollDiv.className = 'scrollbar-measure'
    document.body.appendChild(scrollDiv)

    // Get the scrollbar width
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    //console.warn(scrollbarWidth); // Mac:  15

    // Delete the DIV
    document.body.removeChild(scrollDiv)
    // console.log(scrollbarWidth);
    return scrollbarWidth
  }

  function lazyLoadPlaceHolder() {
    document.addEventListener('DOMContentLoaded', function () {
      const imageElements = document.querySelectorAll('.img-box .image-content')

      // Fallback: if IntersectionObserver is not supported, load images immediately
      if (!('IntersectionObserver' in window)) {
        imageElements.forEach(img => loadImage(img))
        return
      }

      const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px 0px 200px 0px', // load a bit before coming into view
        threshold: 0
      }

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }, observerOptions)

      imageElements.forEach(img => observer.observe(img))
    })

    /**
     * Starts the image loading process using the data-src, handling load events
     * and errors. On successful load, it hides the placeholder.
     */
    function loadImage(img) {
      const src = img.getAttribute('data-src')
      if (!src) return

      let retryCount = 0
      const maxRetries = 3

      // Load or retry loading the image:
      function attemptLoad() {
        // Create a new Image object to test the src independently
        const testImage = new Image()
        testImage.onload = () => {
          img.src = src // set the real image src
          // When the actual image loads, perform actions in img.onload below.
        }
        testImage.onerror = () => {
          if (retryCount < maxRetries) {
            retryCount++
            setTimeout(attemptLoad, 1000) // retry after a delay of 1 second
          } else {
            console.error('Failed to load image after several attempts:', src)
            // Optionally: set a fallback image if needed.
          }
        }
        testImage.src = src
      }

      // Begin loading process
      attemptLoad()

      // Once the image in our DOM loads, hide the placeholder and reveal the image.
      img.onload = function () {
        const parentBox = img.closest('.img-box')
        if (parentBox) {
          parentBox.classList.add('show-image')
        }
      }

      img.onerror = function () {
        console.error('Error loading image:', src)
      }
    }
  }

  function detailSwiper() {
    const screenShoot = document.getElementById('screenshots')

    if (screenShoot) {
      const swiper = new Swiper('.swiper', {
        // Optional parameters
        slidesPerView: 'auto',
        spaceBetween: 10,

        // If we need pagination
        // pagination: {
        //   el: '.swiper-pagination'
        // },

        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }

        // And if we need scrollbar
        // scrollbar: {
        //   el: '.swiper-scrollbar'
        // }
      })
    }
  }

  function init() {
    getBarwidth()
    lazyLoadPlaceHolder()
    detailSwiper()
  }

  init()
})()
