import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function DynamicRelationChart(props) {
    const data = props.propdata;
    // Create nodes and links based on the data
    const createNodesAndLinks = () => {
        const centerNode = {
            id: 1,
            name: `群组${data.group.groupName}`,
            category: 0,
        };
        const nodes = [centerNode];
        const links = [];

        console.log(
            "data.resourceListEnhancedWithRelativeCode",
            data.resourceListEnhancedWithRelativeCode
        );
        data.resourceListEnhancedWithRelativeCode.forEach((item) => {
            const groupId = item.id;
            const ownerId = item.ownerId;

            const groupNode = {
                id: groupId,
                name: `数据集:${item.resourceName}`,
                category: 1,
            };

            const ownerNode = {
                id: ownerId,
                name: `拥有者:${item.ownerName}`,
                category: 2,
            };

            const groupLink = {
                source: centerNode.id,
                target: groupId,
            };

            const ownerLink = {
                source: groupId,
                target: ownerId,
            };

            nodes.push(groupNode, ownerNode);
            links.push(groupLink, ownerLink);
        });

        return { nodes, links };
    };

    const { nodes, links } = createNodesAndLinks();
    console.log("nodes, links->", nodes, links);

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

                data: nodes.map((node) => ({
                    id: node.id,
                    name: node.name,
                    category: node.category,
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
