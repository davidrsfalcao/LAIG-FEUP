function ChoosePiece(line, column) {
    Client.call(this);
    this.line = line;
    this.column = column;

    this.makeRequest();
}

ChoosePiece.prototype = Object.create(Client.prototype);
ChoosePiece.prototype.constructor = ChoosePiece;

ChoosePiece.prototype.makeRequest = function()
{
    var requestString = "[get_moves_piece," + this.line + "," + this.column + "]";
    this.postRequest(requestString, this.handleReply);
}

ChoosePiece.prototype.handleReply = function (data){
    let response=JSON.parse(data.target.response);
    selectCells(JSON.parse(response.argA));

}
