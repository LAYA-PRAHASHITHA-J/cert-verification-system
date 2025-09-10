export default function Card({ title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
}
