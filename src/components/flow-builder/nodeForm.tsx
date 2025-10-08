import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NodeForm({ type, node, onCancel, onSave }: any) {
  console.log("NodeForm props:", { type, node });
  console.log("NodeForm render");
  console.log("Node data:--------------->", node?.data);

  if (type === "callTransfer") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="transfer-number">Transfer Phone Number</Label>
          <Input id="transfer-number" placeholder="+1 (555) 123-4567" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transfer-message">Transfer Message</Label>
          <Textarea
            id="transfer-message"
            placeholder="Please hold while I transfer you..."
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transfer-timeout">Timeout (seconds)</Label>
          <Input id="transfer-timeout" type="number" defaultValue="30" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="transfer-fallback">Fallback Action</Label>
          <Select>
            <SelectTrigger id="transfer-fallback">
              <SelectValue placeholder="Select fallback" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="voicemail">Send to Voicemail</SelectItem>
              <SelectItem value="retry">Retry Transfer</SelectItem>
              <SelectItem value="end">End Call</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Configuration</Button>
        </div>
      </div>
    );
  }

  if (type === "endCall") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="end-message">Goodbye Message</Label>
          <Textarea
            id="end-message"
            placeholder="Thank you for calling. Have a great day!"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-action">After Call Action</Label>
          <Select>
            <SelectTrigger id="end-action">
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="email">Send Email Summary</SelectItem>
              <SelectItem value="sms">Send SMS</SelectItem>
              <SelectItem value="webhook">Trigger Webhook</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-survey">Post-Call Survey</Label>
          <Select>
            <SelectTrigger id="end-survey">
              <SelectValue placeholder="Select survey" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Survey</SelectItem>
              <SelectItem value="satisfaction">Satisfaction Survey</SelectItem>
              <SelectItem value="nps">NPS Survey</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Configuration</Button>
        </div>
      </div>
    );
  }

  if (type === "apiRequest") {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="api-url">API Endpoint URL</Label>
          <Input id="api-url" placeholder="https://api.example.com/endpoint" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-method">HTTP Method</Label>
          <Select>
            <SelectTrigger id="api-method">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-headers">Headers (JSON)</Label>
          <Textarea
            id="api-headers"
            placeholder='{"Authorization": "Bearer token"}'
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-body">Request Body (JSON)</Label>
          <Textarea id="api-body" placeholder='{"key": "value"}' rows={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-timeout">Timeout (seconds)</Label>
          <Input id="api-timeout" type="number" defaultValue="10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="api-retry">Retry on Failure</Label>
          <Select>
            <SelectTrigger id="api-retry">
              <SelectValue placeholder="Select retry policy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Retry</SelectItem>
              <SelectItem value="once">Retry Once</SelectItem>
              <SelectItem value="twice">Retry Twice</SelectItem>
              <SelectItem value="three">Retry 3 Times</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Configuration</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>No configuration available for this node type.</p>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
