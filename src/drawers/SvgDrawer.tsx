import { SVG, Svg } from "@svgdotjs/svg.js";
import { FC, useEffect, useId, useState } from "react";
import { StyledShape } from "../geometry/styled-shape";

export const SvgDrawer: FC<
  { styledShapes: readonly StyledShape[]; text: string }
> = (
  { styledShapes, text },
) => {
  const [svg, setSvg] = useState<Svg | undefined>();

  const divId = useId();

  useEffect(() => {
    const newSvg = SVG().addTo(`#${CSS.escape(divId)}`).height("100%").width(
      "100%",
    );
    setSvg(newSvg);
  }, [setSvg, divId]);

  useEffect(() => {
    if (svg === undefined) return;
    for (const styledShape of styledShapes) {
      styledShape.shape.lines.forEach((line) => {
        svg?.line(
          line.a.point.x,
          line.a.point.y,
          line.b.point.x,
          line.b.point.y,
        )
          .stroke({
            width: styledShape.styles.lineThickness,
            color: styledShape.styles.lineColor,
          });
      });

      styledShape.shape.vertices.forEach((vertex) => {
        svg?.circle(styledShape.styles.pointSize).cx(vertex.point.x).cy(
          vertex.point.y,
        ).fill(styledShape.styles.pointColor);
      });
    }

    const telem = svg?.text(text);
    telem.attr({
      fill: "red",
      "font-family": "Roboto",
      "font-size": 50,
      x: "50%",
      y: "50%",
      "text-anchor": "middle",
      "dominant-baseline": "middle",
    });

    return () => {
      svg?.clear();
    };
  }, [styledShapes, svg, text]);

  return (
    <div id={divId} style={{ height: "420px", width: "420px" }}>
    </div>
  );
};
