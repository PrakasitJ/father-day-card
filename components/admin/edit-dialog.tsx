"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Blessing } from "./columns"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface EditDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    blessing: Blessing
}

export function EditDialog({ open, onOpenChange, blessing }: EditDialogProps) {
    const [senderName, setSenderName] = useState(blessing.senderName)
    const [blessingMessage, setBlessingMessage] = useState(blessing.blessingMessage)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Reset form when blessing changes
    useEffect(() => {
        setSenderName(blessing.senderName)
        setBlessingMessage(blessing.blessingMessage)
    }, [blessing])

    const handleSave = async () => {
        setIsLoading(true)
        try {
            await fetch(`/api/blessings/${blessing.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ senderName, blessingMessage }),
            })
            router.refresh()
            onOpenChange(false)
        } catch (error) {
            console.error("Failed to update blessing:", error)
            alert("Failed to update blessing")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Blessing</DialogTitle>
                    <DialogDescription>
                        Make changes to the blessing here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="message" className="text-right">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            value={blessingMessage}
                            onChange={(e) => setBlessingMessage(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave} disabled={isLoading}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
