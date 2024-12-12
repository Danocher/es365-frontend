import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon} from "lucide-react";
import { toast } from "sonner";
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar";
import { ProductsService } from "@/api/service/products.service";
interface Props {
    id:string
    name:string
    buy:string
    sell:string
    date:Date
}
function isNumber(value:string){
    const str = value;
    if (!isNaN(Number(value))) {
        return true
    } else {
        return false
    }
}
export default function EditDialog({id, name, buy, sell, date}:Props) {
    const [prodName, setProdName] = useState(name)
    const [prodBuy, setProdBuy] = useState(buy)
    const [prodSell, setProdSell] = useState(sell)
    const [prodDate, setProdDate] = useState<Date | undefined>(date)
    console.log(prodDate)
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(prodName==='' || prodBuy==='' || prodSell==='' || prodDate===undefined){
            toast.error('Заполните все поля')
            return
        }
        else{
            const data = ProductsService.updateProduct( {id, name:prodName, buy:prodBuy, sell:prodSell, date:prodDate})
            .then((res)=>{
                if (res){
                    toast.success(`Товар ${prodName} успешно обновлен`);
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            })
            .catch(e=>{
                toast.error(e.response.data.message)
            })
        }}
    return (
        <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                          <Pencil className="h-5 w-5" />
                        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Изменить {name}</DialogTitle>
          <DialogDescription>
            Внесите необходимые изменения
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit
        }>
            <Label>Введите название</Label>
            <Input placeholder="Название" onChange={(e) => {setProdName(e.target.value)}} value={prodName}/>
            <Label>Введите закупочную цену</Label>
            <Input placeholder="Закупочная цена" onChange={(e) => {
                if(isNumber(e.target.value)===true)
                    {
                        setProdBuy(e.target.value)
                    }
                else{
                setProdBuy('')}}} value={prodBuy}/>
            <Label>Введите цену продажи</Label>
            <Input placeholder="Цена продажи" onChange={(e) => {
                if(isNumber(e.target.value)===true)
                {
                    setProdSell(e.target.value)
                }
                else{
                setProdSell('')}}} value={prodSell}/>
            <Label>Выберите дату закупки</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !prodDate && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon />
                    {prodDate ? format(prodDate, "PPP", { locale: ru }) : <span>Выберите дату закупки</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                    mode="single"
                    selected={prodDate}
                    onSelect={setProdDate}
                    initialFocus
                    locale={ru}

                    />
                </PopoverContent>
            </Popover>
            <DialogFooter>
                
                <Button type="submit">Изменить</Button>
            </DialogFooter>
        </form>
        <DialogFooter>
          <Button onClick={()=>{setProdBuy(buy)
          setProdSell(sell)
          setProdName(name)
          setProdDate(date)
          }}>Отменить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}