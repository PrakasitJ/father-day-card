"use client"

import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Download, Trash } from "lucide-react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import html2canvas from "html2canvas"
import { CardPreview } from "@/components/blessing/card-preview"
import { Blessing } from "./columns"
import { useCardStore } from "@/store/use-card-store"

interface BulkActionsProps<TData> {
    table: Table<TData>
}

export function BulkActions<TData>({ table }: BulkActionsProps<TData>) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const router = useRouter()
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const hiddenRef = useRef<HTMLDivElement>(null)

    // We need to temporarily update the store to render the correct card
    const { setSelectedCardId, setSenderName, setBlessingMessage } = useCardStore()

    if (selectedRows.length === 0) {
        return null
    }

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete ${selectedRows.length} items?`)) {
            setIsDeleting(true)
            try {
                const ids = selectedRows.map((row) => (row.original as any).id)
                await fetch("/api/blessings/bulk-delete", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ids }),
                })
                router.refresh()
                table.resetRowSelection()
            } catch (error) {
                console.error("Failed to delete items:", error)
                alert("Failed to delete items")
            } finally {
                setIsDeleting(false)
            }
        }
    }

    const handleDownload = async () => {
        setIsDownloading(true)
        const zip = new JSZip()
        const folder = zip.folder("father-day-cards")

        try {
            // Store original state
            const originalState = useCardStore.getState()

            for (const row of selectedRows) {
                const blessing = row.original as Blessing

                // Update store to render this card
                setSelectedCardId(blessing.cardId)
                setSenderName(blessing.senderName)
                setBlessingMessage(blessing.blessingMessage)

                // Wait for render
                await new Promise(resolve => setTimeout(resolve, 100))

                if (hiddenRef.current) {
                    const canvas = await html2canvas(hiddenRef.current, {
                        backgroundColor: null,
                        scale: 2,
                        useCORS: true, // Important for loading local images in some envs
                    })

                    const blob = await new Promise<Blob | null>((resolve) =>
                        canvas.toBlob(resolve, 'image/png')
                    )

                    if (blob && folder) {
                        folder.file(`card-${blessing.id}.png`, blob)
                    }
                }
            }

            // Restore original state (optional, but good practice)
            setSelectedCardId(originalState.selectedCardId)
            setSenderName(originalState.senderName)
            setBlessingMessage(originalState.blessingMessage)

            const content = await zip.generateAsync({ type: "blob" })
            saveAs(content, "father-day-cards.zip")

        } catch (error) {
            console.error("Failed to download images:", error)
            alert("Failed to download images")
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="flex items-center gap-2">
            {/* Hidden container for rendering cards */}
            <div className="fixed left-[-9999px] top-[-9999px]" ref={hiddenRef}>
                <div className="w-[400px] h-[533px] relative">
                    <CardPreview />
                </div>
            </div>

            <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
            >
                <Trash className="mr-2 h-4 w-4" />
                Delete ({selectedRows.length})
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={isDownloading}
            >
                <Download className="mr-2 h-4 w-4" />
                Download Images ({selectedRows.length})
            </Button>
        </div>
    )
}
