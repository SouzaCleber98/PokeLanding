import { deleteUserData } from './function/userCRUD.js';
import { mostrarToast } from './function/toast.js';
import { atualizarUI } from './auth.js';
import { fecharModal } from './modal.js';

class UserInfoButtons {

    constructor() {

        document.addEventListener("DOMContentLoaded", () => this.deleteUserClick());

    }

    deleteUserClick() {

        const deleteButton = document.getElementById("delete"); // botão de deletar usuário

        deleteButton.addEventListener('click', async () => { 

            if (!confirm("Tem certeza que deseja deletar sua conta? Esta ação é irreversível.")) return;

            await deleteUserData();
            mostrarToast("Usuário deletado com sucesso!");
            fecharModal("modal-userInfo");
            await atualizarUI();

        });
    }
}

export default new UserInfoButtons;
// const updateButton = ;

//





