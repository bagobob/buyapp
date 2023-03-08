import './home.css';
import FeatureInfo from "../../components/featuredInfo/FeatureInfo";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {useEffect, useMemo, useState} from "react";
import {userRequest} from "../../requestMethods";

function Home() {
    const [ usersStats,setUsersStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],
        []
    );

    useEffect(()=>{
        const getStats = async ()=>{
            try{
                const res = await userRequest.get("/users/stats");
                res.data.map((item) =>
                    setUsersStats((prev)=>[
                        ...prev,
                        {name:MONTHS[item._id-1], "Active User": item.total}
                        ])
                )
            }catch (err){console.log(err)}
        };
        getStats();
    },[MONTHS]);
    return (
        <div className="home">
            <FeatureInfo />
            <Chart data={usersStats} title="Sales Analytics" grid dataKey="Active User"/>
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}

export default Home;