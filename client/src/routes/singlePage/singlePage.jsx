import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [Saved, setSaved] = useState(post.isSaved);
  

  const [postDetails] = post?.postDetails;

  const formatDistance = (distance) => {
    if (!distance) return "Not specified";
    return distance >= 1000
      ? `${(distance / 1000).toFixed(1)} km away`
      : `${distance} m away`;
  };

  const handleSave = async () => {

    if (!currentUser) {
      navigate("/login");
    }

    try {
      await apiRequest.post("/users/save", { postId: post.id });
      setSaved(prev => !prev)

    } catch (error) {

      setSaved(prev => !prev)
      console.log(error);
      
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="Location pin" />
                  <span>
                    {post.address}, {post.city}
                  </span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img
                  src={
                    post.user?.avatar ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ68D1zB62HiAWZAkQpessCgGpmfvJQUX8Rhg&s"
                  }
                  alt={post.user?.username || "User Avatar"}
                />
                <span>{post.user?.username || "Anonymous"}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(postDetails.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            {[
              {
                img: "/utility.png",
                label: "Utilities",
                value: postDetails.utilities,
              },
              { img: "/pet.png", label: "Pet Policy", value: postDetails.pet },
              {
                img: "/fee.png",
                label: "Property Fees",
                value: postDetails.income,
              },
            ].map((feature, index) => (
              <div className="feature" key={index}>
                <img src={feature.img} alt={feature.label} />
                <div className="featureText">
                  <span>{feature.label}</span>
                  <p>{feature.value || "Not specified"}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            {[
              {
                img: "/size.png",
                label: "Size",
                value: `${postDetails.size || "Not specified"} sqft`,
              },
              { img: "/bed.png", label: "Beds", value: `${post.bedroom} beds` },
              {
                img: "/bath.png",
                label: "Bathrooms",
                value: `${post.bathroom} bathrooms`,
              },
            ].map((size, index) => (
              <div className="size" key={index}>
                <img src={size.img} alt={size.label} />
                <span>{size.value}</span>
              </div>
            ))}
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            {[
              {
                img: "/school.png",
                label: "School",
                distance: postDetails.school,
              },
              { img: "/bus.png", label: "Bus Stop", distance: postDetails.bus },
              {
                img: "/restaurant.png",
                label: "Restaurant",
                distance: postDetails.restaurant,
              },
            ].map((place, index) => (
              <div className="feature" key={index}>
                <img src={place.img} alt={place.label} />
                <div className="featureText">
                  <span>{place.label}</span>
                  <p>{formatDistance(place.distance)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="Chat" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{backgroundColor: Saved ? "yellow" : "white"}}>
              <img src="/save.png" alt="Save" />
              
              {Saved ? "placed Saved"  : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
