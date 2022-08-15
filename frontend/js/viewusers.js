//populate user table
fetch("api/users")
    .then(res => res.json())
    .then(users => {
        console.log(users)
        let user_list = document.getElementById("my-user-list-tbody")
        for (let user of users) {
            user_list.innerHTML += `
        <tr>
        <td>${user.userID}</td>
        <td>${user.username}</td>
        <td>${user.accessRights}</td>
        <td><a href="edituser.html?id=${user.userID}"> Edit</a><br> <a href="deleteuser.html?id=${user.userID}"> Delete</a></td>
        </tr>
        `
        }
    })