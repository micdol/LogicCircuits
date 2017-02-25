function Shape() {
    Shape.zIndex = (Shape.zIndex || 0) + 1;
    this.x = 0;
    this.y = 0;
    this.z = Shape.zIndex;
    this.w = 40;
    this.h = 30;
    this.text = '';
    this.fillCol = color(255);
    this.textCol = color(0);
    this.strokeCol = color(0);
    this.strokeWidth = 3;
    this.isSelected = false;
    this.wasDragged = false;
}
Shape.prototype.isAnySelected = false;
Shape.prototype.isAnyDragged = false;
Shape.prototype.label = function (l) {
    if (l === undefined) {
        return this.text;
    } else {
        this.text = l;
        return this;
    }
}
Shape.prototype.position = function (x, y) {
    if (x === undefined || y === undefined) {
        return [this.x, this.y];
    } else {
        this.x = x;
        this.y = y;
        return this;
    }
}
Shape.prototype.size = function (w, h) {
    if (w === undefined && h === undefined) {
        return [this.w, this.h];
    } else if (w !== undefined && h !== undefined) {
        this.w = w;
        this.h = h;
        return this;
    } else if (w !== undefined && h === undefined) {
        this.w = w;
        this.h = w;
        return this;
    }
}
Shape.prototype.display = function () {
    rectMode(CENTER);
    stroke(this.strokeCol);
    strokeWeight(this.strokeWidth);
    fill(this.state ? color(0, 255, 0) : this.fillCol);
    rect(this.x, this.y, this.w, this.h);
    fill(this.textCol);
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.text, this.x, this.y);
    if (this.isSelected) {
        noStroke();
        fill(color(189, 183, 107, 125));
        rect(this.x, this.y, this.w + 20, this.h + 20);
    }
    rectMode(CORNER);
}
Shape.prototype.contains = function (x, y) {
    var x_ok = x >= this.x - this.w / 2 && x <= this.x + this.w / 2;
    var y_ok = y >= this.y - this.h / 2 && y <= this.y + this.h / 2;
    return x_ok && y_ok;
}
Shape.prototype.pressed = function () {

}
Shape.prototype.released = function () {

}
Shape.prototype.clicked = function () {
    if (this.contains(mouseX, mouseY) && !this.isSelected) {
        this.moveToFront();
        this.select();
        return true;
    } else if (this.contains(mouseX, mouseY) && this.isSelected) {
        if (!this.wasDragged) {
            this.deselect();
        }
        this.wasDragged = false;
        return true;
    }
    return false;
}
Shape.prototype.dragged = function () {
    if (this.contains(mouseX, mouseY) && this.isSelected) {
        this.position(mouseX, mouseY);
        this.wasDragged = true;
        return true;
    }
    return false;
}
Shape.prototype.moveToFront = function () {
    this.z = ++Shape.zIndex;
    return this;
}
Shape.prototype.select = function () {
    if (!Shape.prototype.isAnySelected) {
        this.isSelected = true;
        Shape.prototype.isAnySelected = true;
    }
}
Shape.prototype.deselect = function () {
    this.isSelected = false;
    Shape.prototype.isAnySelected = false
}
