

// initialize board vars
let board = [];
let row = [];
const playerLoc = {};

// grab from DOM
const root = $( "#root" );
const log = $( "#log" );
const char = $( "#char" );

// html entities
const dot = "&middot;";

initBoard = () => {

    board = [];

    // create 10 rows
    for( i = 0; i < 10; i++ ) {

        // create ten cell arrs in each row
        for( j = 0; j < 10; j++ ) {

            // create cell with x, y, content
            row.push({
                x: j,
                y: i,
                content: dot
            });

        }

        board.push( row );
        row = [];

    }

    console.log( board );
};



createWalls = () => {
    // for each row
    board.forEach( row => {
        // for each cell in that row
        row.forEach( cell => {

            // create base rand
            let rand = Math.floor( Math.random() * 100 );

            // start counting walls
            let wallCount = 0;

            // iterate over cell surroundings for other walls
            for( i = cell.y - 1; i < cell.y + 2; i++ ) {
                for( j = cell.x - 1; j < cell.x + 2; j++ ) {

                    // check to make sure we're in board bounds
                    if( i >= 0 && j >= 0 && i <= 9 && j <= 9) {                      

                        if( board[i][j].content === "#" ) {
                            //console.log( "wall found at " + i + ", " + j );

                            // if wall found, increase likelihood of new wall
                            rand += 15;                       
                        }

                    }

                }
            }

            // if low wall count, increase likelihood
            if( wallCount < 30 ) { rand += 5; wallCount++; }

            //console.log( rand );

            // chance to create wall
            if( rand > 90 ){
                cell.content = "#";
            }

        });
    });

};

randomStart = () => {

    const randY = Math.floor( Math.random() * 10 );
    const randX = Math.floor( Math.random() * 10 );

    if( board[ randY ][ randX ].content !== "#"
    && board[ randY ][ randX ].content !== "$" ) {
        
        board[ randY ][ randX ].content = "@";

        // assign player coords
        playerLoc.x = randX;
        playerLoc.y = randY;
        playerLoc.content = "@";
        // assign player HP
        playerLoc.hp = 20;

        console.log( playerLoc );

    } else {
        randomStart();
    }
};



generateFoes = () => {

    let foeCount = 0;

    // for each cell
    board.forEach( row => {
        row.forEach( cell => {

            const rand = Math.floor( Math.random() * 100 );

            if( rand > 90 && foeCount < 9 ) {
                cell.content = "$";
                cell.hp = Math.floor( Math.random() * 10 ) + 1;
                foeCount++;
            }

        });

    });
};



renderBoard = () => {

    root.empty();

    // for each cell
    board.forEach( row => {
        row.forEach( cell => {

            let cellClass = "cell";

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



resetGame = () => {
    initBoard();
    createWalls();
    generateFoes();

    randomStart();

    // initial render
    renderBoard();
    $( "#char" ).text( playerLoc.hp );
}



//////////////////////////////////// CRAZY CODE FOR INPUT


// listen for keys
$( document ).on( "keypress", event => {
        
    const key = event.key;

    let target = {};
    let current = { x: playerLoc.x, y: playerLoc.y };
    let dir = "";

    switch( key ) {

        // TODO: DETERMINE AND ENFORCE BOUNDS OF AREA
        // CURRENTLY RETURNS UNDEFINED WHEN OUT-OF-BOUNDS

        case "a":
            target = board[ playerLoc.y ][ playerLoc.x - 1 ];
            dir = "west";
            break;
        case "w":
            target = board[ playerLoc.y - 1 ][ playerLoc.x ];
            dir = "north";
            break;
        case "s":
            target = board[ playerLoc.y + 1 ][ playerLoc.x ];
            dir = "south";
            break;
        case "d":
            target = board[ playerLoc.y ][ playerLoc.x + 1 ];
            dir = "east";
            break;
    
    }

    if( 
    target.x >= 0 && target.y >= 0
    && target.x <= 9 && target.y <= 9

    && target.content !== "#"
    && target.content !== "$" 
    ) {

        board[ target.y ][ target.x ].content = "@";
        board[ current.y ][ current.x ].content = dot;

        playerLoc.x = target.x;
        playerLoc.y = target.y;

        log.prepend( `You skulk ${ dir }. <br />` );

        renderBoard();

    } else if( target.content === "$" ) {
        
        let attack = Math.floor( Math.random() * 5 + 1 );

        target.hp -= attack;
        log.prepend( `You strike the foe for ${ attack } damage! <br/>` );

            if( target.hp < 1 ) {
                target.content = dot;
                log.prepend( `The enemy explodes into bloody goop. Gross! <br/>` );
            } else {
                let counter = Math.floor( Math.random() * 3 + 1 );
                playerLoc.hp -= counter;
                log.prepend( `The foe counters for ${counter} damage. Oof! <br/>` );

                if( playerLoc.hp < 1 ) {
                    alert( "Y O U   D I E D" );
                    resetGame();

                } else {
                    $( "#char" ).text( playerLoc.hp );
                }
            }
        
        renderBoard();


    } else if( key === "w" || key === "a" || key === "s" || key === "d" ) {

        log.prepend( "The wall is unyielding. <br />" );
    }

});



// fire it up
resetGame();