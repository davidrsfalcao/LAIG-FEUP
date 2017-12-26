:- dynamic board/3.

% creat the initial board
create_board:-
    assert(board(1,1,'2_se')),
    assert(board(1,2,'null')),
    assert(board(1,3,'1_s')),
    assert(board(1,4,'null')),
    assert(board(1,5,'null')),
    assert(board(1,6,'null')),
    assert(board(1,7,'2_s')),
    assert(board(1,8,'null')),
    assert(board(1,9,'null')),

    assert(board(2,1,'null')),
    assert(board(2,2,'null')),
    assert(board(2,3,'null')),
    assert(board(2,4,'null')),
    assert(board(2,5,'null')),
    assert(board(2,6,'null')),
    assert(board(2,7,'null')),
    assert(board(2,8,'null')),
    assert(board(2,9,'null')),

    assert(board(3,1,'null')),
    assert(board(3,2,'null')),
    assert(board(3,3,'null')),
    assert(board(3,4,'null')),
    assert(board(3,5,'null')),
    assert(board(3,6,'null')),
    assert(board(3,7,'null')),
    assert(board(3,8,'null')),
    assert(board(3,9,'null')),

    assert(board(4,1,'null')),
    assert(board(4,2,'null')),
    assert(board(4,3,'null')),
    assert(board(4,4,'null')),
    assert(board(4,5,'null')),
    assert(board(4,6,'null')),
    assert(board(4,7,'null')),
    assert(board(4,8,'null')),
    assert(board(4,9,'null')),

    assert(board(5,1,'1_e')),
    assert(board(5,2,'null')),
    assert(board(5,3,'null')),
    assert(board(5,4,'null')),
    assert(board(5,5,'null')),
    assert(board(5,6,'null')),
    assert(board(5,7,'null')),
    assert(board(5,8,'null')),
    assert(board(5,9,'2_w')),

    assert(board(6,1,'null')),
    assert(board(6,2,'null')),
    assert(board(6,3,'null')),
    assert(board(6,4,'null')),
    assert(board(6,5,'null')),
    assert(board(6,6,'null')),
    assert(board(6,7,'null')),
    assert(board(6,8,'null')),
    assert(board(6,9,'null')),

    assert(board(7,1,'null')),
    assert(board(7,2,'null')),
    assert(board(7,3,'null')),
    assert(board(7,4,'null')),
    assert(board(7,5,'null')),
    assert(board(7,6,'null')),
    assert(board(7,7,'null')),
    assert(board(7,8,'null')),
    assert(board(7,9,'null')),

    assert(board(8,1,'null')),
    assert(board(8,2,'null')),
    assert(board(8,3,'null')),
    assert(board(8,4,'null')),
    assert(board(8,5,'null')),
    assert(board(8,6,'null')),
    assert(board(8,7,'null')),
    assert(board(8,8,'null')),
    assert(board(8,9,'null')),

    assert(board(9,1,'null')),
    assert(board(9,2,'null')),
    assert(board(9,3,'1_n')),
    assert(board(9,4,'null')),
    assert(board(9,5,'null')),
    assert(board(9,6,'null')),
    assert(board(9,7,'2_n')),
    assert(board(9,8,'null')),
    assert(board(9,9,'1_nw')),
    !.

% clean all board facts
clean_board:-
    retractall(board(_,_,_)),
    !.

% piece(name piece, player)
piece('1_n',1).
piece('1_s',1).
piece('1_e',1).
piece('1_w',1).
piece('1_ne',1).
piece('1_nw',1).
piece('1_se',1).
piece('1_sw',1).
piece('2_n',2).
piece('2_s',2).
piece('2_e',2).
piece('2_w',2).
piece('2_ne',2).
piece('2_nw',2).
piece('2_se',2).
piece('2_sw',2).

% direction(name piece, direction)
direction('1_n','n').
direction('1_s','s').
direction('1_e','e').
direction('1_w','w').
direction('1_ne','ne').
direction('1_nw','nw').
direction('1_se','se').
direction('1_sw','sw').
direction('2_n','n').
direction('2_s','s').
direction('2_e','e').
direction('2_w','w').
direction('2_ne','ne').
direction('2_nw',nw).
direction('2_se','se').
direction('2_sw','sw').

%possible_direction(atual direction, possible direction)
possible_direction('n','n').
possible_direction('n','ne').
possible_direction('n','nw').
possible_direction('s','s').
possible_direction('s','se').
possible_direction('s','sw').
possible_direction('e','e').
possible_direction('e','ne').
possible_direction('e','se').
possible_direction('w','w').
possible_direction('w','nw').
possible_direction('w','sw').
possible_direction('ne','ne').
possible_direction('ne','n').
possible_direction('ne','e').
possible_direction('se','se').
possible_direction('se','s').
possible_direction('se','e').
possible_direction('sw','sw').
possible_direction('sw','s').
possible_direction('sw','w').
possible_direction('nw','nw').
possible_direction('nw','n').
possible_direction('nw','w').

