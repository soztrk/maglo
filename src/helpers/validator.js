export default class Validator {

    static email(value){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    }

    static empty(value){
        return /^\s+$|^$/gi.test(value)
    }
}