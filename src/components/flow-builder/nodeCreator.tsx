import React from "react";

type NodeCreatorProps = {
  onCreateNode: (type: string, position?: { x: number; y: number }) => void;
  nodeTypes: {
    id: string;
    label: string;
    icon: React.ElementType;
    color: string;
  }[];
};

export function NodeCreator({ onCreateNode, nodeTypes }: NodeCreatorProps) {
  return (
    <div>
      {nodeTypes.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            className="flex items-center gap-2 p-2 rounded-md bg-background border hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all"
            draggable
            onDragStart={(e) =>
              e.dataTransfer.setData("application/reactflow", node.id)
            }
            onClick={() => onCreateNode(node.id)}
          >
            <Icon className={`h-4 w-4 ${node.color}`} />
            <span className="font-medium">{node.label}</span>
          </div>
        );
      })}
    </div>
  );
}
