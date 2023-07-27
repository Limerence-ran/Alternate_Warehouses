import React from 'react';
import style from './main.module.css'
import { CaretRightOutlined } from '@ant-design/icons'
// import Paging from '../Paging/main'



function Company() {
    const companies = [
        {
            id: 1,
            name: 'ABC 公司',
            type: '科技',
            number: '123456',
            promotion: '我们是一家致力于创新的科技公司。',
        },
        {
            id: 2,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        }, {
            id: 4,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        }, {
            id: 9,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        }, {
            id: 2,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        }, {
            id: 6666666,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        }, {
            id: 2,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        }, {
            id: 2,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        },
        {
            id: 2,
            name: 'XYZ 公司',
            type: '媒体',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        },
        {
            id: 2,
            name: 'XYZ 公司',
            type: '媒体sdfdsfg',
            number: '789012',
            promotion: '我们专注于提供高质量的媒体内容。',
        }
       
    ];

    return (
        
        <>
        <table className={style.table}>
                {companies.map(company => (
                    <tr>
                        <td>{company.id}</td>
                        <td>{company.name}</td>
                        <td>{company.type}</td>
                        <td> {company.promotion}</td>
                        <td class="text-end">
                            <a href="#" className={style.btn}> <CaretRightOutlined /></a>
                        </td>
                        <td><button>Withdrawal</button></td>
                    </tr>
                ))
                }
        </table>
        {/* <Paging/> */}
        </>
    );
}

export default Company