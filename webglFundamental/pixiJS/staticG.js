var renderer = PIXI.autoDetectRenderer(800, 600,{ antialias: true ,backgroundColor : 0x4dffff});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();


// 基本設定
var origin = [100, 100];
var width = 600, height = 400;
var xOffset = 70, yOffset = 40;
var yBaseline = "00:00";
var yBaseValue = parseInt(yBaseline.split(":")[0]*60) + parseInt(yBaseline.split(":")[1]);

//畫出軸線
graphics.lineStyle(5, 0x000000, 1);
graphics.moveTo(origin[0],origin[1]);
graphics.lineTo(origin[0]+width, origin[1]);
graphics.moveTo(origin[0],origin[1]);
graphics.lineTo(origin[0], origin[1] + height);

//將視覺區的底色刷白
graphics.lineStyle(1, 0xffffff, 0);
graphics.beginFill(0xffffff, 1);
graphics.drawRect(origin[0],origin[1], width, height);
// set a fill and line style
graphics.beginFill(0xFF3300);
graphics.lineStyle(4, 0xffd900, 1);
graphics.endFill();
stage.addChild(graphics);

//x輔助線
for(var i=1; i<9; i++)
{
	graphics.lineStyle(2, 0x01b468, 1);
	graphics.moveTo(origin[0] + i * xOffset ,origin[1]);
	graphics.lineTo(origin[0] + i * xOffset ,origin[1] + height);
}
//y輔助線
for(var i=0; i<9; i++)
{
	graphics.lineStyle(2, 0x01b468, 1);
	graphics.moveTo(origin[0],origin[1]+yOffset + i*yOffset + 10);
	graphics.lineTo(origin[0]+width,origin[1]+yOffset + i*yOffset + 10);
}


//console.log(testData);
// 畫上資料
graphics.lineStyle(3, 0x2828ff, 1);
graphics.moveTo(origin[0] + 1 * xOffset,  origin[1]+yOffset + 0*yOffset + 10+ 4*(testData[0].time.split(":")[0]*60 + testData[0].time.split(":")[1] - yBaseValue));
for(var i=1; i<testData.length; i++)
{
	graphics.lineTo(origin[0] + (i+1)* xOffset,origin[1]+yOffset + 10 + 4*(testData[i].time.split(":")[0]*60 + testData[i].time.split(":")[1] - yBaseValue));
}




//設定標題文字
var TitleText = new PIXI.Text('時序叢線圖');
TitleText.x = 550;
TitleText.y = 550;
stage.addChild(TitleText);

//設定x軸文字
var stationName = ["01F0467S","01F0509S","01F0532S","01F0557S","01F0578S","01F0633S","01F0664S","01F0681S","01F0750S"];
var style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 16,
    fontStyle: 'oblique',
    fontWeight: 'bold',
    //fill: ['#ffffff', '#00ff99'], // gradient
    wordWrap: true,
    wordWrapWidth: 440
});
for(var i=0; i<8; i++)
{
	var stationText = new PIXI.Text(stationName[i], style);
	stationText.x = origin[0]+25 + i*xOffset;
	stationText.y = origin[1]-65;
	stationText.rotation += 0.7;
	stage.addChild(stationText);
}

//設定y軸文字
var timeName = ["00:00", "00:10", "00:20", "00:30", "00:40","00:50", "01:00","01:10","01:20"]
for(var i=0; i<9; i++)
{
	var timeText = new PIXI.Text(timeName[i], style);
	timeText.x = origin[0]-50;
	timeText.y = origin[1]+yOffset + i*yOffset;
	stage.addChild(timeText);
}


renderer.render(stage);