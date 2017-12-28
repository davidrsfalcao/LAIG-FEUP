function MovePiece(line, column, line1, column1) {
    Client.call(this);
    this.line = line;
    this.column = column;
    this.line1= line1;
    this.column1 = column1;

    this.makeRequest();
    movePiece(line, column, line1, column1);
}

MovePiece.prototype = Object.create(Client.prototype);
MovePiece.prototype.constructor = MovePiece;

MovePiece.prototype.makeRequest = function()
{
    var requestString = "[move_piece_selected," + this.line + "," + this.column + "," + this.line1 + "," + this.column1 +"]";
    this.postRequest(requestString, this.handleReply);
}

MovePiece.prototype.handleReply = function (data){
    let response=JSON.parse(data.target.response);
    pushBoards(JSON.parse(response.argA), JSON.parse(response.argB));
    change_player(JSON.parse(response.message));
}
