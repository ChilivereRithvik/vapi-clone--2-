import { Phone } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { z } from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */
("use client");

import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

import { Form } from "@/components/ui/form";
import { DestinationSection, MessageSection } from "./destinationForm";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

type FormValues = z.infer<typeof callTransferNodeSchema>;

export const conditionSchema = z.object({
  parameter: z.string().min(1, "Parameter is required"),
  operator: z.enum([
    "equals",
    "not_equals",
    "greater_than",
    "less_than",
    "includes",
    "starts_with",
    "ends_with",
  ]),
  value: z.string().min(1, "Value is required"),
});

export const baseMessageSchema = z.object({
  content: z.string().optional(),
  endCallAfterMessage: z.boolean().optional(),
  conditions: z.array(conditionSchema).optional(),
});

export const requestStartSchema = z.object({
  type: z.enum(["default", "none", "custom"]),
  message: z.string().optional(),
  waitForMessageBeforeToolCall: z.boolean().optional(),
  conditions: z.array(conditionSchema).optional(),
});

export const messageTypeSchema = z.object({
  requestStart: requestStartSchema,
  requestComplete: baseMessageSchema,
  requestFailed: baseMessageSchema,
  requestResponseDelayed: baseMessageSchema.extend({
    timingMs: z.number().optional(),
  }),
});

export const transferPlanSchema = z.object({
  transferMode: z.enum(["Blind Transfer", "SIP"]),
  sipUri: z
    .string()
    .url("Must be a valid SIP URI (e.g. sip:user@example.com)")
    .optional(),
  messageToCustomer: z.string().optional(),
  description: z.string().optional(),
});

export const destinationSchema = z.object({
  type: z.enum(["PhoneNumber", "SIP"]),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid E.164 phone number")
    .optional(),
  enforceE164: z.boolean().optional(),
  extension: z.string().optional(),
  callerId: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid Caller ID")
    .optional(),
  messageToCustomer: z.string().optional(),
  description: z.string().optional(),
  transferPlan: transferPlanSchema,
});

export const callTransferNodeSchema = z.object({
  nodeType: z.literal("TransferCall"),
  destination: destinationSchema,
  messages: messageTypeSchema,
});

export type CallTransferNodeType = z.infer<typeof callTransferNodeSchema>;

interface CallTransferNodeData {
  label?: string;
  isActive?: boolean;
  onAddNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
}

export function CallTransferNode({ data }: { data: CallTransferNodeData }) {
  return (
    <NodeWithActions data={data} type="callTransfer">
      <Card className="min-w-[200px] border-2 border-blue-500 bg-card p-4">
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-blue-500" />
          <div>
            <div className="font-semibold">Call Transfer</div>
            <div className="text-xs text-muted-foreground">
              {data.label || "Transfer call"}
            </div>
          </div>
        </div>
      </Card>
    </NodeWithActions>
  );
}

//here we are diving the form in two two sections a destination form and a message form and adding the both the form component in to one from for call transfer node form

interface CallTransferNodeFormProps {
  onSubmit?: (values: FormValues) => void;
  defaultValues?: Partial<CallTransferNodeType>;
}

export default function CallTransferNodeForm({
  onSubmit,
  defaultValues,
}: CallTransferNodeFormProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(callTransferNodeSchema),
    defaultValues: {
      nodeType: "TransferCall",
      destination: {
        type: "PhoneNumber",
        transferPlan: { transferMode: "Blind Transfer" },
        ...defaultValues?.destination,
      },
      messages: {
        requestStart: { type: "default" },
        requestComplete: {},
        requestFailed: {},
        requestResponseDelayed: {},
        ...defaultValues?.messages,
      },
    },
  });

  const handleSubmit = (values: FormValues) => {
    console.log("✅ Valid Call Transfer Form Data:", values);
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <ScrollArea className="h-[500px] w-full">
            {/* <div className="space-y-4"> */}
            <div className="space-y-6">
              <DestinationSection />
              <MessageSection />
            </div>
            {/* </div> */}
          </ScrollArea>
          <Button type="submit" className="mt-4 w-full">
            Save Node
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
