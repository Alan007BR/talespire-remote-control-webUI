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
    <div>
      <h1>Controle Remoto de Mini</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Mini:
          <input
            type="text"
            className="text-black"
            value={miniName}
            onChange={(e) => setMiniName(e.target.value)}
          />
        </label>
        
        {/* Novo campo para o URL do Ngrok */}
        <label>
          URL do Ngrok:
          <input
            className="text-black"
            type="text"
            value={ngrokUrl}
            onChange={(e) => setNgrokUrl(e.target.value)}
            placeholder="Digite o URL do Ngrok"
          />
        </label>

        <label>
          Comando:
          <select
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          >
            <option value="FORWARDCAMERABASEDANDFACE">Mover para Frente</option>
            <option value="BACKWARD">Mover para Trás</option>
            <option value="LEFT">Mover para Esquerda</option>
            <option value="RIGHT">Mover para Direita</option>
            <option value="ROTATE,LEFT">Rotacionar para Esquerda</option>
            <option value="ROTATE,RIGHT">Rotacionar para Direita</option>
          </select>
        </label>
        {/* <button type="submit">Enviar Comando</button> */}
      </form>
      {response && <div>{response}</div>}
      <div className="flex flex-col items-center justify-center h-screen">
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
    </div>
  );
};

export default RemoteControl;