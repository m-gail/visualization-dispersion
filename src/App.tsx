import React, { useState } from "react";
import { Layer, Rect, Line, Stage, Text } from "react-konva";
import "./App.css";

function App() {
  const [waveLength, setWaveLength] = useState(580);
  const entryAngle = Math.PI / 6;
  const refractionAngle = Math.asin(
    (getRefractiveIndex1(waveLength) * Math.sin(entryAngle)) /
    getRefractiveIndex2(waveLength),
  );

  return (
    <div className="app">
      <Stage width={1300} height={700} className="canvas">
        <Layer>
          <MediumBorder size={700}></MediumBorder>
          <LightPath
            size={700}
            entryAngle={entryAngle}
            refractionAngle={refractionAngle}
          />
          <Text x={10} y={10} text="Medium 1" fill="#333" fontSize={18}></Text>
          <Text x={410} y={10} text="Medium 2" fill="#333" fontSize={18}></Text>
        </Layer>
      </Stage>
      <div className="controls">
        <h1 className="title">Dispersion</h1>
        <p className="description">
          Als Dispersion bezeichnet man die Abhängigkeit der Brechzahl eines
          Mediums von der Frequenz bzw. der Wellenlänge.
          <br />
          Rotes Licht hat eine niedrigere Frequenz (bzw. eine höhere
          Wellenlänge) als violettes Licht und bewegt sich langsamer durch
          durchsichtige Materie.
          <br />
          Die Brechzahl für rotes Licht ist also niedriger als die Brechzahl für
          violettes Licht, somit wird rotes Licht weniger stark gebrochen, als
          violettes Licht.
        </p>
        <div className="wave-length">
          <div>{waveLength} nm</div>
          <input
            className="wave-length-input"
            type="range"
            min={380}
            max={780}
            value={waveLength}
            onChange={(e) => setWaveLength(Number.parseInt(e.target.value))}
            step={1}
          />
        </div>
        <div>Brechzahl von Medium 1: {getRefractiveIndex1(waveLength)}</div>
        <div>Einfallswinkel: 30°</div>
        <div>
          Brechzahl von Medium 2 für Wellenlänge {waveLength}nm:{" "}
          {getRefractiveIndex2(waveLength).toFixed(3)}
        </div>
        <div>
          Brechungswinkel: arcsin({getRefractiveIndex1(waveLength)} * sin(
          {toDegrees(entryAngle).toFixed(2)}°))/
          {getRefractiveIndex2(waveLength).toFixed(3)}{' = '}
          {toDegrees(refractionAngle).toFixed(2)}°
        </div>
        <div className="name">Erstellt von: Michael Gail, 12317237</div>
      </div>
    </div>
  );
}

function LightPath({
  size,
  entryAngle,
  refractionAngle,
}: {
  size: number;
  entryAngle: number;
  refractionAngle: number;
}): React.JSX.Element {
  return (
    <>
      <Line
        x={400}
        y={size / 2}
        points={[0, 0, -400, 400 * Math.tan(entryAngle)]}
        stroke={"black"}
      />
      <Line
        x={400}
        y={size / 2}
        points={[
          0,
          0,
          Math.cos(refractionAngle) * 1000,
          -Math.sin(refractionAngle) * 1000,
        ]}
        stroke={"black"}
      />
    </>
  );
}

function toDegrees(radians: number) {
  return (radians / (2 * Math.PI)) * 360;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getRefractiveIndex1(waveLength: number) {
  return 1;
}

function getRefractiveIndex2(waveLength: number) {
  return 3 - (waveLength / 1000) * 2;
}

function MediumBorder({ size }: { size: number }): React.JSX.Element {
  return (
    <Rect x={400} y={0} height={size} width={1000} fill={"#DFE2E2"} closed />
  );
}

export default App;
