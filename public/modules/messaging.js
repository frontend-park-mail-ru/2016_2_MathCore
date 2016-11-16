(function () {

    class MessagingTools{
        constructor(socket){
            this.socket = socket;
        }

        sendMyTestMessage(){
        var myTestMessage = {};
        myTestMessage.type="ru.mail.park.websocket.TestMessage$Request";
        myTestMessage.content="{}";
        this.socket.send(JSON.stringify(myTestMessage));
        }

        sendUpdatePingMsg() {
        var getPingMessage = {};
        getPingMessage.type="ru.mail.park.pinger.requests.GetPing$Request";
        getPingMessage.content="{}";
        this.socket.send(JSON.stringify(getPingMessage));
        };

        sendJoinGameMsg() {
        var joinGameMessage = {}
    joinGameMessage.type = "ru.mail.park.mechanics.requests.JoinGame$Request";
    joinGameMessage.content="{}";
        this.socket.send(JSON.stringify(joinGameMessage));
    };

    sendClientSnap(snap) {
        var clientSnapMessage = {};
        clientSnapMessage.type = "ru.mail.park.mechanics.base.ClientSnap";
        clientSnapMessage.content = JSON.stringify(snap);
        this.socket.send(JSON.stringify(clientSnapMessage));
    }

    sendPiratMove(piratMove){
        var clientPiratMoveMessage = {};
        clientPiratMoveMessage.type = "ru.mail.park.mechanics.requests.PiratMoveRequest";
        clientPiratMoveMessage.content = JSON.stringify(piratMove);
        this.socket.send(JSON.stringify(clientPiratMoveMessage));
    }

    sendShipMove(shipMove){
        var clientShipMoveMessage = {};
        clientShipMoveMessage.type = "ru.mail.park.mechanics.requests.ShipMoveRequest";
        clientShipMoveMessage.content = JSON.stringify(shipMove);
        this.socket.send(JSON.stringify(clientShipMoveMessage));
    }

    sendGetNeighbors(cellID){
        var clientCellMessage = {};
        clientCellMessage.type = "ru.mail.park.mechanics.requests.GetNeighbors";
        clientCellMessage.content = JSON.stringify(cellID);
        this.socket.send(JSON.stringify(clientCellMessage));
        console.log('Отправлен запрос на получение смежных клеток...');
    }

    }

window.MessagingTools = MessagingTools;

})();
