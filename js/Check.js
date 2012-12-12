/**
 * Features ckecker in the browser. Instead of modernizr.
 */
var Check = {
    getUserMedia: function(){
        return !!(navigator.getUserMedia || navigator.webkitGetUserMedia);
    },

    filter: function(){
        return ('WebkitFilter' in document.body.style
            || 'MozFilter' in document.body.style
            || 'MSFilter' in document.body.style
            || 'OFilter' in document.body.style
            || 'filter' in document.body.style);
    },

    canvas: function(){
        return !!window.HTMLCanvasElement;
    }
};