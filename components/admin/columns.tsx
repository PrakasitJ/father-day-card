"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { EditDialog } from "./edit-dialog"
import { useRouter } from "next/navigation"

export type Blessing = {
    id: number
    senderName: string
    blessingMessage: string
    cardId: string
    createdAt: Date
}

export const columns: ColumnDef<Blessing>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "senderName",
        header: "Name",
    },
    {
        accessorKey: "blessingMessage",
        header: "Message",
        cell: ({ row }) => {
            return <div className="max-w-[300px] truncate" title={row.getValue("blessingMessage")}>{row.getValue("blessingMessage")}</div>
        }
    },
    {
        accessorKey: "cardId",
        header: "Card ID",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return new Date(row.getValue("createdAt")).toLocaleString('th-TH')
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blessing = row.original
            const [showEdit, setShowEdit] = useState(false)
            const router = useRouter()

            const handleDelete = async () => {
                if (confirm("Are you sure you want to delete this blessing?")) {
                    await fetch(`/api/blessings/${blessing.id}`, { method: 'DELETE' })
                    router.refresh()
                }
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setShowEdit(true)}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <EditDialog open={showEdit} onOpenChange={setShowEdit} blessing={blessing} />
                </>
            )
        },
    },
]
