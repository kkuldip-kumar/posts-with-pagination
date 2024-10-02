import React, { useMemo } from "react";
import style from "./post.module.css";
const PostItem = ({ data }) => {
  return (
    <div className={style.post}>
      <div key={data.id}>
        <div className="top">
          <h2>{data.name}</h2>
          <p>{data.brewery_type}</p>
        </div>
        <div className="main_b">
          <h2>Location :</h2>
          <span>{data.street}</span>,<span>{data.state}</span>,
          <span>{data.country}</span>,<span>{data.postal_code}</span>,
        </div>
        <div className="bottom_b">
          {data.website_url ? (
            <h2>
              URL : <a href={data.website_url}>{data.website_url}</a>
            </h2>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
