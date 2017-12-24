% clean the Screen with 100 new lines
clearScreen :-
	newLine(100), !.

% display new lines
% newLine(+ Number)
newLine(Number) :-
	newLine(0, Number).

% display new lines
% newLine(+ Line,  + Limit)
newLine(Line, Limit) :-
	Line < Limit,
	LineInc is Line + 1,
	nl,
	newLine(LineInc, Limit).

newLine(_,_).

% convert an ascii code to a decimal number
% ascii_to_dec(+ N, - N1)
ascii_to_dec(N,N1):-
	N1 is N-48.

% make a list with the parameters
% make_list_of_move(+ PLAYER, + LINE, + COLUMN, + LINE1, + COLUMN1, - RESULT)
make_list_of_move(PLAYER, LINE, COLUMN, LINE1, COLUMN1, RESULT):-
	numlist(PLAYER, PLAYER, P),
	numlist(LINE, LINE, L_B),
	numlist(COLUMN, COLUMN, C_B),
	numlist(LINE1, LINE1, L_A),
	numlist(COLUMN1, COLUMN1, C_A),
	append(P, L_B, L1),
	append(L1, C_B, L2),
	append(L2, L_A, L3),
	append(L3, C_A, RESULT).

% make a list of list with the list given
% make_list_of_list(+ LIST, - B)
make_list_of_list(LIST,B):-
	B = [LIST].

% add a list to a list of list
% add_list(+ LLIST, + LIST, - FINAL)
add_list(LLIST, LIST, FINAL):-
	make_list_of_list(LIST,B),
	append(LLIST, B, FINAL).

% direction_mov( diff x, diff y, orientation)
direction_mov(0,0,'null').
direction_mov(1,0,'n').
direction_mov(-1,0,'s').
direction_mov(0,1,'e').
direction_mov(0,-1,'w').
direction_mov(1,1,'ne').
direction_mov(1,-1,'nw').
direction_mov(-1,1,'se').
direction_mov(-1,-1,'sw').
