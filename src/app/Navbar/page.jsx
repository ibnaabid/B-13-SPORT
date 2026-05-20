"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { useState, useRef } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const initials = session?.user?.name
    ?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) ?? "U";

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 text-white backdrop-blur animate__animated animate__fadeInDown">
      <div className="navbar mx-auto max-w-7xl px-4 lg:px-8 h-20">

        {/* লোগো */}
        <div className="navbar-start flex items-center gap-3">
          {/* <Link href="/" className="flex items-center gap-3"> */}
            <Image
              src="/assests/michael-ungacta-pjznukSy87o-unsplash.jpg"
              height={45} width={45} alt="logo"
              className="h-11 w-11 rounded-xl object-cover border border-emerald-500/30"
            />
            <Link href="">
            <span className="text-xl font-black tracking-tight uppercase select-none">
              FUZIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">Nest</span>
            </span>
          </Link>
        </div>

        {/* নেভ লিংক */}
        <div className="navbar-center hidden xl:flex">
          <ul className="menu animated_animated animate__fadeOutDown menu-horizontal gap-1 font-medium text-sm">
            <li><Link href="/" className="relative hover:text-emerald-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">Home</Link></li>
            <li><Link href="/facilities" className="relative hover:text-emerald-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">All Facilities</Link></li>
            {session?.user && (
              <>
                <li><Link href="/booking" className="relative hover:text-emerald-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">My Booking</Link></li>
                <li><Link href="/add" className="relative hover:text-emerald-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">Add Facilities</Link></li>
                <li><Link href="/manage" className="relative hover:text-emerald-400 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-emerald-400 after:transition-all after:duration-300 hover:after:w-full">Manage Facilities</Link></li>
              </>
            )}
          </ul>
        </div>

        {/* Auth Section */}
        {session?.user ? (
          <div className="navbar-end relative">
            <button
              onClick={() => setOpen((p) => !p)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 h-10 transition-all"
            >
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 flex items-center justify-center text-slate-950 text-xs font-bold">
                {initials}
              </div>
              <span className="text-sm font-medium hidden sm:block max-w-[120px] truncate">
                {session?.user?.name}
              </span>
            </button>

            {open && (
              <div className="absolute right-0 top-12 w-52 rounded-xl border border-white/10 bg-slate-900 shadow-xl overflow-hidden z-50">
                <p className="px-4 py-3 text-xs text-white/50 border-b border-white/10 truncate">
                  {session?.user?.email}
                </p>
                <Link href="/booking" onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-emerald-400 transition-colors">
                  My Bookings
                </Link>
                <Link href="/add" onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-emerald-400 transition-colors">
                  Add Facility
                </Link>
                <Link href="/manage" onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-emerald-400 transition-colors">
                  Manage My Facilities
                </Link>
                <button onClick={logout}
                  className="flex w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 border-t border-white/10 transition-colors">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="navbar-end flex items-center gap-2">
            <Link href="/login">
              <Button className="border border-white/10 bg-white/5 text-white hover:bg-white/10 font-semibold px-4 h-10 rounded-xl text-sm transition-all">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-emerald-500 to-lime-500 text-slate-950 font-bold px-4 h-10 rounded-xl text-sm transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;