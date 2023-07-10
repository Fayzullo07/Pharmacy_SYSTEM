import React from "react";
import "./Empty.css";
import { useTranslation } from "react-i18next";

const Empty = () => {
  const { t: g } = useTranslation("translation", { keyPrefix: "Global" });
  return (
    <div class="ticker-wrap">
      <div class="ticker">
        <span class="item-collection-1">
          <span class="item">
            {g(64)} ➜
          </span>
          <span class="item">
            {g(65)} ➜
          </span>
          <span class="item">
            {g(64)} ➜
          </span>
          <span class="item">
            {g(65)} ➜
          </span>
        </span>
        <span class="item-collection-2">
          <span class="item">
            {g(64)} ➜
          </span>
          <span class="item">
            {g(65)} ➜
          </span>
          <span class="item">
            {g(64)} ➜
          </span>
          <span class="item">
            {g(65)} ➜
          </span>
        </span>
      </div>
    </div>
  );
};

export default Empty;
