import Link from 'next/link';
import { User } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';

import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';

interface ResultCardProps {
  data: {
    user: User;
    isLive: boolean;
    name: string;
    thumbnailUrl: string | null;
  };
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="group h-full w-full space-y-4 cursor-pointer">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 group-hover:border-white/50 group-hover:shadow-lg">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          />
        </div>
        <div className="flex gap-x-3 px-1">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden min-w-0">
            <p className="truncate font-semibold text-white group-hover:text-white transition-colors">
              {data.name}
            </p>
            <p className="text-muted-foreground text-xs">{data.user.username}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="h-full w-full space-y-4">
      <div className="relative overflow-hidden rounded-lg border border-border bg-card">
        <ThumbnailSkeleton />
      </div>
      <div className="flex gap-x-3 px-1">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-2 min-w-0">
          <Skeleton className="h-4 w-32 bg-muted" />
          <Skeleton className="h-3 w-24 bg-muted" />
        </div>
      </div>
    </div>
  );
};
