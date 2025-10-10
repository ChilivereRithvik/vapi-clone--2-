import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

export function NodeWithActions({
  data,
  type,
  children,
}: {
  data: any;
  type: string;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-2"
    >
      {/* Node container */}
      <div className="relative">
        <Handle type="target" position={Position.Top} className="w-3 h-3" />
        {children}
        <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      </div>

      {/* Node Actions - placed beside the node */}
      {/* {isHovered && ( */}
      <div className="flex flex-col gap-1 bg-background border rounded-md ">
        {/* Uncomment if you want Add button */}
        {/* <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              data.onAddNode?.(data.id);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button> */}

        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6  text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            data.onDeleteNode?.(data.id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {/* )} */}
    </div>
  );
}
