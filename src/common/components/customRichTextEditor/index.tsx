import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import MDEditor, { commands } from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

const AllowedCommands = [
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.divider,
  commands.code,
  commands.codeBlock,
  commands.divider,
  commands.orderedListCommand,
  commands.unorderedListCommand,
  commands.divider,
  commands.hr,
]

interface CustomRichTextEditorProps {
  value: string
  onChange: (value?: string) => void
}

const CustomRichTextEditor = ({ value, onChange }: CustomRichTextEditorProps) => {
  const renderMarkdownEditor = () => (
    <MDEditor
      value={value}
      onChange={onChange}
      commands={AllowedCommands}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
        style: {
          whiteSpace: 'pre-wrap',
        },
      }}
    />
  )

  const renderPreview = () => {
    return (
      <MDEditor.Markdown
        source={value}
        rehypePlugins={[[rehypeSanitize]]}
        style={{ whiteSpace: 'pre-wrap' }}
      />
    )
  }

  return (
    <div data-color-mode='light'>
      <Tabs colorScheme='purple' size='sm'>
        <TabList>
          <Tab>Write</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>{renderMarkdownEditor()}</TabPanel>
          <TabPanel>{renderPreview()}</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default CustomRichTextEditor
