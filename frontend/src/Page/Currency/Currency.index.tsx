

import "./Currency.scss";
import CurrencyMain from "./View/CurrencyMain";
import HeaderTitle from "../../Component/ReusableComponent/Header/HeaderTitle";

function Currency() {
    return (
        <div className='currency'>
            <HeaderTitle title="Historical Currency" />
            <CurrencyMain />
        </div>
    );
}

export default Currency;
