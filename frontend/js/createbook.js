//Check if form input is valid before sending post request to server
function handleSubmit() {
    //find form
    let form = document.getElementById("create-book-form");
    //Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    //report form validity to client
    form.reportValidity();
    //if valid execute createbook function
    if (chk_status) {
        postCreateBook()
    }
}

function postCreateBook() {
    // Get access to the create user form
    let createBookForm = document.getElementById("create-book-form")

    //get select list value and form data
    cover = {
        "cover_img_path": document.getElementById("cover_img_path").value
    }
    author = {
        "author": document.getElementById("author").value
    }
    formData = Object.fromEntries(new FormData(createBookForm));
    //add select list value to form data 
    Object.assign(formData, cover, author)
    // Convert the form fields into JSON
    let formDataJSON = JSON.stringify(formData)

    let chk_status = createBookForm.checkValidity();

    if (chk_status) {
        console.log(formDataJSON)
        // Post the form JSON to the backend

        //show loading screen? 
        fetch("/api/books/create", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: formDataJSON
            })
            .then(res => res.json())
            .then(res => {
                //handle response from the server
                console.log(res + "book request sent!")
                //hide the loading screen
                console.log(res)
                //redirect back to book list
                window.location.href = "viewbooks.html"
            })
            .catch(err => {
                //handle the error from the server
                console.log("create book request failed!" + err)
                console.log(err)
            })
    }
}

//populate author select list
fetch("/api/authors")
    //turn list into json format
    .then(res => res.json())
    .then((authors) => {
        //access select DOM element
        let authorSelect = document.getElementById("author")
        //each item in authors stores as 'author'  
        for (let author of authors) {
            //insert option and value html with each iteration's key value
            authorSelect.innerHTML += `<option value="${author.name}">
                ${author.name}
            </option>`
        }

    })

//populate cover select list
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