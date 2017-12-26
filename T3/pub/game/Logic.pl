:- dynamic player/2.

% clean all player predicates
clean_players:-
    retractall(player(_,_)),
    !.

% init dynamic facts and global varibles required in the game
init_game:-
    create_board,
    create_board_res,
    nb_setval(plays_left,1),
    !.

% clean all dynamic predicates of the game
clean_game_stuff:-
    clean_players,
    clean_board,
    clean_board_res,
    !.

% plays the game. Manages the entire game
play:-
    init_game,
    nb_setval(player,1),
    repeat,
        nb_getval(player, PLAYER),
        get_all_possible_moves,
        %draw_possible_moves(PLAYER),
        show_board,
    	choose_piece(PLAYER, LINE, COLUMN),
        %delete_possible_moves(PLAYER),
        show_board,
    	move_piece(PLAYER, LINE, COLUMN),
        show_board,
        change_player,
        (final ->
            !
            ;
            fail
        ),
    score,
    clean_game_stuff.

% choose a piece to play (user or bot)
% choose_piece(+ PLAYER, - LINE, - COLUMN)
choose_piece(PLAYER, LINE, COLUMN):-
    player(PLAYER, TYPE),
    (TYPE == 'HUMAN' ->
        repeat,
        nl,
        write('[PLAYER '),
        write(PLAYER),
        write('] Choose a piece to play'),
        choose_line(LINE),
        choose_column(COLUMN),
        (piece_belongs_to_player(PLAYER, LINE, COLUMN) ->
            possible_moves_piece(LINE, COLUMN),
            nb_getval(list_movements_piece, MOVES),
            length(MOVES, TAM),
            (TAM == 0 ->
                show_board,
                write('\nERROR: That piece is stuck'),
                nl,
                fail
                ;
                !
            )
            ;
            show_board,
            write('\nERROR: Choose a valid piece'),
            nl,
            fail
        )

        ;
        write('[PLAYER '),
        write(PLAYER),
        write('] Choosing a piece to play'),
        bot_choose_piece(PLAYER, LINE, COLUMN)
    ).

% the user choose a line
% choose_line(- LINE)
choose_line(LINE):-
    repeat,
    nl,
    write('Line: '),
    get_single_char(LINE2),
    ascii_to_dec(LINE2,LINE1),
    write(LINE1),
    ((LINE1 =< 9 , LINE1 >= 1) ->
        !
        ; show_board,
        write('\nERROR: Invalid Line. Choose again!'),
        fail
    ),
    LINE is 10-LINE1.

% the user choose a line
% choose_column(- COLUMN)
choose_column(COLUMN):-
    repeat,
    nl,
    write('Column: '),
    get_single_char(COLUMN2),
    ascii_to_dec(COLUMN2,COLUMN1),
    COLUMN is COLUMN1 - 48,
    format('~c',COLUMN2),
    ((COLUMN =< 9 , COLUMN >= 1) ->
        !
        ; show_board,
         write('\nERROR: Invalid Column. Choose again!'),
        fail
    ).

% choose a position to move
% choose_position_to_move(+ PLAYER, - LINE, - COLUMN)
choose_position_to_move(PLAYER, LINE, COLUMN):-
    nl,
    nl,
    write('[PLAYER '),
    write(PLAYER),
    write('] Choose a position to move'),
    choose_line(LINE),
    choose_column(COLUMN),
    !.

