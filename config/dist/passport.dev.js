"use strict";

var googlestrategy = require('passport-google-oauth20').Strategy,
    mongoose = require('mongoose'),
    User = require('../models/User');

module.exports = function (passport) {
  passport.use(new googlestrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, function _callee(accessToken, refreshToken, profile, done) {
    var newUser, user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(profile);
            newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value
            };
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(User.findOne({
              googleId: profile.id
            }));

          case 5:
            user = _context.sent;

            if (!user) {
              _context.next = 10;
              break;
            }

            done(null, user);
            _context.next = 14;
            break;

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(User.create(newUser));

          case 12:
            user = _context.sent;
            done(null, user);

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 16]]);
  }));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};