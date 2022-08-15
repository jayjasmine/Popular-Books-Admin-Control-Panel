//LOAD EXISTING DATA
let urlParameters = new URLSearchParams(window.location.search)
//Access the book ID from the query string (?=id=1)
let bookID = urlParameters.get("id")
//if there the bookID is not null do thing

//populate author select lists
fetch("/api/authors")
    .then(res => res.json())
    .then((authors) => {
        let authorSelect = document.getElementById("author")

        for (let author of authors) {
            authorSelect.innerHTML += `<option value="${author.name}">
            ${author.name}
        </option>`
        }

    })

//populate cover select lists
fetch("/api/covers")
    .then(res => res.json())
    .then((covers) => {
        let coverSelect = document.getElementById("cover_img_path")

        for (let cover of covers) {
            coverSelect.innerHTML += `<option value="${cover.cover_img_path}">
        ${cover.coverID}
    </option>`
        }

    })


//push response data into form inputs
if (bookID) {
    fetch(`/api/books/${bookID}`)
        .then(res => res.json())
        .then(book => {
            console.log(book.cover_img_path)
            console.log(book.author)
            //push existing book info to form inputs
            document.getElementById("bookID").value = book.bookID
            document.getElementById("cover_img_path").value = book.cover_img_path
            document.getElementById("title").value = book.title
            document.getElementById("publication_year").value = book.publication_year
            document.getElementById("author").value = book.author
            document.getElementById("copies_sold").value = book.copies_sold
        })
}

//Check if form input is valid before sending post request to server
function handleUpdateSubmit() {
    //find form
    let form = document.getElementById("update-book-form");
    //Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    //report form validity to client
    form.reportValidity();
    //if valid execute createbook function
    if (chk_status) {
        postUpdateBook()
    }
}

//Post updated data
function postUpdateBook() {
    //get access to update book form
    let updatebookForm = document.getElementById("update-book-form")
    //get select list value and form data
    cover = {
        "cover_img_path": document.getElementById("cover_img_path").value
    }
    formData = Object.fromEntries(new FormData(updatebookForm));
    //add select list value to form data 
    Object.assign(formData, cover)
    // Convert the formData object into JSON
    let formDataJSON = JSON.stringify(formData)
    //post the json data to the api
    fetch("api/books/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(response => {
            alert(response)
            //redirect back to book list
            window.location.href = "viewbooks.html"
        })

}