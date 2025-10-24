import { Locator } from "playwright";

export type customType = blogItemChildrenTypes | suggestBlogItemChildrenTypes

export interface headerLabelTypes {
    title: string,
    subTitle: string
}

export interface blogItemChildrenTypes {
    thumbnail: string,
    blogTitle: string, 
    likeCount: string,
    commentCount: string,
    viewCount: string,
    author: string,
    description: string,
    button: string
};

export interface suggestBlogItemChildrenTypes {
    title: string, // tiêu đề bài viết
    description: string, // đoạn mô tả
    avatar: string, // ảnh người đăng
    author: string // tên người đăng
};