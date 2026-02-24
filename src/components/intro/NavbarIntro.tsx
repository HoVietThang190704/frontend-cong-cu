import Link from 'next/link';
import React from 'react';
import Icon from '@/src/components/ui/icon';
import { APP_PATHS } from '@/src/lib/constants/app-paths';
import { ICONS } from '@/src/lib/constants/icons';
import { LOGO_SIZE } from '@/src/lib/constants/size';

const NAV_ITEMS = [
  { label: 'Trang chủ', href: APP_PATHS.MAIN },
  { label: 'Bảng xếp hạng', href: APP_PATHS.RANKING },
  { label: 'Cộng đồng', href: APP_PATHS.COMMUNITY },
];

export default function NavbarIntro() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-3 bg-black">
      <Link href={APP_PATHS.MAIN} className="flex items-center">
        <Icon
          name={ICONS.LOGO}
          alt="Logo"
          width={LOGO_SIZE.WIDTH}
          height={LOGO_SIZE.HEIGHT}
        />
      </Link>

      <nav className="flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-white hover:text-cyan-400 hover:underline transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href={APP_PATHS.LOGIN}
        className="inline-flex items-center justify-center px-3 py-1 rounded-md font-medium bg-gradient-to-r from-orange-400 to-yellow-400 text-black hover:opacity-90"
      >
        Đăng nhập
      </Link>
    </header>
  );
}
