import { PhoneOff } from "lucide-react";
import { Card } from "../ui/card";
import { NodeWithActions } from "./node-with-actions";

export function EndCallNode({ data }: { data: any }) {
  return (
    <NodeWithActions data={data} type="endCall">
      <Card className="min-w-[200px] border-2 border-red-500 bg-card p-4">
        <div className="flex items-center gap-2">
          <PhoneOff className="h-5 w-5 text-red-500" />
          <div>
            <div className="font-semibold">End Call</div>
            <div className="text-xs text-muted-foreground">
              {data.label || "Terminate call"}
            </div>
          </div>
        </div>
      </Card>
    </NodeWithActions>
  );
}
