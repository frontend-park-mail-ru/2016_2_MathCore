(function(){
  'use strict'

  const Model = window.Model;

  class Session extends Model {
    constructor(attributes) {
      super(attributes);
    }

    login(login){
      this._login = login;
    }

    isAuthorised(){
      return this.send("GET", null, this.url(null, true), "isAuthorised/");
    }

    getLogin(){
      return this._login;
    }


    // получаем базовый урл
    url(id,base=false) {
      let url = 'https://java-heroku-test-victor.herokuapp.com/';
      if(id){
        return base?url:url+"session/";
      }
      return base?url:url+"session/";
    }

  }

  window.Session = Session;
})();
