import Chart1 from '../component/Chart1/main'
import Chart2 from '../component/Chart2/main'
import Chart3 from '../component/Chart3/main'
import Chart4 from '../component/Chart4/main'
import Group from '../component/Group/main'
import CreateGroup from '../component/CreateGroup/main'



export default [
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
        path: '/Group',
        element: < Group />
    },
    {
        path: '/CreateGroup',
        element: <CreateGroup />
    },
]