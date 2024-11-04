import Card from './Card';

const cardData = [
  {
    title: "Arrays",
    summary: "A linear collection of elements stored in contiguous memory locations.",
    image: "/path-to-your-image.jpg",
    slug: "arrays"
  },
  {
    title: "Lists",
    summary: "A dynamic collection of elements that can grow and shrink during execution.",
    image: "/path-to-your-image.jpg",
    slug: "lists"
  },
  {
    title: "Linked Lists",
    summary: "A sequence of elements where each element points to the next element in the sequence.",
    image: "/path-to-your-image.jpg",
    slug: "linked-lists"
  },
  {
    title: "Trees",
    summary: "A hierarchical data structure with a root value and subtrees of children nodes.",
    image: "/path-to-your-image.jpg",
    slug: "trees"
  },
  {
    title: "Heaps",
    summary: "A specialized tree-based structure satisfying the heap property of parent-child relationships.",
    image: "/path-to-your-image.jpg",
    slug: "heaps"
  },
  {
    title: "Vectors",
    summary: "A dynamic array that can grow or shrink in size automatically.",
    image: "/path-to-your-image.jpg",
    slug: "vectors"
  },
  {
    title: "Maps",
    summary: "A collection of key-value pairs where each key must be unique.",
    image: "/path-to-your-image.jpg",
    slug: "maps"
  },
  {
    title: "Stacks",
    summary: "A Last-In-First-Out (LIFO) data structure for storing and retrieving elements.",
    image: "/path-to-your-image.jpg",
    slug: "stacks"
  },
  {
    title: "Hash Tables",
    summary: "A data structure that implements an associative array using a hash function.",
    image: "/path-to-your-image.jpg",
    slug: "hash-tables"
  },
  {
    title: "Queues",
    summary: "A First-In-First-Out (FIFO) data structure for storing and retrieving elements.",
    image: "/path-to-your-image.jpg",
    slug: "queues"
  },
  {
    title: "Graphs",
    summary: "A collection of nodes (vertices) connected by edges to represent relationships.",
    image: "/path-to-your-image.jpg",
    slug: "graphs"
  },
  {
    title: "Sets",
    summary: "A collection of unique elements with no duplicate values allowed.",
    image: "/path-to-your-image.jpg",
    slug: "sets"
  }
];

export default function Grid() {
  return (
    <div className="h-screen p-6">
      <div className="h-[calc(100vh-48px)] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
        {cardData.map((card, index) => (
          <Card 
            key={index} 
            {...card}
          />
        ))}
      </div>
    </div>
  );
}