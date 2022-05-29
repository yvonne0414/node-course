import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const StockDetails = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageto, setPageto] = useState(1);
  const stockId = useParams().stockId;
  // console.log('stockId', stockId);
  useEffect(() => {
    let getStocks = async () => {
      let res = await axios.get(`http://localhost:3001/stockDetails/${stockId}`, {
        params: {
          page: pageto,
        },
      });
      setStockDetails(res.data.data);
      setPage(res.data.pagination.page);
      setLastPage(res.data.pagination.lastPage);
      setTotal(res.data.pagination.total);
      // console.log(res.data);
    };
    getStocks();
  }, [stockId, pageto]);
  // console.log('page', page);
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      if (i == page) {
        pages.push(
          <li className="pageItem active" key={i}>
            {i}
          </li>
        );
      } else {
        pages.push(
          <li className="pageItem" key={i} id={i} onClick={(e) => setPageto(e.target.id)}>
            {i}
          </li>
        );
      }
    }
    return pages;
  };
  return (
    <div>
      <div className="flex justify-between m-6">
        {/* <input type="number" name="" id="" value={pageto} onChange={(e) => setPageto(e.target.value)} /> */}
        <ul className="flex">{getPages()}</ul>
        <div className="text-right">
          {page}/{lastPage}頁，共{total}筆
        </div>
      </div>

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
