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
        firstToSecond();
        page++;
        scroll = true;
      }
    } else if (page === 2) {
      scroll = false;
      secondToThird();
      page++;
      scroll = true;
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

async function firstToSecond() {
  let firstSection = $("#firstSection");
    firstSection.css({
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

  await lettersAnimate($("#secondSection div.container h2 b")).then();

  firstSection.css({
    perspective: "224px",
    'transform-style': "preserve-3d",
    transform: "rotateX(0deg)",
    "transform-origin": "50% 0 0",
    opacity: 1,
    transition: "0s"
  });
  await studyCaseAnimate();
}

async function studyCaseAnimate() {
  let cases = $(".study-case");
  for (let i = 0; i < cases.length; i++) {
    $(cases[i]).css({position: 'relative'});
  }
  $(cases[1]).css({transform: "scale(1.2)", transition: "1.5s"});
  $(cases[1]).find("img").css({transform: "rotate(2deg)", transition: "1.5s"});
  $(cases[1]).animate({left: "-=15%"}, 2000, 'linear', async function () {
    $(this).animate({left: "-=35%"}, 1000, 'linear').fadeTo(1500, 0.6);
    $(cases[1]).css({transform: "scale(.55)", transition: "3.5s"}).removeClass("active");
    $(cases[2]).animate({left: "-=40%"}, 3000);
    await sleep(3000);
    $(cases[2]).css({transform: "scale(1.2)", transition: "1s"}).addClass("active");
  });
  await sleep(2000);
  $(cases[1]).find("img").css({transform: "rotate(0deg)", transition: "2s"});


}

function secondToThird() {
  $('html, body').animate({
    scrollTop: $("#awards div.container").offset().top - 20
  }, 1000);
  lettersAnimate($("#awards div.container h2 b")).then();
}

async function lettersAnimate(container) {
  for (let i = 0; i < container.length; i++) {
    $(container[i]).css({color: 'grey'});
  }
  await sleep(250);
  for (let i = 0; i < container.length; i++) {
    $(container[i]).css({color: 'white', transition: '.3s'});
    await sleep(150);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}