//CAROUSEL START
var slideIndex = 0;
carousel();
  function carousel() {
    var i;
    var x = document.getElementsByClassName("image");

    for (i = 0; i < x.length; i++) {
      x[i].style.opacity = "0";
    }
    slideIndex++;
    if (slideIndex > x.length) {
      slideIndex = 1

    }
    x[slideIndex-1].style.opacity = "1";
    setTimeout(carousel, 8000); // Change image every 2 seconds
  }
//CAROUSEL END

//MOVING BACKGROUND START
var lFollowX = 0,
lFollowY = 0,
x = 0,
y = 0,
friction = 1 / 30;
document.getElementsByTagName("body")[0].onresize = function() {    
  var clientWidth = document.getElementById('hero-images-wrap').offsetWidth;
  if(clientWidth <= 768){
    document.getElementById("hero-images-wrap").style.transform = 'none';
  }
  else{
  }
};
function moveBackground() {
  var clientWidth = document.getElementById('hero-images-wrap').offsetWidth;
    var x2 = document.getElementsByClassName("image");
    x += (lFollowX - x) * friction;
    y += (lFollowY - y) * friction;
    translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
    if(clientWidth > 768){
    document.getElementById("hero-images-wrap").style.transform = translate;
    }
    window.requestAnimationFrame(moveBackground);
}
document.getElementById("Home").addEventListener("mousemove",function(e){
  var clientWidth = document.getElementById('hero-images-wrap').offsetWidth;
  var clientHeight = document.getElementById('hero-images-wrap').offsetHeight;
  if( clientWidth > 768){
  var clientWidth = document.getElementById('hero-images-wrap').offsetWidth;
  var lMouseX = Math.max(-100, Math.min(100, clientWidth / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, clientHeight / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;
  }
});
moveBackground();
//MOVING BACKGROUND END

//SMOOTH SCROLL START
var scroll = new SmoothScroll('a[href*="#"]',{
  easing: 'easeInQuint',
  offset: document.getElementById('nav').offsetHeight,
  speed: 750
});
//SMOOTH SCROLL END

//TOOGLE CLICK
document.getElementById("toggle").onclick = toggle;
function toggle(){
  let toggleClass =  document.getElementById("toggle-icon");
  let mobileNavToggle = document.getElementsByClassName("mobile-view")[0];
  toggleClass.classList.toggle("open");
  mobileNavToggle.classList.toggle("open");
  document.body.classList.toggle("overlay");
}


//TYPEWRITER EFFECT START
var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 500;
  }

  setTimeout(function() {
  that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
//TYPEWRITER EFFECT END

//SCROLL ADD CLASS
(function() {
  'use strict';

  var section = document.querySelectorAll(".section");
  var sections = {};
  var i = 0;

  Array.prototype.forEach.call(section, function(e) {
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = function() {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    
    for (i in sections) {
      if (sections[i] <= scrollPosition + document.getElementById('nav').offsetHeight ) {
        document.querySelector('.active').setAttribute('class', ' ');
        document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
      }
    }
  };
})();
