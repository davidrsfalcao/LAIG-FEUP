function BotMovePiece(line, column) {
    Client.call(this);
    this.line = line;
    this.column = column;
    this.line1;
    this.column1;

    this.makeRequest();

}

BotMovePiece.prototype = Object.create(Client.prototype);
BotMovePiece.prototype.constructor = BotMovePiece;

BotMovePiece.prototype.makeRequest = function()
{
    var requestString = "[move_piece_selected_bot," + this.line + "," + this.column +"]";
    this.postRequest(requestString, this.handleReply);
}

BotMovePiece.prototype.handleReply = function (data){
    let response=JSON.parse(data.target.response);
    pushBoards(JSON.parse(response.argA), JSON.parse(response.argB));
    let argC = JSON.parse(response.message);
    upateMovementBot(argC[1], argC[2]);
    movePiece();
    change_player(argC[0]);

}
