import Card from "./Card";

const cardData = [
  { title: "Card 1", content: "This is the content for Card 1." },
  { title: "Card 2", content: "This is the content for Card 2." },
  { title: "Card 3", content: "This is the content for Card 3." },
];

export default function Grid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <Card key={index} title={card.title} content={card.content} />
      ))}
    </div>
  );
}