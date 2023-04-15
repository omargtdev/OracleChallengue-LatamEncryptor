
class Encryptor {

    static #keys = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    }

    static encrypt(text){
        let encryptedText = "";
        for(let i = 0; i < text.length; i++){
            const letter = text[i];
            // If include a key of keys (a letter), then encrypt it.
            if(Object.keys(Encryptor.#keys).includes(letter)){
                encryptedText = encryptedText.concat(Encryptor.#keys[letter]);
                continue;
            }
            encryptedText = encryptedText.concat(letter);
        }
        return encryptedText;
    }

    static decrypt(text){
        let decryptedText = text;
        // For KeyPair value of keys, change the encrypted part with its original value 
        Object.entries(Encryptor.#keys).forEach(
            ([vocal, valueEncrypted]) => decryptedText = decryptedText.replaceAll(valueEncrypted, vocal)
        );
        return decryptedText;
    }

}

export default Encryptor;
