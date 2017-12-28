let scene;

function initScene(scene1){
    scene = scene1;
}

function pushBoards(Board, Board_res){
    scene.board_matrix.push(Board);
    scene.board_res_matrix.push(Board_res);
    orderPieces();

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
    scene.board_matrix.piece = new Piece(scene);
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
                        player1_pieces.splice(0,1);
                        break;

                    case 2:
                        player2_pieces[0].line = line+1;
                        player2_pieces[0].column = column+1;
                        player2_pieces[0].ang = getAnglePiece(piece);
                        player2_pieces.splice(0,1);
                        break;
                }
            }

        }

    }


}
