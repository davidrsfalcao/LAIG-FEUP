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
azacru :-
	mainMenu,
	!.
