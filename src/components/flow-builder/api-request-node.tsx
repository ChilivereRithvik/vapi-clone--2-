import { Webhook } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";

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
