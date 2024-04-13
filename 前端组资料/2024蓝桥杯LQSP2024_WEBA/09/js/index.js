window.onload = async () => {
    const MockUrl = `./js/data.json`; // 请求地址
    let data = []; // 存储请求后的数据
    // TODO：待补充代码，目标 1
    // 在 window.onload 中完成数据请求（请求地址必须使⽤提供的常量 MockUrl），将请求回来的数据赋值给 data ，并正确传递给已提供的 getData 函数。
    axios
        .get(MockUrl)
        .then((response) => {
            // 请求成功后调用下面的代码-可能存在跨域
            data = response.data;
            // 请求完成后调用下面的代码
            const newData = getData(data);
            showData(newData);
        })
        .catch((error) => {
            // 请求失败后调用下面的代码
            console.log(error);
            //测试用例
            data = [
                {
                    id: "001",
                    name: "Blue T-Shirt",
                    description:
                        "A comfortable and stylish blue t-shirt made from high-quality cotton.",
                    price: 29.99,
                    viewed_on: "2024-03-23T10:00:00",
                },
                {
                    id: "001",
                    name: "Blue T-Shirt",
                    description:
                        "A comfortable and stylish blue t-shirt made from high-quality cotton.",
                    price: 29.99,
                    viewed_on: "2024-03-23T13:00:00",
                },
                {
                    id: "002",
                    name: "Red Sneakers",
                    description:
                        "A pair of red sneakers that are perfect for casual wear or working out.",
                    price: 69.99,
                    viewed_on: "2024-03-23T19:32:00",
                },
                {
                    id: "003",
                    name: "Black Leather Wallet",
                    description:
                        "A sleek and functional black leather wallet with multiple card slots and a coin pocket.",
                    price: 49.99,
                    viewed_on: "2024-03-21T13:30:00",
                },
                {
                    id: "001",
                    name: "Blue T-Shirt",
                    description:
                        "A comfortable and stylish blue t-shirt made from high-quality cotton.",
                    price: 29.99,
                    viewed_on: "2024-03-21T13:00:00",
                },
                {
                    id: "004",
                    name: "Green Water Bottle",
                    description:
                        "A durable and eco-friendly green water bottle that can hold up to 500ml of liquid.",
                    price: 14.99,
                    viewed_on: "2024-03-20T15:01:00",
                },
                {
                    id: "005",
                    name: "Silver Watch",
                    description:
                        "A stylish and modern silver watch that features a chronograph and a date display.",
                    price: 149.99,
                    viewed_on: "2024-03-19T19:30:00",
                },
                {
                    id: "006",
                    name: "Yellow Sunglasses",
                    description:
                        "A pair of trendy and UV-protected yellow sunglasses that are perfect for any sunny day.",
                    price: 24.99,
                    viewed_on: "2024-03-19T22:12:00",
                },
                {
                    id: "007",
                    name: "Purple Yoga Mat",
                    description:
                        "A comfortable and slip-resistant purple yoga mat that is perfect for any yoga practice.",
                    price: 39.99,
                    viewed_on: "2024-03-17T21:42:00",
                },
                {
                    id: "008",
                    name: "Brown Leather Shoes",
                    description:
                        "A pair of classic brown leather shoes that are perfect for any formal occasion.",
                    price: 99.99,
                    viewed_on: "2024-03-22T17:02:00",
                },
                {
                    id: "009",
                    name: "White Noise Machine",
                    description:
                        "A portable and easy-to-use white noise machine that can help you sleep better and relax.",
                    price: 59.99,
                    viewed_on: "2024-03-22T20:02:00",
                },
                {
                    id: "010",
                    name: "Orange Backpack",
                    description:
                        "A spacious and stylish orange backpack that is perfect for traveling or commuting.",
                    price: 79.99,
                    viewed_on: "2024-03-23T20:02:00",
                },
            ];
            const newData = getData(data);
            showData(newData);
        });

    // TODO：END
};

/**
 * 将同一天浏览的相同商品去重并作为数组返回
 * @param {Array} defaultData json 文件中读取到的原始数据
 * @returns 去重后的数据，数据结构与 defaultData 相同
 */
const removeDuplicates = (defaultData) => {
    let newData = [];
    // TODO：待补充代码，目标 2
    // 将defaultData数组中id属性相同的两个对象只保留一个
    defaultData.forEach((item) => {
        let flag = true;
        newData.forEach((newItem) => {
            if (item.id === newItem.id) {
                flag = false;
            }
        });
        if (flag) {
            newData.push(item);
        }
    });

    return newData;
};

/**
 * 将去重后的数据根据字段 viewed_on（格式化为 YYYY-MM-DD） 降序排序
 * @param {*} defaultData 去重后的数据
 * @returns 根据字段 viewed_on（格式化为 YYYY-MM-DD） 降序排序
 */
const sortByDate = (defaultData) => {
    let newData = [];
    // TODO：待补充代码，目标 3
    // 根据字段 viewed_on （格式化为 YYYY-MM-DD ）降序排序并作为数组返回，数据结构与 json ⽂件中数据结构相同。
    defaultData.sort((a, b) => {
        let dateA = new Date(a.viewed_on);
        let dateB = new Date(b.viewed_on);
        return dateB - dateA;
    });
    newData = defaultData;
    return newData;
};
/**
 * 将去重排序后的所有商品数据，作为一个对象存储并返回
 * @param {Array} defaultData 重后的所有商品数据
 * @returns
 */
const transformStructure = (defaultData) => {
    let newData = {};
    // TODO：待补充代码，目标 4
    //将去重排序后的所有商品数据，作为⼀个对象存储并返回，该对象的所有 key 为浏览商品的当天⽇期（即，字段 viewed_on 格式化为 YYYY-MM-DD ， ⽉份和⽇期⼩于 10 的前⾯补 0）， value 为当天浏览的所有商品列表（以数组形式表现）。
    defaultData.forEach((item) => {
        let date = item.viewed_on.split("T")[0];
        if (newData[date]) {
            newData[date].push(item);
        } else {
            newData[date] = [item];
        }
    });

    return newData;
};
const getData = (defaultData) => {
    let newData = removeDuplicates(defaultData);
    let sortData = sortByDate(newData);
    let objData = transformStructure(sortData);
    return objData;
};
const showData = (data) => {
    let str = ``;
    for (let k in data) {
        str += `<h3>${k}</h3>`;
        data[k].forEach((goods) => {
            str += `<div class="container">
      	<div class="image"></div>
      	<div class="details">
      		<h4>${goods.name}</h4>
      		<p>${goods.description}</p>
      		<p class="buy">
      		  <span class="price">¥${goods.price}</span>
      		  <img src="./images/cart.svg" alt="" srcset="">
      		</p>
      	</div>
      </div>`;
        });
    }
    document.querySelector("#goodsList").innerHTML = str;
};
