class ScratchMath {
  static mod(v1, v2) {
    const n = +v1 || 0;
    const modulus = +v2 || 0;
    let result = n % modulus;
    // Scratch mod uses floored division instead of truncated division.
    if (result / modulus < 0) result += modulus;
    return result;
  }
}

module.exports = ScratchMath;
