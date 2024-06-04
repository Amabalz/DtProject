class Comment {
    constructor(ticketid, userid, data) {
        this.ticketid = ticketid;
        this.userid = userid;
        this.data = data;
        this.likes = 0;
        this.dislikes = 0;
    }
}

module.exports = Comment;