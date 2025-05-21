"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <header className="navbar">
      <nav>
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={32}
            height={32}
          />
          <h1>SnapCast</h1>
        </Link>

        {user && (
          <figure>
            <button onClick={() => router.push(`/profile/${user.id}`)}>
              <Image
                src={user.image || ""}
                alt="User"
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>
            <button onClick={handleLogOut}>
              <Image
                src="/assets/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
