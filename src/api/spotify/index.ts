/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides API functions for spotify operations.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from '../axios';
import { IspotifySearchParams, IspotifySearchTopArtistParams } from './types';

export interface IPaginationDto {
  skip: number;
  take: number;
}

export async function spotifySearch(params:IspotifySearchParams) {
    return axiosInstance.get("/spotify/search", { params });
}

export async function spotifySearchTopArtist(
  params: IPaginationDto
) {
  return axiosInstance.get("/users/top-popular", { params });
}
