/**
 * Features ckecker in the browser. Instead of the modernizr.
 */
var Check = {
    getUserMedia: function(){
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia);
    },

    canvas: function(){
        return !!window.HTMLCanvasElement;
    }
};