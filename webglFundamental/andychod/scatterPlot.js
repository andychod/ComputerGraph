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


  for(var i=0; i<2; i++)
  {
    var Xaxis = [
      200, 200,500,200
    ];
    var Yaxis = [
      200, 200,
      200, 500,
    ];

    if(i==0)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Xaxis), gl.STATIC_DRAW);
    else
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Yaxis), gl.STATIC_DRAW);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); 

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height); 

    // draw
    var primitiveType = gl.LINES;
    var offset = 0;
    var count = 2;
    gl.drawArrays(primitiveType, offset, count);
  }

  /*var pp = [400,400
      ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pp), gl.STATIC_DRAW);
  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); 

  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height); 

// draw
    var primitiveType = gl.POINTS;
    var offset = 0;
    var count = 1;
    gl.drawArrays(primitiveType, offset, count);*/

  var ppoints;
  for (var ii = 0; ii < 50; ++ii) {
    // Setup a random rectangle
    // This will write to positionBuffer because
    // its the last thing we bound on the ARRAY_BUFFER
    // bind point
    ppoints = [220 + Math.floor(Math.random() * 250), 220 + Math.floor(Math.random() * 250)];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ppoints), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer); 
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // Draw the rectangle.
    var primitiveType = gl.POINTS;
    var offset = 0;
    var count = 1;
    gl.drawArrays(primitiveType, offset, count);
  }


}

main();
