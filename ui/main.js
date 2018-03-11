/*
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
*/
// Counter code

var button = document.getElementById('counter');
//var counter = 0;

button.onclick = function() {
    //create a request object.
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable.
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status == 200)
            {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        //if not do nothing
    };
    
    //make a request
    request.open('GET', 'http://abhishek1036cse16.imad.hasura-app.io/counter', true);
    request.send(null);
    
    //render the variable in the correct span.
    //counter = counter + 1;
    //var span = document.getElementById('count');
    //span.innerHTML = counter.toString();
};

//submit name

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    //make a request to the server and send the name
    
    //capture a list of names and render it as list
    var names = ['name1', 'name2', 'name3', 'name4'];
    var list = '';
    for (var i = 0; i < names.length; i++) {
        list += '<li>' + names[i] + '</li>'; 
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};