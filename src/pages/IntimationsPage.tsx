import { AppLayout } from "@/components/AppLayout";
import { mockActusIntimations } from "@/lib/mock-data";
import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, AlertTriangle, Download, Eye, CheckCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

export default function IntimationsPage() {
  const [search, setSearch] = useState("");
  const [taskOpen, setTaskOpen] = useState(false);
  const [taskCnj, setTaskCnj] = useState<string>("");
  const filtered = mockActusIntimations.filter(m =>
    m.resumo.toLowerCase().includes(search.toLowerCase()) ||
    m.processo_cnj.includes(search) ||
    m.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const naoLidas = mockActusIntimations.filter(i => i.leitura_status === 'Não lida').length;
  const urgentes = mockActusIntimations.filter(i => i.classificacao === 'Urgente').length;
  const comPrazo = mockActusIntimations.filter(i => i.prazo_em).length;

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Intimações</h1>
              <p className="text-sm text-muted-foreground">{mockActusIntimations.length} intimações recentes</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Download className="h-3.5 w-3.5" /> Exportar</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            <KpiCard title="Total" value={mockActusIntimations.length} icon={<AlertTriangle className="h-5 w-5" />} />
            <KpiCard title="Não Lidas" value={naoLidas} icon={<Eye className="h-5 w-5" />} variant="urgent" />
            <KpiCard title="Urgentes" value={urgentes} icon={<AlertTriangle className="h-5 w-5" />} variant="urgent" />
            <KpiCard title="Com Prazo" value={comPrazo} icon={<AlertTriangle className="h-5 w-5" />} variant="ai" />
            <KpiCard title="Lidas" value={mockActusIntimations.length - naoLidas} icon={<CheckCircle className="h-5 w-5" />} variant="success" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar intimações..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Data / Prazo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Cliente</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Intimação</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tarefa</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((i) => (
                    <tr key={i.id} className={`border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${i.leitura_status === 'Não lida' ? 'bg-urgent/5' : ''}`}>
                      <td className="px-4 py-2.5">
                        <p className="text-xs text-foreground tabular-nums">{new Date(i.data_intimacao).toLocaleDateString('pt-BR')}</p>
                        {i.prazo_em && <p className="text-[10px] text-warning tabular-nums">Prazo: {new Date(i.prazo_em).toLocaleDateString('pt-BR')}</p>}
                      </td>
                      <td className="px-4 py-2.5 text-[10px] font-mono text-muted-foreground tabular-nums">{i.processo_cnj}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{i.cliente.split(' ').slice(0, 3).join(' ')}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{i.resumo}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{i.responsavel.split(' ').slice(0, 2).join(' ')}</td>
                      <td className="px-4 py-2.5">
                        {i.tarefa_status === 'Criar tarefa' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 text-[10px] gap-1"
                            onClick={() => { setTaskCnj(i.processo_cnj); setTaskOpen(true); }}
                          >
                            <Plus className="h-3 w-3" /> Criar tarefa
                          </Button>
                        ) : (
                          <StatusBadge status={i.tarefa_status} />
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <StatusBadge status={i.leitura_status} />
                          <StatusBadge status={i.triagem_status} />
                        </div>
                      </td>
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
