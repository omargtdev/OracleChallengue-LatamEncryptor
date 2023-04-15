class MessageStorage {

    static #instance = null;

    #messages;

    // Singleton
    constructor(){
        if(MessageStorage.#instance == null){
            MessageStorage.#instance = this; // Creating an object
            this.#messages = JSON.parse(localStorage.getItem("messages") ?? "[]");
        }

        return MessageStorage.#instance;
    }

    addMessage(message){
        this.#messages.push(message);
        this.#saveChanges();
    }

    deleteMessage(id){
        this.#messages = this.#messages.filter(message => message.id != id);
        this.#saveChanges();
    }

    #saveChanges(){
        localStorage.setItem("messages", JSON.stringify(this.#messages));
    }

    get messages(){
        return this.#messages;
    }
}

export default MessageStorage;
