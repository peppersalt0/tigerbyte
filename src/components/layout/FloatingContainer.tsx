interface FloatingContainerProps {
  children?: React.ReactNode;
}

export default function FloatingContainer({ children }: FloatingContainerProps) {
  return (
    <div className="relative z-10 flex justify-center px-4 py-6 h-[calc(100vh-4rem)]">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-[90%] p-6 md:p-8 h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
