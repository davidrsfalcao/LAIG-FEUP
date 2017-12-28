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

function orderPieces(){

    console.log("ORDER");
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
}

function movePiece(line, column, line1, column1){

    for (let i = 0; i < scene.pieces.length; i++) {
        if((scene.pieces[i].line==line) && (scene.pieces[i].column==column)) {
            scene.pieces[i].addAnimation(line1, column1);
            break;
        }
    }

}
