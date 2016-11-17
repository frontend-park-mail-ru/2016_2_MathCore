(function(){
  'use strict'

  const Model = window.Model;

  class Player extends Model {
    constructor(index, scene, attributes = {}) {
      super(attributes);
      this.pirats = [];
      this.ids = [];
      this.index = index;

      var x, y = 15, z = 0;

      if(index == 0){
        this.ids = [78, 78, 78];
        x = -600;
      }

      if(index == 1){
        this.ids = [13*7-1, 13*7 - 1, 13*7 - 1];
        x = 600;
      }

      var red1 = new BABYLON.StandardMaterial("RedPirat",scene);
      var red2 = new BABYLON.StandardMaterial("RedPirat",scene);
      var red3 = new BABYLON.StandardMaterial("RedPirat",scene);

      red1.diffuseColor = new BABYLON.Color3(1,0,0);
      red2.diffuseColor = new BABYLON.Color3(1,0,0);
      red3.diffuseColor = new BABYLON.Color3(1,0,0);

      /*let pirat0, pirat1, pirat2;

      BABYLON.SceneLoader.ImportMesh("Astronaut", "", "cosmo.babylon", scene, function (newMeshes) {
      pirat0 = newMeshes[0];

      pirat0.scaling = new BABYLON.Vector3(15,15,15);
      pirat0.rotation.y = -Math.PI/2;
      pirat0.material = red1;
      pirat0.position = new BABYLON.Vector3(-610,15,0);
      pirat0.renderingGroupId = 1;

      pirat1 = pirat0.clone("pirat1");
      pirat2 = pirat0.clone("pirat2");

      pirat1.material = red2;
      pirat1.position.z += 40;
      pirat1.renderingGroupId = 1;

      pirat2.material = red3;
      pirat2.position.z -= 40;
      pirat2.renderingGroupId = 1;

    });*/

      this.pirats[0] = BABYLON.Mesh.CreateSphere("sphere1", 16, 16, scene);
      this.pirats[1] = BABYLON.Mesh.CreateSphere("sphere2", 16, 16, scene);
      this.pirats[2] = BABYLON.Mesh.CreateSphere("sphere3", 16, 16, scene);

      this.pirats[0].material = red1;
      this.pirats[1].material = red2;
      this.pirats[2].material = red3;

      this.pirats.forEach(function(elem){
        elem.position = new BABYLON.Vector3(x, y, z);
        z += 20;
        elem.renderingGroupId = 1;
        elem.isPickable = false;
      })

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

    get_index(){
      return this.index;
    }

    get_gold(){

    }

    destroy_pirat(mesh){

    }

  }

  //export
  window.Player = Player;
})();
