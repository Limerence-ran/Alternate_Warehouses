import { React} from 'react'
// import leftTree from '../assets/images/leftTree.svg'
// import rightTree from '../assets/images/rightTree.svg'
import '../assets/styles/AwardsCard.scss'

function AwardCard(props) {

	let {topContent,bottomContent,levelContent,classname} = props;

	return (
		<div className={"AwardsCard_box hover_box " + classname}  >
			<div className="fontContent hover_box">
				<div className="topContent primary ghost shine">{topContent}</div>
				<div className="bottomContent primary ghost shine">{bottomContent}</div>
				<div className="levelContent primary ghost shine">{levelContent}</div>
			</div>
			<div className="leftTree hover_box"><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/leftTree.svg' alt="" /></div>
			<div className="rightTree hover_box"><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/rightTree.svg' alt="" /></div>
		</div>
		
	)
}
export default AwardCard;