import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardPage from "./pages/DashboardPage";
import CasesPage from "./pages/CasesPage";
import CaseDetailPage from "./pages/CaseDetailPage";
import NewCasePage from "./pages/NewCasePage";
import ClientsPage from "./pages/ClientsPage";
import ClientDetailPage from "./pages/ClientDetailPage";
import NewClientPage from "./pages/NewClientPage";
import MovementsPage from "./pages/MovementsPage";
import IntimationsPage from "./pages/IntimationsPage";
import DeadlinesPage from "./pages/DeadlinesPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import DocumentsPage from "./pages/DocumentsPage";
import DocGeneratorPage from "./pages/DocGeneratorPage";
import FinancialPage from "./pages/FinancialPage";
import WorkspacePage from "./pages/WorkspacePage";
import WorkspaceCasePage from "./pages/WorkspaceCasePage";
import ActusZapPage from "./pages/ActusZapPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/new" element={<NewCasePage />} />
          <Route path="/cases/:id" element={<CaseDetailPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/new" element={<NewClientPage />} />
          <Route path="/clients/:id" element={<ClientDetailPage />} />
          <Route path="/movements" element={<MovementsPage />} />
          <Route path="/intimations" element={<IntimationsPage />} />
          <Route path="/deadlines" element={<DeadlinesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/doc-generator" element={<DocGeneratorPage />} />
          <Route path="/financial" element={<FinancialPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/workspace/:id" element={<WorkspaceCasePage />} />
          <Route path="/actus-zap" element={<ActusZapPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
