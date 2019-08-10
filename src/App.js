import React from 'react';
import useInterval from "@rooks/use-interval";
import LinearGradient from './components/LinearGradient';
import { Container, Box, Text, Slider } from '@modulz/radix';

function App() {

  const [colors, setColors] = React.useState(['#04c6c6', '#3B237A']);
  const [angle, setAngle] = React.useState(90);
  const [finalColors, setFinalColors] = React.useState(20);

  useInterval(() => {
    setAngle(angle => (angle + 1) % 360);
  }, 32, []);

  return (
    <Container maxWidth="1040px">
      <Text>CSS Background Generator</Text>
      <Slider
        onChange={e => setAngle(e.target.value)}
        value={angle}
        max={360}
        min={0}
      />
      <Slider
        onChange={e => setFinalColors(Number.parseInt(e.target.value))}
        value={finalColors}
        max={60}
        min={colors.length}
      />
      <Box>
        <LinearGradient
          colors={colors}
          angle={angle}
          finalColors={finalColors}
        />
      </Box>
    </Container>  
  );
}

export default App;
