type SignInFormData = {
  name: string;
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
