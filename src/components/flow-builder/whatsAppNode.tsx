import { MessageSquare } from "lucide-react"; // Using MessageSquare as WhatsApp icon
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";
import { cn } from "@/lib/utils";

interface WhatsAppNodeData {
  label?: string;
  isActive?: boolean;
  onAddNode?: (nodeId: string) => void;
  onDeleteNode?: (nodeId: string) => void;
}

export function WhatsAppNode({ data }: { data: WhatsAppNodeData }) {
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
            <MessageSquare
              className={cn(
                "h-4 w-4",
                isActive ? "etext-green-500" : "text-gray-500"
              )}
            />
            WhatsApp
          </h3>
        </div>
        {/* Optional description */}
        {/* <p className="text-xs text-muted-foreground mt-1">
          {data.label || "Send a WhatsApp message in the flow"}
        </p> */}
      </Card>
    </NodeWithActions>
  );
}
