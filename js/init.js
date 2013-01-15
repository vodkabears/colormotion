var addthis_config = {
    data_track_clickback: false
};

var addthis_share = {
    title: "Colormotion",
    description: "HTML5 experiment"
};

var init = function(){
    if( Check.canvas()&&
        Check.getUserMedia()){
        new App();
    } else {
        document.getElementById('notSupportedSection').style.display = 'block';
    }
};

if(document.addEventListener){
    document.addEventListener('DOMContentLoaded', init);
} else {
    window.onload = init;
}
