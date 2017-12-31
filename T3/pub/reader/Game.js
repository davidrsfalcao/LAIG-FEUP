let scene;

function initScene(scene1){
    scene = scene1;
}

function pushBoards(Board, Board_res){
    scene.board_matrix.push(Board);
    scene.board_res_matrix.push(Board_res);
}

function getPlayerPiece(piece){
    let q = (piece - 1) / 8;

    if(q < 1){
        return 1;
    }
    else return 2;
}

function getAnglePiece(piece){
    let q = (piece - 1) % 8;

    switch (q) {
        case 0 : return Math.PI;
        case 1 : return 3*Math.PI/4;
        case 2 : return Math.PI/2;
        case 3 : return Math.PI/4;
        case 4 : return 0;
        case 5 : return -Math.PI/4;
        case 6 : return -Math.PI/2;
        case 7 : return -Math.PI/4 *3;
    }
    return 0;

}

function getPiecesPlayer(player){
    let res = [];

    for(let i = 0; i< scene.pieces.length; i++){

        if (scene.pieces[i].player == player){
            res.push(scene.pieces[i]);
        }
    }
    return res;

}

function getCylindersPlayer(player){
    let res = [];

    for(let i = 0; i< scene.cylinders.length; i++){

        if (scene.cylinders[i].player == player){
            res.push(scene.cylinders[i]);
        }
    }
    return res;

}

function orderPieces(){
    let atualBoard = scene.board_matrix[scene.board_matrix.length-1];
    let player1_pieces = getPiecesPlayer(1);
    let player2_pieces = getPiecesPlayer(2);

    for (let line = 0; line < atualBoard.length; line++) {

        for (let column = 0; column < atualBoard[line].length; column++) {
            let piece =  atualBoard[line][column];

            if((piece != 100) && (piece != 200) && (piece != 0)) {
                let player = getPlayerPiece(piece);

                switch (player) {
                    case 1:
                    player1_pieces[0].line = line+1;
                    player1_pieces[0].column = column+1;
                    player1_pieces[0].ang = getAnglePiece(piece);
                    player1_pieces[0].inGame = true;
                    player1_pieces.splice(0,1);
                    break;

                    case 2:
                    player2_pieces[0].line = line+1;
                    player2_pieces[0].column = column+1;
                    player2_pieces[0].ang = getAnglePiece(piece);
                    player2_pieces[0].inGame = true;
                    player2_pieces.splice(0,1);
                    break;
                }
            }

        }

    }
    // Out pieces
    for (let i = 0; i < player1_pieces.length; i++) {
        player1_pieces[i].line = 9-i;
        player1_pieces[i].column = 11;
        player1_pieces[i].ang = -Math.PI/2;
    }

    for (let i = 0; i < player2_pieces.length; i++) {
        player2_pieces[i].line = 1+i;
        player2_pieces[i].column = -1;
        player2_pieces[i].ang = Math.PI/2;
    }

}

function changeCameraPosition() {
    let position =  vec3.fromValues(-1.768616202287376, 21.9510910063982, 2.2161888433620334);
 //   let pos = vec3.fromValues(-10, 30, 10);
    let pos = vec3.fromValues(0.800000011920929, 23, -4.5);
    scene.camera.setPosition(pos);
  //  scene.camera.zoom(20);
    //let trans = vec3.fromValues (5, 50, 0);
    

    let axis = new CGFaxis(scene, 1, 0.2);
    //scene.camera.rotate(scene.axis, Math.PI/2);
    //scene.camera.translate(trans);
}

function ordeCylinders(){
    //TODO
}

function findCylinderLC(player,line, col){
    let cils = getCylindersPlayer(player);

    for (let i = 0; i < cils.length; i++) {

        if((cils[i].line == line)&& (cils[i].column == col)){
            return cils[i];
        }
    }
    return null;
}

function findCylinderFree(player){
    let cils = getCylindersPlayer(player);

    for (let i = 0; i < cils.length; i++) {
        if(!cils[i].inGame){
            return cils[i];
        }
    }
    return null;
}



