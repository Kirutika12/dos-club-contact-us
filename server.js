require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;


/* DATABASE */

const db = new Database("contact.db");


/* CREATE TABLE */

db.prepare(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();


/* ADD STATUS COLUMN IF NEEDED */

const columns = db.prepare("PRAGMA table_info(messages)").all();

const hasStatus = columns.some(function(column) {
    return column.name === "status";
});

if (!hasStatus) {

    db.prepare(`
        ALTER TABLE messages
        ADD COLUMN status TEXT DEFAULT 'Unread'
    `).run();

}


/* MIDDLEWARE */

app.use(express.json());

app.use(session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }

}));


/* ADMIN PAGE PROTECTION */

app.get("/admin.html", function(req, res) {

    if (!req.session.isAdmin) {

        return res.redirect("/admin-login.html");

    }

    res.sendFile(__dirname + "/admin.html");

});


/* STATIC FILES */

app.use(express.static("."));


/* ADMIN LOGIN */

const adminUsername = process.env.ADMIN_USERNAME;

const adminPasswordHash =
    bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);


app.post("/api/login", async function(req, res) {

    const { username, password } = req.body;


    if (username !== adminUsername) {

        return res.json({
            success: false,
            message: "Invalid username or password"
        });

    }


    const passwordMatch =
        await bcrypt.compare(
            password,
            adminPasswordHash
        );


    if (!passwordMatch) {

        return res.json({
            success: false,
            message: "Invalid username or password"
        });

    }


    req.session.isAdmin = true;


    res.json({
        success: true,
        message: "Login successful"
    });

});


/* CONTACT FORM */

app.post("/api/contact", function(req, res) {

    const {
        name,
        email,
        phone,
        subject,
        message
    } = req.body;


    const insert = db.prepare(`
        INSERT INTO messages
        (name, email, phone, subject, message)
        VALUES (?, ?, ?, ?, ?)
    `);


    insert.run(
        name,
        email,
        phone,
        subject,
        message
    );


    console.log("Message saved to database!");


    res.json({
        success: true,
        message: "Message saved successfully"
    });

});


/* GET MESSAGES */

app.get("/api/messages", function(req, res) {

    if (!req.session.isAdmin) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }


    const messages = db
        .prepare(
            "SELECT * FROM messages ORDER BY id DESC"
        )
        .all();


    res.json(messages);

});


/* DELETE MESSAGE */

app.delete("/api/messages/:id", function(req, res) {

    if (!req.session.isAdmin) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }


    const id = req.params.id;


    db.prepare(
        "DELETE FROM messages WHERE id = ?"
    ).run(id);


    res.json({
        success: true,
        message: "Message deleted successfully"
    });

});


/* MARK MESSAGE AS READ */

app.patch("/api/messages/:id/read", function(req, res) {

    if (!req.session.isAdmin) {

        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

    }


    const id = req.params.id;


    db.prepare(
        "UPDATE messages SET status = 'Read' WHERE id = ?"
    ).run(id);


    res.json({
        success: true,
        message: "Message marked as read"
    });

});


/* LOGOUT */

app.get("/api/logout", function(req, res) {

    req.session.destroy(function(error) {

        if (error) {

            return res
                .status(500)
                .send("Unable to logout");

        }


        res.redirect("/admin-login.html");

    });

});


/* START SERVER */

app.listen(PORT, function() {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});