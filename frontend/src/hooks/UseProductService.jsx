// import { RecentProducts, getAllProducts , getChairsByCategory , getCategories , getChairReviews , nbOfChairs} from "../services/productsService";
// import { useProductContext } from "../../contexte/ProductContext";
// import { useContext } from "react";


// function useProductService(){
//     const [selectedCategory] = useContext(useProductContext);

//     const getChairs = async ()=>{

//         switch (selectedCategory) {
//             case 'All':
//                 return await getAllProducts();
//             default:
//                 return await getChairsByCategory(selectedCategory);
//         }
        
//     }

//     const getRecentChairs = async ()=> {
//         return await RecentProducts;
//     }

//     const getCategoriesName = async () =>{
//         return await getCategories();
//     }

//     const getReviews = async (name)=>{
//         return await getChairReviews(name);
//     }
//     const getNbOfChairs = async (name)=>{
//         return await nbOfChairs(name);
//     }
//     const getReviews = async (name)=>{
//         return await getChairReviews(name);
//     }

//     return {getChairs,getRecentChairs,getCategoriesName,getReviews}
// }

// export default useProductService;