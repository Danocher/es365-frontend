import { ManagerService } from "@/api/service/manager.service"
import { ProductsService } from "@/api/service/products.service"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-react"
import { toast } from "sonner"
interface Props{
    id:string
    name:string
}
export default function DeleteDialogue({id, name}:Props) {
    function handleDelete(){
        ManagerService.deleteManager(id)
        .then((res) => {
            toast.success(res.data.success)
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        })
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button><Trash2Icon color="red"/></button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Вы точно хотитe удалить менеджера {name}?</AlertDialogTitle>
                <AlertDialogDescription>
                    Это действие нельзя отменить
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Отменить</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600" onClick={handleDelete}>Удалить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
    </AlertDialog>
    )}