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


/*
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
*/

//submit username, password
var submit = document.getElementById('submit_btn');
submit.onclick = function() {
    //make a request to the server and send the name
    //create a request object.
    var request = new XMLHttpRequest();
    
    //capture the response and store it in a variable.
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE)
        {
            //take some action
            if(request.status == 200)
            {
                alert('logged in successfully');
                /*
                var names = request.responseText;
                names = JSON.parse(names);
                var list = '';
                for (var i = 0; i < names.length; i++) {
                    list += '<li>' + names[i] + '</li>'; 
                }
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;*/
            } else if (request.status === 403) {
                alert(username, password);
                //alert('Username/password is incorrect');
            } else if (request.status === 500) {
                alert('Something went wrong on server side');
            }
        }
        //if not do nothing
    };
    
    //make a request
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    //var name = nameInput.value;
    console.log(username);
    console.log(password);
    //request.open('GET', 'http://abhishek1036cse16.imad.hasura-app.io/submit-name?name=' + name, true);
    request.open('POST', 'http://abhishek1036cse16.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
    
    //capture a list of names and render it as list
    
};