/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3202:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision mediump float;\n\n#ifdef DRAW_MODE_line\nuniform vec2 u_stageSize;\nattribute vec2 a_lineThicknessAndLength;\nattribute vec4 a_penPoints;\nattribute vec4 a_lineColor;\n\nvarying vec4 v_lineColor;\nvarying float v_lineThickness;\nvarying float v_lineLength;\nvarying vec4 v_penPoints;\n\n// Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.\n// Smaller values can cause problems on some mobile devices.\nconst float epsilon = 1e-3;\n#endif\n\n#if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))\nuniform mat4 u_projectionMatrix;\nuniform mat4 u_modelMatrix;\nattribute vec2 a_texCoord;\n#endif\n\nattribute vec2 a_position;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n\t#ifdef DRAW_MODE_line\n\t// Calculate a rotated (\"tight\") bounding box around the two pen points.\n\t// Yes, we're doing this 6 times (once per vertex), but on actual GPU hardware,\n\t// it's still faster than doing it in JS combined with the cost of uniformMatrix4fv.\n\n\t// Expand line bounds by sqrt(2) / 2 each side-- this ensures that all antialiased pixels\n\t// fall within the quad, even at a 45-degree diagonal\n\tvec2 position = a_position;\n\tfloat expandedRadius = (a_lineThicknessAndLength.x * 0.5) + 1.4142135623730951;\n\n\t// The X coordinate increases along the length of the line. It's 0 at the center of the origin point\n\t// and is in pixel-space (so at n pixels along the line, its value is n).\n\tv_texCoord.x = mix(0.0, a_lineThicknessAndLength.y + (expandedRadius * 2.0), a_position.x) - expandedRadius;\n\t// The Y coordinate is perpendicular to the line. It's also in pixel-space.\n\tv_texCoord.y = ((a_position.y - 0.5) * expandedRadius) + 0.5;\n\n\tposition.x *= a_lineThicknessAndLength.y + (2.0 * expandedRadius);\n\tposition.y *= 2.0 * expandedRadius;\n\n\t// 1. Center around first pen point\n\tposition -= expandedRadius;\n\n\t// 2. Rotate quad to line angle\n\tvec2 pointDiff = a_penPoints.zw;\n\t// Ensure line has a nonzero length so it's rendered properly\n\t// As long as either component is nonzero, the line length will be nonzero\n\t// If the line is zero-length, give it a bit of horizontal length\n\tpointDiff.x = (abs(pointDiff.x) < epsilon && abs(pointDiff.y) < epsilon) ? epsilon : pointDiff.x;\n\t// The `normalized` vector holds rotational values equivalent to sine/cosine\n\t// We're applying the standard rotation matrix formula to the position to rotate the quad to the line angle\n\t// pointDiff can hold large values so we must divide by u_lineLength instead of calling GLSL's normalize function:\n\t// https://asawicki.info/news_1596_watch_out_for_reduced_precision_normalizelength_in_opengl_es\n\tvec2 normalized = pointDiff / max(a_lineThicknessAndLength.y, epsilon);\n\tposition = mat2(normalized.x, normalized.y, -normalized.y, normalized.x) * position;\n\n\t// 3. Translate quad\n\tposition += a_penPoints.xy;\n\n\t// 4. Apply view transform\n\tposition *= 2.0 / u_stageSize;\n\tgl_Position = vec4(position, 0, 1);\n\n\tv_lineColor = a_lineColor;\n\tv_lineThickness = a_lineThicknessAndLength.x;\n\tv_lineLength = a_lineThicknessAndLength.y;\n\tv_penPoints = a_penPoints;\n\t#elif defined(DRAW_MODE_background)\n\tgl_Position = vec4(a_position * 2.0, 0, 1);\n\t#else\n\tgl_Position = u_projectionMatrix * u_modelMatrix * vec4(a_position, 0, 1);\n\tv_texCoord = a_texCoord;\n\t#endif\n}");

