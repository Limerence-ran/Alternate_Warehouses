import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";

let appSymbol =
    "path://M960 42.666667H64c-12.8 0-21.333333 8.533333-21.333333 21.333333v896c0 12.8 8.533333 21.333333 21.333333 21.333333h896c12.8 0 21.333333-8.533333 21.333333-21.333333V64c0-12.8-8.533333-21.333333-21.333333-21.333333z m-21.333333 896H85.333333V682.666667h853.333334v256z m0-298.666667H85.333333V384h853.333334v256z m0-298.666667H85.333333V85.333333h853.333334v256zM298.666667 768h-42.666667v85.333333h42.666667v-85.333333z m-85.333334 0H170.666667v85.333333h42.666666v-85.333333z m661.333334 21.333333h-170.666667v42.666667h170.666667v-42.666667zM298.666667 469.333333h-42.666667v85.333334h42.666667v-85.333334z m-85.333334 0H170.666667v85.333334h42.666666v-85.333334z m661.333334 21.333334h-170.666667v42.666666h170.666667v-42.666666zM298.666667 170.666667h-42.666667v85.333333h42.666667V170.666667z m-85.333334 0H170.666667v85.333333h42.666666V170.666667z m661.333334 21.333333h-170.666667v42.666667h170.666667V192z";
let masterSymbol =
    "path://M1172.985723 682.049233l-97.748643-35.516964a32.583215 32.583215 0 0 0-21.830134 61.582735l25.7398 9.123221-488.744218 238.181638L115.670112 741.349163l47.245961-19.223356a32.583215 32.583215 0 0 0-22.808051-60.604819l-119.579777 47.896905a32.583215 32.583215 0 0 0 0 59.952875l557.820313 251.540496a32.583215 32.583215 0 0 0 27.695632 0l570.527227-278.584184a32.583215 32.583215 0 0 0-3.258721-59.952875z,M1185.041693 482.966252l-191.587622-68.749123a32.583215 32.583215 0 1 0-21.831133 61.254764l118.927833 43.010323-488.744218 237.855666-471.474695-213.744727 116.973-47.244961a32.583215 32.583215 0 1 0-24.111938-60.604819l-190.609705 75.593537a32.583215 32.583215 0 0 0-20.528246 29.650465 32.583215 32.583215 0 0 0 20.528246 30.30141l557.819313 251.866468a32.583215 32.583215 0 0 0 27.695632 0l570.201254-278.584184a32.583215 32.583215 0 0 0 18.24744-30.953354 32.583215 32.583215 0 0 0-21.505161-29.651465z,M32.583215 290.075742l557.819313 251.540496a32.583215 32.583215 0 0 0 27.695632 0l570.201254-278.584184a32.583215 32.583215 0 0 0-3.257721-59.952875L626.244463 2.042365a32.583215 32.583215 0 0 0-23.134022 0l-570.527226 228.080502a32.583215 32.583215 0 0 0-19.224357 30.627382 32.583215 32.583215 0 0 0 19.224357 29.325493zM615.817355 67.534767l474.733416 170.408432-488.744218 238.180638-471.474695-215.372588z";
let slaveSymbol =
    "path://M600.255321 133.164178c120.213708 0 219.218733 68.021482 232.313549 155.527628h21.531936c-6.225171-97.884819-117.4874-175.858037-253.843452-175.858037S352.637041 190.806986 346.411869 288.691806h21.529903c13.094816-87.506146 112.099841-155.527628 232.313549-155.527628z,M600.255321 436.760206c-120.213708 0-219.218733-68.021482-232.313549-155.527627H346.409836c6.225171 97.884819 117.4874 175.858037 253.843452 175.858036s247.620314-77.973217 253.843452-175.858036h-21.531936c-13.09075 87.504113-112.095775 155.527628-232.309483 155.527627z,M346.125211 741.541498c0 101.900075 113.7771 184.508626 254.13011 184.508625 140.350978 0 254.130111-82.60855 254.130111-184.508625v-444.199103c0-2.901149-0.103685-5.784001-0.286659-8.650589h-21.531936c0.971794 6.4854 1.486153 13.076519 1.486153 19.757091v421.988131c0 96.803242-104.675176 175.282686-233.799702 175.282686s-233.799702-78.479444-233.799701-175.282686V308.448897c0-6.680572 0.516392-13.269658 1.486152-19.757091h-21.529903a135.835594 135.835594 0 0 0-0.286658 8.650589v444.199103z";

export default function DynamicRelationChart(props) {
    const data = props.propdata;
    console.log(data);
    const createNodesAndLinks = () => {
        const centerNode = {
            id: "center",
            name: `Group: ${data.group.groupName}`,
            category: "Group",
            value: 1,
        };
        const nodes = [centerNode];
        const links = [];

        data.resourceListEnhancedWithRelativeCode.forEach((item) => {
            const groupId = item.id;
            const ownerId = item.ownerId;
            console.log(ownerId);
            const groupNode = {
                id: groupId,
                name: `Data:${item.resourceName}`,
                value: 1,
                category: "Data",
            };

            const ownerNode = {
                id: ownerId,
                name: `Owner:${item.ownerName}`,
                category: "Owner",
                value: 1,
            };

            const groupLink = {
                source: centerNode.name,
                target: groupNode.name,
            };
            const ownerLink = {
                source: groupNode.name,
                target: ownerNode.name,
            };

            nodes.push(groupNode, ownerNode);
            links.push(groupLink, ownerLink);
        });

        return { nodes, links };
    };
    const { nodes, links } = createNodesAndLinks();
    const option = {
        title: {
            text: "Database diagram",
            top: "bottom",
            left: "right",
        },
        legend: { data: ["Group", "Data", "Owner"] },

        tooltip: { show: true },

        series: [
            {
                animationDuration: 1500,
                animationDelay: 100,
                animationEasingUpdate: "quinticInOut",
                draggable: true,
                type: "graph",
                layout: "force",
                roam: true,
                edgeSymbol: ["none", "none"],
                edgeSymbolSize: 10,
                force: {
                    repulsion: 1000,
                    edgeLength: [200, 400],
                    gravity: 0.1,
                },
                categories: [
                    { name: "Group", itemStyle: { color: "red" } },
                    {
                        name: "Data",
                        itemStyle: { color: "#ff6e7f" },
                    },
                    {
                        name: "Owner",
                        itemStyle: { color: " rgba(128, 68, 255, 1)" },
                    },
                ],

                data: nodes.map((node) => ({
                    //避坑：id: node.id,
                    name: node.name,
                    category: node.category,
                    symbolSize:
                        node.category === "Group"
                            ? 50
                            : node.category === "Data"
                            ? 40
                            : 20,
                    symbol:
                        node.category === "Group"
                            ? appSymbol
                            : node.category === "Data"
                            ? masterSymbol
                            : slaveSymbol,
                })),
                links: links,

                label: {
                    show: true,
                    position: "bottom",
                    formatter: "{b}",
                    fontSize: 12,
                },
                lineStyle: {
                    color: "source",
                    curveness: 0,
                    width: 3,
                },

                edgeSymbol: ["circle", "arrow"],
                edgeAnimation: true,
                emphasis: {
                    focus: "adjacency",
                    lineStyle: {
                        width: 10,
                    },
                },
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            style={{
                height: "100%",
                width: "100%",
                backgroundColor: "#ebebeb",
            }}
        />
    );
}
