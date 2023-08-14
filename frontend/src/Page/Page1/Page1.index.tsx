import HTTPReq from "./View/HTTPReq";
import Timer from "./View/Timer";

import "./style.scss";

function Page1() {
    return (
        <div className='page1-main'>
            <div className='page1-main__req'>
                <span>Example HTTP Request with Axios</span>
                <HTTPReq />
            </div>
            <div className='page1-main__timer'>
                <span>Timer</span>
                <Timer />
            </div>
        </div>
    );
}

export default Page1;