function updateCylinders(){

    let new_board_res = scene.board_res_matrix[scene.board_res_matrix.length-1];
    let old_board_res = scene.board_res_matrix[scene.board_res_matrix.length-2];
    let board = scene.board_matrix[scene.board_matrix.length-1];
    let player = scene.player;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(new_board_res[i][j] != 0) {

                let piece = board[i][j];
                let cill;

                if((new_board_res[i][j] != old_board_res[i][j]) && (old_board_res[i][j] != 0)){
                    let cil1 = findCylinderLC(old_board_res[i][j], i+1, j+1);
                    cil1.getOut();
                    cill = findCylinderFree(new_board_res[i][j]);

                }
                else if((new_board_res[i][j] != old_board_res[i][j]) && (old_board_res[i][j] == 0)){
                    cill = findCylinderFree(new_board_res[i][j]);
                }
                else {
                    cill = findCylinderLC(old_board_res[i][j], i+1, j+1);
                }

                if(piece >= 100){
                    if((cill.posL != i+1) || (cill.posC != j+1)){
                        cill.addAnimation(i+1,j+1,i+1,j+1);
                    }

                }
                else {
                    let ang = getAnglePiece(piece);
                    let dx = Math.cos(ang + Math.PI)/3;
                    let dy = Math.sin(ang + Math.PI)/3;
                    if((cill.posL != i+1+dx) || (cill.posC != j+1+dy)){
                        cill.addAnimation(i+1,j+1,i+1+dx,j+1+dy);
                    }
                }

            }

        }

    }



}

function clearCellSelection(){
    for (let i = 0; i < scene.cells.length; i++) {
        scene.cells[i].selected = false;
    }
    scene.selected_piece = {};
}

function selectCells(moves){
    let ll;
    let cc;

    for (let i = 0; i < moves.length; i++) {
        ll = moves[i][1];
        cc = moves[i][2];
        let line = moves[i][3];
        let col = moves[i][4];

        for (let j = 0; j < scene.cells.length; j++) {
            if((scene.cells[j].line == line) && (scene.cells[j].column == col)){
                scene.cells[j].selected = true;
                break;
            }
        }
    }

    if(moves.length > 0){
        scene.selected_piece = {line: ll, column: cc};
    }

}

function change_player(player){
    scene.player = player;
    change_camera_player_view(player);
}

function change_camera_player_view(player) {
    let playerCamera = scene.camera;

    let position2 =  vec3.fromValues(-0.800000011920929, 23, 4.5);
    let position1 =  vec3.fromValues(0.800000011920929, 23, -4.5);
    
    if(player === 1) {
        playerCamera.setPosition(position1);
    } else {
        playerCamera.setPosition(position2);
    }
    scene.camera = playerCamera;
}

function movePiece(){

    let request;

    for(var i = scene.requests.length-1; i >= 0; i--) {
        if(scene.requests[i] instanceof MovePiece){
            request = scene.requests[i];
            break;
        }
    }

    let line = request.line;
    let line1 = request.line1;
    let column = request.column;
    let column1 = request.column1;

    let board = scene.board_matrix[scene.board_matrix.length-1];
    let old_board_res = scene.board_res_matrix[scene.board_res_matrix.length-2];
    let position = board[line1-1][column1-1];
    let out = false;

    if(position >= 100){
        out = true;
    }

    let out_pos;

    for (let i = 0; i < scene.pieces.length; i++) {
        if((scene.pieces[i].line==line) && (scene.pieces[i].column==column)) {

            if(out){
                out_pos = check_out_positons();
                scene.pieces[i].inGame = false;
                scene.pieces[i].addAnimation(out_pos.line, out_pos.column);
            }
            else scene.pieces[i].addAnimation(line1, column1);
            break;
        }
    }

    updateCylinders();

}

function check_out_positons(){
    let player = scene.player;
    let line, column;
    let found = false;

    if(player == 1){
        column = 11;
        let player1_pieces = getPiecesPlayer(1);

        for (let i = 9; i >= 0; i--) {
            for (let j = 0; j < player1_pieces.length; j++) {
                if((player1_pieces[j].column == 11) && (player1_pieces[j].line == i)){
                    found = true;
                    break;
                }
            }

            if(!found){
                line = i;
                break;
            }
            else found = false;
        }
    }
    else if(player == 2){
        column = -1;
        let player2_pieces = getPiecesPlayer(2);

        for (let i = 1; i <= 9; i++) {
            for (let j = 0; j < player2_pieces.length; j++) {
                if((player2_pieces[j].column == -1) && (player2_pieces[j].line == i)){
                    found = true;
                    break;
                }
            }

            if(!found){
                line = i;
                break;
            }
            else found = false;
        }
    }

    return {line: line, column: column};
}
