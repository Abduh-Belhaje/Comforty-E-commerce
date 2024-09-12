import axios from "axios";

export async function RecentProducts() {
  try {
    const response = await axios.get("http://localhost:8080/v1/product/recent");
    return response.data;
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return { success: false, message: "Failed to fetch recent products." };
  }
}

export async function getCategories() {
  try {
    const response = await axios.get(
      "http://localhost:8080/v1/product/categories"
    );
    return response.data; // Ensure this is the expected data structure
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return { success: false, message: "Failed to fetch product categories." };
  }
}

// Fetch all products with pagination
export async function getAllProducts(start = 0, end = 7) {
  try {
    const response = await axios.get(
      `http://localhost:8080/v1/product/chairs/${start}/${end}`
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching products:", error); // Log the error
    return { success: false, message: "Failed to fetch products." }; // Return a meaningful error message
  }
}

export async function getChairsByCategory(category) {
  try {
    const response = await axios.get(
      `http://localhost:8080/v1/product/ctg/${category}`
    );

    console.log(response.data);
    return response.data;

    // return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching products by category:", error); // Log the error
    return { success: false, message: "Failed to fetch products by category." }; // Return a meaningful error message
  }
}
export async function getChairDetails(name) {
  try {
    const response = await axios.get(
      `http://localhost:8080/v1/product/${name}`
    );
    return response.data;

    // return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching product details:", error); // Log the error
    return { success: false, message: "Error fetching product details" }; // Return a meaningful error message
  }
}

// /v1/product/nbOfChairs

export async function nbOfChairs() {
  try {
    const response = await axios.get(
      "http://localhost:8080/v1/product/nbOfChairs"
    );
    return response.data; // Ensure this is the expected data structure
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return { success: false, message: "Failed to fetch product categories." };
  }
}

export async function getChairReviews(name) {
  try {
    const response = await axios.get(
      `http://localhost:8080/v1/reviews/${name}`
    );
    return response.data; // Ensure this is the expected data structure
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return { success: false, message: "Failed to fetch product reviews." };
  }
}

export async function addReview(data) {
  console.log(data);

  try {
    const token = localStorage.getItem("access-token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      "http://localhost:8080/v1/reviews/add",
      data,
      { headers }
    );
    return { success: true, message: response.data };
  } catch (error) {
    // Extract a useful error message
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    return { success: false, message: errorMessage };
  }
}
