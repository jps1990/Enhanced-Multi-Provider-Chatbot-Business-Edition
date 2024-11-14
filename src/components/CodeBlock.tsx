import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeBlockProps {
  content: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ content }) => {
  const codeBlocks = content.split('```');
  
  return (
    <>
      {codeBlocks.map((block, index) => {
        if (index % 2 === 1) {
          const [lang, ...code] = block.split('\n');
          return (
            <Highlight
              key={index}
              theme={themes.vsDark}
              code={code.join('\n')}
              language={lang || 'typescript'}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className} rounded-lg my-2 p-4 overflow-auto`} style={style}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          );
        }
        return <p key={index} className="whitespace-pre-wrap">{block}</p>;
      })}
    </>
  );
};

export default CodeBlock; 