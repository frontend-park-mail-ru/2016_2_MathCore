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

      document.addEventListener("MeshLoading", this.OnMeshLoad.bind(this));
      this.MeshLoadEvent = new CustomEvent("MeshLoading", {});

      if(index == 0){
        this.ids = [78, 78, 78];
      }

      if(index == 1){
        this.ids = [13*7-1, 13*7 - 1, 13*7 - 1];
      }

      BABYLON.SceneLoader.ImportMesh("", "static/cosmo_babylon/", "cosmo.babylon", scene, this.onSceneLoad.bind(this));
      BABYLON.SceneLoader.ImportMesh("", "static/ufo_babylon/", "ufo.babylon", scene, this.onShipLoad.bind(this));
      this.gold = 0;
    }

    onSceneLoad(newMeshes) {
      this.pirats[0] = newMeshes[0];
      this.pirats[0].scaling = new BABYLON.Vector3(25,25,25);
      this.pirats[0].renderingGroupId = 1;

      this.pirats[1] = this.pirats[0].clone("Astronaut1");
      this.pirats[2] = this.pirats[0].clone("Astronaut2");

      this.pirats[1].material = this.pirats[0].material.clone("Material1");
      this.pirats[2].material = this.pirats[0].material.clone("Material2");

      document.dispatchEvent(this.MeshLoadEvent);
    }

    onShipLoad(newMeshes){
      let y = 40, z = 0;
      let x = this.index === 0 ? -700 : 700;
      this.ship = [];
      for(let j = 1; j < newMeshes.length; j++){
        this.ship[j] = newMeshes[j].clone("ShipPart"+j);
        this.ship[j].scaling = new BABYLON.Vector3(4,4,4);
        this.ship[j].renderingGroupId = 1;
      }
      this.set_ship_position(new BABYLON.Vector3(x,y,z));
      this.set_ship_light()
    }

    set_ship_position(position){
      this.ship.forEach(function(elem){
        elem.position = position;
      })
    }

    set_ship_light(){
      this.ship.forEach(function(elem){
        elem.material.diffuseColor = new BABYLON.Color3(1,0,0);
      })
    }

    unset_ship_light(){
      this.ship.forEach(function(elem){
        elem.material.emissiveColor = new BABYLON.Color3(0,0,0);
      })
    }

    OnMeshLoad(e){
        let x, y = 20, z = -35;
        let rotation;

        if(this.index === 0){
          x = -600;
          rotation = -Math.PI/2;
        }
        else{
          x = 600;
          rotation = Math.PI/2;
        }

        this.pirats.forEach(function(elem){
          elem.position = new BABYLON.Vector3(x, y, z);
          elem.rotation.y = rotation;
          z += 35;
          elem.isPickable = false;
          //elem.isVisible = false;
        })
    }

    url(id){

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

  window.Player = Player;
})();
