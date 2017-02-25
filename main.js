recalculables = [];
displayables = [];
clickables = [];
dragables = [];

function setup() {
    createCanvas(800, 500);
    background(125);
    frameRate(120);
    s1 = new Shape().position(100, 100).label('1');
    s2 = new Shape().position(100, 200).label('2');
    s3 = new Shape().position(200, 100).label('3');
    s4 = new Shape().position(200, 200).label('4');
    displayables = [s1, s2, s3, s4];
    clickables = [s1, s2, s3, s4];
    dragables = [s1, s2, s3, s4];
}
function sortAll() {
    displayables.sort(function (a, b) {
        return a.z - b.z;
    });
    clickables.sort(function (a, b) {
        return b.z - a.z;
    });
    dragables.sort(function (a, b) {
        return a.z - b.z;
    });
}
function draw() {
    background(125);
    sortAll();
    displayables.forEach(function (e) {
        e.display();
    });
}

function mousePressed() {
    //console.log('mousePressed');
}
function mouseReleased() {
    //console.log('mouseReleased');
}
function mouseClicked() {    
    var elementPressed = false;
    clickables.forEach(function (e) {
        if (!elementPressed) {
            elementPressed |= e.clicked();
        }
    });
    if (!elementPressed) {
        clickables.forEach(function (e) {
            e.deselect();
        });
    }
    console.log('mouseClicked\n---');
}
function mouseMoved() {
    if (mouseIsPressed) {
        //console.log('mouseMoved');
    }
}
function mouseDragged() {
    dragables.forEach(function (e) {
        e.dragged();
    });
    //console.log('mouseDragged');
}
