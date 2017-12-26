%quadrant(nr, posx, posy)

%
%   Quadrant 1
%
quadrant(1,1,1).
quadrant(1,1,2).
quadrant(1,1,3).
quadrant(1,2,1).
quadrant(1,2,2).
quadrant(1,2,3).
quadrant(1,3,1).
quadrant(1,3,2).
quadrant(1,3,3).

%
%   Quadrant 2
%
quadrant(2,1,4).
quadrant(2,1,5).
quadrant(2,1,6).
quadrant(2,2,4).
quadrant(2,2,5).
quadrant(2,2,6).
quadrant(2,3,4).
quadrant(2,3,5).
quadrant(2,3,6).

%
%   Quadrant 3
%
quadrant(3,1,7).
quadrant(3,1,8).
quadrant(3,1,9).
quadrant(3,2,7).
quadrant(3,2,8).
quadrant(3,2,9).
quadrant(3,3,7).
quadrant(3,3,8).
quadrant(3,3,9).

%
%   Quadrant 4
%
quadrant(4,4,1).
quadrant(4,4,2).
quadrant(4,4,3).
quadrant(4,5,1).
quadrant(4,5,2).
quadrant(4,5,3).
quadrant(4,6,1).
quadrant(4,6,2).
quadrant(4,6,3).

%
%   Quadrant 5
%
quadrant(5,4,4).
quadrant(5,4,5).
quadrant(5,4,6).
quadrant(5,5,4).
quadrant(5,5,5).
quadrant(5,5,6).
quadrant(5,6,4).
quadrant(5,6,5).
quadrant(5,6,6).

%
%   Quadrant 6
%
quadrant(6,4,7).
quadrant(6,4,8).
quadrant(6,4,9).
quadrant(6,5,7).
quadrant(6,5,8).
quadrant(6,5,9).
quadrant(6,6,7).
quadrant(6,6,8).
quadrant(6,6,9).

%
%   Quadrant 7
%
quadrant(7,7,1).
quadrant(7,7,2).
quadrant(7,7,3).
quadrant(7,8,1).
quadrant(7,8,2).
quadrant(7,8,3).
quadrant(7,9,1).
quadrant(7,9,2).
quadrant(7,9,3).

%
%   Quadrant 8
%
quadrant(8,7,4).
quadrant(8,7,5).
quadrant(8,7,6).
quadrant(8,8,4).
quadrant(8,8,5).
quadrant(8,8,6).
quadrant(8,9,4).
quadrant(8,9,5).
quadrant(8,9,6).

%
%   Quadrant 9
%
quadrant(9,7,7).
quadrant(9,7,8).
quadrant(9,7,9).
quadrant(9,8,7).
quadrant(9,8,8).
quadrant(9,8,9).
quadrant(9,9,7).
quadrant(9,9,8).
quadrant(9,9,9).

% calculates the player's power of movement in a given quadrant
% power_movement(+ QUADRANT, + PLAYER, - COUNT)
power_movement(QUADRANT, PLAYER, COUNT):-
    aggregate_all(count, tile_belongs_to_player(QUADRANT, _, _, PLAYER), CC),
    ( CC == 0 ->
        COUNT is CC +1
        ; COUNT is CC
    ).
