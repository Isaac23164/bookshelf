const express = require('express');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/config').get(process.env.NODE_ENV);
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, { useNewUrlParser: true });

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');

app.use(bodyParse.json());
app.use(cookieParser());

//GET
app.get('/api/auth', auth, (req, res) => {
    res.json({isAuth: true, user: req.user});
})

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    })
    
})

app.get('/api/getBook', (req, res) => {
    let id = req.query.id;
    //console.log('id:' + JSON.stringify(id));
    
    Book.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        return res.send(doc);
    })
})

app.get('/api/books', (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    //order = asc || desc
    Book.find().skip(skip).sort({name:order}).limit(limit).exec((err, doc)=>{    
        if (err) return res.status(400).send(err);
        res.send(doc);

    })

})

app.get('/api/getReviewer', (req, res) => {
    let id = req.query.id;

    User.findById(id, (err,doc) => {
        if (err) return res.status(400).send(err);
        res.json({name: doc.name, lastname: doc.lastname});
    })
})

app.get('/api/users', (req, res) => {
    User.find({}, (err,users) => {
        res.status(200).send(users);
    })
})

app.get('/api/user_posts', (req, res) => {
    Book.find({ownerId: req.query.user}).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc)
    })
})

//POST
app.post('/api/book', (req, res) => {
    const book = new Book(req.body);

    book.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body);

    user.save((err,doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            user: doc
        })
    })
})

app.post('/api/login', (req, res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.json({isAuth: false, message: 'Auth failed no email'});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({isAuth: false, message: 'wrong password'});
            
            user.generateToken((err, User) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token , {sameSite:'none', secure:true}).send({isAuth: true, id: user._id, email: user.email });
            })
        })
    })
})


//UPDATE
app.post('/api/book_update', (req, res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err,doc) => {
        if (err) return res.status(400).send(err);
        res.json({success: true, doc})
    })
})


//DELETE
app.delete('/api/deletebook', (req, res) => {
    let id = req.query.id;

    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true);

    })
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Server Running...');
})