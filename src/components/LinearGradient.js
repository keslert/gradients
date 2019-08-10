import React from 'react';
import { AspectRatio, Box } from '@modulz/radix';
import chroma from 'chroma-js';

function LinearGradient({
  angle,
  colors, 
  finalColors = 20, 
  points = {
    p0: {x: 0, y:0},
    p1: {x: .25, y: .1},
    p2: {x: .25, y: .1},
    p3: {x: 1, y: 1},
  }
}) {

  const colorList = React.useMemo(() => {
    return chroma
      .scale(colors)
      .mode('lch')
      .colors(finalColors)
  }, [colors, finalColors]);

  const gradient = React.useMemo(() => {
    const interval = 1.0 / finalColors
    const arr = new Array(finalColors).fill();

    const widths = arr.map((nil, i) => {
      const { x, y } = bezier(i * interval, points.p0, points.p1, points.p2, points.p3);
      return y;
    })
    
    const bands = arr.map((nil, i) => {
      return [
        `${colorList[i]} ${(widths[i]) * 100}%`,
        `${colorList[i + 1] || colorList[i]} ${(widths[i]) * 100}%`,
        // `${colorList[i]} ${(widths[i + 1] || 1) * 100}%`,
      ]
    }).flat()

    return `linear-gradient(${angle}deg, ${bands.join(', ')})`;
  }, [colorList, angle, points])

  return (
    <Box style={{background: gradient}}>
      <AspectRatio 
        ratio="16:9"
      />
    </Box>
  )
}

export default LinearGradient;

function lerp (start, end, amt){
  return (1-amt) * start + amt * end;
}

function bezier(t, p0, p1, p2, p3) {
  var cX = 3 * (p1.x - p0.x),
      bX = 3 * (p2.x - p1.x) - cX,
      aX = p3.x - p0.x - cX - bX;

  var cY = 3 * (p1.y - p0.y),
      bY = 3 * (p2.y - p1.y) - cY,
      aY = p3.y - p0.y - cY - bY;

  var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
  var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

  return {x: x, y: y};
}