import { uuidv4 } from "../core/utils.js";

class Message {

    id
    description

    constructor(description = ""){
        this.id = uuidv4();
        this.description = description;
    }

}

export default Message;
