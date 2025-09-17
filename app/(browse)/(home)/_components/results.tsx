import { Skeleton } from '@/components/ui/skeleton';

import { getStreams } from '@/lib/feed-service';
import { ResultCard, ResultCardSkeleton } from './result-card';

export const Results = async () => {
  console.log('🏠 [HOME] Loading streams data...');
  const data = await getStreams();
  console.log('📺 [HOME] Streams loaded:', {
    count: data.length,
    streams: data.map(s => ({ id: s.id, name: s.name, isLive: s.isLive }))
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Live Streams
        </h2>
        <p className="text-muted-foreground">
          Discover amazing content from creators around the world
        </p>
      </div>
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold mb-2">No streams found</h3>
          <p className="text-muted-foreground text-sm">
            Be the first to go live on Punt!
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
