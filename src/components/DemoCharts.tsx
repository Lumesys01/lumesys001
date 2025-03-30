import { useEffect, useState } from "react";
import { 
  BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, Sector, Line, LineChart
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon, PieChartIcon } from "lucide-react";

const monthlyData = [
  { name: "Jan", users: 500, growth: 24 },
  { name: "Feb", users: 650, growth: 26 },
  { name: "Mar", users: 820, growth: 29 },
  { name: "Apr", users: 1050, growth: 32 },
  { name: "May", users: 1300, growth: 36 },
  { name: "Jun", users: 1500, growth: 42 },
];

const pieData = [
  { name: "Manufacturing", value: 40, color: "#0EA5E9", sa: 38, global: 42 },
  { name: "Mining", value: 30, color: "#8B5CF6", sa: 35, global: 25 },
  { name: "Government", value: 20, color: "#00bf72", sa: 18, global: 22 },
  { name: "Retail", value: 10, color: "#A8EB12", sa: 9, global: 11 },
];

const sadcData = [
  { 
    name: "South Africa", 
    q1: 35, q2: 42, q3: 50, q4: 65,
    color: "#0EA5E9" 
  },
  { 
    name: "Botswana", 
    q1: 18, q2: 24, q3: 32, q4: 40, 
    color: "#8B5CF6" 
  },
  { 
    name: "Namibia", 
    q1: 15, q2: 20, q3: 28, q4: 35, 
    color: "#00bf72" 
  },
  { 
    name: "Zimbabwe", 
    q1: 10, q2: 15, q3: 22, q4: 29, 
    color: "#A8EB12" 
  },
  { 
    name: "Mozambique", 
    q1: 8, q2: 14, q3: 20, q4: 27, 
    color: "#F43F5E" 
  },
];

const globalForecast = [
  { year: "Year 1", adoption: 15, growth: 15, color: "#0EA5E9" },
  { year: "Year 2", adoption: 32, growth: 17, color: "#8B5CF6" },
  { year: "Year 3", adoption: 54, growth: 22, color: "#00bf72" },
  { year: "Year 4", adoption: 78, growth: 24, color: "#A8EB12" },
  { year: "Year 5", adoption: 100, growth: 22, color: "#F43F5E" },
];

