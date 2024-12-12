"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { DateRange } from "react-day-picker"
import { ru } from "date-fns/locale"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Calendar } from "@/components/ui/calendar"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import Input from "postcss/lib/input"
import { StatisticService } from "@/api/service/statistic.service"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(347,77.2%,49.8%)",

  },
} satisfies ChartConfig

export default function Chart2() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [monthly, setMonthly] = useState<{date:string, data:{manager_name:string, day_sell:number}[]}[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [maxSell, setMaxSell] = useState(0)
  const [name, setName] = useState('')
  useEffect(() => {
    if(dateRange?.from!==undefined && dateRange?.to!==undefined){
        StatisticService.getIntervalSelectedManagerSell(dateRange?.from?.toLocaleDateString()!, dateRange?.to?.toLocaleDateString()!)
        .then((res) => {
        if(res){
            if(res.data.length!=0){
                console.log('Raw data:', JSON.stringify(res.data, null, 2));
                // Get unique managers using Object.keys and reduce
                const uniqueManagers = res.data.reduce((acc: string[], day) => {
                    day.data.forEach(d => {
                        if (!acc.includes(d.manager_name)) {
                            acc.push(d.manager_name);
                        }
                    });
                    return acc;
                }, []);
                console.log('Unique managers:', uniqueManagers);
                setMonthly(res.data);
                setIsLoading(false);
            }
        }})
    }
    
  }, [dateRange])
  return (
    <Card>
      <CardHeader >
        <CardTitle>Продажи менеджеров</CardTitle>
        <div className="flex flex-col space-y-1.5 items-center justify-center">
        <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Выберите интервал</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
      <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          className="rounded"
          numberOfMonths={1}
          locale={ru}
        />
      </PopoverContent>
    </Popover>
        
        <CardDescription>{dateRange?.from?.toLocaleDateString()} - {dateRange?.to?.toLocaleDateString()}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={monthly}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {monthly && monthly.reduce((acc: string[], day) => {
              day.data.forEach(d => {
                if (!acc.includes(d.manager_name)) {
                  acc.push(d.manager_name);
                }
              });
              return acc;
            }, []).map((managerName, index) => (
              <Line
                key={managerName}
                type="monotone"
                dataKey={(dataPoint: any) => {
                  const manager = dataPoint.data.find((d: any) => d.manager_name === managerName);
                  return manager ? manager.day_sel : 0;
                }}
                name={managerName}
                stroke={`hsl(${index * 40}, 70%, 50%)`}
                strokeWidth={2}
                dot={true}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {/* <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div> */}
      </CardFooter>
    </Card>
  )
}
