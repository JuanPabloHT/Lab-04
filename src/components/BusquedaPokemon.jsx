import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export default function BusquedaPokemon() {
    const [name, setName] = useState("");
    const { data, loading, error, refetch } = useFetch(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = name.trim().toLowerCase();
        if (!cleaned) return;
        refetch(`${BASE_URL}/${cleaned}`);
    };

  return (
    <div>
      <h1>Buscador de Pokémon</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Escribe un Pokémon"
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
        <div>
          <h2>#{data.id} {data.name}</h2>
          <img
            src={data.sprites?.front_default}
            alt={data.name}
          />
          <p>Tipos: {data.types?.map((t) => t.type.name).join(", ")}</p>
        </div>
      )}
    </div>
  );
}



