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
	init_game, % Init new dynamic predicates
	nb_setval(player,1), % Set firs player
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
	nb_setval(bot_difficulty, Difficulty).

% BOT VS BOT
% Difficulty must be 1 for easy and 2 for hard mode
start_mode(3, Difficulty):-
	assert(player(1,'BOT')),
	assert(player(2,'BOT')),
	nb_setval(bot_difficulty, Difficulty).
