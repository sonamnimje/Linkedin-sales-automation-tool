import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const healthCheck = async () => {
  const { data } = await apiClient.get('/health');
  return data;
};

export const submitCampaignIntake = async (payload) => {
  const { data } = await apiClient.post('/api/campaigns/intake', payload);
  return data;
};

export const startSequence = async (payload) => {
  const { data } = await apiClient.post('/api/campaigns/sequence/start', payload);
  return data;
};

export const fetchSequenceStats = async () => {
  const { data } = await apiClient.get('/api/campaigns/sequence/stats');
  return data;
};

export const fetchMetrics = async () => {
  const { data } = await apiClient.get('/api/campaigns/metrics');
  return data;
};

export const triggerMockReply = async () => {
  const { data } = await apiClient.post('/api/campaigns/metrics/mock-reply');
  return data;
};

export default apiClient;


