import LeftAbout from "./LeftAbout";
import RightAbout from "./RightAbout";

function HomeAbout() {
  return (
    <div className="container-fluid homeabout">
      <div className="row">
        <div className="col">
          <LeftAbout />
        </div>
        <div className="col">
          <RightAbout />
        </div>
      </div>
    </div>
  );
}

export default HomeAbout;
