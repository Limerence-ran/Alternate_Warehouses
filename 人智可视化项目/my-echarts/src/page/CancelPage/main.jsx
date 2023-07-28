import style from './main.module.css'
import Group from '../GroupPage/main'
import { CloseOutlined } from '@ant-design/icons'

function CancelPage() {
   return (
      <>
         <Group />
         <diV className={style.cancel}>
            <div className={style.header}>Group Design<CloseOutlined className={style.Cancelbtn}/></div>
            <div className={style.text}>
               控和负面清单管理，严守生态红线，持续开展生态修复和环境污染治理工程，保持长江生态原真性和完整性。
               控和负面清单管理，严守生态红线，持续开展生态修复和环境污染治理工程，保持长江生态原真性和完整性。
               控和负面清单管理，严守生态红线，持续开展生态修复和环境污染治理工程，保持长江生态原真性和完整性。
               控和负面清单管理，严守生态红线，持续开展生态修复和环境污染治理工程，保持长江生态原真性和完整性。
            </div>
         </diV>
      </>
   )
}

export default CancelPage