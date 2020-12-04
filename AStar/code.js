let nodeArr = [];
let openSet = [];
let closedSet = [];
let pathSet = [];

let nodeSize = 40;
let maxColumn = 25;
let maxRow = 15;
let nodeX = 0;
let nodeY = 0;

let columnCounter = 0;
let rowCounter = 1;
let mouseHold = 0;

let stateColor = {
    1: "white",
    2: "#3db859",
    3: "#ff6666",
    4: "lightblue",
    5: "yellow",
    6: "grey"
}

let state = {
    isNormal: 1,
    isStart: 2,
    isFinish: 3,
    isVisited: 4,
    isPath: 5,
    isBlocked: 6
}

let av = {
    startColumn: 3,
    startRow: 3,
    curColumn: 3,
    curRow: 3,
    nextColumn: 0,
    nextRow: 0,
    endColumn: 23,
    endRow: 13,
    nodeCount: 0,
    nodeFinish: false,
    nodePathDone: false,
    nodeBlocked: false,
    nodeLast: false,
    nodeParent: [0,0],
    nodeLowestF: Number.POSITIVE_INFINITY,
    nodeLowestH: Number.POSITIVE_INFINITY
}

class node{
    constructor(column, row, state) {
        this.column = column;
        this.row = row;
        this.state = state;
    }

    Draw() {
        if (columnCounter < 26) {
            columnCounter++;
        }
        if (columnCounter == 26) {
            rowCounter++;
            columnCounter = 1;
        }
        let grid = document.getElementById("grid");
        this.row = rowCounter;
        this.column = columnCounter;
        grid.innerHTML += `<div id="node${this.column}_${this.row}" style="background-color:${stateColor[this.state]}; display:inline-block; border: 2px solid #ededed; box-shadow: 0 4px 10px 0 rgba(0,0,0,0.4);"></div>`;
    }

    ChangeState(state) {
        this.state = state;
        let which = document.querySelector(`#node${this.column}_${this.row}`);
        let old = which.getAttribute("style");
        let oldState = old.substring(old.search("color:") + 6, old.search("display") - 2);
        let newState = old.replace(oldState, stateColor[this.state]);
        which.setAttribute("style", newState);
    }

    ChangeText(text) {
        let which = document.querySelector(`#node${this.column}_${this.row}`);
        which.innerHTML = text;
    }
}

window.addEventListener("mousedown", e => {
    mouseHold = 1;
})

window.addEventListener("mouseover", e => {
    if (mouseHold == 1) {
        let old = e.target.getAttribute("id");
        try {
            let column = old == "grid" ? null : old.substring(old.search("node") + 4, old.indexOf("_"));
            let row = old == "grid" ? null : old.substring(old.indexOf("_") + 1, old.length);
            for (let n = 0; n < nodeArr.length; n++) {
                if (nodeArr[n].column == column && nodeArr[n].row == row) {
                    if (getNode(column, row).state != state.isStart && getNode(column, row).state != state.isFinish && getNode(column, row).state != state.isVisited && getNode(column, row).state != state.isPath) {
                        nodeArr[n].ChangeState(state.isBlocked);
                    }
                }
            }
       } catch {}
    }
})

window.addEventListener("mouseup", e => {
    mouseHold = 0;
})

function SetupGrid() {
    for (let n = 0; n < maxRow; n++) {
        for (let n = 0; n < maxColumn; n++) {
            let nodes = new node(nodeX, nodeY, state.isNormal);
            nodeArr.push(nodes);
            nodes.Draw();  
        }   
    }
    for (let i = 1; i <= maxColumn; i++) {
        setNode(i, 1, state.isBlocked);
        setNode(i, maxRow, state.isBlocked);
        setNodeText(i, 1, i + ".<br>.");
    }
    
    for (let i = 1; i <= maxRow; i++) {
        setNode(1, i, state.isBlocked);
        setNode(maxColumn, i, state.isBlocked);
        setNodeText(1, i, i + ".<br>.");
    }

    setNode(av.startColumn, av.startRow, state.isStart);
    setNode(av.endColumn, av.endRow, state.isFinish);

    document.querySelector("#Footer_Left").innerHTML = `This page was last modified on: ${document.lastModified}`;
}

function Reset() {
    location.reload();
}

function sliderChange() {
    document.getElementById("speed_Label").textContent = `Speed: ${document.getElementById("slider_Bar").value}ms`;
}
 
