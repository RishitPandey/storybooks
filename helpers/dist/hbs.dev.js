"use strict";

var moment = require('moment');

module.exports = {
  formatDate: function formatDate(date, format) {
    return moment(date).format(format);
  },
  truncate: function truncate(str, len) {
    if (str.length > len && str.length > 0) {
      var new_str = str + ' ';
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(' '));
      new_str = new_str.length > 0 ? new_str : str.substr(0, len);
      return new_str + '...';
    }

    return str;
  },
  stripTags: function stripTags(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '');
  },
  editIcon: function editIcon(storyUser, loggedUser, storyId) {
    var floating = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (storyUser._id.toString() == loggedUser._id.toString()) {
      if (floating) {
        return "<a href=\"/stories/edit/".concat(storyId, "\" class=\"btn-floating halfway-fab blue\"><i class=\"fas fa-edit fa-small\"></i></a>");
      } else {
        return "<a href=\"/stories/edit/".concat(storyId, "\"><i class=\"fas fa-edit\"></i></a>");
      }
    } else {
      return '';
    }
  },
  select: function select(selected, options) {
    return options.fn(this).replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
  }
};