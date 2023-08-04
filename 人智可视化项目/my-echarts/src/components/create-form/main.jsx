import React, { useEffect, useState } from "react";
import { Table, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Vedio from "../../component/Vedio/main";

const DynamicTable = (prop) => {
    const [dem, setDem] = useState(prop.demnum);
    const [dimension, setDimension] = useState(prop.dimensionName);
    const [rows, setRows] = useState(1);
    const [cols, setCols] = useState(1);
    const [data, setData] = useState([]);
    const [columnTitles, setColumnTitles] = useState([]);
    const navigate = useNavigate();
    const [isshow, setisShow] = useState(false);

    // 处理行数和列数输入框的变化
    // const handleRowChange = (e) => {
    //     const value = Number(e.target.value);
    //     if (value >= 1 && value <= 6) {
    //         setRows(value);
    //     }
    // };
    useEffect(() => {
        setRows(dem);
    }, []);

    const handleColChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= 6) {
            setCols(value);
        }
    };

    // 动态生成表格数据
    const generateData = () => {
        const newData = [];
        for (let i = 0; i < rows; i++) {
            const row = {};
            for (let j = 0; j < cols; j++) {
                // const columnName = columnTitles[j];
                row[`col${j}`] = "";
            }
            newData.push(row);
        }
        setData(newData);
    };

    // 处理单元格数据变化
    const handleCellChange = (value, record, rowIndex, colIndex) => {
        const newData = [...data];
        newData[rowIndex][`col${colIndex}`] = value;
        setData(newData);
    };

    // 提交表格数据
    const handleSubmit = () => {
        const columnsData = {};
        for (let i = 0; i < cols; i++) {
            const columnData = data.map((row) => row[`col${i}`]);
            // columnsData.push(columnData);
            columnsData.dimension[i] = columnData;
        }
        console.log(columnsData);
        const tableData = {
            data: [columnsData],
            dimension: dimension,
        };
        console.log(tableData); // 在控制台输出包装后的数据
        localStorage.setItem("tableData", tableData.data);
        setisShow(!isshow);
        setTimeout(() => {
            navigate("/Chartdata/Chart5");
        }, 3000);
    };

    // 表格列配置
    const columns = [];
    for (let i = 0; i < cols; i++) {
        columns.push({
            title: `${dimension[i]}`,
            dataIndex: `col${i}`,
            render: (text, record, rowIndex) => (
                <Input
                    value={text}
                    onChange={(e) =>
                        handleCellChange(e.target.value, record, rowIndex, i)
                    }
                />
            ),
        });
    }

    return (
        <div>
            <div>
                <span>Rows:</span>
                <Input
                    type="number"
                    value={rows}
                    // onChange={handleRowChange}
                    min={1}
                    max={6}
                    style={{ width: "60px", margin: "1px 200px 1px 1px" }}
                    disabled="true"
                />
                <span>Columns:</span>
                <Input
                    type="number"
                    value={cols}
                    onChange={handleColChange}
                    min={1}
                    max={6}
                    style={{ width: "60px", margin: "0px 20px 0px 0px" }}
                />
                <Button
                    onClick={generateData}
                    style={{ width: "600px", margin: "10px 0px 0px 0px" }}
                >
                    Generate Table
                </Button>
                <Button
                    onClick={handleSubmit}
                    style={{ width: "600px", margin: "20px 0px 0px 0px" }}
                >
                    Submit
                </Button>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                bordered
            />
            {isshow && <Vedio />}
        </div>
    );
};

export default DynamicTable;
