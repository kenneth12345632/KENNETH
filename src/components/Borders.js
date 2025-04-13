export default function Borders({ borders, onSelect }) {
    if (!borders || borders.length === 0) return <p>No borders.</p>;
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {borders.map((code) => (
          <button
            key={code}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
            onClick={() => onSelect(code)}
          >
            {code}
          </button>
        ))}
      </div>
    );
  }