const searchbar = document.getElementById("search");

/***** filters out the empoyees that dont match the name inputed ******/ 
/***** in the searchbar by the user ***********************************/
function searchFilter() {
    let a, i, txtValue;
    let filter = searchbar.value.toUpperCase();
    const cards = document.querySelectorAll(".card");
    for (i = 0; i < cards.length; i++) {
        a = cards[i].getElementsByTagName("h2")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}