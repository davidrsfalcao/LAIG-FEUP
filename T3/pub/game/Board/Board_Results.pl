:- dynamic board_res/3.

% creat the initial board of results
create_board_res:-
    assert(board_res(1,1,0)),
    assert(board_res(1,2,0)),
    assert(board_res(1,3,0)),
    assert(board_res(1,4,0)),
    assert(board_res(1,5,0)),
    assert(board_res(1,6,0)),
    assert(board_res(1,7,0)),
    assert(board_res(1,8,0)),
    assert(board_res(1,9,0)),

    assert(board_res(2,1,0)),
    assert(board_res(2,2,0)),
    assert(board_res(2,3,0)),
    assert(board_res(2,4,0)),
    assert(board_res(2,5,0)),
    assert(board_res(2,6,0)),
    assert(board_res(2,7,0)),
    assert(board_res(2,8,0)),
    assert(board_res(2,9,0)),

    assert(board_res(3,1,0)),
    assert(board_res(3,2,0)),
    assert(board_res(3,3,0)),
    assert(board_res(3,4,0)),
    assert(board_res(3,5,0)),
    assert(board_res(3,6,0)),
    assert(board_res(3,7,0)),
    assert(board_res(3,8,0)),
    assert(board_res(3,9,0)),

    assert(board_res(4,1,0)),
    assert(board_res(4,2,0)),
    assert(board_res(4,3,0)),
    assert(board_res(4,4,0)),
    assert(board_res(4,5,0)),
    assert(board_res(4,6,0)),
    assert(board_res(4,7,0)),
    assert(board_res(4,8,0)),
    assert(board_res(4,9,0)),

    assert(board_res(5,1,0)),
    assert(board_res(5,2,0)),
    assert(board_res(5,3,0)),
    assert(board_res(5,4,0)),
    assert(board_res(5,5,0)),
    assert(board_res(5,6,0)),
    assert(board_res(5,7,0)),
    assert(board_res(5,8,0)),
    assert(board_res(5,9,0)),

    assert(board_res(6,1,0)),
    assert(board_res(6,2,0)),
    assert(board_res(6,3,0)),
    assert(board_res(6,4,0)),
    assert(board_res(6,5,0)),
    assert(board_res(6,6,0)),
    assert(board_res(6,7,0)),
    assert(board_res(6,8,0)),
    assert(board_res(6,9,0)),

    assert(board_res(7,1,0)),
    assert(board_res(7,2,0)),
    assert(board_res(7,3,0)),
    assert(board_res(7,4,0)),
    assert(board_res(7,5,0)),
    assert(board_res(7,6,0)),
    assert(board_res(7,7,0)),
    assert(board_res(7,8,0)),
    assert(board_res(7,9,0)),

    assert(board_res(8,1,0)),
    assert(board_res(8,2,0)),
    assert(board_res(8,3,0)),
    assert(board_res(8,4,0)),
    assert(board_res(8,5,0)),
    assert(board_res(8,6,0)),
    assert(board_res(8,7,0)),
    assert(board_res(8,8,0)),
    assert(board_res(8,9,0)),

    assert(board_res(9,1,0)),
    assert(board_res(9,2,0)),
    assert(board_res(9,3,0)),
    assert(board_res(9,4,0)),
    assert(board_res(9,5,0)),
    assert(board_res(9,6,0)),
    assert(board_res(9,7,0)),
    assert(board_res(9,8,0)),
    assert(board_res(9,9,0)),
    !.

% clean all board_res facts
clean_board_res:-
    retractall(board_res(_,_,_)),
    !.

% verify if a tile belongs to a player
% tile_belongs_to_player(+ QUADRANT, + LINE, + COLUMN, + PLAYER)
tile_belongs_to_player(QUADRANT, LINE, COLUMN, PLAYER):-
    quadrant(QQ,LINE,COLUMN),
    QQ == QUADRANT,
    board_res(LINE,COLUMN,PP),
    PP == PLAYER.
