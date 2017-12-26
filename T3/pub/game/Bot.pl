:- use_module(library(random)).

% the bot choose a piece to move (pieces with possible movements)
% bot_choose_piece(+ PLAYER, - LINE, - COLUMN)
bot_choose_piece(PLAYER, LINE, COLUMN):-
    nb_getval(bot_difficulty, LVL),
    possible_moves_player(PLAYER, MOVES),
    ( LVL == 1 ->
        bot_choose_piece_easy(LINE, COLUMN, MOVES)
        ;
        bot_choose_piece_hard(LINE, COLUMN, MOVES)
    ),
    sleep(1). % simulate human's time of reaction

% the bot choose a piece to move (LVL 1)
bot_choose_piece_easy(LINE, COLUMN, MOVES):-
    length(MOVES, TAM),
    random(0,TAM,N),
    nth0(N, MOVES, MOVE),
    nth0(1, MOVE, LINE),
    nth0(2, MOVE, COLUMN).

% the bot choose a piece to move (LVL 2)
bot_choose_piece_hard(LINE, COLUMN, MOVES):-
    nb_setval(best_play, []),
    nb_setval(best_play_n, -100),
    bot_choose_piece_hard(MOVES, 0),
    nb_getval(best_play, BEST),
    nth0(1, BEST, LINE),
    nth0(2, BEST, COLUMN).

% the bot choose a piece to move (LVL 2) (recursive)
bot_choose_piece_hard(MOVES, INDEX):-
    nth0(INDEX, MOVES, MOVE),
    nth0(0, MOVE, PP),
    nth0(1, MOVE, LINE),
    nth0(2, MOVE, COLUMN),
    nth0(3, MOVE, LINE1),
    nth0(4, MOVE, COLUMN1),


    % BACKUP
    board(LINE, COLUMN, PIECE),
    board(LINE1, COLUMN1, PIECE1),
    board_res(LINE, COLUMN, PLAYER),
    board_res(LINE1, COLUMN1, PLAYER1),

    % Change
    calculate_direction(LINE, COLUMN, LINE1, COLUMN1, DIR),
    (direction(P1,DIR),piece(P1,PP)),

    retract(board(LINE, COLUMN, _)),
    ( PLAYER == 1 ->
        assert(board(LINE, COLUMN, '1'))
        ;
        assert(board(LINE, COLUMN, '2'))
    ),
    retract(board(LINE1, COLUMN1, _)),
    assert(board(LINE1, COLUMN1, P1)),
    retract(board_res(LINE1, COLUMN1, _)),
    assert(board_res(LINE1, COLUMN1, PLAYER)),

    possible_moves_piece(LINE1, COLUMN1),
    nb_getval(list_movements_piece, PLAYS),
    length(PLAYS, SCORE),

    nb_getval(best_play_n, BEST),

    (SCORE > BEST ->
        nb_setval(best_play, MOVE),
        nb_setval(best_play_n, SCORE)
        ;
        ( SCORE == BEST ->
            random(0,2,N),
            (N == 0 ->
                !
                ;
                nb_setval(best_play, MOVE),
                nb_setval(best_play_n, SCORE)
            )
            ;
            !
        )

    ),

    % Restore
    retract(board(LINE, COLUMN, _)),
    assert(board(LINE, COLUMN, PIECE)),
    retract(board(LINE1, COLUMN1, _)),
    assert(board(LINE1, COLUMN1, PIECE1)),
    retract(board_res(LINE1, COLUMN1, _)),
    assert(board_res(LINE1, COLUMN1, PLAYER1)),

    last(MOVES, LAST),
    (MOVE == LAST ->
        true
        ;
        INDEX1 is INDEX + 1,
        bot_choose_piece_hard(MOVES, INDEX1)
    ).

% the bot choose a position to move a piece
% bot_choose_position_to_mov(+ LINE_A, + COLUMN_A, - LINE1, - COLUMN1)
bot_choose_position_to_mov(LINE_A, COLUMN_A, LINE1, COLUMN1):-
    nb_getval(bot_difficulty, LVL),
    possible_moves_piece(LINE_A, COLUMN_A),
    nb_getval(list_movements_piece, MOVES),
    ( LVL == 1 ->
        length(MOVES, TAM),
        random(0,TAM,N),
        nth0(N, MOVES, MOVE),
        nth0(3, MOVE, LINE1),
        nth0(4, MOVE, COLUMN1)
        ;
        nb_getval(best_play, BEST),
        nth0(3, BEST, LINE1),
        nth0(4, BEST, COLUMN1)
    ).

% the bot choose a direction
% bot_change_direction(+ DIR, + DIR1, + DIR2, - DIR_TO_MOV)
bot_change_direction(PLAYER, LINE1, COLUMN1,DIR, DIR1,DIR2, DIR_TO_MOV):-
    nb_getval(bot_difficulty, LVL),
    (LVL == 1 ->
        bot_change_direction_easy(DIR, DIR1, DIR2, DIR_TO_MOV)
        ;
        bot_change_direction_hard(PLAYER, LINE1, COLUMN1,DIR, DIR1,DIR2, DIR_TO_MOV)
    ).

% the bot choose a direction(LVL 1)
bot_change_direction_easy(DIR, DIR1, DIR2, DIR_TO_MOV):-
    random(0,3,RDIR),
    (RDIR == 0 ->
        DIR_TO_MOV = DIR
        ;
        (RDIR == 1 ->
            DIR_TO_MOV = DIR1
            ;
            DIR_TO_MOV = DIR2
        )
    ).

% the bot choose a direction(LVL 2)
bot_change_direction_hard(PLAYER, LINE1, COLUMN1,DIR, DIR1,DIR2, DIR_TO_MOV):-
    % BACKUP
    board(LINE1, COLUMN1, PIECE),

    % Test dir
    retract(board(LINE1,COLUMN1,_)),
    (direction(P,DIR),piece(P,PLAYER)),
    assert(board(LINE1,COLUMN1,P)),
    possible_moves_piece(LINE1, COLUMN1),
    nb_getval(list_movements_piece, PLAYS),
    length(PLAYS, SCORE),

    % Test dir1
    retract(board(LINE1,COLUMN1,_)),
    (direction(P1,DIR1),piece(P1,PLAYER)),
    assert(board(LINE1,COLUMN1,P1)),
    possible_moves_piece(LINE1, COLUMN1),
    nb_getval(list_movements_piece, PLAYS1),
    length(PLAYS1, SCORE1),

    % Test dir2
    retract(board(LINE1,COLUMN1,_)),
    (direction(P2,DIR2),piece(P2,PLAYER)),
    assert(board(LINE1,COLUMN1,P2)),
    possible_moves_piece(LINE1, COLUMN1),
    nb_getval(list_movements_piece, PLAYS2),
    length(PLAYS2, SCORE2),

    LIST = [SCORE, SCORE1, SCORE2],
    max_list(LIST, MAX),
    (MAX == SCORE ->
        DIR_TO_MOV = DIR
        ;
        (MAX == SCORE1 ->
            DIR_TO_MOV = DIR1
            ;
            DIR_TO_MOV = DIR2
        )
    ),

    % Restore
    retract(board(LINE1, COLUMN1, _)),
    assert(board(LINE1, COLUMN1, PIECE)).
