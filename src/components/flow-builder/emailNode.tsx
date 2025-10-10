"use client";

import { useState } from "react";
import { Mail, Plus, X } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";

// --- Zod Schema ---
const emailFormSchema = z.object({
  to: z.string().email({ message: "Invalid email address" }),
  cc: z.string().optional(),
  bcc: z.string().optional(),
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z.string().min(1, { message: "Body is required" }),
  bodyType: z.enum(["text", "html", "text"]),
  attachments: z
    .array(
      z.object({
        filename: z.string(),
        url: z.string().url(),
      })
    )
    .optional(),
});

export type EmailFormDataType = z.infer<typeof emailFormSchema>;

interface EmailFormProps {
  onSend: (data: EmailFormDataType) => void;
  defaultValues?: Partial<EmailFormDataType>;
}

interface EmailNodeData {
  label?: string;
  isActive?: boolean;
  onAddNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
}

export function EmailNode({ data }: { data: EmailNodeData }) {
  const isActive = data?.isActive;

  const [isConnected, setIsConnected] = useState(false);

  const handleConnectGmail = () => {
    // OAuth flow here
    setIsConnected(true);
  };

  const handleSendEmail = (formData: EmailFormDataType) => {
    console.log("Sending email via Gmail API...", formData);
    alert("Sample email sent!");
  };

  return (
    <NodeWithActions data={data} type="default">
      <Card
        className={cn(
          "min-w-fit border-2 bg-card p-4 transition-all duration-300 ease-in-out",
          "hover:shadow-md hover:scale-[1.02]",
          "flex flex-col rounded-xl",
          isActive
            ? "border-blue-500 ring-2 ring-blue-300"
            : "border-gray-300 hover:border-blue-400"
        )}
      >
        <div className="flex items-center justify-center mb-2">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-1">
            <Mail
              className={cn(
                "h-4 w-4",
                isActive ? "text-blue-500" : "text-gray-500"
              )}
            />
            Email Node
          </h3>
        </div>
      </Card>
    </NodeWithActions>
  );
}

export function EmailForm({ onSend, defaultValues }: EmailFormProps) {
  const form = useForm<EmailFormDataType>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      to: defaultValues?.to || "",
      cc: defaultValues?.cc || "",
      bcc: defaultValues?.bcc || "",
      subject: defaultValues?.subject || "",
      body: defaultValues?.body || "",
      bodyType: defaultValues?.bodyType || "text",
      attachments: defaultValues?.attachments || [],
    },
  });

  // UseFieldArray for dynamic attachments
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attachments",
  });

  const onSubmit = (data: EmailFormDataType) => {
    onSend(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        {/* To, CC, BCC, Subject, Body fields */}
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To *</FormLabel>
              <FormControl>
                <Input placeholder="Receiver email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CC</FormLabel>
              <FormControl>
                <Input placeholder="CC email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bcc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BCC</FormLabel>
              <FormControl>
                <Input placeholder="BCC email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject *</FormLabel>
              <FormControl>
                <Input placeholder="Email subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body *</FormLabel>
              <FormControl>
                <Textarea placeholder="Email body" rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Attachments Section */}
        <div>
          <span className="font-medium">Attachments</span>
          {/* <p className="text-xs text-muted-foreground">
            Add filename and URL for each attachment.
          </p> */}

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-end mt-2">
              <FormField
                control={form.control}
                name={`attachments.${index}.filename`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Filename</FormLabel>
                    <FormControl>
                      <Input placeholder="Filename" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`attachments.${index}.url`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/file"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="ghost"
            onClick={() => append({ filename: "", url: "" })}
            className="mt-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Attachment
          </Button>
        </div>

        <div className="flex justify-end mt-2">
          <Button type="submit">Send Email</Button>
        </div>
      </form>
    </Form>
  );
}
