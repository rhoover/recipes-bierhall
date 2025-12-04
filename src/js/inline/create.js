(() => {
  'use strict';

  let formDescription = document.querySelector('#recipe-description');
  let formIngredients = document.querySelector('#recipe-ingredients');
  let formProcedures = document.querySelector('#recipe-procedures');
  let formNotes = document.querySelector('#recipe-notes');


  let addIngredientsButton = document.querySelector('.button-add');

  let mainElement = document.querySelector('.create');

  let dialogDescription = document.querySelector('.dialog-description');
  let dialogDescriptionElements = dialogDescription.querySelectorAll('[desc]');

  let dialogIngredients = document.querySelector('.dialog-ingredients');

  let dialogProcedures = document.querySelector('.dialog-procedures');
  let dialogProceduresTargetElement = document.querySelector('#recipe-procedures');

  let dialogNotes = document.querySelector('.dialog-notes');
  let dialogNotesTargetElement = document.querySelector('#recipe-notes');

  let dialogReview = document.querySelector('.dialog-review');
  let dialogReviewDataTarget = document.querySelector('.recipe-review-data');

  let dialogSubmit = document.querySelector('.dialog-submit');  

  let serverData;
  let recipeObject = {};
  let ingredientsArray = [];
  let procedureObject = {};
  let procedureArray = [];
  let noteObject = {};
  let noteArray = [];

  fetch('https://bierhallrecipes.com/data-recipes/recipes.json')
    .then(response => response.json())
    .then( (data) => {
      serverData = data;
      console.log('from server:', serverData);
    });

  
  // open or close which dialog
  mainElement.addEventListener('click', (event) => {
    event.preventDefault();
    let dialogToOpen = event.target.dataset.open;
    let dialogToClose = event.target.dataset.close;
    let dialogAction = event.target.dataset.add;

    // opening dialog from button on page
    switch (dialogToOpen) {
      // first two are because the first create button changes names
      case "addDescription":
        dialogDescription.showModal();
      break;
      case "addIngredient":
        dialogIngredients.showModal();
      break;
      case "addProcedures":
        dialogProcedures.showModal();
      break;
      case "addNotes":
        dialogNotes.showModal();
      break;
      case "review":
        dialogReview.showModal();
      break;
      case "submit":
        dialogSubmit.showModal();

        serverData.push(recipeObject);

        fetch('https://bierhallrecipes.com/server/save-data.php', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          // stringify here so no need to encode/decode in php, we're just passing strings back and forth
          // any changes to an object can be done here/above
          body: JSON.stringify(serverData)
        })
        .then(response => response.text())
        .then(data => console.log('success saving data', data))
        .catch(error => console.error('error', error));

        addIngredientsButton.setAttribute("data-open", "addDescription");
        addIngredientsButton.innerHTML = "Create Recipe Description";
      break;
      default:
      break;
    }; // end dialogToOpen

    switch (dialogAction) {
      case "procAdd":
        let newProcedure = `
          <label for="procedure">Procedure
            <input type="text" id="procedure" name="procedure" class="fluid-text fluid-text--20" proc />
          </label>
        `;
        dialogProceduresTargetElement.insertAdjacentHTML('beforeend', newProcedure);
      break;
      case "noteAdd":
        let newNote = `
          <label for="notes">Notes
            <input type="text" id="notes" name="notes" class="fluid-text fluid-text--20" notes />
          </label>
        `;
        dialogNotesTargetElement.insertAdjacentHTML('beforeend', newNote);
      break;
      default:
      break;
    } // end dialogAction
    
    // closing dialog from button inside dialog
    switch (dialogToClose) {
      case "description":
        for (let i = 0; i < dialogDescriptionElements.length; i++) {
          recipeObject.name = dialogDescriptionElements[0].value;
          recipeObject.category = dialogDescriptionElements[1].value;
        };

        addIngredientsButton.setAttribute("data-open", "addIngredient");
        addIngredientsButton.innerHTML = "Add Recipe Ingredients";

        dialogReviewDataTarget.innerHTML = `
          <h3>Recipe Description:</h3>
          <p><b>Name: ${recipeObject.name}</b></p>
          <p>Category: ${recipeObject.category}</p>
          <h3>Recipe Ingredients</h3>
        `;

        formDescription.reset();
        dialogDescription.close();
      break;
      case "ingredient":
        // need to initialize this everytime through
        let ingredientObject = {};
        // need to grab this everytime through
        let ingredientElements = dialogIngredients.querySelectorAll('[ing]');
        let ingredientData = [...ingredientElements];
  
        ingredientObject.ingredient = ingredientData[0].value;
        ingredientObject.measurement = ingredientData[1].value;
        ingredientObject.amountslow = ingredientData[2].value;
        ingredientObject.amountbusy = ingredientData[3].value;

        ingredientsArray.push(ingredientObject);

        recipeObject.ingredients = ingredientsArray;

        dialogReviewDataTarget.innerHTML += `
        <p><b>Ingredient: ${ingredientObject.ingredient}</b></p>
        <p style="display: list-item; list-style-position: inside">Measurement: ${ingredientObject.measurement}</p>
        <p style="display: list-item; list-style-position: inside">Slow Amount: ${ingredientObject.amountslow}</p>
        <p style="display: list-item; list-style-position: inside">Busy Amount: ${ingredientObject.amountbusy}</p>
        `;

        formIngredients.reset();
        dialogIngredients.close();
      break;
      case "procedure":
        let procedureElements = dialogProcedures.querySelectorAll('[proc]');
        let procedureData = [...procedureElements];

        procedureData.forEach((procedure, index) => {
          procedureObject.procedure = procedure.value;
          procedureObject.step = `${index + 1}`;
          procedureArray.push(procedureObject);
          procedureObject = {};
        });

        recipeObject.procedures = procedureArray;

        dialogReviewDataTarget.innerHTML += `<h3>Procedures:</h3>`;

        procedureArray.forEach((procedure) => {
          dialogReviewDataTarget.innerHTML += `
            <p><span>${procedure.step}:</span>${procedure.procedure}</p>
          `;
        });

        formProcedures.reset();
        dialogProcedures.close();
      break;
      case "notes":
        let noteElements = dialogNotes.querySelectorAll('[notes]');
        let notesData = [...noteElements];

        notesData.forEach((note, index) => {
          noteObject.note = note.value;
          noteObject.id = `${index + 1}`;
          noteArray.push(noteObject);
          noteObject = {};
        });

        recipeObject.notes = noteArray;

        dialogReviewDataTarget.innerHTML += `<h3>Notes:</h3>`;

        noteArray.forEach((note) => {
          dialogReviewDataTarget.innerHTML += `
            <p><span>${note.id}:</span>${note.note}</p>
          `;
        });

        formNotes.reset();
        dialogNotes.close();
      break;
      case "review":
        dialogReview.close();
      break;
      case "submit":
        dialogSubmit.close();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      break;
      default:
      break;
    }; // end dialogToClose
  }); // end event listener
})();