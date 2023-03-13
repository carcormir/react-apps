import "./App.css";
import TwitterFollowCard from "./Components/TwitterFollowCard";

const users = [
  {
    userName: "youtube",
    mainName: "YouTube",
    isFollowing: true,
  },
  {
    userName: "instagram",
    mainName: "Instagram",
    isFollowing: false,
  },
  {
    userName: "facebook",
    mainName: "FaceBook",
    isFollowing: true,
  },
  {
    userName: "google",
    mainName: "Google",
    isFollowing: false,
  },
];

function App() {
  return (
    <section className="App">
      {users.map(({ userName, mainName, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {mainName}
        </TwitterFollowCard>
      ))}
    </section>
  );
}

export default App;
