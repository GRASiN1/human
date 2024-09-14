
import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from 'recharts';

export default function RadialProgressBar({
  value,
  maxValue,
  size = 200,
  strokeWidth = 30,
  color = "#0088FE"
}) {
  const data = [{ value: value, fill: color }];
  const percentage = Math.round((value / maxValue) * 100);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <RadialBarChart
        width={size}
        height={size}
        innerRadius={size / 2 - strokeWidth}
        outerRadius={size / 2}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, maxValue]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          dataKey="value"
          angleAxisId={0}
          data={[{ value: maxValue }]}
          fill="#f3f3f3"
        />
        <RadialBar
          dataKey="value"
          angleAxisId={0}
          cornerRadius={strokeWidth / 2}
          fill={color}
        />
      </RadialBarChart>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}
      >
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}

