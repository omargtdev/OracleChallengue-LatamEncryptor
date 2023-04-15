import { mainInput, messageContainer } from "./elements.js";
import { onCopyMessage, onDeleteMessage } from "./events.js";

// Create a uuid
// Thanks to this answer: https://stackoverflow.com/a/2117523
export const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export const getMessageElement = (target) => {
    return target.parentElement.parentElement;
}

export const copyToClipboard = async (content) => {
    if(navigator.clipboard && window.isSecureContext) { // Validate that if clipbard is enable
        await navigator.clipboard.writeText(content);
        return;
    }

}

export const showToastMessage = (message) => {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "toast show";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}

export const cleanInput = () => mainInput.value = "";

export const renderMessage = (message) => {
        const messageElement = document.createElement("div");
        messageElement.className = "message";
        messageElement.dataset.id = message.id; // Setting the id to manipulate message

        const p = document.createElement("p");
        p.textContent = message.description;

        const messageActions = document.createElement("div");
        messageActions.className = "message-actions";

        const copyBtn = document.createElement("i");
        copyBtn.className = "fa-solid fa-copy";
        copyBtn.onclick = onCopyMessage;
        const deleteBtn = document.createElement("i");
        deleteBtn.className = "fa-solid fa-trash";
        deleteBtn.onclick = onDeleteMessage;

        messageActions.appendChild(copyBtn);
        messageActions.appendChild(deleteBtn);

        messageElement.appendChild(p);
        messageElement.appendChild(messageActions);

        messageContainer.appendChild(messageElement);
}

// Default content for messages if does empty
export const emptyMessageContainer = () => {
    messageContainer.style.justifyContent = "center"
    messageContainer.innerHTML = `
        <img src="img/empty-message.svg" alt="Persona buscando algo" class="message-empty-image" />
        <h2>Ningún mensaje fue encontrado</h2>
        <p>Ingresa el texto que desees encriptar o desencriptar.</p> 
    `;
}
