//LOAD EXISTING DATA
let urlParameters = new URLSearchParams(window.location.search)
//Access the book ID from the query string (?=id=1)
let bookID = urlParameters.get("id")

//if there the bookID exists do thing
if (bookID) {
    fetch(`api/books/${bookID}`)
        .then(res => res.json())
        .then(book => {
            console.log(book)
            //push existing book info to form inputs
            document.getElementById("bookID").value = book.bookID
        })
}


//Check if form input is valid before sending post request to server
function handleSubmit() {
    //find form
    let form = document.getElementById("delete-book-form");
    //Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    //report form validity to client
    form.reportValidity();
    //if valid execute createbook function
    if (chk_status) {
        postDeleteBook()
    }
}


function postDeleteBook() {
    //get access to delete book form
    let deletebookForm = document.getElementById("delete-book-form")

    //convert form data into json
    let id = Object.fromEntries(new FormData(deletebookForm))
    console.log(id)
    //post the json data to the api
    fetch("api/books/delete/" + id.bookID, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(response => {
            //redirect back to book list
            alert(response)
            window.location.href = "viewbooks.html"
        })
}