import MessageStorage from './core/messageStorage.js';
import { onEncrypt, onDecrypt } from './core/events.js';
import { emptyMessageContainer, renderMessage } from './core/utils.js';
import { decryptBtn, encryptBtn, messageContainer } from './core/elements.js';

// Init storage
const storage = new MessageStorage();

// Render messsages
if(storage.messages.length > 0){
    messageContainer.innerHTML = ""; // Clean container
    messageContainer.style.justifyContent = "start"
    storage.messages.forEach(message => renderMessage(message));
}else{
    emptyMessageContainer();

}

// Register events
encryptBtn.onclick = onEncrypt;
decryptBtn.onclick = onDecrypt;
