(() => {
  'use strict';

  customElements.define('buttons-row', class extends HTMLElement {

     // deal with any kind of 'on...' event
     // referenced below
    // handleEvent(event) {
      // this[`on${event.type}`](event);
    // }; // end handleEvent()


    connectedCallback() {
      // initialize the things
      this.buttonRow = document.querySelector('buttons-row');
      this.buttonRowItems = this.buttonRow.querySelectorAll('.recipe-button');
      this.addEventListener('click', this);
      
      // create data about what was clicked
      this.addEventListener('click', (event) => {
        const sourceButtonClicked = {
          sourceData: event.target.getAttribute('data-source')
        };

        // communicate with panels web component
        this.dispatchEvent(new CustomEvent('toggle-panels', {
          detail: sourceButtonClicked,
          bubbles: true,
          composed: true
        }));

        // send it off for processing button classes
        this.toggleButtonClasses(sourceButtonClicked);
      }); // end eventListener
    }; // end connectedCallback()

    toggleButtonClasses (sourceButtonClicked) {
      this.buttonRowItems.forEach((button) => {
        if (button.classList.contains('recipe-button-active')) {
          button.classList.remove('recipe-button-active');
        };

        if (button.getAttribute('data-source') === sourceButtonClicked.sourceData) {
          button.classList.add('recipe-button-active');
        };
      }); // end foorEach
    }; // end toggle buttons
  }); // end customlements button-row

  customElements.define('panels-row', class extends HTMLElement {

    connectedCallback() {
      this.panels = this.querySelectorAll('.recipe-panel');

      // have to listen on the whole document to pick up this custom event
      document.addEventListener('toggle-panels', (event) => {
        // self-explanatory
        this.togglePanelClasses(event.detail);
      });
    }; // end connectedCallback()

    // self-explanatory
    togglePanelClasses (targetPanelData) {
      this.panels.forEach((panel) =>{
        if (panel.classList.contains('recipe-panel-active')) {
          panel.classList.remove('recipe-panel-active');
        };

        if (panel.getAttribute('data-target') === targetPanelData.sourceData) {
          panel.classList.add('recipe-panel-active');
        };
      }); // end forEach

    }; // end togglePanelClasses

  }); // end customElements panels-row

})();