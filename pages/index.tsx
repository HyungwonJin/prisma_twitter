import React from "react";
import FloatingButton from "../components/floating-button";
import useUser from "../lib/client/useUser";

const Home = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7].map((card, i) => (
        <div>
          <div>
            <div></div>
            <span>Name</span>
          </div>
          <p>안녕하십니까?</p>
          <button>
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
          </button>
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
