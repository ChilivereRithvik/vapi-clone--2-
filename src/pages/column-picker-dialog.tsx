"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export type ColumnConfig = {
  key: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
};

type ColumnPickerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnConfig[];
  onColumnsChange: (columns: ColumnConfig[]) => void;
};

export function ColumnPickerDialog({
  open,
  onOpenChange,
  columns,
  onColumnsChange,
}: ColumnPickerDialogProps) {
  const toggleColumn = (key: string) => {
    const newColumns = columns.map((col) =>
      col.key === key ? { ...col, visible: !col.visible } : col
    );
    onColumnsChange(newColumns);
  };

  const resetToDefault = () => {
    const defaultVisible = [
      "name",
      "email",
      "phone",
      "city",
      "country",
      "language",
      "timezone",
      "age",
      "tags",
      "optIns",
      "lastContact",
      "status",
      "created",
      "owner",
      "actions",
    ];
    const newColumns = columns.map((col) => ({
      ...col,
      visible: defaultVisible.includes(col.key),
    }));
    onColumnsChange(newColumns);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customize Columns</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4 max-h-96 overflow-y-auto">
          {columns.map((col) => (
            <div key={col.key} className="flex items-center space-x-2">
              <Checkbox
                id={col.key}
                checked={col.visible}
                onCheckedChange={() => toggleColumn(col.key)}
              />
              <Label
                htmlFor={col.key}
                className="flex-1 cursor-pointer font-normal"
              >
                {col.label}
              </Label>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={resetToDefault}>
            Reset to Default
          </Button>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
