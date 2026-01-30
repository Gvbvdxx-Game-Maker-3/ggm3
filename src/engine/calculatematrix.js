// Use a shared Float32Array if none is provided to avoid garbage collection
const MatrixArrayType =
  typeof Float32Array !== "undefined" ? Float32Array : Array;

function calculateMatrix(sprite, dst) {
  // 1. Setup: Ensure we have a destination array
  if (!dst) {
    dst = new MatrixArrayType(16);
  }

  // --- STEP 1: GATHER VARIABLES ---
  const x = sprite.x;
  const y = sprite.y;
  const rotation = sprite.rotation;

  // Default to 0 if skew properties don't exist on the sprite
  // These should be in RADIANS, just like rotation
  const skewX = sprite.skewX || 0;
  const skewY = sprite.skewY || 0;

  const width = sprite.textureWidth * sprite.scaleX;
  const height = sprite.textureHeight * sprite.scaleY;

  const pivotU = sprite.rotationCenterX / sprite.textureWidth;
  const pivotV = sprite.rotationCenterY / sprite.textureHeight;

  // --- STEP 2: CALCULATE 2D MATH ---
  const c = Math.cos(rotation);
  const s = Math.sin(rotation);

  // Calculate Skew Offsets (Tangent tells us how much to slide per unit)
  const tanX = Math.tan(skewX);
  const tanY = Math.tan(skewY);

  // 2a. Create the Local Vectors (Scale + Skew)
  // Local X-Axis (The "Right" direction)
  // If SkewY is active, the X-axis points slightly up or down
  const localX_x = width;
  const localX_y = width * tanY;

  // Local Y-Axis (The "Down" direction)
  // If SkewX is active, the Y-axis points slightly left or right
  const localY_x = height * tanX;
  const localY_y = height;

  // 2b. Rotate the Vectors (Apply Rotation)
  // Formula: x' = x*cos - y*sin, y' = x*sin + y*cos

  const rightX = localX_x * c - localX_y * s;
  const rightY = localX_x * s + localX_y * c;

  const downX = localY_x * c - localY_y * s;
  const downY = localY_x * s + localY_y * c;

  // 2c. Calculate Final Position (Translate)
  // Start at sprite.x,y and subtract the rotated/skewed pivot offset
  const posX = x - (rightX * pivotU + downX * pivotV);
  const posY = y - (rightY * pivotU + downY * pivotV);

  // --- STEP 3: FILL THE MATRIX ---

  // Column 0: X-Axis
  dst[0] = rightX;
  dst[1] = rightY;
  dst[2] = 0;
  dst[3] = 0;

  // Column 1: Y-Axis
  dst[4] = downX;
  dst[5] = downY;
  dst[6] = 0;
  dst[7] = 0;

  // Column 2: Z-Axis
  dst[8] = 0;
  dst[9] = 0;
  dst[10] = 1;
  dst[11] = 0;

  // Column 3: World Position
  dst[12] = posX;
  dst[13] = posY;
  dst[14] = 0;
  dst[15] = 1;

  return dst;
}

module.exports = calculateMatrix;
