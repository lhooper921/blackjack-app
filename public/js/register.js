$(document).ready(function() {
    // Getting references to our form and input
    var submitBtn = $("#sub");
    var firstName = $("#firstNameInput");
    var lastName = $("#lastNameInput");
    var email = $("#emailInput");
    var userName = $("#userNameInput");
    var password = $("#passwordInput");
  
    // When the signup button is clicked, we validate the email and password are not blank
    submitBtn.on("click", function(event) {
      event.preventDefault();
      console.log("check1");
      var userData = {
        firstName: firstName.val().trim(),
        lastName: lastName.val().trim(),
        userName: userName.val().trim(),
        email: email.val().trim(),
        password: password.val().trim()
      };
  
      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName || !userData.userName) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.firstName, userData.lastName, userData.userName, userData.email, userData.password);
      email.val("");
      password.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(firstName, lastName, userName, email, password) {

      $.post("/api/signup", {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      })
        .then(function(data) {
          window.location.replace("/login");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  