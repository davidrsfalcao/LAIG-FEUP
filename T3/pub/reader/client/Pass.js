function Pass() {
    Client.call(this);

    this.makeRequest();
}

Pass.prototype = Object.create(Client.prototype);
Pass.prototype.constructor = Pass;

Pass.prototype.makeRequest = function()
{
    var requestString = "[pass]";
    this.postRequest(requestString, this.handleReply);
}

Pass.prototype.handleReply = function (data){
    let response=JSON.parse(data.target.response);
    let player = JSON.parse(response.argA);
    change_player(player);
}
