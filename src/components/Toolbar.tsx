import { Bold, Italic} from 'lucide-react';
// import { Button } from './ui/button';
import { Toggle } from './ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface ToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onCreateFolder: () => void;
  isBoldActive: boolean;
  isItalicActive: boolean;
  disabled?: boolean;
}

export default function Toolbar({
  onBold,
  onItalic,
  onCreateFolder,
  isBoldActive,
  isItalicActive,
  disabled = false,
}: ToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-2 border-b">
      {/* Formatting Tools */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={isBoldActive}
            onPressedChange={onBold}
            disabled={disabled}
            aria-label="Toggle Bold"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Bold (Ctrl+B)</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={isItalicActive}
            onPressedChange={onItalic}
            disabled={disabled}
            aria-label="Toggle Italic"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Italic (Ctrl+I)</TooltipContent>
      </Tooltip>


      <div className="mx-1 h-5 w-px bg-border" />

    </div>
  );
}