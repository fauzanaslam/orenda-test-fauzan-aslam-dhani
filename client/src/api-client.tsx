type SignInFormData = {
  name: string;
};
type CustomerFormData = {
  name: string;
  phone: number;
  email: string;
  address: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const fetchCostumer = async () => {
  const response = await fetch(`${API_BASE_URL}/customer`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching costumer");
  }
  const data = await response.json();
  return data.data;
};

export const tambahCustomer = async (
  formData: CustomerFormData
): Promise<CustomerFormData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error adding new academic year");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in addNewTahunAjaran:", error);
    return null;
  }
};
