let page = 1;
let scroll = true;

$(window).bind('mousewheel DOMMouseScroll', function (event) {
  if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
    if (page === 2) {
      if (scroll === true) {
        scroll = false;
        scrollUp();
      }
      scroll = true;
      page--;
    }
  } else {
    if (page === 1) {
      if (scroll === true) {
        scroll = false;
        firstSectionAnimate();
        // scrollDown();
        page++;
        scroll = true;
      }
    }
  }
});

function scrollDown() {
  window.scrollTo({
    top: +window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
}

function scrollUp() {
  window.scrollTo({
    top: -window.innerHeight,
    left: 0,
    behavior: 'smooth'
  });
}

function firstSectionAnimate() {
  $("#firstSection").css({
    perspective: "224px",
    'transform-style': "preserve-3d",
    transform: "rotateX(-90deg)",
    "transform-origin": "50% 0 0",
    opacity: 0,
    transition: "2s"
  });
  $('html, body').animate({
    scrollTop: $("#secondSection div.container").offset().top - 20
  }, 1500);
}