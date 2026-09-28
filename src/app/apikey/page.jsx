'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import toast from 'react-hot-toast';

export default function ApiKeyPage() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarSeries() {
      try {
        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_SERIES}?limit=50`,
          {
            headers: {
              'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        setSeries(resp.data.data);

        toast.success('Séries carregadas!', {
          id: 'getApiKey',
        });
      } catch (error) {
        console.error('Erro:', error);

        toast.error('Erro ao buscar as séries.', {
          id: 'getApiKey',
        });
      } finally {
        setLoading(false);
      }
    }

    buscarSeries();
  }, []);

  return (
    <main>
      <h2>Veja a API Key ficando exposta no header desta chamada.</h2>

      <p>DevTools → Network → Header → series</p>

      <p>
        Axios, GET direto na API, com API Key exposta no navegador.
      </p>

      {loading ? (
        <div className="skeleton">
          <Skeleton active />
        </div>
      ) : (
        <ul>
          {series.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </main>
  );
}