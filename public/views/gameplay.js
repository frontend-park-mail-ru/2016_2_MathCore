(function () {
	'use strict';

	const View = window.View;
	const Player = window.Player;

	class GamePlayView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-canvas');

      this.init();
      this.show();

      var engine = new BABYLON.Engine(this._el, true);
      var canvas = this._el;

      var createScene = function(){
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3,
				                                        12, new BABYLON.Vector3(0,100,0), scene);
        camera.lowerBetaLimit = 0.1;
        camera.lowerRadiusLimit = 30;
        camera.upperRadiusLimit = 250;
        camera.attachControl(canvas, true);
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = .5;
        return scene;
      }

      var scene = createScene();

			const player1 = new Player([[44,55,66],[44,55,66],[44,55,66]], scene, {});
			var pirats = player1.get_pirats();
			var possibleIds = player1.get_ids();

			this.createSkyBox(scene);
			var gameField = this.createGameField(scene);
			this.game_init(possibleIds, gameField, pirats, scene);

      engine.runRenderLoop(function () {
        scene.render();
      })

      window.addEventListener("resize", function () {
        engine.resize();
      });
		}

		init(options = {}) {
      var video = document.querySelector('.bgvideo');
      video.hidden = true;
		}

	  createSkyBox(scene){
			var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
			var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
			skyboxMaterial.backFaceCulling = false;
			skyboxMaterial.disableLighting = true;
			skybox.material = skyboxMaterial;
			skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
			skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
			skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("sky34/sky34", scene);
			skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
			skybox.renderingGroupId = 0;
		}

		createGameField(scene){
			 var xmin = -400,  zmin = -400;
			 var xmax =  400,  zmax =  400;
			 var precision = {"w" : 1, "h" : 1};
			 var subdivisions = {'h' : 11, 'w' : 11};

			 var tiledGround = new BABYLON.Mesh.CreateTiledGround("Tiled Ground", xmin, zmin, xmax, zmax,
																														 subdivisions, precision, scene);
			 var LightGreen = new BABYLON.StandardMaterial("LGreen", scene);
			 LightGreen.diffuseTexture = new BABYLON.Texture("texture1.1.jpg", scene);
			 LightGreen.bumpTexture = new BABYLON.Texture("normalMap.jpg", scene);
			 LightGreen.emissiveColor = new BABYLON.Color3(0, 0.5 , 0);

			 var bumpMaterial = new BABYLON.StandardMaterial("bumpMaterial", scene);
			 bumpMaterial.diffuseTexture = new BABYLON.Texture("texture1.1.jpg", scene);
			 bumpMaterial.bumpTexture = new BABYLON.Texture("normalMap.jpg", scene);
			 bumpMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5 , 0.5);

			 var DarkGreen = new BABYLON.StandardMaterial("DGreen", scene);
			 DarkGreen.diffuseColor = new BABYLON.Color3(0, 1, 0);

			 var multimat = new BABYLON.MultiMaterial("multi", scene);
			 multimat.subMaterials.push(LightGreen);
			 multimat.subMaterials.push(bumpMaterial);

			 tiledGround.material = multimat;
			 tiledGround.renderingGroupId = 1;
			 var verticesCount = tiledGround.getTotalVertices();
			 var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);

			 tiledGround.subMeshes = [];
			 var base = 0;
			 for (var row = 0; row < subdivisions.h; row++) {
					 for (var col = 0; col < subdivisions.w; col++) {
								 new BABYLON.SubMesh(1, 0, verticesCount, base , tileIndicesLength, tiledGround);
								 base += tileIndicesLength;
					 }
			 }

			 return tiledGround;
		 }



		 game_init(Ids, gameField, pirats, scene){
			 var condition = false;
			 var pirat, mesh;
			 var index;
			 var sphere = pirats[0];
 			 var pirat1 = pirats[1];
 			 var pirat2 = pirats[2];
			 scene.onPointerDown = function(evt, pickResult){
				 if(pickResult.hit){
					 pirat = pickResult.pickedMesh;
					 if((pirat == sphere)||(pirat == pirat1)||(pirat == pirat2)){
						 mesh = pirat;
						 mesh.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
						 //----------------------------------------------------
						 if(mesh == sphere){
							 index = 0;
						 }
						 if(mesh == pirat1){
							 index = 1;
						 }
						 if(mesh == pirat2){
							 index = 2;
						 }
						 //-----------------------------------------------------
						 for (var i = 0; i < Ids[index].length; ++i){
							 gameField.subMeshes[Ids[index][i]].materialIndex = 0;
						 }
						 condition = true;
					 }
					 if((pirat == gameField)&&(condition == true)){
						 var id = pickResult.subMeshId;
						 if(Ids[index].indexOf(id) != -1){
							 mesh.position.x = pickResult.pickedPoint.x;
							 mesh.position.z = pickResult.pickedPoint.z;
							 mesh.material.diffuseColor = new BABYLON.Color3(1,0,0);
							 condition = false;
							 for (var i = 0; i < Ids[index].length; ++i){
								 gameField.subMeshes[Ids[index][i]].materialIndex = 1;
							 }
							 Ids[index] = [id+11, id-11, id+1, id-10, id+12, id - 1, id +10, id -12];
						 }
					 }
				 }
			 }
		 }

	}


	// export
	window.GamePlayView = GamePlayView;

})();
