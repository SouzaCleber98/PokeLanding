import { deleteUserData, updateUserData } from './function/userCRUD.js';
import { mostrarToast } from './function/toast.js';
import { atualizarUI } from './auth.js';
import { fecharModal } from './modal.js';

class UserInfoButtons {

    constructor() {

        document.addEventListener("DOMContentLoaded", () => {
            this.deleteUserClick();
            this.updateUserClick();
        });

    }

    /**
     * Attaches a click event listener to the "delete" button that prompts the user for confirmation,
     * attempts to delete the user account via an asynchronous request, and updates the UI accordingly.
     * Displays toast notifications for success or error states.
     *
     * @throws {Error} If there is an error during the user deletion process.
     */

    deleteUserClick() {

        try {

            const deleteButton = document.getElementById("delete"); // botão de deletar usuário

            deleteButton.addEventListener('click', async () => {

                if (!confirm("Tem certeza que deseja deletar sua conta? Esta ação é irreversível.")) return;

                const serverStatus = await deleteUserData();

                if (!serverStatus.ok) {

                    throw new Error("Erro ao deletar usuário: " + serverStatus.statusText);

                }

                mostrarToast("Usuário deletado com sucesso!");
                fecharModal("modal-userInfo");
                await atualizarUI();

            });

        } catch (error) {

            console.error(error);
            mostrarToast("Erro ao deletar usuário");

        }
    }

    /**
     * Handles the user update functionality within the user info modal.
     * Sets up event listeners for updating user data, returning to the info view, and submitting the edit form.
     * On form submission, validates input, confirms action, sends updated data to the server,
     * updates local storage if necessary, resets the form, closes the modal, and refreshes the UI.
     * Displays error messages via toast notifications if any step fails.
     *
     * @function
     * @throws {Error} If there is an error updating the user data.
     */
    
    updateUserClick() {

        try {

            const modalUserInfo = document.getElementById("modal-userInfo");
            const updateButton = document.getElementById("update");
            const userInfoArea = modalUserInfo.querySelector(".user-info-area");
            const userInfoButtons = modalUserInfo.querySelector(".user-info-buttons");
            const userDataEdit = modalUserInfo.querySelector(".edit-user");
            const returnButton = userDataEdit.querySelector("#return");
            const editUserForm = document.querySelector("#modal-userInfo form");

            updateButton.addEventListener('click', () => {

                showUserInfoEditArea(userInfoButtons, userDataEdit, userInfoArea);

            });

            returnButton.addEventListener("click", () => {

                showUserInfoArea(userInfoButtons, userDataEdit, userInfoArea);

                editUserForm.reset();
                return;

            });

            editUserForm.addEventListener("submit", async (e) => {

                e.preventDefault();
                const userName = editUserForm.querySelector("input[placeholder='Novo Nome']").value.trim();
                const emailInput = editUserForm.querySelector("input[placeholder='Novo Email']");
                const userEmail = emailInput.value.trim();
                const userPassword = editUserForm.querySelector("input[placeholder='Nova Senha']").value;

                const newUserData = {
                    username: userName,
                    email: userEmail,
                    password: userPassword
                };

                if (!userName && !userEmail && !userPassword) return;

                if (!confirm("Tem certeza que deseja atualizar os seus dados?")) return;

                const serverResponse = await updateUserData(newUserData);
                const serverResponseJSON = await serverResponse.json();

                if (!serverResponse.ok) {

                    const serverMessage = serverResponseJSON.message;
                    throw new Error("Erro ao atualizar usuário: " + serverMessage);

                }

                let token;
                if (userEmail || userPassword) {

                    token = serverResponseJSON.token;
                    localStorage.setItem("usuarioLogado", token);

                }

                editUserForm.reset();
                fecharModal("modal-userInfo");
                mostrarToast("Usuário atualizado com sucesso!");
                await atualizarUI();
                showUserInfoArea(userInfoButtons, userDataEdit, userInfoArea);

            });


        } catch (error) {

            console.error(error);
            mostrarToast("Erro ao atualizar usuário");

        }
    }
}

export default new UserInfoButtons;

//funções

/**
 * Shows the user info area and hides the edit area.
 * @param {HTMLElement} userInfoButtons - The container for user info buttons.
 * @param {HTMLElement} userDataEdit - The container for editing user data.
 * @param {HTMLElement} userInfoArea - The container for displaying user info.
 */

function showUserInfoArea(userInfoButtons, userDataEdit, userInfoArea) {

    userInfoButtons.style.display = "flex";
    userDataEdit.style.display = "none";
    userInfoArea.style.display = "flex";

}

/**
 * Shows the edit user info area and hides the user info display area.
 * @param {HTMLElement} userInfoButtons - The container for user info buttons.
 * @param {HTMLElement} userDataEdit - The container for editing user data.
 * @param {HTMLElement} userInfoArea - The container for displaying user info.
 */

function showUserInfoEditArea(userInfoButtons, userDataEdit, userInfoArea) {

    userInfoButtons.style.display = "none";
    userDataEdit.style.display = "block";
    userInfoArea.style.display = "none";

}





