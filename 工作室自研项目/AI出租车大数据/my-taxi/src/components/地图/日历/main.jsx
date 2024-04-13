
import React, { useState } from "react";
import { DatePicker, Input, Button } from "antd";
import "./main.css";

const Calendar = () => {
    //    选择日期
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date, dateString) => {
        if (date) {
            const selectedMoment = moment(dateString, "YYYY-MM-DD");
            const selectedDateObject = selectedMoment.toDate();
            setSelectedDate(selectedDateObject);
        }
    };

    const datePickerStyle = {
        width: "200px", // 设置宽度
    };
    // 添加查询车辆
    const [vehicleQuery, setVehicleQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleVehicleQueryChange = (event) => {
        setVehicleQuery(event.target.value);
    };
    const performVehicleSearch = (query) => {
        // 模拟车辆查询结果
        const data = [
            { id: 1, name: "车辆1", description: "这是车辆1的描述" },
            { id: 2, name: "车辆2", description: "这是车辆2的描述" },
            { id: 3, name: "车辆3", description: "这是车辆3的描述" },
        ];

        // 根据查询条件过滤结果
        const filteredResults = data.filter((vehicle) => {
            return vehicle.name.toLowerCase().includes(query.toLowerCase());
        });

        return filteredResults;
    };

    const handleVehicleQuerySubmit = () => {
        // 在此处执行车辆查询逻辑
        const results = performVehicleSearch(vehicleQuery);
        console.log(111);
        console.log("results:", results);
        setSearchResults(results);
    };

    return (
        <>
            <DatePicker
                picker="date"
                popupStyle={datePickerStyle}
                onChange={handleDateChange}
                style={{ width: "100%", color: "#faeeee" }}
            />

            <Input
                className="addInput"
                placeholder="请输入车牌号..."
                value={vehicleQuery}
                onChange={handleVehicleQueryChange}
                style={{ width: "70%", backgroundColor: "transparent" }}
            />
            <Button
                type="primary"
                onClick={handleVehicleQuerySubmit}
                style={{
                    width: "25%",
                    textAlign: "center",
                    margin: "3% 0 0 5%",
                    padding: "0px",
                    fontFamily: "cursive",
                    fontSize: "16px",
                }}
            >
                添加
            </Button>
        </>
    );
};

export default Calendar;
