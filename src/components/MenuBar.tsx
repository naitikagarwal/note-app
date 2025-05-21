import React from 'react'
import { Bold, Italic,Heading1, List, ListOrdered, Underline} from 'lucide-react';
// import { Button } from './ui/button';
import { Toggle } from './ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';


interface MenuBarProps {
  editor: any 
}

const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center p-2 border-b sticky top-0 bg-background z-10">

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            aria-label="Toggle Bold"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Bold</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            aria-label="Toggle Italic"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Italic </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-100 text-neutral-800' : 'hover:bg-gray-100'}`}
            aria-label="Toggle Underline"
          >
            <Underline className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Underline </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            aria-label="Toggle H1"
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>H1</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            aria-label="Toggle Bullet"
          >
            <List className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Bullet List</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            aria-label="Toggle Bullet"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>Ordered List</TooltipContent>
      </Tooltip>
      
      <div className="mx-1 h-5 w-px bg-border" />

    </div>
    
  )
}

export default MenuBar