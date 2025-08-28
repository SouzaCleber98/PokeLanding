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
    
    try {
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

        if (!serverResponse.ok) {
            throw new Error("Erro ao deletar usuário: " + serverResponse.status);
        }

        localStorage.removeItem("usuarioLogado");
        console.log("Usuário deletado com sucesso!");

    } catch (error) {
        console.error("Falha ao deletar:", error);
    }
}

export { getUserData, signupPostData, loginAction, deleteUserData };