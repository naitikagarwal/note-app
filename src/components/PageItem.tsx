import type { Page } from '../types/types';
import { FileText, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

import { cn } from '../lib/utils';

interface PageItemProps {
    page: Page;
    isActive: boolean;
    onClick: (pageId: string) => void;
    onDelete: (pageId: string) => void;
}

export default function PageItem({
    page,
    isActive,
    onClick,
    onDelete,
}: PageItemProps) {


    const handleDelete = () => {
        onDelete(page.id);
    };

    return (
        <div
            className={cn(
                "group flex items-center justify-between rounded-md p-2 text-sm font-medium",
                isActive
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50 text-muted-foreground",

            )}
            onClick={() => onClick(page.id)}
        >
            <div className="flex items-center flex-1 min-w-0">
                <FileText className="h-4 w-4 mr-2 flex-shrink-0" />

                <span className="truncate">{page.title}</span>
            </div>

            <div className="flex items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        </div>
    );
}