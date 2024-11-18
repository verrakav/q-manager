"use client";
import {SignOutButton, useUser} from "@clerk/nextjs";
// import {currentUser} from "@clerk/nextjs/server";
import Link from "next/link";
import Image from "next/image";

import React from "react";

export default function User() {
  const {isSignedIn, user} = useUser();
  //   const user = currentUser();
  //   console.log(user);
  return (
    <div className="flex items-center">
      {isSignedIn ? (
        <div className="flex flex-row m-8">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={user.imageUrl} // Clerk's profile image URL
              alt="User Profile"
              className="w-full h-full object-cover"
              width={16}
              height={16}
            />
          </div>
          <SignOutButton className="ml-2 text-l text-bluestone-200 border-2 border-bluestone-200 rounded-[5px] p-2 hover:bg-bluestone-200 hover:text-shell-100">
            Sign out
          </SignOutButton>
        </div>
      ) : (
        <Link
          href="/login"
          className="m-8 text-l text-bluestone-200 border-2 border-bluestone-200 rounded-[5px] p-2 hover:bg-bluestone-200 hover:text-shell-100">
          Sign In
        </Link>
      )}
    </div>
  );
}