% rotate(atual direction, rotation, final direction)
rotate('n','l','nw').
rotate('n','r','ne').
rotate('n','f','n').
rotate('nw','l','w').
rotate('nw','r','n').
rotate('nw','f','nw').
rotate('w','l','sw').
rotate('w','r','nw').
rotate('w','f','w').
rotate('sw','l','s').
rotate('sw','r','w').
rotate('sw','f','sw').
rotate('s','l','se').
rotate('s','r','sw').
rotate('s','f','s').
rotate('se','l','e').
rotate('se','r','s').
rotate('se','f','se').
rotate('e','l','ne').
rotate('e','r','se').
rotate('e','f','e').
rotate('ne','l','n').
rotate('ne','r','e').
rotate('ne','f','ne').

% verify is a board's position is empty
% position_is_empty(+ LINE, + COLUMN)
position_is_empty(LINE, COLUMN):-
    board(LINE,COLUMN,'null').

% verify is a board's position is free to move
% position_is_free_to_move(+ PLAYER, + LINE1, + COLUMN1)
position_is_free_to_move(PLAYER, LINE1, COLUMN1):-
    quadrant(QQ, LINE1, COLUMN1),
    (
        tile_belongs_to_player(QQ, LINE1, COLUMN1, PLAYER);
        position_is_empty(LINE1, COLUMN1)
    ),
    board(LINE1, COLUMN1, PIECE),
    not(piece(PIECE,PLAYER)).

% verify is a board's piece belongs to a certain player
% piece_belongs_to_player(+ PLAYER, + LINE, + COLUMN)
piece_belongs_to_player(PLAYER, LINE, COLUMN):-
    board(LINE, COLUMN, PIECE),
    piece(PIECE, PP),
    PP == PLAYER.

% draw all possible moves of a player
% draw_possible_moves(+ PLAYER)
draw_possible_moves(PLAYER):-
    draw_possible_moves(PLAYER,0),
    !.

% iterative cicle between all possible moves of a player
% draw_possible_moves(+ PLAYER, + INDEX)
draw_possible_moves(PLAYER, INDEX):-
    nb_getval(list_movements,ALL_MOVES), nl, nl,
    write(ALL_MOVES), nl, nl, nl,
    length(ALL_MOVES, TAM),
    (TAM == 0 ->
        true
        ;
        nth0(INDEX, ALL_MOVES, MOV),
        nth0(0, MOV, PP),
        ( PLAYER == PP ->
            nth0(3, MOV, LINE),
            nth0(4, MOV, COLUMN),
            retract(board(LINE, COLUMN, _)),
            assert(board(LINE, COLUMN, 'X')),
            last(ALL_MOVES, LAST)
            ;
            last(ALL_MOVES, LAST)
        ),
        (LAST == MOV ->
            true
            ;
            INDEX1 is INDEX +1,
            draw_possible_moves(PLAYER, INDEX1)
        )
    ).

% delete of the board all possible moves of a player
% delete_possible_moves(+ PLAYER)
delete_possible_moves(PLAYER):-
    delete_possible_moves(PLAYER,0),
    !.

% iterative cicle between all possible moves of a player
% delete_possible_moves(+ PLAYER, + INDEX)
delete_possible_moves(PLAYER, INDEX):-
    nb_getval(list_movements,ALL_MOVES),
    length(ALL_MOVES, TAM),
    (TAM == 0 ->
        true
        ;
        nth0(INDEX, ALL_MOVES, MOV),
        nth0(0, MOV, PP),
        ( PLAYER == PP ->
        	nth0(3, MOV, LINE),
        	nth0(4, MOV, COLUMN),
        	retract(board(LINE, COLUMN, _)),
        	board_res(LINE, COLUMN, PIECE),
        	(PIECE == 0 ->
        		PIECE1 = 'null'
        		;
        		( PIECE == 1 ->
        			PIECE1 = '1'
        			;
        			PIECE1 = '2'
        		)
        	),
        	assert(board(LINE, COLUMN, PIECE1)),
        	last(ALL_MOVES, LAST)
        	;
        	last(ALL_MOVES, LAST)
        ),
        (LAST == MOV ->
        	true
        	;
        	INDEX1 is INDEX +1,
        	delete_possible_moves(PLAYER, INDEX1)
        )
    ).
