# Exercise 1
# returns the fall distance or falling time, rounded to two decimal places.
def freeFall(val, isD):
    g = 9.81
    # check to see if value is distance or time
    if isD:
        # calculate falling time
        answer = ((2 * val) / g) ** 0.5
    else:
        # calculate falling distance
        answer = 0.5 * g * val ** 2
    # return answer, rounded to two decimal places
    return round(answer, 2)


# Exercise 2
def RPS(s):
    # create a dictionary of selection and winning choice
    pairs = {"R": "P", "P": "S", "S": "R"}
    # create a new string with the winning strategy
    # identify each winning choice from the dictionary and join to string
    return "".join([pairs.get(choice) for choice in s])


# Exercise 3
def list2str(l):
    # convert to string
    new_string = str(l)
    characters = [" ", "'", '"', ","]
    # check string for characters to be removed
    for char in characters:
        if char in new_string:
            # remove character
            new_string = new_string.replace(char, "")
    return new_string


# Exercise 4
def textPreprocessing(text):
    # outline text processing parameters
    punctuation = ".?!,:;-[]{}()’"
    stop_words = ["i", "a", "about", "am", "an", "are", "as", "at", "be", "by", "for", "from", "how", "in", "is", "it",
                  "of", "on", "or", "that", "the", "this", "to", "was", "what", "when", "where", "who", "will", "with"]
    word_endings = ["ed", "ing", "s"]
    # remove punctuation from the text
    for c in text:
        if c in punctuation:
            text = text.replace(c, "")
    # convert the text to lower case, segment into a list and remove stop words
    key_words = [word for word in text.lower().split(" ") if word not in stop_words]
    # check if each word in list has a specified ending, reduce key word to base form and change list item if true
    for i in range(len(key_words)):
        word = key_words[i]
        for end in word_endings:
            if word.endswith(end):
                key_words[i] = word.replace(word, word[:-len(end)])

    return key_words


# Exercise 5
def isGreaterThan(dict1, dict2):
    # check if both dictionaries are equal
    if dict1 == dict2:
        return False
    # check to see if dictionary keys are equal
    if dict1.keys() == dict2.keys():
        for key in dict1:
            # check if all values of dict1 are greater or equal to those in dict2
            if dict1.get(key) < dict2.get(key):
                return False
    else:
        # check to see if dict2 contains any keys not in dict1
        if set(dict2.keys()).issubset(dict1.keys()):
            for key in dict2:
                # check to ensure all dict1 values are greater or equal to dict2 values
                if dict1.get(key) < dict2.get(key):
                    return False
        # if dict2 contains keys not in dict1, return false
        else:
            return False
    # return true if all tests passed
    return True


# Exercise 6
def CSVsum(filename):
    # open csv file
    file = open(filename, "r")
    # read from csv line by line, remove '\n' at the end of line
    lines = [line.rstrip() for line in file]

    file_as_array = []

    for line in lines:
        # converts lines to array of items
        line_as_array = line.split(",")
        number_list = []
        # converts numbers to a float and appends them to number_list
        for i in line_as_array:
            # ignores header if present
            try:
                number_list.append(float(i))
            except ValueError:
                pass
        # checks to make sure empty lists are not appended to the list (from header)
        if number_list:
            file_as_array.append(number_list)

    list_col_sum = []
    # assumes that the length of every list in file_as_array is equal
    for num in range(len(file_as_array[0])):
        column = []
        for i in file_as_array:
            # selects each item from every column in 2D array
            column.extend(i[num:num+1])
        # calculates sum of column and adds to list_col_sum
        list_col_sum.append(sum(column))

    return list_col_sum


def str2list(s):
    # place a comma between each char in string
    separated_string = ",".join([x for x in s])
    # split the string into a list of each char
    new_list = separated_string.split(",")
    # convert the list to a string and replace quoted brackets with unquoted brackets
    replaced_string = str(new_list).replace("'[',", '[').replace("']'", ']')
    # interpret the string as code in order to convert to a list, remove unnecessary brackets
    lst = eval(replaced_string).pop(0)
    return lst


