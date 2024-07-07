/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc API functions for general operations.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from '../axios';

export async function getAnncouncementsAPI(params: any) {
  return axiosInstance.get('/announcements', { params });
}