/**
 * Root class
 *
 * @constructor
 */
function App() {
    "use strict";

    var video = document.getElementById('webcam'),
        output = document.getElementById('blended'),
        outputCtx = output.getContext('2d'),
        appTitle = document.getElementById('appTitle'),
        startButton = document.getElementById('startButton'),
        isStarted = false,
        md;

    var startSection = document.getElementById('startSection'),
        notSupportedSection = document.getElementById('notSupportedSection'),
        webcamUnreadySection = document.getElementById('webcamUnreadySection');

    var params = {
        pInterval: 10,
        pRadius: 13
    };

    /**
     * Cross-browser requestAnimationFrame function
     *
     * @private
     */
    var requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    /**
     * Object for making color transitions
     *
     * @private
     */
    var transitionColor = {
        color: [255, 0, 0],
        current: 0,
        next: 1,
        transition: function(){
            if(this.color[this.current] <= 0){
                this.current = this.next++;
                if(this.current === 2){
                    this.next = 0;
                }
            }
            this.color[this.next] += 4;
            this.color[this.current] -= 4;
        }
    };

    /**
     * Motion detector initialization and setting
     *
     * @private
     */
    var mdInit = function(){
        //create new MotionDetector object
        md = new MotionDetector(video, output);

        //Set handler of a difference in a pixel.
        md.onDifference = function(ctx, e){
            if(Math.random() > 0.96){
                ctx.fillStyle = 'rgb(' + transitionColor.color[0] + ', ' + transitionColor.color[1] + ', ' + transitionColor.color[2] + ')';
                ctx.beginPath();
                ctx.arc(e.x, e.y, 15 * Math.random(), 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
            }
        };

        //Set handler of a motion detector update.
        md.onUpdate = function(ctx){
            ctx.fillStyle = 'rgba(180, 180, 180, 0.1)';
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            transitionColor.transition();
        };
    };

    /**
     * Animation
     *
     * @private
     */
    var animate = function () {
        if(isStarted){
            md.update();
        } else {
            appTitle.style.color = 'rgb(' + transitionColor.color[0] + ', ' + transitionColor.color[1] + ', ' + transitionColor.color[2] + ')';
            transitionColor.transition();
        }

        requestAnimFrame(animate);
    };

    /**
     * Creating event listeners
     *
     * @private
     */
    var createEventListeners = function(){
        startButton.addEventListener('click', function(){
            startSection.style.display = 'none';

            if (navigator.getUserMedia) {
                navigator.getUserMedia({video: true}, function (stream) {
                    video.src = stream;
                    mdInit();
                    isStarted = true;
                }, function () {
                    webcamUnreadySection.style.display = 'block';
                });
            } else if (navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia({video: true}, function (stream) {
                    video.src = window.webkitURL.createObjectURL(stream);
                    mdInit();
                    isStarted = true;
                }, function () {
                    webcamUnreadySection.style.display = 'block';
                });
            }
        });
    };

    /**
     * Local constructor
     *
     * @private
     */
    var constructor = function () {
        startSection.style.display = 'block';
        createEventListeners();
        animate();
    };

    //calling the local constructor
    constructor();
}