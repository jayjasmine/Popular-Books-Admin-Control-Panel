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
            document.getElementById("username").value = user.username
            document.getElementById("accessRights").value = user.accessRights
        })
}

//Check if form input is valid before sending post request to server
function handleUpdateSubmit() {
    //find form
    let form = document.getElementById("update-user-form");
    //Check if form is valid, store result in variable
    let chk_status = form.checkValidity();
    //report form validity to client
    form.reportValidity();
    //if valid execute createbook function
    if (chk_status) {
        postUpdateUser()
    }
}

function postUpdateUser() {

    //get access to update user form
    let updateUserForm = document.getElementById("update-user-form")
    accessRights = {
        "accessRights": document.getElementById("accessRights").value
    }
    formData = Object.fromEntries(new FormData(updateUserForm));
    //add select list value to form data 
    Object.assign(formData, accessRights)
    //convert form data into json
    let formDataJSON = JSON.stringify(formData)

    //post the json data to the api
    fetch("api/users/update", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: formDataJSON
        })
        .then(res => res.json())
        .then(response => {
            alert(response)
            //redirect back to user list
            window.location.href = "viewusers.html"
        })
}