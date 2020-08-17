import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DefaultProfile from "../assets/img/avatar.jpg";
import { API } from "../config";

class ProfileTabs extends Component {
  render() {
    const { following, followers, posts } = this.props;
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-4">
            <h3 className="text-primary">{followers.length} Followers</h3>
            <hr />
            {followers.map((person, i) => (
              <div key={i}>
                <Fragment>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      src={`${API}/user/photo/${person._id}`}
                      alt={person.name}
                    />
                    <Fragment>
                      <p className="lead">{person.name}</p>
                    </Fragment>
                  </Link>
                </Fragment>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">{following.length} Following</h3>
            <hr />
            {following.map((person, i) => (
              <div key={i}>
                <Fragment>
                  <Link to={`/user/${person._id}`}>
                    <img
                      style={{
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                      className="float-left mr-2"
                      height="30px"
                      width="30px"
                      onError={(i) => (i.target.src = `${DefaultProfile}`)}
                      src={`${API}/user/photo/${person._id}`}
                      alt={person.name}
                    />
                    <Fragment>
                      <p className="lead">{person.name}</p>
                    </Fragment>
                  </Link>
                </Fragment>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <h3 className="text-primary">{posts.length} Posts</h3>
            <hr />
            {posts.map((post, i) => (
              <div key={i}>
                <Fragment>
                  <Link to={`/post/${post._id}`}>
                    <Fragment>
                      <p className="lead">{post.title}</p>
                    </Fragment>
                  </Link>
                </Fragment>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProfileTabs;
