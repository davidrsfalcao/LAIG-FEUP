function BotChoosePiece() {
    Client.call(this);
    this.makeRequest();
}

BotChoosePiece.prototype = Object.create(Client.prototype);
BotChoosePiece.prototype.constructor = BotChoosePiece;

BotChoosePiece.prototype.makeRequest = function()
{
    var requestString = "[get_moves_piece_bot]";
    this.postRequest(requestString, this.handleReply);
}

BotChoosePiece.prototype.handleReply = function (data){
    let response=JSON.parse(data.target.response);
    selectCells(JSON.parse(response.argA));

}
