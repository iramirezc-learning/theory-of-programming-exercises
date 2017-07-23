// Queue
// ==================================================
function Queue() {
    this.items = [];
}

Queue.prototype.enqueue = function (item) {
    this.items.push(item);
};

Queue.prototype.dequeue = function () {
    return this.items.shift();
};

Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
};

// BFS
// ==================================================
function BFS(graph, source) {
    var bfsInfo = [];
    for (var i = 0; i < graph.length; i++) {
        bfsInfo[i] = {
            level: null,
            parent: null
        };
    }
    bfsInfo[source].level = 0;
    var queue = new Queue();
    queue.enqueue(source);
    while (!queue.isEmpty()) {
        var u = queue.dequeue();
        for (var j = 0; j < graph[u].length; j++) {
            var v = graph[u][j];
            if (bfsInfo[v].level === null) {
                bfsInfo[v].level = bfsInfo[u].level + 1;
                bfsInfo[v].parent = u;
                queue.enqueue(v);
            }
        }
    }
    return bfsInfo;
}

// Game
// ==================================================
function Game() {
    this.board = [];
}

Game.prototype.initBoard = function (n) {
    for (var i = 0; i < n; i++) {
        this.board[i] = [];
        var next = i + 1;
        for (var dice = 1; next < n && dice <= 6; dice++) {
            this.board[i].push(next++);
        }
    }
};

Game.prototype.printBoard = function () {
    for (var i = 0; i < this.board.length; i++) {
        console.log(i + ' -> ' + this.board[i].join(' -> '));
    }
};

// Replace Function
// ==================================================
function replace(game, oldVertex, newVertex) {
    oldVertex = parseInt(oldVertex) - 1; //Because my first vertex is 0
    newVertex = parseInt(newVertex) - 1;
    game.board[oldVertex] = [];
    var i = oldVertex - 6;
    i = i < 0 ? 0 : i; // In case that ladder/snake is in the first 6 blocks
    for (; i < oldVertex; i++) {
        for (var j = 0; j < game.board[i].length; j++) {
            if (game.board[i][j] === oldVertex) {
                game.board[i][j] = newVertex;
                break;
            }
        }
    }
}

// Print BFS
// ==================================================
function printBFS(bfs) {
    for (var i = 0; i < bfs.length; i++) {
        console.log('Vertex: ' + i + ' at level: ' + bfs[i].level + ' has parent: ' + bfs[i].parent);
    }
}

function printBFSPathTo(bfs, target) {
    target = target - 1;
    if (bfs[target]) {
        var vertex = bfs[target];
        var moves = vertex.level;
        console.log('Number of Moves required = ' + (moves ? moves : -1));
        if (moves) {
            var path = target + 1;
            while (vertex.parent !== null) {
                path = (vertex.parent + 1) + ' ' + path;
                vertex = bfs[vertex.parent];
            }
            console.log(path);
        }
    }
}

// StartGame
// ==================================================
function startGame(input) {
    // Start Game
    var game = new Game();
    game.initBoard(100);

    // Process Input
    input = input.trim().split('\n');
    //console.log(input);

    // Get the Ladders
    var nLadders = parseInt(input[0]);
    //console.log('Total Ladders->' + nLadders);
    var ladders = [];
    for (var i = 1; i <= nLadders; i++) {
        ladders.push(input[i].split(' '));
    }
    //console.log(ladders);

    // Replace the vertices for ladders
    ladders.forEach(function (ladder) {
        replace(game, ladder[0], ladder[1]);
    });

    // Get the Snakes
    var nSnakes = parseInt(input[i++]);
    //console.log('Total Snakes->' + nSnakes);
    var snakes = [];
    for (; i < input.length; i++) {
        snakes.push(input[i].split(' '));
    }
    //console.log(snakes);

    // Replace the vertices for snakes
    snakes.forEach(function (snake) {
        replace(game, snake[0], snake[1]);
    });

    // Print Board
    //game.printBoard();

    // Result
    var bfsInfo = BFS(game.board, 0);
    //printBFS(bfsInfo);
    printBFSPathTo(bfsInfo, 100);
}

// Read Input
// ==================================================
var http = new XMLHttpRequest();
var inputUrl = 'snakes-and-ladders-game/input2.txt';
http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
        var input = http.responseText;
        startGame(input);
    }
};
http.open('GET', inputUrl, true);
http.send();
