class Regex {
    constructor(){
        this.emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        this.passwordsRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$');
    }
    validateEmail(email){
        return this.emailRegex.test(email);
    }
    validatePassword(password){
        return this.passwordsRegex.test(password);
    }
}

module.exports = new Regex();