import { ProductsService } from "@/api/service/products.service";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";
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
import { Value } from "@radix-ui/react-select";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function isNumber(value:string){
    const str = value;
    if (!isNaN(Number(value))) {
        return true
    } else {
        return false
    }
}
export default function CreateDialog() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(name==='' || buy==='' || sell==='' || date===undefined){
            toast.error('Заполните все поля')
            return
        }
        else{
            const data = ProductsService.createProduct({name, buy, sell, date})
            .then((res)=>{
                if (res){
                    toast.success(`Товар ${name} успешно создан`);
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                }
            })
            .catch(e=>{
                toast.error(e.response.data.message)
            })
        }
        
        
    }
    const [date, setDate] = useState<Date>();
    const [name, setName] = useState('')
    const [buy, setBuy] = useState('')
    const [sell, setSell] = useState('')
    return (
<Dialog>
      <DialogTrigger asChild>
      <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Добавить товар
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Добавление нового товара </DialogTitle>
          <DialogDescription>
            Создайте новый товар. Заполните все поля.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label>Введите название</Label>
            <Input placeholder="Название" onChange={(e) => {setName(e.target.value)}} value={name}/>
            <Label>Введите закупочную цену</Label>
            <Input placeholder="Закупочная цена" onChange={(e) => {
                if(isNumber(e.target.value)===true)
                    {
                        setBuy(e.target.value)
                    }
                else{
                setBuy('')}}} value={buy}/>
            <Label>Введите цену продажи</Label>
            <Input placeholder="Цена продажи" onChange={(e) => {
                if(isNumber(e.target.value)===true)
                {
                    setSell(e.target.value)
                }
                else{
                setSell('')}}} value={sell}/>
            <Label>Выберите дату закупки</Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon />
                    {date ? format(date, "PPP", { locale: ru }) : <span>Выберите дату закупки</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ru}

                    />
                </PopoverContent>
            </Popover>
            <DialogFooter>
                
                <Button type="submit">Добавить</Button>
            </DialogFooter>
        </form>
        <Button variant="outline" onClick={()=>{
                    setName('')
                    setBuy('')
                    setSell('')
                    setDate(undefined)
                }}>Отменить</Button>
      </DialogContent>
    </Dialog>
    )
}