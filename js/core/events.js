import Message from "../entities/message.js";
import Encryptor from "../lib/encryptor.js";
import { mainInput, messageContainer } from "./elements.js";
import MessageStorage from "./messageStorage.js";
import { getMessageElement, copyToClipboard, showToastMessage, renderMessage, emptyMessageContainer, cleanInput } from "./utils.js";

const storage = new MessageStorage();

// EVENTS
export const onEncrypt = (e) => {
    const text = mainInput.value.trim();
    if(text == "" || !/^[a-zñ\s]*$/.test(text)){
        showToastMessage("El mensaje debe ser solo letras minúsculas");
        return;
    }
    if(storage.messages.length == 0){
        messageContainer.innerHTML = "";
        messageContainer.style.justifyContent = "start"
    }

    const encryptedMessage = new Message(Encryptor.encrypt(text));
    storage.addMessage(encryptedMessage);
    renderMessage(encryptedMessage);
    cleanInput();
}

export const onDecrypt = (e) => {
    const text = mainInput.value.trim();
    if(text == "" || !/^[a-zñ\s]*$/.test(text)){
        showToastMessage("El mensaje debe ser solo letras minúsculas");
        return;
    }

    const decryptedMessage = new Message(Encryptor.decrypt(text));
    storage.addMessage(decryptedMessage);
    renderMessage(decryptedMessage);
    cleanInput();
}

export const onCopyMessage = (e) => {
    const message = getMessageElement(e.target);
    const messageText = message.firstElementChild.textContent; // Text context of message
    copyToClipboard(messageText)
        .then(() => showToastMessage("Mensaje copiado!"));
}

export const onDeleteMessage = (e) => {
    const message = getMessageElement(e.target);
    storage.deleteMessage(message.dataset.id);
    message.remove(); // Remove from view
    if(storage.messages.length == 0)
        emptyMessageContainer();
    showToastMessage("Mensaje eliminado!");
}
