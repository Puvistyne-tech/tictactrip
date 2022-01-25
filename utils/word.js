/**
 * Function to count the number of words present in the given text
 * @param text
 * @returns {number}
 */
const wordCount=(text)=>{
    return text.split(' ').length
}

module.exports= {wordCount}