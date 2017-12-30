:- include('Menus.pl').
:- include('Board/Board_Game.pl').
:- include('Board/Board_Results.pl').
:- include('Board/Interface.pl').
:- include('Board/Quadrants.pl').
:- include('Utils.pl').
:- include('Logic.pl').
:- include('Bot.pl').
:- include('Movements.pl').


%                                %
%             Azacru             %
%                                %
%         write "azacru."        %
%     in the terminal to run     %
%                                %
%                                %

start_game(Type, Difficulty, Board, Board_res, Message):-
	clean_game_stuff, % Clean dynamic predicates
	init_game, % Init new dynamic predicates,
	board_to_matrix(Board), % Get Main Board
	board_res_to_matrix(Board_res), % Get Aux Board
	start_mode(Type, Difficulty), % Set Game type and Difficulty
	Message = "Game Started". % Message

% PLAYER VS PLAYER
start_mode(1, _):-
	assert(player(1,'HUMAN')),
	assert(player(2,'HUMAN')).

% PLAYER VS BOT
% Difficulty must be 1 for easy and 2 for hard mode
start_mode(2, Difficulty):-
	assert(player(1,'HUMAN')),
	assert(player(2,'BOT')),
	assert(bot_difficulty(Difficulty)).

% BOT VS BOT
% Difficulty must be 1 for easy and 2 for hard mode
start_mode(3, Difficulty):-
	assert(player(1,'BOT')),
	assert(player(2,'BOT')),
	assert(bot_difficulty(Difficulty)).

get_moves_piece(Line, Column, Moves, NPlays, Message):-
	possible_moves_piece(Line, Column),
	nb_getval(list_movements_piece, Moves),
	length(Moves, NPlays),
	Message = "Piece selected". % Message

get_moves_piece_bot(Moves, NPlays, Message):-
	playing(PLAYER),
	bot_choose_piece(PLAYER, Line, Column),
	possible_moves_piece(Line, Column),
	nb_getval(list_movements_piece, Moves),
	length(Moves, NPlays),
	Message = "Piece selected". % Message

move_piece_selected(LINE_A, COLUMN_A, LINE1, COLUMN1, NewBoard, NewBoardRes, NextPlayer):-
	board(LINE_A, COLUMN_A, PIECE),
	piece(PIECE, PLAYER),
	quadrant(QUADRANT, LINE_A, COLUMN_A),
	power_movement(QUADRANT, PLAYER, POWER),
	verify_movement(PLAYER, LINE_A, COLUMN_A, LINE1, COLUMN1, POWER, DIR_A),
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

	board_to_matrix(NewBoard),
	board_res_to_matrix(NewBoardRes),
	change_player,
	(final ->
		NextPlayer is 0
		;
		playing(NextPlayer)
	).

move_piece_selected_bot(LINE_A, COLUMN_A, NewBoard, NewBoardRes, NextPlayer):-
	bot_choose_position_to_mov(LINE_A, COLUMN_A, LINE1, COLUMN1),
	move_piece_selected(LINE_A, COLUMN_A, LINE1, COLUMN1, NewBoard, NewBoardRes, Tmp),
	NextPlayer=[Tmp,LINE1,COLUMN1].
