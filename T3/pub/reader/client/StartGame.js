function StartGame(scene, mode, difficulty) {
    Client.call(this, scene);
    //this.scene = scene;
    this.mode = mode;
    this.difficulty = difficulty;

    this.makeRequest();
}

StartGame.prototype = Object.create(Client.prototype);
StartGame.prototype.constructor = StartGame;

StartGame.prototype.makeRequest = function()
{
    var requestString = "[start_game," + this.mode + "," + this.difficulty + "]";
    this.postRequest(requestString, this.handleReply);
}

StartGame.prototype.handleReply = function (data){
    let response=JSON.parse(data.target.response);
    console.log("Message: " + response.message);
    pushBoards(JSON.parse(response.argA), JSON.parse(response.argB));
}
