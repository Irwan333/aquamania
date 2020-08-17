import React, { Component } from "react";
import { list } from "./ApiPost";
import DefaultPost from "../assets/img/image-not-found.jpg";
import DefaultProfile from "../assets/img/avatar.jpg";
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import { API } from "../config";
import styles from "../assets/style/Post.module.css";
import { Post } from "../core/landing";
import { isAuth } from "../helper";

class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      page: 1,
    };
  }

  loadPosts = (page) => {
    list(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    this.loadPosts(this.state.page);
  }

  loadMore = (number) => {
    this.setState({ page: this.state.page + number });
    this.loadPosts(this.state.page + number);
  };

  loadLess = (number) => {
    this.setState({ page: this.state.page - number });
    this.loadPosts(this.state.page - number);
  };

  renderPosts = (posts) => {
    return (
      <div className={styles.Containercard}>
        {posts.map((post, i) => {
          const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
          const posterName = post.postedBy ? post.postedBy.name : " Unknown";

          return (
            <div key={i} className={styles.card}>
              <div className={styles.cardheader}>
                <img
                  src={`${API}/post/photo/${post._id}`}
                  alt={post.title}
                  onError={(i) => (i.target.src = `${DefaultPost}`)}
                />
              </div>
              <div className={styles.cardbody}>
                <h4>
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </h4>
                <p>{post.body.substring(0, 100)}</p>
                <div className={styles.user}>
                  <img
                    onError={(i) => (i.target.src = `${DefaultProfile}`)}
                    src={`${API}/user/photo/${post.postedBy._id}`}
                    alt={post.postedBy.name}
                  />
                  <div className={styles.userinfo}>
                    <h5>
                      <Link to={posterId}> {posterName} </Link>
                    </h5>
                    <small>{new Date(post.created).toDateString()}</small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { posts, page } = this.state;
    return (
      <Menu>
        {!isAuth() && <Post />}
        <div className="container">
          <h2 className="mt-5 mb-5">
            {!posts.length ? "No more posts!" : "Recent Posts"}
          </h2>

          {this.renderPosts(posts)}

          {page > 1 ? (
            <button
              className="btn btn-raised btn-warning mr-5 mt-5 mb-5"
              onClick={() => this.loadLess(1)}
            >
              Previous ({this.state.page - 1})
            </button>
          ) : (
            ""
          )}

          {posts.length ? (
            <button
              className="btn btn-raised btn-success mt-5 mb-5"
              onClick={() => this.loadMore(1)}
            >
              Next ({page + 1})
            </button>
          ) : (
            ""
          )}
        </div>
      </Menu>
    );
  }
}

export default Posts;
