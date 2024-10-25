"use client"
import { useState } from 'react';

const RemoteControl: React.FC = () => {
  const [miniName, setMiniName] = useState<string>('');
  const [command, setCommand] = useState<string>('FORWARD');
  const [response, setResponse] = useState<string | null>(null);
  const [ngrokUrl, setNgrokUrl] = useState<string>(''); // Novo estado para o URL do Ngrok

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `${miniName},${command}`;

    try {
      const res = await fetch(`${ngrokUrl}`, {  // Usa o URL do Ngrok
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: message,
      });

      if (!res.ok) {
        throw new Error('Falha ao enviar o comando');
      }

      const data = await res.text();
      setResponse(`Resposta: ${data}`);
    } catch (error) {
      setResponse('Erro ao enviar o comando.');
    }
  };

  const handleButtonClick = async (message: string) => {
    console.log(`Direction: ${message}`);
    try {
        const res = await fetch(`${ngrokUrl}`, {  // Usa o URL do Ngrok
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: `${miniName},${message}`,
        });
  
        if (!res.ok) {
          throw new Error('Falha ao enviar o comando');
        }
  
        const data = await res.text();
        setResponse(`Resposta: ${data}`);
      } catch (error) {
        setResponse('Erro ao enviar o comando.');
      }
  };

  return (
    <div className='flex flex-col h-screen bg-[#22223b]'>
      <h1>Talespire remote control webui</h1>
      <form className="flex flex-col sm:flex-row" onSubmit={handleSubmit}>
        <label
        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
        <span className="text-xs font-medium text-white"> name </span>
          <input
            type="text"
            placeholder='Freya'
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-black"
            value={miniName}
            onChange={(e) => setMiniName(e.target.value)}
          />
        </label>
        
        {/* Novo campo para o URL do Ngrok */}
        <label
        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
        <span className="text-xs font-medium text-white"> url </span>
          <input
            className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm text-black"
            type="text"
            value={ngrokUrl}
            onChange={(e) => setNgrokUrl(e.target.value)}
            placeholder="server URL"
          />
        </label>
      </form>
      {response && <div>{response}</div>}
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center">
          <button
              className="mb-4 p-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
              onClick={() => handleButtonClick('FORWARDCAMERABASEDANDFACE')}
          >
              W
          </button>
          <div className="flex">
              <button
                  className="mr-4 p-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
                  onClick={() => handleButtonClick('LEFTCAMERABASEDANDFACE')}
              >
                  A
              </button>
              <button
                  className="ml-4 p-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
                  onClick={() => handleButtonClick('RIGHTCAMERABASEDANDFACE')}
              >
                  D
              </button>
          </div>
          <button
              className="mt-4 p-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
              onClick={() => handleButtonClick('BACKWARDCAMERABASEDANDFACE')}
          >
              S
          </button>
        </div>
      </div>
      <span className="text-xs font-medium text-white"> To work properly, you may need to allow the browser to use mixed content </span>
      <footer className="text-center p-4 mt-4 border-t">
      <a
        href="https://github.com/Alan007BR/talespire-remote-control-webUI"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Github Repository
      </a>
    </footer>
    </div>
  );
};

export default RemoteControl;