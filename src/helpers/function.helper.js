module.exports = {
    /**
     * The search string is converted to a regex string.
     * @param {String} searchStr
     * @returns
     */
    str2regex: (searchStr) => {
        const regexStr = searchStr.split(''); // Search string split (convert in array)

        regexStr.forEach((ele, ind) => {
            if (
                ['.', '+', '*', '?', '^', '$', '(', ')', '[', ']', '{', '}', '|', '\\'].find(
                    (e) => ele === e
                )
            )
                regexStr[ind] = `\\${regexStr[ind]}`;
        });

        return regexStr.join('');
    },

}