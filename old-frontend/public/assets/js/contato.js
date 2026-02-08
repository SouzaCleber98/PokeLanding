import { limparCamposFormulario } from './function/clearForm.js';
import { mostrarToast } from './function/toast.js';

document.addEventListener("DOMContentLoaded", () => {
  const contatoForm = document.querySelector("#contato form");

  if (contatoForm) {
    contatoForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = contatoForm.querySelector("input[placeholder='Nome']").value.trim();
      const email = contatoForm.querySelector("input[placeholder='Email']").value.trim();
      const cpf = contatoForm.querySelector(".cpf").value.trim();
      const messageText = contatoForm.querySelector("textarea").value.trim();
      const cpfMsg = document.getElementById("cpf-msg");
      const cpfInput = contatoForm.querySelector(".cpf");

      // Limpa feedbacks anteriores com sua função
      limparCamposFormulario(contatoForm);

      if (!validarCPF(cpf)) { 
        console.error("CPF inválido.");
        cpfInput.classList.add("erro");
        cpfMsg.textContent = "CPF inválido.";
        cpfMsg.classList.add("erro");
        return;
      }

      // Sucesso
      const response = await fetch("/contacts", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ username, email, cpf, body: messageText})
      });

      if (!response.ok){
        mostrarToast("Erro ao enviar mensagem!");
        return;
      }

      contatoForm.reset();
      limparCamposFormulario(contatoForm);
      mostrarToast("Mensagem enviada com sucesso!");
    });
  }
});
