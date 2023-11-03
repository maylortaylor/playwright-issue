import '../reportDetailsModal.scss';

import {
	BaseEditor,
	Descendant,
	Editor,
	Element as SlateElement,
	Transforms,
	createEditor,
} from 'slate';
import {
	Code,
	FormatAlignCenter,
	FormatAlignJustify,
	FormatAlignLeft,
	FormatAlignRight,
	FormatBold,
	FormatItalic,
	FormatListBulleted,
	FormatListNumbered,
	FormatQuote,
	FormatUnderlined,
	LooksOne,
	LooksTwo,
	Redo,
	Undo,
} from '@mui/icons-material';
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react';
import { IconButton, Paper } from '@mui/material';
import React, {
	LegacyRef,
	PropsWithChildren,
	Ref,
	forwardRef,
	useCallback,
	useMemo,
} from 'react';

import { withHistory } from 'slate-history';

type CustomElement = { type: 'paragraph'; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
	interface CustomTypes {
		Editor: BaseEditor & ReactEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}

interface BaseProps {
	className: string;
	[key: string]: unknown;
}
type OrNull<T> = T | null;

const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const HOTKEYS = {
	'mod+b': 'bold',
	'mod+i': 'italic',
	'mod+u': 'underline',
	'mod+`': 'code',
};

// eslint-disable-next-line react/display-name
export const Button = forwardRef(
	(
		{
			className,
			active,
			reversed,
			...props
		}: PropsWithChildren<
			{
				active: boolean;
				reversed: boolean;
			} & BaseProps
		>,
		ref: LegacyRef<HTMLSpanElement>,
	) => (
		<span
			{...props}
			ref={ref}
			className={`
          cursor: pointer;
          color: ${
						reversed ? (active ? 'white' : '#aaa') : active ? 'black' : '#ccc'
					};
        `}
		/>
	),
);

// eslint-disable-next-line react/display-name
export const Menu = forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: LegacyRef<HTMLDivElement>,
	) => (
		<div
			{...props}
			data-test-id="menu"
			ref={ref}
			className={`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `}
		/>
	),
);

// eslint-disable-next-line react/display-name
export const Toolbar = forwardRef(
	(
		{ className, ...props }: PropsWithChildren<BaseProps>,
		ref: Ref<HTMLDivElement>,
	) => (
		<Menu
			{...props}
			ref={ref}
			className={`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `}
		/>
	),
);

const BlockButton = ({ format, icon }: any) => {
	const editor = useSlate();
	return (
		<Button
			active={isBlockActive(
				editor,
				format,
				TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
			)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleBlock(editor, format);
			}}
		>
			{
				{
					looks_one: <LooksOne />,
					loose_two: <LooksTwo />,
					block_quote: <FormatQuote />,
					format_list_numbered: <FormatListNumbered />,
					format_list_bulleted: <FormatListBulleted />,
					format_align_left: <FormatAlignLeft />,
					format_align_center: <FormatAlignCenter />,
					format_align_right: <FormatAlignRight />,
					format_align_justify: <FormatAlignJustify />,
				}[icon]
			}
		</Button>
	);
};

const MarkButton = ({ format, icon }: any) => {
	const editor = useSlate();
	return (
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={(event) => {
				event.preventDefault();
				toggleMark(editor, format);
			}}
		>
			{
				{
					format_bold: <FormatBold />,
					format_italic: <FormatItalic />,
					format_underlined: <FormatUnderlined />,
					code: <Code />,
				}[icon]
			}
		</Button>
	);
};

const Element = ({ attributes, children, element }: any) => {
	const style = { textAlign: element.align };
	switch (element.type) {
		case 'block-quote':
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			);
		case 'bulleted-list':
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case 'heading-one':
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case 'heading-two':
			return (
				<h2 style={style} {...attributes}>
					{children}
				</h2>
			);
		case 'list-item':
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case 'numbered-list':
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

const Leaf = ({ attributes, children, leaf }: any) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}

	return <span {...attributes}>{children}</span>;
};

