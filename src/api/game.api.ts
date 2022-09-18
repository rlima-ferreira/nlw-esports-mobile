import api from '../services/api';

export interface IGame {}

export const gameApi = {
  findAll: async () => api.get('/games'),
  findWithAds: async (id: string) => api.get(`/games/${id}/ads`),
};
