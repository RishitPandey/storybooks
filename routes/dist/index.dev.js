"use strict";

var express = require('express'),
    _require = require('../middleware/auth'),
    ensureAuth = _require.ensureAuth,
    ensureGuest = _require.ensureGuest,
    Story = require('../models/Story'),
    router = express.Router(); //* @desc   Login/Landing Page
//* @route GET /


router.get('/', ensureGuest, function (req, res) {
  res.render('login', {
    layout: 'login'
  });
}); //* @desc Dashboard
//* @route GET /dashboard

router.get('/dashboard', ensureAuth, function _callee(req, res) {
  var stories;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Story.find({
            user: req.user.id
          }).lean());

        case 3:
          stories = _context.sent;
          res.render('dashboard', {
            name: req.user.firstName,
            stories: stories
          });
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.render('error/500');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;