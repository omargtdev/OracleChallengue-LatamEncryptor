import Message from "./entities/message.js";
import Encryptor from "./lib/encryptor.js";
import MessageStorage from "./messageStorage.js";
import { getMessageElement, copyToClipboard, showToastMessage, renderMessage, emptyMessageContainer } from "./utils.js";

const storage = new MessageStorage();
const textElement = document.getElementById("mainInput");

// EVENTS
export const onEncrypt = (e) => {
    const text = textElement.value.trim();
    if(text == "" || !/^[a-zñ\s]*$/.test(text)){
        showToastMessage("El mensaje debe ser solo letras minúsculas");
        return;
    }
    if(storage.messages.length == 0)
        document.getElementById("messageContainer").innerHTML = "";

    const encryptedMessage = new Message(Encryptor.encrypt(text));
    storage.addMessage(encryptedMessage);
    renderMessage(encryptedMessage);
}

export const onDecrypt = (e) => {
    const text = textElement.value.trim();
    if(text == "" || !/^[a-zñ\s]*$/.test(text)){
        showToastMessage("El mensaje debe ser solo letras minúsculas");
        return;
    }

    const decryptedMessage = new Message(Encryptor.decrypt(text));
    storage.addMessage(decryptedMessage);
    renderMessage(decryptedMessage);
}

export const onCleanInput = (e) => {

}

export const onCopyMessage = (e) => {
    const messageContainer = getMessageElement(e.target);
    const message = messageContainer.firstElementChild.textContent; // Text context of message
    copyToClipboard(message)
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
