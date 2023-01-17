
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
    created_at: DateTime;
    updated_at: DateTime;
}

export interface IMutation {
    createArticle(input?: Nullable<CreateArticleInput>): Nullable<Article> | Promise<Nullable<Article>>;
    createCategory(name?: Nullable<string>): Nullable<Category> | Promise<Nullable<Category>>;
    updateCategory(input?: Nullable<UpdateCategoryInput>): Nullable<Category> | Promise<Nullable<Category>>;
    login(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
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

export interface IQuery {
    dummy(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export type DateTime = any;
export type Upload = any;
type Nullable<T> = T | null;
