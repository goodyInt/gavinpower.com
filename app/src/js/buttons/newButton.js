var jquery = require('jquery');
var newButton = function (label) {
    return jquery('<button/>').html(label).on('click', function () {
        alert("hi it works: " + label)
    });
}
module.exports = newButton;