function getNode(column, row) {
    for (let n = 0; n < nodeArr.length; n++) {
        if (nodeArr[n].column == column && nodeArr[n].row == row) {
            return nodeArr[n];
        }
    }
    return 0;
}

function setNode(column, row, state) {
    for (let n = 0; n < nodeArr.length; n++) {
        if (nodeArr[n].column == column && nodeArr[n].row == row) {
            nodeArr[n].ChangeState(state);
        }
    }
}

function setNodeText(column, row, text) {
    for (let n = 0; n < nodeArr.length; n++) {
        if (nodeArr[n].column == column && nodeArr[n].row == row) {
            nodeArr[n].ChangeText(text);
        }
    }
}

function Visualize() {
    requestAnimationFrame(AStar);
}

function getHeuristic(column, row, column2, row2) {
    let dX = Math.abs(column - column2);
    let dY = Math.abs(row - row2);
    return 1 * (dX + dY);
}

function getEuclidean(column, row, column2, row2) {
    let dX = Math.abs(column - column2);
    let dY = Math.abs(row - row2);
    return 1 * Math.sqrt((dX**2) + (dY**2));
}

function getOpenSetData(int){
    return int == 0 ? openSet.map(d => d.f) : openSet.map(d => d.h);
}

function getClosedSetData(int){
    return int == 0 ? closedSet.map(d => d.column) : closedSet.map(d => d.row);
}

function getMin(int){
    return int == 0 ? Math.min(...getOpenSetData(0)) : Math.min(...getOpenSetData(1));
}

function isDuplicateClosedSet(column, row) {
    for (let n = 0; n < closedSet.length; n++) {
        if (closedSet[n].column == column && closedSet[n].row == row) {
            return true;
        }
    }
    return false;
}

function isDuplicateOpenSet(column, row) {
    for (let n = 0; n < openSet.length; n++) {
        if (openSet[n].column == column && openSet[n].row == row) {
            return true;
        }
    }
    return false;
}

function updateParentO(column, row, parent) {
    for (let n = 0; n < openSet.length; n++) {
        if (openSet[n].column == column && openSet[n].row == row) {
            openSet[n].parent = parent;
            console.log("Parent Updated");
        }
    }
}

function updateParentC(column, row, parent) {
    for (let n = 0; n < closedSet.length; n++) {
        if (closedSet[n].column == column && closedSet[n].row == row) {
            closedSet[n].parent = parent;
            console.log("Parent Updated");
        }
    }
}

function storeNodeInfo(column, row) {
    if (getNode(column, row).state != state.isBlocked) {
        let nodeInfo = new Object();
        nodeInfo.column = column;
        nodeInfo.row = row;
        nodeInfo.h = getHeuristic(column, row, av.endColumn, av.endRow);
        nodeInfo.g = Math.round(getEuclidean(av.startColumn, av.startRow, column, row) * 10) / 10;
        nodeInfo.f = getHeuristic(column, row, av.endColumn, av.endRow) + Math.round(getEuclidean(av.startColumn, av.startRow, column, row) * 10) / 10;
        nodeInfo.parent = [av.curColumn, av.curRow];
        if (!isDuplicateOpenSet(column, row)) {
            openSet.push(nodeInfo);
        }
    } else {
        av.nodeBlocked = true;
    }
}

function shouldUseH() {
    let counter = 0;
    for (let n = 0; n < openSet.length; n++) {
        if (openSet[n].f == getMin(0)) {
            counter++;
        }
    }
    return counter >= 2;
}

function cleanOpenAndClose() {
    for (let n = 0; n < openSet.length; n++) {
        for (let i = 0; i < closedSet.length; i++) {
            try {
                if (openSet[n].column == closedSet[i].column && openSet[n].row == closedSet[i].row) {
                    openSet.splice(n, 1);
                }
            } catch {}
        }
    }
}

