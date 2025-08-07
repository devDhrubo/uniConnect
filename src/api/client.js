// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Generic API client
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        if (config.body && typeof config.body !== 'string') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // HTTP methods
    get(endpoint, options = {}) {
        return this.request(endpoint, { method: 'GET', ...options });
    }

    post(endpoint, body, options = {}) {
        return this.request(endpoint, { method: 'POST', body, ...options });
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, { method: 'PUT', body, ...options });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { method: 'DELETE', ...options });
    }
}

// Create API client instance
const api = new ApiClient(API_BASE_URL);

// Blood Donation API
export const bloodApi = {
    // Donors
    registerDonor: (donorData) => api.post('/blood/donors', donorData),
    getDonors: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/blood/donors${queryString ? `?${queryString}` : ''}`);
    },
    getDonor: (id) => api.get(`/blood/donors/${id}`),
    updateDonor: (id, data) => api.put(`/blood/donors/${id}`, data),
    
    // Blood Requests
    createBloodRequest: (requestData) => api.post('/blood/requests', requestData),
    getBloodRequests: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/blood/requests${queryString ? `?${queryString}` : ''}`);
    },
    getBloodRequest: (id) => api.get(`/blood/requests/${id}`),
    respondToRequest: (id, responseData) => api.post(`/blood/requests/${id}/respond`, responseData),
    updateRequestStatus: (id, status) => api.put(`/blood/requests/${id}/status`, { status }),
    
    // Statistics
    getStats: () => api.get('/blood/stats'),
};

// Lost & Found API
export const lostFoundApi = {
    createItem: (itemData) => api.post('/lost-found', itemData),
    getItems: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/lost-found${queryString ? `?${queryString}` : ''}`);
    },
    getItem: (id) => api.get(`/lost-found/${id}`),
    updateItem: (id, data) => api.put(`/lost-found/${id}`, data),
    resolveItem: (id, matchedWith = null) => api.put(`/lost-found/${id}/resolve`, { matchedWith }),
    getMatches: (id) => api.get(`/lost-found/${id}/matches`),
    getStats: () => api.get('/lost-found/stats'),
};

// Donations API
export const donationsApi = {
    createCampaign: (campaignData) => api.post('/donations', campaignData),
    getCampaigns: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/donations${queryString ? `?${queryString}` : ''}`);
    },
    getCampaign: (id) => api.get(`/donations/${id}`),
    makeDonation: (id, donationData) => api.post(`/donations/${id}/donate`, donationData),
    addUpdate: (id, updateData) => api.post(`/donations/${id}/updates`, updateData),
    updateStatus: (id, status) => api.put(`/donations/${id}/status`, { status }),
    getStats: () => api.get('/donations/stats/overview'),
};

// Events API
export const eventsApi = {
    createEvent: (eventData) => api.post('/events', eventData),
    getEvents: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/events${queryString ? `?${queryString}` : ''}`);
    },
    getEvent: (id) => api.get(`/events/${id}`),
    registerForEvent: (id, registrationData) => api.post(`/events/${id}/register`, registrationData),
    cancelRegistration: (id, email) => api.delete(`/events/${id}/register`, { body: { participantEmail: email } }),
    updateEvent: (id, data) => api.put(`/events/${id}`, data),
    addFeedback: (id, feedbackData) => api.post(`/events/${id}/feedback`, feedbackData),
    getStats: () => api.get('/events/stats/overview'),
};

// Auction API
export const auctionApi = {
    createItem: (itemData) => api.post('/auction', itemData),
    getItems: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/auction${queryString ? `?${queryString}` : ''}`);
    },
    getItem: (id) => api.get(`/auction/${id}`),
    placeBid: (id, bidData) => api.post(`/auction/${id}/bid`, bidData),
    buyNow: (id, buyerData) => api.post(`/auction/${id}/buy-now`, buyerData),
    addToWatchlist: (id, watcherData) => api.post(`/auction/${id}/watch`, watcherData),
    askQuestion: (id, questionData) => api.post(`/auction/${id}/questions`, questionData),
    answerQuestion: (itemId, questionId, answer) => api.put(`/auction/${itemId}/questions/${questionId}/answer`, { answer }),
    updateStatus: (id, status) => api.put(`/auction/${id}/status`, { status }),
    getStats: () => api.get('/auction/stats/overview'),
};

// Bulletin API
export const bulletinApi = {
    createBulletin: (bulletinData) => api.post('/bulletin', bulletinData),
    getBulletins: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return api.get(`/bulletin${queryString ? `?${queryString}` : ''}`);
    },
    getBulletin: (id) => api.get(`/bulletin/${id}`),
    updateBulletin: (id, data) => api.put(`/bulletin/${id}`, data),
    publishBulletin: (id) => api.put(`/bulletin/${id}/publish`),
    addComment: (id, commentData) => api.post(`/bulletin/${id}/comments`, commentData),
    acknowledgeBulletin: (id, acknowledgerData) => api.post(`/bulletin/${id}/acknowledge`, acknowledgerData),
    recordDownload: (id, attachmentId) => api.post(`/bulletin/${id}/download/${attachmentId}`),
    recordShare: (id) => api.post(`/bulletin/${id}/share`),
    archiveBulletin: (id) => api.put(`/bulletin/${id}/archive`),
    getStats: () => api.get('/bulletin/stats/overview'),
};

// Utility functions
export const handleApiError = (error) => {
    console.error('API Error:', error);
    
    if (error.message) {
        return error.message;
    }
    
    return 'An unexpected error occurred. Please try again.';
};

export const showNotification = (message, type = 'success') => {
    // This would integrate with your notification system
    // For now, we'll use a simple alert
    if (type === 'error') {
        alert(`Error: ${message}`);
    } else {
        alert(message);
    }
};

export default api;
