console.log('Loaded!');

// changing the content to main-txt div

var element = document.getElementById('main-txt');
element.innerHTML = "New Text";

// Moving the image to right when clicked
    
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function() {
    var interval = setInterval(moveRight, 50);
};
