import { Svg, SVG } from '@svgdotjs/svg.js';
import React, { useEffect, useState } from 'react';
import './App.css';
import { initModel } from "./model";


function App() {
  const [svg, setSvg] = useState<Svg | undefined>();

  const [model] = useState(initModel());

  useEffect(() => {
    const newSvg = SVG().addTo('#app').height('100%').width('100%');
    setSvg(newSvg);
  }, [setSvg] );

  useEffect(() => {
    svg?.clear();

    model.lines.forEach(line => {
      svg?.line(line.a.point.x, line.a.point.y, line.b.point.x, line.b.point.y).stroke({ width: 3, color: '#00F'});
    });

    model.vertices.forEach(vertex => {
      svg?.circle(10).cx(vertex.point.x).cy(vertex.point.y).fill('#0f0');
    });

  }, [model, svg]);


  return (
    <div className="App" id="app" style={{ height: '1000px' }}>
    </div>
  );
}

export default App;
