import axiosClient from "./axiosClient";

const transfersApi = {
    getAllTransfers: () => {
        const url = 'transfers';
        return axiosClient.get(url, { params: {} });
    },


    getByAddress: (id) => {
        const url = 'transfers/' + id;
        return axiosClient.get(url, { params: {} });
    },

    createTransfer: (transfer) => {
        const url = '/transfers';
        return axiosClient.post(url, JSON.stringify(transfer));
    }
}

export default transfersApi;