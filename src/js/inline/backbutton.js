(() => {
  'use strict';

  let backButton = document.querySelector('.back-button');

  backButton.onclick = function () {
      history.back();
  };

})();