export default function BreedSelector({breeds, selected, onChange}) {
  const breedNames = Object.keys(breeds || {});
  return (
    <div>
      <label>
        Select breed:
        <select value={selected} onChange={e => onChange(e.target.value)}>
          {breedNames.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </label>
    </div>
  );
}
