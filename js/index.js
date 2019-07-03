

 // initialize board vars
 const board = [];
 let row = [];
 let playerLoc = [];

 // grab from DOM
 const root = $( "#root" );
 const log = $( "#log" );


 // do something to test it
 
 root.append( "I came from the JS file" );

 initBoard = () => {
    // create 10 rows
    for( i = 0; i < 10; i++ ) {

        // create ten cell arrs in each row
        for( j = 0; j < 10; j++ ) {

            row.push({
                x: j,
                y: i,
                content: "."
            });

        }

        // assign current row then clear it
        board[i] = row;
        row = [];

    }

    console.log( board );
};

initBoard();











