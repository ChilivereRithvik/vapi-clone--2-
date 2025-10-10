import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, X, Check, Edit2 } from "lucide-react";
import type { FlowData } from "@/contexts/FlowContext";

type ExportJsonModalProps = {
  open: boolean;
  onClose: () => void;
  flowData: FlowData;
  onApplyJson?: (newJson: FlowData) => void;
};

export default function ExportJsonModal({
  open,
  onClose,
  flowData,
  onApplyJson,
}: ExportJsonModalProps) {
  const [copied, setCopied] = useState(false);
  const [jsonString, setJsonString] = useState(
    JSON.stringify(flowData, null, 2)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setJsonString(JSON.stringify(flowData, null, 2));
    setIsEditing(false);
    setError(null);
  }, [flowData, open]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flow-data-with-forms.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonString);
      setError(null);
      setIsEditing(false);
      if (onApplyJson) onApplyJson(parsed);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  const renderJsonWithSyntaxHighlight = (json: string, editable: boolean) => {
    const lines = json.split("\n");
    return lines.map((line, index) => {
      const highlightedLine = line
        .replace(/"([^"]+)":/g, '<span class="text-blue-500">"$1"</span>:')
        .replace(
          /:\s*"([^"]*)"/g,
          ': <span class="text-green-600 dark:text-green-400">"$1"</span>'
        )
        .replace(
          /:\s*(-?\d+\.?\d*)/g,
          ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
        )
        .replace(
          /:\s*(true|false)/g,
          ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
        )
        .replace(
          /:\s*(null)/g,
          ': <span class="text-purple-600 dark:text-purple-400">$1</span>'
        );

      if (editable) {
        return (
          <div key={index} className="flex">
            <span className="inline-block w-10 select-none text-right pr-3 text-muted-foreground">
              {index + 1}
            </span>
            <input
              className="bg-gray-100 font-mono text-sm border-b border-gray-300 focus:border-blue-400 outline-none w-full"
              value={line}
              onChange={(e) => {
                const newLines = [...lines];
                newLines[index] = e.target.value;
                setJsonString(newLines.join("\n"));
                setError(null);
              }}
              spellCheck={false}
            />
          </div>
        );
      }

      return (
        <div key={index} className="flex">
          <span className="inline-block w-10 select-none text-right pr-3 text-muted-foreground">
            {index + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
        </div>
      );
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px] max-w-[90vw] max-h-[80vh] flex flex-col gap-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Flow JSON Data</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex gap-2 justify-start">
          <Button onClick={handleCopy} variant="outline" size="sm">
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button onClick={handleApply} variant="default" size="sm">
                Apply
              </Button>
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setJsonString(JSON.stringify(flowData, null, 2));
                  setError(null);
                }}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
            </>
          )}
        </div>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* JSON View / Edit Area */}
        <div className="bg-gray-100 rounded p-4 overflow-auto flex-1 min-h-0">
          <pre className="text-sm whitespace-pre-wrap break-all font-mono">
            {/* {renderJsonWithSyntaxHighlight(jsonString, isEditing)} */}

            {JSON.stringify(jsonString)}
          </pre>
        </div>
      </div>
    </div>
  );
}
