(() => {
  'use strict';

  let searchInput = document.getElementById('searchbox');
  let resultsList = document.querySelector('.home-search-results');
  let pageSearch = document.querySelectorAll('[data-slug]');
  let searchQuery;
  let listArray = [];

  pageSearch.forEach((card) => {
    let listObject = {};
    listObject['name'] = card.firstElementChild.innerHTML;
    listObject['slug'] = card.dataset.slug;
    listArray.push(listObject);
  });

  document.addEventListener('DOMContentLoaded', (event) => {
    searchInput.value = '';
  });

  function decideAndSearch() {

    ['focus', 'blur', 'keyup', 'input'].forEach(event => searchInput.addEventListener(event, doSomething));

    function doSomething(e) {
      let happening = e.type;

      switch (happening) {
        case 'focus':
          resultsList.classList.add('home-search-results-active');
        break;

        case 'keyup':
          searchQuery = searchInput.value.toLowerCase();
          resultsList.innerHTML = '';

          for (let i = 0; i < listArray.length; i++) {
            let obj = listArray[i];

            // send the results to the displayResults function to display them
            if (obj.name.toLowerCase().includes(searchQuery)) {
              displayResults(obj);
            };
          };
        break;

        case 'input':
          if (searchInput.value.length == 0) {
            resultsList.innerHTML = '';
          };
        break;
      
        default:
        break;
      }; //end switch
    }; // end doSomething()
  }; // end decideAndSearch

  decideAndSearch();

  function displayResults(results) {
    let link = document.createElement('a');
    link.setAttribute('href', `/recipes/${results.slug}.html`);
    link.className = `home-search-results-link`;
    link.innerHTML = `${results.name}  <span>➤</span>`;
    resultsList.appendChild(link);
    link.addEventListener('click', (event) => {
      searchInput.value = '';
    });
  }; // end displayResults


})();