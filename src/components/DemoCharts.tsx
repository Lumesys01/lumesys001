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
import { ArrowDownIcon, ArrowUpIcon, BarChart3, LineChart as LineChartIcon, PieChartIcon } from "lucide-react";

const monthlyData = [
  { name: "Jan", users: 400, growth: 24 },
  { name: "Feb", users: 300, growth: 13 },
  { name: "Mar", users: 520, growth: 32 },
  { name: "Apr", users: 480, growth: 28 },
  { name: "May", users: 600, growth: 38 },
  { name: "Jun", users: 580, growth: 36 },
];

const pieData = [
  { name: "Manufacturing", value: 400, color: "#0EA5E9" },
  { name: "Mines", value: 300, color: "#8B5CF6" },
  { name: "Government", value: 200, color: "#00bf72" },
  { name: "Retailers", value: 100, color: "#A8EB12" },
];

const DemoCharts = () => {
  const [activeData, setActiveData] = useState(monthlyData);
  const [animate, setAnimate] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeTab, setActiveTab] = useState("pie");
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const randomizeData = () => {
    setAnimate(true);
    const newData = monthlyData.map(item => ({
      ...item,
      users: Math.floor(Math.random() * 1000),
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
    growth: {
      label: "Growth",
      theme: {
        light: "#00bf72",
        dark: "#00bf72"
      },
    },
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    
    const extraRadius = 15;
    const activeOuterRadius = outerRadius + extraRadius;
    
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
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
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333333" className="text-xs md:text-sm font-medium">
          {payload.name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666666" className="text-xs">
          {`${value} clients (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const getTrendIndicator = (dataKey: string, index: number) => {
    if (index === 0) return null;
    
    const current = activeData[index][dataKey as keyof typeof activeData[0]] as number;
    const previous = activeData[index - 1][dataKey as keyof typeof activeData[0]] as number;
    
    if (current > previous) {
      return <ArrowUpIcon className="w-4 h-4 text-accent" />;
    } else if (current < previous) {
      return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const tabDescriptions = {
    pie: "Industry segment distribution shows which sectors are adopting Lumesys technology.",
    line: "Track monthly performance trends to identify growth patterns over time.",
    area: "Visualize growth patterns with layered area charts showing data accumulation.",
    bar: "Compare user metrics side-by-side to identify top performing months."
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          <span className="gradient-text">Interactive Insights</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
          Explore real-time analytics through our dynamic visualization tools
        </p>
        <Button 
          onClick={randomizeData} 
          className="bg-gradient-to-br from-accent to-highlight text-white hover:opacity-90 transition-all shadow-lg"
        >
          Refresh Data
        </Button>
      </div>

      <div className={`transition-all duration-800 ${animate ? 'opacity-0' : 'opacity-100'}`}>
        <Tabs 
          defaultValue="pie" 
          className="w-full"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            setShowDescription(true);
            setTimeout(() => setShowDescription(false), 3000);
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <TabsList className="bg-white border border-gray-200 p-1 shadow-md rounded-full">
              <TabsTrigger 
                value="line" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-highlight/20 rounded-full data-[state=active]:text-accent"
              >
                <LineChartIcon className="h-4 w-4 mr-2" />
                Line
              </TabsTrigger>
              <TabsTrigger 
                value="area"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-highlight/20 rounded-full data-[state=active]:text-accent"
              >
                <LineChartIcon className="h-4 w-4 mr-2" />
                Area
              </TabsTrigger>
              <TabsTrigger 
                value="bar"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-highlight/20 rounded-full data-[state=active]:text-accent"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Bar
              </TabsTrigger>
              <TabsTrigger 
                value="pie"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-highlight/20 rounded-full data-[state=active]:text-accent"
              >
                <PieChartIcon className="h-4 w-4 mr-2" />
                Pie
              </TabsTrigger>
            </TabsList>
            
            <div className={`transition-all duration-500 ${showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              <Badge className="bg-white text-gray-600 border border-gray-200 shadow-sm px-4 py-1.5">
                {tabDescriptions[activeTab as keyof typeof tabDescriptions]}
              </Badge>
            </div>
          </div>
          
          <TabsContent value="line" className="neo-card p-6 rounded-xl border-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">Assumptions</h3>
              <div className="flex gap-2 mt-2 sm:mt-0">
                {Object.entries(chartConfig).map(([key, config]) => (
                  <Badge 
                    key={key} 
                    className="bg-white border shadow-sm"
                    style={{ color: config.theme.light }}
                  >
                    {config.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="h-[350px] lg:h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <LineChart data={activeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="var(--color-users)" 
                    strokeWidth={3} 
                    activeDot={{ r: 8, stroke: 'var(--color-users)', strokeWidth: 2, fill: 'white' }} 
                    dot={{ stroke: 'var(--color-users)', strokeWidth: 2, fill: 'white', r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="var(--color-growth)" 
                    strokeWidth={3}
                    activeDot={{ r: 8, stroke: 'var(--color-growth)', strokeWidth: 2, fill: 'white' }}
                    dot={{ stroke: 'var(--color-growth)', strokeWidth: 2, fill: 'white', r: 4 }}
                  />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div className="mt-6 overflow-auto max-h-40 rounded-lg border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth %</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeData.map((item, index) => (
                    <tr key={item.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {item.users} {getTrendIndicator('users', index)}
                        </div>
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {item.growth}% {getTrendIndicator('growth', index)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="area" className="neo-card p-6 rounded-xl border-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">Growth Visualization</h3>
              <div className="flex gap-2 mt-2 sm:mt-0">
                {Object.entries(chartConfig).map(([key, config]) => (
                  <Badge 
                    key={key} 
                    className="bg-white border shadow-sm"
                    style={{ color: config.theme.light }}
                  >
                    {config.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="h-[350px] lg:h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <AreaChart data={activeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-users)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-users)" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-growth)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--color-growth)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stroke="var(--color-users)" 
                    strokeWidth={2} 
                    fillOpacity={1}
                    fill="url(#colorUsers)" 
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="growth" 
                    stroke="var(--color-growth)" 
                    strokeWidth={2} 
                    fillOpacity={1}
                    fill="url(#colorGrowth)" 
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Users Analysis</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600">Average</p>
                    <p className="font-bold">{Math.round(activeData.reduce((sum, item) => sum + item.users, 0) / activeData.length)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Maximum</p>
                    <p className="font-bold">{Math.max(...activeData.map(item => item.users))}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-accent/20 to-highlight/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Growth Trend</h4>
                <p className="text-sm">Positive growth trend over the last {activeData.length} months</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bar" className="neo-card p-6 rounded-xl border-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">User Comparison</h3>
              <div className="flex gap-2 mt-2 sm:mt-0">
                {Object.entries(chartConfig).map(([key, config]) => (
                  <Badge 
                    key={key} 
                    className="bg-white border shadow-sm"
                    style={{ color: config.theme.light }}
                  >
                    {config.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="h-[350px] lg:h-[400px] w-full">
              <ChartContainer config={chartConfig}>
                <BarChart data={activeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar 
                    dataKey="users" 
                    fill="var(--color-users)" 
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                    animationDuration={1500}
                  />
                  <Bar 
                    dataKey="growth" 
                    fill="var(--color-growth)" 
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                    animationDuration={1500}
                  />
                </BarChart>
              </ChartContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-3 text-lg">User Highlights</h4>
                {activeData.reduce((max, item) => max.users > item.users ? max : item, activeData[0]).name === activeData[activeData.length - 1].name ? (
                  <div className="flex gap-2 items-center text-accent">
                    <ArrowUpIcon className="w-5 h-5" />
                    <span>Highest user count in latest month!</span>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <span>Top month: {activeData.reduce((max, item) => max.users > item.users ? max : item, activeData[0]).name}</span>
                  </div>
                )}
                <div className="mt-2 h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-accent to-highlight rounded-full"
                    style={{ 
                      width: `${(activeData[activeData.length - 1].users / activeData.reduce((max, item) => Math.max(max, item.users), 0)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-3 text-lg">User Growth</h4>
                <div className="flex justify-between">
                  <span>First month: {activeData[0].users} users</span>
                  <span>Latest month: {activeData[activeData.length - 1].users} users</span>
                </div>
                <div className="mt-2 h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{ 
                      width: `${(activeData[activeData.length - 1].users / activeData.reduce((max, item) => Math.max(max, item.users), 0)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pie" className="neo-card p-6 rounded-xl border-0">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Industry Segment Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={windowWidth < 640 ? 50 : 70}
                      outerRadius={windowWidth < 640 ? 80 : 100}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                      animationBegin={0}
                      animationDuration={1200}
                      className="drop-shadow-xl"
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value, name) => [`${value} clients`, name]}
                      contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.95)', 
                        borderRadius: '8px', 
                        border: '1px solid rgba(0,0,0,0.1)',
                        color: '#333',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-3">Segment Breakdown</h4>
                <div className="space-y-3">
                  {pieData.map((item, index) => (
                    <div 
                      key={item.name}
                      className={`flex items-center p-3 rounded-lg transition-all cursor-pointer border 
                        ${activeIndex === index ? 'bg-gray-50 border-gray-300 shadow-sm' : 'hover:bg-gray-50 border-transparent'}`}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div 
                        className="w-4 h-4 rounded-full mr-3" 
                        style={{ backgroundColor: item.color }} 
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span>{item.value} clients</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1.5">
                          <div 
                            className="h-1.5 rounded-full"
                            style={{ 
                              width: `${(item.value / pieData.reduce((sum, i) => sum + i.value, 0)) * 100}%`,
                              backgroundColor: item.color
                            }}
                          ></div>
                        </div>
                        {activeIndex === index && (
                          <p className="text-sm text-gray-600 mt-2 animate-fade-in">
                            {item.name === 'Manufacturing' && 'Manufacturing sector leads adoption with 40% market share'}
                            {item.name === 'Mines' && 'Mining operations see 30% energy savings on average'}
                            {item.name === 'Government' && 'Government facilities focusing on sustainability targets'}
                            {item.name === 'Retailers' && 'Retail chains implementing smart energy solutions'}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-3 bg-gradient-to-r from-accent/10 to-highlight/10 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Pro tip:</span> Click or hover over segments to see detailed insights
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DemoCharts;
