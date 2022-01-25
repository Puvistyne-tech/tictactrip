/**
 * Function to justify a give text to a given lenght
 * @param text
 * @param length
 * @returns {string}
 */
module.exports=function justify (text, length) {

    const re = RegExp("(?:\\s|^)(.{1," + length + "})(?=\\s|$)", "g");
    const res = [];
    const finalResult = [];

    // to delete unnecessory spaces before new line
    text = text.replace(/\s+$/gm, "")

    let m;
    while ((m = re.exec(text)) !== null) {
        res.push(m[1]);
    }

    for (let i = 0; i < res.length - 1; i++) {
        if (res[i].indexOf(' ') !== -1) {
            while (res[i].length < length) {
                for (let j = 0; j < res[i].length - 1; j++) {
                    if (res[i][j] === ' ') {
                        res[i] = res[i].substring(0, j) + " " + res[i].substring(j);
                        if (res[i].length === length) break;
                        while (res[i][j] === ' ') j++;
                    }
                }
            }
        }
        finalResult.push(res[i]);
    }

    finalResult.push(res[res.length - 1]);

    return finalResult.join('\n');
}
