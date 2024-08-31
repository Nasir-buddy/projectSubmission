let cardContainerEle = document.getElementById("card-container");
cardContainerEle.className = "grid sm:grid-cols-2  md:grid-cols-5 gap-4 px-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ";

const searchFunc = async () => {
    let inputEle = document.getElementById("search");

    let keyword = inputEle.value;
    // console.log("keyword ", keyword);
    if (keyword.length > 3) {
        cardContainerEle.innerHTML = "";
        const options = {
            method: "GET",
            url: "https://asos10.p.rapidapi.com/api/v1/getProductListBySearchTerm",
            params: {
                searchTerm: keyword,
                currency: "USD",
                country: "US",
                store: "US",
                languageShort: "en",
                sizeSchema: "US",
                limit: "50",
                offset: "0",
                sort: "recommended",
            },
            headers: {
                "x-rapidapi-key": "318828e804msha7f682e512a5ca8p1ac180jsnf83c29a132dd",
                "x-rapidapi-host": "asos10.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            const data = response.data;
            console.log("data", data);

            // Clear existing products
            cardContainerEle.innerHTML = "";
            let productList = data.data.products;
            productList.map((item) => {
                cardContainerEle.appendChild(createProductCard(item));
            });
            console.log("dummyData", JSON.stringify(dummyData));
        } catch (error) {
            console.log("error", error);
        }
    } else {
        cardContainerEle.innerHTML = "";
    }
};

// add input event for search items
document.getElementById("search").addEventListener("input", searchFunc);
window.addEventListener('load', () => {
    searchFunc();
});
const createProductCard = (item) => {
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    const titles = document.createElement("p");
    const price = document.createElement("span");
    const detailContainer = document.createElement("div");

    imgContainer.className = "flex flex-col border border-1 border-black p-[8px] justify-center items-start bg-white cols-1 p-2 rounded-md gap-4 mb-5 hover:scale-105 transition ease-out delay-75 hover:shadow-2xl hover:bg-gray-100";
    img.className = "h-[70%] w-full rounded-md top-[117ox] bg-top ";
    titles.className = " text-l bg-zinc-100 rounded-xl p-2";
    price.className = "flex flex-between bg-zinc-100 p-2 rounded-xl ";
    detailContainer.className = "flex justify-between items-center";
    let imageURL = `https://${item.imageUrl}`;
    img.src = imageURL;
    titles.textContent = item.name;
    price.innerText = "Rs. " + Math.ceil(item.price.current.value * 84, 2);

    imgContainer.appendChild(img);
    imgContainer.appendChild(titles);
    detailContainer.appendChild(price);
    imgContainer.appendChild(detailContainer);
    return imgContainer;
};
