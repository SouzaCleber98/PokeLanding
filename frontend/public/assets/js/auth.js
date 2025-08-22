import { limparCamposFormulario } from './function/clearForm.js';
import { mostrarToast } from './function/toast.js';

document.addEventListener("DOMContentLoaded", () => { // Quando o DOM estiver carregado

    const cadastroForm = document.querySelector("#modal-cadastro form");
    const loginForm = document.querySelector("#modal-login form");

    cadastroForm.querySelector("input[placeholder='Email']").addEventListener("input", () => {
        cadastroForm.querySelector("input[placeholder='Email']").classList.remove("erro", "sucesso");
        const emailMsg = document.getElementById("email-msg");
        if (emailMsg) emailMsg.textContent = "";
    });

    cadastroForm.addEventListener("submit", async (e) => {  //Cadastro
        e.preventDefault();

        const userName = cadastroForm.querySelector("input[placeholder='Nome completo']").value.trim();
        const emailInput = cadastroForm.querySelector("input[placeholder='Email']");
        const userEmail = emailInput.value.trim();
        const userPassword = cadastroForm.querySelector("input[placeholder='Senha']").value;

        const serverResponse = await signupPostData(userName, userEmail, userPassword);

        if (serverResponse.status === 400) {
            return exibirMensagem(emailInput, document.getElementById("email-msg"), "erro", "Este email já está cadastrado!");
        }

        cadastroForm.reset();
        limparCamposFormulario(cadastroForm);
        fecharModal("modal-cadastro");
        mostrarToast("Cadastro realizado com sucesso!");

    });

    loginForm.addEventListener("submit", async (e) => { //Login
        e.preventDefault();

        const email = loginForm.querySelector("input[placeholder='Email']").value.trim();
        const password = loginForm.querySelector("input[placeholder='Senha']").value;
        const loginMsg = document.getElementById("login-msg");

        [loginForm.querySelector("input[placeholder='Email']"), loginForm.querySelector("input[placeholder='Senha']")]
            .forEach(input => input.classList.remove("erro", "sucesso"));

        if (loginMsg) {
            loginMsg.classList.remove("erro", "sucesso");
            loginMsg.textContent = "";
        }

        try {

            const serverResponse = await loginAction(email, password);

            if (serverResponse.status != 200) {

                throw { status: serverResponse.status };

            }

            const serverResponseJSON = await serverResponse.json();
            localStorage.setItem("usuarioLogado", serverResponseJSON.token);
            loginForm.reset();
            limparCamposFormulario(loginForm);
            fecharModal("modal-login");
            mostrarToast("Login realizado com sucesso!");
            atualizarUI();

        } catch (error) {
            if (error.status === 401) {
                exibirMensagem(loginForm.querySelector("input[placeholder='Email']"), loginMsg, "erro", "Email ou senha inválidos.");
                exibirMensagem(loginForm.querySelector("input[placeholder='Senha']"), loginMsg, "erro", "Email ou senha inválidos.");
            } else if (error.status === 404) {
                exibirMensagem(loginForm.querySelector("input[placeholder='Email']"), loginMsg, "erro", "Usuário não encontrado.");
            }
        }
    });

    loginForm.querySelector("input[placeholder='Email']").addEventListener("input", () => {
        loginForm.querySelector("input[placeholder='Email']").classList.remove("erro", "sucesso");
        const loginMsg = document.getElementById("login-msg");
        if (loginMsg) loginMsg.textContent = "";
    });

    loginForm.querySelector("input[placeholder='Senha']").addEventListener("input", () => {
        loginForm.querySelector("input[placeholder='Senha']").classList.remove("erro", "sucesso");
    });

    atualizarUI();

});  

// funções

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

function fecharModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = "none";
}

function exibirMensagem(input, msgElement, tipo, mensagem) {
    input.classList.remove("erro", "sucesso");
    msgElement.classList.remove("erro", "sucesso");
    msgElement.textContent = "";
    input.classList.add(tipo);
    msgElement.classList.add(tipo);
    msgElement.textContent = mensagem;
}

async function atualizarUI() {
    const loginButton = document.getElementById("btn-login");
    const signupButton = document.getElementById("btn-cadastro");
    const userInfo = document.getElementById("user-info");

    if (!localStorage.getItem("usuarioLogado")) {
        if (loginButton) loginButton.style.display = "list-item";
        if (signupButton) signupButton.style.display = "list-item";
        if (userInfo) userInfo.innerHTML = "";
        return;
    }
    const userData = await getUserData();

    if (userData.status !== 200) {
        if (loginButton) loginButton.style.display = "list-item";
        if (signupButton) signupButton.style.display = "list-item";
        if (userInfo) userInfo.innerHTML = "";
        return;
    }

    const userDataJSON = await userData.json();
    const userName = userDataJSON.username;

    if (loginButton) loginButton.style.display = "none";
    if (signupButton) signupButton.style.display = "none";
    if (userInfo) {
        userInfo.innerHTML = `
                    <span> ${userName}</span>
                    <a href="#" id="btn-logout">Sair</a>
                `;

        const buttonLogout = document.getElementById("btn-logout");
        if (buttonLogout) {
            buttonLogout.addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("usuarioLogado");
                atualizarUI();
                mostrarToast("Logout realizado com sucesso!");
            });
        }
    } else {
        if (loginButton) loginButton.style.display = "list-item";
        if (signupButton) signupButton.style.display = "list-item";
        if (userInfo) userInfo.innerHTML = "";
    }
}