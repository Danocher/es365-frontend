import { ManagerService } from "@/api/service/manager.service";
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
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import {PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formatPhoneNumber = (value: string) => {
    // Удаляем все нецифровые символы
    const phoneNumber = value.replace(/\D/g, '');
    
    // Форматируем номер телефона
    let formattedNumber = '';
    if (phoneNumber.length > 0) {
    formattedNumber = '+7 ';
    if (phoneNumber.length > 1) {
    formattedNumber += ` (${phoneNumber.slice(1, 4)}` ;
    }
    if (phoneNumber.length > 4) {
    formattedNumber += `) ${phoneNumber.slice(4, 7)}`;
    }
    if (phoneNumber.length > 7) {
    formattedNumber += ` - ${phoneNumber.slice(7, 9)}`;
    }
    if (phoneNumber.length > 9) {
    formattedNumber += ` - ${phoneNumber.slice(9, 11)}`;
    }
    }
    return formattedNumber;
    };
function isNumber(value:string){
    // const str = value;
    if (!isNaN(Number(value))) {
        return true
    } else {
        return false
    }
}
export default function CreateManagerModal() {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(name==='' || phonenum==='' || hour_cost===''){
            toast.error('Заполните все поля')
            return
        }
        else{
            const data = ManagerService.addManager({name, phonenum, hour_cost:Number(hour_cost)})
            .then((res)=>{
                if (res){
                    toast.success(`Менеджер ${name} успешно добавлен`);
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
    // const [date, setDate] = useState<Date>();
    const [name, setName] = useState('')
    const [phonenum, setPhonenum] = useState('')
    const [hour_cost, setHourcost] = useState('')
    return (
<Dialog>
      <DialogTrigger asChild>
      <button
        //   onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Добавить менеджера
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Добавление нового менеджера </DialogTitle>
          <DialogDescription>
            Создайте нового менеджера. Заполните все поля.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Label>Введите ФИО менеджера</Label>
            <Input placeholder="Название" onChange={(e) => {setName(e.target.value)}} value={name}/>
            <Label>Введите закупочную цену</Label>
            <Input placeholder="Номер телефона" onChange={(e) => {
                
                        setPhonenum(formatPhoneNumber(e.target.value))
        
            }} value={phonenum}/>
            <Label>Введите цену часа смены менеджера</Label>
            <Input placeholder="Часовая ставка" onChange={(e) => {
                if(isNumber(e.target.value)===true)
                {
                    setHourcost(e.target.value)
                }
                else{
                setHourcost('')}}} value={hour_cost}/>
            
            <DialogFooter>
                
                <Button type="submit">Добавить</Button>
            </DialogFooter>
        </form>
        <Button variant="outline" onClick={()=>{
                    setName('')
                    setPhonenum('')
                    setHourcost('')
                }}>Отменить</Button>
      </DialogContent>
    </Dialog>
    )
}