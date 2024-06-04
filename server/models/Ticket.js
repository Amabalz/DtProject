class Ticket {
    constructor(userid, title, data) {
        this.userid = userid;
        this.title = title;
        this.data = data;
        this.status = 'open';
        this.date_time = new Date()
    }
}

module.exports = Ticket