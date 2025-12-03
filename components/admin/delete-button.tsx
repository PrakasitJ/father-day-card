"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Trash2 } from "lucide-react"

export function DeleteButton({ id }: { id: number }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this blessing?")) return

        setIsDeleting(true)
        try {
            const res = await fetch(`/api/blessings/${id}`, {
                method: "DELETE",
            })

            if (!res.ok) throw new Error("Failed to delete")

            router.refresh()
        } catch (error) {
            console.error("Failed to delete:", error)
            alert("Failed to delete blessing")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
            title="Delete"
        >
            <Trash2 size={20} />
        </button>
    )
}
