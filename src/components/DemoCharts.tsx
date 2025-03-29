
import { useEffect, useState } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const monthlyData = [
  { name: "Jan", users: 400, revenue: 2400, growth: 24 },
  { name: "Feb", users: 300, revenue: 1398, growth: 13 },
  { name: "Mar", users: 520, revenue: 3200, growth: 32 },
  { name: "Apr", users: 480, revenue: 2800, growth: 28 },
  { name: "May", users: 600, revenue: 3800, growth: 38 },
  { name: "Jun", users: 580, revenue: 3600, growth: 36 },
];

const pieData = [
  { name: "Enterprise", value: 400, color: "#0EA5E9" },
  { name: "Small Business", value: 300, color: "#F97316" },
  { name: "Freelancer", value: 200, color: "#8B5CF6" },
  { name: "Personal", value: 100, color: "#D946EF" },
];

const DemoCharts = () => {
  const [activeData, setActiveData] = useState(monthlyData);
  const [animate, setAnimate] = useState(false);

  // Randomize data for demo purposes
  const randomizeData = () => {
    setAnimate(true);
    const newData = monthlyData.map(item => ({
      ...item,
      users: Math.floor(Math.random() * 1000),
      revenue: Math.floor(Math.random() * 5000),
      growth: Math.floor(Math.random() * 50)
    }));
    setActiveData(newData);
    
    setTimeout(() => setAnimate(false), 800);
  };

  const chartConfig = {
    users: {
      label: "Users",
      theme: {
        light: "#0EA5E9",
        dark: "#0EA5E9"
      },
    },
    revenue: {
      label: "Revenue",
      theme: {
        light: "#8B5CF6",
        dark: "#8B5CF6"
      },
    },
    growth: {
      label: "Growth",
      theme: {
        light: "#F97316",
        dark: "#F97316"
      },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-4">
          <span className="gradient-text">Interactive Insights</span>
        </h2>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8">
          Visualize your data with our powerful and customizable chart components.
        </p>
        <Button 
          onClick={randomizeData} 
          className="glow-button text-primary mb-8"
        >
          Refresh Data
        </Button>
      </div>

      <div className={`transition-all duration-800 ${animate ? 'opacity-0' : 'opacity-100'}`}>
        <Tabs defaultValue="line" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-surface">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="line" className="glass-card p-6 rounded-lg">
            <h3 className="text-xl mb-4">Monthly Performance Trends</h3>
            <div className="h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <LineChart data={activeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="var(--color-users)" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="var(--color-revenue)" 
                    strokeWidth={2} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="var(--color-growth)" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="area" className="glass-card p-6 rounded-lg">
            <h3 className="text-xl mb-4">Growth Visualization</h3>
            <div className="h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <AreaChart data={activeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    fill="var(--color-users)" 
                    stroke="var(--color-users)" 
                    fillOpacity={0.3} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    fill="var(--color-revenue)" 
                    stroke="var(--color-revenue)" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="bar" className="glass-card p-6 rounded-lg">
            <h3 className="text-xl mb-4">Revenue Comparison</h3>
            <div className="h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <BarChart data={activeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="users" fill="var(--color-users)" />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" />
                </BarChart>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="pie" className="glass-card p-6 rounded-lg">
            <h3 className="text-xl mb-4">Customer Segment Distribution</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DemoCharts;
