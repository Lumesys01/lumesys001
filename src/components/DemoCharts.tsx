
import { useEffect, useState } from "react";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, Sector
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample data
const monthlyData = [
  { name: "Jan", users: 400, revenue: 2400, growth: 24 },
  { name: "Feb", users: 300, revenue: 1398, growth: 13 },
  { name: "Mar", users: 520, revenue: 3200, growth: 32 },
  { name: "Apr", users: 480, revenue: 2800, growth: 28 },
  { name: "May", users: 600, revenue: 3800, growth: 38 },
  { name: "Jun", users: 580, revenue: 3600, growth: 36 },
];

// Updated pie data with industry segments from highest to lowest
const pieData = [
  { name: "Manufacturing", value: 400, color: "#0EA5E9" },
  { name: "Mines", value: 300, color: "#F97316" },
  { name: "Government", value: 200, color: "#8B5CF6" },
  { name: "Retailers", value: 100, color: "#D946EF" },
];

const DemoCharts = () => {
  const [activeData, setActiveData] = useState(monthlyData);
  const [animate, setAnimate] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Handle window resize for responsive charts
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine chart height based on screen size
  const getChartHeight = () => {
    if (windowWidth < 640) return 300; // Mobile
    if (windowWidth < 1024) return 350; // Tablet
    return 400; // Desktop
  };

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

  // Custom active shape for pie chart with "unfolding" effect
  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    // Calculate coordinates for the label lines
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    
    // Extend the outer radius for the active segment (unfolding effect)
    const extraRadius = 15;
    const activeOuterRadius = outerRadius + extraRadius;
    
    // Calculate label position
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        {/* Semi-transparent background sector */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.3}
        />
        {/* Highlighted active sector with extended radius */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={activeOuterRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          className="drop-shadow-lg"
        />
        {/* Connecting lines to label */}
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        
        {/* Label text - improved contrast for light theme */}
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333333" className="text-xs md:text-sm font-medium">
          {payload.name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666666" className="text-xs">
          {`${value} clients (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  // Hover handler for the pie chart segments
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  // Render color legend for pie chart
  const renderColorLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {pieData.map((entry, index) => (
          <div 
            key={`legend-${index}`} 
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white shadow-sm"
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">{entry.name}</span>
            <span className="text-xs text-gray-500">({entry.value})</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          <span className="gradient-text">Interactive Insights</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
          Visualize your data with our powerful and customizable chart components.
        </p>
        <Button 
          onClick={randomizeData} 
          className="glow-button text-primary"
        >
          Refresh Data
        </Button>
      </div>

      <div className={`transition-all duration-800 ${animate ? 'opacity-0' : 'opacity-100'}`}>
        <Tabs defaultValue="pie" className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 bg-surface">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="area">Area Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="line" className="glass-card p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-medium">Monthly Performance Trends</h3>
            <div className="h-[300px] sm:h-[350px] lg:h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <LineChart data={activeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
          
          <TabsContent value="area" className="glass-card p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-medium">Growth Visualization</h3>
            <div className="h-[300px] sm:h-[350px] lg:h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <AreaChart data={activeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
          
          <TabsContent value="bar" className="glass-card p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-medium">Revenue Comparison</h3>
            <div className="h-[300px] sm:h-[350px] lg:h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <BarChart data={activeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
          
          <TabsContent value="pie" className="glass-card p-4 sm:p-6 rounded-lg">
            <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 font-medium">Industry Segment Distribution</h3>
            <div className="h-[300px] sm:h-[350px] lg:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={windowWidth < 640 ? 50 : 70}
                    outerRadius={windowWidth < 640 ? 80 : 120}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                    animationBegin={0}
                    animationDuration={1200}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [`${value} clients`, name]}
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '8px', 
                      border: '1px solid rgba(0,0,0,0.1)',
                      color: '#333'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Color legend for the pie chart */}
            {renderColorLegend()}
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Click or hover over segments to see details</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DemoCharts;
