const express = require('express');
const router = express.Router();
const Usuario = require('../api/usuario');
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const {transporter , mailOptions} = require('../config/mail')
router.use(require('express-session')({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
router.get('/usuario/login',passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
    res.send(req.body);
});

router.get('/faillogin', (req, res) => {
    res.status(400).send({ error: 'usuario o contraseña invalida' });
});

router.post('/usuario/signup',passport.authenticate('signup', { failureRedirect: '/failsignup' }), (req, res) => {
    mailOptions.subject = "Nuevo Registro" 
    mailOptions.text = JSON.stringify(req.body)
    console.log(JSON.stringify(req.body))
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    })
    res.send(req.body);
});

router.get('/failsignup', (req, res) => {
    res.status(400).send({ error: 'fallo el signup' });
});

router.delete('/logout', (req, res) => {
    req.logout();
    res.send({ logout: 'ok' });
});

   passport.use('login', new LocalStrategy({
        passReqToCallback: true
    },
    async function (req, username, password, done) {
        const usuario = await Usuario.buscar(username);
        console.log(JSON.stringify(usuario))
        if (!usuario) {
            console.log('usuario no encontrado con el nombre:', username);
            return done(null, false, console.log('mensaje', 'usuario no encontrado'));
        } else {
            if (!isValidPassword(usuario, password)) {
                console.log('contraseña invalida');
                return done(null, false, console.log('mensaje', 'contraseña invalida'));
            } else {
                return done(null, usuario);
            }
        }
    })
    );
    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, async function (req, username, password, done) {
        const usuario = await Usuario.buscar();
        console.log(usuario)
        if (usuario) {
            return done(null, false, console.log('mensaje', 'usuario ya existe'));
        } else {
            const newUser = await Usuario.signup(req.body)
            return done(null, newUser);
        }
    })
    );
    const isValidPassword = (user, password) => {
        return bcrypt.compareSync(password, user.password);
    }
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        let user = Usuario.buscarPorId(id);
        return done(null, user);
    });
module.exports = router;