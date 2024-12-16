const words = require('an-array-of-english-words');

export const getWordsByLength = (length) => {
    return words.filter(word => word.length === length).map(word => word.toUpperCase());
}

export const getRandomWordByLength = (length) => {
    const words = getWordsByLength(length);
    return words[Math.floor(Math.random() * words.length)].toUpperCase()
}