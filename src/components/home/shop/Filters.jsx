import React, { useContext, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context/Context";
import "./styles.scss";

function Filter({
  getFilterUrl,
  brand,
  size,
  color,
  category,
  price,
  countProducts,
}) {
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const { categories, sizes } = state;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 210,
      },
    },
  };

  //=========
  //SEARCH BOX
  //=========
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/?query=${query}` : "/");
  };

  //============
  //FILTERS
  //===========
  const [selectedCategories, setSelectedCategories] = useState(
    category === "all" ? [] : category.split(",")
  );
  const [selectedSizes, setSelectedSizes] = useState(
    size === "all" ? [] : size.split(",")
  );

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    navigate("/");
  };

  return (
    <>
      <div className="category light_shadow">
        <div className="chead d_flex">
          <h3>Filter {countProducts === 0 ? "No" : countProducts} Items</h3>
        </div>
        <div className="filter-med c_flex">
          <div className="product_filter ">
            <small>Category</small>
            <FormControl
              variant="filled"
              size="small"
              className="formControl_width"
            >
              <Select
                labelId="mui-price-select-label"
                id="mui_simple_select"
                value={selectedCategories}
                multiple
                MenuProps={MenuProps}
                SelectDisplayProps={{
                  style: { paddingTop: 8, paddingBottom: 8 },
                }}
                onChange={(e) => {
                  const selectedValues = e.target.value;
                  setSelectedCategories(selectedValues);
                  navigate(getFilterUrl({ category: selectedValues }));
                }}
              >
                {categories?.map((c, index) => (
                  <MenuItem
                    key={index}
                    id="MuiMenuItem-root"
                    value={c.category}
                    disabled={c.disabled}
                  >
                    {c.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="product-size product_filter">
            <small>Size</small>
            <div className="product-size-btn">
              <FormControl
                variant="filled"
                size="small"
                className="formControl_width"
              >
                <Select
                  labelId="mui-price-select-label"
                  id="mui_simple_select"
                  value={selectedSizes}
                  multiple
                  MenuProps={MenuProps}
                  SelectDisplayProps={{
                    style: { paddingTop: 8, paddingBottom: 8 },
                  }}
                  onChange={(e) => {
                    const selectedValues = e.target.value;
                    setSelectedSizes(selectedValues);
                    navigate(getFilterUrl({ size: selectedValues }));
                  }}
                >
                  {sizes?.map((s, index) => (
                    <MenuItem
                      key={index}
                      id="MuiMenuItem-root"
                      value={s.size}
                      disabled={s.disabled}
                    >
                      {s.size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="product_filter ">
            <small>Search</small>
            <form
              action=""
              onSubmit={submitHandler}
              className="search_box a_flex"
            >
              <i className="fa fa-search" onClick={submitHandler}></i>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="search"
                className="search_filter"
                placeholder="Search..."
              />
            </form>
          </div>
          <div className="box  btn_primary" onClick={handleClearAll}>
            <button className="filter_btn">Clear All</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
