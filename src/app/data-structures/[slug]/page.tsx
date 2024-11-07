import { notFound } from 'next/navigation';
import Image from 'next/image';

// Define detailed type for our data structure content
interface DataStructure {
  title: string;
  summary: string;
  image: string;
  slug: string;
  timeComplexity: {
    access: string;
    search: string;
    insertion: string;
    deletion: string;
  };
  features: string[];
}

// Full data for each data structure
const dataStructures: Record<string, DataStructure> = {
  "arrays": {
    title: "Arrays",
    summary: "A linear collection of elements stored in contiguous memory locations.",
    image: "/images/arrayCard.png",
    slug: "arrays",
    timeComplexity: {
      access: "O(1)",
      search: "O(n)",
      insertion: "O(n)",
      deletion: "O(n)"
    },
    features: [
      "Fixed size in most implementations",
      "Continuous memory allocation",
      "Direct access by index",
      "Efficient for random access"
    ]
  },
  "linked-lists": {
    title: "Linked Lists",
    summary: "A sequence of elements where each element points to the next element in the sequence.",
    image: "/images/linkedlistCard.png",
    slug: "linked-lists",
    timeComplexity: {
      access: "O(n)",
      search: "O(n)",
      insertion: "O(1)",
      deletion: "O(1)"
    },
    features: [
      "Dynamic size - can grow and shrink",
      "Non-contiguous memory allocation",
      "Sequential access - must traverse from head",
      "Efficient for insertions and deletions",
      "Each node contains data and reference to next node",
      "No wasted memory allocation",
      "Can be singly or doubly linked"
    ]
  },
  // Add other data structures here...
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  const data = dataStructures[params.slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{data.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{data.summary}</p>
          </div>
          <div className="relative w-24 h-24">
            <Image
              src={data.image}
              alt={`${data.title} illustration`}
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {/* Overview Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2">
              {data.features.map((feature, index) => (
                <li key={index} className="text-gray-700">{feature}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Implementation Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Implementation</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`class ${data.title.replace(/s$/, '')} {
  constructor() {
    this.items = [];
  }

  insert(element) {
    this.items.push(element);
  }

  remove(index) {
    return this.items.splice(index, 1)[0];
  }

  get(index) {
    return this.items[index];
  }
}`}</code>
          </pre>
        </section>

        {/* Operations Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Operations</h2>
          <ul className="space-y-4">
            <li>
              <h3 className="font-semibold">Insertion</h3>
              <p className="text-gray-600">Add an element to the structure</p>
            </li>
            <li>
              <h3 className="font-semibold">Deletion</h3>
              <p className="text-gray-600">Remove an element from the structure</p>
            </li>
            <li>
              <h3 className="font-semibold">Access</h3>
              <p className="text-gray-600">Retrieve an element at a given position</p>
            </li>
            <li>
              <h3 className="font-semibold">Search</h3>
              <p className="text-gray-600">Find the position of a given element</p>
            </li>
          </ul>
        </section>

        {/* Time Complexity Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Time Complexity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-semibold">Access: <span className="font-mono">{data.timeComplexity.access}</span></p>
              <p className="font-semibold">Search: <span className="font-mono">{data.timeComplexity.search}</span></p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Insertion: <span className="font-mono">{data.timeComplexity.insertion}</span></p>
              <p className="font-semibold">Deletion: <span className="font-mono">{data.timeComplexity.deletion}</span></p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}