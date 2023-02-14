/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      let personFamily = displayFamily(person[0], people);
      alert(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `Date of Birth: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye Color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findParents(person, people) {
  let parents = [];
  let foundParents = "";
  if (person.parents.length === 0) {
    return "No data on parents";
  } else {
    parents = people.filter((object) => {
      if (object.id === person.parents[0] || object.id === person.parents[1]) {
        return true;
      }
    });
  }
  for (let i = 0; i < parents.length; i++) {
    foundParents += parents[i].firstName + " " + parents[i].lastName + ". ";
  }
  return foundParents;
}

function findSiblings(person, people) {
  let siblings = [];
  let foundSiblings = "";
    siblings = people.filter((object) => {
        if ((object.parents[0] === person.parents[0] ||
        object.parents[1] === person.parents[1] ||
        object.parents[0] === person.parents[1] ||
        object.parents[1] === person.parents[0]) &&
        object != person &&
        object.parents != person.id &&
        object.parents.length >= 1
        ) {
      return true;
        }
    });
    if (siblings.length === 0) {
        return "No data on siblings";
    }
  for (let i = 0; i < siblings.length; i++) {
    foundSiblings += siblings[i].firstName + " " + siblings[i].lastName + ". ";
  }
  return foundSiblings;
}

function findSpouse(person, people) {
  let spouse;
  let foundSpouse = "";
  spouse = people.filter((object) => {
    if (object.currentSpouse === person.id) {
      return true;
    }
  });
  if (spouse.length >= 1) {
    foundSpouse += spouse[0].firstName + " " + spouse[0].lastName + ". ";
    return foundSpouse;
  } else {
    return "No data on spouce";
  }
}


function displayFamily(person, people) {
    let parents = findParents(person, people);
    let siblings = findSiblings(person, people);
    let spouse = findSpouse(person, people);
    // let children = findChildren(person, people);
    let personFamily = "Parents: " + parents + "\n";
    personFamily += "Siblings: " + siblings + "\n";
    personFamily += "Spouse: " + spouse + "\n";
    // personFamily += "Children: " + children + "\n";
    
    return personFamily;
}

function findChildren(person, people) {
    let children = [];
    children = people.filter((object) => {
        if (object.parents.includes(person.id)) {
            return true;
        } 
    });
    return children;
}
    
function findPersonDescendants(person, people) {
    let children = findChildren(person, people);
    let foundDescendants = "";
    for (let i = 0; i < children.length; i++) {
      foundDescendants += children[i].firstName + " " + children[i].lastName + ". ";
      if (i >= 0) {
        let grandChildren = findPersonDescendants(children[i], people);
        foundDescendants += grandChildren;
      }
    }
    return foundDescendants;
}

function displayDescendants(person, people) {
  let descendants = findPersonDescendants(person, people);
  if (descendants.length === 0){
    return "No data on descendants"
  }
  return descendants;
}

function searchByTraits(people){
    let userInput = prompt("Please enter a trait to search by e.g., 'eyeColor', 'gender', 'weight':  ");
    let userInputVal = prompt("Please enter value: "); 
    let result = []
    let resultList = ""
        result = people.filter((object) => {
        try{
           if 
             (object[userInput] === userInputVal) {  
             return true;
           }
        } catch (error) {
            console.log(error);
        }
        finally{
            if (object[userInput] === parseInt(userInputVal)){
                return true;
            }
        }
    });
    for (let i = 0; i < result.length; i++) {
        resultList +=
          result[i].firstName + " " + result[i].lastName + ". ";
      } if (result.length === 0) {
        return "Sorry, there is no match";
      }
      alert(`Search result(s): ${resultList}.`);
    let narrowSearch = promptFor("Would you like to narrow down the search? Please enter yes/no", yesNo).toLowerCase();
    switch (narrowSearch) {
      case "yes":
      searchByTraits(resultList);
      case "no":
      break;
    }
}



// ideas on multi traits search
// function for each trait
// function searchByEyeColor(people) {
//   let userInput = promt("Please enter an eye color to search by: ");
//   let result = people.filter((object) => {
//     if (object.eyeColor === userInput) {
//       return true;
//     }
//   });
//   return result;
// }

// function searchByWeight(people) {
//   let userInput = parseInt(prompt("Please enter a weight to search to search by"));
//   let result = people.filter((object) => {
//     if (object.weight === userInput) {
//       return true;
//     }
//   });

//   return result;
// }

// function displaySearchByTraits(people) {
//   let eyeColor = searchByEyeColor(people);
//   let occupation = searchByOccupation(people);
//   let gender = searchByGender(people);
//   let height = searchByHeight(people);
//   let weight = searchByWeight(people);
//   let personFamily = "Parents: " + parents + "\n";
//   personFamily += "Siblings: " + siblings + "\n";
//   personFamily += "Spouse: " + spouse + "\n";
//   // personFamily += "Children: " + children + "\n";

//   return personFamily;
// }

// get all input in an array; max 5
// function getInputArray(people) {
//   let inputArray = [];
//   let arraySize = 5;
//   for (let i = 0; i <=5; i++) {
//     inputArray[i] = prompt("Please enter a trait to search by: " + (i+1));
//   } return inputArray;
// }