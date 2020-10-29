"use strict";

var express = require('express'),
    _require = require('../middleware/auth'),
    ensureAuth = _require.ensureAuth,
    Story = require('../models/Story'),
    router = express.Router(); //* @desc   show add page
//* @route GET /stories/add


router.get('/add', ensureAuth, function (req, res) {
  res.render('stories/add');
}); //* @desc   process add form
//* @route POST /stories

router.post('/', ensureAuth, function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          req.body.user = req.user.id;
          _context.next = 4;
          return regeneratorRuntime.awrap(Story.create(req.body));

        case 4:
          res.redirect('/dashboard');
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.render('/error/500');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //* @desc   show all stories
//* @route GET /stories

router.get('/', ensureAuth, function _callee2(req, res) {
  var stories;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Story.find({
            status: 'public'
          }).populate('user').sort({
            createdAt: 'desc'
          }).lean());

        case 3:
          stories = _context2.sent;
          res.render('stories/index', {
            stories: stories
          });
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.render('error/500');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //* @desc   show edit page
//* @route GET /stories/edit/:id

router.get('/edit/:id', ensureAuth, function _callee3(req, res) {
  var story;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Story.findOne({
            _id: req.params.id
          }).lean());

        case 3:
          story = _context3.sent;

          if (story) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.render('error/404'));

        case 6:
          if (story.user != req.user.id) {
            res.redirect('/stories');
          } else {
            res.render('stories/edit', {
              story: story
            });
          }

          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.render('error/500');

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //* @desc   update story page
//* @route PUT /stories/:id

router.put('/:id', ensureAuth, function _callee4(req, res) {
  var story;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Story.findById(req.params.id).lean());

        case 3:
          story = _context4.sent;

          if (story) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.render('error/404'));

        case 6:
          if (!(story.user != req.user.id)) {
            _context4.next = 10;
            break;
          }

          res.redirect('/stories');
          _context4.next = 14;
          break;

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(Story.findOneAndUpdate({
            _id: req.params.id
          }, req.body, {
            "new": true,
            runValidators: true
          }));

        case 12:
          story = _context4.sent;
          res.redirect('/dashboard');

        case 14:
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          return _context4.abrupt("return", res.render('error/500'));

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); //* @desc   delete story page
//* @route DELETE /stories/:ids

router["delete"]('/:id', ensureAuth, function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Story.remove({
            _id: req.params.id
          }));

        case 3:
          res.redirect('/dashboard');
          _context5.next = 10;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.render('error/500');

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); //* @desc   show signle story
//* @route GET /stories/:id

router.get('/:id', ensureAuth, function _callee6(req, res) {
  var story;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Story.findById(req.params.id).populate('user').lean());

        case 3:
          story = _context6.sent;

          if (story) {
            _context6.next = 6;
            break;
          }

          return _context6.abrupt("return", res.render('error/404'));

        case 6:
          res.render('stories/show', {
            story: story
          });
          _context6.next = 13;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.render('error/404');

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); //* @desc   show user stories
//* @route GET /stories/user/:userId

router.get('/user/:userId', ensureAuth, function _callee7(req, res) {
  var stories;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Story.find({
            user: req.params.userId,
            status: 'public'
          }).populate('user').lean());

        case 3:
          stories = _context7.sent;
          res.render('stories/index', {
            stories: stories
          });
          _context7.next = 11;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.render('error/500');

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
module.exports = router;