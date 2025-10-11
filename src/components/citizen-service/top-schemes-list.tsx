import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockSchemes } from "./eligibility-results";

export function TopSchemesList() {
  const topSchemes = mockSchemes.slice(0, 5);

  return (
    <Card className="rounded-2xl border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold font-mono text-card-foreground">
          Top 5 Schemes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
            >
              <div className="flex-1">
                <p className="font-medium text-card-foreground text-sm">
                  {scheme.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {scheme.department}
                </p>
              </div>
              <Badge
                variant={scheme.level === "Central" ? "default" : "secondary"}
                className="text-xs"
              >
                {scheme.level}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
