(function(){
  'use strict'

    class MessagingTools{
        constructor(socket){
            this.socket = socket;
        }

        sendMyTestMessage(){
          let myTestMessage = {};
          myTestMessage.type="ru.mail.park.websocket.TestMessage$Request";
          myTestMessage.content="{}";
          this.socket.send(JSON.stringify(myTestMessage));
        }

        sendUpdatePingMsg(){
          let getPingMessage = {};
          getPingMessage.type="ru.mail.park.pinger.requests.GetPing$Request";
          getPingMessage.content="{}";
          this.socket.send(JSON.stringify(getPingMessage));
        };

        sendJoinGameMsg(){
          let joinGameMessage = {}
          joinGameMessage.type = "ru.mail.park.mechanics.requests.JoinGame$Request";
          joinGameMessage.content="{}";
          this.socket.send(JSON.stringify(joinGameMessage));
        };

        sendClientSnap(snap) {
          let clientSnapMessage = {};
          clientSnapMessage.type = "ru.mail.park.mechanics.base.ClientSnap";
          clientSnapMessage.content = JSON.stringify(snap);
          this.socket.send(JSON.stringify(clientSnapMessage));
        };

        sendPiratMove(piratMove){
          let clientPiratMoveMessage = {};
          clientPiratMoveMessage.type = "ru.mail.park.mechanics.requests.PiratMoveRequest";
          clientPiratMoveMessage.content = JSON.stringify(piratMove);
          console.log(JSON.stringify("Эгегей, сервер, подвинь мне пирата"));
          this.socket.send(JSON.stringify(clientPiratMoveMessage));
        }

        sendShipMove(shipMove){
          let clientShipMoveMessage = {};
          clientShipMoveMessage.type = "ru.mail.park.mechanics.requests.ShipMoveRequest";
          clientShipMoveMessage.content = JSON.stringify(shipMove);
          this.socket.send(JSON.stringify(clientShipMoveMessage));
        }

        sendGetNeighbors(cellID){
          let clientCellMessage = {};
          clientCellMessage.type = "ru.mail.park.mechanics.requests.GetNeighbors";
          clientCellMessage.content = JSON.stringify(cellID);
          console.log(JSON.stringify(clientCellMessage));
          this.socket.send(JSON.stringify(clientCellMessage));
          console.log('Отправлен запрос на получение смежных клеток...');
        }
    }

window.MessagingTools = MessagingTools;

})();
