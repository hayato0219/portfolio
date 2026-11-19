import React from 'react';
import Markdown from 'markdown-to-jsx';

/** Renders model output. It is untrusted, so embedded HTML is never parsed into DOM. */
const ChatMarkdown: React.FC<{ text: string }> = ({ text }) => (
  <div className="chat-md">
    <Markdown
      options={{
        disableParsingRawHTML: true,
        overrides: {
          a: { props: { target: '_blank', rel: 'noopener noreferrer' } },
        },
      }}
    >
      {text}
    </Markdown>
  </div>
);

export default ChatMarkdown;
