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
	clean_game_stuff,
	init_game,
	board_to_matrix(Board),
	board_res_to_matrix(Board_res),
	Message = "Game Started".

print_matrix([]).

print_matrix([H|T]):-
	write(H), nl,
	print_matrix(T).
