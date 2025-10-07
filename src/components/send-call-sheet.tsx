"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Phone, Clock } from "lucide-react"
import { format } from "date-fns"

interface SendCallSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SendCallSheet({ open, onOpenChange }: SendCallSheetProps) {
  const [date, setDate] = useState<Date>()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Send Call</SheetTitle>
        </SheetHeader>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* New Call Card */}
          <Card>
            <CardHeader>
              <CardTitle>New Call</CardTitle>
              <CardDescription>Configure and send a new call</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent">Select Agent</Label>
                <Select>
                  <SelectTrigger id="agent">
                    <SelectValue placeholder="Choose an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Agent</SelectItem>
                    <SelectItem value="support">Support Agent</SelectItem>
                    <SelectItem value="technical">Technical Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" type="tel" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Custom Message (Optional)</Label>
                <Textarea id="message" placeholder="Add a custom message for this call..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label>Schedule Call</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date (optional)</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Send Now
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Send Card */}
          <Card>
            <CardHeader>
              <CardTitle>Bulk Send</CardTitle>
              <CardDescription>Send calls to multiple numbers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-agent">Select Agent</Label>
                <Select>
                  <SelectTrigger id="bulk-agent">
                    <SelectValue placeholder="Choose an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Agent</SelectItem>
                    <SelectItem value="support">Support Agent</SelectItem>
                    <SelectItem value="technical">Technical Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numbers">Phone Numbers</Label>
                <Textarea
                  id="numbers"
                  placeholder="Enter phone numbers (one per line)&#10;+1 (555) 123-4567&#10;+1 (555) 987-6543"
                  rows={6}
                />
              </div>

              <Button className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                Send to All
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  )
}