/***/ }),

/***/ 4499:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var elements = __webpack_require__(7255);
const twgl = __webpack_require__(4391);

// --- FIX 1: Import all needed modules ---
//twgl.m4 = require("twgl.js/m4");
//twgl.primitives = require("twgl.js/primitives");
window.twgl = twgl;

var canvas = elements.createElementsFromJSON([
  {
    element: "canvas",
    width: 600,
    height: 360,
    style: {
      background: "#000000",
    },
  },
])[0];
document.body.append(canvas);

// --- 1. Get GLSL strings ---
const spriteVertexShader = (__webpack_require__(3202)/* ["default"] */ .A);
const spriteFragmentShader = (__webpack_require__(5411)/* ["default"] */ .A);

const gl = canvas.getContext("webgl");
// --- ADD THESE ---
gl.disable(gl.DEPTH_TEST); // Disable the depth test
gl.disable(gl.CULL_FACE); // Disable culling (in case quad is backwards)
// -----------------

gl.enable(gl.BLEND);
gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

// --- 2. Define effects and compile program ---
const defines = `
#define ENABLE_whirl
#define ENABLE_color
`;

const finalFragmentShader = defines + spriteFragmentShader;

const spriteProgramInfo = twgl.createProgramInfo(gl, [
  spriteVertexShader,
  finalFragmentShader,
]);

// --- 3. Create geometry that matches the Scratch shader ---

// Scratch's quad is centered at (0,0) and goes from -0.5 to +0.5
const position = [-0, -0, 1, -0, -0, 1, -0, 1, 1, -0, 1, 1];

// Scratch's texcoords are Y-flipped (0,1 is top-left)
const texcoord = [
  0,
  0, // Bottom-left vertex maps to (0,0)
  1,
  0, // Bottom-right vertex maps to (1,0)
  0,
  1, // Top-left vertex maps to (0,1)
  0,
  1, // Top-left vertex maps to (0,1)
  1,
  0, // Bottom-right vertex maps to (1,0)
  1,
  1, // Top-right vertex maps to (1,1)
];

// Create the buffer info, naming the attributes to match the shader
const quadBufferInfo = twgl.createBufferInfoFromArrays(gl, {
  a_position: {
    // This now matches `attribute vec2 a_position`
    numComponents: 2,
    data: position,
  },
  a_texCoord: {
    // This now matches `attribute vec2 a_texCoord`
    numComponents: 2,
    data: texcoord,
  },
});

// --- 4. Load the texture ---
var img = document.createElement("img");
img.src = "placeholder/costume1.svg";
img.onload = function () {
  // --- FIX 2: Create a 2D canvas with a *fixed size* ---
  var canvas2d = document.createElement("canvas");
  var ctx = canvas2d.getContext("2d");

  // Use a fixed size to force the SVG to render
  const texWidth = 256;
  const texHeight = 256;
  canvas2d.width = texWidth;
  canvas2d.height = texHeight;
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, texWidth, texHeight);
  ctx.drawImage(img, 0, 0, texWidth, texHeight);
  // --------------------------------------------------

  // --- 5. Setup drawing variables ---
  const myTexture = twgl.createTexture(gl, {
    src: canvas2d,
  });

  console.log("Texture created:", myTexture);

  const projectionMatrix = twgl.m4.ortho(
    0,
    gl.canvas.width,
    gl.canvas.height,
    0,
    -1,
    1,
  );

  // --- 6. Create the render loop ---
  function render(time) {
    time *= 0.001; // convert time to seconds

    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0); // Use 0,0,0,0 to respect canvas style background
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Calculate a model matrix
    let modelMatrix = twgl.m4.identity();
    modelMatrix = twgl.m4.translate(modelMatrix, [0, 0, 0]);
    // Scale sprite to 100x100 pixels
    modelMatrix = twgl.m4.scale(modelMatrix, [100, 100, 1]);
    //modelMatrix = twgl.m4.rotateZ(modelMatrix, time * 0.5);

    // Define uniforms (must be inside the loop for animations)
    const uniforms = {
      u_projectionMatrix: projectionMatrix,
      u_modelMatrix: modelMatrix,
      u_skin: myTexture,

      // --- FIX 4: Provide all defined uniforms ---
      u_whirl: time * 0.5, // Animate the whirl effect
      u_color: (time * 0.1) % 1.0, // Animate the color shift
    };

    // --- Draw the sprite ---
    gl.useProgram(spriteProgramInfo.program);
    twgl.setBuffersAndAttributes(gl, spriteProgramInfo, quadBufferInfo);
    twgl.setUniforms(spriteProgramInfo, uniforms);
    twgl.drawBufferInfo(gl, quadBufferInfo);

    // Request the next frame
    requestAnimationFrame(render);
  }

  // --- 7. Start the render loop ---
  requestAnimationFrame(render);
};

