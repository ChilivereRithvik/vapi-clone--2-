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
import { ApinodeForm } from "./api-request-node";
import { X } from "lucide-react";
import { ConditionalNodeForm } from "./conditionalNode";
import CallTransferNodeForm from "./call-transfer-node";
import StartNodeForm from "./start-node";
import { ModelNodeForm } from "./modelNode";
import WebhookNodeForm from "./webHookNode";

export function NodeForm({ type, node, onCancel, onSave }: any) {
  console.log("NodeForm props:", { type, node });
  console.log("NodeForm render");
  console.log("Node data:--------------->", node?.data);

  if (type === "callTransfer") {
    return (
      <div>
        <X
          className="absolute right-4 top-4 cursor-pointer"
          onClick={onCancel}
        />
        <CallTransferNodeForm />
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
      <div>
        <X
          className="absolute right-4 top-4 cursor-pointer"
          onClick={onCancel}
        />
        <ApinodeForm />
      </div>
    );
  }
  if (type === "condition") {
    return (
      <div>
        <X
          className="absolute right-4 top-4 cursor-pointer"
          onClick={onCancel}
        />
        <ConditionalNodeForm onSubmit={onSave} defaultValues={node?.data} />
      </div>
    );
  }

  if (type === "startNode") {
    return (
      <div className="relative gap-3">
        <X
          className="absolute right-4 top-[-4] cursor-pointer "
          onClick={onCancel}
          size={12}
        />
        <StartNodeForm />
      </div>
    );
  }

  if (type === "model") {
    return (
      <div className="relative gap-3">
        <X
          className="float-right top-[-4] cursor-pointer "
          onClick={onCancel}
          size={10}
        />
        <ModelNodeForm />
      </div>
    );
  }

  if (type === "webhook") {
    return (
      <div className="relative gap-3">
        <X
          className="float-right cursor-pointer "
          onClick={onCancel}
          size={10}
        />
        <WebhookNodeForm />
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
