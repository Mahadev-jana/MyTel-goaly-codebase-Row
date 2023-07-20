const BASE_URL = 'https://cms-mytel.goaly.mobi/';
const newsBanners = [
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner0.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner1.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner2.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner3.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner4.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner5.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner5.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner6.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner7.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner8.jpg`,
    `${BASE_URL}/assets/uploads/newsbanners/newsbanner9.jpg`,
];

export const randomNewsBanner = () => {
    const min = 0;
    const max = 9;
    const random = Math.floor(Math.random() * (+max - +min)) + +min;
    return newsBanners[random];
}