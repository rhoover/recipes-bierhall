(() => {
  'use strict';

  let dressingsSection = document.querySelector('[data-category="dressings"]')
  let scrollButton = document.querySelector('.scroller');

  window.addEventListener('scroll', buttonVisiblity);
  function buttonVisiblity() {
    let scrollPos = window.scrollY;
    // if (scrollPos >= 600) {
    if (scrollPos >= dressingsSection.offsetTop) {
      scrollButton.classList.add('scroller-visible');
    } else {
      scrollButton.classList.remove('scroller-visible');
    };    
  };

  scrollButton.addEventListener('click', scrollBehavior);
  function scrollBehavior() {

    var scrollMath = function (t, b, c, d) { //t = current time, b = start value, c = change in value, d = duration
      t /= d/2;
      if (t < 1) {
        return c/2*t*t + b;
      }
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    function scrollThis(element, to, duration) {

      var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

      var animateScroll = function(){
        currentTime += increment;
        var val = scrollMath(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
          requestAnimationFrame(animateScroll);
        };
      };

      animateScroll();
    };

    scrollThis(document.body, 0, 2000);// for Chrome
    scrollThis(document.documentElement, 0, 2000);// for Firefox    
  };

})();
