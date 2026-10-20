// React 16.x code​​​​​‌​​​​​‌‌‌‌‌​‌‌​‌‌​​​‌‌‌​​​ below
import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import useDebouncedState from './useDebounce';

// 1. Update and create a Memoized Component to avoid re-rendering unless props change
const Item = memo(function Item({ item }) {
    console.log('Rendering item:', item.name);
    return <li>{item.name}: {item.score}</li>;
})

// 2. Update and create Memoized Component to avoid re-rendering unless props change
const TotalScore = memo(function TotalScore({ items }) {
    console.log('Calculating total score...');

    // 3. Create Memoized value to avoid re-rendering only if a depedency changes
    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + item.score, 0);
    }, [items])

    return <h3>Total Score: {total}</h3>;
})

const AddButton = function AddButton({ onAdd, disabled }) {
    return (
        <button onClick={onAdd} disabled={disabled}>Adicionar</button>
    )
}

function AddList() {
    const [items, setItems] = useState([
        { id: 1, name: 'Alice', score: 10 },
        { id: 2, name: 'Bob', score: 15 },
        { id: 3, name: 'Charlie', score: 20 },
    ]);

    const [name, setName] = useState('');
    //const debouncedChange = useDebounce(onChange, 500)
    const debouncedName = useDebouncedState(name)
    //const [input, setInput] = useState('');

    const isDuplicate = useMemo(() => {
        const q = debouncedName.trim().toLowerCase();
        return q !== '' && items.some(i => i.name.toLowerCase() === q);
    }, [debouncedName, items]);

    const visibleItems = useMemo(() => {
        const q = debouncedName.trim().toLowerCase();
        return q ? items.filter(i => i.name.toLowerCase().includes(q)) : items;
    }, [debouncedName, items]);

    const handleAdd = useCallback(() => {
        const trimmed = name.trim();
        if (!trimmed) return;

        setItems(prev => [
            ...prev,
            {
                id: prev.length ? Math.max(...prev.map(i => i.id)) + 1 : 1,
                name: trimmed,
                score: prev.length ? Math.max(...prev.map(i => i.score)) + 1 : 1,
            },
        ]);
        setName('');
    }, [name]);

    return (
        <div>
            <h2>Scoreboard</h2>
            <input
                className='inputName'
                placeholder="Digite um nome..."
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <AddButton
                onAdd={handleAdd}
                disabled={!name.trim()}
            />
            {isDuplicate && <small>Já existe alguém com esse nome.</small>}
            <ul>
                {visibleItems.map(item => (
                    <Item key={item.id} item={item} />
                ))}
            </ul>

            <TotalScore items={items} />
        </div>
    );
}

export default AddList;