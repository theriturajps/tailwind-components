import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { loadComponents } from '../utils/componentLoader';

export default function ComponentPage() {
  const { type } = useParams();
  const [components, setComponents] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const loadComponentList = async () => {
      const loadedComponents = await loadComponents(type);
      setComponents(loadedComponents);
    };
    loadComponentList();
  }, [type]);

  const handleCopy = (index) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900 capitalize">
          {type}
        </h1>
        <span className="text-xs text-gray-500">
          {components.length} components
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {components.map((item, index) => {
          const Component = item.component;
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-medium text-gray-900">{item.name}</h2>
                  <CopyToClipboard text={item.code} onCopy={() => handleCopy(index)}>
                    <button className="inline-flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-900">
                      {copiedIndex === index ? (
                        <>
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </CopyToClipboard>
                </div>
                <div className="p-4 bg-gray-50 rounded flex items-center justify-center">
                  <Component />
                </div>
              </div>

              <div className="bg-gray-50 border-t border-gray-200">
                <SyntaxHighlighter
                  language="javascript"
                  style={docco}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: 'transparent',
                    fontSize: '0.75rem'
                  }}
                >
                  {item.code}
                </SyntaxHighlighter>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}