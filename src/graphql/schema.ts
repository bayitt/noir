
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface Category {
    uuid: string;
    name: string;
    slug: string;
    created_at: DateTime;
    updated_at: DateTime;
}

export interface IMutation {
    createCategory(name?: Nullable<string>): Nullable<Category> | Promise<Nullable<Category>>;
    login(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export interface AuthResponse {
    email: string;
    token: string;
}

export interface IQuery {
    dummy(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export type DateTime = any;
type Nullable<T> = T | null;
