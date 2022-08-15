//log out user 
function postLogoutUser() {
    fetch("/api/users/logout", {
            method: "POST"
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            window.location.href = "login.html"
        })
        .catch(error => {
            console.log("logout failed" + error)
        })
}


fetch('header.html')
    .then((res) => res.text())
    .then((data) => {
        document.getElementById('header-output').innerHTML = data;
    })