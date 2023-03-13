import { useState } from "react";
import "./styles.css"

export default function TwitterFollowCard({children, userName, initialIsFollowing}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  
  const text = isFollowing ? "Following" : "Follow"
  const buttonClassName = isFollowing
    ? 'tw-follow-card-button is-following'
    : 'tw-follow-card-button'

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }
  
  return (
    <article className="tw-follow-card">
      <header className="tw-follow-card-header">
        <img
          className="tw-follow-card-img"
          alt={`${userName} avatar`}
          src={`https://unavatar.io/${userName}`}
        />
        <div className="tw-follow-card-info">
          <strong>{children}</strong>
          <span className="tw-follow-card-info-user-name">@{userName}</span>
        </div>
      </header>
      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <span className="tw-follow-card-button-text">{text}</span>
          <span className="tw-follow-card-button-text-unfollow">Unfollow</span>
        </button>
      </aside>
    </article>
  );
}
