// WebGL - 2D Rectangle
// from https://webglfundamentals.org/webgl/webgl-2d-rectangle.html

  "use strict";


function main() {
  // Get A WebGL context
  var canvas = document.getElementById("c");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  // Use our boilerplate utils to compile the shaders and link into a program
  var program = webglUtils.createProgramFromScripts(gl, ["2d-vertex-shader", "2d-fragment-shader"]);

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // look up uniform locations
  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

  webglUtils.resizeCanvasToDisplaySize(gl.canvas);

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Create a buffer to put three 2d clip space points in
  var positionBuffer = gl.createBuffer();

  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

  var originPoint = [200,500]; // 原點
  var axisWidth = 600; // 軸寬
  var axisHeight = 400; //軸長
  var XNum = 10; // x軸的格線有幾條 -->一定要能整除axisWidth
  var YNum = 10; // y軸的格線有幾條 -->一定要能整除axisHeight
  DrawAxis(originPoint, axisWidth, axisHeight);

  // 畫出xy軸
  function DrawAxis(originPoint, axisWidth, axisHeight)
  {
    var xWidth = 10; // x軸的寬度

    var Xaxis = [
      originPoint[0],originPoint[1], originPoint[0] + axisWidth,originPoint[1],
      originPoint[0],originPoint[1]+ xWidth, originPoint[0] + axisWidth,originPoint[1]+ xWidth,
    ];
    setGL(Xaxis, 4, gl.LINES);
    for(var i=1; i<=XNum; i++)
    {
      var spacing = axisWidth / XNum;
      var grid =[ originPoint[0] + i*spacing , originPoint[1]+ xWidth ,
                  originPoint[0] + i*spacing , originPoint[1]];
      setGL(grid, 2, gl.LINES);
    }


    var Yaxis = [
      originPoint[0],originPoint[1] + xWidth ,originPoint[0], originPoint[1] - axisHeight
      
    ];
    setGL(Yaxis, 2, gl.LINES);
    for(var i=0; i<=YNum; i++)
    {
      var spacing = axisHeight / YNum;
      var grid =[ originPoint[0] - xWidth , originPoint[1] - i*spacing ,
                  originPoint[0] , originPoint[1] - i*spacing];
      setGL(grid, 2, gl.LINES);
    }
  }

  function setGL(v, numOfPoints, glType)
  {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); 
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // Draw the rectangle.
    var primitiveType = glType;
    var offset = 0;
    gl.drawArrays(primitiveType, offset, numOfPoints);
  }

  var line1 = [230, 400, 320, 380, 510, 360, 720, 300];
  setGL(line1, 4, gl.LINE_STRIP);
  var line2 = [230, 380, 320, 350, 510, 320, 720,270];
  setGL(line2, 4, gl.LINE_STRIP);
  var line3 = [230, 375, 320, 330, 510, 315, 720,265];
  setGL(line3, 4, gl.LINE_STRIP);
  var line4 = [230, 360, 320, 310, 510, 290, 720,240];
  setGL(line4, 4, gl.LINE_STRIP);


}

main();
