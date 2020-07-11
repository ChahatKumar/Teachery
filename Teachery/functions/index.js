const functions = require('firebase-functions');
const express = require('express');
const firebase = require('firebase-admin');
var bodyParser = require('body-parser');

const admin= firebase.initializeApp(
    functions.config().firebase
);
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views','./views');
app.set('view engine','ejs');

/**************************************************************** */

app.get('/home/:email',(request,response)=>{
      
       const x = request.params.email;
       response.render('index',{ID:x})    
     
});

app.post('/home',(request,response)=>{
   const x = request.body.email;
   response.redirect('/home/'+x);
});

app.get('/subject/:code',(request,response)=>{
  const code = request.params.code;
  response.render('subject',{code:code})
})

app.post('/subject',(request,response)=>{
  const code = request.body.code;
  response.redirect('/subject/'+ code)
})
exports.chahat = functions.https.onRequest(app);

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    return err;
  });
});
/**************************************************************************** */


