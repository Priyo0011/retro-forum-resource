const allPost = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  const posts = data.posts;
  displayPosts(posts);
};

const displayPosts = (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.textContent = "";
  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = `flex items-center gap-10 border-2 p-6 rounded-lg w-[960px] mb-10`;
    let active = post.isActive ? "bg-green-700" : "bg-red-700";
    postCard.innerHTML = `
          <div class="indicator">
              <span id="active-color" class="indicator-item badge ${active}">
              </span>
              <div class="grid w-20 h-20 bg-base-300 place-items-center">
                  <img src="${post.image}" alt="">
              </div>
          </div>
          <div>
              <div class="flex gap-16 mb-4">
                  <p class="font-bold"># ${post.category} </p>
                  <p class="font-bold">Author : ${post.author.name}</p>
              </div>
              <h2 class="text-2xl font-bold mb-4">${post.title}</h2>
              <p>${post.description}</p>
              <hr class="m-4">
              <div class="flex justify-between">
                  <div class="mt-4 flex justify-start gap-4 lg:gap-8">
                      <div class="flex gap-2">
                          <img src="images/Group 13.png" alt="">
                          ${post.comment_count}
                      </div>
                      <div class="flex gap-2">
                          <img src="images/Group 16.png" alt="">
                          ${post.view_count}
                      </div>
                      <div class="flex gap-2">
                          <img src="images/Group 18.png" alt="">
                          ${post.posted_time}
                      </div>
                  </div>
                  <button class="read-more-btn" data-postid="${post.id}"><img src="images/Group 40106.png" alt=""></button>
              </div>
          </div>
          `;
    postContainer.appendChild(postCard);
  });
  toggleLoadingSpinner(false);

  let readCount = 0;
  document.querySelectorAll(".read-more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      readCount++;
      document.getElementById("readCount").innerText = `(${readCount})`;
    });
  });
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const postId = button.getAttribute("data-postid");
      const postDetails = posts.find((post) => post.id === parseInt(postId));
      displayPostDetails(postDetails);
    });
  });
};

const displayPostDetails = (postDetails) => {
  const postDetailsContainer = document.getElementById("postDetails");
  postDetailsContainer.innerHTML += `
      <div class="flex justify-between gap-10 p-8">
          <div class="font-bold">${postDetails.title}</div>
          <div>
              <img src="images/Group 16.png" alt="">
          </div>
          <div>${postDetails.view_count}</div>
      </div>
    `;
};

const handleSearch = () => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  allPost(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const LoadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    LoadingSpinner.classList.remove("hidden");
  } else {
    LoadingSpinner.classList.add("hidden");
  }
};

handleSearch();

const latestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();
  const posts = data;

  displayPosts2(posts);
};
const postContainer2 = document.getElementById("post-container2");

const displayPosts2 = (posts) => {
  posts.forEach((post) => {
    console.log(post);
    const postCard2 = document.createElement("div");
    postCard2.classList = `items-center gap-10 border-2 p-6 rounded-lg `;
    postCard2.innerHTML = `
        <img class="rounded-lg" src="${post.cover_image}" alt="">
        <div class="flex gap-4 mt-4">
            <img src="images/Frame (5).png" alt="">
            <p>${post.author.posted_date ? "29 January 2024" : "no date"}</p>
        </div>
        <h1 class="text-xl font-bold mt-4">${post.title}
        </h1>
        <p class="mt-4">${post.description}</p>
        <div class="flex mt-4 gap-6">
            <div class="mt-2">
                <img class="h-10 w-10 rounded-full" src="${
                  post.profile_image
                }" alt="">
            </div>
            <div>
                <p class="font-bold">${post.author.name}</p>
                <p>${post.author.designation}</p>
            </div>
        </div>
        `;
    postContainer2.appendChild(postCard2);
  });
};
latestPost();

allPost("Comedy");