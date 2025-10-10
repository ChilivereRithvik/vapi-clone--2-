"use client";

import { Cpu } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

const modelFormSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  connection: z.string().optional(),
  model: z.string().min(1, "Select a model"),
  question: z.string().optional(),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(4096),
  topP: z.number().min(0).max(1),
  frequencyPenalty: z.number().min(-2).max(2),
  presencePenalty: z.number().min(-2).max(2),
  memoryKey: z.string().optional(),
  role: z.string().optional(),
});

export type ModelFormValuesType = z.infer<typeof modelFormSchema>;

interface ModelNodeData {
  label?: string;
  isActive?: boolean;
  onAddNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
}

export function ModelNode({ data }: { data: ModelNodeData }) {
  const isActive = data?.isActive;

  return (
    <NodeWithActions data={data} type="default">
      <Card
        className={cn(
          "min-w-fit border-2 bg-card p-4 transition-all duration-300 ease-in-out",
          "hover:shadow-md hover:scale-[1.02]",
          "flex flex-col gap-3 rounded-xl",
          isActive
            ? "border-blue-500 ring-2 ring-blue-300"
            : "border-gray-300 hover:border-blue-400"
        )}
      >
        <div className="flex items-center justify-center">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-1">
            <Cpu
              className={cn(
                "h-4 w-4",
                isActive ? "text-blue-500" : "text-gray-500"
              )}
            />
            Model Node
          </h3>
        </div>
      </Card>
    </NodeWithActions>
  );
}

interface ModelNodeFormProps {
  onSubmit?: (data: ModelFormValuesType) => void;
  defaultValues?: Partial<ModelFormValuesType>;
}

export function ModelNodeForm({ onSubmit, defaultValues }: ModelNodeFormProps) {
  const form = useForm<ModelFormValuesType>({
    resolver: zodResolver(modelFormSchema),
    defaultValues: {
      apiKey: defaultValues?.apiKey ?? "",
      connection: defaultValues?.connection ?? "",
      model: defaultValues?.model ?? "",
      question: defaultValues?.question ?? "",
      temperature: defaultValues?.temperature ?? 1,
      maxTokens: defaultValues?.maxTokens ?? 2048,
      topP: defaultValues?.topP ?? 1,
      frequencyPenalty: defaultValues?.frequencyPenalty ?? 0,
      presencePenalty: defaultValues?.presencePenalty ?? 0,
      memoryKey: defaultValues?.memoryKey ?? "",
      role: defaultValues?.role ?? "",
    },
  });

  const handleChange = (
    field: keyof ModelFormValuesType,
    value: string | number
  ) => {
    form.setValue(field, value);
    if (onSubmit) {
      const currentValues = form.getValues();
      onSubmit({ ...currentValues, [field]: value });
    }
  };

  const handleFormSubmit = () => {
    if (onSubmit) {
      onSubmit(form.getValues());
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg">
      <ScrollArea className="h-[600px] w-full rounded-lg">
        <Form {...form}>
          <form className="space-y-3 text-xs">
            {/* API Key */}
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter API key"
                      {...field}
                      onChange={(e) => handleChange("apiKey", e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Connection */}
            <FormField
              control={form.control}
              name="connection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a connection</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter connection name"
                      {...field}
                      onChange={(e) =>
                        handleChange("connection", e.target.value)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Model */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model *</FormLabel>
                  <FormDescription>
                    The model which will generate the completion.
                  </FormDescription>
                  <FormControl>
                    <Select
                      onValueChange={(v) => handleChange("model", v)}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue placeholder="Choose model..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">
                          GPT-3.5 Turbo
                        </SelectItem>
                        <SelectItem value="claude-3-sonnet">
                          Claude 3 Sonnet
                        </SelectItem>
                        <SelectItem value="gemini-1.5-pro">
                          Gemini 1.5 Pro
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Question */}
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your question or prompt"
                      rows={2}
                      {...field}
                      onChange={(e) => handleChange("question", e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Temperature */}
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Temperature</FormLabel>
                  <FormDescription>
                    Controls randomness: Lower means more deterministic results.
                  </FormDescription>
                  <FormControl>
                    <Slider
                      min={0}
                      max={2}
                      step={0.1}
                      value={[field.value]}
                      onValueChange={(v) => handleChange("temperature", v[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Maximum Tokens */}
            <FormField
              control={form.control}
              name="maxTokens"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Tokens *</FormLabel>
                  <FormDescription>
                    The maximum number of tokens to generate (e.g., 2048 or
                    4096).
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={4096}
                      {...field}
                      onChange={(e) =>
                        handleChange("maxTokens", Number(e.target.value))
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Top P */}
            <FormField
              control={form.control}
              name="topP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Top P</FormLabel>
                  <FormDescription>
                    Nucleus sampling threshold (0–1).
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.1}
                      min={0}
                      max={1}
                      {...field}
                      onChange={(e) =>
                        handleChange("topP", Number(e.target.value))
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Frequency Penalty */}
            <FormField
              control={form.control}
              name="frequencyPenalty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency Penalty</FormLabel>
                  <FormDescription>
                    Penalizes new tokens based on frequency (-2 to 2).
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.1}
                      min={-2}
                      max={2}
                      {...field}
                      onChange={(e) =>
                        handleChange("frequencyPenalty", Number(e.target.value))
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Presence Penalty */}
            <FormField
              control={form.control}
              name="presencePenalty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Presence Penalty</FormLabel>
                  <FormDescription>
                    Penalizes tokens that appear repeatedly (-2 to 2).
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.1}
                      min={-2}
                      max={2}
                      {...field}
                      onChange={(e) =>
                        handleChange("presencePenalty", Number(e.target.value))
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Memory Key */}
            <FormField
              control={form.control}
              name="memoryKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Memory Key</FormLabel>
                  <FormDescription>
                    Keeps chat history shared across runs and flows.
                  </FormDescription>
                  <FormControl>
                    <Input
                      placeholder="e.g., session_123"
                      {...field}
                      onChange={(e) =>
                        handleChange("memoryKey", e.target.value)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Roles */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., system, user, assistant"
                      {...field}
                      onChange={(e) => handleChange("role", e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="button"
                onClick={handleFormSubmit}
                className="w-full"
              >
                Save Model Configuration
              </Button>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
