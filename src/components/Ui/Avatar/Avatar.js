import React, { memo } from "react";
import { AVATAR_PIC_BASE_URL } from "../../../data/constants";
import styles from "./Avatar.module.css";

function Avatar({ src = AVATAR_PIC_BASE_URL, alt }) {
  return (
    <div>
      <img
        className={styles.avatar}
        alt={alt || "avatar"}
        src={src?.length ? src : AVATAR_PIC_BASE_URL}
      />
    </div>
  );
}

export default memo(Avatar);
