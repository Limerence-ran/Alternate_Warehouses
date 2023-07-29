
import MyApp from '../component/MyApp/main'
import UploadApp from '../component/UploadApp/main'
import UserInfor from '../component/UserInfor/main'


export default [
    {
        path: '/MyApp',
        element: < MyApp />
    },
    {
        path: '/UploadApp',
        element: < UploadApp />
    },
    {
        path: '/UserInfor',
        element: < UserInfor />
    }
   
]