// Handle image loading errors
img.onerror = function () {
  console.error("Failed to load image at: " + img.src);
};


/***/ }),

/***/ 5411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("precision highp float;\n\n#ifdef DRAW_MODE_silhouette\nuniform vec4 u_silhouetteColor;\n#else // DRAW_MODE_silhouette\n# ifdef ENABLE_color\nuniform float u_color;\n# endif // ENABLE_color\n# ifdef ENABLE_brightness\nuniform float u_brightness;\n# endif // ENABLE_brightness\n#endif // DRAW_MODE_silhouette\n\n#ifdef DRAW_MODE_colorMask\nuniform vec3 u_colorMask;\nuniform float u_colorMaskTolerance;\n#endif // DRAW_MODE_colorMask\n\n#ifdef ENABLE_fisheye\nuniform float u_fisheye;\n#endif // ENABLE_fisheye\n#ifdef ENABLE_whirl\nuniform float u_whirl;\n#endif // ENABLE_whirl\n#ifdef ENABLE_pixelate\nuniform float u_pixelate;\nuniform vec2 u_skinSize;\n#endif // ENABLE_pixelate\n#ifdef ENABLE_mosaic\nuniform float u_mosaic;\n#endif // ENABLE_mosaic\n#ifdef ENABLE_ghost\nuniform float u_ghost;\n#endif // ENABLE_ghost\n\n// --- ADDED FOR WAVY EFFECT ---\n#ifdef ENABLE_wavy\nuniform float iTime;\nuniform float u_wave_xwave; // Renamed from xwave\nuniform float u_wave_ywave; // Renamed from ywave\nuniform float u_wave_xtime; // Renamed from xtime\nuniform float u_wave_ytime; // Renamed from ytime\n#endif // ENABLE_wavy\n// -----------------------------\n\n// --- ADDED FOR RIBBON EFFECT ---\n#ifdef ENABLE_ribbon\nuniform float u_ribbonShiftX;\nuniform float u_ribbonShiftY;\n#endif // ENABLE_ribbon\n// ---------------------------------\n\n#ifdef DRAW_MODE_line\nvarying vec4 v_lineColor;\nvarying float v_lineThickness;\nvarying float v_lineLength;\n#endif // DRAW_MODE_line\n\n#ifdef DRAW_MODE_background\nuniform vec4 u_backgroundColor;\n#endif // DRAW_MODE_background\n\nuniform sampler2D u_skin;\n\n#ifndef DRAW_MODE_background\nvarying vec2 v_texCoord;\n#endif\n\n// Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.\n// Smaller values can cause problems on some mobile devices.\nconst float epsilon = 1e-3;\n\n#if !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))\n// Branchless color conversions based on code from:\n// http://www.chilliant.com/rgb2hsv.html by Ian Taylor\n// Based in part on work by Sam Hocevar and Emil Persson\n// See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation\n\n\n// Convert an RGB color to Hue, Saturation, and Value.\n// All components of input and output are expected to be in the [0,1] range.\nvec3 convertRGB2HSV(vec3 rgb)\n{\n\t// Hue calculation has 3 cases, depending on which RGB component is largest, and one of those cases involves a \"mod\"\n\t// operation. In order to avoid that \"mod\" we split the M==R case in two: one for G<B and one for B>G. The B>G case\n\t// will be calculated in the negative and fed through abs() in the hue calculation at the end.\n\t// See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma\n\tconst vec4 hueOffsets = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n\n\t// temp1.xy = sort B & G (largest first)\n\t// temp1.z = the hue offset we'll use if it turns out that R is the largest component (M==R)\n\t// temp1.w = the hue offset we'll use if it turns out that R is not the largest component (M==G or M==B)\n\tvec4 temp1 = rgb.b > rgb.g ? vec4(rgb.bg, hueOffsets.wz) : vec4(rgb.gb, hueOffsets.xy);\n\n\t// temp2.x = the largest component of RGB (\"M\" / \"Max\")\n\t// temp2.yw = the smaller components of RGB, ordered for the hue calculation (not necessarily sorted by magnitude!)\n\t// temp2.z = the hue offset we'll use in the hue calculation\n\tvec4 temp2 = rgb.r > temp1.x ? vec4(rgb.r, temp1.yzx) : vec4(temp1.xyw, rgb.r);\n\n\t// m = the smallest component of RGB (\"min\")\n\tfloat m = min(temp2.y, temp2.w);\n\n\t// Chroma = M - m\n\tfloat C = temp2.x - m;\n\n\t// Value = M\n\tfloat V = temp2.x;\n\n\treturn vec3(\n\t\tabs(temp2.z + (temp2.w - temp2.y) / (6.0 * C + epsilon)), // Hue\n\t\tC / (temp2.x + epsilon), // Saturation\n\t\tV); // Value\n}\n\nvec3 convertHue2RGB(float hue)\n{\n\tfloat r = abs(hue * 6.0 - 3.0) - 1.0;\n\tfloat g = 2.0 - abs(hue * 6.0 - 2.0);\n\tfloat b = 2.0 - abs(hue * 6.0 - 4.0);\n\treturn clamp(vec3(r, g, b), 0.0, 1.0);\n}\n\nvec3 convertHSV2RGB(vec3 hsv)\n{\n\tvec3 rgb = convertHue2RGB(hsv.x);\n\tfloat c = hsv.z * hsv.y;\n\treturn rgb * c + hsv.z - c;\n}\n#endif // !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))\n\nconst vec2 kCenter = vec2(0.5, 0.5);\n\nvoid main()\n{\n\t#if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))\n\tvec2 texcoord0 = v_texCoord;\n\n\t#ifdef ENABLE_mosaic\n\ttexcoord0 = fract(u_mosaic * texcoord0);\n\t#endif // ENABLE_mosaic\n\n\t// --- APPLIED RIBBON EFFECT EARLY ---\n\t// Apply ribbon effect before pixelate to avoid pixelation artifacts\n\t#ifdef ENABLE_ribbon\n\t{\n\t\ttexcoord0.x = fract(texcoord0.x + u_ribbonShiftX);\n\t\ttexcoord0.y = fract(texcoord0.y + u_ribbonShiftY);\n\t}\n\t#endif // ENABLE_ribbon\n\t// --------------------------------\n\n\t#ifdef ENABLE_pixelate\n\t{\n\t\t// TODO: clean up \"pixel\" edges\n\t\tvec2 pixelTexelSize = u_skinSize / u_pixelate;\n\t\ttexcoord0 = (floor(texcoord0 * pixelTexelSize) + kCenter) / pixelTexelSize;\n\t}\n\t#endif // ENABLE_pixelate\n\n\t#ifdef ENABLE_whirl\n\t{\n\t\tconst float kRadius = 0.5;\n\t\tvec2 offset = texcoord0 - kCenter;\n\t\tfloat offsetMagnitude = length(offset);\n\t\tfloat whirlFactor = max(1.0 - (offsetMagnitude / kRadius), 0.0);\n\t\tfloat whirlActual = u_whirl * whirlFactor * whirlFactor;\n\t\tfloat sinWhirl = sin(whirlActual);\n\t\tfloat cosWhirl = cos(whirlActual);\n\t\tmat2 rotationMatrix = mat2(\n\t\t\tcosWhirl, -sinWhirl,\n\t\t\tsinWhirl, cosWhirl\n\t\t);\n\n\t\ttexcoord0 = rotationMatrix * offset + kCenter;\n\t}\n\t#endif // ENABLE_whirl\n\n\t#ifdef ENABLE_fisheye\n\t{\n\t\tvec2 vec = (texcoord0 - kCenter) / kCenter;\n\t\tfloat vecLength = length(vec);\n\t\tfloat r = pow(min(vecLength, 1.0), u_fisheye) * max(1.0, vecLength);\n\t\tvec2 unit = vec / vecLength;\n\n\t\ttexcoord0 = kCenter + r * unit * kCenter;\n\t}\n\t#endif // ENABLE_fisheye\n\n\t// --- ADDED FOR WAVY EFFECT ---\n\t// This modifies the texture coordinates just before sampling.\n\t#ifdef ENABLE_wavy\n\t{\n\t\t// Use epsilon to prevent division by zero if time uniforms are 0\n\t\ttexcoord0.x += sin(texcoord0.y * u_wave_xwave + iTime) / (u_wave_xtime + epsilon);\n\t\ttexcoord0.y += sin(texcoord0.x * u_wave_ywave + iTime) / (u_wave_ytime + epsilon);\n\t}\n\t#endif // ENABLE_wavy\n\t// -----------------------------\n\n\tgl_FragColor = texture2D(u_skin, texcoord0);\n\n\t#if defined(ENABLE_color) || defined(ENABLE_brightness)\n\t// Divide premultiplied alpha values for proper color processing\n\t// Add epsilon to avoid dividing by 0 for fully transparent pixels\n\tgl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);\n\n\t#ifdef ENABLE_color\n\t{\n\t\tvec3 hsv = convertRGB2HSV(gl_FragColor.xyz);\n\n\t\t// this code forces grayscale values to be slightly saturated\n\t\t// so that some slight change of hue will be visible\n\t\tconst float minLightness = 0.11 / 2.0;\n\t\tconst float minSaturation = 0.09;\n\t\tif (hsv.z < minLightness) hsv = vec3(0.0, 1.0, minLightness);\n\t\telse if (hsv.y < minSaturation) hsv = vec3(0.0, minSaturation, hsv.z);\n\n\t\thsv.x = mod(hsv.x + u_color, 1.0);\n\t\tif (hsv.x < 0.0) hsv.x += 1.0;\n\n\t\tgl_FragColor.rgb = convertHSV2RGB(hsv);\n\t}\n\t#endif // ENABLE_color\n\n\t#ifdef ENABLE_brightness\n\tgl_FragColor.rgb = clamp(gl_FragColor.rgb + vec3(u_brightness), vec3(0), vec3(1));\n\t#endif // ENABLE_brightness\n\n\t// Re-multiply color values\n\tgl_FragColor.rgb *= gl_FragColor.a + epsilon;\n\n\t#endif // defined(ENABLE_color) || defined(ENABLE_brightness)\n\n\t#ifdef ENABLE_ghost\n\tgl_FragColor *= u_ghost;\n\t#endif // ENABLE_ghost\n\n\t#ifdef DRAW_MODE_silhouette\n\t// Discard fully transparent pixels for stencil test\n\tif (gl_FragColor.a == 0.0) {\n\t\tdiscard;\n\t}\n\t// switch to u_silhouetteColor only AFTER the alpha test\n\tgl_FragColor = u_silhouetteColor;\n\t#else // DRAW_MODE_silhouette\n\n\t#ifdef DRAW_MODE_colorMask\n\tvec3 maskDistance = abs(gl_FragColor.rgb - u_colorMask);\n\tvec3 colorMaskTolerance = vec3(u_colorMaskTolerance, u_colorMaskTolerance, u_colorMaskTolerance);\n\tif (any(greaterThan(maskDistance, colorMaskTolerance)))\n\t{\n\t\tdiscard;\n\t}\n\t#endif // DRAW_MODE_colorMask\n\t#endif // DRAW_MODE_silhouette\n\n\t#ifdef DRAW_MODE_straightAlpha\n\t// Un-premultiply alpha.\n\tgl_FragColor.rgb /= gl_FragColor.a + epsilon;\n\t#endif\n\n\t#endif // !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))\n\n\t#ifdef DRAW_MODE_line\n\t// Maaaaagic antialiased-line-with-round-caps shader.\n\n\t// \"along-the-lineness\". This increases parallel to the line.\n\t// It goes from negative before the start point, to 0.5 through the start to the end, then ramps up again\n\t// past the end point.\n\tfloat d = ((v_texCoord.x - clamp(v_texCoord.x, 0.0, v_lineLength)) * 0.5) + 0.5;\n\n\t// Distance from (0.5, 0.5) to (d, the perpendicular coordinate). When we're in the middle of the line,\n\t// d will be 0.5, so the distance will be 0 at points close to the line and will grow at points further from it.\n\t// For the \"caps\", d will ramp down/up, giving us rounding.\n\t// See https://www.youtube.com/watch?v=PMltMdi1Wzg for a rough outline of the technique used to round the lines.\n\tfloat line = distance(vec2(0.5), vec2(d, v_texCoord.y)) * 2.0;\n\t// Expand out the line by its thickness.\n\tline -= ((v_lineThickness - 1.0) * 0.5);\n\t// Because \"distance to the center of the line\" decreases the closer we get to the line, but we want more opacity\n\t// the closer we are to the line, invert it.\n\tgl_FragColor = v_lineColor * clamp(1.0 - line, 0.0, 1.0);\n\t#endif // DRAW_MODE_line\n\n\t#ifdef DRAW_MODE_background\n\tgl_FragColor = u_backgroundColor;\n\t#endif\n}");

