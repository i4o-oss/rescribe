import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import * as React from 'react'

import { cn } from '../helpers'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			'rs-flex rs-h-10 rs-w-full rs-items-center rs-justify-between rs-rounded-md rs-border rs-border-input rs-bg-ui rs-px-3 rs-py-2 rs-text-sm rs-ring-offset-ui placeholder:rs-text-muted-foreground focus:rs-outline-none focus:rs-ring-2 focus:rs-ring-ring focus:rs-ring-offset-2 disabled:rs-cursor-not-allowed disabled:rs-opacity-50',
			className
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<ChevronDown className='h-4 w-4 opacity-50' />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				'rs-relative rs-z-50 rs-min-w-[8rem] rs-overflow-hidden rs-rounded-md rs-border rs-bg-popover rs-text-popover-foreground rs-shadow-md data-[state=open]:rs-animate-in data-[state=closed]:rs-animate-out data-[state=closed]:rs-fade-out-0 data-[state=open]:rs-fade-in-0 data-[state=closed]:rs-zoom-out-95 data-[state=open]:rs-zoom-in-95 data-[side=bottom]:rs-slide-in-from-top-2 data-[side=left]:rs-slide-in-from-right-2 data-[side=right]:rs-slide-in-from-left-2 data-[side=top]:rs-slide-in-from-bottom-2',
				position === 'popper' &&
					'data-[side=bottom]:rs-translate-y-1 data-[side=left]:-rs-translate-x-1 data-[side=right]:rs-translate-x-1 data-[side=top]:-rs-translate-y-1',
				className
			)}
			position={position}
			{...props}
		>
			<SelectPrimitive.Viewport
				className={cn(
					'rs-p-1',
					position === 'popper' &&
						'rs-h-[var(--radix-select-trigger-height)] rs-w-full rs-min-w-[var(--radix-select-trigger-width)]'
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Label
		ref={ref}
		className={cn(
			'rs-py-1.5 rs-pl-8 rs-pr-2 rs-text-sm rs-font-semibold',
			className
		)}
		{...props}
	/>
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			'rs-relative rs-flex rs-w-full rs-cursor-default rs-select-none rs-items-center rs-rounded-sm rs-py-1.5 rs-pl-8 rs-pr-2 rs-text-sm rs-outline-none focus:rs-bg-accent focus:rs-text-accent-foreground data-[disabled]:rs-pointer-events-none data-[disabled]:rs-opacity-50',
			className
		)}
		{...props}
	>
		<span className='rs-absolute rs-left-2 rs-flex rs-h-3.5 rs-w-3.5 rs-items-center rs-justify-center'>
			<SelectPrimitive.ItemIndicator>
				<Check className='rs-h-4 rs-w-4' />
			</SelectPrimitive.ItemIndicator>
		</span>

		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<SelectPrimitive.Separator
		ref={ref}
		className={cn('-rs-mx-1 rs-my-1 rs-h-px rs-bg-muted', className)}
		{...props}
	/>
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
	Select,
	SelectGroup,
	SelectValue,
	SelectTrigger,
	SelectContent,
	SelectLabel,
	SelectItem,
	SelectSeparator,
}