function AStar() {
    setTimeout(function() {
        //Take Columns & Rows of neighbouring nodes
        if (!av.nodeFinish && !av.nodeBlocked) {
            storeNodeInfo(av.curColumn - 1, av.curRow - 1);
            storeNodeInfo(av.curColumn, av.curRow - 1);
            storeNodeInfo(av.curColumn + 1, av.curRow - 1);
            storeNodeInfo(av.curColumn - 1, av.curRow);
            storeNodeInfo(av.curColumn + 1, av.curRow);
            storeNodeInfo(av.curColumn - 1, av.curRow + 1);
            storeNodeInfo(av.curColumn, av.curRow + 1);
            storeNodeInfo(av.curColumn + 1, av.curRow + 1);
        }

        //Get Lowest Heuristic
        for (let n = 0; n < openSet.length; n++) {
            setNodeText(openSet[n].column, openSet[n].row, `H: ${openSet[n].h} F: ${openSet[n].f} ..`);

            cleanOpenAndClose();

            if (!shouldUseH()) {
                try {
                    if (openSet[n].f == getMin(0)) {
                        av.nodeCount = n;
                        av.nextColumn = openSet[n].column;
                        av.nextRow = openSet[n].row;
                        av.nodeParent = openSet[n].parent;
                        av.nodeLast = false;
                        av.nodeBlocked = false;
                    }
                } catch {
                    av.nodeCount = 0;
                    try {av.nextColumn = openSet[0].column;} catch { alert("No Path") }
                    av.nextRow = openSet[0].row;
                    av.nodeParent = openSet[n].parent;
                    av.nodeLast = false;
                    av.nodeBlocked = false;
                }
            } else {
                if (openSet[n].h == getMin(1)) {
                    av.nodeCount = n;
                    av.nextColumn = openSet[n].column;
                    av.nextRow = openSet[n].row;
                    av.nodeParent = openSet[n].parent;
                    av.nodeLast = false;
                    av.nodeBlocked = false;
                }
            }

        }

        //Set Checked Nodes to isVisited
        if (getNode(av.nextColumn, av.nextRow).state != state.isFinish) {
            //Store Searched Path to Closed Set
            if (getNode(av.nextColumn, av.nextRow).state != state.isStart) {
                setNode(av.nextColumn, av.nextRow, state.isVisited);
                if (getNode(av.nextColumn, av.nextRow).state == state.isNormal) {
                    setNode(av.curColumn, av.curRow, state.isVisited);
                }
            }
            
            let nodeInfo = new Object();
            nodeInfo.column = av.nextColumn;
            nodeInfo.row = av.nextRow;
            nodeInfo.h = getHeuristic(av.nextColumn, av.nextRow, av.endColumn, av.endRow);
            nodeInfo.g = Math.round(getEuclidean(av.startColumn, av.startRow, av.nextColumn, av.nextRow) * 10) / 10;
            nodeInfo.f = getHeuristic(av.nextColumn, av.nextRow, av.endColumn, av.endRow) + Math.round(getEuclidean(av.startColumn, av.startRow, av.nextColumn, av.nextRow) * 10) / 10;
            nodeInfo.parent = av.nodeParent;
            if (!isDuplicateClosedSet(av.nextColumn, av.nextRow)) {
                closedSet.push(nodeInfo);
            } 
        } else {
            av.nodeFinish = true;
        }

        //set Current Node to Lowest Node
        av.curColumn = openSet[av.nodeCount].column;
        av.curRow = openSet[av.nodeCount].row;

        //Remove Closed Set from Open Set
        cleanOpenAndClose();

        //If goal is reached show the path
        if (av.nodeFinish && !av.nodePathDone) {
            //setNode(closedSet[closedSet.length - 1].column, closedSet[closedSet.length - 1].row, state.isPath);
            for (let n = closedSet.length - 1; n > 0; n--) {
                //setNode(closedSet[n].parent[0], closedSet[n].parent[1], state.isPath);
                 console.log(closedSet[n].parent + " " + `[${closedSet[n].column},${closedSet[n].row}]`);
                //pathSet.push(closedSet[n]);
            }
            // if (pathSet.length > 0) {
            //     for (let i = 1; i < pathSet.length; i++) {
            //         let gBefore = pathSet[i - 1].g;
            //         let gCurrent = pathSet[i].g;
            //         if (gBefore > gCurrent) {
            //             setNode(pathSet[i].parent[0], pathSet[i].parent[1], state.isPath);
            //             console.log(pathSet[i]);
            //         }
            //         console.log(pathSet[i]);
            //     }
            // }
            av.nodePathDone = true;
        }

        requestAnimationFrame(AStar);
    }, document.getElementById("slider_Bar").value);
}

SetupGrid();


// setNode(11, 7, state.isBlocked);
// setNode(12, 7, state.isBlocked);
// setNode(12, 8, state.isBlocked);
// setNode(12, 9, state.isBlocked);
// setNode(12, 10, state.isBlocked);
// setNode(12, 11, state.isBlocked);
// setNode(12, 12, state.isBlocked);
// setNode(12, 13, state.isBlocked);
// setNode(12, 14, state.isBlocked);