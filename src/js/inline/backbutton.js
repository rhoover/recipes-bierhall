(() => {
  'use strict';

  let backButton = document.querySelector('.back-button');

  backButton.onclick = function () {
    window.location.assign(document.referrer);
  };

})();