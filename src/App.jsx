import React, { useEffect, useState, useMemo } from 'react';
import SearchInput from './searchInput';
import AddList from './AddList';

function UserProfile({ first, last, theme }) {
  const [data, setData] = useState({ first: "Myckael", last: "Brenno", email: "myckael@teste.com", bio: "Programador FullStack"});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [text, setText] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme])

  useEffect(() => {
    document.title = `You clicked ${clickCount} times`;
  }, [clickCount])

  const profile = useMemo(() => { //São dados que sempre serão exibidos e não devem ser re-renderizados
    return data
  }, [data])


  if (loading) return <p>Loading profile...</p>;
  //if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Olá, {profile && (profile.first + " " + profile.last)}!</h1>
      <button onClick={() => setClickCount((c) => c + 1)}>
        Clicou {clickCount} vezes
      </button>
      <SearchInput
        value={text}
        onChange={(search) => setText(search)}
      />
      {profile && (
        <div>
          <p>Email: {profile.email}</p>
          <p>Bio: {profile.bio}</p>
        </div>
      )}

      <AddList
        value={text}
        onChange={(search) => setText(search)}
      />
    </div>
  );
}

export default UserProfile;
