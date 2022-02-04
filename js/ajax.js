let   employees = [];
const urlAPI =`https://randomuser.me/api/?results=12&inc=name, picture,email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

/***************** Fetch API ******************/
fetch(urlAPI)                        // fetch URL info
    .then(res => res.json())         // format response as JSON
    .then(res => res.results)        // return results of the response
    .then(displayEmployees)          // pass control to displayEmplyees
    .catch(err => console.log(err)); // catch any erros and console log

/********* Function that displays employees data onscreen ***********/
function displayEmployees(employeeData){
    employees = employeeData;
    
    let employeeHTML = '';  
   
    employees.forEach((employee, index) => {
        let name =    employee.name;
        let email =   employee.email;
        let city =    employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" />
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}

/*** Function that displays the chosen employee on the overlay ***/
function displayModal(index) {

    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <button id="previous" class="arrow-btn" onClick="previous(${index})"> 
            <svg width="44" height="60">
                <polyline points="30 10 10 30 30 50" stroke="#B8B8B8" stroke-width="4" 
                stroke-linecap="butt" fill="none" stroke-linejoin="round"/> 
            </svg>
        </button>
        <button id="next" class="arrow-btn" onClick="next(${index})" >
            <svg width="44" height="60">
                <polyline points="14 10 34 30 14 50" stroke="#B8B8B8" stroke-width="4"
                stroke-linecap="butt" fill="none" stroke-linejoin="round"/>
            </svg>
        </button>
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

/********** The next and previous functions switches btwn employee *****/ 
/********** data on overlay back and foward ****************************/
function previous(index) {
    var newCard;

    if(index > 0 ){
        newCard = index - 1;
    } else {
        newCard = 11;
    }
    
    displayModal(newCard);
}

function next(index) {
    var newCard;

    if(index < 11){
        newCard = index + 1;
    } else {
        newCard = 0;
    }

    displayModal(newCard);
}

/**********  event listeners that displays the overlay for the chosen employee *************/
gridContainer.addEventListener('click', e => {
    
    if (e.target !== gridContainer) {

    const card = e.target.closest(".card");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});

/* event listener that hides the overlay when the user clicks on the x */
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