const DemoCharts = () => {
  const [activeData, setActiveData] = useState(monthlyData);
  const [animate, setAnimate] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeTab, setActiveTab] = useState("sadc");
  const [showDescription, setShowDescription] = useState(false);
  const [marketView, setMarketView] = useState("global");
  const [sadcQuarter, setSadcQuarter] = useState("q4");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const randomizeData = () => {
    setAnimate(true);
    const newData = [];
    let baseUsers = 480 + Math.floor(Math.random() * 100);
    let baseGrowth = 22 + Math.floor(Math.random() * 5);
    
    for (let i = 0; i < monthlyData.length; i++) {
      const growthIncrement = Math.floor(Math.random() * 6) + 2;
      baseGrowth += growthIncrement;
      
      const userIncrement = Math.floor(baseUsers * (baseGrowth / 100));
      baseUsers += userIncrement;
      
      newData.push({
        name: monthlyData[i].name,
        users: baseUsers,
        growth: baseGrowth
      });
    }
    
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
    adoption: {
      label: "Adoption %",
      theme: {
        light: "#8B5CF6",
        dark: "#8B5CF6"
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

    const marketSpecificValue = marketView === "global" ? payload.global : payload.sa;

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
          {`${marketSpecificValue}% market share`}
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
    
    return <ArrowUpIcon className="w-4 h-4 text-accent" />;
  };

  const tabDescriptions = {
    sadc: "Regional adoption across SADC countries over quarterly periods.",
    global: "Global adoption forecast showing steady incremental growth.",
    msd: "Market size distribution across major industry segments."
  };

  const getPieDataForCurrentMarket = () => {
    return pieData.map(item => ({
      ...item,
      value: marketView === "global" ? item.global : item.sa
    }));
  };

  const getSadcDataForQuarter = () => {
    return sadcData.map(country => ({
      name: country.name,
      adoption: country[sadcQuarter as keyof typeof country] as number,
      color: country.color
    }));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="mb-8 sm:mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-light mb-3 sm:mb-4">
          <span className="gradient-text">Interactive Insights</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
          Explore adoption trends and growth potential across markets
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
          defaultValue="sadc" 
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
                value="sadc" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-highlight/20 rounded-full data-[state=active]:text-accent"
              >
                <ArrowUpIcon className="h-4 w-4 mr-2" />
                SADC
              </TabsTrigger>
              <TabsTrigger 
                value="global"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-highlight/20 rounded-full data-[state=active]:text-accent"
              >
                <ArrowUpIcon className="h-4 w-4 mr-2" />
                Global
              </TabsTrigger>
              <TabsTrigger 
                value="msd"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent/20 data-[state=active]:to-highlight/20 rounded-full data-[state=active]:text-accent"
              >
                <PieChartIcon className="h-4 w-4 mr-2" />
                MSD
              </TabsTrigger>
            </TabsList>
            
            <div className={`transition-all duration-500 ${showDescription ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              <Badge className="bg-white text-gray-600 border border-gray-200 shadow-sm px-4 py-1.5">
                {tabDescriptions[activeTab as keyof typeof tabDescriptions]}
              </Badge>
            </div>
          </div>

          <TabsContent value="sadc" className="neo-card p-6 rounded-xl border-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">SADC Region Adoption</h3>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button 
                  size="sm" 
                  variant={sadcQuarter === "q1" ? "default" : "outline"} 
                  onClick={() => setSadcQuarter("q1")}
                  className={sadcQuarter === "q1" ? "bg-accent hover:bg-accent/90" : ""}
                >
                  Q1
                </Button>
                <Button 
                  size="sm" 
                  variant={sadcQuarter === "q2" ? "default" : "outline"} 
                  onClick={() => setSadcQuarter("q2")}
                  className={sadcQuarter === "q2" ? "bg-accent hover:bg-accent/90" : ""}
                >
                  Q2
                </Button>
                <Button 
                  size="sm" 
                  variant={sadcQuarter === "q3" ? "default" : "outline"} 
                  onClick={() => setSadcQuarter("q3")}
                  className={sadcQuarter === "q3" ? "bg-accent hover:bg-accent/90" : ""}
                >
                  Q3
                </Button>
                <Button 
                  size="sm" 
                  variant={sadcQuarter === "q4" ? "default" : "outline"} 
                  onClick={() => setSadcQuarter("q4")}
                  className={sadcQuarter === "q4" ? "bg-accent hover:bg-accent/90" : ""}
                >
                  Q4
                </Button>
              </div>
            </div>
            <div className="h-[350px] lg:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={getSadcDataForQuarter()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'Adoption %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
                  <Tooltip 
                    formatter={(value) => [`${value}% Adoption`, 'Adoption Rate']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.1)', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                  <Bar 
                    dataKey="adoption" 
                    radius={[4, 4, 0, 0]} 
                    barSize={40}
                    animationDuration={1500}
                  >
                    {getSadcDataForQuarter().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">SADC Growth Trends</h4>
                <p className="text-sm text-gray-600 mb-3">Quarterly adoption rates across Southern African Development Community nations.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Quarterly Growth</p>
                    <p className="font-medium text-accent">Steady Incremental</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Highest Adoption</p>
                    <p className="font-medium">South Africa ({sadcData[0][sadcQuarter as keyof typeof sadcData[0]]}%)</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-accent/10 to-highlight/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Key Insights</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowUpIcon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Consistent quarter-over-quarter adoption increases across all regions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowUpIcon className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>South Africa leads adoption, with neighboring countries showing promising growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="global" className="neo-card p-6 rounded-xl border-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">Global Growth Forecast</h3>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Badge className="bg-white border shadow-sm text-accent">
                  5-Year Projection
                </Badge>
              </div>
            </div>
            <div className="h-[350px] lg:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={globalForecast}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00bf72" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00bf72" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${value}${name === 'adoption' ? '% Adoption' : '% Year-over-Year'}`, 
                      name === 'adoption' ? 'Market Share' : 'Growth Rate'
                    ]}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      borderRadius: '8px',
                      border: '1px solid rgba(0,0,0,0.1)', 
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="adoption" 
                    name="Adoption" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 8, strokeWidth: 2, fill: 'white' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="growth" 
                    name="Year Growth" 
                    stroke="#00bf72" 
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                    activeDot={{ r: 8, strokeWidth: 2, fill: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Early Adoption</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-semibold text-accent">{globalForecast[0].adoption}%</p>
                    <p className="text-xs text-gray-500">Year 1 Adoption</p>
                  </div>
                  <ArrowUpIcon className="w-8 h-8 text-accent opacity-50" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Mid-Term Growth</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-semibold text-accent">{globalForecast[2].adoption}%</p>
                    <p className="text-xs text-gray-500">Year 3 Adoption</p>
                  </div>
                  <ArrowUpIcon className="w-8 h-8 text-accent opacity-70" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-medium mb-2">Projected Maturity</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-semibold text-accent">{globalForecast[4].adoption}%</p>
                    <p className="text-xs text-gray-500">Year 5 Adoption</p>
                  </div>
                  <ArrowUpIcon className="w-8 h-8 text-accent" />
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-accent/10 to-highlight/10 rounded-lg">
              <h4 className="font-medium mb-2">Growth Assumptions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm mb-1"><span className="font-medium">Steady Incremental Growth:</span> The model shows consistent year-over-year adoption increases.</p>
                  <p className="text-sm"><span className="font-medium">Accelerating Middle Phase:</span> Years 2-4 show the most aggressive growth as market penetration increases.</p>
                </div>
                <div>
                  <p className="text-sm mb-1"><span className="font-medium">Global Expansion:</span> International markets follow adoption patterns observed in SADC regions.</p>
                  <p className="text-sm"><span className="font-medium">Market Maturity:</span> By Year 5, projections show significant market share with continued growth potential.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="msd" className="neo-card p-6 rounded-xl border-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-800">Market Size Distribution</h3>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant={marketView === "global" ? "default" : "outline"} 
                  onClick={() => setMarketView("global")}
                  className={marketView === "global" ? "bg-accent hover:bg-accent/90" : ""}
                >
                  Global
                </Button>
                <Button 
                  size="sm" 
                  variant={marketView === "sa" ? "default" : "outline"} 
                  onClick={() => setMarketView("sa")}
                  className={marketView === "sa" ? "bg-accent hover:bg-accent/90" : ""}
                >
                  South Africa
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={getPieDataForCurrentMarket()}
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
                      formatter={(value, name, entry) => {
                        const payload = entry?.payload;
                        return [`${value}% market share`, payload?.name];
                      }}
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
                <h4 className="text-lg font-medium mb-3">Market Breakdown</h4>
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
                          <span>{marketView === "global" ? item.global : item.sa}% market share</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1.5">
                          <div 
                            className="h-1.5 rounded-full"
                            style={{ 
                              width: `${marketView === "global" ? item.global : item.sa}%`,
                              backgroundColor: item.color
                            }}
                          ></div>
                        </div>
                        {activeIndex === index && (
                          <p className="text-sm text-gray-600 mt-2 animate-fade-in">
                            {item.name === 'Manufacturing' && 'Manufacturing sector represents the largest market opportunity'}
                            {item.name === 'Mining' && 'Mining operations have higher market share in South Africa than globally'}
                            {item.name === 'Government' && 'Government facilities represent significant market potential'}
                            {item.name === 'Retail' && 'Retail segment has consistent market share globally and locally'}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-3 bg-gradient-to-r from-accent/10 to-highlight/10 rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">Pro tip:</span> Toggle between global and South African market data
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
