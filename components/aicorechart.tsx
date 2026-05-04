"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { epoch: '1', loss: 0.95 },
  { epoch: '2', loss: 0.70 },
  { epoch: '3', loss: 0.45 },
  { epoch: '4', loss: 0.30 },
  { epoch: '5', loss: 0.20 },
  { epoch: '6', loss: 0.15 },
  { epoch: '7', loss: 0.12 },
];

export default function AICoreChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#00FF41" strokeOpacity={0.1} />
        <XAxis dataKey="epoch" hide />
        <YAxis hide domain={[0, 1]} />
        <Line 
          type="monotone" 
          dataKey="loss" 
          stroke="#00FF41" 
          strokeWidth={2} 
          dot={{ r: 2, fill: '#00FF41' }} 
          activeDot={{ r: 4 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}