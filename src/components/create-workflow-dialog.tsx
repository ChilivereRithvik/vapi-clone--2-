"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const workflowTemplates = [
  {
    id: "lead-qualification",
    name: "Lead Qualification Agent",
    description:
      "Let callers schedule, reschedule, or cancel meetings using natural voice prompts — no manual coordination required.",
    preview: "/workflow-diagram-with-conversation-nodes.jpg",
  },
  {
    id: "appointment-scheduler",
    name: "Appointment Scheduler",
    description:
      "Automatically remind customers about outstanding payments and collect responses — efficiently and politely.",
    preview: "/appointment-scheduling-workflow.jpg",
  },
  {
    id: "customer-satisfaction",
    name: "Customer Satisfaction Survey",
    description: "Answer questions, resolve issues, and route requests — a 24/7 voice-based support experience.",
    preview: "/customer-survey-workflow.jpg",
  },
  {
    id: "blank",
    name: "Blank",
    description: "Start with a blank canvas",
    preview: null,
  },
]

interface CreateWorkflowDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateWorkflow: (templateId: string, name: string) => void
}

export function CreateWorkflowDialog({ open, onOpenChange, onCreateWorkflow }: CreateWorkflowDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(workflowTemplates[0].id)
  const [workflowName, setWorkflowName] = useState("Lead Qualification Agent")

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = workflowTemplates.find((t) => t.id === templateId)
    if (template) {
      setWorkflowName(template.name)
    }
  }

  const handleCreate = () => {
    onCreateWorkflow(selectedTemplate, workflowName)
    onOpenChange(false)
  }

  const selectedTemplateData = workflowTemplates.find((t) => t.id === selectedTemplate)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex h-full">
          {/* Left Side - Template Selection */}
          <div className="w-[45%] border-r border-border">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">Create Workflow</DialogTitle>
            </DialogHeader>

            <ScrollArea className="h-[calc(90vh-180px)] px-6">
              <div className="space-y-3 pb-6">
                {workflowTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template.id)}
                    className={cn(
                      "w-full rounded-lg border-2 p-4 text-left transition-all hover:border-teal-600/50",
                      selectedTemplate === template.id
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-950/20"
                        : "border-border bg-background",
                    )}
                  >
                    <h3
                      className={cn(
                        "mb-2 font-semibold",
                        selectedTemplate === template.id ? "text-teal-700 dark:text-teal-400" : "text-foreground",
                      )}
                    >
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </button>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-6">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="workflow-name">Workflow name</Label>
                  <Input
                    id="workflow-name"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <Button onClick={handleCreate} className="w-full bg-teal-600 hover:bg-teal-700">
                  Use template
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Preview */}
          <div className="flex-1 bg-muted/30">
            <ScrollArea className="h-full">
              <div className="flex items-center justify-center p-8 min-h-full">
                {selectedTemplateData?.preview ? (
                  <img
                    src={selectedTemplateData.preview || "/placeholder.svg"}
                    alt={`${selectedTemplateData.name} preview`}
                    className="max-w-full h-auto rounded-lg border border-border"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Start with a blank canvas</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
