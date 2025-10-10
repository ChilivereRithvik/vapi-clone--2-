import { Plus, Webhook, X } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
// interface JSONObject {
//   [key: string]: JSONValue;
// }
// interface JSONArray extends Array<JSONValue> {}

// interface ApinodeFormType {
//   type: string;
//   url: string;
//   method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
//   queryParams: Record<string, string>;
//   headers: Record<string, string>;
//   body: JSONValue;
// }

const keyValueSchema = z.object({
  key: z.string().nonempty("Key is required"),
  value: z.string(),
});

const ApinodeFormSchema = z.object({
  type: z.string().nonempty("Type is required"),
  url: z.string().url("Invalid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
  queryParams: z.array(keyValueSchema),
  headers: z.array(keyValueSchema),
  body: z.string().optional(), // JSON string
});

type ApinodeFormType = z.infer<typeof ApinodeFormSchema>;

export function ApiRequestNode({ data }: { data: any }) {
  return (
    <NodeWithActions data={data} type="apiRequest">
      <Card className="min-w-[200px] border-2 border-green-500 bg-card p-4">
        <div className="flex items-center gap-2">
          <Webhook className="h-5 w-5 text-green-500" />
          <div>
            <div className="font-semibold">API Request</div>
            <div className="text-xs text-muted-foreground">
              {data.label || "Make API call"}
            </div>
          </div>
        </div>
      </Card>
    </NodeWithActions>
  );
}

export function ApinodeForm() {
  const form = useForm<ApinodeFormType>({
    resolver: zodResolver(ApinodeFormSchema),
    defaultValues: {
      type: "",
      url: "",
      method: "GET",
      queryParams: [{ key: "", value: "" }],
      headers: [{ key: "", value: "" }],
      body: "",
    },
  });

  const queryArray = useFieldArray({
    control: form.control,
    name: "queryParams",
  });
  const headerArray = useFieldArray({ control: form.control, name: "headers" });

  const onSubmit = (data: ApinodeFormType) => {
    try {
      const parsedBody = data.body ? JSON.parse(data.body) : {};
      console.log({ ...data, body: parsedBody });
    } catch {
      console.error("Invalid JSON body");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Node type" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URL */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://api.example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Method */}
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Method</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Query Params */}
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold mb-2">Query Params</h4>

            <Button
              onClick={() => queryArray.append({ key: "", value: "" })}
              variant={"outline"}
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {queryArray.fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <FormControl>
                <Input
                  placeholder="Key"
                  {...form.register(`queryParams.${index}.key` as const)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Value"
                  {...form.register(`queryParams.${index}.value` as const)}
                />
              </FormControl>
              <Button
                type="button"
                variant="destructive"
                onClick={() => queryArray.remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Headers */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold mb-2">Headers</h4>

            <Button
              variant={"outline"}
              onClick={() => headerArray.append({ key: "", value: "" })}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {headerArray.fields.map((item, index) => (
            <div key={item.id} className="flex gap-2 mb-2">
              <FormControl>
                <Input
                  placeholder="Key"
                  {...form.register(`headers.${index}.key` as const)}
                />
              </FormControl>
              <FormControl>
                <Input
                  placeholder="Value"
                  {...form.register(`headers.${index}.value` as const)}
                />
              </FormControl>
              <Button
                type="button"
                variant="destructive"
                onClick={() => headerArray.remove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Body */}
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body (JSON)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder='{"key":"value"}' rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
