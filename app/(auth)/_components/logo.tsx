import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="bg-white rounded-2xl p-4">
        <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>
      <div className={cn('flex flex-col items-center', font.className)}>
        <p className="text-3xl font-bold text-white">
          Punt
        </p>
        <p className="text-sm text-muted-foreground">Live Stream Platform</p>
      </div>
    </div>
  );
};
