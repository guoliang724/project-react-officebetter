import React, { useState } from "react";
import { Input, Radio, message } from "antd";

import "./index.css";

const { Search } = Input;
export default function Searchbar() {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const onSearch = (value) => {
    message.success(value);
  };
  const options = [
    { label: "New Order", value: "order" },
    { label: "New Customer", value: "customer" },
  ];
  return (
    <div className="content-searchbar">
      <Search
        allowClear
        className="searchbar"
        placeholder="Search"
        onSearch={onSearch}
        enterButton
      />
      <Radio.Group
        options={options}
        onChange={handleChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      ></Radio.Group>
    </div>
  );
}
