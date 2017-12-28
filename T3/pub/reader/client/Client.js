function Client(scene){
    this.scene = scene;
}

Client.prototype.constructor = Client;

Client.prototype.postRequest = function(requestString, onSuccess, onError) {
        var request = new XMLHttpRequest();
        request.open('POST', '../../game', true);

        request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
        request.onerror = onError || function(){console.log("Error waiting for response");};

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send('requestString='+encodeURIComponent(requestString));
}
