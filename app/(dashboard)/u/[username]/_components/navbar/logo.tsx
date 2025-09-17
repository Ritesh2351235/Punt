import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-3 hover:opacity-75 transition">
        <div className="bg-white rounded-lg p-2 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        <div className={cn('hidden lg:block', font.className)}>
          <p className="text-xl font-bold text-white">
            Punt
          </p>
          <p className="text-xs text-muted-foreground">Creator Dashboard</p>
        </div>
      </div>
    </Link>
  );
};
