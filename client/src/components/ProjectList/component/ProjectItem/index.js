import styles from "./ProjectItem.module.scss";
import React, { useState } from "react";
import classNames from "classnames/bind";
import TippyAction from "../TippyAction";

const cx = classNames.bind(styles);
const ProjectItem = ({ project }) => {
  const { id, title, leader, target } = project;
  const [checkedItems, setCheckedItems] = useState(false);
  const handleChange = () => {
    setCheckedItems(!checkedItems);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("task-status")}>
          <input
            type="checkbox"
            checked={checkedItems}
            onChange={handleChange}
          />
        </div>
        <div className={cx("task-info-container")}>
          <div className={cx("task-header")}>
            <div className={cx("task-title")}>{title}</div>
            <TippyAction id={id}>
              <div className={cx("action-button")}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </TippyAction>
          </div>
          <div className={cx("task-body")}>
            <div className={cx("task-target")}>
              <span>{target}</span>
            </div>
            <div className={cx("task-incharge")}>
              {leader && (
                <div className={cx("incharge-container")}>
                  <div className={cx("incharge-info")}>
                    <img src={leader.avatar} alt={leader.username} />
                    <div className={cx("incharge-name")}>{leader.fullname}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
