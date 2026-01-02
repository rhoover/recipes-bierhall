import myData from '/_data/recipes.json' with {type: 'json'};

((recipeData) => {
  'use strict';

  let searchInput = document.getElementById('searchbox');
  let resultsList = document.querySelector('.home-search-results')
  let searchQuery;

  window.addEventListener('beforeunload', (event) => {
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

        // case 'blur':
        //   resultsList.classList.remove('home-search-results-active');
        //   setTimeout(() => {
        //     searchInput.value = '';
        //     resultsList.innerHTML = '';              
        //   }, 5000);
        // break;

        case 'keyup':
          searchQuery = searchInput.value.toLowerCase();
          resultsList.innerHTML = '';

          // https://stackoverflow.com/questions/69917128/how-to-search-a-json-file-from-a-search-bar-in-html
          for (let i = 0; i < recipeData.length; i++) {
            let obj = recipeData[i];

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
    link.setAttribute('href', `/recipes/${results.pageslug}.html`);
    link.className = `home-search-results-link`;
    link.innerHTML = `${results.name}  <span>➤</span>`;
    resultsList.appendChild(link);
  }; // end displayResults


})(myData);