export default function BreedDetail({ params }: { params: { type: string; id: number } }) {
    const { type, id } = params;
    
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Result page for Make ID</h1>
        <p>{type}</p>
        <p>{id}</p>
      </main>
    );
  }