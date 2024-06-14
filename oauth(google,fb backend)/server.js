const express = require("express")
const cors = require("cors")
const passport = require('passport')
const googleAuth = require('passport-google-oauth20').Strategy
const facebookAuth = require('passport-facebook').Strategy
const session = require('express-session')

const app = express()
app.use(cors())

app.use(session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new googleAuth({
    clientID: "609346782632-bk9fmh36vuti6n3of99mh4resnhcqelv.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    (accessToken, refreshToken, profile, done) => {
        const user = {
            id: profile.id,
            name: profile.name,
            email: profile.email
        };
        return done(null, user)
    }
))

passport.use(new facebookAuth({
    clientID: "1122315602419254",
    clientSecret: "8b8c8a6b7540c9b26627b0a6e490c35a",
    callbackURL: 'http://localhost:5000/auth/facebook/callback'
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})
app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}))

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/error'
    })
)

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))


app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }));


const PORT = 5000
app.listen(PORT, () => {
    console.log('server running');
})
