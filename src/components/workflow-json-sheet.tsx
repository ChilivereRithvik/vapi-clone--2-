"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Download, Copy, X } from "lucide-react"
import { useState } from "react"

interface WorkflowJsonSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workflowName: string
  workflowData: any
}

export function WorkflowJsonSheet({ open, onOpenChange, workflowName, workflowData }: WorkflowJsonSheetProps) {
  const [copied, setCopied] = useState(false)

  const jsonString = JSON.stringify(workflowData, null, 2)
  const lineCount = jsonString.split("\n").length

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${workflowName.toLowerCase().replace(/\s+/g, "-")}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const renderJsonWithSyntaxHighlight = (json: string) => {
    const lines = json.split("\n")
    return lines.map((line, index) => {
      // Syntax highlighting logic
      const highlightedLine = line
        // Property names (blue)
        .replace(/"([^"]+)":/g, '<span class="text-blue-500">"$1"</span>:')
        // String values (green)
        .replace(/:\s*"([^"]*)"/g, ': <span class="text-green-600 dark:text-green-400">"$1"</span>')
        // Numbers (purple)
        .replace(/:\s*(-?\d+\.?\d*)/g, ': <span class="text-purple-600 dark:text-purple-400">$1</span>')
        // Booleans (purple)
        .replace(/:\s*(true|false)/g, ': <span class="text-purple-600 dark:text-purple-400">$1</span>')
        // null (purple)
        .replace(/:\s*(null)/g, ': <span class="text-purple-600 dark:text-purple-400">$1</span>')

      return (
        <div key={index} className="flex">
          <span className="inline-block w-12 select-none text-right pr-4 text-muted-foreground">{index + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
        </div>
      )
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0 flex flex-col h-full">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">B</span>
              </div>
              <SheetTitle className="text-xl">Workflow JSON</SheetTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleDownload} title="Download JSON">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCopy} title={copied ? "Copied!" : "Copy JSON"}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} title="Close">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        {/* Format Info */}
        <div className="px-6 py-3 border-b flex items-center justify-between text-sm flex-shrink-0">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-mono">&lt;/&gt;</span>
            <span>JSON Format</span>
          </div>
          <span className="text-muted-foreground">{lineCount} lines</span>
        </div>

        {/* JSON Content */}
        <ScrollArea className="flex-1">
          <div className="px-6 py-4">
            <pre className="font-mono text-sm leading-relaxed">{renderJsonWithSyntaxHighlight(jsonString)}</pre>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
