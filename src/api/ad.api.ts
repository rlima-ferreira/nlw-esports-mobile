import api from '../services/api';

export interface IAd {}

export const adApi = {
  findWithDiscord: async (id: string) => api.get(`/ads/${id}/discord`),
};
