import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-navy-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-3">
          <Logo tone="light" />
          <p className="max-w-md text-sm leading-relaxed">
            Plataforma educativa de segurança digital para MEIs, autônomos e pequenos empreendedores de Manaus e de todo o Brasil.
            Projeto desenvolvido para o desafio de produto da DIO.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-navy-foreground">Aviso educativo</p>
          <p className="leading-relaxed">
            Este diagnóstico possui finalidade exclusivamente educativa. Não representa auditoria técnica, teste de invasão, certificação ou garantia de segurança.
          </p>
          <p>Não pedimos senhas, códigos, documentos ou dados de clientes.</p>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-4 text-xs">
          <span>© {new Date().getFullYear()} CyberCheck</span>
          <Link to="/auth" className="hover:text-navy-foreground">Área administrativa</Link>
        </div>
      </div>
    </footer>
  );
}
