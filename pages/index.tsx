import React from "react";
import FloatingButton from "../components/floating-button";
import useUser from "../lib/client/useUser";
import useSWR from "swr";
import {Fav, Twit, User} from "@prisma/client";
import Link from "next/link";

interface TwitWithFav extends Twit {
  Fav: Fav[];
  user: User;
}

interface TwitResponse {
  ok: boolean;
  twit: TwitWithFav[];
}

const Home = () => {
  const { user } = useUser();
  const { data } = useSWR<TwitResponse>("/api/twits");
  const clickEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.id);
  };
  console.log(data)
  return (
    <div className="py-10">
      {data?.twit?.map((card, idx) => (
        <div className={`border border-x-0 ${idx === data?.twit.length - 1 ? "border-b" : "border-b-0"}`}>
          <Link href={`/twits/${card.id}`}>
            <div className="cursor-pointer py-2">
              <div className="py-2">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-slate-400 rounded-full"></div>
                  <span>{card.user.userId}</span>
                </div>
              </div>
              <p>{card.description}</p>
            </div>
          </Link>
          <div className="flex pb-2">
            <button onClick={clickEvent} id={card.id + ""} className="ml-auto pr-5">
              {card.Fav.map((el) => el.userId === user.id)[0] ? (
                <svg
                  className="h-6 w-6 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z"></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      ))}
      <FloatingButton href="/twits/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </div>
  );
};

export default Home;
