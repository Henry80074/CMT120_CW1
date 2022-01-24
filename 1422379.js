const fs = require('fs');

module.exports = {

    // Exercise 1
    freefall: (val, isD) => {
        var g = 9.81;
        var answer = null;
    /* check to see if value is distance or time */
    if (isD) {
        /* calculate falling time */ 
        answer = ((2 * val) / g) ** 0.5;
    } 
    else { 
        /* calculate falling distance */
        answer = 0.5 * g * val ** 2;
    } /* return answer rounded to two decimal places */
        return answer.toFixed(2);
    },

    // Exercise 2
    RPS: (play) => {
        var strategy = "";
        // for each char in string, concatenate winning choice to strategy
        for (var i = 0; i < play.length; i++) {
            if (play[i] == "S")
                strategy += "R";
            if (play[i] == "R")
                strategy += "P";
            if (play[i] == "P")
                strategy += "S";
        }
        return strategy;
    },

    // Exercise 3
    list2str: (l) => {
        // convert list to string and remove all commas and quotes
        return JSON.stringify(l).replace(/,/g, "").replace(/"/g,"");
    }, 

    // Exercise 4
    textPreprocessing: (text) => {
        /* outline text processing parameters */
        const stopWords = ["i", "a", "about", "am", "an", "are", "as", "at", "be", "by", "for", "from", "how", "in", "is", "it",
                    "of", "on", "or", "that", "the", "this", "to", "was", "what", "when", "where", "who", "will", "with"];
        const wordEndings = ["ed", "ing", "s"];
        /* remove punctuation from the text and convert to lower case */
        /* punctuation to be removed in regex - ".?!,:;-[]{}()’" */
        let newString = text.replace(/[!’(),-.:;?[\]{}]/g,"").toLowerCase();
        /* convert to array of words*/ 
        var wordArray = newString.split(" ");
        /* remove all stop words from the array */ 
        wordArray = wordArray.filter(item => !stopWords.includes(item));
        /* check if each word in array has a specified ending and replace word with base word if true*/
        for (var i = 0; i < wordArray.length; i++) {
            for (var j = 0; j < wordEndings.length; j++) { 
                if (wordArray[i].slice(-wordEndings[j].length) === wordEndings[j])
                wordArray[i] = wordArray[i].slice(0, -wordEndings[j].length);
            }
        }
        /* return new phrase as list */
        return wordArray;
    },

    // Exercise 5
    isGreaterThan: (dict1, dict2) => {
        /* convert dictionaries to string and compare to check if they are equal */
        if (JSON.stringify(dict1) == JSON.stringify(dict2)) {
            return false;
        }
        /* get dictionary keys and put into a string that can be compared */
        let keys1 = JSON.stringify(Object.keys(dict1).sort());
        let keys2 = JSON.stringify(Object.keys(dict2).sort());
        /* check to see if dictionary keys are equal */
        if (keys1 == keys2) {
            for(let key of Object.keys(dict1)) {
                /* check if all values of dict1 are greater or equal to those in dict2*/
                if (dict1[key] < dict2[key]) {
                return false;
                }
            }
        }    
        /* check to see if dict2 contains any keys not in dict1. */ 
        else {
            if (Object.keys(dict2).every(elem => Object.keys(dict1).includes(elem))){
                for (let key of Object.keys(dict2)) {
                    /* # check to ensure all dict1 values are greater or equal to dict2 values */
                    if (dict1[key] < dict2[key]){
                        return false;
                    } 
                } 
            /* if dict2 contains keys not in dict1, return false */
            } else {
                return false;
            } 
        } /* if dict2 contains keys not in dict1, return false */
        return true;
    },

    // Exercise 6
    CSVsum: (filename) => {
        const fs = require("fs");
        /* open csv file */
        const data = fs.readFileSync(filename, "utf8");
        /* convert to an array, seperated by rows */
        var rows = data.split("\n");
        let array = []
        /* separate each row by comma, append to new array */
        rows.forEach(row => array.push(row.split(",")));
        let listColSum = [];
        for (let i = 0; i < array[0].length; ++i) {
            let col = [];
            /* selects each item from every column in 2D array */
            array.forEach(element => {
                /* converts item to a float and pushes to column if defined */
                let float = parseFloat(element.slice(i, i + 1));
                if (!isNaN(float)) {
                    col.push(float);
                }
            });
            /* calculates the sum of the column and appends result to list */
            let colSum = col.reduce((a, b) => a + b, 0);
            listColSum.push(colSum);
        }
        return listColSum;
    },

    // Exercise 7
    str2list: (s) => {
        /* convert string into a list of separate characters */
        /*replace certain characters so the string resembles a list */
        let ans = JSON.stringify(s.split('')).replace(/"/g, "\'")
                                            .replace(/\,']'/g, ']')
                                            .replace(/'\['\,/g, '[')
                                            .replace(/'/g, '\"');
        /* constructs a list from a string representation of a list, removes unneccesary brackets */
        return JSON.parse(ans).pop(0);
    },
    
    // Exercise 8
    spacemonSim: (roster1, roster2) => {
        /* find the multiplier for the battle, accepts spacemon type(planet) as parameters */
        function multiplier(planet1, planet2) {
                                  /*m  v  e  M */
            const adMultiplier = [[1, 2, 1, 0.5], /* m */
                                  [0.5, 1, 2, 1],  /* v */
                                  [1, 0.5, 1, 2],  /* e */
                                  [2, 1, 0.5, 1]]; /* M */
            /* # used to find index location of each planet in ad_multiplier */ 
            const multiDictionary = {"Mercury": 0, "Venus": 1, "Earth": 2, "Mars": 3};
            /* get row/ column index of each planet */
            var planet1Num = multiDictionary[planet1];
            var planet2Num = multiDictionary[planet2];
            /* locate the multipliers for each planet by using row/column index's */
            var attackMulti = adMultiplier[planet1Num][planet2Num];
            var defendMulti = adMultiplier[planet2Num][planet1Num];
            return [attackMulti, defendMulti];
        }
        /* calculate and deal the damage, return the new energy level of the spacemon */
        function damageCal(multi, power, energy) {
            return energy - (multi * power);
        }
        /* fights a pair of spacemon and returns the winning spacemon */
        function fight(spacemon1, spacemon2) {
            /* set spacemon parameters to easy to understand variables */
            var type1 = spacemon1[0];
            var energy1 = spacemon1[1];
            var power1 = spacemon1[2];
            var type2 = spacemon2[0];
            var energy2 = spacemon2[1];
            var power2 = spacemon2[2]; 
            /* get damage multipliers for the fight */
            var attackMulti = multiplier(type1, type2)[0];
            var defendMulti = multiplier(type1, type2)[1];

            while (energy1 && energy2 > 0) {
                /* check to see if spacemon has energy to fight, calculate damage and health */
                if (energy1 > 0){
                    energy2 = damageCal(attackMulti, power1, energy2);
                }  
                if (energy2 > 0) {
                    energy1 = damageCal(defendMulti, power2, energy1);
                }
                /* if a spacemon has no energy left, update the winning spacemons energy and return the winner and team number*/
                if (energy1 <= 0) {
                    spacemon2 = [type2, energy2, power2];
                    return [spacemon2, "2"];
                }
                if (energy2 <= 0) {
                    spacemon1 = [type1, energy1, power1];
                    return [spacemon1, "1"];
                }
            }
        }
        /* while both rosters have spacemon left, */
        while (roster1.length && roster2.length > 0) {
            /* call the fight function to obtain the winner from first spacemon in each roster */
            let winner = fight(roster1[0], roster2[0]);
            /* updates one roster with winning spacemons new energy */
            /* deletes losing spacemon from other roster */
            if (winner[1] == "1") {
                roster1[0] = winner[0];
                roster2.shift();
            }
            if (winner[1] == "2") {
                roster2[0] = winner[0];
                roster1.shift();
            }
        }
        /* returns appropriate boolean value based on the winner */
        if (roster1.length == 0) {
            return false;
        }
        if (roster2.length == 0) {
            return true;
        }   
    },

  // Exercise 9
  rewardShortPath: (env) => {
    let start = "";
    let arrival = "";
    let allNodes = [];
    let rewardNodes = [];
    let graph = {};
    /*  function to find all neighbours of a node in the environment */ 
    /* adapted from referenced python code, see template.py */ 
    function neighbors(node) {
        /* list of all possible directions a neighbour could be found */
        var dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        var listOfNeighbors = [];
        for (let i = 0; i < dirs.length; i++) {
            /* find x and y coordinates of a neighbour */ 
            let dir = dirs[i];
            let neighbor = [node[0] + dir[0], node[1] + dir[1]];
            /* check that the neighbour is not out of bounds of the environment */
            if (JSON.stringify(allNodes).includes(JSON.stringify(neighbor))){
                /*  add neighbour to the list of neighbours for the node */
                listOfNeighbors.push(neighbor);
            }      
        }
        return listOfNeighbors;
        }
    /* a function to create a graph of all nodes and their neighbours */
    function createGraph(env) {
        /* assumes environment is square or rectangular */
        //* iterates through each node of the environment */
        for (var x = 0; x < env[0].length; x++ ) {
            for (var y = 0; y < env.length; y++) {
                let char = env[y][x];
                /* add all node coordinates to allNodes, except nodes with obstacles */
                if (char != "X") {
                allNodes.push([x, y]);
                }
                /* adds nodes containing rewards to list of reward nodes */
                if (char == "R") {
                rewardNodes.push([x, y].toString());
                }
                /* finds start node */
                if (char == "A") {
                start += ([x, y].toString());
                }
                /* finds end node */
                if (char == "B") {
                arrival += ([x, y].toString());
                }
            }
        }
        /* adds a key, value pair of node coordinates and a list of neighbours to graph object*/
        for (var n in allNodes) {
            let node = allNodes[n];
            let array = [];
            var neighborNodes = Array.from(neighbors(node));
            for (var i in neighborNodes){
                let neighbor = neighborNodes[i];
                array.push(neighbor.toString());
                graph[node.toString()] = array;
            }
        }
        return graph, start, arrival, rewardNodes;
        }
    /* finds all possible paths from start node to arrival node */ 
    /* adapted from referenced python code (see template.py) */
    function findAllPaths(graph, start, end, path=[]) {
        /*  make a list of all nodes visited */
        path = path.concat(start);
        /* # if arrived at the end node, return the path taken to reach the end node */
        if (start == end) {
            return [path];
        }
        /* unnecessary code removed as additional checks are not necessary */
        var paths = [];
        /* iterates through all possible directions of travel from current node */
        for (let i in graph[start]) {
            var node = graph[start][i];
            /* ensures that no node is travelled through more than once */
            if (!(path.includes(node))) {
                /* uses backtracking to try each possibility in turn, until a solution is found */
                let newpaths = findAllPaths(graph, node, end, path);
                for (let i in newpaths){
                    var newpath = newpaths[i];
                    paths.push(newpath);
                } 
            }
        } 
        return paths;
        }
    // These next lines of code run the programme,
    // create graph of neighbours, find start, arrival and reward nodes
    graph, start, arrival, rewardNodes = createGraph(env);
    let lengthRewardList = [];
    // find length and number of rewards found for each path, append pair to length_reward_list
    let foundList = findAllPaths(graph, start, arrival);
    for (var i in foundList) {
        var reward = 0;
        let currentPath = foundList[i];
        // check each node in path to see if it is a reward node 
        for (let i=0; i < currentPath.length; i++) {
            var currentNode = currentPath[i];
            rewardNodes.forEach(node => {
            if (currentNode.includes(node)) {
                reward += 1;
                }
            });
        } // find length of current path by counting nodes, (subtract one for start node)
        // append this to list of lengths and rewards
        lengthRewardList.push([(currentPath.length)-1, reward]);
    }
    // create list of just the lengths of all paths
    let lengths = [];
    lengthRewardList.forEach(item => lengths.push(item[0]));
    // create list of all shortest paths
    let allShortestPaths = [];
    lengthRewardList.forEach(item => { if (item[0] == Math.min(...lengths)){allShortestPaths.push(item);}});
    // create a list of all rewards for each of the shortest paths
    let shortRewards = [];
    allShortestPaths.forEach(item => shortRewards.push(item[1]));
    // find the maximum reward
    let maxReward =  Math.max(...shortRewards);
    var result = null;
    // find path with minimum length and maximum reward
    allShortestPaths.forEach(item => 
        {if (item[1] == maxReward) {result = (item);}});
    return result;
    },

    // Exercise 10
    cliqueCounter: (network) => {
        // create graph of all connected nodes
        let graph = {};
        for (var x = 0; x < network[0].length; x++) {
            let nodes = [];
            // add connection to the appropriate graph key or create new key if it does not exist
            for (var y = 0; y < network.length; y++) {
                if (network[y][x] == 1) {
                    nodes.push(y);
                    graph[x] = nodes;
            }    
        }
    }
        function* bronKerbosch1(P, R, X) {
            // three disjoint sets of vertices
            // finds maximal cliques that include all the vertices in R, some of the vertices in P and none in X
            if (R == null) {
                R = new Set(); 
            }
            if (X == null) {
                X = new Set();
            }
            // convert P to a set 
             P = new Set(Array.from(P).map(Number));
            /* if P and X are both empty then */ 
            if (P.size == 0 && X.size == 0) {
                /* report R as a clique */
                // please note, for some reason, this returns all cliques, not just maximal cliques. 
                // please can you add feedback explaining why this algorithm works differently in javascript. Thanks! :) 
                yield R;
            }
            /* for each vertex v in P do */
            while (P.size !== 0) {
                // convert set to an array in order to use array methods
                var arrP = Array.from(P).map(Number);
                var arrX = Array.from(P).map(Number);
                const vertex = arrP.shift();
                // remove vertex from p
                P.delete(vertex);
                // find set of all nodes connected to current vertex
                var graphVertex = new Set(graph[vertex]);
                // create intersection of P and graphVertex
                // create new union of R and vertex
                // create intersection of X and graphVertex
                // use recursive backtracking to consider the vertices in P in turn, using these value as parameters
                yield* bronKerbosch1(new Set(arrP.filter(value => graphVertex.has(value))),
                     new Set(Array.from(R)).add(vertex), new Set(arrX.filter(value => graphVertex.has(value))));
                /* X := X ⋃ {v} */
                X.add(vertex);
            }
        }
       // finds all maximal cliques from a list of all cliques
       /* get all cliques from function and convert array of sets to array of arrays */ 
        var cliquesList = Array.from(bronKerbosch1(Object.keys(graph))).map(e => Array.from(e));
        var maxCliquesList = cliquesList;
        // iterate through both lists
        for (let z = 0; z < cliquesList.length; z++){
            var set1 = cliquesList[z];
            for (let y = 0; y < cliquesList.length; y++) {
              var set2 = cliquesList[y];
              // if set2 is subset of set1, remove set 2 from maxCliquesList
              if (set2.every(val => set1.includes(val)) && (set2 != set1)) {
                maxCliquesList = maxCliquesList.filter(e => e !== set2);
              }
            } 
          } // get a list of all the nodes within the maxCliquesList
          var nodeOccurences = maxCliquesList.flat().sort();
          var count = {};
          // count the occurence of each node in the list
          for (var node of nodeOccurences) {
              if (count[node]) {
                  count[node] += 1;
            } else {
                count[node] = 1;
            }
          }
          /* return array of the total number of maximal cliques the node is a part of */
          return Object.values(count);
    }
};
    