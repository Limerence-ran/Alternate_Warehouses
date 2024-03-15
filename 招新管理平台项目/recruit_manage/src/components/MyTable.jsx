import React, { Component } from "react";
import { Table, message } from "antd";
import { TableReq } from "../request/api";
import { columns } from "../data/resultData";
import PubSub from "pubsub-js";
import "../assets/styles/MyTable.scss";
//
function itemRender(current, type, originalElement) {
    if (type === "prev") {
        return <a>上一页</a>;
    }
    if (type === "next") {
        return <a>下一页</a>;
    }
    return originalElement;
}

export default class MyTable extends Component {
    state = {
        dataSource: [],
        columns: [],
        loading: false,
        selectedRowKeys: [], // 选择的行的id
        pagination: {
            current: 1,
            pageSize: 10,
        },
        // 总数
        total: 0,
        // 操作内容
        operation: { op: -1, index: null },
        seleted: false,
    };

    // 通知父组件修改状态
    ResetOp() {
        this.props.ResetOp();
    }

    // 通知父组件重置数据
    ResetData(data) {
        this.props.ResetData(data);
    }

    // id数组合成字符串
    concatParamString(data, key) {
        let str = "";
        for (let i = 0; i < data.length; i++) {
            if (i === 0) str += `id=${data[i]}`;
            else str += `&id=${data[i]}`;
        }
        return str;
    }

