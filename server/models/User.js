class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = 'basic';
        this.profile_picture = "";
        this.level = 0;
    }
}

module.exports = User;