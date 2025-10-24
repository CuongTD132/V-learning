import {  blogItemChildrenTypes, headerLabelTypes, suggestBlogItemChildrenTypes } from "../type/blogTypes";

export const headerLabelData: headerLabelTypes = {
    title: "Blog",
    subTitle: "Thông tin công nghệ số!!!"
}

export const blogItemChildrenSelectors: blogItemChildrenTypes = {
    thumbnail: '.cardBlogContent .imgCardBlog img',
    blogTitle: '.cardBlogContent h6', 
    likeCount: '.cardBlogContent .timeBlogCourse .reviewBlog span:nth-child(1)',
    commentCount: '.cardBlogContent .timeBlogCourse .reviewBlog span:nth-child(2)',
    viewCount: '.cardBlogContent .timeBlogCourse .reviewBlog span:nth-child(3)',
    author:'.cardBlogContent .timeBlogCourse p span',
    description: '.cardBlogContent p.colorCardTitle',
    button: '.cardBlogContent .btnGlobal.btnCardBlog a'
};



export const suggestBlogItemChildrenSelectors: suggestBlogItemChildrenTypes = {
    title: '> h6', // tiêu đề bài viết
    description: '> p.colorCardTitle', // đoạn mô tả
    avatar: '.imgPost > img', // ảnh người đăng
    author: '.imgPost > span.colorCardTitle' // tên người đăng
};
