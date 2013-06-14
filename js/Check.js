/**
 * Features ckecker in the browser. Instead of the modernizr.
 */
var Check = {
    getUserMedia: function () {
        return !!(navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);
    },

    canvas: function () {
        return !!window.HTMLCanvasElement;
    }
};