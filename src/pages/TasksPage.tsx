import { AppLayout } from "@/components/AppLayout";
import { mockActusTasks } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { KpiCard } from "@/components/KpiCard";
import { Plus, Search, ListTodo, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [taskOpen, setTaskOpen] = useState(false);

  const filterTasks = (status: string) =>
    mockActusTasks.filter(t =>
      t.status === status &&
      (t.descricao.toLowerCase().includes(search.toLowerCase()) || t.responsavel.toLowerCase().includes(search.toLowerCase()))
    );

  const pendentes = filterTasks('Pendente').length;
  const emAndamento = filterTasks('Em andamento').length;
  const cumpridas = filterTasks('Cumprido').length;
  const urgentes = mockActusTasks.filter(t => t.prioridade === 'Alta' && t.status === 'Pendente').length;

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Tarefas</h1>
              <p className="text-sm text-muted-foreground">{mockActusTasks.length} tarefas cadastradas</p>
            </div>
            <div className="flex gap-2">
              <Link to="/calendar"><Button variant="outline" size="sm">Calendário</Button></Link>
              <Button variant="outline" size="sm" className="gap-2"><Download className="h-3.5 w-3.5" /> Exportar</Button>
              <Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Nova Tarefa</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            <KpiCard title="Total" value={mockActusTasks.length} icon={<ListTodo className="h-5 w-5" />} />
            <KpiCard title="Pendentes" value={pendentes} icon={<ListTodo className="h-5 w-5" />} />
            <KpiCard title="Em Andamento" value={emAndamento} icon={<ListTodo className="h-5 w-5" />} variant="ai" />
            <KpiCard title="Cumpridas" value={cumpridas} icon={<ListTodo className="h-5 w-5" />} variant="success" />
            <KpiCard title="Urgentes" value={urgentes} icon={<ListTodo className="h-5 w-5" />} variant="urgent" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar tarefas..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Prazo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tarefa</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Prioridade</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Origem</th>
                  </tr>
                </thead>
                <tbody>
                  {mockActusTasks.filter(t => t.descricao.toLowerCase().includes(search.toLowerCase()) || t.responsavel.toLowerCase().includes(search.toLowerCase())).map((t) => (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-2.5 text-xs text-foreground tabular-nums">{new Date(t.inicio_em).toLocaleDateString('pt-BR')}</td>
                      <td className="px-4 py-2.5">
                        <p className="text-xs font-medium text-foreground">{t.descricao}</p>
                        {t.subtipo && <p className="text-[10px] text-muted-foreground">{t.subtipo}</p>}
                      </td>
                      <td className="px-4 py-2.5 text-[10px] font-mono text-muted-foreground tabular-nums">{t.processo_cnj || '-'}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{t.responsavel}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={t.prioridade} /></td>
                      <td className="px-4 py-2.5"><StatusBadge status={t.status} /></td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{t.tipo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
