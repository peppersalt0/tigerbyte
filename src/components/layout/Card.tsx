interface CardProps {
    title: string;
    content: string;
  }
  
  export default function Card({ title, content }: CardProps) {
    return (
      <div className="bg-gray-100 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-700">{content}</p>
      </div>
    );
  }