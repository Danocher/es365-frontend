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
import { ManagerService } from "@/api/service/manager.service";
interface Props {
    id:string
    name:string
    phonenum:string
    hour_cost:number
}const formatPhoneNumber = (value: string) => {
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
export default function EditDialog({id, name, phonenum, hour_cost}:Props) {
    const [prodName, setProdName] = useState(name)
    const [prodPhonenum, setProdPhone] = useState(phonenum)
    const [prodHour, setProdHour] = useState(hour_cost)
    // console.log(prodDate)
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(prodName==='' || prodPhonenum==='' || !prodHour){
            toast.error('Заполните все поля')
            return
        }
        else{
            const data = ManagerService.updateManager( id,{ name:prodName, phonenum:prodPhonenum, hour_cost:prodHour})
            .then((res)=>{
                if (res){
                    toast.success(`Менеджер ${prodName} успешно отредактирован`);
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
          <DialogTitle className="flex flex-col space-y-3">Редактирование менеджера <span>{name}</span></DialogTitle>
          <DialogDescription>
            Внесите необходимые изменения
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit
        }>
            <Label>ФИО</Label>
            <Input placeholder="Название" onChange={(e) => {setProdName(e.target.value)}} value={prodName}/>
            <Label>Номер телефона</Label>
            <Input placeholder="Номер телефона" onChange={(e) => {
                
                        setProdPhone(formatPhoneNumber(e.target.value))
                    
                }} value={prodPhonenum}/>
            <Label>Введите цену продажи</Label>
            <Input placeholder="Цена продажи" onChange={(e) => {
                if(isNumber(e.target.value)===true)
                {
                    setProdHour(Number(e.target.value))
                }
                else{
                setProdHour(prodHour)}}} value={prodHour}/>
            
            <DialogFooter>
                
                <Button type="submit">Изменить</Button>
            </DialogFooter>
        </form>
        <DialogFooter>
          <Button onClick={()=>{setProdPhone(prodPhonenum)
          setProdHour(hour_cost)
          setProdName(name)
          }}>Отменить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}