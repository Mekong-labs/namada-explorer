import { ROLE } from "@/utils/types";

import axiosInstance from "../libs/axios/axiosInstance";

export const grantRole = async (address: string, role: ROLE) => {
  const url = `/admin/grant-role`;

  try {
    const response = await axiosInstance.post(url, {
      address: address,
      role: role,
    });

    console.log({ response: response.data.result });
    return response.data.result;
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    throw error;
  }
};

export const checkRole = async (address: string, role: ROLE) => {
  const url = `/admin/check-role`;

  try {
    const response = await axiosInstance.post(url, {
      address: address,
      role: role,
    });

    console.log({ response: response.data });
    return response.data;
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    throw error;
  }
};

export const revokeRole = async (address: string, role: ROLE) => {
  const url = `/admin/revoke-role`;

  try {
    const response = await axiosInstance.post(url, {
      address: address,
      role: role,
    });

    console.log({ response: response.data.result });
    return response.data.result;
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    throw error;
  }
};

export const distributeToken = async (address: string, amount: number) => {
  const url = `/admin/revoke-role`;

  try {
    const response = await axiosInstance.post(url, {
      address: address,
      amount,
    });

    console.log({ response: response.data.result });
    return response.data.result;
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    throw error;
  }
};

export const requestLogin = async (address: string) => {
  const url = `/login/request`;

  try {
    const response = await axiosInstance.post(url, {
      address: address,
    });

    console.log({ response: response.data.result });
    return response.data.result;
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    throw error;
  }
};

export const verifyLogin = async (address: string, signature: string) => {
  const url = `/login/verify`;

  try {
    const response = await axiosInstance.post(url, {
      address: address,
      signature: signature,
    });

    console.log({ response: response.data.result });
    return response.data.result;
  } catch (error) {
    console.error("Error retrieving transaction history:", error);
    throw error;
  }
};
