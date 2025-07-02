import { limparCamposFormulario } from './function/clearForm.js';
import { mostrarToast } from './function/toast.js';

document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.querySelector("#modal-cadastro form");
    const loginForm = document.querySelector("#modal-login form");

    function exibirMensagem(input, msgElement, tipo, mensagem) {
        input.classList.remove("erro", "sucesso");
        msgElement.classList.remove("erro", "sucesso");
        msgElement.textContent = "";
        input.classList.add(tipo);
        msgElement.classList.add(tipo);
        msgElement.textContent = mensagem;
    }



    cadastroForm.querySelector("input[placeholder='Email']").addEventListener("input", () => {
        cadastroForm.querySelector("input[placeholder='Email']").classList.remove("erro", "sucesso");
        const emailMsg = document.getElementById("email-msg");
        if (emailMsg) emailMsg.textContent = "";
    });

    // const debounce = (func, delay) => {
    //     let timeout;
    //     return (...args) => {
    //         clearTimeout(timeout);
    //         timeout = setTimeout(() => func.apply(this, args), delay);
    //     };
    // };

    cadastroForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = cadastroForm.querySelector("input[placeholder='Nome completo']").value.trim();
        const emailInput = cadastroForm.querySelector("input[placeholder='Email']");
        const email = emailInput.value.trim();
        const password = cadastroForm.querySelector("input[placeholder='Senha']").value;

        const response = await fetch("/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: nome, email, password })
        });


        if (response.status === 400) {
            return exibirMensagem(emailInput, document.getElementById("email-msg"), "erro", "Este email já está cadastrado!");
        }

        cadastroForm.reset();
        limparCamposFormulario(cadastroForm);
        fecharModal("modal-cadastro");
        mostrarToast("Cadastro realizado com sucesso!");
    });

    loginForm.addEventListener("submit", async (e) => {
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
            const res = await fetch("/sessions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            if (res.status === 200) {
                const data = await res.json();
                localStorage.setItem("usuarioLogado", data.token);
                loginForm.reset();
                limparCamposFormulario(loginForm);
                fecharModal("modal-login");
                mostrarToast("Login realizado com sucesso!");
                atualizarUI();
            } else {
                throw { status: res.status };
            }
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

    async function atualizarUI() {
        const loginItem = document.getElementById("btn-login");
        const cadastroItem = document.getElementById("btn-cadastro");
        const userInfo = document.getElementById("user-info");

        if (!localStorage.getItem("usuarioLogado")) {
            if (loginItem) loginItem.style.display = "list-item";
            if (cadastroItem) cadastroItem.style.display = "list-item";
            if (userInfo) userInfo.innerHTML = "";
            return;
        }
        const response = await fetch("/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("usuarioLogado")
            },
        });

        if (response.status !== 200) {
            if (loginItem) loginItem.style.display = "list-item";
            if (cadastroItem) cadastroItem.style.display = "list-item";
            if (userInfo) userInfo.innerHTML = "";
            return;
        }

        const data = await response.json();
        const nome = data.username;
        if (loginItem) loginItem.style.display = "none";
        if (cadastroItem) cadastroItem.style.display = "none";
        if (userInfo) {
            userInfo.innerHTML = `
                    <span> ${nome}</span>
                    <a href="#" id="btn-logout">Sair</a>
                `;

            const btnLogout = document.getElementById("btn-logout");
            if (btnLogout) {
                btnLogout.addEventListener("click", (e) => {
                    e.preventDefault();
                    localStorage.removeItem("usuarioLogado");
                    atualizarUI();
                    mostrarToast("Logout realizado com sucesso!");
                });
            }
        } else {
            if (loginItem) loginItem.style.display = "list-item";
            if (cadastroItem) cadastroItem.style.display = "list-item";
            if (userInfo) userInfo.innerHTML = "";
        }
    }

    function fecharModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.style.display = "none";
    }

    atualizarUI();
});
