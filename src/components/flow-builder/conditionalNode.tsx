import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Equal,
  GitBranch,
  Plus,
  X,
} from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Handle, Position } from "reactflow";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function ConditionalNode({ data }: { data: any }) {
  const isActive = data?.isActive;

  return (
    <Card
      className={cn(
        "relative min-w-[220px] border-2 bg-card px-4 py-4 transition-all duration-300 ease-in-out",
        "hover:shadow-lg hover:scale-[1.02]",
        "flex flex-col items-center justify-between rounded-2xl text-center",
        isActive
          ? "border-green-500 ring-2 ring-green-300"
          : "border-border hover:border-green-400"
      )}
    >
      {/* Input handle (Trigger) */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 w-3 h-3"
        style={{ top: -6, height: 12, width: 12, borderRadius: 6 }}
      />

      {/* Header */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-1">
          <GitBranch
            className={cn(
              "h-4 w-4",
              isActive ? "text-green-500" : "text-muted-foreground"
            )}
          />
          <h3 className="font-semibold text-sm text-foreground">
            Conditional Node
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Branch based on condition
        </p>
      </div>

      {/* Condition preview */}
      {data?.condition && (
        <div className="mt-2 w-full rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs text-muted-foreground">
          {data.condition}
        </div>
      )}

      {/* Output handles placed along bottom border */}
      <div className="absolute bottom-0 left-0 w-full flex justify-between px-6 pb-[2px]">
        {/* True handle */}
        <div className="flex flex-col ">
          {/* <span className="text-[10px] text-muted-foreground mb-1.5">True</span> */}
          <Handle
            type="source"
            position={Position.Bottom}
            id="true"
            className="!bg-green-500 w-4 h-4 rounded-full border-2 border-white cursor-pointer"
            style={{ height: 12, width: 12, borderRadius: 6 }}
          />
        </div>

        {/* False handle */}
        <div className="flex flex-col items-center translate-y-[50%] ">
          {/* <span className="text-[10px] text-muted-foreground mb-1.5">
            False
          </span> */}
          <Handle
            type="source"
            position={Position.Bottom}
            id="false"
            className="!bg-red-500 w-4 h-4 rounded-full border-2 border-white cursor-pointer"
            style={{ height: 12, width: 12, borderRadius: 6 }}
          />
        </div>
      </div>
    </Card>
  );
}

// ✅ Zod schema for validation
const conditionSchema = z.object({
  field: z.string().min(1, "Field is required"),
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
  type: z.enum(["string", "number", "boolean"]), // required field
});

export type ConditionFormType = z.infer<typeof conditionSchema>;

export function ConditionalNodeForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: SubmitHandler<ConditionFormType>;
  defaultValues?: Partial<ConditionFormType>;
}) {
  const form = useForm<ConditionFormType>({
    resolver: zodResolver(conditionSchema),
    defaultValues: {
      field: "",
      operator: "equals",
      value: "",
      type: "string",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-3 rounded-lg border bg-background"
      >
        {/* Field */}
        <FormField
          control={form.control}
          name="field"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Field</FormLabel>
              <FormControl>
                <Input placeholder="e.g. user.age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Operator */}
        <FormField
          control={form.control}
          name="operator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operator</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select operator" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem
                    value="equals"
                    className="flex items-center gap-2"
                  >
                    <Equal className="w-4 h-4" />
                    Equals
                  </SelectItem>
                  <SelectItem
                    value="not_equals"
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Not Equals
                  </SelectItem>
                  <SelectItem
                    value="greater_than"
                    className="flex items-center gap-2"
                  >
                    <ArrowUp className="w-4 h-4" />
                    Greater Than
                  </SelectItem>
                  <SelectItem
                    value="less_than"
                    className="flex items-center gap-2"
                  >
                    <ArrowDown className="w-4 h-4" />
                    Less Than
                  </SelectItem>
                  <SelectItem
                    value="includes"
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Includes
                  </SelectItem>
                  <SelectItem
                    value="starts_with"
                    className="flex items-center gap-2"
                  >
                    <ChevronUp className="w-4 h-4" />
                    Starts With
                  </SelectItem>
                  <SelectItem
                    value="ends_with"
                    className="flex items-center gap-2"
                  >
                    <ChevronDown className="w-4 h-4" />
                    Ends With
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Value */}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 18 or 'Admin'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save Condition
        </Button>
      </form>
    </Form>
  );
}
