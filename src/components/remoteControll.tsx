"use client"
import { useState } from 'react';

const RemoteControl: React.FC = () => {
  const [miniName, setMiniName] = useState<string>('');
  const [command, setCommand] = useState<string>('FORWARD');
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = `${miniName},${command}`;

    try {
      const res = await fetch('http://192.168.1.110:11000', {  // Coloque aqui o IP e porta do GM
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
        const res = await fetch('http://192.168.1.110:11000', {  // Coloque aqui o IP e porta do GM
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
    // Aqui você pode fazer a requisição para o seu backend
    // Exemplo: enviar o comando correspondente para o servidor
};

  return (
    <div>
      <h1>Controle Remoto de Mini</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome do Mini:
          <input
            type="text"
            value={miniName}
            onChange={(e) => setMiniName(e.target.value)}
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
        <button type="submit">Enviar Comando</button>
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
                        onClick={() => handleButtonClick('RIGHT')}
                    >
                        A
                    </button>
                    <button
                        className="ml-4 p-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
                        onClick={() => handleButtonClick('LEFT')}
                    >
                        D
                    </button>
                </div>
                <button
                    className="mt-4 p-4 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-700"
                    onClick={() => handleButtonClick('BACKWARD')}
                >
                    S
                </button>
            </div>
        </div>
    </div>
  );
};

export default RemoteControl;
