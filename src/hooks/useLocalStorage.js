import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (local, musica = { 'CÓD': 0 }) => {
    if (key === 'karaokeFavoritos') {
      try {
        const stored = JSON.parse(window.localStorage.getItem(key)) || {};
        const localId = local?.id;
        const musicaCod = musica?.CÓD;

        if (!localId || !musicaCod) return;

        const existentes = stored[localId] || [];
        if (!existentes.includes(musicaCod)) {
          const atualizados = [...existentes, musicaCod];
          const novoEstado = { ...stored, [localId]: atualizados };
          
          window.localStorage.setItem(key, JSON.stringify(novoEstado));
          setStoredValue(novoEstado);
        }

      } catch (error) {
        console.error(`Erro ao atualizar localStorage (${key}):`, error);
      }
    } else {
      try {
        const valueToStore = local instanceof Function ? local(storedValue) : local;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  };

  const removerFavorito = (local, musica = { 'CÓD': 0 }) => {
    try {
      if (key === 'karaokeFavoritos') {
        const current = JSON.parse(window.localStorage.getItem(key)) || {};
        const localId = local?.id;
        const musicaCod = musica?.CÓD;

        if (!localId || !musicaCod) return;

        const list = current[localId] || [];
        
        if (list.includes(musicaCod)) {
          const updated = {
            ...current,
            [localId]: list.filter(cod => cod !== musicaCod)
          };

          window.localStorage.setItem(key, JSON.stringify(updated));
          setStoredValue(updated);
        }
      }
    } catch (error) {
      console.error(`Erro ao remover favorito do localStorage (${key}):`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          if (JSON.stringify(storedValue) !== JSON.stringify(newValue)) {
            setStoredValue(newValue);
          }
        } catch (error) {
          console.error(`Error parsing new value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue, storedValue]);

  return [storedValue, setValue, removerFavorito];
};

export default useLocalStorage;