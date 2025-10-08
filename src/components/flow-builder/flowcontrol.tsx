"use client";

import { Button } from "@/components/ui/button";
import { useReactFlow } from "reactflow";
import {
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Lock,
  Unlock,
  Maximize2,
} from "lucide-react";
import { useState } from "react";

export function FlowControls({
  onUndo,
  onRedo,
}: {
  onUndo: () => void;
  onRedo: () => void;
}) {
  const reactFlowInstance = useReactFlow();
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-row gap-2 bg-card border rounded-lg shadow-lg p-2">
      <Button
        variant="ghost"
        size="icon"
        title="Fit to View"
        onClick={() => reactFlowInstance.fitView()}
      >
        <Maximize2 className="h-5 w-5" />
      </Button>
      {/* <Button
        variant="ghost"
        size="icon"
        title={isLocked ? "Unlock" : "Lock"}
        onClick={() => setIsLocked(!isLocked)}
      >
        {isLocked ? (
          <Unlock className="h-5 w-5" />
        ) : (
          <Lock className="h-5 w-5" />
        )}
      </Button> */}
      <Button variant="ghost" size="icon" title="Undo" onClick={onUndo}>
        <RotateCcw className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" title="Redo" onClick={onRedo}>
        <RotateCw className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        title="Zoom In"
        onClick={() => reactFlowInstance.zoomIn()}
      >
        <ZoomIn className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        title="Zoom Out"
        onClick={() => reactFlowInstance.zoomOut()}
      >
        <ZoomOut className="h-5 w-5" />
      </Button>
    </div>
  );
}