% move a piece (user or bot)
% move_piece(+ PLAYER, + LINE, + COLUMN)
move_piece(PLAYER, LINE, COLUMN):-
    LINE_A is LINE,
    COLUMN_A is COLUMN,
    quadrant(QUADRANT, LINE_A, COLUMN_A),
    power_movement(QUADRANT, PLAYER, POWER),
    player(PLAYER, TYPE),
    repeat,
        show_board,
        ( TYPE == 'HUMAN' ->
            choose_position_to_move(PLAYER, LINE1, COLUMN1)
            ; %bot
            bot_choose_position_to_mov(LINE_A, COLUMN_A, LINE1, COLUMN1)
        ),
        (verify_movement(PLAYER, LINE_A, COLUMN_A, LINE1, COLUMN1, POWER, DIR_A) ->
            !
            ;
            fail
        ),
    pass_over_empty_tiles(LINE_A, COLUMN_A, LINE1, COLUMN1),
    pass_over_enemies_tiles(LINE_A, COLUMN_A, LINE1, COLUMN1),
    nb_getval(flag_enemy_passed, F),
    ( F == 1->
        retract(board(LINE1, COLUMN1, _)),
        ( PLAYER == 1 ->
            assert(board(LINE1, COLUMN1, '1'))
            ;
            assert(board(LINE1, COLUMN1, '2'))
        )
        ;
        retract(board(LINE1, COLUMN1, _)),
        (direction(PIECE2,DIR_A), piece(PIECE2, PLAYER)),
        assert(board(LINE1, COLUMN1,PIECE2))

    ),
    retract(board(LINE_A, COLUMN_A, _)),
    board_res(LINE_A, COLUMN_A, PIECE1),
    ( PIECE1 == 0 ->
        assert(board(LINE_A, COLUMN_A, 'null'))
        ;
        ( PIECE1 == 1 ->
            assert(board(LINE_A, COLUMN_A, '1'))
            ;
            assert(board(LINE_A, COLUMN_A, '2'))
        )
    ),

    retract(board_res(LINE1, COLUMN1, _)),
    ( PLAYER == 1 ->
        assert(board_res(LINE1, COLUMN1, 1))
        ;
        assert(board_res(LINE1, COLUMN1, 2))
    ),
    quadrant(QUADRANT_A,LINE_A,COLUMN_A),
    quadrant(QUADRANT1,LINE1,COLUMN1),

    (((QUADRANT_A == QUADRANT1) ; (F == 1)) ->
        !
        ;
        quadrante_change_direction(PLAYER,LINE1,COLUMN1,DIR_TO_MOV),
        retract(board(LINE1,COLUMN1,_)),
        (direction(P,DIR_TO_MOV),piece(P,PLAYER)),
        assert(board(LINE1,COLUMN1,P))
     ).

% alternate between players
change_player:-
    nb_getval(player, PLAYER),
    TMP is mod(PLAYER,2),
    NextPlayer is TMP +1,
    nb_setval(player, NextPlayer),
    !.

% verify if the game ends
final:-
    get_all_possible_moves,
    nb_getval(list_movements, MOVES),
    length(MOVES, TAM),
    (TAM == 0 ->
        true
        ;
        nb_getval(player, PLAYER),
        nb_getval(plays_left, PLAYS),
        number_possible_moves_player(PLAYER, COUNT),nl,nl,
        ( COUNT == 0 ->
            ( PLAYS == 0 ->
                true
                ;
                P is PLAYS - 1,
                nb_setval(plays_left, P),
                ( PLAYER == 1 ->
                    ENEMY is 2
                    ;
                    ENEMY is 1
                ),
                number_possible_moves_player(ENEMY, C), nl,nl,
                write(C), nl,nl,
                ( C == 0 ->
                    true
                    ;
                    change_player,
                    false
                )
            )
            ;
            false
        )
    ),
    !.

% displays the score
score:-
    clearScreen,
    calculate_score(1,SCORE1),
    calculate_score(2,SCORE2),

    ( SCORE1 == SCORE2 ->
        write("\t\t\t\t     DRAW")
        ;
        write("\t\t\t\t    VICTORY"),
        nl,
        ( SCORE1 > SCORE2 ->
            write("\t\t\t     Player 1 wins the game")
            ;
            write("\t\t\t     Player 2 wins the game")
        )
    ),
    nl,nl,nl,
    write("\t\t PLAYER 1 \t\t\t\tPLAYER 2"),nl,
    write("\t\t   "),
    write(SCORE1),
    write("\t\t\t\t\t   "),
    write(SCORE2),

    newLine(15),
    write("\t Prima ENTER para sair"),
    newLine(5),
    repeat,
        get_single_char(R),
        (R == 13 ->
            !
            ;
            fail
        ),
    !.

% calculates the game score of a player
% calculate_score(+ PLAYER, - COUNT)
calculate_score(PLAYER, COUNT):-
    aggregate_all(count, board_res(_,_,PLAYER), COUNT).
