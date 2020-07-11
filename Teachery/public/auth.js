auth.onAuthStateChanged(user => {
    if (user) {
    console.log('user logged in: ', user.email);
    alert('user logged in: ', user.email)
    } else {
     console.log("loged out")
  }
})

  // sign up
  const signupForm = document.querySelector('#signup');
  signupForm.addEventListener('submit', (e) => {
   
    const email= document.getElementById('email1').value;
    console.log(email);
    const password= document.getElementById('psw1').value; 
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      // close the signup modal & reset form
          console.log(email);
      });
  });
  
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
  
      auth.signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login');
  loginForm.addEventListener('submit', (e) => {
    console.log(loginForm)
    const email=document.getElementById('email2').value;
    const password=document.getElementById('psw2').value; 
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
    });
  
  });