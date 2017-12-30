function Undo(board, board_res) {
    Client.call(this);
    this.board = JSON.stringify(board);
    this.board_res = JSON.stringify(board_res);

    this.makeRequest();
}

Undo.prototype = Object.create(Client.prototype);
Undo.prototype.constructor = Undo;

Undo.prototype.makeRequest = function()
{
    var requestString = "[undo," + this.board + "," + this.board_res + "]";
    this.postRequest(requestString, this.handleReply);
}

Undo.prototype.handleReply = function (data){
    let response=JSON.parse(data.target.response);
    let player = JSON.parse(response.argA);
    //console.log(response.message);
    orderPieces();
    orderCylinders();
    change_player(player);
}
