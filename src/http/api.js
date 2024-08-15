import { api } from "./client";

export const getAllProducts = async () => {
    const response = await api.get('/products');
    return await response.data;
};

export const getSingleProducts = async (id) => {
    const response = await api.get(`/products/${id}`);
    return await response.data;
};

export const createProducts = async (data) => {

    const response = await api.post('/products',data);

    return await response.data
}

export const getAllwarehouses = async () => {
    const response = await api.get('/warehouses');
    return await response.data;
};

export const createWarehouses = async (data) => {

    const response = await api.post('/warehouses',data);

    return await response.data
}

export const getAllDeliverypersions = async () => {
    const response = await api.get('/delivery-persions');
    return await response.data;
};

export const createDeliveryprsions = async (data) => {

    const response = await api.post('/delivery-persions',data);
    return await response.data
}

export const getAllinvertories = async () => {
    const response = await api.get('/inventories');
    return await response.data;
};

export const createinventories = async (data) => {

    const response = await api.post('/inventories',data);
    return await response.data
}

export const createorder = async (data) => {

    const response = await api.post('/orders',data);
    return await response.data
}