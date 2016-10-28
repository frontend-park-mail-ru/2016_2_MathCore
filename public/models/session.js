(function(){
  'use strict'

  const Model = window.Model;

  class Session extends Model {
     constructor(attributes) {
       super(attributes);
     }

     url(id) {
      let url = 'https://java-heroku-test-victor.herokuapp.com/session/';
      if(id){
        return url;
      }
      return url;
 		}

    /* возможно, что-то ещё ....? */

  }

  window.Session = Session;
})();
