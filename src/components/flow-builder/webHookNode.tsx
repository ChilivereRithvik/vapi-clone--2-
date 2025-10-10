import { Network } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "../ui/scroll-area";

export function WebhookNode({ data }: { data: any }) {
  const isActive = data?.isActive;

  return (
    <NodeWithActions data={data} type="default">
      <Card
        className={cn(
          "min-w-fit border-2 bg-card p-4 transition-all duration-300 ease-in-out",
          "hover:shadow-md hover:scale-[1.02]",
          "flex flex-col rounded-xl",
          isActive
            ? "border-green-500 ring-2 ring-green-300"
            : "border-gray-300 hover:border-green-400"
        )}
      >
        <div className="flex items-center justify-center">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-1">
            <Network
              className={cn(
                "h-4 w-4",
                isActive ? "text-green-500" : "text-gray-500"
              )}
            />
            Webhook Node
          </h3>
        </div>

        {/* Optional description */}
        {/* <p className="text-xs text-muted-foreground mt-1">
          {data.label || "Trigger an external webhook"}
        </p> */}
      </Card>
    </NodeWithActions>
  );
}

const formSchema = z.object({
  url: z.string().min(1),
  isAuthonticationRequired: z.boolean().optional(),
  authonticationToken: z.string().min(1),
  header: z.string().min(1).optional(),
});

export default function WebhookNodeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="relative rounded-lg">
      <ScrollArea className="h-[600px] w-full rounded-lg">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 text-xs"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Web Hook Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://webhook.site/#!/view/4e522f22-057a"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Receive HTTP requests and trigger flows using unique URLs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAuthonticationRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Require Authontication</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      //   disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authonticationToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authentication Token</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: kudgsiudhfgsdifh234kjhbksudfh"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Token is required for authontication
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="header"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secret Header Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="text" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </ScrollArea>
    </div>
  );
}
