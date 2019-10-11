// class Point
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
}

// class Figure
function Figure() {
    this.points = [];
}

Figure.prototype.move = function (x, y) {
    for (var i in this.points) this.points[i].move(x, y);
}

Figure.prototype.area = function () { 
    throw new Error("Not implemented"); 
}

Figure.prototype.scale = function () { 
    throw new Error("Not implemented"); 
}

// class Circle
function Circle(center, radius) {
    Figure.call(this);
    this.points.push(center);
    this.radius = radius;
}

Circle.prototype = Object.create(Figure.prototype);

Circle.prototype.area = function() {
    return Math.PI * this.radius * this.radius;
}

Circle.prototype.scale = function(scale) {
    this.radius *= scale;
}

// class Rect
function Rect(a, b) {
    Figure.call(this);
    this.points.push(a);
    this.points.push(b);
}

Rect.prototype = Object.create(Figure.prototype);

Rect.prototype.sizes = function() {
    var a = Math.abs(this.points[1].x - this.points[0].x);
    var b = Math.abs(this.points[1].y - this.points[0].y);
    return [a, b];
}

Rect.prototype.area = function() {
    var sizes = this.sizes();
    return sizes[0] * sizes[1];
}

Rect.prototype.scale = function(scale) {
    var sizes = this.sizes();
    this.points[1].x = this.points[0].x + sizes[0] * scale;
    this.points[1].y = this.points[0].y + sizes[1] * scale;
}

// создаём несколько фигур и помещаем их в массив для пакетной обработки
var figures = [];
figures.push( new Circle(new Point(1, 2), 3) );
figures.push( new Rect(new Point(1, 2), new Point(4, 6)) );

// вычисляем площадь всех фигур
var area1 = 0;
for (var i in figures) area1 += figures[i].area();
console.log("first area", area1);

// Увеличиваем все фигуры в два раза и перемещаем влево вверх
console.log("scale figures by 2");
for (var i in figures) {
  figures[i].scale(2); // вызовется у каждой фигуры свой метод
  figures[i].move(-1, -1); // вызовется родительский метод
}

// вычисляем площадь всех фигур
var area2 = 0;
for (var i in figures) area2 += figures[i].area();
console.log("second area", area2);
