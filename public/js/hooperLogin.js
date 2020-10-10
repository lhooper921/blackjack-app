$(document).ready(function() {
    // Getting references to our form and inputs
    var onlyForm = $("form");
    var userNameInput = $("#username");
    var passwordInput = $("#passwordInput");

    onlyForm.on("submit", function(event) {
        event.preventDefault();

        console.log(userNameInput.val());

        var userData = {
            userName: userNameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if(!userData.userName || !userData.password){
            return;
        }

        loginUser(userData.userName, userData.password);
        userNameInput.val("");
        passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(userName, password) {
      $.post("/api/login", {
        userName: userName,
        password: password
      })
        .then(function() {
          window.location.replace("/index");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });
  