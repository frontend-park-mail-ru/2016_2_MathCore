
import MessagingTools from "./messaging";

export default class Socket {
  constructor(){
    this.socket = new WebSocket("wss://java-heroku-test-victor.herokuapp.com/game");
    this.messaging = new MessagingTools(this.socket);

    this.StartGameEvent = new CustomEvent("StartGame", { content : {}});
    this.GetNeighborsEvent = new CustomEvent("GetNeighbors", { content : {}});
    this.MovementEvent = new CustomEvent("Movement", {content : {}});

    this.socket.onopen = this.onSocketOpen.bind(this);
    this.socket.onclose = this.onSocketClose;
    this.socket.onmessage = this.onSocketMessage.bind(this);
  }

  getMessaging(){
    return this.messaging;
  }

  onSocketOpen(){
    console.log('Info: WebSocket connection opened.');
    console.log('Info: Waiting for another player...');
    this.messaging.sendJoinGameMsg();
  }

  onSocketClose(){
    console.log('Info: WebSocket closed.');
  }


    onSocketMessage(event){
      let content = {};
      let responseContent = {};
      let response = {};
      let message = JSON.parse(event.data);
      if(message.type === "ru.mail.park.mechanics.requests.ReplyPingMessage$Request"){
          setTimeout(this.messaging.sendPingMessage(), 30000);
      }

    if(message.type === "ru.mail.park.websocket.MessageToClient$Request") {
        content = JSON.parse(message.content);
        responseContent.myMessage = content.myMessage;
        console.log(responseContent.myMessage);
        return;
    }
    if(message.type === "ru.mail.park.mechanics.requests.BoardMapForUsers$Request"){
        console.log("Wow. Seems loke game been started");
        content = JSON.parse(message.content);
        this.StartGameEvent.content = content;
        document.dispatchEvent(this.StartGameEvent);
    }
    if(message.type === "ru.mail.park.mechanics.requests.NeighborsMessage$Request"){
      console.log("Получены соседи клетки!");
      content = JSON.parse(message.content);
      this.GetNeighborsEvent.content = content;
      document.dispatchEvent(this.GetNeighborsEvent);
    }
    if(message.type === "ru.mail.park.mechanics.requests.PiratMoveMessage$Request") {
      console.log("О_о сервер, ход другого игрока");
      content = JSON.parse(message.content);
      this.MovementEvent.content = content;
      document.dispatchEvent(this.MovementEvent);
    }
  }
}
