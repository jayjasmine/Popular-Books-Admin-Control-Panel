//LOAD EXISTING DATA
let urlParameters = new URLSearchParams(window.location.search)
//Access the user ID from the query string (?=id=1)
let userId = urlParameters.get("id")
//if there the userID is not null do thing
if (userId) {
    fetch(`api/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            console.log(user)
            //push existing user info to form inputes
            document.getElementById("userID").value = user.userID
        })
}

function handleSubmit() {
    let form = document.getElementById("delete-user-form");
    let chk_status = form.checkValidity();
    form.reportValidity();
    if (chk_status) {
        postDeleteUser()
    }
}

function postDeleteUser() {
    //get access to delete user form
    let deleteuserForm = document.getElementById("delete-user-form")

    //convert form data into json
    let id = Object.fromEntries(new FormData(deleteuserForm))

    //post the json data to the api
    fetch("api/users/delete/" + id.userID, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(response => {
            alert(response)
            // //redirect back to user list
            window.location.href = "viewusers.html"
        })
}