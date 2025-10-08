import { Play } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { cn } from "@/lib/utils";

export function StartNode({ data }: { data: any }) {
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
