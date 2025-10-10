import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Button } from "../ui/button";
import { Plus, Trash2, Repeat } from "lucide-react"; // Added Repeat icon for toggle

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
  const [isVertical, setIsVertical] = useState(true); // ✅ Track orientation

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center gap-2"
    >
      {/* Node container */}
      <div className="relative">
        {/* ✅ Handles change position based on isVertical */}
        {isVertical ? (
          <>
            <Handle type="target" position={Position.Top} className="w-5 h-5" />
            {children}
            <Handle
              type="source"
              position={Position.Bottom}
              className="w-5 h-5"
            />
          </>
        ) : (
          <>
            <Handle
              type="target"
              position={Position.Left}
              className="w-5 h-5"
            />
            {children}
            <Handle
              type="source"
              position={Position.Right}
              className="w-5 h-5"
            />
          </>
        )}
      </div>

      {/* Node Actions */}
      <div className="flex flex-col gap-1 bg-background border rounded-md p-1">
        {/* Delete Node */}
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 text-destructive hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            data.onDeleteNode?.(data.id);
          }}
          title="Delete Node"
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        {/* ✅ Toggle Handle Orientation */}
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 text-blue-500 hover:text-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            setIsVertical((prev) => !prev);
          }}
          title="Toggle Port Orientation"
        >
          <Repeat className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
