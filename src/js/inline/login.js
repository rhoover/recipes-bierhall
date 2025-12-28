(() => {
  'use strict';

  const logInProgression = {
    init() {

      // check and see if device is logged
      let storedDevice = localStorage.getItem('storedDevice');
      let logInButton = document.querySelector('.home-login-button');
      let links = document.querySelectorAll(".home-item");

      if (storedDevice) {
        // unlock the links
        for (let i = 0; i < links.length; i++) {
          links[i].style.pointerEvents = 'auto';
        };

        // modify login button
        logInButton.disabled = true;
        logInButton.innerHTML = 'Logged In Already!';
        logInButton.classList.add('home-login-button-in');
      } else {
        // get the creds from the server
        async function getCreds() {
          let response = await fetch('https://bierhallrecipes.com/creds/auth.json');
          let credsData = await response.json();
          return credsData;
        };
        passThemForward();
        async function passThemForward() {
          let creds = await getCreds();
          logInProgression.dealWithLogIn(creds, logInButton, links);
        }
      };
    },

    dealWithLogIn(creds, logInButton, links) {
      let logInObject = {};
      let mainElement = document.querySelector('.home');  
      let formInputs = document.querySelectorAll('input');
      let loginDialog = document.querySelector('.home-login-dialog');

       mainElement.addEventListener('click', (event) => {
        
        let whichButton = event.target.dataset.click;

        switch (whichButton) {
          case 'open':
            loginDialog.showModal();            
          break;
          case 'close':
            closingDialog();
          break;
          case 'dialog':
            loginDialog.close();
          break;
          default:
          break;
        };

        function closingDialog() {

          logInObject.email = formInputs[0].value;
          logInObject.pw = formInputs[1].value;

          if (JSON.stringify(creds) === JSON.stringify(logInObject)) {
            let deviceLogged = {logged: true};
            let storable = JSON.stringify(deviceLogged);

            localStorage.setItem('storedDevice', storable);
            
            // unlock the links
            for (let i = 0; i < links.length; i++) {
              links[i].style.pointerEvents = 'auto';
            };

            // update login button
            logInButton.innerHTML = 'Log In Success!';
            logInButton.classList.add('home-login-button-in');
            logInButton.disabled = true;


            let loginForm = document.querySelector('#login');

            loginForm.reset();
            loginDialog.close();          
          }; // end if
        }; // end closingDialog
       }); // end event listener
    } // end dealing with
  }; // end progression
logInProgression.init();
})();