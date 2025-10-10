import { Mail, Route } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { cn } from "@/lib/utils";

export function RouterNode({ data }: { data: any }) {
  const isActive = data?.isActive;

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
        <div className="flex items-center justify-center">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-1">
            <Route
              className={cn(
                "h-4 w-4",
                isActive ? "text-blue-500" : "text-gray-500"
              )}
            />
            Router Node
          </h3>
        </div>
        {/* <p className="text-xs text-muted-foreground mt-1">
          {data.label || "Send an email in the flow"}
        </p> */}
      </Card>
    </NodeWithActions>
  );
}
