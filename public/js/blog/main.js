loadBtn = document.getElementById("load-btn");
let offset = 0;
let limit = 4;

const fetchData = async () => {
    const data = await fetch(`/api/blogs/?offset=${offset}&limit=${limit}`);
    const blogs = await data.json();
    offset += 4;
    for(let i of blogs){
        const heading = document.createElement('h4');
        heading.innerText = i.title;
        const para = document.createElement('p');
        para.innerText = String(i.body).slice(0, 40);
        para.innerText += "....";
        const blogPost = document.createElement('a');
        blogPost.setAttribute("id", `bId-${i.blog_id}`);
        blogPost.classList.add("blogs");
        blogPost.appendChild(heading);
        blogPost.appendChild(para);
        blogPost.href = `/blogs/${i.blog_id}`;
        console.log(blogPost.href);
        document.getElementById("blog-posts").appendChild(blogPost);
    }
}
fetchData();

loadBtn.addEventListener("click", () => {
    fetchData();
})