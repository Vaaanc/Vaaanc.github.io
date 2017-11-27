/// <reference path="index.d.ts" />

//**CAROUSEL START
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
//CAROUSEL END**/




//**MOVING BACKGROUND START
var lFollowX = 0,
lFollowY = 0,
x = 0,
y = 0,
friction = 1 / 40;
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
var options = { speed: 750, easing: 'easeInQuint', offset:document.getElementById('nav').scrollHeight  };
var selector;
var scroll = new SmoothScroll(selector,options);

var smoothScrollWithoutHash = function (selector, settings) {
	/**
	 * If smooth scroll element clicked, animate scroll
	 */
	var clickHandler = function (event) {
		var toggle = event.target.closest( selector );
		if ( !toggle || toggle.tagName.toLowerCase() !== 'a' ) return;
		var anchor = document.querySelector( toggle.hash );
		if ( !anchor ) return;

		event.preventDefault(); // Prevent default click event
    scroll.animateScroll( anchor, toggle, settings || {} ); // Animate scroll
    toggleClass =  document.getElementById("toggle-icon");
    mobileNavToggle = document.getElementsByClassName("mobile-view")[0];
    toggleClass.classList.remove("open");
    mobileNavToggle.classList.remove("open");
    document.body.classList.remove("overlay");
	};

	window.addEventListener('click', clickHandler, false );
};

// Run our function
smoothScrollWithoutHash( 'a[href*="#"]' );
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
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

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
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }

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
      if (sections[i] <= scrollPosition + $('#nav').innerHeight()) {
        document.querySelector('.active').setAttribute('class', ' ');
        document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
      }
    }
  };
});
//Scroll Add/Remove Class
function onScroll(event){
  $('.animate').each(function(){
    var bottom_object = $(this).offset().top + $(this).outerHeight();
    var bottom_window = $(window).scrollTop() + $(window).height();
    if(bottom_window > $(this).offset().top){
      $(this).css({'opacity':'1','transform':'translateY(0) scale(1)'});
    } 
  });
  $('.slide-left').each(function(){
    var bottom_object = $(this).offset().top + $(this).outerHeight();
    var bottom_window = $(window).scrollTop() + $(window).height();
    if(bottom_window > $(this).offset().top){
      $(this).css({'opacity':'1','transform':'translateX(0) scale(1)'});
    } 
  });
  $('.slide-right').each(function(){
    var bottom_object = $(this).offset().top + $(this).outerHeight();
    var bottom_window = $(window).scrollTop() + $(window).height();
    if(bottom_window > $(this).offset().top){
      $(this).css({'opacity':'1','transform':'translateX(0) scale(1)'});
    } 
  });
  $('.bar-fill').each(function(i){
    var bottom_object = $(this).offset().top + $(this).height();
    var bottom_window = $(window).scrollTop() + $(window).height();
    var row = $(this);
    if(bottom_window > $(this).offset().top){
      setTimeout(function() {
        row.addClass('slide');
      }, 150*i);
    } 
  });

  if (document.documentElement.scrollTop > 50) {
    document.getElementById('nav').classList.add('scroll');
  }
  else{
    document.getElementById('nav').classList.remove('scroll');
  }
}
onScroll();
$(window).scroll(startCounter);
function startCounter() {  
  $('.percentage').each(function (i) {
    var bottom_window = $(window).scrollTop() + $(window).height();
    var $this = $(this);
    if(bottom_window > $(this).offset().top){
        $(window).off("scroll", startCounter);
        jQuery({ Counter: 0 }).animate({
          Counter: $this.delay(150*i).text()
        }, {

          duration: 1000,
          easing: 'swing',
          step: function () {
              $this.text(Math.ceil(this.Counter)+"%");
          }
      });
    }
});
}