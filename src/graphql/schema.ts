
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IMutation {
    login(): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export interface AuthResponse {
    email: string;
    token: string;
}

type Nullable<T> = T | null;