# Exercise 8
# find the multiplier for the battle, accepts spacemon type(planet) as parameters
def multiplier(planet1, planet2):
                    #m  #v  #e  #M
    ad_multiplier = [[1, 2, 1, 0.5],  # m
                     [0.5, 1, 2, 1],  # v
                     [1, 0.5, 1, 2],  # e
                     [2, 1, 0.5, 1]]  # M
    # used to find  index location of each planet in ad_multiplier
    multi_dictionary = {"Mercury": 0, "Venus": 1, "Earth": 2, "Mars": 3}
    # get row/ column index of each planet
    planet1 = multi_dictionary.get(planet1)
    planet2 = multi_dictionary.get(planet2)
    # locate the multipliers for each planet by using row/column index's
    attack_multi = ad_multiplier[planet1][planet2]
    defend_multi = ad_multiplier[planet2][planet1]

    return attack_multi, defend_multi


# calculate and deal the damage, return the new energy level of the spacemon
def damage_cal(multi, power, energy):
    return energy - (multi * power)


# fights a pair of spacemon and returns the winning spacemon
def fight(spacemon1, spacemon2):
    # set spacemon parameters to easy to understand variables
    type1, energy1, power1 = spacemon1[0], spacemon1[1], spacemon1[2]
    type2, energy2, power2 = spacemon2[0], spacemon2[1], spacemon2[2]
    # get damage multipliers for the fight
    attack_multi, defend_multi = multiplier(type1, type2)
    # while both spacemon have energy left, fight
    while energy1 and energy2 > 0:
        # check to see if spacemon has energy to fight, calculate damage and health
        if energy1 > 0:
            energy2 = damage_cal(attack_multi, power1, energy2)
        if energy2 > 0:
            energy1 = damage_cal(defend_multi, power2, energy1)
        # if a spacemon has no energy left, update the winning spacemons energy and return winner and team number
        if energy1 <= 0:
            spacemon2 = (type2, energy2, power2)
            return spacemon2, "2"
        if energy2 <= 0:
            spacemon1 = (type1, energy1, power1)
            return spacemon1, "1"


# runs the spacemon simulation
def spacemonSim(roster1, roster2):
    # converts spacemon rosters to lists for easier manipulation
    list_roster1 = [list(i) for i in roster1]
    list_roster2 = [list(i) for i in roster2]
    # while both rosters have spacemon left #
    while list_roster1 and list_roster2:
        # call the fight function to obtain the winner from first spacemon in each roster
        winner = fight(list_roster1[0], list_roster2[0])
        # updates one roster with winning spacemons new energy
        # deletes losing spacemon from other roster
        if winner[1] == "1":
            list_roster1[0] = winner[0]
            del list_roster2[0]
        if winner[1] == "2":
            list_roster2[0] = winner[0]
            del list_roster1[0]
        # returns appropriate boolean value based on the winner
        if len(list_roster1) == 0:
            return False
        if len(list_roster2) == 0:
            return True


