(() => {
  'use strict';

    // initialize DOM selections
    let wakeButton = document.querySelector('.wake-screen-button');
    let wakeButtonText = document.querySelector('.wake-screen-button-text');

    // initialize support
    let isSupported = false;

    // change button and status if wakelock becomes aquired or is released
    const changeUI = (status = 'acquired') => {
      const acquired = status === 'acquired' ? true : false;
      wakeButton.dataset.status = acquired ? 'on' : 'off';
      wakeButtonText.textContent = `${acquired ? 'Screen Is Awake!' : 'Keep Screen Awake'}`;
    };

    if ('wakeLock in navigator') {
      isSupported = true;
      wakeButton.classList.add('wake-screen-button-active');
    };

    if (isSupported) {
      
      // create a reference for the wake lock
      let wakeLock = null;

      // create an async function to request a wake lock
      const requestWakeLock = async () => {
        try {
          wakeLock = await navigator.wakeLock.request('screen');

          // change up our interface to reflect wake lock active
          changeUI();

          // listen for our release event
          wakeLock.onrelease = function(ev) {
            console.log(ev);
          };

          wakeLock.addEventListener('release', () => {
            // if wake lock is released alter the button accordingly
            changeUI('released');
          });

        } catch (err) {
          // if wake lock request fails - usually system related, such as battery
          wakeButton.dataset.status = 'off';
          wakeButton.textContent = 'Turn Wake Lock ON';
          statusElem.textContent = `${err.name}, ${err.message}`;
        };
      }; // requestWakeLock()

      // if we click our button
      wakeButton.addEventListener('click', () => {
        // if wakelock is off request it
        if (wakeButton.dataset.status === 'off') {
          requestWakeLock()
        } else { // if it's on release it
          wakeLock.release()
            .then(() => {
              wakeLock = null;
            });
        };
      });      
    }; // end if isSupported




})();