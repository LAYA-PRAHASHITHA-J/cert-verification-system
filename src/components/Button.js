export default function Button({ text, onClick, color = "blue" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-600 text-white px-4 py-2 rounded-lg hover:bg-${color}-700`}
    >
      {text}
    </button>
  );
}
