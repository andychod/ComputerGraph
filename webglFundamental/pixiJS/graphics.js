/*var mycanvas = new PIXI.Application(800, 600, { antialias: true ,backgroundColor : 0x4dffff});
document.body.appendChild(mycanvas.view);

// create the root of the scene graph
var stage = new PIXI.Container();

var graphics = new PIXI.Graphics();

//畫出軸線
graphics.lineStyle(5, 0x000000, 1);
graphics.moveTo(50,50);
graphics.lineTo(600, 50);
graphics.moveTo(50,50);
graphics.lineTo(50, 400);

//將視覺區的底色刷白
graphics.lineStyle(1, 0xffffff, 0);
graphics.beginFill(0xffffff, 1);
graphics.drawRect(50, 50, 550, 350);
// set a fill and line style
graphics.beginFill(0xFF3300);
graphics.lineStyle(4, 0xffd900, 1);

// draw a shape
graphics.moveTo(0,0);
graphics.lineTo(250, 50);
graphics.lineTo(100, 100);
graphics.lineTo(50, 50);
graphics.endFill();

// set a fill and a line style again and draw a rectangle
graphics.lineStyle(2, 0x0000FF, 1);
graphics.beginFill(0xFF700B, 1);
graphics.drawRect(50, 250, 120, 120);

// draw a rounded rectangle
graphics.lineStyle(2, 0xFF00FF, 1);
graphics.beginFill(0xFF00BB, 0.25);
graphics.drawRoundedRect(150, 450, 300, 100, 15);
graphics.endFill();

// draw a circle, set the lineStyle to zero so the circle doesn't have an outline
graphics.lineStyle(0);
graphics.beginFill(0xFFFF0B, 0.5);
graphics.drawCircle(470, 90,60);
graphics.endFill();

stage.addChild(graphics);


var basicText = new PIXI.Text('Basic text in pixi');
basicText.x = 30;
basicText.y = 90;

stage.addChild(basicText);
mycanvas.render(stage);
*/


var renderer = PIXI.autoDetectRenderer(800, 600,{ antialias: true ,backgroundColor : 0x4dffff});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();


var graphics = new PIXI.Graphics();

//畫出軸線
graphics.lineStyle(5, 0x000000, 1);
graphics.moveTo(50,50);
graphics.lineTo(600, 50);
graphics.moveTo(50,50);
graphics.lineTo(50, 400);

//將視覺區的底色刷白
graphics.lineStyle(1, 0xffffff, 0);
graphics.beginFill(0xffffff, 1);
graphics.drawRect(50, 50, 550, 350);
// set a fill and line style
graphics.beginFill(0xFF3300);
graphics.lineStyle(4, 0xffd900, 1);
stage.addChild(graphics);
graphics.endFill();

//畫出叢線
var mycolor = ["0xff60af", "0x0000c6", "0x01b468", "0xffd306", "0x984b4b"];
var n = Math.floor(Math.random()*10 + 5);

for(var i=0; i<=n; i++)
{
	graphics.lineStyle(4, mycolor[i%5], 1);
	var offsety = Math.floor(Math.random()*50 + 70);
	graphics.moveTo(100,offsety);
	for(var j=200 ;j<=500; j+=100)
	{
		offsety += Math.floor(Math.random()*63+20);
		graphics.lineTo(j, offsety);
	}
}
/*graphics.moveTo(100,100);
graphics.lineTo(200, 130);
graphics.lineTo(300, 200);
graphics.lineTo(400, 275);
graphics.lineTo(500, 330);*/


//設定文字
var basicText = new PIXI.Text('時序叢線圖');
basicText.x = 550;
basicText.y = 550;
stage.addChild(basicText);

renderer.render(stage);