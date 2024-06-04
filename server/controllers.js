const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db');
const { body, validationResult } = require('express-validator');


//USER ROUTES
const User = require('./models/User');

//GET ALL USERS
router.get('/User/GetAllUsers', async (req, res) => {
    try {
        const pool = await db;
        const result = await pool.request().query('SELECT * FROM UserData');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET USER BY ID
router.get('/User/GetUser/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const pool = await db;
        const user = await pool.request()
            .input('id', userId)
            .query('SELECT * FROM UserData WHERE id = @id');
        if (!user.recordset || user.recordset.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user.recordset[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//ADD USER
// Validation middleware for user input
const validateUserInput = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/User/AddUser', validateUserInput, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        const pool = await db;


        const existingUserUsername = await pool.request()
            .input('username', username)
            .query('SELECT * FROM UserData WHERE username = @username');
        if (existingUserUsername.recordset.length > 0) {
            return res.status(400).json({ error: 'User with the same username already exists' });
        }

        const existingUserEmail = await pool.request()
            .input('email', email)
            .query('SELECT * FROM UserData WHERE email = @email');
        if (existingUserEmail.recordset.length > 0) {
            return res.status(400).json({ error: 'User with the same email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = new User(username, email, hashedPassword);

        // Insert new user into database
        const result = await pool.request()
            .input('username', newUser.username)
            .input('email', newUser.email)
            .input('password', newUser.password)
            .input('role', newUser.role)
            .input('profile_picture', newUser.profile_picture)
            .input('level', newUser.level)
            .query('INSERT INTO UserData (username, email, password, role, profile_picture, level) VALUES (@username, @email, @password, @role, @profile_picture, @level)');

        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//LOGIN
const validateLoginInput = [
    body('email').notEmpty().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required')
];

// Define the route for user login
router.post('/User/Login', validateLoginInput, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    try {
        const pool = await db;

        // Find user by email or username
        const existingUser = await pool.request()
            .input('email', email)
            .input('username', username)
            .query('SELECT * FROM UserData WHERE email = @email OR username = @username');

        if (!existingUser.recordset || existingUser.recordset.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = existingUser.recordset[0];

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password and user do not match' });
        }

        res.json(user);
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});





//TICKETS ROUTES
const Ticket = require('./models/Ticket');

//GET ALL TICKETS
router.get('/GetAllTickets', async (req, res) => {
    try {
        const pool = await db;
        const result = await pool.request().query('SELECT * FROM TicketData');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET TICKETS BY USER ID
router.get('/GetTicketUserId/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const pool = await db;

        const result = await pool.request()
            .input('userId', userId)
            .query('SELECT * FROM TicketData WHERE userid = @userId');

        const tickets = result.recordset;

        // Check if tickets were found
        if (tickets.length === 0) {
            return res.status(404).json({ error: 'No tickets found' });
        }

        res.json(tickets);
    } catch (err) {
        console.error('Error retrieving tickets:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//ADD TICKET
const validateTicketInput = [
    body('title').notEmpty().withMessage('Ticket must have a title'),
    body('data').notEmpty().withMessage('Ticket must have data')
];

router.post('/AddTicket', validateTicketInput, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userid, title, data } = req.body;

    try {
        const pool = await db;

        // Check if a ticket with the same title already exists
        const existingTicket = await pool.request()
            .input('title', title)
            .query('SELECT * FROM TicketData WHERE title = @title');
        if (existingTicket.recordset.length > 0) {
            return res.status(400).json({ error: 'Ticket with the same title already exists' });
        }

        // Create new Ticket object
        const newTicket = new Ticket(userid, title, data);

        // Insert new ticket into database
        await pool.request()
            .input('userid', newTicket.userid)
            .input('title', newTicket.title)
            .input('data', newTicket.data)
            .input('status', newTicket.status)
            .input('date_time', newTicket.date_time)
            .query('INSERT INTO TicketData (userid, title, data, status, date_time) VALUES (@userid, @title, @data, @status, @date_time)');

        res.status(201).json(newTicket);
    } catch (err) {
        console.error('Error adding ticket:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




//COMMENTS ROUTES
const Comment = require('./models/Comment');

//LIKE COMMENT BY ID
router.get('/LikeCommentById/:id', async (req, res) => {
    const commentId = req.params.id;
    try {
        const pool = await db;

        // Find the comment by ID
        const comment = await pool.request()
            .input('id', commentId)
            .query('SELECT * FROM CommentData WHERE id = @id');

        if (!comment.recordset || comment.recordset.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Update the likes count
        const updatedComment = comment.recordset[0];
        updatedComment.likes++;

        // Update the comment in the database
        await pool.request()
            .input('id', updatedComment.id)
            .input('likes', updatedComment.likes)
            .query('UPDATE CommentData SET likes = @likes WHERE id = @id');

        res.json(updatedComment);
    } catch (err) {
        console.error('Error liking comment:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DISLIKE COMMENT BY ID
router.get('/DislikeCommentById/:id', async (req, res) => {
    const commentId = req.params.id;
    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Find the comment by ID
        const comment = await pool.request()
            .input('id', commentId)
            .query('SELECT * FROM CommentData WHERE id = @id');

        if (!comment.recordset || comment.recordset.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Update the dislikes count
        const updatedComment = comment.recordset[0];
        updatedComment.dislikes++;

        // Update the comment in the database
        await pool.request()
            .input('id', updatedComment.id)
            .input('dislikes', updatedComment.dislikes)
            .query('UPDATE CommentData SET dislikes = @dislikes WHERE id = @id');

        res.json(updatedComment);
    } catch (err) {
        console.error('Error disliking comment:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET COMMENTS BY TICKETID
router.get('/GetCommentByTicketId/:id', async (req, res) => {
    const ticketId = req.params.id;
    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Query comments by ticket ID
        const comments = await pool.request()
            .input('ticketId', ticketId)
            .query('SELECT * FROM CommentData WHERE ticketid = @ticketId');

        if (!comments.recordset || comments.recordset.length === 0) {
            return res.status(404).json({ error: 'No comments found' });
        }

        res.json(comments.recordset);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET COMMENTS BY USERID
router.get('/GetCommentByUserId/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Query comments by user ID
        const comments = await pool.request()
            .input('userId', userId)
            .query('SELECT * FROM CommentData WHERE userid = @userId');

        if (!comments.recordset || comments.recordset.length === 0) {
            return res.status(404).json({ error: 'No comments found' });
        }

        res.json(comments.recordset);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//ADD COMMENT
router.post('/AddComment', async (req, res) => {
    const { ticketid, userid, data } = req.body;

    if (!data || data.trim() === "") {
        return res.status(400).json({ error: 'You need to write something' });
    }

    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Create new Comment object
        const newComment = new Comment(ticketid, userid, data);

        // Insert new comment into database
        await pool.request()
            .input('ticketid', newComment.ticketid)
            .input('userid', newComment.userid)
            .input('data', newComment.data)
            .input('likes', newComment.likes)
            .input('dislikes', newComment.dislikes)
            .query('INSERT INTO CommentData (ticketid, userid, data, likes, dislikes) VALUES (@ticketid, @userid, @data, @likes, @dislikes)');

        res.status(201).json(newComment);
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DELETE COMMENT
router.delete('/DeleteComment/:id', async (req, res) => {
    const commentId = req.params.id;
    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Find the comment by ID
        const comment = await pool.request()
            .input('id', commentId)
            .query('SELECT * FROM CommentData WHERE id = @id');

        if (!comment.recordset || comment.recordset.length === 0) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Remove the comment from the database
        await pool.request()
            .input('id', commentId)
            .query('DELETE FROM CommentData WHERE id = @id');

        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




//BAN ROUTES
const Ban = require('./models/Ban');

//GET ALL BANS
router.get('/GetAllBans', async (req, res) => {
    try {
        const pool = await db;

        // Query all bans from the database
        const bans = await pool.request()
            .query('SELECT * FROM BanList');

        res.json(bans.recordset);
    } catch (err) {
        console.error('Error fetching bans:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET BAN BY ID
router.get('/GetBan/:id', async (req, res) => {
    const banId = req.params.id;
    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Query the ban by ID
        const ban = await pool.request()
            .input('id', banId)
            .query('SELECT * FROM BanList WHERE id = @id');

        if (!ban.recordset || ban.recordset.length === 0) {
            return res.status(404).json({ error: 'Ban not found' });
        }

        res.json(ban.recordset[0]);
    } catch (err) {
        console.error('Error fetching ban:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//ADD BAN
router.post('/AddBan', async (req, res) => {
    const {id, email, reason} = req.body;

    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Create new Ban object
        const newBan = new Ban(id, email, reason);

        // Insert new ban into database
        await pool.request()
            .input('id', newBan.id)
            .input('email', newBan.email)
            .input('reason', newBan.reason)
            .query('INSERT INTO BanList (id, email, reason) VALUES (@id, @email, @reason)');

        res.status(201).json(newBan);
    } catch (err) {
        console.error('Error adding ban:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//DETELE BAN BY ID
router.delete('/DeleteBan/:id', async (req, res) => {
    const banId = req.params.id;
    try {
        const pool = await db; // Assuming db is a Promise that resolves to a database connection pool

        // Find the ban by ID
        const ban = await pool.request()
            .input('id', banId)
            .query('SELECT * FROM BanList WHERE id = @id');

        if (!ban.recordset || ban.recordset.length === 0) {
            return res.status(404).json({ error: 'Ban not found' });
        }

        // Remove the ban from the database
        await pool.request()
            .input('id', banId)
            .query('DELETE FROM BanList WHERE id = @id');

        res.json({ message: 'Ban deleted successfully' });
    } catch (err) {
        console.error('Error deleting ban:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;