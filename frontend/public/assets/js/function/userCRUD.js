async function getUserData() {

    const userData = await fetch("/users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("usuarioLogado")
        },
    });

    return userData;

}

async function signupPostData(username, email, password) {

    const serverResponse = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, email, password })
    });

    return serverResponse

}

async function loginAction(email, password) {

    const serverResponse = await fetch("/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    return serverResponse

}

async function deleteUserData() {

        const userData = await getUserData();
        const userDataJSON = await userData.json();
        const id = userDataJSON.id;

        const serverResponse = await fetch('/users/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("usuarioLogado")
            },
        });

        localStorage.removeItem("usuarioLogado");
        return serverResponse;
    
}

async function updateUserData(editUserData) {

    const userData = await getUserData();
    const userDataJSON = await userData.json();
    const id = userDataJSON.id;
    const username = editUserData.username;
    const email = editUserData.email;
    const password = editUserData.password;

    const serverResponse = await fetch('/users/' + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("usuarioLogado")
        },
        body: JSON.stringify({ username: username, email, password })
    });

    return serverResponse;

}

export { getUserData, signupPostData, loginAction, deleteUserData, updateUserData };