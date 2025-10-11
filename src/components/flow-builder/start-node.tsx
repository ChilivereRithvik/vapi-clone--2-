"use client";

import { Play } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const formSchema = z.object({
  // type: z.string().min(1),
  firstMessage: z.string().min(1),
  prompt: z.string().optional(),
});

export type startNodeFormType = z.infer<typeof formSchema>;

interface StartNodeData {
  label?: string;
  isActive?: boolean;
  onAddNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
}

export function StartNode({ data }: { data: StartNodeData }) {
  const isActive = data?.isActive; // optional flag for active state

  return (
    <NodeWithActions data={data} type="source">
      <Card
        className={cn(
          "min-w-fit border-2 bg-card p-4 transition-all duration-300 ease-in-out",
          "hover:shadow-md hover:scale-[1.02]",
          "flex flex-col rounded-xl",
          isActive
            ? "border-green-500 ring-2 ring-green-300"
            : "border-red-500 hover:border-red-400"
        )}
      >
        {/* Header row with Play icon beside the title */}
        <div className="flex items-center justify-center ">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-1">
            <Play
              className={cn(
                "h-4 w-4",
                isActive ? "text-green-500" : "text-red-500"
              )}
            />
            Start Call
          </h3>
        </div>

        {/* Subtext */}
        {/* <p className="text-xs text-muted-foreground mt-1">
          {data.label || "Trigger when the call starts"}
        </p> */}
      </Card>
    </NodeWithActions>
  );
}

interface StartNodeFormProps {
  onSubmit?: (values: startNodeFormType) => void;
  defaultValues?: Partial<startNodeFormType>;
}

export default function StartNodeForm({
  onSubmit,
  defaultValues,
}: StartNodeFormProps) {
  const form = useForm<startNodeFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // type: defaultValues?.type || "",
      firstMessage: defaultValues?.firstMessage || "",
      prompt: defaultValues?.prompt || "",
    },
  });

  function handleSubmit(values: startNodeFormType) {
    try {
      console.log("StartNode form values:", values);
      if (onSubmit) {
        onSubmit(values);
      } else {
        toast(
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        );
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 max-w-3xl mx-auto "
      >
        {/* <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Node Type</FormLabel>
              <FormControl>
                <Input placeholder="Start Node" type="text" {...field} />
              </FormControl>
              <FormDescription>
                Type of the node ex: Start Node ...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/*  */}
        <FormField
          control={form.control}
          name="firstMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Message</FormLabel>
              <FormControl>
                <Input placeholder="hellow there ..." type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="You are a Help Full Assistent"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the prompt for this conversation node
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
