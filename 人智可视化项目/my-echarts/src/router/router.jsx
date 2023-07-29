import Chart1 from '../component/Chart1/main'
import Chart2 from '../component/Chart2/main'
import Chart3 from '../component/Chart3/main'
import Chart4 from '../component/Chart4/main'
import Chart5 from '../component/Chart5/main'
import Chart6 from '../component/Chart6/main'
import Group from '../component/Group/main'
import CreateGroup from '../component/CreateGroup/main'




export default [
    {
        path: '/',
        element: < Group />
    },
    {
        path: '/Chart1',
        element: < Chart1 />
    },
    {
        path: '/Chart2',
        element: < Chart2 />
    },
    {
        path: '/Chart3',
        element: < Chart3 />
    },
    {
        path: '/Chart4',
        element: < Chart4 />
    },
    {
        path: '/CreateGroup',
        element: <CreateGroup />
    },
    {
        path: '/Chart5',
        element: <Chart5 />
    },
    {
        path: '/Chart6',
        element: <Chart6 />
    },
   
]