# Exercise 9
# find the shortest path from a starting cell A to an arrival cell B on a grid, whilst having the highest reward.
def rewardShortPath(env):
    # function to find all neighbours of a node in the environment
    # taken from redblobgames.com blog post, written by amitp, last modified 23-03-2020
    # accessed 17-11-2021
    # https://www.redblobgames.com/pathfinding/grids/graphs.html
    # comments are my own, one variable name changed to improve code clarity.
    def neighbors(node):
        # list all possible directions a neighbour could be found
        dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        list_of_neighbours = []
        for dir in dirs:
            # find x and y coordinates of a neighbour
            neighbor = [node[0] + dir[0], node[1] + dir[1]]
            # check that the neighbour is not out of bounds of the environment
            if neighbor in all_nodes:
                # add neighbour to the list_of_neighbours for the node
                list_of_neighbours.append(neighbor)
        return list_of_neighbours
    # end of referenced code

    # create list for all nodes in the environment
    all_nodes = []

    # a function to create a graph of all nodes and their neighbours
    def create_graph(env):
        start = ""
        arrival = ""
        reward_nodes = []
        # assumes environment is square or rectangular
        # iterates through each node of the environment
        for x in range(len(env[0])):
            for y in range(len(env)):
                char = env[y][x]
                # add all node coordinates to all_nodes, except nodes with obstacles
                if char != "X":
                    all_nodes.append([x, y])
                # adds nodes containing rewards to list of reward nodes
                if char == "R":
                    reward_nodes.append(str([x, y]))
                # finds start node
                if char == "A":
                    start += str([x, y])
                # finds end node
                if char == "B":
                    arrival += str([x, y])
        # creates dictionary and adds key, value pairs of node coordinates and a list of neighbours
        graph = {}
        for node in all_nodes:
            graph[str(node)] = [str(node) for node in neighbors(node)]
        return graph, start, arrival, reward_nodes

    # code to find all possible paths
    # taken from python.org
    # accessed 17-11-2021
    # https://www.python.org/doc/essays/graphs/
    # comments my own
    def find_all_paths(graph, start, end, path=[]):
        # make a list of all nodes visited
        path = path + [start]
        # if arrived at the end node, return the path taken to reach the end node
        if start == end:
            return [path]
        # unnecessary code removed as additional checks are not necessary
        paths = []
        # iterates through all possible directions of travel from current node
        for node in graph[start]:
            # ensures that no node is travelled through more than once
            if node not in path:
                # uses backtracking to try each possibility in turn, until a solution is found
                newpaths = find_all_paths(graph, node, end, path)
                for newpath in newpaths:
                    paths.append(newpath)
        return paths
    # end of referenced code
    # These next lines of code run the programme,
    # create graph of neighbours, find start, arrival and reward nodes
    graph, start, arrival, reward_node = create_graph(env)
    length_reward_list = []
    # find length and number of rewards found for each path, append pair to length_reward_list
    for path in find_all_paths(graph, str(start), str(arrival)):
        reward = 0
        for node in path:
            if str(node) in reward_node:
                reward += 1
        length_reward_list.append([len(path)-1, reward])
    # find minimum length of all paths
    min_length = min([item[0] for item in length_reward_list])
    # find length_reward pairs with minimum length
    all_shortest_paths = [item for item in length_reward_list if item[0] == min_length]
    # find the max reward for length_reward pairs with shortest path
    max_reward = max([item[1] for item in all_shortest_paths])

    return min_length, max_reward


# Exercise 10
def cliqueCounter(network):
    # creates a graph of all connected nodes
    graph = {}
    # iterate through each cell in matrix
    for x in range(len(network[0])):
        for y in range(len(network)):
            # if connection indicated in matrix,
            if network[y][x] == 1:
                # add connection to the appropriate graph key or create new key if it does not exist
                try:
                    graph[x].append(y)
                except KeyError:
                    graph[x] = [y]

    # implement Bron-Kerbosch algorithm
    # code to implement Bron-Kerbosch algorithm
    # taken from Stack Overflow post by M Zotko 12-14-19
    # accessed 19-11-2021
    # https://stackoverflow.com/questions/13904636/implementing-bron-kerbosch-algorithm-in-python
    # comments my own
    def BronKerbosch1(P, R=None, X=None):
        # three disjoint sets of vertices
        # finds maximal cliques that include all the vertices in R, some of the vertices in P and none in X
        R = set() if R is None else R
        X = set() if X is None else X
        P = set(P)
        # if P and X are both empty then
        if not P and not X:
            # report R as a maximal clique
            yield R
        # for each vertex v in P
        while P:
            # remove vertex from P
            vertex = P.pop()
            # use recursive backtracking to consider the vertices in P in turn
            yield from BronKerbosch1(P.intersection(graph[vertex]), R.union([vertex]), X.intersection(graph[vertex]))
            # X := X ⋃ {v}
            X.add(vertex)
    # end of referenced code
    # list of maximal cliques
    cliques_list = list(BronKerbosch1(graph.keys()))
    # create list of node occurrences in cliques and sort to arrange in order
    node_occurences = [num for clique in cliques_list for num in clique]
    # sort list of nodes to arrange in order
    node_occurences.sort()
    # create dictionary of each node and number of occurrences within maximal_cliques
    result = {}
    for node in node_occurences:
        result.update({node: node_occurences.count(node)})
    return list(result.values())


