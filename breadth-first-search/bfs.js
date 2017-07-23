// Queue
//==================================================

function Queue() {
    this.vertices = [];
}

Queue.prototype.enqueue = function (vertex) {
    this.vertices.push(vertex);
};

Queue.prototype.dequeue = function () {
    return this.vertices.shift();
};

Queue.prototype.isEmpty = function () {
    return this.vertices.length === 0;
};

// BFS
//==================================================

function doBFS(graph, source) {
    // BFS
    var bfsInfo = [];

    // Set info with initial values
    for (var i = 0; i < graph.length; i++) {
        bfsInfo.push({
            level: null,
            parent: null
        });
    }

    // Initialize the source at level 0;
    bfsInfo[source].level = 0;

    // Create the Queue
    var queue = new Queue();

    // Enqueue the source
    queue.enqueue(source);

    // Go through the graph
    while (!queue.isEmpty()) {
        // Enque the last first item.
        var u = queue.dequeue();
        //console.log(u);
        // For every vertex associated with the u vertex
        for (i = 0; i < graph[u].length; i++) {
            // Get the v vertex
            var v = graph[u][i];
            // If the v vertex hasn´t been visited...
            if (bfsInfo[v].level === null) {
                // Set level = parent level + 1
                bfsInfo[v].level = bfsInfo[u].level + 1;
                // Set parent
                bfsInfo[v].parent = u;
                // Enqueue v to find its associated vertices
                queue.enqueue(v);
            }
        }
    }

    // Return results
    return bfsInfo;
}

// Results
//==================================================
var graph = [
    [1],
    [7, 4, 3, 0],
    [3],
    [2, 1],
    [8, 6, 5, 1],
    [4],
    [4],
    [1],
    [4]
];
var bfsInfo = doBFS(graph, 0);

for (var i = 0; i < bfsInfo.length; i++) {
    console.log('Vertex: ' + i + ' at level: ' + bfsInfo[i].level + ' has parent: ' + bfsInfo[i].parent);
}