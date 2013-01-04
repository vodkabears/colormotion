var addthis_config = {
    data_track_clickback: false
};

var addthis_share = {
    title: "Colormotion",
    description: "HTML5 experiment"
};

var init = function(){
    if( Check.canvas()&&
        Check.filter() &&
        Check.getUserMedia() &&
        Check.browser()){
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
