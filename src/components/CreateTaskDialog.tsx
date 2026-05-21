import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { ClipboardList, BookOpenCheck, ShieldCheck, FileSearch, CalendarClock } from "lucide-react";

export type TaskType = "Ciência" | "Providência" | "Revisão" | "Compromisso";

export interface CreateTaskPayload {
  responsavel: string;
  executor: string;
  processo_cnj: string;
  descricao: string;
  tipo: TaskType;
}

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProcessoCnj?: string;
  defaultResponsavel?: string;
  onCreate?: (payload: CreateTaskPayload) => void;
}

const TASK_TYPES: { value: TaskType; label: string; icon: React.ReactNode; hint: string }[] = [
  { value: "Ciência", label: "Ciência", icon: <BookOpenCheck className="h-3.5 w-3.5" />, hint: "Tomar conhecimento" },
  { value: "Providência", label: "Providência", icon: <ShieldCheck className="h-3.5 w-3.5" />, hint: "Ação a executar" },
  { value: "Revisão", label: "Revisão", icon: <FileSearch className="h-3.5 w-3.5" />, hint: "Conferir peça/documento" },
  { value: "Compromisso", label: "Compromisso", icon: <CalendarClock className="h-3.5 w-3.5" />, hint: "Agenda/audiência" },
];

export function CreateTaskDialog({
  open,
  onOpenChange,
  defaultProcessoCnj = "",
  defaultResponsavel = "",
  onCreate,
}: CreateTaskDialogProps) {
  const [responsavel, setResponsavel] = useState(defaultResponsavel);
  const [executor, setExecutor] = useState("");
  const [processo, setProcesso] = useState(defaultProcessoCnj);
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<TaskType>("Providência");

  useEffect(() => {
    if (open) {
      setResponsavel(defaultResponsavel);
      setProcesso(defaultProcessoCnj);
      setExecutor("");
      setDescricao("");
      setTipo("Providência");
    }
  }, [open, defaultProcessoCnj, defaultResponsavel]);

  const handleSubmit = () => {
    if (!responsavel.trim() || !executor.trim() || !descricao.trim()) {
      toast({ title: "Preencha os campos obrigatórios", variant: "destructive" });
      return;
    }
    const payload: CreateTaskPayload = {
      responsavel: responsavel.trim(),
      executor: executor.trim(),
      processo_cnj: processo.trim(),
      descricao: descricao.trim(),
      tipo,
    };
    onCreate?.(payload);
    toast({ title: "Tarefa criada", description: `${tipo} atribuída para ${payload.executor}` });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <ClipboardList className="h-4 w-4 text-primary" /> Nova Tarefa
          </DialogTitle>
          <DialogDescription className="text-xs">
            Atribua uma tarefa rápida vinculada a um processo.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Responsável *</Label>
              <Input
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                placeholder="Quem está passando"
                className="h-9 bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Executor *</Label>
              <Input
                value={executor}
                onChange={(e) => setExecutor(e.target.value)}
                placeholder="Quem vai fazer"
                className="h-9 bg-background"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Processo (CNJ)</Label>
            <Input
              value={processo}
              onChange={(e) => setProcesso(e.target.value)}
              placeholder="0000000-00.0000.0.00.0000"
              className="h-9 bg-background font-mono text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Tipo da Tarefa *</Label>
            <div className="grid grid-cols-4 gap-2">
              {TASK_TYPES.map((t) => {
                const active = tipo === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTipo(t.value)}
                    className={`flex flex-col items-center gap-1 rounded-md border p-2 text-[11px] font-medium transition-all ${
                      active
                        ? "border-primary bg-primary/10 text-primary shadow-card"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                    title={t.hint}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Descrição *</Label>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="O que precisa ser feito?"
              rows={3}
              className="bg-background resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button size="sm" onClick={handleSubmit} className="active-scale">Criar Tarefa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