/***/ }),

/***/ 7255:
/***/ ((module) => {

//Webpack compatible version of elements module from gvbvdxx-pack-2
//With some new updates as well.
var __GP_elements = {};
function isDOM(Obj) {
  return Obj instanceof Element;
}
var elements = {
  appendElements: function (elm, appendArray) {
    for (var appendElm of appendArray) {
      elm.append(appendElm);
    }
  },
  getStylelessAJSON(props = {}) {
    return {
      element: "a",
      style: {
        all: "unset",
      },
      ...props,
    };
  },
  removeAllChildren: function (elm) {
    Array.from(elm.children).forEach((elm) => elm.remove());
  },
  appendElementsFromJSON: function (elm, appendJSONArray) {
    var elms = elements.createElementsFromJSON(appendJSONArray);
    elements.appendElements(elm, elms);
    return elms;
  },
  setInnerJSON: function (elm, appendJSONArray) {
    elements.removeAllChildren(elm);
    var elms = elements.createElementsFromJSON(appendJSONArray);
    elements.appendElements(elm, elms);
    return elms;
  },
  createElementsFromJSON: function (jsonelmArray) {
    //converts an array of json's with element properties to a element list.
    function runElements(arry) {
      var myRealElms = [];
      for (var elm of arry) {
        if (!isDOM(elm)) {
          if (typeof elm == "object") {
            var realElm = document.createElement(elm.element);
            for (var attriName of Object.keys(elm)) {
              if (!(attriName == "element" || attriName == "children")) {
                var attributeValue = elm[attriName];
                var setattri = true;
                if (attriName == "gid") {
                  __GP_elements[attributeValue] = realElm;
                  setattri = false;
                }
                if (attriName == "style") {
                  for (var styleName of Object.keys(attributeValue)) {
                    var styleValue = attributeValue[styleName];
                    realElm.style[styleName] = styleValue;
                  }
                  setattri = false;
                }
                if (attriName == "styleProperties") {
                  for (var styleName of Object.keys(attributeValue)) {
                    var styleValue = attributeValue[styleName];
                    realElm.style.setProperty(styleName, styleValue);
                  }
                  setattri = false;
                }
                if (attriName == "dangerouslySetInnerHTML") {
                  realElm.innerHTML = attributeValue;
                  setattri = false;
                } else if (attriName == "innerHTML") {
                  console.trace(
                    'Warning: The "innerHTML" property is deprecated. ' +
                      'Please use "dangerouslySetInnerHTML" instead.',
                  );
                  realElm.innerHTML = attributeValue;
                  setattri = false;
                }
                if (attriName == "textContent") {
                  realElm.textContent = attributeValue;
                  setattri = false;
                }
                if (attriName == "src") {
                  realElm.src = attributeValue;
                  setattri = false;
                }
                if (attriName == "srcObject") {
                  realElm.srcObject = attributeValue;
                  setattri = false;
                }
                if (attriName == "value") {
                  realElm.value = attributeValue;
                  setattri = false;
                }
                if (attriName == "min") {
                  realElm.min = attributeValue;
                  setattri = false;
                }
                if (attriName == "max") {
                  realElm.max = attributeValue;
                  setattri = false;
                }
                if (attriName == "width") {
                  realElm.width = attributeValue;
                  setattri = false;
                }
                if (attriName == "height") {
                  realElm.height = attributeValue;
                  setattri = false;
                }
                if (attriName == "className") {
                  realElm.className = attributeValue;
                  setattri = false;
                }
                if (attriName == "hidden") {
                  if (attributeValue) {
                    realElm.hidden = true;
                  }
                  setattri = false;
                }
                if (attriName == "selected") {
                  if (attributeValue) {
                    realElm.selected = true;
                  }
                  setattri = false;
                }
                if (attriName == "eventListeners") {
                  if (Array.isArray(attributeValue)) {
                    for (var event of attributeValue) {
                      realElm.addEventListener(event.event, event.func);
                    }
                  }
                  setattri = false;
                }
                if (attriName == "GPWhenCreated") {
                  attributeValue.bind(realElm)(realElm); //This seems weird, but first realElm is the "this" value refrence, then the second realElm is for the function value, as well as calling the new binded function.
                  setattri = false;
                }
                if (setattri) {
                  if (typeof realElm[attriName] !== "undefined") {
                    realElm[attriName] = attributeValue;
                    setattri = false;
                  }
                }
                if (setattri) {
                  realElm.setAttribute(attriName, attributeValue);
                }
              }
            }

            if (elm.children) {
              var elmsToAppend = runElements(elm.children);
              for (var elmAppend of elmsToAppend) {
                realElm.append(elmAppend);
              }
            }
            myRealElms.push(realElm);
          } else {
            myRealElms.push(elm);
          }
        } else {
          if (elm) {
            myRealElms.push(elm);
          }
        }
      }
      return myRealElms;
    }
    return runElements(jsonelmArray);
  },
  getById: function (id) {
    return document.getElementById(id);
  },
  setGPId: function (el, id) {
    __GP_elements[id] = el;
    return el;
  },
  disposeGPId: function (id) {
    __GP_elements[id] = undefined;
  },
  getGPId: function (id) {
    if (__GP_elements[id]) {
      return __GP_elements[id];
    }
    return null;
  },
  body: document.body,
  __GP_elements: __GP_elements,
};
module.exports = elements;


/***/ }),

/***/ 9041:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(4499);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			470: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkgvbvdxx_game_maker_3"] = self["webpackChunkgvbvdxx_game_maker_3"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [804], () => (__webpack_require__(9041)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;