    // 删除选中的列并放回删除后的数组
    deleteRow(data, keys) {
        if (!data) return [];
        let dataSource = [];
        for (let i = 0; i < data.length; i++) {
            if (keys.indexOf(data[i].resultId) === -1) dataSource.push(data[i]);
        }
        let str = this.concatParamString(keys);
        TableReq.deleteRow(str);
        this.ResetData(dataSource);
    }
    // 更新行数据
    updateNewData(data, newdata) {
        for (let key in newdata) {
            data[key] = newdata[key] === null ? "" : newdata[key];
        }
        return data;
    }
    // 根据key获取对应下标
    getKeyIndex(data, key) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].resultId === key) return i;
        }
        return -1;
    }
    // 更新行数据
    updateRow(data, keys, newdata) {
        console.log(newdata);
        if (!newdata) return;
        let index = this.getKeyIndex(data, keys);
        data[index] = this.updateNewData(data[index], newdata);
        this.ResetData(data);
        let param = { ...newdata, resultId: keys };
        console.log("param", param);
        TableReq.updateRow(param);
    }
    // 更新列数据
    updateColumn(columnName, dataSource, newvalue, keys) {
        if (!newvalue) return;
        for (let i = 0; i < keys.length; i++) {
            dataSource.forEach((n) => {
                if (n.resultId === keys[i]) {
                    n[columnName] = newvalue;
                }
            });
        }
        let str = this.concatParamString(keys);
        if (columnName === "examScoreAll") {
            let param = `score=${newvalue}&${str}`;
            TableReq.updateScoreBatch(param);
        } else if (columnName === "isPass") {
            TableReq.passbatch(str);
        }
        this.ResetData(dataSource);
    }

    warningEmptyArr(arr, content) {
        if (arr.length === 0) {
            message.warning({ content });
            return 1;
        }
        return 0;
    }

    // 根据父组件传的操作数执行相应操作
    Operate(operation, dataSource, selectedRowKeys) {
        let { op, index, updatedata } = operation;
        console.log("updatedata", updatedata);
        if (op === -1) return;
        switch (op) {
            case 0:
                if (
                    this.warningEmptyArr(
                        selectedRowKeys,
                        "还没有选择任何值噢！"
                    )
                )
                    break;
                if (selectedRowKeys.length === 0) {
                    message.warning({ content: "" });
                    break;
                }
                this.deleteRow(dataSource, selectedRowKeys);
                message.success({ content: "删除成功！", duration: 1 });
                break;
            case 1:
                if (
                    this.warningEmptyArr(
                        selectedRowKeys,
                        "还没有选择任何值噢！"
                    )
                )
                    break;
                this.updateColumn(
                    columns[index].dataIndex,
                    dataSource,
                    updatedata,
                    selectedRowKeys
                );
                message.success({ content: "批量录入成功！", duration: 1 });
                break;
            case 2:
                if (
                    this.warningEmptyArr(
                        selectedRowKeys,
                        "还没有选择任何值噢！"
                    )
                )
                    break;
                this.updateColumn(
                    columns[index].dataIndex,
                    dataSource,
                    updatedata,
                    selectedRowKeys
                );
                message.success({ content: "批量通过成功！", duration: 1 });
                break;
            case 3:
                this.updateRow(dataSource, index, updatedata);
                console.log(111, dataSource, index, updatedata);
                message.success({ content: "更新成功！", duration: 1 });
                break;
            case 4:
                this.deleteRow(dataSource, [index]);
                message.success({ content: "删除成功！", duration: 1 });
                break;
            case 5:
                this.sendNotice(dataSource, selectedRowKeys);
                break;
            default:
                break;
        }
        this.ResetOp();
    }

    // 发通知
    sendNotice(data, keys) {
        if (keys.length === 0) return;
        let round = data.find((v) => {
            if (v.resultId === keys[0]) return v;
        });
        let newerIdArr = [];
        data.map((n) => {
            if (keys.indexOf(n.resultId) !== -1) newerIdArr.push(n.newerId);
        });
        newerIdArr = Array.from(new Set(newerIdArr));
        TableReq.sendNotice(round.examRound, newerIdArr).then((res) => {
            const { data } = res;
            if (data) {
                message.success({ content: "发送成功！", duration: 1 });
            } else {
                message.error({
                    content: "发生错误，请查看日志！",
                    duration: 1,
                });
            }
        });
    }

    componentDidMount() {
        const { dataSource, columns, total, seleted } = this.props;
        this.setState({ dataSource, columns, total, seleted }); // 初始化数据
    }

    static getDerivedStateFromProps(props, state) {
        console.log("state", state);
        let { operation, dataSource, total, mykey, myCurrent } = props;
        // 监听父组件传来的操作数，更新当前组件的状态
        if (!operation || (operation && operation.op === -1)) {
            return { operation, dataSource, total, mykey, myCurrent };
        } else return { operation, total, dataSource, mykey, myCurrent };
    }

    // 有operation更新就执行操作
    componentDidUpdate(prevProps, prevState) {
        let { operation, selectedRowKeys, dataSource } = this.state;
        if (operation) {
            if (
                operation.op !== prevState.operation.op &&
                operation.op !== -1
            ) {
                this.Operate(operation, dataSource, selectedRowKeys); // 进行批量操作
            }
        }
    }

    onSelectChange = (selectedRowKeys) => {
        this.ResetOp(); // 没有执行批量操作时要通知父组件重置操作数
        this.setState({ selectedRowKeys, operation: { op: -1, index: null } }); // 当前组件也要重置
    };

    handlePageChange = (current) => {
        PubSub.publish("currentPage", current);
    };

    render() {
        const { selectedRowKeys, seleted } = this.state;
        const { loading, myCurrent } = this.props;
        // 被选择的元素，以及选择的回调
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        // 分页器配置
        const paginationConfig = {
            showQuickJumper: true,
            itemRender: itemRender,
            position: ["bottomCenter"],
            total: this.props.total,
            onChange: this.handlePageChange,
            showSizeChanger: false,
            pageSize: 15,
            current: myCurrent,
        };

        return (
            <>
                <Table
                    key={this.props.mykey}
                    className="my-table"
                    dataSource={this.state.dataSource}
                    rowKey={(record) => record.resultId}
                    columns={this.state.columns}
                    rowSelection={seleted === false ? false : rowSelection}
                    loading={loading}
                    pagination={paginationConfig}
                ></Table>
            </>
        );
    }
}
