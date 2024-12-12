"use client"

import { useMediaQuery } from 'usehooks-ts' 
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
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
import { useEffect, useState } from "react"
import { StatisticService } from "@/api/service/statistic.service"
import Loading from '@/components/loading'

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(347,77.2%,49.8%)",
  },
} satisfies ChartConfig

export default function Chart1() {
    const [monthly, setMonthly] = useState<{name:string, sell:number}[]>()
    const matches = useMediaQuery('(min-width: 820px)')
    const [isLoading, setIsLoading] = useState(true)
    const [maxSell, setMaxSell] = useState(0)
    const [name, setName] = useState('')
    const months = [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    const handleDatePicker = (month: string) => {
        setIndex(month)

        StatisticService.getMonthlySelectedManagerSell(month)
        .then((res) => {
            if(res){
                if(res.data.length!=0){
                    setMonthly(res.data)
                    // Find maximum sell value and corresponding name
                    const maxSellItem = res.data.reduce((max, current) => 
                        current.sell > max.sell ? current : max
                    , res.data[0]);
                    console.log(typeof res.data, res.data)
                    setMaxSell(maxSellItem.sell);
                    setName(maxSellItem.name);
                    setIsLoading(false)}
    }})
    }
    // useEffect(() => {
    //     StatisticService.getMonthlyTopManager()
    //     .then((res) => {
    //         if(res){
    //             setMonthly(res.data)
    //             // Find maximum sell value and corresponding name
    //             const maxSellItem = res.data.reduce((max, current) => 
    //                 current.sell > max.sell ? current : max
    //             , res.data[0]);
    //             setMaxSell(maxSellItem.sell);
    //             setName(maxSellItem.name);
    //             setIsLoading(false)
    // }})
    // }, [])
    const [index, setIndex] = useState('')
  return (
    <Card className='w-full h-[450px] sm:h-[400px] lg:h-[500px]'>
      <CardHeader>
        <CardTitle>Продажи Менеджеров За {months[Number(index)]} </CardTitle>
            <Select  onValueChange={(e)=>handleDatePicker(e)} defaultValue=''
                >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выбрать месяц" />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup >
                    <SelectLabel>Месяц</SelectLabel>
                    {months.map((month) => (
                        <SelectItem key={months.indexOf(month)} value={months.indexOf(month).toString()}>
                        {month}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        <CardDescription>От {new Date(new Date().getFullYear(), Number(index), 1).toLocaleDateString()} - {new Date(new Date().getFullYear(), Number(index), 30).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
        {isLoading || monthly?.length==0 ? (<CardTitle>Выберите месяц</CardTitle>) : (
            
          <BarChart accessibilityLayer data={monthly}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="sell" fill="var(--color-desktop)" radius={8}  barSize={matches ? 70 : 50}/>
        
          </BarChart>)}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Наибольшая сумма продаж - {maxSell.toLocaleString("de-DE")}<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {name} имеет наибольшую сумму продаж за {new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString()} - {new Date().toLocaleDateString()}, его сумма продаж составляет {maxSell.toLocaleString("de-DE")}
        </div>
      </CardFooter>
    </Card>
  )
}
