import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const PAGE_SIZE = 10;

const loadOptions = async (search, loadedOptions, { page }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`
  );
  const posts = await response.json();

  const hasMore = posts.length === PAGE_SIZE;

  const options = posts.map((post) => ({
    label: post.title,
    value: post.id,
  }));

  return {
    options,
    hasMore,
    additional: {
      page: page + 1,
    },
  };
};

function App() {
  const [value, setValue] = useState(null);

  return (
    <div style={{ maxWidth: 600, margin: "100px auto" }}>
      <h2>Select a Post</h2>
      <AsyncPaginate
        value={value}
        loadOptions={loadOptions}
        onChange={setValue}
        additional={{ page: 1 }}
        isClearable
        placeholder="Scroll to load more posts..."
      />
    </div>
  );
}

export default App;
