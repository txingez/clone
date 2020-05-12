const REGEX_ALPHABET = /[^a-z0-9]+/i
const REGEX_NOT_ALPHABET = /[a-z0-9 ]+/i

export class CustomTokenizer {

  tokenize(text) {
    // use to split non-English words, like Japanese
    let notAlphabetArr = text.split(REGEX_NOT_ALPHABET).filter((text) => text).join("").split("")

    // use to split English words
    let alphabetArr = text.split(REGEX_ALPHABET).filter((text) => text)
    return notAlphabetArr.concat(alphabetArr)
  }
}
