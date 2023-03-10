import './featureInfo.css';
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {userRequest} from "../../requestMethods";

function FeatureInfo() {
    const [income, setIncome] = useState([]);
    const [percentage, setPercentage] = useState(0);

    useEffect(()=>{
        const getIncome = async ()=>{
            try{
                const res = await userRequest.get("orders/income");
                setIncome(res.data);
                setPercentage((res.data[1].total*100) / res.data[0].total -100)
            }catch {}
        };
        getIncome();
    },[]);
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{income[1]?.total}€</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(percentage)}{" "}
                        {percentage < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">5200€</span>
                    <span className="featuredMoneyRate">
                    -1.5 <ArrowDownward className="featuredIcon negative" />
                </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2300€</span>
                    <span className="featuredMoneyRate">
                    +3.5 <ArrowUpward className="featuredIcon positive" />
                </span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}

export default FeatureInfo;