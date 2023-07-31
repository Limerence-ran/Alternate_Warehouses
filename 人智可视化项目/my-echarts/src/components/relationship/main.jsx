import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

export default function RelationChart(prop) {
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const[passdata,setPassData]= useState(prop.propsdata)

    const data = {
        nodes: [
            { id: 1, name: "群组", category: 0 },
            { id: 2, name: "数据集1", category: 1 },
            { id: 3, name: "数据集2", category: 1 },
            // 添加其他二级点...
            { id: 4, name: "拥有者A", category: 2 },
            { id: 5, name: "拥有者B", category: 2 },
            // 添加其他三级点...
        ],
        links: [
            { source: 1, target: 2 },
            { source: 1, target: 3 },
            // 添加其他关系...
            { source: 2, target: 4 },
            // 添加其他关系...
            { source: 3, target: 5 },
            // 添加其他关系...
        ],
    };

    const option = {
        series: [
            {
                type: "graph",
                layout: "force",
                roam: true,
                edgeSymbol: ["none", "arrow"],
                edgeSymbolSize: 10,
                force: {
                    repulsion: 300,
                    edgeLength: [60, 120],
                },
                categories: [
                    { name: "群组" },
                    { name: "数据集" },
                    { name: "拥有者" },
                ],
                nodes: data.nodes.map((node) => ({
                    ...node,
                    symbolSize: node.category === 0 ? 50 : 30,
                    label: {
                        show: selectedNodeId === node.id, // 只有当节点被选中时显示标签
                        position: "bottom",
                    },
                })),
                links: data.links,
                tooltip: {
                    formatter: (params) => {
                        if (params.data.category === 1) {
                            return `数据集：${params.data.name}`;
                        } else if (params.data.category === 2) {
                            return `拥有者：${params.data.name}`;
                        }
                        return params.data.name;
                    },
                },
                emphasis: {
                    focus: "adjacency",
                    lineStyle: {
                        opacity: 0.5,
                        width: 3,
                    },
                },
                label: {
                    show: true,
                    position: "bottom",
                },
            },
        ],
    };

    const handleNodeClick = (params) => {
        setSelectedNodeId(params.data.id); // 更新选中的节点ID
    };

    return (
        <div style={{ height: "500px" }}>
            <ReactECharts
                option={option}
                onEvents={{ click: handleNodeClick }}
            />
        </div>
    );
}
