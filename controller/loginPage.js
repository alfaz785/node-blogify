const con = require("../connection/sqlDB");
const jwt = require('jsonwebtoken');
const secretKey = "alfaz";

// HANDLE LOGIN USER -----------------------------
const handleLoginUserData = (req, res) => {
    const { email, password } = req.body;
    const query = `INSERT INTO login (email, password) VALUES ('${email}', '${password}')`;

    const user = {
        email: email,
        password: password
    };
    con.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Server Error Or Email Is not Unique');
            return;
        }

        jwt.sign({ user }, secretKey, (err, token) => {
            if (err) {
                console.error('Error signing token:', err.stack);
                res.status(500).send('Server Error');
                return;
            }
            res.status(201).json({
                token,
                msg: 'Login Successfully'
            });
        });
    });
};

// HANDLE SIGNUP USER -----------------------------
const handleSignUpUser = (req, res) => {
    console.log(req.body);
    const { name, email, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }

    const query = `INSERT INTO \`sign-up\` (name, email, password, confirm_password) VALUES ('${name}', '${email}', '${password}', '${confirm_password}')`;

    const user = {
        email: email,
        password: password,
    };
    con.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Server Error Or Email Is not Unique');
            return;
        }

        jwt.sign({ user }, secretKey, (err, token) => {
            if (err) {
                console.error('Error signing token:', err.stack);
                res.status(500).send('Server Error');
                return;
            }
            res.status(201).json({
                token,
                msg: 'User Sign Up Successfully'
            });
        });
    });
};

// HANDLE GET USER DATA -----------------------------
const handleGetUserData = (req, res) => {
    con.query("SELECT * FROM personal", (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            res.status(500).send('Server Error');
            return;
        }
        res.json(results); // Send the results as JSON
    });
};

module.exports = {
    handleLoginUserData,
    handleGetUserData,
    handleSignUpUser
};
