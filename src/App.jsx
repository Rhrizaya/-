
import React, { useState } from 'react';

export default function App() {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    if (!pregunta || !apiKey || !archivo) {
      alert("Debes llenar todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append('pregunta', pregunta);
    formData.append('api_key', apiKey);
    formData.append('archivo', archivo);

    setLoading(true);
    const res = await fetch('http://localhost:8000/buscar/', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setRespuesta(data.respuesta);
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>🔍 TPG Deep (Web)</h1>
      <input
        type="text"
        placeholder="Tu API Key de OpenAI"
        value={apiKey}
        onChange={e => setApiKey(e.target.value)}
        style={{ width: '100%', marginBottom: 12 }}
      />
      <textarea
        placeholder="¿Qué quieres buscar?"
        value={pregunta}
        onChange={e => setPregunta(e.target.value)}
        rows="4"
        style={{ width: '100%', marginBottom: 12 }}
      />
      <input
        type="file"
        onChange={e => setArchivo(e.target.files[0])}
        style={{ marginBottom: 12 }}
      />
      <button onClick={handleBuscar} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      <div style={{ marginTop: 24 }}>
        <h3>Respuesta:</h3>
        <p>{respuesta}</p>
      </div>
    </div>
  );
}
