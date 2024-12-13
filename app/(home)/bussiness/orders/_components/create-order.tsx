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
import { PlusIcon } from "lucide-react";

export default function CreateOrder() {
    return (
        

    <Dialog>
      <DialogTrigger asChild>
      <button
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Новая продажа
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Оформить заказ</DialogTitle>
          <DialogDescription>
           Оформите заказ. Заполните все поля
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label>Начните вводить номер телефона клиента или имя</Label>
          <Input />
          <Label></Label>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    );
}