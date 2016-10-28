(function(){
  'use strict'

  const Model = window.Model;

  class User extends Model {
     constructor(attributes) {
       super(attributes);
     }

     /* пока для осторожности прописываем url напрямую */
     url(id) {
      let url = 'https://java-heroku-test-victor.herokuapp.com/user/';
      if(id){
        return url;
      }
      return url;
 		}

  }

  window.User = User;
})();
