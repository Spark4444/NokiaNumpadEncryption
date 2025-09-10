// Nokia numpad layout mapping
const numpadArray = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];

// Function to encrypt a string using the Nokia numpad layout
function encrypt(inputString) {
    let result = '';
    let encryptionKey = [];

    // Iterate through each character in the input string
    inputString.toLowerCase().split('').forEach((element, i) => {
        // Check each string in the numpad array
        let isLetterPresentInNumpad = false;

        numpadArray.forEach((string, i2) => {
            // If the character is found in the current string
            if (string.includes(element)) {
                // Calculate the button index and letter position
                const buttonIndex = i2 + 2;
                const letterPosition = string.indexOf(element) + 1;

                // Append the button index to the result and store the encryption key
                // ENCRYPTION KEY FORMAT: [buttonIndex, letterPosition]
                result += buttonIndex;
                encryptionKey.push([buttonIndex, letterPosition]);

                // Mark that the letter was found in the numpad
                isLetterPresentInNumpad = true;
            }
        });
        if (!isLetterPresentInNumpad) {
            // If the character is not found in the numpad, append it as is and store it in the encryption key
            result += element;
            encryptionKey.push([element]);
        }
    });

    return {
        encryptedString: result,
        encryptionKey: encryptionKey
    }
}

// Function to decrypt an encrypted string using the provided encryption key
function decrypt(encryptedString, encryptionKey) {
    let result = '';

    // Iterate through each entry in the encryption key
    encryptionKey.forEach((element, i) => {
        if (element.length === 2) {
            // If the entry has two elements, it represents a button index and letter position
            const buttonIndex = element[0];
            const letterPosition = element[1];
            result += numpadArray[buttonIndex - 2][letterPosition - 1];
        } else {
            // If the entry is not valid, append it as is
            result += element[0];
        }
    });

    return result;
}