let offset = 0;
const limit = 4;
const delImg = document.createElement('img');
delImg.src = "/svg/yourPost/delete.svg";
delImg.classList.add("delete");
const editImg = document.createElement('img');
editImg.src = "svg/yourPost/edit.svg";
editImg.classList.add("edit");
const loadBtn = document.getElementById("load-btn");
const userId = document.getElementById("user-id").innerText;
const blogPost = document.getElementById("blog-posts");
console.log(userId);


const fetchData = async () => {
    const data = await fetch(`/api/blogs/?offset=${offset}&limit=${limit}&userID=${userId}`);
    const blogs = await data.json();
    offset += 4;
    for(let i of blogs){
        const blogId = i.blog_id;
        const heading = document.createElement('h4');
        heading.innerText = i.title;
        const para = document.createElement('p');
        para.innerText = String(i.body).slice(0, 40);
        para.innerText += "....";
        const blogLeft = document.createElement('div');
        blogLeft.classList.add("blog-left");
        blogLeft.appendChild(heading);
        blogLeft.appendChild(para);
        const delPost = document.createElement('a');
        delPost.href = `/api/deleteBlog/${blogId}`;
        const delImgClone = delImg.cloneNode(true);
        delPost.appendChild(delImgClone);
        const editPost = document.createElement('a');
        editPost.href = `/`;
        const editImgClone = editImg.cloneNode(true);
        editPost.appendChild(editImgClone);
        const blogRight = document.createElement('div');
        blogRight.classList.add("blog-right");
        blogRight.appendChild(delPost);
        blogRight.appendChild(editPost);

        const blogDiv =document.createElement('a');
        blogDiv.classList.add("blog");
        blogDiv.appendChild(blogLeft);
        blogDiv.appendChild(blogRight);
        blogDiv.href = `/blogs/${i.blog_id}`;
        blogPost.appendChild(blogDiv);
    }
}
fetchData();

loadBtn.addEventListener("click", () => {
    fetchData();
})