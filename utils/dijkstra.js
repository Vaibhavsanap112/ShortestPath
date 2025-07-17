function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const visited = new Set();
    const queue = [];

    // Initialize distances and queue
    graph.forEach(city => {
        distances[city.name] = Infinity;
        previous[city.name] = null;
        queue.push(city.name);
    });

    distances[start] = 0;

    while (queue.length > 0) {
        // Get node with minimum distance
        let current = queue.reduce((minNode, node) =>
            distances[node] < distances[minNode] ? node : minNode
        );

        queue.splice(queue.indexOf(current), 1);
        visited.add(current);

        if (current === end) break;

        const currentCity = graph.find(city => city.name === current);
        if (!currentCity) continue;

        currentCity.connections.forEach(neighbor => {
            if (visited.has(neighbor.destination)) return;

            const alt = distances[current] + neighbor.weight;
            if (alt < distances[neighbor.destination]) {
                distances[neighbor.destination] = alt;
                previous[neighbor.destination] = current;
            }
        });
    }

    // Reconstruct shortest path
    const path = [];
    let currentNode = end;

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    // If start is unreachable, return empty
    if (path[0] !== start) return [];

    return path;
}

module.exports = dijkstra;