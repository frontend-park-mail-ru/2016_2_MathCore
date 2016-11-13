(function(){
  'use strict'

  const Model = window.Model;

  class Player extends Model {
    constructor(ids, scene, attributes = {}) {
      super(attributes);
      this.pirats = [];

      var redMaterial = new BABYLON.StandardMaterial("RedPirat",scene);
      var redMaterial1 = new BABYLON.StandardMaterial("RedPirat",scene);
      var redMaterial2 = new BABYLON.StandardMaterial("RedPirat",scene);

      redMaterial1.diffuseColor = new BABYLON.Color3(0.8,0,0);
      redMaterial.diffuseColor = new BABYLON.Color3(1,0,0);
      redMaterial2.diffuseColor = new BABYLON.Color3(0.4,0,0);

      var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 16, scene);
      var pirat1 = BABYLON.Mesh.CreateSphere("pirat1", 16, 16, scene);
      var pirat2 = BABYLON.Mesh.CreateSphere("pirat2", 16, 16, scene);

      /*
      var params = {
        1: {
          'position' : new BABYLON.Vector3(-400, 15, 0),
          'ids': [[44,55,66],[44,55,66],[44,55,66]],
        },
        2: {
          'position' : new BABYLON.Vector3(-400, 15, 0),
        }

      }*/

      sphere.position = new BABYLON.Vector3(-400, 15, 0);
      pirat1.position = new BABYLON.Vector3(-400, 15, 20);
      pirat2.position = new BABYLON.Vector3(-400, 15, -20);

      sphere.material = redMaterial;
      pirat1.material = redMaterial1;
      pirat2.material = redMaterial2;

      sphere.renderingGroupId = 1;
      pirat1.renderingGroupId = 1;
      pirat2.renderingGroupId = 1;

      this.pirats[0] = sphere;
      this.pirats[1] = pirat1;
      this.pirats[2] = pirat2;

      this.ids = ids;
      this.gold = 0;
    }

    url(id){
      //связь с сервером и т.д.
    }

    set_ids(newIds){
      this.ids = newIds;
    }

    set_gold(newNumber){
      this.gold = newNumber;
    }

    get_pirats(){
      return this.pirats;
    }

    get_ids(){
      return this.ids;
    }

    get_gold(){

    }

    destroy_pirat(mesh){

    }

  }

  //export
  window.Player = Player;
})();
