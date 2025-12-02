(() => {
  'use strict';

  let openButton = document.querySelector('.home-login-button');
  let closeButton = document.querySelector('.home-login-dialog-close');
  let loginDialog = document.querySelector('.home-login-dialog');

  let mainElement = document.querySelector('.home');

  let loginData;

  fetch('https://bierhallrecipes.com/creds/auth.json')
    .then(response => response.json())
    .then( (data) => {
      loginData = data;
    });

  mainElement.addEventListener('click', (event) => {

    let whichButton = event.target.dataset.click;

    console.log(event.target);

    switch (whichButton) {
      case 'open':
        loginDialog.showModal();
      break;
      case 'close':
        loginDialog.close();
      break;
      break;
      case 'dialog':
        loginDialog.close();
      break;
    
      default:
        break;
    }
  });
})();