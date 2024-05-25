function hexToHSL(hex) {
    // Convert hex to RGB
    var r = parseInt(hex.slice(1, 3), 16) / 255,
        g = parseInt(hex.slice(3, 5), 16) / 255,
        b = parseInt(hex.slice(5, 7), 16) / 255;

    // Find the maximum and minimum values of R, G, B
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);

    // Calculate the lightness (L)
    var l = (max + min) / 2;

    // Calculate the saturation (S)
    var s = max === min ? 0 : (max - min) / (1 - Math.abs(2 * l - 1));

    // Calculate the hue (H)
    var h;
    if (max === min) {
        h = 0; // achromatic
    } else {
        var delta = max - min;
        switch (max) {
            case r: h = ((g - b) / delta) % 6; break;
            case g: h = (b - r) / delta + 2; break;
            case b: h = (r - g) / delta + 4; break;
        }
        h *= 60;
        if (h < 0) h += 360;
    }

    return [h, s, l];
}

export function filter(targetHex, initialHex) {
    const targetHSL = hexToHSL(targetHex);
    const initialHSL = hexToHSL(initialHex);
    let saturation = targetHSL[1] * 100;
    let hueDiff = targetHSL[0] - initialHSL[0];
    // Ensure hue difference is within the range [0, 360)
    hueDiff = (hueDiff + 360) % 360;
    return 'hue-rotate(' + hueDiff + 'deg) saturate(' + saturation + '%)';
}