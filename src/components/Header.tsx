export const Header = () => {
  return (
    <header className="dashboard__header">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__user">
        <p className="dashboard__fullname">Jonathan Valencia</p>
        <div className="dashboard__avatar">
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="Jonathan Valencia"
            className="dashboard__avatar-image"
          />
        </div>
      </div>
    </header>
  );
};
