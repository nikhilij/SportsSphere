import React from "react";
import MainLayout from "../components/layout/MainLayout";

// Icon Components (using inline SVGs for simplicity)

const TrophyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-yellow-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.75 3.75 0 0012 10.5h0A3.75 3.75 0 007.5 14.25v4.5m9 0h-9"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 10.5V4.875M12 4.875a2.25 2.25 0 012.25 2.25H9.75A2.25 2.25 0 0112 4.875z"
    />
  </svg>
);

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-yellow-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.324l5.584.412a.563.563 0 01.31.988l-4.203 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.822.672l-4.994-2.997a.563.563 0 00-.624 0l-4.994 2.997a.562.562 0 01-.822-.672l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.31-.988l5.584-.412a.563.563 0 00.475-.324L11.48 3.5z"
    />
  </svg>
);

const MainGiftIcon = () => (
  // Renamed to avoid conflict
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-10 h-10 text-pink-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c2.755 0 5.055.98 6.835 2.601A4.5 4.5 0 0121 8.25v10.5a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5V8.25a4.5 4.5 0 012.665-4.049A10.458 10.458 0 0112 3zm0 0V.75M9.75 8.25h4.5M9.75 8.25a2.25 2.25 0 01-2.25-2.25M14.25 8.25a2.25 2.25 0 002.25-2.25M4.5 8.25V6M19.5 8.25V6"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 12.75h13.5" />
  </svg>
);

const ButtonGiftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c2.755 0 5.055.98 6.835 2.601A4.5 4.5 0 0121 8.25v10.5a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5V8.25a4.5 4.5 0 012.665-4.049A10.458 10.458 0 0112 3zm0 0V.75M9.75 8.25h4.5M9.75 8.25a2.25 2.25 0 01-2.25-2.25M14.25 8.25a2.25 2.25 0 002.25-2.25M4.5 8.25V6M19.5 8.25V6"
    />
  </svg>
);

const LockClosedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-green-700"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const rewardsData = [
  {
    id: 1,
    title: "Bronze Contributor",
    description: "Complete your profile and make 5 posts on SportsSphere.",
    points: "100 XP",
    icon: <TrophyIcon />,
    status: "unlocked", // can be "unlocked", "locked", "claimed"
  },
  {
    id: 2,
    title: "Weekly Streak Master",
    description: "Log in to SportsSphere 7 days in a row.",
    points: "50 XP",
    icon: <StarIcon />,
    status: "locked",
  },
  {
    id: 3,
    title: "Community Helper Award",
    description: "Answer 10 questions in the SportsSphere forum.",
    points: "150 XP",
    icon: <MainGiftIcon />,
    status: "claimed",
  },
  {
    id: 4,
    title: "First Challenge Victory",
    description: "Win your first official SportsSphere challenge.",
    points: "200 XP",
    icon: <TrophyIcon />,
    status: "locked",
  },
  {
    id: 5,
    title: "SportsSphere Power User",
    description: "Reach 1000 XP and engage daily for a month.",
    points: "Exclusive Badge",
    icon: <StarIcon />,
    status: "locked",
  },
  {
    id: 6,
    title: "Welcome to the Sphere!",
    description: "Awarded for successfully joining SportsSphere.",
    points: "25 XP",
    icon: <MainGiftIcon />,
    status: "claimed",
  },
];

const Rewards = () => {
  const handleClaimReward = (rewardId, rewardTitle) => {
    // In a real app, this would involve API calls and state updates
    console.log(`Attempting to claim reward: ${rewardTitle} (ID: ${rewardId})`);
    alert(`You've claimed "${rewardTitle}"! (This is a demo action)`);
    // Potentially update the reward status in local state or refetch data
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4 sm:p-6 lg:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Your Rewards Hub
          </h1>
          <p className="text-lg text-gray-700 mt-3 max-w-2xl mx-auto">
            Discover and claim exclusive rewards for your achievements and engagement in the SportsSphere community!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rewardsData.map((reward) => (
            <div
              key={reward.id}
              className={`bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 flex flex-col ${
                reward.status === "locked" ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <div className="p-6 flex-grow">
                <div className="flex items-start mb-5">
                  <div
                    className={`mr-4 p-3 rounded-full shadow-md bg-gradient-to-tr ${
                      reward.status === "claimed"
                        ? "from-green-100 to-green-200"
                        : reward.status === "unlocked"
                          ? "from-indigo-100 to-purple-200"
                          : "from-gray-100 to-gray-200"
                    }`}
                  >
                    {reward.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">{reward.title}</h2>
                    <p className="text-sm text-indigo-700 font-semibold">{reward.points}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 min-h-[60px]">{reward.description}</p>
              </div>

              <div className="p-5 bg-gray-50 border-t border-gray-200">
                {reward.status === "unlocked" && (
                  <button
                    onClick={() => handleClaimReward(reward.id, reward.title)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out flex items-center justify-center transform hover:-translate-y-0.5"
                  >
                    <ButtonGiftIcon /> <span className="ml-2">Claim Reward</span>
                  </button>
                )}
                {reward.status === "locked" && (
                  <div className="w-full bg-gray-200 text-gray-500 font-semibold py-3 px-4 rounded-lg flex items-center justify-center">
                    <LockClosedIcon /> <span className="ml-2">Locked</span>
                  </div>
                )}
                {reward.status === "claimed" && (
                  <div className="w-full bg-green-100 text-green-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center">
                    <CheckCircleIcon /> <span className="ml-2">Successfully Claimed</span>
                  </div>
                )}
              </div>
            </div>
          ))}{" "}
        </div>
      </div>
    </MainLayout>
  );
};

export default Rewards;
