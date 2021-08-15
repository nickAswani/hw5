// GUI Assignment: Implementing a Bit of  Scrabble with Drag-and-Drop
// Name: Nicholas Aswani, UMass Lowell Computer Science, nicholas_aswani@student.uml.edu
// Aug 7th, 2021

$(document).ready(function() {
    // variables 
    var board = $(".board")  
    var tiles = [];
    var tiles_dropped = [];
    var tile_count = [];
    var values = {};
    var remaining_tiles = tiles.length;
    var score = 0;
    var multiplier = 1;  

    current_score();
    tiles_container();
    initialize_rack();

    // jquery func handles submit 
    // source code reference: https://stackoverflow.com/questions/9796934/jquery-ui-remove-element-when-dropped-into-a-div-using-droppable
    $("#submit").on("click", function() {
        $(".dropped").remove();
        $("#clear").trigger("click");
    })
    
    $("#clear").on("click", function() {
        // on clear get new tiles 
        var new_tiles = get_random_tiles(tiles_dropped.length);
       // https://stackoverflow.com/questions/59444634/problem-in-finding-the-location-of-placed-word-by-player-scrabble-game-placed
        // keep track of the location of dropped tiles
        $(tiles_dropped).each(function(i, el) {
            var tile = $("<div class='tile_rack'>");  //new rack 
            tile.text(new_tiles[i]);                    // new tiles
            var tile_val = $("<div class='tile-value'>");
            tile_val.text(get_val(new_tiles[i]));
            tile.append(tile_val);
            $(".tilesRack").append(tile);  //add tile to rack
            
            $(tiles_dropped).splice(0, 1) // remove from list
            
            tile.css({   // css to position the tile 
                top: el.top + 'px',
                left: el.left + 'px',
                height: '80px',
                position: 'absolute',
            })

            // reinstate draggable effect 
            $(".tile_rack").draggable({
                grid: [7,1],
                revert: "invalid",
                snap: ".tile",
                appendTo: ".tile",
                cursor: "move",
                snapMode: "inner",

                start: function() {
                    var position = $(this).position();
                    tiles_dropped.push(position);
                }
            });
        })
        tiles_dropped = [];
    });
                                          //initialize board 
    for(var i = 0; i < 7; i++) {          //  Set up the double word positions on board
        if(i == 1 || i == 5) {
            var doubleWordTile = $("<div class='tile double-word'>");
            doubleWordTile.text("Double Word Score");
            $(".board").append(doubleWordTile);
        } else {
            $(".board").append("<div class='tile'>")
        }
    }

    // starting tiles; first hand 
    function initialize_rack() {
        var current_tiles = get_random_tiles(7);
        $(current_tiles).each(function(i, curr_tiles) {
            var tile = $("<div class='tile_rack'>");
            tile.text(curr_tiles);
            var tile_value = $("<div class='tile-value'>");
            tile_value.text(get_val(curr_tiles));
            tile.append(tile_value);
            $(".tilesRack").append(tile);
        });
        
        //source code reference: https://www.elated.com/drag-and-drop-with-jquery-your-essential-guide/
        $(".tile_rack").draggable({
            grid: [7,1],
            appendTo: ".tile",
            snap: ".tile",
            snapMode: "inner",
            cursor: "move",
            revert: "invalid",
            start: function() {
                var position = $(this).position();
                tiles_dropped.push(position);
            }
        });
        // zero the score
        score = 0;

        //update score
        current_score();
        update_remaining_tiles();
    }

    // source code reference from: https://stackoverflow.com/questions/2975091/jquery-droppable-get-the-element-dropped
    // making the tile class droppable
    // Obtain the value and update the score.
    // check if its a double word and multiply the value
    $(".tile").droppable({
        accept: ".ui-draggable",
        greedy: true,
        drop: function(e, ui) {
            var val = parseInt($(ui.draggable).find(".tile-value").text());
            if($(this).hasClass("double-word")) {
                multiplier = multiplier * 2;
            }
            score += val;
            current_score();
            update_remaining_tiles();
            $(ui.draggable).addClass("dropped");
        }
    });
   
   // initializing the array for the letter amount 
    function tiles_container() {
        score = 0;
        tile_count = [];
        tiles = [];
        values = {};
    
        // the value of each leter
        one = ["J", "K", "Q", "X", "Z"];
        two = ["B", "C", "F", "H", "M", "P", "V", "W", "Y", " "];
        three = ["G"];
        four = ["D", "S", "U", "L"];
        six = ["N", "R", "T"];
        eight = ["O"];
        nine = ["A", "I"];
        twelve = ["E"];
        set_tile(one, 1);
        set_tile(two, 2);
        set_tile(three, 3);
        set_tile(four, 4);
        set_tile(six, 6);
        set_tile(eight, 8);
        set_tile(nine, 9);
        set_tile(twelve, 12);

        //set the array with letter values and its count               
        function set_tile(arr, count) {
            $(arr).each(function() {
                var c = $(this)[0];
                tile_count.push({val: c, count: count});
                for(var i = 0; i < count; i++) {
                    tiles.push(c);
                }
            });
        }

        // initializing the letter values
        val_zero = [" "];
        val_one = ["L", "U", "S", "I", "N", "R", "O", "T", "A", "E", "X"];
        val_two = ["G", "D"];
        val_three = ["B", "P", "C", "M"]
        val_four = ["V", "F", "W", "Y", "H"];
        val_five = ["K"];
        val_eight = ["J", "K"];
        val_ten = ["Q", "Z"];
        set_val(val_zero, 0);
        set_val(val_one, 1)
        set_val(val_two, 2)
        set_val(val_three, 3)
        set_val(val_four, 4)
        set_val(val_five, 5)
        set_val(val_eight, 8)
        set_val(val_ten, 10)
        function set_val(arr, val) {
            $(arr).each(function(i, curr_tiles) {
                values[curr_tiles] = val;
            });
        }
    }
   
     //get a random value of the length
     function get_random_int(length){return Math.floor(Math.random() * (length - 1));}

    // picks 7 tiles randomly 
    function get_random_tiles(count) {
        var length = tiles.length;
        if(length <= 0) {
            throw "All tiles  have been used!";
        }
        var hand = [];
        for(var i = 0; i < count; i++) {
            rand = get_random_int(length);
            length--;
            hand.push(tiles[rand]);
            tiles.splice(rand, 1);
        }
        return hand;
    }
    // get a letter from values object
    function get_val(letter) { return values[letter];}
    
    //clear rack and create a new one
    function new_board() {
        $(".tile_rack").remove(); 
        initialize_rack();
    }

     // update score 
     function current_score() {
    $("#score").text("Score : " + (score * multiplier));
    }
    
    // update tiles left 
    function update_remaining_tiles() {
    remaining_tiles = tiles.length;
    $("#remaining_tiles").text("Tiles Remaining: " + remaining_tiles);
    }
     // start a fresh new game
     function new_game() {
         tiles_container();
         new_board();
    }

    $("#new_game").on("click", function() {   // create a new game
        new_game();
    });
});
