import { Logo } from './logo';
import { Search } from './search';
import { Actions } from './actions';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-16 z-[49] bg-card/95 backdrop-blur-sm border-b border-border px-4 lg:px-6 flex justify-between items-center">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};
