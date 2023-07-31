import React, { useState } from "react";
import ReactECharts from "echarts-for-react";

export default function DynamicRelationChart(props) {
    const data = props.propdata;
    const centerNode = {
        id: 1,
        name: `群组${props.gropId}`,
        category: 0,
    };

    // Create nodes and links based on the data
    const createNodesAndLinks = () => {
        const nodes = [centerNode];
        const links = [];

        data.forEach((item) => {
            const groupId = item.groupId;
            const ownerId = item.ownerId;

            const groupNode = {
                id: groupId,
                name: `数据集${props.resourceName}`,
                category: 1,
            };

            const ownerNode = {
                id: ownerId,
                name: `拥有者${ownerId}`,
                category: 2,
            };

            const groupLink = {
                source: centerNode.id,
                target: groupId,
            };

            const ownerLink = {
                source: groupNode.id,
                target: ownerId,
            };

            nodes.push(groupNode, ownerNode);
            links.push(groupLink, ownerLink);
        });

        return { nodes, links };
    };

    const { nodes, links } = createNodesAndLinks();

    const option = {
        series: [
            {
                type: "graph",
                layout: "force",
                roam: true,
                edgeSymbol: ["none", "none"],
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
                nodes: nodes.map((node) => ({
                    ...node,
                    symbolSize: node.category === 0 ? 60 : 40,
                })),
                links: links,
                emphasis: {
                    focus: "adjacency",
                    lineStyle: {
                        opacity: 0.5,
                        width: 3,
                    },
                },
                label: {
                    show: true,
                    position: "inside",
                },
            },
        ],
    };

    return (
        <div style={{ height: "500px" }}>
            <ReactECharts option={option} />
        </div>
    );
}
