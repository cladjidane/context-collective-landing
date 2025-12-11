import { Download, ExternalLink } from "lucide-react";

interface PdfViewerProps {
    url: string;
    title?: string;
    height?: string;
}

export function PdfViewer({ url, title = "Présentation", height = "500px" }: PdfViewerProps) {
    return (
        <div className="my-8 rounded-xl border border-border bg-bg-subtle overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white">
                <h4 className="font-semibold text-sm text-muted uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {title}
                </h4>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-primary hover:text-accent transition-colors flex items-center gap-1.5 uppercase tracking-wide"
                >
                    <Download className="w-3.5 h-3.5" />
                    Télécharger
                </a>
            </div>

            <div className="relative w-full bg-gray-50" style={{ height }}>
                <iframe
                    src={`${url}#view=FitH`}
                    className="absolute inset-0 w-full h-full"
                    title={title}
                >
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <p className="mb-4 text-muted">
                            Votre navigateur ne peut pas afficher ce PDF directement.
                        </p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button inline-flex items-center gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Ouvrir le PDF
                        </a>
                    </div>
                </iframe>
            </div>
        </div>
    );
}
