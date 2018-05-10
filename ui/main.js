function loadLoginForm() {
    var loginHtml = `
        <div class="form">
          <h4>LOG IN</h4>
            <p>
              <label for="username">USERNAME</label>
              <input name="username" id="username" title="USERNAME" maxlength="25" type="text" size="40" autofocus />
            </p>
            <p>
              <label for="password">PASSWORD</label>
              <input name="password" id="password" autocomplete="off" type="password" maxlength="50" size="40" />
            </p>
            <div class="btn">
              <input id="submit_btn" type="submit" value="Login" />
            </div>
        </div>
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    var submit = document.getElementById('submit_btn');
    submit.onclick = function() {
        //make a request to the server and send the name
        //create a request object.
        var request = new XMLHttpRequest();
        
        //capture the response and store it in a variable.
        request.onreadystatechange = function() {
            if(request.readyState === XMLHttpRequest.DONE)
            {
                //take some action
                if(request.status === 200)
                {
                    submit.value = 'Sucess!';
                } else if (request.status === 403) {
                    submit.value = 'Invalid credentials. Try again?';
                } else if (request.status === 500) {
                    alert('Something went wrong on server side');
                    submit.value = 'Login';
                }
                else {
                    alert('Something went wrong on the server');
                    submit.value = 'Login';
                }
                loadLogin();
            }
        };
        //make a request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        //var name = nameInput.value;
        console.log(username);
        console.log(password);
        //request.open('GET', 'http://abhishek1036cse16.imad.hasura-app.io/submit-name?name=' + name, true);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        submit.value = 'Logging in ....';
        //capture a list of names and render it as list
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
    
        <div id="map" height=600 width = 500></div>
  var map;
       // TODO: Complete the following function to initialize the map
     function initMap() {
         // TODO: use a constructor to create a new map JS object. You can use the coordinates
         // we used, 40.7413549, -73.99802439999996 or your own!
  	   map = new google.maps.Map(document.getElementById('map'), {
  	   center: {lat: 40.7413549, lng: -73.99802439999996},
  	   zoom: 13
  	   });
       var tribeca = {lat: 40.719526, lng: -74.0089934};
       var marker = new google.maps.Marker({
         position: tribeca,
         map: map,
         title: 'First Marker'
       })
     }
     
     </script>
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD5Zsw3lYl-eoR-RLe50jb3gea3FcPhXnM&v=3&callback=initMap">
    </script> 
    `;
}

function loadLogin() {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

loadLogin();