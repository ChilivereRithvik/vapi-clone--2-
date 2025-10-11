"use client";

import React from "react";
import type { Node } from "reactflow";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useFlowContext,
  type NodeFormData,
  type ApinodeFormType,
} from "@/contexts/FlowContext";
import StartNodeForm, { startNodeFormType } from "./start-node";
import { ApinodeForm } from "./api-request-node";
import CallTransferNodeForm, {
  CallTransferNodeType,
} from "./call-transfer-node";
import { EmailForm, EmailFormDataType } from "./emailNode";
import { ConditionalNodeForm, ConditionFormType } from "./conditionalNode";
import { ModelFormValuesType, ModelNodeForm } from "./modelNode";
import WebhookNodeForm, { WebhookFormValuesType } from "./webHookNode";
import { ScrollArea } from "../ui/scroll-area";

interface NodeFormProps {
  node: Node;
  type?: string;
  onCancel: () => void;
  onSave: () => void;
}

export function NodeForm({ node, type, onCancel, onSave }: NodeFormProps) {
  const { updateNodeFormData, getNodeFormData } = useFlowContext();

  const handleFormSave = (formData: NodeFormData) => {
    console.log("Saving form data for node:", node.id, formData);
    updateNodeFormData(node.id, formData);
    onSave();
  };

  const existingData = getNodeFormData(node.id);

  const renderForm = () => {
    switch (type) {
      case "startNode":
        return (
          <StartNodeForm
            onSubmit={handleFormSave}
            defaultValues={existingData as startNodeFormType}
          />
        );
      case "apiRequest":
        return (
          <ApinodeForm
            onSubmit={handleFormSave}
            defaultValues={existingData as ApinodeFormType}
          />
        );
      case "callTransfer":
        return (
          <CallTransferNodeForm
            onSubmit={handleFormSave}
            defaultValues={existingData as CallTransferNodeType}
          />
        );
      case "email":
        return (
          <EmailForm
            onSend={handleFormSave}
            defaultValues={existingData as EmailFormDataType}
          />
        );
      case "condition":
        return (
          <ConditionalNodeForm
            onSubmit={handleFormSave}
            defaultValues={existingData as ConditionFormType}
          />
        );
      case "model":
        return (
          <ModelNodeForm
            onSubmit={handleFormSave}
            defaultValues={existingData as ModelFormValuesType}
          />
        );
      case "webhook":
        return (
          <WebhookNodeForm
            onSubmit={handleFormSave}
            defaultValues={existingData as WebhookFormValuesType}
          />
        );
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            <p>No form available for this node type: {type}</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center justify-between p-1 border-b">
        <h3 className="text-lg font-semibold">
          {type
            ? `${type.charAt(0).toUpperCase() + type.slice(1)} Node`
            : "Node Configuration"}
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="min-h-[600px] rounded-md">
        <div className="p-2 ">{renderForm()}</div>
      </ScrollArea>
    </div>
  );
}
