
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface AuthResponse {
    email: string;
    token: string;
}

export interface IQuery {
    dummy(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export interface IMutation {
    login(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

type Nullable<T> = T | null;
