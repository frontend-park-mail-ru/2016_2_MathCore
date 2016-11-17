(function () {
	'use strict';

	const View = window.View;
	const Player = window.Player;
	const MessagingTools = window.MessagingTools;

	class GamePlayView extends View {
		constructor(options = {}) {
			super(options);
			this._el = document.querySelector('.js-canvas');
			this.allowGameStart = false;

      this.init();
      this.show();

      //потом сюда надо будет вбить урл сервера
			//---------------------------------------------------------------------
      //var socket = new WebSocket("ws://localhost:8080/game");
      var socket = new WebSocket("wss://java-heroku-test-victor.herokuapp.com/game");
            var messaging = new MessagingTools(socket);
      socket.onopen = function () {
        // Socket open.. start the game loop.
        console.log('Info: WebSocket connection opened.');
        console.log('Info: Waiting for another player...');
      };

      function Send(){
      	messaging.sendJoinGameMsg();
      }

      setTimeout(Send,1500);
      socket.onclose = function () {
        console.log('Info: WebSocket closed.');
      };


      socket.onmessage = function (event) {
      	var content = {};
        var responseContent = {};
        var response = {};
        var message = JSON.parse(event.data);
        if (message.type === "ru.mail.park.websocket.MessageToClient$Request") {
            content = JSON.parse(message.content);
            responseContent.myMessage = content.myMessage;
            console.log(responseContent.myMessage);
            return;
        }
        if ( message.type === "ru.mail.park.mechanics.requests.BoardMapForUsers$Request"){
            console.log("Wow. Seems loke game been started");
            content = JSON.parse(message.content);
            gameCellIds = content.gameBoard;
            gameCellIds = gameCellIds.split(",");
            for(var j = 0; j < gameCellIds.length; j++){
            	gameCellIds[j]= +gameCellIds[j];
            };
            if(content.active){
            	thisPlayer = player1;
            	enemy = player2;
            	var pirats1 = player1.get_pirats();
            	pirats1.forEach(function(elem){
            		elem.isPickable = true;
            	});
            }
            else{
            	thisPlayer = player2;
            	enemy = player1;
            	var pirats2 = player2.get_pirats();
            	pirats2.forEach(function(elem){
            		elem.isPickable = false;
            	})
            }
            console.log("Проверяем проставление активного игрока");
            console.log(content.active);
            console.log(thisPlayer);
            console.log(player1);
			//this.allowGameStart = true;

        }
		if ( message.type === "ru.mail.park.mechanics.requests.NeighborsMessage$Request"){
            console.log("Получены соседи клетки!");
            content = JSON.parse(message.content);
            console.log(content);
			    neighbors = content.neighbors;
				neighbors = neighbors.split(",");
				for(var j = 0; j < neighbors.length; j++){
            		neighbors[j]= +neighbors[j];
            		console.log(typeof(neighbors[j]));
            	};

            console.log('Соседи: ' + neighbors.length);

			for(var i = 0; i < neighbors.length; ++i){
				gameField.subMeshes[neighbors[i]].materialIndex = 0;
				//console.log("пытаемся подсветить клетку");
			}
        }
        if(message.type === "ru.mail.park.mechanics.requests.PiratMoveMessage$Request") {
        	console.log("О_о сервер ghbckfk ход другого игрока");
            content = JSON.parse(message.content);
            console.log(content);
            if(content.active){
            	var thisPirats = thisPlayer.get_pirats();
            	thisPirats.forEach(function(elem){
            		elem.isPickable = true;
            	});
            	MovementPiratId = content.piratId;
            	MovementTargetCell = content.newCellIndexOfPirat;
            	MovementUnresolved = true;

            }


        }
      }



			//--------------------------------------------------------------------------

      var engine = new BABYLON.Engine(this._el, true);
      var canvas = this._el;

      var createScene = function(){
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI/2, Math.PI / 3,
				                                         12, new BABYLON.Vector3(-100,100,100), scene);
        camera.lowerBetaLimit = 0.1;
        camera.lowerRadiusLimit = 30;
        camera.upperRadiusLimit = 250;
        camera.attachControl(canvas, true);
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = .5;

        return scene;
      }

      var scene = createScene();

			//начинаем игровой цикл
			const player1 = new Player(0, scene, {}); //первый игрок и его меши
			const player2 = new Player(1, scene, {}); // 2-й игрок и его меши
			var thisPlayer, enemy;
			var MovementPiratId, MovementTargetCell;


		//	var pirats = player1.get_pirats();
		//	var possibleIds = player1.get_ids();

			this.createSkyBox(scene);
			var gameField = this.createGameField(scene);
			var gameCellIds = " ";
			var MovementUnresolved = false;
            //var str = " ";
			//пошёл цикл
			var pirats ;
			var mesh;
			var neighbors = [];
			var picked = false;
			var ball;
			var index, ids = [], cellIndex, piratMove;
			scene.onPointerDown = function(evt, pickResult){

				if(pickResult.hit){
					mesh = pickResult.pickedMesh;
					pirats = thisPlayer.get_pirats();
					if(pirats.indexOf(mesh)!= -1){
						mesh.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
						ball = mesh;

						//здесь нужно получить от сервера смежные клетки
						index = pirats.indexOf(mesh);
					 	ids = thisPlayer.get_ids(); //номер пирата
						cellIndex = ids[index]; //айди клетки
						piratMove = {};

				 		var getCellneighbors = {};
			      		getCellneighbors.cellIndex = cellIndex;
			      		messaging.sendGetNeighbors(getCellneighbors);

						picked = true;
					}
					if((mesh === gameField)&&(picked == true)){

						//здесь уже выбираем из смежных клетку, на которую пойдем
						console.log("мы хотим передвинуть шарик");
						var id = pickResult.subMeshId;
						console.log(id);
						console.log(typeof(+neighbors[0]));
						 if(neighbors.indexOf(id) != -1){
						 	console.log("мы кликнули на подсвеченную клетку");
						 	 ball.position.x = pickResult.pickedPoint.x;
							 ball.position.z = pickResult.pickedPoint.z;
							 console.log("Куда мы должны были передвинуться")
							 console.log(ball.position.x);
							 console.log(ball.position.z);
							 ball.material.diffuseColor = new BABYLON.Color3(1,0,0);
							 ids[index] = id;
							 thisPlayer.set_ids(ids);
							 picked = false;
							 for (var i = 0; i < neighbors.length; ++i){
								 gameField.subMeshes[neighbors[i]].materialIndex = 1;
							 }
							 pirats.forEach(function(elem){
					           elem.isPickable = false;
				             });
				             //отправляем сообщение на сервер, что мы сходили
				             var piratMove = {};
				             piratMove.targetCellIndex = id;
				             piratMove.piratId = index;
				             messaging.sendPiratMove(piratMove);
						 }
						//передвигаем шарик
						//посылаем серверу инфу о ходе
					}

					if(MovementUnresolved){
						var enemyPirats = enemy.get_pirats();
						var x, z, y = 15;
						x = - (6 - MovementTargetCell%13 + 0.5)*(1200/13);
						z = (6 - MovementTargetCell/13 + 0.5)*(1200/13);
						console.log("Куда мы передвинулись по факту")
						console.log(x);
						console.log(z);
						enemyPirats[MovementPiratId].position = new BABYLON.Vector3(x,y,z);
					}


				}



			}



		//	this.game_init(possibleIds, gameField, pirats, scene);

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
			 var xmin = -600,  zmin = -600;
			 var xmax =  600,  zmax =  600;
			 var precision = {"w" : 1, "h" : 1};
			 var subdivisions = {'h' : 13, 'w' : 13};

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
			 DarkGreen.diffuseTexture = new BABYLON.Texture("texture1.2.jpg", scene);
			 DarkGreen.bumpTexture = new BABYLON.Texture("normalMap.jpg", scene);
			 DarkGreen.emissiveColor = new BABYLON.Color3(0, 0 , 1);
			 DarkGreen.alpha = 0.4;

			 var multimat = new BABYLON.MultiMaterial("multi", scene);
			 multimat.subMaterials.push(LightGreen);
			 multimat.subMaterials.push(bumpMaterial);
			 multimat.subMaterials.push(DarkGreen);

			 tiledGround.material = multimat;
			 tiledGround.renderingGroupId = 1;
			 var verticesCount = tiledGround.getTotalVertices();
			 var tileIndicesLength = tiledGround.getIndices().length / (subdivisions.w * subdivisions.h);

			 tiledGround.subMeshes = [];
			 var base = 0;


			 for(var j = 0; j < 2*subdivisions.h; j++){
				 var subMeshIndex = 2;
				 if((j > 14)&&(j < 24)){
					 subMeshIndex = 1;
				 }
				 new BABYLON.SubMesh(subMeshIndex, 0, verticesCount, base , tileIndicesLength, tiledGround);
				 base += tileIndicesLength;
			 }

       for(var j = 0; j < subdivisions.h - 4; j++){
				 new BABYLON.SubMesh(2, 0, verticesCount, base , tileIndicesLength, tiledGround);
				 base += tileIndicesLength;

				 for(var i = 0; i < subdivisions.w - 2; i++){
					 new BABYLON.SubMesh(1, 0, verticesCount, base , tileIndicesLength, tiledGround);
					 base += tileIndicesLength;
				 }

				 new BABYLON.SubMesh(2, 0, verticesCount, base , tileIndicesLength, tiledGround);
				 base += tileIndicesLength;
			 }

			 for(var j = 0; j < 2*subdivisions.h; j++){
				 var subMeshIndex = 2;
				 if((j > 1)&&(j < 15-4)){
					 subMeshIndex = 1;
				 }
				 new BABYLON.SubMesh(subMeshIndex, 0, verticesCount, base , tileIndicesLength, tiledGround);
				 base += tileIndicesLength;
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
