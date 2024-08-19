import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function ListPage() {
  const posts = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading data ........</p>}>
            <Await
              resolve={posts.postResponse}
              errorElement={<p>Error loading package location!</p>}
            >
              {(postResponse) =>
                postResponse.data.posts.map((post) => (
                  <Card key={post.id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
      <Suspense fallback={<p>Loading data ........</p>}>
            <Await
              resolve={posts.postResponse}
              errorElement={<p>Error loading package location!</p>}
            >
              {(postResponse) =>
               <Map items={postResponse.data.posts} />
              }
            </Await>
          </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
