
% translate( board symbol, interface symbol)
translate('null', '   ').
translate('1', '░░░').
translate('2', '▓▓▓').
translate('1_e', ' ▷ ').
translate('1_w', ' ◁ ').
translate('1_n', ' △ ').
translate('1_s', ' ▽ ').
translate('1_ne', ' ◹ ').
translate('1_nw', ' ◸ ').
translate('1_se', ' ◿ ').
translate('1_sw', ' ◺ ').
translate('2_e', ' ▶ ').
translate('2_w', ' ◀ ').
translate('2_n', ' ▲ ').
translate('2_s', ' ▼ ').
translate('2_ne', ' ◥ ').
translate('2_nw', ' ◤ ').
translate('2_se', ' ◢ ').
translate('2_sw', ' ◣ ').
translate('X', ' X ').

% displays the board
show_board:-
    clearScreen,
    nb_setval(line, 1),
    nb_setval(collumn, 1),
    writef('╔═══╦═══╦═══╗   ╔═══╦═══╦═══╗   ╔═══╦═══╦═══╗'),
    nl,
    display_board,
    !.

% displays board, iterate between lines
display_board:-
    repeat,
        writef('║'),
        display_line,
        display_end_quadrant_v,
        nl,
        nb_getval(line,L),
        Lnew is L+1,
        nb_setval(line, Lnew),
        ( Lnew < 10 ->
            fail
            ;
            nl,
            !
        ),
    !.

% displays a line of the board
display_line:-
    repeat,
        nb_getval(line, L),
        nb_getval(collumn, C),
        board(L, C, D),
        translate(D,D1),
        writef(D1),
        writef('║'),
        display_end_quadrant_h,
        nb_getval(collumn, C),
        Cnew is C+1,
        nb_setval(collumn, Cnew),
        ( Cnew < 10 ->
            fail
            ;
            nb_setval(collumn, 1),
            !
        ),
    !.
% displays de vertical lines of the end of a quadrant
display_end_quadrant_h:-
    nb_getval(collumn, C),
    ((C == 3;  C == 6) ->
        writef(' '),
        nb_getval(line, L),
        L1 is 10 - L,
        write(L1),
        writef(' ║')
        ;
        true
    ),
    !.

% displays de horizontal lines of the end of a quadrant
display_end_quadrant_v:-
    nb_getval(line, L),
    (( L == 3;  L == 6) ->
            nl,
            writef('╚═══╩═══╩═══╝   ╚═══╩═══╩═══╝   ╚═══╩═══╩═══╝'),
            nl,
            writef('  a   b   c       d   e   f       g   h   i'),
            nl,
            writef('╔═══╦═══╦═══╗   ╔═══╦═══╦═══╗   ╔═══╦═══╦═══╗')
            ;
            (L == 9 ->
                nl,
                writef('╚═══╩═══╩═══╝   ╚═══╩═══╩═══╝   ╚═══╩═══╩═══╝')
                ;
                nl,
                writef('╠═══╬═══╬═══╣   ╠═══╬═══╬═══╣   ╠═══╬═══╬═══╣')
            )
    ),
    !.
