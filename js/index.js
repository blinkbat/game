

// initialize board vars
const board = [];
let row = [];
let playerLoc = [];

// grab from DOM
const root = $( "#root" );
const log = $( "#log" );



initBoard = () => {
    // create 10 rows
    for( i = 0; i < 10; i++ ) {

        // create ten cell arrs in each row
        for( j = 0; j < 10; j++ ) {

            // create cell with x, y, content
            row.push({
                x: j,
                y: i,
                content: "."
            });

        }

        board.push( row );
        row = [];

    }

    console.log( board );
};



renderBoard = () => {

    root.empty();

    // for each cell
    board.forEach( row => {

        row.forEach( cell => {

            let cellClass = "cell";

            if( cell.content === "#" ) { cellClass = "grass"; }

            if( cell.content === "#" ) { cellClass = "wall"; }
            if( cell.content === "@" ) { cellClass = "player"; }
            if( cell.content === "$" ) { cellClass = "foe"; }

            // if not end of row,
            if( cell.x != 9 ) {
                // append a cell
                root.append( `<div class="${ cellClass }">${ cell.content }</div>` );
            } else {
                // append a cell and linebreak
                root.append( `<div class="${ cellClass }">${ cell.content }</div> <br/>` );
            }

        });


    });

};



initBoard();

renderBoard();











