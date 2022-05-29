import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StockDetails = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const stockId = useParams().stockId;
  // console.log('stockId', stockId);
  useEffect(() => {
    let getStocks = async () => {
      let res = await axios.get(`http://localhost:3001/stockDetails/${stockId}`);
      setStockDetails(res.data.data);
    };
    getStocks();
  }, [stockId]);
  // console.log('stockDetails', stockDetails);
  return (
    <div>
      <div className="m-6 text-right">1/6頁，共{stockDetails.length}筆</div>
      {stockDetails.map((detail) => {
        return (
          <div key={detail.date} className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{detail.date}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{detail.amount}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{detail.volume}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{detail.open_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{detail.close_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{detail.delta_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{detail.high_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{detail.low_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{detail.transactions}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;
