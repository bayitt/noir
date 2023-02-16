
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateArticleInput {
    category_uuid?: Nullable<string>;
    title: string;
    content?: Nullable<string>;
    featured_image?: Nullable<Upload>;
    status?: Nullable<boolean>;
    tags?: Nullable<Nullable<string>[]>;
}

export interface UpdateArticleInput {
    uuid: string;
    category_uuid?: Nullable<string>;
    title?: Nullable<string>;
    content?: Nullable<string>;
    featured_image?: Nullable<Upload>;
    status?: Nullable<boolean>;
    tags?: Nullable<Nullable<string>[]>;
}

export interface GetArticlesInput {
    page?: Nullable<number>;
    count?: Nullable<number>;
    isAdmin?: Nullable<boolean>;
}

export interface GetArticlesByCategorySlugInput {
    category_slug: string;
    page?: Nullable<number>;
    count?: Nullable<number>;
}

export interface GetArticleInput {
    slug: string;
    isAdmin?: Nullable<boolean>;
}

export interface UpdateCategoryInput {
    uuid: string;
    name?: Nullable<string>;
    slug?: Nullable<string>;
}

export interface Article {
    uuid: string;
    category?: Nullable<Category>;
    title: string;
    slug: string;
    status: boolean;
    content?: Nullable<string>;
    featured_image?: Nullable<string>;
    tags?: Nullable<Nullable<Tag>[]>;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface IMutation {
    createArticle(input?: Nullable<CreateArticleInput>): Nullable<Article> | Promise<Nullable<Article>>;
    updateArticle(input?: Nullable<UpdateArticleInput>): Nullable<Article> | Promise<Nullable<Article>>;
    deleteArticle(uuid: string): Nullable<Article> | Promise<Nullable<Article>>;
    createCategory(name?: Nullable<string>): Nullable<Category> | Promise<Nullable<Category>>;
    updateCategory(input?: Nullable<UpdateCategoryInput>): Nullable<Category> | Promise<Nullable<Category>>;
    deleteCategory(uuid: string): Nullable<Category> | Promise<Nullable<Category>>;
    login(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export interface ArticlesResponse {
    articles?: Nullable<Nullable<Article>[]>;
    pagination?: Nullable<Pagination>;
}

export interface IQuery {
    getArticles(input?: Nullable<GetArticlesInput>): Nullable<ArticlesResponse> | Promise<Nullable<ArticlesResponse>>;
    getArticlesByCategorySlug(input?: Nullable<GetArticlesByCategorySlugInput>): Nullable<ArticlesResponse> | Promise<Nullable<ArticlesResponse>>;
    getArticle(input?: Nullable<GetArticleInput>): Nullable<Article> | Promise<Nullable<Article>>;
    getCategory(): Nullable<Category> | Promise<Nullable<Category>>;
    getCategories(): Nullable<Nullable<Category>[]> | Promise<Nullable<Nullable<Category>[]>>;
    dummy(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export interface Category {
    uuid: string;
    name: string;
    slug: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface AuthResponse {
    email: string;
    token: string;
}

export interface Pagination {
    currentPage: number;
    lastPage: number;
}

export interface Tag {
    uuid: string;
    name: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export type DateTime = any;
export type Upload = any;
type Nullable<T> = T | null;
