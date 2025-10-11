import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import FeaturesPage from "./pages/features";
import PricingPage from "./pages/pricing";
import ContactPage from "./pages/contact";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import ProjectsPage from "./pages/projects";
import KnowledgeBasePage from "./pages/Ai-Agents/knowledge-base";
import OverviewPage from "./pages/overview";
// import CallsPage from "./pages/calls/calls";
// import CallAnalyticsPage from "./pages/call/analytics";
import CallOutboundCampaignsPage from "./pages/calls/call-outbound-campaigns";
import CallAuditLogsPage from "./pages/calls/call-audit-logs";
import CallSettingsPage from "./pages/settings";
// import EmailPage from "./pages/email";
// import EmailAnalyticsPage from "./pages/email/analytics";
import EmailOutboundCampaignsPage from "./pages/email/email-outbound-campaigns";
import EmailAuditLogsPage from "./pages/email/email-audit-logs";
import EmailSettingsPage from "./pages/email/email-settings";
import WidgetsPage from "./pages/widgets";
import WidgetCreatePage from "./pages/widgets/create";
import WidgetFlowsPage from "./pages/widgets/flows";
import WidgetAuditLogsPage from "./pages/widgets/audit-logs";
import WidgetSettingsPage from "./pages/widgets/settings";
// import FlowsPage from "./pages/flows";
// import AuditLogsPage from "./pages/audit-logs";
import SettingsPage from "./pages/settings";

import AIAgentPage from "./pages/Ai-Agents/ai-agents";
import FlowsPage from "./pages/calls/call-flows";
import CallLogsPage from "./pages/calls/call-logs";
import EmailFlowsPage from "./pages/email/flows";
import FlowBuilderPage from "./pages/flows";
import AnalyticsPage from "./pages/citizen-service/analytics";
import EligibilityPage from "./pages/citizen-service/eligibility";
import FollowUpsPage from "./pages/citizen-service/follow-ups";
import SchemesPage from "./pages/citizen-service/schems";
import AdminPage from "./pages/citizen-service/admin";
import CitizenServiceCallLogsPage from "./pages/citizen-service/call-logs";
// import FlowBuilderPage from "./pages/calls/[id]";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/ai-agent" element={<AIAgentPage />} />
        <Route path="/flows" element={<FlowsPage />} />
        <Route path="/calls/new" element={<FlowBuilderPage />} />
        <Route path="/call-logs" element={<CallLogsPage />} />
        <Route
          path="/call/outbound-campaigns"
          element={<CallOutboundCampaignsPage />}
        />
        <Route path="/call/audit-logs" element={<CallAuditLogsPage />} />
        <Route path="/call/settings" element={<CallSettingsPage />} />
        <Route
          path="/email/outbound-campaigns"
          element={<EmailOutboundCampaignsPage />}
        />
        <Route path="/email/audit-logs" element={<EmailAuditLogsPage />} />
        <Route path="/email/settings" element={<EmailSettingsPage />} />
        <Route path="/email/flows" element={<EmailFlowsPage />} />
        <Route path="/widgets" element={<WidgetsPage />} />
        <Route path="/widgets/create" element={<WidgetCreatePage />} />
        <Route path="/widgets/flows" element={<WidgetFlowsPage />} />
        <Route path="/widgets/audit-logs" element={<WidgetAuditLogsPage />} />
        <Route path="/widgets/settings" element={<WidgetSettingsPage />} />
        <Route path="/audit-logs" element={<CallAuditLogsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* citizen service routes */}
        <Route path="/citizenservice/dashboard" element={<HomePage />} />
        <Route
          path="/citizenservice/call-logs"
          element={<CitizenServiceCallLogsPage />}
        />
        <Route path="/citizenservice/analytics" element={<AnalyticsPage />} />
        <Route path="/citizenservice/follow-ups" element={<FollowUpsPage />} />
        <Route path="/citizenservice/admin" element={<AdminPage />} />
        <Route
          path="/citizenservice/eligibility"
          element={<EligibilityPage />}
        />
        <Route path="/citizenservice/schemes" element={<SchemesPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
