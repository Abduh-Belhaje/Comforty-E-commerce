import axios from "axios";

export async function RecentProducts() {
  try {
    const response = await axios.get("http://localhost:8080/v1/product/recent");
    console.log(response.data);
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
    console.log(response.data);
    return response.data; // Ensure this is the expected data structure
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return { success: false, message: "Failed to fetch product categories." };
  }
}