const toggleBlock = (editor, format) => {
	const isActive = isBlockActive(
		editor,
		format,
		TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type',
	);
	const isList = LIST_TYPES.includes(format);

	Transforms.unwrapNodes(editor, {
		match: (n) =>
			!Editor.isEditor(n) &&
			SlateElement.isElement(n) &&
			// LIST_TYPES.includes(n.type) &&
			!TEXT_ALIGN_TYPES.includes(format),
		split: true,
	});
	let newProperties: any;
	if (TEXT_ALIGN_TYPES.includes(format)) {
		newProperties = {
			align: isActive ? undefined : format,
		};
	} else {
		newProperties = {
			type: isActive ? 'paragraph' : isList ? 'list-item' : format,
		};
	}
	Transforms.setNodes<SlateElement>(editor, newProperties);

	if (!isActive && isList) {
		const block = { type: format, children: [] };
		Transforms.wrapNodes(editor, block);
	}
};

const isBlockActive = (editor, format, blockType = 'type') => {
	const { selection } = editor;
	if (!selection) return false;

	const [match] = Array.from(
		Editor.nodes(editor, {
			at: Editor.unhangRange(editor, selection),
			match: (n) =>
				!Editor.isEditor(n) &&
				SlateElement.isElement(n) &&
				n[blockType] === format,
		}),
	);

	return !!match;
};

const toggleMark = (editor, format) => {
	const isActive = isMarkActive(editor, format);

	if (isActive) {
		Editor.removeMark(editor, format);
	} else {
		Editor.addMark(editor, format, true);
	}
};

const isMarkActive = (editor, format) => {
	const marks = Editor.marks(editor);
	return marks ? marks[format] === true : false;
};

interface RichTextEditorProps {
	messageBody: string
}
const RichTextEditor = (props: RichTextEditorProps) => {
	const renderElement = useCallback((props) => <Element {...props} />, []);
	const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
	const editor = useMemo(() => withHistory(withReact(createEditor())), []);

	const initialValue: Descendant[] = [
		{
			type: 'paragraph',
			children: [
				{
					text: props.messageBody ?? ''
				},
			],
		},
	];

	return (
		<Paper
			id="rich-text-editor"
			elevation={12}
			sx={{
				minHeight: '100%',
			}}
		>
			<Slate editor={editor} initialValue={initialValue}>
				<Toolbar>
					<IconButton aria-label="undo" color="inherit" onClick={editor.undo}>
						<Undo />
					</IconButton>
					<IconButton aria-label="redo" color="inherit" onClick={editor.redo}>
						<Redo />
					</IconButton>
				</Toolbar>
				{/* <Toolbar>
					<MarkButton format="bold" icon="format_bold" />
					<MarkButton format="italic" icon="format_italic" />
					<MarkButton format="underline" icon="format_underlined" />
					<MarkButton format="code" icon="code" />
					<BlockButton format="heading-one" icon="LooksOne" />
					<BlockButton format="heading-two" icon="looks_two" />
					<BlockButton format="block-quote" icon="format_quote" />
					<BlockButton format="numbered-list" icon="format_list_numbered" />
					<BlockButton format="bulleted-list" icon="format_list_bulleted" />
					<BlockButton format="left" icon="format_align_left" />
					<BlockButton format="center" icon="format_align_center" />
					<BlockButton format="right" icon="format_align_right" />
					<BlockButton format="justify" icon="format_align_justify" />
				</Toolbar> */}
				<Editable
					className="rich-text-editor"
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					// placeholder="Enter some rich text…"
					// spellCheck
					autoFocus
					// onKeyDown={event => {
					//   for (const hotkey in HOTKEYS) {
					//     if (isHotkey(hotkey, event as any)) {
					//       event.preventDefault()
					//       const mark = HOTKEYS[hotkey]
					//       toggleMark(editor, mark)
					//     }
					//   }
					// }}
				/>
			</Slate>
		</Paper>
	);
};

export default RichTextEditor;
