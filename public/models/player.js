(function(){
  'use strict'

  const Model = window.Model;

  class Player extends Model {
    constructor(index, scene, attributes = {}) {
      super(attributes);
      this.pirats = [];
      this.ids = [];
      this.index = index;
      this.scene = scene;

      //добавили обработчик на кастомное событие
      document.addEventListener("MeshLoading", this.OnMeshLoad.bind(this));
      this.myEvent = new CustomEvent("MeshLoading", {});

      if(index == 0){
        this.ids = [78, 78, 78];
      }

      if(index == 1){
        this.ids = [13*7-1, 13*7 - 1, 13*7 - 1];
      }

      BABYLON.SceneLoader.ImportMesh("Astronaut", "", "cosmo.babylon", scene, this.onSceneLoad.bind(this));
      this.gold = 0;
    }

    onSceneLoad(newMeshes) {
      this.pirats[0] = newMeshes[0];

      this.pirats[0].scaling = new BABYLON.Vector3(15,15,15);
    //  this.pirats[0].rotation.y = -Math.PI/2;
      this.pirats[0].renderingGroupId = 1;

      this.pirats[1] = this.pirats[0].clone("Astronaut1");
      this.pirats[2] = this.pirats[0].clone("Astronaut2");

      //вызвали событие (меши загрузились)
      document.dispatchEvent(this.myEvent);
    }

    OnMeshLoad(e){
        var x, y = 5, z = -35;
        var rotation;
        var red1 = new BABYLON.StandardMaterial("RedPirat",this.scene);
        var red2 = new BABYLON.StandardMaterial("RedPirat",this.scene);
        var red3 = new BABYLON.StandardMaterial("RedPirat",this.scene);

        if(this.index === 0){
          x = -600;
          rotation = -Math.PI/2;
        }
        else{
          x = 600;
          rotation = Math.PI/2;
        }

        red1.diffuseColor = new BABYLON.Color3(1,0,0);
        red2.diffuseColor = new BABYLON.Color3(1,0,0);
        red3.diffuseColor = new BABYLON.Color3(1,0,0);

      this.pirats[0].material = red1;
      this.pirats[1].material = red2;
      this.pirats[2].material = red3;

      this.pirats.forEach(function(elem){
        elem.position = new BABYLON.Vector3(x, y, z);
        elem.rotation.y = rotation;
        z += 35;
        elem.isPickable = false;
      })
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
